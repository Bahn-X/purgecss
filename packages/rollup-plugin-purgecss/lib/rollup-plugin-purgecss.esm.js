import t from"fs";import{PurgeCSS as e}from"purgecss";import{createFilter as n}from"rollup-pluginutils";function r(r){const u=n(r.include||["**/*.css"],r.exclude||"node_modules/**"),s=[];let o="";return{name:"purgecss",transform:async(t,n)=>{if(!u(n))return null;let o=(await(new e).purge({content:r.content,css:[{raw:t}]}))[0].css;return s.push(o),o=JSON.stringify(o),r.insert||(t=r.output?'"";':o),{code:"export default "+t,map:{mappings:""}}},generateBundle(){if(!(r.insert||s.length&&!1!==r.output))return;const e=s.reduce(((t,e)=>t+e),"");return"string"==typeof r.output?t.writeFileSync(r.output,e):"function"==typeof r.output?r.output(e,s):!r.insert&&o?((o.endsWith(".js")||o.endsWith(".ts"))&&(o=o.slice(0,-3)),o+=".css",t.writeFileSync(o,e)):void 0}}}export default r;
