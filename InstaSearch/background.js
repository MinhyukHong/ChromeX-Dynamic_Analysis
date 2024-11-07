var background=function(){"use strict";function G(s){return s==null||typeof s=="function"?{main:s}:s}var Z=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function z(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var U={exports:{}};(function(s,e){(function(r,n){n(s)})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:Z,function(r){if(!(globalThis.chrome&&globalThis.chrome.runtime&&globalThis.chrome.runtime.id))throw new Error("This script should only be loaded in a browser extension.");if(globalThis.browser&&globalThis.browser.runtime&&globalThis.browser.runtime.id)r.exports=globalThis.browser;else{const n="The message port closed before a response was received.",f=m=>{const x={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(Object.keys(x).length===0)throw new Error("api-metadata.json has not been included in browser-polyfill");class _ extends WeakMap{constructor(o,u=void 0){super(u),this.createItem=o}get(o){return this.has(o)||this.set(o,this.createItem(o)),super.get(o)}}const P=g=>g&&typeof g=="object"&&typeof g.then=="function",T=(g,o)=>(...u)=>{m.runtime.lastError?g.reject(new Error(m.runtime.lastError.message)):o.singleCallbackArg||u.length<=1&&o.singleCallbackArg!==!1?g.resolve(u[0]):g.resolve(u)},v=g=>g==1?"argument":"arguments",M=(g,o)=>function(c,...w){if(w.length<o.minArgs)throw new Error(`Expected at least ${o.minArgs} ${v(o.minArgs)} for ${g}(), got ${w.length}`);if(w.length>o.maxArgs)throw new Error(`Expected at most ${o.maxArgs} ${v(o.maxArgs)} for ${g}(), got ${w.length}`);return new Promise((p,k)=>{if(o.fallbackToNoCallback)try{c[g](...w,T({resolve:p,reject:k},o))}catch(A){console.warn(`${g} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,A),c[g](...w),o.fallbackToNoCallback=!1,o.noCallback=!0,p()}else o.noCallback?(c[g](...w),p()):c[g](...w,T({resolve:p,reject:k},o))})},q=(g,o,u)=>new Proxy(o,{apply(c,w,p){return u.call(w,g,...p)}});let F=Function.call.bind(Object.prototype.hasOwnProperty);const a=(g,o={},u={})=>{let c=Object.create(null),w={has(k,A){return A in g||A in c},get(k,A,E){if(A in c)return c[A];if(!(A in g))return;let b=g[A];if(typeof b=="function")if(typeof o[A]=="function")b=q(g,g[A],o[A]);else if(F(u,A)){let $=M(A,u[A]);b=q(g,g[A],$)}else b=b.bind(g);else if(typeof b=="object"&&b!==null&&(F(o,A)||F(u,A)))b=a(b,o[A],u[A]);else if(F(u,"*"))b=a(b,o[A],u["*"]);else return Object.defineProperty(c,A,{configurable:!0,enumerable:!0,get(){return g[A]},set($){g[A]=$}}),b;return c[A]=b,b},set(k,A,E,b){return A in c?c[A]=E:g[A]=E,!0},defineProperty(k,A,E){return Reflect.defineProperty(c,A,E)},deleteProperty(k,A){return Reflect.deleteProperty(c,A)}},p=Object.create(g);return new Proxy(p,w)},t=g=>({addListener(o,u,...c){o.addListener(g.get(u),...c)},hasListener(o,u){return o.hasListener(g.get(u))},removeListener(o,u){o.removeListener(g.get(u))}}),i=new _(g=>typeof g!="function"?g:function(u){const c=a(u,{},{getContent:{minArgs:0,maxArgs:0}});g(c)}),l=new _(g=>typeof g!="function"?g:function(u,c,w){let p=!1,k,A=new Promise(L=>{k=function(S){p=!0,L(S)}}),E;try{E=g(u,c,k)}catch(L){E=Promise.reject(L)}const b=E!==!0&&P(E);if(E!==!0&&!b&&!p)return!1;const $=L=>{L.then(S=>{w(S)},S=>{let N;S&&(S instanceof Error||typeof S.message=="string")?N=S.message:N="An unexpected error occurred",w({__mozWebExtensionPolyfillReject__:!0,message:N})}).catch(S=>{console.error("Failed to send onMessage rejected reply",S)})};return $(b?E:A),!0}),d=({reject:g,resolve:o},u)=>{m.runtime.lastError?m.runtime.lastError.message===n?o():g(new Error(m.runtime.lastError.message)):u&&u.__mozWebExtensionPolyfillReject__?g(new Error(u.message)):o(u)},h=(g,o,u,...c)=>{if(c.length<o.minArgs)throw new Error(`Expected at least ${o.minArgs} ${v(o.minArgs)} for ${g}(), got ${c.length}`);if(c.length>o.maxArgs)throw new Error(`Expected at most ${o.maxArgs} ${v(o.maxArgs)} for ${g}(), got ${c.length}`);return new Promise((w,p)=>{const k=d.bind(null,{resolve:w,reject:p});c.push(k),u.sendMessage(...c)})},I={devtools:{network:{onRequestFinished:t(i)}},runtime:{onMessage:t(l),onMessageExternal:t(l),sendMessage:h.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:h.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},y={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return x.privacy={network:{"*":y},services:{"*":y},websites:{"*":y}},a(m,I,x)};r.exports=f(chrome)}})})(U);var H=U.exports;const C=z(H);var B=Object.prototype.hasOwnProperty;function V(s,e){var r,n;if(s===e)return!0;if(s&&e&&(r=s.constructor)===e.constructor){if(r===Date)return s.getTime()===e.getTime();if(r===RegExp)return s.toString()===e.toString();if(r===Array){if((n=s.length)===e.length)for(;n--&&V(s[n],e[n]););return n===-1}if(!r||typeof s=="object"){n=0;for(r in s)if(B.call(s,r)&&++n&&!B.call(e,r)||!(r in e)||!V(s[r],e[r]))return!1;return Object.keys(e).length===n}}return s!==s&&e!==e}function R(s,...e){}const K={debug:(...s)=>R(console.debug,...s),log:(...s)=>R(console.log,...s),warn:(...s)=>R(console.warn,...s),error:(...s)=>R(console.error,...s)};function Q(s){return Array.isArray(s)?s:[s]}const Y=new Error("request for lock canceled");var J=function(s,e,r,n){function f(m){return m instanceof r?m:new r(function(x){x(m)})}return new(r||(r=Promise))(function(m,x){function _(v){try{T(n.next(v))}catch(M){x(M)}}function P(v){try{T(n.throw(v))}catch(M){x(M)}}function T(v){v.done?m(v.value):f(v.value).then(_,P)}T((n=n.apply(s,e||[])).next())})};class X{constructor(e,r=Y){this._value=e,this._cancelError=r,this._queue=[],this._weightedWaiters=[]}acquire(e=1,r=0){if(e<=0)throw new Error(`invalid weight ${e}: must be positive`);return new Promise((n,f)=>{const m={resolve:n,reject:f,weight:e,priority:r},x=D(this._queue,_=>r<=_.priority);x===-1&&e<=this._value?this._dispatchItem(m):this._queue.splice(x+1,0,m)})}runExclusive(e){return J(this,arguments,void 0,function*(r,n=1,f=0){const[m,x]=yield this.acquire(n,f);try{return yield r(m)}finally{x()}})}waitForUnlock(e=1,r=0){if(e<=0)throw new Error(`invalid weight ${e}: must be positive`);return this._couldLockImmediately(e,r)?Promise.resolve():new Promise(n=>{this._weightedWaiters[e-1]||(this._weightedWaiters[e-1]=[]),ee(this._weightedWaiters[e-1],{resolve:n,priority:r})})}isLocked(){return this._value<=0}getValue(){return this._value}setValue(e){this._value=e,this._dispatchQueue()}release(e=1){if(e<=0)throw new Error(`invalid weight ${e}: must be positive`);this._value+=e,this._dispatchQueue()}cancel(){this._queue.forEach(e=>e.reject(this._cancelError)),this._queue=[]}_dispatchQueue(){for(this._drainUnlockWaiters();this._queue.length>0&&this._queue[0].weight<=this._value;)this._dispatchItem(this._queue.shift()),this._drainUnlockWaiters()}_dispatchItem(e){const r=this._value;this._value-=e.weight,e.resolve([r,this._newReleaser(e.weight)])}_newReleaser(e){let r=!1;return()=>{r||(r=!0,this.release(e))}}_drainUnlockWaiters(){if(this._queue.length===0)for(let e=this._value;e>0;e--){const r=this._weightedWaiters[e-1];r&&(r.forEach(n=>n.resolve()),this._weightedWaiters[e-1]=[])}else{const e=this._queue[0].priority;for(let r=this._value;r>0;r--){const n=this._weightedWaiters[r-1];if(!n)continue;const f=n.findIndex(m=>m.priority<=e);(f===-1?n:n.splice(0,f)).forEach(m=>m.resolve())}}}_couldLockImmediately(e,r){return(this._queue.length===0||this._queue[0].priority<r)&&e<=this._value}}function ee(s,e){const r=D(s,n=>e.priority<=n.priority);s.splice(r+1,0,e)}function D(s,e){for(let r=s.length-1;r>=0;r--)if(e(s[r]))return r;return-1}var re=function(s,e,r,n){function f(m){return m instanceof r?m:new r(function(x){x(m)})}return new(r||(r=Promise))(function(m,x){function _(v){try{T(n.next(v))}catch(M){x(M)}}function P(v){try{T(n.throw(v))}catch(M){x(M)}}function T(v){v.done?m(v.value):f(v.value).then(_,P)}T((n=n.apply(s,e||[])).next())})};class te{constructor(e){this._semaphore=new X(1,e)}acquire(){return re(this,arguments,void 0,function*(e=0){const[,r]=yield this._semaphore.acquire(1,e);return r})}runExclusive(e,r=0){return this._semaphore.runExclusive(()=>e(),1,r)}isLocked(){return this._semaphore.isLocked()}waitForUnlock(e=0){return this._semaphore.waitForUnlock(1,e)}release(){this._semaphore.isLocked()&&this._semaphore.release()}cancel(){return this._semaphore.cancel()}}const se=ne();function ne(){const s={local:j("local"),session:j("session"),sync:j("sync"),managed:j("managed")},e=a=>{const t=s[a];if(t==null){const i=Object.keys(s).join(", ");throw Error(`Invalid area "${a}". Options: ${i}`)}return t},r=a=>{const t=a.indexOf(":"),i=a.substring(0,t),l=a.substring(t+1);if(l==null)throw Error(`Storage key should be in the form of "area:key", but received "${a}"`);return{driverArea:i,driverKey:l,driver:e(i)}},n=a=>a+"$",f=(a,t)=>a??t??null,m=a=>typeof a=="object"&&!Array.isArray(a)?a:{},x=async(a,t,i)=>{const l=await a.getItem(t);return f(l,(i==null?void 0:i.fallback)??(i==null?void 0:i.defaultValue))},_=async(a,t)=>{const i=n(t),l=await a.getItem(i);return m(l)},P=async(a,t,i)=>{await a.setItem(t,i??null)},T=async(a,t,i)=>{const l=n(t),h={...m(await a.getItem(l))};Object.entries(i).forEach(([I,y])=>{y==null?delete h[I]:h[I]=y}),await a.setItem(l,h)},v=async(a,t,i)=>{if(await a.removeItem(t),i!=null&&i.removeMeta){const l=n(t);await a.removeItem(l)}},M=async(a,t,i)=>{const l=n(t);if(i==null)await a.removeItem(l);else{const d=m(await a.getItem(l));Q(i).forEach(h=>delete d[h]),await a.setItem(l,d)}},q=(a,t,i)=>a.watch(t,i);return{getItem:async(a,t)=>{const{driver:i,driverKey:l}=r(a);return await x(i,l,t)},getItems:async a=>{const t=new Map,i=new Map;return a.forEach(d=>{let h,I;typeof d=="string"?h=d:(h=d.key,I=d.options);const{driverArea:y,driverKey:g}=r(h),o=t.get(y)??[];t.set(y,o.concat(g)),i.set(h,I)}),(await Promise.all(Array.from(t.entries()).map(async([d,h])=>(await s[d].getItems(h)).map(y=>{const g=`${d}:${y.key}`,o=i.get(g),u=f(y.value,(o==null?void 0:o.fallback)??(o==null?void 0:o.defaultValue));return{key:g,value:u}})))).flat()},getMeta:async a=>{const{driver:t,driverKey:i}=r(a);return await _(t,i)},setItem:async(a,t)=>{const{driver:i,driverKey:l}=r(a);await P(i,l,t)},setItems:async a=>{const t=new Map;a.forEach(({key:i,value:l})=>{const{driverArea:d,driverKey:h}=r(i),I=t.get(d)??[];t.set(d,I.concat({key:h,value:l}))}),await Promise.all(Array.from(t.entries()).map(async([i,l])=>{await e(i).setItems(l)}))},setMeta:async(a,t)=>{const{driver:i,driverKey:l}=r(a);await T(i,l,t)},removeItem:async(a,t)=>{const{driver:i,driverKey:l}=r(a);await v(i,l,t)},removeItems:async a=>{const t=new Map;a.forEach(i=>{let l,d;typeof i=="string"?l=i:(l=i.key,d=i.options);const{driverArea:h,driverKey:I}=r(l),y=t.get(h)??[];y.push(I),d!=null&&d.removeMeta&&y.push(n(I)),t.set(h,y)}),await Promise.all(Array.from(t.entries()).map(async([i,l])=>{await e(i).removeItems(l)}))},removeMeta:async(a,t)=>{const{driver:i,driverKey:l}=r(a);await M(i,l,t)},snapshot:async(a,t)=>{var d;const l=await e(a).snapshot();return(d=t==null?void 0:t.excludeKeys)==null||d.forEach(h=>{delete l[h],delete l[n(h)]}),l},restoreSnapshot:async(a,t)=>{await e(a).restoreSnapshot(t)},watch:(a,t)=>{const{driver:i,driverKey:l}=r(a);return q(i,l,t)},unwatch(){Object.values(s).forEach(a=>{a.unwatch()})},defineItem:(a,t)=>{const{driver:i,driverKey:l}=r(a),{version:d=1,migrations:h={}}=t??{};if(d<1)throw Error("Storage item version cannot be less than 1. Initial versions should be set to 1, not 0.");const I=async()=>{var b;const c=n(l),[{value:w},{value:p}]=await i.getItems([l,c]);if(w==null)return;const k=(p==null?void 0:p.v)??1;if(k>d)throw Error(`Version downgrade detected (v${k} -> v${d}) for "${a}"`);K.debug(`Running storage migration for ${a}: v${k} -> v${d}`);const A=Array.from({length:d-k},($,L)=>k+L+1);let E=w;for(const $ of A)E=await((b=h==null?void 0:h[$])==null?void 0:b.call(h,E))??E;await i.setItems([{key:l,value:E},{key:c,value:{...p,v:d}}]),K.debug(`Storage migration completed for ${a} v${d}`,{migratedValue:E})},y=(t==null?void 0:t.migrations)==null?Promise.resolve():I().catch(c=>{K.error(`Migration failed for ${a}`,c)}),g=new te,o=()=>(t==null?void 0:t.fallback)??(t==null?void 0:t.defaultValue)??null,u=()=>g.runExclusive(async()=>{const c=await i.getItem(l);if(c!=null||(t==null?void 0:t.init)==null)return c;const w=await t.init();return await i.setItem(l,w),w});return y.then(u),{get defaultValue(){return o()},get fallback(){return o()},getValue:async()=>(await y,t!=null&&t.init?await u():await x(i,l,t)),getMeta:async()=>(await y,await _(i,l)),setValue:async c=>(await y,await P(i,l,c)),setMeta:async c=>(await y,await T(i,l,c)),removeValue:async c=>(await y,await v(i,l,c)),removeMeta:async c=>(await y,await M(i,l,c)),watch:c=>q(i,l,(w,p)=>c(w??o(),p??o())),migrate:I}}}}function j(s){const e=()=>{if(C.runtime==null)throw Error(["'wxt/storage' must be loaded in a web extension environment",`
 - If thrown during a build, see https://github.com/wxt-dev/wxt/issues/371`,` - If thrown during tests, mock 'wxt/browser' correctly. See https://wxt.dev/guide/go-further/testing.html
`].join(`
`));if(C.storage==null)throw Error("You must add the 'storage' permission to your manifest to use 'wxt/storage'");const n=C.storage[s];if(n==null)throw Error(`"browser.storage.${s}" is undefined`);return n},r=new Set;return{getItem:async n=>(await e().get(n))[n],getItems:async n=>{const f=await e().get(n);return n.map(m=>({key:m,value:f[m]??null}))},setItem:async(n,f)=>{f==null?await e().remove(n):await e().set({[n]:f})},setItems:async n=>{const f=n.reduce((m,{key:x,value:_})=>(m[x]=_,m),{});await e().set(f)},removeItem:async n=>{await e().remove(n)},removeItems:async n=>{await e().remove(n)},snapshot:async()=>await e().get(),restoreSnapshot:async n=>{await e().set(n)},watch(n,f){const m=x=>{const _=x[n];_!=null&&(V(_.newValue,_.oldValue)||f(_.newValue??null,_.oldValue??null))};return e().onChanged.addListener(m),r.add(m),()=>{e().onChanged.removeListener(m),r.delete(m)}},unwatch(){r.forEach(n=>{e().onChanged.removeListener(n)}),r.clear()}}}const ae=G(()=>{console.log("Hello background!",{id:C.runtime.id}),C.runtime.onInstalled.addListener(()=>{C.tabs.query({}).then(s=>{var e;for(let r of s)(e=r.url)!=null&&e.startsWith("http")&&C.scripting.executeScript({target:{tabId:r.id},files:["entrypoints/content.js"]})})}),C.tabs.onUpdated.addListener((s,e,r)=>{var n;e.status==="complete"&&((n=r.url)!=null&&n.startsWith("http"))&&C.scripting.executeScript({target:{tabId:s},files:["entrypoints/content.js"]})}),C.runtime.onInstalled.addListener(async s=>{s.reason==="install"&&await se.setItem("local:installDate",new Date().toISOString())}),C.runtime.setUninstallURL("https://tally.so/r/3qK8Gg").then(()=>{console.log("Uninstall URL set successfully")}).catch(()=>{console.error("Failed to set uninstall URL")})});function le(){}function O(s,...e){}const ie={debug:(...s)=>O(console.debug,...s),log:(...s)=>O(console.log,...s),warn:(...s)=>O(console.warn,...s),error:(...s)=>O(console.error,...s)};let W;try{W=ae.main(),W instanceof Promise&&console.warn("The background's main() function return a promise, but it must be synchronous")}catch(s){throw ie.error("The background crashed on startup!"),s}return W}();
background;
