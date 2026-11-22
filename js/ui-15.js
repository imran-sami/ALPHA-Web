(function(){var e=document.createElement('style');e.setAttribute("id","alpha-layout-fix");e.textContent=`
/* ===== layout-fix v1: system-bar insets, tile text, home header, slides rail ===== */
:root{--sbr:var(--sa-bottom);--str:var(--sa-top)}
/* 1) every full-screen layer / viewer / editor stops ABOVE the Android navigation bar, so nothing scrolls under it.
      Inside the layer the bottom inset is 0 (it is already applied once), and a same-colour shadow paints the strip below. */
.av,#rdr,.gf-ov,.gv-ov,.pt-show-host{bottom:var(--sbr)!important;--sa-bottom:0px}
.av{box-shadow:0 var(--sbr) 0 0 var(--avbg,#202124)}
.av.av-ovl{box-shadow:none;bottom:0!important;--sa-bottom:var(--sbr)}
#rdr{box-shadow:0 var(--sbr) 0 0 var(--bg)}
.gf-ov{box-shadow:0 var(--sbr) 0 0 var(--bg)}
/* scroll areas always leave room for the last row */
.av-pages,.gf-stage .gf-list,.gv-pg,.ga-list{scroll-padding-bottom:24px}
.ga-list{padding-bottom:calc(96px + var(--sa-bottom))}
.gv-pg{padding-bottom:calc(96px + var(--sa-bottom))!important}
#main{scroll-padding-bottom:calc(24px + var(--sa-bottom))}
@media(max-width:799px){html body #main{padding-bottom:calc(40px + var(--sa-bottom))!important}}

/* 2) tiles + headings: never touch edges, long text wraps instead of clipping */
#main .sk-cats .cc{height:auto!important;min-height:126px;padding:12px 10px 14px!important}
#main .sk-cats .cc b{flex-wrap:wrap;text-align:center;overflow-wrap:break-word}
#main .sk-cats .cc .mu{white-space:normal;text-align:center;overflow-wrap:break-word;padding:0 2px}
#main .card,#main .gv-c,#main [class*="tile"],#main [class*="ins-"]{min-width:0;overflow-wrap:break-word}
#main .card h3,#main .card h2,#main .card b{overflow-wrap:break-word;word-break:normal}
#main h1,#main h2{max-width:100%;overflow-wrap:break-word;padding-left:2px;padding-right:2px}
.gv-ttl,.av-ttl b,.gf-tt{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-left:4px;padding-right:4px}
.gv-cd{gap:10px}
.gv-ct{min-width:0;overflow:hidden}.gv-ct b{font-size:clamp(13px,3.7vw,15px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gv-ct em{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gv-tb{padding-left:4px;padding-right:4px}

/* 3) home: greeting never sits under the top-right buttons / "More" */
@media(max-width:799px){
 #main .hd{padding-right:0}
 #main .hl{padding-right:0}
 #main .hl h1{max-width:calc(100vw - 36px - var(--sa-left,0px) - var(--sa-right,0px));margin-top:2px}
 .gv-tb .gv-ib,.gv-tb button[data-a=more]{flex:none;position:relative;z-index:2}
 .gv-tb .gv-sp{min-width:0;flex:1 1 auto;margin-right:4px}
 #main .smore,#main .more{position:static!important;float:none!important;margin-top:8px}
}

/* 4) Slides editor: thumbnail strip no longer clipped, canvas not under the toolbar */
@media(max-width:700px){
 .sl-rail{height:auto!important;min-height:112px;align-items:flex-start;padding:10px 10px 18px!important;overflow-y:hidden;overflow-x:auto;flex:none}
 .sl-th{align-items:flex-start;width:124px!important}
 .sl-th .b{flex:none;width:100%;height:auto;aspect-ratio:16/9}
 .sl-main{min-height:0}
 .sl-stage{min-height:0;padding:10px 12px}
}
.sl-tools{padding-bottom:calc(8px + var(--sa-bottom))!important}
.sl-main,.sl-stage,.sl-vw{min-height:0}

/* 5) Slides top bar: "Slideshow" pill keeps icon + label on one line; Insights banner text has breathing room */
.av-sl .av-play{display:inline-flex!important;flex-direction:row;align-items:center;justify-content:center;white-space:nowrap;line-height:1;flex:none}
.av-sl .av-play .avi{width:20px;height:20px}
.av-sl .av-bar{overflow:hidden}
@media(max-width:799px){#main .ins-hero{padding:12px 14px;min-width:120px}}

/* ===== profile photo + focus goal fixes ===== */
.gs-pview{background:#000!important;color:#fff;box-shadow:0 var(--sbr) 0 0 #000!important}
.gs-pview .gf-top{background:rgba(0,0,0,.55);color:#fff;position:absolute;left:0;right:0;top:0;z-index:2}
.gs-pstage{position:absolute;inset:0;display:grid;place-items:center;padding:calc(64px + var(--sa-top)) 0 0}
.gs-pstage img{width:min(100vw,100vh - 120px);max-width:100%;max-height:100%;aspect-ratio:1;object-fit:cover;border-radius:50%;box-shadow:0 20px 60px rgba(0,0,0,.6)}
.gs-pph{width:min(70vw,320px);aspect-ratio:1;border-radius:50%;display:grid;place-items:center;font-size:min(30vw,140px);background:rgba(255,255,255,.1)}
.gs-pt{min-width:0;display:flex;flex-direction:column;align-items:flex-start}.gs-pt small{display:block}
.gs-rm{display:inline-flex;align-items:center;min-height:40px;margin:12px 0 0 -16px;padding:0 16px;border:0;border-radius:20px;background:none;color:var(--a);font-family:var(--sk-font,'Inter',system-ui,sans-serif);font-size:14.5px;font-weight:600;letter-spacing:.1px;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:background .15s}
.gs-rm:hover,.gs-rm:focus-visible{background:color-mix(in oklab,var(--a) 12%,transparent);outline:0}.gs-rm:active{background:color-mix(in oklab,var(--a) 20%,transparent)}
/* Focus goal page: "Save" must stay on one line */
#main #gs{flex:none;white-space:nowrap;word-break:normal;writing-mode:horizontal-tb;min-width:88px;height:44px;padding:0 22px;display:inline-flex;align-items:center;justify-content:center}
#main #gi{flex:1 1 auto;min-width:0;width:auto}

.sil{width:62%;height:62%;fill:currentColor;display:block}
.gs-av .sil{width:100%;height:100%;color:color-mix(in oklab,var(--a) 70%,var(--tx))}
.gs-pph{color:rgba(255,255,255,.55);overflow:hidden;font-size:0}.gs-pph .sil{width:100%;height:100%;margin-top:14%}
.sil-w{border-radius:50%;overflow:hidden;background:rgba(128,128,128,.2);color:var(--mu)}.sil-w .sil{width:100%;height:100%;margin-top:14%}

/* crisp bar charts (Today by hour / Last 7 days): real HTML text instead of a stretched SVG */
.bch{width:100%}
.bcb{display:flex;align-items:flex-end;gap:clamp(2px,.9%,6px);height:var(--bh,130px);padding:0 2px;border-bottom:1px solid var(--bd)}
.bcc{flex:1 1 0;min-width:0;height:100%;display:flex;align-items:flex-end}
.bcc i{display:block;width:100%;border-radius:4px 4px 0 0;background:linear-gradient(180deg,var(--b),var(--a));box-shadow:0 0 12px -2px var(--glow)}
.bcc i.z{height:3px!important;border-radius:2px;background:color-mix(in oklab,var(--tx) 14%,transparent);box-shadow:none}
.bcx{display:flex;gap:clamp(2px,.9%,6px);padding:6px 2px 0}
.bcx span{flex:1 1 0;min-width:0;text-align:center;font:600 12px/16px var(--sk-font,system-ui,sans-serif);color:var(--tx);opacity:.78;white-space:nowrap;overflow:visible;font-variant-numeric:tabular-nums}
.bcb{position:relative}.bce{position:absolute;left:0;right:0;top:38%;text-align:center;font:500 13px var(--sk-font,system-ui,sans-serif);color:var(--mu);pointer-events:none}
`;document.body.appendChild(e)})();
(function(){var e=document.createElement('style');e.setAttribute("id","alpha-vault-theme");e.textContent=`/* ===== Vault theme = whole-app theme (visual only). Re-maps the Vault tokens onto the app's own theme variables (--bg --bg2 --card --bd --tx --mu --a --b), so every theme and light/dark follows the app. Layout, handlers and behaviour are untouched. ===== */
:root:root .gv:not(.gv-vw){--gp:var(--a);--gpc:color-mix(in oklab,var(--a) 20%,transparent);--gs:var(--bg);--g1:var(--gf-surf);--g2:color-mix(in oklab,var(--tx) 10%,var(--bg));--gt:var(--tx);--g2t:var(--mu);--gol:var(--bd);--gsc:color-mix(in oklab,var(--a) 22%,var(--bg));--ger:var(--gf-red);--ghv:color-mix(in oklab,var(--tx) 9%,transparent);font-family:inherit}
:root:root .gv:not(.gv-vw) .gv-bt{color:var(--a)}
:root:root .gv:not(.gv-vw) .gv-fab{color:var(--a)}
/* page: transparent so the app's glow background shows, like Home / Insights / History */
.gv-pg:not(.gv-vw){background:transparent}
.gv-pg .gv-tb:not(.sel){background:transparent;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}
.st-page .gv-tb:not(.sel){background:transparent}
/* glass cards, same recipe as the app's .card */
.gv-pg .gv-cd,.gv-pg .gv-cl,.gv-pg .gv-stc{background:var(--card);border:1px solid var(--bd);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);box-shadow:0 10px 40px -22px var(--glow)}
.gv-pg .gv-cd:active,.gv-pg .gv-lr:active{background:color-mix(in oklab,var(--a) 14%,var(--card))}
.gv-pg .gv-sp{background:color-mix(in oklab,var(--tx) 8%,var(--bg));border:1px solid var(--bd)}
.gv-pg .gv-bar i,.st-page .gv-bar i{background:linear-gradient(90deg,var(--a),var(--b))}
.gv-pg .gv-g .gv-r{background:var(--card);border:1px solid var(--bd)}
.gv-pg .gv-h{color:var(--mu);font-weight:600}
/* chips, sheets, dialogs, pickers, snackbar */
.gv-chs button.on{background:color-mix(in oklab,var(--a) 20%,transparent);border-color:var(--a)}
.gv-ov .gv-sh{background:var(--gf-surf);border:1px solid var(--bd);border-bottom:0;box-shadow:0 -8px 40px rgba(0,0,0,.35)}
.gv-ov .gv-dl{background:var(--gf-surf);border:1px solid var(--bd);box-shadow:0 20px 60px rgba(0,0,0,.5)}
.gv-ov .gv-pk{background:radial-gradient(900px 500px at 10% -10%,var(--bg2),transparent),radial-gradient(700px 500px at 100% 100%,var(--bg2),transparent),var(--bg)}
.gv-sn{background:var(--gf-surf);color:var(--tx);border:1px solid var(--bd);border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.4)}
.gv-sn button{color:var(--a)}
.st-page.gv:not(.gv-vw){background:radial-gradient(900px 500px at 10% -10%,var(--bg2),transparent),radial-gradient(700px 500px at 100% 100%,var(--bg2),transparent),var(--bg)}
.st-page .st-card,.st-page .st-list{background:var(--card);border:1px solid var(--bd);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px)}
`;document.body.appendChild(e)})();
(function(){var e=document.createElement('style');e.setAttribute("id","alpha-fab-files");e.textContent=`/* ===== Top-right profile + lock buttons: Google Files (Material) icons, centred. Visual only: same ids and click handlers. ===== */
:root{--ic-m-person:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E");--ic-m-prof:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 3.4a8.6 8.6 0 1 1 0 17.2 8.6 8.6 0 0 1 0-17.2zM12 6.2a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2zM17.6 17.4C16.8 15.2 14.6 14.3 12 14.3S7.2 15.2 6.4 17.4A7.8 7.8 0 0 0 17.6 17.4z'/%3E%3C/svg%3E");--ic-m-lock:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' d='M12 1L21 4.5V11C21 16.8 17 21 12 23C7 21 3 16.8 3 11V4.5ZM12.0 2.98L19.38 5.85V11.18C19.38 15.94 16.1 19.38 12.0 21.02C7.9 19.38 4.62 15.94 4.62 11.18V5.85ZM9 11h6a1.4 1.4 0 0 1 1.4 1.4v4.9a1.4 1.4 0 0 1-1.4 1.4H9a1.4 1.4 0 0 1-1.4-1.4v-4.9A1.4 1.4 0 0 1 9 11zM9.1 11V9.2a2.9 2.9 0 0 1 5.8 0V11zM10.6 11V9.2a1.4 1.4 0 0 1 2.8 0V11zM12 12.7a1.2 1.2 0 0 1 .6 2.24l.35 1.76h-1.9l.35-1.76A1.2 1.2 0 0 1 12 12.7z'/%3E%3C/svg%3E")}
html:root body .fab{align-items:center;gap:8px}
html:root body .fab button{display:block;position:relative;flex:none;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:color-mix(in oklab,var(--tx) 8%,transparent);box-shadow:none;font-size:0;line-height:0;color:transparent;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);-webkit-tap-highlight-color:transparent}
html:root body .fab button::before{content:"";position:absolute;inset:0;margin:auto;width:24px;height:24px;display:block;background:var(--tx);-webkit-mask:var(--ic-m-person) center/contain no-repeat;mask:var(--ic-m-person) center/contain no-repeat}
html:root body .fab #lk::before{width:38px;height:38px;background:var(--a);-webkit-mask:var(--ic-m-lock) center/contain no-repeat;mask:var(--ic-m-lock) center/contain no-repeat}
html:root body .fab #lk,html:root body .fab #lk:hover,html:root body .fab #lk:active{background:none;-webkit-backdrop-filter:none;backdrop-filter:none;border-radius:12px;filter:drop-shadow(0 0 5px color-mix(in oklab,var(--a) 55%,transparent))}
html:root body .fab #lk:active{transform:scale(.92)}
html:root body .fab button:hover{background:color-mix(in oklab,var(--tx) 14%,transparent);border:0;box-shadow:none;transform:none}
html:root body .fab button:active{background:color-mix(in oklab,var(--a) 22%,transparent)}
html:root body .fab button:focus-visible{outline:2px solid var(--a);outline-offset:2px}
html:root body .fab #th:not(:has(img)){background:none;-webkit-backdrop-filter:none;backdrop-filter:none;filter:drop-shadow(0 0 5px color-mix(in oklab,var(--a) 55%,transparent))}
html:root body .fab #th:not(:has(img)):active{transform:scale(.92)}
html:root body .fab #th::before{width:36px;height:36px;background:var(--a);-webkit-mask:var(--ic-m-prof) center/contain no-repeat;mask:var(--ic-m-prof) center/contain no-repeat}
html:root body .fab #th:has(img){border:2px solid var(--a)}
html:root body .fab #th:has(img)::before{display:none}
html:root body .fab #th img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:50%}
`;document.body.appendChild(e)})();
