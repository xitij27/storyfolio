"""Local contact sheets for the final browser matrix; no external assets."""
from PIL import Image, ImageDraw
from pathlib import Path
import math
import sys
base = Path(sys.argv[1] if len(sys.argv) > 1 else 'checks/finish-full')
out = Path('checks/finish-visual-review')
out.mkdir(exist_ok=True)
for case in sorted(base.iterdir()):
    if not case.is_dir():
        continue
    files = sorted(case.glob('*.png'))
    phone = 'phone' in case.name
    cw, ch, cols, batch = (390, 870, 2, 6) if phone else (600, 400, 3, 12)
    for start in range(0, len(files), batch):
        group = files[start:start+batch]
        sheet = Image.new('RGB', (cw*cols, ch*math.ceil(len(group)/cols)), '#d9d8d0')
        draw = ImageDraw.Draw(sheet)
        for i, file in enumerate(group):
            pic = Image.open(file)
            pic.thumbnail((cw, ch-25))
            x = i%cols*cw+(cw-pic.width)//2
            y = i//cols*ch+24
            sheet.paste(pic, (x,y))
            draw.text((i%cols*cw+7,i//cols*ch+6), file.name, fill='#172321')
        part = '-part'+base.name.split('-')[2] if base.name.startswith('finish-reduced-') else ''
        sheet.save(out/f'{case.name}{part}-{start//batch}.jpg')
print(f'Review sheets saved in {out}')
