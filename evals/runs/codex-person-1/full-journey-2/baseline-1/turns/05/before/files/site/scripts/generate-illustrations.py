from pathlib import Path
import math
root=Path(__file__).resolve().parents[1]/'public'/'illustrations'
root.mkdir(exist_ok=True)
# Own orthographic drawings of the same subjects, never employer diagrams.
def project(p):
    x,y,z=p
    return (360+(x-z)*77,330+(x+z)*29-y*76)
def poly(points,fill,stroke='#a69e85'):
    return '<polygon points="'+' '.join(f'{project(p)[0]:.1f},{project(p)[1]:.1f}' for p in points)+f'" fill="{fill}" stroke="{stroke}" stroke-width=".8" stroke-linejoin="round"/>'
def box(x,y,z,w,h,d,color):
    x0,x1=x-w/2,x+w/2;z0,z1=z-d/2,z+d/2;y0,y1=y,y+h
    return ''.join([poly([(x0,y0,z1),(x1,y0,z1),(x1,y1,z1),(x0,y1,z1)],color),poly([(x1,y0,z0),(x1,y0,z1),(x1,y1,z1),(x1,y1,z0)],color),poly([(x0,y1,z0),(x1,y1,z0),(x1,y1,z1),(x0,y1,z1)],color)])
def line(a,b,color='#a34326',width=2):
    a,b=project(a),project(b)
    return f'<path d="M{a[0]:.1f} {a[1]:.1f}L{b[0]:.1f} {b[1]:.1f}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/>'
def book():
    s=box(0,0,0,4.6,.12,3.15,'#b34e2c')
    for side in [-1,1]:
        for i in range(4):s+=box(side*1.12,.12+i*.028,0,2.15,.025,2.95,'#f7f0df')
    return s+line((0,.26,-1.45),(0,.26,1.45))
def write(name,shapes):
    (root/f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 500" width="720" height="500"><ellipse cx="368" cy="393" rx="264" ry="55" fill="#283532" opacity=".07"/>{shapes}</svg>')
s=book()+box(0,.25,-.5,2.25,1.3,.78,'#b9a17e')
for x in [-.74,0,.74]:
    for row in range(3):
        s+=box(x,.31+row*.4,-.08,.66,.31,.04,'#e0cfaa')
        s+=box(x,.44+row*.4,-.04,.2,.04,.035,'#34443c')
s+=box(1.4,.25,-.3,.15,.9,.65,'#b34e2c')+box(-.85,.3,.95,1.45,.04,.85,'#f7f0df')
for x in [-1.55,-1.08,-.62,-.15]:s+=line((x,.35,.55),(x,.35,1.35),width=1)
for z in [.55,.82,1.08,1.35]:s+=line((-1.55,.35,z),(-.15,.35,z),width=1)
write('library',s)
s=book()+box(0,.26,0,2.8,.08,.5,'#acb59e')
for x,color in [(-1.4,'#738376'),(1.4,'#a34326')]:
    s+=box(x,.28,0,1,.1,.68,color)
    for side in [-1,1]:s+=box(x+side*.42,.36,0,.14,1.1,.18,color)
    s+=box(x,1.46,0,.98,.17,.18,color)
for z in [-.23,.23]:s+=line((-1.4,.39,z),(1.4,.39,z))
for i in range(5):s+=box(-.95+i*.46,.43+i*.04,0,.22,.08,.2,'#a34326')
s+=line((-1.1,.37,.9),(1.1,.37,.9))+line((-.86,.37,.72),(-1.1,.37,.9))+line((-.86,.37,1.08),(-1.1,.37,.9))
write('migration',s)
s=box(0,.08,0,2.35,.3,3.15,'#b34e2c')+box(0,.2,0,2.2,.14,2.95,'#f7f0df')+box(0,.34,0,2.35,.07,3.15,'#b34e2c')
s+=box(.4,.51,-.7,1.05,.025,1.45,'#f7f0df')
for z in [-1.18,-.97,-.8,-.63,-.46]:s+=line((.03,.55,z),(.77,.55,z),'#68745f',1)
s+=box(-.35,.63,.48,1.7,.03,1.1,'#f7f0df')+line((-1.2,.67,-.07),(-.35,.67,.65))+line((.5,.67,-.07),(-.35,.67,.65))
s+=box(-.35,.69,.48,.24,.025,.24,'#a34326')
write('contact',s)
print('Three own-geometry static illustrations generated.')
