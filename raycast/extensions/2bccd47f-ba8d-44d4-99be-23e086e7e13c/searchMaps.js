var K=Object.create;var d=Object.defineProperty,Q=Object.defineProperties,T=Object.getOwnPropertyDescriptor,V=Object.getOwnPropertyDescriptors,Y=Object.getOwnPropertyNames,k=Object.getOwnPropertySymbols,H=Object.getPrototypeOf,q=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var F=(e,r,t)=>r in e?d(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,a=(e,r)=>{for(var t in r||(r={}))q.call(r,t)&&F(e,t,r[t]);if(k)for(var t of k(r))J.call(r,t)&&F(e,t,r[t]);return e},m=(e,r)=>Q(e,V(r)),C=e=>d(e,"__esModule",{value:!0});var p=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports),Z=(e,r)=>{for(var t in r)d(e,t,{get:r[t],enumerable:!0})},v=(e,r,t,s)=>{if(r&&typeof r=="object"||typeof r=="function")for(let n of Y(r))!q.call(e,n)&&(t||n!=="default")&&d(e,n,{get:()=>r[n],enumerable:!(s=T(r,n))||s.enumerable});return e},ee=(e,r)=>v(C(d(e!=null?K(H(e)):{},"default",!r&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e),re=(e=>(r,t)=>e&&e.get(r)||(t=v(C({}),r,1),e&&e.set(r,t),t))(typeof WeakMap!="undefined"?new WeakMap:0);var y=p((pe,L)=>{"use strict";var O=require("fs"),x;function te(){try{return O.statSync("/.dockerenv"),!0}catch{return!1}}function ne(){try{return O.readFileSync("/proc/self/cgroup","utf8").includes("docker")}catch{return!1}}L.exports=()=>(x===void 0&&(x=te()||ne()),x)});var B=p((ge,P)=>{"use strict";var se=require("os"),oe=require("fs"),W=y(),b=()=>{if(process.platform!=="linux")return!1;if(se.release().toLowerCase().includes("microsoft"))return!W();try{return oe.readFileSync("/proc/version","utf8").toLowerCase().includes("microsoft")?!W():!1}catch{return!1}};process.env.__IS_WSL_TEST__?P.exports=b:P.exports=b()});var $=p((he,R)=>{"use strict";R.exports=(e,r,t)=>{let s=n=>Object.defineProperty(e,r,{value:n,enumerable:!0,writable:!0});return Object.defineProperty(e,r,{configurable:!0,enumerable:!0,get(){let n=t();return s(n),n},set(n){s(n)}}),e}});var G=p((we,X)=>{var ie=require("path"),ce=require("child_process"),{promises:A,constants:z}=require("fs"),g=B(),ae=y(),E=$(),D=ie.join(__dirname,"xdg-open"),{platform:u,arch:I}=process,ue=(()=>{let e="/mnt/",r;return async function(){if(r)return r;let t="/etc/wsl.conf",s=!1;try{await A.access(t,z.F_OK),s=!0}catch{}if(!s)return e;let n=await A.readFile(t,{encoding:"utf8"}),c=/(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(n);return c?(r=c.groups.mountPoint.trim(),r=r.endsWith("/")?r:`${r}/`,r):e}})(),M=async(e,r)=>{let t;for(let s of e)try{return await r(s)}catch(n){t=n}throw t},h=async e=>{if(e=a({wait:!1,background:!1,newInstance:!1,allowNonzeroExitCode:!1},e),Array.isArray(e.app))return M(e.app,i=>h(m(a({},e),{app:i})));let{name:r,arguments:t=[]}=e.app||{};if(t=[...t],Array.isArray(r))return M(r,i=>h(m(a({},e),{app:{name:i,arguments:t}})));let s,n=[],c={};if(u==="darwin")s="open",e.wait&&n.push("--wait-apps"),e.background&&n.push("--background"),e.newInstance&&n.push("--new"),r&&n.push("-a",r);else if(u==="win32"||g&&!ae()){let i=await ue();s=g?`${i}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`:`${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`,n.push("-NoProfile","-NonInteractive","\u2013ExecutionPolicy","Bypass","-EncodedCommand"),g||(c.windowsVerbatimArguments=!0);let o=["Start"];e.wait&&o.push("-Wait"),r?(o.push(`"\`"${r}\`""`,"-ArgumentList"),e.target&&t.unshift(e.target)):e.target&&o.push(`"${e.target}"`),t.length>0&&(t=t.map(l=>`"\`"${l}\`""`),o.push(t.join(","))),e.target=Buffer.from(o.join(" "),"utf16le").toString("base64")}else{if(r)s=r;else{let i=!__dirname||__dirname==="/",o=!1;try{await A.access(D,z.X_OK),o=!0}catch{}s=process.versions.electron||u==="android"||i||!o?"xdg-open":D}t.length>0&&n.push(...t),e.wait||(c.stdio="ignore",c.detached=!0)}e.target&&n.push(e.target),u==="darwin"&&t.length>0&&n.push("--args",...t);let f=ce.spawn(s,n,c);return e.wait?new Promise((i,o)=>{f.once("error",o),f.once("close",l=>{if(e.allowNonzeroExitCode&&l>0){o(new Error(`Exited with code ${l}`));return}i(f)})}):(f.unref(),f)},S=(e,r)=>{if(typeof e!="string")throw new TypeError("Expected a `target`");return h(m(a({},r),{target:e}))},fe=(e,r)=>{if(typeof e!="string")throw new TypeError("Expected a `name`");let{arguments:t=[]}=r||{};if(t!=null&&!Array.isArray(t))throw new TypeError("Expected `appArguments` as Array type");return h(m(a({},r),{app:{name:e,arguments:t}}))};function U(e){if(typeof e=="string"||Array.isArray(e))return e;let{[I]:r}=e;if(!r)throw new Error(`${I} is not supported`);return r}function _({[u]:e},{wsl:r}){if(r&&g)return U(r);if(!e)throw new Error(`${u} is not supported`);return U(e)}var w={};E(w,"chrome",()=>_({darwin:"google chrome",win32:"chrome",linux:["google-chrome","google-chrome-stable","chromium"]},{wsl:{ia32:"/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",x64:["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe","/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"]}}));E(w,"firefox",()=>_({darwin:"firefox",win32:"C:\\Program Files\\Mozilla Firefox\\firefox.exe",linux:"firefox"},{wsl:"/mnt/c/Program Files/Mozilla Firefox/firefox.exe"}));E(w,"edge",()=>_({darwin:"microsoft edge",win32:"msedge",linux:["microsoft-edge","microsoft-edge-dev"]},{wsl:"/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"}));S.apps=w;S.openApp=fe;X.exports=S});var de={};Z(de,{default:()=>le});var j=ee(G());function N(e){return"maps://"+"?q="+encodeURI(e)}var le=async e=>{let{query:r}=e.arguments,t=N(r);(0,j.default)(t)};module.exports=re(de);0&&(module.exports={});
