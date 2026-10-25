// One clockwise cardinal model shared by game rules and all SVG representations.
export const directions=['N','E','S','W'];
export const waterSocket=['N','E'];
export const elbowPorts=turn=>Number.isInteger(turn)&&turn>=0&&turn<4?[directions[turn],directions[(turn+1)%4]]:[];
export const fitsSocket=(turn,required=waterSocket)=>{const ports=elbowPorts(turn);return ports.length===2&&required.length===2&&required.every(p=>ports.includes(p));};
export function elbowPath(turn=0){const points={N:[0,-49],E:[49,0],S:[0,49],W:[-49,0]},ports=elbowPorts(turn);if(ports.length!==2)return '';return `M${points[ports[0]].join(' ')}L0 0L${points[ports[1]].join(' ')}`;}

export const waterRouteTargets=[0,2,0];
export function waterRouteReady(turns){return Array.isArray(turns)&&turns.length===3&&turns.every((v,i)=>v===waterRouteTargets[i]);}
