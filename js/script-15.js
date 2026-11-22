/* ===== v26a: compact clock + quote, time-synced greeting, name auto-translate (en <-> bn) ===== */
(()=>{
/* ---------- name transliteration ---------- */
const DICT={alpha:'আলফা',imran:'ইমরান',sami:'সামি',rahim:'রহিম',karim:'করিম',rahman:'রহমান',hasan:'হাসান',hossain:'হোসেন',hussain:'হোসেন',hosen:'হোসেন',hossen:'হোসেন',ahmed:'আহমেদ',ahmad:'আহমাদ',ali:'আলী',mohammad:'মোহাম্মদ',muhammad:'মুহাম্মদ',mohammed:'মোহাম্মদ',md:'মোঃ',fatima:'ফাতেমা',ayesha:'আয়েশা',aisha:'আয়েশা',khadija:'খাদিজা',rafi:'রাফি',rakib:'রাকিব',sakib:'সাকিব',shakib:'সাকিব',tamim:'তামিম',nafis:'নাফিস',tanvir:'তানভীর',tasnim:'তাসনিম',nusrat:'নুসরাত',sumaiya:'সুমাইয়া',jannat:'জান্নাত',farhan:'ফারহান',faisal:'ফয়সাল',kamal:'কামাল',jamal:'জামাল',nasir:'নাসির',sabbir:'সাব্বির',shakil:'শাকিল',shamim:'শামীম',sharmin:'শারমিন',rubel:'রুবেল',sohel:'সোহেল',rony:'রনি',mahmud:'মাহমুদ',mahbub:'মাহবুব',mizan:'মিজান',anik:'অনিক',arif:'আরিফ',asif:'আসিফ',bilal:'বিলাল',farid:'ফরিদ',hasib:'হাসিব',ibrahim:'ইব্রাহিম',ismail:'ইসমাইল',jahid:'জাহিদ',kabir:'কবির',labib:'লাবিব',mahi:'মাহি',mehedi:'মেহেদী',nabil:'নাবিল',omar:'ওমর',umar:'উমর',raihan:'রায়হান',riad:'রিয়াদ',saif:'সাইফ',salman:'সালমান',shahin:'শাহীন',siam:'সিয়াম',sumon:'সুমন',tahmid:'তাহমিদ',zubair:'জুবায়ের',yusuf:'ইউসুফ',yasir:'ইয়াসির',rahat:'রাহাত',rifat:'রিফাত',rasel:'রাসেল',russell:'রাসেল',nayeem:'নাঈম',naim:'নাঈম',mahin:'মাহিন',maruf:'মারুফ',masud:'মাসুদ',mamun:'মামুন',monir:'মনির',nazmul:'নাজমুল',nur:'নূর',noor:'নূর',rima:'রিমা',riya:'রিয়া',sadia:'সাদিয়া',sadman:'সাদমান',sanjida:'সানজিদা',shuvo:'শুভ',shuvro:'শুভ্র',sultana:'সুলতানা',tania:'তানিয়া',tonmoy:'তন্ময়',tuhin:'তুহিন',rahul:'রাহুল',rohan:'রোহান',rabbi:'রাব্বি',robin:'রবিন',sajib:'সাজিব',sagor:'সাগর',sakil:'শাকিল',emon:'ইমন',eman:'ইমান',iman:'ঈমান',fahim:'ফাহিম',fahad:'ফাহাদ',habib:'হাবিব',hridoy:'হৃদয়',jubayer:'জুবায়ের',lamia:'লামিয়া',mim:'মিম',mou:'মৌ',moon:'মুন',nahid:'নাহিদ',nishat:'নিশাত',oishee:'ঐশী',puja:'পূজা',rashed:'রাশেদ',rumi:'রুমি',samia:'সামিয়া',sara:'সারা',shahriar:'শাহরিয়ার',shanto:'শান্ত',shuvo:'শুভ',toufiq:'তৌফিক',tawhid:'তাওহীদ',wasim:'ওয়াসিম',zaman:'জামান',zahid:'জাহিদ'};
const REV={};for(const k in DICT){const v=DICT[k];if(!REV[v])REV[v]=k[0].toUpperCase()+k.slice(1)}
const CONS={chh:'ছ',ch:'চ',sh:'শ',kh:'খ',gh:'ঘ',th:'থ',dh:'ধ',ph:'ফ',bh:'ভ',jh:'ঝ',ng:'ং',b:'ব',c:'ক',d:'দ',f:'ফ',g:'গ',h:'হ',j:'জ',k:'ক',l:'ল',m:'ম',n:'ন',p:'প',q:'ক',r:'র',s:'স',t:'ত',v:'ভ',x:'ক্স',z:'জ'};
const VI={aa:'আ',ai:'আই',au:'আউ',ee:'ঈ',oo:'উ',oi:'ঐ',ou:'ঔ',a:'আ',e:'এ',i:'ই',o:'ও',u:'উ'};
const VS={aa:'া',ai:'াই',au:'াউ',ee:'ী',oo:'ূ',oi:'ৈ',ou:'ৌ',a:'া',e:'ে',i:'ি',o:'ো',u:'ু'};
const isV=c=>'aeiou'.includes(c);
function en2bnWord(w){
 const lw=w.toLowerCase();if(DICT[lw])return DICT[lw];
 let out='',i=0,prevC=false,prevCh='';const n=lw.length;
 while(i<n){const c=lw[i];
  if(!/[a-z]/.test(c)){out+=w[i];i++;prevC=false;prevCh='';continue}
  if(isV(c)){let k=null;for(const t of ['aa','ai','au','ee','oo','oi','ou']){if(lw.startsWith(t,i)){k=t;break}}if(!k)k=c;
   out+=prevC?VS[k]:VI[k];i+=k.length;prevC=false;prevCh='';continue}
  if(c=='y'){if(prevC||i==0&&isV(lw[i+1]||'')){ if(i==0){out+='ইয়'}else{out+='য়'} }else out+='য়';
   if(i==0)out+='';i++;prevC=true;prevCh='y';continue}
  if(c=='w'){out+=(i==0?'ও':'ও')+(isV(lw[i+1]||'')?'য়':'');i++;prevC=true;prevCh='w';continue}
  let k=null;for(const t of ['chh','ch','sh','kh','gh','th','dh','ph','bh','jh','ng']){if(lw.startsWith(t,i)){k=t;break}}
  if(!k)k=c;const m=CONS[k];if(!m){out+=w[i];i++;continue}
  if(prevC&&prevCh==k&&k.length==1)out+='্';
  out+=m;i+=k.length;prevC=true;prevCh=k}
 return out}
function en2bn(s){return String(s||'').replace(/[A-Za-z]+/g,w=>en2bnWord(w))}
const BC={'ক':'k','খ':'kh','গ':'g','ঘ':'gh','ঙ':'ng','চ':'ch','ছ':'chh','জ':'j','ঝ':'jh','ঞ':'n','ট':'t','ঠ':'th','ড':'d','ঢ':'dh','ণ':'n','ত':'t','থ':'th','দ':'d','ধ':'dh','ন':'n','প':'p','ফ':'f','ব':'b','ভ':'bh','ম':'m','য':'j','র':'r','ল':'l','শ':'sh','ষ':'sh','স':'s','হ':'h','ড়':'r','ঢ়':'rh','য়':'y','ৎ':'t','ং':'ng','ঃ':'h','ঁ':'n'};
const BI={'অ':'o','আ':'a','ই':'i','ঈ':'i','উ':'u','ঊ':'u','ঋ':'ri','এ':'e','ঐ':'oi','ও':'o','ঔ':'ou'};
const BS={'া':'a','ি':'i','ী':'i','ু':'u','ূ':'u','ৃ':'ri','ে':'e','ৈ':'oi','ো':'o','ৌ':'ou'};
function bn2enWord(w){
 if(REV[w])return REV[w];
 const ch=[...w.normalize('NFC')];let out='',first=true;
 for(let i=0;i<ch.length;i++){const c=ch[i],nx=ch[i+1];
  if(BI[c]){out+=BI[c];first=false;continue}
  if(BC[c]!==undefined){out+=BC[c];
   if(nx&&BS[nx]){out+=BS[nx];i++}
   else if(nx==='্'){i++}
   else if(i==0&&nx&&BC[nx]!==undefined&&ch.length>2&&!(out.length&&false)){out+='a'}
   first=false;continue}
  if(BS[c]){out+=BS[c];continue}
  if(c==='্')continue;
  out+=c}
 return out.charAt(0).toUpperCase()+out.slice(1)}
function bn2en(s){return String(s||'').replace(/[\u0980-\u09FF]+/g,w=>bn2enWord(w))}
window.NameTr={en2bn,bn2en};
/* ---------- name state (en / bn variants, either can be edited by hand) ---------- */
const isBn=t=>/[\u0980-\u09FF]/.test(t||'');
function getNM(){let n=ls.g('alpha.nm',null);const base=(pname||'').trim();
 if(!n||!base||((n.en||n.bn||'').trim()!==base)){n={en:'',bn:'',em:0,bm:0};if(base){if(isBn(base)){n.bn=base;n.bm=1;n.en=bn2en(base)}else{n.en=base;n.em=1;n.bn=en2bn(base)}}}
 return n}
function dispName(L){L=L||lang;const n=getNM(),v=(n[L]||'').trim();if(v)return v;const o=(n[L=='bn'?'en':'bn']||'').trim();if(o)return L=='bn'?en2bn(o):bn2en(o);return L=='bn'?'আলফা':'Alpha'}
window.dispName=dispName;
const lev=(a,b)=>{const m=a.length,n=b.length,d=Array.from({length:m+1},(_,i)=>[i]);for(let j=1;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]==b[j-1]?0:1));return d[m][n]};
function setNameFrom(L,v){const n=getNM(),o=L=='bn'?'en':'bn',tr2=L=='bn'?bn2en:en2bn,old=(n[L]||'').trim();
 /* other language: keep a hand-corrected spelling only for a tiny edit; a real change re-translates */
 const diverged=n[o]&&n[o]!==tr2(old),small=lev(old,v)<=2;
 n[L]=v;n[L=='bn'?'bm':'em']=1;
 if(!n[o]||!diverged||!small)n[o]=tr2(v);
 pname=((n.en||n.bn||'')).trim()||v;ls.s('alpha.name',pname);ls.s('alpha.nm',n)}
/* ---------- greeting follows the clock ---------- */
const GE=['Good Morning','Good Afternoon','Good Evening','Good Night'],GB=['শুভ সকাল','শুভ অপরাহ্ন','শুভ সন্ধ্যা','শুভ রাত্রি'];
const band=h=>h>=5&&h<12?0:h>=12&&h<17?1:h>=17&&h<21?2:3;
window.__tz=()=>{try{return(typeof loc!=='undefined'&&loc&&loc.tz)?{timeZone:loc.tz}:{}}catch(e){return{}}};
window.__hr=()=>{try{const o=window.__tz();const h=new Intl.DateTimeFormat('en-GB',Object.assign({hour:'numeric',hourCycle:'h23'},o)).formatToParts(new Date()).find(x=>x.type==='hour');const v=h?parseInt(h.value,10)%24:NaN;return isNaN(v)?new Date().getHours():v}catch(e){return new Date().getHours()}};
window.greetText=()=>(lang=='bn'?GB:GE)[band(window.__hr())]+', '+dispName();
const paintG=()=>{const h=document.getElementById('greet');if(h&&h.isConnected){const t=greetText();if(h.textContent!==t)h.textContent=t}};
setInterval(paintG,15000);document.addEventListener('visibilitychange',paintG);
const DL=()=>lang=='bn'?'bn-BD':[];
const fixD=()=>{const e=document.getElementById('cdt');if(e&&e.closest('.cmp')){const t=new Date().toLocaleDateString(DL(),Object.assign({weekday:'short',day:'numeric',month:'short',year:'numeric'},window.__tz?window.__tz():{}));if(e.textContent!==t)e.textContent=t}};
setInterval(fixD,1000);
const _d=dash;dash=function(){_d.apply(this,arguments);const h=document.querySelector('#main h1');if(h){h.id='greet';h.textContent=greetText()}const sb=document.querySelector('#main>.sub');if(sb)sb.textContent=new Date().toLocaleDateString(DL(),{weekday:'long',month:'long',day:'numeric'})};V.dash=dash;
/* ---------- settings: name box shows / edits the name for the current language ---------- */
const _os=openSet;openSet=function(){_os.apply(this,arguments);const pn=document.getElementById('pn');if(!pn)return;pn.value=dispName();pn.oninput=e=>{setNameFrom(lang,e.target.value);paintG()}};
const th=document.getElementById('th');if(th)th.addEventListener('click',()=>setTimeout(()=>{const h=document.querySelector('#mc h2');if(h)h.textContent=dispName()},0));
/* ---------- compact clock + quote ---------- */
const st=document.createElement('style');st.textContent=`
.cmpw{display:flex;gap:8px;margin:0 0 12px;flex-wrap:wrap}
.cmpw>.card.cmp{margin:0!important;padding:8px 12px!important;flex:1 1 230px;min-width:0;border-radius:16px!important}
.cmpw>.card.cmp::after{display:none!important}
.cmp .ckr{display:flex;align-items:center;gap:10px;min-width:0}
.cmp #ck{font-size:21px!important;font-weight:800;line-height:1.1;white-space:nowrap;font-variant-numeric:tabular-nums}
.cmp .ci{min-width:0;flex:1;line-height:1.25}
.cmp .ci .mu{font-size:11.5px!important;margin:0!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cmp .qx{font-size:12.5px;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.cmp .qa{font-size:11px!important;opacity:.7}
.cmp .ic{font-size:17px;flex:none}
#tm{font-size:42px!important;letter-spacing:1px!important}
#main>h1{margin-bottom:2px}#main>.sub{margin-bottom:10px}
`;document.head.appendChild(st);
addClk=function(){const s=document.querySelector('#main .sub');if(!s)return;const q=Q[qi()];
 s.insertAdjacentHTML('afterend',`<div class="cmpw"><div class="card cmp" data-z="cal"><div class="ckr"><div id="ck"></div><div class="ci"><div class="mu" id="cdt"></div><div class="mu" id="lc"></div></div><span class="ic" title="Calendar">📅</span></div></div><div class="card cmp" data-z="quo"><div class="ckr"><span class="ic">💬</span><div class="ci"><div class="qx">“${qt(q)}”</div><div class="qa mu">— ${q[0]}</div></div></div></div></div>`);
 loc.ask();clk();fixD()};
})();
