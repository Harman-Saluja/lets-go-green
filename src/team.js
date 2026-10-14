// Delegated interactions survive the app's existing render/navigation cycle.
let pinned=null;
const member=target=>target?.closest?.('.lgg-team__member');
function show(item,open){
 if(!item)return;
 item.classList.toggle('is-open',open);
 item.querySelector('[data-team-member]').setAttribute('aria-expanded',String(open));
}
function reveal(item){
 document.querySelectorAll('.lgg-team__member.is-open').forEach(x=>{if(x!==item)show(x,false);});
 if(pinned!==item)pinned=null;
 show(item,true);
}
document.addEventListener('pointerover',e=>{const item=member(e.target);if(item&&e.pointerType!=='touch')reveal(item);});
document.addEventListener('pointerout',e=>{const item=member(e.target);if(item&&!item.contains(e.relatedTarget)&&pinned!==item&&!item.contains(document.activeElement))show(item,false);});
document.addEventListener('focusin',e=>{const item=member(e.target);if(item)reveal(item);});
document.addEventListener('focusout',e=>{const item=member(e.target);if(item&&!item.contains(e.relatedTarget)){if(pinned===item)pinned=null;show(item,false);}});
document.addEventListener('click',e=>{
 const item=member(e.target);
 if(item){const close=pinned===item;reveal(item);pinned=close?null:item;show(item,!close);}
 else {document.querySelectorAll('.lgg-team__member.is-open').forEach(x=>show(x,false));pinned=null;}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.lgg-team__member.is-open').forEach(x=>show(x,false));pinned=null;}});
