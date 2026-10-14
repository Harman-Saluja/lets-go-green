import assert from 'node:assert/strict';
import {AnimeNavBar,springFrames,syncAnimeNav} from '../build/components/ui/anime-navbar.js';
const tabs=['Dashboard','Chemistry Lab','Principles','History','Impact Atlas','Green Rescue'];
for(const name of tabs){const html=AnimeNavBar(tabs.map(name=>({name,icon:'◇'})),name);assert.equal((html.match(/aria-current="page"/g)||[]).length,1);assert.ok(html.includes(`data-tab="${name}" class="nav-tab active"`));assert.equal((html.match(/type="button"/g)||[]).length,6);}
for(const reduced of [true,false])for(const top of [36,114]){
 const calls=[],el=()=>({style:{},animate:(frames,opts)=>calls.push({frames,opts})}),pill=el(),mascot=el();
 const active={offsetWidth:100,offsetHeight:44,offsetLeft:220,offsetTop:top,getBoundingClientRect:()=>({x:240,y:top+80,width:100,height:44})};
 const nav={...el(),dataset:{},classList:{add(){}},querySelector:q=>q==='.nav-tab.active'?active:q==='.nav-indicator'?pill:mascot};
 syncAnimeNav(nav,{x:20,y:116,width:100,height:44},reduced);
 assert.equal(pill.style.top,top+'px');assert.equal(mascot.style.left,'254px');assert.equal(mascot.style.top,top-30+'px');assert.equal(calls.length,reduced?0:2);
 if(!reduced)for(const c of calls)assert.equal(c.frames.at(-1).transform,'translate(0px,0px) scale(1,1)');
}
assert.equal(springFrames(100,20).length,25);
console.log('PASS: all six controlled tabs, desktop/mobile mascot positioning, spring endpoints and reduced motion (DOM harness).');
