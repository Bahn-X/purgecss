"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var a=e(require("pug-lexer"));module.exports=e=>{const t=a.default(e),s=[];for(const e of t)switch(e.type){case"tag":case"id":case"class":s.push(e.val);break;case"attribute":"class"!==e.name&&"id"!==e.name||s.push(e.mustEscape?e.val.replace(/"/g,""):e.val)}return s};
