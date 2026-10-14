import {solvents,catalysts,reactionLibrary} from './data.js';
export const number=v=>v===''||v===null||v===undefined?null:Number.isFinite(Number(v))?Number(v):null;
const sum=a=>a.reduce((s,n)=>s+n,0), valid=v=>number(v)!==null&&number(v)>=0, pos=v=>number(v)!==null&&number(v)>0;
export const format=(v,d=1)=>v===null||v===undefined||!Number.isFinite(v)?'—':v.toLocaleString('en',{maximumFractionDigits:d,minimumFractionDigits:d});
export function errors(r){
 const e={};
 for(const [key,list] of [['solvent',solvents],['catalyst',catalysts]])if(r[key]&&!['none'].includes(r[key])&&!list.some(x=>x.id===r[key]))e[key]=`Unknown ${key} reference. Choose a listed entry or Unknown / other.`;
 for(const key of ['solventMass','catalystMass','otherMass','duration','waste','yield','temperature']){if(key==='yield'&&r.yieldMode==='mass')continue;if(r[key]!==''&&(!Number.isFinite(Number(r[key]))||Number(r[key])<(key==='temperature'?-273.15:0)))e[key]=key==='temperature'?'Must be at least −273.15 °C.':'Enter a valid nonnegative number.';}
 if(r.yieldMode==='yield'&&number(r.yield)>100)e.yield='Yield must be between 0 and 100%.';
 ['reactants','products'].forEach(kind=>r[kind].forEach((x,i)=>{['mass','molar','coeff'].forEach(k=>{if(kind==='products'&&i===0&&k==='mass'&&r.yieldMode==='yield')return;if(x[k]!==''&&(!Number.isFinite(Number(x[k]))||Number(x[k])<(k==='mass'?0:Number.MIN_VALUE)))e[`${kind}.${i}.${k}`]=k==='mass'?'Mass cannot be negative.':'Must be greater than zero.';});}));
 if(r.solvent==='none'&&number(r.solventMass)>0)e.solventMass='No solvent selected: solvent mass must be zero.';
 if(r.catalyst==='none'&&number(r.catalystMass)>0)e.catalystMass='No catalyst selected: catalyst mass must be zero.';
 return e;
}
export function analyze(r){
 const err=errors(r), ok=Object.keys(err).length===0;
 const hasReactants=r.reactants.length>0&&r.reactants.every(x=>x.name.trim()),hasProduct=!!r.products[0]?.name.trim();
 const massReady=hasReactants&&r.reactants.every(x=>valid(x.mass));
 const reactantMass=massReady?sum(r.reactants.map(x=>number(x.mass))):null;
 if(massReady&&reactantMass===0)err.productMass='At least one reactant must have a positive mass when quantities are supplied.';
 const stoich=!!(hasReactants&&hasProduct&&r.balanced&&r.reactants.every(x=>pos(x.coeff)&&pos(x.molar))&&r.products.every(x=>x.name.trim()&&pos(x.coeff)&&pos(x.molar)));
 const denominator=stoich?sum(r.reactants.map(x=>number(x.coeff)*number(x.molar))):null;
 const prod=r.products[0],factor=stoich?number(prod.coeff)*number(prod.molar):null;
 if(stoich){const output=sum(r.products.map(x=>number(x.coeff)*number(x.molar)));if(Math.abs(output-denominator)/denominator>0.005)err.balanced='Stoichiometric masses do not balance within 0.5%. Check all coefficients, molar masses, and coproducts.';}
 const theory=stoich&&massReady?Math.min(...r.reactants.map(x=>number(x.mass)/(number(x.molar)*number(x.coeff))))*factor:null;
 let productMass=hasProduct?(r.yieldMode==='yield'?(theory!==null&&valid(r.yield)&&number(r.yield)<=100?theory*number(r.yield)/100:null):number(prod.mass)):null;
 if(productMass!==null&&reactantMass!==null&&productMass>reactantMass+0.001)err.productMass='Target product mass exceeds reactant mass. Check quantities and input completeness.';
 if(r.yieldMode==='mass'&&theory>0&&productMass>theory*1.0001)err.productMass='Target mass exceeds theoretical yield. Check purity, stoichiometry, and quantities.';
 const allInputs=!!(r.complete&&massReady&&['solventMass','catalystMass','otherMass'].every(k=>valid(r[k])));
 const inputMass=allInputs?reactantMass+number(r.solventMass)+number(r.catalystMass)+number(r.otherMass):null;
 if(inputMass!==null&&valid(r.waste)&&productMass!==null&&number(r.waste)+productMass>inputMass+0.001)err.waste='Waste plus target product exceeds total inputs for the stated boundary.';
 const usable=ok&&Object.keys(err).length===0;
 const metric=(value,missing)=>({value:usable?value:null,missing:usable?missing:'Correct the highlighted input errors.'});
 const atom=metric(stoich?factor/denominator*100:null,'Add named reactants and products, positive molar masses and coefficients; confirm a balanced equation.');
 const yieldValue=r.yieldMode==='yield'?number(r.yield):(theory>0&&productMass!==null?productMass/theory*100:null);
 const yieldMetric=metric(yieldValue,'Enter yield, or supply balanced stoichiometry, reactant masses, and target product mass.');
 const rme=metric(reactantMass>0&&productMass!==null?productMass/reactantMass*100:null,'Add every reactant mass and target product mass (or enough data for yield-based mass).');
 const pmi=metric(inputMass!==null&&productMass>0?inputMass/productMass:null,'Confirm all inputs are included; enter solvent, catalyst, other-input masses (0 if absent), and positive target product mass.');
 const wasteMass=valid(r.waste)?number(r.waste):(inputMass!==null&&productMass!==null?inputMass-productMass:null);
 const ef=metric(wasteMass!==null&&productMass>0?wasteMass/productMass:null,'Enter total waste and positive target mass, or complete the full input mass balance.');
 const temperature=number(r.temperature),duration=number(r.duration);
 const energyIndex=usable&&hasReactants&&hasProduct&&temperature!==null&&duration!==null?Math.abs(temperature-25)*duration:null;
 const energyScore=energyIndex===null?null:Math.max(0,100-energyIndex/5);
 const solvent=solvents.find(x=>x.id===r.solvent),catalyst=catalysts.find(x=>x.id===r.catalyst);
 const categories=[
 {name:'Waste',value:ef.value===null?null:100/Math.sqrt(1+ef.value),why:'100 ÷ √(1 + E-factor). Smooth educational scale; lower waste intensity is better.'},
 {name:'Energy',value:energyScore,why:'max(0, 100 − |temperature − 25| × hours ÷ 5). Educational thermal-demand proxy; not kWh.'},
 {name:'Solvent',value:usable?(solvent?.score??(r.solvent==='none'?100:null)):null,why:'Educational mapping: recommended 85, guide-dependent 60, problematic 35, no solvent 100. Not a compatibility or hazard clearance.'},
 {name:'Catalyst',value:null,why:'Identity alone cannot establish efficiency, selectivity, recovery, or lifecycle burden.'},
 {name:'Efficiency',value:yieldMetric.value,why:'Yield percentage, supplied or calculated. Does not measure selectivity.'},
 {name:'Safety',value:null,why:'Requires a complete substance and process risk assessment; solvent identity is insufficient.'},
 {name:'Atom economy',value:atom.value,why:'Balanced-equation target mass fraction; independent of yield and conditions.'},
 {name:'Reaction mass efficiency',value:rme.value,why:'Actual target mass ÷ reactant mass × 100; includes excess reactants.'},
 {name:'PMI',value:pmi.value===null?null:100/Math.sqrt(Math.max(1,pmi.value)),why:'100 ÷ √PMI. All process inputs per target mass. Shares a limited material-burden weight with E-factor.'}
 ];
 categories[0].why+=` Current waste: ${format(usable?wasteMass:null,3)} g; target: ${format(usable?productMass:null,3)} g; E-factor: ${format(ef.value,3)}.`;
 categories[1].why+=` Current temperature: ${format(temperature)} °C; duration: ${format(duration)} h; proxy: ${format(energyIndex)} °C·h.`;
 categories[2].why+=` Recorded medium: ${solvent?.name||(r.solvent==='none'?'No solvent':'Unknown')}.`;
 categories[4].why+=` Current yield: ${format(yieldMetric.value)}% (${r.yieldMode==='yield'?'supplied input':'calculated from target mass'}).`;
 // A medium or temperature alone is not a reaction assessment.
 if(!hasReactants||!hasProduct)categories.forEach(c=>{c.value=null;});
 // Weights total 100. E-factor + PMI share 25%; no third waste bonus.
 const weights=[15,10,10,4,10,6,20,15,10];
 categories.forEach((c,i)=>c.weight=weights[i]);
 const known=categories.filter(x=>x.value!==null), availableWeight=sum(known.map(c=>c.weight));
 categories.forEach(c=>{c.normalizedWeight=c.value===null?null:c.weight/availableWeight*100;c.contribution=c.value===null?null:c.value*c.weight/availableWeight;});
 const rawScore=known.length?sum(known.map(c=>c.contribution)):null;
 return {target:hasProduct?targetIdentity(r):null,errors:err,metrics:{atom,yield:yieldMetric,ef,pmi,rme},productMass:usable?productMass:null,theory:usable?theory:null,inputMass:usable?inputMass:null,wasteMass:usable?wasteMass:null,energyIndex,energyLabel:energyIndex===null?'Additional data required':energyIndex<=50?'Lower energy':energyIndex<=250?'Moderate energy':'Higher energy',solvent,catalyst,categories,score:rawScore,rawScore,availableWeight,scoreVersion:2,coverage:known.length,valid:usable,exists:!!r.name.trim()||hasReactants||hasProduct};
}
export const metricInfo={atom:{title:'Atom economy',unit:'%',formula:'100 × (target coefficient × target molar mass) ÷ Σ(reactant coefficient × molar mass)',description:'Theoretical fraction of reactant atoms retained in the first, desired product. Higher is better; independent of actual yield.'},yield:{title:'Yield',unit:'%',formula:'100 × actual target mass ÷ theoretical target mass',description:'Target obtained relative to the limiting-reactant maximum. In yield-input mode this is supplied data, not an independent calculation.'},ef:{title:'E-factor',unit:'kg/kg',formula:'total waste mass ÷ target product mass',description:'Lower is better. Water included. Entered waste is used if supplied; otherwise all input mass except target is treated as waste, with no recovery credit.'},pmi:{title:'Process mass intensity',unit:'kg/kg',formula:'all input mass ÷ target product mass',description:'Lower is better. Includes reactants, water/solvents, catalyst, and other inputs, before recovery credits.'},rme:{title:'Mass efficiency',unit:'%',formula:'100 × target product mass ÷ total reactant mass',description:'Actual reactant mass incorporated in the target. Excludes auxiliary solvent and catalyst; excess reactants are included.'}};
export const optimizationGoals=[['balanced','Balanced'],['waste','Lowest waste'],['safety','Safer chemicals'],['energy','Lowest energy'],['atom','Better atom economy']];
export function metricChanges(a,b){return Object.entries(metricInfo).map(([key,m])=>{const before=a.metrics[key].value,after=b.metrics[key].value;return {key,title:m.title,unit:m.unit,before,after,status:!sameTarget(a,b)?'Different targets · not ranked':before===null||after===null?'More information required':Math.abs(after-before)<0.0001?'Unchanged':((key==='ef'||key==='pmi')?after<before:after>before)?'More favorable metric':'Less favorable metric'};});}
export function optimizationFindings(r,a=analyze(r)){
 if(!a.valid)return ['Correct input errors before assessing opportunities.'];const out=[];
 if(a.metrics.atom.value!==null&&a.metrics.atom.value<100-1e-8)out.push(`Atom economy ${format(a.metrics.atom.value)}%: coproduct atoms are not credited to the first target.`);
 if(a.metrics.ef.value>0)out.push(`E-factor ${format(a.metrics.ef.value)}: non-target mass is recorded in this boundary; recovery is not established.`);
 if(number(r.solventMass)>0)out.push(`${format(number(r.solventMass))} g auxiliary solvent is recorded. This alone does not prove excess use.`);
 if(a.solvent?.category==='Problematic')out.push(`${a.solvent.name} has a problematic reference-guide category; this is not a complete hazard assessment.`);
 if(a.energyIndex>50)out.push(`${a.energyLabel}: thermal proxy ${format(a.energyIndex)} °C·h. Actual energy consumption is unknown.`);
 if(a.metrics.yield.value!==null&&a.metrics.yield.value<100)out.push(`Yield ${format(a.metrics.yield.value)}% leaves a target-output gap; it does not measure selectivity.`);
 return out.length?out:['No specific weakness is established by the available metrics. Missing evidence is not proof of a green process.'];
}
function targetIdentity(r){const p=r.products[0];return p?`${p.name.toLowerCase().replace(/\([^)]*\)/g,'').trim()}|${Number(p.molar).toFixed(3)}`:'';}
function reactionBasis(r){return JSON.stringify(['reactants','products'].map(k=>r[k].map(x=>[x.name.toLowerCase().trim(),Number(x.molar),Number(x.coeff)]).sort((a,b)=>a[0].localeCompare(b[0]))));}
export function recommendations(r,goal='balanced'){
 const a=analyze(r);if(!a.exists||!a.valid)return [];
 if(!optimizationGoals.some(([id])=>id===goal))goal='balanced';
 const candidates=[],common={safety:'Chemical compatibility and full process hazards need separate evidence.',efficiency:'No new yield, selectivity or performance value is predicted.',confidence:'Limited data · research direction',applicable:false,priority:1};
 const add=x=>candidates.push({...common,...x});
 const sourceEntry=reactionLibrary.find(x=>x.id===r.libraryId&&reactionBasis(x.reaction)===reactionBasis(r));
 const plan=sourceEntry?.optimization;
 if(plan&&!r.equationEdited&&r.solvent===sourceEntry.reaction.solvent&&r.catalyst===sourceEntry.reaction.catalyst&&r.catalystIdentity===sourceEntry.reaction.catalystIdentity){
  const scenario=JSON.parse(JSON.stringify(r));Object.assign(scenario,JSON.parse(JSON.stringify(plan.changes)));scenario.provenance={...scenario.provenance,...Object.fromEntries(Object.keys(plan.changes).map(k=>[k,'educational-scenario'])),...plan.changeProvenance};scenario.dataType='educational-scenario';
  if(plan.changes.reactants&&a.theory){const theoretical=analyze(scenario).theory;if(theoretical)for(const x of scenario.reactants)x.mass*=a.theory/theoretical;for(const key of Object.keys(scenario.provenance))if(/^(reactants|products)\.\d+\./.test(key))delete scenario.provenance[key];}
  const fieldsChanged=Object.keys(plan.changes).some(k=>JSON.stringify(r[k])!==JSON.stringify(scenario[k]));
  const b=analyze(scenario),changes=metricChanges(a,b),better=changes.filter(x=>x.status==='More favorable metric');
  const thermalBetter=b.energyIndex!==null&&a.energyIndex!==null&&b.energyIndex<a.energyIndex;
  if(b.valid&&fieldsChanged&&(better.length||thermalBetter||plan.qualitativeOnly))add({id:'education:'+sourceEntry.id,title:plan.title,current:plan.baseline,suggested:plan.title,problem:plan.problem,why:plan.concept,benefit:plan.qualitativeOnly?'The feedstock origin changes. Numerical metrics and Green Score remain unchanged because this engine does not calculate virgin-material displacement or life-cycle impacts.':[...better.map(x=>`${x.title}: ${format(x.before)} → ${format(x.after)} ${x.unit}`),...(thermalBetter?[`Thermal proxy: ${format(a.energyIndex)} → ${format(b.energyIndex)} °C·h`]:[])].join('; '),tradeoff:plan.limits,efficiency:'Educational optimization scenario. Quantitative changes are assumed inputs, not measured literature results. Any retained yield is an explicit assumption.',confidence:plan.evidenceType,source:plan.source,applicable:true,scenario,entryId:sourceEntry.id,tags:plan.tags,principles:plan.principles,priority:4,coverage:b.coverage,worsenings:changes.filter(x=>x.status==='Less favorable metric').length,kind:'Educational optimization scenario'});
 }
 // Whole existing datasets only: never substitute a reagent based on its name or guide score.
 if(a.metrics.atom.value!==null&&!r.equationEdited)for(const entry of reactionLibrary){
  if(!sourceEntry?.reaction.comparisonIds?.includes(entry.id))continue;
  if(entry.id===r.libraryId||targetIdentity(entry.reaction)!==targetIdentity(r)||reactionBasis(entry.reaction)===reactionBasis(r))continue;
  const b=analyze(entry.reaction);if(!b.valid||Object.values(b.metrics).some(m=>m.value===null)||b.score===null)continue;
  const changes=metricChanges(a,b),better=changes.filter(x=>x.status==='More favorable metric'),worse=changes.filter(x=>x.status==='Less favorable metric');
  if(!better.length)continue;
  const tags=[...new Set(better.map(x=>x.key==='atom'?'atom':['ef','pmi'].includes(x.key)?'waste':'balanced'))];
  add({id:'route:'+entry.id,title:`Compare ${entry.label}`,current:r.name,suggested:entry.label,why:'The library contains a different complete reaction dataset producing the same named target. Compare its full inventory; it is not a drop-in substitution.',benefit:better.map(x=>`${x.title}: ${format(x.before)} → ${format(x.after)} ${x.unit}`).join('; '),tradeoff:worse.length?worse.map(x=>`${x.title} is less favorable (${format(x.before)} → ${format(x.after)} ${x.unit})`).join('; '):'No worsening among the comparable mass metrics; unmeasured impacts may still be worse.',efficiency:entry.reaction.demo?'All quantities and yields come unchanged from an existing hypothetical demo, not measured process performance.':'Equation-only dataset: process quantities, yields and operating conditions remain unknown.',confidence:'High confidence in arithmetic · limited process evidence',applicable:true,entryId:entry.id,tags,principles:[...new Set(better.map(x=>x.key==='atom'?2:1))],priority:2,coverage:b.coverage,worsenings:worse.length,kind:entry.kind});
 }
 if(a.solvent?.category==='Problematic')add({id:'solvent',title:'Review the problematic solvent',current:a.solvent.name,suggested:'Seek a reaction-specific solvent comparison',why:'The existing solvent guide flags this category; it does not verify any replacement for this reaction.',benefit:'A validated alternative could reduce solvent-related burden.',tradeoff:'No reliable compatible solvent substitute is available in the current data. No automatic swap is offered.',tags:['safety'],principles:[5,12],priority:3});
 if(a.metrics.ef.value>0||number(r.solventMass)>0)add({id:'material',title:'Review material demand and recovery',current:a.metrics.ef.value===null?'Incomplete waste inventory':`E-factor ${format(a.metrics.ef.value)}`,suggested:'Document auxiliary use, losses and recoverable streams',why:'Recorded non-target mass and auxiliary inputs contribute to material burden.',benefit:'Verified source reduction or recovery may lower discarded mass; no saving is assumed.',tradeoff:'Recovery needs purity, separation-energy and yield evidence. The existing no-recovery model cannot establish a recovery credit automatically.',tags:['waste'],principles:[1,5],priority:2});
 if(a.energyIndex>50)add({id:'energy',title:'Review thermal demand',current:a.energyLabel,suggested:'Compare documented energy requirements for validated conditions',why:'The entered temperature and duration produce an elevated thermal proxy.',benefit:'A validated process could require less heating or cooling.',tradeoff:'No lower temperature or shorter duration is prescribed; rate, equilibrium and safety may change. Pressure and electrical demand are not modeled.',tags:['energy'],principles:[6],priority:2});
 if(a.metrics.atom.value!==null&&a.metrics.atom.value<100-1e-8)add({id:'atom',title:'Review the target and coproduct pathway',current:`Atom economy ${format(a.metrics.atom.value)}%`,suggested:'Compare documented routes to the same target',why:'Changing solvent or temperature cannot improve the stoichiometric atom economy of an unchanged equation.',benefit:'A different validated route may retain more atoms in the target.',tradeoff:'Coproduct value, new feedstocks, upstream preparation and process feasibility need evidence. No new route is invented.',tags:['atom','waste'],principles:[2],priority:2});
 if(a.catalyst)add({id:'catalyst',title:'Check catalyst recovery evidence',current:a.catalyst.name,suggested:'Look for documented retained activity and recovery',why:'The recorded catalyst type provides no reuse, activity or selectivity measurements.',benefit:'Demonstrated reuse may reduce fresh catalyst demand.',tradeoff:'No reuse count, replacement catalyst or quantitative bonus can be inferred.',tags:['waste','safety'],principles:[9],priority:1});
 const missing=[];if(a.energyIndex===null)missing.push('temperature and duration for the thermal proxy');if(a.metrics.yield.value===null)missing.push('yield or target mass for efficiency');if(a.metrics.ef.value===null)missing.push('waste and target mass, or a complete input inventory');if(!a.solvent&&r.solvent!=='none')missing.push('solvent identity');
 if(missing.length||!candidates.length)add({id:'evidence',title:'Complete the evidence before choosing a route',current:'More information required',suggested:'Add available process evidence',why:missing.length?'Missing: '+missing.join('; ')+'.':'No defensible greener alternative is established by the available data.',benefit:'Better evidence enables meaningful comparison without invented results.',tradeoff:'Selectivity, reagent hazards, pressure, step count and renewable origin cannot be inferred from this model.',tags:['balanced','energy','safety','waste'],principles:[11],priority:0});
 // Evidence and goal relevance first; never sort on Green Score increases.
 const relevance=x=>goal==='balanced'?0:Number(x.tags.includes(goal));
 return candidates.sort((x,y)=>relevance(y)-relevance(x)||y.priority-x.priority||Number(y.applicable)-Number(x.applicable)||(x.worsenings||0)-(y.worsenings||0)||(y.coverage||0)-(x.coverage||0)||x.id.localeCompare(y.id)).slice(0,3).map((x,i)=>({...x,rank:i+1,rankLabel:i===0?(x.applicable?'Recommended comparison':'Recommended review'):`Alternative ${i+1}`,rankReason:`${goal==='balanced'?'Balanced':optimizationGoals.find(([id])=>id===goal)[1]} priority; supported relevance, evidence and known trade-offs. Practical feasibility is unverified.`}));
}
export function principleStatus(key,a){let value=null;if(key==='waste')value=a.categories[0].value;if(key==='atom')value=a.metrics.atom.value;if(key==='solvent')value=a.categories[2].value;if(key==='energy')value=a.categories[1].value;const reason=value===null?(key==='catalyst'?'Catalyst type alone cannot establish selectivity, activity, or recovery.':'The current inputs do not provide enough evidence for this principle.'):{waste:`E-factor ${format(a.metrics.ef.value)} gives a waste subscore of ${format(value)}/100.`,atom:`Atom economy is ${format(value)}% for the first product only.`,solvent:`The reference-category mapping gives ${format(value)}/100; compatibility is unverified.`,energy:`The temperature/time proxy gives ${format(value)}/100, not an energy measurement.`}[key]+' The existing status threshold is 75/100; this is only an educational proxy.';return value===null?{label:'Insufficient information',tone:'neutral',reason}:value>=75?{label:'Well addressed · proxy',tone:'good',reason}:{label:'Could improve · proxy',tone:'warn',reason};}

export function sameCoverage(a,b){return a.categories.every((x,i)=>(x.value===null)===(b.categories[i].value===null));}
export function sameTarget(a,b){return !!a.target&&a.target===b.target;}

// Shared outcome for every view; research directions are never applicable changes.
export function optimizationOutcome(r,goal='balanced'){
 const a=analyze(r),list=recommendations(r,goal),alternatives=list.filter(x=>x.applicable);
 if(alternatives.some(x=>x.scenario))return {status:'available',title:'Educational optimization available',detail:'Apply a reference-supported green-chemistry concept using clearly labelled illustrative inputs. The same engine calculates both scenarios; results are not experimental predictions.',alternatives};
 if(alternatives.length)return {status:'insufficient',title:'Illustrative route comparison available',detail:'These accounting datasets demonstrate trade-offs, not verified process performance.',alternatives};
 const missing=Object.entries(a.metrics).filter(([,m])=>m.value===null).map(([k,m])=>`${metricInfo[k].title}: ${m.missing}`);
 if(!a.valid||!a.exists||missing.length)return {status:'insufficient',title:'More information required',detail:!a.valid?'Correct the input errors.':missing.join(' ')||'Add named reactants and a target product.',alternatives:[]};
 return {status:'none',title:'No clear greener alternative is available in the current verified dataset.',detail:'No experimentally verified improvement is stored. This does not prove that the current process is optimal. Existing demo quantities are illustrative.',alternatives:[]};
}

// Quality gate for library admission, independent of any hand-assigned score.
export function auditReaction(entry){
 const r=entry.reaction,a=analyze(r),missing=Object.entries(a.metrics).filter(([,m])=>m.value===null).map(([k,m])=>({metric:metricInfo[k].title,reason:m.missing}));
 const gaps=[];
 if(!a.valid)gaps.push(...Object.values(a.errors));
 if(!r.equation)gaps.push('Balanced equation text');
 if(!a.solvent&&r.solvent!=='none')gaps.push('Solvent identity');
 if(!a.catalyst&&r.catalyst!=='none')gaps.push('Catalyst identity');
 if(a.energyIndex===null)gaps.push('Temperature and duration');
 const keep=!entry.retiredReason&&a.valid&&missing.length===0&&a.score!==null&&gaps.length===0;
 return {id:entry.id,name:entry.label,decision:keep?'KEEP':'REMOVE',scope:'Demo library; saved personal inputs remain available',reason:entry.retiredReason|| (keep?(r.learningPurpose||'Complete illustrative accounting dataset'):'Only equation-level evidence is stored; process quantities cannot be derived from stoichiometry alone.'),metrics:Object.fromEntries(Object.entries(a.metrics).map(([k,m])=>[k,m.value])),score:a.score,missingRequired:missing,gaps,optionalUnavailable:['Individual coproduct quantities','Measured energy','Selectivity','Specific catalyst activity and reuse','Complete process safety and lifecycle data'],evidence:r.evidence?.level||'equation-only',verifiedProcess:false};
}
