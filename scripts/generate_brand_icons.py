#!/usr/bin/env python3
"""Generate PNG brand icons from lotus-circle logo geometry."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "static" / "img" / "brand"

BG = (10, 10, 10, 255)
CIRCLE = (212, 165, 165, 255)
LOTUS = (250, 248, 246, 255)

CENTER = 16.0
CIRCLE_R = 12.5

PETALS = (
    [(16.0, 6.1), (17.05, 11.7), (16.0, 14.7), (14.95, 11.7)],
    [(14.85, 14.6), (11.6, 9.8), (9.1, 12.1), (12.1, 16.4)],
    [(17.15, 14.6), (20.4, 9.8), (22.9, 12.1), (19.9, 16.4)],
    [(14.55, 15.4), (7.8, 13.9), (4.2, 18.2), (8.9, 24.2), (13.6, 21.2)],
    [(17.45, 15.4), (24.2, 13.9), (27.8, 18.2), (23.1, 24.2), (18.4, 21.2)],
    [(13.05, 22.6), (10.7, 26.2), (12.9, 27.6), (14.8, 25.2)],
    [(18.95, 22.6), (21.3, 26.2), (19.1, 27.6), (17.2, 25.2)],
)


def _rounded_rect_mask(size: int, radius: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    return mask


def render_logo(size: int) -> Image.Image:
    scale = size / 32.0
    radius = max(1, round(6 * scale))
    cx = CENTER * scale
    cy = CENTER * scale
    circle_r = CIRCLE_R * scale

    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=BG)
    draw.ellipse((cx - circle_r, cy - circle_r, cx + circle_r, cy + circle_r), fill=CIRCLE)

    for petal in PETALS:
        points = [(x * scale, y * scale) for x, y in petal]
        draw.polygon(points, fill=LOTUS)

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
