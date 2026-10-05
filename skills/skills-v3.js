
(() => {
  if(document.body.classList.contains('skills-v3')) return;
  document.body.classList.add('skills-v3');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal=()=>{
    const els=[...document.querySelectorAll('.library-head,.community-safety-note,.skill-card,.custom-skill')];
    els.forEach((el,i)=>{el.classList.add('skills-v3-reveal');el.style.transitionDelay=Math.min((i%5)*45,180)+'ms'});
    if(reduced){els.forEach(el=>el.classList.add('is-visible'));return}
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -4% 0px'});
    els.forEach(el=>io.observe(el));
  };
  setTimeout(reveal,150);
  const grid=document.getElementById('skill-grid');
  if(grid && !reduced && matchMedia('(pointer:fine)').matches){
    grid.addEventListener('pointermove',e=>{
      const card=e.target.closest('.skill-card'); if(!card)return;
      const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.transform='perspective(1000px) rotateX('+(-y*3.5).toFixed(2)+'deg) rotateY('+(x*4.5).toFixed(2)+'deg) translateY(-7px)';
    });
    grid.addEventListener('pointerout',e=>{
      const card=e.target.closest('.skill-card'); if(card&&!card.contains(e.relatedTarget)) card.style.transform='';
    });
  }
})();
