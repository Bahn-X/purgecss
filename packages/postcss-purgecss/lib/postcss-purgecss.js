"use strict";var e=require("purgecss");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=t(e);const o=function(t){if(void 0===t)throw new Error("PurgeCSS plugin does not have the correct options");return{postcssPlugin:"postcss-purgecss",OnceExit:(o,r)=>async function(t,o,{result:r}){const n=new s.default,c={...e.defaultOptions,...t,safelist:e.standardizeSafelist(null==t?void 0:t.safelist)};t&&"function"==typeof t.contentFunction&&(c.content=t.contentFunction(o.source&&o.source.input.file||"")),n.options=c;const{content:i,extractors:a}=c,u=i.filter((e=>"string"==typeof e)),l=i.filter((e=>"object"==typeof e)),p=await n.extractSelectorsFromFiles(u,a),f=await n.extractSelectorsFromString(l,a),d=e.mergeExtractorSelectors(p,f);n.walkThroughCSS(o,d),n.options.fontFace&&n.removeUnusedFontFaces(),n.options.keyframes&&n.removeUnusedKeyframes(),n.options.variables&&n.removeUnusedCSSVariables(),n.options.rejected&&n.selectorsRemoved.size>0&&(r.messages.push({type:"purgecss",plugin:"postcss-purgecss",text:`purging ${n.selectorsRemoved.size} selectors:\n          ${Array.from(n.selectorsRemoved).map((e=>e.trim())).join("\n  ")}`}),n.selectorsRemoved.clear())}(t,o,r)}};o.postcss=!0,module.exports=o;
