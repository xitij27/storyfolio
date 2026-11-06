"""Draw share cards locally with installed system fonts and original geometry."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parent.parent / 'site' / 'app'
image = Image.new('RGB', (1200, 630), '#0f1318')
draw = ImageDraw.Draw(image)
serif = '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'
sans = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(path, size):
    return ImageFont.truetype(path, size)

draw.polygon([(70, 66), (1070, 66), (1130, 126), (1130, 564), (70, 564)], fill='#f2ede2')
draw.polygon([(1070, 66), (1070, 126), (1130, 126)], fill='#e9a23b')
draw.text((122, 114), 'DAWIT BEKELE', font=font(sans, 24), fill='#80500b')
draw.text((118, 178), 'Migration plans.', font=font(serif, 62), fill='#1c222a')
draw.text((118, 258), 'Cutover checks. A way back.', font=font(serif, 48), fill='#1c222a')
draw.line([(122, 365), (1066, 365)], fill='#c9c1b0', width=2)
draw.text((122, 396), 'Runbook · Cutover checklist · Rollback plan', font=font(sans, 28), fill='#1c222a')
draw.text((122, 478), 'dawit@example.com', font=font(sans, 25), fill='#56616b')
for name in ['opengraph-image', 'twitter-image']:
    image.save(root / f'{name}.png')
    (root / f'{name}.alt.txt').write_text('Dawit Bekele. Migration plans, cutover checks and a way back. Runbook, cutover checklist, rollback plan. dawit@example.com.\n')
print('Generated two local share images, 1200 × 630.')
