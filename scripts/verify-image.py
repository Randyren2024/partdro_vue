"""Verify battery-life.jpg has no SKYROVER text by scanning for white-ish pixel clusters."""
from PIL import Image
import numpy as np

img = Image.open(r"C:/Users/81102/Desktop/lumenfly_20260619/lumenfly_ecommerce/partdro_vue/public/images/lumenfly-mini/battery-life.jpg").convert("RGB")
arr = np.array(img)
print(f"Image size: {img.size}")

# Scan for rows that contain white-ish pixels (text on dark background)
whiteish = (arr[:, :, 0] > 200) & (arr[:, :, 1] > 200) & (arr[:, :, 2] > 200)
rows_with_white = np.where(whiteish.sum(axis=1) > 5)[0]
print(f"Rows containing white-ish pixels (>5 per row): {len(rows_with_white)} rows")
if len(rows_with_white):
    # Group consecutive rows into "bands"
    bands = []
    start = rows_with_white[0]
    for i in range(1, len(rows_with_white)):
        if rows_with_white[i] - rows_with_white[i - 1] > 5:
            bands.append((start, rows_with_white[i - 1]))
            start = rows_with_white[i]
    bands.append((start, rows_with_white[-1]))
    print("Bands with white text:")
    for s, e in bands:
        print(f"  rows {s}-{e} (y={s/img.height:.2%} - {e/img.height:.2%})")

# Now specifically check bottom 15% for white text
bot_start = int(arr.shape[0] * 0.85)
bot_white = whiteish[bot_start:]
print(f"\nBottom 15%: {bot_white.sum()} white-ish pixels in {bot_white.shape[0]} rows")
# Also save bottom strip as a verification crop
img.crop((0, int(arr.shape[0] * 0.80), arr.shape[1], arr.shape[0])).save(r"C:/Users/81102/Desktop/lumenfly_20260619/lumenfly_ecommerce/partdro_vue/public/images/lumenfly-mini/_verify_bot.jpg", quality=85)
print("Saved verify crop → _verify_bot.jpg")