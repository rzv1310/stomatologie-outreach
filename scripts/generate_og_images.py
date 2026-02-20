#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "pillow",
# ]
# ///
"""
Generate OG images (1200x630) for each clinic subdomain.

Usage:
    uv run scripts/generate_og_images.py

Reads data/contacts.json and generates a branded OG image per clinic
into public/og/{subdomain}.png.
"""

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(__file__).resolve().parent.parent
CONTACTS_PATH = REPO_ROOT / "data" / "contacts.json"
OUTPUT_DIR = REPO_ROOT / "public" / "og"

WIDTH = 1200
HEIGHT = 630

# Light theme colors from the website's CSS variables
# --background: 40 33% 96%  -> hsl(40, 33%, 96%) warm cream
BG_LIGHT = (247, 244, 236)
# --cream-pure: 40 40% 98%
BG_END = (252, 250, 244)
# --primary: 168 35% 28%    -> hsl(168, 35%, 28%) deep emerald
PRIMARY = (46, 96, 86)
# --accent: 160 60% 45%     -> hsl(160, 60%, 45%) bright emerald
ACCENT = (46, 184, 138)
# --foreground: 168 35% 15%
TEXT_DARK = (25, 52, 46)
# --muted-foreground: 168 20% 40%
TEXT_MUTED = (82, 122, 112)


def lerp_color(c1: tuple, c2: tuple, t: float) -> tuple:
    return tuple(int(a + (b - a) * t) for a, b in zip(c1, c2))


def draw_gradient(draw: ImageDraw.ImageDraw):
    """Light cream gradient matching the website background."""
    for y in range(HEIGHT):
        t = y / HEIGHT
        color = lerp_color(BG_LIGHT, BG_END, t)
        draw.line([(0, y), (WIDTH, y)], fill=color)


def draw_accent_shapes(draw: ImageDraw.ImageDraw):
    # Large glow top-right
    draw.ellipse(
        [WIDTH - 350, -200, WIDTH + 100, 300],
        fill=(*PRIMARY, 12),
    )
    # Medium glow bottom-left
    draw.ellipse(
        [-150, HEIGHT - 280, 350, HEIGHT + 120],
        fill=(*ACCENT, 10),
    )
    # Small accent dot
    draw.ellipse(
        [WIDTH - 500, HEIGHT - 180, WIDTH - 430, HEIGHT - 110],
        fill=(*ACCENT, 16),
    )
    # Subtle top-left glow
    draw.ellipse(
        [-80, -80, 200, 200],
        fill=(*PRIMARY, 8),
    )


def get_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    """Try to load a system font, fall back to default."""
    font_names = (
        [
            "/System/Library/Fonts/SFPro-Bold.otf",
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        ]
        if bold
        else [
            "/System/Library/Fonts/SFPro-Regular.otf",
            "/System/Library/Fonts/Supplemental/Arial.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        ]
    )
    for name in font_names:
        try:
            return ImageFont.truetype(name, size)
        except (OSError, IOError):
            continue
    return ImageFont.load_default()


def text_width(text: str, font: ImageFont.FreeTypeFont) -> int:
    bbox = font.getbbox(text)
    return bbox[2] - bbox[0]


def text_height(text: str, font: ImageFont.FreeTypeFont) -> int:
    bbox = font.getbbox(text)
    return bbox[3] - bbox[1]


def wrap_text(text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    """Wrap text to fit within max_width."""
    words = text.split()
    lines = []
    current_line = ""
    for word in words:
        test = f"{current_line} {word}".strip()
        if text_width(test, font) <= max_width:
            current_line = test
        else:
            if current_line:
                lines.append(current_line)
            current_line = word
    if current_line:
        lines.append(current_line)
    return lines


def generate_og_image(clinic_name: str, city: str, county: str, subdomain: str):
    img = Image.new("RGBA", (WIDTH, HEIGHT), (*BG_LIGHT, 255))
    draw = ImageDraw.Draw(img, "RGBA")

    # Background gradient
    draw_gradient(draw)

    # Decorative glows
    draw_accent_shapes(draw)

    # Accent bar at top
    draw.rectangle([0, 0, WIDTH, 4], fill=PRIMARY)

    # Fonts
    font_heading = get_font(52, bold=True)
    font_name = get_font(30, bold=False)
    font_domain = get_font(38, bold=True)

    # Text content
    heading_text = f"Stomatologie {city}"
    name_lines = wrap_text(clinic_name, font_name, WIDTH - 160)
    name_line_h = text_height("Ag", font_name)
    name_block_h = len(name_lines) * (name_line_h + 10) - 10
    domain_text = f"{subdomain}.seo-doctor.ro"

    heading_h = text_height(heading_text, font_heading)
    domain_h = text_height(domain_text, font_domain)

    gap1 = 20  # heading -> clinic name
    gap2 = 28  # clinic name -> domain

    total_h = heading_h + gap1 + name_block_h + gap2 + domain_h
    start_y = (HEIGHT - total_h) // 2

    # 1. "Stomatologie City" — centered, bold
    hw = text_width(heading_text, font_heading)
    draw.text(((WIDTH - hw) // 2, start_y), heading_text, font=font_heading, fill=TEXT_DARK)
    y = start_y + heading_h + gap1

    # 2. Clinic name — centered, muted
    for line in name_lines:
        lw = text_width(line, font_name)
        draw.text(((WIDTH - lw) // 2, y), line, font=font_name, fill=TEXT_MUTED)
        y += name_line_h + 10
    y += gap2 - 10

    # 3. Domain — centered, accent, bigger
    dw = text_width(domain_text, font_domain)
    dx = (WIDTH - dw) // 2
    draw.text((dx, y), domain_text, font=font_domain, fill=ACCENT)

    # Accent underline below domain
    line_w = min(dw, 240)
    line_x = (WIDTH - line_w) // 2
    draw.rectangle([line_x, y + domain_h + 12, line_x + line_w, y + domain_h + 15], fill=ACCENT)

    # Convert to RGB for PNG
    rgb_img = Image.new("RGB", (WIDTH, HEIGHT), BG_LIGHT)
    rgb_img.paste(img, mask=img.split()[3])

    output_path = OUTPUT_DIR / f"{subdomain}.png"
    rgb_img.save(output_path, "PNG", optimize=True)
    return output_path


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with open(CONTACTS_PATH) as f:
        contacts = json.load(f)

    print(f"Generating OG images for {len(contacts)} clinics...\n")

    for i, clinic in enumerate(contacts, 1):
        subdomain = clinic.get("subdomain")
        if not subdomain:
            continue
        path = generate_og_image(
            clinic["clinic_name"],
            clinic["city"],
            clinic["county"],
            subdomain,
        )
        print(f"  [{i:3d}/{len(contacts)}]  {path.name}")

    print(f"\nDone. Images saved to {OUTPUT_DIR}/")


if __name__ == "__main__":
    main()
