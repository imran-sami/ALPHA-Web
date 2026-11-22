/* Top-right profile + lock icons.
   WEB: Home only, scroll away with the page.
   ANDROID app: header (ALPHA logo + profile + lock) stays pinned like before, but is shown on Home only. */
(function(){
 var fab=document.querySelector('.fab'),main=document.getElementById('main');
 if(!fab||!main)return;
 var native=!!window.__ALPHA_ANDROID;
 try{if(!native&&window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform())native=true}catch(e){}
 var raf=0;
 function sync(){
  raf=0;
  var home=false;
  try{home=(typeof view!=='undefined')&&view==='dash'}catch(e){}
  fab.classList.toggle('fab-off',!home);
  var lg=document.querySelector('.mlogo');
  if(native){
   fab.style.transform='';
   if(lg)lg.classList.toggle('mn-off',!home);
  }else{
   fab.style.transform=home?'translateY('+(-main.scrollTop)+'px)':'';
   if(lg)lg.classList.remove('mn-off');
  }
 }
 function q(){if(!raf)raf=requestAnimationFrame(sync)}
 main.addEventListener('scroll',q,{passive:true});
 new MutationObserver(q).observe(main,{childList:true});
 document.addEventListener('click',function(){setTimeout(q,0);setTimeout(q,120)},true);
 window.addEventListener('resize',q);
 setInterval(sync,400);
 sync();
})();
