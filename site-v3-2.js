(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(pointer:fine)').matches;

  // Insert four visual bridges at the major mood changes.
  const bridges=[
    ['.v3-capabilities','night-blue'],
    ['#ai-skills','paper-night'],
    ['#aanpak','night-gold'],
    ['#contact','paper-night2']
  ];
  for(const [selector,type] of bridges){
    const target=document.querySelector(selector);
    if(target && !target.previousElementSibling?.classList.contains('v32-bridge')){
      const b=document.createElement('div');
      b.className='v32-bridge';b.dataset.type=type;b.setAttribute('aria-hidden','true');
      b.innerHTML='<i class="v32-brush"></i>';
      target.before(b);
    }
  }

  // Pointer spotlight shared across cards.
  const cards=[...document.querySelectorAll('.case,.own-card,.skills-home-grid>article,.price-card,.v3-cap')];
  cards.forEach(card=>{
    card.classList.add('v32-interactive');
    if(!fine || reduced)return;
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      card.style.setProperty('--v32-x',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
      card.style.setProperty('--v32-y',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
    });
  });

  // Magnetic feel only on primary / compact controls.
  if(fine && !reduced){
    const magnets=[...document.querySelectorAll('.header-cta,.primary-link,.contact form button,.skills-home-link')];
    magnets.forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect();
        const x=(e.clientX-(r.left+r.width/2))*0.09;
        const y=(e.clientY-(r.top+r.height/2))*0.12;
        el.style.setProperty('--v32-mx',x.toFixed(1)+'px');
        el.style.setProperty('--v32-my',y.toFixed(1)+'px');
      });
      el.addEventListener('pointerleave',()=>{
        el.style.setProperty('--v32-mx','0px');el.style.setProperty('--v32-my','0px');
      });
    });
  }

  // Tiny drift on major headlines, capped so it never harms legibility.
  const driftEls=[...document.querySelectorAll('.editorial-heading h2,.v3-cap-head h2,.own-heading h2,.skills-home-head h2,.pricing-title h2,.contact-copy h2')];
  driftEls.forEach(x=>x.classList.add('v32-drift'));
  if(!reduced){
    let raf=0;
    const paint=()=>{
      raf=0;
      const vh=innerHeight;
      for(const el of driftEls){
        const r=el.getBoundingClientRect();
        const p=Math.max(-1,Math.min(1,(r.top+r.height/2-vh/2)/vh));
        el.style.setProperty('--v32-drift',(p*-12).toFixed(1)+'px');
      }
    };
    addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(paint)},{passive:true});paint();
  }

  // Desktop section nav.
  const sections=[
    ['#top','Top'],
    ['#werk','Werk'],
    ['.v3-capabilities','Capabilities'],
    ['#producten','Producten'],
    ['#ai-skills','AI Skills'],
    ['#aanpak','Aanpak'],
    ['#prijzen','Prijzen'],
    ['#contact','Contact']
  ].map(([sel,label])=>({el:document.querySelector(sel),label})).filter(x=>x.el);
  if(innerWidth>900 && sections.length){
    const nav=document.createElement('nav');nav.className='v32-section-nav';nav.setAttribute('aria-label','Paginanavigatie');
    sections.forEach((s,i)=>{
      const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',s.label);b.dataset.v32=i;
      b.addEventListener('click',()=>s.el.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'}));nav.appendChild(b)
    });
    document.body.appendChild(nav);
    const buttons=[...nav.querySelectorAll('button')];
    const update=()=>{
      let best=0,dist=Infinity;
      sections.forEach((s,i)=>{const d=Math.abs(s.el.getBoundingClientRect().top-innerHeight*.28);if(d<dist){dist=d;best=i}});
      buttons.forEach((b,i)=>b.classList.toggle('is-active',i===best));
    };
    update();addEventListener('scroll',update,{passive:true});
  }
})();