globalThis.process ??= {}; globalThis.process.env ??= {};
import { q as decodeKey } from './chunks/astro/server_D-Mtryzi.mjs';
import './chunks/astro-designed-error-pages_DYFlPcJ2.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_B4WV7lV_.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
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
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
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
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/dev/proyectos/comunicacion-adecra/","cacheDir":"file:///Users/dev/proyectos/comunicacion-adecra/node_modules/.astro/","outDir":"file:///Users/dev/proyectos/comunicacion-adecra/dist/","srcDir":"file:///Users/dev/proyectos/comunicacion-adecra/src/","publicDir":"file:///Users/dev/proyectos/comunicacion-adecra/public/","buildClientDir":"file:///Users/dev/proyectos/comunicacion-adecra/dist/","buildServerDir":"file:///Users/dev/proyectos/comunicacion-adecra/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"buscar/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/buscar","isIndex":false,"type":"page","pattern":"^\\/buscar\\/?$","segments":[[{"content":"buscar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/buscar.astro","pathname":"/buscar","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"cursos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cursos","isIndex":false,"type":"page","pattern":"^\\/cursos\\/?$","segments":[[{"content":"cursos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cursos.astro","pathname":"/cursos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"eventos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/eventos","isIndex":false,"type":"page","pattern":"^\\/eventos\\/?$","segments":[[{"content":"eventos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/eventos.astro","pathname":"/eventos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://comunicacion.adecra.org.ar","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/dev/proyectos/comunicacion-adecra/src/pages/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/dev/proyectos/comunicacion-adecra/src/pages/blog/[page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/dev/proyectos/comunicacion-adecra/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/dev/proyectos/comunicacion-adecra/src/pages/cursos.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/cursos@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/dev/proyectos/comunicacion-adecra/src/pages/eventos.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/eventos@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/dev/proyectos/comunicacion-adecra/src/pages/eventos/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/eventos/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/dev/proyectos/comunicacion-adecra/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/dev/proyectos/comunicacion-adecra/src/pages/buscar.astro",{"propagation":"none","containsHead":true}],["/Users/dev/proyectos/comunicacion-adecra/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/blog/[page]@_@astro":"pages/blog/_page_.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/buscar@_@astro":"pages/buscar.astro.mjs","\u0000@astro-page:src/pages/cursos@_@astro":"pages/cursos.astro.mjs","\u0000@astro-page:src/pages/eventos/[slug]@_@astro":"pages/eventos/_slug_.astro.mjs","\u0000@astro-page:src/pages/eventos@_@astro":"pages/eventos.astro.mjs","\u0000@astro-page:src/pages/[slug]@_@astro":"pages/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Bv2sw9j2.mjs","/Users/dev/proyectos/comunicacion-adecra/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/Users/dev/proyectos/comunicacion-adecra/.astro/content-assets.mjs":"chunks/content-assets_XqCgPAV2.mjs","/Users/dev/proyectos/comunicacion-adecra/.astro/content-modules.mjs":"chunks/content-modules_Bvq7llv8.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BWUS2fwy.mjs","/Users/dev/proyectos/comunicacion-adecra/node_modules/@astrojs/cloudflare/dist/entrypoints/image-service.js":"chunks/image-service_CzsaDLZK.mjs","/Users/dev/proyectos/comunicacion-adecra/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.BY0TnsAM.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/dev/proyectos/comunicacion-adecra/src/components/Header.astro?astro&type=script&index=0&lang.ts","document.getElementById(\"mobile-menu-button\")?.addEventListener(\"click\",function(){document.getElementById(\"mobile-menu\").classList.toggle(\"hidden\")});"]],"assets":["/_astro/_slug_.C2wwMdWs.css","/_redirects","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/index.js","/_worker.js/noop-entrypoint.mjs","/_worker.js/renderers.mjs","/admin/index.html","/_worker.js/_astro/_slug_.C2wwMdWs.css","/_worker.js/chunks/Layout_FjFITl2a.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_4GC9a0ks.mjs","/_worker.js/chunks/_astro_assets_B2TZHZXC.mjs","/_worker.js/chunks/_astro_content_CQUyRtGF.mjs","/_worker.js/chunks/_astro_data-layer-content_BWUS2fwy.mjs","/_worker.js/chunks/astro-designed-error-pages_DYFlPcJ2.mjs","/_worker.js/chunks/astro_DczJy_Sv.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/content-assets_XqCgPAV2.mjs","/_worker.js/chunks/content-modules_Bvq7llv8.mjs","/_worker.js/chunks/image-service_CzsaDLZK.mjs","/_worker.js/chunks/index_wlnI1B0Q.mjs","/_worker.js/chunks/noop-middleware_B4WV7lV_.mjs","/_worker.js/chunks/parse_DGrrK2jG.mjs","/_worker.js/chunks/path_BgNISshD.mjs","/_worker.js/chunks/remote_Bcm9Fvtc.mjs","/_worker.js/pages/404.astro.mjs","/_worker.js/pages/_slug_.astro.mjs","/_worker.js/pages/admin.astro.mjs","/_worker.js/pages/blog.astro.mjs","/_worker.js/pages/buscar.astro.mjs","/_worker.js/pages/cursos.astro.mjs","/_worker.js/pages/eventos.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/chunks/astro/server_D-Mtryzi.mjs","/_worker.js/pages/blog/_page_.astro.mjs","/_worker.js/pages/blog/_slug_.astro.mjs","/_worker.js/pages/eventos/_slug_.astro.mjs","/wp-content/uploads/2021/07/Esterilizacion-Hospitalaria-0-1.jpg","/wp-content/uploads/2021/07/Manual-de-Prevencion-de-Infecciones-Asociadas-al-Cuidado-de-la-Salud-0.jpg","/wp-content/uploads/2021/07/Prevencion-de-Infecciones-Hospitalarias-I-0.jpg","/wp-content/uploads/2021/07/Prevencion-de-Infecciones-Hospitalarias-I-Version-Actualizada-0.jpg","/wp-content/uploads/2021/07/Prevencion-de-Infecciones-Hospitalarias-II-0.jpg","/404.html","/admin/index.html","/blog/index.html","/buscar/index.html","/cursos/index.html","/eventos/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"hXA0pWGWMs1w2jnNK+mgEUKGxTx7XAWBdyb2CdTG3dk=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
