// Presentation data only. Symbols are not crystal structures or molecular mechanisms.
export const ionicUnits={
 'Sodium bicarbonate':[['Na+',1],['HCO3−',1]],
 'Trisodium citrate (anhydrous)':[['Na+',3],['C6H5O7³−',1]],
 'Sodium acetate (anhydrous)':[['Na+',1],['CH3COO−',1]],
 'Calcium carbonate':[['Ca²+',1],['CO3²−',1]],
 'Calcium lactate (anhydrous)':[['Ca²+',1],['C3H5O3−',2]],
 'Calcium chloride (anhydrous)':[['Ca²+',1],['Cl−',2]],
 'Sodium carbonate (anhydrous)':[['Na+',2],['CO3²−',1]],
 'Sodium chloride':[['Na+',1],['Cl−',1]],
 'Iron(III) oxide':[['Fe³+',2],['O²−',3]]
};
export function materialKind(row){return ionicUnits[row.name]?'ionic':/repeat unit/i.test(row.name)?'polymer':row.name==='Iron'?'metal':'unavailable';}
export function sceneGroups(r,kind){const sets=kind==='concept'?[['Before',r.reactants],['After',r.products]]:[[kind==='products'||kind==='green'?'Products':'Reactants',kind==='products'||kind==='green'?r.products:r.reactants]];return sets.flatMap(([side,rows])=>rows.flatMap(row=>{const n=Number(row.coeff);return Array.from({length:Number.isInteger(n)&&n>0?Math.min(n,6):1},(_,copy)=>({row,side,copy,total:n}));}));}
export function atomsForViewer(model,center,size=5){const min=['x','y','z'].map(k=>Math.min(...model.atoms.map(a=>a[k]))),max=['x','y','z'].map(k=>Math.max(...model.atoms.map(a=>a[k]))),scale=Math.min(1.5,size/Math.max(1,...max.map((v,i)=>v-min[i])));return model.atoms.map((a,i)=>({elem:a.element,serial:i,index:i,x:(a.x-(min[0]+max[0])/2)*scale+center.x,y:(a.y-(min[1]+max[1])/2)*scale+center.y,z:(a.z-(min[2]+max[2])/2)*scale+center.z,bonds:model.bonds.filter(b=>b.a===i||b.b===i).map(b=>b.a===i?b.b:b.a),bondOrder:model.bonds.filter(b=>b.a===i||b.b===i).map(b=>b.order)}));}
export function matchesFormula(model,formula){const text=String(formula||''),tokens=[...text.matchAll(/([A-Z][a-z]?)(\d*)/g)];if(tokens.map(t=>t[0]).join('')!==text)return false;const expected={},actual={};for(const [,e,n] of tokens)expected[e]=(expected[e]||0)+Number(n||1);for(const a of model.atoms)actual[a.element]=(actual[a.element]||0)+1;return Object.keys({...expected,...actual}).every(e=>expected[e]===actual[e]);}
