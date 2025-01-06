(()=>{"use strict";var e,r={531:()=>{const e=window.wp.blocks,r=window.wp.i18n,s=window.wp.element,i=window.wp.blockEditor,a=[{TagName:"WhyanbeelWTP.WHYLT5500_PV1",Units:"%",Description:"LT5500 Treated Water Reservoir Level",DateTime:"2024-12-19T14:06:00.0000000Z",Value:85.0437436785017},{TagName:"MossmanWTP.MOSLT5133_PV1",Units:"%",Description:"LT5133 Clearwell Mossman Reservoir Level",DateTime:"2024-12-20T03:54:00.0000000Z",Value:94.9312545157768},{TagName:"MossmanWTP.MOSLT5132_PV1",Units:"%",Description:"LT5132 Clearwell Port Douglas Reservoir Level",DateTime:"2024-12-20T03:54:15.0000000Z",Value:92.8984355926514},{TagName:"DWTP.DAILT5175_PV1",Units:"%",Description:"LT5175 Treated Water Reservoir Level",DateTime:"2024-12-20T03:54:30.0000000Z",Value:89.1531181335449}],t=window.ReactJSXRuntime,o=JSON.parse('{"UU":"create-block/reservoirs-levels-widget"}');(0,e.registerBlockType)(o.UU,{edit:function(){const[e,o]=(0,s.useState)([]),[n,l]=(0,s.useState)(null),c=`${pluginAssets.images}map.svg`,v=`${pluginAssets.images}water-icon.svg`;return console.log(c),(0,s.useEffect)((()=>{(async function({url:e="https://www.odasa.com.au/douglas-website-data",mock:r=!1}){if(r)return a;const s=await fetch(e);if(!s.ok)throw new Error("Network response was not ok");return await s.json()})({mock:!0}).then((e=>{o(e)})).catch((e=>{l(e.message)}))}),[]),(0,t.jsxs)("div",{...(0,i.useBlockProps)(),children:[(0,t.jsx)("h2",{className:"reservoirs-title",children:(0,r.__)("How full are our reservoirs?","reservoirs-levels-widget")}),(0,t.jsx)("div",{className:"map-container",children:(0,t.jsx)("img",{src:c,alt:"Reservoir Map",className:"map-image"})}),(0,t.jsx)("div",{className:"water-icon-container",children:(0,t.jsx)("img",{src:v,alt:"Water Icon",className:"water-icon"})}),n?(0,t.jsxs)("p",{children:[(0,r.__)("Error loading data:","reservoirs-levels-widget")," ",n]}):e.length>0?(0,t.jsx)("ul",{children:e.map(((e,r)=>(0,t.jsxs)("li",{children:[(0,t.jsxs)("strong",{children:[e.Description,":"]})," ",e.Value," ",e.Units," (",e.DateTime,")"]},r)))}):(0,t.jsx)("p",{children:(0,r.__)("Loading data...","reservoirs-levels-widget")})]})},save:function(){return(0,t.jsx)("p",{...i.useBlockProps.save(),children:"Reservoirs Levels Widget – hello from the saved content!"})}})}},s={};function i(e){var a=s[e];if(void 0!==a)return a.exports;var t=s[e]={exports:{}};return r[e](t,t.exports,i),t.exports}i.m=r,e=[],i.O=(r,s,a,t)=>{if(!s){var o=1/0;for(v=0;v<e.length;v++){for(var[s,a,t]=e[v],n=!0,l=0;l<s.length;l++)(!1&t||o>=t)&&Object.keys(i.O).every((e=>i.O[e](s[l])))?s.splice(l--,1):(n=!1,t<o&&(o=t));if(n){e.splice(v--,1);var c=a();void 0!==c&&(r=c)}}return r}t=t||0;for(var v=e.length;v>0&&e[v-1][2]>t;v--)e[v]=e[v-1];e[v]=[s,a,t]},i.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={57:0,350:0};i.O.j=r=>0===e[r];var r=(r,s)=>{var a,t,[o,n,l]=s,c=0;if(o.some((r=>0!==e[r]))){for(a in n)i.o(n,a)&&(i.m[a]=n[a]);if(l)var v=l(i)}for(r&&r(s);c<o.length;c++)t=o[c],i.o(e,t)&&e[t]&&e[t][0](),e[t]=0;return i.O(v)},s=globalThis.webpackChunkreservoirs_levels_widget=globalThis.webpackChunkreservoirs_levels_widget||[];s.forEach(r.bind(null,0)),s.push=r.bind(null,s.push.bind(s))})();var a=i.O(void 0,[350],(()=>i(531)));a=i.O(a)})();