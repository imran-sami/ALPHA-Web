/* ===== v26c: ALPHA account (unique name) + realtime cross-device sync of data ===== */
(()=>{
const CFG={apiKey:"AIzaSyAcP-GdzSGzFRjLT5GDM750cAMlmMD4z20",authDomain:"alpha-app-8f87f.firebaseapp.com",projectId:"alpha-app-8f87f",storageBucket:"alpha-app-8f87f.firebasestorage.app",messagingSenderId:"688836550530",appId:"1:688836550530:web:5c565b3e99764fa112f99b"};
const LSK=window.localStorage,HREF0=location.href;
const EXC=new Set(['alpha.chk','alpha.fail','alpha.mode','alpha.rd','alpha.stv']);
const SK=k=>typeof k=='string'&&k.indexOf('alpha.')==0&&!EXC.has(k);
const gj=(k,d)=>{try{const v=LSK.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}};
let TS=gj('sync.ts',{}),applying=false,timer=null,unsub=null,uid=null,handle=null,status='off',lastSync=+LSK.getItem('sync.last')||0,pendingUI=false;
const DEV=LSK.getItem('sync.dev')||(()=>{const v=Math.random().toString(36).slice(2,10);LSK.setItem('sync.dev',v);return v})();
const saveTS=()=>{try{LSK.setItem('sync.ts',JSON.stringify(TS))}catch(e){}};
const _si=Storage.prototype.setItem,_ri=Storage.prototype.removeItem;
Storage.prototype.setItem=function(k,v){let ch=false;if(this===LSK&&SK(k)&&!applying){try{ch=this.getItem(k)!==String(v)}catch(e){}}_si.call(this,k,v);if(ch){TS[k]=Date.now();saveTS();sched()}};
Storage.prototype.removeItem=function(k){const had=this===LSK&&SK(k)&&!applying&&this.getItem(k)!==null;_ri.call(this,k);if(had){TS[k]=Date.now();saveTS();sched()}};
/* ---- firebase loader (same SDK version as the recovery code) ---- */
let _f=null;const fb=()=>_f||(_f=(async()=>{const B='https://www.gstatic.com/firebasejs/10.12.2/';const[a,au,fs]=await Promise.all([import(B+'firebase-app.js'),import(B+'firebase-auth.js'),import(B+'firebase-firestore.js')]);const app=a.getApps().length?a.getApp():a.initializeApp(CFG);return{a:au,s:fs,auth:au.getAuth(app),db:fs.getFirestore(app)}})().catch(e=>{_f=null;throw e}));
const eh=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const say=m=>{try{toast(m)}catch(e){}};
const errMsg=e=>{const c=(e&&e.code)||'';return /network/.test(c)?'No internet connection':/permission/.test(c)?'Cloud rules do not allow this yet — publish the new firestore.rules in Firebase (see PROGRESS.md)':/operation-not-allowed|configuration-not-found/.test(c)?'This sign-in method is not enabled in Firebase Authentication':/unauthorized-domain/.test(c)?'Add this website to Firebase → Authentication → Settings → Authorized domains':/popup-closed|cancelled/.test(c)?'Cancelled':/invalid-action-code|expired/.test(c)?'This link expired or was already used — request a new one':/invalid-verification|invalid-phone|too-many/.test(c)?'Wrong code or number, or too many tries':(e&&e.message)||'Something went wrong'};
/* ---- push / pull ---- */
function sched(){if(!uid||applying)return;clearTimeout(timer);timer=setTimeout(()=>push().catch(()=>{}),1500)}
async function push(){
 if(!uid||applying)return;const F=await fb(),d={},ts={},now=Date.now();
 for(let i=0;i<LSK.length;i++){const k=LSK.key(i);if(SK(k)){d[k]=LSK.getItem(k);if(!TS[k])TS[k]=now;ts[k]=TS[k]}}
 for(const k in TS){if(SK(k)&&!(k in d)){d[k]=null;ts[k]=TS[k]}}
 const js=JSON.stringify(d);if(js.length>900000){status='toobig';paintAcct();return}
 saveTS();await F.s.setDoc(F.s.doc(F.db,'users',uid),{data:js,ts:JSON.stringify(ts),updated:now,dev:DEV},{merge:true});
 lastSync=now;LSK.setItem('sync.last',String(now));status='ok';paintAcct()}
function applyRemote(x,force){
 if(!x||!x.data)return 0;let rd,rts={};try{rd=JSON.parse(x.data);rts=x.ts?JSON.parse(x.ts):{}}catch(e){return 0}
 const ch=[];let localNewer=false;applying=true;
 try{for(const k in rd){if(!SK(k))continue;const rt=rts[k]||x.updated||0,lt=force?-1:(TS[k]||0);
  if(rt>lt){const cur=LSK.getItem(k),nv=rd[k];if(nv===null){if(cur!==null){_ri.call(LSK,k);ch.push(k)}}else if(cur!==nv){_si.call(LSK,k,nv);ch.push(k)}TS[k]=rt}else if(lt>rt)localNewer=true}
  if(force){for(let i=LSK.length-1;i>=0;i--){const k=LSK.key(i);if(SK(k)&&!(k in rd)){_ri.call(LSK,k);ch.push(k)}}}
 }finally{applying=false}
 saveTS();if(ch.length)refreshApp(ch);if(localNewer)sched();return ch.length}
function busy(){const a=document.activeElement;return(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))||(document.getElementById('modal')||{style:{}}).style.display=='flex'||!!document.querySelector('#rcvl.on,.rcvl.on')}
function refreshApp(ch){
 applying=true;try{
  const J=(k,d)=>gj(k,d);
  if(ch.includes('alpha.acts')&&typeof acts!='undefined')acts=J('alpha.acts',acts);
  if(ch.includes('alpha.run')&&typeof run!='undefined')run=J('alpha.run',null);
  if(ch.includes('alpha.tasks')&&typeof tasks!='undefined')tasks=J('alpha.tasks',tasks);
  if(ch.includes('alpha.h24')&&typeof h24!='undefined')h24=J('alpha.h24',h24);
  if(ch.includes('alpha.goal')&&typeof GOAL!='undefined')GOAL=J('alpha.goal',GOAL);
  if((ch.includes('alpha.name')||ch.includes('alpha.nm'))&&typeof pname!='undefined')pname=J('alpha.name',pname);
  if(ch.includes('alpha.lang')&&typeof lang!='undefined'){const nl=J('alpha.lang',lang);if(nl!==lang){lang=nl;try{document.documentElement.lang=nl}catch(e){}}}
  if(ch.includes('alpha.ti')&&typeof applyTheme=='function'){try{applyTheme(J('alpha.ti',ti))}catch(e){}}
 }catch(e){console.warn('sync refresh',e)}finally{applying=false}
 pendingUI=true;uiRefresh()}
function uiRefresh(){if(!pendingUI)return;if(typeof key=='undefined'||!key||busy())return;pendingUI=false;try{go(view);if(typeof clk=='function')clk()}catch(e){}}
setInterval(uiRefresh,2500);
function listen(){
 if(unsub||!uid)return;fb().then(F=>{if(unsub)return;status='sync';paintAcct();
  unsub=F.s.onSnapshot(F.s.doc(F.db,'users',uid),snap=>{const x=snap.exists()?snap.data():null;if(x&&x.handle&&handle!==x.handle){handle=x.handle;paintAcct()}
    if(x&&x.dev!==DEV&&x.data){const n=applyRemote(x,false);if(n)say('☁ Updated from another device')}
    lastSync=Date.now();LSK.setItem('sync.last',String(lastSync));status='ok';paintAcct()},
   e=>{status='err';paintAcct();console.warn('sync',e)})}).catch(e=>{status='err';paintAcct()})}
/* ---- sign in / account ---- */
function modalBox(html){const m=document.getElementById('mc'),md=document.getElementById('modal');if(!m||!md)return null;m.innerHTML=`<div class="acp" style="width:min(92vw,420px);max-height:84vh;overflow:auto">${html}</div>`;md.style.zIndex='2147483000';md.style.display='flex';return m}
const close=()=>{try{shut()}catch(e){}};
function signInPanel(){
 window.__acFromLock=!(typeof key!='undefined'&&key);
 const m=modalBox(`<div class="row sp"><b style="font-size:18px">☁ ALPHA account</b><button class="chip sm" id="acx">Close</button></div>
 <p class="mu" style="margin:10px 0">One account for every device. Sign in and your tasks, history, name, language and settings follow you everywhere.</p>
 <div id="acb"><button class="btn" id="acg" style="width:100%;margin-bottom:8px">Continue with Google</button>
 <input id="ace" type="email" placeholder="Email address" autocomplete="email" style="width:100%;margin:6px 0"><button class="btn" id="acm" style="width:100%;margin-bottom:8px">✉ Email me a sign-in link</button>
 <input id="acp" type="tel" placeholder="+8801XXXXXXXXX" autocomplete="tel" style="width:100%;margin:6px 0"><button class="btn" id="acs" style="width:100%">📱 Send SMS code</button><div id="rcap"></div></div><div id="acn" class="mu" style="margin-top:10px;font-size:12.5px"></div>`);
 if(!m)return;const $=id=>document.getElementById(id),note=t=>{$('acn').textContent=t};
 $('acx').onclick=close;
 $('acg').onclick=async()=>{try{const F=await fb();note('Opening Google…');if(window.AlphaNative&&window.AlphaNative.googleIdToken){const t=await window.AlphaNative.googleIdToken();await F.a.signInWithCredential(F.auth,F.a.GoogleAuthProvider.credential(t))}else await F.a.signInWithPopup(F.auth,new F.a.GoogleAuthProvider())}catch(e){note(errMsg(e))}};
 if(window.AlphaNative){['ace','acm','acp','acs'].forEach(i=>{const e=$(i);if(e)e.style.display='none'});note('On the Android app, sign in with Google.')}
 $('acm').onclick=async()=>{const em=$('ace').value.trim();if(!/^\S+@\S+\.\S+$/.test(em)){note('Enter a valid email');return}
  try{const F=await fb();LSK.setItem('acct.pend',JSON.stringify({email:em}));await F.a.sendSignInLinkToEmail(F.auth,em,{url:location.origin+location.pathname,handleCodeInApp:true});note('Link sent to '+em+'. Open it on this device (or any device) to finish signing in.')}catch(e){LSK.removeItem('acct.pend');note(errMsg(e))}};
 $('acs').onclick=async()=>{const ph=$('acp').value.trim().replace(/[\s-]/g,'');if(!/^\+\d{8,15}$/.test(ph)){note('Use the full number with country code, e.g. +8801…');return}
  try{const F=await fb();if(!window.__acv)window.__acv=new F.a.RecaptchaVerifier(F.auth,'rcap',{size:'invisible'});const cr=await F.a.signInWithPhoneNumber(F.auth,ph,window.__acv);
   $('acb').innerHTML='<input id="acc" inputmode="numeric" placeholder="6-digit code" style="width:100%;margin:6px 0"><button class="btn" id="acv" style="width:100%">Verify</button>';note('Code sent to '+ph);
   $('acv').onclick=async()=>{try{await cr.confirm($('acc').value.trim())}catch(e){note(errMsg(e))}}}catch(e){note(errMsg(e));try{window.__acv&&window.__acv.clear();window.__acv=null}catch(x){}}}}
async function completeEmailLink(){
 if(!/[?&]oobCode=/.test(HREF0))return;let pend=null;try{pend=JSON.parse(LSK.getItem('acct.pend')||'null')}catch(e){}if(!pend)return;
 try{const F=await fb();if(!F.a.isSignInWithEmailLink(F.auth,HREF0))return;let em=pend.email||prompt('Confirm your email address');if(!em)return;
  history.replaceState(null,'',location.pathname);await F.a.signInWithEmailLink(F.auth,em,HREF0);LSK.removeItem('acct.pend')}
 catch(e){LSK.removeItem('acct.pend');say(errMsg(e))}}
const normH=s=>String(s||'').trim().toLowerCase().replace(/\s+/g,'_');
const okH=h=>/^[a-z0-9._-]{3,24}$/.test(h);
async function claimName(F,u,h){
 await F.s.runTransaction(F.db,async tx=>{const r=F.s.doc(F.db,'names',h),s=await tx.get(r);if(s.exists()&&s.data().uid!==u.uid){const e=new Error('taken');e.code='name-taken';throw e}tx.set(r,{uid:u.uid,created:Date.now()})});
 await F.s.setDoc(F.s.doc(F.db,'users',u.uid),{handle:h},{merge:true})}
function chooseName(F,u){return new Promise(res=>{
 const sug=normH((typeof NameTr!='undefined'?NameTr.bn2en(dispName('en')):dispName('en'))).replace(/[^a-z0-9._-]/g,'').slice(0,24);
 const m=modalBox(`<b style="font-size:18px">Choose your account name</b><p class="mu" style="margin:8px 0">Only one account can have each name. Letters, numbers, dot, dash, underscore (3–24).</p>
 <div class="row" style="gap:6px"><span style="opacity:.6">@</span><input id="anm" value="${eh(sug)}" maxlength="24" autocapitalize="off" autocorrect="off" spellcheck="false" style="flex:1"></div><div id="ane" style="color:#ff8a8a;font-size:12.5px;min-height:18px;margin:6px 0"></div><button class="btn" id="ang" style="width:100%">Create account</button>`);
 if(!m){res(null);return}const $=id=>document.getElementById(id);
 $('ang').onclick=async()=>{const h=normH($('anm').value);if(!okH(h)){$('ane').textContent='3–24 letters, numbers, . - _';return}
  $('ang').disabled=true;try{await claimName(F,u,h);close();res(h)}catch(e){$('ang').disabled=false;$('ane').textContent=e.code=='name-taken'?'“'+h+'” is already taken — try another':errMsg(e)}}})}
async function afterSignIn(u){
 uid=u.uid;while((typeof key=='undefined'||!key)&&!window.__acFromLock)await new Promise(r=>setTimeout(r,400));const F=await fb();status='sync';paintAcct();
 try{const ref=F.s.doc(F.db,'users',uid),snap=await F.s.getDoc(ref),x=snap.exists()?snap.data():null;
  const joined=LSK.getItem('acct.uid')===uid;
  if(x&&x.handle){handle=x.handle;
   if(!joined){let ok=true;if(x.data&&localHasData())ok=confirm('This account already has data (@'+handle+').\nReplace the data on this device with your account data?');
    if(!ok){await F.a.signOut(F.auth);return}
    if(x.data)applyRemote(x,true)}}
  else{const h=await chooseName(F,u);if(!h){await F.a.signOut(F.auth);return}handle=h}
  LSK.setItem('acct.uid',uid);LSK.setItem('acct.h',handle||'');await push();listen();say('☁ Signed in as @'+handle)}
 catch(e){status='err';paintAcct();say(errMsg(e))}}
const localHasData=()=>{for(let i=0;i<LSK.length;i++)if(SK(LSK.key(i)))return true;return false};
async function signOutAcct(){try{const F=await fb();if(unsub){unsub();unsub=null}await F.a.signOut(F.auth)}catch(e){}uid=null;handle=null;LSK.removeItem('acct.uid');LSK.removeItem('acct.h');status='off';paintAcct();say('Signed out — data stays on this device')}
/* ---- settings block ---- */
function acctHTML(){
 const ago=lastSync?(()=>{const s=Math.round((Date.now()-lastSync)/1000);return s<60?'just now':s<3600?Math.round(s/60)+' min ago':Math.round(s/3600)+' h ago'})():'—';
 const stT={ok:'✓ Synced '+ago,sync:'Syncing…',err:'⚠ Sync problem — tap Sync now',toobig:'⚠ Data too large to sync',off:''}[status]||'';
 return uid?`<div id="acctbox" class="card" style="margin:12px 0"><div class="row sp"><b>☁ ALPHA account</b><span class="mu" style="font-size:12px">${stT}</span></div><div style="margin:8px 0;font-size:18px;font-weight:800">@${eh(handle||LSK.getItem('acct.h')||'…')}</div><div class="mu" style="font-size:12px">Signed in on this device. Your data syncs to every device that signs in with this account.</div><div class="row" style="gap:8px;margin-top:10px"><button class="chip" id="acsync">⟳ Sync now</button><button class="chip" id="acout">Sign out</button></div></div>`
 :`<div id="acctbox" class="card" style="margin:12px 0"><b>☁ ALPHA account</b><div class="mu" style="font-size:12px;margin:6px 0 10px">Use one account on phone, PC and browser — your data stays the same everywhere.</div><button class="btn" id="acin" style="width:100%">Sign in / Create account</button></div>`}
function wireAcct(){const a=document.getElementById('acin');if(a)a.onclick=signInPanel;const o=document.getElementById('acout');if(o)o.onclick=()=>{if(confirm('Sign out of your ALPHA account on this device?'))signOutAcct()};const s=document.getElementById('acsync');if(s)s.onclick=async()=>{try{const F=await fb(),sn=await F.s.getDoc(F.s.doc(F.db,'users',uid));if(sn.exists())applyRemote(sn.data(),false);await push();say('☁ Synced')}catch(e){say(errMsg(e))}}}
function paintAcct(){const b=document.getElementById('acctbox');if(b){b.outerHTML=acctHTML();wireAcct()}}
const _os=openSet;openSet=function(){_os.apply(this,arguments);const sa=document.getElementById('sa');if(!sa||document.getElementById('acctbox'))return;const host=sa.closest('.row')||sa.parentElement;host.insertAdjacentHTML('beforebegin',acctHTML());wireAcct()};
/* ---- sign-in link on the lock screen (new device) ---- */
function lockLink(){const l=document.getElementById('lock');if(!l||l.querySelector('#acl'))return;const anchor=l.querySelector('#pin')||l.querySelector('input');if(!anchor)return;
 const row=l.querySelector('#lb')||anchor;row.insertAdjacentHTML('afterend','<div id="acl" style="text-align:center;margin:10px 0"><a href="#" style="color:var(--a);font-size:13px;text-decoration:underline">☁ Already have an ALPHA account? Sign in</a></div>');
 l.querySelector('#acl a').onclick=e=>{e.preventDefault();signInPanel()}}
try{new MutationObserver(lockLink).observe(document.body,{childList:true,subtree:true})}catch(e){}lockLink();
/* ---- start ---- */
(async()=>{
 const had=LSK.getItem('acct.uid');if(!had&&!/[?&]oobCode=/.test(HREF0))return;
 try{const F=await fb();await completeEmailLink();
  F.a.onAuthStateChanged(F.auth,u=>{if(u){if(uid===u.uid)return;handle=LSK.getItem('acct.h')||null;afterSignIn(u)}else if(uid){uid=null;if(unsub){unsub();unsub=null}status='off';paintAcct()}})}catch(e){status='err'}})();
window.AlphaAcct={push,get state(){return{uid,handle,status,lastSync}}};
})();
