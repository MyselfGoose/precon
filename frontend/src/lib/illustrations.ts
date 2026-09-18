/* eslint-disable */
// @ts-nocheck
export const C = { navy:'#2B1F1F', line:'#8B2635', copper:'#8B2635', mark:'#F5F0E6', paper:'#FAF7F2', grid:'#E0D6CC', ink:'#2B1F1F', earth:'#8C7A5B', steel:'#2F4A63', wood:'#C99A5B', white:'#FFFFFF' };
let _uid = 0;
function defs(id){
  return `<defs>
    <pattern id="grid${id}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="${C.grid}" stroke-width="1"/></pattern>
    <pattern id="earth${id}" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 5H10" stroke="#9C8A6A" stroke-width="1.2"/></pattern>
    <pattern id="conc${id}" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r="1.1" fill="#7F92A6"/><path d="M8 10l2-3 2 3z" fill="#7F92A6"/><circle cx="11" cy="3" r=".8" fill="#7F92A6"/></pattern>
    <pattern id="grav${id}" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2" fill="none" stroke="#8FA1B3" stroke-width="1"/><circle cx="9" cy="8" r="1.6" fill="none" stroke="#8FA1B3" stroke-width="1"/></pattern>
    <pattern id="ins${id}" width="16" height="10" patternUnits="userSpaceOnUse"><path d="M0 5 Q4 0 8 5 T16 5" fill="none" stroke="#B87E4A" stroke-width="1.2"/></pattern>
    <pattern id="rigid${id}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><path d="M0 4H8" stroke="#B87E4A" stroke-width="1"/></pattern>
    <pattern id="cmu${id}" width="40" height="20" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="#DDE6EE"/><path d="M0 0H40V20H0z" fill="none" stroke="${C.navy}" stroke-width="1"/><path d="M20 0V20" stroke="${C.navy}" stroke-width="1" opacity=".0"/></pattern>
    <pattern id="brick${id}" width="24" height="12" patternUnits="userSpaceOnUse"><rect width="24" height="12" fill="#C97B57"/><path d="M0 6H24M12 0V6M0 6V12M24 6V12" stroke="#EEF3F8" stroke-width="1.2"/></pattern>
    <pattern id="wood${id}" width="30" height="6" patternUnits="userSpaceOnUse"><rect width="30" height="6" fill="#E0BE8C"/><path d="M0 3 Q15 1 30 3" fill="none" stroke="#B88A55" stroke-width=".8"/></pattern>
    <pattern id="asph${id}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#B7C3CE"/><circle cx="2" cy="2" r=".7" fill="#7A8A99"/><circle cx="6" cy="5" r=".7" fill="#7A8A99"/></pattern>
    <pattern id="land${id}" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#DCE9D5"/><path d="M2 10 L4 6 L6 10 M7 8 L9 4 L11 8" fill="none" stroke="#6E9A5E" stroke-width="1"/></pattern>
    <marker id="arr${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.copper}"/></marker>
  </defs>`;
}
function paper(w,h,id){ return `<rect width="${w}" height="${h}" fill="${C.paper}"/><rect width="${w}" height="${h}" fill="url(#grid${id})"/>`; }
function t(x,y,s,o={}){ const a=o.a||'start', f=o.f||9.5, c=o.c||C.navy, w=o.w||500, r=o.r?` transform="rotate(${o.r} ${x} ${y})"`:''; return `<text x="${x}" y="${y}" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="${f}" font-weight="${w}" fill="${c}" text-anchor="${a}" letter-spacing=".04em"${r}>${s}</text>`; }
function dimH(x1,x2,y,label,o={}){ const c=C.copper; return `<g stroke="${c}" stroke-width="1"><path d="M${x1} ${y}H${x2}"/><path d="M${x1} ${y-5}V${y+5}M${x2} ${y-5}V${y+5}"/><path d="M${x1-3} ${y+3}l6-6M${x2-3} ${y+3}l6-6"/></g>${t((x1+x2)/2,(o.below?y+12:y-5),label,{a:'middle',c:c,f:o.f||9})}`; }
function dimV(x,y1,y2,label,o={}){ const c=C.copper; return `<g stroke="${c}" stroke-width="1"><path d="M${x} ${y1}V${y2}"/><path d="M${x-5} ${y1}H${x+5}M${x-5} ${y2}H${x+5}"/><path d="M${x-3} ${y1+3}l6-6M${x-3} ${y2+3}l6-6"/></g>${t(o.right?x+7:x-6,(y1+y2)/2,label,{a:'middle',c:c,f:o.f||9,r:o.right?90:-90})}`; }
function leader(x1,y1,x2,y2,id){ return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${C.copper}" stroke-width="1" fill="none" marker-end="url(#arr${id})"/>`; }
function tag(x,y,s,o={}){ const w=(o.w||s.length*6.6+16); const h=18; return `<g><rect x="${x}" y="${y-13}" width="${w}" height="${h}" rx="2" fill="${C.white}" stroke="${C.navy}" stroke-width="1"/>${t(x+8,y,s,{f:9,w:600,c:C.navy})}</g>`; }
function title(w,h,s,id){ return `<rect x="0" y="${h-22}" width="${w}" height="22" fill="${C.white}" stroke="${C.grid}"/>${t(10,h-8,s,{f:8.5,c:C.ink,w:600})}${t(w-10,h-8,'NOT TO SCALE',{f:8,c:'#7A8A99',a:'end'})}`; }
function svg(w,h,inner,cls){ return `<svg viewBox="0 0 ${w} ${h}" role="img" ${cls?`class="${cls}"`:''} xmlns="http://www.w3.org/2000/svg">${inner}</svg>`; }
function hl(x,y,w,h){ return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.mark}" opacity=".55"/>`; }

/* ---- HERO: isometric warehouse shell with takeoff callouts ---- */
export function heroArt(){
  const id=++_uid, W=680, H=440;
  const x0=350, y0=118;           // back corner of slab top plane
  const U=300, V=220, T=14, HC=120;
  const top=(u,v)=>[x0+u-v, y0+(u+v)/2];
  const poly=(pts,fill,stroke,sw=1.5,extra='')=>`<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;
  let s='';
  s+=`<rect width="${W}" height="${H}" fill="${C.paper}"/><rect width="${W}" height="${H}" fill="url(#grid${id})"/>`;
  // footings (dashed, below grade)
  const cols=[]; for(let i=0;i<=3;i++)for(let j=0;j<=2;j++)cols.push([i*100,j*110]);
  cols.sort((a,b)=>(a[0]+a[1])-(b[0]+b[1]));
  cols.forEach(([u,v])=>{const p=[top(u-14,v-14),top(u+14,v-14),top(u+14,v+14),top(u-14,v+14)].map(q=>[q[0],q[1]+T+22]); s+=poly(p,'none',C.line,1,'stroke-dasharray="3 3"');});
  // slab faces
  const A=[top(0,V),top(U,V),[top(U,V)[0],top(U,V)[1]+T],[top(0,V)[0],top(0,V)[1]+T]];
  const B=[top(U,0),top(U,V),[top(U,V)[0],top(U,V)[1]+T],[top(U,0)[0],top(U,0)[1]+T]];
  s+=poly(A,'#C9D6E2',C.navy,1.5)+poly(B,'#B3C3D2',C.navy,1.5);
  s+=poly([top(0,0),top(U,0),top(U,V),top(0,V)],'#E6EDF3',C.navy,1.5);
  // highlighted bay
  s+=poly([top(100,110),top(200,110),top(200,220),top(100,220)],C.mark,'none',0,'opacity=".6"');
  // grid lines on slab
  for(let i=0;i<=3;i++){const a=top(i*100,0),b=top(i*100,V);s+=`<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="${C.line}" stroke-width=".8" stroke-dasharray="4 3"/>`;}
  for(let j=0;j<=2;j++){const a=top(0,j*110),b=top(U,j*110);s+=`<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="${C.line}" stroke-width=".8" stroke-dasharray="4 3"/>`;}
  // control joints
  for(let i=1;i<6;i++){const a=top(i*50,0),b=top(i*50,V);s+=`<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="${C.navy}" stroke-width=".5"/>`;}
  // roof plane (behind columns partially) - draw joists
  const R=(u,v)=>{const p=top(u,v);return [p[0],p[1]-HC];};
  s+=poly([R(0,0),R(U,0),R(U,V),R(0,V)],'rgba(255,255,255,.55)',C.navy,1.5);
  for(let k=1;k<12;k++){const a=R(k*25,0),b=R(k*25,V);s+=`<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="${C.steel}" stroke-width="1"/>`;}
  for(let j=0;j<=2;j++){const a=R(0,j*110),b=R(U,j*110);s+=`<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="${C.steel}" stroke-width="2.4"/>`;}
  // columns
  cols.forEach(([u,v])=>{const p=top(u,v);s+=`<path d="M${p[0]-3} ${p[1]}V${p[1]-HC}M${p[0]+3} ${p[1]}V${p[1]-HC}" stroke="${C.steel}" stroke-width="2"/><path d="M${p[0]-7} ${p[1]-HC}H${p[0]+7}M${p[0]-7} ${p[1]}H${p[0]+7}" stroke="${C.steel}" stroke-width="2"/>`;});
  // front edge dimension
  const f1=top(0,V), f2=top(U,V);
  s+=`<g stroke="${C.copper}" stroke-width="1"><path d="M${f1[0]-14} ${f1[1]+T+14}L${f2[0]-14} ${f2[1]+T+14}"/></g>`;
  s+=t((f1[0]+f2[0])/2-14,(f1[1]+f2[1])/2+T+34,"300'-0\"",{c:C.copper,a:'middle',f:10,r:26.5});
  const g1=top(U,0), g2=top(U,V);
  s+=`<path d="M${g1[0]+16} ${g1[1]+T+8}L${g2[0]+16} ${g2[1]+T+8}" stroke="${C.copper}" stroke-width="1"/>`;
  s+=t((g1[0]+g2[0])/2+30,(g1[1]+g2[1])/2+T+12,"220'-0\"",{c:C.copper,a:'middle',f:10,r:-26.5});
  // callouts
  const c1=top(150,165); s+=leader(96,74,c1[0]-6,c1[1]-4,id)+tag(20,72,'SLAB ON GRADE 5" — 66,000 SF',{w:196});
  const c2=R(75,55); s+=leader(96,30,c2[0]-4,c2[1]+4,id)+tag(20,28,'24K7 JOISTS @ 5\'-0" — 132 EA',{w:196});
  const c3=top(300,0); s+=leader(600,60,c3[0]+3,c3[1]-60,id)+tag(492,58,'W10×33 COL — 12 EA',{w:140});
  const c4=top(300,220); s+=leader(620,300,c4[0]+8,c4[1]+T+20,id)+tag(510,298,'CONT. FTG — 1,040 LF',{w:150});
  s+=t(18,H-14,'SHEET S-201 · STRUCTURAL FRAMING · ISOMETRIC · TAKEOFF MARKUP',{f:8.5,c:'#5F7386'});
  return svg(W,H,defs(id)+s);
}

/* ---- TRADE DRAWINGS (480 × 320) ---- */
export const D: Record<string, () => string> = {};
D.concrete = () => { const id=++_uid, W=480, H=320; let s=paper(W,H,id);
  s+=`<rect x="0" y="150" width="220" height="150" fill="url(#earth${id})"/><rect x="220" y="205" width="260" height="95" fill="url(#earth${id})"/>`;
  s+=`<rect x="220" y="175" width="260" height="30" fill="url(#grav${id})"/>`;
  s+=`<path d="M220 175H480" stroke="${C.ink}" stroke-width="2" stroke-dasharray="6 3"/>`;
  s+=hl(150,235,180,45)+hl(215,80,50,155)+hl(265,150,215,25);
  s+=`<rect x="150" y="235" width="180" height="45" fill="url(#conc${id})" stroke="${C.navy}" stroke-width="2"/>`;
  s+=`<rect x="215" y="80" width="50" height="155" fill="url(#conc${id})" stroke="${C.navy}" stroke-width="2"/>`;
  s+=`<rect x="265" y="150" width="215" height="25" fill="url(#conc${id})" stroke="${C.navy}" stroke-width="2"/>`;
  s+=`<path d="M0 150H215" stroke="${C.ink}" stroke-width="1.6"/>`;
  [170,240,310].forEach(x=>s+=`<circle cx="${x}" cy="262" r="3" fill="${C.ink}"/>`);
  s+=`<path d="M230 85V270M250 85V270" stroke="${C.ink}" stroke-width="1.5" stroke-dasharray="7 4"/>`;
  s+=`<path d="M225 100H255M225 130H255M225 160H255M225 190H255M225 220H255" stroke="${C.ink}" stroke-width="1"/>`;
  s+=`<path d="M270 162H478" stroke="${C.ink}" stroke-width="1.2" stroke-dasharray="3 3"/>`;
  s+=`<path d="M255 150V80" stroke="${C.ink}" stroke-width="1"/>`;
  s+=`<rect x="200" y="215" width="15" height="20" fill="${C.paper}" stroke="${C.navy}" stroke-width="1"/>`;
  s+=dimH(150,330,224,'2\'-0"')+dimV(140,235,280,'1\'-0"')+dimV(300,150,175,'5"',{right:true})+dimH(215,265,66,'8"');
  s+=leader(320,110,340,160,id)+tag(320,110,'SLAB ON GRADE 4,000 PSI',{w:150});
  s+=leader(340,132,330,168,id)+tag(340,132,'6×6 W2.9×W2.9 WWF',{w:130});
  s+=leader(70,300,168,262,id)+tag(10,284,'(3) #5 CONT.',{w:90});
  s+=leader(120,110,229,120,id)+tag(20,110,'#5 @ 12" O.C. VERT.',{w:120});
  s+=leader(350,195,330,190,id)+tag(350,195,'4" GRANULAR BASE',{w:120});
  s+=leader(325,240,352,206,id)+tag(325,240,'10 MIL VAPOR RETARDER',{w:145});
  s+=title(W,H,'DETAIL 3 / S-501 — TYPICAL WALL FOOTING & SLAB EDGE',id);
  return svg(W,H,defs(id)+s); };

D.masonry = () => { const id=++_uid, W=480, H=320; let s=paper(W,H,id);
  const x0=40,y0=48,bw=40,bh=20,cols=9,rows=11;
  for(let r=0;r<rows;r++){const off=(r%2)?bw/2:0;for(let c=-1;c<=cols;c++){const x=x0+c*bw+off;if(x+bw<x0||x>x0+cols*bw)continue;const cx=Math.max(x,x0),cw=Math.min(x+bw,x0+cols*bw)-cx;const grouted=((r%2===0)&&((c%2)===0))||((r%2===1)&&((c%2)===1));const bond=(r===3||r===10);
    s+=`<rect x="${cx}" y="${y0+r*bh}" width="${cw}" height="${bh}" fill="${bond?C.mark:(grouted?'#C6D3DF':'#DDE6EE')}" stroke="${C.navy}" stroke-width="1"/>`;}}
  // opening
  s+=`<rect x="200" y="128" width="120" height="100" fill="${C.paper}" stroke="${C.navy}" stroke-width="1.5"/><path d="M200 128L320 228M320 128L200 228" stroke="${C.line}" stroke-width=".8"/>`;
  s+=`<rect x="192" y="108" width="136" height="20" fill="${C.steel}" opacity=".85"/>`;
  // vertical bars in grouted cells
  [60,140,380].forEach(x=>s+=`<path d="M${x} ${y0}V${y0+rows*bh}" stroke="${C.ink}" stroke-width="1.6" stroke-dasharray="6 3"/>`);
  // ladder reinf
  [y0+2*bh,y0+6*bh,y0+8*bh].forEach(y=>s+=`<path d="M${x0} ${y}H${x0+cols*bw}" stroke="${C.copper}" stroke-width="1.2" stroke-dasharray="2 2"/>`);
  // control joint
  s+=`<path d="M${x0+cols*bw-bw} ${y0}V${y0+rows*bh}" stroke="${C.ink}" stroke-width="2"/>`;
  s+=`<path d="M${x0} ${y0+rows*bh}H${x0+cols*bw+20}" stroke="${C.ink}" stroke-width="2"/>`;
  s+=dimV(x0+cols*bw+12,y0,y0+rows*bh,"7'-4\"",{right:true})+dimH(x0,x0+2*bw,y0-10,'32" O.C.');
  s+=tag(300,62,'BOND BEAM W/ (2) #5',{w:130})+leader(300,58,260,y0+3*bh+10,id);
  s+=tag(300,262,'#5 VERT. @ 32" O.C.',{w:126})+leader(300,258,380,240,id);
  s+=tag(20,262,'9 GA LADDER @ 16"',{w:118})+leader(80,258,x0+40,y0+8*bh,id);
  s+=tag(20,284,'CONTROL JOINT',{w:95})+leader(115,280,x0+cols*bw-bw,y0+rows*bh-10,id);
  s+=tag(320,284,'STEEL LINTEL L6×4×3/8',{w:140})+leader(320,280,300,118,id);
  s+=title(W,H,'ELEVATION 2 / A-402 — 8" CMU BEARING WALL, RUNNING BOND',id);
  return svg(W,H,defs(id)+s); };

D.metals = () => { const id=++_uid, W=480, H=320; let s=paper(W,H,id);
  const gy=262;
  s+=`<rect x="0" y="${gy}" width="${W}" height="60" fill="url(#earth${id})"/><path d="M0 ${gy}H${W}" stroke="${C.ink}" stroke-width="1.6"/>`;
  // piers
  [90,390].forEach(x=>s+=`<rect x="${x-22}" y="${gy-30}" width="44" height="30" fill="url(#conc${id})" stroke="${C.navy}" stroke-width="1.5"/><rect x="${x-16}" y="${gy-34}" width="32" height="5" fill="${C.steel}"/>`);
  // columns (W shape elevation)
  [90,390].forEach(x=>s+=`<rect x="${x-7}" y="70" width="14" height="${gy-34-70}" fill="${C.steel}"/><path d="M${x-2} 70V${gy-34}M${x+2} 70V${gy-34}" stroke="#DDE6EE" stroke-width="1"/>`);
  // beam
  s+=`<rect x="83" y="62" width="314" height="14" fill="${C.steel}"/><path d="M83 69H397" stroke="#DDE6EE" stroke-width="1.2"/>`;
  // joists (top chord at beam top)
  for(let i=0;i<6;i++){const x=110+i*52;s+=`<path d="M${x} 62L${x+26} 42L${x+52} 62" fill="none" stroke="${C.steel}" stroke-width="1.6"/>`;}
  s+=`<path d="M110 42H370" stroke="${C.steel}" stroke-width="2.2"/><path d="M110 62H370" stroke="${C.steel}" stroke-width="1"/>`;
  // deck (corrugated)
  let deck='M100 42'; for(let x=100;x<380;x+=12) deck+=`l6 -8 l6 8`; s+=`<path d="${deck}" fill="none" stroke="${C.navy}" stroke-width="1.8"/>`;
  s+=hl(83,34,314,42);
  // bracing
  s+=`<path d="M97 78L383 ${gy-40}M383 78L97 ${gy-40}" stroke="${C.line}" stroke-width="1" stroke-dasharray="6 4"/>`;
  s+=dimH(90,390,300,"30'-0\" BAY",{below:true})+dimV(418,42,gy,"22'-0\" B.O. DECK",{right:true});
  s+=tag(150,120,'W16×31 BEAM',{w:95})+leader(150,116,200,70,id);
  s+=tag(150,148,'24K7 JOISTS @ 5\'-0"',{w:130})+leader(150,144,215,50,id);
  s+=tag(150,176,'1½" TYPE B DECK 20 GA',{w:145})+leader(150,172,240,38,id);
  s+=tag(200,225,'W10×33 COLUMN',{w:100})+leader(200,221,97,180,id);
  s+=tag(200,250,'BP 12×12×¾" (4) ¾"Ø A.B.',{w:160})+leader(360,246,385,gy-36,id);
  s+=tag(300,120,'L3×3×¼ X-BRACING',{w:120})+leader(300,116,290,150,id);
  s+=title(W,H,'FRAMING ELEVATION 4 / S-301 — TYPICAL BAY',id);
  return svg(W,H,defs(id)+s); };

D.wood = () => { const id=++_uid, W=480, H=320; let s=paper(W,H,id);
  const x0=40,x1=440,yb=262,yt=52;
  s+=`<rect x="${x0}" y="${yb}" width="${x1-x0}" height="8" fill="url(#wood${id})" stroke="${C.navy}"/>`;
  s+=`<rect x="${x0}" y="${yt}" width="${x1-x0}" height="8" fill="url(#wood${id})" stroke="${C.navy}"/><rect x="${x0}" y="${yt+8}" width="${x1-x0}" height="8" fill="url(#wood${id})" stroke="${C.navy}"/>`;
  for(let x=x0;x<=x1;x+=32){ if(x>180&&x<330) continue; s+=`<rect x="${x-3}" y="${yt+16}" width="6" height="${yb-yt-16}" fill="url(#wood${id})" stroke="${C.navy}"/>`; }
  // opening: king studs, jack studs, header, sill, cripples
  s+=`<rect x="177" y="${yt+16}" width="6" height="${yb-yt-16}" fill="url(#wood${id})" stroke="${C.navy}"/><rect x="329" y="${yt+16}" width="6" height="${yb-yt-16}" fill="url(#wood${id})" stroke="${C.navy}"/>`;
  s+=`<rect x="183" y="112" width="6" height="150" fill="url(#wood${id})" stroke="${C.navy}"/><rect x="323" y="112" width="6" height="150" fill="url(#wood${id})" stroke="${C.navy}"/>`;
  s+=`<rect x="183" y="92" width="146" height="20" fill="url(#wood${id})" stroke="${C.navy}" stroke-width="1.5"/>`+hl(183,92,146,20);
  s+=`<rect x="189" y="200" width="134" height="6" fill="url(#wood${id})" stroke="${C.navy}"/>`;
  [221,253,285].forEach(x=>{s+=`<rect x="${x-3}" y="${yt+16}" width="6" height="${92-yt-16}" fill="url(#wood${id})" stroke="${C.navy}"/><rect x="${x-3}" y="206" width="6" height="56" fill="url(#wood${id})" stroke="${C.navy}"/>`;});
  s+=`<rect x="189" y="112" width="134" height="88" fill="${C.paper}" stroke="${C.line}" stroke-dasharray="4 3"/>`;
  // sheathing panel outline (partial)
  s+=`<rect x="${x1-96}" y="${yt}" width="96" height="${yb-yt+8}" fill="#F0E4CF" opacity=".55" stroke="${C.navy}" stroke-dasharray="5 3"/>`;
  s+=dimH(x0,x0+32,yb+24,'16" O.C.',{below:true})+dimH(183,329,80,"12'-2\" R.O.")+dimV(24,yt,yb+8,"9'-1⅛\"");
  s+=tag(60,284,'2×6 STUDS @ 16" O.C.',{w:130})+leader(60,280,72,220,id);
  s+=tag(340,150,'(2) 2×10 HEADER',{w:110})+leader(340,146,320,102,id);
  s+=tag(340,178,'JACK / KING STUDS',{w:118})+leader(340,174,331,170,id);
  s+=tag(240,284,'DBL TOP PLATE',{w:95})+leader(240,280,130,64,id);
  s+=tag(338,232,'7/16" OSB SHEATHING',{w:130})+leader(338,228,392,180,id);
  s+=tag(340,260,'P.T. SILL PLATE',{w:100})+leader(340,256,300,266,id);
  s+=title(W,H,'WALL FRAMING ELEVATION 6 / S-401 — EXTERIOR BEARING WALL',id);
  return svg(W,H,defs(id)+s); };

D.thermal = () => { const id=++_uid, W=480, H=320; let s=paper(W,H,id);
  // parapet
  s+=`<rect x="40" y="70" width="40" height="190" fill="url(#cmu${id})" stroke="${C.navy}" stroke-width="1.5"/>`;
  s+=`<rect x="34" y="62" width="52" height="8" fill="${C.steel}"/>`;
  // deck (corrugated)
  let deck='M80 180'; for(let x=80;x<470;x+=12) deck+=`l6 8 l6 -8`; s+=`<path d="${deck}" fill="none" stroke="${C.navy}" stroke-width="1.8"/>`;
  // layers
  s+=`<rect x="80" y="176" width="390" height="4" fill="${C.ink}"/>`; // vapor retarder
  s+=`<rect x="80" y="150" width="390" height="26" fill="url(#rigid${id})" stroke="${C.navy}" stroke-width="1"/>`;
  s+=`<rect x="80" y="124" width="390" height="26" fill="url(#rigid${id})" stroke="${C.navy}" stroke-width="1"/>`;
  s+=`<rect x="80" y="118" width="390" height="6" fill="#C9B79A" stroke="${C.navy}"/>`;
  s+=`<path d="M80 118H470" stroke="${C.ink}" stroke-width="3"/>`; // membrane
  s+=hl(80,118,390,58);
  // tapered cricket
  s+=`<path d="M300 118L400 106L470 118Z" fill="url(#rigid${id})" stroke="${C.navy}"/><path d="M300 118L400 106L470 118" stroke="${C.ink}" stroke-width="3" fill="none"/>`;
  // base flashing up parapet
  s+=`<path d="M80 118V80" stroke="${C.ink}" stroke-width="3"/><path d="M80 118 L96 118" stroke="${C.ink}" stroke-width="3"/>`;
  s+=`<path d="M86 72V118" stroke="${C.copper}" stroke-width="2"/>`;
  // drain
  s+=`<rect x="230" y="110" width="30" height="8" fill="${C.steel}"/><path d="M245 118V240" stroke="${C.steel}" stroke-width="5"/><circle cx="245" cy="106" r="7" fill="none" stroke="${C.ink}" stroke-width="1.5"/>`;
  s+=`<path d="M80 260H470" stroke="${C.line}" stroke-width="1" stroke-dasharray="4 3"/>`;
  s+=dimV(456,118,180,'5¾"',{right:true})+dimV(24,70,260,"NOM. 6'-4\" PARAPET");
  s+=tag(150,50,'60 MIL TPO, FULLY ADHERED',{w:165})+leader(150,46,200,116,id);
  s+=tag(330,50,'½" HD COVER BOARD',{w:125})+leader(330,46,380,120,id);
  s+=tag(150,215,'(2) 2.6" POLYISO — R-30',{w:145})+leader(150,211,180,150,id);
  s+=tag(290,215,'SELF-ADHERED VAPOR RETARDER',{w:180})+leader(290,211,300,177,id);
  s+=tag(150,242,'22 GA METAL DECK',{w:115})+leader(150,238,190,186,id);
  s+=tag(330,242,'ROOF DRAIN W/ SUMP',{w:125})+leader(330,238,262,110,id);
  s+=tag(100,86,'METAL COPING',{w:88})+leader(100,82,84,66,id);
  s+=tag(330,84,'TAPERED CRICKET ¼"/FT',{w:145})+leader(330,80,400,106,id);
  s+=title(W,H,'ROOF SECTION 5 / A-511 — LOW-SLOPE ASSEMBLY AT PARAPET',id);
  return svg(W,H,defs(id)+s); };

D.finishes = () => { const id=++_uid, W=480, H=320; let s=paper(W,H,id);
  const yf=262, yc=78;
  // floor slab
  s+=`<rect x="0" y="${yf}" width="${W}" height="20" fill="url(#conc${id})" stroke="${C.navy}"/>`;
  s+=`<rect x="0" y="${yf-4}" width="${W}" height="4" fill="#8E6A45"/>`; // LVT
  // ceiling grid
  s+=`<path d="M0 ${yc}H${W}" stroke="${C.navy}" stroke-width="2"/>`;
  for(let x=0;x<W;x+=60){s+=`<path d="M${x} ${yc-6}V${yc+2}" stroke="${C.navy}" stroke-width="2"/>`;}
  s+=`<rect x="0" y="${yc-10}" width="${W}" height="4" fill="#DDE6EE" stroke="${C.line}"/>`;
  s+=`<path d="M0 40H${W}" stroke="${C.ink}" stroke-width="1.2" stroke-dasharray="6 3"/>`;
  // partition: studs (C-shape) and GWB
  const px=210;
  for(let y=yc+10;y<yf-8;y+=34){ s+=`<path d="M${px} ${y}h24v6h-6M${px} ${y}v${28}h24v-6h-6" fill="none" stroke="${C.steel}" stroke-width="2"/>`; }
  s+=`<rect x="${px-8}" y="${yc-10}" width="8" height="${yf-yc+10}" fill="#E8E1D6" stroke="${C.navy}" stroke-width="1.5"/>`;
  s+=`<rect x="${px+24}" y="${yc-10}" width="8" height="${yf-yc+10}" fill="#E8E1D6" stroke="${C.navy}" stroke-width="1.5"/>`;
  s+=hl(px-8,yc-10,40,yf-yc+10);
  // runners
  s+=`<rect x="${px}" y="${yc-10}" width="24" height="6" fill="${C.steel}"/><rect x="${px}" y="${yf-10}" width="24" height="6" fill="${C.steel}"/>`;
  // base
  s+=`<rect x="${px-12}" y="${yf-16}" width="4" height="12" fill="${C.ink}"/><rect x="${px+32}" y="${yf-16}" width="4" height="12" fill="${C.ink}"/>`;
  // room tags
  s+=`<polygon points="100,150 118,140 136,150 136,170 118,180 100,170" fill="${C.white}" stroke="${C.navy}" stroke-width="1.2"/>${t(118,158,'OFFICE',{a:'middle',f:7.5,w:600})}${t(118,170,'104',{a:'middle',f:8,w:600})}`;
  s+=`<polygon points="340,150 358,140 376,150 376,170 358,180 340,170" fill="${C.white}" stroke="${C.navy}" stroke-width="1.2"/>${t(358,158,'CORR.',{a:'middle',f:7.5,w:600})}${t(358,170,'C-1',{a:'middle',f:8,w:600})}`;
  s+=dimV(px+60,yc,yf,"9'-0\" CLG",{right:true})+dimH(px-8,px+32,yc-22,'4⅞"');
  s+=tag(20,110,'2×4 ACT — 15/16" GRID',{w:135})+leader(140,106,170,76,id);
  s+=tag(20,284,'LVT ON SEALED SLAB',{w:120})+leader(140,280,180,259,id);
  s+=tag(305,110,'5/8" TYPE X GWB, EA. SIDE',{w:160})+leader(305,106,px+34,140,id);
  s+=tag(315,205,'3⅝" 20 GA STUDS @ 16"',{w:150})+leader(315,201,px+26,220,id);
  s+=tag(305,232,'LEVEL 4 FINISH, PAINT P-1',{w:160})+leader(305,228,px+34,200,id);
  s+=tag(330,284,'4" RUBBER BASE',{w:100})+leader(330,280,px+38,254,id);
  s+=tag(20,56,'STRUCTURE ABOVE',{w:110});
  s+=title(W,H,'PARTITION TYPE P-1 / A-601 — NON-RATED, FULL HEIGHT',id);
  return svg(W,H,defs(id)+s); };

D.plumbing = () => { const id=++_uid, W=480, H=320; let s=paper(W,H,id);
  const floors=[250,175,100]; const lab=['LEVEL 1','LEVEL 2','LEVEL 3'];
  floors.forEach((y,i)=>{s+=`<path d="M30 ${y}H450" stroke="${C.ink}" stroke-width="1.6"/>${t(34,y-4,lab[i],{f:8,w:600})}`;});
  s+=`<path d="M30 46H450" stroke="${C.ink}" stroke-width="1.2" stroke-dasharray="5 3"/>${t(34,42,'ROOF',{f:8,w:600})}`;
  // sanitary stack
  s+=`<path d="M240 292V60" stroke="${C.navy}" stroke-width="3.5"/>`;
  s+=`<path d="M240 60V30" stroke="${C.navy}" stroke-width="2" stroke-dasharray="5 3"/>`;
  s+=`<path d="M200 292H240" stroke="${C.navy}" stroke-width="3.5"/>`;
  s+=`<path d="M150 292H200" stroke="${C.navy}" stroke-width="3.5"/>`;
  // building drain arrow
  s+=`<path d="M150 292L110 292" stroke="${C.navy}" stroke-width="3.5" marker-end="url(#arr${id})"/>`;
  // vent stack
  s+=`<path d="M300 250V46" stroke="${C.line}" stroke-width="2" stroke-dasharray="6 3"/><path d="M300 46V26" stroke="${C.line}" stroke-width="2"/>`;
  // fixtures per floor
  floors.forEach(y=>{
    // WC
    s+=`<path d="M240 ${y-18}H170" stroke="${C.navy}" stroke-width="2.4"/><rect x="150" y="${y-28}" width="20" height="20" rx="4" fill="${C.white}" stroke="${C.ink}" stroke-width="1.4"/>${t(160,y-14,'WC',{a:'middle',f:7,w:600})}`;
    // LAV
    s+=`<path d="M240 ${y-40}H190" stroke="${C.navy}" stroke-width="1.8"/><circle cx="182" cy="${y-40}" r="8" fill="${C.white}" stroke="${C.ink}" stroke-width="1.4"/>${t(182,y-37,'L',{a:'middle',f:7,w:600})}`;
    // vent connection
    s+=`<path d="M240 ${y-52}H300" stroke="${C.line}" stroke-width="1.6" stroke-dasharray="5 3"/>`;
    // cleanout
    s+=`<circle cx="252" cy="${y-8}" r="4" fill="${C.white}" stroke="${C.ink}" stroke-width="1.2"/>${t(262,y-5,'C.O.',{f:7})}`;
  });
  s+=hl(232,60,16,232);
  // domestic water riser
  s+=`<path d="M380 292V70" stroke="${C.copper}" stroke-width="2.5"/>`;
  floors.forEach(y=>{s+=`<path d="M380 ${y-30}H410" stroke="${C.copper}" stroke-width="1.8"/><path d="M405 ${y-34}v8" stroke="${C.copper}" stroke-width="1.8"/>`;});
  s+=`<path d="M380 292H430" stroke="${C.copper}" stroke-width="2.5"/><path d="M420 286v12M424 286v12" stroke="${C.copper}" stroke-width="1.6"/>`;
  s+=t(248,80,'4" SAN',{f:8.5,w:600})+t(306,80,'2" VENT',{f:8.5,w:600,c:C.line})+t(386,84,'1½" CW',{f:8.5,w:600,c:C.copper});
  s+=t(240,22,'VTR',{a:'middle',f:8,w:600})+t(300,20,'VTR',{a:'middle',f:8,w:600,c:C.line});
  s+=t(110,280,'TO BLDG. DRAIN',{f:7.5})+t(470,280,'FROM METER',{f:7.5,c:C.copper,a:'end'});
  s+=title(W,H,'SANITARY, VENT & CW RISER DIAGRAM — P-501',id);
  return svg(W,H,defs(id)+s); };

D.hvac = () => { const id=++_uid, W=480, H=320; let s=paper(W,H,id);
  // room outline
  s+=`<rect x="30" y="40" width="420" height="240" fill="${C.white}" stroke="${C.ink}" stroke-width="2"/>`;
  s+=`<path d="M240 40V280M30 160H450" stroke="${C.line}" stroke-width="1" stroke-dasharray="4 3"/>`;
  // RTU
  s+=`<rect x="200" y="14" width="80" height="26" fill="${C.steel}" rx="2"/>${t(240,31,'RTU-1',{a:'middle',f:9,w:600,c:C.white})}`;
  // main trunk (double line)
  const duct=(x1,y1,x2,y2,w)=>{const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy),nx=-dy/L*w/2,ny=dx/L*w/2;return `<polygon points="${x1+nx},${y1+ny} ${x2+nx},${y2+ny} ${x2-nx},${y2-ny} ${x1-nx},${y1-ny}" fill="#DCE6EF" stroke="${C.navy}" stroke-width="1.6"/>`;};
  s+=duct(240,40,240,245,22);
  s+=hl(229,40,22,205);
  // branches
  [[240,90,80,90],[240,90,400,90],[240,160,80,160],[240,160,400,160],[240,230,80,230],[240,230,400,230]].forEach(b=>s+=duct(b[0],b[1],b[2],b[3],12));
  // VAV boxes
  [[150,90],[330,90],[150,160],[330,160]].forEach(([x,y],i)=>s+=`<rect x="${x-14}" y="${y-9}" width="28" height="18" fill="${C.white}" stroke="${C.navy}" stroke-width="1.4"/>${t(x,y+3,'VAV-'+(i+1),{a:'middle',f:6.5,w:600})}`);
  // diffusers
  [[80,90],[400,90],[80,160],[400,160],[80,230],[400,230],[150,230],[330,230]].forEach(([x,y])=>s+=`<rect x="${x-10}" y="${y-10}" width="20" height="20" fill="${C.white}" stroke="${C.ink}" stroke-width="1.4"/><path d="M${x-10} ${y-10}L${x+10} ${y+10}M${x+10} ${y-10}L${x-10} ${y+10}" stroke="${C.ink}" stroke-width="1"/>`);
  // return grille
  s+=`<rect x="200" y="252" width="80" height="16" fill="${C.white}" stroke="${C.ink}" stroke-width="1.4"/><path d="M206 256H274M206 260H274M206 264H274" stroke="${C.ink}" stroke-width=".8"/>${t(288,262,'RA GRILLE 24×12',{f:7})}`;
  // thermostat
  s+=`<circle cx="60" cy="60" r="6" fill="${C.white}" stroke="${C.ink}" stroke-width="1.2"/>${t(60,63,'T',{a:'middle',f:7,w:600})}`;
  s+=t(252,60,'24×14 SA',{f:8,w:600})+t(252,120,'22×12',{f:8})+t(252,190,'18×10',{f:8});
  s+=t(110,82,'12×8',{f:7.5})+t(340,82,'12×8',{f:7.5});
  s+=t(80,120,'24×24 CD — 250 CFM',{a:'middle',f:7})+t(400,120,'24×24 CD — 250 CFM',{a:'middle',f:7});
  s+=tag(258,284,'RTU-1: 15 TON, 6,000 CFM, GAS HEAT',{w:210});
  s+=tag(30,284,'FLEX DUCT 8"Ø MAX 5\'-0"',{w:150});
  s+=title(W,H,'HVAC DUCTWORK PLAN — M-201 (PARTIAL, LEVEL 1)',id);
  return svg(W,H,defs(id)+s); };

D.electrical = () => { const id=++_uid, W=480, H=320; let s=paper(W,H,id);
  const bus=(x,y,w,label)=>`<rect x="${x}" y="${y}" width="${w}" height="26" fill="${C.white}" stroke="${C.navy}" stroke-width="2"/>${t(x+w/2,y+17,label,{a:'middle',f:8,w:600})}`;
  // utility & meter
  s+=`<circle cx="60" cy="60" r="18" fill="${C.white}" stroke="${C.navy}" stroke-width="2"/>${t(60,64,'UTIL',{a:'middle',f:8,w:600})}`;
  s+=`<path d="M78 60H120" stroke="${C.navy}" stroke-width="2"/>`;
  s+=`<circle cx="134" cy="60" r="14" fill="${C.white}" stroke="${C.navy}" stroke-width="2"/>${t(134,64,'M',{a:'middle',f:9,w:600})}`;
  s+=`<path d="M148 60H190" stroke="${C.navy}" stroke-width="2"/>`;
  // CT cabinet & main breaker
  s+=`<rect x="190" y="46" width="34" height="28" fill="${C.white}" stroke="${C.navy}" stroke-width="2"/>${t(207,64,'CT',{a:'middle',f:8,w:600})}`;
  s+=`<path d="M224 60H262" stroke="${C.navy}" stroke-width="2"/>`;
  s+=`<path d="M262 60l14 -10" stroke="${C.navy}" stroke-width="2.4"/><path d="M276 60H300" stroke="${C.navy}" stroke-width="2"/>${t(268,42,'400A MCB',{f:7.5,w:600})}`;
  // MDP bus
  s+=hl(300,40,150,44);
  s+=bus(300,46,150,'MDP — 400A 208Y/120V 3Ø 4W');
  s+=`<path d="M310 72V80M340 72V80M370 72V80M400 72V80M430 72V80" stroke="${C.navy}" stroke-width="1.5"/>`;
  // ground
  s+=`<path d="M300 60H286V90" stroke="${C.navy}" stroke-width="1.6"/><path d="M276 90H296M279 95H293M282 100H290" stroke="${C.navy}" stroke-width="1.6"/>`;
  // feeders down
  const fd=[[310,'LP-1',110,'100A'],[340,'LP-2',110,'100A'],[370,'MCC-1',110,'150A'],[400,'T-1',110,'75 kVA'],[430,'SPARE',110,'']];
  fd.forEach(([x,l,y,a])=>{
    s+=`<path d="M${x} 80l8 -6" stroke="${C.navy}" stroke-width="2"/><path d="M${x} 80V${y+40}" stroke="${C.navy}" stroke-width="1.6"/>`;
    if(l==='T-1'){ s+=`<circle cx="${x}" cy="${y+52}" r="10" fill="${C.white}" stroke="${C.navy}" stroke-width="1.8"/><circle cx="${x}" cy="${y+68}" r="10" fill="${C.white}" stroke="${C.navy}" stroke-width="1.8"/><path d="M${x} ${y+78}V${y+95}" stroke="${C.navy}" stroke-width="1.6"/>${t(x+14,y+62,'480Δ',{f:7})}${t(x+14,y+74,'208Y',{f:7})}`; s+=`<rect x="${x-16}" y="${y+95}" width="32" height="22" fill="${C.white}" stroke="${C.navy}" stroke-width="1.6"/>${t(x,y+109,'LP-3',{a:'middle',f:7,w:600})}`; }
    else if(l==='SPARE'){ s+=t(x,y+52,'SPARE',{a:'middle',f:7}); }
    else { s+=`<rect x="${x-16}" y="${y+40}" width="32" height="22" fill="${C.white}" stroke="${C.navy}" stroke-width="1.6"/>${t(x,y+54,l,{a:'middle',f:7,w:600})}`; }
    if(a) s+=t(x+4,y+30,a,{f:6.5,c:C.copper});
  });
  // feeder callouts
  s+=tag(20,150,'SERVICE: 4#500 KCMIL + 1#3 G',{w:180})+leader(200,146,236,62,id);
  s+=t(20,170,'IN 3½" PVC SCH 40',{f:7.5,c:C.muted||'#5F7386'});
  s+=tag(20,196,'FEEDER LP-1: 4#3 + 1#8 G, 1¼" EMT',{w:200})+leader(220,192,308,120,id);
  s+=tag(20,222,'FEEDER MCC-1: 4#1/0 + 1#6 G, 2" EMT',{w:210})+leader(230,218,368,120,id);
  // device symbols legend
  s+=t(20,262,'BRANCH DEVICES (TYP.)',{f:7.5,w:600});
  s+=`<circle cx="30" cy="282" r="5" fill="${C.white}" stroke="${C.ink}" stroke-width="1.2"/><path d="M25 282H35" stroke="${C.ink}" stroke-width="1.2"/>${t(42,285,'DUPLEX RECEPT. 20A',{f:7})}`;
  s+=`<path d="M150 277l10 10M150 287l10 -10" stroke="${C.ink}" stroke-width="1.4"/>${t(168,285,'SWITCH S1',{f:7})}`;
  s+=`<rect x="240" y="276" width="18" height="12" fill="${C.white}" stroke="${C.ink}" stroke-width="1.2"/>${t(264,285,'2×4 LED TROFFER',{f:7})}`;
  s+=title(W,H,'ONE-LINE DIAGRAM — E-601 · SERVICE & DISTRIBUTION',id);
  return svg(W,H,defs(id)+s); };

D.earthwork = () => { const id=++_uid, W=480, H=320; let s=paper(W,H,id);
  const ex=[[30,150],[90,140],[150,132],[210,150],[270,178],[330,196],[390,200],[450,206]];
  const pr=[[30,150],[100,150],[150,170],[180,170],[330,170],[360,170],[450,206]];
  const path=p=>p.map((q,i)=>(i?'L':'M')+q.join(' ')).join('');
  // cut fill regions
  s+=`<path d="${path(ex)} L450 206 ${path(pr.slice().reverse()).replace('M','L')} Z" fill="url(#earth${id})" opacity=".0"/>`;
  // cut (existing above proposed): between x 100-180
  s+=`<path d="M100 150 L150 132 L210 150 L180 170 L150 170 Z" fill="${C.mark}" opacity=".6" stroke="none"/>`;
  // fill (proposed above existing) 210-360
  s+=`<path d="M210 150 L330 170 L360 170 L330 196 L270 178 Z" fill="url(#rigid${id})" opacity=".9"/>`;
  s+=`<path d="M210 150 L330 170 L360 170 L330 196 L270 178 Z" fill="#7FB07A" opacity=".35"/>`;
  s+=`<path d="${path(ex)}" fill="none" stroke="${C.ink}" stroke-width="1.6" stroke-dasharray="7 4"/>`;
  s+=`<path d="${path(pr)}" fill="none" stroke="${C.navy}" stroke-width="2.4"/>`;
  // building pad
  s+=`<rect x="180" y="150" width="150" height="20" fill="url(#conc${id})" stroke="${C.navy}" stroke-width="1.5"/>`;
  s+=`<path d="M180 150V110H330V150" fill="none" stroke="${C.navy}" stroke-width="1.6"/>${t(255,134,'BUILDING PAD',{a:'middle',f:8,w:600})}`;
  s+=t(255,146,'FFE 100.50',{a:'middle',f:8,c:C.copper,w:600});
  // subgrade below
  s+=`<rect x="30" y="206" width="420" height="60" fill="url(#earth${id})" opacity=".5"/>`;
  // stations
  s+=`<path d="M30 266H450" stroke="${C.ink}" stroke-width="1.4"/>`;
  [30,135,240,345,450].forEach((x,i)=>{s+=`<path d="M${x} 262V270" stroke="${C.ink}" stroke-width="1.4"/>${t(x,282,(10+i)+'+00',{a:'middle',f:8})}`;});
  // elevation scale
  [[100,110],[95,150],[90,190],[85,230]].forEach(([e,y])=>s+=`${t(24,y+3,e,{a:'end',f:7.5})}<path d="M26 ${y}H30" stroke="${C.ink}"/>`);
  s+=`<path d="M30 100V266" stroke="${C.ink}" stroke-width="1.4"/>`;
  s+=tag(60,60,'CUT — 1,240 CY',{w:100})+leader(110,64,150,150,id);
  s+=tag(330,60,'FILL — 860 CY',{w:95})+leader(330,64,300,176,id);
  s+=tag(60,284,'EXISTING GRADE (SURVEY)',{w:150})+t(230,284,'— — —',{f:9,c:C.ink});
  s+=tag(300,284,'PROPOSED GRADE (C-301)',{w:150});
  s+=t(120,180,'3:1 MAX',{f:7.5,c:C.copper})+t(345,190,'2:1 SLOPE',{f:7.5,c:C.copper});
  s+=t(255,192,'STRUCTURAL FILL 95% MOD. PROCTOR',{a:'middle',f:7,w:600});
  s+=title(W,H,'GRADING SECTION A-A / C-302 — CUT & FILL',id);
  return svg(W,H,defs(id)+s); };

D.exterior = () => { const id=++_uid, W=480, H=320; let s=paper(W,H,id);
  // property line
  s+=`<rect x="24" y="24" width="432" height="272" fill="none" stroke="${C.ink}" stroke-width="1.2" stroke-dasharray="10 4 2 4"/>`;
  // landscape islands & perimeter
  s+=`<rect x="24" y="24" width="432" height="272" fill="url(#land${id})"/>`;
  // paved lot
  s+=`<rect x="60" y="120" width="360" height="150" fill="url(#asph${id})" stroke="${C.navy}" stroke-width="2"/>`;
  s+=hl(60,120,360,150);
  // curb (double line)
  s+=`<rect x="60" y="120" width="360" height="150" fill="none" stroke="${C.navy}" stroke-width="1"/><rect x="63" y="123" width="354" height="144" fill="none" stroke="${C.navy}" stroke-width="1"/>`;
  // building
  s+=`<rect x="90" y="40" width="300" height="60" fill="${C.white}" stroke="${C.ink}" stroke-width="2.4"/>${t(240,74,'PROPOSED BUILDING — 18,650 SF',{a:'middle',f:8.5,w:600})}`;
  // sidewalk
  s+=`<rect x="90" y="100" width="300" height="14" fill="#E4E9EE" stroke="${C.navy}" stroke-width="1"/>`;
  // stalls (top row against walk)
  for(let x=80;x<=400;x+=20){s+=`<path d="M${x} 126V166" stroke="${C.white}" stroke-width="1.6"/>`;}
  for(let x=80;x<=400;x+=20){s+=`<path d="M${x} 224V264" stroke="${C.white}" stroke-width="1.6"/>`;}
  // aisle arrows
  s+=`<path d="M120 195H360" stroke="${C.white}" stroke-width="1.6" stroke-dasharray="14 8"/>`;
  // ADA stalls
  s+=`<rect x="80" y="126" width="20" height="40" fill="${C.white}" opacity=".5"/><rect x="100" y="126" width="12" height="40" fill="none" stroke="${C.white}" stroke-width="1" stroke-dasharray="3 2"/>`;
  s+=`<circle cx="90" cy="146" r="6" fill="none" stroke="${C.navy}" stroke-width="1.4"/>`;
  // landscape islands in lot
  s+=`<rect x="230" y="126" width="20" height="40" fill="url(#land${id})" stroke="${C.navy}" stroke-width="1"/><rect x="230" y="224" width="20" height="40" fill="url(#land${id})" stroke="${C.navy}" stroke-width="1"/>`;
  // trees
  [[240,146],[240,244],[44,60],[44,200],[440,60],[440,200]].forEach(([x,y])=>s+=`<circle cx="${x}" cy="${y}" r="9" fill="none" stroke="#4E7B3F" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="2" fill="#4E7B3F"/>`);
  // entrance drive
  s+=`<rect x="220" y="270" width="40" height="26" fill="url(#asph${id})" stroke="${C.navy}" stroke-width="1.5"/>`;
  // light pole
  s+=`<circle cx="160" cy="195" r="4" fill="${C.white}" stroke="${C.ink}" stroke-width="1.2"/><path d="M156 195H164M160 191V199" stroke="${C.ink}" stroke-width="1"/>`;
  // north arrow
  s+=`<path d="M440 260V236M434 244L440 236L446 244" fill="none" stroke="${C.ink}" stroke-width="1.5"/>${t(440,272,'N',{a:'middle',f:8,w:600})}`;
  s+=dimH(80,100,180,"9'-0\"",{f:8})+dimV(400,166,224,"24'-0\" AISLE",{right:true,f:8});
  s+=tag(300,110,'5" CONC. WALK',{w:92});
  s+=t(240,286,'ENTRANCE',{a:'middle',f:7,w:600});
  s+=tag(30,296,'3" HMA / 8" AGG. BASE',{w:135})+tag(310,296,'6" CURB & GUTTER, 1,020 LF',{w:170});
  s+=title(W,H,'SITE PLAN — C-101 · PAVING, CURB & LANDSCAPE',id);
  return svg(W,H,defs(id)+s); };

D.utilities = () => { const id=++_uid, W=480, H=320; let s=paper(W,H,id);
  s+=`<rect x="24" y="24" width="432" height="272" fill="none" stroke="${C.ink}" stroke-width="1.2" stroke-dasharray="10 4 2 4"/>`;
  s+=`<rect x="150" y="60" width="200" height="110" fill="${C.white}" stroke="${C.ink}" stroke-width="2.4"/>${t(250,120,'BUILDING',{a:'middle',f:9,w:600})}`;
  // street (bottom)
  s+=`<rect x="24" y="250" width="432" height="46" fill="#DCE3EA"/><path d="M24 273H456" stroke="${C.white}" stroke-width="1.5" stroke-dasharray="12 8"/>${t(440,292,'MAIN ST',{a:'end',f:7.5})}`;
  // water main in street + service
  s+=`<path d="M24 258H456" stroke="${C.navy}" stroke-width="2.6"/>${t(30,254,'12" DIP WATER MAIN',{f:7,c:C.navy,w:600})}`;
  s+=`<path d="M120 258V170H150" stroke="${C.navy}" stroke-width="2.6"/>`;
  s+=hl(115,165,12,95);
  // valves
  s+=`<path d="M116 200l8 -6v12z" fill="${C.navy}"/><path d="M124 200l-8 -6v12z" fill="${C.navy}"/>`;
  // hydrant
  s+=`<circle cx="60" cy="240" r="5" fill="${C.copper}"/><path d="M60 245V258" stroke="${C.navy}" stroke-width="2"/>${t(70,243,'FH',{f:7.5,w:600,c:C.copper})}`;
  // sanitary (dashed) with manholes
  s+=`<path d="M40 288H456" stroke="${C.earth}" stroke-width="2.2" stroke-dasharray="8 4"/>`;
  s+=`<path d="M380 288V170" stroke="${C.earth}" stroke-width="2.2" stroke-dasharray="8 4"/><path d="M380 170H350" stroke="${C.earth}" stroke-width="2.2" stroke-dasharray="8 4"/>`;
  [[380,288],[380,200],[200,288]].forEach(([x,y],i)=>s+=`<circle cx="${x}" cy="${y}" r="8" fill="${C.white}" stroke="${C.earth}" stroke-width="2"/>${t(x,y+3,'S',{a:'middle',f:7,w:600,c:C.earth})}`);
  s+=t(392,196,'SSMH-2',{f:7,w:600,c:C.earth})+t(392,206,'RIM 101.20',{f:6.5,c:C.earth})+t(392,215,'INV 94.60',{f:6.5,c:C.earth});
  s+=t(386,240,'8" PVC SAN @ 0.50%',{f:7,c:C.earth,w:600,r:-90});
  // storm (dash-dot) with catch basins
  s+=`<path d="M60 200H150M60 200V230" stroke="${C.line}" stroke-width="2.4" stroke-dasharray="10 3 2 3"/>`;
  s+=`<path d="M60 230H440" stroke="${C.line}" stroke-width="2.4" stroke-dasharray="10 3 2 3"/>`;
  s+=`<path d="M440 230V80M440 80H350" stroke="${C.line}" stroke-width="2.4" stroke-dasharray="10 3 2 3"/>`;
  [[60,230],[250,230],[440,230],[440,80]].forEach(([x,y])=>s+=`<rect x="${x-7}" y="${y-7}" width="14" height="14" fill="${C.white}" stroke="${C.line}" stroke-width="2"/>`);
  s+=t(300,226,'15" RCP STORM',{f:7,w:600,c:C.line})+t(70,220,'CB-1',{f:7,w:600,c:C.line})+t(452,84,'CB-3',{f:7,w:600,c:C.line});
  // roof drain leaders
  s+=`<path d="M350 90H440" stroke="${C.line}" stroke-width="1.2"/>${t(360,86,'RD',{f:6.5,c:C.line})}`;
  // electrical duct bank
  s+=`<path d="M456 150H350" stroke="${C.copper}" stroke-width="2" stroke-dasharray="3 3"/>${t(400,146,'4-4" PVC DUCT BANK',{a:'middle',f:6.5,c:C.copper,w:600})}`;
  s+=`<rect x="440" y="140" width="16" height="20" fill="${C.white}" stroke="${C.copper}" stroke-width="1.4"/>${t(448,152,'XF',{a:'middle',f:6,w:600,c:C.copper})}`;
  // gas
  s+=`<path d="M24 60H150" stroke="${C.ink}" stroke-width="1.6"/>${t(30,56,'2" PE GAS',{f:7,w:600})}`;
  s+=tag(30,110,'6" DIP FIRE SERVICE',{w:120})+leader(150,106,122,180,id);
  s+=tag(30,132,'2" TYPE K CU DOMESTIC',{w:140});
  s+=`<path d="M40 30H80" stroke="${C.navy}" stroke-width="2.6"/>${t(86,33,'WATER',{f:7})}<path d="M130 30H170" stroke="${C.earth}" stroke-width="2.2" stroke-dasharray="8 4"/>${t(176,33,'SANITARY',{f:7})}<path d="M240 30H280" stroke="${C.line}" stroke-width="2.4" stroke-dasharray="10 3 2 3"/>${t(286,33,'STORM',{f:7})}<path d="M340 30H380" stroke="${C.copper}" stroke-width="2" stroke-dasharray="3 3"/>${t(386,33,'ELEC',{f:7})}`;
  s+=title(W,H,'SITE UTILITY PLAN — C-401 · WATER, SANITARY, STORM, POWER',id);
  return svg(W,H,defs(id)+s); };


export const ICO = {
  takeoff: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="6" y="8" width="30" height="34" rx="2"/><path d="M12 16h18M12 22h18M12 28h10"/><rect x="24" y="30" width="16" height="10" fill="#F5D253" stroke="currentColor"/><path d="M28 30v3M32 30v3M36 30v3"/></svg>`,
  estimate: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="6" width="36" height="36" rx="2"/><path d="M6 16h36M6 26h36M6 36h36M18 6v36M30 6v36"/><rect x="30" y="36" width="12" height="6" fill="#B65A22" stroke="none"/></svg>`,
  bid: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M10 4h20l8 8v32H10z"/><path d="M30 4v8h8"/><path d="M16 22h16M16 28h16M16 34h10"/><circle cx="34" cy="36" r="7" fill="#F5D253"/><path d="M31 36l2 2 4-4"/></svg>`,
  precon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 42h36M6 42V10"/><rect x="12" y="30" width="6" height="12" fill="#8B2635" stroke="none"/><rect x="22" y="22" width="6" height="20" fill="currentColor" stroke="none"/><rect x="32" y="14" width="6" height="28" fill="#5A3E42" stroke="currentColor"/><path d="M10 26l10-8 10 4 12-14" stroke-dasharray="3 2"/></svg>`,
  draft: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 12h36v6H6z"/><path d="M22 18v24h6V18"/><path d="M12 40l12-14 12 14z" fill="#F5D253"/><path d="M16 12V8M32 12V8"/></svg>`,
  headcount: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="18" cy="16" r="7"/><path d="M6 40c0-8 5-13 12-13s12 5 12 13"/><path d="M32 12h10M32 18h10M32 24h6" stroke-dasharray="2 2"/><path d="M34 32l10 10M44 32L34 42"/></svg>`,
  volume: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="28" width="8" height="14"/><rect x="18" y="20" width="8" height="22"/><rect x="30" y="10" width="8" height="32" fill="#F5D253"/><path d="M6 8l10 6 10-4 14 8" stroke-dasharray="3 2"/><path d="M36 14l4 4 4-4"/></svg>`,
  risk: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M24 4l18 8v12c0 10-8 17-18 20C14 41 6 34 6 24V12z"/><path d="M16 24l6 6 10-12"/></svg>`,
  gc: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="14" width="36" height="28"/><path d="M6 24h36M6 34h36M18 14v28M30 14v28"/><path d="M14 14V6h20v8"/></svg>`,
  sub: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="14" width="36" height="28"/><path d="M6 24h36M6 34h36M18 14v28M30 14v28"/><rect x="18" y="24" width="12" height="10" fill="#F5D253"/></svg>`,
  supplier: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 36h36v6H6z"/><rect x="10" y="26" width="12" height="10"/><rect x="26" y="26" width="12" height="10"/><rect x="18" y="16" width="12" height="10" fill="#F5D253"/></svg>`,
  arch: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M8 40L24 8l16 32z"/><path d="M16 40l8-16 8 16"/><path d="M6 40h36"/></svg>`,
};


export function flowArt(){
  const id=++_uid, W=920, H=150; let s='';
  const doc=(x,y,label,inner)=>`<g transform="translate(${x} ${y})">${inner}${t(0,66,label,{a:'middle',f:9,w:600,c:'#DCE7F1'})}</g>`;
  const sheets=`<rect x="-26" y="-4" width="44" height="54" fill="#1B3A58" stroke="#8FB0CC" stroke-width="1.2"/><rect x="-20" y="-10" width="44" height="54" fill="#1B3A58" stroke="#8FB0CC" stroke-width="1.2"/><rect x="-14" y="-16" width="44" height="54" fill="#24507A" stroke="#DCE7F1" stroke-width="1.4"/><path d="M-6 -2h28M-6 6h28M-6 14h18" stroke="#8FB0CC"/><path d="M-6 22h22v10h-22z" fill="${C.mark}"/>`;
  const quote=`<rect x="-22" y="-16" width="44" height="54" fill="#24507A" stroke="#DCE7F1" stroke-width="1.4"/><path d="M-14 -4h28M-14 4h28M-14 12h16" stroke="#8FB0CC"/><rect x="-14" y="18" width="28" height="12" fill="${C.copper}"/><text x="0" y="27" font-family="IBM Plex Mono" font-size="7" font-weight="600" fill="#fff" text-anchor="middle">$ FIXED</text>`;
  const work=`<rect x="-24" y="-16" width="48" height="54" fill="#24507A" stroke="#DCE7F1" stroke-width="1.4"/><path d="M-16 -6h32v20h-32z" fill="none" stroke="#8FB0CC"/><path d="M-16 2h32M-8 -6v20M4 -6v20" stroke="#8FB0CC" stroke-width=".8"/><rect x="-8" y="2" width="12" height="12" fill="${C.mark}" opacity=".85"/><path d="M-16 24h32M-16 30h20" stroke="#8FB0CC"/><path d="M18 -20l8 8" stroke="${C.copper}" stroke-width="3"/>`;
  const book=`<rect x="-26" y="-14" width="52" height="50" fill="#24507A" stroke="#DCE7F1" stroke-width="1.4"/><rect x="-26" y="-14" width="52" height="8" fill="#1B3A58"/><path d="M-26 2h52M-26 10h52M-26 18h52M-26 26h52M-14 -6v42M4 -6v42" stroke="#8FB0CC" stroke-width=".8"/><rect x="4" y="26" width="22" height="8" fill="${C.mark}"/><rect x="18" y="-24" width="14" height="14" fill="${C.copper}"/><text x="25" y="-14" font-family="IBM Plex Mono" font-size="7" font-weight="700" fill="#fff" text-anchor="middle">PDF</text>`;
  const xs=[110,340,570,800];
  s+=doc(xs[0],60,'PLAN SET + BID DATE',sheets)+doc(xs[1],60,'FIXED QUOTE — APPROVE',quote)+doc(xs[2],60,'TAKEOFF & PRICING',work)+doc(xs[3],60,'EXCEL WORKBOOK + PDF',book);
  for(let i=0;i<3;i++){ s+=`<path d="M${xs[i]+48} 74H${xs[i+1]-48}" stroke="${C.mark}" stroke-width="1.6" stroke-dasharray="6 5" marker-end="url(#arr${id})"/>`; }
  s+=`<defs><marker id="arr${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.mark}"/></marker></defs>`;
  const lbl=['01','02','03','04']; xs.forEach((x,i)=>s+=t(x,20,'STEP '+lbl[i],{a:'middle',f:9,w:600,c:C.mark}));
  return svg(W,H,s);
}

