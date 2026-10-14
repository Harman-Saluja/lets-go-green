/** Native ES-module adaptation of the supplied AnimeNavBar React/Next reference.
 * This .tsx uses the JavaScript subset of TypeScript: no JSX/runtime is required.
 * Build emits the same checked code as anime-navbar.js for native browsers.
 * Controlled by app state; navigation remains in the existing tab handler.
 */
export function AnimeNavBar(items, activeTab) {
 return `<nav class="anime-navbar" aria-label="Main navigation">${items.map(({name,icon})=>`<button type="button" data-action="tab" data-tab="${name}" class="nav-tab ${activeTab===name?'active':''}" ${activeTab===name?'aria-current="page"':''}><span aria-hidden="true">${icon}</span><span class="nav-label">${name}</span></button>`).join('')}<span class="anime-mascot" aria-hidden="true"><span class="mascot-face"><i></i><i></i><b></b></span><span class="mascot-tail"></span></span></nav>`;
}
// Damped spring keyframes, sampled once per interaction (no perpetual JS loop).
export function springFrames(dx,dy,scaleX=1,scaleY=1) {
 return Array.from({length:25},(_,i)=>{const t=i/24,decay=i===24?0:Math.exp(-8*t)*Math.cos(11*t);return {offset:t,transform:`translate(${dx*decay}px,${dy*decay}px) scale(${1+(scaleX-1)*decay},${1+(scaleY-1)*decay})`};});
}
export function syncAnimeNav(nav, previous, reduced) {
 const active=nav?.querySelector('.nav-tab.active');if(!active?.offsetWidth)return;
 let pill=nav.querySelector('.nav-indicator');if(!pill){pill=document.createElement('span');pill.className='nav-indicator';pill.setAttribute('aria-hidden','true');nav.append(pill);}
 const mascot=nav.querySelector('.anime-mascot'),to=active.getBoundingClientRect();
 Object.assign(pill.style,{left:active.offsetLeft+'px',top:active.offsetTop+'px',width:active.offsetWidth+'px',height:active.offsetHeight+'px'});
 if(mascot)Object.assign(mascot.style,{left:active.offsetLeft+active.offsetWidth/2-16+'px',top:active.offsetTop-30+'px'});
 nav.classList.add('pill-ready');
 for(const el of [nav,pill,mascot])el?.getAnimations?.().forEach(a=>a.cancel());
 if(reduced)return;
 const options={duration:580,easing:'linear'};
 if(previous?.width){const dx=previous.x-to.x,dy=previous.y-to.y;if(dx||dy){pill.animate?.(springFrames(dx,dy,previous.width/to.width,previous.height/to.height),options);mascot?.animate?.(springFrames(dx+(previous.width-to.width)/2,dy),options);}}
 else if(!nav.dataset.entered)nav.animate?.([{opacity:0,transform:'translateY(-12px)'},{opacity:1,transform:'translateY(2px)',offset:.7},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:'ease-out'});
 nav.dataset.entered='true';
}
