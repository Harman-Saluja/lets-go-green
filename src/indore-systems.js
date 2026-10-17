// Layer controls reveal educational systems, not invented geographic inventories.
export const indoreSystems=[
 {id:'water',label:'Rivers & water',title:'Khan River · district-level story',tab:'city',note:'One dated Khan River account at district level. No exact channel, confluence or monitoring-point geometry is supplied.'},
 {id:'collection',label:'Waste collection',title:'Explore separate collection',tab:'sorting',note:'Learning layer: try a separated collection model. No municipal collection routes or vehicle specifications are claimed.'},
 {id:'segregation',label:'Source segregation',title:'Visit the sorting studio',tab:'sorting',note:'Learning layer: three interactive collection choices. The activity marker represents this exhibit, not a physical collection point.'},
 {id:'recovery',label:'Recycling & recovery',title:'Follow material recovery',tab:'processes',note:'Learning layer: ten general recovery processes. Local acceptance and facility availability need separate verification.'},
 {id:'facilities',label:'Processing systems',title:'Explore how processing works',tab:'processes',note:'Learning layer: process mechanisms only. Verified facility coordinates are not currently available, so no facility pins are shown.'},
 {id:'restoration',label:'Environmental restoration',title:'Explore a possible future',tab:'future',note:'Learning layer: explore qualitative prevention and restoration choices. These are not measured Indore improvements.'},
 {id:'community',label:'Community participation',title:'Make the next choice count',tab:'sorting',note:'Learning layer: practice suitable separation and contamination prevention. No participation rate or citywide outcome is implied.'}
];

// Mechanism previews are deliberately separate from the geographic map.
export const systemPreviews={
 water:[['wash','Collect'],['wash','Treat'],['garden','Verify']],
 collection:[['sort','Separate'],['truck','Collect'],['product','Route']],
 segregation:[['compost','Wet'],['sort','Dry'],['product','Specialist']],
 recovery:[['sort','Sort'],['press','Recover'],['product','Check output']],
 facilities:[['sort','Suitable feed'],['digester','Process controls'],['product','Check output']],
 restoration:[['sort','Prevent'],['wash','Treat'],['garden','Monitor']],
 community:[['product','Clear guidance'],['sort','Participate'],['garden','Review']]
};
