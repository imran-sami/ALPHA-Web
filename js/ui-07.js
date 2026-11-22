(function(){var e=document.createElement('style');e.setAttribute("id","alpha-lock-skin");e.textContent=`/* ===== ALPHA neon-glass lock screen: visual layer only. All ids, handlers and logic are untouched. ===== */
#lock{--lk-lock:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='11' x='3' y='11' rx='3'/%3E%3Cpath d='M7 11V7.5a5 5 0 0 1 10 0V11'/%3E%3Cpath d='M12 15.5v2'/%3E%3C/svg%3E");--lk-shield:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'/%3E%3C/svg%3E");--lk-eye:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E");--lk-eyeoff:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10.73 5.08a10.74 10.74 0 0 1 11.2 6.57 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-1.44 2.49'/%3E%3Cpath d='M14.08 14.16a3 3 0 0 1-4.24-4.24'/%3E%3Cpath d='M17.48 17.5a10.75 10.75 0 0 1-15.42-5.15 1 1 0 0 1 0-.7 10.75 10.75 0 0 1 4.45-5.14'/%3E%3Cpath d='m2 2 20 20'/%3E%3C/svg%3E");--lk-x:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 6 6 18'/%3E%3Cpath d='m6 6 12 12'/%3E%3C/svg%3E");--lk-finger:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4'/%3E%3Cpath d='M14 13.12c0 2.38 0 6.38-1 8.88'/%3E%3Cpath d='M17.29 21.02c.12-.6.43-2.3.5-3.02'/%3E%3Cpath d='M2 12a10 10 0 0 1 18-6'/%3E%3Cpath d='M2 16h.01'/%3E%3Cpath d='M21.8 16c.2-2 .13-5.35 0-6'/%3E%3Cpath d='M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2'/%3E%3Cpath d='M8.65 22c.21-.66.45-1.32.57-2'/%3E%3Cpath d='M9 6.8a6 6 0 0 1 9 5.2v2'/%3E%3C/svg%3E");--lk-arrow:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3Cpath d='m12 5 7 7-7 7'/%3E%3C/svg%3E");--lk-user:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E");--lk-phone:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='14' height='20' x='5' y='2' rx='3'/%3E%3Cpath d='M12 18h.01'/%3E%3C/svg%3E");--lk-refresh:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8'/%3E%3Cpath d='M21 3v5h-5'/%3E%3C/svg%3E");--lk-lav:#a79df2;--lk-mut:#7d77b6;--lk-link:#8f7dff}
html body #lock{
 background:
  radial-gradient(70% 38% at 50% 104%,rgba(124,52,255,.34),transparent 70%),
  radial-gradient(55% 40% at -5% 28%,rgba(38,92,255,.30),transparent 70%),
  radial-gradient(50% 38% at 105% 72%,rgba(150,42,255,.26),transparent 70%),
  #04051a !important;
 color:#f3f1ff;color-scheme:dark;padding:20px;
 font-family:var(--sk-font,'Inter',system-ui,sans-serif)}
/* big soft arcs behind the card */
html body #lock::before,html body #lock::after{content:"";position:fixed;border-radius:50%;pointer-events:none;z-index:0}
html body #lock::before{width:150vmax;height:150vmax;left:-118vmax;top:-72vmax;
 border:1.5px solid rgba(76,112,255,.22);box-shadow:inset 0 0 90px rgba(52,86,255,.20),0 0 50px rgba(52,86,255,.14)}
html body #lock::after{width:150vmax;height:150vmax;right:-112vmax;bottom:-96vmax;
 border:1.5px solid rgba(150,70,255,.26);box-shadow:inset 0 0 100px rgba(140,54,255,.24),0 0 60px rgba(140,54,255,.16)}

/* glass card with gradient edge */
html body #lock .card{position:relative;z-index:1;width:100%;max-width:420px;padding:30px 24px 22px;border:0;border-radius:38px;text-align:center;
 background:radial-gradient(120% 55% at 18% 0%,rgba(110,140,255,.16),transparent 60%),linear-gradient(165deg,rgba(18,24,80,.58),rgba(14,8,52,.70));
 -webkit-backdrop-filter:blur(22px) saturate(140%);backdrop-filter:blur(22px) saturate(140%);
 box-shadow:0 0 0 1px rgba(90,100,255,.06),0 0 70px -10px rgba(76,96,255,.38),0 46px 90px -34px rgba(138,60,255,.70)}
html body #lock .card::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1.5px;pointer-events:none;
 background:linear-gradient(140deg,#3f86ff 0%,rgba(110,90,255,.55) 38%,#9441ff 68%,#e43fe0 100%);
 -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}

/* logo + ring + wordmark (the app emblem itself is unchanged) */
html body #lock .logo{position:relative;flex-direction:column;align-items:center;justify-content:flex-start;gap:0;padding-top:20px;margin:0 0 4px}
html body #lock .logo::before{content:"";position:absolute;top:0;left:50%;width:112px;height:112px;margin-left:-56px;border-radius:50%;
 background:conic-gradient(from 210deg,rgba(120,90,255,0),rgba(120,150,255,.95) 110deg,rgba(214,80,240,.9) 190deg,rgba(120,90,255,0) 300deg);
 -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 2px),#000 calc(100% - 1.5px));mask:radial-gradient(farthest-side,transparent calc(100% - 2px),#000 calc(100% - 1.5px))}
html body #lock .logo::after{content:"";position:absolute;top:11px;left:calc(50% + 37px);width:6px;height:6px;border-radius:50%;background:#ff7af2;box-shadow:0 0 10px 3px rgba(255,90,240,.75)}
html body #lock .logo img.al{width:74px;height:74px;margin:0;animation:lkGlow 3.4s ease-in-out infinite alternate}
html body #lock .logo .lw{margin-top:24px;padding-left:.36em;font:500 35px/1 var(--sk-font,'Inter',sans-serif);letter-spacing:.36em;
 background:linear-gradient(180deg,#fff 15%,#bdb7ff 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;
 filter:drop-shadow(0 0 14px rgba(140,110,255,.45))}
@keyframes lkGlow{from{filter:drop-shadow(0 0 8px rgba(90,120,255,.55))}to{filter:drop-shadow(0 0 20px rgba(190,70,255,.75))}}

html body #lock #lm{margin:16px 0 24px !important;font:500 15px/1.3 var(--sk-font,'Inter',sans-serif);letter-spacing:.12em;color:var(--lk-lav)}

/* pill fields */
html body #lock .lk-f{position:relative;display:flex;align-items:center;gap:12px;height:56px;margin:0 0 14px;padding:0 14px 0 20px;border-radius:999px;
 background:rgba(5,8,34,.72);box-shadow:inset 0 1px 0 rgba(255,255,255,.04);transition:box-shadow .2s}
html body #lock .lk-f::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1.5px;pointer-events:none;
 background:linear-gradient(100deg,rgba(70,120,255,.55),rgba(120,70,255,.5) 55%,rgba(170,70,255,.4));
 -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;transition:background .2s}
html body #lock .lk-f:focus-within{box-shadow:0 0 0 1px rgba(80,130,255,.25),0 0 26px rgba(70,110,255,.38),inset 0 0 18px rgba(70,90,255,.12)}
html body #lock .lk-f:focus-within::before{background:linear-gradient(100deg,#3f8cff,#7a4dff 60%,#b04dff)}
html body #lock .lk-f:has(input:disabled){opacity:.55}
html body #lock .lk-f input{flex:1;min-width:0;width:auto;height:100%;margin:0 !important;padding:0 !important;border:0 !important;border-radius:0;background:none !important;box-shadow:none !important;outline:0;
 color:#fff;font:500 17px/1 var(--sk-font,'Inter',sans-serif);text-align:left;letter-spacing:.01em}
html body #lock .lk-f input::placeholder{color:var(--lk-mut);opacity:1}
html body #lock .lk-f input[type=password]:not(:placeholder-shown){letter-spacing:.2em}
html body #lock .lk-ic,html body #lock .lk-eye::before,html body #lock .lk-x::before{content:"";display:block;flex:none;width:22px;height:22px;
 background:linear-gradient(135deg,#7fa6ff,#b255ff);-webkit-mask:var(--m) center/contain no-repeat;mask:var(--m) center/contain no-repeat}
html body #lock .lk-ic{--m:var(--lk-lock)}html body #lock .lk-pin .lk-ic{--m:var(--lk-shield)}
html body #lock .lk-eye,html body #lock .lk-x{flex:none;display:grid;place-items:center;width:34px;height:34px;padding:0;border:0;border-radius:50%;cursor:pointer;background:none;color:inherit}
html body #lock .lk-eye::before{--m:var(--lk-eye);background:#a79df2;width:22px;height:22px}
html body #lock .lk-eye.on::before{--m:var(--lk-eyeoff)}
html body #lock .lk-x{display:none;background:rgba(40,46,110,.7);width:30px;height:30px}
html body #lock .lk-f.has .lk-x{display:grid}
html body #lock .lk-x::before{--m:var(--lk-x);background:#fff;width:14px;height:14px}
html body #lock .lk-eye:focus-visible,html body #lock .lk-x:focus-visible{outline:2px solid #8f7dff;outline-offset:1px}

/* lock-type chips (shown only while creating a lock) */
html body #lock #lmc{margin:0 0 14px !important;gap:8px}
html body #lock #lmc .chip{padding:9px 18px;border-radius:999px;border:1px solid rgba(120,110,255,.28);background:rgba(8,12,44,.6);color:#b7b0f5;font:600 13px var(--sk-font,'Inter',sans-serif)}
html body #lock #lmc .chip.on{color:#fff;border-color:transparent;background:linear-gradient(90deg,#2f63ff,#8a2cf5) !important;box-shadow:0 0 20px -4px rgba(100,80,255,.8)}

/* pattern pad */
html body #lock .pp{margin:6px 0 16px}
html body #lock .pp i{border-radius:50%;background:radial-gradient(circle,#a58bff 0 5px,transparent 6px),rgba(8,12,48,.7);border:1.5px solid rgba(120,120,255,.4);transition:box-shadow .15s,border-color .15s}
html body #lock .pp i.on{border-color:#b255ff;box-shadow:0 0 22px rgba(170,80,255,.75),inset 0 0 14px rgba(120,100,255,.5);background:radial-gradient(circle,#fff 0 5px,transparent 6px),rgba(90,50,200,.5)}

html body #lock #le{margin:2px 0 12px !important;font-size:13px;line-height:1.35}
html body #lock #le:empty{display:none}

/* unlock button */
html body #lock #lb{position:relative;display:block;width:100%;height:60px;margin:6px 0 0;padding:0 56px;border:0;border-radius:999px;cursor:pointer;
 font:600 19px/60px var(--sk-font,'Inter',sans-serif);letter-spacing:.01em;color:#fff;text-align:center;white-space:nowrap;
 background:linear-gradient(95deg,#2c66ff 0%,#6a30f6 48%,#d11ff2 82%,#ff3fa8 100%);
 box-shadow:0 0 0 1px rgba(255,255,255,.14) inset,0 14px 34px -10px rgba(150,50,255,.85),0 0 30px -4px rgba(80,110,255,.55);transition:transform .15s,box-shadow .2s,filter .2s}
html body #lock #lb::before{content:"";display:inline-block;vertical-align:middle;width:28px;height:28px;margin:-3px 12px 0 0;background:#fff;-webkit-mask:var(--lk-finger) center/contain no-repeat;mask:var(--lk-finger) center/contain no-repeat}
html body #lock #lb::after{content:"";position:absolute;left:auto;right:24px;inset-inline-end:24px;top:50%;width:22px;height:22px;margin-top:-11px;background:#fff;-webkit-mask:var(--lk-arrow) center/contain no-repeat;mask:var(--lk-arrow) center/contain no-repeat;transition:transform .2s}
html body #lock #lb:hover{filter:brightness(1.08);box-shadow:0 0 0 1px rgba(255,255,255,.2) inset,0 16px 40px -10px rgba(170,60,255,.95),0 0 38px -2px rgba(90,120,255,.7)}
html body #lock #lb:hover::after{transform:translateX(3px)}
html body #lock #lb:active{transform:scale(.985)}
html body #lock #lb:focus-visible{outline:2px solid #fff;outline-offset:3px}
html body #lock #lb:disabled{opacity:.5;filter:saturate(.5);cursor:not-allowed}

/* link rows */
html body #lock .lk-row{display:flex;align-items:center;gap:14px;margin:14px 0 0 !important;text-align:left !important;font-size:13.5px;line-height:1.35;color:var(--lk-lav)}
html body #lock .lk-row::before{content:"";flex:none;width:44px;height:44px;border-radius:15px;border:1.5px solid transparent;
 background:var(--lk-tile) center/21px no-repeat padding-box,linear-gradient(160deg,rgba(18,22,70,.9),rgba(10,10,42,.9)) padding-box,linear-gradient(140deg,rgba(80,120,255,.55),rgba(150,70,255,.45)) border-box}
html body #lock #acl{--lk-tile:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a98bff' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E")}
html body #lock .lk-row.rc{--lk-tile:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a98bff' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='14' height='20' x='5' y='2' rx='3'/%3E%3Cpath d='M12 18h.01'/%3E%3C/svg%3E")}
html body #lock .lk-row::after{content:"";flex:none;width:18px;height:18px;margin-left:auto;background:var(--lk-lav);-webkit-mask:var(--lk-arrow) center/contain no-repeat;mask:var(--lk-arrow) center/contain no-repeat;opacity:.9}
html body #lock .lk-row a{flex:1;min-width:0;display:block;color:inherit !important;text-decoration:none !important;font-size:inherit}
html body #lock .lk-row .lk-l{margin-left:.3em;color:var(--lk-link);font-weight:500;text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
html body #lock .lk-row a:hover .lk-l{color:#b3a6ff}
html body #lock .lk-row a:focus-visible{outline:2px solid #8f7dff;outline-offset:3px;border-radius:6px}

/* forgot row */
html body #lock .lk-rs{margin:18px 0 0 !important;padding-top:16px;border-top:1px solid rgba(120,110,255,.16);text-align:center}
html body #lock #rs{display:inline-flex;align-items:center;gap:10px;color:var(--lk-lav) !important;text-decoration:none !important;font-size:13.5px}
html body #lock #rs::before,html body #lock #rs::after{content:"";width:18px;height:18px;flex:none;background:var(--lk-link);-webkit-mask:var(--lk-refresh) center/contain no-repeat;mask:var(--lk-refresh) center/contain no-repeat}
html body #lock #rs::after{background:var(--lk-lav);-webkit-mask-image:var(--lk-arrow);mask-image:var(--lk-arrow)}
html body #lock #rs:hover{color:#fff !important}
html body #lock #rs:focus-visible{outline:2px solid #8f7dff;outline-offset:3px;border-radius:6px}

/* footer */
html body #lock .lk-foot{margin-top:18px}
html body #lock .lk-fl{display:flex;align-items:center;justify-content:center;gap:10px}
html body #lock .lk-fl b{flex:1;max-width:96px;height:1px;background:linear-gradient(90deg,transparent,rgba(110,120,255,.7))}
html body #lock .lk-fl b:last-child{background:linear-gradient(270deg,transparent,rgba(110,120,255,.7))}
html body #lock .lk-fl i{width:9px;height:9px;transform:rotate(45deg);background:linear-gradient(135deg,#6fa0ff,#8a4dff);box-shadow:0 0 10px rgba(100,120,255,.8)}
html body #lock .lk-foot p{margin:8px 0 0;font:500 10.5px/1 var(--sk-font,'Inter',sans-serif);letter-spacing:.26em;text-transform:uppercase;color:var(--lk-lav)}

@media(max-width:380px){html body #lock .card{padding:26px 18px 20px;border-radius:32px}html body #lock .logo .lw{font-size:31px}html body #lock .lk-row{font-size:12.5px;gap:10px}}
@media(prefers-reduced-motion:reduce){html body #lock .logo img.al{animation:none}html body #lock #lb,html body #lock #lb::after{transition:none}}

/* ===== Light themes: the lock screen follows the theme (bright glass, dark readable text). Dark themes keep the neon look above. ===== */
html[data-theme=light] #lock{--lk-lav:#4d5688;--lk-mut:#6f78a6;--lk-link:#4a3fd8;
 --lk-tile:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235b45e0' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E")}
html[data-theme=light] body #lock{
 background:
  radial-gradient(70% 38% at 50% 104%,rgba(124,92,255,.20),transparent 70%),
  radial-gradient(55% 40% at -5% 28%,rgba(60,120,255,.18),transparent 70%),
  radial-gradient(50% 38% at 105% 72%,rgba(170,80,255,.16),transparent 70%),
  linear-gradient(180deg,var(--page-bg,#f3f1fb),var(--page-bg2,#e6e2f7)) !important;
 color:#141a3c;color-scheme:light}
html[data-theme=light] body #lock::before{border-color:rgba(76,112,255,.20);box-shadow:inset 0 0 90px rgba(52,86,255,.07),0 0 50px rgba(52,86,255,.06)}
html[data-theme=light] body #lock::after{border-color:rgba(150,70,255,.22);box-shadow:inset 0 0 100px rgba(140,54,255,.08),0 0 60px rgba(140,54,255,.06)}
html[data-theme=light] body #lock .card{
 background:radial-gradient(120% 55% at 18% 0%,rgba(110,140,255,.12),transparent 60%),linear-gradient(165deg,rgba(255,255,255,.94),rgba(246,246,255,.9));
 box-shadow:0 0 0 1px rgba(90,100,255,.08),0 0 60px -14px rgba(76,96,255,.25),0 40px 80px -40px rgba(100,60,220,.45)}
html[data-theme=light] body #lock .logo img.al{animation:none;filter:drop-shadow(0 2px 6px rgba(50,60,150,.4))}
html[data-theme=light] body #lock .logo .lw{background:linear-gradient(180deg,#232a5c 10%,#5b4de0 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;filter:none}
html[data-theme=light] body #lock .lk-f{background:rgba(255,255,255,.92);box-shadow:inset 0 1px 0 #fff,0 6px 16px -12px rgba(40,50,130,.35)}
html[data-theme=light] body #lock .lk-f::before{background:linear-gradient(100deg,rgba(70,120,255,.5),rgba(120,70,255,.45) 55%,rgba(170,70,255,.4))}
html[data-theme=light] body #lock .lk-f:focus-within{box-shadow:0 0 0 1px rgba(80,130,255,.3),0 0 22px rgba(70,110,255,.25),inset 0 0 14px rgba(70,90,255,.06)}
html[data-theme=light] body #lock .lk-f input{color:#141a3c}
html[data-theme=light] body #lock .lk-eye::before{background:#6a62c0}
html[data-theme=light] body #lock .lk-x{background:rgba(70,80,170,.14)}
html[data-theme=light] body #lock .lk-x::before{background:#2a3060}
html[data-theme=light] body #lock .lk-eye:focus-visible,html[data-theme=light] body #lock .lk-x:focus-visible{outline-color:#5b45e0}
html[data-theme=light] body #lock #lmc .chip{background:rgba(255,255,255,.85);color:#3f4880;border-color:rgba(100,100,220,.3)}
html[data-theme=light] body #lock #lmc .chip.on{color:#fff;background:linear-gradient(90deg,#2f63ff,#8a2cf5) !important;box-shadow:0 8px 18px -8px rgba(100,80,255,.6)}
html[data-theme=light] body #lock .pp i{background:radial-gradient(circle,#6b52e0 0 5px,transparent 6px),rgba(255,255,255,.92);border-color:rgba(100,100,230,.45)}
html[data-theme=light] body #lock .pp i.on{border-color:#7a3be0;box-shadow:0 0 18px rgba(130,70,230,.5),inset 0 0 10px rgba(120,100,255,.35);background:radial-gradient(circle,#fff 0 5px,transparent 6px),rgba(110,70,225,.85)}
html[data-theme=light] body #lock #le{color:#c4163f !important}
html[data-theme=light] body #lock #lb{box-shadow:0 0 0 1px rgba(255,255,255,.3) inset,0 14px 28px -12px rgba(120,50,230,.6),0 0 24px -8px rgba(80,110,255,.4)}
html[data-theme=light] body #lock #lb:hover{box-shadow:0 0 0 1px rgba(255,255,255,.35) inset,0 16px 32px -12px rgba(130,60,240,.7)}
html[data-theme=light] body #lock .lk-row::before{background:var(--lk-tile) center/21px no-repeat padding-box,linear-gradient(160deg,#fff,#eef0ff) padding-box,linear-gradient(140deg,rgba(80,120,255,.55),rgba(150,70,255,.45)) border-box}
html[data-theme=light] body #lock #acl{--lk-tile:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235b45e0' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E")}
html[data-theme=light] body #lock .lk-row.rc{--lk-tile:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235b45e0' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='14' height='20' x='5' y='2' rx='3'/%3E%3Cpath d='M12 18h.01'/%3E%3C/svg%3E")}
html[data-theme=light] body #lock .lk-row a:hover .lk-l{color:#2a1fb0}
html[data-theme=light] body #lock .lk-row a:focus-visible,html[data-theme=light] body #lock #rs:focus-visible{outline-color:#5b45e0}
html[data-theme=light] body #lock .lk-rs{border-top-color:rgba(100,100,220,.2)}
html[data-theme=light] body #lock #rs:hover{color:#141a3c !important}
html[data-theme=light] body #lock .lk-fl b{background:linear-gradient(90deg,transparent,rgba(110,100,230,.6))}
html[data-theme=light] body #lock .lk-fl b:last-child{background:linear-gradient(270deg,transparent,rgba(110,100,230,.6))}
html[data-theme=light] body #lock .lk-fl i{box-shadow:0 0 8px rgba(100,110,255,.5)}
`;document.body.appendChild(e)})();
