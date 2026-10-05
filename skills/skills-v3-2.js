(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(pointer:fine)').matches;

  const library=document.querySelector('.library'),custom=document.querySelector('.custom-skill');
  if(library && !library.previousElementSibling?.classList.contains('skills-v32-bridge')){
    const b=document.createElement('div');b.className='skills-v32-bridge hero-library';b.setAttribute('aria-hidden','true');library.before(b)
  }
  if(custom && !custom.previousElementSibling?.classList.contains('skills-v32-bridge')){
    const b=document.createElement('div');b.className='skills-v32-bridge library-custom';b.setAttribute('aria-hidden','true');custom.before(b)
  }

  if(!document.querySelector('.skills-v32-progress')){
    const p=document.createElement('div');p.className='skills-v32-progress';p.setAttribute('aria-hidden','true');p.innerHTML='<i></i>';document.body.appendChild(p);
    const bar=p.firstElementChild,paint=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(max>0?Math.min(1,scrollY/max):0)+')'};
    paint();addEventListener('scroll',paint,{passive:true});addEventListener('resize',paint,{passive:true});
  }

  if(fine && !reduced){
    const grid=document.getElementById('skill-grid');
    grid?.addEventListener('pointermove',e=>{
      const card=e.target.closest('.skill-card');if(!card)return;
      const r=card.getBoundingClientRect();
      card.style.setProperty('--sv32-x',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
      card.style.setProperty('--sv32-y',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
    });
    document.addEventListener('pointermove',e=>{
      const el=e.target.closest('.btn,.copy-btn');if(!el)return;
      const r=el.getBoundingClientRect(),x=(e.clientX-(r.left+r.width/2))*.08,y=(e.clientY-(r.top+r.height/2))*.11;
      el.style.setProperty('--sv32-mx',x.toFixed(1)+'px');el.style.setProperty('--sv32-my',y.toFixed(1)+'px');
    });
    document.addEventListener('pointerout',e=>{
      const el=e.target.closest('.btn,.copy-btn');
      if(el&&!el.contains(e.relatedTarget)){el.style.setProperty('--sv32-mx','0px');el.style.setProperty('--sv32-my','0px')}
    });
  }

  const drifts=[...document.querySelectorAll('.library h2,.custom-skill h2')];drifts.forEach(x=>x.classList.add('skills-v32-drift'));
  if(!reduced){
    let raf=0;const paint=()=>{raf=0;for(const el of drifts){const r=el.getBoundingClientRect(),p=Math.max(-1,Math.min(1,(r.top+r.height/2-innerHeight/2)/innerHeight));el.style.setProperty('--sv32-drift',(p*-10).toFixed(1)+'px')}};
    addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(paint)},{passive:true});paint()
  }
})();