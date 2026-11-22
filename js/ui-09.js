(function(){var e=document.createElement('style');e.setAttribute("id","alpha-insights-skin");e.textContent=`/* ===== ALPHA Insights: neon-glass cards. Visual layer only: same buttons, data-k, click handlers and charts. ===== */
#main .ins-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 16px}
#main .ins-head h1{font-size:30px;line-height:1.1;font-weight:700;letter-spacing:-.4px;margin:0}
#main .ins-head .sub{margin:6px 0 0;font-size:13.5px;color:var(--mu)}
#main .ins-hero{position:relative;flex:0 1 190px;min-width:136px;min-height:62px;padding:11px 14px;border-radius:18px;overflow:hidden;text-align:right;color:var(--tx);font:500 11.5px/1.35 var(--sk-font);background:linear-gradient(135deg,rgba(124,92,255,.22),rgba(14,20,42,.7) 55%,rgba(255,138,76,.2));border:1px solid rgba(255,255,255,.1);box-shadow:0 10px 30px -14px var(--glow)}
#main .ins-hero svg{position:absolute;inset:0;width:100%;height:100%}
#main .ins-hero span{position:relative;display:block}
#main .ins-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
@media(min-width:900px){#main .ins-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}}
#main .ins-grid .tile{--ins-card:rgba(12,18,40,.86);--ins-line:rgba(255,255,255,.1);position:relative;display:flex;flex-direction:column;justify-content:flex-start;align-items:stretch;min-height:150px;padding:14px;border-radius:20px;overflow:hidden;text-align:left;color:var(--tx);font-family:var(--sk-font);cursor:pointer;backdrop-filter:blur(14px);
background:radial-gradient(120% 95% at 100% 100%,color-mix(in srgb,var(--c1) 26%,transparent),transparent 62%),linear-gradient(160deg,rgba(255,255,255,.07),transparent 42%),var(--ins-card);
border:1px solid color-mix(in srgb,var(--c1) 42%,var(--ins-line));box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 14px 34px -18px var(--c1);transition:transform .18s,border-color .18s}
#main .ins-grid .tile:hover{border-color:var(--c1)}#main .ins-grid .tile:active{transform:scale(.975)}
#main .ins-grid .tile:focus-visible{outline:2px solid var(--c1);outline-offset:2px}
#main .ins-art{-webkit-mask-image:linear-gradient(90deg,transparent,#000 55%);mask-image:linear-gradient(90deg,transparent,#000 55%);position:absolute;right:0;bottom:0;width:72%;height:76%;pointer-events:none}
#main .ins-ic{position:relative;flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:13px;color:#fff;background:linear-gradient(145deg,var(--c0),var(--c2));box-shadow:0 8px 20px -6px var(--c1),inset 0 1px 0 rgba(255,255,255,.4)}
#main .ins-ic svg{width:22px;height:22px}
#main .ins-bd{position:absolute;top:12px;right:12px;min-width:46px;padding:4px 8px 5px;border-radius:12px;text-align:center;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12)}
#main .ins-bd b{display:block;font:700 13px/1.15 var(--sk-font);color:var(--tx)}#main .ins-bd small{display:block;font:500 9.5px/1.2 var(--sk-font);color:var(--mu)}
#main .ins-tx{position:relative;display:block;margin-top:auto;padding-top:14px}
#main .ins-t{display:block;font:700 15.5px/1.25 var(--sk-font);color:var(--tx)}
#main .ins-s{display:block;margin-top:2px;font:500 12.5px/1.3 var(--sk-font);color:var(--mu)}
#main .ins-v{display:block;margin-top:7px;font:600 12px/1.2 var(--sk-font);color:var(--c0)}
#main .ins-go{position:absolute;right:12px;bottom:12px;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;color:var(--c0);background:rgba(8,12,30,.72);border:1px solid color-mix(in srgb,var(--c1) 60%,transparent);box-shadow:0 0 14px -3px var(--c1)}
#main .ins-go svg{width:15px;height:15px}
#main .ins-grid .tile:last-child{grid-column:1/-1;min-height:104px;display:grid;grid-template-columns:auto 1fr;align-items:center;column-gap:14px;padding:16px}#main .ins-grid .tile:last-child .ins-tx{padding-top:0}
#main .ins-grid .tile:last-child .ins-ic{width:60px;height:60px;border-radius:19px}#main .ins-grid .tile:last-child .ins-ic svg{width:34px;height:34px}
#main .ins-grid .tile:last-child .ins-tx{margin-top:0}
html[data-theme=light] #main .ins-grid .tile{--ins-card:rgba(255,255,255,.86);--ins-line:rgba(70,60,160,.14);box-shadow:0 14px 30px -20px var(--c1)}
html[data-theme=light] #main .ins-bd{background:rgba(255,255,255,.75);border-color:rgba(70,60,160,.14)}
html[data-theme=light] #main .ins-go{background:rgba(255,255,255,.9);color:var(--c2)}html[data-theme=light] #main .ins-v{color:var(--c2)}
html[data-theme=light] #main .ins-hero{background:linear-gradient(135deg,rgba(124,92,255,.16),rgba(255,255,255,.8) 55%,rgba(255,138,76,.16));border-color:rgba(70,60,160,.14)}
@media(prefers-reduced-motion:reduce){#main .ins-grid .tile{transition:none}}
`;document.body.appendChild(e)})();
