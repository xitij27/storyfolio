from pathlib import Path
root=Path(__file__).resolve().parents[1]/'public'/'diagrams'
base='<svg xmlns="http://www.w3.org/2000/svg" width="720" height="400" viewBox="0 0 720 400"><rect width="720" height="400" rx="12" fill="#0b1917"/>'
def text(x,y,s,size=18,color='#e8eee6',anchor='middle'):
 return f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="system-ui,sans-serif" font-size="{size}" fill="{color}">{s}</text>'
def path(d,color='#acec9d',w=3):return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{w}"/>'
def circle(x,y,r=8,color='#acec9d'):return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{color}"/>'
def rect(x,y,w,h,color='#34564b'):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" fill="{color}"/>'
def db(x,y=180,color='#34564b',scale=1):
 return f'<g transform="translate({x} {y}) scale({scale})"><path d="M-52 0v83c0 24 104 24 104 0V0" fill="{color}"/><ellipse cy="0" rx="52" ry="19" fill="{color}" stroke="#acbeb2"/><path d="M-52 35c0 24 104 24 104 0M-52 60c0 24 104 24 104 0" fill="none" stroke="#0b1917" stroke-width="3"/></g>'
def save(name,s): (root/f'{name}.svg').write_text(base+s+text(360,382,'Original illustration',13,'#acbeb2')+'</svg>')
s='<path d="M155 170l85-15 90 40 35 80-60 70-35-60-70-25zM150 100l75-40 70 20 55 60-70 20-45-25-45 10z" fill="#34564b"/>'
s+=path('M330 245Q300 170 220 105')+circle(330,245)+circle(220,105)+text(435,270,'Addis Ababa')+text(195,75,'Amsterdam · 2016')
s+=path('M230 105H490Q520 105 530 140','#acbeb2',1)+f'<circle cx="560" cy="200" r="70" fill="none" stroke="#acbeb2"/>'+path('M530 165Q600 195 550 240')+circle(530,165)+circle(550,240)+text(540,300,'Rotterdam · 2020')
save('places',s)
s=text(360,50,'One sample every second',24)+rect(95,155,115,80)+text(145,125,'Feeder input',17)+path('M210 195H260v-40h40v40h40v-40h40v40h50')
s+='<path d="M465 95h115l30 30v180H465z" fill="#34564b"/>'
for x in [480,503,526,549,572]:s+=rect(x,130,12,35,'#ddba7a')
s+=text(535,340,'SD card',20)+text(145,270,'Logger',18)
save('logger',s)
s=db(140)+db(360,200,'#34564b',.7)+db(580,180,'#acec9d')+path('M140 150Q360 70 580 150')+path('M360 170V110H580v40','#acbeb2',2)+text(140,330,'Catalogue')+text(360,330,'Recovery')+text(580,330,'Replica')+text(360,50,'Recovery and a replica',24)
save('replica',s)
s=rect(70,100,100,65)+rect(70,245,100,65)+f'<polygon points="590,150 650,180 650,250 590,280 530,250 530,180" fill="#acec9d"/>'
for i in range(14):
 y=90+i*16;s+=path(f'M170 {132 if i%2 else 277}C300 {y} 410 {y} 540 215', '#acec9d' if i%2 else '#acbeb2',2)
s+=text(360,45,'Fourteen waves · two sites to one destination',23)+text(120,350,'Source sites',17)+text(590,325,'Destination',17)
save('waves',s)
s=text(360,45,'Dependencies, checks and a return route',23)
for y in [110,190,270]:s+=circle(100,y,15,'#34564b')+path(f'M115 {y}H210L340 190','#acbeb2',2)
s+=f'<circle cx="365" cy="190" r="25" fill="none" stroke="#acec9d" stroke-width="4"/>'+path('M390 190H535')+db(590,155,'#acec9d')+path('M590 260Q590 345 350 345Q100 345 100 290','#ddba7a')
save('practice',s)
s=text(360,55,'Six stages · an exit check at each gate',24)+path('M50 200H670','#acbeb2',4)
for i in range(6):
 x=85+i*110;s+=f'<ellipse cx="{x}" cy="200" rx="20" ry="55" fill="none" stroke="#acec9d" stroke-width="4"/>'+circle(x,115,7)+text(x,295,str(i+1),25)
save('runbook',s)
s=text(360,55,'85 → 22 pages per week',29)+text(360,88,'Team of nine · over about a year',18,'#acbeb2')
for y in [150,185,220,255,290]:s+=rect(80,y-10,20,20,'#657c70')+path(f'M110 {y}H250L400 220','#657c70',2)+path(f'M210 {y-7}l14 14M224 {y-7}l-14 14','#ddba7a',3)
for y in [170,270]:s+=circle(370,y,9)+path(f'M380 {y}H480L570 220')
s+=rect(575,170,65,100)+rect(590,190,35,48,'#acec9d')
save('oncall',s)
s=text(360,50,'Checks before the write-target switch',25)+db(140)+db(580,180,'#acec9d')+path('M140 150L290 130M430 130L580 150','#acbeb2')+circle(360,140,15)+path('M320 105L360 140L400 175','#acec9d',7)+path('M140 280Q360 365 580 280','#ddba7a')
s+=text(115,345,'Old target',18)+text(605,345,'New target',18)+text(360,260,'Lag + checksum parity',18)
save('ferry',s)
s=text(360,50,'Boring Migrations · SRE North 2024',26)+db(150,190,'#34564b',.7)+path('M95 180Q80 90 220 100Q280 110 250 180')
for i in range(8):s+=rect(260+i%4*28,160+i//4*25,22,15,'#b56a54' if i==5 else '#acec9d')
s+=path('M400 210H655','#acbeb2',3)
for i in range(6):s+=f'<ellipse cx="{420+i*43}" cy="210" rx="10" ry="30" fill="none" stroke="#acec9d" stroke-width="3"/>'
s+=text(210,310,'Catalogue recovery',19)+text(530,310,'Checked migration',19)+text(360,350,'Runbook · rehearsed rollback · exit checks',17,'#acbeb2')
save('talk',s)
