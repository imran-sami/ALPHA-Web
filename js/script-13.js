/* ===== v13: inline preview inside the file list (thumbnails + expandable preview per file) ===== */
(()=>{
const st=document.createElement('style');st.textContent=`
.tk .thw{position:relative;flex:none;width:46px;height:46px;border-radius:12px;overflow:hidden;display:block;background:var(--card)}
.tk .thw img{width:100%;height:100%;object-fit:cover;display:block}
.tk .thw b{position:absolute;right:3px;bottom:3px;font-size:10px;line-height:1;background:rgba(0,0,0,.65);color:#fff;border-radius:6px;padding:3px 4px}
.tk .pvb{flex:none;padding:6px 10px}
.pvbox{margin:-6px 0 14px;padding:12px;border:1px solid var(--a);border-radius:20px;background:var(--card);box-shadow:0 10px 30px -14px var(--glow)}
.pvbox img,.pvbox video{display:block;margin:0 auto;max-width:100%;max-height:60vh;border-radius:12px;background:#000}
.pvbox img{background:none}
.pvbox audio{width:100%}
.pvbox iframe{width:100%;height:60vh;border:0;border-radius:12px;background:#fff}
.pvbox .pvx{max-height:55vh;overflow:auto;line-height:1.6;overflow-wrap:anywhere}
.pvbox .pvx pre{white-space:pre-wrap;overflow-wrap:anywhere;font:13px/1.55 ui-monospace,Menlo,Consolas,monospace;margin:0}
.pvbox .pvx p{margin:0 0 .7em}.pvbox .pvx h1,.pvbox .pvx h2,.pvbox .pvx h3,.pvbox .pvx h4{margin:.8em 0 .4em;font-size:1.1em}
.pvbox .pvx table{border-collapse:collapse}.pvbox .pvx td,.pvbox .pvx th{border:1px solid var(--bd);padding:5px 9px;text-align:left;vertical-align:top;font-size:13px}
.pvbox .pvx .grid2 thead th{background:var(--bg2);position:sticky;top:0}
.pvbox .pvx .rn{color:var(--mu)}
.pvbox .pvx .slide{border:1px solid var(--bd);border-radius:14px;padding:10px 12px;margin-bottom:8px}
.pvbox .pvx .tw{padding:0}.pvbox .pvx .note{font-size:12px;color:var(--mu)}
.pvbox .pvf{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;align-items:center}
.pvbox .pvf .mu{flex:1;font-size:12px}
.pvbox .ld{text-align:center;color:var(--mu);padding:18px}
.pvbox .pvm{box-shadow:0 0 0 1px var(--bd)}
.pvbox .opl{border-radius:12px}
`;document.head.appendChild(st);

const TH=new Map(),Q=[];let busy=0,openBox=null;
const kindsPrev=new Set(['img','vid','aud','pdf','docx','pptx','xlsx','ole','csv','md','json','html','txt']);
const dispose=b=>{if(!b)return;if(b._ofx){try{b._ofx.destroy&&b._ofx.destroy()}catch(e){}b._ofx=null}const pp=b.querySelector('.pvpdf');if(pp){try{pp._io&&pp._io.disconnect();pp._doc&&pp._doc.destroy()}catch(e){}}if(noPrev.u)noPrev.u.splice(0).forEach(x=>URL.revokeObjectURL(x));b.querySelectorAll('video,audio').forEach(m=>{try{m.pause();m.removeAttribute('src');m.load()}catch(e){}});if(b._u)URL.revokeObjectURL(b._u);b.remove()};
const pump=async()=>{if(busy)return;busy=1;while(Q.length)await Q.shift()();busy=0};
const timeout=(p,ms)=>Promise.race([p,new Promise(r=>setTimeout(()=>r(null),ms))]);

async function mkThumb(f,k){
 if(f.size>40e6)return null;
 const blob=await rdBlob(f,RD.mime(f)),u=URL.createObjectURL(blob);
 try{
  const cv=document.createElement('canvas');cv.width=cv.height=96;const g=cv.getContext('2d');
  const draw=(src,w,h)=>{const s=Math.max(96/w,96/h),dw=w*s,dh=h*s;g.drawImage(src,(96-dw)/2,(96-dh)/2,dw,dh);return cv.toDataURL('image/jpeg',.72)};
  if(k=='img'){const im=new Image();im.src=u;await timeout(im.decode().catch(()=>null),8000);return im.naturalWidth?draw(im,im.naturalWidth,im.naturalHeight):null}
  const v=document.createElement('video');v.muted=true;v.playsInline=true;v.preload='auto';v.src=u;
  await timeout(new Promise((res,rej)=>{v.onloadeddata=res;v.onerror=rej}).catch(()=>null),8000);
  if(!v.videoWidth)return null;
  v.currentTime=Math.min(1,(v.duration||2)/10);await timeout(new Promise(r=>{v.onseeked=r}),4000);
  return v.videoWidth?draw(v,v.videoWidth,v.videoHeight):null;
 }catch(e){return null}finally{URL.revokeObjectURL(u)}}
function thumb(f,k){if(TH.has(f.id))return Promise.resolve(TH.get(f.id));return new Promise(res=>{Q.push(async()=>{let r=null;try{r=await mkThumb(f,k)}catch(e){}TH.set(f.id,r);res(r)});pump()})}

const NPV=new Map();let npvId=0;
async function noPrev(f,blob,why){
 const u=URL.createObjectURL(blob);(noPrev.u=noPrev.u||[]).push(u);let sh=false;
 try{const fl=new File([blob],f.name,{type:blob.type||'application/octet-stream'});if(navigator.canShare&&navigator.canShare({files:[fl]}))sh=true}catch(e){}
 const id='np'+(++npvId);NPV.set(id,()=>navigator.share({files:[new File([blob],f.name,{type:blob.type||'application/octet-stream'})],title:f.name}).catch(()=>{}));
 return '<div class="pvx"><div style="text-align:center;padding:14px 6px"><div style="font-size:34px">📄</div><b style="overflow-wrap:anywhere">'+esc(f.name)+'</b><p class="mu" style="margin:8px 0 12px">'+esc(why||"This format can't be shown inside the app on this browser.")+' The file is safe: save it or open it in another app.</p><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><a class="chip" href="'+u+'" download="'+esc(f.name)+'" style="text-decoration:none">⬇ Save file</a>'+(sh?'<button class="chip" onclick="window.__npv(\''+id+'\')">↗ Open with…</button>':'')+'</div></div></div>'}
window.__npv=id=>{const fn=NPV.get(id);if(fn)fn()};
async function pdfInline(hold,blob){
 if(!hold)return;const data=new Uint8Array(await blob.arrayBuffer());let from=0,err=null;
 while(from<RD.pdfAttempts){let r;try{r=await RD.openPdf(data,from)}catch(e){if(e&&e.name=='PasswordException')throw e;throw err||e}
  if(!hold.isConnected){r.doc.destroy();return}
  if(await buildInline(hold,r.doc))return;
  try{r.doc.destroy()}catch(e){}err=new Error('could not draw the page');from=r.m+1}
 throw err}
async function buildInline(hold,doc){
 try{hold._io&&hold._io.disconnect()}catch(e){}hold._doc=doc;const N=doc.numPages,w=Math.max(200,Math.min(hold.clientWidth||320,900)),dpr=Math.min(window.devicePixelRatio||1,2);
 hold.innerHTML='';hold.style.cssText='max-height:60vh;overflow:auto;border-radius:12px;background:#fff';
 const pgs=[];for(let i=1;i<=N;i++){const d=document.createElement('div');d.dataset.n=i;d.style.cssText='margin:0 auto 6px;background:#fff;min-height:'+Math.round(w*1.4)+'px;width:'+w+'px;max-width:100%';hold.appendChild(d);pgs.push(d)}
 const draw=async d=>{if(d._d)return;d._d=1;try{const pg=await doc.getPage(+d.dataset.n),v0=pg.getViewport({scale:1}),sc=w/v0.width,v=pg.getViewport({scale:sc*dpr}),cv=document.createElement('canvas');cv.width=Math.floor(v.width);cv.height=Math.floor(v.height);cv.style.cssText='width:100%;height:auto;display:block';await pg.render({canvas:cv,canvasContext:cv.getContext('2d'),viewport:v}).promise;d.style.minHeight='0';d.replaceChildren(cv)}catch(e){d._d=0;console.warn('pdf preview page',e)}};
 await draw(pgs[0]);if(!hold.querySelector('canvas'))return false;
 if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);draw(e.target)}}),{root:hold,rootMargin:'400px 0px'});pgs.forEach(d=>io.observe(d));hold._io=io}else{for(const d of pgs.slice(1,6))await draw(d)}
 return true}

async function fill(box,f,k){
 let blob=await rdBlob(f,k=='pdf'?'application/pdf':RD.mime(f));if(!box.isConnected)return;
 const hd=new Uint8Array(await blob.slice(0,1024).arrayBuffer()),sn=RD.sniff(hd);if(sn&&sn[0]=='zip'&&['docx','pptx','xlsx'].includes(k)){}else if(sn&&sn[0]=='vid'&&k=='aud'){blob=new Blob([blob],{type:/\.(m4a|aac)$/i.test(f.name)?'audio/mp4':(blob.type||'audio/mp4')})}else if(sn&&sn[0]!==k){if(['img','vid','aud','pdf','ole'].includes(sn[0])){k=sn[0];blob=new Blob([blob],{type:sn[1]})}else throw new Error('nopreview')}else if(k=='pdf'&&!(sn&&sn[0]=='pdf')&&!new TextDecoder('latin1').decode(hd).includes('%PDF'))throw new Error('not a pdf')
 const u=box._u=URL.createObjectURL(blob);let h='';box._b=blob;
 if(k=='img')h=`<img src="${u}" alt="">`;
 else if(k=='vid')h=`<video src="${u}" preload="metadata"></video>`;
 else if(k=='aud')h=`<audio src="${u}" preload="metadata"></audio>`;
 else if(k=='pdf')h='<div class="pvpdf"><div class="ld">Loading PDF…</div></div>';
 else{
  let x='';const np=k=='txt'&&!(fcat(f)=='code'&&!/^(md|markdown)$/.test(ext(f.name)));
  if(k=='docx'||k=='pptx'||np){box._mount={k,np};x='\u0000'}
  else if(k=='xlsx'){const z=await RD.unzip(await blob.arrayBuffer());
   x=await(async()=>{const sh=await RD.xlsxSheets(z);return RD.gridHtml(sh[0].rows.slice(0,40),true,39)+(sh.length>1?`<div class="note">${sh.length} sheets — open full screen to see them all.</div>`:'')})()}
  else if(k=='ole'){const t=RD.oleText(new Uint8Array(await blob.arrayBuffer()));x='<pre>'+esc(t.slice(0,8000))+(t.length>8000?'\n…':'')+'</pre>'}
  else{const t=await blob.slice(0,200000).text();
   if(k=='csv'){const d=t.split('\n',1)[0].split(';').length>t.split('\n',1)[0].split(',').length?';':',';x=RD.gridHtml(RD.parseCsv(t,d).slice(0,40),true,39)}
   else if(k=='md')x=RD.md(t);
   else x='<pre>'+esc(t.slice(0,8000))+(t.length>8000||f.size>200000?'\n…':'')+'</pre>'}
  h=x=='\u0000'?'<div class="pvm" style="position:relative;height:min(64vh,560px);min-height:300px;border-radius:12px;overflow:hidden;background:#fff"></div>':`<div class="pvx">${x||'<span class="mu">Nothing to show.</span>'}</div>`}
 box.innerHTML=h+`<div class="pvf"><button class="chip" data-o="1">⛶ Open full screen</button><span class="mu">${esc(f.name)}</span></div>`;
 box.querySelector('[data-o]').onclick=()=>openViewerFS(f.id);
 const mt=box._mount,mh=box.querySelector('.pvm');
 if(mt&&mh){try{if(mt.np){const t=await blob.slice(0,3e6).text();box._ofx=OFX.notepad(t,mh,{inline:1,fill:1,name:f.name,blob,toast})}else{const z=await RD.unzip(await blob.arrayBuffer());if(!box.isConnected)return;box._ofx=mt.k=='docx'?await OFX.docx(z,mh,{inline:1,fill:1}):await OFX.pptx(z,mh,{inline:1,fill:1})}}catch(e){console.warn('inline preview',e);throw e}}
 const raw=async why=>{if(!box.isConnected)return;const x=box.querySelector('img,video,audio,iframe,.pvx,.pvpdf');if(x){const t=document.createElement('div');t.innerHTML=await noPrev(f,blob,typeof why=='string'?why:'');x.replaceWith(t.firstChild)}};
 if(k=='pdf')pdfInline(box.querySelector('.pvpdf'),blob).catch(e=>{const h=box.querySelector('.pvpdf');if(h&&navigator.pdfViewerEnabled&&!window.__pdfEmb){h.outerHTML='<iframe src="'+u+'" title="PDF" style="width:100%;height:60vh;border:0;border-radius:12px;background:#fff"></iframe>'}else raw("The PDF preview failed"+(e&&e.message?' ['+String(e.message).slice(0,120)+']':'')+'.')});
 const im=box.querySelector('img');if(im)im.onerror=async()=>{im.onerror=null;const u2=await RD.imgFallback(blob);if(u2){im.onerror=raw;im.src=u2}else raw()};
 const md2=box.querySelector('video,audio');if(md2){box._ofx=OFX.player(md2,{inline:1,title:f.name,sub:sz(f.size),key:f.id,blob});md2.onerror=()=>RD.mediaFb(md2,blob,raw);if(md2.tagName=='VIDEO')md2.onloadedmetadata=()=>{if(!md2.videoWidth&&md2.duration>0)RD.mediaFb(md2,blob,null,true)}}}

async function toggle(row,f,k,btn){
 const had=row.nextElementSibling&&row.nextElementSibling.classList.contains('pvbox');
 if(openBox){const pb=document.querySelector('.pvb.on');if(pb)pb.classList.remove('on');dispose(openBox);openBox=null}
 if(had)return;
 btn.classList.add('on');
 const box=document.createElement('div');box.className='pvbox';box.innerHTML='<div class="ld">Loading preview…</div>';row.insertAdjacentElement('afterend',box);openBox=box;
 try{await fill(box,f,k);box.scrollIntoView({block:'nearest',behavior:'smooth'})}
 catch(e){if(box.isConnected){try{box.innerHTML=await noPrev(f,await rdBlob(f,RD.mime(f)),'')+'<div class="pvf"><button class="chip" data-o="1">⛶ Open full screen</button></div>';box.querySelector('[data-o]').onclick=()=>openViewerFS(f.id)}catch(x){box.remove()}}}}

async function enhance(){
 if(view!='fc')return;openBox=null;
 const rs=[...document.querySelectorAll('#main .tk[data-f]')];if(!rs.length)return;
 const M=new Map((await rows()).map(f=>[String(f.id),f])),io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);th(e.target)}}),{rootMargin:'200px'}):null;
 const th=async row=>{const f=M.get(row.dataset.f),k=f&&RD.kindOf(f);if(!f||(k!='img'&&k!='vid'))return;const d=await thumb(f,k);if(!d||!row.isConnected)return;const ic=row.firstElementChild;ic.outerHTML=`<span class="thw"><img src="${d}" alt="">${k=='vid'?'<b>▶</b>':''}</span>`};
 for(const row of rs){const f=M.get(row.dataset.f);if(!f||(!f.d&&!f.ch))continue;const k=RD.kindOf(f);
  if(kindsPrev.has(k)){const tail=row.lastElementChild,b=document.createElement('button');b.className='chip sm pvb';b.title='Preview here';b.textContent='👁';b.onclick=e=>{e.stopPropagation();e.preventDefault();toggle(row,f,k,b)};row.insertBefore(b,tail)}
  if(k=='img'||k=='vid'){if(io)io.observe(row);else th(row)}}}

const _fc=fcPage;fcPage=async function(k){await _fc(k);enhance()};
})();
