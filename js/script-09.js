/* ===== v10: multi-select - select / select all / cut / copy / move / paste / delete / trash (tasks, vault files, trash) ===== */
(()=>{
const st=document.createElement('style');st.textContent=`
.selm .tk .ck,.selm .tk [data-p]{display:none}
.selm .tk:hover{transform:none}
.tk[data-e],.tk[data-f],.card[data-tid]{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
.sk{width:26px;height:26px;border-radius:9px;border:2px solid var(--a);flex:none;display:grid;place-items:center;font-size:16px;font-weight:800;line-height:1;color:#fff;transition:background .15s}
.sel>.sk{background:var(--a)}
.tk.sel,.card.sel{border-color:var(--a);background:linear-gradient(0deg,var(--glow),var(--glow)),var(--card)}
.card[data-tid]{position:relative}.card[data-tid]>.sk{position:absolute;top:16px;right:16px}.card[data-tid]>b{padding-right:38px}
#sbar{position:sticky;bottom:10px;z-index:5;margin-top:18px;padding:12px;border-radius:24px;background:var(--bg2);border:1px solid var(--a);box-shadow:0 14px 40px -8px rgba(0,0,0,.6),0 0 26px -8px var(--glow);display:flex;flex-direction:column;gap:10px}
#sbar .r{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
#sbar .r b{flex:1;min-width:110px}
#sbar .chip[disabled]{opacity:.4;pointer-events:none}
#sbar .dg{color:#ff6b81;border-color:#ff6b8166}
`;document.head.appendChild(st);

/* Bengali labels (only added where missing) */
const bn={'Select items':'বাছাই করুন','Select all':'সব বাছাই করুন','Deselect all':'সব বাদ দিন','selected':'নির্বাচিত','Cancel':'বাতিল','Cut':'কাট','Copy':'কপি','Paste here':'এখানে পেস্ট করুন','Move to…':'সরান…','Delete forever':'চিরতরে মুছুন','Open another category to paste':'পেস্ট করতে অন্য ক্যাটাগরি খুলুন'};
Object.keys(bn).forEach(k=>{if(!(k in D))D[k]=bn[k]});DK.length=0;DK.push(...Object.keys(D));DK.sort((a,b)=>b.length-a.length);

const SEL={on:false,ids:new Set(),key:'',keep:false};let CLIP=null;
const rowSel=()=>view=='cat'?'#main .tk[data-e]':view=='fc'?'#main .tk[data-f]':view=='trash'?'#main .card[data-tid]':'';
const rows$=()=>{const s=rowSel();return s?[...document.querySelectorAll(s)]:[]};
const rid=r=>r.dataset.e||r.dataset.f||r.dataset.tid;
const ctxKey=()=>view=='cat'?'cat:'+curCat:view=='fc'?'fc:'+fcur:view;
const here=()=>view=='cat'?curCat:fcur;
const plural=(n,w)=>n+' '+w+(n>1?'s':'');
const rerender=()=>view=='cat'?catPage():view=='fc'?fcPage(fcur):trashP();
const finish=()=>{SEL.on=false;SEL.ids.clear();SEL.keep=false;rerender()};
const fmap=async()=>new Map((await rows()).map(f=>[String(f.id),f]));
const setCat=(f,t)=>{delete f.cat;if(fcat(f)!=t)f.cat=t};

function pick(title,opts,cb){
  $('#mc').innerHTML=`<div style="width:min(88vw,380px)"><div class="row sp"><b style="font-size:18px">${title}</b><button class="chip sm" id="mx">Close</button></div><div style="display:grid;gap:10px;margin-top:14px">${opts.map(o=>`<button class="chip" style="text-align:left;padding:14px 16px;font-size:15px" data-pk="${o[0]}">${o[1]}</button>`).join('')}</div></div>`;
  $('#mx').onclick=shut;document.querySelectorAll('[data-pk]').forEach(b=>b.onclick=()=>{shut();cb(b.dataset.pk)});$('#modal').style.display='flex'}

function paint(){
  const m=$('#main');if(!m)return;m.classList.toggle('selm',SEL.on&&!!rowSel());
  rows$().forEach(r=>{let k=r.querySelector(':scope>.sk');
    if(SEL.on){if(!k){k=document.createElement('span');k.className='sk';r.insertBefore(k,r.firstChild)}const on=SEL.ids.has(rid(r));r.classList.toggle('sel',on);k.textContent=on?'✓':''}
    else{if(k)k.remove();r.classList.remove('sel')}});
  bar();window.__gfSync&&window.__gfSync()}
const selAll=()=>rows$().forEach(r=>SEL.ids.add(rid(r)));
const enter=id=>{SEL.on=true;if(id!=null)SEL.ids.add(String(id));paint()};
const exit=()=>{SEL.on=false;SEL.ids.clear();paint()};
const toggle=id=>{id=String(id);SEL.ids.has(id)?SEL.ids.delete(id):SEL.ids.add(id);paint()};

function clipSet(mode){
  const t=view=='cat';
  CLIP={kind:t?'task':'file',mode,ids:[...SEL.ids],from:here(),items:t?tasks.filter(x=>SEL.ids.has(String(x.id))).map(x=>({...x})):null};
  const n=CLIP.ids.length;toast(plural(n,CLIP.kind)+(mode=='cut'?' cut. Open another category and tap Paste here':' copied. Open a category and tap Paste here'));exit()}

async function paste(){
  if(!CLIP)return;
  if(CLIP.kind=='task'){
    let n=0;
    if(CLIP.mode=='cut')CLIP.ids.forEach(id=>{const x=tasks.find(t=>String(t.id)==id);if(x&&x.cat!=curCat){x.cat=curCat;n++}});
    else{const b=Date.now();CLIP.items.forEach((s,i)=>{tasks.push(Object.assign({},s,{id:b+i,cat:curCat,af:'',sn:0}));n++})}
    svT();toast(plural(n,'task')+(CLIP.mode=='cut'?' moved to ':' pasted into ')+curCat)}
  else{
    const M=await fmap();let n=0;
    for(const id of CLIP.ids){const f=M.get(id);if(!f||f.trash)continue;
      if(CLIP.mode=='cut'){setCat(f,fcur);await svf(f)}
      else{const t=Date.now()+n,c=Object.assign({},f,{id:t+Math.random(),added:t,edited:t,trash:0});setCat(c,fcur);if(fcat(f)==fcur)c.name=f.name.replace(/(\.[A-Za-z0-9]+)?$/,' (copy)$1');await svf(c)}
      n++}
    toast(plural(n,'file')+(CLIP.mode=='cut'?' moved to ':' pasted into ')+FI[fcur][2])}
  if(CLIP.mode=='cut')CLIP=null;
  rerender()}

function bar(){
  const o=$('#sbar');if(o)o.remove();
  const m=$('#main');if(!m||!rowSel())return;
  const n=SEL.ids.size,tot=rows$().length;let h='';
  if(SEL.on){
    const d=n?'':' disabled';
    const acts=view=='trash'
      ?`<button class="chip sm" id="a-rs"${d}>♻️ Restore</button><button class="chip sm dg" id="a-df"${d}>🗑 Delete forever</button>`
      :`<button class="chip sm" id="a-cut"${d}>✂️ Cut</button><button class="chip sm" id="a-cp"${d}>📋 Copy</button><button class="chip sm" id="a-mv"${d}>📂 Move to…</button><button class="chip sm dg" id="a-dl"${d}>🗑 ${view=='cat'?'Delete':'Trash'}</button>`;
    h=`<div class="r"><b>${n}/${tot} selected</b><button class="chip sm" id="a-all">${n==tot&&tot?'Deselect all':'Select all'}</button><button class="chip sm" id="a-x">✕ Cancel</button></div><div class="r">${acts}</div>`}
  else if(CLIP&&((CLIP.kind=='task'&&view=='cat')||(CLIP.kind=='file'&&view=='fc'))){
    const same=CLIP.mode=='cut'&&CLIP.from==here(),c=CLIP.ids.length;
    h=`<div class="r"><b>📋 ${plural(c,CLIP.kind)} ${CLIP.mode=='cut'?'cut':'copied'}${same?'<div class="mu" style="font-weight:500">Open another category to paste</div>':''}</b>${same?'':'<button class="chip sm on" id="a-ps" style="background:var(--a)">Paste here</button>'}<button class="chip sm" id="a-cl" aria-label="Clear clipboard">✕</button></div>`}
  if(!h)return;
  m.insertAdjacentHTML('beforeend',`<div id="sbar">${h}</div>`);
  const q=i=>$('#'+i),on=(i,f)=>{const e=q(i);if(e)e.onclick=f};
  on('a-all',()=>{SEL.ids.size==tot?SEL.ids.clear():selAll();paint()});
  on('a-x',exit);on('a-cl',()=>{CLIP=null;bar()});on('a-ps',paste);
  on('a-cut',()=>clipSet('cut'));on('a-cp',()=>clipSet('copy'));
  on('a-mv',()=>{const ids=[...SEL.ids];
    if(view=='cat')pick('Move to category',Object.keys(IC).filter(k=>k!=curCat).map(k=>[k,IC[k]+' '+k]),t=>{let c=0;tasks.forEach(x=>{if(SEL.ids.has(String(x.id))){x.cat=t;c++}});svT();toast(plural(c,'task')+' moved to '+t);finish()});
    else pick('Move to category',FC.filter(c=>c[0]!=fcur).map(c=>[c[0],c[1]+' '+c[2]]),async t=>{const M=await fmap();let c=0;for(const id of ids){const f=M.get(id);if(f){setCat(f,t);await svf(f);c++}}toast(plural(c,'file')+' moved to '+FI[t][2]);finish()})});
  on('a-dl',()=>{const ids=[...SEL.ids];
    if(view=='cat')ask('Delete '+plural(ids.length,'task')+'? This cannot be undone.',()=>{tasks=tasks.filter(x=>!SEL.ids.has(String(x.id)));svT();toast(plural(ids.length,'task')+' deleted');finish()});
    else(async()=>{const M=await fmap(),t=Date.now();let c=0;for(const id of ids){const f=M.get(id);if(f){f.trash=t;await svf(f);c++}}toast(plural(c,'file')+' moved to trash');finish()})()});
  on('a-rs',async()=>{const M=await fmap();let c=0;for(const id of [...SEL.ids]){const f=M.get(id);if(f){f.trash=0;await svf(f);c++}}toast(plural(c,'file')+' restored');finish()});
  on('a-df',async()=>{const M=await fmap(),ids=[...SEL.ids];ask('Delete '+plural(ids.length,'file')+' permanently? This cannot be undone.',async()=>{for(const id of ids){const f=M.get(id);if(f)await tx('readwrite',s=>s.delete(f.id))}toast('Deleted');finish()})});
}

/* long press helper: fires cb after ms unless the finger moves / lifts */
function longPress(el,cb){let t,sx,sy;const clr=()=>clearTimeout(t);
  el.addEventListener('pointerdown',e=>{if(e.button>0)return;sx=e.clientX;sy=e.clientY;clr();t=setTimeout(()=>{LP.fired=true;if(navigator.vibrate)try{navigator.vibrate(15)}catch(_){}cb(e)},480)});
  el.addEventListener('pointermove',e=>{if(Math.abs(e.clientX-sx)>10||Math.abs(e.clientY-sy)>10)clr()});
  ['pointerup','pointercancel','pointerleave'].forEach(n=>el.addEventListener(n,()=>{clr();if(LP.fired)setTimeout(()=>LP.fired=false,80)}))}
const LP={fired:false};

function after(){
  const key=ctxKey();
  if(!SEL.keep||SEL.key!=key){SEL.on=false;SEL.ids.clear()}
  SEL.keep=false;SEL.key=key;
  if(view=='trash')document.querySelectorAll('#main [data-r]').forEach(b=>{const c=b.closest('.card');if(c)c.dataset.tid=b.dataset.r});
  const rs=rows$();
  if(rs.length){
    const html='<button class="chip" id="selb" title="Long-press to select everything">☑ Select items</button>';
    if(view=='cat'){const c=$('#main .chips');if(c)c.insertAdjacentHTML('beforeend',html)}
    else rs[0].insertAdjacentHTML('beforebegin','<div class="chips">'+html+'</div>');
    const b=$('#selb');if(b){b.onclick=e=>{if(LP.fired)return;enter()};longPress(b,()=>{selAll();enter()})}}
  const present=new Set(rs.map(rid));[...SEL.ids].forEach(i=>{if(!present.has(i))SEL.ids.delete(i)});
  paint()}

const _cp=catPage;catPage=function(){_cp();after()};
const _fp=fcPage;fcPage=async function(k){await _fp(k);if(view=='fc')after()};
const _tp=trashP;trashP=async function(){await _tp();if(view=='trash')after()};
const _go=go;go=function(v){SEL.on=false;SEL.ids.clear();const m=$('#main');if(m)m.classList.remove('selm');return _go(v)};

/* tap = toggle while selecting; long-press a row = start selecting */
const M=$('#main');
M.addEventListener('click',e=>{
  const s=rowSel();if(!s)return;const r=e.target.closest(s);
  if(LP.fired&&r){LP.fired=false;e.stopPropagation();e.preventDefault();return}
  if(!SEL.on||!r)return;e.stopPropagation();e.preventDefault();toggle(rid(r))},true);
M.addEventListener('contextmenu',e=>{const s=rowSel();if(s&&e.target.closest(s))e.preventDefault()});
longPress(M,e=>{const s=rowSel();if(!s)return;const r=document.elementFromPoint(e.clientX,e.clientY);const row=r&&r.closest&&r.closest(s);if(!row)return;
  if(!SEL.on)enter(rid(row));else toggle(rid(row))});
addEventListener('keydown',e=>{if(e.key=='Escape'&&SEL.on&&$('#modal').style.display!='flex')exit()});
window.__gfSel={SEL,exit,selAll,rows$,LP,paint:()=>paint()};
})();
