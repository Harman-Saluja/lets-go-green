// Source-backed records; no measurement or scoring inputs are introduced here.
export const molecules=[
 {cid:702,name:'Ethanol',formula:'C₂H₆O',aliases:['ethanol'],text:'An alcohol with a two-carbon chain.'},
 {cid:176,name:'Acetic acid',formula:'C₂H₄O₂',aliases:['acetic acid','ethanoic acid'],text:'A carboxylic acid; shown here as a neutral molecule.'},
 {cid:8857,name:'Ethyl acetate',formula:'C₄H₈O₂',aliases:['ethyl acetate','ethyl ethanoate'],text:'An ester; its connectivity distinguishes it from other molecules with this formula.'},
 {cid:962,name:'Water',formula:'H₂O',aliases:['water','stoichiometric water','steam (reactant water)'],text:'An isolated water molecule, not a model of liquid water or steam interactions.'},
 {cid:222,name:'Ammonia',formula:'NH₃',aliases:['ammonia'],text:'An isolated ammonia molecule; this is not the ammonium ion.'},
 {cid:887,name:'Methanol',formula:'CH₄O',aliases:['methanol'],text:'The simplest alcohol, containing one carbon atom.'},
 {cid:297,name:'Methane',formula:'CH₄',aliases:['methane'],text:'One carbon atom bonded to four hydrogen atoms.'},
 {cid:280,name:'Carbon dioxide',formula:'CO₂',aliases:['carbon dioxide'],text:'A molecule with carbon between two oxygen atoms.'}
];
export const resolveMolecule=name=>molecules.find(x=>x.aliases.includes(String(name).trim().toLowerCase()))||null;
export function structureFallback(name){if(/repeat unit/i.test(name))return 'An extended polymer: a repeat unit is not a complete isolated molecule. No verified chain structure is bundled.';if(/^iron$/i.test(name))return 'A metal with an extended structure, not an isolated molecule. No crystal model is bundled.';if(/sodium|calcium|iron\(III\) oxide/i.test(name))return 'This material has an ionic or extended solid structure. A single ball-and-stick molecule would be misleading.';return 'No identity-matched 3D record is bundled for this entry. A formula alone cannot identify isomers or stereochemistry.';}
export const atlasCategories=['Plastic Waste','Water Pollution','Air Pollution','Industrial and Hazardous Waste','Electronic Waste','Carbon / Greenhouse-Gas Emissions','Soil Contamination'];
export const atlasCases=[
 {id:'plastics-us',category:0,country:'United States of America',coordinates:[-97.482602,39.538479],location:'United States · plastic waste prevention',period:'EPA background page; accessed 10 Oct 2026',source:'https://www.epa.gov/plastics/about-plastic-products-and-plastic-pollution',type:'Educational case study',problem:'Discarded plastic can enter land and water environments.',cause:'Product use, disposal and waste-management gaps contribute to releases.',importance:'Persistent plastic waste can affect ecosystems.',connection:'Prevention and safer material design consider the whole product life cycle.',improvement:'Reduce unnecessary plastic use and design products for reuse and practical recovery.',principle:0},
 {id:'minamata',category:1,country:'Japan',coordinates:[138.44217,36.142538],location:'Minamata, Japan · historical mercury pollution',period:'Official historical account, 2002; accessed 10 Oct 2026',source:'https://www.env.go.jp/en/chemi/hs/minamata2002/summary.html',type:'Documented historical contamination',problem:'Industrial methylmercury contamination entered the local food chain.',cause:'Contaminated factory wastewater reached the surrounding waters.',importance:'Eating contaminated seafood caused serious harm to health.',connection:'Less hazardous synthesis and pollution prevention seek to avoid hazardous releases.',improvement:'Prevent mercury releases and evaluate safer processes; existing contamination still requires management.',principle:2},
 {id:'london-smog',category:2,country:'United Kingdom',coordinates:[-2.116346,54.402739],location:'London, UK · Great Smog of 1952',period:'December 1952; Met Office history accessed 10 Oct 2026',source:'https://weather.metoffice.gov.uk/learn-about/weather/case-studies/great-smog',type:'Documented historical air-pollution episode',problem:'Smoke and fog accumulated during a severe pollution episode.',cause:'Coal combustion, including domestic and industrial sources, combined with weather that trapped pollution.',importance:'The polluted air harmed people’s health.',connection:'Energy efficiency and safer processes can reduce combustion-related burdens.',improvement:'Reduce avoidable fuel use and assess cleaner energy sources alongside emission controls.',principle:5},
 {id:'love-canal',category:3,country:'United States of America',coordinates:[-97.482602,39.538479],location:'Love Canal, Niagara Falls, USA',period:'EPA retrospective, 6 Aug 2018; historical disposal and cleanup',source:'https://www.epa.gov/archive/epa/newsreleases/love-canal-revealed-national-problem-superfund-provided-solution.html',type:'Documented contamination and remediation case',problem:'Buried chemical waste contaminated groundwater and affected a nearby community.',cause:'Hazardous waste disposal created a long-lived contamination problem.',importance:'The case shows why disposal risks extend beyond the factory.',connection:'Waste prevention is preferable to managing hazardous residues after they form.',improvement:'Reduce hazardous waste at source; containment and monitoring remain important for existing sites.',principle:0},
 {id:'ghana-ewaste',category:4,country:'Ghana',coordinates:[-1.036941,7.717639],location:'Agbogbloshie, Ghana · documented e-waste practices',period:'WHO account, 29 Aug 2024; historical site example',source:'https://www.who.int/news-room/facts-in-pictures/detail/e-waste-and-child-health',type:'Documented educational case study',problem:'Unsafe e-waste processing can release harmful substances.',cause:'Open burning and poorly controlled recovery expose people and the environment.',importance:'Workers and nearby children can be exposed to toxic substances.',connection:'Safer product design and controlled material recovery can reduce risks.',improvement:'Use formal collection and safer recovery systems; avoid uncontrolled burning.',principle:3}
];
export const extraProcesses={
 'industrial-contact':{title:'Contact Process — Sulfuric Acid Production',source:'https://www.epa.gov/sites/default/files/2020-09/documents/final_background_document_for_sulfuric_acid_section_8.1_1.pdf',scope:'Sulfur-burning contact route, simplified: air drying precedes combustion. Library metrics describe only SO₂ oxidation, not the complete acid plant.',stages:[
 ['Gas cleaning and drying','Clean and dry the combustion air before sulfur burning.','Prepare the feed and protect downstream equipment.','Drying acid and residues need management.','Reduce contamination at source.','tower'],
 ['Sulfur dioxide production','Burn prepared sulfur in the dry air to form sulfur dioxide.','Supply the gas used in the conversion step.','Combustion gases require control.','Investigate heat recovery.','burner'],
 ['Catalytic oxidation','Convert SO₂ and oxygen into SO₃ over a suitable catalyst.','Make sulfur trioxide for acid production.','Unconverted SO₂ and heat must be managed.','Evaluate conversion and heat integration.','reactor'],
 ['Acid absorption','Absorb SO₃ into concentrated sulfuric acid, rather than directly into water.','Avoid treating direct water absorption as the standard industrial route.','Acid mist and corrosion need control.','Maintain effective absorption and mist capture.','tower'],
 ['Final acid preparation','Adjust the acid concentration in controlled equipment.','Prepare the required acid product.','Dilution releases heat.','Recover useful heat where feasible.','tank']]},
 'industrial-methanol':{title:'Methanol Synthesis — Syngas Route',source:'https://www.thyssenkrupp-uhde.com/en/products-and-technologies/methanol-and-synthetic-fuels/methanol-plants',scope:'Simplified syngas route. The library tracks CO + 2 H₂ ⇌ CH₃OH; real syngas may also contain CO₂ and other components.',stages:[
 ['Syngas preparation','Prepare gas containing carbon monoxide and hydrogen.','Supply the synthesis feed.','Feedstock and energy sources affect impacts.','Compare feedstock life cycles.','reactor'],
 ['Gas conditioning','Clean and condition the gas for synthesis.','Protect the synthesis catalyst.','Compression and cleanup use resources.','Reduce losses and energy demand.','compressor'],
 ['Catalytic synthesis','React the conditioned gas to form methanol.','Create the desired product.','Heat and unreacted gas need management.','Investigate heat recovery and appropriate gas recycling.','reactor'],
 ['Cooling and separation','Cool the outlet and separate crude methanol.','Recover liquid from the gas mixture.','Cooling adds energy demand.','Evaluate heat integration.','separator'],
 ['Purification','Use distillation to purify crude methanol.','Remove unwanted components.','Separation needs energy.','Investigate efficient distillation.','tower']]},
 'industrial-iron':{title:'Iron Oxide Reduction — Carbon Monoxide Route',source:'https://worldsteel.org/steel-topics/raw-materials/',scope:'Conceptual CO reduction zone, not a complete blast furnace or hydrogen-DRI plant. Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂ is an overall equation; intermediate oxides are omitted.',stages:[
 ['Prepare oxide feed','Prepare iron-oxide-bearing feed for reduction.','Provide the solid reactant.','Feed preparation uses energy and generates dust.','Control dust and material losses.','hopper'],
 ['Supply reducing gas','Bring a carbon-monoxide-containing gas to the reduction zone.','Carbon monoxide removes oxygen from the oxide.','CO is hazardous and gas production has impacts.','Assess gas sourcing and containment.','compressor'],
 ['Reduction zone','Iron oxide reacts with carbon monoxide, forming iron and carbon dioxide.','Remove oxygen from the ore.','Carbon dioxide is formed by this route.','Improve gas use; compare other routes only with a full assessment.','reactor'],
 ['Product and gas handling','Handle the iron-bearing product and outgoing gas safely.','Separate and manage the outputs.','Dust, residual CO and CO₂ require management.','Investigate appropriate heat and gas recovery.','separator']]}
};
for(const guide of Object.values(extraProcesses))guide.stages=guide.stages.map(([name,what,why,environment,opportunity,equipment])=>({name,what,why,environment,opportunity,equipment}));

// Shared popup support for validated 2.0 Cinema structures.
molecules.push(...[
 {
  "cid": 5988,
  "name": "Sucrose",
  "formula": "C12H22O11",
  "aliases": [
   "sucrose"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 5793,
  "name": "D-glucose representative conformer",
  "formula": "C6H12O6",
  "aliases": [
   "d-glucose representative conformer",
   "glucose",
   "glucose (target)"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 5984,
  "name": "D-fructose representative conformer",
  "formula": "C6H12O6",
  "aliases": [
   "d-fructose representative conformer",
   "fructose",
   "fructose (coproduct)"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 6036,
  "name": "D-galactose representative conformer",
  "formula": "C6H12O6",
  "aliases": [
   "d-galactose representative conformer",
   "galactose"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 6134,
  "name": "Lactose representative conformer",
  "formula": "C12H22O11",
  "aliases": [
   "lactose representative conformer",
   "lactose"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 311,
  "name": "Citric acid",
  "formula": "C6H8O7",
  "aliases": [
   "citric acid"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 612,
  "name": "Lactic acid",
  "formula": "C3H6O3",
  "aliases": [
   "lactic acid"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 7489,
  "name": "Terephthalic acid",
  "formula": "C8H6O4",
  "aliases": [
   "terephthalic acid"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 174,
  "name": "Ethylene glycol",
  "formula": "C2H6O2",
  "aliases": [
   "ethylene glycol",
   "ethylene glycol (coproduct)"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 947,
  "name": "Nitrogen",
  "formula": "N2",
  "aliases": [
   "nitrogen"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 1119,
  "name": "Sulfur dioxide",
  "formula": "O2S",
  "aliases": [
   "sulfur dioxide"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 977,
  "name": "Oxygen",
  "formula": "O2",
  "aliases": [
   "oxygen"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 24682,
  "name": "Sulfur trioxide",
  "formula": "O3S",
  "aliases": [
   "sulfur trioxide"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 },
 {
  "cid": 281,
  "name": "Carbon monoxide",
  "formula": "CO",
  "aliases": [
   "carbon monoxide"
  ],
  "text": "Source-backed isolated PubChem conformer. Sugar forms are representative, not a model of solution equilibria or a reaction mechanism."
 }
]);
