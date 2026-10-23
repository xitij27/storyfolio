from pathlib import Path
root=Path(__file__).resolve().parents[1]/'public'
base='<svg xmlns="http://www.w3.org/2000/svg" width="720" height="400" viewBox="0 0 720 400"><rect width="720" height="400" rx="12" fill="#0b1917"/>'
for kind in ['library','database','complete']:
 svg=base
 for x,label,color in [(150,'Catalogue' if kind=='library' else 'Postgres 11','#587d71'),(570,'Nightly dump' if kind=='library' else 'Postgres 15','#acec9d')]:
  svg+=f'<path d="M{x-65} 170v100c0 30 130 30 130 0V170" fill="{color}"/><ellipse cx="{x}" cy="170" rx="65" ry="23" fill="{color}" stroke="#e8eee6" stroke-width="2"/><path d="M{x-65} 215c0 30 130 30 130 0M{x-65} 245c0 30 130 30 130 0" fill="none" stroke="#0b1917" opacity=".4" stroke-width="3"/><text x="{x-40 if x==150 else x+40}" y="350" text-anchor="middle" fill="#e8eee6" font-family="system-ui,sans-serif" font-size="17">{label}</text>'
 svg+='<path d="M150 277 Q150 360 360 360 Q570 360 570 277" fill="none" stroke="#ddba7a" stroke-width="4"/>'
 if kind=='library':
  svg+='<path d="M570 140 Q570 55 360 55 Q150 55 150 140" fill="none" stroke="#acec9d" stroke-width="4"/><text x="360" y="43" fill="#e8eee6" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17">Restore records from the nightly dump</text>'
  for i in range(8):svg+=f'<rect x="{273+(i%4)*43}" y="{180+(i//4)*33}" width="34" height="20" fill="{"#b56a54" if i==5 else "#acec9d"}"/>'
 else:
  svg+='<path d="M360 30v60M150 140V90h420v50" stroke="#acec9d" fill="none" stroke-width="4"/><text x="390" y="55" fill="#e8eee6" text-anchor="start" font-family="system-ui,sans-serif" font-size="16">Dual writes</text><path d="M220 200H500M220 220H500" stroke="#acbeb2" stroke-width="3"/><text x="360" y="180" fill="#e8eee6" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16">Compare checksums</text>'
 svg+='<text x="360" y="385" text-anchor="middle" fill="#ddba7a" font-family="system-ui,sans-serif" font-size="15">Way back retained · illustration</text></svg>'
 (root/'diagrams'/f'{kind}.svg').write_text(svg)
(root/'icon.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0b1917"/><path d="M12 19h16q5 0 5 6v13q0 6 6 6h13M33 25q0-6 6-6h13" stroke="#acec9d" stroke-width="5" fill="none"/><path d="M52 48q0 8-20 8T12 48V29" fill="none" stroke="#ddba7a" stroke-width="3"/></svg>''')
from PIL import Image, ImageDraw, ImageFont
im=Image.new('RGB',(1200,630),'#0b1917');d=ImageDraw.Draw(im)
fontpath='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
font=lambda n:ImageFont.truetype(fontpath,n)
d.text((65,65),'DAWIT BEKELE',font=font(22),fill='#acec9d')
d.text((60,180),'Migrations.\nReliability.\nA way back.',font=font(64),fill='#e8eee6',spacing=6)
d.text((65,555),'Migration planning · database cutovers · rollbacks',font=font(21),fill='#acbeb2')
d.line([(710,230),(710,170),(1050,170),(1050,230)],fill='#acec9d',width=6)
for x in [710,1050]:
 d.rounded_rectangle((x-65,240,x+65,375),radius=24,fill='#34564b' if x==710 else '#91c986')
 d.ellipse((x-65,226,x+65,270),fill='#547a68' if x==710 else '#acec9d')
 d.arc((x-65,280,x+65,335),0,180,fill='#0b1917',width=4)
d.line([(780,300),(980,300)],fill='#acbeb2',width=3)
d.arc((710,340,1050,500),0,180,fill='#ddba7a',width=5)
im.save(root/'share-preview.png')
