!function(){"use strict";try{self["workbox:core:6.0.2"]&&_()}catch(e){}const e={"invalid-value":({paramName:e,validValueDescription:t,value:a})=>{if(!e||!t)throw new Error("Unexpected input to 'invalid-value' error.");return`The '${e}' parameter was given a value with an unexpected value. ${t} Received a value of ${JSON.stringify(a)}.`},"not-an-array":({moduleName:e,className:t,funcName:a,paramName:r})=>{if(!(e&&t&&a&&r))throw new Error("Unexpected input to 'not-an-array' error.");return`The parameter '${r}' passed into '${e}.${t}.${a}()' must be an array.`},"incorrect-type":({expectedType:e,paramName:t,moduleName:a,className:r,funcName:s})=>{if(!(e&&t&&a&&s))throw new Error("Unexpected input to 'incorrect-type' error.");return`The parameter '${t}' passed into '${a}.${r?r+".":""}${s}()' must be of type ${e}.`},"incorrect-class":({expectedClass:e,paramName:t,moduleName:a,className:r,funcName:s,isReturnValueProblem:n})=>{if(!e||!a||!s)throw new Error("Unexpected input to 'incorrect-class' error.");return n?`The return value from '${a}.${r?r+".":""}${s}()' must be an instance of class ${e.name}.`:`The parameter '${t}' passed into '${a}.${r?r+".":""}${s}()' must be an instance of class ${e.name}.`},"missing-a-method":({expectedMethod:e,paramName:t,moduleName:a,className:r,funcName:s})=>{if(!(e&&t&&a&&r&&s))throw new Error("Unexpected input to 'missing-a-method' error.");return`${a}.${r}.${s}() expected the '${t}' parameter to expose a '${e}' method.`},"add-to-cache-list-unexpected-type":({entry:e})=>`An unexpected entry was passed to 'workbox-precaching.PrecacheController.addToCacheList()' The entry '${JSON.stringify(e)}' isn't supported. You must supply an array of strings with one or more characters, objects with a url property or Request objects.`,"add-to-cache-list-conflicting-entries":({firstEntry:e,secondEntry:t})=>{if(!e||!t)throw new Error("Unexpected input to 'add-to-cache-list-duplicate-entries' error.");return`Two of the entries passed to 'workbox-precaching.PrecacheController.addToCacheList()' had the URL ${e._entryId} but different revision details. Workbox is unable to cache and version the asset correctly. Please remove one of the entries.`},"plugin-error-request-will-fetch":({thrownError:e})=>{if(!e)throw new Error("Unexpected input to 'plugin-error-request-will-fetch', error.");return`An error was thrown by a plugins 'requestWillFetch()' method. The thrown error message was: '${e.message}'.`},"invalid-cache-name":({cacheNameId:e,value:t})=>{if(!e)throw new Error("Expected a 'cacheNameId' for error 'invalid-cache-name'");return`You must provide a name containing at least one character for setCacheDetails({${e}: '...'}). Received a value of '${JSON.stringify(t)}'`},"unregister-route-but-not-found-with-method":({method:e})=>{if(!e)throw new Error("Unexpected input to 'unregister-route-but-not-found-with-method' error.");return`The route you're trying to unregister was not  previously registered for the method type '${e}'.`},"unregister-route-route-not-registered":()=>"The route you're trying to unregister was not previously registered.","queue-replay-failed":({name:e})=>`Replaying the background sync queue '${e}' failed.`,"duplicate-queue-name":({name:e})=>`The Queue name '${e}' is already being used. All instances of backgroundSync.Queue must be given unique names.`,"expired-test-without-max-age":({methodName:e,paramName:t})=>`The '${e}()' method can only be used when the '${t}' is used in the constructor.`,"unsupported-route-type":({moduleName:e,className:t,funcName:a,paramName:r})=>`The supplied '${r}' parameter was an unsupported type. Please check the docs for ${e}.${t}.${a} for valid input types.`,"not-array-of-class":({value:e,expectedClass:t,moduleName:a,className:r,funcName:s,paramName:n})=>`The supplied '${n}' parameter must be an array of '${t}' objects. Received '${JSON.stringify(e)},'. Please check the call to ${a}.${r}.${s}() to fix the issue.`,"max-entries-or-age-required":({moduleName:e,className:t,funcName:a})=>`You must define either config.maxEntries or config.maxAgeSecondsin ${e}.${t}.${a}`,"statuses-or-headers-required":({moduleName:e,className:t,funcName:a})=>`You must define either config.statuses or config.headersin ${e}.${t}.${a}`,"invalid-string":({moduleName:e,funcName:t,paramName:a})=>{if(!a||!e||!t)throw new Error("Unexpected input to 'invalid-string' error.");return`When using strings, the '${a}' parameter must start with 'http' (for cross-origin matches) or '/' (for same-origin matches). Please see the docs for ${e}.${t}() for more info.`},"channel-name-required":()=>"You must provide a channelName to construct a BroadcastCacheUpdate instance.","invalid-responses-are-same-args":()=>"The arguments passed into responsesAreSame() appear to be invalid. Please ensure valid Responses are used.","expire-custom-caches-only":()=>"You must provide a 'cacheName' property when using the expiration plugin with a runtime caching strategy.","unit-must-be-bytes":({normalizedRangeHeader:e})=>{if(!e)throw new Error("Unexpected input to 'unit-must-be-bytes' error.");return`The 'unit' portion of the Range header must be set to 'bytes'. The Range header provided was "${e}"`},"single-range-only":({normalizedRangeHeader:e})=>{if(!e)throw new Error("Unexpected input to 'single-range-only' error.");return`Multiple ranges are not supported. Please use a  single start value, and optional end value. The Range header provided was "${e}"`},"invalid-range-values":({normalizedRangeHeader:e})=>{if(!e)throw new Error("Unexpected input to 'invalid-range-values' error.");return`The Range header is missing both start and end values. At least one of those values is needed. The Range header provided was "${e}"`},"no-range-header":()=>"No Range header was found in the Request provided.","range-not-satisfiable":({size:e,start:t,end:a})=>`The start (${t}) and end (${a}) values in the Range are not satisfiable by the cached response, which is ${e} bytes.`,"attempt-to-cache-non-get-request":({url:e,method:t})=>`Unable to cache '${e}' because it is a '${t}' request and only 'GET' requests can be cached.`,"cache-put-with-no-response":({url:e})=>`There was an attempt to cache '${e}' but the response was not defined.`,"no-response":({url:e,error:t})=>{let a=`The strategy could not generate a response for '${e}'.`;return t&&(a+=` The underlying error is ${t}.`),a},"bad-precaching-response":({url:e,status:t})=>`The precaching request for '${e}' failed`+(t?` with an HTTP status of ${t}.`:"."),"non-precached-url":({url:e})=>`createHandlerBoundToURL('${e}') was called, but that URL is not precached. Please pass in a URL that is precached instead.`,"add-to-cache-list-conflicting-integrities":({url:e})=>`Two of the entries passed to 'workbox-precaching.PrecacheController.addToCacheList()' had the URL ${e} with different integrity values. Please remove one of them.`,"missing-precache-entry":({cacheName:e,url:t})=>`Unable to find a precached response in ${e} for ${t}.`,"cross-origin-copy-response":({origin:e})=>`workbox-core.copyResponse() can only be used with same-origin responses. It was passed a response with origin ${e}.`},t=(t,a={})=>{const r=e[t];if(!r)throw new Error(`Unable to find message for code '${t}'.`);return r(a)};class a extends Error{constructor(e,a){super(t(e,a)),this.name=e,this.details=a}}const r=(e,t,r)=>{if("function"!==typeof e[t])throw r.expectedMethod=t,new a("missing-a-method",r)},s=(e,t)=>{if(!Array.isArray(e))throw new a("not-an-array",t)},n=(e,t,r)=>{if(!(e instanceof t))throw r.expectedClass=t,new a("incorrect-class",r)},o=(e,t,r)=>{if(!t.includes(e))throw r.validValueDescription=`Valid values are ${JSON.stringify(t)}.`,new a("invalid-value",r)},i=(e,t,r)=>{if(typeof e!==t)throw r.expectedType=t,new a("incorrect-type",r)},c={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},h=e=>[c.prefix,e,c.suffix].filter((e=>e&&e.length>0)).join("-"),u=e=>e||h(c.precache),l=e=>e||h(c.runtime),d=(()=>{"__WB_DISABLE_DEV_LOGS"in self||(self.__WB_DISABLE_DEV_LOGS=!1);let e=!1;const t={debug:"#7f8c8d",log:"#2ecc71",warn:"#f39c12",error:"#c0392b",groupCollapsed:"#3498db",groupEnd:null},a=function(a,r){if(self.__WB_DISABLE_DEV_LOGS)return;if("groupCollapsed"===a&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent))return void console[a](...r);const s=e?[]:["%cworkbox",[`background: ${t[a]}`,"border-radius: 0.5em","color: white","font-weight: bold","padding: 2px 0.5em"].join(";")];console[a](...s,...r),"groupCollapsed"===a&&(e=!0),"groupEnd"===a&&(e=!1)},r={},s=Object.keys(t);for(const e of s){const t=e;r[t]=(...e)=>{a(t,e)}}return r})();function p(e,t){const a=t();return e.waitUntil(a),a}try{self["workbox:precaching:6.0.2"]&&_()}catch(e){}function m(e){if(!e)throw new a("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:r}=e;if(!r)throw new a("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(r,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(r,location.href),n=new URL(r,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:n.href}}class g{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:a})=>{if("install"===e.type){const e=t.originalRequest.url;a?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return a}}}class f{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const a=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return a?new Request(a):e},this._precacheController=e}}function w(e){const t=e.length;t>0&&(d.groupCollapsed(`During precaching cleanup, ${t} cached request${1===t?" was":"s were"} deleted.`),((e,t)=>{d.groupCollapsed(e);for(const e of t)d.log(e);d.groupEnd()})("Deleted Cache Requests",e),d.groupEnd())}function y(e,t){if(0!==t.length){d.groupCollapsed(e);for(const e of t)d.log(e);d.groupEnd()}}let x;async function b(e,t){let r=null;if(e.url){r=new URL(e.url).origin}if(r!==self.location.origin)throw new a("cross-origin-copy-response",{origin:r});const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},o=t?t(n):n,i=function(){if(void 0===x){const e=new Response("");if("body"in e)try{new Response(e.body),x=!0}catch(e){x=!1}x=!1}return x}()?s.body:await s.blob();return new Response(i,o)}const N=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");function R(e,t){const a=new URL(e);for(const e of t)a.searchParams.delete(e);return a.href}class v{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const E=new Set;try{self["workbox:strategies:6.0.2"]&&_()}catch(e){}function $(e){return"string"==typeof e?new Request(e):e}class C{constructor(e,t){this._cacheKeys={},n(t.event,ExtendableEvent,{moduleName:"workbox-strategies",className:"StrategyHandler",funcName:"constructor",paramName:"options.event"}),Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new v,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}fetch(e){return this.waitUntil((async()=>{const{event:t}=this;let r=$(e);if("navigate"===r.mode&&t instanceof FetchEvent&&t.preloadResponse){const e=await t.preloadResponse;if(e)return d.log(`Using a preloaded navigation response for '${N(r.url)}'`),e}const s=this.hasCallback("fetchDidFail")?r.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))r=await e({request:r.clone(),event:t})}catch(e){throw new a("plugin-error-request-will-fetch",{thrownError:e})}const n=r.clone();try{let e;e=await fetch(r,"navigate"===r.mode?void 0:this._strategy.fetchOptions),d.debug(`Network request for '${N(r.url)}' returned a response with status '${e.status}'.`);for(const a of this.iterateCallbacks("fetchDidSucceed"))e=await a({event:t,request:n,response:e});return e}catch(e){throw d.error(`Network request for '${N(r.url)}' threw an error.`,e),s&&await this.runCallbacks("fetchDidFail",{error:e,event:t,originalRequest:s.clone(),request:n.clone()}),e}})())}async fetchAndCachePut(e){const t=await this.fetch(e),a=t.clone();return this.waitUntil(this.cachePut(e,a)),t}cacheMatch(e){return this.waitUntil((async()=>{const t=$(e);let a;const{cacheName:r,matchOptions:s}=this._strategy,n=await this.getCacheKey(t,"read"),o={...s,cacheName:r};a=await caches.match(n,o),a?d.debug(`Found a cached response in '${r}'.`):d.debug(`No cached response found in '${r}'.`);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))a=await e({cacheName:r,matchOptions:s,cachedResponse:a,request:n,event:this.event})||void 0;return a})())}async cachePut(e,t){const r=$(e);var s;await(s=0,new Promise((e=>setTimeout(e,s))));const n=await this.getCacheKey(r,"write");if(n.method&&"GET"!==n.method)throw new a("attempt-to-cache-non-get-request",{url:N(n.url),method:n.method});if(!t)throw d.error(`Cannot cache non-existent response for '${N(n.url)}'.`),new a("cache-put-with-no-response",{url:N(n.url)});const o=await this._ensureResponseSafeToCache(t);if(!o)return void d.debug(`Response '${N(n.url)}' will not be cached.`,o);const{cacheName:i,matchOptions:c}=this._strategy,h=await self.caches.open(i),u=this.hasCallback("cacheDidUpdate"),l=u?await async function(e,t,a,r){const s=R(t.url,a);if(t.url===s)return e.match(t,r);const n={...r,ignoreSearch:!0},o=await e.keys(t,n);for(const t of o)if(s===R(t.url,a))return e.match(t,r)}(h,n.clone(),["__WB_REVISION__"],c):null;d.debug(`Updating the '${i}' cache with a new Response for ${N(n.url)}.`);try{await h.put(n,u?o.clone():o)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){d.log(`About to run ${E.size} callbacks to clean up caches.`);for(const e of E)await e(),d.log(e,"is complete.");d.log("Finished running callbacks.")}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:i,oldResponse:l,newResponse:o.clone(),request:n,event:this.event})}async getCacheKey(e,t){if(!this._cacheKeys[t]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=$(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[t]=a}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const a of this.iterateCallbacks(e))await a(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const a=this._pluginStateMap.get(t),r=r=>{const s={...r,state:a};return t[e](s)};yield r}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,a=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,a=!0,!t)break;return a||(t&&200!==t.status&&(t=void 0),t&&200!==t.status&&(0===t.status?d.warn(`The response for '${this.request.url}' is an opaque response. The caching strategy that you're using will not cache opaque responses by default.`):d.debug(`The response for '${this.request.url}' returned a status code of '${e.status}' and won't be cached as a result.`))),t}}class k{constructor(e={}){this.cacheName=l(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,a="string"==typeof e.request?new Request(e.request):e.request,r="params"in e?e.params:void 0,s=new C(this,{event:t,request:a,params:r}),n=this._getResponse(s,a,t);return[n,this._awaitComplete(n,s,a,t)]}async _getResponse(e,t,r){let s;await e.runCallbacks("handlerWillStart",{event:r,request:t});try{if(s=await this._handle(t,e),!s||"error"===s.type)throw new a("no-response",{url:t.url})}catch(a){for(const n of e.iterateCallbacks("handlerDidError"))if(s=await n({error:a,event:r,request:t}),s)break;if(!s)throw a;d.log(`While responding to '${N(t.url)}', an ${a} error occurred. Using a fallback response provided by a handlerDidError plugin.`)}for(const a of e.iterateCallbacks("handlerWillRespond"))s=await a({event:r,request:t,response:s});return s}async _awaitComplete(e,t,a,r){let s,n;try{s=await e}catch(n){}try{await t.runCallbacks("handlerDidRespond",{event:r,request:a,response:s}),await t.doneWaiting()}catch(e){n=e}if(await t.runCallbacks("handlerDidComplete",{event:r,request:a,response:s,error:n}),t.destroy(),n)throw n}}const q={cacheWillUpdate:async({response:e})=>e.redirected?await b(e):e};class T extends k{constructor(e={}){e.cacheName=u(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(q)}async _handle(e,t){const a=await t.cacheMatch(e);return a||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let r;if(!this._fallbackToNetwork)throw new a("missing-precache-entry",{cacheName:this.cacheName,url:e.url});d.warn(`The precached response for ${N(e.url)} in ${this.cacheName} was not found. Falling back to the network instead.`),r=await t.fetch(e);{const a=t.params&&t.params.cacheKey||await t.getCacheKey(e,"read");d.groupCollapsed("Precaching is responding to: "+N(e.url)),d.log(`Serving the precached url: ${N(a.url)}`),d.groupCollapsed("View request details here."),d.log(e),d.groupEnd(),d.groupCollapsed("View response details here."),d.log(r),d.groupEnd(),d.groupEnd()}return r}async _handleInstall(e,t){const r=await t.fetchAndCachePut(e);let s=Boolean(r);if(r&&r.status>=400&&!this._usesCustomCacheableResponseLogic()&&(s=!1),!s)throw new a("bad-precaching-response",{url:e.url,status:r.status});return r}_usesCustomCacheableResponseLogic(){return this.plugins.some((e=>e.cacheWillUpdate&&e!==q))}}class U{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:a=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new T({cacheName:u(e),plugins:[...t,new f({precacheController:this})],fallbackToNetwork:a}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){s(e,{moduleName:"workbox-precaching",className:"PrecacheController",funcName:"addToCacheList",paramName:"entries"});const t=[];for(const r of e){"string"==typeof r?t.push(r):r&&void 0===r.revision&&t.push(r.url);const{cacheKey:e,url:s}=m(r),n="string"!=typeof r&&r.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new a("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!=typeof r&&r.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==r.integrity)throw new a("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,r.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,n),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;d.warn(e)}}}install(e){return p(e,(async()=>{const t=new g;this.strategy.plugins.push(t);for(const[t,a]of this._urlsToCacheKeys){const r=this._cacheKeysToIntegrities.get(a),s=this._urlsToCacheModes.get(t),n=new Request(t,{integrity:r,cache:s,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:a},request:n,event:e}))}const{updatedURLs:a,notUpdatedURLs:r}=t;return function(e,t){const a=e.length,r=t.length;if(a||r){let s=`Precaching ${a} file${1===a?"":"s"}.`;r>0&&(s+=` ${r} file${1===r?" is":"s are"} already cached.`),d.groupCollapsed(s),y("View newly precached URLs.",e),y("View previously precached URLs.",t),d.groupEnd()}}(a,r),{updatedURLs:a,notUpdatedURLs:r}}))}activate(e){return p(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),a=new Set(this._urlsToCacheKeys.values()),r=[];for(const s of t)a.has(s.url)||(await e.delete(s),r.push(s.url));return w(r),{deletedURLs:r}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,a=this.getCacheKeyForURL(t);if(a){return(await self.caches.open(this.strategy.cacheName)).match(a)}}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new a("non-precached-url",{url:e});return a=>(a.request=new Request(e),a.params={cacheKey:t,...a.params},this.strategy.handle(a))}}let L;const A=()=>(L||(L=new U),L);try{self["workbox:routing:6.0.2"]&&_()}catch(e){}const S=["DELETE","GET","HEAD","PATCH","POST","PUT"],P=e=>e&&"object"==typeof e?(r(e,"handle",{moduleName:"workbox-routing",className:"Route",funcName:"constructor",paramName:"handler"}),e):(i(e,"function",{moduleName:"workbox-routing",className:"Route",funcName:"constructor",paramName:"handler"}),{handle:e});class K{constructor(e,t,a="GET"){i(e,"function",{moduleName:"workbox-routing",className:"Route",funcName:"constructor",paramName:"match"}),a&&o(a,S,{paramName:"method"}),this.handler=P(t),this.match=e,this.method=a}}class D extends K{constructor(e,t,a){n(e,RegExp,{moduleName:"workbox-routing",className:"RegExpRoute",funcName:"constructor",paramName:"pattern"});super((({url:t})=>{const a=e.exec(t.href);if(a){if(t.origin===location.origin||0===a.index)return a.slice(1);d.debug(`The regular expression '${e}' only partially matched against the cross-origin URL '${t}'. RegExpRoute's will only handle cross-origin requests if they match the entire URL.`)}}),t,a)}}class M{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,a=this.handleRequest({request:t,event:e});a&&e.respondWith(a)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;d.debug("Caching URLs from the window",t.urlsToCache);const a=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const a=new Request(...t);return this.handleRequest({request:a,event:e})})));e.waitUntil(a),e.ports&&e.ports[0]&&a.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){n(e,Request,{moduleName:"workbox-routing",className:"Router",funcName:"handleRequest",paramName:"options.request"});const a=new URL(e.url,location.href);if(!a.protocol.startsWith("http"))return void d.debug("Workbox Router only supports URLs that start with 'http'.");const r=a.origin===location.origin,{params:s,route:o}=this.findMatchingRoute({event:t,request:e,sameOrigin:r,url:a});let i=o&&o.handler;const c=[];i&&(c.push(["Found a route to handle this request:",o]),s&&c.push(["Passing the following params to the route's handler:",s]));const h=e.method;if(!i&&this._defaultHandlerMap.has(h)&&(c.push(`Failed to find a matching route. Falling back to the default handler for ${h}.`),i=this._defaultHandlerMap.get(h)),!i)return void d.debug(`No route found for: ${N(a)}`);let u;d.groupCollapsed(`Router is responding to: ${N(a)}`),c.forEach((e=>{Array.isArray(e)?d.log(...e):d.log(e)})),d.groupEnd();try{u=i.handle({url:a,request:e,event:t,params:s})}catch(e){u=Promise.reject(e)}return u instanceof Promise&&this._catchHandler&&(u=u.catch((r=>(d.groupCollapsed(`Error thrown when responding to:  ${N(a)}. Falling back to Catch Handler.`),d.error("Error thrown by:",o),d.error(r),d.groupEnd(),this._catchHandler.handle({url:a,request:e,event:t}))))),u}findMatchingRoute({url:e,sameOrigin:t,request:a,event:r}){const s=this._routes.get(a.method)||[];for(const n of s){let s;const o=n.match({url:e,sameOrigin:t,request:a,event:r});if(o)return o instanceof Promise&&d.warn(`While routing ${N(e)}, an async matchCallback function was used. Please convert the following route to use a synchronous matchCallback function:`,n),s=o,(Array.isArray(o)&&0===o.length||o.constructor===Object&&0===Object.keys(o).length||"boolean"==typeof o)&&(s=void 0),{route:n,params:s}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,P(e))}setCatchHandler(e){this._catchHandler=P(e)}registerRoute(e){i(e,"object",{moduleName:"workbox-routing",className:"Router",funcName:"registerRoute",paramName:"route"}),r(e,"match",{moduleName:"workbox-routing",className:"Router",funcName:"registerRoute",paramName:"route"}),i(e.handler,"object",{moduleName:"workbox-routing",className:"Router",funcName:"registerRoute",paramName:"route"}),r(e.handler,"handle",{moduleName:"workbox-routing",className:"Router",funcName:"registerRoute",paramName:"route.handler"}),i(e.method,"string",{moduleName:"workbox-routing",className:"Router",funcName:"registerRoute",paramName:"route.method"}),this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new a("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new a("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let O;const W=()=>(O||(O=new M,O.addFetchListener(),O.addCacheListener()),O);function j(e,t,r){let s;if("string"==typeof e){const n=new URL(e,location.href);{if(!e.startsWith("/")&&!e.startsWith("http"))throw new a("invalid-string",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});const t=e.startsWith("http")?n.pathname:e,r="[*:?+]";new RegExp(`${r}`).exec(t)&&d.debug(`The '$capture' parameter contains an Express-style wildcard character (${r}). Strings are now always interpreted as exact matches; use a RegExp for partial or wildcard matches.`)}s=new K((({url:t})=>(t.pathname===n.pathname&&t.origin!==n.origin&&d.debug(`${e} only partially matches the cross-origin URL ${t}. This route will only handle cross-origin requests if they match the entire URL.`),t.href===n.href)),t,r)}else if(e instanceof RegExp)s=new D(e,t,r);else if("function"==typeof e)s=new K(e,t,r);else{if(!(e instanceof K))throw new a("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});s=e}return W().registerRoute(s),s}class I extends K{constructor(e,t){super((({request:a})=>{const r=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:a="index.html",cleanURLs:r=!0,urlManipulation:s}={}){const n=new URL(e,location.href);n.hash="",yield n.href;const o=function(e,t=[]){for(const a of[...e.searchParams.keys()])t.some((e=>e.test(a)))&&e.searchParams.delete(a);return e}(n,t);if(yield o.href,a&&o.pathname.endsWith("/")){const e=new URL(o.href);e.pathname+=a,yield e.href}if(r){const e=new URL(o.href);e.pathname+=".html",yield e.href}if(s){const e=s({url:n});for(const t of e)yield t.href}}(a.url,t)){const t=r.get(e);if(t)return{cacheKey:t}}d.debug("Precaching did not find a match for "+N(a.url))}),e.strategy)}}function F(e,t){!function(e){A().precache(e)}(e),function(e){const t=A();j(new I(t,e))}(t)}const H=(e,t)=>`Using ${e} to respond to '${N(t.url)}'`,B=e=>{e&&(d.groupCollapsed("View the final response here."),d.log(e||"[No response returned]"),d.groupEnd())};function V(e){e.then((()=>{}))}class G{constructor(e,t,{onupgradeneeded:a,onversionchange:r}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=a,this._onversionchange=r||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise(((e,t)=>{let a=!1;setTimeout((()=>{a=!0,t(new Error("The open request was blocked and timed out"))}),this.OPEN_TIMEOUT);const r=indexedDB.open(this._name,this._version);r.onerror=()=>t(r.error),r.onupgradeneeded=e=>{a?(r.transaction.abort(),r.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},r.onsuccess=()=>{const t=r.result;a?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}})),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,a){return await this.getAllMatching(e,{query:t,count:a})}async getAllKeys(e,t,a){return(await this.getAllMatching(e,{query:t,count:a,includeKeys:!0})).map((e=>e.key))}async getAllMatching(e,{index:t,query:a=null,direction:r="next",count:s,includeKeys:n=!1}={}){return await this.transaction([e],"readonly",((o,i)=>{const c=o.objectStore(e),h=t?c.index(t):c,u=[],l=h.openCursor(a,r);l.onsuccess=()=>{const e=l.result;e?(u.push(n?e:e.value),s&&u.length>=s?i(u):e.continue()):i(u)}}))}async transaction(e,t,a){return await this.open(),await new Promise(((r,s)=>{const n=this._db.transaction(e,t);n.onabort=()=>s(n.error),n.oncomplete=()=>r(),a(n,(e=>r(e)))}))}async _call(e,t,a,...r){return await this.transaction([t],a,((a,s)=>{const n=a.objectStore(t),o=n[e].apply(n,r);o.onsuccess=()=>s(o.result)}))}close(){this._db&&(this._db.close(),this._db=null)}}G.prototype.OPEN_TIMEOUT=2e3;const Y={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(Y))for(const a of t)a in IDBObjectStore.prototype&&(G.prototype[a]=async function(t,...r){return await this._call(a,t,e,...r)});try{self["workbox:expiration:6.0.2"]&&_()}catch(e){}const z="cache-entries",J=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class Q{constructor(e){this._cacheName=e,this._db=new G("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore(z,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise(((t,a)=>{const r=indexedDB.deleteDatabase(e);r.onerror=()=>{a(r.error)},r.onblocked=()=>{a(new Error("Delete blocked"))},r.onsuccess=()=>{t()}}))})(this._cacheName)}async setTimestamp(e,t){const a={url:e=J(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put(z,a)}async getTimestamp(e){return(await this._db.get(z,this._getId(e))).timestamp}async expireEntries(e,t){const a=await this._db.transaction(z,"readwrite",((a,r)=>{const s=a.objectStore(z).index("timestamp").openCursor(null,"prev"),n=[];let o=0;s.onsuccess=()=>{const a=s.result;if(a){const r=a.value;r.cacheName===this._cacheName&&(e&&r.timestamp<e||t&&o>=t?n.push(a.value):o++),a.continue()}else r(n)}})),r=[];for(const e of a)await this._db.delete(z,e.id),r.push(e.url);return r}_getId(e){return this._cacheName+"|"+J(e)}}class X{constructor(e,t={}){if(this._isRunning=!1,this._rerunRequested=!1,i(e,"string",{moduleName:"workbox-expiration",className:"CacheExpiration",funcName:"constructor",paramName:"cacheName"}),!t.maxEntries&&!t.maxAgeSeconds)throw new a("max-entries-or-age-required",{moduleName:"workbox-expiration",className:"CacheExpiration",funcName:"constructor"});t.maxEntries&&i(t.maxEntries,"number",{moduleName:"workbox-expiration",className:"CacheExpiration",funcName:"constructor",paramName:"config.maxEntries"}),t.maxAgeSeconds&&i(t.maxAgeSeconds,"number",{moduleName:"workbox-expiration",className:"CacheExpiration",funcName:"constructor",paramName:"config.maxAgeSeconds"}),this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new Q(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),a=await self.caches.open(this._cacheName);for(const e of t)await a.delete(e,this._matchOptions);t.length>0?(d.groupCollapsed(`Expired ${t.length} `+(1===t.length?"entry":"entries")+" and removed "+(1===t.length?"it":"them")+" from the "+`'${this._cacheName}' cache.`),d.log(`Expired the following ${1===t.length?"URL":"URLs"}:`),t.forEach((e=>d.log(`    ${e}`))),d.groupEnd()):d.debug("Cache expiration ran and found no entries to remove."),this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,V(this.expireEntries()))}async updateTimestamp(e){i(e,"string",{moduleName:"workbox-expiration",className:"CacheExpiration",funcName:"updateTimestamp",paramName:"url"}),await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}throw new a("expired-test-without-max-age",{methodName:"isURLExpired",paramName:"maxAgeSeconds"})}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}self.__WB_DISABLE_DEV_LOGS=!0,F(["/client/client.12a2e161.js","/client/inject_styles.5607aec6.js","/client/index.679a3191.js","/client/Geocoder.849ae87a.js","/client/partners.66899985.js","/client/about.8a448453.js","/client/index.56830401.js","/client/[id].a39b1649.js","/client/_commonjsHelpers.91583ccb.js","/client/autoComplete.min.86378da8.js"]),F(["/service-worker-index.html","/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/browserconfig.xml","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/favicon.png","/global.css","/location.svg","/logo-192.png","/logo-512.png","/manifest.webmanifest","/mstile-144x144.png","/mstile-150x150.png","/mstile-310x150.png","/mstile-310x310.png","/mstile-70x70.png","/safari-pinned-tab.svg"]),j(new RegExp("https://producteursagri.opendatasoft.com"),new class extends k{async _handle(e,t){const r=[];n(e,Request,{moduleName:"workbox-strategies",className:this.constructor.name,funcName:"makeRequest",paramName:"request"});let s,o=await t.cacheMatch(e);if(o)r.push(`Found a cached response in the '${this.cacheName}' cache.`);else{r.push(`No response found in the '${this.cacheName}' cache. Will respond with a network request.`);try{o=await t.fetchAndCachePut(e)}catch(e){s=e}o?r.push("Got response from network."):r.push("Unable to get a response from the network.")}d.groupCollapsed(H(this.constructor.name,e));for(const e of r)d.log(e);if(B(o),d.groupEnd(),!o)throw new a("no-response",{url:e.url,error:s});return o}}({cacheName:"ods-requests-1607950920148",plugins:[new class{constructor(e={}){if(this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:a,cachedResponse:r})=>{if(!r)return null;const s=this._isResponseDateFresh(r),n=this._getCacheExpiration(a);V(n.expireEntries());const o=n.updateTimestamp(t.url);if(e)try{e.waitUntil(o)}catch(t){"request"in e&&d.warn(`Unable to ensure service worker stays alive when updating cache entry for '${N(e.request.url)}'.`)}return s?r:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{i(e,"string",{moduleName:"workbox-expiration",className:"Plugin",funcName:"cacheDidUpdate",paramName:"cacheName"}),n(t,Request,{moduleName:"workbox-expiration",className:"Plugin",funcName:"cacheDidUpdate",paramName:"request"});const a=this._getCacheExpiration(e);await a.updateTimestamp(t.url),await a.expireEntries()},!e.maxEntries&&!e.maxAgeSeconds)throw new a("max-entries-or-age-required",{moduleName:"workbox-expiration",className:"Plugin",funcName:"constructor"});var t;e.maxEntries&&i(e.maxEntries,"number",{moduleName:"workbox-expiration",className:"Plugin",funcName:"constructor",paramName:"config.maxEntries"}),e.maxAgeSeconds&&i(e.maxAgeSeconds,"number",{moduleName:"workbox-expiration",className:"Plugin",funcName:"constructor",paramName:"config.maxAgeSeconds"}),this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(i(t=()=>this.deleteCacheAndMetadata(),"function",{moduleName:"workbox-core",funcName:"register",paramName:"callback"}),E.add(t),d.log("Registered a callback to respond to quota errors.",t))}_getCacheExpiration(e){if(e===l())throw new a("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new X(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),a=new Date(t).getTime();return isNaN(a)?null:a}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxEntries:50,maxAgeSeconds:86400})]}))}();