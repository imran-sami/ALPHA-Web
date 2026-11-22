/* ===== v11: full-screen file viewer (tap a file -> readable reader interface) ===== */
(()=>{
const st=document.createElement('style');st.textContent=`
#rdr{position:fixed;inset:0;z-index:70;display:none;flex-direction:column;background:radial-gradient(900px 500px at 10% -10%,var(--bg2),transparent),var(--bg);color:var(--tx);padding-top:var(--sa-top)}
#rdr.on{display:flex}
#rdr .rh{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--bd);background:var(--card);backdrop-filter:blur(20px)}
#rdr .rt{flex:1;min-width:0}
#rdr .rt b{display:block;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rdr .rt span{display:block;font-size:12px;color:var(--mu);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rdr .chip{cursor:pointer;text-decoration:none;color:var(--tx);white-space:nowrap}
#rdr .chip[disabled]{opacity:.35;pointer-events:none}
#rdr .chip.on{background:linear-gradient(135deg,var(--glow),transparent);border-color:var(--a)}
#rdr .tb{display:flex;gap:8px;align-items:center;overflow-x:auto;padding:8px 12px;border-bottom:1px solid var(--bd);scrollbar-width:none}
#rdr .tb:empty{display:none}
#rdr .tb::-webkit-scrollbar{display:none}
#rdr .tb .sp{flex:1}
#rdr .rb{flex:1;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding-bottom:var(--sa-bottom)}
#rdr .pg{max-width:860px;margin:0 auto;padding:22px 18px 60px;font-size:var(--rfs,16px);line-height:1.75;overflow-wrap:anywhere}
#rdr .full{height:100%;display:flex;align-items:center;justify-content:center;padding:12px}
#rdr .msg{max-width:420px;margin:12vh auto;text-align:center;padding:0 20px}
#rdr .msg .ic{font-size:64px}
#rdr .msg h2{margin:10px 0 6px;overflow-wrap:anywhere}
#rdr .msg p{color:var(--mu);margin-bottom:16px}
#rdr .msg .btn{display:inline-block;text-decoration:none}
#rdr .tv{font:var(--rfs,15px)/1.65 ui-monospace,Menlo,Consolas,monospace;min-width:max-content}
#rdr .tv.wr{min-width:0}
#rdr .tv div{display:flex;gap:14px;padding:0 4px}
#rdr .tv i{flex:none;min-width:3.4em;text-align:right;font-style:normal;color:var(--mu);opacity:.65;user-select:none;-webkit-user-select:none}
#rdr .tv:not(.ln) i{display:none}
#rdr .tv span{white-space:pre;flex:1}
#rdr .tv.wr span{white-space:pre-wrap;overflow-wrap:anywhere}
#rdr .tv.sans{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.8}
#rdr .tw{padding:14px 10px 60px;max-width:1200px;margin:0 auto}
#rdr .pro h1,#rdr .pro h2,#rdr .pro h3,#rdr .pro h4{line-height:1.3;margin:1.4em 0 .5em}
#rdr .pro h1{font-size:1.7em}#rdr .pro h2{font-size:1.4em}#rdr .pro h3{font-size:1.2em}
#rdr .pro p{margin:0 0 1em}
#rdr .pro ul,#rdr .pro ol{margin:0 0 1em;padding-left:1.5em}
#rdr .pro li{margin:.25em 0}
#rdr .pro blockquote{margin:0 0 1em;padding:.4em 1em;border-left:4px solid var(--a);background:var(--card);border-radius:0 12px 12px 0;color:var(--mu)}
#rdr .pro code{font:.9em ui-monospace,Menlo,Consolas,monospace;background:var(--card);border:1px solid var(--bd);border-radius:6px;padding:1px 5px}
#rdr .pro pre{background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:12px 14px;overflow:auto;margin:0 0 1em}
#rdr .pro pre code{background:none;border:0;padding:0}
#rdr .pro a{color:var(--a)}
#rdr .pro hr{border:0;border-top:1px solid var(--bd);margin:1.5em 0}
#rdr .pro table{border-collapse:collapse;margin:0 0 1em;max-width:100%}
#rdr .pro td,#rdr .pro th{border:1px solid var(--bd);padding:6px 10px;vertical-align:top}
#rdr .pro .li{padding-left:1.4em;text-indent:-1.1em;margin:.2em 0}
#rdr .grid2{border-collapse:separate;border-spacing:0;font-size:14px;min-width:max-content}
#rdr .grid2 th,#rdr .grid2 td{padding:7px 12px;border-bottom:1px solid var(--bd);border-right:1px solid var(--bd);text-align:left;white-space:pre-wrap;max-width:340px;vertical-align:top}
#rdr .grid2 thead th{position:sticky;top:0;background:var(--bg2);z-index:1;font-weight:700}
#rdr .grid2 .rn{color:var(--mu);text-align:right;background:var(--card);position:sticky;left:0;min-width:3em}
#rdr .grid2 tbody tr:hover td{background:var(--glow)}
#rdr .slide{background:var(--card);border:1px solid var(--bd);border-radius:20px;padding:18px 20px;margin-bottom:14px}
#rdr .slide small{color:var(--mu);font-weight:700;letter-spacing:1px;text-transform:uppercase;font-size:11px}
#rdr .slide h3{margin:6px 0 8px;font-size:1.2em}
#rdr .slide p{margin:.3em 0}
#rdr .imgv{height:100%;overflow:auto;display:flex;padding:12px}
#rdr .imgv img{margin:auto;display:block;border-radius:10px;cursor:zoom-in;max-width:100%;max-height:100%;object-fit:contain}
#rdr .imgv.z img{max-width:none;max-height:none;cursor:zoom-out}
#rdr iframe.fr{width:100%;height:100%;border:0;background:#fff}
#rdr video{max-width:100%;max-height:100%;border-radius:12px;background:#000}
#rdr .pn{position:absolute;left:50%;transform:translateX(-50%);bottom:calc(14px + var(--sa-bottom));display:flex;align-items:center;gap:6px;padding:5px 8px;border-radius:999px;background:var(--bg2);border:1px solid var(--a);box-shadow:0 10px 30px -8px rgba(0,0,0,.6);z-index:2;font-size:13px;color:var(--mu)}
#rdr .pn .chip{padding:6px 12px}
#rdr .note{font-size:12px;color:var(--mu);text-align:center;padding:8px 12px}
#rdr .more{display:block;margin:14px auto}
#rdr .pdfw{display:flex;flex-direction:column;align-items:center;gap:10px;padding:10px 8px 90px;width:max-content;min-width:100%}
#rdr .pdfp{background:#fff;box-shadow:0 6px 22px -8px rgba(0,0,0,.6);border-radius:4px;overflow:hidden;flex:none}
#rdr .pdfp canvas{display:block;width:100%;height:100%}
#rdr .kv{display:flex;gap:10px;text-align:left;padding:8px 0;border-bottom:1px solid var(--bd);font-size:14px;overflow-wrap:anywhere}
#rdr .kv b{width:84px;flex:none;color:var(--mu);font-weight:600}
#rdr .zr{display:flex;gap:12px;align-items:center;padding:11px 8px;border-bottom:1px solid var(--bd);cursor:pointer;font-size:14px}
#rdr .zr .grow{overflow-wrap:anywhere}
#rdr select.chip{max-width:60vw}
@media(min-width:800px){#rdr .rh{padding:12px 24px}#rdr .tb{padding:8px 24px}}
#rdr.lt{--bg:#fff;--bg2:#f3f3f3;--card:#f7f7f7;--tx:#1f1f1f;--mu:#666;--bd:#d8d8d8;--glow:rgba(43,87,154,.14);background:#fff}
#rdr.lt.k-docx{--a:#2b579a}#rdr.lt.k-pptx{--a:#c43e1c}#rdr.lt.k-txt{--a:#0067c0}
#rdr.lt.k-docx .rh,#rdr.lt.k-pptx .rh{color:#fff;backdrop-filter:none;border-bottom:0}
#rdr.lt.k-docx .rh{background:#2b579a}#rdr.lt.k-pptx .rh{background:#c43e1c}
#rdr.lt.k-docx .rh .chip,#rdr.lt.k-pptx .rh .chip{background:rgba(255,255,255,.16);border-color:rgba(255,255,255,.4);color:#fff}
#rdr.lt.k-docx .rh .rt span,#rdr.lt.k-pptx .rh .rt span{color:rgba(255,255,255,.85)}
#rdr.lt.k-txt .rh{background:#fff;backdrop-filter:none}
#rdr.k-docx .pn,#rdr.k-pptx .pn,#rdr.k-txt .pn,#rdr.k-vid .pn,#rdr.k-aud .pn{bottom:auto;top:calc(64px + var(--sa-top));left:auto;right:10px;transform:none;opacity:.88}
#rdr.pfs{padding-top:0}

`;document.head.appendChild(st);

const R=document.createElement('div');R.id='rdr';document.body.appendChild(R);
const q=s=>R.querySelector(s);
const P={fs:16,wrap:1,ln:null};try{Object.assign(P,JSON.parse(localStorage.getItem('alpha.rd')||'{}'))}catch(e){}
const sv=()=>{try{localStorage.setItem('alpha.rd',JSON.stringify(P))}catch(e){}};
const MIME={png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',gif:'image/gif',webp:'image/webp',svg:'image/svg+xml',bmp:'image/bmp',avif:'image/avif',mp4:'video/mp4',webm:'video/webm',mov:'video/quicktime',m4v:'video/mp4',mp3:'audio/mpeg',wav:'audio/wav',ogg:'audio/ogg',m4a:'audio/mp4',aac:'audio/aac',flac:'audio/flac',pdf:'application/pdf'};
const kindOf=f=>{const e=ext(f.name),t=f.type||'';
 if(/^(heic|heif)$/.test(e)||/hei[cf]/.test(t))return'heic';
 if(t.startsWith('image')||/^(png|jpe?g|gif|webp|svg|bmp|avif|ico|tiff?|jfif|apng)$/.test(e))return'img';
 if(t.startsWith('video')||/^(mp4|webm|mov|m4v|mkv|avi|3gp|ogv|mpe?g|wmv|flv)$/.test(e))return'vid';
 if(t.startsWith('audio')||/^(mp3|wav|ogg|oga|m4a|aac|flac|opus|amr|wma|mid|midi)$/.test(e))return'aud';
 if(e=='pdf'||t.includes('pdf'))return'pdf';
 if(/^(docx|docm|dotx)$/.test(e))return'docx';if(/^(pptx|pptm|potx|ppsx)$/.test(e))return'pptx';if(/^(xlsx|xlsm|xltx)$/.test(e))return'xlsx';
 if(/^(odt|ods|odp|ott|ots|otp)$/.test(e))return'od';
 if(e=='epub')return'epub';if(e=='rtf')return'rtf';if(e=='ipynb')return'ipynb';
 if(/^(doc|dot|xls|xlt|ppt|pot|pps|wps)$/.test(e))return'ole';
 if(/^(zip|jar|war|apk|aab|xpi|crx|pages|numbers|key)$/.test(e))return'zip';
 if(/^(gz|tgz)$/.test(e))return'gz';
 if(/^(rar|7z|tar|bz2|xz|iso|dmg|cab|z)$/.test(e))return'arc';
 if(e=='md'||e=='markdown')return'md';
 if(e=='csv'||e=='tsv')return'csv';
 if(e=='json')return'json';
 if(e=='html'||e=='htm')return'html';
 if(/^(txt|text|log|jsonl|xml|css|scss|less|js|mjs|cjs|ts|tsx|jsx|py|java|kt|c|h|cpp|hpp|cs|go|rs|rb|php|sh|bash|zsh|bat|ps1|sql|yml|yaml|toml|ini|cfg|conf|env|properties|gradle|swift|dart|lua|r|pl|vue|svelte|tex|bib|srt|vtt|diff|patch|rst|adoc|org|nfo|gpx|kml|plist|lock)$/.test(e))return'txt';
 if(istx(f)||fcat(f)=='code'||fcat(f)=='txt')return'txt';
 return'bin'};
const isCode=f=>fcat(f)=='code'&&!/^(md|markdown)$/.test(ext(f.name));

let cur=null,url=null,sib=[],tok=0,zoom=0,ctl=null;
const freeCtl=()=>{try{OFX.closeShow&&OFX.closeShow()}catch(e){}if(ctl){try{ctl.destroy&&ctl.destroy()}catch(e){}ctl=null}};
const setK=(k,light)=>{[...R.classList].forEach(c=>{if(/^k-/.test(c)||c=='lt')R.classList.remove(c)});if(!k)return;R.classList.add('k-'+k);if(light||k=='docx'||k=='pptx')R.classList.add('lt')};

/* ---------- helpers ---------- */
function copyText(t){const done=()=>toast('Copied');try{navigator.clipboard.writeText(t).then(done,fb)}catch(e){fb()}function fb(){const a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();try{document.execCommand('copy');done()}catch(e){toast('Copy failed')}a.remove()}}
function inl(s){s=esc(s);return s.replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,!?:;]|$)/g,'$1<i>$2</i>').replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')}
function md(t){const out=[],L=t.replace(/\r/g,'').split('\n'),LI=/^\s*([-*+]|\d+\.)\s+/;let i=0;
 while(i<L.length){const l=L[i];let m;
  if(/^```/.test(l)){const b=[];i++;while(i<L.length&&!/^```/.test(L[i]))b.push(L[i++]);i++;out.push('<pre><code>'+esc(b.join('\n'))+'</code></pre>');continue}
  if(m=l.match(/^(#{1,6})\s+(.*)/)){out.push(`<h${m[1].length}>${inl(m[2])}</h${m[1].length}>`);i++;continue}
  if(/^\s*([-*_]\s*){3,}$/.test(l)){out.push('<hr>');i++;continue}
  if(/^>\s?/.test(l)){const b=[];while(i<L.length&&/^>\s?/.test(L[i]))b.push(L[i++].replace(/^>\s?/,''));out.push('<blockquote>'+inl(b.join(' '))+'</blockquote>');continue}
  if(LI.test(l)){const ol=/^\s*\d+\./.test(l),b=[];while(i<L.length&&LI.test(L[i]))b.push('<li>'+inl(L[i++].replace(LI,''))+'</li>');out.push((ol?'<ol>':'<ul>')+b.join('')+(ol?'</ol>':'</ul>'));continue}
  if(!l.trim()){i++;continue}
  const b=[];while(i<L.length&&L[i].trim()&&!/^(```|#{1,6}\s|>|\s*([-*+]|\d+\.)\s)/.test(L[i]))b.push(L[i++]);out.push('<p>'+inl(b.join(' '))+'</p>')}
 return out.join('')}
function parseCsv(t,d){const out=[];let r=[],c='',qt=0;for(let i=0;i<t.length;i++){const ch=t[i];if(qt){if(ch=='"'){if(t[i+1]=='"'){c+='"';i++}else qt=0}else c+=ch}else if(ch=='"')qt=1;else if(ch==d){r.push(c);c=''}else if(ch=='\n'){r.push(c);out.push(r);r=[];c=''}else if(ch!='\r')c+=ch}if(c||r.length){r.push(c);out.push(r)}return out}
function gridHtml(rows,head=true,max=1000){const w=Math.max(1,...rows.slice(0,max+1).map(r=>r.length)),hd=head?rows[0]||[]:null,body=head?rows.slice(1,max+1):rows.slice(0,max);
 let h='<div class="tw"><table class="grid2">';
 if(hd)h+='<thead><tr><th class="rn">#</th>'+Array.from({length:w},(_,i)=>`<th>${esc(String(hd[i]??''))}</th>`).join('')+'</tr></thead>';
 h+='<tbody>'+body.map((r,n)=>`<tr><td class="rn">${n+1}</td>`+Array.from({length:w},(_,i)=>`<td>${esc(String(r[i]??''))}</td>`).join('')+'</tr>').join('')+'</tbody></table>';
 const tot=head?rows.length-1:rows.length;if(tot>max)h+=`<div class="note">Showing first ${max} of ${tot} rows. Use Save for the full file.</div>`;
 return h+'</div>'}

/* ---------- minimal zip reader (docx / pptx / xlsx) ---------- */
async function unzip(buf){return OFX.unzip(buf)}
const REL='http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const rid=n=>n.getAttributeNS(REL,'embed')||n.getAttributeNS(REL,'id')||n.getAttribute('r:embed')||n.getAttribute('r:id');
const absP=(base,t)=>{if(t.startsWith('/'))return t.slice(1);const o=base.split('/').slice(0,-1);for(const x of t.split('/')){if(x=='..')o.pop();else if(x!='.')o.push(x)}return o.join('/')};
async function mediaOf(z,doc,relPath,basePath){const m={},rl={},rs=await z.get(relPath);if(rs)for(const r of tag(xml(rs),'Relationship'))rl[r.getAttribute('Id')]=r.getAttribute('Target');const im={};
 for(const n of [...tag(doc,'blip'),...tag(doc,'imagedata')]){const id=rid(n);if(id&&!im[id]&&rl[id]&&!/^https?:/.test(rl[id])){try{const b=await z.bin(absP(basePath,rl[id]));if(b)im[id]=bImg(b,rl[id])}catch(e){}}}return im}
const xml=s=>new DOMParser().parseFromString(s,'application/xml');
const tag=(n,t)=>[...n.getElementsByTagNameNS('*',t)];
const ch1=(n,t)=>[...n.children].find(c=>c.localName==t);
async function docxHtml(z){const s=await z.get('word/document.xml');if(!s)throw new Error('docx');const dx=xml(s),body=tag(dx,'body')[0],im=await mediaOf(z,dx,'word/_rels/document.xml.rels','word/document.xml');
 const para=p=>{let h='';for(const r of tag(p,'r')){let x='';for(const c of r.childNodes){const n=c.localName;if(n=='t')x+=esc(c.textContent);else if(n=='tab')x+='&emsp;';else if(n=='br'||n=='cr')x+='<br>'}
   const rp=ch1(r,'rPr');if(rp){const on=t=>{const e=ch1(rp,t);return e&&!/^(0|false)$/.test(e.getAttribute('w:val')||'')};if(on('b'))x='<b>'+x+'</b>';if(on('i'))x='<i>'+x+'</i>';if(on('u'))x='<u>'+x+'</u>'}for(const bl of (tag(r,'blip').length?tag(r,'blip'):tag(r,'imagedata'))){const u=im[rid(bl)];if(u)x+=`<img src="${u}" style="max-width:100%;height:auto">`}h+=x}
  const pp=ch1(p,'pPr'),ps=pp&&ch1(pp,'pStyle'),sv2=ps?ps.getAttribute('w:val')||'':'',hm=sv2.match(/^heading\s?(\d)/i);
  if(!/<img/.test(h)&&!h.replace(/<[^>]+>/g,'').trim())return'<p>&nbsp;</p>';
  if(/^title$/i.test(sv2))return`<h1>${h}</h1>`;if(hm)return`<h${Math.min(6,+hm[1]+1)}>${h}</h${Math.min(6,+hm[1]+1)}>`;
  if(pp&&(ch1(pp,'numPr')||/^list/i.test(sv2)))return`<div class="li">• ${h}</div>`;return`<p>${h}</p>`};
 const walk=n=>{let o='';for(const c of n.children){const l=c.localName;if(l=='p')o+=para(c);else if(l=='tbl')o+='<table>'+[...c.children].filter(r=>r.localName=='tr').map(r=>'<tr>'+[...r.children].filter(d=>d.localName=='tc').map(d=>'<td>'+[...d.children].filter(x=>x.localName=='p').map(para).join('')+'</td>').join('')+'</tr>').join('')+'</table>';else if(l=='sdt'){const sc=ch1(c,'sdtContent');if(sc)o+=walk(sc)}}return o};
 return walk(body)}
async function pptxHtml(z){const ns=z.names.filter(n=>/^ppt\/slides\/slide\d+\.xml$/.test(n)).sort((a,b)=>a.match(/\d+/)[0]-b.match(/\d+/)[0]);if(!ns.length)throw new Error('pptx');let h='';
 for(let i=0;i<ns.length;i++){const d=xml(await z.get(ns[i])),im=await mediaOf(z,d,ns[i].replace(/([^/]+)$/,'_rels/$1.rels'),ns[i]),pics=tag(d,'blip').map(b=>im[rid(b)]).filter(Boolean),ps=tag(d,'p').map(p=>tag(p,'t').map(t=>t.textContent).join('')).filter(x=>x.trim());
  h+=`<div class="slide"><small>Slide ${i+1}</small>${ps.length?`<h3>${esc(ps[0])}</h3>`+ps.slice(1).map(x=>`<p>${esc(x)}</p>`).join(''):pics.length?'':'<p style="color:var(--mu)">(no text)</p>'}${pics.map(u=>`<img src="${u}" style="max-width:100%;border-radius:10px;margin-top:8px">`).join('')}</div>`}return h}
const colN=r=>{let n=0;for(const ch of (r.match(/^[A-Z]+/)||[''])[0])n=n*26+ch.charCodeAt(0)-64;return n-1};
async function xlsxSheets(z){const ss=[],sx=await z.get('xl/sharedStrings.xml');if(sx)for(const si of tag(xml(sx),'si'))ss.push(tag(si,'t').map(t=>t.textContent).join(''));
 const wb=await z.get('xl/workbook.xml'),nm=wb?tag(xml(wb),'sheet').map(s=>s.getAttribute('name')):[];
 const fs=z.names.filter(n=>/^xl\/worksheets\/sheet\d+\.xml$/.test(n)).sort((a,b)=>a.match(/\d+/)[0]-b.match(/\d+/)[0]);if(!fs.length)throw new Error('xlsx');const out=[];
 for(let i=0;i<fs.length;i++){const rows=[];for(const rw of tag(xml(await z.get(fs[i])),'row')){const r=[];for(const c of rw.children){if(c.localName!='c')continue;const t=c.getAttribute('t'),v=ch1(c,'v'),idx=colN(c.getAttribute('r')||'');let val='';if(t=='s'&&v)val=ss[+v.textContent]??'';else if(t=='inlineStr')val=tag(c,'t').map(x=>x.textContent).join('');else if(v)val=v.textContent;if(idx>=0&&idx<60)r[idx]=val}
   const rn=(+rw.getAttribute('r'))-1;if(rn>=0&&rn<5000)rows[rn]=r}
  out.push({name:nm[i]||'Sheet '+(i+1),rows:Array.from(rows,r=>r||[])})}return out}

/* ---------- never-fail helpers ---------- */
const MM={png:'image/png',jpg:'image/jpeg',gif:'image/gif',webp:'image/webp',pdf:'application/pdf',mp4:'video/mp4',webm:'video/webm',mp3:'audio/mpeg',ogg:'audio/ogg',wav:'audio/wav'};
function sniff(u){const s=(a,o=0)=>a.every((b,i)=>u[o+i]===b);
 if(s([0x89,0x50,0x4e,0x47]))return['img',MM.png];if(s([0xff,0xd8,0xff]))return['img',MM.jpg];if(s([0x47,0x49,0x46,0x38]))return['img',MM.gif];
 if(s([0x52,0x49,0x46,0x46])&&s([0x57,0x45,0x42,0x50],8))return['img',MM.webp];
 if(s([0x25,0x50,0x44,0x46]))return['pdf',MM.pdf];
 if(s([0x50,0x4b,3,4]))return['zip','application/zip'];if(s([0xd0,0xcf,0x11,0xe0]))return['ole','application/x-ole-storage'];if(s([0x1f,0x8b]))return['gz','application/gzip'];if(s([0x7b,0x5c,0x72,0x74,0x66]))return['rtf','application/rtf'];
 if(s([0x52,0x49,0x46,0x46])&&s([0x57,0x41,0x56,0x45],8))return['aud',MM.wav];
 if(s([0x66,0x74,0x79,0x70],4)){const br=String.fromCharCode(...u.slice(8,12));if(!/^(heic|heix|hevc|mif1|avif)/.test(br))return['vid',MM.mp4]}
 if(s([0x1a,0x45,0xdf,0xa3]))return['vid',MM.webm];
 if(s([0x49,0x44,0x33])||s([0xff,0xfb])||s([0xff,0xf3]))return['aud',MM.mp3];if(s([0x4f,0x67,0x67,0x53]))return['aud',MM.ogg];
 return null}
async function rawHtml(blob){const n=Math.min(blob.size,4096),u=new Uint8Array(await blob.slice(0,n).arrayBuffer());
 if(!u.length)return'<div class="note">This file has no content.</div>';
 const info=`<div class="note">${sz(blob.size)} · showing the file's content as it is. Use ⬇ to save it.</div>`;let pr=0;for(const b of u)if(b==9||b==10||b==13||(b>=32&&b<127)||b>=128)pr++;
 if(pr/u.length>.92&&!u.includes(0))return info+'<pre style="white-space:pre-wrap;overflow-wrap:anywhere;font:13px/1.6 ui-monospace,Menlo,Consolas,monospace;margin:0">'+esc(new TextDecoder().decode(u))+(blob.size>n?'\n…':'')+'</pre>';
 let h='';for(let i=0;i<u.length;i+=16){const r=[...u.slice(i,i+16)];h+=i.toString(16).padStart(6,'0')+'  '+r.map(b=>b.toString(16).padStart(2,'0')).join(' ').padEnd(47)+'  '+r.map(b=>b>=32&&b<127?String.fromCharCode(b):'·').join('')+'\n'}
 return info+'<pre style="font:12px/1.5 ui-monospace,Menlo,Consolas,monospace;overflow:auto;margin:0">'+esc(h)+'</pre>'}
const MTV=['video/mp4','video/webm','video/x-matroska','video/quicktime','video/3gpp','video/ogg'],MTA=['audio/mpeg','audio/mp4','audio/aac','audio/ogg','audio/wav','audio/webm','audio/flac','audio/x-m4a'];
async function wavFrom(blob){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw 0;const ctx=new AC();
 try{const ab=await ctx.decodeAudioData(await blob.arrayBuffer());const ch=Math.min(2,ab.numberOfChannels),n=ab.length,sr=ab.sampleRate;if(n*ch*2>200e6)throw 0;
  const buf=new ArrayBuffer(44+n*ch*2),dv=new DataView(buf),W=(o,t)=>{for(let i=0;i<t.length;i++)dv.setUint8(o+i,t.charCodeAt(i))};
  W(0,'RIFF');dv.setUint32(4,36+n*ch*2,true);W(8,'WAVEfmt ');dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,ch,true);dv.setUint32(24,sr,true);dv.setUint32(28,sr*ch*2,true);dv.setUint16(32,ch*2,true);dv.setUint16(34,16,true);W(36,'data');dv.setUint32(40,n*ch*2,true);
  const cs=[];for(let c=0;c<ch;c++)cs.push(ab.getChannelData(c));let o=44;for(let i=0;i<n;i++)for(let c=0;c<ch;c++){const v=Math.max(-1,Math.min(1,cs[c][i]));dv.setInt16(o,v<0?v*32768:v*32767,true);o+=2}
  return new Blob([buf],{type:'audio/wav'})}finally{try{ctx.close()}catch(e){}}}
let ffP=null;
function ffLoad(){if(ffP)return ffP;ffP=(async()=>{const J='https://cdn.jsdelivr.net/npm/',FF=J+'@ffmpeg/ffmpeg@0.12.10/dist/umd/',CO=J+'@ffmpeg/core@0.12.6/dist/umd/';
  const bu=async(u,t)=>{const r=await fetch(u);if(!r.ok)throw new Error('net');return URL.createObjectURL(new Blob([await r.arrayBuffer()],{type:t}))};
  if(!window.FFmpegWASM)await new Promise((res,rej)=>{const sc=document.createElement('script');sc.src=FF+'ffmpeg.js';sc.onload=res;sc.onerror=()=>rej(new Error('net'));document.head.appendChild(sc)});
  const ff=new FFmpegWASM.FFmpeg();await ff.load({classWorkerURL:await bu(FF+'814.ffmpeg.js','text/javascript'),coreURL:await bu(CO+'ffmpeg-core.js','text/javascript'),wasmURL:await bu(CO+'ffmpeg-core.wasm','application/wasm')});return ff})().catch(e=>{ffP=null;throw e});return ffP}
async function ffConv(blob,isV,onp){if(blob.size>350e6)throw new Error('big');const ff=await ffLoad(),out=isV?'out.mp4':'out.mp3',h=({progress})=>{if(onp&&isFinite(progress))onp(Math.max(0,Math.min(99,Math.round(progress*100))))};
 ff.on('progress',h);try{await ff.writeFile('in.bin',new Uint8Array(await blob.arrayBuffer()));
  const a=isV?['-i','in.bin','-c:v','libx264','-preset','ultrafast','-crf','30','-pix_fmt','yuv420p','-vf',"scale=w='trunc(min(1280,iw)/2)*2':h=-2",'-c:a','aac','-b:a','128k','-movflags','+faststart',out]:['-i','in.bin','-vn','-c:a','libmp3lame','-q:a','4',out];
  if(await ff.exec(a)!==0)throw new Error('ff');const d=await ff.readFile(out);return new Blob([d],{type:isV?'video/mp4':'audio/mpeg'})}
 finally{try{ff.off('progress',h)}catch(e){}try{await ff.deleteFile('in.bin')}catch(e){}try{await ff.deleteFile(out)}catch(e){}}}
/* media that the browser won't play as-is: 1) try other container types  2) decode to WAV (audio)  3) convert with ffmpeg.wasm when online */
async function mediaFb(el,blob,fail,soft){if(el._busy)return;const isV=el.tagName=='VIDEO';
 const st=t=>{if(!el.isConnected)return;let d=el._st;if(!t){if(d)d.remove();el._st=null;return}if(!d){d=document.createElement('div');d.style.cssText='text-align:center;padding:8px;font-size:13px;opacity:.85';el.insertAdjacentElement('beforebegin',d);el._st=d}d.textContent=t};
 const put=b=>{if(el._u)URL.revokeObjectURL(el._u);el._u=URL.createObjectURL(b);el.src=el._u;el.load()};
 if(el._s===undefined)el._s=soft?2:0;
 if(el._s==0){if(!el._q)el._q=(isV?MTV:MTA).filter(t=>t!=(blob.type||''));if(el._q.length){put(new Blob([blob],{type:el._q.shift()}));return}el._s=1}
 if(el._s==1){el._s=2;if(!isV&&blob.size<80e6){el._busy=1;try{st('Preparing audio…');const w=await wavFrom(blob);st('');el._busy=0;if(!el.isConnected)return;put(w);return}catch(e){st('')}el._busy=0}}
 if(el._s==2){el._s=3;el._busy=1;try{st('Converting for playback… this can take a while the first time');const o=await ffConv(blob,isV,p=>st('Converting for playback… '+p+'%'));st('');el._busy=0;if(!el.isConnected)return;put(o);return}catch(e){st('')}el._busy=0}
 if(!soft&&fail)fail()}
async function rawFallback(blob,why){return infoView(blob,why)}
const XU=[];
async function imgFallback(blob){const rd=b=>new Promise((r,j)=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.onerror=j;fr.readAsDataURL(b)});
 if(blob.size<40e6){try{const d=await rd(new Blob([blob],{type:blob.type&&blob.type.startsWith('image')?blob.type:'image/png'})),im=new Image();im.src=d;await im.decode();return d}catch(e){}}
 for(const o of [null,{resizeWidth:2400,resizeQuality:'low'},{resizeHeight:2400,resizeQuality:'low'}]){try{const bm=o?await createImageBitmap(blob,o):await createImageBitmap(blob),c=document.createElement('canvas');c.width=bm.width;c.height=bm.height;c.getContext('2d').drawImage(bm,0,0);return c.toDataURL('image/jpeg',.92)}catch(e){}}return null}


/* ---------- v15 universal viewer additions ---------- */
const NEEDBUF=new Set(['txt','md','json','csv','html','docx','pptx','xlsx','od','epub','zip','rtf','ipynb','ole','gz']);
function dec(b){const u=b instanceof Uint8Array?b:new Uint8Array(b);if(u[0]==0xEF&&u[1]==0xBB&&u[2]==0xBF)return new TextDecoder().decode(u.subarray(3));
 if(u[0]==0xFF&&u[1]==0xFE)return new TextDecoder('utf-16le').decode(u.subarray(2));if(u[0]==0xFE&&u[1]==0xFF)return new TextDecoder('utf-16be').decode(u.subarray(2));
 const n=Math.min(u.length,400);if(n>=4){let a=0,b2=0;for(let i=0;i+1<n;i+=2){if(u[i+1]==0)a++;if(u[i]==0)b2++}if(a/(n/2)>.3&&a>b2)return new TextDecoder('utf-16le').decode(u);if(b2/(n/2)>.3)return new TextDecoder('utf-16be').decode(u)}
 try{return new TextDecoder('utf-8',{fatal:true}).decode(u)}catch(e){return new TextDecoder('windows-1252').decode(u)}}
function looksText(u){if(!u.length)return true;let bad=0;const n=Math.min(u.length,8192);for(let i=0;i<n;i++){const c=u[i];if(c==0)return u[0]==0xFF&&u[1]==0xFE||u[0]==0xFE&&u[1]==0xFF;if(c<9||(c>13&&c<32))bad++}return bad/n<.02}
function strs(u,min=6){const A=[],L=new TextDecoder('windows-1252'),n=u.length;let st=-1,i;
 for(i=0;i<=n;i++){const c=i<n?u[i]:0,ok=(c>=32&&c<127)||c==9;if(ok){if(st<0)st=i}else{if(st>=0&&i-st>=min)A.push([st,L.decode(u.subarray(st,i))]);st=-1}}
 for(const al of [0,1]){let s2=-1,t='';for(i=al;i+1<=n;i+=2){const lo=u[i],hi=i+1<n?u[i+1]:1,ok=hi==0&&((lo>=32&&lo<127)||lo==9);if(ok){if(s2<0){s2=i;t=''}t+=String.fromCharCode(lo)}else{if(s2>=0&&t.length>=min)A.push([s2,t]);s2=-1;t=''}}if(s2>=0&&t.length>=min)A.push([s2,t])}
 A.sort((a,b)=>a[0]-b[0]);return A.map(a=>a[1]).join('\n').slice(0,300000)}
const bImg=(b,name)=>{let t='';for(let i=0;i<b.length;i+=32768)t+=String.fromCharCode.apply(null,b.subarray(i,i+32768));return 'data:'+(MIME[ext(name)]||'application/octet-stream')+';base64,'+btoa(t)};
const bUrl=(b,name)=>{const u=URL.createObjectURL(new Blob([b],{type:MIME[ext(name)]||'application/octet-stream'}));XU.push(u);return u};
const para2=t=>t.split('\n').map(l=>l.trim()?`<p>${esc(l)}</p>`:'').join('');
function rtfText(s){let o='',i=0,sk=0,st=[];const N=s.length,SK=/^(fonttbl|colortbl|stylesheet|info|pict|header|footer|headerl|headerr|footerl|footerr|footnote|object|themedata|colorschememapping|latentstyles|datastore|listtable|listoverridetable|rsidtbl|generator|xmlnstbl|fldinst|bkmkstart|bkmkend)$/,W1=new TextDecoder('windows-1252'),MP={bullet:'•',emdash:'—',endash:'–',lquote:'‘',rquote:'’',ldblquote:'“',rdblquote:'”',tab:'\t',par:'\n',line:'\n',page:'\n',sect:'\n'};
 while(i<N){const c=s[i];
  if(c=='{'){st.push(sk);i++}else if(c=='}'){sk=st.pop()||0;i++}
  else if(c=='\\'){const d=s[i+1];
   if(d=='\\'||d=='{'||d=='}'){if(!sk)o+=d;i+=2}
   else if(d=="'"){if(!sk)o+=W1.decode(Uint8Array.of(parseInt(s.substr(i+2,2),16)||63));i+=4}
   else if(d=='*'){sk=1;i+=2}
   else{const m=/^\\([a-zA-Z]+)(-?\d+)? ?/.exec(s.slice(i,i+40));if(!m){i+=2;continue}i+=m[0].length;const w=m[1];
    if(SK.test(w))sk=1;else if(w=='u'){let n=+m[2];if(n<0)n+=65536;if(!sk)o+=String.fromCharCode(n);if(s[i]=='\\'&&s[i+1]=="'")i+=4;else i++}
    else if(!sk&&MP[w]!==undefined)o+=MP[w]}}
  else{if(!sk&&c!='\n'&&c!='\r')o+=c;i++}}
 return o}

/* old Word (.doc): read the real text through the OLE container + piece table; falls back to raw strings for .xls/.ppt */
function oleText(u){
 try{const dv=new DataView(u.buffer,u.byteOffset,u.byteLength),U16=o=>dv.getUint16(o,true),U32=o=>dv.getUint32(o,true),E=0xFFFFFFFA;
  if(u.length<512||U32(0)!=0xE011CFD0)throw 0;
  const ss=1<<U16(30),ms=1<<U16(32),dirS=U32(48),cut=U32(56),mfS=U32(60);let dS=U32(68);const nD=U32(72),dif=[];
  for(let i=0;i<109;i++){const v=U32(76+i*4);if(v<E)dif.push(v)}
  for(let i=0;i<nD&&dS<E;i++){const o=(dS+1)*ss;for(let j=0;j<ss/4-1;j++){const v=U32(o+j*4);if(v<E)dif.push(v)}dS=U32(o+ss-4)}
  const fat=[];for(const d of dif){const o=(d+1)*ss;for(let j=0;j<ss/4&&o+j*4+4<=u.length;j++)fat.push(U32(o+j*4))}
  const chain=(st,F,sz,get)=>{const P=[],seen=new Set;let n=0;while(st<E&&st<F.length&&!seen.has(st)){seen.add(st);const b=get(st);if(!b)break;P.push(b);n+=b.length;st=F[st]}const r=new Uint8Array(n);let o=0;for(const b of P){r.set(b,o);o+=b.length}return r};
  const big=i=>{const o=(i+1)*ss;return o<u.length?u.subarray(o,Math.min(u.length,o+ss)):null};
  const dir=chain(dirS,fat,ss,big),ent=[];
  for(let o=0;o+128<=dir.length;o+=128){const dd=new DataView(dir.buffer,dir.byteOffset+o,128),nl=dd.getUint16(64,true);let nm='';for(let i=0;i+2<=nl-2;i+=2)nm+=String.fromCharCode(dd.getUint16(i,true));ent.push({nm,t:dir[o+66],st:dd.getUint32(116,true),sz:dd.getUint32(120,true)})}
  const root=ent.find(e=>e.t==5),mini=root?chain(root.st,fat,ss,big):new Uint8Array(0);
  const mf32=chain(mfS,fat,ss,big),mfat=[];{const d2=new DataView(mf32.buffer,mf32.byteOffset,mf32.byteLength);for(let i=0;i+4<=mf32.length;i+=4)mfat.push(d2.getUint32(i,true))}
  const rd=e=>{if(!e)return null;if(e.sz<cut){const r=chain(e.st,mfat,ms,i=>{const o=i*ms;return o<mini.length?mini.subarray(o,Math.min(mini.length,o+ms)):null});return r.subarray(0,e.sz)}return chain(e.st,fat,ss,big).subarray(0,e.sz)};
  const wd=rd(ent.find(e=>e.nm=='WordDocument'));if(!wd||wd.length<0x200)throw 0;
  const w=new DataView(wd.buffer,wd.byteOffset,wd.byteLength),W16=o=>w.getUint16(o,true),W32=o=>w.getUint32(o,true);
  if(W16(0)!=0xA5EC)throw 0;const fl=W16(10);if(fl&0x100)return '(This Word document is password-protected, so its text cannot be read here.)';
  const tb=rd(ent.find(e=>e.nm==((fl&0x200)?'1Table':'0Table')));if(!tb)throw 0;
  const csw=W16(32),cslw=W16(34+csw*2),lw=36+csw*2,ccp=W32(lw+12),blob=lw+cslw*4+2,fcClx=W32(blob+33*8),lcbClx=W32(blob+33*8+4);
  const T=new DataView(tb.buffer,tb.byteOffset,tb.byteLength);let i=fcClx;const end=fcClx+lcbClx;
  while(i<end&&tb[i]==1)i+=3+T.getUint16(i+1,true);
  if(tb[i]!=2)throw 0;const lcb=T.getUint32(i+1,true),pl=i+5,n=(lcb-4)/12|0;let t='';const L1=new TextDecoder('windows-1252');
  for(let k=0;k<n;k++){const a=T.getUint32(pl+k*4,true),b=T.getUint32(pl+k*4+4,true);if(a>=ccp)break;const len=Math.min(b,ccp)-a,fc=T.getUint32(pl+(n+1)*4+k*8+2,true);
   if(fc&0x40000000){const o=(fc&0x3FFFFFFF)/2;t+=L1.decode(wd.subarray(o,o+len))}else{const o=fc&0x3FFFFFFF;t+=new TextDecoder('utf-16le').decode(wd.subarray(o,o+len*2))}}
  let o='';const stk=[];
  for(const ch of t){const c=ch.charCodeAt(0);
   if(c==0x13)stk.push(0);else if(c==0x14){if(stk.length)stk[stk.length-1]=1}else if(c==0x15)stk.pop();
   else if(stk.includes(0))continue;
   else if(c==13||c==11)o+='\n';else if(c==12)o+='\n\n';else if(c==7)o+='\u0007';else if(c==0x1E)o+='-';else if(c==0x1F||c==1||c==8)continue;else if(c<32&&c!=9&&c!=10)continue;else o+=ch}
  o=o.replace(/\u0007\u0007/g,'\n').replace(/\u0007/g,'  │  ');
  if(!o.trim())throw 0;return o}
 catch(e){return strs(u,8)}}
async function sheetsView(sh,B,tb){const show=i=>{B.innerHTML=gridHtml(sh[i].rows,true);B.scrollTop=0;tb.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',+b.dataset.t.slice(2)==i))};
 tb.innerHTML=sh.map((s,i)=>tbBtn('s:'+i,esc(s.name),i==0)).join('');tb.onclick=e=>{const b=e.target.closest('[data-t]');if(b)show(+b.dataset.t.slice(2))};show(0)}
async function odView(z,f,B,tb){const cx=await z.get('content.xml');if(!cx)throw new Error('od');const d=xml(cx),bd=tag(d,'body')[0],ft=bd&&bd.children[0],kd=ft?ft.localName:'text',im={};
 for(const n of tag(d,'image')){const h=n.getAttribute('xlink:href');if(h&&!im[h]&&!/^https?:/.test(h)){const b=await z.bin(h);if(b)im[h]=bImg(b,h)}}
 const T=n=>{let o='';for(const c of n.childNodes){if(c.nodeType==3)o+=esc(c.nodeValue);else if(c.nodeType==1){const l=c.localName;if(l=='s')o+='&nbsp;'.repeat(+(c.getAttribute('text:c')||1));else if(l=='tab')o+='&emsp;';else if(l=='line-break')o+='<br>';else if(l=='image'){const u=im[c.getAttribute('xlink:href')];if(u)o+=`<img src="${u}" style="max-width:100%">`}else if(l=='annotation'||l=='note')continue;else o+=T(c)}}return o};
 const W=n=>{let o='';for(const c of n.children){const l=c.localName;if(l=='h'){const v=Math.min(6,(+c.getAttribute('text:outline-level')||1)+1);o+=`<h${v}>${T(c)}</h${v}>`}else if(l=='p')o+=`<p>${T(c)||'&nbsp;'}</p>`;else if(l=='list')o+='<ul>'+[...c.children].map(li=>'<li>'+W(li)+'</li>').join('')+'</ul>';else if(l=='table')o+='<table>'+tag(c,'table-row').map(r=>'<tr>'+[...r.children].filter(x=>/table-cell/.test(x.localName)).map(x=>'<td>'+W(x)+'</td>').join('')+'</tr>').join('')+'</table>';else if(['section','frame','text-box','body','text'].includes(l))o+=W(c);else if(l=='image'){const u=im[c.getAttribute('xlink:href')];if(u)o+=`<img src="${u}" style="max-width:100%">`}}return o};
 if(kd=='spreadsheet'){const sh=[];for(const t of tag(ft,'table')){if(t.localName!='table'||t.parentNode.localName=='table-cell')continue;const rows=[];for(const r of tag(t,'table-row')){const row=[];for(const c of r.children){if(!/table-cell/.test(c.localName))continue;const rp=Math.min(+c.getAttribute('table:number-columns-repeated')||1,60),v=tag(c,'p').map(p=>p.textContent).join('\n');for(let k=0;k<rp&&row.length<60;k++)row.push(v)}
   const rr=Math.min(+r.getAttribute('table:number-rows-repeated')||1,row.some(x=>x)?50:1);for(let k=0;k<rr&&rows.length<5000;k++)rows.push(row)}while(rows.length&&!rows[rows.length-1].some(x=>x))rows.pop();sh.push({name:t.getAttribute('table:name')||'Sheet '+(sh.length+1),rows})}
  if(!sh.length)throw new Error('od');return sheetsView(sh,B,tb)}
 if(kd=='presentation'){let h='',n=0;for(const pg of tag(ft,'page')){if(pg.localName!='page')continue;n++;const ps=tag(pg,'p').map(p=>p.textContent).filter(x=>x.trim());h+=`<div class="slide"><small>Slide ${n}</small>${ps.length?`<h3>${esc(ps[0])}</h3>`+ps.slice(1).map(x=>`<p>${esc(x)}</p>`).join(''):''}${tag(pg,'image').map(x=>im[x.getAttribute('xlink:href')]).filter(Boolean).map(u=>`<img src="${u}" style="max-width:100%;border-radius:10px">`).join('')}</div>`}
  B.innerHTML=`<div class="pg">${h||'<p class="mu">(no text)</p>'}<div class="note">Text view. Use ⬇ Save for the original.</div></div>`;return}
 B.innerHTML=`<div class="pg pro">${W(ft)||'<p class="mu">This document has no text.</p>'}<div class="note">Text view of this document. Use ⬇ Save for the original.</div></div>`}
async function epubView(z,f,B,tb,live){const cn=await z.get('META-INF/container.xml'),op=cn&&tag(xml(cn),'rootfile')[0],ofp=op&&op.getAttribute('full-path');if(!ofp)throw new Error('epub');const od=xml(await z.get(ofp)),base=ofp.includes('/')?ofp.replace(/[^/]*$/,''):'',man={};
 tag(od,'item').forEach(i=>man[i.getAttribute('id')]=i.getAttribute('href'));const sp=tag(od,'itemref').map(r=>man[r.getAttribute('idref')]).filter(Boolean);if(!sp.length)throw new Error('epub');let ci=0;
 const res=(b,h)=>{const p=(b+h.split('#')[0]).split('/'),o=[];for(const s of p){if(s=='..')o.pop();else if(s&&s!='.')o.push(decodeURIComponent(s))}return o.join('/')};
 const show=async i=>{ci=(i+sp.length)%sp.length;const path=res(base,sp[ci]),raw=await z.get(path)||'';let d=new DOMParser().parseFromString(raw,'application/xhtml+xml');if(tag(d,'parsererror').length)d=new DOMParser().parseFromString(raw,'text/html');if(!live())return;
  const imgs={};for(const n of [...d.querySelectorAll('img'),...tag(d,'image')]){const h=n.getAttribute('src')||n.getAttribute('xlink:href');if(h&&!imgs[h]&&!/^(https?|data):/.test(h)){const bb=await z.bin(res(path.replace(/[^/]*$/,''),h));if(bb)imgs[h]=bImg(bb,h)}}
  const W=n=>{let o='';for(const c of n.childNodes){if(c.nodeType==3)o+=esc(c.nodeValue);else if(c.nodeType==1){const l=(c.localName||'').toLowerCase();if(/^(script|style|head|title)$/.test(l))continue;const inner=W(c);if(/^h[1-6]$/.test(l))o+=`<${l}>${inner}</${l}>`;else if(/^(p|div|li|blockquote|pre|tr|section|article)$/.test(l))o+=(l=='li'?'<div class="li">• ':'<p>')+inner+(l=='li'?'</div>':'</p>');else if(l=='br')o+='<br>';else if(/^(b|strong)$/.test(l))o+=`<b>${inner}</b>`;else if(/^(i|em)$/.test(l))o+=`<i>${inner}</i>`;else if(l=='img'||l=='image'){const u=imgs[c.getAttribute('src')||c.getAttribute('xlink:href')];if(u)o+=`<img src="${u}" style="max-width:100%">`}else o+=inner}}return o};
  B.innerHTML=`<div class="pg pro">${W(d.body||d.documentElement)||'<p class="mu">(blank page)</p>'}</div>`;B.scrollTop=0;const s=tb.querySelector('select');if(s)s.value=ci};
 tb.innerHTML=`<button class="chip" data-t="e:-1">‹</button><select class="chip">${sp.map((s,i)=>`<option value="${i}">${i+1} / ${sp.length}</option>`).join('')}</select><button class="chip" data-t="e:1">›</button><span class="sp"></span><button class="chip" data-t="fm">A−</button><button class="chip" data-t="fp">A＋</button>`;
 tb.onclick=e=>{const b=e.target.closest('[data-t]');if(!b)return;const a=b.dataset.t;if(a.startsWith('e:'))show(ci+ +a.slice(2));else{P.fs=Math.max(11,Math.min(30,P.fs+(a=='fp'?1:-1)));sv();R.style.setProperty('--rfs',P.fs+'px')}};tb.querySelector('select').onchange=e=>show(+e.target.value);await show(0)}
async function zipView(z,f,B,tb,live,note){tb.innerHTML='';tb.onclick=null;const nm=z.names,ico=n=>n.endsWith('/')?'📁':/\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(n)?'🖼':/\.(txt|md|json|xml|html?|css|js|csv|log|ya?ml)$/i.test(n)?'📝':'📄';
 const list=()=>{B.innerHTML=`<div class="pg" style="max-width:900px"><div class="note" style="text-align:left">${note||''}${nm.filter(n=>!n.endsWith('/')).length} files inside. Tap one to look at it.</div>${nm.slice(0,3000).map((n,i)=>`<div class="zr" data-z="${i}"><span>${ico(n)}</span><span class="grow">${esc(n)}</span><span class="mu">${n.endsWith('/')?'':sz(z.ent[n].us)}</span></div>`).join('')}</div>`;B.scrollTop=0;B.querySelectorAll('[data-z]').forEach(r=>r.onclick=()=>entry(+r.dataset.z))};
 const entry=async i=>{const n=nm[i];if(n.endsWith('/'))return;const e=z.ent[n];B.innerHTML=`<div class="pg"><button class="chip" id="zb">‹ Files</button><h3 style="margin:14px 0 8px;overflow-wrap:anywhere">${esc(n)}</h3><div id="zc"><div class="mu">Opening…</div></div></div>`;B.querySelector('#zb').onclick=list;const c=B.querySelector('#zc');
  if(e.us>60e6){c.innerHTML='<p class="mu">Too large to preview here ('+sz(e.us)+').</p>';return}
  try{const b=await z.bin(n);if(!live())return;const sv2=`<p><a class="btn" download="${esc(n.split('/').pop())}" href="${bUrl(b,n)}">⬇ Save this file</a></p>`;
   if(/\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(n))c.innerHTML=`<img src="${bImg(b,n)}" style="max-width:100%;border-radius:10px">`+sv2;
   else if(looksText(b)){c.innerHTML=`<pre style="white-space:pre-wrap;overflow-wrap:anywhere;font:13px/1.6 ui-monospace,Menlo,Consolas,monospace">${esc(dec(b).slice(0,200000))}</pre>`+sv2}
   else c.innerHTML='<p class="mu">No preview for this kind of file.</p>'+sv2}catch(x){c.innerHTML='<p class="mu">Could not open this entry.</p>'}};list()}
async function zipFallback(buf,blob,f,B,tb,live){try{const z=await unzip(buf);if(!live())return;await zipView(z,f,B,tb,live,'This file could not be opened as a document, so here is what is inside it. ')}catch(e){if(live())await infoView(blob)}}
async function nbView(txt,B){const j=JSON.parse(txt),cs=j.cells||(j.worksheets&&j.worksheets[0]&&j.worksheets[0].cells)||[],J=s=>Array.isArray(s)?s.join(''):String(s||'');let h='';
 for(const c of cs){const src=J(c.source||c.input);if(c.cell_type=='markdown')h+=`<div>${md(src)}</div>`;else{h+=`<small class="mu">In [${c.execution_count??' '}]</small><pre><code>${esc(src)}</code></pre>`;for(const o of c.outputs||[]){const dt=o.data||{};if(dt['image/png'])h+=`<img src="data:image/png;base64,${String(J(dt['image/png'])).replace(/\s/g,'')}" style="max-width:100%">`;else if(o.text||dt['text/plain'])h+=`<pre style="opacity:.85"><code>${esc(J(o.text||dt['text/plain']))}</code></pre>`;else if(o.traceback)h+=`<pre><code>${esc(J(o.traceback).replace(/\x1b\[[0-9;]*m/g,''))}</code></pre>`}}}
 B.innerHTML=`<div class="pg pro">${h||'<p class="mu">Empty notebook.</p>'}</div>`}
async function magicLabel(b){const u=new Uint8Array(await b.slice(0,300).arrayBuffer()),s=(a,o=0)=>a.every((x,i)=>u[o+i]===x),A=t=>[...t].map(c=>c.charCodeAt(0));
 const T=[[[0x37,0x7a,0xbc,0xaf],'7-Zip archive'],[A('Rar!'),'RAR archive'],[A('SQLite'),'SQLite database'],[[0x4d,0x5a],'Windows program'],[[0x7f,0x45,0x4c,0x46],'Linux program'],[A('BZh'),'bzip2 compressed'],[[0xfd,0x37,0x7a,0x58],'xz compressed'],[[0x50,0x4b,3,4],'ZIP-based file'],[[0xd0,0xcf,0x11,0xe0],'Old Microsoft Office file'],[[0x1f,0x8b],'gzip compressed'],[A('ID3'),'MP3 audio'],[[0x1a,0x45,0xdf,0xa3],'Matroska/WebM video']];
 for(const [m,l] of T)if(s(m))return l;if(s(A('ustar'),257))return'TAR archive';if(s(A('ftyp'),4))return'MP4/QuickTime/HEIF media ('+String.fromCharCode(...u.slice(8,12))+')';return''}
const WHY={vid:"Your browser can't play this video format (for example MKV, AVI or HEVC). Save it, or open it in a video player app.",aud:"Your browser can't play this audio format. Save it, or open it in a music app.",img:"Your browser can't show this image format (for example HEIC, RAW or TIFF). Save it, or open it in your gallery app.",heic:"HEIC/HEIF photos can't be shown by this browser. Save it, or open it in your gallery app.",arc:"This archive format can't be opened inside the browser. Save it, or open it in a file-manager app.",huge:"This file is too big to open inside the browser safely.",ole:"This is an old Office file."};
async function infoView(blob,why){const B=q('#rbd'),tb=q('#rtb'),f=cur;if(!B||!f)return;if(blob&&!url){url=URL.createObjectURL(blob)}
 const lbl=blob?await magicLabel(blob).catch(()=>''):'',msg=WHY[why]||why||"A preview isn't available for this file type, but the file is safely stored. You can look inside it with the tabs above, save it, or open it in another app.";
 let sh='';if(blob){try{const fl=new File([blob],f.name,{type:blob.type||'application/octet-stream'});if(navigator.canShare&&navigator.canShare({files:[fl]}))sh=`<button class="btn ghost" id="rsh">↗ Open with…</button>`}catch(e){}}
 const info=()=>{B.innerHTML=`<div class="msg"><div class="ic">${FI[fcat(f)][1]}</div><h2>${esc(f.name)}</h2><p>${esc(msg)}</p>${[['Type',f.type||ext(f.name)||'file'],['Detected',lbl||'—'],['Size',sz(blob?blob.size:f.size)],['Added',dtf(f.added||f.id)]].map(r=>`<div class="kv"><b>${r[0]}</b><span>${esc(r[1])}</span></div>`).join('')}<div class="row" style="margin-top:16px;justify-content:center;flex-wrap:wrap;gap:10px">${blob?`<a class="btn" href="${url}" download="${esc(f.name)}">⬇ Save file</a>`:''}${sh}</div></div>`;const b=B.querySelector('#rsh');if(b)b.onclick=()=>navigator.share({files:[new File([blob],f.name,{type:blob.type||'application/octet-stream'})],title:f.name}).catch(()=>{})};
 const mono=t=>`<div class="pg" style="max-width:1100px"><pre style="white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.5 ui-monospace,Menlo,Consolas,monospace;margin:0">${esc(t)}</pre></div>`;
 const show=async m=>{tb.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',b.dataset.t=='i:'+m));if(m=='info'||!blob)return info();const u=new Uint8Array(await blob.slice(0,m=='hex'?16384:8e6).arrayBuffer());
  if(m=='str')B.innerHTML=mono(strs(u,5)||'No readable text found in this file.');else{let h='';for(let i=0;i<u.length;i+=16){const r=[...u.slice(i,i+16)];h+=i.toString(16).padStart(6,'0')+'  '+r.map(b=>b.toString(16).padStart(2,'0')).join(' ').padEnd(47)+'  '+r.map(b=>b>=32&&b<127?String.fromCharCode(b):'·').join('')+'\n'}B.innerHTML=mono(h+(blob.size>16384?'\n… first 16 KB shown':''))}B.scrollTop=0};
 if(blob){tb.innerHTML=tbBtn('i:info','ℹ Info',1)+tbBtn('i:str','Aa Text',0)+tbBtn('i:hex','⌗ Hex',0);tb.onclick=e=>{const b=e.target.closest('[data-t]');if(b&&/^i:/.test(b.dataset.t))show(b.dataset.t.slice(2))}}else{tb.innerHTML='';tb.onclick=null}
 await show('info')}
/* PDF: pdf.js when reachable (works on every phone), native iframe as fallback */
let pdfDoc=null,pdfLoad=null;
const killPdf=()=>{if(pdfDoc){try{pdfDoc.destroy()}catch(e){}pdfDoc=null}};
async function loadPdfJs(){if(window.pdfjsLib)return window.pdfjsLib;
 try{const m=await import('./pdfjs/pdf.min.mjs');m.GlobalWorkerOptions.workerSrc=new URL('./pdfjs/pdf.worker.min.mjs',location.href).href;window.pdfjsLib=m;return m}catch(e){}
 try{const bu=async p=>{const r=await fetch(p);if(!r.ok)throw 0;return URL.createObjectURL(new Blob([await r.text()],{type:'text/javascript'}))};
  const m=await import(await bu('./pdfjs/pdf.min.mjs'));m.GlobalWorkerOptions.workerSrc=await bu('./pdfjs/pdf.worker.min.mjs');window.pdfjsLib=m;return m}catch(e){}
 return loadCdn()}
const PDFO=()=>{if(window.__pdfEmb)return{};try{const a=x=>new URL(x,location.href).href;return{cMapUrl:a('pdfjs/cmaps/'),cMapPacked:true,standardFontDataUrl:a('pdfjs/standard_fonts/'),wasmUrl:a('pdfjs/wasm/')}}catch(e){return{}}};
let cdnLib=null;
async function loadCdnIso(){if(cdnLib)return cdnLib;const keep=window.pdfjsLib;window.pdfjsLib=undefined;pdfLoad=null;try{cdnLib=await loadCdn();return cdnLib}finally{if(keep)window.pdfjsLib=keep}}
const ENG=[{src:'pdfjs/pdf.classic.js',wk:'pdfjs/pdf.worker.classic.js'},{src:'pdfjs/pdf.compat.js',wk:'pdfjs/pdf.worker.compat.js'}],ENGL={},WKOK={};
const absU=u=>{try{return new URL(u,location.href).href}catch(e){return u}};
const loadScript=u=>new Promise((res,rej)=>{const sc=document.createElement('script');sc.src=absU(u);sc.onload=()=>res();sc.onerror=()=>rej(new Error('cannot load '+u));document.head.appendChild(sc)});
async function getEng(i){const EM=window.__pdfEmb;if(EM){if(i==0)return ENGL[0]=EM.L;throw new Error('no extra engine in single-file mode')}if(ENGL[i])return ENGL[i];const prev=globalThis.pdfjsLibClassic;try{delete globalThis.pdfjsLibClassic}catch(e){globalThis.pdfjsLibClassic=undefined}
 await loadScript(ENG[i].src);const L=globalThis.pdfjsLibClassic;if(!L||!L.getDocument)throw new Error('PDF engine '+(i+1)+' is not supported by this browser');ENGL[i]=L;return L}
let probeP=null;function probeWorker(){return probeP||(probeP=new Promise(res=>{try{const w=new Worker(URL.createObjectURL(new Blob(['postMessage(1)'],{type:'text/javascript'})));const t=setTimeout(()=>{try{w.terminate()}catch(e){}res(false)},2500),ov=()=>{clearTimeout(t);res(false)};document.addEventListener('securitypolicyviolation',ov,{once:true});w.onmessage=()=>{clearTimeout(t);document.removeEventListener('securitypolicyviolation',ov);try{w.terminate()}catch(e){}res(true)};w.onerror=()=>{clearTimeout(t);res(false)}}catch(e){res(false)}}))}
async function mkWorker(i,L,how){const EM=window.__pdfEmb;const to=(p,ms)=>Promise.race([p,new Promise((_,r)=>setTimeout(()=>r(new Error('worker timeout')),ms))]);
 if(how=='main'&&EM)return null;
 if(how=='main'){if(!ENGL['w'+i]){await loadScript(ENG[i].wk);ENGL['w'+i]=globalThis.pdfjsWorker}return null}
 if(how=='blob'&&!(await probeWorker())){window.__noWorker=1;throw new Error('background workers are not allowed here')}
 let src=absU(ENG[i].wk);if(EM&&how=='blob'){src=URL.createObjectURL(new Blob([document.getElementById('pdfjs-embedded-worker').textContent],{type:'text/javascript'}))}else if(how=='blob'){const r=await fetch(src);if(!r.ok)throw new Error('worker file missing');src=URL.createObjectURL(new Blob([await r.text()],{type:'text/javascript'}))}
 try{const w=new Worker(src);return await to(new Promise((res,rej)=>{const ov=()=>rej(new Error('worker blocked'));document.addEventListener('securitypolicyviolation',ov,{once:true});w.onerror=()=>rej(new Error('worker failed to start'));const pw=new L.PDFWorker({port:w});pw.promise.then(()=>{document.removeEventListener('securitypolicyviolation',ov);res(pw)},rej)}),6000)}catch(e){window.__noWorker=1;throw e}}
const ATT=[];for(let i=0;i<2;i++)for(const how of['url','blob','main'])ATT.push({i,how});ATT.push({cdn:1});
async function openPdf(data,from){from=from||0;let last=null;
 for(let m=from;m<ATT.length;m++){const a=ATT[m];let L,worker=null,opt={};if(window.__pdfEmb&&!a.cdn&&((a.i==0&&a.how=='url')||a.i==1))continue;if(window.__noWorker&&!a.cdn&&a.how!='main')continue;
  try{
   if(a.cdn){L=await Promise.race([loadCdnIso(),new Promise((_,r)=>setTimeout(()=>r(new Error('could not load the PDF engine')),20000))]);opt={disableFontFace:true,isEvalSupported:false}}
   else{const kn=WKOK[a.i];if(kn&&a.how!=kn&&ATT.findIndex(x=>x.i==a.i&&x.how==kn)>m)continue;
    L=await getEng(a.i);worker=await mkWorker(a.i,L,a.how);if(a.how=='main')opt={disableFontFace:true,isEvalSupported:false,useWorkerFetch:false}}
  }catch(e){last=e;continue}
  let pw;for(let t=0;t<4;t++){
   try{const par=Object.assign({data:data.slice(),password:pw},a.cdn?{}:PDFO(),window.__pdfEmb?{disableFontFace:true,isEvalSupported:false}:{},opt);if(worker)par.worker=worker;
    const doc=await Promise.race([L.getDocument(par).promise,new Promise((_,r)=>setTimeout(()=>r(new Error('PDF open timeout')),a.how=='main'?90000:15000))]);if(!a.cdn)WKOK[a.i]=a.how;return{L,doc,m}}
   catch(e){if(e&&e.name=='PasswordException'){pw=prompt(e.code==2?'Wrong password. Try again:':'This PDF is password protected. Enter the password:');if(pw==null)throw e}else{last=e;try{worker&&worker.destroy()}catch(x){}break}}}}
 throw last||new Error('pdf')}
function loadCdn(){if(window.pdfjsLib)return Promise.resolve(window.pdfjsLib);if(pdfLoad)return pdfLoad;const V='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
 pdfLoad=new Promise((res,rej)=>{const s=document.createElement('script');s.src=V+'pdf.min.js';s.onerror=()=>rej(new Error('net'));s.onload=async()=>{const L=window.pdfjsLib;if(!L)return rej(new Error('lib'));try{const r=await fetch(V+'pdf.worker.min.js');if(!r.ok)throw 0;L.GlobalWorkerOptions.workerSrc=URL.createObjectURL(new Blob([await r.text()],{type:'text/javascript'}))}catch(e){L.GlobalWorkerOptions.workerSrc=V+'pdf.worker.min.js'}res(L)};document.head.appendChild(s)}).catch(e=>{pdfLoad=null;throw e});return pdfLoad}
async function pdfView(f,blob,B,tb,live,from){B.innerHTML='<div class="msg"><div class="ic">⏳</div><p>Loading PDF…</p></div>';
 const fb=why=>{if(!live())return;if(!navigator.pdfViewerEnabled||window.__pdfEmb)return infoView(blob,'The PDF could not be drawn inside the app'+(why&&why.message?' ['+String(why.message).slice(0,120)+']':'')+'. Tap Save file, or Open with… to read it in your PDF app.');B.innerHTML=`<iframe class="fr" src="${url}" title="${esc(f.name)}"></iframe>`;tb.innerHTML=`<a class="chip" href="${url}" target="_blank" rel="noopener">↗ Open in new tab</a><button class="chip" id="pdi">ℹ Save / Open with…</button><span class="note" style="padding:0">If pages don't appear, use that button.</span>`;tb.onclick=e=>{if(e.target.closest('#pdi'))infoView(blob,'PDF preview needs internet the first time. Save the file or open it in your PDF app.')}};
 const data=new Uint8Array(await blob.arrayBuffer());let doc=null,L,PM=0;
 try{const r=await openPdf(data,from);doc=r.doc;L=r.L;PM=r.m}catch(e){if(e&&e.name=='PasswordException')return infoView(blob,'This PDF is password protected.');return fb(e)}
 if(!live()){doc.destroy();return}pdfDoc=doc;const N=doc.numPages;let zm=1,gen=0;
 B.innerHTML='<div class="pdfw"></div>';const W=B.firstChild,pgs=[];
 const p1=await doc.getPage(1),v1=p1.getViewport({scale:1}),fit=()=>Math.min(B.clientWidth-16,1100)*zm;
 for(let i=1;i<=N;i++){const d=document.createElement('div');d.className='pdfp';d.dataset.n=i;W.appendChild(d);pgs.push(d)}
 const size=(vp)=>{const w=fit();pgs.forEach(d=>{if(!d.dataset.r)d.style.height=(w*vp.height/vp.width)+'px';d.style.width=w+'px'})};size(v1);
 const render=async d=>{const n=+d.dataset.n,my=gen;if(d._busy||d._g===my)return;d._busy=1;try{const pg=await doc.getPage(n),vp=pg.getViewport({scale:1}),w=fit(),s=w/vp.width;let dpr=Math.min(window.devicePixelRatio||1,2);while(w*dpr*vp.height*s*dpr>16e6&&dpr>.5)dpr-=.25;
   const cv=document.createElement('canvas'),v=pg.getViewport({scale:s*dpr});cv.width=Math.floor(v.width);cv.height=Math.floor(v.height);await pg.render({canvas:cv,canvasContext:cv.getContext('2d'),viewport:v}).promise;if(!live()||my!=gen)return;d.dataset.r=1;d.style.height=(w*vp.height/vp.width)+'px';d.style.width=w+'px';d.replaceChildren(cv);d._g=my}catch(e){console.warn('pdf page',n,e);if(n==1&&PM<ATT.length-1&&!d._rt&&live()){d._rt=1;killPdf();pdfView(f,blob,B,tb,live,PM+1)}}finally{d._busy=0}};
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)render(e.target);else if(e.target._g!==undefined&&Math.abs(e.boundingClientRect.top)>6000){e.target.replaceChildren();e.target._g=undefined}}),{root:B,rootMargin:'700px 0px'});pgs.forEach(d=>io.observe(d));
 const ind=()=>{const t=B.scrollTop+B.clientHeight/3;let c=1;for(const d of pgs){if(d.offsetTop<=t)c=+d.dataset.n;else break}const e=tb.querySelector('#pdn');if(e)e.textContent=c+' / '+N};
 B.onscroll=ind;const setZ=z=>{zm=Math.max(.5,Math.min(4,z));gen++;pgs.forEach(d=>{d._g=undefined;d.dataset.r='';d.replaceChildren()});size(v1);pgs.forEach(d=>{io.unobserve(d);io.observe(d)})};
 tb.innerHTML=`<button class="chip" data-t="zo">－</button><button class="chip" data-t="zi">＋</button><button class="chip" data-t="zf">Fit</button><span class="sp"></span><span class="mu" id="pdn" style="font-size:13px">1 / ${N}</span>`;
 tb.onclick=e=>{const b=e.target.closest('[data-t]');if(!b)return;const a=b.dataset.t;setZ(a=='zi'?zm+.25:a=='zo'?zm-.25:1)};
 let rz;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{if(pdfDoc===doc)setZ(zm)},300)})}

/* ---------- viewer ---------- */
const hdr=(f,k)=>`<div class="rh"><button class="chip" id="rbk" title="Back" style="font-size:20px;line-height:1;padding:8px 14px">‹</button><div class="rt"><b>${esc(f.name)}</b><span>${esc((ext(f.name)||'file').toUpperCase())} · ${sz(f.size)}</span></div><button class="chip" id="rfs" title="Full screen" aria-label="Full screen">⛶</button><button class="chip" id="rif" title="Details">ⓘ</button>${((['txt','md','json','csv','html'].includes(k)&&istx(f))||k=='docx')&&!f.ch?'<button class="chip" id="red" title="Edit">✎</button>':''}<a class="chip" id="rsv" title="Save" download="${esc(f.name)}">⬇</a></div><div class="tb" id="rtb"></div><div class="rb" id="rbd"></div>${sib.length>1?'<div class="pn"><button class="chip" id="rpv" title="Previous file">◀</button><span>'+(sib.indexOf(String(f.id))+1)+' / '+sib.length+'</span><button class="chip" id="rnx" title="Next file">▶</button></div>':''}`;
const tbBtn=(id,l,on)=>`<button class="chip${on?' on':''}" data-t="${id}">${l}</button>`;

function textTools(txt,opt){ // font / wrap / lines / copy
 return `<button class="chip" data-t="fm">A−</button><button class="chip" data-t="fp">A＋</button>${tbBtn('wr','↵ Wrap',P.wrap)}${opt.noln?'':tbBtn('ln','# Lines',lnOn(opt))}<button class="chip" data-t="cp">⧉ Copy</button>`}
const lnOn=o=>P.ln===null?!!o.codeLike:!!P.ln;
function bindTools(txt,opt){
 const tb=q('#rtb');tb.onclick=e=>{const b=e.target.closest('[data-t]');if(!b)return;const a=b.dataset.t;
  if(a=='fm'||a=='fp'){P.fs=Math.max(11,Math.min(30,P.fs+(a=='fp'?1:-1)));sv();R.style.setProperty('--rfs',P.fs+'px')}
  else if(a=='wr'){P.wrap=P.wrap?0:1;sv();b.classList.toggle('on',!!P.wrap);const t=q('.tv');if(t)t.classList.toggle('wr',!!P.wrap)}
  else if(a=='ln'){P.ln=lnOn(opt)?0:1;sv();b.classList.toggle('on',!!P.ln);const t=q('.tv');if(t)t.classList.toggle('ln',!!P.ln)}
  else if(a=='cp')copyText(txt)}}
function srcView(txt,opt){const B=q('#rbd'),L=txt.replace(/\r\n?/g,'\n').split('\n'),N=1500;let n=0;
 B.innerHTML=`<div class="pg" style="max-width:1200px"><div class="tv${P.wrap?' wr':''}${lnOn(opt)?' ln':''}${opt.sans?' sans':''}"></div><button class="chip more" hidden></button></div>`;
 const tv=B.querySelector('.tv'),mb=B.querySelector('.more');
 const add=()=>{const e=Math.min(L.length,n+N);let h='';for(let i=n;i<e;i++)h+=`<div><i>${i+1}</i><span>${esc(L[i])||' '}</span></div>`;tv.insertAdjacentHTML('beforeend',h);n=e;if(n<L.length){mb.hidden=false;mb.textContent=`Show more (${L.length-n} lines left)`}else mb.hidden=true};
 mb.onclick=add;add()}
function tabs(list,cur2,cb){return list.map(([id,l])=>tbBtn('v:'+id,l,id==cur2)).join('')}

async function renderBody(f,k,buf,blob,my){
 const B=q('#rbd'),tb=q('#rtb');curK=k;
 const live=()=>my==tok;
 if(k=='img'||k=='heic'){B.innerHTML=`<div class="imgv"><img src="${url}" alt=""></div>`;zoom=0;const v=B.firstChild,im=v.firstChild;
  tb.innerHTML=`<button class="chip" data-t="zo">－</button><button class="chip" data-t="zi">＋</button><button class="chip" data-t="zf">Fit</button><span class="sp"></span>`;
  const ap=()=>{v.classList.toggle('z',zoom>0);im.style.width=zoom>0?(zoom*100)+'%':''};
  tb.onclick=e=>{const b=e.target.closest('[data-t]');if(!b)return;const a=b.dataset.t;if(a=='zi')zoom=zoom?Math.min(8,zoom+.5):1.5;else if(a=='zo')zoom=zoom>1.5?zoom-.5:0;else zoom=0;ap()};
  im.onclick=()=>{zoom=zoom?0:2;ap()};im.onerror=async()=>{im.onerror=null;const u2=await imgFallback(blob);if(!live())return;if(u2){im.onerror=()=>rawFallback(blob);im.src=u2}else await rawFallback(blob,k=='heic'?'heic':'img')};return}
 if(k=='vid'){setK('vid');B.innerHTML=`<div class="full"><video src="${url}" preload="metadata"></video></div>`;{const e=B.querySelector('video');e.onerror=()=>mediaFb(e,blob,()=>rawFallback(blob,'vid'));e.onloadedmetadata=()=>{if(!e.videoWidth&&e.duration>0)mediaFb(e,blob,null,true)};ctl=OFX.player(e,{title:f.name,key:f.id,blob,focus:1})};return}
 if(k=='aud'){setK('aud');B.innerHTML=`<div class="full"><audio src="${url}" preload="metadata"></audio></div>`;{const e=B.querySelector('audio');e.onerror=()=>mediaFb(e,blob,()=>rawFallback(blob,'aud'));ctl=OFX.player(e,{title:f.name,sub:sz(f.size),key:f.id,blob,focus:1})};return}
 if(k=='pdf'){await pdfView(f,blob,B,tb,live);return}
 if(k=='docx'||k=='pptx'||k=='xlsx'){
  try{const z=await unzip(buf);if(!live())return;
   if(k=='docx'||k=='pptx'){setK(k);tb.innerHTML='';tb.onclick=null;B.style.cssText='position:relative;overflow:hidden';const c=k=='docx'?await OFX.docx(z,B,{fill:true}):await OFX.pptx(z,B,{fill:true});if(!live()){c.destroy();return}ctl=c;try{B.firstChild.focus({preventScroll:true})}catch(x){}}
   else{const sh=await xlsxSheets(z);if(!live())return;const show=i=>{B.innerHTML=gridHtml(sh[i].rows,true);B.scrollTop=0;tb.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',+b.dataset.t.slice(2)==i))};
    tb.innerHTML=sh.map((s,i)=>tbBtn('s:'+i,esc(s.name),i==0)).join('');tb.onclick=e=>{const b=e.target.closest('[data-t]');if(b)show(+b.dataset.t.slice(2))};show(0)}
  }catch(e){if(live())await zipFallback(buf,blob,f,B,tb,live)}return}
 if(k=='od'){try{const z=await unzip(buf);if(!live())return;await odView(z,f,B,tb)}catch(e){if(live())await zipFallback(buf,blob,f,B,tb,live)}return}
 if(k=='epub'){try{const z=await unzip(buf);if(!live())return;await epubView(z,f,B,tb,live)}catch(e){if(live())await zipFallback(buf,blob,f,B,tb,live)}return}
 if(k=='zip'){try{const z=await unzip(buf);if(!live())return;const nm=z.names,to=nm.includes('word/document.xml')?'docx':nm.includes('ppt/presentation.xml')?'pptx':nm.includes('xl/workbook.xml')?'xlsx':nm.includes('mimetype')&&nm.includes('META-INF/container.xml')?'epub':nm.includes('mimetype')&&nm.includes('content.xml')?'od':'';if(to)return renderBody(f,to,buf,blob,my);await zipView(z,f,B,tb,live)}catch(e){if(live())await infoView(blob,'This looks like an archive, but it could not be opened here.')}return}
 if(k=='rtf'){const t=dec(buf);if(/^\s*\{\\rtf/.test(t)){const t2=rtfText(t);B.innerHTML=`<div class="pg pro">${para2(t2)||'<p class="mu">No text found.</p>'}</div>`;tb.innerHTML='<button class="chip" data-t="fm">A−</button><button class="chip" data-t="fp">A＋</button><button class="chip" data-t="cp">⧉ Copy</button>';bindTools(t2,{noln:1});return}k='txt'}
 if(k=='ipynb'){try{await nbView(dec(buf),B);tb.innerHTML='';tb.onclick=null;return}catch(e){k='json'}}
 if(k=='ole'){const t=oleText(new Uint8Array(buf));B.innerHTML=`<div class="pg pro"><div class="note" style="text-align:left">Old Office format (.doc / .xls / .ppt). Showing the text found inside — layout and pictures are not shown. Use ⬇ Save to open the full file in another app.</div>${para2(t)||'<p class="mu">No readable text found.</p>'}</div>`;tb.innerHTML='<button class="chip" data-t="fm">A−</button><button class="chip" data-t="fp">A＋</button><button class="chip" data-t="cp">⧉ Copy</button>';bindTools(t,{noln:1});return}
 if(k=='gz'){try{const u=new Uint8Array(await new Response(new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()),nn=f.name.replace(/\.(gz|tgz)$/i,''),f2=Object.assign({},f,{name:nn,size:u.length});if(looksText(u)){const k2=kindOf(f2);return renderBody(f2,['md','json','csv','html'].includes(k2)?k2:'txt',u.buffer,new Blob([u]),my)}await infoView(blob,'Compressed with gzip. Inside is "'+nn+'" ('+sz(u.length)+'), which has no preview. Save it to extract.')}catch(e){await infoView(blob,'This compressed file could not be opened here.')}return}
 if(k=='arc'||k=='huge'){await infoView(blob,k);return}
 if(k=='bin'){await rawFallback(blob);return}
 // ---- text family ----
 const txt=dec(buf);if(!live())return;
 const e=ext(f.name),code=isCode(f)||k=='json',opt={codeLike:code,sans:k=='txt'&&!code};
 if(!txt.trim()){B.innerHTML=msgH(f,'📭','This file is empty.');return}
 if(k=='txt'&&!code){setK('txt',1);tb.innerHTML='';tb.onclick=null;B.style.cssText='position:relative;overflow:hidden';const u8=new Uint8Array(buf,0,Math.min(buf.byteLength,4)),enc=u8[0]==0xEF&&u8[1]==0xBB&&u8[2]==0xBF?'UTF-8 with BOM':u8[0]==0xFF&&u8[1]==0xFE?'UTF-16 LE':u8[0]==0xFE&&u8[1]==0xFF?'UTF-16 BE':(()=>{try{new TextDecoder('utf-8',{fatal:true}).decode(buf);return'UTF-8'}catch(x){return'ANSI'}})();ctl=OFX.notepad(txt,B,{fill:true,name:f.name,blob,enc,toast,onVaultSave:(!f.ch&&buf.byteLength<6e6)?(v)=>saveText(f,v,enc):null});try{ctl.ta.focus({preventScroll:true})}catch(x){}return}
 const mount=(mode)=>{
  if(k=='md'){tb.innerHTML=tabs([['r','📖 Read'],['s','</> Source']],mode)+'<span class="sp"></span>'+(mode=='r'?`<button class="chip" data-t="fm">A−</button><button class="chip" data-t="fp">A＋</button>`:textTools(txt,{codeLike:1}).replace(/<button class="chip" data-t="cp">.*$/,''))+'<button class="chip" data-t="cp">⧉ Copy</button>';
   if(mode=='r')B.innerHTML=`<div class="pg pro">${md(txt)}</div>`;else srcView(txt,{codeLike:1})}
  else if(k=='html'){tb.innerHTML=tabs([['r','👁 Preview'],['s','</> Source']],mode)+'<span class="sp"></span>'+(mode=='s'?textTools(txt,{codeLike:1}):'<button class="chip" data-t="cp">⧉ Copy</button>');
   if(mode=='r')B.innerHTML=`<iframe class="fr" sandbox="" referrerpolicy="no-referrer"></iframe>`,B.firstChild.srcdoc=txt;else srcView(txt,{codeLike:1})}
  else if(k=='csv'){tb.innerHTML=tabs([['t','▦ Table'],['s','</> Raw']],mode)+'<span class="sp"></span>'+(mode=='s'?textTools(txt,{codeLike:1}):'<button class="chip" data-t="cp">⧉ Copy</button>');
   if(mode=='t'){const first=txt.split('\n',1)[0],d=e=='tsv'||(first.split('\t').length>first.split(',').length)?'\t':(first.split(';').length>first.split(',').length?';':',');B.innerHTML=gridHtml(parseCsv(txt,d),true)}else srcView(txt,{codeLike:1})}
  else{let t2=txt;if(k=='json'){try{t2=JSON.stringify(JSON.parse(txt),null,2)}catch(x){}}
   tb.innerHTML=textTools(t2,opt);bindTools(t2,opt);srcView(t2,opt);return}
  // tabbed kinds
  tb.onclick=ev=>{const b=ev.target.closest('[data-t]');if(!b)return;const a=b.dataset.t;
   if(a.startsWith('v:')){mount(a.slice(2));return}
   if(a=='fm'||a=='fp'){P.fs=Math.max(11,Math.min(30,P.fs+(a=='fp'?1:-1)));sv();R.style.setProperty('--rfs',P.fs+'px')}
   else if(a=='wr'){P.wrap=P.wrap?0:1;sv();b.classList.toggle('on',!!P.wrap);const t=q('.tv');if(t)t.classList.toggle('wr',!!P.wrap)}
   else if(a=='ln'){P.ln=lnOn({codeLike:1})?0:1;sv();b.classList.toggle('on',!!P.ln);const t=q('.tv');if(t)t.classList.toggle('ln',!!P.ln)}
   else if(a=='cp')copyText(txt)}};
 mount(k=='csv'?'t':k=='md'||k=='html'?'r':'s')}
const msgH=(f,ic,t)=>`<div class="msg"><div class="ic">${ic}</div><h2>${esc(f.name)}</h2><p>${t}</p><a class="btn" href="${url||'#'}" download="${esc(f.name)}">⬇ Save file</a></div>`;

async function emptyView(f){q('#rbd').innerHTML=`<div class="msg"><div class="ic">⚠️</div><h2>${esc(f.name)}</h2><p>This file was not saved completely (the upload may have been interrupted), so there is nothing to show. Remove it and upload it again.</p><button class="btn stop" id="rmx">🗑 Move to Trash</button></div>`;q('#rmx').onclick=async()=>{f.trash=Date.now();await svf(f);toast('Moved to trash');closeV();if(view=='fc')fcPage(fcur);else if(view=='vault')V.vault()}}
function lockedView(f){q('#rbd').innerHTML=`<div class="msg"><div class="ic">🔐</div><h2>${esc(f.name)}</h2><p>This file could not be unlocked with the lock you are using now. It may have been saved under an earlier PIN (for example before a reset). Lock and unlock once more; if it still fails the file cannot be recovered.</p></div>`}
async function openV(id,keep){
 const my=++tok,f=await gf(id);if(!f)return;EDS=null;
 R.style.setProperty('--rfs',P.fs+'px');
 freeCtl();if(url){URL.revokeObjectURL(url);url=null}killPdf();XU.splice(0).forEach(u=>URL.revokeObjectURL(u));
 cur=f;let k=kindOf(f),blob=null;
 if(!keep||!sib.length){const l=(await rows()).filter(x=>!x.trash&&fcat(x)==fcat(f)).sort((a,b)=>(b.edited||b.id)-(a.edited||a.id));sib=l.map(x=>String(x.id))}
 R.innerHTML=hdr(f,k)+'';R.classList.add('on');setK(k,k=='txt'&&!isCode(f));
 if(!R.dataset.h){R.dataset.h=1}
 if(!history.state||!history.state.rdr){try{history.pushState({rdr:1},'')}catch(e){}}
 q('#rbd').innerHTML='<div class="msg"><div class="ic">⏳</div><p>Opening…</p></div>';
 wire(f);
 try{
  if(!f.d&&!f.ch){await emptyView(f);return}
  const mt=fmime(f);
  try{blob=await rdBlob(f,k=='pdf'?'application/pdf':mt)}catch(e){if(my==tok)lockedView(f);return}
  if(my!=tok)return;
  const hd=new Uint8Array(await blob.slice(0,8192).arrayBuffer()),sn=sniff(hd);
  if(sn){if(sn[0]=='zip'){if(!['docx','pptx','xlsx','od','epub','zip'].includes(k))k='zip'}
   else if(sn[0]=='ole'){k='ole'}else if(sn[0]=='gz'){k='gz'}else if(sn[0]=='rtf'){k='rtf'}
   else if(sn[0]=='vid'&&k=='aud'){blob=new Blob([blob],{type:/\.(m4a|aac)$/i.test(f.name)?'audio/mp4':(blob.type||'audio/mp4')})}
   else if(sn[0]!==k&&!(sn[0]=='img'&&k=='heic')){k=sn[0];blob=new Blob([blob],{type:sn[1]})}}
  else if(k=='pdf'&&!new TextDecoder('latin1').decode(hd).includes('%PDF'))k='bin';
  else if(k=='bin'&&looksText(hd))k='txt';
  if(NEEDBUF.has(k)&&blob.size>250e6)k='huge';
  url=URL.createObjectURL(blob);
  const buf=NEEDBUF.has(k)?await blob.arrayBuffer():null;if(my!=tok)return;
  const a=q('#rsv');if(a)a.href=url;
  await renderBody(f,k,buf,blob,my);if(my==tok)addEditChip(f);
  if(my==tok){const b=q('#rbd');if(b)b.scrollTop=0}
 }catch(e){if(my==tok){try{if(blob)await infoView(blob,'Something went wrong while showing this file ('+((e&&e.message)||e)+'). The file itself is fine — you can save it or look inside it with the tabs above.');else q('#rbd').innerHTML=msgH(f,'📄','Could not open this file.')}catch(x){}}}
}
function wire(f){
 q('#rbk').onclick=()=>closeV();
 const fsb=q('#rfs');if(fsb)fsb.onclick=()=>OFX.toggleFS(R);
 q('#rif').onclick=()=>{closeV(true);fileP(f.id)};
 const ed=q('#red');if(ed)ed.onclick=()=>startEdit(f);
 const go2=d=>{if(!leaveOk())return;const i=sib.indexOf(String(f.id)),n=sib[(i+d+sib.length)%sib.length];if(n!==undefined)openV(n,true)};
 const pv=q('#rpv'),nx=q('#rnx');if(pv)pv.onclick=()=>go2(-1);if(nx)nx.onclick=()=>go2(1)}
/* ===== in-viewer editing: text / code / docx (added) ===== */
let curK='',EDS=null;
(()=>{const s=document.createElement('style');s.textContent=`
.edw{padding:10px;box-sizing:border-box;min-height:100%;display:flex;flex-direction:column}
.edw textarea{flex:1;width:100%;min-height:calc(100vh - 190px);min-height:calc(100dvh - 190px);border:1px solid var(--bd);border-radius:14px;padding:14px;background:var(--card);color:var(--tx);font:var(--rfs,14px)/1.55 ui-monospace,Menlo,Consolas,monospace;outline:none;resize:none;tab-size:4;white-space:pre;overflow:auto;-webkit-overflow-scrolling:touch}
.edw textarea.wr{white-space:pre-wrap;overflow-wrap:anywhere}
.tb .edst{font-size:12px;opacity:.7;white-space:nowrap;align-self:center;padding:0 6px}
.np-menu .np-sv{margin-left:auto;font-weight:700}.np-menu .np-sv.dirty{background:#c43e1c!important;color:#fff!important}
.dxw{padding:12px;background:#e4e4ea;min-height:100%;box-sizing:border-box}
.dxn{max-width:820px;margin:0 auto 10px;font-size:12.5px;color:#444;line-height:1.4}
.dxp{max-width:820px;margin:0 auto;background:#fff;color:#111;border-radius:8px;padding:22px 22px;box-shadow:0 2px 14px rgba(0,0,0,.15)}
.dxp textarea{display:block;width:100%;border:0;border-radius:6px;padding:4px 6px;margin:0 0 2px;background:transparent;color:#111;font:16px/1.5 Calibri,Carlito,"Segoe UI",system-ui,-apple-system,sans-serif;resize:none;overflow:hidden;outline:none;box-sizing:border-box}
.dxp textarea:focus{background:#f1efff;box-shadow:0 0 0 2px #6d4aff66}
.dxp textarea[readonly]{color:#888;background:#f4f4f6;font-style:italic;cursor:not-allowed}
.dxp textarea.h{font-weight:700;font-size:20px}
.dxp textarea.itb{border-left:3px solid #cfcfe0;border-radius:0 6px 6px 0}
`;document.head.appendChild(s)})();
const te8=new TextEncoder(),EDK=['txt','md','json','csv','html'];
function encOf(u,buf){return u[0]==0xEF&&u[1]==0xBB&&u[2]==0xBF?'UTF-8 with BOM':u[0]==0xFF&&u[1]==0xFE?'UTF-16 LE':u[0]==0xFE&&u[1]==0xFF?'UTF-16 BE':(()=>{try{new TextDecoder('utf-8',{fatal:true}).decode(buf);return'UTF-8'}catch(x){return'ANSI'}})()}
function encText(t,en){
 if(en=='UTF-16 LE'||en=='UTF-16 BE'){const le=en=='UTF-16 LE',u=new Uint8Array(2+t.length*2);u[0]=le?0xFF:0xFE;u[1]=le?0xFE:0xFF;for(let i=0;i<t.length;i++){const c=t.charCodeAt(i);if(le){u[2+i*2]=c&255;u[3+i*2]=c>>8}else{u[2+i*2]=c>>8;u[3+i*2]=c&255}}return u}
 const b=te8.encode(t);if(en=='UTF-8 with BOM'){const u=new Uint8Array(b.length+3);u.set([0xEF,0xBB,0xBF]);u.set(b,3);return u}return b}
const eolOf=t=>{const a=(t.match(/\r\n/g)||[]).length,b=(t.match(/(^|[^\r])\n/g)||[]).length,c=(t.match(/\r(?!\n)/g)||[]).length;return a&&a>=b&&a>=c?'crlf':c>b&&c>a?'cr':'lf'};
const toEolS=(s,e)=>e=='crlf'?s.replace(/\n/g,'\r\n'):e=='cr'?s.replace(/\n/g,'\r'):s;
async function commitFile(f,bytes){
 f.d=await en(bytes);f.size=bytes.length;f.edited=Date.now();await svf(f);
 const sp=q('.rt span');if(sp)sp.textContent=(ext(f.name)||'file').toUpperCase()+' · '+sz(f.size);
 try{if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(new Blob([bytes],{type:fmime(f)}));const a=q('#rsv');if(a)a.href=url}catch(e){}}
async function saveText(f,v,encName){await commitFile(f,encText(v,encName));toast(encName=='ANSI'?'Saved (as UTF-8)':'Saved ✓')}
const dirtyNow=()=>!!((ctl&&ctl.dirty&&ctl.dirty())||(EDS&&EDS.dirty()));
const leaveOk=()=>!dirtyNow()||confirm('Unsaved changes will be lost. Leave without saving?');
addEventListener('beforeunload',e=>{if(dirtyNow()){e.preventDefault();e.returnValue=''}});

/* --- zip writer (to save an edited .docx) --- */
const CRCT=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc32=u=>{let c=0xFFFFFFFF;for(let i=0;i<u.length;i++)c=CRCT[(c^u[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0};
async function defl(u){const cs=new CompressionStream('deflate-raw'),w=cs.writable.getWriter();w.write(u);w.close();return new Uint8Array(await new Response(cs.readable).arrayBuffer())}
async function zipBuild(z,rep){
 const out=[],cen=[];let off=0;const d=new Date(),dt=((d.getFullYear()-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate(),tm=(d.getHours()<<11)|(d.getMinutes()<<5)|(d.getSeconds()>>1);
 for(const name of z.names){if(name.endsWith('/'))continue;const data=rep[name]||await z.bin(name);if(!data)continue;
  const crc=crc32(data);let m=0,c=data;if(data.length>128&&typeof CompressionStream!='undefined'){try{const x=await defl(data);if(x.length<data.length){c=x;m=8}}catch(e){}}
  const nb=te8.encode(name),lh=new Uint8Array(30+nb.length),v=new DataView(lh.buffer);
  v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x0800,true);v.setUint16(8,m,true);v.setUint16(10,tm,true);v.setUint16(12,dt,true);v.setUint32(14,crc,true);v.setUint32(18,c.length,true);v.setUint32(22,data.length,true);v.setUint16(26,nb.length,true);lh.set(nb,30);
  out.push(lh,c);
  const ch=new Uint8Array(46+nb.length),w=new DataView(ch.buffer);
  w.setUint32(0,0x02014b50,true);w.setUint16(4,20,true);w.setUint16(6,20,true);w.setUint16(8,0x0800,true);w.setUint16(10,m,true);w.setUint16(12,tm,true);w.setUint16(14,dt,true);w.setUint32(16,crc,true);w.setUint32(20,c.length,true);w.setUint32(24,data.length,true);w.setUint16(28,nb.length,true);w.setUint32(42,off,true);ch.set(nb,46);cen.push(ch);
  off+=lh.length+c.length}
 let cs=0;for(const c of cen)cs+=c.length;const e=new Uint8Array(22),w=new DataView(e.buffer);
 w.setUint32(0,0x06054b50,true);w.setUint16(8,cen.length,true);w.setUint16(10,cen.length,true);w.setUint32(12,cs,true);w.setUint32(16,off,true);
 return new Uint8Array(await new Blob([...out,...cen,e]).arrayBuffer())}

/* --- entry point (pencil button, Edit chip, double-click) --- */
async function startEdit(f,pos){
 if(!f)return;if(f.ch||f.size>8e6){toast('This file is too large to edit here');return}
 if(EDS)return;const nk=kindOf(f);
 if(nk=='docx'&&curK=='docx')return docxEdit(f);
 if(EDK.includes(nk)&&curK==nk){if(ctl&&ctl.ta){ctl.ta.focus();return}return textEdit(f,pos)}
 toast('This file cannot be edited here')}
function addEditChip(f){
 try{const tb=q('#rtb');if(!tb||!f||f.ch||f.size>8e6)return;const nk=kindOf(f);
  if(nk!=curK||!(nk=='docx'||EDK.includes(nk))||(ctl&&ctl.ta))return;
  const put=()=>{if(EDS)return;if(!tb.querySelector('[data-t="ed"]'))tb.insertAdjacentHTML('afterbegin','<button class="chip on" data-t="ed">✎ Edit</button>')};
  put();new MutationObserver(put).observe(tb,{childList:true})}catch(e){}}
R.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-t="ed"]');if(b){e.preventDefault();e.stopPropagation();startEdit(cur)}},true);
R.addEventListener('dblclick',e=>{
 if(!R.classList.contains('on')||!cur||cur.ch||EDS||!EDK.includes(curK)||kindOf(cur)!=curK)return;
 const row=e.target.closest&&e.target.closest('.tv > div');if(!row||!row.firstElementChild)return;
 const line=parseInt(row.firstElementChild.textContent,10);if(!line)return;let col=0;
 try{const sp=row.querySelector('span');let rg=null;if(document.caretRangeFromPoint)rg=document.caretRangeFromPoint(e.clientX,e.clientY);else if(document.caretPositionFromPoint){const cp=document.caretPositionFromPoint(e.clientX,e.clientY);if(cp){rg=document.createRange();rg.setStart(cp.offsetNode,cp.offset)}}
  if(rg&&sp&&sp.contains(rg.startContainer)){const r2=document.createRange();r2.setStart(sp,0);r2.setEnd(rg.startContainer,rg.startOffset);col=r2.toString().length}}catch(x){}
 startEdit(cur,{line,col})});

/* --- plain-text / code editor inside the viewer --- */
async function textEdit(f,pos){
 const my=++tok;let buf;try{buf=await(await rdBlob(f,'text/plain')).arrayBuffer()}catch(e){toast('Could not open this file');return}
 if(my!=tok)return;
 const u8=new Uint8Array(buf,0,Math.min(4,buf.byteLength)),encName=encOf(u8,buf);let raw=dec(buf);const eol=eolOf(raw),t=raw.replace(/\r\n?/g,'\n');
 freeCtl();const B=q('#rbd'),tb=q('#rtb');B.style.cssText='';B.scrollTop=0;
 B.innerHTML='<div class="edw"><textarea id="edta" spellcheck="false" autocapitalize="off" autocorrect="off" autocomplete="off"></textarea></div>';
 const ta=q('#edta');ta.value=t;ta.classList.toggle('wr',!!P.wrap);ta.wrap=P.wrap?'soft':'off';let dirty=false;
 tb.onclick=null;tb.innerHTML='<button class="chip on" data-e="sv">💾 Save</button><button class="chip" data-e="cn">✕ Cancel</button><button class="chip" data-e="fm">A−</button><button class="chip" data-e="fp">A＋</button><button class="chip'+(P.wrap?' on':'')+'" data-e="wr">↵ Wrap</button><span class="sp"></span><span class="edst" id="edst"></span>';
 const st=()=>{const s=ta.selectionStart||0,b=ta.value.slice(0,s),ln=b.split('\n').length,cl=s-b.lastIndexOf('\n');const e=q('#edst');if(e)e.textContent='Ln '+ln+', Col '+cl+(dirty?' • unsaved':'')};
 const save=async()=>{const b=q('[data-e="sv"]');try{if(b)b.disabled=true;await saveText(f,toEolS(ta.value,eol),encName);dirty=false;EDS=null;openV(f.id,true)}catch(e){toast('Could not save');if(b)b.disabled=false}};
 const cancel=()=>{if(dirty&&!confirm('Discard your changes?'))return;dirty=false;EDS=null;openV(f.id,true)};
 tb.onclick=ev=>{const b=ev.target.closest('[data-e]');if(!b)return;const a=b.dataset.e;
  if(a=='sv')save();else if(a=='cn')cancel();
  else if(a=='fm'||a=='fp'){P.fs=Math.max(11,Math.min(30,P.fs+(a=='fp'?1:-1)));sv();R.style.setProperty('--rfs',P.fs+'px')}
  else if(a=='wr'){P.wrap=P.wrap?0:1;sv();b.classList.toggle('on',!!P.wrap);ta.classList.toggle('wr',!!P.wrap);ta.wrap=P.wrap?'soft':'off'}};
 ta.addEventListener('input',()=>{dirty=true;st()});['keyup','click','select','touchend'].forEach(n=>ta.addEventListener(n,()=>setTimeout(st,0)));
 ta.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&(e.key=='s'||e.key=='S')){e.preventDefault();e.stopPropagation();save()}else if(e.key=='Escape'){e.stopPropagation();cancel()}});
 EDS={dirty:()=>dirty};
 let at=0;if(pos&&pos.line){const ls=t.split('\n');if(pos.line<=ls.length){for(let i=0;i<pos.line-1;i++)at+=ls[i].length+1;at+=Math.min(pos.col||0,ls[pos.line-1].length)}}
 setTimeout(()=>{try{ta.focus({preventScroll:true});ta.setSelectionRange(at,at);const lh=parseFloat(getComputedStyle(ta).lineHeight)||22,ln=t.slice(0,at).split('\n').length-1;ta.scrollTop=Math.max(0,ln*lh-ta.clientHeight/3)}catch(e){}st()},30)}

/* --- .docx editor: edits paragraph text, keeps pictures / tables / layout --- */
async function docxEdit(f){
 const my=++tok;let z,xs;
 try{const buf=await(await rdBlob(f,fmime(f))).arrayBuffer();z=await unzip(buf);xs=await z.get('word/document.xml');if(!xs)throw 0}catch(e){toast('Could not open this document for editing');return}
 if(my!=tok)return;
 const W='http://schemas.openxmlformats.org/wordprocessingml/2006/main',XN='http://www.w3.org/XML/1998/namespace';
 const dx=new DOMParser().parseFromString(xs,'application/xml');if(dx.getElementsByTagName('parsererror').length){toast('Could not read this document');return}
 const body=dx.getElementsByTagNameNS(W,'body')[0];if(!body){toast('Could not read this document');return}
 const kid=(n,l)=>[...n.childNodes].find(c=>c.nodeType==1&&c.localName==l);
 const paras=[...body.getElementsByTagNameNS(W,'p')].filter(p=>{for(let n=p.parentNode;n&&n!==body;n=n.parentNode)if(n.localName=='txbxContent')return false;return true});
 const LOCKS=new Set(['drawing','pict','object','fldChar','fldSimple','sym','footnoteReference','endnoteReference','commentReference','ptab']);
 const ptext=p=>{let s='';const walk=n=>{for(const c of n.childNodes){if(c.nodeType!=1)continue;const l=c.localName;
   if(l=='t')s+=c.textContent;else if(l=='tab')s+='\t';else if(l=='br'||l=='cr'){if(c.getAttributeNS(W,'type')!='page')s+='\n'}else if(l=='noBreakHyphen')s+='-';
   else if(l=='pPr'||l=='rPr'||l=='delText'||l=='instrText'||l=='txbxContent'||l=='softHyphen')continue;else walk(c)}};walk(p);return s};
 const locked=p=>{for(const e of p.getElementsByTagName('*')){if(LOCKS.has(e.localName))return true;if(e.localName=='br'&&e.getAttributeNS(W,'type')=='page')return true}return false};
 const inTbl=p=>{for(let n=p.parentNode;n&&n!==body;n=n.parentNode)if(n.localName=='tc')return true;return false};
 const items=paras.map(p=>{const ppr=kid(p,'pPr'),ps=ppr&&kid(ppr,'pStyle'),sty=ps?(ps.getAttributeNS(W,'val')||''):'';const tx=ptext(p);return{p,orig:tx,text:tx,lock:locked(p),h:/^(Heading|Title|heading|title)/.test(sty),tbl:inTbl(p)}});
 if(!items.length){toast('This document has no text to edit');return}
 freeCtl();const B=q('#rbd'),tb=q('#rtb');B.style.cssText='';B.scrollTop=0;
 B.innerHTML='<div class="dxw"><div class="dxn">✎ Editing the text. Pictures, tables and layout stay as they are. Greyed lines (pictures / fields) can\'t be edited here. Press Enter for a new paragraph.</div><div class="dxp" id="dxl"></div></div>';
 tb.onclick=null;tb.innerHTML='<button class="chip on" data-e="sv">💾 Save</button><button class="chip" data-e="cn">✕ Cancel</button><span class="sp"></span><span class="edst" id="edst"></span>';
 const L=q('#dxl');let dirty=false;const gone=[];
 const grow=t=>{t.style.height='auto';t.style.height=(t.scrollHeight+2)+'px'};
 const mkRow=(it,after)=>{const t=document.createElement('textarea');t.rows=1;t.value=it.text;t.spellcheck=false;t.setAttribute('autocapitalize','off');t.setAttribute('autocorrect','off');if(it.h)t.classList.add('h');if(it.tbl)t.classList.add('itb');if(it.lock){t.readOnly=true;t.title='Has a picture or field — cannot be edited here'}t._it=it;it.t=t;
  t.addEventListener('input',()=>{it.text=t.value;grow(t);dirty=true;const e=q('#edst');if(e)e.textContent='unsaved'});
  t.addEventListener('keydown',e=>{
   if((e.ctrlKey||e.metaKey)&&(e.key=='s'||e.key=='S')){e.preventDefault();e.stopPropagation();save();return}
   if(e.key=='Escape'){e.stopPropagation();cancel();return}
   if(it.lock)return;
   if(e.key=='Enter'&&!e.shiftKey&&!e.ctrlKey&&!e.altKey&&!e.isComposing){e.preventDefault();const s=t.selectionStart,en2=t.selectionEnd,before=t.value.slice(0,s),aft=t.value.slice(en2);t.value=before;it.text=before;grow(t);
    const n={p:null,orig:'',text:aft,lock:false,h:false,tbl:it.tbl};const r=mkRow(n,t);r.focus();r.setSelectionRange(0,0);dirty=true;return}
   if(e.key=='Backspace'&&t.selectionStart==0&&t.selectionEnd==0){const pv=t.previousElementSibling;if(pv&&pv._it&&!pv._it.lock){e.preventDefault();const pl=pv.value.length;pv.value+=t.value;pv._it.text=pv.value;grow(pv);if(it.p)gone.push(it);t.remove();pv.focus();pv.setSelectionRange(pl,pl);dirty=true}}});
  if(after)after.after(t);else L.appendChild(t);return t};
 items.forEach(it=>mkRow(it));[...L.children].forEach(grow);
 setTimeout(()=>{[...L.children].forEach(grow)},120);
 const rowItems=()=>[...L.children].map(t=>t._it);
 /* write the new text of a paragraph, keeping its first run's font settings */
 const setText=(p,text)=>{const runs=[...p.getElementsByTagNameNS(W,'r')];let rpr=null;
  for(const r of runs){const x=kid(r,'rPr');if(x&&r.getElementsByTagNameNS(W,'t').length){rpr=x.cloneNode(true);break}}
  if(!rpr&&runs[0]){const x=kid(runs[0],'rPr');if(x)rpr=x.cloneNode(true)}
  for(const c of [...p.childNodes]){const l=c.localName;if(l=='pPr'||l=='bookmarkStart'||l=='bookmarkEnd')continue;p.removeChild(c)}
  if(!text)return;let r=dx.createElementNS(W,'w:r');if(rpr)r.appendChild(rpr.cloneNode(true));let bf='';
  const flush=()=>{if(bf){const t=dx.createElementNS(W,'w:t');t.setAttributeNS(XN,'xml:space','preserve');t.textContent=bf;r.appendChild(t);bf=''}};
  for(const ch of text){if(ch=='\n'){flush();r.appendChild(dx.createElementNS(W,'w:br'))}else if(ch=='\t'){flush();r.appendChild(dx.createElementNS(W,'w:tab'))}else bf+=ch}
  flush();p.appendChild(r)};
 const newP=ref=>{const p=dx.createElementNS(W,'w:p'),ppr=ref&&kid(ref,'pPr');if(ppr){const c=ppr.cloneNode(true);for(const s of [...c.childNodes])if(s.localName=='sectPr')c.removeChild(s);p.appendChild(c)}return p};
 const save=async()=>{const b=q('[data-e="sv"]');try{if(b)b.disabled=true;
   let last=null;
   for(const it of rowItems()){
    if(it.p){if(!it.lock&&it.text!==it.orig)setText(it.p,it.text);last=it.p}
    else{const p=newP(last);setText(p,it.text);
     if(last&&last.parentNode)last.parentNode.insertBefore(p,last.nextSibling);else body.insertBefore(p,body.firstChild);it.p=p;last=p}}
   for(const it of gone){const p=it.p;if(!p||!p.parentNode)continue;const par=p.parentNode;if(par.localName=='tc'&&[...par.childNodes].filter(c=>c.localName=='p').length<=1)setText(p,'');else par.removeChild(p)}
   let xml=new XMLSerializer().serializeToString(dx);if(!/^<\?xml/.test(xml))xml='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n'+xml;
   const out=await zipBuild(z,{'word/document.xml':te8.encode(xml)});
   await commitFile(f,out);toast('Saved ✓');dirty=false;EDS=null;openV(f.id,true)}
  catch(e){console.error(e);toast('Could not save');if(b)b.disabled=false}};
 const cancel=()=>{if(dirty&&!confirm('Discard your changes?'))return;dirty=false;EDS=null;openV(f.id,true)};
 tb.onclick=ev=>{const b=ev.target.closest('[data-e]');if(!b)return;if(b.dataset.e=='sv')save();else cancel()};
 EDS={dirty:()=>dirty}}

function hide(){tok++;EDS=null;freeCtl();if(OFX.fsEl()===R)OFX.exitFS();R.classList.remove('pfs');document.documentElement.classList.remove('pfs-lock');setK(null);killPdf();XU.splice(0).forEach(u=>URL.revokeObjectURL(u));R.classList.remove('on');R.innerHTML='';if(url){URL.revokeObjectURL(url);url=null}cur=null}
function closeV(noHist){if(!leaveOk())return;const had=history.state&&history.state.rdr;hide();if(had){try{history.back()}catch(e){}}}
addEventListener('popstate',()=>{if(R.classList.contains('on')){if(!leaveOk()){try{history.pushState({rdr:1},'')}catch(e){}return}hide()}});
addEventListener('keydown',e=>{if(!R.classList.contains('on')||$('#modal').style.display=='flex')return;
 if(e.key=='Escape'){if(R.classList.contains('pfs')){OFX.toggleFS(R)}else closeV()}else if(e.key=='ArrowRight'&&q('#rnx')&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName))q('#rnx').click();else if(e.key=='ArrowLeft'&&q('#rpv')&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName))q('#rpv').click()});
/* locking the app also closes any open file */
const lk=$('#lk');if(lk)lk.addEventListener('click',()=>{if(R.classList.contains('on'))hide()},true);

const fmime=f=>{const t=f.type||'',e=MIME[ext(f.name)];return(t.includes('/')&&!/x-m4a|mp4a|x-m4v|octet-stream/.test(t))?t:(e||(t.includes('/')?t:'application/octet-stream'))};
Object.assign(MIME,{m4b:'audio/mp4',oga:'audio/ogg',opus:'audio/ogg',weba:'audio/webm',mka:'audio/x-matroska',mkv:'video/x-matroska','3gp':'video/3gpp',ogv:'video/ogg'});
window.RD={pdfAttempts:ATT.length,openPdf,oleText,loadPdfJs,mediaFb,sniff,rawHtml,imgFallback,unzip,docxHtml,pptxHtml,xlsxSheets,gridHtml,parseCsv,md,kindOf,mime:fmime};
/* ---------- hook into the vault ---------- */
window.openViewer=openV;
window.openViewerFS=id=>{try{R.classList.add('on');OFX.enterFS(R)}catch(e){}return openV(id)};
prev=async function(f){openV(f.id)};
const _fc=fcPage;fcPage=async function(k){await _fc(k);document.querySelectorAll('#main [data-f]').forEach(r=>r.onclick=()=>openV(r.dataset.f))};
const _fl=fileP;fileP=async function(id){await _fl(id);const f=await gf(id);if(!f||view!='file')return;const d=$('#fd');if(d)d.onclick=async()=>{const u=URL.createObjectURL(await rdBlob(f,f.type||'application/octet-stream')),a=document.createElement('a');a.href=u;a.download=f.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000)}};
})();
