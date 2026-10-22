from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import xml.etree.ElementTree as ET
import re
root=Path(__file__).resolve().parents[1]
public=root/'public'
def icon(size):
    im=Image.new('RGB',(512,512),'#eee9dc');d=ImageDraw.Draw(im)
    d.rounded_rectangle((35,35,477,477),radius=70,fill='#283532')
    d.polygon([(83,153),(249,181),(249,385),(83,354)],fill='#b34e2c')
    d.polygon([(429,153),(263,181),(263,385),(429,354)],fill='#b34e2c')
    d.polygon([(98,132),(250,162),(250,355),(98,326)],fill='#f7f0df')
    d.polygon([(414,132),(262,162),(262,355),(414,326)],fill='#f7f0df')
    d.line([(256,166),(256,366)],fill='#da9a71',width=6)
    return im.resize((size,size),Image.Resampling.LANCZOS)
icon(32).save(public/'icon-32.png');icon(180).save(public/'apple-touch-icon.png')
icon(256).convert('RGBA').save(root/'app'/'favicon.ico',sizes=[(16,16),(32,32),(48,48),(64,64)])
(public/'icon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="70" fill="#283532"/><path d="M80 153l169 28v204L80 354zm352 0l-169 28v204l169-31z" fill="#b34e2c"/><path d="M98 132l152 30v193L98 326zm316 0l-152 30v193l152-29z" fill="#f7f0df"/><path d="M256 166v200" stroke="#da9a71" stroke-width="6"/></svg>')
# Rasterize only our own simple SVG polygons/lines locally, with Pillow.
source=ET.parse(public/'illustrations'/'library.svg').getroot()
art=Image.new('RGBA',(1440,1000),(0,0,0,0));draw=ImageDraw.Draw(art)
for element in source:
    tag=element.tag.rsplit('}',1)[-1]
    if tag=='polygon':
        coords=[float(n)*2 for n in re.findall(r'-?[\d.]+',element.attrib['points'])]
        points=list(zip(coords[::2],coords[1::2]));draw.polygon(points,fill=element.attrib['fill']);draw.line(points+[points[0]],fill=element.attrib.get('stroke','#a69e85'),width=2)
    elif tag=='path':
        coords=[float(n)*2 for n in re.findall(r'-?[\d.]+',element.attrib['d'])]
        draw.line(list(zip(coords[::2],coords[1::2])),fill=element.attrib.get('stroke','#a34326'),width=max(2,round(float(element.attrib.get('stroke-width','2'))*2)))
poster=Image.new('RGB',(1200,630),'#eee9dc');p=ImageDraw.Draw(poster)
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
mono='/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'
p.line((65,62,1135,62),fill='#b9bcad',width=1)
p.text((65,87),'DAWIT BEKELE / MIGRATION WORK',font=ImageFont.truetype(mono,14),fill='#a34326')
p.text((60,160),'Dawit',font=ImageFont.truetype(font,82),fill='#283532')
p.text((60,248),'Bekele.',font=ImageFont.truetype(font,82),fill='#283532')
p.text((65,397),'Runbooks. Cutover checklists.',font=ImageFont.truetype(font,22),fill='#283532')
p.text((65,434),'Rollback plans.',font=ImageFont.truetype(font,22),fill='#283532')
p.text((65,548),'ILLUSTRATION / THE OPEN RUNBOOK',font=ImageFont.truetype(mono,12),fill='#5c665c')
art=art.resize((650,451),Image.Resampling.LANCZOS);poster.paste(art,(520,125),art)
poster.save(public/'share-preview.png')
print('Own book icon, raster fallbacks and 1200×630 share preview generated locally.')
