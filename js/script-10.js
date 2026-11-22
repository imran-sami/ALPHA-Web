/* ===== OFX: shared helpers (fullscreen, inflate fallback, ID3 reader, css injector) ===== */
(()=>{
const O=window.OFX=window.OFX||{};
O.css=(id,t)=>{if(document.getElementById(id))return;const s=document.createElement('style');s.id=id;s.textContent=t;document.head.appendChild(s)};
O.h=(tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e};
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
O.esc=E;
O.ios=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);

/* ---------- fullscreen: real Fullscreen API (standard / webkit / ms) with a CSS fallback for browsers that have none (e.g. iPhone) ---------- */
const fsEl=()=>document.fullscreenElement||document.webkitFullscreenElement||document.msFullscreenElement||null;
O.fsEl=fsEl;
O.canFS=()=>{const d=document.documentElement;return !!(d.requestFullscreen||d.webkitRequestFullscreen||d.msRequestFullscreen)};
O.enterFS=async el=>{const f=el.requestFullscreen||el.webkitRequestFullscreen||el.msRequestFullscreen;if(!f)return false;try{const r=f.call(el);if(r&&r.then)await r;return true}catch(e){return false}};
O.exitFS=()=>{try{const f=document.exitFullscreen||document.webkitExitFullscreen||document.msExitFullscreen;if(f){const r=f.call(document);if(r&&r.catch)r.catch(()=>{})}}catch(e){}};
O.isFS=el=>fsEl()===el||el.classList.contains('pfs');
O.toggleFS=async el=>{
 if(O.isFS(el)){if(fsEl()===el)O.exitFS();el.classList.remove('pfs');document.documentElement.classList.remove('pfs-lock');el.dispatchEvent(new Event('ofx-fs'));return false}
 const ok=O.canFS()?await O.enterFS(el):false;
 if(!ok){el.classList.add('pfs');document.documentElement.classList.add('pfs-lock')}
 el.dispatchEvent(new Event('ofx-fs'));return true};
['fullscreenchange','webkitfullscreenchange','MSFullscreenChange'].forEach(n=>document.addEventListener(n,()=>{document.querySelectorAll('.ofx-fs-watch').forEach(e=>e.dispatchEvent(new Event('ofx-fs')))}));
O.css('ofx-core-css','.ofx-fill{position:absolute!important;left:0;top:0;right:0;bottom:0;height:auto!important}.pfs{position:fixed!important;left:0!important;top:0!important;right:0!important;bottom:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;z-index:2147483000!important;margin:0!important;border-radius:0!important}html.pfs-lock,html.pfs-lock body{overflow:hidden!important}');

/* ---------- raw-deflate fallback for browsers without DecompressionStream('deflate-raw') ---------- */
O.inflate=function(src){
 let sp=0,bb=0,bn=0,out=new Uint8Array(Math.max(4096,src.length*4)),op=0;
 const bits=n=>{while(bn<n){if(sp>=src.length)throw new Error('inflate: eof');bb|=src[sp++]<<bn;bn+=8}const v=bb&((1<<n)-1);bb>>>=n;bn-=n;return v};
 const room=n=>{if(op+n>out.length){let m=out.length*2;while(m<op+n)m*=2;const o=new Uint8Array(m);o.set(out.subarray(0,op));out=o}};
 const mk=(lens,n)=>{const count=new Uint16Array(16),symbol=new Uint16Array(n),offs=new Uint16Array(16);for(let i=0;i<n;i++)count[lens[i]]++;count[0]=0;for(let i=1;i<15;i++)offs[i+1]=offs[i]+count[i];for(let i=0;i<n;i++)if(lens[i])symbol[offs[lens[i]]++]=i;return{count,symbol}};
 const dec=h=>{let code=0,first=0,index=0;for(let len=1;len<=15;len++){code|=bits(1);const c=h.count[len];if(code-c<first)return h.symbol[index+(code-first)];index+=c;first+=c;first<<=1;code<<=1}throw new Error('inflate: bad code')};
 const LB=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258],LE=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],
  DB=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],DE=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
 let FL=null,FD=null;
 const codes=(lh,dh)=>{for(;;){const s=dec(lh);if(s<256){room(1);out[op++]=s}else if(s==256)return;else{const i=s-257;if(i>=29)throw new Error('inflate: bad len');const len=LB[i]+bits(LE[i]),ds=dec(dh);if(ds>=30)throw new Error('inflate: bad dist');const d=DB[ds]+bits(DE[ds]);if(d>op)throw new Error('inflate: dist');room(len);for(let k=0;k<len;k++){out[op]=out[op-d];op++}}}};
 let last;
 do{last=bits(1);const t=bits(2);
  if(t==0){sp-=bn>>3;bb=0;bn=0;if(sp+4>src.length)throw new Error('inflate: eof');const len=src[sp]|(src[sp+1]<<8);sp+=4;if(sp+len>src.length)throw new Error('inflate: eof');room(len);out.set(src.subarray(sp,sp+len),op);op+=len;sp+=len}
  else if(t==1){if(!FL){const l=new Uint8Array(288);for(let i=0;i<144;i++)l[i]=8;for(let i=144;i<256;i++)l[i]=9;for(let i=256;i<280;i++)l[i]=7;for(let i=280;i<288;i++)l[i]=8;FL=mk(l,288);const d=new Uint8Array(30).fill(5);FD=mk(d,30)}codes(FL,FD)}
  else if(t==2){const nl=bits(5)+257,nd=bits(5)+1,nc=bits(4)+4,ord=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ls=new Uint8Array(320);for(let i=0;i<nc;i++)ls[ord[i]]=bits(3);const ch=mk(ls,19);ls.fill(0);let i=0;
   while(i<nl+nd){const s=dec(ch);if(s<16)ls[i++]=s;else{let v=0,r;if(s==16){if(!i)throw new Error('inflate: bad rep');v=ls[i-1];r=3+bits(2)}else if(s==17)r=3+bits(3);else r=11+bits(7);if(i+r>nl+nd)throw new Error('inflate: bad rep');while(r--)ls[i++]=v}}
   codes(mk(ls.subarray(0,nl),nl),mk(ls.subarray(nl,nl+nd),nd))}
  else throw new Error('inflate: bad block')
 }while(!last);
 return out.slice(0,op)};
O.inflateAuto=async u=>{
 if(typeof DecompressionStream!='undefined'&&typeof Blob!='undefined'&&Blob.prototype.stream){try{return new Uint8Array(await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer())}catch(e){}}
 return O.inflate(u)};

/* ---------- zip reader (docx / pptx / xlsx / odf / epub) — works without DecompressionStream ---------- */
O.unzip=async function(buf){const u=new Uint8Array(buf),dv=new DataView(u.buffer,u.byteOffset,u.byteLength);let e=u.length-22;while(e>=0&&dv.getUint32(e,true)!=0x06054b50)e--;if(e<0)throw new Error('zip');
 const n=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const ent={},dc=new TextDecoder();
 for(let i=0;i<n;i++){if(dv.getUint32(p,true)!=0x02014b50)break;const m=dv.getUint16(p+10,true),cs=dv.getUint32(p+20,true),us=dv.getUint32(p+24,true),nl=dv.getUint16(p+28,true),el=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),lo=dv.getUint32(p+42,true);ent[dc.decode(u.subarray(p+46,p+46+nl))]={m,cs,us,lo};p+=46+nl+el+cl}
 const bin=async name=>{const f=ent[name];if(!f)return null;const l2=dv.getUint16(f.lo+26,true)+dv.getUint16(f.lo+28,true),s=u.subarray(f.lo+30+l2,f.lo+30+l2+f.cs);if(f.m==0)return s;return O.inflateAuto(s)};
 return{names:Object.keys(ent),ent,bin,get:async name=>{const b=await bin(name);return b?dc.decode(b):null}}};

/* ---------- ID3v2 (title / artist / cover picture) for mp3 ---------- */
O.id3=async blob=>{
 try{const head=new Uint8Array(await blob.slice(0,10).arrayBuffer());if(head[0]!=0x49||head[1]!=0x44||head[2]!=0x33)return null;
  const ver=head[3],sz=((head[6]&127)<<21)|((head[7]&127)<<14)|((head[8]&127)<<7)|(head[9]&127);if(!sz||sz>16e6)return null;
  const u=new Uint8Array(await blob.slice(10,10+Math.min(sz,8e6)).arrayBuffer()),dv=new DataView(u.buffer),res={};let p=0;
  const txt=(a,enc)=>{try{if(enc==1||enc==2){let le=enc==1&&!(a[0]==0xFE&&a[1]==0xFF);if(a[0]==0xFF&&a[1]==0xFE){a=a.subarray(2);le=true}else if(a[0]==0xFE&&a[1]==0xFF){a=a.subarray(2);le=false}return new TextDecoder(le?'utf-16le':'utf-16be').decode(a).replace(/\0+$/,'')}return new TextDecoder(enc==3?'utf-8':'windows-1252').decode(a).replace(/\0+$/,'')}catch(e){return''}};
  while(p+10<=u.length&&u[p]){const id=String.fromCharCode(u[p],u[p+1],u[p+2],u[p+3]);let fs=ver==4?((u[p+4]&127)<<21)|((u[p+5]&127)<<14)|((u[p+6]&127)<<7)|(u[p+7]&127):dv.getUint32(p+4);const b=p+10;if(fs<=0||b+fs>u.length)break;const d=u.subarray(b,b+fs);
   if(id=='TIT2')res.title=txt(d.subarray(1),d[0]);else if(id=='TPE1')res.artist=txt(d.subarray(1),d[0]);else if(id=='TALB')res.album=txt(d.subarray(1),d[0]);
   else if(id=='APIC'&&!res.pic){const enc=d[0];let i=1;while(i<d.length&&d[i])i++;const mime=String.fromCharCode(...d.subarray(1,i));i+=2;if(enc==1||enc==2){while(i+1<d.length&&(d[i]||d[i+1]))i+=2;i+=2}else{while(i<d.length&&d[i])i++;i++}const img=d.subarray(i);if(img.length>100)res.pic=new Blob([img.slice()],{type:/^image\//.test(mime)?mime:(img[0]==0x89?'image/png':'image/jpeg')})}
   p=b+fs}
  return res.title||res.artist||res.pic?res:null}catch(e){return null}};
})();

/* ===== OFX: premium audio / video player (wraps an existing <audio>/<video> element) ===== */
(()=>{
const O=window.OFX,E=O.esc;
O.css('ofx-player-css',`
.opl{position:relative;width:100%;margin:0 auto;background:#000;color:#fff;border-radius:14px;overflow:hidden;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent;outline:none;font:13px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;touch-action:manipulation;--pa:var(--a,#6d4aff)}
.opl *{box-sizing:border-box}
.opl.opl-vid{height:100%;min-height:200px}
.opl.opl-in.opl-vid{height:auto;aspect-ratio:16/9;max-height:62vh}
@supports not (aspect-ratio:1){.opl.opl-in.opl-vid{height:min(56vw,62vh)}}
.opl.opl-aud{background:linear-gradient(160deg,#16132b,#0a0a14 60%,#101a2a);border-radius:20px;max-width:640px}
.opl-stage{position:relative;width:100%;height:100%}
.opl.opl-aud .opl-stage{height:auto;padding:22px 18px 4px;display:flex;flex-direction:column;align-items:center;gap:12px}
.opl .opl-stage video{display:block;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:contain;background:#000!important;border-radius:0!important}
.opl .opl-stage audio{display:none!important}
.opl-art{position:relative;width:min(220px,56vw);aspect-ratio:1/1;border-radius:22px;overflow:hidden;background:linear-gradient(135deg,var(--pa),#00b8d9);box-shadow:0 18px 50px -16px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center}
@supports not (aspect-ratio:1){.opl-art{height:min(220px,56vw)}}
.opl-art img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.opl-art canvas{position:absolute;inset:0;width:100%;height:100%}
.opl-art .opl-note{position:relative;font-size:64px;filter:drop-shadow(0 4px 12px rgba(0,0,0,.4))}
.opl-art.has-img .opl-note{display:none}
.opl-art.has-img canvas{opacity:.55;mix-blend-mode:screen}
.opl-meta{text-align:center;max-width:100%;padding:0 6px}
.opl-meta b{display:block;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.opl-meta span{display:block;margin-top:4px;color:rgba(255,255,255,.6);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.opl-ov{position:absolute;left:0;top:0;right:0;bottom:64px;display:flex;align-items:center;justify-content:center;pointer-events:none}
.opl.opl-aud .opl-ov{display:none}
.opl-big{width:68px;height:68px;border-radius:50%;background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;pointer-events:auto;cursor:pointer;transition:transform .15s,opacity .2s;box-shadow:0 10px 30px -8px rgba(0,0,0,.7)}
.opl-big:active{transform:scale(.92)}
.opl-big svg{width:34px;height:34px;fill:#fff}
.opl.playing .opl-big{opacity:0;pointer-events:none}
.opl.busy .opl-big{opacity:0}
.opl-spin{position:absolute;width:46px;height:46px;border-radius:50%;border:3px solid rgba(255,255,255,.25);border-top-color:#fff;animation:ppspin .8s linear infinite;display:none}
.opl.busy .opl-spin{display:block}
@keyframes ppspin{to{transform:rotate(360deg)}}
.opl-fx{position:absolute;top:0;bottom:64px;width:34%;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0;font-weight:700;font-size:15px;background:rgba(255,255,255,.14);border-radius:50%/60%}
.opl-fx.l{left:0;border-top-left-radius:0;border-bottom-left-radius:0}.opl-fx.r{right:0;border-top-right-radius:0;border-bottom-right-radius:0}
.opl-fx.on{animation:ppfx .55s ease-out}
@keyframes ppfx{0%{opacity:0}20%{opacity:1}100%{opacity:0}}
.opl-bar{position:absolute;left:0;right:0;bottom:0;padding:26px 12px 8px;background:linear-gradient(transparent,rgba(0,0,0,.78));transition:opacity .25s,transform .25s;z-index:3}
.opl.opl-aud .opl-bar{position:relative;background:none;padding:6px 14px 12px}
.opl.hide .opl-bar{opacity:0;transform:translateY(8px);pointer-events:none}
.opl.hide{cursor:none}
.opl-seek{position:relative;height:22px;display:flex;align-items:center}
.opl-track{position:absolute;left:0;right:0;height:4px;border-radius:3px;background:rgba(255,255,255,.22);overflow:hidden;pointer-events:none;transition:height .12s}
.opl-seek:hover .opl-track{height:6px}
.opl-buf{position:absolute;left:0;top:0;bottom:0;width:0;background:rgba(255,255,255,.28)}
.opl-pg{position:absolute;left:0;top:0;bottom:0;width:0;background:var(--pa)}
.opl-ab{position:absolute;top:-1px;bottom:-1px;background:rgba(255,214,0,.55);display:none}
.opl-seek input{position:relative;width:100%;height:22px;margin:0;background:none;-webkit-appearance:none;appearance:none;cursor:pointer;z-index:1}
.opl input[type=range]{-webkit-appearance:none;appearance:none;background:transparent;outline:none}
.opl input[type=range]::-webkit-slider-runnable-track{height:22px;background:transparent}
.opl input[type=range]::-moz-range-track{height:22px;background:transparent}
.opl-seek input::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 0 3px rgba(109,74,255,.35),0 2px 6px rgba(0,0,0,.5);margin-top:4px;transition:transform .12s}
.opl-seek input::-moz-range-thumb{width:14px;height:14px;border:0;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.5)}
.opl-seek:hover input::-webkit-slider-thumb{transform:scale(1.25)}
.opl-tip{position:absolute;bottom:26px;transform:translateX(-50%);background:rgba(20,20,30,.95);border:1px solid rgba(255,255,255,.15);padding:4px 8px;border-radius:8px;font-size:12px;display:none;pointer-events:none;white-space:nowrap}
.opl-row{display:flex;align-items:center;gap:2px;flex-wrap:nowrap}
.opl-row .sp{flex:1;min-width:4px}
.opl-b{flex:none;height:36px;min-width:36px;padding:0 6px;border:0;border-radius:10px;background:none;color:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font:600 13px/1 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;gap:4px;-webkit-appearance:none;appearance:none}
.opl-b:hover{background:rgba(255,255,255,.14)}
.opl-b:active{background:rgba(255,255,255,.24)}
.opl-b.on{color:#ffd600;background:rgba(255,214,0,.14)}
.opl-b svg{width:22px;height:22px;fill:currentColor;stroke:none;flex:none;pointer-events:none}
.opl-b svg.st{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.opl-b.play{width:44px;height:44px;border-radius:50%;background:var(--pa);margin:0 4px}
.opl-b.play:hover{filter:brightness(1.12);background:var(--pa)}
.opl-b.play svg{width:26px;height:26px}
.opl-time{font-variant-numeric:tabular-nums;font-size:12px;color:rgba(255,255,255,.85);padding:0 8px;white-space:nowrap}
.opl-vol{display:flex;align-items:center}
.opl-vol input{width:0;opacity:0;transition:width .18s,opacity .18s;height:22px;margin:0;cursor:pointer}
.opl-vol:hover input,.opl-vol:focus-within input{width:72px;opacity:1;margin-right:6px}
.opl-vol input::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:#fff}
.opl-vol input::-webkit-slider-runnable-track{height:3px;background:rgba(255,255,255,.4);border-radius:2px}
.opl-vol input::-moz-range-thumb{width:12px;height:12px;border:0;border-radius:50%;background:#fff}
.opl-vol input::-moz-range-track{height:3px;background:rgba(255,255,255,.4)}
.opl.novol .opl-vol input{display:none}
.opl-menu{position:absolute;right:10px;bottom:64px;min-width:130px;max-height:60%;overflow:auto;background:rgba(18,18,28,.96);border:1px solid rgba(255,255,255,.15);border-radius:14px;padding:6px;display:none;z-index:6;box-shadow:0 14px 40px -10px rgba(0,0,0,.8)}
.opl.opl-aud .opl-menu{bottom:74px}
.opl-menu.on{display:block}
.opl-menu button{display:flex;width:100%;align-items:center;gap:8px;padding:9px 12px;border:0;background:none;color:#fff;border-radius:9px;font:13px system-ui,sans-serif;cursor:pointer;text-align:left}
.opl-menu button:hover{background:rgba(255,255,255,.12)}
.opl-menu button.on{color:#ffd600}.opl-menu button.on::after{content:"✓";margin-left:auto}
.opl-toast{position:absolute;left:50%;top:12px;transform:translateX(-50%);background:rgba(0,0,0,.75);padding:7px 14px;border-radius:999px;font-size:12px;opacity:0;transition:opacity .25s;pointer-events:none;z-index:7;white-space:nowrap}
.opl-toast.on{opacity:1}
.opl:fullscreen{border-radius:0;max-width:none}.opl:-webkit-full-screen{border-radius:0;max-width:none}
.opl.pfs{border-radius:0}
.opl.opl-aud.pfs,.opl.opl-aud:fullscreen{display:flex;flex-direction:column;justify-content:center;max-width:none}
@media(max-width:520px){.opl-b{min-width:32px;height:34px;padding:0 4px}.opl-time{padding:0 4px}.opl-b svg{width:20px;height:20px}.opl-b.hid-sm{display:none}}
`);

const I={
 play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
 pause:'<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
 back:'<svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"/><text x="12" y="16.2" font-size="7.5" font-weight="700" text-anchor="middle" fill="currentColor" font-family="system-ui,sans-serif">10</text></svg>',
 fwd:'<svg viewBox="0 0 24 24"><g transform="translate(24 0) scale(-1 1)"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"/></g><text x="12" y="16.2" font-size="7.5" font-weight="700" text-anchor="middle" fill="currentColor" font-family="system-ui,sans-serif">10</text></svg>',
 vol:'<svg class="st" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 010 7M18.2 5.8a9 9 0 010 12.4"/></svg>',
 vol1:'<svg class="st" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 010 7"/></svg>',
 mute:'<svg class="st" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6"/></svg>',
 loop:'<svg class="st" viewBox="0 0 24 24"><path d="M17 2l4 4-4 4M3 11V9a3 3 0 013-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 01-3 3H3"/></svg>',
 pip:'<svg class="st" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><rect x="12" y="11" width="7" height="5" rx="1" fill="currentColor" stroke="none"/></svg>',
 fs:'<svg class="st" viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
 fsx:'<svg class="st" viewBox="0 0 24 24"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>',
 replay:'<svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"/></svg>'
};
const fmt=t=>{if(!isFinite(t)||t<0)t=0;t=Math.floor(t);const h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60,p=n=>String(n).padStart(2,'0');return h?h+':'+p(m)+':'+p(s):m+':'+p(s)};
const SPEEDS=[.25,.5,.75,1,1.25,1.5,1.75,2,2.5,3];
const lsGet=k=>{try{return localStorage.getItem(k)}catch(e){return null}},lsSet=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};

/* opt: {kind:'aud'|'vid', title, sub, blob, key, inline, focus} */
O.player=function(media,opt){
 opt=opt||{};const isV=media.tagName=='VIDEO',W=O.h('div','opl '+(isV?'opl-vid':'opl-aud')+(opt.inline?' opl-in':''));W.tabIndex=0;W.setAttribute('role','group');W.setAttribute('aria-label',(isV?'Video':'Audio')+' player');
 media.controls=false;media.removeAttribute('controls');media.setAttribute('playsinline','');media.setAttribute('webkit-playsinline','');media.preload=media.preload||'metadata';
 media.style.cssText='';
 const par=media.parentNode;if(par)par.replaceChild(W,media);
 const stage=O.h('div','opl-stage');W.appendChild(stage);
 let art=null,cv=null,ctx2=null,titleEl=null,subEl=null;
 if(isV){stage.appendChild(media)}
 else{
  art=O.h('div','opl-art','<span class="opl-note">🎵</span>');cv=O.h('canvas');cv.width=220;cv.height=220;art.appendChild(cv);stage.appendChild(art);ctx2=cv.getContext&&cv.getContext('2d');
  const meta=O.h('div','opl-meta','<b></b><span></span>');titleEl=meta.firstChild;subEl=meta.lastChild;titleEl.textContent=opt.title||'';subEl.textContent=opt.sub||'';stage.appendChild(meta);stage.appendChild(media)}
 const ov=O.h('div','opl-ov','<div class="opl-spin"></div><div class="opl-big" role="button" aria-label="Play">'+I.play+'</div>');W.appendChild(ov);
 const fxL=O.h('div','opl-fx l','−10s'),fxR=O.h('div','opl-fx r','+10s');if(isV){W.appendChild(fxL);W.appendChild(fxR)}
 const tip=O.h('div','opl-toast');W.appendChild(tip);
 const bar=O.h('div','opl-bar');
 bar.innerHTML='<div class="opl-seek"><div class="opl-track"><div class="opl-buf"></div><div class="opl-pg"></div><div class="opl-ab"></div></div><input type="range" min="0" max="1000" step="1" value="0" aria-label="Seek"><div class="opl-tip"></div></div>'+
  '<div class="opl-row"><button class="opl-b hid-sm" data-a="back" title="Back 10 s (J)" aria-label="Back 10 seconds">'+I.back+'</button><button class="opl-b play" data-a="play" title="Play / Pause (Space)" aria-label="Play">'+I.play+'</button><button class="opl-b hid-sm" data-a="fwd" title="Forward 10 s (L)" aria-label="Forward 10 seconds">'+I.fwd+'</button><span class="opl-time">0:00 / 0:00</span><span class="sp"></span>'+
  '<span class="opl-vol"><button class="opl-b" data-a="mute" title="Mute (M)" aria-label="Mute">'+I.vol+'</button><input type="range" min="0" max="100" step="1" value="100" aria-label="Volume"></span>'+
  '<button class="opl-b" data-a="speed" title="Playback speed" aria-label="Playback speed">1×</button>'+
  '<button class="opl-b hid-sm" data-a="loop" title="Repeat" aria-label="Repeat">'+I.loop+'</button>'+
  '<button class="opl-b hid-sm" data-a="ab" title="Repeat a section (A–B)" aria-label="Repeat section">A–B</button>'+
  (isV?'<button class="opl-b hid-sm" data-a="pip" title="Picture in picture" aria-label="Picture in picture" hidden>'+I.pip+'</button>':'')+
  (isV?'<button class="opl-b" data-a="fs" title="Full screen (F)" aria-label="Full screen">'+I.fs+'</button>':'')+'</div>';
 W.appendChild(bar);
 const menu=O.h('div','opl-menu');W.appendChild(menu);
 const q=s=>bar.querySelector(s),seek=q('.opl-seek input'),tipS=q('.opl-tip'),buf=q('.opl-buf'),pg=q('.opl-pg'),abm=q('.opl-ab'),time=q('.opl-time'),volR=q('.opl-vol input'),pb=q('[data-a=play]'),mb=q('[data-a=mute]'),sb=q('[data-a=speed]'),lb=q('[data-a=loop]'),ab=q('[data-a=ab]'),pipb=q('[data-a=pip]'),fsb=q('[data-a=fs]'),big=ov.querySelector('.opl-big');
 W.classList.add('ofx-fs-watch');
 let dragging=false,hideT=0,G=null,raf=0,A=null,B=null,lastPT='mouse',tapT=0,tapX=0,single=0;
 const dur=()=>isFinite(media.duration)?media.duration:0;
 const say=t=>{tip.textContent=t;tip.classList.add('on');clearTimeout(say.t);say.t=setTimeout(()=>tip.classList.remove('on'),1300)};
 const setIcon=(b,h)=>{b.innerHTML=h};
 const upPlay=()=>{const p=!media.paused&&!media.ended;W.classList.toggle('playing',p);setIcon(pb,p?I.pause:(media.ended?I.replay:I.play));pb.title=p?'Pause (Space)':'Play (Space)';pb.setAttribute('aria-label',p?'Pause':'Play');big.innerHTML=media.ended?I.replay:I.play;if(!p)show();else bump()};
 const upTime=()=>{const d=dur(),c=media.currentTime||0;time.textContent=fmt(c)+' / '+(d?fmt(d):'--:--');if(!dragging&&d)seek.value=Math.round(c/d*1000);pg.style.width=(d?c/d*100:0)+'%'};
 const upBuf=()=>{try{const d=dur(),b=media.buffered;let e=0;for(let i=0;i<b.length;i++)if(b.start(i)<=media.currentTime+.5)e=Math.max(e,b.end(i));buf.style.width=(d?Math.min(100,e/d*100):0)+'%'}catch(x){}};
 const upVol=()=>{const v=media.muted?0:media.volume;setIcon(mb,media.muted||v==0?I.mute:v<.5?I.vol1:I.vol);volR.value=Math.round(v*100)};
 const upFs=()=>{if(fsb)setIcon(fsb,O.isFS(W)?I.fsx:I.fs)};
 const show=()=>{W.classList.remove('hide');clearTimeout(hideT)};
 const bump=()=>{show();if(!isV)return;clearTimeout(hideT);if(!media.paused)hideT=setTimeout(()=>{if(!menu.classList.contains('on')&&!dragging)W.classList.add('hide')},2800)};
 const toggle=()=>{if(media.paused||media.ended){if(media.ended)media.currentTime=0;graph();const p=media.play();if(p&&p.catch)p.catch(()=>{upPlay()})}else media.pause()};
 const skip=d=>{const t=Math.max(0,Math.min(dur()||1e9,(media.currentTime||0)+d));media.currentTime=t;say((d>0?'+':'−')+Math.abs(d)+' s · '+fmt(t));return t};
 const setVol=v=>{v=Math.max(0,Math.min(1,v));media.volume=v;if(v>0)media.muted=false;lsSet('alpha.vol',String(v))};
 const setSpeed=r=>{media.playbackRate=r;try{media.defaultPlaybackRate=r}catch(e){}sb.textContent=(+r.toFixed(2))+'×';say('Speed '+(+r.toFixed(2))+'×')};
 const upAB=()=>{ab.classList.toggle('on',A!=null);ab.textContent=A==null?'A–B':B==null?'A–?':'A–B';const d=dur();if(A!=null&&d){abm.style.display='block';abm.style.left=(A/d*100)+'%';abm.style.width=((B==null?A:B)-A)/d*100+'%'}else abm.style.display='none'};
 /* real audio spectrum (not on iOS: Web Audio would follow the ringer switch and could silence playback) */
 function graph(){if(isV||G!==null||O.ios){if(G===null)G=false;return}try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC){G=false;return}const c=new AC(),src=c.createMediaElementSource(media),an=c.createAnalyser();an.fftSize=128;an.smoothingTimeConstant=.78;src.connect(an);an.connect(c.destination);G={c,an,d:new Uint8Array(an.frequencyBinCount)};if(c.resume)c.resume()}catch(e){G=false}}
 function draw(){raf=0;if(!W.isConnected){try{G&&G.c.close()}catch(e){}return}
  if(ctx2&&!document.hidden){const w=cv.width,h=cv.height,n=24;ctx2.clearRect(0,0,w,h);const playing=!media.paused&&!media.ended,t=performance.now()/1000;let ok=false;
   if(G&&G.an){try{G.an.getByteFrequencyData(G.d);ok=true}catch(e){}}
   for(let i=0;i<n;i++){let v;if(ok){v=G.d[Math.floor(i*G.d.length*.7/n)+1]/255}else v=playing?(.35+.3*Math.sin(t*3+i*.7)*Math.sin(t*1.3+i*.31)):.08;v=Math.max(.04,Math.min(1,v));const bw=w/n,bh=v*h*.5;ctx2.fillStyle='rgba(255,255,255,'+(.35+v*.55)+')';ctx2.fillRect(i*bw+bw*.18,h-bh-14,bw*.64,bh);}}
  if(!media.paused&&!media.ended)raf=requestAnimationFrame(draw)}
 const kick=()=>{if(!isV&&!raf)raf=requestAnimationFrame(draw)};
 /* events */
 const ev=(n,f)=>media.addEventListener(n,f);
 ev('play',()=>{upPlay();kick()});ev('playing',()=>{W.classList.remove('busy');upPlay();kick()});ev('pause',upPlay);ev('ended',()=>{upPlay();if(!isV)setTimeout(draw,50)});
 ev('timeupdate',()=>{upTime();if(B!=null&&A!=null&&media.currentTime>=B){media.currentTime=A}persist()});
 ev('durationchange',()=>{upTime();upAB()});ev('loadedmetadata',()=>{upTime();restore()});ev('progress',upBuf);ev('seeked',()=>{upBuf();upTime()});
 ev('waiting',()=>{if(!media.paused)W.classList.add('busy')});ev('canplay',()=>W.classList.remove('busy'));ev('stalled',()=>{});
 ev('volumechange',upVol);ev('ratechange',()=>{sb.textContent=(+media.playbackRate.toFixed(2))+'×'});
 ev('error',()=>{W.classList.remove('busy')});
 /* resume position */
 const key=opt.key?'alpha.pos.'+opt.key:null;let lastSave=0,restored=0;
 function persist(){if(!key||dur()<90)return;const n=Date.now();if(n-lastSave<4000)return;lastSave=n;const c=media.currentTime;lsSet(key,(c>8&&c<dur()-8)?String(Math.floor(c)):'')}
 function restore(){if(restored||!key)return;restored=1;const p=+lsGet(key);if(p>8&&dur()>90&&p<dur()-8){try{media.currentTime=p;say('Resumed at '+fmt(p))}catch(e){}}}
 /* seek bar */
 const tipAt=e=>{const r=seek.getBoundingClientRect(),x=Math.max(0,Math.min(1,((e.clientX!=null?e.clientX:r.left)-r.left)/r.width));tipS.style.display='block';tipS.style.left=(x*100)+'%';tipS.textContent=fmt(x*dur())};
 seek.addEventListener('pointermove',tipAt);seek.addEventListener('pointerleave',()=>{tipS.style.display='none'});
 seek.addEventListener('pointerdown',()=>{dragging=true});['pointerup','pointercancel','change','blur'].forEach(n=>seek.addEventListener(n,()=>{dragging=false}));
 seek.addEventListener('input',()=>{const d=dur();if(d){media.currentTime=seek.value/1000*d;time.textContent=fmt(media.currentTime)+' / '+fmt(d);pg.style.width=(seek.value/10)+'%'}});
 volR.addEventListener('input',()=>setVol(volR.value/100));
 /* buttons */
 const closeMenu=()=>menu.classList.remove('on');
 const openSpeed=()=>{menu.innerHTML=SPEEDS.map(s=>'<button data-s="'+s+'"'+(Math.abs(media.playbackRate-s)<.01?' class="on"':'')+'>'+(s==1?'Normal':s+'×')+'</button>').join('');menu.classList.add('on')};
 bar.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;e.stopPropagation();const a=b.dataset.a;closeMenu();bump();
  if(a=='play')toggle();else if(a=='back')skip(-10);else if(a=='fwd')skip(10);
  else if(a=='mute'){media.muted=!media.muted;if(!media.muted&&media.volume==0)media.volume=.5}
  else if(a=='speed')openSpeed();
  else if(a=='loop'){media.loop=!media.loop;b.classList.toggle('on',media.loop);say(media.loop?'Repeat on':'Repeat off')}
  else if(a=='ab'){const c=media.currentTime||0;if(A==null){A=c;B=null;say('Point A set · '+fmt(c))}else if(B==null){if(c>A+.5){B=c;say('Repeating '+fmt(A)+' – '+fmt(B));media.currentTime=A}else say('Pick a later point for B')}else{A=B=null;say('Section repeat off')}upAB()}
  else if(a=='pip')pip();else if(a=='fs')fsT()});
 menu.addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(b){e.stopPropagation();setSpeed(+b.dataset.s);closeMenu()}});
 W.addEventListener('click',e=>{if(!menu.contains(e.target)&&!e.target.closest('[data-a]'))closeMenu()},true);
 big.addEventListener('click',e=>{e.stopPropagation();toggle()});
 const fsT=()=>{O.toggleFS(W).then(upFs)};
 W.addEventListener('ofx-fs',()=>{upFs();if(!O.isFS(W))show()});
 const pip=async()=>{try{if(document.pictureInPictureElement===media){await document.exitPictureInPicture()}else if(media.requestPictureInPicture)await media.requestPictureInPicture();else if(media.webkitSetPresentationMode)media.webkitSetPresentationMode(media.webkitPresentationMode=='picture-in-picture'?'inline':'picture-in-picture')}catch(e){say('Picture in picture is not available')}};
 if(pipb&&((document.pictureInPictureEnabled&&media.requestPictureInPicture&&!media.disablePictureInPicture)||(media.webkitSetPresentationMode&&media.webkitSupportsPresentationMode&&media.webkitSupportsPresentationMode('picture-in-picture'))))pipb.hidden=false;
 /* stage gestures */
 stage.addEventListener('touchstart',()=>{lastPT='touch'},{passive:true});stage.addEventListener('mousedown',()=>{lastPT='mouse'});
 const zone=x=>{const r=stage.getBoundingClientRect(),p=(x-r.left)/r.width;return p<.34?-1:p>.66?1:0};
 const flash=(el)=>{el.classList.remove('on');void el.offsetWidth;el.classList.add('on')};
 if(isV)stage.addEventListener('click',e=>{if(e.target.closest('.opl-big'))return;W.focus({preventScroll:true});const now=Date.now(),x=e.clientX;
  if(lastPT=='touch'){if(now-tapT<320&&Math.abs(x-tapX)<80){clearTimeout(single);tapT=0;const z=zone(x);if(z<0){skip(-10);flash(fxL)}else if(z>0){skip(10);flash(fxR)}else toggle()}else{tapT=now;tapX=x;clearTimeout(single);single=setTimeout(()=>{if(W.classList.contains('hide'))show();else if(!media.paused){W.classList.add('hide')}else show()},320)}}
  else{clearTimeout(single);if(now-tapT<300){tapT=0;fsT()}else{tapT=now;single=setTimeout(toggle,210)}}});
 W.addEventListener('pointermove',e=>{if(e.pointerType!='touch')bump()});W.addEventListener('pointerdown',()=>{bump()});
 W.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey)return;const k=e.key;let h=true;
  if(e.target&&e.target.tagName=='BUTTON'&&(k==' '||k=='Enter'))return;
  if(k==' '||k=='k'||k=='K')toggle();else if(k=='ArrowLeft')skip(-5);else if(k=='ArrowRight')skip(5);else if(k=='j'||k=='J')skip(-10);else if(k=='l'||k=='L')skip(10);
  else if(k=='ArrowUp')setVol(media.volume+.05);else if(k=='ArrowDown')setVol(media.volume-.05);else if(k=='m'||k=='M')media.muted=!media.muted;
  else if((k=='f'||k=='F')&&isV)fsT();else if(k=='Escape'&&W.classList.contains('pfs')){O.toggleFS(W).then(upFs)}
  else if(k=='Home')media.currentTime=0;else if(k=='End'&&dur())media.currentTime=dur()-.1;
  else if(/^[0-9]$/.test(k)&&dur())media.currentTime=dur()*(+k)/10;
  else if(k=='>'||k=='.'&&e.shiftKey){const i=SPEEDS.findIndex(s=>s>media.playbackRate+.01);if(i>=0)setSpeed(SPEEDS[i])}
  else if(k=='<'||k==','&&e.shiftKey){const c=SPEEDS.filter(s=>s<media.playbackRate-.01);if(c.length)setSpeed(c[c.length-1])}
  else h=false;
  if(h){e.preventDefault();e.stopPropagation();bump()}});
 /* volume (iOS ignores script volume) */
 {const sv=+lsGet('alpha.vol');try{const t=media.volume;media.volume=.5;if(Math.abs(media.volume-.5)>.01)W.classList.add('novol');media.volume=t}catch(e){W.classList.add('novol')}if(!W.classList.contains('novol')&&lsGet('alpha.vol')!==null&&isFinite(sv))media.volume=Math.max(0,Math.min(1,sv))}
 /* cover art + tags (mp3 ID3v2) */
 if(!isV&&opt.blob){O.id3(opt.blob).then(t=>{if(!t||!W.isConnected)return;if(t.title)titleEl.textContent=t.title;if(t.artist||t.album)subEl.textContent=[t.artist,t.album].filter(Boolean).join(' · ');
  if(t.pic){const u=URL.createObjectURL(t.pic),im=new Image();im.onload=()=>{art.classList.add('has-img');art.insertBefore(im,art.firstChild)};im.onerror=()=>URL.revokeObjectURL(u);im.src=u;im.alt='';W._cover=u}
  setMS(t.title||opt.title,[t.artist,t.album].filter(Boolean).join(' · '))}).catch(()=>{})}
 /* lock-screen / media-key controls */
 function setMS(title,artist){try{if(!('mediaSession' in navigator))return;navigator.mediaSession.metadata=new MediaMetadata({title:title||'',artist:artist||''});const h=(a,f)=>{try{navigator.mediaSession.setActionHandler(a,f)}catch(e){}};h('play',()=>media.play());h('pause',()=>media.pause());h('seekbackward',()=>skip(-10));h('seekforward',()=>skip(10));h('seekto',d=>{if(d&&d.seekTime!=null)media.currentTime=d.seekTime})}catch(e){}}
 media.addEventListener('play',()=>setMS(opt.title,opt.sub),{once:true});
 /* init */
 upPlay();upTime();upVol();upAB();upFs();sb.textContent=(+media.playbackRate.toFixed(2))+'×';
 if(opt.focus)setTimeout(()=>{try{W.focus({preventScroll:true})}catch(e){}},50);
 return{el:W,media,toggle,skip,destroy(){try{media.pause()}catch(e){}if(raf)cancelAnimationFrame(raf);try{G&&G.c.close()}catch(e){}if(W._cover)URL.revokeObjectURL(W._cover);if(O.isFS(W))O.toggleFS(W)}}};
})();

/* ===== OFX: Word-style document viewer (.docx) — white paged canvas, styles, lists, tables, pictures, headers/footers ===== */
(()=>{
const O=window.OFX,E=O.esc;
O.css('ofx-docx-css',`
.wd-app{display:flex;flex-direction:column;height:100%;min-height:0;background:#e6e6e6;color:#222;font-family:"Segoe UI",system-ui,-apple-system,Roboto,sans-serif}
.wd-tools{flex:none;display:flex;align-items:center;gap:6px;padding:6px 10px;background:#f3f3f3;border-bottom:1px solid #d4d4d4;overflow-x:auto;scrollbar-width:none}
.wd-tools::-webkit-scrollbar{display:none}
.wd-tools .sp{flex:1}
.wd-tools button,.wd-st button{font:600 12.5px/1 "Segoe UI",system-ui,sans-serif;color:#222;background:#fff;border:1px solid #c8c8c8;border-radius:5px;padding:7px 11px;cursor:pointer;white-space:nowrap;-webkit-appearance:none;appearance:none}
.wd-tools button:hover,.wd-st button:hover{background:#e8eefb;border-color:#9db5e6}
.wd-tools button.on{background:#2b579a;border-color:#2b579a;color:#fff}
.wd-zl{font-size:12.5px;min-width:44px;text-align:center;color:#444}
.wd-canvas{flex:1;min-height:0;overflow:auto;-webkit-overflow-scrolling:touch;background:#e6e6e6;padding:14px 0 40px;outline:none;overscroll-behavior:contain}
.wd-zwrap{position:relative;margin:0 auto}
.wd-pages{display:flex;flex-direction:column;align-items:center;gap:12px;transform-origin:0 0}
.wd-page{position:relative;flex:none;background:#fff;color:#000;box-shadow:0 1px 3px rgba(0,0,0,.25),0 4px 14px -4px rgba(0,0,0,.2)}
.wd-page .wd-body{display:flow-root}
.wd-page .wd-hd,.wd-page .wd-ft{position:absolute;left:0;right:0;overflow:hidden}
.wd-read{background:#fff;color:#000;margin:0 auto;max-width:860px;padding:34px 38px 60px;box-shadow:0 1px 3px rgba(0,0,0,.2);min-height:100%;display:flow-root}
@media(max-width:600px){.wd-read{padding:20px 16px 40px}}
.wd-st{flex:none;display:flex;align-items:center;gap:14px;padding:5px 12px;background:#f3f3f3;border-top:1px solid #d4d4d4;font-size:12px;color:#444;white-space:nowrap;overflow:hidden}
.wd-st .sp{flex:1}
.wd-in .wd-tools{display:none}
.wd-in .wd-st{padding:4px 10px}
.wd-pg-f{font:11pt/1.17 Calibri,Carlito,"Segoe UI",Arial,sans-serif;color:#000}
.wd-pg-f .wp{white-space:pre-wrap;overflow-wrap:break-word;word-wrap:break-word;margin:0}
.wd-pg-f .wp img,.wd-pg-f .wc img{max-width:100%;height:auto;vertical-align:baseline}
.wd-pg-f .wm{display:inline-block;text-indent:0;white-space:pre}
.wd-pg-f .wtab{display:inline-block;width:36pt}
.wd-pg-f table.wt{border-collapse:collapse;table-layout:fixed;max-width:100%}
.wd-pg-f table.wt td{vertical-align:top;overflow-wrap:break-word}
.wd-pg-f .wtx{display:inline-block;border:1px solid #999;padding:4px 6px;margin:2px;vertical-align:top;max-width:100%}
.wd-pg-f a{color:#0563c1;text-decoration:underline}
.wd-pg-f .wph{display:inline-flex;align-items:center;justify-content:center;background:#f0f0f0;border:1px dashed #bbb;color:#777;font:12px sans-serif;min-width:60px;min-height:30px;padding:4px}
`);

const xmlp=s=>new DOMParser().parseFromString(s,'application/xml');
const kids=(n,t)=>{const o=[];if(n)for(let c=n.firstElementChild;c;c=c.nextElementSibling)if(!t||c.localName==t)o.push(c);return o};
const kid=(n,t)=>{if(n)for(let c=n.firstElementChild;c;c=c.nextElementSibling)if(c.localName==t)return c;return null};
const desc=(n,t)=>n?[...n.getElementsByTagNameNS('*',t)]:[];
const at=(e,n)=>{if(!e)return null;let v=e.getAttribute('w:'+n);if(v!=null)return v;v=e.getAttribute(n);if(v!=null)return v;for(const a of e.attributes)if(a.localName==n)return a.value;return null};
const rat=(e,n)=>{if(!e)return null;let v=e.getAttribute('r:'+n);if(v!=null)return v;for(const a of e.attributes)if(a.localName==n&&/relationships/.test(a.namespaceURI||''))return a.value;return null};
const num=v=>(v==null||v==='')?undefined:(isFinite(+v)?+v:undefined);
const absP=(base,t)=>{if(t.startsWith('/'))return t.slice(1);const o=base.split('/').slice(0,-1);for(const x of t.split('/')){if(x=='..')o.pop();else if(x!='.')o.push(x)}return o.join('/')};
const mg=(a,b)=>{if(b)for(const k in b)if(b[k]!==undefined&&b[k]!==null)a[k]=b[k];return a};
const HL={yellow:'#ffff00',green:'#00ff00',cyan:'#00ffff',magenta:'#ff00ff',blue:'#0000ff',red:'#ff0000',darkBlue:'#000080',darkCyan:'#008080',darkGreen:'#008000',darkMagenta:'#800080',darkRed:'#800000',darkYellow:'#808000',darkGray:'#808080',lightGray:'#c0c0c0',black:'#000000',white:'#ffffff'};
const MIMES={png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',jpe:'image/jpeg',gif:'image/gif',bmp:'image/bmp',webp:'image/webp',svg:'image/svg+xml',avif:'image/avif'};
const FONTS={calibri:'Calibri,Carlito,"Segoe UI",Arial,sans-serif','times new roman':'"Times New Roman",Tinos,"Liberation Serif",Times,serif',arial:'Arial,Arimo,"Liberation Sans",Helvetica,sans-serif',cambria:'Cambria,Caladea,Georgia,serif','courier new':'"Courier New",Cousine,monospace',consolas:'Consolas,"Courier New",monospace',verdana:'Verdana,"DejaVu Sans",sans-serif',tahoma:'Tahoma,"DejaVu Sans",sans-serif',georgia:'Georgia,serif','segoe ui':'"Segoe UI",system-ui,sans-serif',garamond:'Garamond,"EB Garamond",serif','century gothic':'"Century Gothic",Futura,sans-serif','trebuchet ms':'"Trebuchet MS",sans-serif',symbol:'inherit',wingdings:'inherit','wingdings 2':'inherit','wingdings 3':'inherit'};
const fontCss=n=>{if(!n)return'';const k=n.toLowerCase();return FONTS[k]||('"'+n.replace(/["\\]/g,'')+'",Calibri,Carlito,"Segoe UI",Arial,sans-serif')};
const roman=n=>{const m=[[1000,'m'],[900,'cm'],[500,'d'],[400,'cd'],[100,'c'],[90,'xc'],[50,'l'],[40,'xl'],[10,'x'],[9,'ix'],[5,'v'],[4,'iv'],[1,'i']];let s='';for(const [v,r] of m)while(n>=v){s+=r;n-=v}return s};
const letters=n=>{const c=String.fromCharCode(97+(n-1)%26);return c.repeat(Math.floor((n-1)/26)+1)};
const fmtNum=(n,f)=>{switch(f){case'decimalZero':return(n<10?'0':'')+n;case'lowerLetter':return letters(n);case'upperLetter':return letters(n).toUpperCase();case'lowerRoman':return roman(n);case'upperRoman':return roman(n).toUpperCase();case'none':return'';default:return String(n)}};

O.docx=async function(z,host,opt){
 opt=opt||{};const urls=[],T0=Date.now();
 const get=async n=>{try{return await z.get(n)}catch(e){return null}};
 const docS=await get('word/document.xml');if(!docS)throw new Error('docx: no document.xml');
 const dx=xmlp(docS),body=kid(kid(dx,'document')||dx.documentElement,'body');if(!body)throw new Error('docx: no body');
 /* ---- theme ---- */
 const theme={colors:{},major:'',minor:''};
 try{const ts=await get('word/theme/theme1.xml');if(ts){const td=xmlp(ts),cs=desc(td,'clrScheme')[0];if(cs)for(const c of cs.children){const v=c.firstElementChild;if(v)theme.colors[c.localName]=v.getAttribute('val')||v.getAttribute('lastClr')||''}
  const mj=desc(td,'majorFont')[0],mn=desc(td,'minorFont')[0];if(mj){const l=kid(mj,'latin');if(l)theme.major=l.getAttribute('typeface')||''}if(mn){const l=kid(mn,'latin');if(l)theme.minor=l.getAttribute('typeface')||''}}}catch(e){}
 const TMAP={text1:'dk1',background1:'lt1',text2:'dk2',background2:'lt2',dark1:'dk1',light1:'lt1',dark2:'dk2',light2:'lt2',hyperlink:'hlink',followedHyperlink:'folHlink'};
 const hex2=h=>{h=String(h||'').replace('#','');if(h.length==3)h=h.split('').map(c=>c+c).join('');return/^[0-9a-fA-F]{6}$/.test(h)?h.toLowerCase():null};
 const themeCol=(name,tint,shade)=>{let h=hex2(theme.colors[TMAP[name]||name]);if(!h)return null;let r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
  if(tint){const t=parseInt(tint,16)/255;r=r*t+255*(1-t);g=g*t+255*(1-t);b=b*t+255*(1-t)}if(shade){const s=parseInt(shade,16)/255;r*=s;g*=s;b*=s}
  const x=v=>Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,'0');return x(r)+x(g)+x(b)};
 const colOf=e=>{if(!e)return undefined;const v=at(e,'val'),tc=at(e,'themeColor');if(tc){const c=themeCol(tc,at(e,'themeTint'),at(e,'themeShade'));if(c)return'#'+c}if(v&&v!='auto'){const h=hex2(v);if(h)return'#'+h}return undefined};
 const fillOf=e=>{if(!e)return undefined;const v=at(e,'fill'),tc=at(e,'themeFill');if(tc){const c=themeCol(tc,at(e,'themeFillTint'),at(e,'themeFillShade'));if(c)return'#'+c}if(v&&v!='auto'){const h=hex2(v);if(h)return'#'+h}return undefined};
 /* ---- props parsers ---- */
 const tog=(rp,t)=>{const e=kid(rp,t);return e?!/^(0|false|off|none)$/i.test(at(e,'val')||'1'):undefined};
 const brd=e=>{if(!e)return undefined;const v=at(e,'val');if(!v||v=='nil'||v=='none')return{none:1};const sz=num(at(e,'sz'))||4;return{w:Math.max(.5,sz/8),st:/dash/i.test(v)?'dashed':/dot/i.test(v)?'dotted':v=='double'?'double':'solid',c:colOf(e)||'#000'}};
 const brdCss=b=>b?(b.none?'none':(b.w+'pt '+b.st+' '+b.c)):'';
 const parseR=rp=>{const o={};if(!rp)return o;
  o.b=tog(rp,'b');o.i=tog(rp,'i');o.strike=tog(rp,'strike')||tog(rp,'dstrike');o.caps=tog(rp,'caps');o.sc=tog(rp,'smallCaps');o.vanish=tog(rp,'vanish');
  const u=kid(rp,'u');if(u){const v=at(u,'val');o.u=v==='none'?false:(v||'single')}
  const c=kid(rp,'color');if(c)o.color=colOf(c);
  const sz=kid(rp,'sz');if(sz)o.sz=num(at(sz,'val'))/2;
  const f=kid(rp,'rFonts');if(f){let n=at(f,'ascii')||at(f,'hAnsi');const th=at(f,'asciiTheme')||at(f,'hAnsiTheme');if(th)n=/major/i.test(th)?theme.major:theme.minor;n=n||at(f,'eastAsia')||at(f,'cs');if(n)o.font=n}
  const h=kid(rp,'highlight');if(h){const v=at(h,'val');if(v&&v!='none')o.hl=HL[v]||v}
  const sh=kid(rp,'shd');if(sh)o.shd=fillOf(sh);
  const va=kid(rp,'vertAlign');if(va){const v=at(va,'val');if(v=='superscript'||v=='subscript')o.va=v}
  const sp=kid(rp,'spacing');if(sp)o.ls=num(at(sp,'val'))/20;
  const rs=kid(rp,'rStyle');if(rs)o.rs=at(rs,'val');
  return o};
 const parseP=pp=>{const o={};if(!pp)return o;
  const jc=kid(pp,'jc');if(jc)o.jc=at(jc,'val');
  const ind=kid(pp,'ind');if(ind){const g=(a,b)=>{let v=at(ind,a);if(v==null&&b)v=at(ind,b);return num(v)};o.left=g('left','start');o.right=g('right','end');o.first=g('firstLine');o.hang=g('hanging');if(o.hang!==undefined)o.first=undefined}
  const sp=kid(pp,'spacing');if(sp){o.before=num(at(sp,'before'));o.after=num(at(sp,'after'));o.line=num(at(sp,'line'));o.rule=at(sp,'lineRule')||undefined;if(at(sp,'beforeAutospacing')=='1')o.before=280;if(at(sp,'afterAutospacing')=='1')o.after=280}
  const sh=kid(pp,'shd');if(sh)o.shd=fillOf(sh);
  const bd=kid(pp,'pBdr');if(bd)for(const s of['top','left','bottom','right']){const b=brd(kid(bd,s));if(b)o['b'+s]=b}
  const np=kid(pp,'numPr');if(np){const ni=kid(np,'numId'),il=kid(np,'ilvl');if(ni)o.numId=num(at(ni,'val'));if(il)o.ilvl=num(at(il,'val'))}
  const ps=kid(pp,'pStyle');if(ps)o.style=at(ps,'val');
  if(kid(pp,'pageBreakBefore')&&tog(pp,'pageBreakBefore')!==false)o.pbb=true;
  if(kid(pp,'contextualSpacing')&&tog(pp,'contextualSpacing')!==false)o.ctx=true;
  const rp=kid(pp,'rPr');if(rp)o.mark=parseR(rp);
  return o};
 /* ---- styles ---- */
 const styles={};let dDefR={},dDefP={},defPara=null,defTbl=null;
 try{const ss=await get('word/styles.xml');if(ss){const sd=xmlp(ss),root=sd.documentElement,dd=kid(root,'docDefaults');
   if(dd){const rd=kid(kid(dd,'rPrDefault'),'rPr'),pd=kid(kid(dd,'pPrDefault'),'pPr');dDefR=parseR(rd);dDefP=parseP(pd)}
   for(const s of kids(root,'style')){const id=at(s,'styleId');if(!id)continue;const t=at(s,'type'),bo=kid(s,'basedOn'),st={id,type:t,based:bo?at(bo,'val'):null,p:parseP(kid(s,'pPr')),r:parseR(kid(s,'rPr')),tbl:kid(s,'tblPr'),tcp:kid(s,'tcPr'),cond:{}};
    for(const c of kids(s,'tblStylePr'))st.cond[at(c,'type')]={p:parseP(kid(c,'pPr')),r:parseR(kid(c,'rPr')),tc:kid(c,'tcPr'),tb:kid(c,'tblPr')};
    if(at(s,'default')=='1'){if(t=='paragraph')defPara=id;else if(t=='table')defTbl=id}styles[id]=st}}}catch(e){}
 const sCache={};
 const styleP=id=>{if(!id||!styles[id])return{};const k='p'+id;if(sCache[k])return sCache[k];const o={},ch=[];let c=styles[id],g=0;while(c&&g++<20){ch.unshift(c);c=c.based?styles[c.based]:null}for(const x of ch)mg(o,x.p);return sCache[k]=o};
 const styleR=id=>{if(!id||!styles[id])return{};const k='r'+id;if(sCache[k])return sCache[k];const o={},ch=[];let c=styles[id],g=0;while(c&&g++<20){ch.unshift(c);c=c.based?styles[c.based]:null}for(const x of ch)mg(o,x.r);return sCache[k]=o};
 const baseP=sid=>mg(mg(mg({},dDefP),styleP(defPara)),styleP(sid));
 const baseR=sid=>mg(mg(mg({},dDefR),styleR(defPara)),styleR(sid));
 /* ---- numbering ---- */
 const abs={},nums={};
 try{const ns=await get('word/numbering.xml');if(ns){const nd=xmlp(ns),root=nd.documentElement;
  for(const a of kids(root,'abstractNum')){const id=at(a,'abstractNumId'),lv={};for(const l of kids(a,'lvl')){const il=num(at(l,'ilvl')),f=kid(l,'numFmt'),t=kid(l,'lvlText'),s=kid(l,'start'),sf=kid(l,'suff');lv[il]={fmt:f?at(f,'val'):'decimal',txt:t?at(t,'val'):'',start:s?num(at(s,'val')):1,suff:sf?at(sf,'val'):'tab',p:parseP(kid(l,'pPr')),r:parseR(kid(l,'rPr'))}}abs[id]=lv}
  for(const n of kids(root,'num')){const id=at(n,'numId'),a=kid(n,'abstractNumId'),ov={};for(const o of kids(n,'lvlOverride')){const so=kid(o,'startOverride');if(so)ov[num(at(o,'ilvl'))]=num(at(so,'val'))}nums[id]={abs:a?at(a,'val'):null,ov}}}}catch(e){}
 const counters={};
 const listInfo=(numId,ilvl)=>{const n=nums[numId];if(!n||!abs[n.abs])return null;const lv=abs[n.abs],L=lv[ilvl]||lv[0];if(!L)return null;
  const key=Object.keys(n.ov).length?'n'+numId:'a'+n.abs;let c=counters[key];if(!c)c=counters[key]=[];
  for(let k=0;k<ilvl;k++)if(c[k]===undefined){const lk=lv[k];c[k]=(n.ov[k]!==undefined?n.ov[k]:(lk?lk.start:1))}
  const st=n.ov[ilvl]!==undefined?n.ov[ilvl]:L.start;c[ilvl]=c[ilvl]===undefined?st:c[ilvl]+1;c.length=ilvl+1;
  let t;if(L.fmt=='bullet'){t=L.txt||'•';t=[...t].map(ch=>{const cc=ch.charCodeAt(0);return(cc>=0xF000||cc<32)?'•':(ch=='o'&&/Courier/i.test(L.r.font||'')?'◦':(ch=='§'&&/Wingdings/i.test(L.r.font||'')?'▪':ch))}).join('')}
  else t=(L.txt||'%'+(ilvl+1)+'.').replace(/%(\d)/g,(m,d)=>{const k=+d-1,lk=lv[k]||L;return fmtNum(c[k]===undefined?lk.start:c[k],lk.fmt)});
  return{t,L}};
 /* ---- rels / images ---- */
 const relsOf=async path=>{const m={},rs=await get(path.replace(/([^/]+)$/,'_rels/$1.rels'));if(rs)for(const r of desc(xmlp(rs),'Relationship'))m[r.getAttribute('Id')]={t:r.getAttribute('Target'),ext:r.getAttribute('TargetMode')=='External'};return m};
 const imgCache={};
 const loadImgs=async(doc,rels,part)=>{const ids=new Set();for(const n of[...desc(doc,'blip'),...desc(doc,'imagedata')]){const id=rat(n,'embed')||rat(n,'id')||rat(n,'link');if(id)ids.add(id)}
  for(const id of ids){const r=rels[id];if(!r||r.ext||imgCache[part+id]!==undefined)continue;const p=absP(part,r.t),ex=(p.split('.').pop()||'').toLowerCase(),mt=MIMES[ex];if(!mt){imgCache[part+id]=null;continue}
   try{const b=await z.bin(p);if(b){const u=URL.createObjectURL(new Blob([b],{type:mt}));urls.push(u);imgCache[part+id]=u}else imgCache[part+id]=null}catch(e){imgCache[part+id]=null}}};
 /* ---- converter factory (per part) ---- */
 const mkConv=(part,rels)=>{
  const E2=E;
  /* inline content -> array of html segments split at page breaks */
  function inlineSegs(p,bR,paraStyle){const segs=[''];let fl=[],txtLen=0;const sup=()=>fl.some(f=>f.skip||f.ph=='instr');
   const push=h=>{segs[segs.length-1]+=h};
   const rcss=(r,b)=>{let s='';const d=(k)=>r[k]!==undefined&&r[k]!==b[k];
    if(d('font')&&r.font)s+='font-family:'+fontCss(r.font)+';';if(d('sz')&&r.sz)s+='font-size:'+r.sz+'pt;';if(d('b'))s+='font-weight:'+(r.b?700:400)+';';if(d('i'))s+='font-style:'+(r.i?'italic':'normal')+';';
    const td=[];if(d('u')||d('strike')){const u=r.u,st=r.strike;if(u)td.push('underline');if(st)td.push('line-through');s+='text-decoration:'+(td.join(' ')||'none')+';';if(u&&/double|dotted|dash|wave/.test(u))s+='text-decoration-style:'+(/double/.test(u)?'double':/dot/.test(u)?'dotted':/dash/.test(u)?'dashed':'wavy')+';'}
    if(d('color')&&r.color)s+='color:'+r.color+';';if(d('hl')&&r.hl)s+='background:'+r.hl+';';else if(d('shd')&&r.shd)s+='background:'+r.shd+';';
    if(d('va')&&r.va)s+='vertical-align:'+(r.va=='superscript'?'super':'sub')+';font-size:'+(r.sz?r.sz*.65:7)+'pt;';
    if(d('caps'))s+='text-transform:'+(r.caps?'uppercase':'none')+';';if(d('sc'))s+='font-variant:'+(r.sc?'small-caps':'normal')+';';if(d('ls')&&r.ls)s+='letter-spacing:'+r.ls+'pt;';return s};
   const imgHtml=dr=>{let out='';const blips=desc(dr,'blip').concat(desc(dr,'imagedata'));
    const ext=desc(dr,'extent')[0],st=desc(dr,'shape')[0]||desc(dr,'imagedata')[0]&&dr.getElementsByTagNameNS('*','shape')[0];
    let w=ext?num(ext.getAttribute('cx'))/12700:null,h=ext?num(ext.getAttribute('cy'))/12700:null;
    if(!w&&st){const sty=st.getAttribute('style')||'',mw=/width:([\d.]+)pt/.exec(sty),mh=/height:([\d.]+)pt/.exec(sty);if(mw)w=+mw[1];if(mh)h=+mh[1]}
    for(const bl of blips.slice(0,1)){const id=rat(bl,'embed')||rat(bl,'id')||rat(bl,'link'),u=imgCache[part+id];
     if(u){const sr=desc(bl.parentNode,'srcRect')[0],crop=sr?{l:(num(sr.getAttribute('l'))||0)/1e5,t:(num(sr.getAttribute('t'))||0)/1e5,r:(num(sr.getAttribute('r'))||0)/1e5,b:(num(sr.getAttribute('b'))||0)/1e5}:null;
      if(crop&&w&&h&&(crop.l||crop.t||crop.r||crop.b)&&crop.l+crop.r<.95&&crop.t+crop.b<.95){const sx=1-crop.l-crop.r,sy=1-crop.t-crop.b;out+='<span style="display:inline-block;position:relative;overflow:hidden;width:'+w+'pt;height:'+h+'pt;max-width:100%"><img alt="" src="'+u+'" style="position:absolute;max-width:none;left:'+(-crop.l/sx*100)+'%;top:'+(-crop.t/sy*100)+'%;width:'+(100/sx)+'%;height:'+(100/sy)+'%"></span>'}
      else out+='<img alt="" src="'+u+'"'+(w?' style="width:'+w+'pt;'+(h?'height:auto;aspect-ratio:'+(w/h).toFixed(4)+';':'')+'max-width:100%"':'')+'>'}
     else out+='<span class="wph" style="'+(w?'width:'+Math.min(w,500)+'pt;':'')+(h?'height:'+Math.min(h,500)+'pt;':'')+'">🖼</span>'}
    if(!blips.length){const tb=desc(dr,'txbxContent')[0];if(tb)out+='<div class="wtx">'+blocksHtml(tb)+'</div>';else if(desc(dr,'chart').length)out+='<span class="wph">Chart</span>';}
    return out};
   const runHtml=(r,rlink)=>{const rp=parseR(kid(r,'rPr')),rs=rp.rs?styleR(rp.rs):{},m=mg(mg(mg({},bR),rs),rp);if(m.vanish)return;
    let h='',txt='';const flush=()=>{if(txt){h+=E2(txt);txtLen+=txt.length;txt=''}};
    for(const c of r.children){const n=c.localName;
     if(n=='fldChar'){const t=at(c,'fldCharType');if(t=='begin')fl.push({ph:'instr',ins:'',skip:0,link:null});else if(t=='separate'){const f=fl[fl.length-1];if(f){f.ph='res';const ins=f.ins.trim();if(/^PAGE\b/i.test(ins)){flush();h+='{{PG}}';f.skip=1}else if(/^NUMPAGES\b/i.test(ins)){flush();h+='{{NP}}';f.skip=1}else if(/^HYPERLINK/i.test(ins)){const mm=/"([^"]+)"/.exec(ins);if(mm&&/^(https?:|mailto:)/i.test(mm[1])){flush();h+='<a href="'+E2(mm[1])+'" target="_blank" rel="noopener noreferrer">';f.link=1}}}}else if(t=='end'){const f=fl.pop();if(f&&f.link){flush();h+='</a>'}}continue}
     if(n=='instrText'){const f=fl[fl.length-1];if(f&&f.ph=='instr')f.ins+=c.textContent;continue}
     if(sup())continue;
     if(n=='t')txt+=c.textContent;else if(n=='tab'||n=='ptab'){flush();h+='<span class="wtab"></span>'}else if(n=='br'||n=='cr'){const t=at(c,'type');if(t=='page'){flush();h+='\u0001';continue}flush();h+='<br>'}
     else if(n=='noBreakHyphen')txt+='\u2011';else if(n=='sym'){const ch=parseInt(at(c,'char')||'',16);txt+=(!ch||ch>=0xF000||ch<32)?'•':String.fromCharCode(ch)}
     else if(n=='drawing'||n=='pict'||n=='object'){flush();h+=imgHtml(c)}
     else if(n=='AlternateContent'){flush();const ch=kid(c,'Choice')||kid(c,'Fallback');if(ch)h+=imgHtml(ch)}}
    flush();if(!h)return;const cs=rcss(m,bR);if(cs)h=h.split('\u0001').map(x=>x?'<span style="'+cs+'">'+x+'</span>':x).join('\u0001');return h};
   const walk=(n,link)=>{for(const c of n.children){const t=c.localName;
     if(t=='r'){const h=runHtml(c);if(h!=null){if(h.indexOf('\u0001')>=0){const parts=h.split('\u0001');parts.forEach((pt,i)=>{if(i>0)segs.push('');push(pt)})}else push(h)}}
     else if(t=='hyperlink'){const id=rat(c,'id'),an=at(c,'anchor'),r=id&&rels[id];if(r&&r.ext&&/^(https?:|mailto:)/i.test(r.t)){push('<a href="'+E2(r.t)+'" target="_blank" rel="noopener noreferrer">');walk(c);push('</a>')}else walk(c)}
     else if(t=='fldSimple'){const ins=(at(c,'instr')||'').trim();if(/^PAGE\b/i.test(ins))push('{{PG}}');else if(/^NUMPAGES\b/i.test(ins))push('{{NP}}');else walk(c)}
     else if(t=='ins'||t=='smartTag'||t=='sdt'||t=='sdtContent'||t=='moveTo'||t=='customXml'||t=='bdo'||t=='dir'){walk(t=='sdt'?(kid(c,'sdtContent')||c):c)}
     else if(t=='oMath'||t=='oMathPara'){const tx=c.textContent;if(tx.trim()){push('<i>'+E2(tx)+'</i>');txtLen+=tx.length}}
     else if(t=='AlternateContent'){const ch=kid(c,'Choice')||kid(c,'Fallback');if(ch)walk(ch)}}};
   walk(p);return segs}
  function pCss(P,ind){let s='';
   if(P.jc)s+='text-align:'+({left:'left',start:'left',center:'center',right:'right',end:'right',both:'justify',distribute:'justify'}[P.jc]||'left')+';';
   if(P.left)s+='padding-left:'+P.left/20+'pt;';if(P.right)s+='padding-right:'+P.right/20+'pt;';
   if(P.hang)s+='text-indent:-'+P.hang/20+'pt;';else if(P.first)s+='text-indent:'+P.first/20+'pt;';
   s+='margin-top:'+((P.before||0)/20)+'pt;margin-bottom:'+((P.after||0)/20)+'pt;';
   if(P.line){if(P.rule=='exact'||P.rule=='atLeast')s+='line-height:'+(P.line/20)+'pt;';else s+='line-height:'+(P.line/240*1.17).toFixed(3)+';'}
   if(P.shd)s+='background:'+P.shd+';';for(const k of['top','left','bottom','right']){const b=P['b'+k];if(b)s+='border-'+k+':'+brdCss(b)+';'}
   return s}
  function paragraphs(p,ctxP){/* returns array of {h,pbb,sect} blocks */
   const pp=kid(p,'pPr'),dP=parseP(pp),sid=dP.style||defPara,bP=baseP(dP.style);
   let P=mg({},bP);
   let nl=null;const nid=dP.numId!==undefined?dP.numId:bP.numId,il=(dP.ilvl!==undefined?dP.ilvl:bP.ilvl)||0;
   if(nid){nl=listInfo(nid,il);if(nl){const lp=nl.L.p;if(lp.left!==undefined)P.left=lp.left;if(lp.hang!==undefined){P.hang=lp.hang;P.first=undefined}else if(lp.first!==undefined){P.first=lp.first;P.hang=undefined}}}
   mg(P,dP);if(dP.hang===undefined&&dP.first!==undefined)P.hang=undefined;
   const bR=baseR(dP.style),segs=inlineSegs(p,bR,dP.style);
   const out=[];
   let marker='';if(nl&&nl.t!==''){const mr=mg(mg({},bR),nl.L.r),hangPt=(P.hang||360)/20;let ms='min-width:'+hangPt+'pt;';const r0=nl.L.r;if(r0.b!==undefined)ms+='font-weight:'+(r0.b?700:400)+';';if(r0.i)ms+='font-style:italic;';if(r0.color)ms+='color:'+r0.color+';';if(r0.sz)ms+='font-size:'+r0.sz+'pt;';if(r0.font&&!/Symbol|Wingdings/i.test(r0.font))ms+='font-family:'+fontCss(r0.font)+';';
    marker='<span class="wm" style="'+ms+'">'+E2(nl.t)+(nl.L.suff=='space'?' ':'')+'</span>'}
   if(nl&&!P.hang&&P.left===undefined){P.left=720;P.hang=360}
   const css='font-size:'+(bR.sz||11)+'pt;'+(bR.font?'font-family:'+fontCss(bR.font)+';':'')+(bR.b?'font-weight:700;':'')+(bR.i?'font-style:italic;':'')+(bR.color?'color:'+bR.color+';':'')+(bR.u?'text-decoration:underline;':'')+(bR.caps?'text-transform:uppercase;':'')+(bR.sc?'font-variant:small-caps;':'')+pCss(P);
   const isSect=!!kid(pp,'sectPr');
   segs.forEach((sg,i)=>{const plain=sg.replace(/<[^>]*>/g,'').replace(/&nbsp;|\u200b|\s/g,'');const hasImg=/<img|wph|wtx/.test(sg);
    let h=sg;if(i==0)h=marker+h;if(!plain&&!hasImg&&!(i==0&&marker))h='<span>&#8203;</span>';
    out.push({h:'<div class="wp" style="'+css+'">'+h+'</div>',pbb:(i>0)||(i==0&&!!P.pbb)})});
   if(isSect)out[out.length-1].sect=kid(pp,'sectPr');
   return out}
  /* tables */
  function tableHtml(t){
   const tp=kid(t,'tblPr'),sidT=(kid(tp,'tblStyle')&&at(kid(tp,'tblStyle'),'val'))||defTbl;
   const chain=[];{let c=styles[sidT],g=0;while(c&&g++<20){chain.unshift(c);c=c.based?styles[c.based]:null}}
   const bdOf=(el)=>{const o={};if(!el)return o;const b=kid(el,'tblBorders');if(b)for(const k of['top','left','bottom','right','insideH','insideV','start','end']){const v=brd(kid(b,k));if(v)o[k==='start'?'left':k==='end'?'right':k]=v}return o};
   let tb={};for(const c of chain)mg(tb,bdOf(c.tbl));mg(tb,bdOf(tp));
   const marOf=el=>{const o={};const m=el&&kid(el,'tblCellMar');if(m)for(const k of['top','left','bottom','right','start','end']){const e=kid(m,k);if(e)o[k=='start'?'left':k=='end'?'right':k]=num(at(e,'w'))}return o};
   let cm={top:0,left:108,bottom:0,right:108};for(const c of chain)mg(cm,marOf(c.tbl));mg(cm,marOf(tp));
   const look=num(at(kid(tp,'tblLook'),'val'))||0,lk=kid(tp,'tblLook'),flag=(n,bit)=>{const a=lk&&at(lk,n);return a!=null?(a=='1'||a=='true'):!!(look&bit)};
   const fr=flag('firstRow',0x20),lr=flag('lastRow',0x40),fc=flag('firstColumn',0x80),lc=flag('lastColumn',0x100),hb=!flag('noHBand',0x200);
   const grid=kids(kid(t,'tblGrid'),'gridCol').map(g=>num(at(g,'w'))||0);
   const rows=kids(t,'tr'),R=[];
   rows.forEach((tr,ri)=>{let col=0;const cells=[];for(const tc of kids(tr,'tc')){const pr=kid(tc,'tcPr'),gs=num(at(kid(pr,'gridSpan'),'val'))||1,vm=kid(pr,'vMerge');cells.push({tc,pr,col,span:gs,vm:vm?(at(vm,'val')=='restart'?'r':'c'):null,rs:1});col+=gs}R.push({tr,cells,ncol:col})});
   R.forEach((row,ri)=>row.cells.forEach(c=>{if(c.vm=='r'){let k=ri+1;while(k<R.length){const n=R[k].cells.find(x=>x.col==c.col&&x.vm=='c');if(!n)break;n.skip=1;c.rs++;k++}}}));
   const ncols=Math.max(grid.length,...R.map(r=>r.ncol),1);
   let tw=kid(tp,'tblW'),wt=tw?at(tw,'type'):null,wv=tw?num(at(tw,'w')):0,gsum=grid.reduce((a,b)=>a+b,0);
   let wcss=wt=='pct'?'width:'+(wv/50)+'%;':wt=='dxa'&&wv?'width:'+wv/20+'pt;':gsum?'width:'+gsum/20+'pt;':'width:100%;';
   const jc=kid(tp,'jc'),ti=kid(tp,'tblInd');let al='';if(jc){const v=at(jc,'val');if(v=='center')al='margin-left:auto;margin-right:auto;';else if(v=='right'||v=='end')al='margin-left:auto;'}if(ti&&!al)al='margin-left:'+(num(at(ti,'w'))||0)/20+'pt;';
   let h='<div style="overflow:hidden"><table class="wt" style="'+wcss+al+'"><colgroup>'+Array.from({length:ncols},(_,i)=>'<col style="'+(grid[i]?'width:'+grid[i]/20+'pt':'')+'">').join('')+'</colgroup><tbody>';
   const condFor=(ri,ci,row)=>{const o=[],n=R.length,di=ri-(fr?1:0);if(hb&&di>=0&&!(lr&&ri==n-1))o.push(di%2==0?'band1Horz':'band2Horz');if(fc&&ci==0)o.push('firstCol');if(lc&&ci==row.cells.length-1)o.push('lastCol');if(lr&&ri==n-1)o.push('lastRow');if(fr&&ri==0)o.push('firstRow');return o};
   R.forEach((row,ri)=>{const trp=kid(row.tr,'trPr'),th=trp&&kid(trp,'trHeight'),hh=th?num(at(th,'val')):0;h+='<tr'+(hh?' style="height:'+hh/20+'pt"':'')+'>';
    row.cells.forEach((c,ci)=>{if(c.skip)return;
     let bg,tcBd={},bold,rcol,rP={};
     for(const cn of condFor(ri,ci,row))for(const st of chain){const cd=st.cond[cn];if(!cd)continue;if(cd.tc){const sh=kid(cd.tc,'shd');if(sh&&fillOf(sh))bg=fillOf(sh);const tb2=kid(cd.tc,'tcBorders');if(tb2)for(const k of['top','left','bottom','right']){const v=brd(kid(tb2,k));if(v)tcBd[k]=v}}if(cd.r.b!==undefined)bold=cd.r.b;if(cd.r.color)rcol=cd.r.color}
     for(const st of chain){if(st.tcp){const sh=kid(st.tcp,'shd');if(sh&&!bg&&fillOf(sh))bg=fillOf(sh)}}
     const pr=c.pr;if(pr){const sh=kid(pr,'shd');if(sh&&fillOf(sh))bg=fillOf(sh);const b2=kid(pr,'tcBorders');if(b2)for(const k of['top','left','bottom','right','start','end']){const v=brd(kid(b2,k));if(v)tcBd[k=='start'?'left':k=='end'?'right':k]=v}}
     const last=ri+c.rs-1==R.length-1,lastC=c.col+c.span>=ncols;
     const bd={top:tcBd.top||(ri==0?tb.top:tb.insideH),bottom:tcBd.bottom||(last?tb.bottom:tb.insideH),left:tcBd.left||(c.col==0?tb.left:tb.insideV),right:tcBd.right||(lastC?tb.right:tb.insideV)};
     let s='';for(const k of['top','left','bottom','right'])if(bd[k])s+='border-'+k+':'+brdCss(bd[k])+';';
     let pd=Object.assign({},cm);const mar=pr&&kid(pr,'tcMar');if(mar)for(const k of['top','left','bottom','right']){const e=kid(mar,k);if(e)pd[k]=num(at(e,'w'))}
     s+='padding:'+pd.top/20+'pt '+pd.right/20+'pt '+pd.bottom/20+'pt '+pd.left/20+'pt;';if(bg)s+='background:'+bg+';';
     const va=pr&&kid(pr,'vAlign');if(va){const v=at(va,'val');s+='vertical-align:'+(v=='center'?'middle':v=='bottom'?'bottom':'top')+';'}
     let inner=blocksHtml(c.tc,{bold,color:rcol});
     h+='<td'+(c.span>1?' colspan="'+c.span+'"':'')+(c.rs>1?' rowspan="'+c.rs+'"':'')+' class="wc" style="'+s+'">'+inner+'</td>'});
    h+='</tr>'});
   return h+'</tbody></table></div>'}
  function blocksHtml(parent,extra){let o='';for(const c of parent.children){const t=c.localName;if(t=='p'){for(const b of paragraphs(c))o+=b.h}else if(t=='tbl')o+=tableHtml(c);else if(t=='sdt'){const sc=kid(c,'sdtContent');if(sc)o+=blocksHtml(sc)}}
   if(extra&&(extra.bold||extra.color)){o='<div style="'+(extra.bold?'font-weight:700;':'')+(extra.color?'color:'+extra.color+';':'')+'">'+o+'</div>'}return o}
  return{paragraphs,tableHtml,blocksHtml}};
 /* ---- convert body ---- */
 const rels=await relsOf('word/document.xml');await loadImgs(dx,rels,'word/document.xml');
 const C=mkConv('word/document.xml',rels);
 const blocks=[],sects=[];let curSect=0;
 const pushBlock=(h,pbb,after)=>{const d=document.createElement('div');d.innerHTML=h;const el=d.firstElementChild||d;blocks.push({el,pbb,sec:sects.length,after})};
 const secInfo=sp=>{const g=(t)=>kid(sp,t),sz=g('pgSz'),mr=g('pgMar'),o={w:num(at(sz,'w'))||11906,h:num(at(sz,'h'))||16838,t:num(at(mr,'top'))??1440,r:num(at(mr,'right'))??1440,b:num(at(mr,'bottom'))??1440,l:num(at(mr,'left'))??1440,hd:num(at(mr,'header'))??708,ft:num(at(mr,'footer'))??708,hdr:{},ftr:{},tp:kid(sp,'titlePg')?1:0,type:at(g('type'),'val')||'nextPage'};
  if(at(sz,'orient')=='landscape'&&o.w<o.h){const t=o.w;o.w=o.h;o.h=t}
  for(const r of kids(sp,'headerReference'))o.hdr[at(r,'type')||'default']=rat(r,'id');for(const r of kids(sp,'footerReference'))o.ftr[at(r,'type')||'default']=rat(r,'id');return o};
 const lastSp=kid(body,'sectPr');
 for(const c of body.children){const t=c.localName;
  if(t=='p'){const bs=C.paragraphs(c);bs.forEach((b,i)=>{pushBlock(b.h,b.pbb,false)});const last=bs[bs.length-1];if(last&&last.sect){const si=secInfo(last.sect);sects.push(si);if(blocks.length)blocks[blocks.length-1].endSect=true}}
  else if(t=='tbl')pushBlock(C.tableHtml(c),false,false);
  else if(t=='sdt'){const sc=kid(c,'sdtContent');if(sc)for(const cc of sc.children){if(cc.localName=='p')for(const b of C.paragraphs(cc))pushBlock(b.h,b.pbb);else if(cc.localName=='tbl')pushBlock(C.tableHtml(cc))}}}
 sects.push(secInfo(lastSp));
 /* section index per block: blocks before the i-th sect end belong to sect i */
 {let s=0;for(const b of blocks){b.sec=s;if(b.endSect)s++}}
 if(!blocks.length)pushBlock('<div class="wp" style="font-size:11pt"><span>&#8203;</span></div>');
 /* headers / footers */
 const partHtml=async(rid)=>{if(!rid||!rels[rid])return null;const p=absP('word/document.xml',rels[rid].t),s=await get(p);if(!s)return null;const d=xmlp(s),rl=await relsOf(p);await loadImgs(d,rl,p);const c=mkConv(p,rl);return c.blocksHtml(d.documentElement)};
 const hfCache={};for(const s of sects){for(const grp of[s.hdr,s.ftr])for(const k in grp){const id=grp[k];if(id&&hfCache[id]===undefined){try{hfCache[id]=await partHtml(id)}catch(e){hfCache[id]=null}}}}
 /* ---- build UI ---- */
 host.innerHTML='';const app=O.h('div','wd-app'+(opt.inline?' wd-in':'')+(opt.fill?' ofx-fill':''));
 app.innerHTML='<div class="wd-tools"><button data-m="print" class="on" title="Pages like in Word">Print layout</button><button data-m="read" title="Text reflows to fit the screen">Read mode</button><span class="sp"></span><button data-z="-" aria-label="Zoom out">−</button><span class="wd-zl">100%</span><button data-z="+" aria-label="Zoom in">＋</button><button data-z="fit">Fit</button></div><div class="wd-canvas" tabindex="0"><div class="wd-zwrap"><div class="wd-pages wd-pg-f"></div></div></div><div class="wd-st"><span class="wd-pn">Page 1 of 1</span><span class="wd-wc"></span><span class="sp"></span><span class="wd-md"></span></div>';
 host.appendChild(app);
 const cv=app.querySelector('.wd-canvas'),zw=app.querySelector('.wd-zwrap'),pgsEl=app.querySelector('.wd-pages'),pn=app.querySelector('.wd-pn'),zl=app.querySelector('.wd-zl'),md=app.querySelector('.wd-md');
 let mode='print',zoomMode='fit',zoom=1,pages=[],maxW=816,totalH=0;
 const px=t=>t/15;
 /* words */
 {let wc=0;for(const b of blocks){const t=b.el.textContent.trim();if(t)wc+=t.split(/\s+/).length}app.querySelector('.wd-wc').textContent=wc.toLocaleString()+(wc==1?' word':' words')}
 const hfFor=(s,grp,first,idx)=>{const id=(first&&s.tp&&grp.first)?grp.first:grp.default;return id&&hfCache[id]!=null?hfCache[id]:''};
 function build(){
  pgsEl.innerHTML='';pages=[];pgsEl.style.cssText='';
  /* measure */
  const gmap=[];sects.forEach((s,i)=>{const p=sects[i-1];gmap[i]=(i>0&&s.type=='continuous'&&p&&p.w==s.w&&p.h==s.h&&p.l==s.l&&p.r==s.r&&p.t==s.t&&p.b==s.b)?gmap[i-1]:i});
  const bySec=[];for(const b of blocks){const g=gmap[Math.min(b.sec,sects.length-1)];(bySec[g]=bySec[g]||[]).push(b)}
  const tmpHost=O.h('div');tmpHost.style.cssText='position:absolute;left:-99999px;top:0;visibility:hidden;pointer-events:none';tmpHost.className='wd-pg-f';cv.appendChild(tmpHost);
  const plan=[];
  bySec.forEach((bl,si)=>{if(!bl)return;const s=sects[Math.min(si,sects.length-1)],cw=px(s.w-s.l-s.r),chh=px(s.h-s.t-s.b),m=O.h('div');m.style.cssText='width:'+cw+'px;display:flow-root';tmpHost.appendChild(m);
   for(const b of bl){b.el.style.marginTop='';m.appendChild(b.el)}
   const mt=m.getBoundingClientRect().top;let cur=[],startY=null,pgs=[];
   const flush=()=>{pgs.push(cur);cur=[];startY=null};
   for(let i=0;i<bl.length;i++){const b=bl[i],r=b.el.getBoundingClientRect();
    if(cur.length&&b.pbb){flush()}
    if(startY===null)startY=r.top;
    if(cur.length&&r.bottom-startY>chh+.5){flush();startY=r.top}
    cur.push(b)}
   if(cur.length||!pgs.length)flush();
   plan.push({s,si,pgs});m.remove()});
  tmpHost.remove();
  /* render pages */
  let n=0;const total=plan.reduce((a,p)=>a+p.pgs.length,0);maxW=0;
  plan.forEach(pl=>pl.pgs.forEach((bl,pi)=>{n++;const s=pl.s,pg=O.h('div','wd-page');pg.style.cssText='width:'+px(s.w)+'px;min-height:'+px(s.h)+'px;box-sizing:border-box;padding:'+px(s.t)+'px '+px(s.r)+'px '+px(s.b)+'px '+px(s.l)+'px';maxW=Math.max(maxW,px(s.w));
   const hd=O.h('div','wd-hd'),ft=O.h('div','wd-ft'),bd=O.h('div','wd-body'),first=(pi==0);
   hd.style.top=px(s.hd)+'px';hd.style.paddingLeft=px(s.l)+'px';hd.style.paddingRight=px(s.r)+'px';ft.style.bottom=px(s.ft)+'px';ft.style.paddingLeft=px(s.l)+'px';ft.style.paddingRight=px(s.r)+'px';
   hd.innerHTML=hfFor(s,s.hdr,first).replace(/\{\{PG\}\}/g,n).replace(/\{\{NP\}\}/g,total);ft.innerHTML=hfFor(s,s.ftr,first).replace(/\{\{PG\}\}/g,n).replace(/\{\{NP\}\}/g,total);
      bl.forEach((b,i)=>{if(i==0)b.el.style.marginTop='0';bd.appendChild(b.el)});
   pg.appendChild(hd);pg.appendChild(ft);pg.appendChild(bd);pgsEl.appendChild(pg);pages.push(pg)}));
  pgsEl.style.width=maxW+'px';md.textContent='';layout()}
 function buildRead(){pgsEl.innerHTML='';pages=[];pgsEl.style.cssText='';const rd=O.h('div','wd-read');for(const b of blocks){b.el.style.marginTop='';rd.appendChild(b.el)}
  /* in read mode header/footer are not repeated */
  pgsEl.appendChild(rd);md.textContent='Read mode';pgsEl.style.width='100%';layout()}
 function layout(){
  const cw=cv.clientWidth||host.clientWidth||600;
  if(mode=='print'){const fit=Math.min(1,(cw-(opt.inline?10:24))/maxW);zoom=zoomMode=='fit'?Math.max(.2,fit):zoom;pgsEl.style.transform='scale('+zoom+')';
   const w=maxW*zoom,h=pgsEl.scrollHeight*zoom;zw.style.width=w+'px';zw.style.height=h+'px';zl.textContent=Math.round(zoom*100)+'%'}
  else{pgsEl.style.transform='';pgsEl.style.width='';zw.style.width='100%';zw.style.height='';zl.textContent='';const rd=pgsEl.firstChild;if(rd){rd.style.zoom=zoomMode=='fit'?'':String(zoom)}}
  cur()}
 function cur(){if(mode!='print'||!pages.length){pn.textContent=mode=='print'?'':'Reading view';return}
  const top=cv.getBoundingClientRect().top+cv.clientHeight/3;let k=0;for(let i=0;i<pages.length;i++){if(pages[i].getBoundingClientRect().top<=top)k=i;else break}pn.textContent='Page '+(k+1)+' of '+pages.length}
 let sraf=0;cv.addEventListener('scroll',()=>{if(sraf)return;sraf=requestAnimationFrame(()=>{sraf=0;cur()})},{passive:true});
 const setMode=m=>{if(mode==m)return;mode=m;app.querySelectorAll('[data-m]').forEach(b=>b.classList.toggle('on',b.dataset.m==m));zoomMode='fit';zoom=1;m=='print'?build():buildRead();cv.scrollTop=0};
 const setZoom=d=>{zoomMode='manual';zoom=Math.max(.3,Math.min(3,zoom+d));layout()};
 app.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.m)setMode(b.dataset.m);else if(b.dataset.z=='+')setZoom(.1);else if(b.dataset.z=='-')setZoom(-.1);else if(b.dataset.z=='fit'){zoomMode='fit';layout()}});
 cv.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&(e.key=='+'||e.key=='='||e.key=='-')){e.preventDefault();setZoom(e.key=='-'?-.1:.1)}});
 cv.addEventListener('wheel',e=>{if(e.ctrlKey&&mode=='print'){e.preventDefault();setZoom(e.deltaY<0?.1:-.1)}},{passive:false});
 /* pinch zoom on touch screens */
 {let d0=0,z0=1;cv.addEventListener('touchstart',e=>{if(e.touches.length==2){d0=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);z0=zoom}},{passive:true});
  cv.addEventListener('touchmove',e=>{if(e.touches.length==2&&d0&&mode=='print'){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);zoomMode='manual';zoom=Math.max(.3,Math.min(3,z0*d/d0));layout()}},{passive:true});cv.addEventListener('touchend',()=>{d0=0},{passive:true})}
 build();
 let rt=0;const onR=()=>{clearTimeout(rt);rt=setTimeout(()=>{if(!app.isConnected){window.removeEventListener('resize',onR);return}if(zoomMode=='fit')layout();else cur()},120)};
 window.addEventListener('resize',onR);let ro=null;if(window.ResizeObserver){ro=new ResizeObserver(onR);ro.observe(cv)}
 /* fonts can arrive late: re-flow once they are ready */
 try{if(document.fonts&&document.fonts.status=='loading')document.fonts.ready.then(()=>{if(app.isConnected&&mode=='print'&&!opt.noRebuild)build()})}catch(e){}
 return{app,pages:()=>pages.length,setMode,destroy(){urls.forEach(u=>URL.revokeObjectURL(u));urls.length=0;window.removeEventListener('resize',onR);if(ro)ro.disconnect()}}};
})();

/* ===== OFX: Notepad-style text viewer (.txt) — white window, menu bar, status bar ===== */
(()=>{
const O=window.OFX,E=O.esc;
O.css('ofx-np-css',`
.np-app{display:flex;flex-direction:column;height:100%;min-height:0;background:#fff;color:#000;font-family:"Segoe UI",system-ui,-apple-system,Roboto,sans-serif;position:relative}
.np-menu{flex:none;display:flex;align-items:center;gap:0;padding:0 4px;background:#fff;border-bottom:1px solid #e5e5e5;font-size:13px;position:relative;overflow:visible;z-index:3}
.np-menu>button{font:inherit;color:#000;background:none;border:0;padding:7px 11px;cursor:pointer;border-radius:4px;-webkit-appearance:none;appearance:none}
.np-menu>button:hover,.np-menu>button.on{background:#e5e5e5}
.np-menu .sp{flex:1}
.np-dd{position:absolute;top:100%;min-width:230px;background:#fff;border:1px solid #d0d0d0;border-radius:6px;box-shadow:0 8px 24px rgba(0,0,0,.18);padding:4px;display:none;z-index:5}
.np-dd.on{display:block}
.np-dd button{display:flex;width:100%;align-items:center;gap:10px;background:none;border:0;padding:8px 12px;font:13px "Segoe UI",system-ui,sans-serif;color:#000;text-align:left;border-radius:4px;cursor:pointer;-webkit-appearance:none;appearance:none}
.np-dd button:hover{background:#e5e5e5}
.np-dd button i{font-style:normal;width:14px;color:#0067c0}
.np-dd button kbd{margin-left:auto;color:#777;font:11.5px "Segoe UI",system-ui,sans-serif;padding-left:20px}
.np-dd hr{border:0;border-top:1px solid #e3e3e3;margin:4px 6px}
.np-find{flex:none;display:flex;align-items:center;gap:6px;padding:6px 10px;background:#f7f7f7;border-bottom:1px solid #e0e0e0;font-size:13px}
.np-find[hidden]{display:none}
.np-find input{flex:1;min-width:60px;max-width:320px;border:1px solid #bbb;border-radius:4px;padding:5px 8px;font:13px "Segoe UI",system-ui,sans-serif;background:#fff;color:#000}
.np-find button{border:1px solid #c8c8c8;background:#fff;border-radius:4px;padding:5px 9px;font:13px "Segoe UI",system-ui,sans-serif;color:#000;cursor:pointer}
.np-find .c{color:#666;font-size:12px;min-width:56px}
.np-ta{flex:1;min-height:0;width:100%;resize:none;border:0;outline:none;margin:0;padding:6px 10px;background:#fff;color:#000;font-family:Consolas,"Cascadia Mono","Lucida Console","Courier New",ui-monospace,Menlo,monospace;line-height:1.4;tab-size:8;-moz-tab-size:8;white-space:pre-wrap;overflow:auto;-webkit-overflow-scrolling:touch;caret-color:#000;border-radius:0;-webkit-appearance:none;appearance:none}
.np-ta.nw{white-space:pre;overflow-wrap:normal}
.np-ta::selection{background:#0078d7;color:#fff}
.np-st{flex:none;display:flex;align-items:center;background:#f3f3f3;border-top:1px solid #e0e0e0;font-size:12px;color:#222;white-space:nowrap;overflow:hidden}
.np-st span{padding:5px 14px;border-right:1px solid #dcdcdc}
.np-st span:last-child{border-right:0}
.np-st .sp{flex:1;border:0;padding:0}
.np-st[hidden]{display:none}
@media(max-width:560px){.np-st span{padding:5px 8px}.np-st .hide-sm{display:none}}
`);
const EOLN={crlf:'Windows (CRLF)',lf:'Unix (LF)',cr:'Macintosh (CR)'};
O.notepad=function(raw,host,opt){
 opt=opt||{};const MAX=6e6;let more=0,txt=raw;if(txt.length>MAX){more=txt.length-MAX;txt=txt.slice(0,MAX)}
 const crlf=(txt.match(/\r\n/g)||[]).length,lf=(txt.match(/(^|[^\r])\n/g)||[]).length,cr=(txt.match(/\r(?!\n)/g)||[]).length;
 const eol=crlf>=lf&&crlf>=cr&&crlf?'crlf':cr>lf&&cr>crlf?'cr':lf?'lf':(opt.eol||'crlf');
 let shown=txt.replace(/\r\n?/g,'\n');const canEdit=!!opt.onVaultSave&&!opt.inline&&!more;
 host.innerHTML='';const app=O.h('div','np-app'+(opt.inline?' np-in':'')+(opt.fill?' ofx-fill':''));
 app.innerHTML='<div class="np-menu"><button data-m="file">File</button><button data-m="edit">Edit</button><button data-m="fmt">Format</button><button data-m="view">View</button><span class="sp"></span>'+(canEdit?'<button data-a="vsave" class="np-sv">💾 Save</button>':'')+'</div>'+
  '<div class="np-find" hidden><input type="search" placeholder="Find" aria-label="Find"><button data-f="prev" aria-label="Previous">▲</button><button data-f="next" aria-label="Next">▼</button><span class="c"></span><button data-f="x" aria-label="Close">✕</button></div>'+
  '<textarea class="np-ta"'+(canEdit?'':' readonly')+' spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Text"></textarea>'+
  '<div class="np-st"><span class="ln">Ln 1, Col 1</span><span class="ch hide-sm"></span><span class="sp"></span><span class="zm">100%</span><span class="eo hide-sm">'+EOLN[eol]+'</span><span class="en">'+E(opt.enc||'UTF-8')+'</span></div>';
 host.appendChild(app);
 const ta=app.querySelector('.np-ta'),st=app.querySelector('.np-st'),menu=app.querySelector('.np-menu'),fd=app.querySelector('.np-find'),fi=fd.querySelector('input'),fcnt=fd.querySelector('.c');
 ta.value=shown;try{ta.setSelectionRange(0,0);ta.scrollTop=0}catch(e){}
 const S={wrap:opt.inline?1:(opt.wrap===undefined?1:opt.wrap),zoom:100,status:1};
 const base=opt.inline?13:15;
 const applyFmt=()=>{ta.classList.toggle('nw',!S.wrap);ta.wrap=S.wrap?'soft':'off';ta.style.fontSize=(base*S.zoom/100)+'px';app.querySelector('.zm').textContent=S.zoom+'%';st.hidden=!S.status};
 /* positions */
 let nlIdx=null;const nls=()=>{if(nlIdx)return nlIdx;nlIdx=[];for(let i=shown.indexOf('\n');i>=0;i=shown.indexOf('\n',i+1))nlIdx.push(i);return nlIdx};
 const lc=pos=>{const a=nls();let lo=0,hi=a.length;while(lo<hi){const m=(lo+hi)>>1;if(a[m]<pos)lo=m+1;else hi=m}return{l:lo+1,c:pos-(lo?a[lo-1]+1:0)+1}};
 const upPos=()=>{const p=lc(ta.selectionStart||0);app.querySelector('.ln').textContent='Ln '+p.l+', Col '+p.c;const sel=Math.abs((ta.selectionEnd||0)-(ta.selectionStart||0));app.querySelector('.ch').textContent=sel?sel.toLocaleString()+' of '+shown.length.toLocaleString()+' characters':shown.length.toLocaleString()+' characters'+(more?' (+'+more.toLocaleString()+' not shown)':'')};
 ['keyup','click','select','input','touchend','focus'].forEach(n=>ta.addEventListener(n,()=>setTimeout(upPos,0)));
 document.addEventListener('selectionchange',function f(){if(!app.isConnected){document.removeEventListener('selectionchange',f);return}if(document.activeElement===ta)upPos()});
 /* menus */
 const items={
  file:(canEdit?[['💾','Save','Ctrl+S','vsave']]:[]).concat([['⬇','Save a copy','','save']]),
  edit:[['','Copy all','Ctrl+C','copy'],['','Select all','Ctrl+A','all'],['','Find…','Ctrl+F','find'],['','Go to line…','Ctrl+G','goto']],
  fmt:[['✓','Word wrap','','wrap'],['','Increase font size','Ctrl +','zin'],['','Decrease font size','Ctrl −','zout']],
  view:[['','Zoom in','Ctrl +','zin'],['','Zoom out','Ctrl −','zout'],['','Restore default zoom','Ctrl 0','zrs'],['✓','Status bar','','status']]};
 let dd=null;
 const closeDd=()=>{if(dd){dd.remove();dd=null}menu.querySelectorAll('button').forEach(b=>b.classList.remove('on'))};
 const openDd=(k,btn)=>{const same=btn.classList.contains('on');closeDd();if(same)return;btn.classList.add('on');dd=O.h('div','np-dd on');dd.style.left=btn.offsetLeft+'px';
  dd.innerHTML=items[k].map(it=>{let ic=it[0];if(it[3]=='wrap')ic=S.wrap?'✓':'';if(it[3]=='status')ic=S.status?'✓':'';return'<button data-a="'+it[3]+'"><i>'+ic+'</i>'+E(it[1])+(it[2]?'<kbd>'+it[2]+'</kbd>':'')+'</button>'}).join('');menu.appendChild(dd)};
 let dirty=false,edited=false;const svBtn=app.querySelector('.np-sv'),setDirty=d=>{dirty=d;if(svBtn)svBtn.classList.toggle('dirty',d)},toEol=s=>eol=='crlf'?s.replace(/\n/g,'\r\n'):eol=='cr'?s.replace(/\n/g,'\r'):s;
 const doVSave=async()=>{if(!canEdit)return;try{await opt.onVaultSave(toEol(ta.value));setDirty(false)}catch(e){if(opt.toast)opt.toast('Could not save')}};
 if(canEdit)ta.addEventListener('input',()=>{shown=ta.value;nlIdx=null;raw=shown;edited=true;setDirty(true)});
 const doSave=()=>{if(opt.onSave)return opt.onSave();const b=(edited?null:opt.blob)||new Blob([toEol(ta.value)],{type:'text/plain'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=opt.name||'text.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000)};
 const copyAll=()=>{const t=raw;const done=()=>{if(opt.toast)opt.toast('Copied')};try{navigator.clipboard.writeText(t).then(done,fb)}catch(e){fb()}function fb(){ta.select();try{document.execCommand('copy');done()}catch(e){}}};
 const act=a=>{closeDd();
  if(a=='save')doSave();else if(a=='vsave')doVSave();else if(a=='copy')copyAll();else if(a=='all'){ta.focus();ta.select();upPos()}
  else if(a=='find')openFind();else if(a=='goto'){const v=prompt('Go to line (1 – '+(nls().length+1)+'):','1');if(v){const n=Math.max(1,Math.min(nls().length+1,parseInt(v,10)||1)),a2=nls(),pos=n==1?0:a2[n-2]+1;jump(pos,pos)}}
  else if(a=='wrap'){S.wrap=S.wrap?0:1;applyFmt()}else if(a=='status'){S.status=S.status?0:1;applyFmt()}
  else if(a=='zin'){S.zoom=Math.min(500,S.zoom+10);applyFmt()}else if(a=='zout'){S.zoom=Math.max(20,S.zoom-10);applyFmt()}else if(a=='zrs'){S.zoom=100;applyFmt()}};
 menu.addEventListener('click',e=>{const m=e.target.closest('[data-m]'),a=e.target.closest('[data-a]');if(a){act(a.dataset.a);return}if(m)openDd(m.dataset.m,m)});
 app.addEventListener('mousedown',e=>{if(dd&&!e.target.closest('.np-menu'))closeDd()});app.addEventListener('touchstart',e=>{if(dd&&!e.target.closest('.np-menu'))closeDd()},{passive:true});
 /* find */
 let hits=[],hi=-1,fq='';
 const jump=(a,b)=>{ta.focus({preventScroll:true});try{ta.setSelectionRange(a,b)}catch(e){}
  /* scroll the match into view even with soft wrapping: measure with a mirror */
  const mir=O.h('div');const cs=getComputedStyle(ta);mir.style.cssText='position:absolute;visibility:hidden;left:-9999px;top:0;white-space:'+(S.wrap?'pre-wrap':'pre')+';overflow-wrap:'+(S.wrap?'break-word':'normal')+';width:'+(ta.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight))+'px;font:'+cs.font+';line-height:'+cs.lineHeight+';tab-size:8';
  mir.textContent=shown.slice(0,a);const sp=O.h('span');sp.textContent='​';mir.appendChild(sp);app.appendChild(mir);const y=sp.offsetTop;mir.remove();
  const lh=parseFloat(cs.lineHeight)||20;if(y<ta.scrollTop+lh||y>ta.scrollTop+ta.clientHeight-lh*2)ta.scrollTop=Math.max(0,y-ta.clientHeight/3);upPos()};
 const run=()=>{const q=fi.value;fq=q;hits=[];hi=-1;if(!q){fcnt.textContent='';return}const L=shown.toLowerCase(),ql=q.toLowerCase();let i=L.indexOf(ql),n=0;while(i>=0&&n<20000){hits.push(i);n++;i=L.indexOf(ql,i+Math.max(1,ql.length))}
  if(!hits.length){fcnt.textContent='No results';return}const from=ta.selectionStart||0;hi=Math.max(0,hits.findIndex(h=>h>=from));go(0)};
 const go=d=>{if(!hits.length)return;hi=(hi+d+hits.length)%hits.length;fcnt.textContent=(hi+1)+' / '+hits.length+(hits.length>=20000?'+':'');jump(hits[hi],hits[hi]+fq.length);fi.focus({preventScroll:true})};
 const openFind=()=>{fd.hidden=false;fi.focus();fi.select()};
 const closeFind=()=>{fd.hidden=true;ta.focus({preventScroll:true})};
 fi.addEventListener('input',run);fi.addEventListener('keydown',e=>{e.stopPropagation();if(e.key=='Enter'){e.preventDefault();if(fi.value!==fq)run();else go(e.shiftKey?-1:1)}else if(e.key=='Escape'){e.preventDefault();closeFind()}});
 fd.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b)return;const f=b.dataset.f;if(f=='x')closeFind();else{if(fi.value!==fq)run();else go(f=='next'?1:-1)}});
 app.addEventListener('keydown',e=>{const c=e.ctrlKey||e.metaKey;if(c&&(e.key=='s'||e.key=='S')&&canEdit){e.preventDefault();e.stopPropagation();doVSave();return}if(c&&(e.key=='f'||e.key=='F')){e.preventDefault();e.stopPropagation();openFind()}else if(c&&(e.key=='g'||e.key=='G')){e.preventDefault();act('goto')}
  else if(c&&(e.key=='+'||e.key=='=')){e.preventDefault();act('zin')}else if(c&&e.key=='-'){e.preventDefault();act('zout')}else if(c&&e.key=='0'){e.preventDefault();act('zrs')}
  else if(e.key=='Escape'&&dd){e.stopPropagation();closeDd()}else if(e.key=='Escape'&&!fd.hidden){e.stopPropagation();closeFind()}});
 ta.addEventListener('wheel',e=>{if(e.ctrlKey){e.preventDefault();act(e.deltaY<0?'zin':'zout')}},{passive:false});
 {let d0=0,z0=100;ta.addEventListener('touchstart',e=>{if(e.touches.length==2){d0=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);z0=S.zoom}},{passive:true});
  ta.addEventListener('touchmove',e=>{if(e.touches.length==2&&d0){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);S.zoom=Math.max(40,Math.min(400,Math.round(z0*d/d0/10)*10));applyFmt()}},{passive:true});ta.addEventListener('touchend',()=>{d0=0},{passive:true})}
 applyFmt();upPos();
 return{app,ta,destroy(){closeDd()},dirty:()=>dirty,save:doVSave}};
})();

/* ===== OFX: PowerPoint-style presentation viewer (.pptx) — real slide rendering, thumbnails, full-screen slide show ===== */
(()=>{
const O=window.OFX,E=O.esc;
O.css('ofx-pptx-css',`
.pt-app{display:flex;flex-direction:column;height:100%;min-height:0;background:#e9e9e9;color:#222;font-family:"Segoe UI",system-ui,-apple-system,Roboto,sans-serif;outline:none}
.pt-tools{flex:none;display:flex;align-items:center;gap:6px;padding:6px 10px;background:#f3f3f3;border-bottom:1px solid #d4d4d4;overflow-x:auto;scrollbar-width:none}
.pt-tools::-webkit-scrollbar{display:none}
.pt-tools .sp{flex:1}
.pt-tools button,.pt-st button{font:600 12.5px/1 "Segoe UI",system-ui,sans-serif;color:#222;background:#fff;border:1px solid #c8c8c8;border-radius:5px;padding:7px 11px;cursor:pointer;white-space:nowrap;-webkit-appearance:none;appearance:none}
.pt-tools button:hover,.pt-st button:hover{background:#fbe9e3;border-color:#e0a898}
.pt-tools button.red{background:#c43e1c;border-color:#c43e1c;color:#fff}
.pt-tools button.red:hover{background:#a93417}
.pt-main{flex:1;min-height:0;display:flex}
.pt-rail{flex:none;width:176px;overflow-y:auto;background:#f3f3f3;border-right:1px solid #d4d4d4;padding:10px 8px;-webkit-overflow-scrolling:touch}
.pt-th{display:flex;gap:6px;align-items:flex-start;margin-bottom:10px;cursor:pointer}
.pt-th i{font-style:normal;font-size:12px;color:#666;width:16px;text-align:right;padding-top:2px;flex:none}
.pt-th .b{position:relative;flex:1;border:2px solid transparent;border-radius:3px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px #cfcfcf;min-width:0}
.pt-th.on .b{border-color:#c43e1c}
.pt-th.on i{color:#c43e1c;font-weight:700}
.pt-stage{flex:1;min-width:0;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:14px;touch-action:pan-y}
.pt-wrap{position:relative;flex:none;box-shadow:0 2px 6px rgba(0,0,0,.25),0 10px 30px -10px rgba(0,0,0,.3);background:#fff}
.pt-narrow .pt-main{flex-direction:column}
.pt-narrow .pt-rail{width:auto;height:92px;flex:none;overflow-x:auto;overflow-y:hidden;display:flex;gap:8px;border-right:0;border-top:1px solid #d4d4d4;order:2;padding:8px}
.pt-narrow .pt-th{flex:none;width:120px;margin:0}
.pt-narrow .pt-th i{display:none}
.pt-narrow .pt-stage{padding:8px}
.pt-st{flex:none;display:flex;align-items:center;gap:10px;padding:5px 10px;background:#f3f3f3;border-top:1px solid #d4d4d4;font-size:12px;color:#444;white-space:nowrap}
.pt-st .sp{flex:1}
.pt-st button{padding:5px 10px}
.pt-in .pt-tools{display:none}
.pt-in .pt-rail{display:none}
.pt-in .pt-stage{padding:8px}
/* slide */
.ps{position:absolute;left:0;top:0;transform-origin:0 0;overflow:hidden;background:#fff;color:#000;font-family:Calibri,Carlito,"Segoe UI",Arial,sans-serif}
.ps .sh{position:absolute;box-sizing:border-box}
.ps .sh svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
.ps .tx{position:absolute;left:0;top:0;width:100%;height:100%;display:flex;flex-direction:column;box-sizing:border-box;overflow:visible;tab-size:96px;-moz-tab-size:96px;overflow-wrap:break-word;word-wrap:break-word}
.ps .tx p{margin:0;white-space:pre-wrap}
.ps .tx a{color:inherit;text-decoration:underline}
.ps .bm{display:inline-block;flex:none;white-space:pre}
.ps img{display:block}
.ps table.tb{border-collapse:collapse;table-layout:fixed;position:absolute}
.ps table.tb td{overflow:hidden;vertical-align:top;overflow-wrap:break-word}
.ps .ph{display:flex;align-items:center;justify-content:center;background:#f2f2f2;border:1px dashed #bbb;color:#777;font:20px "Segoe UI",sans-serif;text-align:center}
/* slide show */
.pt-show{position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147483000;background:#000;display:flex;align-items:center;justify-content:center;overflow:hidden;user-select:none;-webkit-user-select:none;outline:none;touch-action:pan-y;-webkit-tap-highlight-color:transparent}
.pt-show.nocur{cursor:none}
.pt-show .pt-wrap{box-shadow:none;transition:opacity .28s ease}
.pt-show .pt-wrap.out{opacity:0}
.pt-show.blk .pt-wrap{visibility:hidden}.pt-show.wht{background:#fff}.pt-show.wht .pt-wrap{visibility:hidden}
.pt-show .end{position:absolute;inset:0;display:none;align-items:center;justify-content:center;color:#aaa;font:18px system-ui,sans-serif;text-align:center;padding:20px}
.pt-show.fin .end{display:flex}.pt-show.fin .pt-wrap{display:none}
.pt-ctl{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);display:flex;align-items:center;gap:4px;background:rgba(30,30,30,.82);border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:5px 8px;color:#fff;font:13px system-ui,sans-serif;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:opacity .25s;z-index:3}
.pt-show.nocur .pt-ctl,.pt-show.fin .pt-ctl{opacity:0;pointer-events:none}
.pt-ctl button{background:none;border:0;color:#fff;font:600 14px system-ui,sans-serif;min-width:36px;height:34px;border-radius:999px;cursor:pointer;padding:0 8px;-webkit-appearance:none;appearance:none}
.pt-ctl button:hover{background:rgba(255,255,255,.16)}
.pt-ctl button.on{background:#c43e1c}
.pt-ctl .n{padding:0 8px;font-variant-numeric:tabular-nums;min-width:62px;text-align:center}
.pt-bar{position:absolute;left:0;bottom:0;height:3px;background:#c43e1c;transition:width .25s;z-index:2}
.pt-laser{position:absolute;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:radial-gradient(circle,#ff3b30 0,#ff3b30 40%,rgba(255,59,48,.35) 70%,transparent 72%);pointer-events:none;display:none;z-index:4}
`);
const xmlp=s=>new DOMParser().parseFromString(s,'application/xml');
const kids=(n,t)=>{const o=[];if(n)for(let c=n.firstElementChild;c;c=c.nextElementSibling)if(!t||c.localName==t)o.push(c);return o};
const kid=(n,t)=>{if(n)for(let c=n.firstElementChild;c;c=c.nextElementSibling)if(c.localName==t)return c;return null};
const desc=(n,t)=>n?[...n.getElementsByTagNameNS('*',t)]:[];
const A=(e,n)=>e?e.getAttribute(n):null;
const N=(e,n,d)=>{const v=e?e.getAttribute(n):null;return v==null||v===''||!isFinite(+v)?d:+v};
const rid=(e,n)=>{if(!e)return null;let v=e.getAttribute('r:'+n);if(v!=null)return v;for(const a of e.attributes)if(a.localName==n&&/relationships/.test(a.namespaceURI||''))return a.value;return null};
const absP=(base,t)=>{if(t.startsWith('/'))return t.slice(1);const o=base.split('/').slice(0,-1);for(const x of t.split('/')){if(x=='..')o.pop();else if(x!='.')o.push(x)}return o.join('/')};
const MIMES={png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',jpe:'image/jpeg',gif:'image/gif',bmp:'image/bmp',webp:'image/webp',svg:'image/svg+xml',avif:'image/avif'};
const FONTS={calibri:'Calibri,Carlito,"Segoe UI",Arial,sans-serif','calibri light':'"Calibri Light",Carlito,Calibri,"Segoe UI",Arial,sans-serif','times new roman':'"Times New Roman",Tinos,"Liberation Serif",Times,serif',arial:'Arial,Arimo,"Liberation Sans",Helvetica,sans-serif',cambria:'Cambria,Caladea,Georgia,serif','courier new':'"Courier New",Cousine,monospace',consolas:'Consolas,"Courier New",monospace',verdana:'Verdana,"DejaVu Sans",sans-serif',tahoma:'Tahoma,"DejaVu Sans",sans-serif',georgia:'Georgia,serif','segoe ui':'"Segoe UI",system-ui,sans-serif',garamond:'Garamond,"EB Garamond",serif','century gothic':'"Century Gothic",Futura,sans-serif','trebuchet ms':'"Trebuchet MS",sans-serif'};
const fontCss=n=>{if(!n)return'';const k=n.toLowerCase();return FONTS[k]||('"'+n.replace(/["\\]/g,'')+'",Calibri,Carlito,"Segoe UI",Arial,sans-serif')};
const PRST={black:'000000',white:'ffffff',red:'ff0000',green:'008000',blue:'0000ff',yellow:'ffff00',gray:'808080',grey:'808080',orange:'ffa500',purple:'800080',cyan:'00ffff',magenta:'ff00ff',lime:'00ff00',navy:'000080',teal:'008080',maroon:'800000',silver:'c0c0c0',brown:'a52a2a',pink:'ffc0cb',darkBlue:'00008b',darkRed:'8b0000',darkGreen:'006400',lightGray:'d3d3d3',dkGray:'a9a9a9',ltGray:'d3d3d3'};
const toRgb=h=>[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];
const rgb2hsl=([r,g,b])=>{r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h=0,s=0;const l=(mx+mn)/2;if(mx!=mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx==r?(g-b)/d+(g<b?6:0):mx==g?(b-r)/d+2:(r-g)/d+4;h/=6}return[h,s,l]};
const hsl2rgb=([h,s,l])=>{if(s==0){const v=Math.round(l*255);return[v,v,v]}const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q,f=t=>{if(t<0)t+=1;if(t>1)t-=1;return t<1/6?p+(q-p)*6*t:t<1/2?q:t<2/3?p+(q-p)*(2/3-t)*6:p};return[f(h+1/3),f(h),f(h-1/3)].map(v=>Math.round(v*255))};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const roman=n=>{const m=[[1000,'m'],[900,'cm'],[500,'d'],[400,'cd'],[100,'c'],[90,'xc'],[50,'l'],[40,'xl'],[10,'x'],[9,'ix'],[5,'v'],[4,'iv'],[1,'i']];let s='';for(const [v,r] of m)while(n>=v){s+=r;n-=v}return s};
const letters=n=>String.fromCharCode(97+(n-1)%26).repeat(Math.floor((n-1)/26)+1);
const WING={l:'●',n:'■',q:'❑',u:'◆',v:'❖',w:'⬩','§':'▪','Ø':'➢','ü':'✓','þ':'☑','o':'○','£':'➤','¨':'◻','p':'▪','t':'⬧','s':'⬥','x':'✗','þ':'☑','Ü':'✔'};
const bulletCh=(ch,font)=>{if(!ch)return'•';if(/wingdings/i.test(font||'')){return WING[ch]||'▪'}if(/symbol/i.test(font||'')&&(ch=='·'||ch=='\uF0B7'))return'•';const c=ch.charCodeAt(0);if(c>=0xF000)return WING[String.fromCharCode(c-0xF000)]||'•';return ch};

O.pptx=async function(z,host,opt){
 opt=opt||{};const urls=[],get=async n=>{try{return await z.get(n)}catch(e){return null}};
 const ps=await get('ppt/presentation.xml');if(!ps)throw new Error('pptx: no presentation.xml');
 const pd=xmlp(ps),pres=pd.documentElement,sz=kid(pres,'sldSz'),SW=N(sz,'cx',9144000),SH=N(sz,'cy',6858000),W=SW/9525,H=SH/9525;
 const relsOf=async path=>{const m={},rs=await get(path.replace(/([^/]+)$/,'_rels/$1.rels'));if(rs)for(const r of desc(xmlp(rs),'Relationship'))m[r.getAttribute('Id')]={t:r.getAttribute('Target'),ext:r.getAttribute('TargetMode')=='External',ty:r.getAttribute('Type')||''};return m};
 const pRels=await relsOf('ppt/presentation.xml');
 const slidePaths=[];for(const s of desc(kid(pres,'sldIdLst'),'sldId')){const r=pRels[rid(s,'id')];if(r&&!r.ext)slidePaths.push(absP('ppt/presentation.xml',r.t))}
 if(!slidePaths.length)throw new Error('pptx: no slides');
 /* default text style of the presentation */
 const defTS=kid(pres,'defaultTextStyle');
 /* ---- part cache (layout / master / theme) ---- */
 const parts={};
 const loadPart=async path=>{if(parts[path])return parts[path];const s=await get(path);if(!s)return parts[path]={path,doc:null,root:null,rels:{}};const doc=xmlp(s),rels=await relsOf(path);return parts[path]={path,doc,root:doc.documentElement,rels}};
 const themes={};
 const loadTheme=async path=>{if(themes[path])return themes[path];const t={colors:{},major:'',minor:'',fill:[],ln:[],bg:[]};const s=await get(path);if(s){const d=xmlp(s),cs=desc(d,'clrScheme')[0];if(cs)for(const c of cs.children){const v=c.firstElementChild;if(v)t.colors[c.localName]=v.getAttribute('val')=='windowText'?'000000':v.getAttribute('val')=='window'?'ffffff':(v.getAttribute('lastClr')||v.getAttribute('val')||'')}
   const mj=desc(d,'majorFont')[0],mn=desc(d,'minorFont')[0];if(mj)t.major=A(kid(mj,'latin'),'typeface')||'';if(mn)t.minor=A(kid(mn,'latin'),'typeface')||'';
   t.fill=kids(desc(d,'fillStyleLst')[0]);t.ln=kids(desc(d,'lnStyleLst')[0]);t.bg=kids(desc(d,'bgFillStyleLst')[0])}return themes[path]=t};
 /* ---- table styles ---- */
 const tStyles={};{const ts=await get('ppt/tableStyles.xml');if(ts){const d=xmlp(ts);for(const s of desc(d,'tblStyle'))tStyles[A(s,'styleId')]=s}}
 /* ---- images ---- */
 const imgCache={};
 const imgUrl=async(part,rels,id)=>{const k=part+'|'+id;if(imgCache[k]!==undefined)return imgCache[k];const r=rels[id];if(!r||r.ext)return imgCache[k]=null;const p=absP(part,r.t),mt=MIMES[(p.split('.').pop()||'').toLowerCase()];if(!mt)return imgCache[k]=null;
  try{const b=await z.bin(p);if(!b)return imgCache[k]=null;const u=URL.createObjectURL(new Blob([b],{type:mt}));urls.push(u);return imgCache[k]=u}catch(e){return imgCache[k]=null}};
 const preImgs=async(doc,part,rels)=>{const ids=new Set();for(const n of[...desc(doc,'blip')]){const i=rid(n,'embed');if(i)ids.add(i)}await Promise.all([...ids].map(i=>imgUrl(part,rels,i)))};
 /* ---- colour ---- */
 const mkEnv=(theme,clrMap)=>({theme,map:clrMap||{bg1:'lt1',tx1:'dk1',bg2:'lt2',tx2:'dk2',accent1:'accent1',accent2:'accent2',accent3:'accent3',accent4:'accent4',accent5:'accent5',accent6:'accent6',hlink:'hlink',folHlink:'folHlink'}});
 function colorOf(parent,env,ph){if(!parent)return null;let c=null;for(const x of parent.children){if(/^(srgbClr|schemeClr|sysClr|prstClr|scrgbClr|hslClr)$/.test(x.localName)){c=x;break}}if(!c)return null;
  let rgb=null,al=1;const v=A(c,'val'),ln=c.localName;
  if(ln=='srgbClr')rgb=toRgb(v||'000000');else if(ln=='schemeClr'){if(v=='phClr'){rgb=ph?ph.rgb.slice():null;if(!rgb)return null}else{const nm=env.map[v]||v;const h=env.theme.colors[nm]||env.theme.colors[v];rgb=h?toRgb(h):[0,0,0]}}
  else if(ln=='sysClr')rgb=toRgb(A(c,'lastClr')||(v=='window'?'ffffff':'000000'));else if(ln=='prstClr')rgb=toRgb(PRST[v]||'000000');
  else if(ln=='scrgbClr')rgb=[N(c,'r',0),N(c,'g',0),N(c,'b',0)].map(x=>clamp(Math.round(x/1000*2.55),0,255));else if(ln=='hslClr')rgb=hsl2rgb([N(c,'hue',0)/21600000,N(c,'sat',0)/100000,N(c,'lum',0)/100000]);
  if(!rgb)return null;if(ph&&v=='phClr'&&ph.a!=null)al=ph.a;
  for(const m of c.children){const n=m.localName,val=N(m,'val',0)/100000;
   if(n=='alpha')al=val;else if(n=='lumMod'||n=='lumOff'||n=='satMod'||n=='satOff'||n=='hueMod'||n=='hueOff'){const hsl=rgb2hsl(rgb);if(n=='lumMod')hsl[2]*=val;else if(n=='lumOff')hsl[2]+=val;else if(n=='satMod')hsl[1]*=val;else if(n=='satOff')hsl[1]+=val;else if(n=='hueMod')hsl[0]=(hsl[0]*val)%1;else hsl[0]=((hsl[0]+N(m,'val',0)/21600000)%1+1)%1;hsl[1]=clamp(hsl[1],0,1);hsl[2]=clamp(hsl[2],0,1);rgb=hsl2rgb(hsl)}
   else if(n=='tint')rgb=rgb.map(x=>Math.round(x*val+255*(1-val)));else if(n=='shade')rgb=rgb.map(x=>Math.round(x*val));
   else if(n=='comp'){const h=rgb2hsl(rgb);h[0]=(h[0]+.5)%1;rgb=hsl2rgb(h)}else if(n=='inv')rgb=rgb.map(x=>255-x);else if(n=='gray'){const g=Math.round(.3*rgb[0]+.59*rgb[1]+.11*rgb[2]);rgb=[g,g,g]}}
  return{rgb,a:al,css:al<1?'rgba('+rgb.join(',')+','+(+al.toFixed(3))+')':'#'+rgb.map(x=>clamp(x,0,255).toString(16).padStart(2,'0')).join('')}}
 /* fill element (solidFill / gradFill / blipFill / noFill / pattFill) -> {css | none | img} */
 async function fillOf(f,env,ph,part,rels){if(!f)return null;const n=f.localName;
  if(n=='noFill')return{none:1};
  if(n=='solidFill'){const c=colorOf(f,env,ph);return c?{bg:c.css,rgb:c.rgb,a:c.a}:null}
  if(n=='gradFill'){const gs=kids(kid(f,'gsLst'),'gs').map(g=>({p:N(g,'pos',0)/1000,c:colorOf(g,env,ph)})).filter(g=>g.c);if(!gs.length)return null;gs.sort((a,b)=>a.p-b.p);const st=gs.map(g=>g.c.css+' '+g.p+'%').join(',');const lin=kid(f,'lin'),pa=kid(f,'path');
   if(pa){return{bg:(A(pa,'path')=='circle'?'radial-gradient(ellipse at center,':'radial-gradient(ellipse at center,')+st+')',rgb:gs[0].c.rgb}}
   const ang=lin?N(lin,'ang',0)/60000:0;return{bg:'linear-gradient('+(ang+90)+'deg,'+st+')',rgb:gs[0].c.rgb}}
  if(n=='pattFill'){const c=colorOf(kid(f,'fgClr'),env,ph)||colorOf(kid(f,'bgClr'),env,ph);return c?{bg:c.css,rgb:c.rgb}:null}
  if(n=='blipFill'){const b=kid(f,'blip'),id=b&&rid(b,'embed'),u=id?await imgUrl(part,rels,id):null;if(!u)return{none:1};const tile=kid(f,'tile');return{bg:'url("'+u+'")',img:u,tile:!!tile,rgb:[255,255,255]}}
  return null}
 const FILLS=/^(noFill|solidFill|gradFill|blipFill|pattFill|grpFill)$/;
 const fillEl=sp=>{for(const c of sp?sp.children:[])if(FILLS.test(c.localName))return c;return null};
 /* ---- theme style references ---- */
 async function styleFill(ref,env,part,rels){if(!ref)return null;const idx=N(ref,'idx',0);if(!idx)return{none:1};const ph={rgb:null};const c=colorOf(ref,env);if(c){ph.rgb=c.rgb;ph.a=c.a}
  const st=idx>=1001?env.theme.bg[idx-1001]:env.theme.fill[idx-1];if(!st)return c?{bg:c.css,rgb:c.rgb}:null;return fillOf(st,env,ph.rgb?ph:null,part,rels)}
 function styleLn(ref,env){if(!ref)return null;const idx=N(ref,'idx',0);if(!idx)return{none:1};const l=env.theme.ln[idx-1],c=colorOf(ref,env);const ph=c?{rgb:c.rgb,a:c.a}:null;let col=c?c.css:null,w=N(l,'w',9525);if(l){const f=fillEl(l);if(f&&f.localName=='solidFill'){const cc=colorOf(f,env,ph);if(cc)col=cc.css}else if(f&&f.localName=='noFill')return{none:1}}return{w:w/9525,c:col||'#000',dash:l&&A(kid(l,'prstDash'),'val')}}
 function lnOf(ln,env,ph){if(!ln)return null;const f=fillEl(ln);if(f&&f.localName=='noFill')return{none:1};let col=null;if(f&&f.localName=='solidFill'){const c=colorOf(f,env,ph);if(c)col=c.css}else if(f&&f.localName=='gradFill'){const g=kid(kid(f,'gsLst'),'gs'),c=g&&colorOf(g,env,ph);if(c)col=c.css}
  const w=A(ln,'w');return{w:w!=null?+w/9525:null,c:col,dash:A(kid(ln,'prstDash'),'val'),head:A(kid(ln,'headEnd'),'type'),tail:A(kid(ln,'tailEnd'),'type'),cap:A(ln,'cap')}}
 /* ---- text style parsing ---- */
 function parseR(rp,env,ph){const o={};if(!rp)return o;
  if(rp.hasAttribute('sz'))o.sz=N(rp,'sz');if(rp.hasAttribute('b'))o.b=A(rp,'b')=='1'||A(rp,'b')=='true';if(rp.hasAttribute('i'))o.i=A(rp,'i')=='1'||A(rp,'i')=='true';
  if(rp.hasAttribute('u'))o.u=A(rp,'u')!='none';if(rp.hasAttribute('strike'))o.strike=A(rp,'strike')!='noStrike';if(rp.hasAttribute('cap'))o.cap=A(rp,'cap');if(rp.hasAttribute('spc'))o.spc=N(rp,'spc',0);if(rp.hasAttribute('baseline'))o.base=N(rp,'baseline',0);
  const sf=kid(rp,'solidFill'),gf=kid(rp,'gradFill');if(sf){const c=colorOf(sf,env,ph);if(c)o.color=c.css}else if(gf){const g=kid(kid(gf,'gsLst'),'gs'),c=g&&colorOf(g,env,ph);if(c)o.color=c.css}
  const lt=kid(rp,'latin');if(lt){let f=A(lt,'typeface');if(f=='+mj-lt')f=env.theme.major;else if(f=='+mn-lt')f=env.theme.minor;if(f)o.font=f}
  const hl=kid(rp,'highlight');if(hl){const c=colorOf(hl,env,ph);if(c)o.hl=c.css}
  return o}
 function parseP(pp,env,ph){const o={};if(!pp)return o;
  if(pp.hasAttribute('algn'))o.algn=A(pp,'algn');if(pp.hasAttribute('marL'))o.marL=N(pp,'marL',0);if(pp.hasAttribute('marR'))o.marR=N(pp,'marR',0);if(pp.hasAttribute('indent'))o.indent=N(pp,'indent',0);
  const ls=kid(pp,'lnSpc');if(ls){const pc=kid(ls,'spcPct'),pt=kid(ls,'spcPts');if(pc)o.lnPct=N(pc,'val',100000)/1000;if(pt){o.lnPts=N(pt,'val',0)/100;o.lnPct=undefined}}
  for(const [k,t] of[['bef','spcBef'],['aft','spcAft']]){const s=kid(pp,t);if(s){const pc=kid(s,'spcPct'),pt=kid(s,'spcPts');o[k]=pt?{pts:N(pt,'val',0)/100}:pc?{pct:N(pc,'val',0)/1000}:undefined}}
  if(kid(pp,'buNone'))o.bu={k:'none'};else{const bc=kid(pp,'buChar'),ba=kid(pp,'buAutoNum'),bb=kid(pp,'buBlip');if(bc)o.bu={k:'char',ch:A(bc,'char')};else if(ba)o.bu={k:'num',t:A(ba,'type')||'arabicPeriod',s:N(ba,'startAt',1)};else if(bb)o.bu={k:'char',ch:'•'}}
  const bf=kid(pp,'buFont');if(bf)o.buFont=A(bf,'typeface');const bcl=kid(pp,'buClr');if(bcl){const c=colorOf(bcl,env,ph);if(c)o.buClr=c.css}const bs=kid(pp,'buSzPct');if(bs)o.buSz=N(bs,'val',100000)/1000;
  const d=kid(pp,'defRPr');if(d)o.def=parseR(d,env,ph);return o}
 const mgR=(a,b)=>{for(const k in b)if(b[k]!==undefined)a[k]=b[k];return a};
 const mgP=(a,b)=>{for(const k in b){if(b[k]===undefined)continue;if(k=='def')a.def=mgR(a.def||{},b.def);else a[k]=b[k]}return a};
 const lvlOf=(src,lvl,env,ph)=>{if(!src)return{};const e=kid(src,'lvl'+(lvl+1)+'pPr');return e?parseP(e,env,ph):{}};
 /* ---- geometry presets (return svg path d for w,h in px) ---- */
 const star=(n,inner,w,h)=>{let d='';for(let i=0;i<n*2;i++){const a=-Math.PI/2+i*Math.PI/n,r=i%2?inner:1;d+=(i?'L':'M')+(w/2+Math.cos(a)*r*w/2).toFixed(2)+','+(h/2+Math.sin(a)*r*h/2).toFixed(2)}return d+'Z'};
 function presetPath(p,w,h,av){const ss=Math.min(w,h),a=(i,d)=>av&&av[i]!=null?av[i]/100000:d,f=v=>(+v).toFixed(2),P=(...pts)=>'M'+pts.map(q=>f(q[0])+','+f(q[1])).join('L')+'Z';
  switch(p){
   case'triangle':return P([0,h],[w*a('adj',.5),0],[w,h]);
   case'rtTriangle':return P([0,0],[0,h],[w,h]);
   case'diamond':case'flowChartDecision':return P([w/2,0],[w,h/2],[w/2,h],[0,h/2]);
   case'parallelogram':{const x=ss*a('adj',.25);return P([0,h],[x,0],[w,0],[w-x,h])}
   case'trapezoid':{const x=ss*a('adj',.25);return P([0,h],[x,0],[w-x,0],[w,h])}
   case'pentagon':return P([w/2,0],[w,h*.38],[w*.81,h],[w*.19,h],[0,h*.38]);
   case'homePlate':{const x=w-ss*a('adj',.5);return P([0,0],[x,0],[w,h/2],[x,h],[0,h])}
   case'hexagon':{const x=ss*a('adj',.25);return P([x,0],[w-x,0],[w,h/2],[w-x,h],[x,h],[0,h/2])}
   case'octagon':{const x=ss*a('adj',.29289);return P([x,0],[w-x,0],[w,x],[w,h-x],[w-x,h],[x,h],[0,h-x],[0,x])}
   case'chevron':{const x=ss*a('adj',.5);return P([0,0],[w-x,0],[w,h/2],[w-x,h],[0,h],[x,h/2])}
   case'rightArrow':{const t=a('adj1',.5),x=w-ss*a('adj2',.5),y1=h*(1-t)/2;return P([0,y1],[x,y1],[x,0],[w,h/2],[x,h],[x,h-y1],[0,h-y1])}
   case'leftArrow':{const t=a('adj1',.5),x=ss*a('adj2',.5),y1=h*(1-t)/2;return P([w,y1],[x,y1],[x,0],[0,h/2],[x,h],[x,h-y1],[w,h-y1])}
   case'downArrow':{const t=a('adj1',.5),y=h-ss*a('adj2',.5),x1=w*(1-t)/2;return P([x1,0],[x1,y],[0,y],[w/2,h],[w,y],[w-x1,y],[w-x1,0])}
   case'upArrow':{const t=a('adj1',.5),y=ss*a('adj2',.5),x1=w*(1-t)/2;return P([x1,h],[x1,y],[0,y],[w/2,0],[w,y],[w-x1,y],[w-x1,h])}
   case'leftRightArrow':{const t=a('adj1',.5),x=ss*a('adj2',.5),y1=h*(1-t)/2;return P([0,h/2],[x,0],[x,y1],[w-x,y1],[w-x,0],[w,h/2],[w-x,h],[w-x,h-y1],[x,h-y1],[x,h])}
   case'star4':return star(4,a('adj',.125)*2.4,w,h);case'star5':return star(5,.382,w,h);case'star6':return star(6,.58,w,h);case'star8':return star(8,.7,w,h);case'star10':return star(10,.75,w,h);case'star12':return star(12,.8,w,h);case'star16':return star(16,.85,w,h);case'star24':return star(24,.9,w,h);
   case'plus':case'mathPlus':{const x=ss*(p=='plus'?a('adj',.25):.25);return P([x,0],[w-x,0],[w-x,x],[w,x],[w,h-x],[w-x,h-x],[w-x,h],[x,h],[x,h-x],[0,h-x],[0,x],[x,x])}
   case'mathMinus':return P([w*.1,h*.38],[w*.9,h*.38],[w*.9,h*.62],[w*.1,h*.62]);
   case'mathMultiply':return P([w*.15,h*.3],[w*.3,h*.15],[w/2,h*.35],[w*.7,h*.15],[w*.85,h*.3],[w*.65,h/2],[w*.85,h*.7],[w*.7,h*.85],[w/2,h*.65],[w*.3,h*.85],[w*.15,h*.7],[w*.35,h/2]);
   case'flowChartMerge':return P([0,0],[w,0],[w/2,h]);case'flowChartExtract':return P([w/2,0],[w,h],[0,h]);
   case'flowChartPreparation':return P([w*.2,0],[w*.8,0],[w,h/2],[w*.8,h],[w*.2,h],[0,h/2]);
   case'flowChartInputOutput':return P([w*.2,0],[w,0],[w*.8,h],[0,h]);
   case'flowChartManualInput':return P([0,h*.2],[w,0],[w,h],[0,h]);
   case'heart':return'M'+f(w/2)+','+f(h)+'C'+f(-w*.1)+','+f(h*.4)+' '+f(w*.2)+','+f(-h*.1)+' '+f(w/2)+','+f(h*.28)+'C'+f(w*.8)+','+f(-h*.1)+' '+f(w*1.1)+','+f(h*.4)+' '+f(w/2)+','+f(h)+'Z';
   case'lightningBolt':return P([w*.4,0],[w*.15,h*.5],[w*.4,h*.5],[w*.2,h],[w*.85,h*.35],[w*.55,h*.35],[w*.75,0]);
   case'donut':{const t=ss*a('adj',.25);return'M0,'+f(h/2)+'a'+f(w/2)+','+f(h/2)+' 0 1,0 '+f(w)+',0a'+f(w/2)+','+f(h/2)+' 0 1,0 '+f(-w)+',0ZM'+f(t)+','+f(h/2)+'a'+f(w/2-t)+','+f(h/2-t)+' 0 1,1 '+f(w-2*t)+',0a'+f(w/2-t)+','+f(h/2-t)+' 0 1,1 '+f(-(w-2*t))+',0Z'}
   case'rightBracket':return'M0,0 C'+f(w)+',0 '+f(w)+',0 '+f(w)+','+f(h*.15)+' L'+f(w)+','+f(h*.85)+' C'+f(w)+','+f(h)+' '+f(w)+','+f(h)+' 0,'+f(h);
   case'leftBracket':return'M'+f(w)+',0 C0,0 0,0 0,'+f(h*.15)+' L0,'+f(h*.85)+' C0,'+f(h)+' 0,'+f(h)+' '+f(w)+','+f(h);
   default:return null}}
 const CSSGEOM={rect:'',roundRect:'r',round2SameRect:'r',round1Rect:'r',snipRoundRect:'r',flowChartProcess:'',flowChartAlternateProcess:'r',flowChartTerminator:'t',ellipse:'e',flowChartConnector:'e',wedgeRectCallout:'',wedgeRoundRectCallout:'r',wedgeEllipseCallout:'e',cloud:'e',textBox:'',flowChartDocument:'',flowChartPredefinedProcess:'',flowChartInternalStorage:'',flowChartData:null};
 function custPath(cg,w,h){const pl=kid(cg,'pathLst');if(!pl)return null;let out='';for(const p of kids(pl,'path')){const pw=N(p,'w',0)||w,ph2=N(p,'h',0)||h,sx=w/pw,sy=h/ph2,pt=e=>{const q=kid(e,'pt');return f2(N(q,'x',0)*sx)+','+f2(N(q,'y',0)*sy)};
   const f2=v=>(+v).toFixed(2);const pts=e=>kids(e,'pt').map(q=>f2(N(q,'x',0)*sx)+','+f2(N(q,'y',0)*sy)).join(' ');
   for(const c of p.children){const n=c.localName;if(n=='moveTo')out+='M'+pts(c);else if(n=='lnTo')out+='L'+pts(c);else if(n=='cubicBezTo')out+='C'+pts(c);else if(n=='quadBezTo')out+='Q'+pts(c);else if(n=='close')out+='Z';else if(n=='arcTo'){/* approximated */}}}
  return out||null}
 let mid=0;
 /* ---- text ---- */
 function textHtml(tb,o){/* o: {sources:[lstStyle elems low->high], env, ph, fontScale, lnRed, slideNo, body:{...}, defColor, part, rels, links} */
  const paras=kids(tb,'p');if(!paras.length)return'';const env=o.env,nums={};let out='',first=true;
  for(const p of paras){const pp=kid(p,'pPr'),lvl=clamp(N(pp,'lvl',0),0,8);
   const P={};for(const s of o.sources)mgP(P,lvlOf(s,lvl,env,o.ph));mgP(P,parseP(pp,env,o.ph));
   const base=mgR({},P.def||{});if(o.defColor&&!base.color)base.color=o.defColor;
   /* runs */
   let inner='',empty=true;
   for(const c of p.children){const n=c.localName;
    if(n=='r'||n=='fld'){const rp=parseR(kid(c,'rPr'),env,o.ph),R=mgR(mgR({},base),rp);let t=kid(c,'t')?kid(c,'t').textContent:'';
     if(n=='fld'){const ty=A(c,'type')||'';if(/slidenum/i.test(ty))t=String(o.slideNo||'');else if(/datetime/i.test(ty))t=new Date().toLocaleDateString()}
     if(!t)continue;empty=false;
     let s='';const sz=(R.sz||base.sz||1800)*(o.fontScale||1);s+='font-size:'+(sz/75).toFixed(2)+'px;';
     if(R.font)s+='font-family:'+fontCss(R.font)+';';if(R.b)s+='font-weight:700;';if(R.i)s+='font-style:italic;';
     const td=[];if(R.u)td.push('underline');if(R.strike)td.push('line-through');if(td.length)s+='text-decoration:'+td.join(' ')+';';
     if(R.color)s+='color:'+R.color+';';if(R.hl)s+='background:'+R.hl+';';if(R.spc)s+='letter-spacing:'+(R.spc/75).toFixed(2)+'px;';
     if(R.cap=='all')s+='text-transform:uppercase;';else if(R.cap=='small')s+='font-variant:small-caps;';
     if(R.base){s+='vertical-align:'+(R.base>0?'super':'sub')+';font-size:'+(sz/75*.66).toFixed(2)+'px;'}
     let h='<span style="'+s+'">'+E(t)+'</span>';const hl=kid(kid(c,'rPr'),'hlinkClick');if(hl){const r=o.rels&&o.rels[rid(hl,'id')];if(r&&r.ext&&/^(https?:|mailto:)/i.test(r.t))h='<a href="'+E(r.t)+'" target="_blank" rel="noopener noreferrer">'+h+'</a>'}
     inner+=h}
    else if(n=='br'){inner+='<br>';empty=false}}
   const sz0=(base.sz||1800)*(o.fontScale||1);
   const ep=kid(p,'endParaRPr'),esz=ep&&ep.hasAttribute('sz')?N(ep,'sz')*(o.fontScale||1):sz0;
   if(empty)inner='<span style="font-size:'+(esz/75).toFixed(2)+'px">&#8203;</span>';
   /* bullets */
   let bu='',hasBu=P.bu&&P.bu.k!='none'&&!empty;
   const marL=(P.marL||0)/9525,ind=(P.indent||0)/9525;
   for(let k=lvl+1;k<9;k++)delete nums[k];
   if(hasBu){let txt;if(P.bu.k=='num'){nums[lvl]=nums[lvl]===undefined?P.bu.s:nums[lvl]+1;const n=nums[lvl],t=P.bu.t;txt=/^alphaLc/.test(t)?letters(n):/^alphaUc/.test(t)?letters(n).toUpperCase():/^romanLc/.test(t)?roman(n):/^romanUc/.test(t)?roman(n).toUpperCase():String(n);txt+=/ParenBoth/.test(t)?')':/ParenR/.test(t)?')':/Period/.test(t)?'.':'';if(/ParenBoth/.test(t))txt='('+txt}
    else{delete nums[lvl];txt=bulletCh(P.bu.ch,P.buFont)}
    const bsz=(sz0*((P.buSz||100)/100)/75).toFixed(2);let bs='font-size:'+bsz+'px;';const w=ind<0?-ind:0;if(w)bs+='width:'+w+'px;';else bs+='margin-right:.4em;';const bcol=P.buClr||base.color;if(bcol)bs+='color:'+bcol+';';
    bu='<span class="bm" style="'+bs+'">'+E(txt)+'</span>'}
   else if(!hasBu){delete nums[lvl]}
   /* paragraph css */
   let s='';const al={l:'left',ctr:'center',r:'right',just:'justify',justLow:'justify',dist:'justify'}[P.algn||'l'];s+='text-align:'+al+';';
   const pl=marL,tx=hasBu?(ind<0?ind:0):ind;s+='padding-left:'+pl+'px;'+(tx?'text-indent:'+tx+'px;':'');if(P.marR)s+='padding-right:'+P.marR/9525+'px;';
   const lh=P.lnPts?P.lnPts*4/3+'px':((P.lnPct||100)-(o.lnRed||0))/100*1.2;s+='line-height:'+(typeof lh=='number'?lh.toFixed(3):lh)+';';
   const spc=(sp)=>sp?(sp.pts!==undefined?sp.pts*4/3:(sp.pct/100)*(sz0/75)*1.2):0;
   if(!first)s+='margin-top:'+spc(P.bef).toFixed(2)+'px;';if(P.aft)s+='margin-bottom:'+spc(P.aft).toFixed(2)+'px;';
   s+='font-size:'+(sz0/75).toFixed(2)+'px;';if(base.color)s+='color:'+base.color+';';if(base.font)s+='font-family:'+fontCss(base.font)+';';
   out+='<p style="'+s+'">'+bu+inner+'</p>';first=false}
  return out}
 /* ---- table ---- */
 async function tableHtml(gf,T,env,part,rels,slideNo){
  const tbl=desc(gf,'tbl')[0];if(!tbl)return'';const xf=kid(gf,'xfrm'),off=kid(xf,'off'),ext=kid(xf,'ext');
  const X=(T.ox+N(off,'x',0)*T.sx)/9525,Y=(T.oy+N(off,'y',0)*T.sy)/9525,w=N(ext,'cx',0)*T.sx/9525;
  const tp=kid(tbl,'tblPr'),flags={fr:A(tp,'firstRow')=='1',lr:A(tp,'lastRow')=='1',fc:A(tp,'firstCol')=='1',lc:A(tp,'lastCol')=='1',br:A(tp,'bandRow')=='1',bc:A(tp,'bandCol')=='1'};
  const sid=tp&&kid(tp,'tableStyleId')?kid(tp,'tableStyleId').textContent.trim():'',sd=tStyles[sid];
  const cols=kids(kid(tbl,'tblGrid'),'gridCol').map(g=>N(g,'w',0)*T.sx/9525),rows=kids(tbl,'tr'),totalW=cols.reduce((a,b)=>a+b,0)||w;
  /* style lookups */
  const acc1=env.theme.colors.accent1||'4472c4';
  const styleCell=async(part2,ri,ci,nr,nc)=>{const r={fill:null,color:null,b:null,bd:{}};
   const apply=async(el)=>{if(!el)return;const tcs=kid(el,'tcStyle'),tts=kid(el,'tcTxStyle');if(tcs){const f=kid(tcs,'fill'),fr=kid(tcs,'fillRef');if(f){const ff=fillEl(f);const fl=await fillOf(ff,env,null,part,rels);if(fl)r.fill=fl.none?null:fl.bg}else if(fr){const fl=await styleFill(fr,env,part,rels);if(fl)r.fill=fl.none?null:fl.bg}
     const bd=kid(tcs,'tcBdr');if(bd)for(const k of['left','right','top','bottom','insideH','insideV']){const b=kid(bd,k),l=b&&kid(b,'ln');if(l){const q=lnOf(l,env,null);if(q)r.bd[k]=q}else if(b&&kid(b,'lnRef')){const q=styleLn(kid(b,'lnRef'),env);if(q)r.bd[k]=q}}}
    if(tts){if(A(tts,'b')=='on')r.b=true;const c=colorOf(tts,env)||colorOf(kid(tts,'fontRef'),env);if(c)r.color=c.css}};
   if(sd){await apply(kid(sd,'wholeTbl'));if(flags.br&&!(flags.fr&&ri==0)&&!(flags.lr&&ri==nr-1)){const bi=ri-(flags.fr?1:0);await apply(kid(sd,bi%2==0?'band1H':'band2H'))}
    if(flags.bc){const bi=ci-(flags.fc?1:0);if(bi>=0)await apply(kid(sd,bi%2==0?'band1V':'band2V'))}
    if(flags.fc&&ci==0)await apply(kid(sd,'firstCol'));if(flags.lc&&ci==nc-1)await apply(kid(sd,'lastCol'));if(flags.lr&&ri==nr-1)await apply(kid(sd,'lastRow'));if(flags.fr&&ri==0)await apply(kid(sd,'firstRow'))}
   else{/* built-in "Medium Style 2 – Accent 1" look */const lt=env.theme.colors.lt1||'ffffff',a=toRgb(acc1),mix=t=>'rgb('+a.map(x=>Math.round(x*t+255*(1-t))).join(',')+')';r.bd={left:{w:1,c:'#'+lt},right:{w:1,c:'#'+lt},top:{w:1,c:'#'+lt},bottom:{w:1,c:'#'+lt},insideH:{w:1,c:'#'+lt},insideV:{w:1,c:'#'+lt}};
    r.fill=mix(.2);if(flags.br&&!(flags.fr&&ri==0)&&!(flags.lr&&ri==nr-1)){const bi=ri-(flags.fr?1:0);if(bi%2==0)r.fill=mix(.4)}
    if(flags.fr&&ri==0){r.fill='#'+acc1;r.color='#'+lt;r.b=true}if(flags.lr&&ri==nr-1){r.fill='#'+acc1;r.color='#'+lt;r.b=true}if(flags.fc&&ci==0){r.fill='#'+acc1;r.color='#'+lt;r.b=true}}
   return r};
  let h='';const nr=rows.length;let hh=0;
  for(let ri=0;ri<nr;ri++){const tr=rows[ri],rh=N(tr,'h',0)*T.sy/9525;hh+=rh;h+='<tr style="height:'+rh+'px">';const cells=kids(tr,'tc'),nc=cells.length;
   for(let ci=0;ci<nc;ci++){const tc=cells[ci];if(A(tc,'hMerge')=='1'||A(tc,'vMerge')=='1')continue;const tcp=kid(tc,'tcPr'),sc=await styleCell(part,ri,ci,nr,nc);
    let s='';const mL=N(tcp,'marL',91440),mR=N(tcp,'marR',91440),mT=N(tcp,'marT',45720),mB=N(tcp,'marB',45720);s+='padding:'+mT/9525+'px '+mR/9525+'px '+mB/9525+'px '+mL/9525+'px;';
    const f=fillEl(tcp);let bg=sc.fill;if(f){const fl=await fillOf(f,env,null,part,rels);if(fl)bg=fl.none?null:fl.bg}if(bg)s+='background:'+bg+';';
    const an=A(tcp,'anchor');if(an)s+='vertical-align:'+(an=='ctr'?'middle':an=='b'?'bottom':'top')+';';
    const bdS={L:['lnL','left',ci==0?'left':'insideV'],R:['lnR','right',ci==nc-1?'right':'insideV'],T:['lnT','top',ri==0?'top':'insideH'],B:['lnB','bottom',ri==nr-1?'bottom':'insideH']};
    for(const k in bdS){const [tag,cssk,sk]=bdS[k];let b=null;const e=kid(tcp,tag);if(e)b=lnOf(e,env,null);else b=sc.bd[sk];if(b){if(b.none||!b.c&&!b.w)s+='border-'+cssk+':none;';else s+='border-'+cssk+':'+Math.max(.5,b.w||1)+'px '+(/dash|dot/i.test(b.dash||'')?'dashed':'solid')+' '+(b.c||'#000')+';'}}
    const span=N(tc,'gridSpan',1),rs=N(tc,'rowSpan',1);
    const tb=kid(tc,'txBody');const src=[defTS];const txt=tb?textHtml(tb,{sources:[defTS],env,ph:null,slideNo,defColor:sc.color||(null),part,rels,fontScale:1,tbl:{b:sc.b,sz:1800}}):'';
    let inner=txt;if(sc.b)inner='<div style="font-weight:700">'+txt+'</div>';
    h+='<td'+(span>1?' colspan="'+span+'"':'')+(rs>1?' rowspan="'+rs+'"':'')+' style="'+s+'">'+inner+'</td>'}
   h+='</tr>'}
  return'<table class="tb" style="left:'+X+'px;top:'+Y+'px;width:'+totalW+'px"><colgroup>'+cols.map(c=>'<col style="width:'+c+'px">').join('')+'</colgroup><tbody>'+h+'</tbody></table>'}
 /* ---- shapes ---- */
 const PHKEY=ph=>ph?A(ph,'type')||'body':null;
 const masterKind=t=>(t=='ctrTitle'||t=='title')?'title':(t=='dt'||t=='ftr'||t=='sldNum')?'other':'body';
 /* ctx: {T,env,part,rels,phs:{layout:Map,master:Map}, ts:{master txStyles}, slideNo, hasLayoutShapes} */
 async function renderTree(tree,ctx,isSlide){let out='';
  for(const el of tree.children){const n=el.localName;
   try{
   if(n=='sp'||n=='cxnSp')out+=await renderSp(el,ctx,isSlide);
   else if(n=='pic')out+=await renderPic(el,ctx);
   else if(n=='grpSp'){const gp=kid(el,'grpSpPr'),xf=kid(gp,'xfrm');let T=ctx.T;if(xf){const off=kid(xf,'off'),ext=kid(xf,'ext'),co=kid(xf,'chOff'),ce=kid(xf,'chExt'),cx=N(ce,'cx',0)||N(ext,'cx',1),cy=N(ce,'cy',0)||N(ext,'cy',1),gsx=N(ext,'cx',cx)/cx,gsy=N(ext,'cy',cy)/cy;T={ox:T.ox+(N(off,'x',0)-N(co,'x',0)*gsx)*T.sx,oy:T.oy+(N(off,'y',0)-N(co,'y',0)*gsy)*T.sy,sx:T.sx*gsx,sy:T.sy*gsy}}
    out+=await renderTree(el,Object.assign({},ctx,{T}),isSlide)}
   else if(n=='graphicFrame'){out+=await renderFrame(el,ctx)}
   }catch(e){console.warn('pptx shape',n,e)}}
  return out}
 async function renderFrame(gf,ctx){const gd=desc(gf,'graphicData')[0],uri=gd?A(gd,'uri')||'':'';
  if(/table/.test(uri)||desc(gf,'tbl').length)return tableHtml(gf,ctx.T,ctx.env,ctx.part,ctx.rels,ctx.slideNo);
  const xf=kid(gf,'xfrm'),off=kid(xf,'off'),ext=kid(xf,'ext'),T=ctx.T,x=(T.ox+N(off,'x',0)*T.sx)/9525,y=(T.oy+N(off,'y',0)*T.sy)/9525,w=N(ext,'cx',0)*T.sx/9525,h=N(ext,'cy',0)*T.sy/9525;
  /* SmartArt: use the pre-rendered drawing part when present */
  const dg=desc(gf,'relIds')[0];if(dg){for(const k in ctx.rels){const r=ctx.rels[k];if(/diagramDrawing/i.test(r.ty)){const pp=await loadPart(absP(ctx.part,r.t));if(pp.root){const sp=desc(pp.root,'spTree')[0];if(sp){await preImgs(pp.doc,pp.path,pp.rels);const ctx2=Object.assign({},ctx,{T:{ox:T.ox+N(off,'x',0)*T.sx,oy:T.oy+N(off,'y',0)*T.sy,sx:T.sx,sy:T.sy},part:pp.path,rels:pp.rels,noPh:true});return renderTree(sp,ctx2,false)}}}}}
  const label=/chart/.test(uri)?'Chart':/diagram/.test(uri)?'Diagram':/ole|object/i.test(uri)?'Embedded object':'Content';
  return'<div class="sh ph" style="left:'+x+'px;top:'+y+'px;width:'+w+'px;height:'+h+'px">'+label+'</div>'}
 async function renderPic(pic,ctx){const T=ctx.T,env=ctx.env,spPr=kid(pic,'spPr'),xf=kid(spPr,'xfrm');if(!xf)return'';const off=kid(xf,'off'),ext=kid(xf,'ext');
  const x=(T.ox+N(off,'x',0)*T.sx)/9525,y=(T.oy+N(off,'y',0)*T.sy)/9525,w=N(ext,'cx',0)*T.sx/9525,h=N(ext,'cy',0)*T.sy/9525,rot=N(xf,'rot',0)/60000,fh=A(xf,'flipH')=='1',fv=A(xf,'flipV')=='1';
  const bf=kid(pic,'blipFill'),bl=kid(bf,'blip'),id=bl&&rid(bl,'embed'),u=id?await imgUrl(ctx.part,ctx.rels,id):null;
  const geom=A(kid(spPr,'prstGeom'),'prst'),rad=geom=='ellipse'?'border-radius:50%;':(geom=='roundRect'?'border-radius:'+Math.min(w,h)*.1667+'px;':'');
  const ln=lnOf(kid(spPr,'ln'),env,null);let bd='';if(ln&&!ln.none&&ln.c)bd='border:'+Math.max(.5,ln.w||1)+'px solid '+ln.c+';';
  let inner;if(!u)inner='<div class="ph" style="width:100%;height:100%;font-size:'+Math.max(12,Math.min(w,h)/6)+'px">🖼</div>';
  else{const sr=kid(bf,'srcRect'),l=N(sr,'l',0)/1e5,t=N(sr,'t',0)/1e5,r=N(sr,'r',0)/1e5,b=N(sr,'b',0)/1e5,sx=1-l-r,sy=1-t-b;
   if((l||t||r||b)&&sx>.05&&sy>.05)inner='<img alt="" src="'+u+'" style="position:absolute;max-width:none;left:'+(-l/sx*100)+'%;top:'+(-t/sy*100)+'%;width:'+(100/sx)+'%;height:'+(100/sy)+'%">';else inner='<img alt="" src="'+u+'" style="width:100%;height:100%;object-fit:fill">'}
  const tf=(rot?'rotate('+rot+'deg) ':'')+(fh?'scaleX(-1) ':'')+(fv?'scaleY(-1)':'');
  return'<div class="sh" style="left:'+x+'px;top:'+y+'px;width:'+w+'px;height:'+h+'px;overflow:hidden;'+rad+bd+(tf?'transform:'+tf+';':'')+'">'+inner+'</div>'}
 async function renderSp(sp,ctx,isSlide){
  const T=ctx.T,env=ctx.env,isCxn=sp.localName=='cxnSp',nv=kid(sp,isCxn?'nvCxnSpPr':'nvSpPr'),nvPr=kid(nv,'nvPr'),ph=kid(nvPr,'ph'),spPr=kid(sp,'spPr'),style=kid(sp,'style'),tb=kid(sp,'txBody');
  /* placeholder chain */
  let lph=null,mph=null,pkey=null;
  if(ph&&!ctx.noPh){const idx=A(ph,'idx'),ty=A(ph,'type')||'body';pkey=ty;
   if(ctx.phs){const L=ctx.phs.layout;if(L){lph=(idx!=null&&L.byIdx[idx])||L.byType[ty]||(ty=='ctrTitle'?L.byType.title:null)||(ty=='subTitle'?L.byType.body:null)||null}
    const M=ctx.phs.master;if(M){mph=M.byType[masterKind(ty)=='title'?'title':ty]||M.byType[masterKind(ty)=='title'?'ctrTitle':'body']||M.byType.body||null;if(masterKind(ty)=='other')mph=M.byType[ty]||null}}}
  const chain=[mph,lph,sp].filter(Boolean);
  /* xfrm */
  let xf=kid(spPr,'xfrm');if(!xf)for(const c of[lph,mph]){const x2=c&&kid(kid(c,'spPr'),'xfrm');if(x2){xf=x2;break}}
  if(!xf&&!isCxn)return'';if(!xf)return'';
  const off=kid(xf,'off'),ext=kid(xf,'ext');if(!off||!ext)return'';
  const x=(T.ox+N(off,'x',0)*T.sx)/9525,y=(T.oy+N(off,'y',0)*T.sy)/9525;let w=N(ext,'cx',0)*T.sx/9525,h=N(ext,'cy',0)*T.sy/9525;
  const rot=N(xf,'rot',0)/60000,fh=A(xf,'flipH')=='1',fv=A(xf,'flipV')=='1';
  /* geometry */
  let gEl=kid(spPr,'prstGeom'),cg=kid(spPr,'custGeom');let prst=gEl?A(gEl,'prst'):null;if(!gEl&&!cg)for(const c of[lph,mph]){const sp2=c&&kid(c,'spPr');if(sp2&&kid(sp2,'prstGeom')){gEl=kid(sp2,'prstGeom');prst=A(gEl,'prst');break}}
  if(!prst&&!cg)prst='rect';
  const av={};if(gEl){const gl=kid(gEl,'avLst');if(gl)for(const g of kids(gl,'gd')){const m=/val\s+(-?\d+)/.exec(A(g,'fmla')||'');if(m)av[A(g,'name')]=+m[1]}}
  const isLine=isCxn||/^(line|straightConnector1|bentConnector\d|curvedConnector\d)$/.test(prst||'');
  /* fill & line */
  const ph0=null;let fill=null;
  for(const c of[sp,lph,mph]){if(!c)continue;const f=fillEl(kid(c,'spPr'));if(f){fill=await fillOf(f,env,null,ctx.part,ctx.rels);if(fill)break}}
  if(!fill&&style){fill=await styleFill(kid(style,'fillRef'),env,ctx.part,ctx.rels)}
  let line=null;for(const c of[sp,lph,mph]){if(!c)continue;const l=kid(kid(c,'spPr'),'ln');if(l){const q=lnOf(l,env,null);if(q){if(!line)line=q;else for(const k in q)if(q[k]!=null&&line[k]==null)line[k]=q[k]}}}
  if(style){const sl=styleLn(kid(style,'lnRef'),env);if(sl){if(!line)line=sl;else{for(const k in sl)if(sl[k]!=null&&(line[k]==null))line[k]=sl[k]}}}
  if(line&&!line.none&&(line.w==null))line.w=1;
  /* effects: simple outer shadow */
  let eff='';{const ef=kid(spPr,'effectLst'),os=ef&&kid(ef,'outerShdw');if(os){const c=colorOf(os,env);const d=N(os,'dist',0)/9525,dir=N(os,'dir',0)/60000*Math.PI/180;if(c)eff='filter:drop-shadow('+(Math.cos(dir)*d).toFixed(1)+'px '+(Math.sin(dir)*d).toFixed(1)+'px '+(N(os,'blurRad',0)/9525/2).toFixed(1)+'px '+c.css+');'}}
  let sH='',css='left:'+x+'px;top:'+y+'px;width:'+w+'px;height:'+h+'px;';
  const tfs=[];if(rot)tfs.push('rotate('+rot+'deg)');if(tfs.length)css+='transform:'+tfs.join(' ')+';';css+=eff;
  /* body (shape box) */
  let boxCss='',svg='';const strokeCss=(l)=>{if(!l||l.none||!l.c)return null;return{w:Math.max(.5,l.w||1),c:l.c,dash:/dot|sysDot|sysDash|dash|lgDash/i.test(l.dash||'')?(/dot/i.test(l.dash)?'3 3':'8 4'):null}};
  const sc=strokeCss(line);
  if(isLine){const x1=fh?w:0,x2=fh?0:w,y1=fv?h:0,y2=fv?0:h,id='mk'+(++mid);const hd=line&&line.head&&line.head!='none',tl=line&&line.tail&&line.tail!='none',col=sc?sc.c:'#000',sw=sc?sc.w:1;
   let defs='';const mk=(nm,rev)=>'<marker id="'+id+nm+'" markerWidth="8" markerHeight="8" refX="'+(rev?1:7)+'" refY="4" orient="auto" markerUnits="strokeWidth"><path d="'+(rev?'M8,0L0,4L8,8Z':'M0,0L8,4L0,8Z')+'" fill="'+col+'"/></marker>';
   if(hd)defs+=mk('s',true);if(tl)defs+=mk('e',false);
   const bent=/bent/.test(prst||'');const path=bent?'M'+x1+','+y1+' L'+(x1+x2)/2+','+y1+' L'+(x1+x2)/2+','+y2+' L'+x2+','+y2:'M'+x1+','+y1+' L'+x2+','+y2;
   svg='<svg width="'+Math.max(w,1)+'" height="'+Math.max(h,1)+'" viewBox="0 0 '+Math.max(w,1)+' '+Math.max(h,1)+'"><defs>'+defs+'</defs><path d="'+path+'" fill="none" stroke="'+col+'" stroke-width="'+sw+'"'+(sc&&sc.dash?' stroke-dasharray="'+sc.dash+'"':'')+(hd?' marker-start="url(#'+id+'s)"':'')+(tl?' marker-end="url(#'+id+'e)"':'')+'/></svg>'}
  else{
   const cssKind=cg?undefined:CSSGEOM[prst];
   if(cssKind!==undefined&&cssKind!==null){
    if(fill&&!fill.none){boxCss+='background:'+fill.bg+';';if(fill.img)boxCss+=fill.tile?'background-repeat:repeat;':'background-size:100% 100%;background-repeat:no-repeat;'}
    if(sc)boxCss+='border:'+sc.w+'px '+(sc.dash?'dashed':'solid')+' '+sc.c+';';
    if(cssKind=='r'){const adj=av.adj!=null?av.adj/100000:.16667;boxCss+='border-radius:'+Math.min(w,h)*adj+'px;'}else if(cssKind=='e')boxCss+='border-radius:50%;';else if(cssKind=='t')boxCss+='border-radius:'+Math.min(w,h)/2+'px;'}
   else{let d=cg?custPath(cg,w,h):presetPath(prst,w,h,av);if(!d&&cssKind===null)d='M0,0L'+(w*.8)+',0L'+w+','+h+'L'+(w*.2)+','+h+'Z';
    if(d){const fl=fill&&!fill.none&&fill.bg&&!fill.img?(/gradient/.test(fill.bg)?null:fill.bg):(fill&&fill.rgb?'rgb('+fill.rgb.join(',')+')':'none');
     let gradId='',gdef='';if(fill&&!fill.none&&/linear-gradient/.test(fill.bg||'')){/* svg gradient from css gradient: approximate with first/last colours */const cs=(fill.bg.match(/(#[0-9a-f]{6}|rgba?\([^)]*\))/gi)||[]);if(cs.length){gradId='g'+(++mid);const am=/linear-gradient\((-?[\d.]+)deg/.exec(fill.bg),ang=((am?+am[1]:180)-90)*Math.PI/180;gdef='<linearGradient id="'+gradId+'" x1="0" y1="0" x2="'+Math.cos(ang).toFixed(3)+'" y2="'+Math.sin(ang).toFixed(3)+'">'+cs.map((c,i)=>'<stop offset="'+(i/(Math.max(1,cs.length-1)))+'" stop-color="'+c+'"/>').join('')+'</linearGradient>'}}
     if(fill&&fill.img){boxCss+='background:'+fill.bg+';background-size:100% 100%;'}
     svg='<svg width="'+Math.max(w,1)+'" height="'+Math.max(h,1)+'" viewBox="0 0 '+Math.max(w,1)+' '+Math.max(h,1)+'" style="'+(fh||fv?'transform:'+(fh?'scaleX(-1) ':'')+(fv?'scaleY(-1)':'')+';':'')+'">'+(gdef?'<defs>'+gdef+'</defs>':'')+'<path d="'+d+'" fill-rule="evenodd" fill="'+(gradId?'url(#'+gradId+')':(fill&&fill.none?'none':fl))+'"'+(sc?' stroke="'+sc.c+'" stroke-width="'+sc.w+'" stroke-linejoin="round"'+(sc.dash?' stroke-dasharray="'+sc.dash+'"':''):'')+'/></svg>'}}}
  /* text */
  let txt='';
  if(tb&&kids(tb,'p').some(p=>kids(p).length>1||kid(p,'r')||kid(p,'fld')||kid(p,'br')||true)){
   const bp=kid(tb,'bodyPr');const B={};for(const c of[mph,lph]){const b=c&&kid(kid(c,'txBody'),'bodyPr');if(b)for(const a of b.attributes)B[a.localName]=a.value;if(b){const af=kid(b,'normAutofit');if(af)B._af=af}}
   if(bp){for(const a of bp.attributes)B[a.localName]=a.value;const naf=kid(bp,'normAutofit');if(naf)B._af=naf}
   const mr=N({getAttribute:k=>B[k]},'x',0);const g=k=>B[k]!=null&&B[k]!==''&&isFinite(+B[k])?+B[k]:null;
   const lI=g('lIns')??91440,tI=g('tIns')??45720,rI=g('rIns')??91440,bI=g('bIns')??45720,an=B.anchor||'t',vert=B.vert;
   let fs=1,lr=0;if(B._af){const f=B._af.getAttribute('fontScale');if(f)fs=+f/100000;const l2=B._af.getAttribute('lnSpcReduction');if(l2)lr=+l2/1000}
   /* style sources, low -> high priority */
   const kind=ph?masterKind(pkey):'none';const ms=ctx.ts;let base=[defTS];
   const srcs=[defTS];if(ms){if(kind=='title')srcs.push(ms.title);else if(kind=='body')srcs.push(ms.body);else if(kind=='other')srcs.push(ms.other)}
   for(const c of[mph,lph,sp]){const ls=c&&kid(kid(c,'txBody'),'lstStyle');if(ls)srcs.push(ls)}
   const fr=style&&kid(style,'fontRef');let defColor=null;if(fr){const c=colorOf(fr,env);if(c)defColor=c.css}
   const html=textHtml(tb,{sources:srcs,env,ph:null,fontScale:fs,lnRed:lr,slideNo:ctx.slideNo,defColor,part:ctx.part,rels:ctx.rels});
   const jc=an=='ctr'?'center':an=='b'?'flex-end':'flex-start';
   let ts='padding:'+tI/9525+'px '+rI/9525+'px '+bI/9525+'px '+lI/9525+'px;justify-content:'+jc+';';if(B.wrap=='none')ts+='white-space:nowrap;';
   if(vert&&vert!='horz'){ts+='writing-mode:'+(/vert/.test(vert)&&vert!='wordArtVert'?'vertical-rl':'horizontal-tb')+';'+(vert=='vert270'?'transform:rotate(180deg);':'')}
   if(html)txt='<div class="tx" style="'+ts+'">'+html+'</div>'}
  if(!svg&&!boxCss&&!txt)return'';
  return'<div class="sh" style="'+css+boxCss+'">'+svg+txt+'</div>'}
 /* ---- slide background ---- */
 async function bgOf(root,env,part,rels){const bg=desc(root,'bg')[0];if(!bg)return null;const bp=kid(bg,'bgPr'),br=kid(bg,'bgRef');if(bp){const f=fillEl(bp);return fillOf(f,env,null,part,rels)}
  if(br){const idx=N(br,'idx',0),c=colorOf(br,env);const st=idx>=1001?env.theme.bg[idx-1001]:null;if(st)return fillOf(st,env,c?{rgb:c.rgb,a:c.a}:null,part,rels);return c?{bg:c.css,rgb:c.rgb}:null}return null}
 const clrMapOf=el=>{const m=desc(el,'clrMap')[0];if(!m)return null;const o={};for(const a of m.attributes)o[a.localName]=a.value;return o};
 const phMaps=root=>{const m={byIdx:{},byType:{}};for(const sp of desc(kid(kid(root,'cSld'),'spTree')||root,'sp')){const ph=kid(kid(kid(sp,'nvSpPr'),'nvPr'),'ph');if(!ph)continue;const idx=A(ph,'idx'),ty=A(ph,'type')||'body';if(idx!=null)m.byIdx[idx]=sp;if(!m.byType[ty])m.byType[ty]=sp}return m};
 /* ---- render a slide to an element ---- */
 const cache=[];
 async function renderSlide(i){if(cache[i])return cache[i];
  const spath=slidePaths[i],sl=await loadPart(spath);const el=document.createElement('div');el.className='ps';el.style.cssText='width:'+W+'px;height:'+H+'px';
  if(!sl.root){cache[i]=el;return el}
  /* layout + master + theme */
  let lay=null,mas=null,theme=null;const lr=Object.values(sl.rels).find(r=>/slideLayout$/.test(r.ty));if(lr)lay=await loadPart(absP(spath,lr.t));
  if(lay&&lay.root){const mr=Object.values(lay.rels).find(r=>/slideMaster$/.test(r.ty));if(mr)mas=await loadPart(absP(lay.path,mr.t))}
  if(mas&&mas.root){const tr=Object.values(mas.rels).find(r=>/theme$/.test(r.ty));if(tr)theme=await loadTheme(absP(mas.path,tr.t))}
  if(!theme)theme=await loadTheme('ppt/theme/theme1.xml');
  const cmap=Object.assign({},mas&&mas.root?clrMapOf(mas.root):null||{}),ov=(r)=>{const o=r&&r.root&&desc(r.root,'overrideClrMapping')[0];if(o){const m={};for(const a of o.attributes)m[a.localName]=a.value;return m}return null};
  const env=mkEnv(theme,Object.assign({bg1:'lt1',tx1:'dk1',bg2:'lt2',tx2:'dk2'},cmap,ov(lay)||{},ov(sl)||{}));
  const phs={layout:lay&&lay.root?phMaps(lay.root):null,master:mas&&mas.root?phMaps(mas.root):null};
  const tsx=mas&&mas.root?kid(mas.root,'txStyles'):null,ts=tsx?{title:kid(tsx,'titleStyle'),body:kid(tsx,'bodyStyle'),other:kid(tsx,'otherStyle')}:null;
  await preImgs(sl.doc,spath,sl.rels);if(lay&&lay.root)await preImgs(lay.doc,lay.path,lay.rels);if(mas&&mas.root)await preImgs(mas.doc,mas.path,mas.rels);
  const T0={ox:0,oy:0,sx:1,sy:1};
  /* background: slide -> layout -> master */
  let bg=await bgOf(sl.root,env,spath,sl.rels)||(lay&&lay.root?await bgOf(lay.root,env,lay.path,lay.rels):null)||(mas&&mas.root?await bgOf(mas.root,env,mas.path,mas.rels):null);
  let h='';
  if(bg&&!bg.none){el.style.background=bg.bg;if(bg.img)el.style.cssText+=';background-size:100% 100%;background-repeat:no-repeat'}else if(bg&&bg.none)el.style.background='transparent';
  const showM=A(sl.root,'showMasterSp')!='0',showL=true;
  const base={T:T0,env,phs,ts,slideNo:i+1,noPh:false};
  const nonPh=async(part,isMaster)=>{const tree=kid(kid(part.root,'cSld'),'spTree');if(!tree)return'';let o='';
   for(const c of tree.children){const n=c.localName;if(n=='sp'){if(kid(kid(kid(c,'nvSpPr'),'nvPr'),'ph'))continue}if(n=='sp'||n=='pic'||n=='grpSp'||n=='cxnSp'||n=='graphicFrame'){const tmp=document.createElement('div');}}
   /* render only non-placeholder children */
   const fake={children:[...tree.children].filter(c=>!(c.localName=='sp'&&kid(kid(kid(c,'nvSpPr'),'nvPr'),'ph')))};
   return renderTree(fake,{T:T0,env,part:part.path,rels:part.rels,phs:null,ts:null,slideNo:i+1,noPh:true},false)};
  if(showM&&A(lay&&lay.root,'showMasterSp')!='0'&&mas&&mas.root)h+=await nonPh(mas,true);
  if(lay&&lay.root&&showM)h+=await nonPh(lay,false);
  const tree=kid(kid(sl.root,'cSld'),'spTree');
  if(tree)h+=await renderTree(tree,Object.assign({part:spath,rels:sl.rels},base),true);
  el.insertAdjacentHTML('beforeend',h);cache[i]=el;return el}
 /* ================= UI ================= */
 host.innerHTML='';
 const app=O.h('div','pt-app'+(opt.inline?' pt-in':'')+(opt.fill?' ofx-fill':''));app.tabIndex=0;
 app.innerHTML='<div class="pt-tools"><button class="red" data-a="start" title="Play from the first slide (F5)">▶ Slide show</button><button data-a="cur" title="Play from this slide (Shift+F5)">▶ From this slide</button><span class="sp"></span><button data-a="prev" aria-label="Previous slide">‹</button><button data-a="next" aria-label="Next slide">›</button></div>'+
  '<div class="pt-main"><div class="pt-rail"></div><div class="pt-stage"><div class="pt-wrap"></div></div></div>'+
  '<div class="pt-st"><span class="pt-no">Slide 1 of '+slidePaths.length+'</span><span class="sp"></span>'+(opt.inline?'<button data-a="prev" aria-label="Previous slide">‹</button><button data-a="next" aria-label="Next slide">›</button>':'')+'<button data-a="start" class="pt-inl" title="Slide show">▶ Slide show</button></div>';
 host.appendChild(app);
 const rail=app.querySelector('.pt-rail'),stage=app.querySelector('.pt-stage'),wrap=app.querySelector('.pt-wrap'),no=app.querySelector('.pt-no');
 if(!opt.inline)app.querySelector('.pt-st .pt-inl').style.display='none';
 let cur=0,show=null;const N_=slidePaths.length;
 wrap.style.width=W+'px';wrap.style.height=H+'px';
 const fitTo=(box,wr,pad)=>{const aw=Math.max(40,box.clientWidth-pad*2),ah=Math.max(40,box.clientHeight-pad*2),s=Math.min(aw/W,ah/H,opt.inline?1.5:4);wr.style.width=W*s+'px';wr.style.height=H*s+'px';const sl=wr.firstChild;if(sl)sl.style.transform='scale('+s+')';return s};
 const showSlide=async i=>{i=clamp(i,0,N_-1);cur=i;const my=++showSlide.t;const el=await renderSlide(i);if(my!=showSlide.t)return;wrap.innerHTML='';wrap.appendChild(el.cloneNode(true));fit();no.textContent='Slide '+(i+1)+' of '+N_;
  rail.querySelectorAll('.pt-th').forEach(t=>t.classList.toggle('on',+t.dataset.i==i));const t=rail.querySelector('.pt-th.on');if(t&&rail.clientHeight){const nar=app.classList.contains('pt-narrow');if(nar){const l=t.offsetLeft,w=t.offsetWidth;if(l<rail.scrollLeft||l+w>rail.scrollLeft+rail.clientWidth)rail.scrollLeft=l-8}else{const tp=t.offsetTop,hh=t.offsetHeight;if(tp<rail.scrollTop||tp+hh>rail.scrollTop+rail.clientHeight)rail.scrollTop=tp-8}}};showSlide.t=0;
 const fit=()=>{const nar=host.clientWidth<720;app.classList.toggle('pt-narrow',nar&&!opt.inline);fitTo(stage,wrap,opt.inline?4:(nar?8:14))};
 /* thumbnails (lazy) */
 const thW=()=>app.classList.contains('pt-narrow')?116:140;
 const mkTh=i=>{const d=O.h('div','pt-th');d.dataset.i=i;d.innerHTML='<i>'+(i+1)+'</i><div class="b"></div>';rail.appendChild(d);return d};
 const ths=[];if(!opt.inline)for(let i=0;i<N_;i++)ths.push(mkTh(i));
 const fillTh=async d=>{if(d._f)return;d._f=1;const i=+d.dataset.i;try{const el=await renderSlide(i),b=d.querySelector('.b'),w=b.clientWidth||thW();const s=w/W;b.style.height=H*s+'px';const c=el.cloneNode(true);c.style.transform='scale('+s+')';b.appendChild(c)}catch(e){}};
 let io=null;if(!opt.inline){if('IntersectionObserver' in window){io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);fillTh(e.target)}}),{root:rail,rootMargin:'300px'});ths.forEach(t=>io.observe(t))}else ths.forEach(fillTh)}
 rail.addEventListener('click',e=>{const t=e.target.closest('.pt-th');if(t)showSlide(+t.dataset.i)});
 /* navigation */
 const go=d=>showSlide(cur+d);
 app.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;if(a=='prev')go(-1);else if(a=='next')go(1);else if(a=='start')startShow(0);else if(a=='cur')startShow(cur)});
 app.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey)return;const k=e.key;let h=true;
  if(k=='ArrowRight'||k=='ArrowDown'||k=='PageDown'||k==' ')go(1);else if(k=='ArrowLeft'||k=='ArrowUp'||k=='PageUp')go(-1);else if(k=='Home')showSlide(0);else if(k=='End')showSlide(N_-1);
  else if(k=='F5'){startShow(e.shiftKey?cur:0)}else h=false;if(h){e.preventDefault();e.stopPropagation()}});
 {let sx=0,sy=0,st=0;stage.addEventListener('touchstart',e=>{if(e.touches.length==1){sx=e.touches[0].clientX;sy=e.touches[0].clientY;st=Date.now()}},{passive:true});
  stage.addEventListener('touchend',e=>{const t=e.changedTouches[0];if(!t||!st)return;const dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4&&Date.now()-st<700)go(dx<0?1:-1);st=0},{passive:true})}
 let rt=0;const onR=()=>{clearTimeout(rt);rt=setTimeout(()=>{if(!app.isConnected){window.removeEventListener('resize',onR);return}fit();ths.forEach(d=>{if(d._f){d._f=0;d.querySelector('.b').innerHTML='';fillTh(d)}})},120)};
 window.addEventListener('resize',onR);let ro=null;if(window.ResizeObserver){ro=new ResizeObserver(onR);ro.observe(host)}
 /* ================= slide show ================= */
 async function startShow(from){if(show)return;const S=O.h('div','pt-show');S.tabIndex=0;S.classList.add('ofx-fs-watch');
  S.innerHTML='<div class="pt-wrap"></div><div class="end">End of slide show — click to exit</div><div class="pt-bar"></div><div class="pt-laser"></div><div class="pt-ctl"><button data-s="prev" aria-label="Previous">‹</button><span class="n">1 / '+N_+'</span><button data-s="next" aria-label="Next">›</button><button data-s="auto" title="Auto-advance every 5 s">⏱</button><button data-s="laser" title="Laser pointer (L)">●</button><button data-s="fs" title="Full screen (F)">⛶</button><button data-s="x" title="End show (Esc)">✕</button></div>';
  document.body.appendChild(S);O._shows=O._shows||new Set();O._shows.add(S);
  const sw=S.querySelector('.pt-wrap'),bar=S.querySelector('.pt-bar'),nn=S.querySelector('.n'),laser=S.querySelector('.pt-laser');let i=clamp(from,0,N_-1),auto=0,hideT=0,laserOn=0,numBuf='';
  show={S,close:null};
  const fitS=()=>{const s=Math.min(S.clientWidth/W,S.clientHeight/H);sw.style.width=W*s+'px';sw.style.height=H*s+'px';const sl=sw.firstChild;if(sl)sl.style.transform='scale('+s+')'};
  const draw=async(n,fade)=>{n=clamp(n,0,N_-1);i=n;const el=await renderSlide(n);if(!S.isConnected||i!=n)return;S.classList.remove('fin');if(fade){sw.classList.add('out');await new Promise(r=>setTimeout(r,110));if(!S.isConnected||i!=n)return}sw.innerHTML='';sw.appendChild(el.cloneNode(true));fitS();sw.classList.remove('out');nn.textContent=(n+1)+' / '+N_;bar.style.width=((n+1)/N_*100)+'%';cur=n;
   if(i+1<N_)renderSlide(i+1).catch(()=>{})};
  const next=()=>{if(S.classList.contains('fin')){close();return}if(i>=N_-1){S.classList.add('fin');bar.style.width='100%';return}draw(i+1,true)};
  const prev=()=>{if(S.classList.contains('fin')){draw(i,false);return}if(i>0)draw(i-1,true)};
  const close=()=>{if(!show)return;clearInterval(auto);clearTimeout(hideT);if(O.fsEl()===S)O.exitFS();document.documentElement.classList.remove('pfs-lock');S.remove();O._shows&&O._shows.delete(S);show=null;document.removeEventListener('keydown',kd,true);window.removeEventListener('resize',fitS);showSlide(cur);try{app.focus({preventScroll:true})}catch(e){}};
  show.close=close;S._close=close;
  const bump=()=>{S.classList.remove('nocur');clearTimeout(hideT);hideT=setTimeout(()=>S.classList.add('nocur'),2600)};
  const kd=e=>{if(!S.isConnected)return;const k=e.key;let h=true;
   if(k=='ArrowRight'||k=='ArrowDown'||k=='PageDown'||k==' '||k=='Enter'||k=='n'||k=='N'){if(numBuf&&k=='Enter'){const t=+numBuf;numBuf='';if(t>=1&&t<=N_)draw(t-1,false)}else next()}else if(k=='ArrowLeft'||k=='ArrowUp'||k=='PageUp'||k=='Backspace'||k=='p'||k=='P')prev();
   else if(k=='Home')draw(0,false);else if(k=='End')draw(N_-1,false);else if(k=='Escape')close();else if(k=='f'||k=='F')O.toggleFS(S);
   else if(k=='b'||k=='B'||k=='.'){S.classList.toggle('blk');S.classList.remove('wht')}else if(k=='w'||k=='W'||k==','){S.classList.toggle('wht');S.classList.remove('blk')}
   else if(k=='l'||k=='L'){laserOn=!laserOn;laser.style.display=laserOn?'block':'none'}
   else if(/^[0-9]$/.test(k)){numBuf+=k;h=true}else h=false;
   if(h){e.preventDefault();e.stopPropagation()}bump()};
  document.addEventListener('keydown',kd,true);window.addEventListener('resize',fitS);
  S.addEventListener('ofx-fs',()=>{fitS();setTimeout(fitS,250)});
  S.addEventListener('click',e=>{if(e.target.closest('.pt-ctl')){const b=e.target.closest('[data-s]');if(!b)return;const a=b.dataset.s;if(a=='prev')prev();else if(a=='next')next();else if(a=='x')close();else if(a=='fs')O.toggleFS(S);
    else if(a=='auto'){if(auto){clearInterval(auto);auto=0;b.classList.remove('on')}else{b.classList.add('on');auto=setInterval(()=>{if(i>=N_-1){clearInterval(auto);auto=0;b.classList.remove('on')}else next()},5000)}}
    else if(a=='laser'){laserOn=!laserOn;laser.style.display=laserOn?'block':'none';b.classList.toggle('on',!!laserOn)}return}
   if(e.target.closest('a'))return;const r=S.getBoundingClientRect();if(S.classList.contains('fin')){close();return}(e.clientX-r.left)<r.width*.33?prev():next()});
  S.addEventListener('mousemove',e=>{bump();if(laserOn){laser.style.left=e.clientX+'px';laser.style.top=e.clientY+'px'}});
  S.addEventListener('touchmove',e=>{if(laserOn&&e.touches[0]){laser.style.left=e.touches[0].clientX+'px';laser.style.top=e.touches[0].clientY+'px'}},{passive:true});
  S.addEventListener('contextmenu',e=>{e.preventDefault();prev()});
  {let sx=0,sy=0,t0=0;S.addEventListener('touchstart',e=>{if(e.touches.length==1){sx=e.touches[0].clientX;sy=e.touches[0].clientY;t0=Date.now()}},{passive:true});
   S.addEventListener('touchend',e=>{const t=e.changedTouches[0];if(!t||!t0)return;const dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3&&Date.now()-t0<800){e.preventDefault();dx<0?next():prev()}t0=0},{passive:false})}
  bump();await draw(i,false);S.focus({preventScroll:true});
  O.toggleFS(S)}
 O.closeShow=()=>{if(O._shows)for(const s of [...O._shows])if(s._close)s._close()};
 await showSlide(0);
 if(opt.autoStart)startShow(0);
 return{app,count:N_,go:showSlide,startShow,closeShow(){if(show)show.close()},destroy(){if(show)show.close();urls.forEach(u=>URL.revokeObjectURL(u));urls.length=0;window.removeEventListener('resize',onR);if(ro)ro.disconnect();if(io)io.disconnect()}}};
})();
