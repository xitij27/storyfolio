from PIL import Image,ImageDraw
from pathlib import Path
import math
base=Path('checks/spine-acceptance')
out=Path('checks/visual-review');out.mkdir(exist_ok=True)
for case in sorted(base.iterdir()):
    if not case.is_dir():continue
    source = Path('checks/spine-dark-reduced/dark-reduced') if case.name == 'dark-reduced' and Path('checks/spine-dark-reduced/dark-reduced/report.json').exists() else case
    files=sorted(source.glob('*.png'))
    if not files:continue
    phone='phone' in case.name
    cellw,cellh,cols=(390,870,2) if phone else (600,400,3)
    sheet=Image.new('RGB',(cellw*cols,cellh*math.ceil(len(files)/cols)),'#d9d8d0')
    draw=ImageDraw.Draw(sheet)
    for i,p in enumerate(files):
        im=Image.open(p);im.thumbnail((cellw,cellh-25))
        x=(i%cols)*cellw+(cellw-im.width)//2;y=(i//cols)*cellh+24
        sheet.paste(im,(x,y));draw.text(((i%cols)*cellw+8,(i//cols)*cellh+6),p.name,fill='#172321')
    sheet.save(out/f'{case.name}.jpg')
for look in ['light','dark']:
    files=sorted(Path('checks/spine-functional').glob(f'{look}-transition-*.png'))
    if not files:continue
    sheet=Image.new('RGB',(1800,400*math.ceil(len(files)/3)),'#d9d8d0');draw=ImageDraw.Draw(sheet)
    for i,p in enumerate(files):
        im=Image.open(p);im.thumbnail((600,375));x=i%3*600;y=i//3*400+24
        sheet.paste(im,(x,y));draw.text((x+8,y-18),p.name,fill='#172321')
    sheet.save(out/f'{look}-transitions.jpg')
print('Review sheets updated:',', '.join(p.name for p in out.glob('*.jpg')))
