/* ALPHA lock skin enhancer: decorates the existing lock DOM only. Moves nodes, never replaces them, so every handler keeps working. */
(()=>{
const L=document.getElementById('lock');if(!L)return;
let logoSrc=null;try{const s=document.querySelector('#spl img.al');if(s)logoSrc=s.getAttribute('src')}catch(e){}
const field=(inp,ic,kind)=>{
 if(!inp||inp.closest('.lk-f'))return;
 const w=document.createElement('div');w.className='lk-f lk-'+kind;
 inp.parentNode.insertBefore(w,inp);
 w.innerHTML='<i class="lk-ic" aria-hidden="true"></i>';
 w.appendChild(inp);
 if(kind==='name'){
  w.insertAdjacentHTML('beforeend','<button type="button" class="lk-x" aria-label="Clear name"></button>');
  w.querySelector('.lk-x').onclick=()=>{inp.value='';inp.dispatchEvent(new Event('input',{bubbles:true}));inp.focus();sync()};
 }else{
  w.insertAdjacentHTML('beforeend','<button type="button" class="lk-eye" aria-label="Show"  aria-pressed="false"></button>');
  const b=w.querySelector('.lk-eye');
  b.onclick=()=>{const on=inp.type==='password';inp.type=on?'text':'password';b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?'Hide':'Show');inp.focus()};
 }
 inp.addEventListener('input',sync);
 new MutationObserver(sync).observe(inp,{attributes:true,attributeFilter:['style']});
};
function sync(){
 L.querySelectorAll('.lk-f').forEach(w=>{
  const i=w.querySelector('input');if(!i)return;
  const hide=getComputedStyle(i).display==='none';
  if(w.style.display!==(hide?'none':''))w.style.display=hide?'none':'';
  w.classList.toggle('has',!!i.value);
 });
 if(L.style.display==='none')L.querySelectorAll('.lk-eye.on').forEach(b=>b.click());
}
function split(a,q,l){if(!a||a.dataset.lk)return;a.dataset.lk=1;a.innerHTML='<span class="lk-q"></span><span class="lk-l"></span>';a.firstChild.textContent=q;a.lastChild.textContent=l}
function enhance(){
 try{
  const lg=L.querySelector('.logo img.al');
  if(lg&&logoSrc&&!lg.dataset.lk){lg.dataset.lk=1;lg.removeAttribute('srcset');lg.src=logoSrc}
  field(L.querySelector('#pname'),'lock','name');
  field(L.querySelector('#pin'),'shield','pin');
  field(L.querySelector('#pin2'),'shield','pin');
  const acl=L.querySelector('#acl');
  if(acl){acl.classList.add('lk-row');split(acl.querySelector('a'),'Already have an ALPHA account?','Sign In')}
  const rc=L.querySelector('#rcvl');
  if(rc){const p=rc.parentElement;p.classList.add('lk-row','rc');split(rc,'Locked out?','Recover with phone + email')}
  const rs=L.querySelector('#rs');
  if(rs)rs.parentElement.classList.add('lk-rs');
  const card=L.querySelector('.card');
  if(card&&!card.querySelector('.lk-foot')){
   card.insertAdjacentHTML('beforeend','<div class="lk-foot" aria-hidden="true"><div class="lk-fl"><b></b><i></i><b></b></div><p></p></div>');
  }
  const fp=card&&card.querySelector('.lk-foot p');
  if(fp){const t=(typeof lang!=='undefined'&&lang==='bn')?'আপনার ডেটা • আপনার নিয়ন্ত্রণ':'Your data • Your control';if(fp.textContent!==t)fp.textContent=t}
  sync();
 }catch(e){console.warn('lock skin',e)}
}
enhance();
let q=0;new MutationObserver(()=>{if(q)return;q=1;requestAnimationFrame(()=>{q=0;enhance()})}).observe(L,{childList:true,subtree:true});
setInterval(()=>{if(L.style.display!=='none')sync()},500);
})();
