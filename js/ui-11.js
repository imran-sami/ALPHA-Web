(function(){var e=document.createElement('style');e.setAttribute("id","alpha-gf-css");e.textContent=`/* ===== ALPHA Files-style actions (Google Files pattern). Uses theme variables, so every theme works. ===== */
:root{--gf-red:#e5484d;--gf-surf:color-mix(in oklab,var(--bg) 94%,var(--tx));--gf-hi:color-mix(in oklab,var(--tx) 8%,transparent)}
.gf-ov{position:fixed;inset:0;z-index:100;font-family:inherit;color:var(--tx)}
.gf-scrim{position:absolute;inset:0;background:rgba(0,0,0,.5);opacity:0;transition:opacity .2s}
.gf-ov.in .gf-scrim{opacity:1}.gf-ov.out .gf-scrim{opacity:0}
.gf-sheet{position:absolute;left:50%;bottom:0;width:min(100%,560px);max-height:86vh;overflow:auto;background:var(--gf-surf);border:1px solid var(--bd);border-bottom:0;border-radius:28px 28px 0 0;padding:0 0 calc(12px + var(--sa-bottom));transform:translate(-50%,100%);transition:transform .24s cubic-bezier(.2,0,0,1);box-shadow:0 -8px 40px rgba(0,0,0,.35)}
.gf-ov.in .gf-sheet{transform:translate(-50%,0)}.gf-ov.out .gf-sheet{transform:translate(-50%,100%)}
.gf-grab{display:block;width:32px;height:4px;border-radius:4px;background:var(--mu);opacity:.5;margin:12px auto 6px;touch-action:none}
.gf-sh{padding:6px 24px 12px;font-size:16px;font-weight:600;line-height:1.3;overflow-wrap:anywhere;touch-action:none}
.gf-sh small{display:block;font-weight:400;font-size:13px;color:var(--mu);margin-top:2px}
.gf-sl hr{border:0;border-top:1px solid var(--bd);margin:6px 0}
.gf-si{display:flex;align-items:center;gap:20px;width:100%;min-height:56px;padding:0 24px;background:none;border:0;color:var(--tx);font:500 16px/1.2 inherit;text-align:left;cursor:pointer;-webkit-tap-highlight-color:transparent}
.gf-si:hover,.gf-si:focus-visible{background:var(--gf-hi);outline:0}.gf-si:active{background:color-mix(in oklab,var(--tx) 14%,transparent)}
.gf-si svg{flex:none;color:var(--mu)}.gf-si.dg,.gf-si.dg svg{color:var(--gf-red)}.gf-si .gf-st{flex:1;min-width:0}.gf-si small{display:block;color:var(--mu);font-size:12.5px;font-weight:400;margin-top:2px}
.gf-si.on svg:last-child{color:var(--a)}.gf-nic{width:24px;flex:none}
/* dialog */
.gf-dlg{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.5);opacity:0;transition:opacity .18s}
.gf-dlg.in{opacity:1}.gf-dlg.out{opacity:0}
.gf-dc{width:min(100%,360px);background:var(--gf-surf);border:1px solid var(--bd);border-radius:28px;padding:24px 24px 16px;box-shadow:0 20px 60px rgba(0,0,0,.5);transform:scale(.92);transition:transform .2s cubic-bezier(.2,0,0,1)}
.gf-dlg.in .gf-dc{transform:none}
.gf-dc h2{margin:0 0 12px;font-size:22px;line-height:28px;font-weight:600;color:var(--tx)}
.gf-dc p{margin:0 0 20px;font-size:14.5px;line-height:1.5;color:var(--mu);overflow-wrap:anywhere}
.gf-dc input{width:100%;box-sizing:border-box;padding:14px 16px;border-radius:12px;border:2px solid var(--a);background:transparent;color:var(--tx);font:16px inherit;outline:0}
.gf-dc input.err{border-color:var(--gf-red)}.gf-er{color:var(--gf-red);font-size:12.5px;min-height:18px;margin:6px 4px 10px}
.gf-ac{display:flex;justify-content:flex-end;gap:8px;margin:0 -8px}
.gf-ac button{min-height:40px;padding:0 16px;border:0;border-radius:20px;background:none;color:var(--a);font:600 14.5px inherit;cursor:pointer}
.gf-ac button:hover{background:color-mix(in oklab,var(--a) 12%,transparent)}.gf-ac button.dg{color:var(--gf-red)}.gf-ac button.dg:hover{background:color-mix(in oklab,var(--gf-red) 12%,transparent)}
.gf-ac button:disabled{opacity:.4;pointer-events:none}
/* snackbar */
#gf-snack{position:fixed;left:50%;bottom:calc(86px + var(--sa-bottom));transform:translate(-50%,24px);z-index:130;width:min(calc(100% - 24px),440px);box-sizing:border-box;display:flex;align-items:center;gap:8px;min-height:48px;padding:6px 8px 6px 16px;border-radius:8px;background:#2e3135;color:#f1f1f1;font-size:14px;line-height:20px;box-shadow:0 6px 24px rgba(0,0,0,.4);opacity:0;pointer-events:none;transition:.22s}
#gf-snack.on{opacity:1;transform:translate(-50%,0);pointer-events:auto}
#gf-snack span{flex:1;overflow-wrap:anywhere}#gf-snack button{border:0;background:none;color:#8ab4f8;font:600 14px inherit;padding:10px 12px;border-radius:6px;cursor:pointer}
#gf-snack i{position:absolute;left:0;bottom:0;height:3px;width:0;background:#8ab4f8;border-radius:0 0 8px 8px;transition:width .25s}
@media(min-width:800px){#gf-snack{bottom:28px;left:calc(50% + 100px)}}
#toast{display:none!important}
/* selection app bar */
#gf-sel{position:fixed;top:0;z-index:70;height:calc(64px + var(--sa-top));padding:var(--sa-top) 4px 0;box-sizing:border-box;display:flex;align-items:center;gap:2px;background:var(--gf-surf);border-bottom:1px solid var(--bd);box-shadow:0 2px 12px rgba(0,0,0,.18);animation:gfDown .18s ease-out}
@keyframes gfDown{from{transform:translateY(-100%)}}
#gf-sel button{width:48px;height:48px;flex:none;border:0;border-radius:50%;background:none;color:var(--tx);display:grid;place-items:center;cursor:pointer}
#gf-sel button:hover{background:var(--gf-hi)}#gf-sel button:disabled{opacity:.35;pointer-events:none}
#gf-sel .gf-cnt{font-size:20px;font-weight:600;margin-left:8px;white-space:nowrap}.gf-sp{flex:1}
body.gf-selon #sbar{display:none!important}body.gf-selon .fkb{visibility:hidden}
/* toolbar (sort / view / starred) */
.gf-tools{display:flex;align-items:center;gap:8px;margin:2px 0 10px;flex-wrap:wrap}
.gf-chip,.gf-sortb,.gf-vb{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:10px;border:1px solid var(--bd);background:transparent;color:var(--tx);font:500 13.5px inherit;cursor:pointer}
.gf-chip.on{background:color-mix(in oklab,var(--a) 20%,transparent);border-color:var(--a)}
.gf-sortb{border:0;padding:0 8px}.gf-vb{border:0;width:38px;padding:0;justify-content:center;border-radius:50%}.gf-sortb:hover,.gf-vb:hover{background:var(--gf-hi)}
.gf-star{display:inline-grid;color:#f6b73c;margin-left:6px;vertical-align:-3px}
.fls.gf-grid{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:10px}
.fls.gf-grid .tk{flex-direction:column;align-items:stretch;text-align:center;padding:14px 10px;gap:8px;position:relative;margin:0}
.fls.gf-grid .tk .fic,.fls.gf-grid .tk .thw{align-self:center;transform:scale(1.35);margin:10px 0}
.fls.gf-grid .tk .fkb{position:absolute;top:4px;right:4px}.fls.gf-grid .tk .fck{position:absolute;top:8px;left:8px}.fls.gf-grid .tk .fev{display:none}
.fls .tk.gf-hide{display:none!important}
.gf-empty{display:flex;flex-direction:column;align-items:center;gap:8px;padding:56px 20px;text-align:center;color:var(--mu)}
.gf-empty .gf-ei{width:96px;height:96px;border-radius:50%;display:grid;place-items:center;background:color-mix(in oklab,var(--a) 14%,transparent);color:var(--a);margin-bottom:8px}
.gf-empty b{font-size:18px;color:var(--tx)}.gf-empty button{margin-top:10px;height:40px;padding:0 20px;border-radius:20px;border:0;background:var(--a);color:#fff;font:600 14px inherit;cursor:pointer}
/* full pages (destination picker, viewer) */
.gf-page{background:var(--bg);display:flex;flex-direction:column;animation:gfUp .22s cubic-bezier(.2,0,0,1)}
@keyframes gfUp{from{transform:translateY(32px);opacity:0}}
.gf-ov.out.gf-page{opacity:0;transition:opacity .18s}
.gf-top{display:flex;align-items:center;gap:2px;height:calc(64px + var(--sa-top));padding:var(--sa-top) 4px 0;box-sizing:border-box;flex:none}
.gf-top button{width:48px;height:48px;flex:none;border:0;border-radius:50%;background:none;color:inherit;display:grid;place-items:center;cursor:pointer}.gf-top button:hover{background:var(--gf-hi)}
.gf-top .gf-tt{flex:1;min-width:0;font-size:19px;font-weight:600;margin-left:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gf-top .gf-tt small{display:block;font-size:12px;font-weight:400;color:var(--mu)}
.gf-plist{flex:1;overflow:auto;padding:4px 0}
.gf-pi{display:flex;align-items:center;gap:16px;width:100%;min-height:64px;padding:0 20px;border:0;background:none;color:var(--tx);text-align:left;font:inherit;cursor:pointer}
.gf-pi:hover{background:var(--gf-hi)}.gf-pi.sel{background:color-mix(in oklab,var(--a) 16%,transparent)}.gf-pi:disabled{opacity:.45;cursor:default}
.gf-pt{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-size:21px;background:color-mix(in oklab,var(--a) 14%,transparent);flex:none}
.gf-pi b{display:block;font-weight:600;font-size:15.5px}.gf-pi small{color:var(--mu);font-size:12.5px}.gf-pi .gf-rd{margin-left:auto;width:22px;height:22px;border-radius:50%;border:2px solid var(--mu);flex:none;display:grid;place-items:center}
.gf-rd svg{opacity:0}.gf-pi.sel .gf-rd svg{opacity:1}
.gf-pi.sel .gf-rd{border-color:var(--a);background:var(--a);color:#fff}
.gf-pbar{flex:none;display:flex;justify-content:flex-end;gap:8px;padding:12px 16px calc(12px + var(--sa-bottom));border-top:1px solid var(--bd)}
.gf-pbar button{height:44px;padding:0 24px;border-radius:22px;border:0;font:600 14.5px inherit;cursor:pointer;background:none;color:var(--a)}
.gf-pbar button.pr{background:var(--a);color:#fff}.gf-pbar button:disabled{opacity:.4;pointer-events:none}
/* viewer */
.gf-view{background:#000;color:#fff;z-index:105;touch-action:none}
.gf-view .gf-top{position:absolute;left:0;right:0;top:0;z-index:3;background:linear-gradient(#000c,#0000);transition:opacity .2s}
.gf-view.gf-hide .gf-top,.gf-view.gf-hide .gf-vcnt,.gf-view.gf-hide .gf-zb{opacity:0;pointer-events:none}
.gf-stage{position:absolute;inset:0;overflow:hidden;display:grid;place-items:center;touch-action:none;user-select:none;-webkit-user-select:none}
.gf-stage img{max-width:100%;max-height:100%;object-fit:contain;transform-origin:50% 50%;will-change:transform;-webkit-user-drag:none;user-select:none;pointer-events:none}
.gf-stage img.snap{transition:transform .22s cubic-bezier(.2,0,0,1)}
.gf-stage video{max-width:100%;max-height:100%;background:#000}.gf-stage audio{width:min(90%,460px)}
.gf-vcnt{position:absolute;left:50%;bottom:calc(18px + var(--sa-bottom));transform:translateX(-50%);z-index:3;background:#000a;padding:6px 14px;border-radius:99px;font-size:13px;transition:opacity .2s}
.gf-zb{position:absolute;right:16px;bottom:calc(16px + var(--sa-bottom));z-index:3;display:none;flex-direction:column;gap:8px;transition:opacity .2s}
.gf-zb button{width:44px;height:44px;border:0;border-radius:50%;background:#000a;color:#fff;font:600 22px inherit;cursor:pointer}
@media(hover:hover) and (pointer:fine){.gf-zb{display:flex}}
.gf-load{color:#bbb;font-size:14px}
/* info rows */
.gf-info{padding:0 24px 8px}.gf-info div{display:flex;gap:16px;padding:10px 0;border-top:1px solid var(--bd);font-size:14px}.gf-info div:first-child{border-top:0}
.gf-info span{width:92px;flex:none;color:var(--mu)}.gf-info b{font-weight:500;overflow-wrap:anywhere;min-width:0}
.gf-tbtn{height:34px;padding:0 14px;border-radius:17px;border:1px solid var(--gf-red);background:none;color:var(--gf-red);font:600 13px inherit;cursor:pointer;margin:0 0 14px}
@media(prefers-reduced-motion:reduce){.gf-ov *,.gf-dlg *,#gf-snack,#gf-sel{animation:none!important;transition:none!important}}
`;document.body.appendChild(e)})();
