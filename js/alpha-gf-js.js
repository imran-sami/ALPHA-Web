/* ===== ALPHA Files-style actions: copy / move / rename / share / star / info / trash+undo / viewer with zoom / sort / grid. Replaces the old confirm box + action bar for files. ===== */
(()=>{
if(window.__gf||!window.__gfSel)return;window.__gf=1;
const{SEL,exit,selAll,rows$,LP,paint}=window.__gfSel;
const fmap=async()=>new Map((await rows()).map(f=>[String(f.id),f]));
const setCat=(f,t)=>{delete f.cat;if(fcat(f)!=t)f.cat=t};
const D=document,Q=(s,r=D)=>r.querySelector(s),QA=(s,r=D)=>[...r.querySelectorAll(s)];
const PA={close:'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',back:'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',more:'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',share:'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z',del:'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',delf:'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z',all:'M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z',copy:'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',move:'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 12v-3H8v-2h4V10l4 4-4 4z',edit:'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',info:'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',starb:'M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z',star:'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',dl:'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',open:'M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',rest:'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',sort:'M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z',list:'M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z',grid:'M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z',chk:'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.42z',up:'M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z',down:'M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z',folder:'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z'};
const ic=(n,s=24)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="currentColor" aria-hidden="true"><path d="${PA[n]}"/></svg>`;
const pl=(n,w)=>n+' '+w+(n==1?'':'s');
const byteS=n=>{n=+n||0;if(n<1024)return n+' B';const u=['KB','MB','GB'];let i=-1;do{n/=1024;i++}while(n>=1024&&i<2);return (n>=100?n.toFixed(0):n.toFixed(1)).replace(/\.0$/,'')+' '+u[i]};
const dts=t=>{try{return new Date(t).toLocaleString([],{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'})}catch(e){return ''}};
const MET=new Map(); /* id -> light metadata of the files on screen */
/* ---------- layers (Esc / Android back closes the top one) ---------- */
const ST=[];
function layer(el,onclose){const o={el,close(){const i=ST.indexOf(o);if(i<0)return;ST.splice(i,1);el.classList.remove('in');el.classList.add('out');setTimeout(()=>el.remove(),200);onclose&&onclose()}};ST.push(o);requestAnimationFrame(()=>el.classList.add('in'));return o}
window.__gfBack=()=>{if(ST.length){ST[ST.length-1].close();return true}if(SEL.on&&(view=='fc'||view=='trash')){exit();return true}return false};
addEventListener('keydown',e=>{
  if(e.key=='Escape'){if(ST.length){e.stopImmediatePropagation();ST[ST.length-1].close()}else if(SEL.on&&(view=='fc'||view=='trash'))exit();return}
  const t=e.target,typing=t&&(/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable);if(typing||ST.length)return;
  if(SEL.on&&(view=='fc'||view=='trash')){
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()=='a'){e.preventDefault();selAll();paint()}
    else if((e.key=='Delete'||e.key=='Backspace')&&SEL.ids.size){e.preventDefault();view=='fc'?opTrash([...SEL.ids]):askForever([...SEL.ids])}}
},true);
/* ---------- bottom sheet ---------- */
function sheet(title,items,sub){
  const w=D.createElement('div');w.className='gf-ov';
  w.innerHTML=`<div class="gf-scrim"></div><div class="gf-sheet" role="dialog"><i class="gf-grab"></i>${title?`<div class="gf-sh">${esc(title)}${sub?`<small>${esc(sub)}</small>`:''}</div>`:''}<div class="gf-sl">${items.map((it,i)=>it.sep?'<hr>':`<button class="gf-si${it.danger?' dg':''}" data-i="${i}">${it.ic?ic(it.ic):'<span class="gf-nic"></span>'}<span class="gf-st">${esc(it.t)}${it.sub?`<small>${esc(it.sub)}</small>`:''}</span>${it.on?ic('chk',20):''}</button>`).join('')}</div></div>`;
  D.body.appendChild(w);const L=layer(w);
  w.querySelector('.gf-scrim').onclick=()=>L.close();
  w.querySelector('.gf-sl').onclick=e=>{const b=e.target.closest('.gf-si');if(!b)return;const it=items[+b.dataset.i];L.close();setTimeout(()=>it.fn&&it.fn(),140)};
  /* drag the handle / title down to dismiss */
  const sh=w.querySelector('.gf-sheet');let y0=null,dy=0;
  sh.addEventListener('pointerdown',e=>{if(e.target.closest('.gf-grab,.gf-sh')){y0=e.clientY;dy=0;sh.style.transition='none';try{sh.setPointerCapture(e.pointerId)}catch(_){}}});
  sh.addEventListener('pointermove',e=>{if(y0==null)return;dy=Math.max(0,e.clientY-y0);sh.style.transform=`translate(-50%,${dy}px)`});
  const end=()=>{if(y0==null)return;y0=null;sh.style.transition='';if(dy>90)L.close();else sh.style.transform=''};
  sh.addEventListener('pointerup',end);sh.addEventListener('pointercancel',end);
  return L}
/* ---------- Material dialog ---------- */
function dialog(o){
  const w=D.createElement('div');w.className='gf-dlg';
  w.innerHTML=`<div class="gf-dc" role="dialog" aria-modal="true"><h2>${esc(o.title||'')}</h2>${o.body?`<p>${o.html?o.body:esc(o.body)}</p>`:''}${o.input!=null?`<input type="text" value="${esc(o.input)}" autocomplete="off" spellcheck="false" aria-label="${esc(o.title||'')}"><div class="gf-er"></div>`:''}<div class="gf-ac"><button data-c>${esc(o.cancel||'Cancel')}</button><button data-o class="${o.danger?'dg':''}">${esc(o.ok||'OK')}</button></div></div>`;
  D.body.appendChild(w);const L=layer(w);
  const inp=Q('input',w),er=Q('.gf-er',w),okb=Q('[data-o]',w);
  Q('[data-c]',w).onclick=()=>{L.close();o.oncancel&&o.oncancel()};
  w.addEventListener('pointerdown',e=>{if(e.target===w)L.close()});
  const go=async()=>{if(okb.disabled)return;if(inp){const r=await o.validate?.(inp.value);if(r){er.textContent=r;inp.classList.add('err');return}}okb.disabled=true;L.close();o.onok&&o.onok(inp?inp.value:undefined)};
  okb.onclick=go;
  if(inp){inp.addEventListener('keydown',e=>{if(e.key=='Enter'){e.preventDefault();go()}});inp.addEventListener('input',()=>{inp.classList.remove('err');er.textContent=''});
    setTimeout(()=>{inp.focus();const m=o.input.lastIndexOf('.');inp.setSelectionRange(0,m>0?m:o.input.length)},60)}
  else setTimeout(()=>okb.focus(),60);
  return L}
/* the app's confirm box (Cancel / Confirm) -> Material dialog */
window.ask=function(msg,ok){
  const m=String(msg),er=/erases ALL/i.test(m),del=/delete|remove/i.test(m);
  dialog({title:er?'Erase all data?':del?(/permanent|cannot be undone/i.test(m)?'Delete permanently?':'Delete?'):'Are you sure?',body:m.replace(/\s*This cannot be undone\.$/,''),html:true,ok:er?'Erase':del?'Delete':'Confirm',danger:er||del,onok:ok})};
/* ---------- snackbar with Undo / progress ---------- */
let SN,snT;
function snack(msg,label,fn,ms){
  if(!SN){SN=D.createElement('div');SN.id='gf-snack';SN.setAttribute('role','status');SN.setAttribute('aria-live','polite');D.body.appendChild(SN)}
  clearTimeout(snT);SN.innerHTML=`<span></span>${label?`<button>${esc(label)}</button>`:''}<i></i>`;Q('span',SN).textContent=msg;
  const b=Q('button',SN);if(b)b.onclick=()=>{SN.classList.remove('on');fn&&fn()};
  void SN.offsetWidth;SN.classList.add('on');
  const up=(t,p)=>{if(!SN)return;Q('span',SN).textContent=t;if(p!=null)Q('i',SN).style.width=Math.round(p*100)+'%'};
  if(ms!==0)snT=setTimeout(()=>SN.classList.remove('on'),ms||(label?7000:3200));
  return up}
window.toast=(m,l,f)=>{snack(m,l,f)};
/* ---------- helpers on data ---------- */
const byIds=async ids=>{const M=await fmap();return ids.map(i=>M.get(String(i))).filter(Boolean)};
let rBusy=false,rPend=false;
async function refresh(){SEL.on=false;SEL.ids.clear();SEL.keep=false;if(rBusy){rPend=true;return}rBusy=true;
  try{if(view=='fc'||view=='file')await fcPage(fcur);else if(view=='trash')await trashP();else if(view=='cat')await catPage();else if(view=='vault')await V.vault()}catch(e){console.warn('gf refresh',e)}
  rBusy=false;if(rPend){rPend=false;refresh()}}
const kind=f=>{if(!f)return'';const t=f.type||'',e=ext(f.name||'');return t.startsWith('image')||/^(png|jpe?g|gif|webp|bmp|svg|avif)$/.test(e)?'img':t.startsWith('video')||/^(mp4|webm|mov|mkv)$/.test(e)?'vid':t.startsWith('audio')||/^(mp3|wav|ogg|m4a|aac|flac)$/.test(e)?'aud':''};
const mime=f=>f.type||({png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',gif:'image/gif',webp:'image/webp',svg:'image/svg+xml',mp4:'video/mp4',webm:'video/webm',mp3:'audio/mpeg',wav:'audio/wav',ogg:'audio/ogg',m4a:'audio/mp4'})[ext(f.name)]||'application/octet-stream';
/* ---------- operations ---------- */
async function opTrash(ids,after){
  const fs=await byIds(ids);if(!fs.length)return;const t=Date.now();
  for(const f of fs){f.trash=t;await svf(f)}
  snack(pl(fs.length,'file')+' moved to trash','Undo',async()=>{const M=await fmap();for(const f of fs){const g=M.get(String(f.id));if(g){g.trash=0;await svf(g)}}refresh();snack('Restored')});
  after?after():refresh()}
async function opRestore(ids){const fs=await byIds(ids);for(const f of fs){f.trash=0;await svf(f)}snack(pl(fs.length,'file')+' restored');refresh()}
function askForever(ids){
  dialog({title:ids.length>1?'Delete '+ids.length+' files permanently?':'Delete permanently?',body:'You can’t undo this. Deleted files are gone from Protected.',ok:'Delete',danger:true,onok:async()=>{const fs=await byIds(ids);for(const f of fs)await tx('readwrite',s=>s.delete(f.id));snack(pl(ids.length,'file')+' deleted');refresh()}})}
async function opMove(ids,target){
  const fs=(await byIds(ids)).filter(f=>fcat(f)!=target);if(!fs.length){snack('Already in '+FI[target][2]);return}
  const prev=fs.map(f=>[f.id,f.cat]);for(const f of fs){setCat(f,target);await svf(f)}
  refresh();
  snack(pl(fs.length,'file')+' moved to '+FI[target][2],'Undo',async()=>{const M=await fmap();for(const[id,c]of prev){const g=M.get(String(id));if(g){if(c)g.cat=c;else delete g.cat;await svf(g)}}refresh();snack('Move undone')})}
async function opCopy(ids,target){
  const fs=await byIds(ids);if(!fs.length)return;const made=[];let n=0;
  const up=snack('Copying '+pl(fs.length,'file')+'…',null,null,0);
  try{for(const f of fs){const t=Date.now()+n,c=Object.assign({},f,{id:t+Math.random(),added:t,edited:t,trash:0,starred:false});setCat(c,target);if(fcat(f)==target)c.name=f.name.replace(/(\.[A-Za-z0-9]+)?$/,' (copy)$1');await svf(c);made.push(c.id);n++;up('Copying '+n+' of '+fs.length,n/fs.length);await new Promise(r=>setTimeout(r,0))}}
  catch(e){snack('Copy failed: '+((e&&e.message)||e));refresh();return}
  refresh();
  snack(pl(n,'file')+' copied to '+FI[target][2],'Undo',async()=>{for(const id of made)await tx('readwrite',s=>s.delete(id));refresh();snack('Copy undone')})}
async function opStar(ids,on){const fs=await byIds(ids);for(const f of fs){if(on)f.starred=true;else delete f.starred;await svf(f)}snack(on?pl(fs.length,'file')+' starred':'Removed from starred');refresh()}
async function saveOne(f){const u=URL.createObjectURL(new Blob([await de(f.d)],{type:mime(f)}));const a=D.createElement('a');a.href=u;a.download=f.name;D.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),60000)}
async function opSave(ids){const fs=await byIds(ids);for(const f of fs)await saveOne(f);snack(fs.length>1?'Saving '+fs.length+' files…':'Saving…')}
async function opShare(ids){
  const fs=await byIds(ids);if(!fs.length)return;
  try{const files=[];for(const f of fs)files.push(new File([await de(f.d)],f.name,{type:mime(f)}));
    if(navigator.canShare&&navigator.canShare({files})){await navigator.share({files});return}}
  catch(e){if(e&&e.name=='AbortError')return}
  for(const f of fs)await saveOne(f);snack('Sharing isn’t available here, so the file was saved instead.')}
function gfRename(f){
  if(!f)return;
  dialog({title:'Rename',input:f.name,ok:'OK',validate:async v=>{v=v.trim();if(!v)return'Enter a name';if(/[\\/:*?"<>|]/.test(v))return'A name can’t contain \\ / : * ? " < > |';
      if((await rows()).some(x=>x.id!=f.id&&!x.trash&&x.name==v&&fcat(x)==fcat(f)))return'A file with this name already exists';return''},
    onok:async v=>{const g=await gf(f.id);if(!g)return;g.name=v.trim();g.edited=Date.now();await svf(g);snack('Renamed');refresh();const t=Q('.gf-view .gf-tt');if(t&&Q('.gf-view').dataset.id==String(f.id))t.textContent=g.name}})}
window.ren=gfRename;
function infoSheet(fs){
  const w=D.createElement('div');w.className='gf-ov';let rowsH;
  if(fs.length==1){const f=fs[0],c=FI[fcat(f)];rowsH=[['Name',f.name],['Type',f.type||ext(f.name)||'File'],['Size',byteS(f.size)+' ('+(f.size||0).toLocaleString()+' bytes)'],['Category',c[2]],['Location','ALPHA Protected › '+c[2]],['Added',dts(f.added||f.id)],['Modified',dts(f.edited||f.id)],['Security','AES-256 encrypted on this device']]}
  else rowsH=[['Selected',pl(fs.length,'file')],['Total size',byteS(fs.reduce((a,f)=>a+(f.size||0),0))],['Security','AES-256 encrypted on this device']];
  w.innerHTML=`<div class="gf-scrim"></div><div class="gf-sheet" role="dialog"><i class="gf-grab"></i><div class="gf-sh">Info</div><div class="gf-info">${rowsH.map(r=>`<div><span>${r[0]}</span><b>${esc(r[1])}</b></div>`).join('')}</div></div>`;
  D.body.appendChild(w);const L=layer(w);Q('.gf-scrim',w).onclick=()=>L.close()}
/* ---------- destination picker (Copy to / Move to) ---------- */
async function pickDest(mode,ids,after){
  const all=(await rows()).filter(f=>!f.trash),cnt={};all.forEach(f=>{const k=fcat(f);cnt[k]=(cnt[k]||0)+1});
  const fs=await byIds(ids);if(!fs.length)return;const home=new Set(fs.map(fcat));let pick=null;
  const w=D.createElement('div');w.className='gf-ov gf-page';const verb=mode=='copy'?'Copy':'Move';
  w.innerHTML=`<div class="gf-top"><button data-x aria-label="Back">${ic('back')}</button><div class="gf-tt">${verb} ${pl(fs.length,'file')} to…<small>ALPHA Protected</small></div></div><div class="gf-plist">${FC.map(c=>{const dis=mode=='move'&&home.size==1&&home.has(c[0]);return`<button class="gf-pi" data-k="${c[0]}"${dis?' disabled':''}><span class="gf-pt">${c[1]}</span><span><b>${c[2]}</b><small>${dis?'Current location':pl(cnt[c[0]]||0,'file')}</small></span><span class="gf-rd">${ic('chk',16)}</span></button>`}).join('')}</div><div class="gf-pbar"><button data-x>Cancel</button><button class="pr" data-go disabled>${verb} here</button></div>`;
  D.body.appendChild(w);const L=layer(w);
  w.onclick=e=>{if(e.target.closest('[data-x]'))return L.close();const b=e.target.closest('.gf-pi');if(b&&!b.disabled){QA('.gf-pi',w).forEach(x=>x.classList.toggle('sel',x==b));pick=b.dataset.k;Q('[data-go]',w).disabled=false;Q('[data-go]',w).textContent=verb+' to '+FI[pick][2]}
    if(e.target.closest('[data-go]')&&pick){L.close();(mode=='copy'?opCopy:opMove)(ids,pick).then(()=>after&&after())}}}
/* ---------- action menus ---------- */
const meta1=f=>byteS(f.size)+' · '+dts(f.edited||f.id);
async function rowSheet(id){
  const f=(await byIds([id]))[0];if(!f)return;const k=kind(f);
  sheet(f.name,[
    {ic:'open',t:'Open',fn:()=>openFile(f.id)},
    {ic:'share',t:'Share',fn:()=>opShare([f.id])},
    {sep:1},
    {ic:'copy',t:'Copy to…',fn:()=>pickDest('copy',[f.id])},
    {ic:'move',t:'Move to…',fn:()=>pickDest('move',[f.id])},
    {ic:'edit',t:'Rename',fn:()=>gfRename(f)},
    {ic:f.starred?'star':'starb',t:f.starred?'Remove from starred':'Add to starred',fn:()=>opStar([f.id],!f.starred)},
    {ic:'info',t:'Info',fn:()=>infoSheet([f])},
    {ic:'dl',t:'Save to device',fn:()=>opSave([f.id])},
    ...(istx(f)?[{ic:'edit',t:'Edit text',fn:()=>edP(f)}]:[]),
    {sep:1},
    {ic:'del',t:'Move to trash',danger:1,fn:()=>opTrash([f.id])}],meta1(f))}
function openFile(id){const m=MET.get(String(id));if(m&&m.k)openViewer(String(id));else openV(id)}
async function moreSheet(){
  const ids=[...SEL.ids],n=ids.length,fs=await byIds(ids),allStar=fs.length&&fs.every(f=>f.starred),tot=rows$().length;
  sheet(null,[
    ...(n==1?[{ic:'open',t:'Open',fn:()=>openFile(ids[0])}]:[]),
    {ic:'copy',t:'Copy to…',fn:()=>pickDest('copy',ids,exit)},
    {ic:'move',t:'Move to…',fn:()=>pickDest('move',ids,exit)},
    ...(n==1?[{ic:'edit',t:'Rename',fn:()=>gfRename(fs[0])}]:[]),
    {ic:allStar?'star':'starb',t:allStar?'Remove from starred':'Add to starred',fn:()=>opStar(ids,!allStar)},
    {ic:'info',t:'Info',fn:()=>infoSheet(fs)},
    {ic:'dl',t:n>1?'Save '+n+' files to device':'Save to device',fn:()=>opSave(ids)},
    {sep:1},
    {ic:'all',t:n==tot?'Deselect all':'Select all',fn:()=>{n==tot?SEL.ids.clear():selAll();paint()}}])}
/* ---------- selection app bar ---------- */
function gfSync(){
  const on=SEL.on&&(view=='fc'||view=='trash');let bar=Q('#gf-sel');
  D.body.classList.toggle('gf-selon',on);
  if(!on){if(bar)bar.remove();return}
  const n=SEL.ids.size,tr=view=='trash',d=n?'':' disabled';
  if(!bar){bar=D.createElement('div');bar.id='gf-sel';D.body.appendChild(bar);
    bar.onclick=e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,ids=[...SEL.ids];
      if(a=='x')exit();else if(a=='all'){ids.length==rows$().length?SEL.ids.clear():selAll();paint()}
      else if(a=='share')opShare(ids);else if(a=='del')opTrash(ids);else if(a=='more')moreSheet();
      else if(a=='rest')opRestore(ids);else if(a=='forever')askForever(ids)}}
  const m=Q('#main');if(m){const r=m.getBoundingClientRect();bar.style.left=Math.max(0,r.left)+'px';bar.style.right=Math.max(0,innerWidth-r.right)+'px'}
  bar.innerHTML=`<button data-a="x" aria-label="Cancel selection">${ic('close')}</button><b class="gf-cnt">${n?n+' selected':'Select items'}</b><span class="gf-sp"></span><button data-a="all" aria-label="Select all">${ic('all')}</button>`+
   (tr?`<button data-a="rest"${d} aria-label="Restore">${ic('rest')}</button><button data-a="forever"${d} aria-label="Delete forever">${ic('delf')}</button>`
      :`<button data-a="share"${d} aria-label="Share">${ic('share')}</button><button data-a="del"${d} aria-label="Move to trash">${ic('del')}</button><button data-a="more"${d} aria-label="More options">${ic('more')}</button>`)}
window.__gfSync=()=>{try{gfSync()}catch(e){console.warn(e)}};
addEventListener('resize',()=>{if(Q('#gf-sel'))gfSync()});
/* ---------- tap routing: row ⋮ -> sheet, tap -> viewer ---------- */
D.addEventListener('click',e=>{
  const t=e.target;if(!(t instanceof Element))return;
  const r=t.closest('.tk[data-f]');if(!r||SEL.on||LP.fired)return;
  if(t.closest('.fck,.sk'))return;
  const id=String(r.dataset.f);
  if(t.closest('.fkb')){e.stopImmediatePropagation();e.preventDefault();rowSheet(id);return}
  const m=MET.get(id);if(m&&m.k){e.stopImmediatePropagation();e.preventDefault();openViewer(id)}
},true);
D.addEventListener('contextmenu',e=>{const r=e.target instanceof Element&&e.target.closest('.tk[data-f]');if(r&&!SEL.on){e.preventDefault();rowSheet(String(r.dataset.f))}});
/* ---------- media viewer: pinch / double-tap / wheel zoom, swipe, actions ---------- */
async function openViewer(id){
  let order=QA('#main .tk[data-f]').map(r=>String(r.dataset.f)).filter(i=>MET.get(i)&&MET.get(i).k);if(!order.includes(id))order=[id];
  let i=order.indexOf(id),url=null,tk=0;
  const w=D.createElement('div');w.className='gf-ov gf-page gf-view';
  w.innerHTML=`<div class="gf-top"><button data-a="x" aria-label="Back">${ic('back')}</button><div class="gf-tt"></div><button data-a="share" aria-label="Share">${ic('share')}</button><button data-a="del" aria-label="Move to trash">${ic('del')}</button><button data-a="more" aria-label="More">${ic('more')}</button></div><div class="gf-stage"></div><div class="gf-zb"><button data-a="zi" aria-label="Zoom in">+</button><button data-a="zo" aria-label="Zoom out">−</button></div><div class="gf-vcnt"></div>`;
  D.body.appendChild(w);const L=layer(w,()=>{if(url)URL.revokeObjectURL(url)});
  const stage=Q('.gf-stage',w);let S=1,X=0,Y=0,img=null;
  const apply=snap=>{if(!img)return;img.classList.toggle('snap',!!snap);img.style.transform=`translate(${X}px,${Y}px) scale(${S})`};
  const clampP=()=>{if(!img)return;if(S<=1){X=Y=0;return}const mx=Math.max(0,(img.clientWidth*S-stage.clientWidth)/2),my=Math.max(0,(img.clientHeight*S-stage.clientHeight)/2);X=Math.min(mx,Math.max(-mx,X));Y=Math.min(my,Math.max(-my,Y))};
  const zoomAt=(px,py,ns,snap)=>{ns=Math.min(6,Math.max(1,ns));const k=ns/S;X=px-(px-X)*k;Y=py-(py-Y)*k;S=ns;clampP();apply(snap)};
  const rel=e=>{const r=stage.getBoundingClientRect();return[e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2]};
  async function show(n){
    const my=++tk;i=n;const fid=order[i];w.dataset.id=fid;const f=(await byIds([fid]))[0];if(!f){L.close();return}
    Q('.gf-tt',w).textContent=f.name;Q('.gf-vcnt',w).textContent=order.length>1?(i+1)+' / '+order.length:'';Q('.gf-vcnt',w).style.display=order.length>1?'':'none';
    stage.innerHTML='<span class="gf-load">Decrypting…</span>';img=null;S=1;X=Y=0;
    let blob;try{blob=new Blob([await de(f.d)],{type:mime(f)})}catch(e){stage.innerHTML='<span class="gf-load">Could not open this file.</span>';return}
    if(my!=tk)return;if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(blob);const k=kind(f);
    if(k=='img'){stage.innerHTML=`<img alt="${esc(f.name)}" draggable="false">`;img=Q('img',stage);img.src=url}
    else if(k=='vid')stage.innerHTML=`<video src="${url}" controls autoplay playsinline></video>`;
    else stage.innerHTML=`<audio src="${url}" controls autoplay></audio>`;
    Q('.gf-zb',w).style.visibility=k=='img'?'':'hidden'}
  /* gestures */
  const P=new Map();let d0=0,s0=1,sx=0,sy=0,moved=false,lastTap=0,lastX=0,lastY=0,dx=0,tapT=0;
  stage.addEventListener('pointerdown',e=>{if(e.target.closest('video,audio'))return;P.set(e.pointerId,[e.clientX,e.clientY]);try{stage.setPointerCapture(e.pointerId)}catch(_){}moved=false;
    if(P.size==2){const[a,b]=[...P.values()];d0=Math.hypot(a[0]-b[0],a[1]-b[1]);s0=S}else{sx=lastX=e.clientX;sy=lastY=e.clientY;dx=0}});
  stage.addEventListener('pointermove',e=>{if(!P.has(e.pointerId)||!img)return;P.set(e.pointerId,[e.clientX,e.clientY]);
    if(P.size==2){moved=true;const[a,b]=[...P.values()],dd=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d0){const r=stage.getBoundingClientRect();zoomAt((a[0]+b[0])/2-r.left-r.width/2,(a[1]+b[1])/2-r.top-r.height/2,s0*dd/d0)}return}
    const mx=e.clientX-lastX,my=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY;if(Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy)>8)moved=true;
    if(S>1){X+=mx;Y+=my;clampP();apply()}else if(order.length>1){dx+=mx;X=dx;apply()}});
  const up=e=>{if(!P.has(e.pointerId))return;P.delete(e.pointerId);if(P.size)return;
    if(img&&S<=1.02&&Math.abs(dx)>70&&order.length>1){const dir=dx<0?1:-1,n=i+dir;if(n>=0&&n<order.length){dx=0;X=0;show(n);return}}
    if(S<=1.02){S=1}dx=0;if(S==1){X=Y=0}apply(true);
    if(!moved){const now=Date.now();
      if(img&&now-lastTap<300){clearTimeout(tapT);lastTap=0;const[px,py]=rel(e);S>1.05?(S=1,X=Y=0,apply(true)):zoomAt(px,py,2.6,true)}
      else{lastTap=now;tapT=setTimeout(()=>w.classList.toggle('gf-hide'),300)}}};
  stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
  stage.addEventListener('wheel',e=>{if(!img)return;e.preventDefault();const[px,py]=rel(e);zoomAt(px,py,S*(e.deltaY<0?1.18:1/1.18))},{passive:false});
  const key=e=>{if(!D.body.contains(w)){removeEventListener('keydown',key);return}if(ST[ST.length-1]!==L)return;if(e.key=='ArrowRight'&&i<order.length-1)show(i+1);else if(e.key=='ArrowLeft'&&i>0)show(i-1);else if(e.key=='+'||e.key=='=')zoomAt(0,0,S*1.4,true);else if(e.key=='-')zoomAt(0,0,S/1.4,true)};
  addEventListener('keydown',key);
  w.onclick=async e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,fid=order[i];
    if(a=='x')L.close();else if(a=='zi')zoomAt(0,0,S*1.5,true);else if(a=='zo')zoomAt(0,0,S/1.5,true);
    else if(a=='share')opShare([fid]);
    else if(a=='del'){await opTrash([fid],()=>{});order.splice(i,1);if(!order.length){L.close();refresh()}else{show(Math.min(i,order.length-1));refresh()}}
    else if(a=='more'){const f=(await byIds([fid]))[0];if(!f)return;sheet(f.name,[
      {ic:'info',t:'Info',fn:()=>infoSheet([f])},{ic:'edit',t:'Rename',fn:()=>gfRename(f)},
      {ic:f.starred?'star':'starb',t:f.starred?'Remove from starred':'Add to starred',fn:()=>opStar([fid],!f.starred)},
      {ic:'copy',t:'Copy to…',fn:()=>pickDest('copy',[fid])},{ic:'move',t:'Move to…',fn:()=>pickDest('move',[fid],()=>{order.splice(i,1);if(!order.length)L.close();else show(Math.min(i,order.length-1))})},
      {ic:'dl',t:'Save to device',fn:()=>opSave([fid])}],meta1(f))}};
  show(i)}
/* ---------- files page: sort / grid / starred / empty states ---------- */
const PREF=(()=>{try{return Object.assign({k:'date',d:-1,v:'list'},JSON.parse(localStorage.getItem('alpha.gf.pref')||'{}'))}catch(e){return{k:'date',d:-1,v:'list'}}})();
const savePref=()=>{try{localStorage.setItem('alpha.gf.pref',JSON.stringify(PREF))}catch(e){}};
const SORTS={name:'Name',date:'Modified',size:'Size',type:'Type'};
async function decorate(){
  const root=Q('#main .fc');if(!root||root.dataset.gf)return;root.dataset.gf='1';
  const k=root.dataset.k,list=(await rows()).filter(f=>!f.trash&&fcat(f)==k);
  MET.clear();list.forEach(f=>MET.set(String(f.id),{id:f.id,rid:f.id,name:f.name||'',size:f.size||0,t:f.edited||f.id,ty:ext(f.name||''),star:!!f.starred,k:kind(f)}));
  const ls=Q('.fls',root),sh=Q('.fsh',root);if(!ls||!sh)return;
  let onlyStar=false;
  const tools=D.createElement('div');tools.className='gf-tools';
  const paintTools=()=>{tools.innerHTML=`<button class="gf-chip${onlyStar?' on':''}" data-a="star">${ic(onlyStar?'star':'starb',16)} Starred</button><span class="gf-sp"></span><button class="gf-sortb" data-a="sort" aria-label="Sort by">${ic(PREF.d<0?'down':'up',16)}<span>${SORTS[PREF.k]}</span></button><button class="gf-vb" data-a="view" aria-label="${PREF.v=='grid'?'List view':'Grid view'}">${ic(PREF.v=='grid'?'list':'grid',22)}</button>`};
  const apply=()=>{
    const rs=QA('.tk[data-f]',ls),cmp={name:(a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true,sensitivity:'base'}),date:(a,b)=>a.t-b.t,size:(a,b)=>a.size-b.size,type:(a,b)=>a.ty.localeCompare(b.ty)||a.name.localeCompare(b.name)}[PREF.k];
    rs.sort((a,b)=>PREF.d*cmp(MET.get(a.dataset.f)||{name:'',t:0,size:0,ty:''},MET.get(b.dataset.f)||{name:'',t:0,size:0,ty:''})*(PREF.k=='name'||PREF.k=='type'?-1:1));
    rs.forEach(r=>{ls.append(r);const m=MET.get(r.dataset.f);r.classList.toggle('gf-hide',onlyStar&&!(m&&m.star));
      const nm=Q('.grow',r);if(nm&&m&&m.star&&!Q('.gf-star',nm))nm.insertAdjacentHTML('afterbegin',`<span class="gf-star" aria-label="Starred">${ic('star',15)}</span>`)});
    ls.classList.toggle('gf-grid',PREF.v=='grid');
    let ne=Q('.gf-nores',ls);const vis=rs.filter(r=>!r.classList.contains('gf-hide')&&r.style.display!='none').length;
    if(rs.length&&!vis){if(!ne){ne=D.createElement('div');ne.className='gf-empty gf-nores';ls.append(ne)}ne.innerHTML=`<div class="gf-ei">${ic('info',44)}</div><b>${onlyStar&&!Q('#fq',root).value?'No starred files':'No results'}</b><span>${onlyStar&&!Q('#fq',root).value?'Star a file from its ⋮ menu to find it here.':'Try a different search.'}</span>`}else if(ne)ne.remove()};
  paintTools();sh.after(tools);
  tools.onclick=e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
    if(a=='star'){onlyStar=!onlyStar;paintTools();apply()}
    else if(a=='view'){PREF.v=PREF.v=='grid'?'list':'grid';savePref();paintTools();apply()}
    else if(a=='sort')sheet('Sort by',[...Object.keys(SORTS).map(s=>({ic:null,t:SORTS[s],on:PREF.k==s,fn:()=>{PREF.k=s;PREF.d=s=='name'||s=='type'?1:-1;savePref();paintTools();apply()}})),{sep:1},
      {ic:'up',t:PREF.k=='name'||PREF.k=='type'?'A to Z':PREF.k=='date'?'Oldest first':'Smallest first',on:PREF.d>0,fn:()=>{PREF.d=1;savePref();paintTools();apply()}},
      {ic:'down',t:PREF.k=='name'||PREF.k=='type'?'Z to A':PREF.k=='date'?'Newest first':'Largest first',on:PREF.d<0,fn:()=>{PREF.d=-1;savePref();paintTools();apply()}}])};
  Q('#fq',root).addEventListener('input',()=>setTimeout(apply,0));
  const emp=Q('.fempty',ls);if(emp){tools.style.display='none';emp.outerHTML=`<div class="gf-empty"><div class="gf-ei">${ic('folder',48)}</div><b>No files here yet</b><span>Files you add to ${esc(FI[k][2])} show up here.</span><button data-up>Upload files</button></div>`;Q('[data-up]',ls).onclick=()=>{const f=Q('#fi',root)||Q('#fi');f&&f.click()}}
  apply()}
{const _f=fcPage;fcPage=async function(){const r=await _f.apply(this,arguments);try{if(view==='fc')await decorate()}catch(e){console.warn('gf decorate',e)}return r}}
{const _t=trashP;trashP=async function(){const r=await _t.apply(this,arguments);try{if(view==='trash'){const m=Q('#main');if(!Q('.card',m)){const p=Q('p.mu',m);if(p)p.outerHTML=`<div class="gf-empty"><div class="gf-ei">${ic('del',48)}</div><b>Trash is empty</b><span>Files you move to trash show up here until you delete them for good.</span></div>`}}}catch(e){}return r}}
window.__gfUI={sheet,dialog,snack,ic,PA,layer};
})();
