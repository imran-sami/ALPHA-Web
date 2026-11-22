/* ===== v26b: storage as premium diagrams (rings / treemap / bubbles / bars) + click for details ===== */
(()=>{
const TR={'Storage':'স্টোরেজ','Rings':'রিং','Treemap':'ট্রিম্যাপ','Bubbles':'বাবল','Bars':'বার','Largest files':'বড় ফাইলগুলো','Share of Protected':'সুরক্ষিতের অংশ','Last added':'সর্বশেষ যোগ','Other site data':'অন্যান্য সাইট ডেটা','free of':'ফাঁকা, মোট','Open Trash':'ট্র্যাশ খুলুন','Total storage':'মোট স্টোরেজ','Tap any shape for details':'বিস্তারিত দেখতে যেকোনো আকারে ট্যাপ করুন','Average size':'গড় আকার','Largest file':'বৃহত্তম ফাইল','Protected is empty':'সুরক্ষিত খালি'};
try{Object.assign(D,TR);for(const k in TR)if(!DK.includes(k))DK.push(k);DK.sort((a,b)=>b.length-a.length)}catch(e){}
const COL={doc:['#7dd3fc','#2563eb'],txt:['#c4b5fd','#7c3aed'],pdf:['#fda4af','#e11d48'],img:['#6ee7b7','#059669'],aud:['#fde68a','#d97706'],vid:['#f9a8d4','#be185d'],ppt:['#fdba74','#ea580c'],code:['#67e8f9','#0891b2'],oth:['#cbd5e1','#475569'],trash:['#94a3b8','#334155']};
const NAME={doc:'Documents',txt:'Text',pdf:'PDF',img:'Images',aud:'Audio',vid:'Video',ppt:'Presentations',code:'Codes',oth:'Other',trash:'Trash'};
const ICON={doc:'📄',txt:'📝',pdf:'📕',img:'🖼',aud:'🎵',vid:'🎬',ppt:'📊',code:'💻',oth:'📦',trash:'🗑'};
const mbf=n=>n>=1e9?(n/1e9).toFixed(2)+' GB':n>=1e6?(n/1e6).toFixed(n>=1e8?0:1)+' MB':n>=1e3?Math.round(n/1e3)+' KB':(n||0)+' B';
const pctS=(u,q)=>{const p=q?u/q*100:0;return !u?'0%':p<0.01?'<0.01%':p<1?p.toFixed(2)+'%':p<10?p.toFixed(1)+'%':Math.round(p)+'%'};
const H=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const st=document.createElement('style');st.textContent=`
#stg2{margin-bottom:16px;overflow:hidden}
#stg2 .sh{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px}
#stg2 .sh h3{margin:0;flex:1}
#stg2 .vs{display:flex;gap:4px;flex-wrap:wrap}
#stg2 .vs .chip{padding:5px 10px;font-size:12px}
#stg2 .vs .chip.on{background:var(--a);color:#fff;border-color:var(--a)}
#stg2 svg{display:block;width:100%;height:auto;max-height:340px;margin:6px auto 0}
#stg2 [data-k]{cursor:pointer;-webkit-tap-highlight-color:transparent}
#stg2 .sg{transition:filter .2s,transform .2s;transform-box:fill-box;transform-origin:center}
#stg2 .sg:hover{filter:brightness(1.18) drop-shadow(0 0 6px rgba(255,255,255,.35))}
#stg2 .lg{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
#stg2 .lg button{display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border-radius:99px;border:1px solid var(--bd);background:var(--card);color:var(--tx);font-size:12px;cursor:pointer}
#stg2 .lg i{width:9px;height:9px;border-radius:50%;display:inline-block}
#stg2 circle.arc{transform-box:view-box;transform-origin:0 0;animation:stgd 1.1s ease-out both}@keyframes stgd{from{stroke-dasharray:0 999}}
.sdt .gr{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px;margin:12px 0}
.sdt .gr>div{background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:9px 11px}
.sdt .gr b{display:block;font-size:16px}.sdt .gr span{font-size:11.5px;opacity:.7}
.sdt .fr{display:flex;align-items:center;gap:8px;padding:8px 4px;border-bottom:1px solid var(--bd);cursor:pointer}
.sdt .fr:last-child{border:0}.sdt .fr .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sdt .fr .bar{height:4px;border-radius:4px;margin-top:4px}
.sdt .ex{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
.sdt .ex span{font-size:11.5px;padding:3px 9px;border-radius:99px;background:var(--card);border:1px solid var(--bd)}
`;document.head.appendChild(st);
let VIEW=localStorage.getItem('alpha.stv')||'rings',DATA=null;
const defs=()=>`<defs><filter id="gl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>${Object.keys(COL).map(k=>`<linearGradient id="g-${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${COL[k][0]}"/><stop offset="1" stop-color="${COL[k][1]}"/></linearGradient><radialGradient id="r-${k}" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="${COL[k][0]}"/><stop offset="1" stop-color="${COL[k][1]}"/></radialGradient>`).join('')}<linearGradient id="g-dev" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="var(--a)"/><stop offset="1" stop-color="var(--b)"/></linearGradient></defs>`;
/* ---- data ---- */
async function gather(){
 const all=await rows().catch(()=>[]),cats={};
 const add=(k,f)=>{const c=cats[k]||(cats[k]={k,v:0,n:0,files:[],ext:{},last:0});c.v+=f.size||0;c.n++;c.files.push(f);const e=(ext(f.name)||'file').toLowerCase();(c.ext[e]||(c.ext[e]={n:0,v:0})).n++;c.ext[e].v+=f.size||0;c.last=Math.max(c.last,f.added||f.id||0)};
 for(const f of all){if(f.id=='avatar')continue;add(f.trash?'trash':fcat(f),f)}
 const list=Object.values(cats).sort((a,b)=>b.v-a.v);
 let est=null;
 let pr=false;try{pr=!!(navigator.storage&&navigator.storage.persisted&&await navigator.storage.persisted())}catch(e){}
 const vault=list.reduce((a,c)=>a+c.v,0),nfiles=list.reduce((a,c)=>a+c.n,0);
 est={usage:vault,quota:100e9};return{list,cats,vault,nfiles,est,pr}}
/* ---- shapes ---- */
const seg=(c,i)=>c; // placeholder
function rings(d){
 const R=64,C=2*Math.PI*R,tot=d.vault||1,min=tot*.035;const vs=d.list.map(c=>Math.max(c.v,min)),T=vs.reduce((a,b)=>a+b,0)||1;let o=0;
 const gap=d.list.length>1?3:0;
 const arcs=d.list.map((c,i)=>{const l=vs[i]/T*C,len=Math.max(1,l-gap),e=`<circle class="sg arc" data-k="${c.k}" role="button" aria-label="${NAME[c.k]}" cx="160" cy="120" r="${R}" fill="none" stroke="url(#g-${c.k})" stroke-width="16" stroke-linecap="round" stroke-dasharray="${len} ${C}" stroke-dashoffset="${-o}" transform="rotate(-90 160 120)" ${c.k=='trash'?'opacity=".75"':''}><title>${NAME[c.k]} · ${mbf(c.v)}</title></circle>`;o+=l;return e}).join('');
 const q=d.est&&d.est.quota?Math.min(1,d.est.usage/d.est.quota):0,R2=88,C2=2*Math.PI*R2;
 const dev=d.est&&d.est.quota?`<circle cx="160" cy="120" r="${R2}" fill="none" stroke="var(--bd)" stroke-width="6" opacity=".6"/><circle class="sg arc" data-k="dev" role="button" aria-label="Device" cx="160" cy="120" r="${R2}" fill="none" stroke="url(#g-dev)" stroke-width="6" stroke-linecap="round" stroke-dasharray="${Math.max(2,q*C2)} ${C2}" transform="rotate(-90 160 120)" filter="url(#gl)"><title>Device · ${mbf(d.est.usage)} / ${mbf(d.est.quota)}</title></circle>`:'';
 const base=`<circle cx="160" cy="120" r="${R}" fill="none" stroke="var(--bd)" stroke-width="16" opacity=".35"/>`;
 return `<svg viewBox="0 0 320 240">${defs()}${dev}${base}${arcs}<text x="160" y="116" text-anchor="middle" font-size="17" font-weight="800" fill="var(--tx)">${mbf(d.vault)}</text><text x="160" y="133" text-anchor="middle" font-size="10.5" fill="var(--mu)">${d.nfiles} files · of ${mbf(d.est.quota)}</text></svg>`}
function treemap(d){
 const items=d.list.filter(c=>c.v>0||c.n>0),tot=d.vault||1,mn=tot*.06,out=[];
 const its=items.map(c=>({c,v:Math.max(c.v,mn)}));
 (function lay(a,x,y,w,h){if(!a.length)return;if(a.length==1){out.push({c:a[0].c,x,y,w,h});return}
  const t=a.reduce((s,i)=>s+i.v,0);let acc=0,i=0;while(i<a.length-1&&acc+a[i].v<=t/2){acc+=a[i].v;i++}if(i==0){acc=a[0].v;i=1}
  const A=a.slice(0,i),B=a.slice(i),f=acc/t;
  if(w>=h){lay(A,x,y,w*f,h);lay(B,x+w*f,y,w*(1-f),h)}else{lay(A,x,y,w,h*f);lay(B,x,y+h*f,w,h*(1-f))}})(its,0,0,316,226);
 const tiles=out.map(t=>{const c=t.c,g=3,x=t.x+2+g/2,y=t.y+2+g/2,w=Math.max(4,t.w-g),h=Math.max(4,t.h-g),big=w>78&&h>46;
  return `<g class="sg" data-k="${c.k}" role="button" aria-label="${NAME[c.k]}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="url(#g-${c.k})" ${c.k=='trash'?'opacity=".8"':''}/><rect x="${x}" y="${y}" width="${w}" height="${h/2}" rx="14" fill="#fff" opacity=".10"/>${w>34&&h>30?`<text x="${x+10}" y="${y+22}" font-size="${big?20:15}">${ICON[c.k]}</text>`:''}${big?`<text x="${x+10}" y="${y+h-24}" font-size="12.5" font-weight="700" fill="#fff">${NAME[c.k]}</text><text x="${x+10}" y="${y+h-9}" font-size="11" fill="#fff" opacity=".85">${mbf(c.v)} · ${c.n}</text>`:w>60&&h>40?`<text x="${x+8}" y="${y+h-8}" font-size="10.5" font-weight="700" fill="#fff">${mbf(c.v)}</text>`:''}</g>`}).join('');
 return `<svg viewBox="0 0 320 230">${defs()}${tiles}</svg>`}
function bubbles(d){
 const items=d.list.filter(c=>c.n>0),mx=Math.max(1,...items.map(c=>c.v)),W=320,Ht=240,P=[];
 const rad=c=>16+Math.sqrt(c.v/mx)*36;
 for(const c of items){let r=rad(c),placed=false;
  for(let tries=0;tries<8&&!placed;tries++,r*=.88){
   for(let s=0;s<1400&&!placed;s++){const a=s*.62,dist=s==0?0:2.2*Math.sqrt(s)*3,x=W/2+Math.cos(a)*dist*1.35,y=Ht/2+Math.sin(a)*dist*.95;
    if(x-r<4||x+r>W-4||y-r<4||y+r>Ht-4)continue;
    if(P.every(p=>Math.hypot(p.x-x,p.y-y)>=p.r+r+3)){P.push({c,x,y,r});placed=true}}}}
 return `<svg viewBox="0 0 320 240">${defs()}${P.map(p=>`<g class="sg" data-k="${p.c.k}" role="button" aria-label="${NAME[p.c.k]}" filter="url(#gl)"><circle cx="${p.x}" cy="${p.y}" r="${p.r}" fill="url(#r-${p.c.k})" opacity="${p.c.k=='trash'?.75:.95}"/><circle cx="${p.x-p.r*.3}" cy="${p.y-p.r*.35}" r="${p.r*.28}" fill="#fff" opacity=".18"/><text x="${p.x}" y="${p.y-(p.r>28?2:-4)}" text-anchor="middle" font-size="${Math.min(24,p.r*.7)}">${ICON[p.c.k]}</text>${p.r>28?`<text x="${p.x}" y="${p.y+p.r*.52}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff">${mbf(p.c.v)}</text>`:''}</g>`).join('')}</svg>`}
function bars(d){
 const items=d.list.filter(c=>c.n>0),mx=Math.max(1,...items.map(c=>c.v)),tot=d.vault||1,rowH=26,Hh=30+items.length*rowH;
 let x0=10;const stack=items.map(c=>{const w=Math.max(3,c.v/tot*300),r=`<rect class="sg" data-k="${c.k}" x="${x0}" y="6" width="${w}" height="14" fill="url(#g-${c.k})"/>`;x0+=w;return r}).join('');
 const rowsS=items.map((c,i)=>{const y=34+i*rowH,w=Math.max(6,c.v/mx*165);return `<g class="sg" data-k="${c.k}" role="button" aria-label="${NAME[c.k]}"><text x="10" y="${y+11}" font-size="12">${ICON[c.k]}</text><text x="30" y="${y+11}" font-size="11.5" fill="var(--tx)">${NAME[c.k]}</text><rect x="104" y="${y}" width="${w}" height="14" rx="7" fill="url(#g-${c.k})"/><text x="${110+w}" y="${y+11}" font-size="10.5" fill="var(--mu)">${mbf(c.v)}</text></g>`}).join('');
 return `<svg viewBox="0 0 320 ${Hh}"><clipPath id="cp"><rect x="10" y="6" width="300" height="14" rx="7"/></clipPath>${defs()}<g clip-path="url(#cp)">${stack}</g>${rowsS}</svg>`}
/* ---- card ---- */
function paint(){
 const box=document.getElementById('stg2');if(!box||!DATA)return;const d=DATA;
 const used=d.vault,est=d.est;
 const empty=!d.nfiles;
 const vis=empty?`<svg viewBox="0 0 320 200">${defs()}<circle cx="160" cy="100" r="62" fill="none" stroke="var(--bd)" stroke-width="20" opacity=".5"/><text x="160" y="104" text-anchor="middle" font-size="13" fill="var(--mu)">Protected is empty</text></svg>`:VIEW=='tree'?treemap(d):VIEW=='bub'?bubbles(d):VIEW=='bars'?bars(d):rings(d);
 const lg=d.list.map(c=>`<button data-k="${c.k}"><i style="background:linear-gradient(135deg,${COL[c.k][0]},${COL[c.k][1]})"></i>${NAME[c.k]} · ${mbf(c.v)}</button>`).join('');
 box.innerHTML=`<div class="sh"><h3>Storage</h3><div class="vs">${[['rings','◔ Rings'],['tree','▦ Treemap'],['bub','◉ Bubbles'],['bars','▮ Bars']].map(([k,l])=>`<button class="chip ${VIEW==k?'on':''}" data-v="${k}">${l}</button>`).join('')}</div></div>
 <div class="mu" style="font-size:12px">${mbf(used)} in Protected · ${d.nfiles} files${est&&est.quota?` · ${mbf(Math.max(0,est.quota-est.usage))} free of ${mbf(est.quota)} (${pctS(est.usage,est.quota)} used)`:''}</div>${vis}
 <div class="lg">${lg}${est&&est.quota?`<button data-k="dev"><i style="background:linear-gradient(90deg,var(--a),var(--b))"></i>Total storage</button>`:''}</div>
 <div class="mu" style="font-size:11.5px;margin-top:8px">Tap any shape for details</div>`}
function detail(k){
 const d=DATA;if(!d)return;const mc=document.getElementById('mc');
 if(k=='dev'){const e=d.est||{usage:0,quota:0},other=Math.max(0,e.usage-d.vault),free=Math.max(0,e.quota-e.usage),pc=e.quota?Math.min(100,e.usage/e.quota*100):0;
  const parts=[['Protected',d.vault,'g-dev'],['Other site data',other,'g-oth'],['Free',free,null]];
  mc.innerHTML=`<div class="sdt" style="width:min(92vw,460px)"><div class="row sp"><b style="font-size:18px">💾 Total storage</b><button class="chip sm" id="mx">Close</button></div>
  <svg viewBox="0 0 320 70" style="width:100%;margin-top:8px">${defs()}<rect x="10" y="22" width="300" height="22" rx="11" fill="var(--bd)" opacity=".5"/><clipPath id="dc"><rect x="10" y="22" width="300" height="22" rx="11"/></clipPath><g clip-path="url(#dc)"><rect x="10" y="22" width="${Math.max(2,d.vault/(e.quota||1)*300)}" height="22" fill="url(#g-dev)"/><rect x="${10+d.vault/(e.quota||1)*300}" y="22" width="${Math.max(0,other/(e.quota||1)*300)}" height="22" fill="url(#g-oth)"/></g><text x="10" y="14" font-size="11" fill="var(--mu)">${pctS(e.usage,e.quota)} used</text></svg>
  <div class="gr"><div><b>${mbf(d.vault)}</b><span>Protected</span></div><div><b>${mbf(free)}</b><span>Free</span></div><div><b>${mbf(e.quota)}</b><span>Total storage</span></div><div><b>${d.nfiles}</b><span>Files</span></div></div>
  <div class="mu" style="margin-top:6px">${d.pr?'✓ Persistent storage on — the browser will not clear your files automatically.':'Persistent storage is off — the browser may clear files if the device runs low on space.'}</div>${d.pr?'':'<button class="chip" id="stp2" style="margin-top:10px">Keep my files safe (enable)</button>'}</div>`;
  document.getElementById('mx').onclick=shut;const b=document.getElementById('stp2');if(b)b.onclick=async()=>{let ok=false;try{ok=await navigator.storage.persist()}catch(e){}toast(ok?'Persistent storage enabled':'Your browser did not allow it. Installing ALPHA to the home screen usually helps.');shut();V.vault()};
  document.getElementById('modal').style.display='flex';return}
 const c=d.cats[k];if(!c)return;const share=d.vault?c.v/d.vault*100:0,big=[...c.files].sort((a,b)=>(b.size||0)-(a.size||0)).slice(0,5),mx=(big[0]&&big[0].size)||1;
 const ex=Object.entries(c.ext).sort((a,b)=>b[1].v-a[1].v).slice(0,6);
 const R=26,C=2*Math.PI*R;
 const dt=c.last?new Date(c.last).toLocaleDateString([], {month:'short',day:'numeric',year:'numeric'}):'—';
 mc.innerHTML=`<div class="sdt" style="width:min(92vw,460px);max-height:82vh;overflow:auto"><div class="row sp"><b style="font-size:18px">${ICON[k]} ${NAME[k]}</b><button class="chip sm" id="mx">Close</button></div>
 <div class="row" style="margin-top:12px;gap:14px"><svg viewBox="0 0 70 70" width="84" height="84">${defs()}<circle cx="35" cy="35" r="${R}" fill="none" stroke="var(--bd)" stroke-width="9"/><circle cx="35" cy="35" r="${R}" fill="none" stroke="url(#g-${k})" stroke-width="9" stroke-linecap="round" stroke-dasharray="${Math.max(2,share/100*C)} ${C}" transform="rotate(-90 35 35)"/><text x="35" y="39" text-anchor="middle" font-size="12" font-weight="800" fill="var(--tx)">${share<1&&share>0?'<1':Math.round(share)}%</text></svg>
 <div><div class="big" style="font-size:26px">${mbf(c.v)}</div><div class="mu">${c.n} ${c.n==1?'file':'files'} · Share of Protected</div></div></div>
 <div class="gr"><div><b>${c.n}</b><span>Files</span></div><div><b>${mbf(c.n?c.v/c.n:0)}</b><span>Average size</span></div><div><b>${mbf((big[0]&&big[0].size)||0)}</b><span>Largest file</span></div><div><b>${dt}</b><span>Last added</span></div></div>
 ${ex.length?`<div class="mu" style="font-size:12px">Types</div><div class="ex">${ex.map(([e,v])=>`<span>${H(e.toUpperCase())} · ${v.n} · ${mbf(v.v)}</span>`).join('')}</div>`:''}
 <h4 class="mu" style="margin:14px 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:1px">Largest files</h4>
 ${big.map(f=>`<div class="fr" data-fid="${f.id}"><div class="nm">${H(f.name)}<div class="bar" style="width:${Math.max(4,(f.size||0)/mx*100)}%;background:linear-gradient(90deg,${COL[k][0]},${COL[k][1]})"></div></div><b style="font-size:12.5px;white-space:nowrap">${mbf(f.size||0)}</b></div>`).join('')}
 <div class="row" style="margin-top:14px"><button class="btn" id="stgo" style="flex:1">${k=='trash'?'Open Trash':'Open '+NAME[k]}</button></div></div>`;
 document.getElementById('mx').onclick=shut;
 document.getElementById('stgo').onclick=()=>{shut();if(k=='trash')trashP();else fcPage(k)};
 mc.querySelectorAll('[data-fid]').forEach(r=>r.onclick=()=>{shut();fileP(+r.dataset.fid)});
 document.getElementById('modal').style.display='flex'}
window.__skStg={gather,detail,treemap,bubbles,bars,get DATA(){return DATA}};
/* ---- hook into the Vault page ---- */
const _v=V.vault;V.vault=async function(){await _v.apply(this,arguments);if(view!='vault')return;
 const old=document.getElementById('stg');if(!old)return;
 const card=document.createElement('div');card.className='card';card.id='stg2';card.innerHTML='<h3>Storage</h3><div class="mu">Checking…</div>';old.replaceWith(card);
 try{DATA=await gather();paint()}catch(e){card.innerHTML='<h3>Storage</h3><div class="mu">Could not read storage.</div>'}
 card.addEventListener('click',e=>{const v=e.target.closest('[data-v]');if(v){VIEW=v.dataset.v;try{localStorage.setItem('alpha.stv',VIEW)}catch(x){}paint();return}const k=e.target.closest('[data-k]');if(k)detail(k.dataset.k)})};
})();
