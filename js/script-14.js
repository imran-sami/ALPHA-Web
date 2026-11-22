if(!Promise.withResolvers)Promise.withResolvers=function(){let a,b;const p=new Promise((x,y)=>{a=x;b=y});return{promise:p,resolve:a,reject:b}};
if(!Array.prototype.at)Array.prototype.at=function(n){n=Math.trunc(n)||0;if(n<0)n+=this.length;return this[n]};
if(!Object.hasOwn)Object.hasOwn=function(o,k){return Object.prototype.hasOwnProperty.call(o,k)};
if(!window.structuredClone)window.structuredClone=function(v){return JSON.parse(JSON.stringify(v))};
