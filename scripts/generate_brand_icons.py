#!/usr/bin/env python3
"""Generate brand icons from lotus reference image — white bg replaced with black."""

from __future__ import annotations

import base64
import io
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "static" / "img" / "brand"
REF = OUT_DIR / "lotus-reference.png"

BG = (10, 10, 10, 255)


def _is_background(r: int, g: int, b: int, a: int) -> bool:
    if a < 20:
        return True
    return r > 230 and g > 230 and b > 230


def _load_master(size: int = 512) -> Image.Image:
    ref = Image.open(REF).convert("RGBA")
    w, h = ref.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    square = ref.crop((left, top, left + side, top + side))

    pixels = square.load()
    for y in range(square.height):
        for x in range(square.width):
            r, g, b, a = pixels[x, y]
            if _is_background(r, g, b, a):
                pixels[x, y] = BG

    return square.resize((size, size), Image.Resampling.LANCZOS)


def _rounded_rect_mask(size: int, radius: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    return mask


def _apply_favicon_mask(img: Image.Image) -> Image.Image:
    size = img.width
    radius = max(1, round(6 * size / 32))
    masked = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    masked.paste(img, mask=_rounded_rect_mask(size, radius))
    return masked


def _write_svg(png: Image.Image) -> None:
    buf = io.BytesIO()
    png.save(buf, format="PNG", optimize=True)
    encoded = base64.b64encode(buf.getvalue()).decode("ascii")
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" '
        'viewBox="0 0 32 32" role="img" aria-label="Black Elixir Spa">\n'
        f'  <image width="32" height="32" href="data:image/png;base64,{encoded}"/>\n'
        "</svg>\n"
    )
    (OUT_DIR / "favicon.svg").write_text(svg, encoding="utf-8")


def main() -> None:
    if not REF.exists():
        raise FileNotFoundError(f"Missing reference image: {REF}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    master = _load_master(512)

    outputs = {
        "favicon-32.png": 32,
        "logo-192.png": 192,
        "logo.png": 256,
        "logo-512.png": 512,
    }

    for name, size in outputs.items():
        scaled = master.resize((size, size), Image.Resampling.LANCZOS)
        if name == "favicon-32.png":
            scaled = _apply_favicon_mask(scaled)
        scaled.save(OUT_DIR / name, optimize=True)

    svg_source = _apply_favicon_mask(master.resize((32, 32), Image.Resampling.LANCZOS))
    _write_svg(svg_source)
    print(f"Saved icons to {OUT_DIR}")


if __name__ == "__main__":
    main()
