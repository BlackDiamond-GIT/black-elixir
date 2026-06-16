#!/usr/bin/env python3
"""Generate PNG brand icons from lotus favicon geometry."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "static" / "img" / "brand"

BG = (10, 10, 10, 255)
PETAL_BACK = (158, 112, 112, 230)
PETAL_FRONT = (212, 165, 165, 255)
CENTER = (201, 169, 138, 255)
CENTER_HL = (240, 237, 232, 140)

PETAL = [
    (0.0, -8.2),
    (2.1, -6.4),
    (3.1, -2.6),
    (2.4, 1.2),
    (1.7, 3.6),
    (0.0, 5.2),
    (-1.7, 3.6),
    (-2.4, 1.2),
    (-3.1, -2.6),
    (-2.1, -6.4),
]

BACK_ANGLES = (144, 216)
FRONT_ANGLES = (0, 72, 288)


def _rotate(x: float, y: float, deg: float) -> tuple[float, float]:
    rad = math.radians(deg)
    cos_a = math.cos(rad)
    sin_a = math.sin(rad)
    return x * cos_a - y * sin_a, x * sin_a + y * cos_a


def _petal_points(cx: float, cy: float, scale: float, angle: float) -> list[tuple[float, float]]:
    return [
        (cx + _rotate(px, py, angle)[0] * scale, cy + _rotate(px, py, angle)[1] * scale)
        for px, py in PETAL
    ]


def _rounded_rect_mask(size: int, radius: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    return mask


def render_lotus(size: int) -> Image.Image:
    scale = size / 32.0
    radius = max(1, round(6 * scale))
    cx = size / 2.0
    cy = size / 2.0 + 0.5 * scale

    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=BG)

    for angle in BACK_ANGLES:
        draw.polygon(_petal_points(cx, cy, scale, angle), fill=PETAL_BACK)

    for angle in FRONT_ANGLES:
        draw.polygon(_petal_points(cx, cy, scale, angle), fill=PETAL_FRONT)

    r_center = 2.3 * scale
    r_hl = 0.9 * scale
    draw.ellipse(
        (cx - r_center, cy - r_center, cx + r_center, cy + r_center),
        fill=CENTER,
    )
    draw.ellipse(
        (cx - r_hl, cy - r_hl, cx + r_hl, cy + r_hl),
        fill=CENTER_HL,
    )

    masked = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    masked.paste(img, mask=_rounded_rect_mask(size, radius))
    return masked


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    render_lotus(32).save(OUT_DIR / "favicon-32.png", optimize=True)
    render_lotus(192).save(OUT_DIR / "logo-192.png", optimize=True)
    print(f"Saved PNG icons to {OUT_DIR}")


if __name__ == "__main__":
    main()
