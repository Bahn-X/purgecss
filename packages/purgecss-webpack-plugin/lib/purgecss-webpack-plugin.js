"use strict";var t=require("fs"),s=require("path"),e=require("purgecss"),o=require("webpack-sources");function i(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var n=i(s),r=i(e);const c=[".css",".scss",".styl",".sass",".less"];module.exports=class{constructor(t){this.purgedStats={},this.options=t}apply(t){t.hooks.compilation.tap("PurgeCSS",this.initializePlugin.bind(this))}initializePlugin(s){s.hooks.additionalAssets.tapPromise("PurgeCSS",(()=>{const e="function"==typeof this.options.paths?this.options.paths():this.options.paths;return e.forEach((s=>{if(!t.existsSync(s))throw new Error(`Path ${s} does not exist.`)})),this.runPluginHook(s,e)}))}async runPluginHook(t,s){const i=Object.entries(t.assets).filter((([t])=>function(t,s){const e=n.default.extname((o=t).includes("?")?o.split("?").slice(0,-1).join(""):o);var o;return s.includes(e)}(t,[".css"])));for(const n of t.chunks){const a=i.filter((([t])=>this.options.only?this.options.only.some((s=>t.includes(s))):Array.isArray(n.files)?n.files.includes(t):n.files.has(t)));for(const[i,n]of a){const a=s.filter((t=>!c.some((s=>t.endsWith(s))))),l={...e.defaultOptions,...this.options,content:a,css:[{raw:n.source().toString()}]};"function"==typeof l.safelist&&(l.safelist=l.safelist()),"function"==typeof l.blocklist&&(l.blocklist=l.blocklist());const u=(await(new r.default).purge({content:l.content,css:l.css,defaultExtractor:l.defaultExtractor,extractors:l.extractors,fontFace:l.fontFace,keyframes:l.keyframes,output:l.output,rejected:l.rejected,variables:l.variables,safelist:l.safelist,blocklist:l.blocklist}))[0];u.rejected&&(this.purgedStats[i]=u.rejected),t.updateAsset(i,new o.ConcatSource(u.css))}}}};
