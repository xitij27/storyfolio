# Lays one way's frames side by side, in scroll order, with the scroll point on each.
import sys
from pathlib import Path
from PIL import Image, ImageDraw

folder, prefix, out = Path(sys.argv[1]), sys.argv[2], sys.argv[3]
frames = sorted(folder.glob(f"{prefix}-*.png"))
images = [Image.open(f) for f in frames]
w, h = images[0].size
scale = 0.4
tw, th = int(w * scale), int(h * scale)
cols = 4
rows = (len(images) + cols - 1) // cols
sheet = Image.new("RGB", (cols * tw, rows * th), "black")
draw = ImageDraw.Draw(sheet)
for i, (f, im) in enumerate(zip(frames, images)):
    x, y = (i % cols) * tw, (i // cols) * th
    sheet.paste(im.resize((tw, th)), (x, y))
    draw.text((x + 6, y + 4), f.stem.split("-")[-1] + "%", fill="yellow")
sheet.save(out)
