// Educational sorting routes. Colours do not certify current local collection rules.
export const sortingBins=[
 {id:'wet',name:'Wet organics',color:'#8ec98b',label:'GREEN · EDUCATIONAL BIN',route:'Suitable organic-waste processing',detail:'Keep suitable biodegradable residues separate. Composting or digestion needs appropriate feed, operation and output checks.',process:'compost'},
 {id:'dry',name:'Accepted dry materials',color:'#8dc9e2',label:'BLUE · EDUCATIONAL BIN',route:'Sorting & material recovery',detail:'Keep accepted dry materials free of food residues. Local acceptance and facilities determine the next step.',process:'paper'},
 {id:'special',name:'Separate specialist collection',color:'#c9c2ac',label:'NO UNIVERSAL THIRD COLOUR ASSUMED',route:'Separate authorised handling',detail:'Use the applicable authorised route. Batteries and chemicals are not necessarily compatible with each other; the visual station is not a shared storage container.',process:'electronics'}
];
export const sortingItems=[
 {id:'peel',name:'Fruit peel',icon:'banana',bin:'wet',why:'A separated peel can join suitable organics; mixing it into paper contaminates the dry stream.'},
 {id:'scraps',name:'Vegetable scraps',icon:'leaf',bin:'wet',why:'Suitable vegetable residues belong in the separated organic stream in this model.'},
 {id:'food',name:'Unavoidable food scraps',icon:'banana',bin:'wet',why:'Prevent avoidable food waste first. Suitable remaining scraps need an appropriate organic route.'},
 {id:'leaves',name:'Leaves',icon:'leaf',bin:'wet',why:'Suitable garden residues can enter an organic route. Actual garden-waste collection rules vary.'},
 {id:'paper',name:'Clean paper',icon:'box',bin:'dry',why:'Keep accepted paper dry and separate from food, oils and hazardous residues.'},
 {id:'cardboard',name:'Clean cardboard',icon:'box',bin:'dry',why:'Dry, accepted cardboard is suitable for material sorting; food-soaked packaging needs different assessment.'},
 {id:'plastic',name:'Accepted plastic bottle',icon:'bottle',bin:'dry',why:'This example is an accepted bottle, not a claim that every type of plastic can be recycled.'},
 {id:'metal',name:'Metal packaging',icon:'can',bin:'dry',why:'Accepted, non-hazardous metal packaging can join the suitable dry-material stream.'},
 {id:'battery',name:'Used battery',icon:'battery',bin:'special',why:'Use the appropriate battery collection service. Do not mix it into ordinary dry recycling or organics, open it, or burn it.'},
 {id:'chemical',name:'Household chemical waste',icon:'oil',bin:'special',why:'Keep identified waste separate and follow authorised collection guidance. Do not mix unknown chemicals, pour them into drains or improvise treatment.'}
];
export function classifySort(itemId,binId){const item=sortingItems.find(x=>x.id===itemId);return !!item&&item.bin===binId&&sortingBins.some(x=>x.id===binId);}

// Shuffle display order only; classification and scientific explanations are unchanged.
export function shuffledItems(random=Math.random){const items=[...sortingItems];for(let i=items.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}return items;}
