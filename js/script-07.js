(()=>{
const st=document.createElement('style');st.textContent=`.card[data-z=cal],.card[data-z=quo]{padding:11px 16px!important;margin-bottom:10px!important}.card[data-z=cal] #ck{font-size:24px!important;line-height:1.15}.card[data-z=cal] .mu{font-size:12px;line-height:1.3}.card[data-z=cal] .mu:last-child{margin-top:2px!important}.card[data-z=quo] h3{font-size:11px;margin-bottom:5px}.card[data-z=quo] p{font-size:14px!important;line-height:1.4!important}.card[data-z=quo] .mu{font-size:12px;margin-top:4px!important}`;document.head.appendChild(st);
const A=k=>k.indexOf('alpha.')==0;let sdb=null;
const so=()=>sdb?Promise.resolve(sdb):new Promise(r=>{try{const q=indexedDB.open('alpha-safe',1);q.onupgradeneeded=()=>q.result.createObjectStore('k');q.onsuccess=()=>{sdb=window._sdb=q.result;r(sdb)};q.onerror=()=>r(null)}catch(e){r(null)}});
const sp=async(m,f)=>{const d=await so();if(!d)return;return new Promise(r=>{try{const q=f(d.transaction('k',m).objectStore('k'));q.onsuccess=()=>r(q.result);q.onerror=()=>r()}catch(e){r()}})};
const sync=async()=>{try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(A(k))await sp('readwrite',s=>s.put(localStorage.getItem(k),k))}}catch(e){}};
(async()=>{try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist();
if(!localStorage.getItem('alpha.chk')){const ks=await sp('readonly',s=>s.getAllKeys()),vs=await sp('readonly',s=>s.getAll());if(ks&&ks.indexOf('alpha.chk')>-1){ks.forEach((k,i)=>localStorage.setItem(k,vs[i]));location.reload();return}}
sync()}catch(e){}})();
setInterval(sync,10000);addEventListener('pagehide',sync);document.addEventListener('visibilitychange',()=>{if(document.hidden)sync()});
const rd=b=>new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result);f.readAsDataURL(b)});
const ab=u=>{const a=new Uint8Array(u);let s='';for(let i=0;i<a.length;i+=32768)s+=String.fromCharCode.apply(null,a.subarray(i,i+32768));return btoa(s)};
const od=()=>new Promise((r,j)=>{const q=indexedDB.open('alpha',1);q.onupgradeneeded=()=>q.result.createObjectStore('f',{keyPath:'id'});q.onsuccess=()=>r(q.result);q.onerror=j});
async function doBackup(){const k={};for(let i=0;i<localStorage.length;i++){const n=localStorage.key(i);if(A(n))k[n]=localStorage.getItem(n)}
const d=await od(),rs=await new Promise((r,j)=>{const g=d.transaction('f').objectStore('f').getAll();g.onsuccess=()=>r(g.result);g.onerror=j}),out=[];let skipped=0;
for(const r of rs){if(r.ch){skipped++;continue}const o=Object.assign({},r);if(r.d&&(r.d instanceof ArrayBuffer||ArrayBuffer.isView(r.d)))o.d={ab:ab(r.d.buffer||r.d)};if(r.blob)o.blob=await rd(r.blob);out.push(o)}
const b=new Blob([JSON.stringify({alpha:1,t:Date.now(),k:k,rows:out})],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='ALPHA-backup-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();toast(skipped?'Backup saved. '+skipped+' large file(s) are not included in backups':'Backup saved')}
async function doRestore(f){const j=JSON.parse(await f.text());if(!j.alpha)throw 0;const d=await od(),os=()=>d.transaction('f','readwrite').objectStore('f'),w=q=>new Promise(r=>{q.onsuccess=r;q.onerror=r});
await w(os().clear());for(const o of j.rows){const r=Object.assign({},o);if(o.d&&o.d.ab)r.d=Uint8Array.from(atob(o.d.ab),c=>c.charCodeAt(0)).buffer;if(typeof o.blob=='string')r.blob=await(await fetch(o.blob)).blob();await w(os().put(r))}
Object.keys(j.k).forEach(k=>localStorage.setItem(k,j.k[k]));location.reload()}
const _os9=openSet;openSet=function(){_os9();const sa=$('#sa'),h=`<h3 class='mu' style='margin:18px 0 8px'>Backup</h3><div class='row' style='flex-wrap:wrap'><button class='chip' id='bk1'>💾 Save backup</button><label class='chip' style='cursor:pointer'>♻ Restore<input type='file' id='bk2' accept='.json,application/json' hidden></label></div>`;
if(sa)sa.parentElement.insertAdjacentHTML('beforebegin',h);else $('#mc>div').insertAdjacentHTML('beforeend',h);
$('#bk1').onclick=()=>doBackup().catch(()=>toast('Backup failed'));$('#bk2').onchange=e=>{const f=e.target.files[0];if(f&&confirm('Replace ALL current data with this backup?'))doRestore(f).catch(()=>toast('Not a valid backup'))}};
try{new MutationObserver(()=>{if(localStorage.getItem('alpha.chk'))document.documentElement.classList.remove('first')}).observe(document.getElementById('lock'),{attributes:true,attributeFilter:['style']})}catch(e){}
if('serviceWorker' in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});

/* v3 patches: name refresh, tap-photo, dark default */
const _os4=openSet;openSet=function(){_os4();const pf=$('#pf'),l=pf&&pf.closest('label'),pv=$('#pv'),pn=$('#pn');if(l){l.parentNode.insertBefore(pf,l);l.remove()}if(pf){pf.hidden=false;pf.accept='image/*';pf.style.cssText='position:absolute;width:1px;height:1px;opacity:0;overflow:hidden;pointer-events:none'}if(pv&&pf){const lb=document.createElement('label');lb.id='pv';lb.htmlFor='pf';lb.style.cssText=pv.style.cssText+';cursor:pointer';lb.title='Tap to set photo';lb.innerHTML=pv.innerHTML;pv.replaceWith(lb);setAv()}if(pn){pn.insertAdjacentHTML('afterend','<p class="mu" style="font-size:12px;margin-top:6px">Tap the photo to set your picture</p>');pn.addEventListener('input',()=>{if(key&&view=='dash'){go('dash');clk()}})}};
const sx=document.createElement('style');sx.textContent='#go{white-space:nowrap;flex:none;padding-left:20px;padding-right:20px}#nm{min-width:0}';document.head.appendChild(sx);

/* ===== v4: lock-screen i18n, name field, security hardening ===== */
const LB={'Choose a lock and set it':'একটি লক বেছে নিয়ে সেট করুন','Enter your PIN to unlock':'আনলক করতে আপনার পিন দিন','Enter your password to unlock':'আনলক করতে আপনার পাসওয়ার্ড দিন','Enter your pattern to unlock':'আনলক করতে আপনার প্যাটার্ন আঁকুন','Create PIN':'পিন তৈরি করুন','Create password':'পাসওয়ার্ড তৈরি করুন','Create pattern':'প্যাটার্ন তৈরি করুন','Unlock':'আনলক','Locked':'লক করা আছে','Locked after inactivity':'নিষ্ক্রিয়তার কারণে লক হয়েছে','PIN':'পিন','Password':'পাসওয়ার্ড','Pattern':'প্যাটার্ন','Confirm':'নিশ্চিত করুন','Your name':'আপনার নাম','Forgot PIN? Reset ALPHA':'পিন ভুলে গেছেন? ALPHA রিসেট করুন','Forgot password? Reset ALPHA':'পাসওয়ার্ড ভুলে গেছেন? ALPHA রিসেট করুন','Forgot pattern? Reset ALPHA':'প্যাটার্ন ভুলে গেছেন? ALPHA রিসেট করুন','Draw again to confirm':'নিশ্চিত করতে আবার আঁকুন','Patterns do not match':'প্যাটার্ন মিলছে না','PINs do not match':'পিন মিলছে না','Passwords do not match':'পাসওয়ার্ড মিলছে না','Connect at least 4 dots':'কমপক্ষে ৪টি বিন্দু যুক্ত করুন','Pattern must connect at least 5 dots':'প্যাটার্নে কমপক্ষে ৫টি বিন্দু যুক্ত করতে হবে','This pattern is too easy to guess':'এই প্যাটার্ন অনুমান করা খুব সহজ','PIN must be 6 to 12 digits':'পিন ৬ থেকে ১২ সংখ্যার হতে হবে','This PIN is too easy to guess':'এই পিন অনুমান করা খুব সহজ (একই বা ক্রমিক সংখ্যা এড়িয়ে চলুন)','Password must be at least 8 characters with letters and numbers':'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে এবং অক্ষর ও সংখ্যা থাকতে হবে','This password is too common. Choose a stronger one.':'এই পাসওয়ার্ড খুব প্রচলিত। আরও শক্তিশালী একটি বেছে নিন।','Enter your name':'আপনার নাম লিখুন','Enter your name first':'আগে আপনার নাম লিখুন','Enter your PIN':'আপনার পিন দিন','Enter your password':'আপনার পাসওয়ার্ড দিন','Wrong PIN. {n} attempts left.':'ভুল পিন। আর {n}বার চেষ্টা করতে পারবেন।','Wrong PIN. Last try before lockout.':'ভুল পিন। লক হওয়ার আগে এটাই শেষ সুযোগ।','Wrong password. Last try before lockout.':'ভুল পাসওয়ার্ড। লক হওয়ার আগে এটাই শেষ সুযোগ।','Wrong pattern. Last try before lockout.':'ভুল প্যাটার্ন। লক হওয়ার আগে এটাই শেষ সুযোগ।','Wrong password. {n} attempts left.':'ভুল পাসওয়ার্ড। আর {n}বার চেষ্টা করতে পারবেন।','Wrong pattern. {n} attempts left.':'ভুল প্যাটার্ন। আর {n}বার চেষ্টা করতে পারবেন।','Too many wrong attempts. Try again in {t}':'অনেকবার ভুল হয়েছে। {t} পরে আবার চেষ্টা করুন','Secure storage is not available in this browser':'এই ব্রাউজারে নিরাপদ স্টোরেজ উপলব্ধ নেই'};
const REV={};Object.keys(LB).forEach(k=>REV[LB[k]]=k);
const T=(k,v)=>{let t=(lang=='bn'&&LB[k])||k;if(v)t=t.replace(/\{(\w+)\}/g,(m,x)=>v[x]);return lang=='bn'?bd(t):t};
const _tr0=tr;tr=function(n){if(n&&n.id=='lock')return;_tr0(n)};
function fixLock(){const L=$('#lock');if(!L)return;const w=document.createTreeWalker(L,NodeFilter.SHOW_TEXT);let x;while(x=w.nextNode()){const t=x.nodeValue.trim();if(!t)continue;const en=REV[t]||t;if(LB[en]){const nv=lang=='bn'?LB[en]:en;if(nv!=t)x.nodeValue=x.nodeValue.replace(t,nv)}}
L.querySelectorAll('input').forEach(i=>{const p=i.placeholder,en=REV[p]||p;if(LB[en]){const nv=lang=='bn'?LB[en]:en;if(nv!=p)i.placeholder=nv}})}
function setRs(){const r=$('#rs');if(r)r.textContent=T('Forgot '+LN[lmode]+'? Reset ALPHA')}
if(!$('#pname')){$('#lmc').insertAdjacentHTML('beforebegin','<input type="text" id="pname" maxlength="30" autocomplete="off" placeholder="Your name" style="margin-bottom:10px">')}
function refreshName(){const n=$('#pname');if(n&&ls.g('alpha.chk',null)&&!n.value)n.value=pname}
/* brute-force limiter */
const FAILD=[30,60,300,900,3600,14400],fst=()=>ls.g('alpha.fail',{n:0,l:0,u:0}),lockLeft=()=>Math.max(0,(fst().u||0)-Date.now()),mmss=ms=>{const t=Math.ceil(ms/1000),h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60,p=v=>String(v).padStart(2,'0');return(h?h+':':'')+p(m)+':'+p(s)};
let lkT=null;
function renderLock(){const left=lockLeft(),dis=left>0;['#lb','#pin','#pin2','#pname'].forEach(q=>{const el=$(q);if(el)el.disabled=dis});const pp=$('#lock .pp');if(pp)pp.style.pointerEvents=dis?'none':'';
 if(dis){$('#le').textContent=T('Too many wrong attempts. Try again in {t}',{t:mmss(left)});if(!lkT)lkT=setInterval(renderLock,500)}else if(lkT){clearInterval(lkT);lkT=null;if($('#le').textContent&&/Too many|অনেকবার/.test($('#le').textContent))$('#le').textContent=''}}
function regFail(){const f=fst();f.n=(f.n||0)+1;let left=5-f.n;if(f.n>=5){f.u=Date.now()+FAILD[Math.min(f.l||0,FAILD.length-1)]*1000;f.l=(f.l||0)+1;f.n=0;ls.s('alpha.fail',f);renderLock();return}ls.s('alpha.fail',f);$('#le').textContent=left==1?T('Wrong '+LN[lmode]+'. Last try before lockout.'):T('Wrong '+LN[lmode]+'. {n} attempts left.',{n:left})}
/* strength rules (creation / change only; login accepts existing locks) */
function weak(m,s){if(m=='pattern'){const d=s.replace(/^p:/,'').split('-').map(Number);if(d.length<5)return'Pattern must connect at least 5 dots';let up=1,dn=1;for(let i=1;i<d.length;i++){if(d[i]!=d[i-1]+1)up=0;if(d[i]!=d[i-1]-1)dn=0}return up||dn?'This pattern is too easy to guess':null}
if(m=='pin'){if(!/^\d{6,12}$/.test(s))return'PIN must be 6 to 12 digits';const d=[...s].map(Number);let up=1,dn=1;for(let i=1;i<d.length;i++){if(d[i]-d[i-1]!=1)up=0;if(d[i]-d[i-1]!=-1)dn=0}const n=s.length,half=n%2==0&&s.slice(0,n/2)==s.slice(n/2),third=n%3==0&&s.slice(0,n/3).repeat(3)==s,bad=['112233','102030','159753','123321','696969','520520','111222','456789','789456','147258','258369','147369','1357924680','0123456789','246810','101010','100200','200300'];
if(new Set(d).size<=2||up||dn||half||third||bad.includes(s))return'This PIN is too easy to guess';return null}
if(s.length<8||!/[A-Za-z]/.test(s)||!/\d/.test(s))return'Password must be at least 8 characters with letters and numbers';const l=s.toLowerCase();if(new Set(l).size<4||['password','password1','12345678','123456789','qwerty123','qwertyuiop','iloveyou1','admin123','welcome1','letmein1','abc12345','alpha123','alpha1234','alpha12345','pass1234','1q2w3e4r','1qaz2wsx'].includes(l))return'This password is too common. Choose a stronger one.';return null}
/* stronger key derivation for new locks; old locks keep their stored iteration count */
const IT_OLD=150000,IT_NEW=600000;
mk=async function(pin,salt,it){const k=await crypto.subtle.importKey('raw',enc.encode(pin),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:it||IT_NEW,hash:'SHA-256'},k,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])};
applyLock=async function(mode,secret){const rs=await rows().catch(()=>[]),pl=[];for(const r of rs)if(r.d)pl.push([r,await de(r.d)]);const s=crypto.getRandomValues(new Uint8Array(16));key=await mk(secret,s,IT_NEW);for(const [r,p] of pl){r.d=await en(p);await svf(r)}ls.s('alpha.chk',{s:b64(s),v:b64(new Uint8Array(await en(enc.encode('ALPHA')))),it:IT_NEW});ls.s('alpha.mode',mode);lmode=mode};
const setName=n=>{pname=n;ls.s('alpha.name',n)};
unlock=async function(){const e=$('#le'),p=$('#pin').value,chk=ls.g('alpha.chk',null),nm=$('#pname').value.trim();
if(lockLeft()>0){renderLock();return}
if(!(window.crypto&&crypto.subtle)){e.textContent=T('Secure storage is not available in this browser');return}
try{if(!chk){if(!nm){e.textContent=T('Enter your name');return}
if(lmode!='pattern'&&$('#pin2').value!==p){e.textContent=T(lmode=='pin'?'PINs do not match':'Passwords do not match');return}
const w=weak(lmode,p);if(w){e.textContent=T(w);return}
const sl=crypto.getRandomValues(new Uint8Array(16));key=await mk(p,sl,IT_NEW);ls.s('alpha.chk',{s:b64(sl),v:b64(new Uint8Array(await en(enc.encode('ALPHA')))),it:IT_NEW});ls.s('alpha.mode',lmode);setName(nm)}
else{if(!p){e.textContent=T(lmode=='pin'?'Enter your PIN':'Enter your password');return}
try{key=await mk(p,ub(chk.s),chk.it||IT_OLD);if(new TextDecoder().decode(await de(ub(chk.v)))!='ALPHA')throw 0}catch(x){key=null;regFail();return}
if(nm&&nm!=pname)setName(nm)}
ls.s('alpha.fail',{n:0,l:0,u:0});$('#lock').style.display='none';$('#pin').value='';$('#pin2').value='';$('#pin2').style.display='none';e.textContent='';go(view);bump()}catch(x){key=null;e.textContent='Setup failed: '+(x&&x.message||x)}};
const _sm=setMode;setMode=function(m){_sm(m);refreshName();setRs();renderLock();fixLock()};
setMode(lmode);
new MutationObserver(()=>fixLock()).observe($('#lock'),{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder']});
setInterval(()=>{if($('#lock').style.display!='none')fixLock()},700);

/* ===== v5: browser colour follows the theme; logo + app icons are static image files ===== */
const mixHex=(h,k)=>{const n=parseInt(h.slice(1),16),r=n>>16,g=n>>8&255,b=n&255,f=v=>Math.round(v*k).toString(16).padStart(2,'0');return'#'+f(r)+f(g)+f(b)};
function setFav(){try{const t=themes[ti];if(!t)return;const m=document.querySelector('meta[name=theme-color]');if(m)m.content=t[2]}catch(e){}}
const sA=document.createElement('style');sA.textContent=`img.al{border-radius:0;object-fit:contain;display:block;flex:none;background:none;animation:gl 2.6s ease-in-out infinite alternate}:root[data-theme='light'] img.al{animation:none;filter:drop-shadow(0 1px 3px rgba(12,24,60,.45))}#lock .al{display:inline-block;vertical-align:middle;margin-right:10px}`;document.head.appendChild(sA);
const _at5=applyTheme;applyTheme=function(i){_at5(i);setFav()};setFav();
})();
