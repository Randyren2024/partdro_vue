"""
Redact SKYROVER text from battery-life.jpg — the actual text is at y≈88-93%, not 95-100%.

Approach:
1. Paint a horizontal band over the SKYROVER text region with a vertical gradient matching the background.
2. Optionally overlay 'Lumenfly Mini' and 'Lumenfly Mini Combo' text labels (white) in the same area.
"""
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import os

IMG_DIR = r"C:/Users/81102/Desktop/lumenfly_20260619/lumenfly_ecommerce/partdro_vue/public/images/lumenfly-mini"

def paint_gradient_strip(img, x1, y1, x2, y2):
    """Sample per-column colors from neighbouring rows (above y1 and below y2) and fill the strip with that gradient."""
    arr = np.array(img)
    h, w, _ = arr.shape
    # Sample row just above and just below
    row_top = arr[max(0, y1 - 4):y1, x1:x2 + 1].mean(axis=0)
    row_bot = arr[y2 + 1:min(h, y2 + 5), x1:x2 + 1].mean(axis=0)
    height = y2 - y1 + 1
    for j, y in enumerate(range(y1, y2 + 1)):
        t = j / max(1, height - 1)
        r = (row_top[:, 0] * (1 - t) + row_bot[:, 0] * t).astype(np.uint8)
        g = (row_top[:, 1] * (1 - t) + row_bot[:, 1] * t).astype(np.uint8)
        b = (row_top[:, 2] * (1 - t) + row_bot[:, 2] * t).astype(np.uint8)
        arr[y, x1:x2 + 1, 0] = r
        arr[y, x1:x2 + 1, 1] = g
        arr[y, x1:x2 + 1, 2] = b
    return Image.fromarray(arr)

def find_font(size: int):
    """Try common Windows font paths."""
    candidates = [
        r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\calibri.ttf",
        r"C:\Windows\Fonts\verdana.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

def main():
    path = os.path.join(IMG_DIR, "battery-life.jpg")
    img = Image.open(path).convert("RGB")
    w, h = img.size
    print(f"battery-life.jpg: {w}x{h}")

    # SKYROVER text was confirmed at y ≈ 88-93% (around rows 2253-2380 in 2560px)
    band_top = int(h * 0.875)   # 2240
    band_bot = int(h * 0.93)    # 2381
    # Paint full-width gradient strip first (clears everything including any stray text)
    img = paint_gradient_strip(img, 0, band_top, w - 1, band_bot)

    # Now overlay Lumenfly Mini text in white, centered under each "X mins" label
    font = find_font(int(h * 0.022))  # ~56px
    draw = ImageDraw.Draw(img)
    # Centered under "40 mins" (left label area)
    label_y = band_top + int((band_bot - band_top) * 0.45)
    left_text = "Lumenfly Mini"
    bbox = draw.textbbox((0, 0), left_text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    left_x = int(w * 0.20) - text_w // 2
    draw.text((left_x, label_y - text_h // 2), left_text, fill=(230, 240, 255), font=font)

    right_text = "Lumenfly Mini Combo"
    bbox2 = draw.textbbox((0, 0), right_text, font=font)
    text_w2 = bbox2[2] - bbox2[0]
    right_x = int(w * 0.70) - text_w2 // 2
    draw.text((right_x, label_y - text_h // 2), right_text, fill=(230, 240, 255), font=font)

    img.save(path, quality=92)
    print(f"  saved → {path}")
    # Verify by checking bottom region for any leftover white text outside the new labels
    arr = np.array(img)
    whiteish = (arr[:, :, 0] > 220) & (arr[:, :, 1] > 220) & (arr[:, :, 2] > 220)
    rows_with_white = np.where(whiteish.sum(axis=1) > 8)[0]
    print(f"  remaining white-text rows in redacted band ({band_top}-{band_bot}): "
          f"{sum(1 for r in rows_with_white if band_top <= r <= band_bot)}")

if __name__ == "__main__":
    main()