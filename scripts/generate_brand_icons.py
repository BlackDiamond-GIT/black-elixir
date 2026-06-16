#!/usr/bin/env python3
"""Generate PNG brand icons from lotus + leaves logo geometry."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "static" / "img" / "brand"

BG = (10, 10, 10, 255)
PINK = (232, 138, 171, 255)
GREEN = (139, 200, 74, 255)

GREEN_LEAVES = (
    [(16.0, 21.6), (14.7, 27.9), (16.0, 29.0), (17.3, 27.9)],
    [(13.6, 22.0), (5.8, 24.2), (7.6, 27.8), (13.4, 26.0), (15.0, 23.0)],
    [(18.4, 22.0), (26.2, 24.2), (24.4, 27.8), (18.6, 26.0), (17.0, 23.0)],
)

PINK_PETALS = (
    [(14.8, 8.0), (13.6, 6.5), (12.9, 8.6), (14.3, 10.2)],
    [(17.2, 8.0), (18.4, 6.5), (19.1, 8.6), (17.7, 10.2)],
    [(14.4, 15.0), (8.4, 13.4), (4.6, 17.8), (6.8, 23.4), (12.0, 22.2), (14.8, 18.0)],
    [(17.6, 15.0), (23.6, 13.4), (27.4, 17.8), (25.2, 23.4), (20.0, 22.2), (17.2, 18.0)],
    [(14.9, 14.4), (10.8, 8.8), (8.2, 11.2), (10.4, 16.6), (13.2, 17.4), (15.0, 15.6)],
    [(17.1, 14.4), (21.2, 8.8), (23.8, 11.2), (21.6, 16.6), (18.8, 17.4), (17.0, 15.6)],
    [(15.0, 14.8), (12.0, 9.8), (9.6, 11.8), (11.4, 16.8), (13.8, 17.6), (15.3, 16.0)],
    [(17.0, 14.8), (20.0, 9.8), (22.4, 11.8), (20.6, 16.8), (18.2, 17.6), (16.7, 16.0)],
    [(16.0, 5.2), (17.3, 6.2), (17.6, 10.4), (17.1, 13.4), (16.0, 14.6), (14.9, 13.4), (14.4, 10.4), (14.7, 6.2)],
)


def _rounded_rect_mask(size: int, radius: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    return mask


def render_logo(size: int) -> Image.Image:
    scale = size / 32.0
    radius = max(1, round(6 * scale))

    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=BG)

    for leaf in GREEN_LEAVES:
        draw.polygon([(x * scale, y * scale) for x, y in leaf], fill=GREEN)

    for petal in PINK_PETALS:
        draw.polygon([(x * scale, y * scale) for x, y in petal], fill=PINK)

    masked = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    masked.paste(img, mask=_rounded_rect_mask(size, radius))
    return masked


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    render_logo(32).save(OUT_DIR / "favicon-32.png", optimize=True)
    render_logo(192).save(OUT_DIR / "logo-192.png", optimize=True)
    render_logo(512).save(OUT_DIR / "logo-512.png", optimize=True)
    render_logo(256).save(OUT_DIR / "logo.png", optimize=True)
    print(f"Saved PNG icons to {OUT_DIR}")


if __name__ == "__main__":
    main()
