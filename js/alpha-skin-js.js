/* ===== ALPHA Night skin: visual layer only. Original handlers/IDs/data are untouched. ===== */
(()=>{
if(window.__alphaSkin)return;window.__alphaSkin=1;
const $$=(s,r=document)=>r.querySelector(s);

/* ---- theme: add "ALPHA Night" (the look of the reference) and make it the default once ---- */
try{
  const NAME='ALPHA Night';
  if(typeof themes!=='undefined'&&!themes.some(t=>t[0]===NAME)){
    themes.push([NAME,'d','#03061a','#150b3a','#7c5cff','#ff8a4c']);
    const idx=themes.length-1,st=document.createElement('style');
    st.textContent=`:root[data-t='${idx}'][data-theme]{--bg:#03061a;--bg2:#150b3a;--a:#7c5cff;--b:#ff8a4c;--glow:rgba(124,92,255,.38);--card:rgba(14,20,42,.72);--bd:rgba(255,255,255,.075);--tx:#f1f2fb;--mu:#8d96b8}html.first #lock{--bg:#03061a;--bg2:#150b3a;--a:#7c5cff;--b:#ff8a4c;--glow:rgba(124,92,255,.38);--mu:#8d96b8}html.first #lock{background:radial-gradient(700px 420px at 15% -5%,#150b3a,transparent),radial-gradient(600px 420px at 100% 100%,#3a1c10,transparent),#03061a}`;
    document.head.appendChild(st);
    let cur=null;try{cur=JSON.parse(localStorage.getItem('alpha.ti'))}catch(e){}
    if(!localStorage.getItem('alpha.mig3')){try{localStorage.setItem('alpha.mig3','1')}catch(e){}applyTheme(idx)}
    else if(cur===idx)applyTheme(idx);
  }
}catch(e){}

/* ---- Inter font (same Google-Fonts approach the app already uses) ---- */
try{const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';document.head.appendChild(l)}catch(e){}

/* ---- small inline icon set ---- */
const S=(inner,o={})=>`<svg viewBox="0 0 24 24" width="${o.s||16}" height="${o.s||16}" fill="${o.f||'none'}" stroke="${o.k||'currentColor'}" stroke-width="${o.w||2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const IC={
 Work:S('<rect x="3" y="7.5" width="18" height="12.5" rx="2.6" fill="currentColor" stroke="none"/><path d="M9 7.5V6a1.6 1.6 0 0 1 1.6-1.6h2.8A1.6 1.6 0 0 1 15 6v1.5" stroke-width="1.8"/><path d="M3 12.6h18" stroke="rgba(8,10,30,.55)" stroke-width="1.5"/>'),
 Fitness:S('<path d="M6.5 7v10M17.5 7v10M3.4 9.5v5M20.6 9.5v5M6.5 12h11" stroke-width="2.1"/>'),
 Study:S('<path d="M3 5.6h5.8A3.2 3.2 0 0 1 12 8.8V20a2.6 2.6 0 0 0-2.6-2.6H3zM21 5.6h-5.8A3.2 3.2 0 0 0 12 8.8V20a2.6 2.6 0 0 1 2.6-2.6H21z" stroke-width="1.8"/>'),
 Leisure:S('<path d="M5 15.2c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z" fill="currentColor" fill-opacity=".9" stroke-width="1.5"/><path d="m12 15-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z" fill="currentColor" fill-opacity=".9" stroke-width="1.5"/><path d="M9 12H4s.55-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.55 4-2c1.1-1.6 0-5 0-5" stroke-width="1.5"/>'),
 Sleep:S('<path d="M12.6 3.2a6.4 6.4 0 0 0 8.2 8.2 9 9 0 1 1-8.2-8.2z" fill="currentColor" stroke-width="1.6"/>'),
 pen:S('<path d="M4 20l1-4.2L16.6 4.2a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.2 19z"/><path d="m14.5 6.3 3.2 3.2"/>',{w:1.9}),
 play:S('<path d="M7 4.6v14.8a1 1 0 0 0 1.5.86l12-7.4a1 1 0 0 0 0-1.72l-12-7.4A1 1 0 0 0 7 4.6z" fill="currentColor" stroke="none"/>'),
 stop:S('<rect x="5.5" y="5.5" width="13" height="13" rx="2.6" fill="currentColor" stroke="none"/>'),
 chev:S('<path d="m9 5.5 6.5 6.5L9 18.5" stroke-width="2.3"/>',{s:14}),
 clock:S('<circle cx="12" cy="12" r="9" stroke-width="1.8"/><path d="M12 7v5.2l3.2 1.9" stroke-width="1.8"/>',{s:26}),
 flame:`<svg viewBox="0 0 24 28" width="28" height="30" aria-hidden="true"><defs><linearGradient id="skFl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7a45"/><stop offset="1" stop-color="#ef2f4c"/></linearGradient></defs><path d="M12.6 1.8c.5 3.6 2.6 5.6 4.5 7.9 1.9 2.2 3.2 4.4 3.2 7.5A8.3 8.3 0 0 1 12 25.5a8.3 8.3 0 0 1-8.3-8.3c0-2.6 1-4.4 2.4-6 .3 1.7 1.3 2.9 2.5 3.5-.4-3.5.8-7.2 4-12.9z" fill="url(#skFl)"/><path d="M12 25.5a4.6 4.6 0 0 1-4.6-4.6c0-2.4 1.7-3.7 3.1-5.6.3 1.5 1 2.2 1.9 2.8 1.1.8 2.2 1.8 2.2 3.4A4.6 4.6 0 0 1 12 25.5z" fill="#ffb199" fill-opacity=".85"/></svg>`,
 quote:`<svg viewBox="0 0 28 21" width="24" height="18" aria-hidden="true"><path fill="currentColor" d="M0 11.6C0 5.9 3 1.6 8.6.2l.9 2.3C6.6 3.5 5 5.4 4.9 8.2c.4-.2.9-.3 1.5-.3 2.3 0 4.2 1.7 4.2 4.3 0 2.7-2.1 4.6-4.9 4.6C2.2 16.8 0 14.7 0 11.6zm15.8 0c0-5.7 3-10 8.6-11.4l.9 2.3c-2.9 1-4.5 2.9-4.6 5.7.4-.2.9-.3 1.5-.3 2.3 0 4.2 1.7 4.2 4.3 0 2.7-2.1 4.6-4.9 4.6-3.5 0-5.7-2.1-5.7-5.2z" transform="translate(0 2)"/></svg>`
};
const fixTxt=(n,re)=>{if(!n)return;const t=n.nodeValue.replace(re,'');if(t!==n.nodeValue)n.nodeValue=t};

/* ---- greeting: highlight the name ---- */
function wrapName(h){
  if(!h||h.__sk)return;
  const run=()=>{
    if(h.querySelector('.nm')&&h.childNodes.length===2&&h.firstChild.nodeType===3){return}
    const t=h.textContent,i=t.lastIndexOf(', ');
    if(i<0)return;
    h.textContent='';h.append(document.createTextNode(t.slice(0,i+2)));
    const sp=document.createElement('span');sp.className='nm';sp.textContent=t.slice(i+2);h.append(sp);
  };
  run();
  h.__sk=new MutationObserver(()=>{if(!(h.querySelector('.nm')&&h.childNodes.length===2))run()});
  h.__sk.observe(h,{childList:true,characterData:true,subtree:true});
}

/* ---- clock chip: "Tue, Oct 20" and "Dhaka" only ---- */
function tidy(el,fn){
  if(!el||el.__sk)return;
  const run=()=>{const a=el.textContent,b=fn(a);if(a!==b)el.textContent=b};
  run();
  el.__sk=new MutationObserver(run);el.__sk.observe(el,{childList:true,characterData:true,subtree:true});
}
const noYear=t=>t.replace(/[\s,]*[\d\u09E6-\u09EF]{4}\s*$/,'');
const cityOnly=t=>t.replace(/^[^\p{L}]+/u,'').split(' · ')[0];

/* ---- hourly timeline (reads the same session data as the original chart) ---- */
const pad2=n=>String(n).padStart(2,'0');
function hrLabel(h){let is24=false;try{is24=!!h24}catch(e){}return is24?pad2(h)+':00':((h%12)||12)+' '+(h<12?'AM':'PM')}
function timeline(){
  const w=Array(8).fill(0),d0=new Date();d0.setHours(0,0,0,0);const t0=+d0;
  try{all().forEach(a=>{const s=Math.max(a.s,t0),e=Math.min(a.e||Date.now(),t0+864e5);if(e<=s)return;for(let i=0;i<8;i++){const ws=t0+i*108e5,o=Math.min(e,ws+108e5)-Math.max(s,ws);if(o>0)w[i]+=o/6e4}})}catch(e){}
  const L=i=>`calc(15px + (100% - 88px) * ${i} / 7)`;
  let h='<div class="tl">';
  for(let i=0;i<8;i++){
    const on=w[i]>0,wd=i<7?`calc((100% - 88px) / 7)`:'56px',op=on?Math.min(1,.5+w[i]/90):1;
    h+=`<i class="seg${on?' on':''}" style="left:${L(i)};width:${wd};${on?'opacity:'+op.toFixed(2):''}" title="${hrLabel(i*3)} – ${hrLabel((i*3+3)%24)} · ${Math.round(w[i])}m"></i>`;
  }
  for(let i=0;i<8;i++){
    const on=w[i]>0||(i>0&&w[i-1]>0);
    h+=`<b class="dot${on?' on':''}" style="left:${L(i)}"></b><span class="lb" style="left:${L(i)}">${hrLabel(i*3)}</span>`;
  }
  return h+'</div>';
}
function skinStats(){
  const s=document.getElementById('sS');
  if(s&&s.closest('.sk-streak')){try{s.textContent=String(streak())}catch(e){}}
  const hr=document.getElementById('hr');
  if(hr&&hr.closest('.sk-hour'))hr.innerHTML=timeline();
}

/* ---- build the Home layout around the existing nodes ---- */
function skinHome(){
  const m=document.getElementById('main');
  if(!m||!m.querySelector('#tm')||m.querySelector('.hd'))return;
  const h1=m.querySelector('h1'),w=m.querySelector('.cmpw');
  const cal=w&&w.querySelector('[data-z=cal]'),quo=w&&w.querySelector('[data-z=quo]');
  if(!h1||!cal||!quo)return;

  const hd=document.createElement('header');hd.className='hd';
  const hl=document.createElement('div');hl.className='hl';
  m.insertBefore(hd,h1);hl.append(h1,cal);hd.append(hl,quo);w.remove();
  wrapName(h1);
  tidy(document.getElementById('cdt'),noYear);
  tidy(document.getElementById('lc'),cityOnly);
  const qi=quo.querySelector('.ic');if(qi)qi.innerHTML=IC.quote;

  /* start an activity */
  const hero=m.querySelector('.card.hero');
  if(hero){
    hero.classList.add('sk-hero');
    const h3=hero.querySelector('h3');if(h3&&!h3.querySelector('.ii'))h3.insertAdjacentHTML('beforeend','<span class="ii"></span>');
    hero.insertAdjacentHTML('beforeend',`<span class="chev">${IC.chev}</span>`);
    hero.querySelectorAll('.chip[data-c]').forEach(b=>b.insertAdjacentHTML('afterbegin',IC[b.dataset.c]||''));
    const go=hero.querySelector('#go');
    if(go&&go.firstChild&&go.firstChild.nodeType===3){
      const stop=go.classList.contains('stop');
      fixTxt(go.firstChild,/^[\s▶■]+/);
      go.insertAdjacentHTML('afterbegin',stop?IC.stop:IC.play);
    }
  }

  /* categories */
  const lab=[...m.children].find(e=>e.tagName==='H3'&&e.classList.contains('mu'));
  if(lab){
    lab.classList.add('sk-lab');
    const g=lab.nextElementSibling;
    if(g){
      g.classList.add('sk-cats');
      g.querySelectorAll('.cc').forEach(cc=>{
        const b=cc.querySelector('b'),k=cc.dataset.k;
        if(b&&b.firstChild&&b.firstChild.nodeType===3){
          fixTxt(b.firstChild,/^[^\p{L}\p{N}]+/u);
          b.insertAdjacentHTML('afterbegin',`<span class="ci">${IC[k]||''}</span>`);
        }
      });
      const sg=g.nextElementSibling;
      if(sg){
        sg.classList.add('sk-stats');
        const cs=[...sg.children];
        ['sk-today','sk-streak','sk-goal'].forEach((c,i)=>{
          const cd=cs[i];if(!cd)return;
          cd.classList.add('sk-stat',c);
          const h3=cd.querySelector('h3');
          if(h3)h3.insertAdjacentHTML('beforeend','<span class="ii"></span>');
          cd.insertAdjacentHTML('beforeend',`<span class="chev">${IC.chev}</span>`);
          if(i===0&&h3)h3.insertAdjacentHTML('afterend',`<span class="bi">${IC.clock}</span>`);
          if(i===1&&h3)h3.insertAdjacentHTML('afterend',`<span class="bi">${IC.flame}</span>`);
        });
        const eg=sg.querySelector('#eg');
        if(eg&&eg.firstChild&&eg.firstChild.nodeType===3){fixTxt(eg.firstChild,/^[\s✎✏️]+/u);eg.insertAdjacentHTML('afterbegin',IC.pen)}
        const hc=sg.nextElementSibling;
        if(hc&&hc.querySelector('#hr')){
          hc.classList.add('sk-hour');
          hc.insertAdjacentHTML('beforeend',`<span class="chev">${IC.chev}</span>`);
        }
      }
    }
  }
  skinStats();
}

/* ---- hook into the existing render functions (they stay the source of truth) ---- */
try{
  const _dash=dash;
  dash=function(){const r=_dash.apply(this,arguments);try{skinHome()}catch(e){console.warn('skin',e)}return r};
  try{V.dash=dash}catch(e){}
  const _stats=stats;
  stats=function(){const r=_stats.apply(this,arguments);try{skinStats()}catch(e){}return r};
  /* if Home is already on screen (script ran after first render), decorate it now */
  if(document.getElementById('tm')&&!document.querySelector('#main .hd'))skinHome();
}catch(e){console.warn('skin hook',e)}
})();

/* ===== ALPHA Night: Vault view (visual layer; uploads, trash, categories, details keep their original handlers) ===== */
(()=>{
if(window.__alphaVaultSkin)return;window.__alphaVaultSkin=1;
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SV=(i,o={})=>`<svg viewBox="0 0 24 24" width="${o.s||18}" height="${o.s||18}" fill="${o.f||'none'}" stroke="${o.k||'currentColor'}" stroke-width="${o.w||1.8}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`;
const G={
 shield:`<svg viewBox="0 0 40 44" width="40" height="44" aria-hidden="true"><defs><linearGradient id="vsg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5df2e0"/><stop offset="1" stop-color="#12a8c9"/></linearGradient></defs><path d="M20 2 4 8v13c0 10 6.7 17.2 16 21 9.3-3.8 16-11 16-21V8z" fill="url(#vsg)" opacity=".95"/><path d="M20 2 4 8v13c0 10 6.7 17.2 16 21V2z" fill="#fff" opacity=".14"/><rect x="13.5" y="19" width="13" height="10" rx="2.4" fill="#06233a"/><path d="M16.5 19v-3a3.5 3.5 0 0 1 7 0v3" fill="none" stroke="#06233a" stroke-width="2.2" stroke-linecap="round"/><circle cx="20" cy="24" r="1.6" fill="#5df2e0"/></svg>`,
 lock:SV('<rect x="4.5" y="10.5" width="15" height="10.5" rx="3" fill="currentColor" stroke="none"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" stroke-width="2"/>',{s:13}),
 search:SV('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',{s:16,w:2}),
 upload:SV('<path d="M12 16V4M7 9l5-5 5 5M4.5 15.5v2A2.5 2.5 0 0 0 7 20h10a2.5 2.5 0 0 0 2.5-2.5v-2"/>',{s:15,w:2}),
 trash:SV('<path d="M4 7h16M9 7V4.8h6V7M6.5 7l.9 12a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4L17.5 7M10 11v6M14 11v6"/>',{s:15,w:1.9}),
 chev:SV('<path d="m9 5.5 6.5 6.5L9 18.5"/>',{s:15,w:2.2}),
 info:SV('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6h.01"/>',{s:13,w:1.8}),
 db:`<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><defs><linearGradient id="vdb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ee0ff"/><stop offset="1" stop-color="#3b6cf6"/></linearGradient></defs><ellipse cx="12" cy="5.5" rx="8" ry="3" fill="url(#vdb)"/><path d="M4 8.5v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4c0 1.7-3.6 3-8 3s-8-1.3-8-3z" fill="url(#vdb)" opacity=".9"/><path d="M4 14v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4c0 1.7-3.6 3-8 3s-8-1.3-8-3z" fill="url(#vdb)" opacity=".75"/></svg>`,
 file:SV('<path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="currentColor" fill-opacity=".22"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h7M8.5 9.5h3"/>',{s:22}),
 vdev:SV('<ellipse cx="12" cy="6" rx="7.5" ry="2.8"/><path d="M4.5 6v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6M4.5 12v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-6"/>',{s:15}),
 rings:SV('<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 8 8" stroke-width="3"/>',{s:13}),
 tree:SV('<rect x="3" y="3" width="8" height="18" rx="1.5" fill="currentColor"/><rect x="13" y="3" width="8" height="8" rx="1.5" fill="currentColor"/><rect x="13" y="13" width="8" height="8" rx="1.5" fill="currentColor"/>',{s:13,w:0}),
 bub:SV('<circle cx="8" cy="15" r="5" fill="currentColor"/><circle cx="16.5" cy="8" r="3.6" fill="currentColor"/><circle cx="18" cy="17" r="2.2" fill="currentColor"/>',{s:13,w:0}),
 bars:SV('<rect x="4" y="4" width="16" height="4" rx="1.2" fill="currentColor"/><rect x="4" y="10" width="11" height="4" rx="1.2" fill="currentColor"/><rect x="4" y="16" width="14" height="4" rx="1.2" fill="currentColor"/>',{s:13,w:0}),
 files:SV('<path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h5"/>',{s:24,w:1.7}),
 prot:SV('<path d="M12 3 4.8 5.8v5.7c0 4.5 3 8 7.2 9.5 4.2-1.5 7.2-5 7.2-9.5V5.8z"/><path d="m9 12 2.2 2.2L15.2 10"/>',{s:24,w:1.7})
};
/* per-category glyphs (tiles) */
const CI={
 doc:SV('<path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M8.5 12.5h7M8.5 16h7"/>',{s:20}),
 txt:SV('<path d="M5 6V4.5h14V6M12 4.5v15M9.5 19.5h5"/><path d="M3.5 9.5v5M20.5 9.5v5" stroke-width="2.4"/>',{s:20}),
 pdf:SV('<path d="M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="currentColor" fill-opacity=".25"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h5"/>',{s:20}),
 img:SV('<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.7"/><path d="m4 18 5-5 3.5 3.5L16 13l4 4"/>',{s:20}),
 aud:SV('<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5" fill="currentColor"/><circle cx="16.5" cy="16" r="2.5" fill="currentColor"/>',{s:20}),
 vid:SV('<path d="M8 5.5v13a.8.8 0 0 0 1.2.7l10-6.5a.8.8 0 0 0 0-1.4l-10-6.5A.8.8 0 0 0 8 5.5z" fill="currentColor"/>',{s:18,w:1.2}),
 ppt:SV('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8M7.5 12l3-3 2 2 3.5-3.5"/>',{s:20}),
 code:SV('<path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 5l-3 14"/>',{s:21,w:1.9}),
 oth:SV('<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.2h7a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" fill="currentColor" fill-opacity=".28"/>',{s:20}),
 trash:SV('<path d="M4 7h16M9 7V4.8h6V7M6.5 7l.9 12a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4L17.5 7"/>',{s:18})
};
/* chart palette (richer than the app's plain one) */
const PAL={doc:['#5eead4','#0f9d8a'],txt:['#b388ff','#6d28d9'],pdf:['#ff5c8a','#e0105e'],img:['#6ee7b7','#059669'],aud:['#fbbf24','#d97706'],vid:['#a78bfa','#4f46e5'],ppt:['#bef264','#65a30d'],code:['#67e8f9','#0891b2'],oth:['#cdd6ee','#6b7cab'],trash:['#94a3b8','#475569'],dev:['#22d3ee','#d946ef']};
const NM={doc:'Documents',txt:'Text',pdf:'PDF',img:'Images',aud:'Audio',vid:'Video',ppt:'Presentations',code:'Codes',oth:'Other',trash:'Trash',dev:'Free space'};
const mbf=n=>n>=1e9?(n/1e9).toFixed(2)+' GB':n>=1e6?(n/1e6).toFixed(n>=1e8?0:1)+' MB':n>=1e3?Math.round(n/1e3)+' KB':(n||0)+' B';
const grad=k=>`linear-gradient(135deg,${PAL[k][0]},${PAL[k][1]})`;
window.__skV={CI,PAL,NM,G,SV,mbf,E,grad};
let VIEW='dial';try{VIEW=localStorage.getItem('alpha.stv')||'dial'}catch(e){}
if(!['dial','hive','towers','stars'].includes(VIEW))VIEW='dial';

function rowsData(d){
  const L=d.list.filter(c=>c.n>0||c.v>0),est=d.est&&d.est.quota?d.est:null;
  const pc=c=>d.vault?(c.v/d.vault*100).toFixed(1):'0.0';
  const dev={k:'dev',v:est?est.usage:0,n:0,pct:est?(est.usage/est.quota*100).toFixed(1):'0.0'};
  return{L,est,pc,dev};
}
/* ---- ring donut ---- */
function ringsSvg(d,R){
  const{L,est}=R;if(!d.nfiles)return `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="68" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="20"/><text x="100" y="104" text-anchor="middle" font-size="12" fill="#8d96b8">Protected is empty</text></svg>`;
  const r=68,C=2*Math.PI*r,tot=d.vault||1,mn=tot*.035,vs=L.map(c=>Math.max(c.v,mn)),T=vs.reduce((a,b)=>a+b,0)||1,gap=L.length>1?4:0;let o=0;
  const defs=Object.keys(PAL).map(k=>`<linearGradient id="vr-${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${PAL[k][0]}"/><stop offset="1" stop-color="${PAL[k][1]}"/></linearGradient>`).join('');
  const arcs=L.map((c,i)=>{const l=vs[i]/T*C,len=Math.max(1,l-gap),e=`<circle class="sg" data-k="${c.k}" cx="100" cy="100" r="${r}" fill="none" stroke="url(#vr-${c.k})" stroke-width="22" stroke-linecap="round" stroke-dasharray="${len} ${C}" stroke-dashoffset="${-o}" transform="rotate(-90 100 100)" filter="url(#vgl)"><title>${NM[c.k]} · ${mbf(c.v)}</title></circle>`;o+=l;return e}).join('');
  const q=est?Math.min(1,est.usage/est.quota):0,r2=94,C2=2*Math.PI*r2;
  const outer=`<circle cx="100" cy="100" r="${r2}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="3"/><circle class="sg" data-k="dev" cx="100" cy="100" r="${r2}" fill="none" stroke="url(#vr-dev)" stroke-width="3" stroke-linecap="round" stroke-dasharray="${Math.max(2,q*C2)} ${C2}" transform="rotate(-90 100 100)"><title>Storage · ${est?mbf(est.usage)+' / '+mbf(est.quota):''}</title></circle><circle cx="100" cy="6" r="3.2" fill="#37e3ff" filter="url(#vgl)"/>`;
  return `<svg viewBox="0 0 200 200"><defs>${defs}<filter id="vgl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>${outer}<circle cx="100" cy="100" r="${r}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="22"/>${arcs}</svg><div class="rc"><span class="rdb">${G.db}</span><b>${mbf(d.vault)}</b><span>${d.nfiles} ${d.nfiles==1?'file':'files'}</span></div>`;
}
/* ---- storage list + legend ---- */
function listHtml(d,R){
  const rows=R.L.map(c=>`<div class="vr" data-k="${c.k}"><i class="dt" style="background:${grad(c.k)}"></i><span class="n">${NM[c.k]}</span><span class="s">${mbf(c.v)}</span><span class="p">${R.pc(c)}%</span></div>`);
    return rows.join('');
}
function legendHtml(d,R){
  const p=R.L.map(c=>`<button data-k="${c.k}"><i style="background:${grad(c.k)}"></i>${NM[c.k]} · ${mbf(c.v)}</button>`);
  if(R.est)p.push(`<button data-k="dev"><i style="background:${grad('dev')}"></i>Free space</button>`);
  return p.join('');
}
/* ---- treemap (cards row) ---- */
function treemapHtml(d,R){
  const items=R.L.filter(c=>c.n>0);if(!items.length)return '<div class="vempty">Protected is empty</div>';
  const mn=(d.vault||1)*.17,its=items.map(c=>({c,v:Math.max(c.v,mn)})),out=[];
  (function lay(a,x,y,w,h){if(!a.length)return;if(a.length==1){out.push({c:a[0].c,x,y,w,h});return}
   const t=a.reduce((s,i)=>s+i.v,0);let acc=0,i=0;while(i<a.length-1&&acc+a[i].v<=t/2){acc+=a[i].v;i++}if(i==0){acc=a[0].v;i=1}
   const A=a.slice(0,i),B=a.slice(i),f=acc/t;
   if(w>=h){lay(A,x,y,w*f,h);lay(B,x+w*f,y,w*(1-f),h)}else{lay(A,x,y,w,h*f);lay(B,x,y+h*f,w,h*(1-f))}})(its,0,0,380,198);
  return out.map(t=>{const c=t.c,big=t.w>170&&t.h>150,mid=t.w>100&&t.h>95;
    return `<button class="tt ${big?'big':mid?'mid':'sm'}" data-k="${c.k}" style="left:${t.x/380*100}%;top:${t.y/198*100}%;width:${t.w/380*100}%;height:${t.h/198*100}%;--g:${grad(c.k)}"><span class="ti">${CI[c.k]||CI.oth}</span><span class="tn">${NM[c.k]}</span>${big||mid?`<span class="ts">${mbf(c.v)}</span><span class="tp">${R.pc(c)}%</span>`:`<span class="tr2"><span>${mbf(c.v)}</span><span>${R.pc(c)}%</span></span>`}</button>`}).join('');
}
/* ---- bubbles ---- */
function bubblesHtml(d,R){
  const items=R.L.filter(c=>c.n>0);if(!items.length)return '<div class="vempty">Protected is empty</div>';
  const mx=Math.max(1,...items.map(c=>c.v)),W=343,H=200,P=[];
  for(const c of items){let r=Math.min(70,18+Math.sqrt(c.v/mx)*50),ok=false;
   for(let t=0;t<8&&!ok;t++,r*=.9){for(let s=0;s<1500&&!ok;s++){const a=s*.62,dist=s?2.3*Math.sqrt(s)*3:0,x=W/2-30+Math.cos(a)*dist*1.5,y=H/2+Math.sin(a)*dist*.9;
     if(x-r<4||x+r>W-4||y-r<4||y+r>H-4)continue;if(P.every(p=>Math.hypot(p.x-x,p.y-y)>=p.r+r+4)){P.push({c,x,y,r});ok=true}}}}
  return P.map(p=>{const c=p.c,inb=p.r>=34;
   return `<button class="bb ${inb?'in':'out'}" data-k="${c.k}" style="left:${(p.x-p.r)/W*100}%;top:${(p.y-p.r)/H*100}%;width:${p.r*2/W*100}%;height:${p.r*2/H*100}%;--c1:${PAL[c.k][0]};--c2:${PAL[c.k][1]}"><span class="bo"></span>${inb?`<span class="bi">${CI[c.k]||CI.oth}</span><b>${NM[c.k]}</b><span>${mbf(c.v)}</span><span>${R.pc(c)}%</span>`:`<span class="bl"><b>${NM[c.k]}</b><span>${mbf(c.v)}</span><span>${R.pc(c)}%</span></span>`}</button>`}).join('');
}
/* ---- bars ---- */
function barsHtml(d,R){
  const rows=R.L.filter(c=>c.n>0).map(c=>{const w=Math.max(3,d.vault?c.v/d.vault*100:0);
   return `<div class="br" data-k="${c.k}"><span class="bg" style="background:${grad(c.k)}">${CI[c.k]||CI.oth}</span><div class="bm"><div class="bt"><b>${NM[c.k]}</b><span>${mbf(c.v)}</span><span>${R.pc(c)}%</span></div><div class="bk"><i style="width:${w}%;background:${grad(c.k)};box-shadow:0 0 10px ${PAL[c.k][0]}88"></i></div></div></div>`});
  if(R.est)rows.push(`<div class="br" data-k="dev"><span class="bg dev" style="background:${grad('dev')}">${G.vdev}</span><div class="bm"><div class="bt"><b>Free space</b><span>—</span><span>${R.dev.pct}%</span></div></div></div>`);
  return rows.join('')||'<div class="vempty">Protected is empty</div>';
}
/* ---- signature diagrams: Dial / Hive / Towers / Stars (all 240x150) ---- */
const NG=k=>`url(#vn-${k})`;
const defsN=()=>'<defs>'+Object.keys(PAL).map(k=>`<linearGradient id="vn-${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${PAL[k][0]}"/><stop offset="1" stop-color="${PAL[k][1]}"/></linearGradient>`).join('')+'<radialGradient id="vn-halo"><stop offset="0" stop-color="#37e3ff" stop-opacity=".55"/><stop offset="1" stop-color="#37e3ff" stop-opacity="0"/></radialGradient></defs>';
const pctN=(u,q)=>{const p=q?u/q*100:0;return !u?'0%':p<0.01?'<0.01%':p<1?p.toFixed(2)+'%':p<10?p.toFixed(1)+'%':Math.round(p)+'%'};
const QN=R=>R.est?R.est.quota:100e9;
const qS=R=>mbf(QN(R)).replace('.00','');
const T1='style="text-anchor:start;font-size:13px"',T1E='style="text-anchor:end;font-size:13px"';
const corner=(d,R)=>`<text x="0" y="11" class="vn-t1" ${T1}>${mbf(d.vault)}</text><text x="0" y="23" class="vn-t2" style="text-anchor:start">${d.nfiles} ${d.nfiles==1?'file':'files'}</text><text x="240" y="11" class="vn-t1" ${T1E}>${pctN(d.vault,QN(R))}</text><text x="240" y="23" class="vn-t2" style="text-anchor:end">of ${qS(R)}</text>`;
const tip=c=>`<title>${NM[c.k]} · ${mbf(c.v)}</title>`;
const pol=(cx,cy,r,a)=>{const t=(a-90)*Math.PI/180;return[cx+r*Math.cos(t),cy+r*Math.sin(t)]};
const arcP=(cx,cy,r,a0,a1)=>{const[x0,y0]=pol(cx,cy,r,a0),[x1,y1]=pol(cx,cy,r,a1);return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${a1-a0>180?1:0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`};
const svgW=b=>`<svg viewBox="0 0 240 150">${defsN()}${b}</svg>`;

/* 1 - DIAL: a vault door. Ticking bezel, category arcs on the lock ring, spoked wheel + keyhole */
function vizDial(d,R){
  const L=R.L,n=L.length,cx=120,cy=80;
  let tk='';for(let i=0;i<72;i++){const big=i%6==0,a=i*5,[x0,y0]=pol(cx,cy,big?59:62,a),[x1,y1]=pol(cx,cy,66,a);tk+=`<path d="M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}" stroke="var(--${big?'mu':'bd'})" stroke-width="${big?1.4:1}" stroke-linecap="round"/>`}
  let sp='';for(let i=0;i<6;i++){const a=i*60,[x0,y0]=pol(cx,cy,26,a),[x1,y1]=pol(cx,cy,37,a);sp+=`<path d="M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}" stroke="${NG('dev')}" stroke-width="3.4" stroke-linecap="round"/><circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="3.3" fill="${NG('dev')}"/>`}
  const key=`<circle cx="${cx}" cy="${cy-3}" r="4.6" fill="${NG('dev')}"/><path d="M${cx-2.4} ${cy-1}L${cx+2.4} ${cy-1}L${cx+4.2} ${cy+9}L${cx-4.2} ${cy+9}Z" fill="${NG('dev')}"/>`;
  const frame=`<circle cx="${cx}" cy="${cy}" r="69" fill="none" stroke="var(--bd)" stroke-width="1.4"/><g class="vn-spin" style="transform-origin:${cx}px ${cy}px">${tk}</g><circle cx="${cx}" cy="${cy}" r="43" fill="none" stroke="var(--bd)"/><path d="M${cx-5} 1L${cx+5} 1L${cx} 9Z" fill="${NG('dev')}"/>`;
  const knob=`<g class="vn-spin2" style="transform-origin:${cx}px ${cy}px">${sp}</g><circle cx="${cx}" cy="${cy}" r="26" fill="var(--card)" stroke="var(--bd)" stroke-width="1.2"/>${key}`;
  if(!d.nfiles)return svgW(`${corner(d,R)}${frame}<circle cx="${cx}" cy="${cy}" r="50" fill="none" stroke="var(--bd)" stroke-width="7"/>${knob}`);
  const gap=n>1?3:0,vs=L.map(c=>Math.max(d.vault?c.v/d.vault:0,.045)),T=vs.reduce((a,b)=>a+b,0)||1,use=360-gap*n;let a=0;
  const arcs=L.map((c,i)=>{const span=vs[i]/T*use,cap=span>10?4:Math.max(0,span/2-.4),a0=a+gap/2+cap,a1=Math.max(a0+.4,a+span+gap/2-cap);a+=span+gap;
   return `<g class="sg" data-k="${c.k}"><path d="${arcP(cx,cy,50,a0,n==1?a0+359.4:a1)}" fill="none" stroke="transparent" stroke-width="16"/><path class="vn-arc" d="${arcP(cx,cy,50,a0,n==1?a0+359.4:a1)}" fill="none" stroke="${NG(c.k)}" stroke-width="7" stroke-linecap="round"/>${tip(c)}</g>`}).join('');
  return svgW(`${corner(d,R)}${frame}${arcs}${knob}`);
}

/* 2 - HIVE: honeycomb of 61 cells, each file type owns a spiral of cells (largest at the core) */
function vizHive(d,R){
  const s=11,cx=120,cy=84,L=R.L.slice().sort((a,b)=>b.v-a.v),N=61,RG=4;
  const cells=[];for(let q=-RG;q<=RG;q++)for(let r=-RG;r<=RG;r++){if(Math.abs(q+r)>RG)continue;const x=cx+s*Math.sqrt(3)*(q+r/2),y=cy+s*1.5*r;cells.push({x,y,ring:Math.max(Math.abs(q),Math.abs(r),Math.abs(q+r)),ang:(Math.atan2(y-cy,x-cx)+Math.PI/2+2*Math.PI)%(2*Math.PI)})}
  cells.sort((a,b)=>a.ring-b.ring||a.ang-b.ang);
  const hex=(x,y,rr)=>{let p='';for(let k=0;k<6;k++){const t=(60*k-30)*Math.PI/180;p+=(k?' ':'')+(x+rr*Math.cos(t)).toFixed(1)+','+(y+rr*Math.sin(t)).toFixed(1)}return p};
  if(!d.nfiles)return svgW(`${corner(d,R)}`+cells.filter(c=>c.ring<=1).map(c=>`<polygon points="${hex(c.x,c.y,s-2.2)}" fill="none" stroke="var(--bd)" stroke-width="1.4" stroke-linejoin="round"/>`).join(''));
  const n=L.length,tot=d.vault||1,raw=L.map(c=>c.v/tot*(N-n)),cnt=raw.map(v=>1+Math.floor(v));let left=N-cnt.reduce((a,b)=>a+b,0);
  raw.map((v,i)=>[v-Math.floor(v),i]).sort((a,b)=>b[0]-a[0]).forEach(([,i])=>{if(left>0){cnt[i]++;left--}});
  let idx=0;const g=L.map((c,i)=>{let h='';for(let j=0;j<cnt[i]&&idx<N;j++,idx++){const e=cells[idx];h+=`<polygon class="vn-pop" style="animation-delay:${idx*14}ms" points="${hex(e.x,e.y,s-2.4)}" fill="${NG(c.k)}" stroke="${NG(c.k)}" stroke-width="2.4" stroke-linejoin="round"/>`}
   return `<g class="sg" data-k="${c.k}">${h}${tip(c)}</g>`}).join('');
  return svgW(`${corner(d,R)}${g}`);
}

/* 3 - TOWERS: isometric skyline, one glass tower per file type, height = size */
function vizTowers(d,R){
  const L=R.L.slice().sort((a,b)=>b.v-a.v),n=L.length||1,Y=116,mx=Math.max(1,...L.map(c=>c.v));
  const step=Math.min(28,224/n),w=Math.min(12.5,step*.46),dd=w*.55,x0=(240-n*step)/2+step/2;
  const floor=`<path d="M${(x0-step*.7).toFixed(1)} ${Y+dd+5}L${(x0+(n-1)*step+step*.7).toFixed(1)} ${Y+dd+5}" stroke="var(--bd)" stroke-width="1.4" stroke-linecap="round"/>`;
  if(!d.nfiles)return svgW(`${corner(d,R)}${floor}`);
  const t=L.map((c,i)=>{const cx=x0+i*step,h=10+Math.sqrt(c.v/mx)*64,yt=Y-h,P=a=>a.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' '),
   left=[[cx-w,yt],[cx,yt+dd],[cx,Y+dd],[cx-w,Y]],right=[[cx,yt+dd],[cx+w,yt],[cx+w,Y],[cx,Y+dd]],top=[[cx,yt-dd],[cx+w,yt],[cx,yt+dd],[cx-w,yt]],
   p=d.vault?c.v/d.vault*100:0,lb=step>=19?`<text x="${cx.toFixed(1)}" y="${(yt-dd-4).toFixed(1)}" class="vn-t2" style="text-anchor:middle;font-size:8px">${p<1?'<1':Math.round(p)}%</text>`:'';
   let win='';if(h>26)for(let y=yt+dd+6;y<Y-3;y+=7)win+=`<path d="M${(cx+2.5).toFixed(1)} ${(y).toFixed(1)}L${(cx+w-2.5).toFixed(1)} ${(y-dd+1.4).toFixed(1)}" stroke="rgba(255,255,255,.4)" stroke-width="1.6" stroke-linecap="round"/>`;
   return `<g class="sg" data-k="${c.k}"><g class="vn-grow" style="animation-delay:${i*70}ms"><polygon points="${P(left)}" fill="${NG(c.k)}"/><polygon points="${P(right)}" fill="${NG(c.k)}"/><polygon points="${P(right)}" fill="rgba(0,0,0,.3)"/>${win}<polygon points="${P(top)}" fill="${NG(c.k)}"/><polygon points="${P(top)}" fill="rgba(255,255,255,.4)"/></g>${lb}${tip(c)}</g>`}).join('');
  return svgW(`${corner(d,R)}${floor}${t}`);
}

/* 4 - STARS: a constellation; the vault is the sun, every file type is a star sized by its share */
function vizStars(d,R){
  const L=R.L.slice().sort((a,b)=>b.v-a.v),cx=120,cy=84,mx=Math.max(1,...L.map(c=>c.v));
  const sun=`<circle class="vn-pulse" cx="${cx}" cy="${cy}" r="20" fill="url(#vn-halo)" style="transform-origin:${cx}px ${cy}px"/><circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="${NG('dev')}" stroke-width="1.4"/><circle cx="${cx}" cy="${cy}" r="4.2" fill="${NG('dev')}"/>`;
  if(!d.nfiles)return svgW(`${corner(d,R)}<circle cx="${cx}" cy="${cy}" r="42" fill="none" stroke="var(--bd)" stroke-dasharray="2 5" stroke-linecap="round"/>${sun}`);
  const P=L.map((c,i)=>{const rr=4.5+Math.sqrt(c.v/mx)*12,a=i*137.508*Math.PI/180,rad=(i?34:0)+13*Math.sqrt(i)*1.6;return{c,r:rr,x:cx+Math.cos(a)*rad*1.45+(i?0:30),y:cy+Math.sin(a)*rad*.85}});
  for(let it=0;it<60;it++){for(let i=0;i<P.length;i++){const p=P[i];let dx=p.x-cx,dy=p.y-cy,dl=Math.hypot(dx,dy)||1,mn=p.r+14;if(dl<mn){p.x=cx+dx/dl*mn;p.y=cy+dy/dl*mn}
   for(let j=i+1;j<P.length;j++){const q=P[j],ex=q.x-p.x,ey=q.y-p.y,el=Math.hypot(ex,ey)||.1,need=p.r+q.r+5;if(el<need){const k=(need-el)/2/el;p.x-=ex*k;p.y-=ey*k;q.x+=ex*k;q.y+=ey*k}}
   p.x=Math.max(p.r+3,Math.min(237-p.r,p.x));p.y=Math.max(30+p.r,Math.min(147-p.r,p.y))}}
  const lines=P.map(p=>`<path d="M${cx} ${cy}L${p.x.toFixed(1)} ${p.y.toFixed(1)}" stroke="${PAL[p.c.k][0]}" stroke-opacity=".38" stroke-width="1" stroke-dasharray="1.5 3.5" stroke-linecap="round"/>`).join('');
  const nodes=P.map((p,i)=>{const col=PAL[p.c.k][0];return `<g class="sg" data-k="${p.c.k}"><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(p.r+14).toFixed(1)}" fill="transparent"/><circle class="vn-twk" style="animation-delay:${(i*.45).toFixed(2)}s;transform-origin:${p.x.toFixed(1)}px ${p.y.toFixed(1)}px" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(p.r+4.5).toFixed(1)}" fill="${col}" fill-opacity=".18"/><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.r.toFixed(1)}" fill="${NG(p.c.k)}"/><circle cx="${(p.x-p.r*.3).toFixed(1)}" cy="${(p.y-p.r*.3).toFixed(1)}" r="${(p.r*.28).toFixed(1)}" fill="#fff" fill-opacity=".55"/>${tip(p.c)}</g>`}).join('');
  return svgW(`${corner(d,R)}${lines}${sun}${nodes}`);
}
function mainViz(d,R){
  const f=VIEW==='hive'?vizHive:VIEW==='towers'?vizTowers:VIEW==='stars'?vizStars:vizDial;
  return `<div class="vviz">${f(d,R)}</div>`;
}

async function skinVault(){
  const m=document.getElementById('main'),S=window.__skStg;
  if(!m||!S||m.querySelector('.vt'))return;
  const h1=m.querySelector('h1'),sub=m.querySelector('.sub'),fi=m.querySelector('#fi'),up=fi&&fi.closest('label'),tr=m.querySelector('#tr');
  const tiles=[...m.querySelectorAll('.cc[data-fc]')];
  if(!h1||!sub||!up||!tr||!tiles.length)return;
  let d=S.DATA;if(!d){try{d=await S.gather()}catch(e){return}}
  const R=rowsData(d);
  let files=[];try{files=(await rows()).filter(f=>!f.trash&&f.id!='avatar')}catch(e){}
  const trashN=d.cats.trash?d.cats.trash.n:0,live=d.list.filter(c=>c.k!='trash').reduce((a,c)=>a+c.n,0);

  const root=document.createElement('div');root.className='vt';
  root.innerHTML=`<header class="vh"><div class="vic">${G.shield}</div><div class="vtt"></div><div class="vtools"><div class="vsearch">${G.search}<input id="vq" type="search" placeholder="Search files…" autocomplete="off" aria-label="Search files"></div></div></header>
  <section class="vA"><div class="vcard vstor" style="--b1:#2fd4ff;--b2:#4b5bff"><div class="vsh"><div><h3>Storage</h3><div class="vsub" id="vsub"></div><div class="vbar"><i id="vbi"></i></div></div><div class="vs" id="vs"></div></div><div class="vbody"><div id="vvz"></div><div class="vlist" id="vlist"></div></div></div>
  <div class="vcard vquick" style="--b1:#9b6bff;--b2:#3f6bff"><h3>Quick overview</h3><div class="vq">
   <div class="qt q1"><span class="qi">${G.files}</span><b>${live}</b><span>Total files</span></div>
   <div class="qt q2"><span class="qi">${G.db}</span><b>${R.est?mbf(Math.max(0,R.est.quota-R.est.usage)):'—'}</b><span>Free space</span></div>
   <button class="qt q3" id="qtr"><span class="qi">${G.trash.replace('width="15" height="15"','width="24" height="24"')}</span><b>${trashN}</b><span>In trash</span></button>
   <button class="qt q4" id="qpr"><span class="qi">${G.prot}</span><b>${d.pr?'On':'Off'}</b><span>Persistent storage</span></button></div></div></section>
  <section class="vcard vcat" style="--b1:#8a63ff;--b2:#3f6bff"><div class="vch"><h3>File categories</h3><span class="mu">Tap any shape for details</span></div><div class="vtiles" id="vtiles"></div></section>`;
  /* move the app's own nodes (they keep their handlers) */
  const ttl=root.querySelector('.vtt');ttl.append(h1,sub);
  if(sub.firstChild&&sub.firstChild.nodeType===3)sub.firstChild.nodeValue=sub.firstChild.nodeValue.replace(/^[^\p{L}\p{N}]+/u,'');
  sub.insertAdjacentHTML('afterbegin',`<span class="sl">${G.lock}</span>`);
  const tools=root.querySelector('.vtools');tools.prepend(up,tr);
  up.classList.add('vup');if(!up.querySelector('svg')){up.firstChild&&up.firstChild.nodeType===3&&(up.firstChild.nodeValue=up.firstChild.nodeValue.replace(/^[^\p{L}\p{N}]+/u,''));up.insertAdjacentHTML('afterbegin',G.upload)}
  tr.classList.add('vtr');if(tr.firstChild&&tr.firstChild.nodeType===3)tr.firstChild.nodeValue=tr.firstChild.nodeValue.replace(/^[^\p{L}\p{N}]+/u,'');tr.insertAdjacentHTML('afterbegin',G.trash);
  const tg=root.querySelector('#vtiles');
  tiles.forEach(b=>{const k=b.dataset.fc,sp=b.querySelector('.mu'),txt=sp?sp.textContent:'';b.className='vtile';b.removeAttribute('style');b.innerHTML=`<span class="vti">${CI[k]||CI.oth}</span><span class="vchv">${G.chev}</span><b>${E(NM[k]||'')}</b><span class="vtm2">${E(txt)}</span>`;tg.append(b)});
  m.innerHTML='';m.append(root);

  /* fill + wire */
  const paintStor=()=>{
    root.querySelector('#vsub').textContent=`${mbf(d.vault)} used of ${R.est?mbf(R.est.quota):'—'} · ${d.nfiles} ${d.nfiles==1?'file':'files'}`;
    root.querySelector('#vbi').style.width=(R.est&&d.vault?Math.max(.6,Math.min(100,d.vault/R.est.quota*100)):0)+'%';
    root.querySelector('#vs').innerHTML=[['dial','Dial',SV('<circle cx="12" cy="12" r="8.5" stroke-width="1.5"/><circle cx="12" cy="12" r="3" stroke-width="1.5"/><path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5" stroke-width="1.6"/>',{s:13})],['hive','Hive',SV('<path d="M12 3.5 18.5 7.2v7.6L12 18.5 5.5 14.8V7.2z" stroke-width="1.6"/><path d="M12 11v7.5M12 11 5.5 7.2M12 11l6.5-3.8" stroke-width="1.2"/>',{s:13})],['towers','Towers',SV('<path d="M4 20V12l3-1.6 3 1.6v8M10 20V6l3.5-2 3.5 2v14M17 20v-8l3-1.6V20" stroke-width="1.5"/>',{s:13})],['stars','Stars',SV('<circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/><circle cx="5.5" cy="6.5" r="1.8" fill="currentColor" stroke="none"/><circle cx="18.5" cy="8" r="2.6" fill="currentColor" stroke="none"/><circle cx="15" cy="19" r="1.6" fill="currentColor" stroke="none"/><path d="M12 12 5.5 6.5M12 12l6.5-4M12 12l3 7" stroke-width="1" stroke-dasharray="1.5 2"/>',{s:13,w:1})]].map(([k,l,i])=>`<button class="vchip${VIEW==k?' on':''}" data-v="${k}">${i}${l}</button>`).join('');
    root.querySelector('#vvz').innerHTML=mainViz(d,R);
    root.querySelector('#vlist').innerHTML=listHtml(d,R);
  };
  paintStor();
  root.addEventListener('click',e=>{
    const v=e.target.closest('[data-v]');
    if(v){VIEW=v.dataset.v;try{localStorage.setItem('alpha.stv',VIEW)}catch(x){}paintStor();return}
    const k=e.target.closest('[data-k]');
    if(k&&!e.target.closest('.vtile')){S.detail(k.dataset.k);return}
    if(e.target.closest('#qtr')){trashP();return}
    if(e.target.closest('#qpr')){S.detail('dev')}
  });
  /* search: highlight categories that contain a matching file; Enter opens the first one */
  const q=root.querySelector('#vq');
  const match=()=>{const t=q.value.trim().toLowerCase(),hit=new Set();
    if(t)files.forEach(f=>{if(String(f.name||'').toLowerCase().includes(t))hit.add(fcat(f))});
    tg.querySelectorAll('.vtile').forEach(b=>{b.classList.toggle('dim',!!t&&!hit.has(b.dataset.fc));b.classList.toggle('hit',!!t&&hit.has(b.dataset.fc))});return hit};
  q.addEventListener('input',match);
  q.addEventListener('keydown',e=>{if(e.key==='Enter'){const h=[...match()];if(h.length)fcPage(h[0])}});
}

try{
  const _v=V.vault;
  V.vault=async function(){const r=await _v.apply(this,arguments);try{if(view==='vault')await skinVault()}catch(e){console.warn('vault skin',e)}return r};
  const mm=document.getElementById('main');if(mm&&mm.querySelector('#fi')&&mm.querySelector('.cc[data-fc]')&&!mm.querySelector('.vt'))skinVault();
}catch(e){console.warn('vault hook',e)}
})();

/* ===== ALPHA Night: category pages (PDF, Documents, ...). Same elements/handlers as before, new look ===== */
(()=>{
if(window.__alphaFcSkin)return;window.__alphaFcSkin=1;
const V=window.__skV;if(!V)return;
const{CI,PAL,NM,G,SV,mbf,E,grad}=V;
const TAG={doc:'Keep your documents safe and organized',txt:'Notes and text files, always at hand',pdf:'Keep your PDFs safe and organized',img:'Your pictures, encrypted on this device',aud:'Your audio files, private and secure',vid:'Your videos, private and secure',ppt:'Slides and presentations in one place',code:'Scripts and code files, kept safe',oth:'Everything else, safely stored'};
const WHAT={doc:'documents',txt:'text files',pdf:'PDF',img:'images',aud:'audio',vid:'videos',ppt:'presentations',code:'code files',oth:'files'};
const SUP={doc:'documents',txt:'text files',pdf:'PDF files',img:'image files',aud:'audio files',vid:'video files',ppt:'presentations',code:'code files',oth:'all file types'};
const I={
 back:SV('<path d="M19 12H5M11 6l-6 6 6 6"/>',{s:24,w:2}),
 cloud:SV('<path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4 4 0 0 1-.5 7.95"/><path d="M12 21v-8M8.8 15.8 12 12.6l3.2 3.2"/>',{s:34,w:1.7}),
 up:SV('<path d="M12 16V4M7 9l5-5 5 5M4.5 15.5v2A2.5 2.5 0 0 0 7 20h10a2.5 2.5 0 0 0 2.5-2.5v-2"/>',{s:22,w:2}),
 eye:SV('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',{s:22,w:1.8}),
 dots:SV('<circle cx="12" cy="5.5" r="1.7" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/><circle cx="12" cy="18.5" r="1.7" fill="currentColor" stroke="none"/>',{s:20}),
 x:SV('<path d="m6 6 12 12M18 6 6 18"/>',{s:16,w:2}),
 sel:SV('<rect x="4" y="4" width="16" height="16" rx="4"/><path d="m8.5 12.2 2.4 2.4 4.6-5"/>',{s:17,w:1.9}),
 shield:SV('<path d="M12 3 4.8 5.8v5.7c0 4.5 3 8 7.2 9.5 4.2-1.5 7.2-5 7.2-9.5V5.8z"/><path d="m9 12 2.2 2.2L15.2 10"/>',{s:26,w:1.7}),
 arrow:SV('<path d="M5 12h14M13 6l6 6-6 6"/>',{s:20,w:2}),
 cut:SV('<circle cx="6" cy="6.5" r="2.6"/><circle cx="6" cy="17.5" r="2.6"/><path d="M8.2 8 20 18M8.2 16 20 6"/>',{s:16}),
 copy:SV('<rect x="8.5" y="8.5" width="11" height="11" rx="2.4"/><path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5"/>',{s:16}),
 move:SV('<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.2h7a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/><path d="M9 13.5h6M12.5 11l2.5 2.5-2.5 2.5"/>',{s:17}),
 paste:SV('<rect x="5" y="5" width="14" height="16" rx="2.4"/><path d="M9 5V3.8h6V5M9 12h6M9 16h4"/>',{s:16}),
 trash:G.trash.replace('width="15" height="15"','width="17" height="17"'),
 ok:SV('<path d="m5 12.5 4.5 4.5L19 7.5"/>',{s:15,w:2.6})
};
const BI={'a-cut':I.cut,'a-cp':I.copy,'a-mv':I.move,'a-dl':I.trash,'a-x':I.x,'a-ps':I.paste,'a-cl':I.x,'a-rs':I.move,'a-df':I.trash};
const fmtD=t=>{const d=new Date(t);return d.toLocaleDateString([],{month:'short',day:'numeric',year:'numeric'})+' · '+d.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})};

async function skinFc(k){
  const m=document.getElementById('main');
  if(!m||m.querySelector('.fc'))return;
  const bk=m.querySelector('#bk'),h1=m.querySelector('h1'),sub=m.querySelector('.sub'),fi=m.querySelector('#fi'),up=fi&&fi.closest('label'),nw=m.querySelector('#nw');
  if(!bk||!h1||!sub||!up||!FI[k])return;
  let list=[];try{list=(await rows()).filter(f=>!f.trash&&fcat(f)==k)}catch(e){}
  const map=new Map(list.map(f=>[String(f.id),f])),tot=list.reduce((a,f)=>a+(f.size||0),0),n=list.length;
  const root=document.createElement('div');root.className='fc';root.dataset.k=k;root.style.setProperty('--t',PAL[k][0]);root.style.setProperty('--t2',PAL[k][1]);
  root.innerHTML=`<header class="fh"><div class="fti">${(CI[k]||CI.oth).replace(/width="\d+" height="\d+"/,'width="30" height="30"')}</div><div class="ftt"></div><div class="vsearch">${G.search}<input id="fq" type="search" placeholder="Search files…" autocomplete="off" aria-label="Search files"></div><p class="ftg">${E(TAG[k]||'')}</p></header>
  <section class="fdz"><div class="fdi"><div class="fdl" role="button" tabindex="0"><span class="fcl">${I.cloud}</span><div class="fdt">Drop your <b>${E(WHAT[k]||'files')}</b> here <i>or</i> click to upload</div><div class="fds">Supports ${E(SUP[k]||'files')} · No size limit</div></div><div class="fdr"></div></div></section>
  <div class="fsh"><i class="fdot"></i><h3 id="fst"></h3><span class="fln"></span><span class="fba"></span></div><div class="fls"></div>`;
  /* header */
  const hd=root.querySelector('.fh');hd.prepend(bk);
  bk.innerHTML=I.back;bk.classList.add('fbk');bk.setAttribute('aria-label','Back');
  const tt=root.querySelector('.ftt');tt.append(h1,sub);
  h1.textContent=NM[k]||h1.textContent.replace(/^[^\p{L}\p{N}]+/u,'');
  sub.textContent=`${n} ${n==1?'file':'files'} · ${mbf(tot)}`;
  /* upload / new file keep their original elements */
  const fr=root.querySelector('.fdr');
  up.classList.add('fup');
  if(up.firstChild&&up.firstChild.nodeType===3)up.firstChild.nodeValue=up.firstChild.nodeValue.replace(/^[^\p{L}\p{N}]+/u,'');
  up.insertAdjacentHTML('afterbegin',I.up);fr.append(up);
  if(nw){nw.classList.add('fnw');if(nw.firstChild&&nw.firstChild.nodeType===3)nw.firstChild.nodeValue=nw.firstChild.nodeValue.replace(/^[^\p{L}\p{N}]+/u,'');fr.append(nw)}
  const dl=root.querySelector('.fdl'),dz=root.querySelector('.fdi');
  dl.addEventListener('click',()=>fi.click());
  dl.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fi.click()}});
  ['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('over')}));
  ['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('over')}));
  dz.addEventListener('drop',e=>{const fs=e.dataTransfer&&e.dataTransfer.files;if(!fs||!fs.length)return;try{const dt=new DataTransfer();[...fs].forEach(f=>dt.items.add(f));fi.files=dt.files;fi.dispatchEvent(new Event('change',{bubbles:true}))}catch(x){}});
  /* files list: the app's own rows (they keep selection / long-press / viewer / preview behaviour) */
  const ls=root.querySelector('.fls'),rowsEl=[...m.querySelectorAll('.tk[data-f]')];
  const selb=m.querySelector('#selb');
  rowsEl.forEach(r=>{
    const f=map.get(String(r.dataset.f));
    const ic=r.firstElementChild;
    if(ic&&!ic.classList.contains('thw')){const e=f?(ext(f.name)||'').slice(0,4).toUpperCase():'';ic.className='fic';ic.removeAttribute('style');ic.style.background=grad(k);ic.innerHTML=`${(CI[k]||CI.oth).replace(/width="\d+" height="\d+"/,'width="22" height="22"')}${e?`<em>${E(e)}</em>`:''}`}
    const mu=r.querySelector('.grow>.mu');if(mu&&f)mu.textContent=`${mbf(f.size||0)} · ${fmtD(f.edited||f.id)}`;
    const pv=r.querySelector('.pvb');if(pv){pv.innerHTML=I.eye;pv.classList.add('fev')}
    const tail=r.lastElementChild;
    if(tail&&tail!==pv&&tail.classList.contains('mu')){tail.className='fkb';tail.innerHTML=I.dots;tail.setAttribute('role','button');tail.setAttribute('aria-label','More');tail.onclick=null;tail.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();openMenu(r,tail,f,k)})}
    r.insertAdjacentHTML('afterbegin','<span class="fck" role="checkbox" aria-label="Select"></span>');
    r.querySelector('.fck').addEventListener('click',e=>{e.stopPropagation();e.preventDefault();if(selb)selb.click();const sk=r.querySelector(':scope>.sk');(sk||r).click()});
    ls.append(r);
  });
  if(!rowsEl.length)ls.innerHTML=`<div class="fempty">${I.cloud}<b>No files here yet</b><span>Drop files above or click Upload.</span></div>`;
  const chips=m.querySelector(':scope>.chips');
  m.innerHTML='';m.append(root);
  /* section header: title + Select items / Clear */
  const fst=root.querySelector('#fst'),fba=root.querySelector('.fba');
  if(selb){selb.classList.add('fsb');if(selb.firstChild&&selb.firstChild.nodeType===3)selb.firstChild.nodeValue=selb.firstChild.nodeValue.replace(/^[^\p{L}\p{N}]+/u,'');selb.insertAdjacentHTML('afterbegin',I.sel);fba.append(selb)}
  const clr=document.createElement('button');clr.className='fcl2';clr.hidden=true;clr.innerHTML=I.x+'<span>Clear</span>';clr.onclick=()=>{const x=document.getElementById('a-x');if(x)x.click()};fba.append(clr);
  /* search */
  root.querySelector('#fq').addEventListener('input',e=>{const t=e.target.value.trim().toLowerCase();ls.querySelectorAll('.tk').forEach(r=>{const f=map.get(String(r.dataset.f));r.style.display=!t||(f&&String(f.name).toLowerCase().includes(t))?'':'none'})});
  /* live: selection count, Clear button, bottom bar */
  const upd=()=>{
    const on=m.classList.contains('selm'),c=root.querySelectorAll('.tk.sel').length;
    const tx2=on?`Selected (${c})`:`Files (${n})`;if(fst.textContent!==tx2)fst.textContent=tx2;
    if(selb)selb.hidden=on;clr.hidden=!on;
    const sb=document.getElementById('sbar');
    if(sb&&!sb.dataset.sk){
      sb.dataset.sk='1';
      const b=sb.querySelector('.r>b');
      if(b&&/selected/.test(b.textContent)){
        let s=0;root.querySelectorAll('.tk.sel').forEach(r=>{const f=map.get(String(r.dataset.f));if(f)s+=f.size||0});
        b.innerHTML=`<span class="sbi">${I.shield}</span><span class="sbt"><b>${c} ${c==1?'file':'files'} selected</b></span><span class="sbz">${mbf(s)}</span>`;
        sb.classList.add('fsel');
      }
      sb.querySelectorAll('button[id]').forEach(x=>{const t=x.firstChild;if(t&&t.nodeType===3)t.nodeValue=t.nodeValue.replace(/^[^\p{L}\p{N}]+/u,'');if(BI[x.id])x.insertAdjacentHTML('afterbegin',BI[x.id])});
    }
  };
  upd();
  new MutationObserver(upd).observe(m,{attributes:true,attributeFilter:['class'],subtree:true,childList:true});
}
/* three-dots menu */
let MENU=null;
function closeMenu(){if(MENU){MENU.remove();MENU=null}}
document.addEventListener('click',e=>{if(MENU&&!e.target.closest('.fmenu'))closeMenu()},true);
function openMenu(row,btn,f,k){
  closeMenu();if(!f)return;
  const items=[['Open',()=>row.click()],['Details',()=>fileP(f.id)],['Rename',async()=>ren(await gf(f.id))]];
  try{if(istx(f))items.push(['Edit',async()=>edP(await gf(f.id))])}catch(e){}
  items.push(['Move to Trash',async()=>{const g=await gf(f.id);g.trash=Date.now();await svf(g);toast('Moved to trash');fcPage(k)},1]);
  const d=document.createElement('div');d.className='fmenu';
  d.innerHTML=items.map((i,x)=>`<button data-i="${x}"${i[2]?' class="dg"':''}>${i[0]}</button>`).join('');
  const root=document.querySelector('.fc');root.append(d);
  const rb=root.getBoundingClientRect(),bb=btn.getBoundingClientRect();
  d.style.top=(bb.bottom-rb.top+6)+'px';d.style.right=Math.max(8,rb.right-bb.right)+'px';
  d.onclick=e=>{const b=e.target.closest('button');if(!b)return;e.stopPropagation();const it=items[+b.dataset.i];closeMenu();it[1]()};
  MENU=d;
}
try{
  const _f=fcPage;
  fcPage=async function(k){const r=await _f.apply(this,arguments);try{if(view==='fc')await skinFc(k)}catch(e){console.warn('fc skin',e)}return r};
}catch(e){console.warn('fc hook',e)}
})();

/* ===== ALPHA Night: Settings dialog (same elements/handlers, new layout) ===== */
(()=>{
if(window.__alphaSetSkin)return;window.__alphaSetSkin=1;
const V=window.__skV;if(!V)return;
const{SV,E}=V;
const I={
 user:SV('<circle cx="12" cy="8" r="4"/><path d="M5 20.5v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1"/>',{s:19,w:1.9}),
 theme:SV('<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.5-1.9-.3-1 .3-2.1 1.4-2.1H17a4 4 0 0 0 4-4c0-5-4-10-9-10z"/><circle cx="7.6" cy="11.2" r="1" fill="currentColor"/><circle cx="10.4" cy="7.4" r="1" fill="currentColor"/><circle cx="15" cy="7.8" r="1" fill="currentColor"/>',{s:19,w:1.8}),
 lang:SV('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 2.8 3 15.2 0 18M12 3c-3 2.8-3 15.2 0 18"/>',{s:19,w:1.7}),
 time:SV('<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 1.9"/>',{s:19,w:1.8}),
 loc:SV('<path d="M12 21.5s7-5.6 7-11.5a7 7 0 0 0-14 0c0 5.9 7 11.5 7 11.5z"/><circle cx="12" cy="10" r="2.5"/>',{s:19,w:1.8}),
 sec:SV('<path d="M12 3 4.8 5.8v5.7c0 4.5 3 8 7.2 9.5 4.2-1.5 7.2-5 7.2-9.5V5.8z"/><path d="m9 12 2.2 2.2L15.2 10"/>',{s:19,w:1.8}),
 bak:SV('<path d="M6.5 18.5h11a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.4 9.6a4.5 4.5 0 0 0 .1 8.9z"/>',{s:19,w:1.8}),
 x:SV('<path d="m6 6 12 12M18 6 6 18"/>',{s:15,w:2.2}),
 down:SV('<path d="m6 9 6 6 6-6"/>',{s:16,w:2}),
 right:SV('<path d="m9 5.5 6.5 6.5L9 18.5"/>',{s:16,w:2}),
 pen:SV('<path d="M4 20l1-4.2L16.6 4.2a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.2 19z"/><path d="m14.5 6.3 3.2 3.2"/>',{s:15,w:1.9}),
 save:SV('<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',{s:19,w:1.8}),
 pin:SV('<path d="M12 21.5s7-5.6 7-11.5a7 7 0 0 0-14 0c0 5.9 7 11.5 7 11.5z" fill="currentColor"/><circle cx="12" cy="10" r="2.4" fill="#0a1130"/>',{s:15,w:1})
};
/* Bengali for the few labels this layout adds (merged only where missing) */
try{const bn={'Customize your experience':'আপনার অভিজ্ঞতা কাস্টমাইজ করুন','Set your profile details':'প্রোফাইলের তথ্য দিন','Choose your theme style':'থিমের ধরন বেছে নিন','Select how time is displayed':'সময় কীভাবে দেখাবে বেছে নিন','Choose your preferred language':'পছন্দের ভাষা বেছে নিন','User':'ব্যবহারকারী','Change lock (PIN / Password / Pattern)':'লক পরিবর্তন (PIN / পাসওয়ার্ড / প্যাটার্ন)','Security':'নিরাপত্তা','More':'আরও','Less':'কম','Backup':'ব্যাকআপ','Account security':'অ্যাকাউন্ট নিরাপত্তা'};
 Object.keys(bn).forEach(k=>{if(!(k in D))D[k]=bn[k]});DK.length=0;DK.push(...Object.keys(D));DK.sort((a,b)=>b.length-a.length)}catch(e){}

const TABS=[['profile','user'],['theme','theme'],['lang','lang'],['time','time'],['loc','loc'],['sec','sec'],['bak','bak']];
let lastTop=0,THEMES_OPEN=false,PANE='profile';

function skinSet(){
  const modal=document.getElementById('modal'),mc=document.getElementById('mc');
  if(!mc)return;
  const root=mc.firstElementChild;
  if(!root||root.classList.contains('stg')||!root.querySelector('#sa')||!root.querySelector('#pn'))return;
  const reopen=modal&&modal.style.display==='flex';
  const q=s=>root.querySelector(s),H=[...root.querySelectorAll(':scope>h3')].map(h=>h.textContent.trim());
  const head=root.firstElementChild,mx=q('#mx'),title=head.querySelector('b').textContent;
  const pv=q('#pv'),pn=q('#pn'),pf=q('#pf'),rp=q('#rp'),hint=pn.parentElement.querySelector('p.mu');
  const tg=q('.tg'),lbs=[...root.querySelectorAll('[data-l]')],hs=[...root.querySelectorAll('[data-h]')];
  const hrow=hs[0]&&hs[0].parentElement,clock=hrow&&hrow.nextElementSibling;
  const locP=[...root.querySelectorAll(':scope>p')].find(p=>/📍/.test(p.textContent));
  const lockP=[...root.querySelectorAll(':scope>p.mu')].find(p=>/:/.test(p.textContent)&&p.nextElementSibling&&p.nextElementSibling.id==='cl2');
  const cl2=q('#cl2'),sa=q('#sa'),bk1=q('#bk1'),bkrow=bk1&&bk1.parentElement,acct=q('#acctbox'),fb1=q('#fb1'),fbrow=fb1&&fb1.parentElement,fbp=fbrow&&fbrow.previousElementSibling;
  if(!tg||!hrow||!cl2||!bkrow)return;
  const curLang=(lbs.find(b=>b.classList.contains('on'))||lbs[0]||{}).textContent||'';

  const st=document.createElement('div');st.className='stg';
  st.innerHTML=`<header class="sth"><div><h2></h2><p>Customize your experience</p></div><span class="sx"></span></header>
  <div class="stb"><div class="stn">${TABS.map(([k,ic],i)=>`<button data-t="${k}" class="${i?'':'on'}">${I[ic]}<span>${E(H[i]||k)}</span></button>`).join('')}</div>
  <div class="stw"><div class="stp"><div class="stg2"><div class="stc1">
    <section id="s-profile"><h3>${E(H[0]||'Profile')}</h3><div class="spf"><span class="sav"></span><div class="sun"><b>User</b><small>Set your profile details</small><div class="pnw"></div></div></div></section>
    <section id="s-lang"><h3>${E(H[2]||'Language')}</h3><small>Choose your preferred language</small><div class="dd"><button class="ddb" type="button">${I.lang}<span>${E(curLang)}</span>${I.down}</button><div class="ddm" hidden></div></div></section>
  </div><div class="stc2">
    <section id="s-theme"><h3>${E(H[1]||'Theme')}</h3><small>Choose your theme style</small><div class="sth2"></div></section>
    <section id="s-time"><h3>${E(H[3]||'Time format')}</h3><small>Select how time is displayed</small><div class="stm"></div></section>
    <section id="s-loc"><h3>${E(H[4]||'Location')}</h3><div class="slc"></div></section>
    <section id="s-sec"><h3>${E(H[5]||'Security')}</h3><small>Change lock (PIN / Password / Pattern)</small><div class="ssc"></div></section>
  </div></div>
  <section id="s-bak" class="sbk"><h3>${E(H[6]||'Backup')}</h3><div class="sbb"></div></section></div>
  <footer class="stf"><div class="ssv"></div></footer></div></div>`;
  st.querySelector('h2').textContent=title;
  st.querySelector('.sx').replaceWith(mx);mx.classList.add('sxb');mx.innerHTML=I.x+'<span>'+E(mx.textContent.trim()||'Close')+'</span>';
  /* profile */
  st.querySelector('.sav').replaceWith(pv);
  const pnw=st.querySelector('.pnw');pnw.append(pn);pnw.insertAdjacentHTML('beforeend','<span class="pni">'+I.pen+'</span>');
  if(pf)st.querySelector('.sun').append(pf);
  if(rp)st.querySelector('.sun').append(rp);
  /* language dropdown (the app's own language buttons live in the menu) */
  const ddm=st.querySelector('.ddm'),ddb=st.querySelector('.ddb');
  lbs.forEach(b=>{b.removeAttribute('style');ddm.append(b)});
  ddb.onclick=e=>{e.stopPropagation();ddm.hidden=!ddm.hidden;ddb.classList.toggle('open',!ddm.hidden)};
  /* theme / time / location */
  const sth2=st.querySelector('.sth2');sth2.append(tg);
  if(tg.children.length>7){
    sth2.classList.toggle('col',!THEMES_OPEN);
    const mb=document.createElement('button');mb.type='button';mb.className='smore';mb.innerHTML='<span>'+(THEMES_OPEN?'Less':'More')+'</span>'+I.down;
    mb.onclick=()=>{THEMES_OPEN=!THEMES_OPEN;sth2.classList.toggle('col',!THEMES_OPEN);mb.firstChild.textContent=THEMES_OPEN?'Less':'More';mb.classList.toggle('open',THEMES_OPEN)};
    if(THEMES_OPEN)mb.classList.add('open');
    sth2.append(mb);
  }
  const stm=st.querySelector('.stm');hrow.removeAttribute('style');stm.append(hrow);if(clock&&clock.tagName==='P')stm.append(clock);
  const slc=st.querySelector('.slc');
  if(locP){const t=locP.textContent.replace(/^[^\p{L}\p{N}]+/u,'').replace(/\s*·\s*/,' - ');slc.innerHTML=`<span class="li">${I.pin}</span><span class="lt">${E(t)}</span>`;slc.dataset.loc=t}
  /* backup + account */
  const sbb=st.querySelector('.sbb');
  [bkrow,acct].forEach(e=>e&&sbb.append(e));
  if(fbrow){const h4=document.createElement('h4');h4.textContent=H[7]||'';sbb.append(h4);if(fbp)sbb.append(fbp);sbb.append(fbrow)}
  /* footer: security row + save */
  const ssc=st.querySelector('.ssc');cl2.classList.add('srow');
  const lockTxt=lockP?lockP.textContent.split(':').pop().trim():'';
  cl2.innerHTML=`<span class="si">${I.sec}</span><span class="stx"><b>${E(H[5]||'Security')}</b><small>Change lock (PIN / Password / Pattern)</small></span>${lockTxt?`<em class="slk">${E(lockTxt)}</em>`:''}<span class="sch">${I.right}</span>`;
  ssc.append(cl2);
  const ssv=st.querySelector('.ssv');sa.removeAttribute('style');sa.classList.add('ssb');
  if(sa.firstChild&&sa.firstChild.nodeType===3)sa.firstChild.nodeValue=sa.firstChild.nodeValue.replace(/^[^\p{L}\p{N}]+/u,'');
  sa.insertAdjacentHTML('afterbegin',I.save);ssv.append(sa);
  root.replaceWith(st);
  /* tabs: each tab shows only its own section */
  const sp=st.querySelector('.stp'),tabs=[...st.querySelectorAll('.stn button')];
  const show=k=>{
    PANE=k;st.dataset.pane=k;
    tabs.forEach(b=>b.classList.toggle('on',b.dataset.t===k));
    st.querySelectorAll('.stp section').forEach(x=>{x.hidden=x.id!=='s-'+k});
    st.querySelectorAll('.stc1,.stc2').forEach(c=>{c.hidden=!c.querySelector('section:not([hidden])')});
    sp.scrollTop=0;
    const nav=st.querySelector('.stn'),on=tabs.find(b=>b.dataset.t===k);
    if(on&&nav.scrollWidth>nav.clientWidth){const r=on.getBoundingClientRect(),n=nav.getBoundingClientRect();nav.scrollLeft+=(r.left-n.left)-(nav.clientWidth-r.width)/2}
  };
  tabs.forEach(b=>b.onclick=()=>show(b.dataset.t));
  show(tabs.some(b=>b.dataset.t===PANE)?PANE:'profile');
  st.addEventListener('click',e=>{if(!e.target.closest('.dd'))ddm.hidden=true});
  try{if(typeof lang!=='undefined'&&lang==='bn'&&typeof tr==='function')tr(st)}catch(e){}
}
try{
  const _s=openSet;
  openSet=function(){const m0=document.getElementById('modal');if(!m0||m0.style.display!=='flex')PANE='profile';const r=_s.apply(this,arguments);try{skinSet()}catch(e){console.warn('settings skin',e)}return r};
  const nv=document.getElementById('nset'),th=document.getElementById('th');
  /* those buttons call openSet() by name, so they already reach the wrapper */
}catch(e){console.warn('settings hook',e)}
})();
