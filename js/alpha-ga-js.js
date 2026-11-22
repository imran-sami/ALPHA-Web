/* ===== ALPHA Files-style actions for Home / Insights / History / Settings ===== */
(()=>{try{
if(window.__ga||!window.__gfUI)return;window.__ga=1;
const U=window.__gfUI,{sheet,dialog,ic,PA}=U,D=document,Q=(s,r=D)=>r.querySelector(s),QA=(s,r=D)=>[...r.querySelectorAll(s)];
Object.assign(PA,{plus:'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',play:'M8 5v14l11-7z',search:'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',lock:'M18 8h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9z',label:'M17.63 5.84A2 2 0 0 0 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 2 2 2L16 19a2 2 0 0 0 1.63-.84L22 12z',upl:'M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z'});
const sn=(m,l,f)=>window.toast(m,l,f),H={q:'',cat:'All',sort:ls.g('alpha.hsort','new'),sel:new Set(),on:false};
const SORT={new:'Newest first',old:'Oldest first',long:'Longest first',short:'Shortest first',name:'Name (A\u2013Z)'};
const sv=()=>ls.s('alpha.acts',acts),when=a=>new Date(a.s).toLocaleString([],{month:'short',day:'numeric',hour:'numeric',minute:'2-digit',hour12:!ls.g('alpha.h24',false)});
const pl=(n,w)=>n+' '+w+(n==1?'':'s'),sum=l=>l.map(a=>'\u2022 '+a.name+' \u2014 '+a.cat+', '+fm(mins(a))+', '+when(a)).join('\n');
const refresh=()=>{view=='hist'?histList():V[view]&&V[view]()};
function saveF(name,text,type){const u=URL.createObjectURL(new Blob([text],{type})),a=D.createElement('a');a.href=u;a.download=name;D.body.appendChild(a);a.click();setTimeout(()=>{a.remove();URL.revokeObjectURL(u)},600);sn('Saved '+name)}
async function share(t){try{if(navigator.share){await navigator.share({text:t});return}}catch(e){if(e&&e.name=='AbortError')return}try{await navigator.clipboard.writeText(t);sn('Copied to clipboard')}catch(e){sn("Couldn't copy")}}
const csv=l=>'name,category,start,minutes\n'+l.map(a=>[JSON.stringify(a.name),a.cat,new Date(a.s).toISOString(),Math.round(mins(a))].join(',')).join('\n');
function info(title,rows){const w=D.createElement('div');w.className='gf-ov';w.innerHTML=`<div class="gf-scrim"></div><div class="gf-sheet" role="dialog"><i class="gf-grab"></i><div class="gf-sh">${esc(title)}</div><div class="gf-info">${rows.map(r=>`<div><span>${r[0]}</span><b>${esc(String(r[1]))}</b></div>`).join('')}</div></div>`;D.body.appendChild(w);const L=U.layer(w);Q('.gf-scrim',w).onclick=()=>L.close()}
/* ---- actions on sessions ---- */
function delIds(ids){const s=new Set(ids.map(String)),rm=acts.filter(a=>s.has(String(a.id)));if(!rm.length)return;acts=acts.filter(a=>!s.has(String(a.id)));sv();refresh();sn(pl(rm.length,'session')+' deleted','Undo',()=>{acts=acts.concat(rm).sort((a,b)=>a.s-b.s);sv();refresh()})}
function rename(a){dialog({title:'Rename',input:a.name,ok:'OK',validate:v=>v.trim()?'':'Name can\u2019t be empty',onok:v=>{a.name=v.trim();sv();refresh();sn('Renamed')}})}
function recat(list){sheet('Change category',Object.keys(C).map(k=>({t:k,ic:'label',on:list.every(a=>a.cat==k),fn:()=>{list.forEach(a=>a.cat=k);sv();refresh();sn('Moved to '+k)}})))}
function again(a){if(run)return sn('A session is already running');run={cat:a.cat,name:a.name,s:Date.now()};ls.s('alpha.run',run);sn('Tracking started');go('dash')}
function inf(a){info(a.name,[['Category',a.cat],['Started',when(a)],['Ended',a.e?new Date(a.e).toLocaleString():'Running'],['Duration',fm(mins(a))]])}
function rowSheet(a,sel){sheet(a.name,[{t:'Run again',ic:'play',fn:()=>again(a)},{t:'Rename',ic:'edit',fn:()=>rename(a)},{t:'Change category',ic:'label',fn:()=>recat([a])},{t:'Copy summary',ic:'copy',fn:()=>share(sum([a]))},...(sel?[{t:'Select',ic:'chk',fn:()=>startSel(a.id)}]:[]),{t:'Info',ic:'info',fn:()=>inf(a)},{sep:1},{t:'Delete',ic:'del',danger:1,fn:()=>delIds([a.id])}],a.cat+' \u00b7 '+fm(mins(a)))}
const rowH=a=>{const on=H.on&&H.sel.has(String(a.id));return`<div class="ga-r${on?' on':''}" data-id="${a.id}"><span class="ga-t" style="background:color-mix(in oklab,${C[a.cat]} 22%,transparent);color:${C[a.cat]}">${ic('label')}</span><div class="ga-x"><b>${esc(a.name)}</b><small>${a.cat} \u00b7 ${when(a)} \u00b7 ${fm(mins(a))}</small></div>${H.on?`<span class="ga-c">${ic('chk',16)}</span>`:`<button class="ga-k" aria-label="More options">${ic('more')}</button>`}</div>`};
function wire(el,selectable){let t,lp=0;
 el.addEventListener('pointerdown',e=>{const r=e.target.closest('.ga-r');if(!r||!selectable||e.target.closest('.ga-k'))return;lp=0;t=setTimeout(()=>{lp=1;startSel(r.dataset.id)},450)});
 ['pointerup','pointerleave','pointermove','pointercancel'].forEach(n=>el.addEventListener(n,()=>clearTimeout(t)));
 el.addEventListener('contextmenu',e=>{if(selectable&&e.target.closest('.ga-r'))e.preventDefault()});
 el.addEventListener('click',e=>{if(lp){lp=0;return}const r=e.target.closest('.ga-r');if(!r)return;const a=acts.find(x=>String(x.id)==r.dataset.id);if(!a)return;
  if(selectable&&H.on&&!e.target.closest('.ga-k')){const id=String(a.id);H.sel.has(id)?H.sel.delete(id):H.sel.add(id);if(!H.sel.size)return exitSel();r.classList.toggle('on',H.sel.has(id));bar();return}
  if(e.target.closest('.ga-k'))rowSheet(a,selectable)})}
/* ---- selection mode (top app bar like Files) ---- */
function startSel(id){H.on=true;H.sel=new Set([String(id)]);histList();bar()}
function exitSel(){H.on=false;H.sel.clear();histList();bar()}
function bar(){let b=Q('#ga-sel');if(!H.on||view!='hist'){b&&b.remove();return}
 if(!b){b=D.createElement('div');b.id='ga-sel';b.className='ga-bar';D.body.appendChild(b);b.onclick=e=>{const x=e.target.closest('[data-a]');x&&selAct(x.dataset.a)}}
 b.innerHTML=`<button data-a="x" aria-label="Close">${ic('close')}</button><span class="gf-cnt">${H.sel.size} selected</span><i class="gf-sp"></i><button data-a="all" aria-label="Select all">${ic('all')}</button><button data-a="share" aria-label="Share">${ic('share')}</button><button data-a="del" aria-label="Delete">${ic('del')}</button><button data-a="more" aria-label="More">${ic('more')}</button>`}
const chosen=()=>acts.filter(a=>H.sel.has(String(a.id)));
function selAct(k){const l=chosen();
 if(k=='x')exitSel();else if(k=='all'){vis().forEach(a=>H.sel.add(String(a.id)));histList();bar()}
 else if(k=='share')share(sum(l));else if(k=='del'){delIds(l.map(a=>a.id));exitSel()}
 else sheet(pl(l.length,'session')+' selected',[{t:'Change category',ic:'label',fn:()=>{recat(l)}},{t:'Copy summary',ic:'copy',fn:()=>share(sum(l))},{t:'Save as CSV',ic:'dl',fn:()=>saveF('alpha-history.csv',csv(l),'text/csv')}])}
/* ---- History page ---- */
function vis(){let l=acts.filter(a=>(H.cat=='All'||a.cat==H.cat)&&(!H.q||a.name.toLowerCase().includes(H.q)));
 const f={new:(a,b)=>b.s-a.s,old:(a,b)=>a.s-b.s,long:(a,b)=>mins(b)-mins(a),short:(a,b)=>mins(a)-mins(b),name:(a,b)=>a.name.localeCompare(b.name)}[H.sort]||((a,b)=>b.s-a.s);return l.sort(f)}
function histList(){const el=Q('#ga-l');if(!el)return;const l=vis(),s=Q('#main .sub');if(s)s.textContent=pl(acts.length,'session');
 el.innerHTML=l.length?l.slice(0,200).map(rowH).join(''):`<div class="gf-empty"><div class="gf-ei">${ic('label',48)}</div><b>${acts.length?'No results':'No history yet'}</b><span>${acts.length?'Try a different search or filter.':'Sessions you track will show up here.'}</span>${acts.length?'':'<button id="ga-go">Go to Home</button>'}</div>`;
 const g=Q('#ga-go');if(g)g.onclick=()=>go('dash');QA('#ga-f [data-c]').forEach(b=>b.classList.toggle('on',b.dataset.c==H.cat));const sb=Q('#ga-s');if(sb)sb.innerHTML=ic('sort',18)+' '+SORT[H.sort]}
function histShell(){H.on=false;H.sel.clear();bar();
 Q('#main').innerHTML=`<h1>History</h1><p class="sub"></p><div class="ga-search">${ic('search')}<input id="ga-q" type="search" placeholder="Search history" autocomplete="off" value="${esc(H.q)}"><button id="ga-m" aria-label="More options">${ic('more')}</button></div><div class="gf-tools" id="ga-f">${['All',...Object.keys(C)].map(k=>`<button class="gf-chip" data-c="${k}">${k}</button>`).join('')}<button class="gf-sortb" id="ga-s"></button></div><div id="ga-l" class="ga-list"></div>`;
 Q('#ga-q').oninput=e=>{H.q=e.target.value.trim().toLowerCase();histList()};
 Q('#ga-f').onclick=e=>{const c=e.target.closest('[data-c]');if(c){H.cat=c.dataset.c;histList()}};
 Q('#ga-s').onclick=()=>sheet('Sort by',Object.keys(SORT).map(k=>({t:SORT[k],on:H.sort==k,fn:()=>{H.sort=k;ls.s('alpha.hsort',k);histList()}})));
 Q('#ga-m').onclick=()=>sheet('',[{t:'Select',ic:'chk',fn:()=>{const f=vis()[0];f&&startSel(f.id)}},{t:'Add past session',ic:'plus',fn:addPast},{t:'Save as CSV',ic:'dl',fn:()=>saveF('alpha-history.csv',csv(acts),'text/csv')},{t:'Copy summary',ic:'copy',fn:()=>share(sum(vis()))},{sep:1},{t:'Delete all history',ic:'delf',danger:1,fn:clearAll}]);
 wire(Q('#ga-l'),true);histList()}
function clearAll(){if(!acts.length)return sn('History is already empty');dialog({title:'Delete all history?',body:pl(acts.length,'session')+' will be deleted.',ok:'Delete',danger:1,onok:()=>{const rm=acts;acts=[];sv();refresh();sn('History deleted','Undo',()=>{acts=rm;sv();refresh()})}})}
/* ---- Home ---- */
function goalDlg(){dialog({title:'Daily focus goal',body:'Minutes per day',input:String(GOAL),ok:'Save',validate:v=>+v>=10&&+v<=1440?'':'Enter 10\u20131440 minutes',onok:v=>{GOAL=+v;ls.s('alpha.goal',GOAL);sn('Goal set to '+fm(GOAL));refresh()}})}
function addPast(){sheet('Add past session \u2014 category',Object.keys(C).map(k=>({t:k,ic:'label',fn:()=>setTimeout(()=>dialog({title:'Session name',input:k+' session',ok:'Next',validate:v=>v.trim()?'':'Name can\u2019t be empty',onok:nm=>setTimeout(()=>dialog({title:'How many minutes?',input:'30',ok:'Add',validate:v=>+v>=1&&+v<=1440?'':'Enter 1\u20131440',onok:m=>{const e=Date.now();acts.push({id:e,cat:k,name:nm.trim(),s:e-m*6e4,e});sv();refresh();sn('Session added')}}),160)}),160)})))}
const todayL=()=>acts.filter(a=>dk(a.s)==dk(Date.now())).sort((a,b)=>b.s-a.s);
function homeMenu(){sheet('Home',[{t:run?'Stop session':'Start session',ic:run?'close':'play',fn:()=>{const b=Q('#go');b&&b.click()}},{t:'Add past session',ic:'plus',fn:addPast},{t:'Edit daily goal',ic:'edit',fn:goalDlg},{t:'Share today\u2019s summary',ic:'share',fn:()=>share(todayL().length?'ALPHA today\n'+sum(todayL()):'No sessions yet today.')},{sep:1},{t:'Open history',ic:'list',fn:()=>go('hist')}])}
function topBtn(fn){const m=Q('#main'),h=m&&Q('h1',m);if(!h||Q('#ga-hm'))return;const b=D.createElement('button');b.id='ga-hm';b.className='ga-top';b.setAttribute('aria-label','More options');b.innerHTML=ic('more');h.before(b);b.onclick=fn}
function decDash(){const m=Q('#main');if(!m||view!='dash')return;topBtn(homeMenu);
 if(!Q('.ga-tday')){const c=D.createElement('div');c.className='card ga-tday';c.style.marginTop='14px';const t=todayL();c.innerHTML=`<div class="ga-chd"><h3>Today\u2019s sessions</h3><button id="ga-add" class="ga-addb">${ic('plus',18)}Add session</button></div><div class="ga-list">${t.map(rowH).join('')||'<p class="mu">No sessions yet today.</p>'}</div>`;m.appendChild(c);wire(Q('.ga-list',c),false)}
 const ab=Q('#ga-add');if(ab)ab.onclick=addPast}
addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#eg')){e.stopImmediatePropagation();e.preventDefault();goalDlg()}},true);
/* ---- Insights ---- */
/* ---- Settings ---- */
const SKIP=/pin|pass|hash|salt|secret|token|cred|auth/i;
function backup(){const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k.startsWith('alpha.')&&!SKIP.test(k))o[k]=localStorage.getItem(k)}saveF('alpha-backup.json',JSON.stringify(o),'application/json')}
function restore(){const f=D.createElement('input');f.type='file';f.accept='.json,application/json';f.onchange=async()=>{try{const o=JSON.parse(await f.files[0].text());const ks=Object.keys(o).filter(k=>k.startsWith('alpha.')&&!SKIP.test(k));if(!ks.length)return sn('Not an ALPHA backup');dialog({title:'Restore backup?',body:'This replaces '+pl(ks.length,'setting')+' and your history on this device.',ok:'Restore',onok:()=>{ks.forEach(k=>localStorage.setItem(k,o[k]));location.reload()}})}catch(e){sn('Couldn\u2019t read that file')}};f.click()}
/* ---- hooks ---- */
const oh=window.__gfBack;window.__gfBack=()=>oh&&oh()||(H.on?(exitSel(),true):false);
addEventListener('keydown',e=>{if(e.key=='Escape'&&H.on&&view=='hist'){exitSel()}},true);
const od=window.dash;
window.hist=histShell;V.hist=histShell;
window.dash=function(){const r=od.apply(this,arguments);decDash();setTimeout(decDash,250);setTimeout(decDash,900);return r};V.dash=window.dash;
const nv=window.go;window.go=function(v){H.on=false;H.sel.clear();bar();return nv.apply(this,arguments)};
QA('nav button').forEach(b=>b.addEventListener('click',()=>{H.on=false;bar()}));
if(view=='dash')decDash();else if(view=='hist')histShell();

/* ---- Task category pages (Work / Fitness / Study / Leisure / Sleep) ---- */
const T={on:false,sel:new Set()},tpr={High:0,Medium:1,Low:2};
const tvis=()=>tasks.filter(x=>x.cat==curCat&&(flt=='all'||(flt=='open'?!x.done:x.done))).sort((a,b)=>a.done-b.done||tpr[a.pri]-tpr[b.pri]||(a.due||'z').localeCompare(b.due||'z'));
const tmeta=x=>'\u23f1 '+fm(x.min)+(x.at?' \u00b7 alarm '+x.at:'')+(x.due?' \u00b7 '+new Date(x.due).toLocaleString([],{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'');
const tById=ids=>{const S=new Set(ids.map(String));return tasks.filter(x=>S.has(String(x.id)))};
const trow=x=>{const on=T.on&&T.sel.has(String(x.id)),c=C[x.cat];return`<div class="ga-r${on?' on':''}" data-id="${x.id}">${T.on?`<span class="ga-c">${ic('chk',16)}</span>`:`<button class="ga-ck" data-t="${x.id}" aria-label="Mark done" style="${x.done?'background:'+c+';border-color:'+c:''}">${x.done?ic('chk',16):''}</button>`}<div class="ga-x" style="${x.done?'opacity:.55':''}"><b style="${x.done?'text-decoration:line-through':''}">${esc(x.name)}</b><small>${tmeta(x)}</small></div><span class="ga-pr" style="background:${PC[x.pri]}">${x.pri}</span>${T.on?'':`<button class="ga-k" aria-label="More options">${ic('more')}</button>`}</div>`};
function tdel(ids){const rm=tById(ids);if(!rm.length)return;tasks=tasks.filter(x=>!rm.includes(x));svT();taskPage();sn(pl(rm.length,'task')+' deleted','Undo',()=>{tasks=tasks.concat(rm);svT();taskPage()})}
function tmove(ids,k,mode){const l=tById(ids);let un;if(mode=='move'){const p=l.map(x=>[x,x.cat]);p.forEach(([x])=>x.cat=k);un=()=>p.forEach(([x,c])=>x.cat=c)}else{const b=Date.now(),cl=l.map((x,i)=>({...x,id:b+i,cat:k,af:'',sn:0}));tasks=tasks.concat(cl);un=()=>{tasks=tasks.filter(x=>!cl.includes(x))}}svT();T.on=false;T.sel.clear();taskPage();sn(pl(l.length,'task')+(mode=='move'?' moved':' copied')+' to '+k,'Undo',()=>{un();svT();taskPage()})}
function tpick(ids,mode){sheet(mode=='move'?'Move to':'Copy to',Object.keys(IC).filter(k=>mode=='copy'||k!=curCat).map(k=>({t:k,ic:'folder',sub:pl(tasks.filter(x=>x.cat==k).length,'task'),fn:()=>tmove(ids,k,mode)})))}
function tset(ids,f,msg){const l=tById(ids),p=l.map(x=>[x,{...x}]);l.forEach(f);svT();T.on=false;T.sel.clear();taskPage();sn(msg,'Undo',()=>{p.forEach(([x,o])=>Object.assign(x,o));svT();taskPage()})}
function tprio(ids){sheet('Priority',['High','Medium','Low'].map(p=>({t:p,ic:'label',fn:()=>tset(ids,x=>x.pri=p,'Priority set to '+p)})))}
function tinfo(x){info(x.name,[['Category',x.cat],['Status',x.done?'Done':'Open'],['Priority',x.pri],['Duration',fm(x.min)],['Alarm',x.at||'Off'],['Due',x.due?new Date(x.due).toLocaleString():'\u2014'],['Notes',x.note||'\u2014']])}
function tsheet(x){sheet(x.name,[{t:'Start tracking',ic:'play',fn:()=>{if(run)return sn('Stop the running session first');run={cat:x.cat,name:x.name,s:Date.now()};ls.s('alpha.run',run);sn('Tracking started');go('dash')}},{t:'Edit',ic:'edit',fn:()=>taskForm(x.id)},{t:x.done?'Mark as open':'Mark as done',ic:'chk',fn:()=>tset([x.id],y=>y.done=!y.done,x.done?'Marked as open':'Task completed')},{t:'Priority',ic:'label',fn:()=>tprio([x.id])},{sep:1},{t:'Copy to\u2026',ic:'copy',fn:()=>tpick([x.id],'copy')},{t:'Move to\u2026',ic:'move',fn:()=>tpick([x.id],'move')},{t:'Select',ic:'chk',fn:()=>tstart(x.id)},{t:'Info',ic:'info',fn:()=>tinfo(x)},{sep:1},{t:'Delete',ic:'del',danger:1,fn:()=>tdel([x.id])}],x.pri+' \u00b7 '+fm(x.min))}
function tstart(id){T.on=true;T.sel=new Set([String(id)]);taskPage()}
function texit(){T.on=false;T.sel.clear();taskPage()}
function tbar(){let b=Q('#ga-tsel');if(!T.on||view!='cat'){b&&b.remove();return}
 if(!b){b=D.createElement('div');b.id='ga-tsel';b.className='ga-bar';D.body.appendChild(b);b.onclick=e=>{const x=e.target.closest('[data-a]');x&&tact(x.dataset.a)}}
 b.innerHTML=`<button data-a="x" aria-label="Close">${ic('close')}</button><span class="gf-cnt">${T.sel.size} selected</span><i class="gf-sp"></i><button data-a="all" aria-label="Select all">${ic('all')}</button><button data-a="copy" aria-label="Copy to">${ic('copy')}</button><button data-a="move" aria-label="Move to">${ic('move')}</button><button data-a="del" aria-label="Delete">${ic('del')}</button><button data-a="more" aria-label="More">${ic('more')}</button>`}
function tact(k){const ids=[...T.sel];if(k=='x')texit();else if(k=='all'){tvis().forEach(x=>T.sel.add(String(x.id)));taskPage()}else if(k=='copy')tpick(ids,'copy');else if(k=='move')tpick(ids,'move');else if(k=='del'){tdel(ids);T.on=false;T.sel.clear();tbar()}
 else sheet(pl(ids.length,'task')+' selected',[{t:'Mark as done',ic:'chk',fn:()=>tset(ids,x=>x.done=true,'Marked as done')},{t:'Mark as open',ic:'rest',fn:()=>tset(ids,x=>x.done=false,'Marked as open')},{t:'Priority',ic:'label',fn:()=>tprio(ids)}])}
function tmenu(){const done=tasks.filter(x=>x.cat==curCat&&x.done),open=tasks.filter(x=>x.cat==curCat&&!x.done);sheet(curCat,[{t:'Add task',ic:'plus',fn:()=>taskForm()},{t:'Select',ic:'chk',fn:()=>{const f=tvis()[0];f&&tstart(f.id)}},{t:'Mark all as done',ic:'all',fn:()=>open.length?tset(open.map(x=>x.id),x=>x.done=true,'All tasks done'):sn('Nothing to mark')},{sep:1},{t:'Delete completed tasks',ic:'delf',danger:1,fn:()=>done.length?tdel(done.map(x=>x.id)):sn('No completed tasks')}],pl(tasks.filter(x=>x.cat==curCat).length,'task'))}
function taskPage(){view='cat';const k=curCat,s=cs(k),c=C[k],l=tvis();
 Q('#main').innerHTML=`<div class="ga-top2"><button class="ga-k" id="tb" aria-label="Back">${ic('back')}</button><div class="ga-x"><b>${IC[k]} ${k}</b><small>${s.d}/${s.t} tasks \u00b7 planned ${fm(s.pm)} \u00b7 tracked ${fm(s.tm)}</small></div><button class="ga-k" id="tmn" aria-label="More options">${ic('more')}</button></div><div class="hb" style="margin:0 4px 12px"><i style="width:${Math.round(s.p*100)}%;background:${c}"></i></div><div class="gf-tools" id="tf">${[['all','All'],['open','Open'],['done','Done']].map(f=>`<button class="gf-chip${flt==f[0]?' on':''}" data-f="${f[0]}">${f[1]}</button>`).join('')}</div><div class="ga-list" id="tl">${l.map(trow).join('')||`<div class="gf-empty"><div class="gf-ei">${ic('chk',48)}</div><b>No tasks here</b><span>Tap Add task to create one.</span></div>`}</div><button class="ga-fab" id="tad">${ic('plus')}Add task</button>`;
 Q('#tb').onclick=()=>{texit();go('dash')};Q('#tmn').onclick=tmenu;Q('#tad').onclick=()=>taskForm();
 Q('#tf').onclick=e=>{const b=e.target.closest('[data-f]');if(b){flt=b.dataset.f;taskPage()}};
 const el=Q('#tl');let tm,lp=0;
 el.addEventListener('pointerdown',e=>{const r=e.target.closest('.ga-r');if(!r||e.target.closest('.ga-k,.ga-ck'))return;lp=0;tm=setTimeout(()=>{lp=1;T.on?(T.sel.add(r.dataset.id),taskPage()):tstart(r.dataset.id)},450)});
 ['pointerup','pointerleave','pointermove','pointercancel'].forEach(n=>el.addEventListener(n,()=>clearTimeout(tm)));
 el.addEventListener('contextmenu',e=>{if(e.target.closest('.ga-r'))e.preventDefault()});
 const upd=x=>{const r=Q('.ga-r[data-id="'+x.id+'"]',el);if(!r)return;if(flt=='all'||(flt=='open'?!x.done:x.done)){const t=D.createElement('div');t.innerHTML=trow(x);r.replaceWith(t.firstElementChild)}else r.remove();const s2=cs(curCat),sb=Q('.ga-top2 small'),hb=Q('.hb i');if(sb)sb.textContent=s2.d+'/'+s2.t+' tasks \u00b7 planned '+fm(s2.pm)+' \u00b7 tracked '+fm(s2.tm);if(hb)hb.style.width=Math.round(s2.p*100)+'%'};
 el.addEventListener('click',e=>{if(lp){lp=0;return}const r=e.target.closest('.ga-r');if(!r)return;const x=tasks.find(t=>String(t.id)==r.dataset.id);if(!x)return;
  if(T.on){const id=String(x.id);T.sel.has(id)?T.sel.delete(id):T.sel.add(id);if(!T.sel.size)return texit();r.classList.toggle('on',T.sel.has(id));tbar();return}
  if(e.target.closest('.ga-k')){tsheet(x);return}
  x.done=!x.done;svT();upd(x)});
 tbar()}
window.catPage=taskPage;
const otf=window.taskForm;window.taskForm=function(){const r=otf.apply(this,arguments);const d=Q('#mc>div');d&&d.classList.add('ga-form');return r};
const ob2=window.__gfBack;window.__gfBack=()=>ob2&&ob2()||(T.on?(texit(),true):false);
addEventListener('keydown',e=>{if(e.key=='Escape'&&T.on&&view=='cat')texit()},true);
const og=window.go;window.go=function(v){T.on=false;T.sel.clear();const b=Q('#ga-tsel');b&&b.remove();return og.apply(this,arguments)};

/* ---- keep scroll position on every re-render (tick a task, start a session...) ---- */
let LR='';
const scrollers=()=>{const a=[D.scrollingElement,D.documentElement,D.body];for(let e=Q('#main');e&&e!==D.body;e=e.parentElement)a.push(e);return[...new Set(a.filter(Boolean))]};
function keep(id,fn,self,args){const s=LR==id?scrollers().map(e=>[e,e.scrollTop]):null,r=fn.apply(self,args);LR=id;if(s){const rs=()=>s.forEach(([e,y])=>{if(e.scrollTop!==y)e.scrollTop=y});rs();requestAnimationFrame(rs);setTimeout(rs,80)}return r}
{const _t=taskPage;taskPage=function(){return keep('cat:'+curCat,_t,this,arguments)};window.catPage=taskPage}
['dash','cal','det'].forEach(n=>{if(typeof window[n]=='function'){const o=window[n];window[n]=function(){return keep(n+':'+(arguments[0]||''),o,this,arguments)}}});
V.dash=window.dash;
{const g=window.go;window.go=function(){LR='';const r=g.apply(this,arguments);D.body.dataset.gv=view;return r};D.body.dataset.gv=view}
/* ---- Settings: full Files-by-Google settings page (no tabs, no Save button; every change applies at once) ---- */
function pickPhoto(cb){const f=D.createElement('input');f.type='file';f.accept='image/*,.heic,.heif,.avif';f.onchange=async()=>{const x=f.files[0];if(!x)return;try{db=db||await idb();await tx('readwrite',s=>s.put({id:'avatar',blob:x,name:x.name}))}catch(e){}setAv(x);sn('Photo saved');cb&&cb()};f.click()}
const hasAv=()=>!!Q('#th img');
async function rmPhoto(cb){try{db=db||await idb();await tx('readwrite',s=>s.delete('avatar'))}catch(e){}avU=null;setAv();sn('Photo removed');cb&&cb()}
function setPage(){if(Q('.gs-page'))return;
 const w=D.createElement('div');w.className='gf-ov gf-page gs-page';
 w.innerHTML=`<div class="gf-top"><button data-x aria-label="Back">${ic('back')}</button><div class="gf-tt">Settings</div></div><div class="gf-plist" id="gs-b"></div>`;
 D.body.appendChild(w);const L=U.layer(w);Q('[data-x]',w).onclick=()=>L.close();
 const re=()=>{if(view=='dash'||view=='hist'||view=='ins')V[view]();};
 const opt=(t,list,cur,set)=>()=>sheet(t,list.map(o=>({t:o[1],on:o[0]===cur,fn:()=>{set(o[0]);paint()}})));
 const S=()=>[
  ['Profile',[['Name',pname||'Alpha',()=>dialog({title:'Your name',input:pname||'',ok:'Save',validate:v=>v.trim()?'':'Name can\u2019t be empty',onok:v=>{pname=v.trim();ls.s('alpha.name',pname);paint();re()}})]]],
  ['Appearance',[['Theme',themes[ti]?themes[ti][0]:'',()=>sheet('Theme',themes.map((t,i)=>({t:t[0],on:i==ti,fn:()=>{applyTheme(i);paint()}})))],
   ['Language',lang=='bn'?'\u09ac\u09be\u0982\u09b2\u09be':'English',opt('Language',[['en','English'],['bn','\u09ac\u09be\u0982\u09b2\u09be']],lang,v=>{lang=v;ls.s('alpha.lang',v);QA('nav button').forEach(x=>{if(x._o!=null)x.lastChild.nodeValue=x._o});try{tr($('nav'))}catch(e){}if(key&&V[view])go(view)})],
   ['Time format',h24?'24-hour':'12-hour',opt('Time format',[[false,'12-hour'],[true,'24-hour']],h24,v=>{h24=v;ls.s('alpha.h24',v);if(key&&V[view])go(view)})]]],
  ['Location',[['Current location',loc.city+' \u00b7 '+loc.tz,null]]],
  ['Security',[['Change lock','Current: '+(window.LN&&LN[lmode]||'PIN'),()=>{L.close();setTimeout(chLock,260)}],['Lock now','Lock ALPHA immediately',()=>{L.close();setTimeout(()=>{const l=Q('#lk');l&&l.click()},260)}]]],
  ['Goals',[['Daily focus goal',fm(GOAL)+' per day',goalDlg]]],
  ['Data',[['Back up data','Save settings and history to a file',backup],['Restore backup','Load a backup file',restore],['Delete all history',pl(acts.length,'session'),clearAll,1]]]];
 function paint(){const sc=Q('#gs-b',w).scrollTop,P=S();let i=0;
  Q('#gs-b',w).innerHTML=`<div class="gs-prof"><button class="gs-av" id="pv" aria-label="Add or change profile photo"></button><div class="gs-pt"><b>${esc(pname||'Alpha')}</b><small>ALPHA \u00b7 stored on this device</small>${hasAv()?`<button class="gs-rm" id="prm">Remove photo</button>`:''}</div></div>`+P.map(s=>`<div class="gs-h">${s[0]}</div>`+s[1].map(r=>`<button class="gs-row${r[3]?' dg':''}" data-i="${i++}"${r[2]?'':' data-n="1"'}><b>${r[0]}</b><small>${esc(String(r[1]))}</small></button>`).join('')).join('');
  const fl=P.flatMap(s=>s[1]);Q('#gs-b',w).onclick=e=>{const b=e.target.closest('.gs-row');if(b){const f=fl[+b.dataset.i][2];f&&f();return}if(e.target.closest('#prm')){dialog({title:'Remove profile photo?',body:'Your photo will be removed from this device.',ok:'Remove',danger:1,onok:()=>rmPhoto(paint)});return}if(e.target.closest('#pv'))pickPhoto(paint)};
  try{setAv()}catch(e){}Q('#gs-b',w).scrollTop=sc}
 paint()}
window.openSet=setPage;
function profView(){if(Q('.gs-pview'))return;
 const im=Q('#th img'),src=im?im.currentSrc||im.src:'';
 const w=D.createElement('div');w.className='gf-ov gf-page gs-pview';
 w.innerHTML=`<div class="gf-top"><button data-x aria-label="Back">${ic('back')}</button><div class="gf-tt">${esc(pname||'Alpha')}</div></div><div class="gs-pstage">${src?`<img src="${esc(src)}" alt="Profile photo">`:`<div class="gs-pph"><svg class="sil" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.2" r="4.2"/><path d="M2.5 24c.4-6.2 4.2-9.6 9.5-9.6s9.1 3.4 9.5 9.6z"/></svg></div>`}</div>`;
 D.body.appendChild(w);const L=U.layer(w);Q('[data-x]',w).onclick=()=>L.close();Q('.gs-pstage',w).onclick=e=>{if(e.target===e.currentTarget)L.close()}}
addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#th')){e.preventDefault();e.stopImmediatePropagation();profView()}},true);

/* ---- no repeated messages ---- */
{const t0=window.toast;let lm='',lt=0;window.toast=function(m,l,f){const n=Date.now();if(!l&&m===lm&&n-lt<2500)return;lm=m;lt=n;return t0.apply(this,arguments)}}
/* ---- a back button on every screen and popup ---- */
const ROOT=new Set(['dash','ins','hist','vault','cat','fc','trash','file']);
function backBar(){const m=Q('#main');if(!m||ROOT.has(view)||Q('.ga-bk',m)||!m.firstElementChild)return;const f=m.querySelector('button');if(f&&/back|home|\u2190|\u2039|\u00ab/i.test(f.textContent||''))return;const d=D.createElement('div');d.className='ga-top2 ga-bk';d.innerHTML=`<button class="ga-k" aria-label="Back">${ic('back')}</button><div class="ga-x"><b>Back</b></div>`;Q('button',d).onclick=()=>go('dash');m.prepend(d)}
function modalBack(){const mc=Q('#mc');if(!mc||!mc.firstElementChild||Q('.ga-mb',mc)||view=='ins')return;const b=D.createElement('button');b.className='ga-k ga-mb';b.setAttribute('aria-label','Back');b.innerHTML=ic('back');b.onclick=()=>{const x=Q('#mx');x?x.click():shut()};mc.prepend(b)}
new MutationObserver(backBar).observe(Q('#main'),{childList:true});new MutationObserver(modalBack).observe(Q('#mc'),{childList:true});
{const ob=window.__gfBack;window.__gfBack=()=>{if(ob&&ob())return true;const md=Q('#modal');if(md&&getComputedStyle(md).display!='none'&&Q('#mc').firstElementChild){shut();return true}if(!ROOT.has(view)){go('dash');return true}return false}}

/* ---- back arrow inside every bottom sheet ---- */
new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType!=1||!n.classList.contains('gf-ov'))return;const s=Q('.gf-sheet',n);if(!s||Q('.ga-sb',s))return;if(!Q('.gf-sh',s)){const h=D.createElement('div');h.className='gf-sh';h.textContent='Options';Q('.gf-grab',s).after(h)}const b=D.createElement('button');b.className='ga-sb';b.setAttribute('aria-label','Back');b.innerHTML=ic('back');b.onclick=e=>{e.stopPropagation();const c=Q('.gf-scrim',n);c&&c.click()};s.prepend(b)}))).observe(D.body,{childList:true});

/* ---- Vault storage: one option row -> statistics page with different shapes ---- */
const SC={img:'#ea4335',vid:'#fa7b17',aud:'#a142f4',doc:'#1a73e8',txt:'#00897b',pdf:'#d93025',ppt:'#f9ab00',code:'#188038',oth:'#9aa0a6'};
const bs=n=>{n=+n||0;if(n<1024)return n+' B';const u=['KB','MB','GB','TB'];let i=-1;do{n/=1024;i++}while(n>=1024&&i<3);return(n>=100?n.toFixed(0):n.toFixed(1)).replace(/\.0$/,'')+' '+u[i]};
function tm(it,x,y,w,h,o=[]){if(!it.length)return o;if(it.length==1){o.push([it[0],x,y,w,h]);return o}const s=it.reduce((a,b)=>a+b.v,0)||1,a=it[0],f=a.v/s;if(w>=h){tm([a],x,y,w*f,h,o);tm(it.slice(1),x+w*f,y,w*(1-f),h,o)}else{tm([a],x,y,w,h*f,o);tm(it.slice(1),x,y+h*f,w,h*(1-f),o)}return o}
async function stPage(){if(Q('.st-page'))return;
 const w=D.createElement('div');w.className='gf-ov gf-page st-page gv';
 const SP={back:'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',check:'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',chev:'M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',image:'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',video:'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z',audio:'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',doc:'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',text:'M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z',slides:'M10 8v8l5-4-5-4zm9-5H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',code:'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',file:'M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z',del:'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',star:'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',stor:'M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z',free:'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z'};
 const gi=(n,x='')=>`<svg class="gi ${x}" viewBox="0 0 24 24" aria-hidden="true"><path d="${SP[n]}"/></svg>`;
 const GI={img:'image',vid:'video',aud:'audio',doc:'doc',txt:'text',pdf:'doc',ppt:'slides',code:'code',oth:'file'};
 const fd=t=>{try{return new Date(t).toLocaleDateString([],{month:'short',day:'numeric'})}catch(e){return''}},fl=n=>n+(n==1?' file':' files');
 w.innerHTML=`<header class="gv-tb"><button class="gv-ib" data-x aria-label="Back">${gi('back')}</button><b class="gv-ttl">Storage</b></header><div class="gv-chs st-tabs"></div><div class="st-b"><p style="padding:24px;color:var(--g2t)">Loading…</p></div>`;
 D.body.appendChild(w);const L=U.layer(w);Q('[data-x]',w).onclick=()=>L.close();
 let all=[];try{all=await rows()}catch(e){}
 const live=all.filter(f=>!f.trash),tr=all.filter(f=>f.trash),T=1e11,sum=l=>l.reduce((a,f)=>a+(f.size||0),0),tot=sum(all),tl=sum(live);
 const cats=FC.map(c=>{const l=live.filter(f=>fcat(f)==c[0]);return{k:c[0],n:c[2],c:SC[c[0]]||'#9aa0a6',v:sum(l),cnt:l.length}}),nz=cats.filter(c=>c.v>0).sort((a,b)=>b.v-a.v);
 const pct=v=>tl?Math.round(v/tl*100):0,none=`<div class="gv-em"><span class="gv-ci big" style="--c:#9aa0a6">${gi('file')}</span><b>No files here</b><span>Files you add to Protected appear here.</span></div>`;
 const ci=(i,c)=>`<span class="gv-ci" style="--c:${c}">${gi(i)}</span>`,card=h=>`<div class="st-card">${h}</div>`;
 const TABS={
  Overview:()=>{const p=Math.max(.01,Math.min(1,tot/T)),len=Math.PI*90,fav=live.filter(f=>f.starred).length;return card(`<svg viewBox="0 0 200 118" class="st-g"><path d="M10 100A90 90 0 0 1 190 100" fill="none" stroke="var(--g2)" stroke-width="16" stroke-linecap="round"/><path d="M10 100A90 90 0 0 1 190 100" fill="none" stroke="var(--gp)" stroke-width="16" stroke-linecap="round" stroke-dasharray="${len*p} ${len}"/><text x="100" y="86" text-anchor="middle" font-size="26" font-weight="500" fill="var(--gt)">${bs(tot)}</text><text x="100" y="106" text-anchor="middle" font-size="10.5" fill="var(--g2t)">used of 100 GB</text></svg>`)+`<h3 class="gv-h">Protected</h3><div class="st-list"><div class="st-row">${ci('file','#1a73e8')}<span class="st-t1"><b>Files</b></span><span class="st-v">${live.length}</span></div><button class="st-row" data-g="fav">${ci('star','#f9ab00')}<span class="st-t1"><b>Favorites</b></span><span class="st-v">${fav}</span>${gi('chev','cv')}</button><button class="st-row" data-g="trash">${ci('del','#9aa0a6')}<span class="st-t1"><b>Trash</b></span><span class="st-v">${bs(sum(tr))}</span>${gi('chev','cv')}</button><div class="st-row">${ci('free','#188038')}<span class="st-t1"><b>Free space</b></span><span class="st-v">${bs(Math.max(0,T-tot))}</span></div></div><div class="st-act"><button class="gv-bt" data-t2="Categories">View categories</button>${tr.length?'<button class="st-ob" data-g="trash">Open Trash</button>':''}</div>`},
  Categories:()=>{let o=0;const r=42,c=2*Math.PI*r,sv=nz.map(x=>{const l=x.v/tl*c,e=`<circle cx="60" cy="60" r="${r}" fill="none" stroke="${x.c}" stroke-width="16" stroke-dasharray="${Math.max(0,l-1.2)} ${c}" stroke-dashoffset="${-o}"/>`;o+=l;return e}).join('');return card(`<svg viewBox="0 0 120 120" class="st-d"><circle cx="60" cy="60" r="${r}" fill="none" stroke="var(--g2)" stroke-width="16"/><g transform="rotate(-90 60 60)">${tl?sv:''}</g><text x="60" y="64" text-anchor="middle" font-size="13" font-weight="500" fill="var(--gt)">${bs(tl)}</text></svg>`)+`<h3 class="gv-h">Categories</h3><div class="st-list">${cats.map(x=>`<button class="st-row" data-g="cat" data-k="${x.k}">${ci(GI[x.k],x.c)}<span class="st-t1"><b>${x.n}</b><span class="st-s">${fl(x.cnt)} · ${pct(x.v)}%</span></span><span class="st-v">${bs(x.v)}</span>${gi('chev','cv')}</button>`).join('')}</div>`},
  'Large files':()=>{const l=[...live].sort((a,b)=>(b.size||0)-(a.size||0)).slice(0,8);if(!l.length)return none;const m=l[0].size||1;return`<h3 class="gv-h">Large files</h3><div class="st-list">${l.map(f=>{const k=fcat(f),c=SC[k]||'#9aa0a6';return`<div class="st-row"><span class="gv-th" style="--c:${c}">${gi(GI[k])}</span><span class="st-t1"><b>${esc(f.name)}</b><span class="st-s">${bs(f.size||0)} · ${fd(f.edited||f.added||f.id)}</span><div class="st-bar"><i style="width:${Math.max(2,(f.size||0)/m*100)}%;background:${c}"></i></div></span></div>`}).join('')}</div>`},
  Activity:()=>{const D0=864e5,now=new Date().setHours(0,0,0,0),d=[];for(let i=13;i>=0;i--){const s=now-i*D0,l=live.filter(f=>{const t=f.added||f.id;return t>=s&&t<s+D0});d.push({l:new Date(s).getDate(),v:sum(l),n:l.length})}const m=Math.max(1,...d.map(x=>x.v)),n=d.reduce((a,x)=>a+x.n,0);return card(`<svg viewBox="0 0 140 70" class="st-c">${d.map((x,i)=>{const h=x.v/m*48;return`<rect x="${i*10+1.5}" y="${54-h}" width="7" height="${Math.max(h,x.v?1.5:.8)}" rx="2.5" fill="${x.v?'var(--gp)':'var(--g2)'}"/><text x="${i*10+5}" y="64" text-anchor="middle" font-size="3.8" fill="var(--g2t)">${x.l}</text>`}).join('')}</svg><p class="st-cp">${fl(n)} added in the last 14 days</p>`)}};
 const names=Object.keys(TABS),tb=Q('.st-tabs',w),bd=Q('.st-b',w);
 const show=k=>{tb.innerHTML=names.map(n=>`<button class="${n==k?'on':''}" data-t="${n}">${n==k?gi('check'):''}${n}</button>`).join('');bd.innerHTML='<div class="st-in">'+TABS[k]()+'</div>';bd.scrollTop=0};
 const go2=s=>{L.close();setTimeout(()=>{const b=Q(s);b&&b.click()},240)};
 w.addEventListener('click',e=>{const t=e.target.closest('.st-tabs [data-t]');if(t){show(t.dataset.t);return}const t2=e.target.closest('.st-b [data-t2]');if(t2){show(t2.dataset.t2);return}const g=e.target.closest('[data-g]');if(!g){const z=e.target.closest('.st-vz [data-k],.st-lcs [data-k]');if(!z)return;const k=z.dataset.k,x=cats.find(c=>c.k==k),bd2=Q('.st-b',w),on=bd2.classList.contains('st-dim')&&bd2.dataset.k==k;QA('.on',bd2).forEach(o=>o.classList.remove('on'));bd2.classList.toggle('st-dim',!on);bd2.dataset.k=on?'':k;const se=Q('.st-sel',bd2),cap=se.dataset.c||(se.dataset.c=se.textContent);if(on){se.textContent=cap;return}QA('[data-k="'+k+'"]',bd2).forEach(o=>o.classList.add('on'));se.innerHTML='<b>'+x.n+'</b> \u00b7 '+fl(x.cnt)+' \u00b7 '+bs(x.v)+' \u00b7 '+pct(x.v)+'%';return}const a=g.dataset.g;go2(a=='cat'?`[data-a="cat"][data-k="${g.dataset.k}"]`:`[data-a="${a}"]`)});
 show('Overview')}

addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="stor"]');if(b){e.preventDefault();e.stopImmediatePropagation();stPage()}},true);
}catch(e){console.warn('alpha-ga',e)}})();
