/* ALPHA account security: Firebase phone OTP + email link (lazy-loaded, app stays offline-first) */
(()=>{
const CFG={apiKey:"AIzaSyAcP-GdzSGzFRjLT5GDM750cAMlmMD4z20",authDomain:"alpha-app-8f87f.firebaseapp.com",projectId:"alpha-app-8f87f",storageBucket:"alpha-app-8f87f.firebasestorage.app",messagingSenderId:"688836550530",appId:"1:688836550530:web:5c565b3e99764fa112f99b"};
const LS=localStorage,SK=k=>k.indexOf('alpha.')==0&&k!='alpha.chk'&&k!='alpha.fail';
let _f;const fb=()=>_f||(_f=(async()=>{const B='https://www.gstatic.com/firebasejs/10.12.2/';const [a,au,fs]=await Promise.all([import(B+'firebase-app.js'),import(B+'firebase-auth.js'),import(B+'firebase-firestore.js')]);const app=a.initializeApp(CFG);return{a:au,s:fs,auth:au.getAuth(app),db:fs.getFirestore(app)}})().catch(e=>{_f=null;throw e}));
const msg=e=>{const c=(e&&e.code||'').replace('auth/','');return({'invalid-phone-number':'Enter the number with country code, e.g. +8801XXXXXXXXX','invalid-verification-code':'Wrong code','too-many-requests':'Too many tries. Wait a bit.','network-request-failed':'No internet connection','credential-already-in-use':'That email is already used by another account','email-already-in-use':'That email is already used by another account'})[c]||(c||'Something went wrong')};
async function push(x){const F=await fb(),u=F.auth.currentUser;if(!u)return;const d={};for(let i=0;i<LS.length;i++){const k=LS.key(i);if(SK(k))d[k]=LS.getItem(k)}
await F.s.setDoc(F.s.doc(F.db,'users',u.uid),Object.assign({data:JSON.stringify(d),updated:Date.now()},x||{}),{merge:true})}
async function otp(phone){const F=await fb();let c=document.getElementById('rcap');if(!c){c=document.createElement('div');c.id='rcap';document.body.appendChild(c)}
if(window._rv){try{window._rv.clear()}catch(e){}}c.innerHTML='';window._rv=new F.a.RecaptchaVerifier(F.auth,c,{size:'invisible'});return F.a.signInWithPhoneNumber(F.auth,phone,window._rv)}
async function mail(email,mode){const F=await fb();LS.setItem('rec.email',email);LS.setItem('rec.mode',mode);await F.a.sendSignInLinkToEmail(F.auth,email,{url:location.origin+location.pathname,handleCodeInApp:true})}
const mask=e=>e.replace(/^(.).*(@.*)$/,'$1•••$2');
function panel(html){let p=document.getElementById('fbp');if(!p){p=document.createElement('div');p.id='fbp';p.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(5,4,15,.8);backdrop-filter:blur(8px)';document.body.appendChild(p)}
p.innerHTML=`<div class="card" style="width:100%;max-width:380px">${html}<p class="mu" id="fbe" style="color:#ff4d6d;margin:8px 0"></p></div>`;return p}
const close=()=>{const p=document.getElementById('fbp');if(p)p.remove()},err=t=>{const e=document.getElementById('fbe');if(e)e.textContent=t};
async function wrap(b,f){const o=b.textContent;b.disabled=true;b.textContent='…';try{await f()}catch(e){err(msg(e))}b.disabled=false;b.textContent=o}
/* mode: 'enroll' (Settings) or 'recover' (lock screen) */
function flow(mode){const rec=mode=='recover';
panel(`<h3>${rec?'Recover access':'Verify phone'}</h3><p class="mu" style="margin-bottom:10px">${rec?'Step 1 of 2: confirm your phone with a one-time code.':'We text a one-time code to confirm your number.'}</p><input id="fph" type="tel" placeholder="+8801XXXXXXXXX" autocomplete="tel"><div class="row" style="margin-top:12px"><button class="btn grow" id="fgo">Send code</button><button class="chip" id="fcl">Cancel</button></div>`);
document.getElementById('fcl').onclick=close;
document.getElementById('fgo').onclick=ev=>wrap(ev.target,async()=>{const ph=document.getElementById('fph').value.replace(/\s/g,'');const cf=await otp(ph);
panel(`<h3>Enter code</h3><p class="mu" style="margin-bottom:10px">Sent to ${ph}</p><input id="fcd" inputmode="numeric" placeholder="6-digit code" autocomplete="one-time-code"><div class="row" style="margin-top:12px"><button class="btn grow" id="fvf">Verify</button><button class="chip" id="fcl">Cancel</button></div>`);
document.getElementById('fcl').onclick=close;
document.getElementById('fvf').onclick=e2=>wrap(e2.target,async()=>{const r=await cf.confirm(document.getElementById('fcd').value.trim()),F=await fb(),u=r.user;
 if(rec){const s=await F.s.getDoc(F.s.doc(F.db,'users',u.uid));if(!s.exists()||!s.data().email){await F.a.signOut(F.auth);err('No recovery set up for this number. Use Reset ALPHA instead.');return}
  const em=s.data().email;await mail(em,'recover');panel(`<h3>Check your email</h3><p class="mu">Step 2 of 2: we sent a link to <b>${mask(em)}</b>. Open it on this device to finish. You can then create a new PIN.</p><div class="row" style="margin-top:12px"><button class="chip" id="fcl">Close</button></div>`);document.getElementById('fcl').onclick=close}
 else{await push({phone:u.phoneNumber});emailStep()}})})}
function emailStep(){panel(`<h3>Verify email</h3><p class="mu" style="margin-bottom:10px">Phone verified ✓. Add the email that will receive your recovery link.</p><input id="fem" type="email" placeholder="you@example.com" autocomplete="email"><div class="row" style="margin-top:12px"><button class="btn grow" id="fgo">Send link</button><button class="chip" id="fcl">Later</button></div>`);
document.getElementById('fcl').onclick=close;document.getElementById('fgo').onclick=ev=>wrap(ev.target,async()=>{const em=document.getElementById('fem').value.trim();await mail(em,'enroll');
panel(`<h3>Check your email</h3><p class="mu">Open the link we sent to <b>${mask(em)}</b> on this device to finish setup.</p><div class="row" style="margin-top:12px"><button class="chip" id="fcl">Close</button></div>`);document.getElementById('fcl').onclick=close})}
async function doReset(){['alpha.chk','alpha.fail'].forEach(x=>LS.removeItem(x));
try{await new Promise(r=>{const q=indexedDB.open('alpha',1);q.onupgradeneeded=()=>q.result.createObjectStore('f',{keyPath:'id'});q.onsuccess=()=>{try{const t=q.result.transaction('f','readwrite');t.objectStore('f').clear();t.oncomplete=()=>{q.result.close();r()};t.onerror=()=>r()}catch(e){r()}};q.onerror=()=>r()})}catch(e){}
try{await new Promise(r=>{const q=indexedDB.open('alpha-safe',1);q.onsuccess=()=>{const d=q.result;try{const t=d.transaction('k','readwrite'),s=t.objectStore('k');s.delete('alpha.chk');s.delete('alpha.fail');t.oncomplete=()=>{d.close();r()}}catch(e){r()}};q.onerror=()=>r()})}catch(e){}
try{const F=await fb(),u=F.auth.currentUser,s=await F.s.getDoc(F.s.doc(F.db,'users',u.uid)),j=s.exists()&&s.data().data?JSON.parse(s.data().data):{};for(const k in j)if(SK(k)&&LS.getItem(k)==null)LS.setItem(k,j[k])}catch(e){}
LS.removeItem('rec.mode');location.replace(location.pathname)}
/* returning from the email link */
(async()=>{if(!/[?&]oobCode=/.test(location.href)||localStorage.getItem('acct.pend'))return;try{const F=await fb(),h=location.href;if(!F.a.isSignInWithEmailLink(F.auth,h))return;await F.auth.authStateReady();
const mode=LS.getItem('rec.mode'),em=LS.getItem('rec.email')||prompt('Confirm your email address'),u=F.auth.currentUser;history.replaceState(null,'',location.pathname);
if(!u||!em){toast('Open the link in the same app where you started');return}
const cr=F.a.EmailAuthProvider.credentialWithLink(em,h);
if(mode=='recover'){await F.a.reauthenticateWithCredential(u,cr);panel(`<h3>Identity confirmed ✓</h3><p class="mu">Your PIN/pattern is reset so you can create a new one. Settings and history are kept. <b>Protected files can't be recovered</b> because they are encrypted with the old PIN and will be removed.</p><div class="row" style="margin-top:12px"><button class="btn grow" id="fok">Create new PIN</button></div>`);document.getElementById('fok').onclick=ev=>wrap(ev.target,doReset)}
else{await F.a.linkWithCredential(u,cr);await push({email:em});LS.setItem('rec.on','1');toast('Recovery enabled ✓')}}catch(e){toast(msg(e))}})();
/* lock screen link */
(()=>{const rs=document.getElementById('rs');if(!rs)return;rs.parentElement.insertAdjacentHTML('beforebegin','<p class="mu" style="margin-top:14px"><a id="rcvl" href="#" style="color:var(--a)">Locked out? Recover with phone + email</a></p>');document.getElementById('rcvl').onclick=e=>{e.preventDefault();flow('recover')}})();
/* settings section */
const _osF=openSet;openSet=function(){_osF();const on=LS.getItem('rec.on'),h=`<h3 class='mu' style='margin:18px 0 8px'>Account security</h3><p class='mu' style='margin-bottom:8px'>${on?'✓ Recovery enabled (phone OTP + email link). Settings are backed up to your private cloud space.':'Add phone + email so you can recover access if you get locked out.'}</p><div class='row' style='flex-wrap:wrap'><button class='chip' id='fb1'>${on?'↻ Re-verify':'🛡 Set up recovery'}</button>${on?"<button class='chip' id='fb2'>☁ Back up now</button>":''}</div>`;
$('#mc>div').insertAdjacentHTML('beforeend',h);$('#fb1').onclick=()=>flow('enroll');const b=$('#fb2');if(b)b.onclick=()=>push().then(()=>toast('Backed up ☁')).catch(e=>toast(msg(e)))};
})();
