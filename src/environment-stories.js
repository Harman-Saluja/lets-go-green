import {atlasCases} from './science-data.js';
import {moreWorld} from './atlas-content.js';
import {indiaCases} from './atlas-regions.js';
import {equipmentArt} from './resource-art.js';
import {safe} from './science-views.js';
const cases=[...atlasCases,...moreWorld,...indiaCases];
// Narrative interpretation of retained sources. Responses are educational unless
// the source record explicitly documents a system or policy. No new outcomes.
const story=(id,title,route,response,change,learning,question,answer)=>({id,title,route,response,change,learning,question,answer,record:cases.find(c=>c.id===id)});
export const environmentalStories=[
 story('indore-khan','A river begins upstream',['Wastewater source','Collection & treatment','River monitoring'],
 'An appropriate response connects source prevention, reliable sewage collection and effective treatment. The April 2024 report describes infrastructure; that alone does not prove its performance.',
 'The retained report records unsatisfactory quality at monitored locations in April 2024. No later improvement is established by this record.',
 'Trace the pathway and test the outlet. Clear-looking water is not proof of safe water.',
 'Would a larger installed plant, by itself, prove that the river became cleaner?',
 'No. Check actual collection, plant throughput, outlet quality and representative river monitoring. Design capacity and measured water quality answer different questions.'),
 story('singrauli-air','Follow the dust',['Fuel & material handling','Source controls','Representative monitoring'],
 'The action plan addresses combustion, coal handling and ash management. Efficiency, dust containment and suitable emission controls address different parts of that system.',
 'The plan includes schedules spanning 2023–2025. A scheduled action is not evidence of completed installation or improved ambient air.',
 'Ask for both operational evidence and representative air measurements before claiming a change.',
 'Does publishing an action plan show that every control is working?',
 'No. A plan describes intended actions. Installation records, operating evidence and relevant observations are needed to assess delivery and effects.'),
 story('bhopal-soil','What the soil remembers',['Legacy residues','Site investigation','Exposure management'],
 'Prevent new releases and use a qualified site investigation to select containment, removal or treatment. This is a general response framework, not a claim of completed remediation.',
 'The December 2009 investigation detected contaminants in sampled soil and waste. It does not establish present conditions across Bhopal or current cleanup status.',
 'The place, depth, date and design of sampling matter. A historical sample is evidence about its sampled material.',
 'Can a few historical samples describe every part of a city today?',
 'No. Findings have a defined scope. Current, representative investigation is needed for claims about other places or present exposure.'),
 story('plastics-us','Before the bottle becomes waste',['Product & service design','Return or collection','Suitable recovery'],
 'Reduce unnecessary plastic, keep suitable products in repeated use, and recover accepted material. These are educational approaches supported by the EPA background discussion, not one universal local programme.',
 'This background record explains plastic pollution. It contains no before-and-after measurement demonstrating that a particular intervention reduced releases.',
 'A recycling option does not remove the need for prevention, collection, sorting and demand for recovered material.',
 'Does a recyclable design guarantee that a discarded bottle is recycled?',
 'No. Local acceptance, collection, contamination, sorting and available processing still determine what happens after use.'),
 story('minamata','A release becomes an exposure',['Factory wastewater','Aquatic food chain','Human exposure'],
 'Prevent mercury releases and evaluate safer processes. Existing contamination and affected communities still require appropriate management; prevention cannot undo past harm.',
 'The retained official historical account documents methylmercury contamination entering the food chain and serious health harm. This story adds no present safety or cleanup claim.',
 'Follow a contaminant beyond the outlet. Exposure may occur through food, far from the original release.',
 'Would testing only how clear the water looks reveal this exposure pathway?',
 'No. Appearance cannot establish the absence of hazardous contaminants. The substance, its movement and relevant exposure routes require appropriate assessment.'),
 story('london-smog','When weather traps pollution',['Combustion sources','Trapped air','Community exposure'],
 'Reduce avoidable fuel use and assess cleaner energy alongside suitable emission controls. This educational response addresses sources as well as weather-related accumulation.',
 'The Met Office account describes the December 1952 episode. No present-day London air-quality rating or numerical health estimate is added here.',
 'Source emissions and atmospheric conditions interact. One historical event cannot rank present-day cities.',
 'If the wind disperses smoke, has the emission source been solved?',
 'No. Dispersion changes concentrations and exposure patterns; reducing the release requires action at its source.'),
 story('love-canal','Disposal is not disappearance',['Buried chemical waste','Groundwater pathway','Community & site management'],
 'Prevent hazardous waste at source. For existing contaminated sites, containment, investigation and monitoring need a supported site-specific plan. The EPA retrospective documents a remediation case.',
 'The historical record links buried chemical waste with groundwater contamination and community impacts. This presentation does not certify the site’s current condition.',
 'A production decision can create a long-lived burden outside the factory boundary.',
 'Does moving a hazardous residue out of sight eliminate its risk?',
 'No. Contaminants may move through soil and water. Exposure pathways, containment performance and long-term management matter.'),
 story('ghana-ewaste','The cost of uncontrolled recovery',['Discarded electronics','Unsafe processing','Workers & neighbours'],
 'Use suitable separate collection and controlled recovery, while extending useful product life. The illustration is not an instruction to dismantle or burn devices.',
 'The WHO account uses documented e-waste practices to explain health risks. It does not verify the current status of the historical site or a completed safer replacement system.',
 'Recovery is not automatically safe. Worker and community exposure belong in the assessment alongside recovered material.',
 'Is a high-value recovered metal proof of an environmentally good process?',
 'No. Recovery can coexist with hazardous exposure and unmanaged residues. Controls, traceability and appropriate handling are essential.'),
 story('australia-hfc','A policy and an emission are different',['Refrigerant supply','Equipment & containment','Release to atmosphere'],
 'Australia’s documented programme limits bulk HFC imports through a phase-down. Refrigerant choices also require attention to equipment compatibility, safety and energy use.',
 'The retained record documents a policy measure, not a measured emissions inventory. No citywide or national reduction percentage is inferred.',
 'Distinguish policy scope, material supplied and material actually released. They are different quantities.',
 'Can an import phase-down percentage be reported as the same percentage drop in emissions?',
 'No. Supply restrictions, existing equipment stocks, servicing and leakage affect emissions differently. Use a suitable dated inventory for emission claims.'),
 story('germany-ewaste','Separate collection is a beginning',['Longer product life','Separate collection','Controlled treatment'],
 'German Environment Agency guidance describes separate collection and suitable treatment. Longer use and genuine repair or reuse help prevent premature waste.',
 'The source documents a collection and treatment system. It does not show that every returned device is fully recovered or provide a recovery rate for this scene.',
 'A collection handover starts a downstream chain. Traceability and handling of hazardous fractions still matter.',
 'After a device is collected, can every material be assumed recovered?',
 'No. Treatment separates selected useful fractions and manages hazardous or unrecovered residues. Collection and complete recovery are not equivalent.')
];
const steps=['Challenge','Response','Change','Learning'];
const icons={0:['product','sort','press'],1:['wash','wash','garden'],2:['furnace','sort','garden'],3:['soil','wash','garden'],4:['product','sort','press'],5:['gas','wash','garden'],6:['soil','sort','garden']};
export function storyScene(s,stage){const colors=['#d0b984','#a8c78f','#91babb','#c5d79e'],kinds=icons[s.record.category];return `<svg class="field-scene" viewBox="0 0 720 245" role="img" aria-label="Illustrative pathway for ${safe(s.title)}. ${steps[stage]} stage; not a site map or measured result."><path d="M0 205L240 126L720 205V245H0Z" fill="#294734"/><path class="field-path" d="M120 105H600" stroke="${colors[stage]}" stroke-width="3" stroke-dasharray="4 12" opacity=".5"/>${s.route.map((label,i)=>`<g transform="translate(${70+i*240} 33)" style="color:${colors[stage]}"><ellipse cx="50" cy="105" rx="68" ry="17" fill="#071d12" opacity=".6"/>${equipmentArt(kinds[i],stage===0?i===0:stage===1?i===1:stage===2?i===2:true)}<text x="50" y="145" fill="#dae3c8" text-anchor="middle" font-size="12">${safe(label)}</text></g>`).join('')}<text x="360" y="229" text-anchor="middle" fill="#a9bea2" font-size="10">ILLUSTRATIVE PATHWAY · NO MEASURED TRANSFORMATION</text></svg>`;}
const Base=globalThis.HTMLElement||class{};
export class EnvironmentStories extends Base{
 connectedCallback(){this.selected=0;this.stage=0;this.revealed=false;this.abort=new AbortController();this.addEventListener('click',e=>{const b=e.target.closest('[data-field]');if(!b)return;const a=b.dataset.field;if(a==='choose'){this.selected=Number(b.dataset.index);this.stage=0;this.revealed=false;}if(a==='stage'){this.stage=Number(b.dataset.index);this.revealed=false;}if(a==='next'){if(this.stage<3)this.stage++;else{this.selected=(this.selected+1)%environmentalStories.length;this.stage=0;}this.revealed=false;}if(a==='reveal')this.revealed=!this.revealed;this.render();this.querySelector(a==='choose'?'[data-field-title]':a==='stage'?`[data-field=stage][data-index="${this.stage}"]`:`[data-field="${a}"]`)?.focus({preventScroll:true});},{signal:this.abort.signal});this.render();}
 disconnectedCallback(){this.abort?.abort();}
 render(){const s=environmentalStories[this.selected],c=s.record,copy=[c.problem+' '+c.cause,s.response,s.change,s.learning][this.stage];this.innerHTML=`<section class="field-stories"><span class="eyebrow">FROM INDORE TO THE WIDER WORLD</span><h2>Follow the evidence.</h2><p>Ten stories from the existing Atlas, across India and the world. A recorded challenge, a response to consider, and an honest look at what is known about change.</p><div class="field-picker" aria-label="Environmental stories">${environmentalStories.map((s,i)=>`<button data-field="choose" data-index="${i}" aria-pressed="${i===this.selected}"><small>${String(i+1).padStart(2,'0')} / ${safe(s.record.district||s.record.country)}</small><b>${safe(s.title)}</b></button>`).join('')}</div><article class="field-story"><span class="eyebrow">${safe(c.location)}</span><h3 data-field-title tabindex="-1">${safe(s.title)}</h3><div class="field-diagram" tabindex="0" role="region" aria-label="Illustrative pathway; scroll horizontally on small screens">${storyScene(s,this.stage)}</div><div class="indore-story-steps">${steps.map((label,i)=>`<button data-field="stage" data-index="${i}" aria-current="${this.stage===i?'step':'false'}"><span>0${i+1}</span>${label}</button>`).join('')}</div><div class="field-copy" aria-live="polite"><span class="eyebrow">${steps[this.stage]}${this.stage===1?' · SEE EVIDENCE SCOPE BELOW':''}</span><p>${safe(copy)}</p></div><div class="field-question"><b>${safe(s.question)}</b><button class="btn" data-field="reveal" aria-expanded="${this.revealed}">${this.revealed?'Hide explanation':'Think it through →'}</button>${this.revealed?`<p role="status">${safe(s.answer)}</p>`:''}</div><details><summary>Evidence, date & limits</summary><p><b>Source context:</b> ${safe(c.period)}</p><p>${safe(c.type)}. This narrative uses the retained Atlas source; it was not freshly revalidated for this release. Response illustrations explain mechanisms, not verified installations. The Change stage states what this source does and does not establish.</p><a href="${safe(c.source)}" target="_blank" rel="noopener">Read the original source ↗</a></details><button class="btn primary" data-field="next">${this.stage<3?'Next: '+steps[this.stage+1]:'Explore the next story'} →</button></article></section>`;}
}
if(typeof customElements!=='undefined')customElements.define('environment-stories',EnvironmentStories);
