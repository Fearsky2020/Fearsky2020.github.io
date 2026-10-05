(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang=()=>{const v=localStorage.getItem('goed-webwerk-language')||document.documentElement.lang||'nl';return String(v).startsWith('zh')?'zh':String(v).startsWith('en')?'en':'nl'};
  const copy={
    nl:{
      workTitle:'Werk dat niet verdwijnt in de ruis.',
      workIntro:'Geen stijloefeningen. Dit zijn echte websites, producten en systemen die dagelijks worden gebruikt.',
      capK:'Wat we kunnen',capT:'Van pixels tot processen.',capI:'We combineren ontwerp, techniek en AI. Niet als losse diensten, maar als één systeem dat je bedrijf duidelijker, sneller en sterker maakt.',
      c1:'Webdesign',d1:'Websites met een duidelijke taak, sterke hiërarchie en een eigen gezicht.',
      c2:'AI Skills',d2:'Herbruikbare AI-werkwijzen die kennis en kwaliteit vastleggen.',
      c3:'Automation',d3:'Terugkerend werk minder handmatig maken, zonder de menselijke controle kwijt te raken.',
      c4:'SEO',d4:'Techniek, structuur en content zo bouwen dat mensen én zoekmachines snappen wat je doet.',
      c5:'Content',d5:'Tekst en informatie die snel duidelijk maken waarom iemand voor jou moet kiezen.',
      c6:'Product',d6:'Apps, tools en digitale systemen die verder gaan dan een gewone website.',
      priceTitle:'Duidelijk geprijsd. Serieus uitgevoerd.',priceIntro:'Van een scherpe one-pager tot maatwerk met beheer en automatisering. Eerst duidelijkheid, dan bouwen.',
      contactTitle:'Laten we iets maken dat mensen onthouden.',
      contactIntro:'Vertel wat je wilt bereiken. We denken mee over website, AI, automatisering of een combinatie daarvan — zonder verkooppraatje.'
    },
    en:{
      workTitle:'Work that does not disappear into the noise.',
      workIntro:'Not style exercises. These are real websites, products and systems used every day.',
      capK:'What we do',capT:'From pixels to processes.',capI:'We combine design, technology and AI. Not as separate services, but as one system that makes your business clearer, faster and stronger.',
      c1:'Web design',d1:'Websites with a clear job, strong hierarchy and a distinct point of view.',
      c2:'AI Skills',d2:'Reusable AI workflows that preserve knowledge and quality.',
      c3:'Automation',d3:'Make recurring work less manual without giving up human control.',
      c4:'SEO',d4:'Build technology, structure and content so people and search engines understand what you do.',
      c5:'Content',d5:'Copy and information that make the reason to choose you clear quickly.',
      c6:'Product',d6:'Apps, tools and digital systems that go beyond a normal website.',
      priceTitle:'Clear pricing. Serious execution.',priceIntro:'From a sharp one-page site to custom management and automation. Clarity first, then we build.',
      contactTitle:'Let’s make something people remember.',
      contactIntro:'Tell us what you want to achieve. We can think through web, AI, automation or a combination — without sales theatre.'
    },
    zh:{
      workTitle:'真正上线，真正有人在用。',
      workIntro:'不是概念稿，也不是练习作品。下面这些网站和系统，已经在服务真实的客户、会员和访客。',
      capK:'还能做什么',capT:'不只是网站。',capI:'需要 SEO、内容、AI Skills、自动化或数字产品，也可以在同一个项目里一起做。',
      c1:'网站设计',d1:'先把客户最想看的信息排清楚，再把页面做得好看、好用。',
      c2:'AI Skills',d2:'把重复做的事情整理成稳定、可复用的 AI 工作方法。',
      c3:'自动化',d3:'能自动完成的重复工作交给系统，关键判断仍然留给人。',
      c4:'SEO',d4:'把页面结构、内容和技术基础做好，让客户更容易搜到你。',
      c5:'内容',d5:'把你真正做什么、有什么不同，清楚地讲给客户听。',
      c6:'数字产品',d6:'需要的不只是网站时，我们也可以做工具、App 和业务系统。',
      priceTitle:'价格和范围，先说清楚。',
      priceIntro:'单页网站、企业网站和定制项目都有明确起价；开始前先确认范围和费用。',
      contactTitle:'有项目想做？聊聊看。',
      contactIntro:'网站、AI、自动化都可以。先说你想解决什么，我们会直接告诉你适不适合、怎么做。'
    }
  };

  const service=document.querySelector('.service-index');
  if(service && !document.querySelector('.v3-capabilities')){
    const section=document.createElement('section');
    section.className='v3-capabilities';
    section.innerHTML='<header class="v3-cap-head"><div><p class="kicker"><span></span><b data-v31="capK"></b></p><h2 data-v31="capT"></h2></div><p data-v31="capI"></p></header>'+
      '<div class="v3-cap-grid">'+
      '<article class="v3-cap"><small>01 · WEB</small><span class="v3-cap-arrow">↗</span><div><h3 data-v31="c1"></h3><p data-v31="d1"></p></div></article>'+
      '<article class="v3-cap"><small>02 · AI</small><span class="v3-cap-arrow">↗</span><div><h3 data-v31="c2"></h3><p data-v31="d2"></p></div></article>'+
      '<article class="v3-cap"><small>03 · SYSTEMS</small><span class="v3-cap-arrow">↗</span><div><h3 data-v31="c3"></h3><p data-v31="d3"></p></div></article>'+
      '<article class="v3-cap"><small>04 · SEARCH</small><span class="v3-cap-arrow">↗</span><div><h3 data-v31="c4"></h3><p data-v31="d4"></p></div></article>'+
      '<article class="v3-cap"><small>05 · STORY</small><span class="v3-cap-arrow">↗</span><div><h3 data-v31="c5"></h3><p data-v31="d5"></p></div></article>'+
      '<article class="v3-cap"><small>06 · PRODUCT</small><span class="v3-cap-arrow">↗</span><div><h3 data-v31="c6"></h3><p data-v31="d6"></p></div></article>'+
      '</div>';
    service.insertAdjacentElement('afterend',section);
  }

  if(!document.querySelector('.v3-scroll-progress')){
    const p=document.createElement('div');p.className='v3-scroll-progress';p.setAttribute('aria-hidden','true');p.innerHTML='<i></i>';document.body.appendChild(p);
    const bar=p.firstElementChild;
    const paint=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(max>0?Math.min(1,scrollY/max):0)+')'};
    paint();addEventListener('scroll',paint,{passive:true});addEventListener('resize',paint,{passive:true});
  }

  function sync(){
    const c=copy[lang()];
    document.querySelectorAll('[data-v31]').forEach(el=>{const v=c[el.dataset.v31];if(v)el.textContent=v});
    const w=document.querySelector('[data-i18n="workTitle"]'),wi=document.querySelector('[data-i18n="workIntro"]');
    const pt=document.querySelector('[data-i18n="priceTitle"]'),pi=document.querySelector('[data-i18n="priceIntro"]');
    const ct=document.querySelector('[data-i18n="contactTitle"]'),ci=document.querySelector('[data-i18n="contactIntro"]');
    if(w)w.textContent=c.workTitle;if(wi)wi.textContent=c.workIntro;if(pt)pt.textContent=c.priceTitle;if(pi)pi.textContent=c.priceIntro;if(ct)ct.textContent=c.contactTitle;if(ci)ci.textContent=c.contactIntro;
  }
  sync();
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(sync,35)));

  const caps=[...document.querySelectorAll('.v3-cap')];
  if(reduced){caps.forEach(x=>x.classList.add('is-visible'))}
  else{
    caps.forEach((x,i)=>{x.classList.add('v3-reveal');x.style.transitionDelay=(i%3)*65+'ms'});
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});
    caps.forEach(x=>io.observe(x));
  }

  if(!reduced && matchMedia('(pointer:fine)').matches){
    caps.forEach(card=>{
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(900px) rotateX('+(-y*3).toFixed(2)+'deg) rotateY('+(x*4).toFixed(2)+'deg) translateY(-7px)'});
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
  }

  try{
    const ld=document.querySelector('script[type="application/ld+json"]');
    if(ld){const data=JSON.parse(ld.textContent);for(const n of data['@graph']||[]){if(n['@type']==='WebPage')n.name='GOED WEBWERK | Webdesign, AI Skills & digitale systemen';if(Array.isArray(n['@type'])&&n['@type'].includes('Organization'))n.description='GOED WEBWERK is een creative technology studio in Den Haag voor webdesign, AI Skills, automatisering en digitale systemen.'}ld.textContent=JSON.stringify(data)}
  }catch(e){}
})();