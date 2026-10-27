import sys, glob
from PIL import Image, ImageDraw
out, pattern, cols = sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 4
files = sorted(glob.glob(pattern))
ims = [Image.open(f).convert("RGB") for f in files]
w, h = ims[0].size; tw = 480; th = int(h * tw / w)
rows = (len(ims) + cols - 1) // cols
sheet = Image.new("RGB", (cols * tw, rows * th), "black")
for i, (f, im) in enumerate(zip(files, ims)):
    im = im.resize((tw, th)); d = ImageDraw.Draw(im); d.text((6, 6), f.split("-")[-1][:-4], fill="yellow")
    sheet.paste(im, ((i % cols) * tw, (i // cols) * th))
sheet.save(out)
