if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,o)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const t=e=>r(e,a),l={module:{uri:a},exports:c,require:t};s[a]=Promise.all(i.map((e=>l[e]||t(e)))).then((e=>(o(...e),c)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_astro/_page_.DvP7ZEjN.css",revision:null},{url:"_astro/about.BGQerxXl.css",revision:null},{url:"_astro/hoisted.1GP5DfDW.js",revision:null},{url:"_astro/hoisted.B7fnTt6R.js",revision:null},{url:"_astro/hoisted.Ie7pi4NY.js",revision:null},{url:"_astro/hoisted.Y42tPls6.js",revision:null},{url:"_astro/page.BIe0mclZ.js",revision:null},{url:"_astro/preload-helper.ygWHROA3.js",revision:null},{url:"_astro/ViewTransitions.astro_astro_type_script_index_0_lang.DnFK6dK7.js",revision:null},{url:"_astro/workbox-window.prod.es5.DFjpnwFp.js",revision:null},{url:"blog",revision:"855d71fc48bf9e1086b09d5ee4e65e69"},{url:"blog/2",revision:"ffa2a12cc1eb03850e70e10c52db4366"},{url:"pagefind/pagefind.js",revision:"9f5897690a24864ab31602ff0cf3094e"},{url:"posts/adssearchcopilot",revision:"beecce4d1d98c62721e8ed4f97ec0af6"},{url:"posts/bidding-battlefield-google-ads-bidding-strategy",revision:"e625786ccca10b09d8e323d2d39b0497"},{url:"posts/broadmatch-google-ads-friend-or-no",revision:"bdf9bf39cc9af6ec16bb3b02c7566c40"},{url:"posts/embracing-eutomation",revision:"ccd534bbe85487bf37427fc0e346a75d"},{url:"posts/google-ads-campaign-objective-2024",revision:"684a1333285e351d580166f18e445d13"},{url:"posts/google-update-des-2023",revision:"cfb549139d7e5088cf48904964d0e24a"},{url:"posts/keywordtypes",revision:"aee6e20f816c70a4d64c7046782fefa7"},{url:"posts/performance-max",revision:"f7284a96d7daf843fdd5b2acc274dfe5"},{url:"posts/riseoftherobots",revision:"de7ee9abafc2d123dca5409b05ec8612"},{url:"posts/searchlabyrinth",revision:"a5cee59d9d624121cef1735f25d4b19c"},{url:"posts/seo-or-ppc",revision:"d6a48705c19dcb703d7f83b1cc7b67be"},{url:"posts/similar-rip",revision:"f043d4f603ed0d9d4fa945b1f08f6588"},{url:"posts/the-compass-of-your-digital-marketing-strategy",revision:"e21fe0541f6a780871c169721fc8a2f3"},{url:"posts/what-is-invalid-clicks-in-google-ads",revision:"9e5557c6f36788f85634b35638329108"},{url:"tags/Algorithms",revision:"c3b7b1cb88cbc8c3f9a8d62741029120"},{url:"tags/Bidding Strategy",revision:"ff43efcbbe8b2709847b3f10b0e5e556"},{url:"tags/Google Ads",revision:"ae1cc9c8411493fd033df9982e3c912a"},{url:"tags/Google Strategy",revision:"d27c63d7905a2da563a66e07921c9433"},{url:"tags/Google Update",revision:"e9162047fb361e61c57e7095095b4307"},{url:"tags/Keyword Research",revision:"77edd13935fa5e0453003bffd5b2fa88"},{url:"tags/KPI",revision:"57cc59013667432c53b4b9886d022419"},{url:"tags/Performance Max",revision:"3c09cbac00f8b1f6c0f02a6c50e17eca"},{url:"tags/PPC",revision:"2cd64d82fb1e8c9a5106b8f0913ca1bf"},{url:"tags/Search Ads",revision:"8cd285f20a37642a254118a998250696"},{url:"manifest.webmanifest",revision:"be42c2a0e66430c912cbf2efb7bf3425"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/")))}));
