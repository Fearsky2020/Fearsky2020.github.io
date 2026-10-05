
(() => {
  const body=document.body;
  if(!body || body.classList.contains('v3-immersive')) return;
  body.classList.add('v3-immersive');

  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Background atmosphere
  const atmosphere=document.createElement('div');
  atmosphere.className='v3-atmosphere';
  atmosphere.setAttribute('aria-hidden','true');
  atmosphere.innerHTML='<i class="a1"></i><i class="a2"></i><i class="a3"></i>';
  body.prepend(atmosphere);
  const grain=document.createElement('div');
  grain.className='v3-grain'; grain.setAttribute('aria-hidden','true'); body.appendChild(grain);

  const hero=document.querySelector('.hero');
  if(hero){
    const main=hero.querySelector('.hero-main');
    const h1=hero.querySelector('h1');
    if(main && h1 && !main.querySelector('.v3-signals')){
      const signals=document.createElement('div');
      signals.className='v3-signals';
      signals.innerHTML=
        '<span class="v3-signal"><b data-v3-skill-count>213</b><small>AI Skills</small></span>'+
        '<span class="v3-signal"><b>NL · EN · 中文</b><small data-v3-copy="signalLanguages">Languages</small></span>'+
        '<span class="v3-signal"><b>1:1</b><small data-v3-copy="signalDirect">Direct contact</small></span>';
      h1.insertAdjacentElement('afterend',signals);
    }
    if(!hero.nextElementSibling?.classList.contains('v3-marquee')){
      const marquee=document.createElement('div');
      marquee.className='v3-marquee';marquee.setAttribute('aria-hidden','true');
      const text='DESIGN × AI × WEB × AUTOMATION × SEO × CONTENT × PRODUCT';
      marquee.innerHTML='<div class="v3-marquee-track"><span>'+text+'</span><span>'+text+'</span><span>'+text+'</span><span>'+text+'</span></div>';
      hero.insertAdjacentElement('afterend',marquee);
    }
  }

  // Static production count: 6 GOED Originals + 207 vetted community Skills.
  const total=213;
  document.querySelectorAll('[data-v3-skill-count]').forEach(el=>el.textContent=total);
  const sh=document.querySelector('.skills-home-head>div');
  if(sh && !sh.querySelector('.v3-skills-count')){
    const count=document.createElement('div');
    count.className='v3-skills-count';
    count.innerHTML='<b>'+total+'</b><span data-v3-copy="skillsCount">reusable AI skills in the library</span>';
    sh.appendChild(count); syncCopy();
  }

  // More confident hero copy, still plain-spoken.
  const copy={
    nl:{
      heroKicker:'Creative technology studio \u00b7 Den Haag',
      heroLine1:'Web. AI. Systemen.',
      heroLine2:'Met karakter.',
      heroIntro:'Van een sterke website tot herbruikbare AI Skills en automatisering. E\u00e9n studio, direct contact en techniek die gewoon goed moet werken.',
      heroCta:'Bekijk wat we bouwen',
      signalLanguages:'talen',signalDirect:'direct contact',skillsCount:'herbruikbare AI Skills in de bibliotheek',pageTitle:'GOED WEBWERK | Webdesign, AI Skills & digitale systemen',pageDescription:'GOED WEBWERK ontwerpt websites, AI Skills en digitale systemen voor ondernemers en organisaties. Direct, expressief en technisch solide — vanuit Den Haag.'
    },
    en:{
      heroKicker:'Creative technology studio \u00b7 The Hague',
      heroLine1:'Web. AI. Systems.',
      heroLine2:'Built with character.',
      heroIntro:'From a strong website to reusable AI Skills and automation. One studio, direct contact and technology that simply has to work.',
      heroCta:'See what we build',
      signalLanguages:'languages',signalDirect:'direct contact',skillsCount:'reusable AI Skills in the library',pageTitle:'GOED WEBWERK | Web design, AI Skills & digital systems',pageDescription:'GOED WEBWERK designs websites, AI Skills and digital systems for businesses and organizations — direct, expressive and technically solid.'
    },
    zh:{
      heroKicker:'\u521b\u610f\u79d1\u6280\u5de5\u4f5c\u5ba4 \u00b7 \u6d77\u7259',
      heroLine1:'\u7f51\u7ad9\u3001AI\u3001\u81ea\u52a8\u5316\u3002',
      heroLine2:'\u597d\u770b\uff0c\u4e5f\u8981\u771f\u597d\u7528\u3002',
      heroIntro:'\u7f51\u7ad9\u3001AI Skills\u3001\u81ea\u52a8\u5316\u90fd\u53ef\u4ee5\u505a\u3002\u6211\u4eec\u5148\u770b\u4e1a\u52a1\u771f\u6b63\u9700\u8981\u4ec0\u4e48\uff0c\u518d\u51b3\u5b9a\u600e\u4e48\u505a\u3002',
      heroCta:'看看我们做的东西',
      signalLanguages:'语言',signalDirect:'直接沟通',skillsCount:'个可复用 AI Skills',pageTitle:'GOED WEBWERK | 网站设计、AI Skills 与数字系统',pageDescription:'GOED WEBWERK 为企业和组织设计网站、AI Skills 与数字系统：鲜明、直接，而且技术底子扎实。'
    }
  };
  function currentLang(){
    const v=localStorage.getItem('goed-webwerk-language')||document.documentElement.lang||'nl';
    return String(v).startsWith('zh')?'zh':String(v).startsWith('en')?'en':'nl';
  }
  function syncCopy(){
    const c=copy[currentLang()];
    const map={
      heroKicker:document.querySelector('[data-i18n="heroKicker"]'),
      heroLine1:document.querySelector('[data-i18n="heroLine1"]'),
      heroLine2:document.querySelector('[data-i18n="heroLine2"]'),
      heroIntro:document.querySelector('[data-i18n="heroIntro"]'),
      heroCta:document.querySelector('[data-i18n="heroCta"]')
    };
    Object.entries(map).forEach(([k,el])=>{if(el)el.textContent=c[k]});
    document.querySelectorAll('[data-v3-copy]').forEach(el=>{const v=c[el.dataset.v3Copy];if(v)el.textContent=v});document.title=c.pageTitle;const md=document.querySelector('meta[name="description"]');if(md)md.content=c.pageDescription;
  }
  syncCopy();
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setTimeout(syncCopy,20)));

  // Scroll reveals
  const revealTargets=[
    ...document.querySelectorAll('.editorial-heading,.case,.service-index-links>a,.own-heading,.own-card,.skills-home-head,.skills-home-grid>article,.process-intro,.process li,.about-copy,.about-detail,.focus-promise,.pricing-title,.price-card,.faq header,.faq details,.contact>*')
  ];
  revealTargets.forEach((el,i)=>{
    el.classList.add('v3-reveal');
    el.style.transitionDelay=Math.min((i%4)*70,210)+'ms';
  });
  if(reduced){
    revealTargets.forEach(el=>el.classList.add('is-visible'));
  } else {
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}});
    },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
    revealTargets.forEach(el=>io.observe(el));
  }

  // Card tilt: small enough to feel tactile, not gimmicky.
  const tiltTargets=document.querySelectorAll('.case,.own-card,.skills-home-grid>article,.price-card');
  tiltTargets.forEach(card=>{
    card.classList.add('v3-tilt');
    if(reduced) return;
    card.addEventListener('pointermove',e=>{
      if(e.pointerType==='touch') return;
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.setProperty('--v3-ry',(x*5.5).toFixed(2)+'deg');
      card.style.setProperty('--v3-rx',(-y*4.5).toFixed(2)+'deg');
    });
    card.addEventListener('pointerleave',()=>{
      card.style.setProperty('--v3-ry','0deg');
      card.style.setProperty('--v3-rx','0deg');
    });
  });

  // Gentle parallax atmosphere; mobile and reduced motion stay static.
  if(!reduced && matchMedia('(pointer:fine)').matches){
    let tx=0,ty=0,raf=0;
    const paint=()=>{
      raf=0;
      const a1=document.querySelector('.v3-atmosphere .a1');
      const a2=document.querySelector('.v3-atmosphere .a2');
      const a3=document.querySelector('.v3-atmosphere .a3');
      if(a1)a1.style.transform='translate3d('+(tx*-18)+'px,'+(ty*-12)+'px,0)';
      if(a2)a2.style.transform='translate3d('+(tx*24)+'px,'+(ty*16)+'px,0)';
      if(a3)a3.style.transform='translate3d('+(tx*-10)+'px,'+(ty*22)+'px,0) rotate('+(tx*2)+'deg)';
    };
    window.addEventListener('pointermove',e=>{
      tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5;
      if(!raf)raf=requestAnimationFrame(paint);
    },{passive:true});
  }

  // Header reacts to scroll without layout shift.
  let lastY=0;
  const header=document.querySelector('.site-header');
  if(header && !reduced){
    window.addEventListener('scroll',()=>{
      const y=scrollY;
      header.style.setProperty('--v3-header-alpha',Math.min(.88,.64+y/1800));
      if(y>120 && y>lastY+6) header.style.transform='translate(-50%,-6px)';
      else header.style.transform='translate(-50%,0)';
      lastY=y;
    },{passive:true});
  }
})();
