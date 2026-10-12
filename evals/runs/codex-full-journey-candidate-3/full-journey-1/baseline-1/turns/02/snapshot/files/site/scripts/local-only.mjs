// Next development mode checks the npm registry for version freshness.
// Keep the local preview offline by rejecting non-loopback fetches before I/O.
const originalFetch=globalThis.fetch;
globalThis.fetch=(input,init)=>{
 const url=new URL(typeof input==='string'||input instanceof URL?input:input.url);
 if(!['127.0.0.1','localhost','[::1]'].includes(url.hostname))return Promise.reject(new Error('Local preview permits loopback fetches only'));
 return originalFetch(input,init);
};
