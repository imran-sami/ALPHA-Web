(function(){var e=document.createElement('style');e.setAttribute("id","alpha-theme-fix");e.textContent=`/* ===== theme fixes: readable text on every theme (tinted together with the skin) ===== */
html:not([data-t='18']) #main .sk-hero #go,html:not([data-t='18']) #main .vtools .vup{background:linear-gradient(95deg,color-mix(in srgb,var(--a) 56%,#000),color-mix(in srgb,var(--b) 48%,#000))!important;text-shadow:0 1px 2px rgba(0,0,0,.28)}
html body .stg .ssb{background:linear-gradient(90deg,#007bb8,#4549d8 62%,#6c32e0)}
html body #mc .btn:not(.ghost):not(.stop):not(.ssb){background:linear-gradient(135deg,color-mix(in srgb,var(--a) 68%,#000),color-mix(in srgb,var(--b) 46%,#000))}
html body #mc .chip.on{background:linear-gradient(135deg,color-mix(in srgb,var(--a) 60%,#000),color-mix(in srgb,var(--b) 40%,#000))!important}
html body #main .fup{background:linear-gradient(90deg,#0089cc,#4d52e6 60%,#7a3df0)}
html[data-theme=light] #main .fdt i{color:#2d5fd6}
html[data-t='18'] #main .sk-hero #go{text-shadow:0 1px 2px rgba(0,0,0,.3)}
:root[data-theme=light][data-t]{--mu:#555d86;--L-mut:#4d5584;--L-soft:#566089}
html[data-theme=light] #main .sub,html[data-theme=light] #main .hd .card[data-z=quo] .qa{color:#555d86}
html[data-theme=light] #main .vtt .sub{color:#066a86}
html[data-theme=light] #main .vsub,html[data-theme=light] #main .vviz text{color:#555d86;fill:#555d86}
`;document.body.appendChild(e)})();
