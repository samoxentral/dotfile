var p=Object.defineProperty,H=Object.defineProperties,N=Object.getOwnPropertyDescriptor,U=Object.getOwnPropertyDescriptors,D=Object.getOwnPropertyNames,l=Object.getOwnPropertySymbols;var g=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var C=(r,e,t)=>e in r?p(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,L=(r,e)=>{for(var t in e||(e={}))g.call(e,t)&&C(r,t,e[t]);if(l)for(var t of l(e))S.call(e,t)&&C(r,t,e[t]);return r},_=(r,e)=>H(r,U(e)),W=r=>p(r,"__esModule",{value:!0});var A=(r,e)=>{var t={};for(var n in r)g.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&l)for(var n of l(r))e.indexOf(n)<0&&S.call(r,n)&&(t[n]=r[n]);return t};var z=(r,e)=>{for(var t in e)p(r,t,{get:e[t],enumerable:!0})},J=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of D(e))!g.call(r,s)&&(t||s!=="default")&&p(r,s,{get:()=>e[s],enumerable:!(n=N(e,s))||n.enumerable});return r};var K=(r=>(e,t)=>r&&r.get(e)||(t=J(W({}),e,1),r&&r.set(e,t),t))(typeof WeakMap!="undefined"?new WeakMap:0);var F={};z(F,{default:()=>R});var c=require("react"),T=require("@raycast/api");var v=require("crypto"),E=require("fs");var u="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",d="0123456789";var k=require("@raycast/api"),V=()=>{let s=(0,k.getPreferenceValues)(),{strength:r,length:e,maxWordLength:t}=s,n=A(s,["strength","length","maxWordLength"]);return _(L({},n),{strength:parseInt(r,10),length:parseInt(e,10),maxWordLength:parseInt(t,10)})},h=V;function*f(...r){if(r.length===0)return;let e=r.map(n=>n[Symbol.iterator]()),t=e.map(n=>n.next());if(t.some(n=>n.done))throw new Error("Input contains an empty iterator.");for(let n=0;;){if(t[n].done){if(e[n]=r[n][Symbol.iterator](),t[n]=e[n].next(),++n>=e.length)return}else yield t.map(({value:s})=>s),n=0;t[n]=e[n].next()}}var a=class{constructor({strength:e,length:t}){this.strength=0;this.preferences=h();let[n,s]=this.generate({strength:e,length:t});this.password=n,this.strength=s}generate({strength:e,length:t}){let n=[];e&&(t=Math.ceil(e/this.entropy)),t=t;for(let s of(0,v.randomBytes)(t))n.push(this.data[s%this.data.length]);return[n.join(""),Math.floor(this.entropy*n.length)]}get entropy(){return Math.log2(this.data.length)}get data(){return""}},w=class extends a{constructor(){super(...arguments);this.id="ascii";this.title="ASCII characters with punctuation"}get data(){return u+d+this.preferences.specialCharacters}},b=class extends a{constructor(){super(...arguments);this.id="alphanumeric";this.title="ASCII characters, no punctuation"}get data(){return u+d}},y=class extends a{constructor(){super(...arguments);this.id="hex";this.title="Hexadecimal characters"}get data(){return"0123456789abcdef"}},x=class extends a{constructor(){super(...arguments);this.id="numeric";this.title="Digits only"}get data(){return d}},m=class extends a{constructor(){super(...arguments);this.id="dictionary";this.title="Dictionary words";this.words=[]}password_by_iterations(e){let t=[];for(let n=0;n<e;n++)t.push(this.data[Math.floor(Math.random()*this.data.length)]);return[t.join(this.preferences.delimiter),Math.floor(this.entropy*e)]}password_by_length(e){let t=[],n=0;for(;n<e;){let s=this.data[Math.floor(Math.random()*this.data.length)];t.push(s),n+=s.length+1}return[t.join(this.preferences.delimiter),Math.floor(this.entropy*t.length)]}generate({strength:e,length:t}){return e?this.password_by_iterations(Math.ceil(e/this.entropy)):this.password_by_length(t)}get data(){if(this.words)return this.words;try{return this.words=(0,E.readFileSync)("/usr/share/dict/words","utf8").split(/\r?\n/),this.words}catch(e){throw console.error(e),e}}},P=class extends m{constructor(){super(...arguments);this.id="pronounceable";this.title="Pronounceable, (mostly) nonsense words"}get data(){let e=["b","bl","br","cl","cr","d","dr","f","fl","fr","g","gl","gr","h","j","k","l","m","n","p","pl","pr","r","s","sk","sl","sm","sn","sp","st","str","sw","t","tr","v","w","y","z"],t=["b","ct","d","f","ft","g","h","k","l","m","mp","n","nd","ng","nk","nt","p","pt","r","sk","sp","ss","st","t","v","w","y","z"],n=["a","e","i","o","u"];this.words=[];for(let s of f(e,n,t))this.words.push(s.join(""));return this.words}};var i=require("@raycast/api");var M=r=>{let e=[{bits:28,color:"#e44759",icon:"\u{1F480}",name:"very_weak"},{bits:35,color:"#f8b32d",icon:"\u{1F622}",name:"weak"},{bits:60,color:"#67a4d3",icon:"\u{1F610}",name:"reasonable"},{bits:128,color:"#33ccb1",icon:"\u{1F60E}",name:"strong"},{bits:1/0,color:"#33cc33",icon:"\u{1F929}",name:"very_strong"}],t=e[0].icon;for(let n of e)if(r<n.bits){t=n.icon;break}return{source:t}};var X=({generator:r,generatePasswords:e})=>_jsx(i.List.Item,{key:r.id,title:r.password,subtitle:`Length: ${r.password.length}`,accessories:[{text:r.title}],icon:M(r.strength),actions:_jsx(i.ActionPanel,null,_jsx(i.Action.CopyToClipboard,{title:"Copy Password",content:r.password,onCopy:e}),_jsx(i.Action.Paste,{content:r.password,onPaste:e}))}),G=X;function R(){let[r,e]=(0,c.useState)(!0),[t,n]=(0,c.useState)(""),[s,j]=(0,c.useState)([]),{length:B}=h(),I=()=>{if(parseInt(t)>0||t===""){let o=parseInt(t,10)||B;j([new m({length:o}),new P({length:o}),new w({length:o}),new b({length:o}),new x({length:o}),new y({length:o})])}};return(0,c.useEffect)(()=>{I(),e(!1)},[t]),_jsx(T.List,{isLoading:r,searchText:t,onSearchTextChange:n,searchBarPlaceholder:"Generate password of given length"},s.map(o=>_jsx(G,{key:o.id,generator:o,generatePasswords:I})))}module.exports=K(F);0&&(module.exports={});