import {molecules} from './science-data.js';
const status=document.querySelector('#molecule-status'),record=molecules.find(m=>m.cid===Number(new URLSearchParams(location.search).get('cid')));
try{
 if(!record)throw Error('No verified identity was selected.');
 if(!window.$3Dmol)throw Error('The local 3D viewer could not load.');
 const response=await fetch(new URL(`./assets/molecules/${record.cid}.sdf`,import.meta.url));if(!response.ok)throw Error('The local molecular record is unavailable.');
 const sdf=await response.text();if(!sdf.startsWith(String(record.cid)+'\n'))throw Error('Molecular record identity mismatch.');
 const viewer=$3Dmol.createViewer(document.querySelector('#viewer'),{backgroundColor:getComputedStyle(document.documentElement).getPropertyValue('--surface').trim()||'#14231b',antialias:true});
 viewer.addModel(sdf,'sdf');viewer.setStyle({},{stick:{radius:.16},sphere:{scale:.28}});viewer.zoomTo();viewer.render();const initial=viewer.getView();let sphere=false;
 status.textContent='Drag to rotate; pinch or use zoom buttons. White: hydrogen · grey: carbon · red: oxygen · blue: nitrogen.';
 document.querySelector('#molecule-controls').addEventListener('click',e=>{const a=e.target.closest('[data-view]')?.dataset.view;if(!a)return;if(a==='in')viewer.zoom(1.2);if(a==='out')viewer.zoom(.8);if(a==='left')viewer.rotate(15,'y');if(a==='right')viewer.rotate(-15,'y');if(a==='up')viewer.rotate(15,'x');if(a==='reset')viewer.setView(initial);if(a==='style'){sphere=!sphere;viewer.setStyle({},sphere?{sphere:{scale:1}}:{stick:{radius:.16},sphere:{scale:.28}});}viewer.render();});
 const resize=new ResizeObserver(()=>viewer.resize());resize.observe(document.querySelector('#viewer'));addEventListener('pagehide',()=>{resize.disconnect();viewer.clear();});
}catch(e){status.textContent='3D view unavailable. '+e.message+' Use the compound description and PubChem reference in the parent panel.';document.querySelector('#molecule-controls').hidden=true;}
