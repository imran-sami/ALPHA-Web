/* Keep the clock pill a fixed width so the layout never jitters as seconds change */
(function(){
 var main=document.getElementById('main');if(!main)return;
 var busy=false;
 function lock(){
  if(busy)return;var ck=document.getElementById('ck');if(!ck)return;
  busy=true;
  try{
   var t=ck.textContent,cs=getComputedStyle(ck);
   var best='0',bw=0,m=document.createElement('span');
   m.style.cssText='position:absolute;visibility:hidden;white-space:nowrap;font:'+cs.font+';font-variant-numeric:tabular-nums;letter-spacing:'+cs.letterSpacing;
   document.body.appendChild(m);
   for(var i=0;i<10;i++){m.textContent=String(i).repeat(4);var w=m.getBoundingClientRect().width;if(w>bw){bw=w;best=String(i)}}
   var suf=(t.match(/\s*[^\d:\s]+\s*$/)||[''])[0];
   var wide=t.replace(/\d/g,best);
   var wide2=suf?wide.replace(suf,suf.replace(/[AP]/i,'M')):wide;
   m.textContent=wide2;var W=Math.ceil(m.getBoundingClientRect().width);
   m.textContent=wide;W=Math.max(W,Math.ceil(m.getBoundingClientRect().width));m.remove();
   var pad=parseFloat(cs.paddingRight)||0,gap=parseFloat(cs.columnGap)||7;
   ck.style.minWidth=(W+pad+gap+14+2)+'px';
  }catch(e){}
  busy=false;
 }
 new MutationObserver(function(){setTimeout(lock,0)}).observe(main,{childList:true});
 window.addEventListener('resize',lock);
 setTimeout(lock,300);setInterval(function(){var c=document.getElementById('ck');if(c&&!c.style.minWidth)lock()},1000);
})();
