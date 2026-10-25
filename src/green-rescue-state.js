import {fitsSocket,waterRouteReady} from './pipe-model.js';
// Pure state machine: no scores, chemistry data or website state are modified.
export const phases=['TITLE','LEVEL_INTRO','PLAYING','ACTION_ANIMATION','SUCCESS','FAILURE','RESULT_POPUP','FINAL_VICTORY','PAUSED'];
export const rescueMaterials=[
 {id:'box',label:'Sealed lab stream',bin:'socket',why:'Its prepared specialist label requires separate trained collection.'},
 {id:'paper',label:'Clean paper',bin:'paper-bin',why:'The fictional facility accepts clean paper for dry-material recovery.'},
 {id:'glass',label:'Clean glass',bin:'glass-bin',why:'This scenario has a dedicated collection route for accepted clean glass.'},
 {id:'cardboard',label:'Clean cardboard',bin:'paper-bin',why:'Accepted clean cardboard joins the dry-material recovery route.'},
 {id:'metal',label:'Clean metal pack',bin:'paper-bin',why:'This non-hazardous package is accepted for dry-material sorting in this scenario.'},
 {id:'filter',label:'Sealed tagged filter',bin:'socket',why:'The prepared specialist tag takes priority; keep the package sealed.'}
];
export function taskProgress(s){const base=levels[s.level].required.filter(k=>s.done.includes(k)).length;return s.level===0?{complete:base+s.routeTurns.filter((v,i)=>v===[0,2,0][i]).length,total:5}:s.level===3?{complete:base+(s.valveTurn===0?1:0),total:5}:{complete:base,total:levels[s.level].required.length};}
export function gameHint(s){if(s.level===0)return 'Trace source → three elbows → treatment. Match each open pipe end to the fixed track; the treatment and delivery connection are also required.';if(s.level===1)return !s.done.includes('inspect')?'Find why material is being wasted before changing equipment.':!s.done.includes('meter')?'Prevent excess input at the feeder instead of increasing downstream capacity.':!s.done.includes('calibrate')?'Match the feed to demand; maximum speed is not the goal.':'Only known clean offcuts are approved for this fictional return loop.';if(s.level===2)return 'Read each label. Clean paper, cardboard and metal share dry recovery; clean glass has a dedicated route; specialist-tagged packages stay separate.';return 'Fit recovery, enable containment, align the valve, then match both labeled packages. Do not mix the streams.';}
const beat=(ms,cue,pose,text)=>({ms,cue,pose,text});
export const levels=[
 {title:'Water Rescue',tag:'A drink worth waiting for',goal:'Connect the delivery pipe and align the three route elbows. Treat the water, then test the tap.',idea:'Suitable treatment, verification and a sound supply route work together.',required:['pipe','treatment'],items:['pipe','socket','treatment','bypass','tap','route-0','route-1','route-2'],hint:'pipe',intro:'This fictional source contains particles and microbes. Connect the prepared treatment route.'},
 {title:'Factory Rescue',tag:'A little less goes a long way',goal:'Find the source of excess input, improve control and recover suitable material. Then start the line.',idea:'Preventing unnecessary inputs avoids waste before it forms.',required:['inspect','meter','calibrate','recover'],items:['inspect','meter','socket','calibrate','recover','more-bins','maxfeed','mix-return','discard','speed','flush','run'],hint:'meter',intro:'The feed hopper is overfilling. Upgrade this fictional process at its source.'},
 {title:'Lab Rescue',tag:'Right box. Right route.',goal:'Read and match six prepared materials to three suitable routes. Then transfer.',idea:'Keep a known compatible stream separate for an approved specialist.',required:rescueMaterials.map(x=>x.id),items:[...rescueMaterials.map(x=>x.id),'socket','paper-bin','glass-bin','route','mixed','drain','transfer'],hint:'box',intro:'Match a prepared sealed lab stream, clean paper and clean glass. Only trained staff handle actual laboratory waste.'},
 {title:'Final Green Rescue',tag:'Bring the valley back to life',goal:'Restore recovery and containment, align the valve and route two labeled materials. Then launch.',idea:'Resource efficiency and pollution prevention belong in the same design.',required:['heat','sensor','final-metal','final-filter'],items:['heat','socket','sensor','valve-turn','final-metal','final-filter','final-recovery','final-special','final-mixed','bypass','boost','launch'],hint:'heat',intro:'Complete the fictional facility’s recovery and containment systems. The scenery is illustrative.'}
];
export function freshGame(){return {phase:'TITLE',level:0,done:[],selected:null,pipeTurn:2,routeTurns:[1,0,3],layoutSeed:Math.floor(Math.random()*6),valveTurn:2,installedPipe:null,action:null,beat:0,outcome:null,message:'',mistakes:0,elapsed:0,pose:'idle',cue:'idle',returnPhase:null};}
const partial=(key,message,cue='connect')=>({kind:'partial',key,message,beats:[beat(450,'anticipate','thinking','Let’s line this up…'),beat(900,cue,'working',message),beat(450,'settle','happy','Connected!')]});
const failure=(cue,message)=>({kind:'failure',message,beats:[beat(420,'anticipate','worried','Hmm…'),beat(1050,cue,'surprised',message),beat(500,'recover','failure','Dr. Sprout needs another idea.')]});
const success=(level)=>({kind:'success',message:levels[level].idea,beats:[beat(650,'startup','thinking','System waking up…'),beat(1100,'flow','looking','Follow the flow.'),beat(1100,'process','surprised',level===0?'Treatment train operating.':level===2?'Sealed stream moving to collection.':'The process is responding.'),beat(800,'verified','happy',level===0?'Scenario checks passed.':level===1?'Excess feed prevented.':'Connections confirmed.'),beat(950,'walk','walking','Looking good!'),beat(900,'celebrate','celebrating','Rescue complete!')]});
export function choice(s,id){const n=s.level,done=k=>s.done.includes(k);if(!levels[n].items.includes(id))return null;
 if(n===0&&id.startsWith('route-'))return {kind:'route-turn',index:Number(id.slice(-1)),message:'Follow the fixed track from source to the treatment station.'};
 if(n===1){
  if(id==='inspect')return partial('inspect','Inspection: excess feed is entering before the process. Choose prevention at the source.','scan');
  if(id==='meter')return done('inspect')?partial('meter','Metered feed fitted. Now set an appropriate feed rate.','connect'):failure('jam','Inspect the excess-feed source before changing the equipment.');
  if(id==='calibrate')return done('meter')?partial('calibrate','Feed matched to the fictional process demand. Now consider suitable offcuts.','dial'):failure('jam','Meter the input before setting its feed rate.');
  if(id==='recover')return done('calibrate')?partial('recover','Known clean offcuts enter an approved return loop. Other streams stay separate.','valve'):failure('reverse','Control the input first. Recovery does not replace prevention.');
  if(id==='run')return levels[n].required.every(done)?success(n):failure('jam','Inspection, feed control and the approved recovery loop are not all ready.');
  return failure(['flush','mix-return'].includes(id)?'spill':'jam',({speed:'More speed can increase overfeeding.',flush:'Moving waste into water does not prevent it.','more-bins':'Larger bins store excess material; they do not prevent excess feed.',maxfeed:'Maximum feed does not match this process demand.','mix-return':'Unknown streams must not enter the approved clean return loop.',discard:'Discarding recoverable clean offcuts misses this scenario’s recovery opportunity.'})[id]||'Choose a control suited to the current process stage.');
 }
 if(n===2){
  const item=rescueMaterials.find(x=>x.id===id);if(item)return done(id)?null:{kind:'select',key:id,message:'Read the label, then drag or tap its collection route.'};
  if(['socket','paper-bin','glass-bin'].includes(id)){const chosen=rescueMaterials.find(x=>x.id===s.selected);return chosen?.bin===id?partial(chosen.id,chosen.why,'box-move'):failure('wrong-route',chosen?'Not that route. '+chosen.why:'Select a labeled material first.');}
  if(id==='mixed')return failure('reverse','Unknown or incompatible streams must not be mixed.');
  if(id==='drain')return failure('alarm','Laboratory waste is not a drain disposal activity.');
  if(id==='transfer')return levels[n].required.every(done)?success(n):failure('wrong-route','Match all six prepared materials before transfer.');return null;
 }
 if(n===3){
  if(['final-metal','final-filter'].includes(id))return done(id)?null:{kind:'select',key:id,message:'Match the prepared label to a suitable destination.'};
  if(['final-recovery','final-special','final-mixed'].includes(id)){const expected={'final-metal':'final-recovery','final-filter':'final-special'}[s.selected];return expected===id?partial(s.selected,'Labeled material routed separately.','box-move'):failure('wrong-route','Clean metal goes to accepted recovery; the sealed tagged filter needs the specialist route.');}
  if(id==='valve-turn')return {kind:'turn',message:'Align the delivery valve with the upward marker.'};
  if(id==='sensor')return partial('sensor','Leak detection and containment enabled.','scan');
  if(id==='bypass')return failure('alarm','Bypassing controls defeats prevention.');
  if(id==='boost')return failure('overload','Extra power cannot replace recovery and containment.');
  if(id==='launch')return levels[n].required.every(done)&&s.valveTurn===0?success(n):failure('overload','Finish the equipment, valve alignment and both labeled routes.');
 }
 if(id==='socket'){if(n===0&&s.selected==='pipe'&&!fitsSocket(s.pipeTurn))return failure('wrong-route','The delivery elbow openings do not match the north/east sockets.');const key=n===0?'pipe':'heat';return s.selected===key?partial(key,n===0?'Delivery coupled. Align the route and enable treatment.':'Heat recovery connected. Complete containment and material routing.'):failure('wrong-route','Pick up the part first, then place it in its socket.');}
 if(['pipe','heat'].includes(id))return {kind:'select',key:id,message:'Drag to the socket, or tap the socket.'};
 if(n===0){if(id==='treatment')return partial(id,'Fictional particles/microbes route: clarification, filtration, disinfection and checks.','valve');if(id==='bypass')return failure('dirty','Bypassing treatment leaves this water unsafe.');if(id==='tap')return done('pipe')&&fitsSocket(s.installedPipe)&&waterRouteReady(s.routeTurns)&&done('treatment')?success(n):failure(done('pipe')&&waterRouteReady(s.routeTurns)?'dirty':'spray',!waterRouteReady(s.routeTurns)?'The three route elbows are not connected to the fixed track.':!done('pipe')?'The delivery pipe is still disconnected.':'Treatment and verification are still required.');}return null;
}
export function act(s,id){
 if(id==='rotate-pipe'&&s.phase==='PLAYING'&&s.level===0&&!s.done.includes('pipe'))return {...s,pipeTurn:(s.pipeTurn+1)%4,message:'Match the elbow openings to the north and east connections.'};
 if(id==='restart')return {...freshGame(),phase:'LEVEL_INTRO'};
 if(id==='start'&&s.phase==='TITLE')return {...s,phase:'LEVEL_INTRO',pose:'looking'};
 if(id==='begin'&&s.phase==='LEVEL_INTRO')return {...s,phase:'PLAYING',pose:'idle',message:levels[s.level].goal};
 if(id==='pause'&&['PLAYING','ACTION_ANIMATION','SUCCESS','FAILURE'].includes(s.phase))return {...s,returnPhase:s.phase,phase:'PAUSED'};
 if(id==='resume'&&s.phase==='PAUSED')return {...s,phase:s.returnPhase,returnPhase:null};
 if(id==='retry'&&s.phase==='RESULT_POPUP'&&s.outcome==='failure')return {...s,phase:'PLAYING',action:null,beat:0,cue:'idle',pose:'thinking',message:levels[s.level].goal};
 if(id==='next'&&s.phase==='RESULT_POPUP'&&s.outcome==='success')return s.level===3?{...s,phase:'FINAL_VICTORY',pose:'victory',cue:'celebrate'}:{...s,phase:'LEVEL_INTRO',level:s.level+1,done:[],selected:null,action:null,beat:0,cue:'idle',pose:'looking',outcome:null};
 if(id==='tick'&&s.phase==='ACTION_ANIMATION'){const b=s.beat+1;if(b<s.action.beats.length)return {...s,beat:b,cue:s.action.beats[b].cue,pose:s.action.beats[b].pose,message:s.action.beats[b].text};if(s.action.kind==='partial')return {...s,phase:'PLAYING',done:[...new Set([...s.done,s.action.key])],installedPipe:s.action.key==='pipe'?s.pipeTurn:s.installedPipe,selected:null,action:null,cue:'idle',pose:'happy'};return {...s,phase:s.action.kind==='success'?'SUCCESS':'FAILURE',outcome:s.action.kind,pose:s.action.kind==='success'?'celebrating':'confused',mistakes:s.mistakes+(s.action.kind==='failure'?1:0),message:s.action.message};}
 if(id==='popup'&&['SUCCESS','FAILURE'].includes(s.phase))return {...s,phase:'RESULT_POPUP'};
 if(s.phase!=='PLAYING')return s;const action=choice(s,id);if(!action)return s;if(action.kind==='route-turn')return {...s,routeTurns:s.routeTurns.map((v,i)=>i===action.index?(v+1)%4:v),pose:'working',message:action.message};if(action.kind==='turn')return {...s,valveTurn:(s.valveTurn+1)%4,pose:'working',message:action.message};if(action.kind==='select')return {...s,selected:action.key,pose:'thinking',message:action.message};return {...s,phase:'ACTION_ANIMATION',action,beat:0,cue:action.beats[0].cue,pose:action.beats[0].pose,message:action.beats[0].text};
}
