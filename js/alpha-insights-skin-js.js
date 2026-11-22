/* ALPHA Insights skin: re-dresses the existing tiles after V.ins runs. Buttons, data-k and onclick handlers are kept. */
(()=>{if(window.__alphaInsSkin)return;window.__alphaInsSkin=1;
const S=(p,w)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w||2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const K={
split:{c:['#7fb0ff','#4f8cff','#2a5bff'],i:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 1.9"/>'),a:'M0 70C30 62 55 40 120 44M0 86C34 80 70 60 120 66'},
trend:{c:['#4df0c0','#19d3a2','#0b9f7a'],i:S('<path d="M4 17l5-5 3.5 3.5L20 8"/><path d="M15 8h5v5"/>',2.2),a:'M0 78C22 74 30 50 52 56S86 40 100 28 114 30 120 22V90H0z',f:1},
bal:{c:['#c39bff','#a45cff','#6a3df0'],i:S('<path d="M12 4v16M7 20h10M5 7h14"/><path d="M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z"/>',1.8),a:'M0 76C30 40 70 90 120 40M0 88C40 60 80 94 120 62'},
rhy:{c:['#ffb066','#ff8a3d','#ef4a1f'],i:S('<path d="M12 3c.6 3.4 3.2 5 4.6 7.4A6.6 6.6 0 0 1 12 21a6.6 6.6 0 0 1-6.6-6.6c0-2 .9-3.4 2-4.6.3 1.5 1 2.4 2 2.9-.3-3 .4-6 2.6-7.7z" fill="currentColor" fill-opacity=".25"/>',1.8),a:'M0 80C26 66 40 84 66 62S100 70 120 50M0 90C30 82 60 90 120 76'},
map:{c:['#6fd6ff','#22b8ff','#2f6bff'],i:S('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17M8 14.5h.01M12 14.5h.01M16 14.5h.01"/>',1.9),a:'M0 74C28 54 60 82 90 50S112 44 120 40M0 88C40 78 80 90 120 70'},
stk:{c:['#c8a0ff','#a66bff','#7a3cf0'],i:S('<path d="M12 3l8 4.4v9.2L12 21l-8-4.4V7.4z"/><path d="M4 7.4l8 4.5 8-4.5M12 12v9"/>',1.8),a:'M0 72C30 52 60 76 90 48S110 52 120 44M0 86C34 70 74 86 120 62'},
score:{c:['#ff8a92','#ff4d5e','#d81f3f'],i:S('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><path d="M12 12l7-7M16.5 3.5l.5 3 3 .5"/>',1.8),a:'M0 70C40 70 70 50 120 36M0 86C40 84 80 70 120 56'}};
const ARR=S('<path d="M7 17L17 7M9 7h8v8"/>',2.2);
const art=(k,c)=>{const d=K[k],id='ia'+k;return `<svg class="ins-art" viewBox="0 0 120 90" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="${id}r" cx="1" cy="1" r="1"><stop offset="0" stop-color="${c[1]}" stop-opacity=".55"/><stop offset="1" stop-color="${c[1]}" stop-opacity="0"/></radialGradient><linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[1]}" stop-opacity=".55"/><stop offset="1" stop-color="${c[1]}" stop-opacity="0"/></linearGradient></defs><rect width="120" height="90" fill="url(#${id}r)"/>${d.f?`<path d="${d.a}" fill="url(#${id}f)" stroke="${c[0]}" stroke-width="1.6" vector-effect="non-scaling-stroke"/>`:d.a.split('M').filter(Boolean).map((p,i)=>`<path d="M${p}" fill="none" stroke="${c[i?2:0]}" stroke-opacity="${i?.45:.7}" stroke-width="1.4" vector-effect="non-scaling-stroke"/>`).join('')}</svg>`};
function badge(k){try{const n=Object.keys(C).length;
 if(k==='split'){const c=all().filter(a=>a.s>Date.now()-7*864e5).length;return[c,'sessions']}
 if(k==='trend')return['14d','data'];if(k==='bal')return[n,'areas'];if(k==='rhy')return['7×24','data'];
 if(k==='map')return[1,'map'];if(k==='stk')return[n,'categories'];if(k==='score')return[100,'points']}catch(e){}return['','']}
function skin(){const m=document.getElementById('main');if(!m||m.querySelector('.ins-grid'))return;
 const g=m.querySelector(':scope>.grid'),h=m.querySelector(':scope>h1'),sub=m.querySelector(':scope>.sub');if(!g||!h||!g.querySelector('.tile[data-k]'))return;
 const hd=document.createElement('div');hd.className='ins-head';const l=document.createElement('div');
 h.before(hd);l.append(h);if(sub)l.append(sub);hd.append(l);
 hd.insertAdjacentHTML('beforeend','<div class="ins-hero" aria-hidden="true"><svg viewBox="0 0 220 70" preserveAspectRatio="none"><defs><linearGradient id="iaH" x1="0" x2="1"><stop offset="0" stop-color="#4f8cff"/><stop offset=".55" stop-color="#a45cff"/><stop offset="1" stop-color="#ff8a3d"/></linearGradient></defs><path d="M0 52C40 20 90 70 140 34S200 14 220 8" fill="none" stroke="url(#iaH)" stroke-width="2" stroke-opacity=".8"/><path d="M0 62C50 36 100 74 150 46S205 30 220 24" fill="none" stroke="url(#iaH)" stroke-width="1.2" stroke-opacity=".5"/></svg><span>Smarter files.</span><span>Better you.</span></div>');
 g.classList.add('ins-grid');
 g.querySelectorAll('.tile[data-k]').forEach(b=>{const k=b.dataset.k,d=K[k];if(!d)return;
  const t=(b.querySelector('b')||{}).textContent||'',s=((b.querySelectorAll('.mu')[0])||{}).textContent||'',v=((b.querySelectorAll('.mu')[1])||{}).textContent||'View details ›',bd=badge(k);
  b.style.setProperty('--c0',d.c[0]);b.style.setProperty('--c1',d.c[1]);b.style.setProperty('--c2',d.c[2]);
  b.innerHTML=art(k,d.c)+`<span class="ins-ic">${d.i}</span><span class="ins-bd"><b>${bd[0]}</b><small>${bd[1]}</small></span><span class="ins-tx"><span class="ins-t">${t}</span>${k==='trend'?'':`<span class="ins-s">${s}</span>`}<span class="ins-v">${v}</span></span><span class="ins-go">${ARR}</span>`});
 try{if(typeof tr==='function')tr(m)}catch(e){}}
try{const _i=V.ins;V.ins=function(){const r=_i.apply(this,arguments);try{if(view==='ins')skin()}catch(e){console.warn('insights skin',e)}return r};
 if(typeof view!=='undefined'&&view==='ins')skin()}catch(e){console.warn('insights hook',e)}
})();
