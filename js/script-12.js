/* ===== v12: large-file storage (chunked encryption, persistent storage, storage meter) ===== */
(()=>{
const CH=16*1024*1024;
const mb=n=>n>=1e9?(n/1e9).toFixed(2)+' GB':(n/1e6).toFixed(n>=1e8?0:1)+' MB';
const QUOTA=100e9; /* ALPHA storage = 100 GB */
const est=async()=>{let u=0;try{u=(await rows()).reduce((a,f)=>a+(f.id=='avatar'?0:(f.size||0)),0)}catch(e){}return{usage:u,quota:QUOTA}};
const persist=async()=>{try{if(navigator.storage&&navigator.storage.persist){if(await navigator.storage.persisted())return true;return await navigator.storage.persist()}}catch(e){}return false};

/* read any stored file (old single-block or new chunked) as a Blob */
window.rdBlob=async(f,type)=>{if(f.ch){const parts=[];for(const b of f.ch)parts.push(await de(await b.arrayBuffer()));return new Blob(parts,{type})}return new Blob([await de(f.d)],{type})};

/* upload: no size cap; files over 16 MB are encrypted in chunks straight from disk */
upload=async function(files){let n=0;
 await persist();
 for(const f of files){
  try{
   const e=await est();if(e&&e.quota){const free=e.quota-e.usage;if(f.size*1.05>free){toast('Not enough free space for '+f.name+' ('+mb(Math.max(0,free))+' left)');continue}}
   const t=Date.now(),rec={id:t+Math.random(),name:f.name,type:f.type||'',size:f.size,added:t,edited:t,trash:0};
   if(f.size<=CH)rec.d=await en(await f.arrayBuffer());
   else{rec.ch=[];for(let o=0;o<f.size;o+=CH){rec.ch.push(new Blob([await en(await f.slice(o,Math.min(f.size,o+CH)).arrayBuffer())]));toast('Encrypting '+f.name+' '+Math.min(99,Math.round(o/f.size*100))+'%')}}
   await svf(rec);n++;
  }catch(x){toast(x&&x.name=='QuotaExceededError'?'Storage is full — free up space or delete files':'Failed: '+f.name)}}
 if(n)toast(n+' file(s) uploaded and sorted')};

/* changing the lock re-encrypts chunked files too */
const _al=applyLock;applyLock=async function(mode,secret){const ok=key,big=(await rows().catch(()=>[])).filter(r=>r.ch);await _al(mode,secret);const nk=key;
 for(const r of big){const out=[];for(const b of r.ch){key=ok;const p=await de(await b.arrayBuffer());key=nk;out.push(new Blob([await en(p)]))}r.ch=out;await svf(r)}key=nk};

/* chunked files are too large for the text editor */
const _ed=edP;edP=async function(f){if(f.ch){toast('This file is too large to edit here');return fileP(f.id)}return _ed(f)};

/* storage meter on the Vault page */
const _v=V.vault;V.vault=async function(){await _v();if(view!='vault')return;const sub=$('#main .sub');if(!sub)return;
 sub.insertAdjacentHTML('afterend',`<div class="card" id="stg" style="margin-bottom:16px"><h3>Storage</h3><div class="mu" id="stt">Checking…</div></div>`);
 const e=await est(),pr=await persist(),used=e.usage,box=$('#stg');if(!box)return;
 let h=`<div class="big" style="font-size:22px">${mb(used)} <span class="mu" style="font-size:14px;font-weight:600">in Protected</span></div>`;
 if(e&&e.quota){const free=Math.max(0,e.quota-e.usage),pc=Math.min(100,Math.round(e.usage/e.quota*100));h+=`<div style="height:8px;border-radius:8px;background:var(--bd);margin:10px 0 6px;overflow:hidden"><div style="height:100%;width:${Math.max(2,pc)}%;background:linear-gradient(90deg,var(--a),var(--b))"></div></div><div class="mu">${mb(free)} free of ${mb(e.quota)}</div>`}
 h+=`<div class="mu" style="margin-top:8px">${pr?'✓ Persistent storage on — the browser will not clear your files automatically.':'Persistent storage is off — the browser may clear files if the device runs low on space.'}</div>`;
 if(!pr)h+=`<button class="chip" id="stp" style="margin-top:10px">Keep my files safe (enable)</button>`;
 h+=`<div class="mu" style="margin-top:8px;font-size:12px">No file size limit. Files over 16 MB are encrypted in pieces so very large files work.</div>`;
 box.innerHTML='<h3>Storage</h3>'+h;const b=$('#stp');if(b)b.onclick=async()=>{const ok=await persist();toast(ok?'Persistent storage enabled':'Your browser did not allow it. Installing ALPHA to the home screen usually helps.');V.vault()}};
})();
