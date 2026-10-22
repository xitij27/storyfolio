from PIL import Image,ImageDraw
from pathlib import Path
import math
base=Path('checks/chapters-final');out=Path('checks/chapter-review');out.mkdir(exist_ok=True)
def sheet(files,target,phone=False):
    cw,ch,cols=(390,870,2) if phone else (600,400,3)
    im=Image.new('RGB',(cw*cols,ch*math.ceil(len(files)/cols)),'#d9d8d0');draw=ImageDraw.Draw(im)
    for i,p in enumerate(files):
        pic=Image.open(p);pic.thumbnail((cw,ch-24));x=i%cols*cw+(cw-pic.width)//2;y=i//cols*ch+24
        im.paste(pic,(x,y));draw.text((i%cols*cw+7,i//cols*ch+6),p.name,fill='#172321')
    im.save(out/target)
for case in base.iterdir():
    if not case.is_dir():continue
    files=sorted(case.glob('*.png'))
    for start in range(0,len(files),9 if 'phone' in case.name else 12):
        batch=files[start:start+(9 if 'phone' in case.name else 12)]
        sheet(batch,f'{case.name}-{start//(9 if "phone" in case.name else 12)}.jpg','phone' in case.name)
func=Path('checks/chapters-functional')
files=sorted(func.glob('work-*.png'))+[func/'database-enlarged.png']
if all(p.exists() for p in files):sheet(files,'work-pages.jpg')
for origin in ['chapters-transitions','chapters-transitions-back-early']:
    files=sorted(Path('checks',origin).glob('transition-*.png'))
    for start in range(0,len(files),9):sheet(files[start:start+9],f'{origin}-{start//9}.jpg')
print('Chapter review sheets generated.')
