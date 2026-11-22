(function(){var e=document.createElement('style');e.setAttribute("id","alpha-gv-css");e.textContent=`/* ===== ALPHA Vault = Files by Google (Material 3). Replaces the old Vault UI completely. ===== */
#main:has(.gv-pg){padding:0!important}
.gv,.gv *{box-sizing:border-box}
.gv{--gp:#0b57d0;--gpc:#d3e3fd;--gs:#fff;--g1:#f0f4f9;--g2:#e9eef6;--gt:#1f1f1f;--g2t:#444746;--gol:#c4c7c5;--gsc:#c2e7ff;--ger:#b3261e;--ghv:rgba(31,31,31,.08);font-family:'Google Sans',Roboto,'Segoe UI',system-ui,sans-serif;color:var(--gt);-webkit-tap-highlight-color:transparent}
:root[data-theme=dark] .gv,.gv.gv-vw{--gp:#a8c7fa;--gpc:#0842a0;--gs:#131314;--g1:#1e1f20;--g2:#282a2c;--gt:#e3e3e3;--g2t:#c4c7c5;--gol:#444746;--gsc:#004a77;--ger:#f2b8b5;--ghv:rgba(227,227,227,.1)}
.gv-pg{background:var(--gs);min-height:100dvh;padding-bottom:130px;position:relative;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
:where(.gv) button{all:unset;box-sizing:border-box;cursor:pointer;-webkit-tap-highlight-color:transparent}
:where(.gv) button:focus-visible{outline:2px solid var(--gp);outline-offset:2px}
:where(.gv) input{font:inherit}
.gi{width:24px;height:24px;fill:currentColor;flex:none}
.gv-tb{display:flex;align-items:center;gap:2px;height:64px;padding:0 8px;position:sticky;top:0;z-index:4;background:var(--gs)}
.gv-tb.sel{background:var(--gsc)}
.gv-ib{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;color:var(--gt)}
.gv-ib:hover,.gv-ib:active{background:var(--ghv)}
.gv-ttl{flex:1;min-width:0;font-size:22px;padding:0 8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gv-tb.sel .gv-ttl{font-size:20px}
.gv-sp{flex:1;display:flex;align-items:center;gap:14px;height:56px;margin:0 0 0 8px;padding:0 18px;border-radius:28px;background:var(--g2);color:var(--g2t);font-size:16px}
.gv-q{flex:1;min-width:0;height:48px;border:0;outline:0;background:none;color:var(--gt);font-size:18px;padding:0 8px;user-select:text;-webkit-user-select:text}
.gv-h{margin:22px 20px 10px;font-size:14px;font-weight:500;color:var(--g2t);letter-spacing:.1px}
.gv-rc{display:flex;gap:12px;overflow-x:auto;padding:0 16px 4px;scrollbar-width:none}
.gv-pg>#gv-body{padding-top:4px}
.gv-th{display:grid;place-items:center;position:relative;flex:none;width:48px;height:48px;border-radius:12px;color:var(--c);background:color-mix(in oklab,var(--c) 14%,var(--gs));background-size:cover;background-position:center}
.gv-th.ph .gi{display:none}
.gv-ci{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;color:var(--c);background:color-mix(in oklab,var(--c) 16%,var(--gs));flex:none}
.gv-ci.big{width:96px;height:96px}.gv-ci.big .gi{width:44px;height:44px}
.gv-cg{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:0 16px}
.gv-cd{display:flex!important;align-items:center;gap:12px;padding:14px 14px;border-radius:20px;background:var(--g1);min-width:0}
.gv-cd:active,.gv-lr:active{background:var(--g2)}
.gv-ct{min-width:0}.gv-ct b{display:block;font-size:15px;font-weight:500}.gv-ct em{font-style:normal;font-size:12px;color:var(--g2t)}
.gv-cl{margin:0 16px;border-radius:20px;background:var(--g1);overflow:hidden}
.gv-lr{width:100%;display:flex!important;align-items:center;gap:16px;padding:12px 16px}
.gv-lr b{flex:1;font-weight:500;font-size:15px}.gv-lr em{font-style:normal;font-size:13px;color:var(--g2t)}
.gv-stc{margin:0 16px;padding:16px 18px;border-radius:20px;background:var(--g1)}
.gv-stc b{display:block;font-size:15px;font-weight:500}.gv-stc span{font-size:13px;color:var(--g2t)}
.gv-bar{height:8px;border-radius:4px;background:var(--g2);margin:12px 0 8px;overflow:hidden}.gv-bar i{display:block;height:100%;min-width:3px;border-radius:4px;background:var(--gp)}
.gv-sb{display:flex;align-items:center;padding:0 8px 0 20px;height:48px;color:var(--g2t);font-size:14px}
.gv-sb .sp{flex:1}.gv-sb button:first-child{display:flex;align-items:center;gap:4px;height:36px;padding:0 4px}.gv-sb .gi{width:20px;height:20px}
.gv-r{position:relative;display:flex;align-items:center;gap:16px;min-height:72px;padding:8px 4px 8px 16px;cursor:pointer}
.gv-r:hover{background:var(--ghv)}.gv-r.sel{background:var(--gsc)}
.gv-ld{position:relative;width:48px;height:48px;flex:none}
.gv-ck{display:none;position:absolute;inset:0;border-radius:50%;background:var(--gp);color:var(--gs);place-items:center}
.gv-r.sel .gv-ck{display:grid}.gv-r.sel .gv-th{visibility:hidden}
.gv-t{flex:1;min-width:0}.gv-t b{display:block;font-size:16px;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gv-t span{display:flex;align-items:center;gap:4px;font-size:13px;color:var(--g2t);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.gv-t .gi{width:14px;height:14px;color:#f9ab00}
.gv-m{display:grid!important;place-items:center;width:48px;height:48px;border-radius:50%;color:var(--g2t)}.gv-m:hover{background:var(--ghv)}
.selm .gv-m,.selm .gv-fab{display:none!important}
.gv-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:4px;padding:0 6px}
.gv-g .gv-r{display:block;padding:0;min-height:0;aspect-ratio:1;border-radius:12px;overflow:hidden;background:var(--g1)}
.gv-g .gv-ld{position:absolute;inset:0;width:auto;height:auto}.gv-g .gv-th{width:100%;height:100%;border-radius:0}.gv-g .gv-th .gi{width:36px;height:36px}
.gv-g .gv-ck{inset:8px auto auto 8px;width:24px;height:24px;border-radius:50%}.gv-g .gv-ck .gi{width:18px;height:18px}
.gv-g .gv-r.sel{outline:3px solid var(--gp);outline-offset:-3px}.gv-g .gv-r.sel .gv-th{visibility:visible;opacity:.7}
.gv-g .gv-t{position:absolute;left:0;right:0;bottom:0;padding:18px 8px 6px;background:linear-gradient(transparent,rgba(0,0,0,.65));color:#fff}.gv-g .gv-t b{font-size:12px}.gv-g .gv-t span{display:none}
.gv-g .gv-m{position:absolute;top:2px;right:0;width:36px;height:36px;color:#fff;filter:drop-shadow(0 0 3px rgba(0,0,0,.6))}.gv-g .gv-m .gi{width:20px;height:20px}
.gv-em{display:flex;flex-direction:column;align-items:center;text-align:center;padding:64px 32px;gap:8px;color:var(--g2t)}.gv-em b{font-size:22px;font-weight:400;color:var(--gt);margin-top:12px}
.gv-bt{display:inline-flex!important;align-items:center;gap:8px;height:40px;padding:0 24px;border-radius:20px;background:var(--gpc);color:var(--gp);font-weight:500;font-size:14px;margin-top:12px}
:root[data-theme=dark] .gv-bt{color:#d3e3fd}
.gv-chs{display:flex;gap:8px;overflow-x:auto;padding:4px 16px 12px;scrollbar-width:none}
.gv-chs button{display:inline-flex!important;align-items:center;gap:6px;height:32px;padding:0 14px;border-radius:8px;border:1px solid var(--gol);font-size:14px;white-space:nowrap;color:var(--g2t)}
.gv-chs button.on{background:var(--gsc);border-color:transparent;color:var(--gt)}.gv-chs .gi{width:18px;height:18px}
.gv-fab{position:fixed!important;right:16px;bottom:calc(24px + var(--sa-bottom));z-index:6;display:flex!important;align-items:center;gap:12px;height:56px;padding:0 20px 0 16px;border-radius:16px;background:var(--gpc);color:#041e49;font-size:15px;font-weight:500;box-shadow:0 3px 8px rgba(0,0,0,.28)}
:root[data-theme=dark] .gv-fab{color:#d3e3fd}
@media(max-width:799px){.gv-pg{padding-top:calc(60px + var(--sa-top))}.gv-pg .gv-tb{top:calc(60px + var(--sa-top))}}
@media(min-width:800px){.gv-pg .gv-tb{padding-right:116px}.gv-fab{bottom:28px;right:28px}.gv-pg{padding-bottom:100px}.gv-cg{grid-template-columns:repeat(3,1fr)}}
.gv-ov{position:fixed;inset:0;z-index:300}
.gv-sc{position:absolute;inset:0;background:rgba(0,0,0,.4);opacity:0;transition:opacity .2s}.gv-ov.in .gv-sc{opacity:1}
.gv-sh{position:absolute;left:50%;bottom:0;width:min(100%,560px);max-height:88vh;overflow:auto;background:var(--g1);border-radius:28px 28px 0 0;padding:0 0 calc(12px + var(--sa-bottom));transform:translate(-50%,100%);transition:transform .25s cubic-bezier(.2,0,0,1)}
.gv-ov.in .gv-sh{transform:translate(-50%,0)}
.gv-gr{display:block;width:32px;height:4px;border-radius:2px;background:var(--gol);margin:12px auto 8px}
.gv-sht{padding:4px 24px 12px;border-bottom:1px solid var(--gol);margin-bottom:6px}.gv-sht b{display:block;font-size:16px;font-weight:500;overflow-wrap:anywhere}.gv-sht span{font-size:13px;color:var(--g2t)}
.gv-sh hr{border:0;border-top:1px solid var(--gol);margin:6px 0}
.gv-si{display:flex!important;align-items:center;gap:24px;width:100%;min-height:52px;padding:0 24px;font-size:16px}.gv-si:hover,.gv-si:active{background:var(--ghv)}.gv-si span{flex:1}.gv-si.dg{color:var(--ger)}.gv-si .ck{color:var(--gp)}
.gv-ir{display:flex;gap:16px;padding:10px 24px;font-size:14px}.gv-ir span{width:84px;color:var(--g2t);flex:none}.gv-ir b{font-weight:400;overflow-wrap:anywhere;flex:1}
.gv-dl{position:absolute;left:50%;top:50%;width:min(calc(100% - 48px),312px);transform:translate(-50%,-46%) scale(.96);opacity:0;transition:.2s;background:var(--g1);border-radius:28px;padding:24px}
.gv-ov.in .gv-dl{transform:translate(-50%,-50%);opacity:1}
.gv-dl h2{margin:0 0 16px;font-size:24px;font-weight:400}.gv-dl p{margin:0 0 20px;font-size:14px;line-height:1.5;color:var(--g2t);overflow-wrap:anywhere}
.gv-in{width:100%;height:56px;border-radius:4px;border:1px solid var(--gol);background:none;color:var(--gt);padding:0 16px;font-size:16px;outline:0;user-select:text;-webkit-user-select:text}.gv-in:focus{border:2px solid var(--gp);padding:0 15px}
.gv-er{display:block;min-height:20px;margin-top:4px;font-size:12px;font-style:normal;color:var(--ger)}
.gv-ac{display:flex;justify-content:flex-end;gap:8px;margin-top:8px}.gv-ac button{height:40px;padding:0 12px;border-radius:20px;color:var(--gp);font-weight:500;font-size:14px;display:grid;place-items:center}.gv-ac button:hover{background:var(--ghv)}.gv-ac .dg{color:var(--ger)}
.gv [hidden]{display:none!important}
.gv-sn{position:fixed;z-index:400;left:16px;right:16px;bottom:calc(90px + var(--sa-bottom));max-width:440px;display:flex;align-items:center;gap:8px;min-height:48px;padding:6px 8px 6px 16px;border-radius:4px;background:#313033;color:#f4eff4;font-size:14px;opacity:0;transform:translateY(12px);transition:.2s}
.gv-sn.in{opacity:1;transform:none}.gv-sn span{flex:1}.gv-sn button{height:36px;padding:0 12px;border-radius:18px;color:#a8c7fa;font-weight:500;display:grid;place-items:center}
@media(min-width:800px){.gv-sn{left:28px;bottom:28px}}
.gv-pk{position:absolute;inset:0;background:var(--gs);display:flex;flex-direction:column;transform:translateY(24px);opacity:0;transition:.22s}.gv-ov.in .gv-pk{transform:none;opacity:1}
.gv-pl{flex:1;overflow:auto;padding:8px 0}.gv-pr{display:flex!important;align-items:center;gap:16px;width:100%;min-height:64px;padding:0 20px}.gv-pr b{flex:1;font-weight:400;font-size:16px}.gv-pr .ck{opacity:0;color:var(--gp)}.gv-pr.on{background:var(--gsc)}.gv-pr.on .ck{opacity:1}
.gv-pk footer{display:flex;justify-content:flex-end;gap:8px;padding:12px 16px calc(12px + var(--sa-bottom));border-top:1px solid var(--gol)}.gv-pk footer button{height:40px;padding:0 20px;border-radius:20px;font-weight:500;font-size:14px;display:grid;place-items:center;color:var(--gp)}.gv-pk footer .go{background:var(--gp);color:var(--gs)}.gv-pk footer .go[disabled]{opacity:.38;pointer-events:none}
.gv-vw{background:#000;color:#fff;display:flex;flex-direction:column;opacity:0;transition:opacity .18s}.gv-vw.in{opacity:1}
.gv-vw .gv-tb{background:rgba(0,0,0,.55);color:#fff;position:absolute;left:0;right:0;top:0;padding-top:var(--sa-top);height:calc(64px + var(--sa-top))}.gv-vw .gv-ib{color:#fff}
.gv-vt{flex:1;min-width:0;padding:0 8px}.gv-vt b{display:block;font-weight:500;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gv-vt span{font-size:12px;opacity:.7}
.gv-vc{flex:1;display:grid;place-items:center;overflow:auto;min-height:0}.gv-vc img{max-width:100%;max-height:100%;object-fit:contain;transition:transform .2s;cursor:zoom-in}.gv-vc img.z{transform:scale(2.2);cursor:zoom-out}
.gv-vc video{max-width:100%;max-height:100%}.gv-vc iframe{width:100%;height:100%;border:0;background:#fff}
.gv-vc pre{margin:0;width:100%;height:100%;overflow:auto;padding:80px 20px 20px;font:13px/1.55 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word;user-select:text;-webkit-user-select:text}
.gv-au,.gv-np{display:flex;flex-direction:column;align-items:center;gap:20px;text-align:center}.gv-np p{margin:0;opacity:.8}
.gv-nv{position:absolute!important;top:50%;width:48px;height:48px;margin-top:-24px;border-radius:50%;background:rgba(0,0,0,.45);display:grid!important;place-items:center;color:#fff}.gv-nv.l{left:8px}.gv-nv.r{right:8px}.gv-nv[hidden]{display:none!important}
`;document.body.appendChild(e)})();
