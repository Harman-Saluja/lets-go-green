// The SPA must never boot inside one of its own isolated experience frames.
// A host's HTML fallback can return index.html with status 200 for a missing page.
const embeddedPage=/\/(?:green-rescue|cinema-stage|molecular-frame)(?:\.html)?\/?$/.test(location.pathname);
let nestedApp=false;
try { nestedApp=window.parent!==window && !!window.frameElement?.matches('#green-rescue-frame,[data-cinema-frame],[data-lgg-embed]'); } catch { /* External preview frames may be cross-origin. */ }
if(embeddedPage||nestedApp){
 document.querySelector('#app').innerHTML='<main class="card" role="alert"><h1>This experience could not load.</h1><p>The server returned the main website instead of the separate game or cinema page. Recursive loading has been stopped.</p><p>Rebuild the complete project and serve the generated build folder with its included serve.json, or use npm run preview.</p><a href="./#/dashboard" target="_top">Return to Dashboard</a></main>';
}else{
 await import('./science-controls.js');
 await import('./workspace-nav.js');
 await import('./experience-controls.js');
 await import('./team.js');
 await import('./case-solutions.js');
 await import('./app.js');
}
