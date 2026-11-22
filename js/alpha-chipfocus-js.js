/* keeps the selected chip centred in its scrolling row, and keeps the row's scroll position across re-renders */
(()=>{const ROWS='.gv-chs',M=document.getElementById('main');if(!M)return;const mem={};let q=0;
const key=r=>{const rs=[...M.querySelectorAll(ROWS)];return rs.indexOf(r)+':'+(r.closest('[id]')||{}).id};
document.addEventListener('scroll',e=>{const t=e.target;if(t&&t.matches&&t.matches(ROWS))mem[key(t)]=t.scrollLeft},true);
const fix=()=>{q=0;M.querySelectorAll(ROWS).forEach(r=>{const on=r.querySelector('.on');if(on){const l=on.offsetLeft-(r.clientWidth-on.offsetWidth)/2;r.scrollLeft=Math.max(0,l);mem[key(r)]=r.scrollLeft}else if(mem[key(r)])r.scrollLeft=mem[key(r)]})};
new MutationObserver(()=>{if(!q)q=requestAnimationFrame(fix)}).observe(M,{childList:true,subtree:true})})();
