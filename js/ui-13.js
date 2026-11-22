(function(){var e=document.createElement('style');e.setAttribute("id","alpha-ga-css");e.textContent=`/* ===== ALPHA Files-style actions for Home / Insights / History / Settings (same sheets, dialogs, snackbar, selection bar as the Vault) ===== */
.ga-bar{position:fixed;top:0;left:0;right:0;z-index:45;height:calc(64px + var(--sa-top));padding:var(--sa-top) 4px 0;box-sizing:border-box;display:flex;align-items:center;gap:2px;background:var(--gf-surf);color:var(--tx);border-bottom:1px solid var(--bd);animation:gfDown .2s cubic-bezier(.2,0,0,1)}
@media(min-width:800px){.ga-bar{left:200px}}
.ga-bar button{width:48px;height:48px;flex:none;border:0;border-radius:50%;background:none;color:var(--tx);display:grid;place-items:center;cursor:pointer}.ga-bar button:hover{background:var(--gf-hi)}
.ga-bar .gf-cnt{font-size:20px;font-weight:600;margin-left:8px;white-space:nowrap}
.ga-search{display:flex;align-items:center;gap:4px;height:52px;padding:0 4px 0 16px;border-radius:26px;background:color-mix(in oklab,var(--tx) 8%,transparent);color:var(--mu);margin:4px 0 12px}
.ga-search input{flex:1;min-width:0;height:100%;border:0;outline:0;background:none;color:var(--tx);font:16px inherit;padding:0 8px;box-shadow:none}
.ga-search button,.ga-k,.ga-top{width:48px;height:48px;flex:none;border:0;border-radius:50%;background:none;color:var(--tx);display:grid;place-items:center;cursor:pointer;padding:0}
.ga-search button:hover,.ga-k:hover,.ga-top:hover{background:var(--gf-hi)}.ga-top{float:right;margin:0 0 0 8px}
.ga-list{display:flex;flex-direction:column;gap:2px}
.ga-r{display:flex;align-items:center;gap:16px;min-height:64px;padding:0 4px 0 8px;border-radius:16px;cursor:pointer;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent}
.ga-r:hover{background:var(--gf-hi)}.ga-r.on{background:color-mix(in oklab,var(--a) 16%,transparent)}
.ga-t{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;flex:none}
.ga-x{flex:1;min-width:0}.ga-x b{display:block;font-weight:600;font-size:15.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ga-x small{display:block;color:var(--mu);font-size:12.5px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ga-c{width:22px;height:22px;margin:0 13px;border-radius:50%;border:2px solid var(--mu);display:grid;place-items:center;flex:none;color:#fff}.ga-c svg{opacity:0}.ga-r.on .ga-c{background:var(--a);border-color:var(--a)}.ga-r.on .ga-c svg{opacity:1}
.ga-fab{position:fixed;right:16px;bottom:calc(92px + var(--sa-bottom));z-index:20;height:56px;padding:0 20px 0 16px;border:0;border-radius:16px;display:flex;align-items:center;gap:12px;background:var(--a);color:#fff;font:600 15px inherit;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.35)}
@media(min-width:800px){.ga-fab{bottom:28px}}
.ga-chd{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px}.ga-chd h3{margin:0!important;white-space:nowrap;min-width:0;overflow:hidden;text-overflow:ellipsis}
.ga-addb{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 14px 0 10px;white-space:nowrap;flex:none;border-radius:18px;background:color-mix(in oklab,var(--a) 16%,transparent);color:var(--a);font:600 13.5px inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}.ga-addb:active{filter:brightness(.9)}.ga-addb svg{fill:currentColor}
.ga-set{margin-top:14px;border-top:1px solid var(--bd);padding-top:8px}.ga-set h4{margin:6px 8px 4px;font-size:13px;font-weight:600;color:var(--mu)}
.ga-top2{display:flex;align-items:center;gap:4px;margin:0 0 8px -8px}.ga-top2 .ga-x b{display:block;font-size:20px}
.ga-ck{width:24px;height:24px;margin:0 12px;border-radius:50%;border:2px solid var(--mu);background:none;display:grid;place-items:center;flex:none;color:#fff;cursor:pointer;padding:0}
.ga-pr{font-size:11.5px;font-weight:700;color:#fff;border-radius:8px;padding:3px 9px;flex:none}
.ga-form #fs{height:44px;border-radius:22px;background:var(--a);color:#fff;border:0;font:600 14.5px inherit;box-shadow:none}
.ga-form #fx{height:44px;border-radius:22px;background:none;border:1px solid #e5484d;color:#e5484d;font:600 14.5px inherit;box-shadow:none}
.ga-form #mx{border:0;background:none;color:var(--a);font:600 14.5px inherit;border-radius:20px;height:40px;padding:0 16px}.ga-form #mx:hover{background:var(--gf-hi)}
.ga-form .chip{height:34px;border-radius:10px;font:500 13.5px inherit}
.gs-prof{display:flex;align-items:center;gap:16px;padding:12px 24px 8px}.gs-prof b{display:block;font-size:20px;font-weight:600}.gs-prof small{color:var(--mu);font-size:13.5px}
.gs-av{width:64px;height:64px;border-radius:50%;border:0;background:color-mix(in oklab,var(--a) 18%,transparent);overflow:hidden;display:grid;place-items:center;font-size:28px;cursor:pointer;padding:0;flex:none}.gs-av img{width:100%;height:100%;object-fit:cover}
.gs-h{padding:22px 24px 6px;font-size:14px;font-weight:600;color:var(--a)}
.gs-row{display:block;width:100%;box-sizing:border-box;text-align:left;padding:14px 24px;min-height:64px;background:none;border:0;color:var(--tx);font:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
.gs-row:hover{background:var(--gf-hi)}.gs-row[data-n]{cursor:default}.gs-row[data-n]:hover{background:none}
.gs-row b{display:block;font-size:16px;font-weight:500}.gs-row small{display:block;margin-top:2px;font-size:14px;color:var(--mu);overflow-wrap:anywhere}.gs-row.dg b{color:var(--gf-red)}
/* every remaining button in the app -> Files (Material 3) buttons */
html body:not([data-gv=ins]) #main .btn,html body:not([data-gv=ins]) #mc .btn{height:40px;min-height:40px;padding:0 24px;border-radius:20px;border:0!important;background:var(--a)!important;color:#fff!important;font:600 14.5px inherit!important;box-shadow:none!important;text-shadow:none!important;transform:none!important}
html body:not([data-gv=ins]) #main .btn.ghost,html body:not([data-gv=ins]) #mc .btn.ghost{background:none!important;color:var(--a)!important}
html body:not([data-gv=ins]) #main .btn.stop,html body:not([data-gv=ins]) #mc .btn.stop{background:var(--gf-red)!important;color:#fff!important}
html body:not([data-gv=ins]) #main .chip:not(.gf-chip),html body:not([data-gv=ins]) #mc .chip{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:10px;border:1px solid var(--bd)!important;background:transparent!important;color:var(--tx)!important;font:500 13.5px inherit!important;box-shadow:none!important;text-shadow:none!important}
html body:not([data-gv=ins]) #main .chip.on:not(.gf-chip),html body:not([data-gv=ins]) #mc .chip.on{background:color-mix(in oklab,var(--a) 20%,transparent)!important;border-color:var(--a)!important}
html body:not([data-gv=ins]) #main .chip.dg,html body:not([data-gv=ins]) #mc .chip.dg{color:var(--gf-red)!important;border-color:var(--gf-red)!important}
html body:not([data-gv=ins]) #mc{border-radius:28px!important;background:var(--gf-surf)!important;border:1px solid var(--bd)!important;box-shadow:0 20px 60px rgba(0,0,0,.5)!important}
html body:not([data-gv=ins]) #mc input[type=text],html body:not([data-gv=ins]) #mc input[type=password],html body:not([data-gv=ins]) #mc input[type=number]{border-radius:12px!important;box-shadow:none!important}
.ga-mb{margin:-4px 0 4px -8px}
.ga-sb{position:absolute;left:8px;top:12px;width:48px;height:48px;border:0;border-radius:50%;background:none;color:var(--tx);display:grid;place-items:center;cursor:pointer;z-index:2;padding:0}.ga-sb:hover{background:var(--gf-hi)}
.gf-sheet .gf-sh{padding-left:64px;min-height:36px}
.ga-ck{position:relative}.ga-ck::after{content:"";position:absolute;inset:-12px}
/* Vault: no floating "Add files" button (empty state button + 3-dot menu are enough) */
.gv-fab{display:none!important}.gv-pg{padding-bottom:24px!important}
/* ---- Storage page: Files by Google look (tokens come from .gv) ---- */
.st-page.gv{background:var(--gs);color:var(--gt);font-family:'Google Sans',Roboto,'Segoe UI',system-ui,sans-serif;-webkit-tap-highlight-color:transparent}
.st-page .gv-tb{position:static;flex:none;height:calc(64px + var(--sa-top));padding-top:var(--sa-top)}
.st-page .gv-chs{flex:none;padding:4px 16px 12px}
.st-page .gv-chs button{flex:none}
.st-page .gv-h{margin:20px 20px 10px}
.st-b{flex:1;overflow:auto}
.st-in{max-width:640px;margin:0 auto;padding:4px 0 48px}
.st-card{margin:0 16px;padding:16px;border-radius:28px;background:var(--g1)}
.st-card svg text{font-family:inherit}
.st-g{width:100%;max-width:360px;display:block;margin:4px auto}
.st-d{width:100%;max-width:240px;display:block;margin:4px auto}
.st-t{width:100%;display:block;border-radius:16px}
.st-c{width:100%;display:block}
.st-cp{color:var(--g2t);text-align:center;font-size:14px;margin:8px 0 0}
.st-bb{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;padding:4px 0}
.st-bb div{border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;overflow:hidden;animation:stGrow2 .4s cubic-bezier(.2,0,0,1)}
.st-bb b{font-size:13px;font-weight:500}.st-bb span{opacity:.9;font-size:11.5px}
.st-list{margin:0 16px;border-radius:20px;background:var(--g1);overflow:hidden}
.st-row{display:flex;align-items:center;gap:16px;width:100%;min-height:64px;padding:8px 16px;text-align:left;box-sizing:border-box}
button.st-row{cursor:pointer}button.st-row:hover,button.st-row:active{background:var(--g2)}
.st-t1{flex:1;min-width:0}.st-t1 b{display:block;font-size:16px;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.st-s{display:block;font-size:13px;color:var(--g2t);margin-top:2px}
.st-v{font-size:14px;color:var(--g2t);flex:none}
.st-row .gi.cv{color:var(--g2t)}
.st-bar{height:4px;border-radius:2px;background:var(--g2);margin-top:8px;overflow:hidden}.st-bar i{display:block;height:100%;border-radius:2px;animation:stGrow .5s cubic-bezier(.2,0,0,1)}
.st-flat .st-row{padding-left:16px}
.st-act{display:flex;flex-wrap:wrap;gap:8px;padding:16px 16px 0}
.st-act button{display:inline-flex!important;align-items:center;justify-content:center;height:40px;padding:0 24px;border-radius:20px;font-size:14px;font-weight:500;margin:0}
.st-act .gv-bt{margin:0}.st-act .st-ob{border:1px solid var(--gol);color:var(--gp);background:none}
.st-act .st-ob:hover{background:var(--ghv)}
@keyframes stGrow{from{width:0!important}}@keyframes stGrow2{from{transform:scale(.6);opacity:0}}
`;document.body.appendChild(e)})();
