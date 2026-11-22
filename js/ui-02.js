(function(){var e=document.createElement('style');e.textContent=`
:root{box-sizing:border-box;padding-top:var(--sa-top);padding-bottom:var(--sa-bottom);
--bg:#f3f1fb;--bg2:#e6e2f7;--card:rgba(255,255,255,.75);--bd:rgba(90,70,200,.15);--tx:#1a1533;--mu:#6b6790;--a:#6d4aff;--b:#00b8d9;--glow:rgba(109,74,255,.25)}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#020a06;--bg2:#062a1d;--card:rgba(255,255,255,.06);--bd:rgba(255,255,255,.1);--tx:#f2f0ff;--mu:#9d98c8;--a:#2fe9a6;--b:#8dffd6;--glow:rgba(47,233,166,.35)}}
:root[data-theme="dark"]{--bg:#020a06;--bg2:#062a1d;--card:rgba(255,255,255,.06);--bd:rgba(255,255,255,.1);--tx:#f2f0ff;--mu:#9d98c8;--a:#2fe9a6;--b:#8dffd6;--glow:rgba(47,233,166,.35)}
html{scroll-padding-top:var(--sa-top)}
*{box-sizing:border-box;margin:0}
body{background:radial-gradient(900px 500px at 10% -10%,var(--bg2),transparent),radial-gradient(700px 500px at 100% 100%,var(--bg2),transparent),var(--bg);color:var(--tx);font:15px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;min-height:100vh}
#app{display:flex;min-height:100vh}
nav{position:fixed;bottom:0;left:0;right:0;display:flex;justify-content:space-around;padding:8px 8px calc(8px + var(--sa-bottom));background:var(--card);backdrop-filter:blur(20px);border-top:1px solid var(--bd);z-index:5}
nav button{background:none;border:0;color:var(--mu);font-family:inherit;font-weight:600;font-size:11px;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 12px;border-radius:14px;cursor:pointer}
nav button i{font-style:normal;font-size:20px}
nav button.on{color:var(--tx);background:linear-gradient(135deg,var(--glow),transparent)}
.logo{display:none;font-family:inherit;font-weight:800;font-size:26px;letter-spacing:6px;background:linear-gradient(90deg,var(--a),var(--b));-webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:24px}
main{flex:1;padding:18px 16px 100px;max-width:1100px;margin:0 auto;width:100%}
@media(min-width:800px){nav{position:sticky;top:0;height:100vh;width:200px;flex-direction:column;justify-content:flex-start;gap:6px;padding:28px 14px;border-top:0;border-right:1px solid var(--bd)}nav button{flex-direction:row;font-size:14px;gap:12px;width:100%}.logo{display:block}main{padding:28px 32px}}
h1{font-size:22px;margin-bottom:4px}.sub{color:var(--mu);margin-bottom:18px}
.grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.card{background:var(--card);border:1px solid var(--bd);border-radius:22px;padding:18px;backdrop-filter:blur(16px);box-shadow:0 10px 40px -20px var(--glow)}
.card h3{font-size:13px;color:var(--mu);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
.big{font-family:inherit;font-weight:800;font-size:30px}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}
.chip{border:1px solid var(--bd);background:var(--card);color:var(--tx);padding:8px 14px;border-radius:99px;cursor:pointer;font-family:inherit;font-weight:600;font-size:13px}
.chip.on{color:#fff;border-color:transparent}
input[type=text],input[type=password]{width:100%;padding:13px 16px;border-radius:14px;border:1px solid var(--bd);background:var(--card);color:var(--tx);font:inherit;outline:none}
input:focus{border-color:var(--a);box-shadow:0 0 0 3px var(--glow)}
.btn{border:0;cursor:pointer;color:#fff;font-family:inherit;font-weight:700;font-size:15px;padding:14px 22px;border-radius:16px;background:linear-gradient(135deg,var(--a),var(--b));box-shadow:0 8px 24px -8px var(--glow);transition:transform .15s}
.btn:active{transform:scale(.96)}.btn.stop{background:linear-gradient(135deg,#ff4d6d,#ff8a4c)}.btn.ghost{background:var(--card);color:var(--tx);border:1px solid var(--bd);box-shadow:none}
.row{display:flex;gap:10px;align-items:center}.sp{justify-content:space-between}
.pulse{animation:p 1.4s infinite}@keyframes p{50%{opacity:.35}}
.hm{display:grid;grid-template-columns:repeat(24,1fr);gap:3px}.hm div{aspect-ratio:1;border-radius:4px;background:var(--a)}
.item{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--bd)}.item:last-child{border:0}
.dot{width:12px;height:12px;border-radius:50%;flex:none}.mu{color:var(--mu);font-size:13px}.grow{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sm{padding:8px 12px;font-size:13px;border-radius:12px}
#lock{position:fixed;inset:0;z-index:50;background:var(--bg);display:flex;align-items:center;justify-content:center;padding:24px}
#lock .card{width:100%;max-width:340px;text-align:center}
#modal{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:40;display:none;align-items:center;justify-content:center;padding:20px}
#modal>div{max-width:92vw;max-height:88vh;overflow:auto;background:var(--bg);border-radius:20px;padding:14px}
#modal img,#modal video,#modal iframe{max-width:100%;max-height:70vh;border-radius:12px}
.t{overflow-x:auto}
body::before,body::after{content:"";position:fixed;width:46vmax;height:46vmax;border-radius:50%;filter:blur(90px);opacity:.35;z-index:-1;animation:fl 18s ease-in-out infinite alternate;pointer-events:none}
body::before{background:var(--a);top:-20vmax;left:-15vmax}body::after{background:var(--b);bottom:-25vmax;right:-15vmax;animation-delay:-9s}
@keyframes fl{to{transform:translate(8vmax,6vmax) scale(1.15)}}
main>*{animation:up .5s both}main>*:nth-child(2){animation-delay:.06s}main>*:nth-child(3){animation-delay:.12s}main>*:nth-child(4){animation-delay:.18s}
@keyframes up{from{opacity:0;transform:translateY(14px)}}
.card{transition:transform .25s,box-shadow .25s}.card:hover{transform:translateY(-3px);box-shadow:0 18px 50px -18px var(--glow)}
.btn{position:relative;overflow:hidden;transition:transform .15s,filter .2s}.btn:hover{filter:brightness(1.12);transform:translateY(-1px)}.btn::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.35) 50%,transparent 70%);transform:translateX(-120%);transition:transform .6s}.btn:hover::after{transform:translateX(120%)}
.chip{transition:.2s}.chip:hover{border-color:var(--a);transform:translateY(-1px)}
nav button{transition:.2s}nav button:hover{color:var(--tx);background:var(--card)}
.logo{text-shadow:0 0 30px var(--glow)}
.fab{position:fixed;top:calc(10px + var(--sa-top));right:12px;display:flex;gap:8px;z-index:6}
.fab button{width:40px;height:40px;border-radius:50%;border:1px solid var(--bd);background:var(--card);backdrop-filter:blur(14px);color:var(--tx);font-size:17px;cursor:pointer;transition:.2s}.fab button:hover{border-color:var(--a);transform:rotate(15deg)}
#toast{position:fixed;left:50%;bottom:90px;transform:translate(-50%,20px);background:linear-gradient(135deg,var(--a),var(--b));color:#fff;padding:11px 20px;border-radius:99px;font-weight:700;opacity:0;pointer-events:none;transition:.3s;z-index:60}#toast.on{opacity:1;transform:translate(-50%,0)}
::-webkit-scrollbar{width:8px}::-webkit-scrollbar-thumb{background:var(--bd);border-radius:9px}
@media(min-width:800px){#toast{bottom:30px}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;document.head.appendChild(e)})();
