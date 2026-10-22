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
# The chapter subjects, all locally drawn.
write('blank',book())
def document(x,y,z,accent='#a34326',check=False):
    s=box(x,y,z,1.1,.035,1.5,'#f7f0df')
    s+=line((x-.34,y+.05,z-.48),(x+.28,y+.05,z-.48),accent,3)
    for dz in [-.18,.06,.3,.51]:
        s+=line((x-.3,y+.05,z+dz),(x+.38,y+.05,z+dz),'#78816d',1)
        if check:s+=line((x-.43,y+.05,z+dz),(x-.39,y+.05,z+dz+.035),accent,1.5)+line((x-.39,y+.05,z+dz+.035),(x-.33,y+.05,z+dz-.04),accent,1.5)
    return s
def smallbook(x,y,z,accent='#a34326'):
    return box(x,y,z,1.02,.12,1.42,accent)+box(x+.015,y+.12,z,.94,.12,1.3,'#eee3c8')+box(x,y+.24,z,1.02,.04,1.42,accent)+line((x-.35,y+.3,z-.25),(x+.23,y+.3,z-.25),'#f7f0df',2)
s=book()
for i,x in enumerate([-1.3,0,1.3]):
    s+=box(x,.3+i*.1,0,1.4,.035,1.5,'#f7f0df')+line((x-.7,.36+i*.1,0),(x+.7,.36+i*.1,0))
    s+=line((x,.4+i*.1,-.25),(x,1.15+i*.1,-.25),'#526f62')+box(x+.2,1.05+i*.1,-.25,.4,.2,.035,'#a34326')
write('places',s)
stand=box(0,.3,0,2.6,.13,1.6,'#b7a17e')+box(-.95,.22,-.3,.12,.3,.6,'#a9926e')+box(.95,.22,-.3,.12,.3,.6,'#a9926e')
s=book()+stand+document(0,.46,0)
seal=[(.26+.11*math.cos(i*math.pi/12),.52,.36+.11*math.sin(i*math.pi/12)) for i in range(24)]
s+=poly(seal,'#a34326')
write('study',s)
write('documents',book()+document(-1.25,.32,0)+document(0,.37,-.28,check=True)+document(1.25,.32,.16))
write('reading',book()+stand+smallbook(-.65,.46,0)+smallbook(.65,.46,0,'#526f62'))
write('runbook',book()+smallbook(-.7,.3,0)+document(.9,.34,.2))
def cylinder(x,y,z,r,h,color,cut=False):
    angles=[i*(math.pi*1.55 if cut else math.pi*2)/40 for i in range(41)]
    faces=[]
    for a,b in zip(angles,angles[1:]):
        pts=[(x+r*math.cos(a),y,z+r*math.sin(a)),(x+r*math.cos(b),y,z+r*math.sin(b)),(x+r*math.cos(b),y+h,z+r*math.sin(b)),(x+r*math.cos(a),y+h,z+r*math.sin(a))]
        faces.append((sum(p[0]+p[2] for p in pts),poly(pts,color)))
    return ''.join(s for _,s in sorted(faces))+poly([(x+r*math.cos(a),y+h,z+r*math.sin(a)) for a in angles],color)
def db(x,y,z,cut=False):
    s=''
    for i in range(3):s+=cylinder(x,y+i*.4,z,.62,.32,'#a34326' if i==2 else '#b6c1ab',cut)
    return s
write('database',book()+db(-.95,.3,0,True)+db(.95,.3,0))
write('database-cutaway',book()+db(0,.3,0,True))
s=book()+box(-.2,.35,.4,2.3,.07,1.05,'#d6cbae')+box(-.2,.4,-.15,2.15,1.4,.09,'#354d42')+box(-.2,.51,-.09,1.94,1.18,.02,'#21362c')
s+=line((-.86,1.48,-.06),(-.66,1.35,-.06),'#da9a71',3)+line((-.66,1.35,-.06),(-.86,1.22,-.06),'#da9a71',3)+line((-.5,1.24,-.06),(-.25,1.24,-.06),'#f7f0df',2)
s+=box(1.45,.33,.2,.5,.08,.7,'#78816d')+line((1.45,.42,.2),(1.45,.95,.2),'#a34326',4)+box(1.45,.95,.2,.28,.09,.15,'#a34326')
write('ferry',s)
s=book()+box(0,.28,.05,1.25,.12,1,'#a34326')+box(0,.4,0,.7,1.2,.48,'#b6a17e')+box(0,1.6,0,1.6,.1,1.05,'#a34326')+document(0,1.73,0)
s+=line((.63,1.7,-.28),(.63,2.25,-.32),'#354d42',3)+line((.63,2.25,-.32),(.3,2.37,-.08),'#354d42',4)
write('talk',s)
s=book()+document(-1,.3,.35,check=True)
# Bell with an open skirt and a clapper; tags are illustrative, not counts.
s+=cylinder(.55,.72,-.25,.5,.7,'#a34326')+poly([(.55+.55*math.cos(i*math.pi/16),.7,-.25+.55*math.sin(i*math.pi/16)) for i in range(32)],'#a34326')+line((.55,.55,-.25),(.55,.8,-.25),'#354d42',4)
for x,z in [(.3,-.9),(.85,-.9),(.3,.9),(.85,.9)]:s+=box(x,.3,z,.42,.025,.32,'#a34326')
write('oncall',s)
# Explicit control states for the local detail-page miniature.
for state,destination in [('migration-forward',1.35),('migration-return',-1.35)]:
    s=book()+box(0,.26,0,2.8,.08,.5,'#acb59e')
    for x,color in [(-1.4,'#738376'),(1.4,'#a34326')]:
        s+=box(x,.28,0,1,.1,.68,color)
        for side in [-1,1]:s+=box(x+side*.42,.36,0,.14,1.1,.18,color)
        s+=box(x,1.46,0,.98,.17,.18,color)
    for i in range(5):s+=box(destination,.43+i*.08,0,.22,.08,.2,'#a34326')
    s+=line((-1.1,.37,.9),(1.1,.37,.9))
    end=1.1 if destination>0 else -1.1;tail=end-.25 if end>0 else end+.25
    s+=line((tail,.37,.72),(end,.37,.9))+line((tail,.37,1.08),(end,.37,.9))
    write(state,s)
print('All chapter and work-detail illustrations generated.')
