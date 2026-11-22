(function(){var e=document.createElement('style');e.setAttribute("id","alpha-mobile-fixes");e.textContent=`/* ===== mobile fixes (visual only) ===== */
#main .ins-head>div:first-child{min-width:0;flex:1 1 auto}#main .ins-head h1{white-space:nowrap}
@media(max-width:400px){#main .ins-head{gap:10px}#main .ins-head h1{font-size:26px}#main .ins-head .sub{font-size:12.5px}
#main .ins-hero{flex:0 1 128px;min-width:108px;min-height:54px;padding:9px 11px;font-size:10.5px;border-radius:16px}
#main .ins-grid .tile{padding:12px;min-height:142px}#main .ins-bd{top:10px;right:10px}#main .ins-t{font-size:14.5px}}
@media(max-width:340px){#main .ins-hero{display:none}}
#main .vB>*,#main .vA>*{min-width:0}#main .vlist,#main .vcard{min-width:0;max-width:100%;box-sizing:border-box}
@media(max-width:640px){.stg .stn{scroll-snap-type:x proximity;scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent);padding-right:18px}
.stg .stn::-webkit-scrollbar{display:none}.stg .stn button{scroll-snap-align:start}}

@media(max-width:480px){
#main .vtt{padding-right:0!important;flex:1 1 0!important}
#main .fls .tk{gap:8px}#main .fls .tk .fic{width:34px;height:34px;flex:none}#main .fls .tk .pvb{padding:6px 8px}
#main .fls .tk:has(.thw) .fic{display:none}
#main .fls .tk .grow{min-width:96px;font-size:14.5px;line-height:20px;overflow-wrap:break-word;word-break:normal}
#main .fls .tk .grow .mu{font-size:12px}
#main .fsh h3,#main .fsh .chip,#main .fsh button{white-space:nowrap}#main .fsh .chip,#main .fsh button{padding-left:12px;padding-right:12px}
}
`;document.body.appendChild(e)})();
(function(){var e=document.createElement('style');e.setAttribute("id","alpha-lock-open");e.textContent=`/* ===== lock screen: no box, options aligned in one clean column. Visual layer only. ===== */
html body #lock .card{max-width:380px!important;width:100%;padding:0!important;border:0!important;border-radius:0!important;background:none!important;box-shadow:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}
html body #lock .card::before{display:none!important}
html body #lock .lk-row,html body #lock .lk-rs{margin:12px 0 0!important;padding:0!important;border:0!important;text-align:left!important}
html body #lock .lk-row{min-height:44px;gap:14px;font-size:13.5px}
html body #lock .lk-rs{display:block}
html body #lock #rs{display:flex!important;align-items:center;gap:14px;width:100%;min-height:44px;color:var(--lk-lav)!important;font-size:13.5px;line-height:1.35;text-align:left;
--lk-tile:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a98bff' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 12a9 9 0 1 1-3-6.7L21 8'/%3E%3Cpath d='M21 3v5h-5'/%3E%3C/svg%3E")}
html body #lock #rs::before{width:44px;height:44px;flex:none;border-radius:15px;border:1.5px solid transparent;-webkit-mask:none;mask:none;
background:var(--lk-tile) center/21px no-repeat padding-box,linear-gradient(160deg,rgba(18,22,70,.9),rgba(10,10,42,.9)) padding-box,linear-gradient(140deg,rgba(80,120,255,.55),rgba(150,70,255,.45)) border-box}
html body #lock #rs::after{margin-left:auto}
html[data-theme=light] body #lock #rs{--lk-tile:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235b45e0' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 12a9 9 0 1 1-3-6.7L21 8'/%3E%3Cpath d='M21 3v5h-5'/%3E%3C/svg%3E")}
html[data-theme=light] body #lock #rs::before{background:var(--lk-tile) center/21px no-repeat padding-box,linear-gradient(160deg,#fff,#eef0ff) padding-box,linear-gradient(140deg,rgba(80,120,255,.55),rgba(150,70,255,.45)) border-box}
html body #lock .lk-row .lk-q,html body #lock .lk-row .lk-l{display:block}html body #lock .lk-row .lk-l{margin-left:0;width:fit-content;margin-top:1px}
html body #lock .lk-foot{margin-top:26px}
@media(max-width:380px){html body #lock .card{padding:0!important;border-radius:0!important}html body #lock .lk-row,html body #lock #rs{font-size:12.5px;gap:10px}}
`;document.body.appendChild(e)})();
(function(){var e=document.createElement('style');e.setAttribute("id","alpha-vault-minimal");e.textContent=`/* ===== Vault: light & minimal storage area (visual only) ===== */
html body #app>main#main:has(>.vt){background:none!important}
html body #main .vt .vcard{background:var(--card)!important;border:1px solid var(--bd)!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border-radius:18px;padding:22px 24px}
html body #main .vt .vcard::before{display:none!important}
html body #main .vt .vstor{height:auto;min-height:0}
html body #main .vt .vcard h3{font-size:12px;letter-spacing:.09em;color:var(--mu)}
html body #main .vt .vsub{color:var(--mu);font-size:12.5px;margin-top:4px}
html body #main .vt .vbar{height:4px;border-radius:4px;background:var(--bd);margin-top:10px;width:min(100%,340px);overflow:hidden}
html body #main .vt .vbar i{display:block;height:100%;border-radius:inherit;background:var(--a);transition:width .4s}
html body #main .vt .vchip{background:transparent!important;border:1px solid transparent!important;box-shadow:none!important;color:var(--mu)!important;height:28px}
html body #main .vt .vchip:hover{color:var(--tx)!important}
html body #main .vt .vchip.on{background:var(--bd)!important;color:var(--tx)!important}
html body #main .vt .vviz.rings svg{filter:none}
html body #main .vt .vviz .sg:hover{filter:none;opacity:.85}
html body #main .vt .rc b{color:var(--tx)}
html body #main .vt .rc span:last-child,html body #main .vt .rc .rdb{color:var(--mu)}
html body #main .vt .vlist{background:none!important;border:0!important;box-shadow:none!important;padding:0}
html body #main .vt .vr{border-bottom:1px solid var(--bd);color:var(--tx)}
html body #main .vt .vr:hover{background:var(--bd)}
html body #main .vt .vr .s,html body #main .vt .vr .p{color:var(--mu)}
html body #main .vt .vr .dt{width:10px;height:10px;box-shadow:none;margin-left:3px}
html body #main .vt .vr.free .dt{background:var(--bd)!important;box-shadow:inset 0 0 0 1px var(--mu)}
html body #main .vt .vq{gap:10px}
html body #main .vt .qt{height:auto;min-height:96px;justify-content:flex-start;gap:2px;padding:14px 16px;background:transparent!important;border:1px solid var(--bd)!important;box-shadow:none!important;color:var(--tx)}
html body #main .vt button.qt:hover{transform:none;box-shadow:none!important;border-color:var(--a)!important}
html body #main .vt .qt .qi{color:var(--mu)}
html body #main .vt .qt>span:last-child{color:var(--mu)}
html body #main .vt .vtile{height:98px;background:var(--card)!important;border:1px solid var(--bd)!important;box-shadow:none!important}
html body #main .vt .vtile:hover{transform:none;border-color:var(--t)!important;box-shadow:none!important}
html body #main .vt .vtile .vti{background:none!important;box-shadow:none!important;color:var(--t)}
html body #main .vt .qt .qi{position:static;margin-bottom:10px}
html body #main .vt .qt b{font-size:19px;white-space:nowrap}
html body #main .vt .vtile .vti{width:30px;height:30px;top:12px;left:14px}
html body #main .vt .vtile b{color:var(--tx)}
html body #main .vt .vtile .vtm2,html body #main .vt .vtile .vchv{color:var(--mu)}
html body #main .vt .vtile.hit{box-shadow:0 0 0 1.5px var(--t)!important}

/* compact storage card + new diagram shapes */
html body #main .vt .vA{grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:14px;margin-bottom:14px}
html body #main .vt .qt>span:last-child{white-space:nowrap}
@media(max-width:980px){html body #main .vt .vA{grid-template-columns:minmax(0,1fr)}}
html body #main .vt .vbody{display:grid;grid-template-columns:220px minmax(0,1fr)!important;gap:28px;align-items:center;margin-top:12px;flex:none}
html body #main .vt .vviz,html body #main .vt .vviz.alt{width:220px;height:120px;min-height:0;margin:0}
html body #main .vt .vviz svg{width:100%;height:100%;max-height:none;display:block;overflow:visible}
html body #main .vt .vn-t1{font:700 20px var(--sk-font);fill:var(--tx);text-anchor:middle}
html body #main .vt .vn-t2{font:400 10.5px var(--sk-font);fill:var(--mu)}
html body #main .vt .vviz .sg{cursor:pointer;transition:opacity .15s}
html body #main .vt .vviz .sg:hover{opacity:.7;filter:none}
html body #main .vt .vr{height:34px;grid-template-columns:22px 1fr 84px 62px}
html body #main .vt .vq{gap:8px}
html body #main .vt .vquick{padding:18px 18px 16px}
html body #main .vt .vquick h3{margin:0 0 12px 2px}
html body #main .vt .qt{display:grid;grid-template-columns:26px 1fr;column-gap:10px;row-gap:0;align-content:center;align-items:center;min-height:62px;padding:10px 14px}
html body #main .vt .qt .qi{grid-row:1/3;margin:0}
html body #main .vt .qt b,html body #main .vt .qt>span:last-child{grid-column:2}
html body #main .vt .qt b{font-size:17px;line-height:20px}
@media(max-width:700px){html body #main .vt .vbody{grid-template-columns:1fr!important;gap:12px}html body #main .vt .vviz{margin:0 auto}}

html body #main .vt .vlist{max-height:178px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--bd) transparent;padding-right:2px}
@keyframes vn-tide{to{transform:translateX(-55px)}}
html body #main .vt .vn-tw{animation:vn-tide 8s linear infinite}
@media(prefers-reduced-motion:reduce){html body #main .vt .vn-tw{animation:none}}
html body #main .vt .vviz path.sg:hover,html body #main .vt .vviz g.sg:hover{opacity:.75}

/* ===== Vault: signature diagrams (Dial / Hive / Towers / Stars), 240x150 ===== */
html body #main .vt .vbody{grid-template-columns:240px minmax(0,1fr)!important;gap:26px}
html body #main .vt .vviz,html body #main .vt .vviz.alt{width:240px;height:150px}
html body #main .vt .vlist{max-height:176px}
@keyframes vn-spin{to{transform:rotate(360deg)}}
@keyframes vn-spin-r{to{transform:rotate(-360deg)}}
@keyframes vn-pop{from{opacity:0;transform:scale(.35)}to{opacity:1;transform:scale(1)}}
@keyframes vn-grow{from{transform:scaleY(.05);opacity:.2}to{transform:scaleY(1);opacity:1}}
@keyframes vn-glow{0%,100%{opacity:.55;transform:scale(.9)}50%{opacity:1;transform:scale(1.25)}}
html body #main .vt .vn-spin{animation:vn-spin 90s linear infinite}
html body #main .vt .vn-spin2{animation:vn-spin-r 60s linear infinite}
html body #main .vt .vn-pop{transform-box:fill-box;transform-origin:center;animation:vn-pop .5s cubic-bezier(.2,.9,.3,1.3) backwards}
html body #main .vt .vn-grow{transform-box:fill-box;transform-origin:50% 100%;animation:vn-grow .7s cubic-bezier(.2,.9,.3,1) backwards}
html body #main .vt .vn-twk{animation:vn-glow 3.4s ease-in-out infinite}
html body #main .vt .vn-pulse{animation:vn-glow 4s ease-in-out infinite}
html body #main .vt .vviz g.sg{transition:opacity .15s,filter .2s}
html body #main .vt .vviz g.sg:hover{opacity:1;filter:drop-shadow(0 0 5px rgba(120,200,255,.55)) brightness(1.12)}
html body #main .vt .vviz .vn-arc{transition:stroke-width .2s}
html body #main .vt .vviz g.sg:hover .vn-arc{stroke-width:9}
@media(prefers-reduced-motion:reduce){html body #main .vt .vn-spin,html body #main .vt .vn-spin2,html body #main .vt .vn-pop,html body #main .vt .vn-grow,html body #main .vt .vn-twk,html body #main .vt .vn-pulse{animation:none}}
@media(max-width:700px){html body #main .vt .vviz{width:min(100%,260px);height:auto;aspect-ratio:240/150}}
`;document.body.appendChild(e)})();
(function(){var e=document.createElement('style');e.setAttribute("id","alpha-mobile-sbar");e.textContent=`
/* Mobile fix: selection bar had a transparent background and overlapped the file list. Now a compact solid bar. */
@media (max-width:760px){
 #main #sbar.fsel,#sbar.fsel{position:sticky;bottom:calc(8px + var(--sa-bottom));z-index:60;display:flex;flex-direction:column;flex-wrap:nowrap;align-items:stretch;justify-content:flex-start;gap:6px;width:100%;margin-top:14px;padding:8px;border-radius:20px;background:rgba(9,14,38,.98);border:1px solid rgba(255,255,255,.14);box-shadow:0 18px 40px -10px #000;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
 #sbar.fsel .r:first-child{height:auto;padding:0 2px;gap:6px;flex-wrap:nowrap;background:none;border:0;box-shadow:none}
 #sbar.fsel .r:first-child>b{flex:1 1 auto;min-width:0;gap:8px;font-size:13px}
 #sbar.fsel .sbz{display:none}
 #sbar.fsel .sbt b{font-size:13px;white-space:nowrap}
 #sbar.fsel .r:first-child .chip{height:30px;padding:0 10px;font-size:12px;white-space:nowrap;flex:none}
 #sbar.fsel .r:last-child{display:flex;flex-wrap:nowrap;justify-content:stretch;gap:6px}
 #sbar.fsel .r:last-child .chip,#sbar.fsel #a-mv{flex:1 1 0;min-width:0;justify-content:center;height:40px;padding:0 4px;gap:4px;font-size:12px;font-weight:600;border-radius:20px;white-space:nowrap}
 #sbar.fsel .r:last-child .chip svg,#sbar.fsel #a-mv svg{width:15px;height:15px;flex:none}
}
@media (max-width:400px){#sbar.fsel .r:last-child .chip svg{display:none}}
@media (max-width:480px){
 #main .fls .tk{gap:10px}
 #main .fls .tk .grow{font-size:16px;line-height:22px}
 #main .fls .tk .grow .mu{font-size:12.5px;line-height:18px;overflow:hidden;text-overflow:ellipsis}
 #main .fls .tk .fev{width:44px;height:44px}
 #main .fls .tk .fkb{width:36px;height:44px;margin-left:0}
}
@media (max-width:370px){
 html body #main .vt .vq{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
 html body #main .vt .qt{min-width:0;padding:10px;column-gap:8px;grid-template-columns:22px minmax(0,1fr)}
 html body #main .vt .qt b{font-size:15px}
 html body #main .vt .qt>span:last-child{white-space:normal;font-size:12px;overflow-wrap:anywhere}
}
`;document.body.appendChild(e)})();
(function(){var e=document.createElement('style');e.setAttribute("id","alpha-lock-minimal");e.textContent=`/* ===== ALPHA minimal lock screen: logo mark, calm motion. Logic/ids untouched. ===== */
#lock{--lk-a:#19d3ff;--lk-b:#3df2c0;--mn-bg:#04080d;--mn-tx:#f4f5ff;--mn-mu:rgba(226,230,255,.56);--mn-dim:rgba(226,230,255,.34);--mn-line:rgba(255,255,255,.09);--mn-fill:rgba(255,255,255,.045);--mn-btn:#f4f5ff;--mn-btn-tx:#070a1c;--mn-ease:cubic-bezier(.22,1,.36,1)}
html[data-theme=light] #lock{--lk-a:#0891b2;--lk-b:#0d9f78;--mn-bg:#f3f9fb;--mn-tx:#12163a;--mn-mu:rgba(24,30,76,.62);--mn-dim:rgba(24,30,76,.42);--mn-line:rgba(30,40,110,.13);--mn-fill:rgba(255,255,255,.75);--mn-btn:#12163a;--mn-btn-tx:#fff}

/* background */
html body #lock{background:var(--mn-bg)!important;color:var(--mn-tx);overflow-x:hidden;overflow-y:auto;align-items:flex-start}
html body #lock::before{content:"";position:fixed;inset:auto;left:50%;top:-18vmax;width:90vmax;height:90vmax;margin-left:-45vmax;border:0;border-radius:50%;
 background:radial-gradient(closest-side,color-mix(in srgb,var(--lk-a) 20%,transparent),transparent 72%);box-shadow:none;opacity:.9;pointer-events:none}
html body #lock::after{content:"";position:fixed;inset:auto;left:50%;bottom:-40vmax;width:80vmax;height:80vmax;margin-left:-40vmax;border:0;border-radius:50%;
 background:radial-gradient(closest-side,color-mix(in srgb,var(--lk-b) 13%,transparent),transparent 72%);box-shadow:none;pointer-events:none}
@keyframes mnDrift{from{transform:translate3d(-6%,0,0) scale(1)}to{transform:translate3d(6%,4%,0) scale(1.08)}}
html body #lock .card{max-width:340px!important;margin:auto}

/* logo mark replaces the old wordmark */
html body #lock .logo{display:none!important}
html body #lock .mn-lmark{width:104px;height:104px;margin:0 auto 22px;transition:opacity .35s ease}
html body #lock .mn-lmark .mn-mark{--s:100%}
html body #lock:not(.lk-markshow) .mn-lmark{opacity:0}
html body #lock #lm{margin:0 0 34px!important;font:400 13px/1.4 var(--sk-font,'Inter',sans-serif)!important;letter-spacing:.04em!important;color:var(--mn-mu)!important}

/* fields */
html body #lock .lk-f{height:52px;margin:0 0 12px;padding:0 10px 0 18px;gap:12px;border-radius:16px;background:var(--mn-fill);box-shadow:none;transition:background .3s var(--mn-ease),box-shadow .3s var(--mn-ease)}
html body #lock .lk-f::before{background:var(--mn-line)!important;transition:background .3s var(--mn-ease)}
html body #lock .lk-f:focus-within{background:color-mix(in srgb,var(--lk-a) 7%,var(--mn-fill));box-shadow:0 0 0 4px color-mix(in srgb,var(--lk-a) 14%,transparent)}
html body #lock .lk-f:focus-within::before{background:color-mix(in srgb,var(--lk-a) 70%,transparent)!important}
html body #lock .lk-f input{color:var(--mn-tx)!important;font:500 16px/1 var(--sk-font,'Inter',sans-serif)!important}
html body #lock .lk-f input::placeholder{color:var(--mn-dim)!important}
html body #lock .lk-ic{width:20px;height:20px;background:var(--mn-dim)!important;transition:background .3s}
html body #lock .lk-f:focus-within .lk-ic{background:var(--lk-a)!important}
html body #lock .lk-eye::before{background:var(--mn-dim)!important;width:20px;height:20px}
html body #lock .lk-eye:hover::before{background:var(--mn-tx)!important}
html body #lock .lk-x{background:var(--mn-line)!important;width:26px;height:26px}
html body #lock .lk-x::before{background:var(--mn-tx)!important;width:12px;height:12px}
html body #lock.lk-in .card>.lk-f.lk-shake{animation:mnShake .42s var(--mn-ease)}
@keyframes mnShake{0%,100%{transform:none}20%{transform:translateX(-7px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(2px)}}

/* mode chips + pattern pad */
html body #lock #lmc .chip{padding:8px 16px;border:1px solid var(--mn-line);background:transparent;color:var(--mn-mu);font:500 12.5px var(--sk-font,'Inter',sans-serif);transition:all .25s var(--mn-ease)}
html body #lock #lmc .chip.on{background:var(--mn-tx)!important;color:var(--mn-bg);border-color:transparent;box-shadow:none}
html body #lock .pp i{background:radial-gradient(circle,var(--mn-mu) 0 4px,transparent 5px);border:1px solid var(--mn-line);transition:all .2s var(--mn-ease)}
html body #lock .pp i.on{background:radial-gradient(circle,#fff 0 5px,transparent 6px),var(--lk-a);border-color:transparent;box-shadow:0 0 0 6px color-mix(in srgb,var(--lk-a) 22%,transparent)}
html body #lock #le{margin:0 0 12px!important;font-size:12.5px;color:#ff7a8e!important}
html[data-theme=light] body #lock #le{color:#c4163f!important}

/* primary button */
html body #lock #lb{height:52px;margin:8px 0 0;padding:0 48px;border-radius:16px;font:600 15.5px/52px var(--sk-font,'Inter',sans-serif);letter-spacing:.01em;
 color:var(--mn-btn-tx)!important;background:var(--mn-btn)!important;box-shadow:0 10px 30px -14px color-mix(in srgb,var(--lk-a) 80%,transparent)!important;
 transition:transform .35s var(--mn-ease),box-shadow .35s var(--mn-ease),opacity .25s!important}
html body #lock #lb::after{right:20px;inset-inline-end:20px;width:18px;height:18px;margin-top:-9px;background:currentColor!important;transition:transform .35s var(--mn-ease)}
html body #lock #lb:hover{filter:none;transform:translateY(-1px);box-shadow:0 16px 34px -14px color-mix(in srgb,var(--lk-a) 90%,transparent)!important}
html body #lock #lb:hover::after{transform:translateX(4px)}
html body #lock #lb:active{transform:scale(.985)}

/* quiet text links */
html body #lock .lk-row{display:block;min-height:0;margin:22px 0 0!important;font-size:13px;text-align:center!important;color:var(--mn-mu)}
html body #lock .lk-row::before,html body #lock .lk-row::after{display:none!important}
html body #lock .lk-row a{display:inline;color:inherit!important}
html body #lock .lk-row .lk-q,html body #lock .lk-row .lk-l{display:inline;width:auto;margin:0}
html body #lock .lk-row .lk-l{margin-left:.4em;color:var(--mn-tx);font-weight:500;text-decoration:none;background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;transition:background-size .35s var(--mn-ease)}
html body #lock .lk-row a:hover .lk-l{color:var(--mn-tx);background-size:100% 1px}
html body #lock .lk-row+.lk-row{margin-top:10px!important}
html body #lock .lk-rs{margin:22px 0 0!important;padding:0!important;border:0!important;text-align:center!important}
html body #lock #rs{display:inline!important;width:auto;min-height:0;font-size:12.5px;color:var(--mn-dim)!important;transition:color .25s}
html body #lock #rs::before,html body #lock #rs::after{display:none!important}
html body #lock #rs:hover{color:#ff7a8e!important}
html body #lock .lk-fl{display:none}
html body #lock .lk-foot{display:none!important}
html body #lock .lk-foot p{margin:0;font:500 10px/1 var(--sk-font,'Inter',sans-serif);letter-spacing:.3em;color:var(--mn-dim)}

/* motion */
html body #lock:not(.lk-in):not(.lk-out) .card>*:not(.mn-lmark){opacity:0}
html body #lock.lk-in .card>*{animation:mnUp .9s var(--mn-ease) var(--d,0ms) both,mnSway var(--fd,6s) ease-in-out calc(var(--d,0ms) + 1.1s) infinite}
/* options sway gently left/right (alternating directions); logo, subtitle and footer stay still (--sw:0) */
@keyframes mnSway{0%,50%,100%{transform:translateX(0)}25%{transform:translateX(calc(var(--sw,5px) * var(--dir,1)))}75%{transform:translateX(calc(var(--sw,5px) * var(--dir,1) * -1))}}
/* button shimmer */
html body #lock #lb{overflow:hidden}
html body #lock #lb::before{display:block!important;content:"";position:absolute;inset:0;width:auto;height:auto;margin:0;border-radius:inherit;pointer-events:none;-webkit-mask:none;mask:none;
 background:linear-gradient(105deg,transparent 38%,color-mix(in srgb,var(--lk-a) 38%,#fff) 50%,transparent 62%) -140% 0/60% 100% no-repeat;animation:mnShimmer 5s ease-in-out 3.2s infinite}
@keyframes mnShimmer{0%,55%{background-position:-140% 0}100%{background-position:260% 0}}
html body #lock.lk-first.lk-in .card>.mn-lmark{animation:none}
@keyframes mnUp{from{opacity:0;transform:translateY(16px);filter:blur(6px)}to{opacity:1;transform:none;filter:blur(0)}}
html body #lock.lk-out{animation:mnOut .5s cubic-bezier(.4,0,.2,1) forwards;pointer-events:none}
html body #lock.lk-out .card{animation:mnCardOut .5s cubic-bezier(.4,0,.2,1) forwards}
@keyframes mnOut{from{opacity:1}to{opacity:0}}
@keyframes mnCardOut{from{opacity:1;transform:none}to{opacity:0;transform:translateY(-10px) scale(.985)}}
html body.lk-appin #app,html body.lk-appin .fab{animation:mnApp .85s var(--mn-ease) .12s backwards}
@keyframes mnApp{from{opacity:0;transform:translateY(14px) scale(.992)}to{opacity:1;transform:none}}
@media(max-height:720px){
 html body #lock .mn-lmark{width:84px;height:84px;margin-bottom:14px}
 html body #lock #lm{margin-bottom:24px!important}
 html body #lock .lk-f{height:48px;margin-bottom:10px}
 html body #lock #lb{height:48px;line-height:48px}
 html body #lock .lk-row{margin-top:14px!important}
 html body #lock .lk-rs{margin-top:14px!important}
 html body #lock .lk-foot{margin-top:24px}
}
@media(prefers-reduced-motion:reduce){html body #lock::before,html body #lock::after{animation:none}}
`;document.body.appendChild(e)})();
