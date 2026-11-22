/* ===== ALPHA theme sync: re-tints the skin + lock-screen stylesheets to the selected theme (perceptual OKLCH hue rotation, lightness kept => contrast kept).
   Visual layer only. ALPHA Night is the reference palette (zero shift). Category colours (Work/Fitness/Study/Leisure/Sleep) are never shifted. ===== */
(()=>{
if(window.__alphaTint)return;window.__alphaTint=1;
const IDS=['alpha-skin','alpha-lock-skin','alpha-theme-fix'];
const orig={};IDS.forEach(id=>{const e=document.getElementById(id);if(e)orig[id]=e.textContent});
/* sRGB <-> OKLab */
const toLin=v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)};
const toGam=v=>{v=v<=.0031308?12.92*v:1.055*Math.pow(v,1/2.4)-.055;return v*255};
function rgb2lch(r,g,b){r=toLin(r);g=toLin(g);b=toLin(b);
 const l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);
 const L=.2104542553*l+.793617785*m-.0040720468*s,A=1.9779984951*l-2.428592205*m+.4505937099*s,B=.0259040371*l+.7827717662*m-.808675766*s;
 return[L,Math.hypot(A,B),(Math.atan2(B,A)*180/Math.PI+360)%360]}
function lch2rgb(L,C,H){const h=H*Math.PI/180;
 const f=c=>{const A=c*Math.cos(h),B=c*Math.sin(h);
  const l=(L+.3963377774*A+.2158037573*B)**3,m=(L-.1055613458*A-.0638541728*B)**3,s=(L-.0894841775*A-1.291485548*B)**3;
  return[4.0767416621*l-3.3077115913*m+.2309699292*s,-1.2684380046*l+2.6097574011*m-.3413193965*s,-.0041960863*l-.7034186147*m+1.707614701*s]};
 let lo=0,hi=C,v=f(C);const ok=a=>a.every(x=>x>=-.0005&&x<=1.0005);
 if(!ok(v)){for(let i=0;i<14;i++){const mid=(lo+hi)/2;if(ok(f(mid)))lo=mid;else hi=mid}v=f(lo)}
 return v.map(x=>Math.max(0,Math.min(255,Math.round(toGam(Math.max(0,Math.min(1,x)))))))}
const hex2rgb=h=>{h=h.replace('#','');if(h.length<6)h=h.split('').map(c=>c+c).join('');const n=parseInt(h.slice(0,6),16);return[n>>16,n>>8&255,n&255]};
const BASE_A=rgb2lch(...hex2rgb('#7c5cff'))[2],BASE_B=rgb2lch(...hex2rgb('#ff8a4c'))[2];
const dh=(a,b)=>((a-b+540)%360)-180;
/* per-theme parameters */
function params(){
 const d=document.documentElement,i=+d.dataset.t,t=(typeof themes!=='undefined')&&themes[i];if(!t)return null;
 const a=rgb2lch(...hex2rgb(t[4])),b=rgb2lch(...hex2rgb(t[5]));
 const k=Math.max(.08,Math.min(1,a[1]/.15));
 return{dA:dh(a[2],BASE_A),dB:dh(b[2],BASE_B),aH:a[2],ab:dh(b[2],a[2]),k,key:[i,t[4],t[5]].join()}}
function shift(r,g,b,P){const[L,C,H]=rgb2lch(r,g,b);if(C<.02)return null;
 let nh;if(H>=185&&H<262)nh=P.aH+(H-262);else if(H>=262&&H<=355)nh=P.aH+P.ab*(H-262)/93;else if(H>=20&&H<=80)nh=H+P.dB;else return null;
 return lch2rgb(L,C*P.k,(nh+360)%360)}
const hx=n=>n.toString(16).padStart(2,'0');
function tintBody(s,P){
 s=s.replace(/%23([0-9a-fA-F]{6})\b/g,(m,h)=>{const o=shift(...hex2rgb(h),P);return o?'%23'+hx(o[0])+hx(o[1])+hx(o[2]):m});
 s=s.replace(/#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g,(m,h)=>{const o=shift(...hex2rgb(h.slice(0,h.length==8?6:h.length)),P);if(!o)return m;return'#'+hx(o[0])+hx(o[1])+hx(o[2])+(h.length==8?h.slice(6):'')});
 s=s.replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/g,(m,r,g,b,a)=>{const o=shift(+r,+g,+b,P);if(!o)return m;return a!==undefined?`rgba(${o},${a})`:`rgb(${o})`});
 return s}
const SKIP=/\[data-k=|\[data-c=|\.q[1-4]\b/;
function walk(css,P){let out='',i=0,n=css.length;
 while(i<n){
  if(css.startsWith('/*',i)){const e=css.indexOf('*/',i+2);const j=e<0?n:e+2;out+=css.slice(i,j);i=j;continue}
  const o=css.indexOf('{',i);if(o<0){out+=css.slice(i);break}
  /* a comment between rules must not be treated as part of the selector */
  const head=css.slice(i,o);if(head.indexOf('/*')>=0&&head.indexOf('*/')<0){out+=css.slice(i,o+1);i=o+1;continue}
  let d=1,j=o+1,inS=0;
  while(j<n&&d>0){const c=css[j];if(inS){if(c===inS)inS=0}else if(c==='"'||c==="'")inS=c;else if(c==='{')d++;else if(c==='}')d--;j++}
  const body=css.slice(o+1,j-1),sel=head.replace(/\/\*[\s\S]*?\*\//g,'');
  if(/^\s*@(media|supports|keyframes|-webkit-keyframes)/.test(sel)||/^\s*(from|to|\d+%)/.test(sel)&&/\{/.test(body))out+=head+'{'+walk(body,P)+'}';
  else out+=head+'{'+(SKIP.test(sel)?body:tintBody(body,P))+'}';
  i=j}
 return out}
let last=null;
function retint(){
 const P=params();if(!P||P.key===last)return;last=P.key;
 try{const t=themes[+document.documentElement.dataset.t],st=document.documentElement.style;st.setProperty('--page-bg',t[2]);st.setProperty('--page-bg2',t[3])}catch(e){}
 IDS.forEach(id=>{const e=document.getElementById(id);if(!e||orig[id]==null)return;
  e.textContent=(document.documentElement.dataset.t==='18')?orig[id]:walk(orig[id],P)});
 try{document.documentElement.dataset.tint=P.key}catch(e){}}
window.__alphaRetint=retint;
if(typeof applyTheme==='function'){const _p=applyTheme;applyTheme=function(i){const r=_p(i);retint();return r}}
new MutationObserver(retint).observe(document.documentElement,{attributes:true,attributeFilter:['data-t']});
retint();
})();
