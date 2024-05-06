import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_C0VA0hLr.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BIe0mclZ.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.B7fnTt6R.js"},{"type":"external","value":"/_astro/page.BIe0mclZ.js"}],"styles":[{"type":"external","src":"/_astro/about.BGQerxXl.css"},{"type":"inline","content":":root{--accent: #a3e635;--accent-dark: #1a2e05;--black: 15, 18, 25;--gray: 96, 115, 159;--gray-light: 229, 233, 240;--gray-dark: 34, 41, 57;--gray-gradient: rgba(var(--gray-light), 50%), #fff;--box-shadow: 0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%), 0 16px 32px rgba(var(--gray), 33%)}@font-face{font-family:SpaceGrotesk;src:url(/fonts/SpaceGrotesk-VariableFont_wght.woff2) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:TomorrowRegular;src:url(/fonts/Tomorrow-Regular.ttf) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:TomorrowMedium;src:url(/fonts/Tomorrow-Medium.ttf) format(\"woff\");font-weight:medium;font-style:normal;font-display:swap}@font-face{font-family:TomorrowBold;src:url(/fonts/Tomorrow-Bold.ttf) format(\"woff\");font-weight:700;font-style:normal;font-display:swap}*{box-sizing:border-box}.tomorrowbold{font-family:TomorrowBold}body{font-family:SpaceGrotesk;margin:0;padding:0;text-align:left;background-color:#060913;color:#f2f6fa;font-size:1rem}strong,b{font-weight:700}textarea{width:100%;font-size:16px}input{font-size:16px}table{width:100%}code{padding:2px 5px;background-color:rgb(var(--gray-light));border-radius:2px}pre{padding:1.5em;border-radius:8px}pre>code{all:unset}blockquote{background-color:#121521;padding:20px;font-size:1.333em}hr{border:none;border-top:1px solid rgb(var(--gray-light))}@media screen and (max-width: 720px){body{font-size:18px}}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n.c-breadcrumbs{--color-link-breadcrumbs: inherit;--size-font-breadcrumbs: 1rem;--spacing-vertical-separator-breadcrumbs: 6px}.c-breadcrumbs .has-ellipsis{display:var(--display-ellipsis-breadcrumbs, none)}.c-breadcrumbs.is-truncated .has-ellipsis{--display-ellipsis-breadcrumbs: flex}.c-breadcrumbs.is-truncated .c-breadcrumbs__crumb{visibility:var(--visibility-truncated-breadcrumbs, hidden);position:var(--position-truncated-breadcrumbs, absolute)}.c-breadcrumbs.is-truncated .c-breadcrumbs__crumb:first-of-type,.c-breadcrumbs.is-truncated .c-breadcrumbs__crumb:last-of-type,.c-breadcrumbs.is-truncated .c-breadcrumbs__crumb.has-ellipsis{--visibility-truncated-breadcrumbs: visible;--position-truncated-breadcrumbs: relative}.c-breadcrumbs__truncated-button{background-color:transparent;border:none;padding:0;margin:0;cursor:pointer;color:var(--color-truncated-button, var(--color-link-breadcrumbs))}.c-breadcrumbs__crumb:has(.c-breadcrumbs__separator) .c-breadcrumbs__separator{display:flex;align-items:center;justify-content:center;margin:0 var(--spacing-vertical-separator-breadcrumbs)}.c-breadcrumbs__link,.c-breadcrumbs__truncated-button{font-size:var(--size-font-breadcrumbs);text-decoration:none;color:var(--color-link-breadcrumbs);line-height:1}.c-breadcrumbs{--color-link-breadcrumbs: #d1d5db;--size-font-breadcrumbs: 1rem;--spacing-vertical-separator-breadcrumbs: 6px}.c-breadcrumbs__crumbs{list-style-type:none;margin:0;padding:0;display:flex;flex-wrap:wrap}.c-breadcrumbs__crumbs:where(.has-no-separators){row-gap:var(--spacing-vertical-separator-breadcrumbs);-moz-column-gap:1rem;column-gap:1rem}.c-breadcrumbs__crumb{display:flex;align-items:center}.c-breadcrumbs__crumb:has(.c-breadcrumbs__separator) .c-breadcrumbs__separator{display:flex;align-items:center;justify-content:center;margin:0 var(--spacing-vertical-separator-breadcrumbs);color:#a3e635}.c-breadcrumbs__crumb:has(svg,image) :where(svg,image){max-width:var(--size-font-breadcrumbs);max-height:var(--size-font-breadcrumbs)}.c-breadcrumbs__link,.c-breadcrumbs__truncated-button{font-size:var(--size-font-breadcrumbs);text-decoration:none;color:var(--color-link-breadcrumbs);line-height:1;transition:all .3s ease}@media (hover: hover){.c-breadcrumbs__link:hover,.c-breadcrumbs__truncated-button:hover{--color-link-breadcrumbs: #a3e635}}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BIe0mclZ.js"}],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.1GP5DfDW.js"},{"type":"external","value":"/_astro/page.BIe0mclZ.js"}],"styles":[{"type":"external","src":"/_astro/about.BGQerxXl.css"},{"type":"inline","content":":root{--accent: #a3e635;--accent-dark: #1a2e05;--black: 15, 18, 25;--gray: 96, 115, 159;--gray-light: 229, 233, 240;--gray-dark: 34, 41, 57;--gray-gradient: rgba(var(--gray-light), 50%), #fff;--box-shadow: 0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%), 0 16px 32px rgba(var(--gray), 33%)}@font-face{font-family:SpaceGrotesk;src:url(/fonts/SpaceGrotesk-VariableFont_wght.woff2) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:TomorrowRegular;src:url(/fonts/Tomorrow-Regular.ttf) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:TomorrowMedium;src:url(/fonts/Tomorrow-Medium.ttf) format(\"woff\");font-weight:medium;font-style:normal;font-display:swap}@font-face{font-family:TomorrowBold;src:url(/fonts/Tomorrow-Bold.ttf) format(\"woff\");font-weight:700;font-style:normal;font-display:swap}*{box-sizing:border-box}.tomorrowbold{font-family:TomorrowBold}body{font-family:SpaceGrotesk;margin:0;padding:0;text-align:left;background-color:#060913;color:#f2f6fa;font-size:1rem}strong,b{font-weight:700}textarea{width:100%;font-size:16px}input{font-size:16px}table{width:100%}code{padding:2px 5px;background-color:rgb(var(--gray-light));border-radius:2px}pre{padding:1.5em;border-radius:8px}pre>code{all:unset}blockquote{background-color:#121521;padding:20px;font-size:1.333em}hr{border:none;border-top:1px solid rgb(var(--gray-light))}@media screen and (max-width: 720px){body{font-size:18px}}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://example.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/coihsan/grandpa-blog/src/components/RelatedPost.astro",{"propagation":"in-tree","containsHead":false}],["/home/coihsan/grandpa-blog/src/layouts/BlogPost.astro",{"propagation":"in-tree","containsHead":false}],["/home/coihsan/grandpa-blog/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/coihsan/grandpa-blog/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/coihsan/grandpa-blog/src/components/section/PopularPost.astro",{"propagation":"in-tree","containsHead":false}],["/home/coihsan/grandpa-blog/src/pages/blog/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/coihsan/grandpa-blog/src/components/ui/Tags.astro",{"propagation":"in-tree","containsHead":false}],["/home/coihsan/grandpa-blog/src/components/ByTags.astro",{"propagation":"in-tree","containsHead":false}],["/home/coihsan/grandpa-blog/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["/home/coihsan/grandpa-blog/src/pages/tags/[tag].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/coihsan/grandpa-blog/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_C2WrQvbj.mjs","/src/pages/index.astro":"chunks/pages/index_BvwtI6FX.mjs","/src/pages/rss.xml.js":"chunks/pages/rss_D9An81TR.mjs","\u0000@astrojs-manifest":"manifest_5xfmw5Um.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_ClFlK6cR.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_C1YjvvQi.mjs","\u0000@astro-page:src/pages/blog/[...page]@_@astro":"chunks/_.._Xb0z5u4T.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"chunks/_.._Bkd2bD4y.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"chunks/rss_CWyMF0t5.mjs","\u0000@astro-page:src/pages/tags/[tag]@_@astro":"chunks/_tag__CL1D4_x5.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_DEUAqsZu.mjs","/home/coihsan/grandpa-blog/src/content/posts/adssearchcopilot.md?astroContentCollectionEntry=true":"chunks/adssearchcopilot_DgunFUyc.mjs","/home/coihsan/grandpa-blog/src/content/posts/bidding-battlefield-google-ads-bidding-strategy.md?astroContentCollectionEntry=true":"chunks/bidding-battlefield-google-ads-bidding-strategy_usmqgGjr.mjs","/home/coihsan/grandpa-blog/src/content/posts/broadmatch-google-ads-friend-or-no.md?astroContentCollectionEntry=true":"chunks/broadmatch-google-ads-friend-or-no_DLjv2jE4.mjs","/home/coihsan/grandpa-blog/src/content/posts/embracing-eutomation.md?astroContentCollectionEntry=true":"chunks/embracing-eutomation_BtAzxyu2.mjs","/home/coihsan/grandpa-blog/src/content/posts/google-ads-campaign-objective-2024.md?astroContentCollectionEntry=true":"chunks/google-ads-campaign-objective-2024_CeyaaFdH.mjs","/home/coihsan/grandpa-blog/src/content/posts/google-update-des-2023.md?astroContentCollectionEntry=true":"chunks/google-update-des-2023_CszPL0ma.mjs","/home/coihsan/grandpa-blog/src/content/posts/keywordtypes.md?astroContentCollectionEntry=true":"chunks/keywordtypes_D5mj74Fd.mjs","/home/coihsan/grandpa-blog/src/content/posts/performance-max.md?astroContentCollectionEntry=true":"chunks/performance-max_D617P_jV.mjs","/home/coihsan/grandpa-blog/src/content/posts/riseoftherobots.md?astroContentCollectionEntry=true":"chunks/riseoftherobots_Bl2bFzCi.mjs","/home/coihsan/grandpa-blog/src/content/posts/searchlabyrinth.md?astroContentCollectionEntry=true":"chunks/searchlabyrinth_BfDax_As.mjs","/home/coihsan/grandpa-blog/src/content/posts/seo-or-ppc.md?astroContentCollectionEntry=true":"chunks/seo-or-ppc_N8cYIpgr.mjs","/home/coihsan/grandpa-blog/src/content/posts/similar-rip.md?astroContentCollectionEntry=true":"chunks/similar-rip_B5DBBEZr.mjs","/home/coihsan/grandpa-blog/src/content/posts/the-Compass-of-your-digital-marketing-strategy.md?astroContentCollectionEntry=true":"chunks/the-Compass-of-your-digital-marketing-strategy_Bfi3VrzD.mjs","/home/coihsan/grandpa-blog/src/content/posts/what-is-invalid-clicks-in-google-ads.md?astroContentCollectionEntry=true":"chunks/what-is-invalid-clicks-in-google-ads_B5RM7Kv2.mjs","/home/coihsan/grandpa-blog/src/content/posts/adssearchcopilot.md?astroPropagatedAssets":"chunks/adssearchcopilot_iQYG6FmD.mjs","/home/coihsan/grandpa-blog/src/content/posts/bidding-battlefield-google-ads-bidding-strategy.md?astroPropagatedAssets":"chunks/bidding-battlefield-google-ads-bidding-strategy_Dxe3AoMz.mjs","/home/coihsan/grandpa-blog/src/content/posts/broadmatch-google-ads-friend-or-no.md?astroPropagatedAssets":"chunks/broadmatch-google-ads-friend-or-no_DKXIfAho.mjs","/home/coihsan/grandpa-blog/src/content/posts/embracing-eutomation.md?astroPropagatedAssets":"chunks/embracing-eutomation_DuwZbnCo.mjs","/home/coihsan/grandpa-blog/src/content/posts/google-ads-campaign-objective-2024.md?astroPropagatedAssets":"chunks/google-ads-campaign-objective-2024_BzNi5mjL.mjs","/home/coihsan/grandpa-blog/src/content/posts/google-update-des-2023.md?astroPropagatedAssets":"chunks/google-update-des-2023_B4MzNYIo.mjs","/home/coihsan/grandpa-blog/src/content/posts/keywordtypes.md?astroPropagatedAssets":"chunks/keywordtypes_CLEzGedU.mjs","/home/coihsan/grandpa-blog/src/content/posts/performance-max.md?astroPropagatedAssets":"chunks/performance-max_DDdNIsfL.mjs","/home/coihsan/grandpa-blog/src/content/posts/riseoftherobots.md?astroPropagatedAssets":"chunks/riseoftherobots_DwCChiWE.mjs","/home/coihsan/grandpa-blog/src/content/posts/searchlabyrinth.md?astroPropagatedAssets":"chunks/searchlabyrinth_CYL2LmAo.mjs","/home/coihsan/grandpa-blog/src/content/posts/seo-or-ppc.md?astroPropagatedAssets":"chunks/seo-or-ppc_Dx4C63YX.mjs","/home/coihsan/grandpa-blog/src/content/posts/similar-rip.md?astroPropagatedAssets":"chunks/similar-rip_BqJfdT9I.mjs","/home/coihsan/grandpa-blog/src/content/posts/the-Compass-of-your-digital-marketing-strategy.md?astroPropagatedAssets":"chunks/the-Compass-of-your-digital-marketing-strategy_B0qmMeoH.mjs","/home/coihsan/grandpa-blog/src/content/posts/what-is-invalid-clicks-in-google-ads.md?astroPropagatedAssets":"chunks/what-is-invalid-clicks-in-google-ads_BZtQePuM.mjs","/home/coihsan/grandpa-blog/src/content/posts/adssearchcopilot.md":"chunks/adssearchcopilot_BzoIcnaZ.mjs","/home/coihsan/grandpa-blog/src/content/posts/bidding-battlefield-google-ads-bidding-strategy.md":"chunks/bidding-battlefield-google-ads-bidding-strategy_Cv0TE09e.mjs","/home/coihsan/grandpa-blog/src/content/posts/broadmatch-google-ads-friend-or-no.md":"chunks/broadmatch-google-ads-friend-or-no_e0sa9cJ2.mjs","/home/coihsan/grandpa-blog/src/content/posts/embracing-eutomation.md":"chunks/embracing-eutomation_DifV0LbT.mjs","/home/coihsan/grandpa-blog/src/content/posts/google-ads-campaign-objective-2024.md":"chunks/google-ads-campaign-objective-2024_CkUDE5DQ.mjs","/home/coihsan/grandpa-blog/src/content/posts/google-update-des-2023.md":"chunks/google-update-des-2023_CrcBrfZ9.mjs","/home/coihsan/grandpa-blog/src/content/posts/keywordtypes.md":"chunks/keywordtypes_D7Tq99IG.mjs","/home/coihsan/grandpa-blog/src/content/posts/performance-max.md":"chunks/performance-max_Dyokl5gh.mjs","/home/coihsan/grandpa-blog/src/content/posts/riseoftherobots.md":"chunks/riseoftherobots_BcsQTcyn.mjs","/home/coihsan/grandpa-blog/src/content/posts/searchlabyrinth.md":"chunks/searchlabyrinth_aaA2QXgC.mjs","/home/coihsan/grandpa-blog/src/content/posts/seo-or-ppc.md":"chunks/seo-or-ppc_DqnIDFPM.mjs","/home/coihsan/grandpa-blog/src/content/posts/similar-rip.md":"chunks/similar-rip_D-AMKKH-.mjs","/home/coihsan/grandpa-blog/src/content/posts/the-Compass-of-your-digital-marketing-strategy.md":"chunks/the-Compass-of-your-digital-marketing-strategy_DITEDrGm.mjs","/home/coihsan/grandpa-blog/src/content/posts/what-is-invalid-clicks-in-google-ads.md":"chunks/what-is-invalid-clicks-in-google-ads_C7HCn8UU.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.1GP5DfDW.js","/home/coihsan/grandpa-blog/node_modules/workbox-window/build/workbox-window.prod.es5.mjs":"_astro/workbox-window.prod.es5.DFjpnwFp.js","/astro/hoisted.js?q=3":"_astro/hoisted.Y42tPls6.js","astro:scripts/page.js":"_astro/page.BIe0mclZ.js","/astro/hoisted.js?q=1":"_astro/hoisted.B7fnTt6R.js","/astro/hoisted.js?q=2":"_astro/hoisted.Ie7pi4NY.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/grandpa-logo.DCSvhGeK.webp","/_astro/_page_.DvP7ZEjN.css","/_astro/about.BGQerxXl.css","/favicon.svg","/manifest.webmanifest","/sw.js","/workbox-7cfec069.js","/_astro/ViewTransitions.astro_astro_type_script_index_0_lang.DnFK6dK7.js","/_astro/hoisted.1GP5DfDW.js","/_astro/hoisted.B7fnTt6R.js","/_astro/hoisted.Ie7pi4NY.js","/_astro/hoisted.Y42tPls6.js","/_astro/page.BIe0mclZ.js","/_astro/preload-helper.ygWHROA3.js","/_astro/workbox-window.prod.es5.DFjpnwFp.js","/fonts/SpaceGrotesk-VariableFont_wght.woff2","/fonts/Tomorrow-Bold.ttf","/fonts/Tomorrow-Medium.ttf","/fonts/Tomorrow-Regular.ttf","/pagefind/pagefind.js","/_astro/page.BIe0mclZ.js"],"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
