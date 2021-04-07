import{access as e,readFile as t,constants as s}from"fs";import r from"glob";import i from"path";import{parse as a}from"postcss";import n from"postcss-selector-parser";import{promisify as o}from"util";function c(e,t){t&&t.forEach(e.add,e)}class l{constructor(e){this.undetermined=new Set,this.attrNames=new Set,this.attrValues=new Set,this.classes=new Set,this.ids=new Set,this.tags=new Set,this.merge(e)}merge(e){return Array.isArray(e)?c(this.undetermined,e):e instanceof l?(c(this.undetermined,e.undetermined),c(this.attrNames,e.attrNames),c(this.attrValues,e.attrValues),c(this.classes,e.classes),c(this.ids,e.ids),c(this.tags,e.tags)):(c(this.undetermined,e.undetermined),e.attributes&&(c(this.attrNames,e.attributes.names),c(this.attrValues,e.attributes.values)),c(this.classes,e.classes),c(this.ids,e.ids),c(this.tags,e.tags)),this}hasAttrName(e){return this.attrNames.has(e)||this.undetermined.has(e)}someAttrValue(e){for(const t of this.attrValues)if(e(t))return!0;for(const t of this.undetermined)if(e(t))return!0;return!1}hasAttrPrefix(e){return this.someAttrValue((t=>t.startsWith(e)))}hasAttrSuffix(e){return this.someAttrValue((t=>t.endsWith(e)))}hasAttrSubstr(e){return e.trim().split(" ").every((e=>this.someAttrValue((t=>t.includes(e)))))}hasAttrValue(e){return this.attrValues.has(e)||this.undetermined.has(e)}hasClass(e){return this.classes.has(e)||this.undetermined.has(e)}hasId(e){return this.ids.has(e)||this.undetermined.has(e)}hasTag(e){return this.tags.has(e)||this.undetermined.has(e)}}const u=["*","::-webkit-scrollbar","::selection",":root","::before","::after"],h={css:[],content:[],defaultExtractor:e=>e.match(/[A-Za-z0-9_-]+/g)||[],extractors:[],fontFace:!1,keyframes:!1,rejected:!1,stdin:!1,stdout:!1,variables:!1,safelist:{standard:[],deep:[],greedy:[],variables:[],keyframes:[]},blocklist:[],skippedContentGlobs:[],dynamicAttributes:[]};class d{constructor(e){this.nodes=[],this.isUsed=!1,this.value=e}}class f{constructor(){this.nodes=new Map,this.usedVariables=new Set,this.safelist=[]}addVariable(e){const{prop:t}=e;if(!this.nodes.has(t)){const s=new d(e);this.nodes.set(t,s)}}addVariableUsage(e,t){const{prop:s}=e,r=this.nodes.get(s);for(const e of t){const t=e[1];if(this.nodes.has(t)){const e=this.nodes.get(t);null==r||r.nodes.push(e)}}}addVariableUsageInProperties(e){for(const t of e){const e=t[1];this.usedVariables.add(e)}}setAsUsed(e){const t=[this.nodes.get(e)];for(;0!==t.length;){const e=t.pop();e&&!e.isUsed&&(e.isUsed=!0,t.push(...e.nodes))}}removeUnused(){for(const e of this.usedVariables){const t=this.nodes.get(e);if(t){F(t.value.value,/var\((.+?)[,)]/g).forEach((e=>{this.usedVariables.has(e[1])||this.usedVariables.add(e[1])}))}}for(const e of this.usedVariables)this.setAsUsed(e);for(const[e,t]of this.nodes)t.isUsed||this.isVariablesSafelisted(e)||t.value.remove()}isVariablesSafelisted(e){return this.safelist.some((t=>"string"==typeof t?t===e:t.test(e)))}}const p={access:o(e),readFile:o(t)};function m(e=[]){return Array.isArray(e)?{...h.safelist,standard:e}:{...h.safelist,...e}}async function g(e="purgecss.config.js"){let t;try{const s=i.join(process.cwd(),e);t=await import(s)}catch(e){throw new Error("Error loading the config file "+e.message)}return{...h,...t,safelist:m(t.safelist)}}async function v(e,t){return new l(await t(e))}function y(e,t){switch(t){case"next":return e.text.includes("purgecss ignore");case"start":return e.text.includes("purgecss start ignore");case"end":return e.text.includes("purgecss end ignore")}}function S(...e){const t=new l([]);return e.forEach(t.merge,t),t}function b(e){return e.replace(/(^["'])|(["']$)/g,"")}function w(e,t){if(!t.hasAttrName(e.attribute))return!1;if(void 0===e.value)return!0;switch(e.operator){case"$=":return t.hasAttrSuffix(e.value);case"~=":case"*=":return t.hasAttrSubstr(e.value);case"=":return t.hasAttrValue(e.value);case"|=":case"^=":return t.hasAttrPrefix(e.value);default:return!0}}function V(e,t){return t.hasId(e.value)}function A(e,t){return t.hasTag(e.value)}function F(e,t){const s=[];return e.replace(t,(function(){const t=arguments,r=Array.prototype.slice.call(t,0,-2);return r.input=t[t.length-1],r.index=t[t.length-2],s.push(r),e})),s}function k(e){return"atrule"===(null==e?void 0:e.type)}function x(e){return"rule"===(null==e?void 0:e.type)}class U{constructor(){this.ignore=!1,this.atRules={fontFace:[],keyframes:[]},this.usedAnimations=new Set,this.usedFontFaces=new Set,this.selectorsRemoved=new Set,this.variablesStructure=new f,this.options=h}collectDeclarationsData(e){const{prop:t,value:s}=e;if(this.options.variables){const r=F(s,/var\((.+?)[,)]/g);t.startsWith("--")?(this.variablesStructure.addVariable(e),r.length>0&&this.variablesStructure.addVariableUsage(e,r)):r.length>0&&this.variablesStructure.addVariableUsageInProperties(r)}if(!this.options.keyframes||"animation"!==t&&"animation-name"!==t)if(this.options.fontFace){if("font-family"===t)for(const e of s.split(",")){const t=b(e.trim());this.usedFontFaces.add(t)}}else;else for(const e of s.split(/[\s,]+/))this.usedAnimations.add(e)}getFileExtractor(e,t){const s=t.find((t=>t.extensions.find((t=>e.endsWith(t)))));return void 0===s?this.options.defaultExtractor:s.extractor}async extractSelectorsFromFiles(e,t){const i=new l([]);for(const a of e){let e=[];try{await p.access(a,s.F_OK),e.push(a)}catch(t){e=r.sync(a,{nodir:!0,ignore:this.options.skippedContentGlobs})}for(const s of e){const e=await p.readFile(s,"utf-8"),r=this.getFileExtractor(s,t),a=await v(e,r);i.merge(a)}}return i}async extractSelectorsFromString(e,t){const s=new l([]);for(const{raw:r,extension:i}of e){const e=this.getFileExtractor("."+i,t),a=await v(r,e);s.merge(a)}return s}evaluateAtRule(e){if(this.options.keyframes&&e.name.endsWith("keyframes"))this.atRules.keyframes.push(e);else if(this.options.fontFace&&"font-face"===e.name&&e.nodes)for(const t of e.nodes)"decl"===t.type&&"font-family"===t.prop&&this.atRules.fontFace.push({name:b(t.value),node:e})}async evaluateRule(e,t){if(this.ignore)return;const s=e.prev();if(function(e){return"comment"===(null==e?void 0:e.type)}(s)&&y(s,"next"))return void s.remove();if(e.parent&&k(e.parent)&&"keyframes"===e.parent.name)return;if(!x(e))return;if(function(e){let t=!1;return e.walkComments((e=>{e&&"comment"===e.type&&e.text.includes("purgecss ignore current")&&(t=!0,e.remove())})),t}(e))return;let r=!0;if(e.selector=n((e=>{e.walk((e=>{"selector"===e.type&&(r=this.shouldKeepSelector(e,t),r||(this.options.rejected&&this.selectorsRemoved.add(e.toString()),e.remove()))}))})).processSync(e.selector),r&&void 0!==e.nodes)for(const t of e.nodes)"decl"===t.type&&this.collectDeclarationsData(t);const i=e.parent;e.selector||e.remove(),function(e){return!!(x(e)&&!e.selector||(null==e?void 0:e.nodes)&&!e.nodes.length||k(e)&&(!e.nodes&&!e.params||!e.params&&e.nodes&&!e.nodes.length))}(i)&&(null==i||i.remove())}async getPurgedCSS(e,t){const s=[],i=[];for(const t of e)"string"==typeof t?i.push(...r.sync(t,{nodir:!0,ignore:this.options.skippedContentGlobs})):i.push(t);for(const e of i){const r="string"==typeof e?this.options.stdin?e:await p.readFile(e,"utf-8"):e.raw,i=a(r);this.walkThroughCSS(i,t),this.options.fontFace&&this.removeUnusedFontFaces(),this.options.keyframes&&this.removeUnusedKeyframes(),this.options.variables&&this.removeUnusedCSSVariables();const n={css:i.toString(),file:"string"==typeof e?e:void 0};"string"==typeof e&&(n.file=e),this.options.rejected&&(n.rejected=Array.from(this.selectorsRemoved),this.selectorsRemoved.clear()),s.push(n)}return s}isKeyframesSafelisted(e){return this.options.safelist.keyframes.some((t=>"string"==typeof t?t===e:t.test(e)))}isSelectorBlocklisted(e){return this.options.blocklist.some((t=>"string"==typeof t?t===e:t.test(e)))}isSelectorSafelisted(e){const t=this.options.safelist.standard.some((t=>"string"==typeof t?t===e:t.test(e)));return u.includes(e)||t}isSelectorSafelistedDeep(e){return this.options.safelist.deep.some((t=>t.test(e)))}isSelectorSafelistedGreedy(e){return this.options.safelist.greedy.some((t=>t.test(e)))}async purge(e){this.options="object"!=typeof e?await g(e):{...h,...e,safelist:m(e.safelist)};const{content:t,css:s,extractors:r,safelist:i}=this.options;this.options.variables&&(this.variablesStructure.safelist=i.variables||[]);const a=t.filter((e=>"string"==typeof e)),n=t.filter((e=>"object"==typeof e)),o=await this.extractSelectorsFromFiles(a,r),c=await this.extractSelectorsFromString(n,r);return this.getPurgedCSS(s,S(o,c))}removeUnusedCSSVariables(){this.variablesStructure.removeUnused()}removeUnusedFontFaces(){for(const{name:e,node:t}of this.atRules.fontFace)this.usedFontFaces.has(e)||t.remove()}removeUnusedKeyframes(){for(const e of this.atRules.keyframes)this.usedAnimations.has(e.params)||this.isKeyframesSafelisted(e.params)||e.remove()}getSelectorValue(e){return"attribute"===e.type&&e.attribute||e.value}shouldKeepSelector(e,t){if(function(e){return e.parent&&"pseudo"===e.parent.type&&e.parent.value.startsWith(":")||!1}(e))return!0;if(this.options.safelist.greedy.length>0){if(e.nodes.map(this.getSelectorValue).some((e=>e&&this.isSelectorSafelistedGreedy(e))))return!0}let s=!1;for(const i of e.nodes){const e=this.getSelectorValue(i);if(e&&this.isSelectorSafelistedDeep(e))return!0;if(e&&(u.includes(e)||this.isSelectorSafelisted(e)))s=!0;else{if(e&&this.isSelectorBlocklisted(e))return!1;switch(i.type){case"attribute":s=!![...this.options.dynamicAttributes,"value","checked","selected","open"].includes(i.attribute)||w(i,t);break;case"class":r=i,s=t.hasClass(r.value);break;case"id":s=V(i,t);break;case"tag":s=A(i,t);break;default:continue}if(!s)return!1}}var r;return s}walkThroughCSS(e,t){e.walk((e=>"rule"===e.type?this.evaluateRule(e,t):"atrule"===e.type?this.evaluateAtRule(e):void("comment"===e.type&&(y(e,"start")?(this.ignore=!0,e.remove()):y(e,"end")&&(this.ignore=!1,e.remove())))))}}export default U;export{U as PurgeCSS,h as defaultOptions,F as matchAll,S as mergeExtractorSelectors,g as setOptions,m as standardizeSafelist};
