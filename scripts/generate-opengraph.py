"""Generate static 1200×630 OpenGraph/Twitter PNGs and the apple icon.

Optional authoring utility. Requires Pillow: python -m pip install Pillow
Next.js itself does NOT depend on Python or Pillow; generated assets are committed.
No font files are distributed. Falls back to PIL's default font where necessary.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import math

ROOT = Path(__file__).resolve().parents[1]
S = 2
W, H = 1200 * S, 630 * S
INK = '#0A0A0A'
AMBER = '#FFB800'
WHITE = '#FAFAFA'
MUTED = '#B4AFAB'

def font(size, weight='bold'):
    name = 'Lato-Black.ttf' if weight == 'bold' else 'Lato-Medium.ttf'
    candidates = [
        '/usr/share/fonts/truetype/lato/' + name,
        'C:/Windows/Fonts/arialbd.ttf' if weight == 'bold' else 'C:/Windows/Fonts/arial.ttf',
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
    ]
    for path in candidates:
        try: return ImageFont.truetype(path, size * S)
        except OSError: pass
    return ImageFont.load_default()

def draw_og(path, chapter, line1, line2, descriptor):
    im = Image.new('RGB', (W, H), INK)
    d = ImageDraw.Draw(im, 'RGBA')
    # Architectural fine-grid: barely visible against the ink-black canvas.
    for x in range(0,W,100*S): d.line((x,0,x,H), fill=(255,255,255,7), width=S)
    for y in range(0,H,100*S): d.line((0,y,W,y), fill=(255,255,255,7), width=S)
    # Intentional restrained amber bloom, off-center so typography stays sharp.
    glow = Image.new('RGBA',(W,H),(0,0,0,0))
    gd=ImageDraw.Draw(glow, 'RGBA')
    gd.ellipse((660*S,40*S,1350*S,700*S),fill=(255,184,0,27))
    glow=glow.filter(ImageFilter.GaussianBlur(110*S))
    im=Image.alpha_composite(im.convert('RGBA'),glow)
    d=ImageDraw.Draw(im,'RGBA')
    # Diagonal cinematic bars / clapperboard silhouette on the right.
    d.rounded_rectangle((843*S,118*S,1149*S,433*S),radius=19*S,fill=(23,25,29,242),outline=(168,158,132,110),width=2*S)
    for y in (226,286,346):
        d.line((869*S,y*S,1123*S,y*S),fill=(120,121,123,90),width=2*S)
    d.polygon([(830*S,137*S),(1146*S,74*S),(1160*S,134*S),(844*S,197*S)],fill=(241,238,228,255))
    for i in range(7):
        x=830+i*48
        d.polygon([(x*S,(137-i*9)*S),((x+24)*S,(132-i*9)*S),((x+37)*S,(162-i*9)*S),((x+13)*S,(167-i*9)*S)],fill=(21,22,25,255))
    d.ellipse((826*S,177*S,846*S,197*S),fill=(255,184,0,255))
    # Half-arc and connector detail
    d.arc((794*S,67*S,1215*S,480*S),start=210,end=347,fill=(255,184,0,75),width=2*S)
    d.line((70*S,87*S,1130*S,87*S),fill=(255,255,255,35),width=S)
    d.line((70*S,549*S,1130*S,549*S),fill=(255,255,255,35),width=S)
    d.text((70*S,40*S),'KAVIARASU',font=font(26),fill=WHITE,stroke_width=0)
    # Custom small brand dot
    d.ellipse((245*S,63*S,254*S,72*S), fill=AMBER)
    d.text((70*S,158*S),f'{chapter.upper()}  /  VIDEO EDITOR & MOTION DESIGNER',font=font(14, 'medium'),fill=AMBER,spacing=5*S)
    # line widths controlled for balance; no text hidden behind film art
    d.text((66*S,223*S),line1,font=font(65),fill=WHITE,stroke_width=0)
    d.text((66*S,303*S),line2,font=font(65),fill=AMBER,stroke_width=0)
    d.text((70*S,452*S),descriptor,font=font(17,'medium'),fill=MUTED)
    d.text((70*S,568*S),'EDITING  /  SOUND  /  STORY  /  MOTION',font=font(13,'medium'),fill=(167,167,174,255))
    d.text((1080*S,568*S),'01 — 05',font=font(13,'medium'),fill=(167,167,174,255))
    path.parent.mkdir(parents=True,exist_ok=True)
    im.convert('RGB').resize((1200,630),Image.Resampling.LANCZOS).save(path,optimize=True)
    # All networks can share the same correctly sized image, with matching metadata files.
    (path.parent/'twitter-image.png').write_bytes(path.read_bytes())

pages=[
 ('app','HOME', 'CRAFTING STORIES', 'FRAME BY FRAME','Cinematic edits that make every second count.'),
 ('app/(marketing)/work','01 — WORK','THE ART OF','THE EDIT','Sample creative treatments & portfolio directions.'),
 ('app/(marketing)/about','02 — ABOUT','THE PERSON','BEHIND THE CUT','Story-first editing. 2+ years of hands-on craft.'),
 ('app/(marketing)/services','03 — SERVICES','EVERY FRAME','HAS A PURPOSE','Ads · Social · YouTube · Sound · Motion.'),
 ('app/(marketing)/contact','04 — CONTACT','LET’S MAKE','SOMETHING GREAT','Brands, agencies & creators — start the conversation.'),
]
for dirname,chapter,line1,line2,subtitle in pages:
    path=ROOT/dirname/'opengraph-image.png'
    draw_og(path,chapter,line1,line2,subtitle)
    print(path.relative_to(ROOT),path.stat().st_size)

icon=Image.new('RGBA',(180*3,180*3),'#0A0A0A')
d=ImageDraw.Draw(icon)
d.rounded_rectangle((0,0,540,540),radius=116,fill='#0A0A0A')
d.line([(140,106),(140,430)],fill=WHITE,width=56)
d.line([(171,277),(354,106)],fill=WHITE,width=56)
d.line([(171,277),(357,430)],fill=WHITE,width=56)
d.ellipse((387,388,464,465),fill=AMBER)
icon.resize((180,180),Image.Resampling.LANCZOS).save(ROOT/'app'/'apple-icon.png',optimize=True)
