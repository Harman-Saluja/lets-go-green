import assert from 'node:assert/strict';
import {elbowPorts,elbowPath,fitsSocket} from '../src/pipe-model.js';
import {freshGame,act} from '../src/green-rescue-state.js';
import {pipePart,world} from '../src/green-rescue-art.js';
const finish=s=>{while(s.phase==='ACTION_ANIMATION')s=act(s,'tick');return s;};
const expected=[['N','E'],['E','S'],['S','W'],['W','N']];
for(let turn=0;turn<4;turn++){
 assert.deepEqual(elbowPorts(turn),expected[turn]);assert.equal(fitsSocket(turn),turn===0);assert.equal(fitsSocket(turn,expected[turn]),true);
 assert.ok(pipePart(turn).includes(elbowPath(turn)));
 let s=act(act(freshGame(),'start'),'begin');for(let i=0;i<turn;i++)s=act(s,'rotate-pipe');
 s=act(s,'pipe');assert.ok(world(s).includes(`data-ports="${expected[turn].join(' ')}"`));
 s=finish(act(s,'socket'));assert.equal(s.phase,turn===0?'PLAYING':'FAILURE');
 if(turn===0){assert.equal(s.installedPipe,0);assert.ok(world(s).includes('data-ports="N E"'));s=finish(act(s,'treatment'));assert.equal(finish(act(s,'tap')).phase,'SUCCESS');assert.equal(finish(act({...s,installedPipe:3},'tap')).phase,'FAILURE');}
}
assert.equal(fitsSocket(-1),false);assert.equal(fitsSocket(4),false);
let s=act(act(freshGame(),'start'),'begin');for(let i=0;i<4;i++)s=act(s,'rotate-pipe');assert.equal(s.pipeTurn,0);
console.log('PASS: four cardinal elbows, shared artwork, rotation wrap, correct/wrong placement, installed connection validation, Level 1 completion.');
