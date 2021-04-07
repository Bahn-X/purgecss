import e,{defaultOptions as t,standardizeSafelist as s,mergeExtractorSelectors as o}from"purgecss";const r=function(r){if(void 0===r)throw new Error("PurgeCSS plugin does not have the correct options");return{postcssPlugin:"postcss-purgecss",OnceExit:(n,c)=>async function(r,n,{result:c}){const i=new e,p={...t,...r,safelist:s(null==r?void 0:r.safelist)};r&&"function"==typeof r.contentFunction&&(p.content=r.contentFunction(n.source&&n.source.input.file||"")),i.options=p;const{content:u,extractors:a}=p,l=u.filter((e=>"string"==typeof e)),f=u.filter((e=>"object"==typeof e)),m=await i.extractSelectorsFromFiles(l,a),g=await i.extractSelectorsFromString(f,a),d=o(m,g);i.walkThroughCSS(n,d),i.options.fontFace&&i.removeUnusedFontFaces(),i.options.keyframes&&i.removeUnusedKeyframes(),i.options.variables&&i.removeUnusedCSSVariables(),i.options.rejected&&i.selectorsRemoved.size>0&&(c.messages.push({type:"purgecss",plugin:"postcss-purgecss",text:`purging ${i.selectorsRemoved.size} selectors:\n          ${Array.from(i.selectorsRemoved).map((e=>e.trim())).join("\n  ")}`}),i.selectorsRemoved.clear())}(r,n,c)}};r.postcss=!0;export default r;
