(() => {
  const LANGS=['nl','en','zh'];
  const getLang=()=>{const v=localStorage.getItem('goed-webwerk-language')||'nl';return LANGS.includes(v)?v:'nl'};

  const I18N={
    nl:{
      navCategories:'Categorieën',navLibrary:'Bibliotheek',findSkill:'Vind een Skill',categoryCount:'categorieën',originalCount:'GOED Originals',
      startHere:'Begin hier',whatDoYouWant:'Wat wil je met AI doen?',exploreIntro:'Kies eerst een richting. Daarna kun je verfijnen op categorie, bron of zoekterm.',
      originalsTitle:'Onze eigen, geteste workflows.',originalsIntro:'Kleinere selectie, direct inzetbaar. Dit zijn Skills die we zelf gebruiken en verder blijven aanscherpen.',
      allSkills:'Alle Skills',libraryTitle:'Zoek gericht. Niet eindeloos scrollen.',libraryIntro:'Filter op wat je wilt bereiken. We tonen standaard een overzichtelijke selectie en laden meer als jij dat wilt.',
      source:'Bron',category:'Categorie',all:'Alles',clearFilters:'Wis filters',sort:'Sorteren',recommended:'Aanbevolen',az:'A–Z',categorySort:'Categorie',
      openSource:'Open source, transparant.',safetyText:'Community Skills tonen altijd bron en licentie. Bekijk de inhoud vóór installatie; scripts worden niet automatisch uitgevoerd.',
      noResults:'Geen Skills gevonden.',noResultsHint:'Probeer een andere zoekterm of wis je filters.',loadMore:'Meer laden',results:'resultaten',shown:'getoond',
      license:'Licentie',package:'Pakket',download:'Download Skill.zip',view:'Bekijk Skill →',community:'Community',search:'Zoek op taak, naam of categorie…',
      groups:{
        design:['Design & UX','Interfaces, toegankelijkheid, branding en visuele systemen.','✦'],
        growth:['Marketing & groei','Campagnes, social, conversie, lanceringen en acquisitie.','↗'],
        seo:['SEO & vindbaarheid','Technische SEO, content, local SEO, schema en zoekstrategie.','⌕'],
        writing:['Schrijven & content','Copy, redactie, contentproductie en technische documentatie.','Aa'],
        research:['Research & strategie','Onderzoek, marktinzicht, productdenken en besluitvorming.','◎'],
        productivity:['Productiviteit & operations','Meetings, planning, e-mail, projectwerk en interne processen.','✓'],
        developer:['Developer & build','Frontend, QA, performance, integraties en technische workflows.','</>'],
        learning:['Leren & onderwijs','Lesmateriaal, assessment en leerworkflows.','◈']
      }
    },
    en:{
      navCategories:'Categories',navLibrary:'Library',findSkill:'Find a Skill',categoryCount:'categories',originalCount:'GOED Originals',
      startHere:'Start here',whatDoYouWant:'What do you want AI to do?',exploreIntro:'Choose a direction first. Then refine by category, source or search.',
      originalsTitle:'Our own tested workflows.',originalsIntro:'A smaller, ready-to-use selection. These are Skills we use ourselves and keep improving.',
      allSkills:'All Skills',libraryTitle:'Search with intent. Don’t scroll forever.',libraryIntro:'Filter by what you want to achieve. We show a manageable selection first and load more when you ask.',
      source:'Source',category:'Category',all:'All',clearFilters:'Clear filters',sort:'Sort',recommended:'Recommended',az:'A–Z',categorySort:'Category',
      openSource:'Open source, transparent.',safetyText:'Community Skills always show source and license. Review content before installing; scripts are never executed automatically.',
      noResults:'No Skills found.',noResultsHint:'Try another search or clear your filters.',loadMore:'Load more',results:'results',shown:'shown',
      license:'License',package:'Package',download:'Download Skill.zip',view:'View Skill →',community:'Community',search:'Search by task, name or category…',
      groups:{
        design:['Design & UX','Interfaces, accessibility, branding and visual systems.','✦'],
        growth:['Marketing & growth','Campaigns, social, conversion, launches and acquisition.','↗'],
        seo:['SEO & discovery','Technical SEO, content, local SEO, schema and search strategy.','⌕'],
        writing:['Writing & content','Copy, editing, content production and technical documentation.','Aa'],
        research:['Research & strategy','Research, market insight, product thinking and decisions.','◎'],
        productivity:['Productivity & ops','Meetings, planning, email, project work and internal processes.','✓'],
        developer:['Developer & build','Frontend, QA, performance, integrations and technical workflows.','</>'],
        learning:['Learning & education','Teaching material, assessments and learning workflows.','◈']
      }
    },
    zh:{
      navCategories:'分类',navLibrary:'技能库',findSkill:'找一个 Skill',categoryCount:'个分类',originalCount:'GOED 原创',
      startHere:'从这里开始',whatDoYouWant:'你想让 AI 帮你做什么？',exploreIntro:'先选一个方向，再按分类、来源或关键词继续缩小范围。',
      originalsTitle:'我们自己真正使用的工作流。',originalsIntro:'数量不多，但可以直接拿来用。这些是我们自己反复使用并继续打磨的 Skills。',
      allSkills:'全部 Skills',libraryTitle:'按用途找到合适的 Skill。',libraryIntro:'按任务、分类和来源筛选。默认先展示推荐结果，需要时再继续加载。',
      source:'来源',category:'分类',all:'全部',clearFilters:'清除筛选',sort:'排序',recommended:'推荐',az:'A–Z',categorySort:'按分类',
      openSource:'开源，而且说清来源。',safetyText:'社区 Skills 始终显示原始来源和许可证。安装前请查看内容；附带脚本不会自动执行。',
      noResults:'没有找到 Skills。',noResultsHint:'换个关键词，或者清除筛选条件。',loadMore:'加载更多',results:'个结果',shown:'已显示',
      license:'许可证',package:'技能包',download:'下载 Skill.zip',view:'查看 Skill →',community:'社区',search:'按任务、名称或分类搜索…',
      groups:{
        design:['设计与 UX','界面、无障碍、品牌和视觉系统。','✦'],
        growth:['营销与增长','广告、社交媒体、转化、发布和获客。','↗'],
        seo:['SEO 与搜索','技术 SEO、内容、本地搜索、Schema 和搜索策略。','⌕'],
        writing:['写作与内容','文案、编辑、内容生产和技术文档。','Aa'],
        research:['研究与策略','市场研究、产品思考、洞察和决策支持。','◎'],
        productivity:['效率与运营','会议、计划、邮件、项目和内部流程。','✓'],
        developer:['开发与构建','前端、QA、性能、集成和技术工作流。','</>'],
        learning:['学习与教育','课程、测验和学习工作流。','◈']
      }
    }
  };

  const CAT_LABELS={
    nl:{design:'Design',creative:'Creatief',marketing:'Marketing',seo:'SEO',writing:'Schrijven',research:'Onderzoek',business:'Business',productivity:'Productiviteit',developer:'Developer',education:'Onderwijs'},
    en:{design:'Design',creative:'Creative',marketing:'Marketing',seo:'SEO',writing:'Writing',research:'Research',business:'Business',productivity:'Productivity',developer:'Developer',education:'Education'},
    zh:{design:'设计',creative:'创意',marketing:'营销',seo:'SEO',writing:'写作',research:'研究',business:'商业',productivity:'效率',developer:'开发',education:'教育'}
  };

  const GROUPS={
    design:['design','creative'],
    growth:['marketing'],
    seo:['seo'],
    writing:['writing'],
    research:['research','business'],
    productivity:['productivity'],
    developer:['developer'],
    learning:['education']
  };
  const GROUP_COLORS={
    design:['#2c6dff','rgba(44,109,255,.2)'],growth:['#ef4f9a','rgba(239,79,154,.2)'],seo:['#ffc93d','rgba(255,201,61,.25)'],
    writing:['#ff6d36','rgba(255,109,54,.2)'],research:['#35d6d0','rgba(53,214,208,.2)'],productivity:['#8ecf4d','rgba(142,207,77,.2)'],
    developer:['#7f68ff','rgba(127,104,255,.2)'],learning:['#d7a82f','rgba(215,168,47,.2)']
  };
  const PRIORITY=['design','seo','marketing','writing','research','productivity','business','developer','creative','education'];

  const state={origin:'all',categories:[],query:'',sort:'recommended',limit:24};
  let catalog=[];
  const grid=document.getElementById('skill-grid');
  const categoryGrid=document.getElementById('category-grid');
  const detailList=document.getElementById('detail-category-list');
  const resultCount=document.getElementById('v4-result-count');
  const loadMore=document.getElementById('load-more');
  const empty=document.getElementById('v4-empty');
  const search=document.getElementById('v4-search');
  const sort=document.getElementById('v4-sort');
  const sourceFilter=document.getElementById('source-filter');
  const clearBtn=document.getElementById('clear-filters');
  const originalGrid=document.getElementById('original-grid');

  const modal=document.getElementById('skill-dialog');
  const titleEl=document.getElementById('modal-title');
  const descEl=document.getElementById('modal-desc');
  const inputEl=document.getElementById('modal-input');
  const outputEl=document.getElementById('modal-output');
  const promptEl=document.getElementById('modal-prompt');
  const communityMeta=document.getElementById('community-meta');
  const sourceLink=document.getElementById('source-link');
  const licenseValue=document.getElementById('license-value');
  const downloadLink=document.getElementById('download-link');

  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const pretty=v=>String(v||'').split('-').map(x=>x?x[0].toUpperCase()+x.slice(1):x).join(' ');
  const shortDesc=v=>{
    let s=String(v||'').replace(/\s+/g,' ').trim();
    const cuts=[' Use this skill',' Triggers on',' Also triggers',' When the user',' Invoke with'];
    for(const c of cuts){const i=s.indexOf(c);if(i>45)s=s.slice(0,i)}
    if(s.length>175)s=s.slice(0,172).replace(/\s+\S*$/,'')+'…';
    return s||'Reusable open-source Agent Skill.';
  };
  const repoName=url=>String(url||'').replace('https://github.com/','').replace(/\/$/,'');

  function allCards(){return [...grid.querySelectorAll('.skill-card')]}
  function originalCards(){return allCards().filter(c=>c.dataset.origin==='goed')}

  function prepareOriginals(){
    originalCards().forEach(card=>{
      card.dataset.search=[card.querySelector('h3')?.textContent,card.querySelector('p')?.textContent,card.dataset.category,'GOED Original'].join(' ').toLowerCase();
      card.dataset.name=(card.querySelector('h3')?.textContent||'').toLowerCase();
    });
  }

  function renderCommunity(){
    const frag=document.createDocumentFragment();
    for(const item of catalog){
      const card=document.createElement('article');
      const category=String(item.category||'Business').toLowerCase();
      card.className='skill-card community-card';
      card.dataset.origin='community';
      card.dataset.communityId=item.id;
      card.dataset.category=category;
      card.dataset.name=String(item.name||'').toLowerCase();
      card.dataset.search=[item.name,item.description,item.category,item.source,item.license,repoName(item.repo)].join(' ').toLowerCase();
      card.innerHTML=
        '<div class="skill-meta"><span>'+esc(item.category||'Community')+'</span><span class="v4-card-source">'+esc(item.license||'Open source')+'</span></div>'+
        '<h3>'+esc(pretty(item.name))+'</h3>'+
        '<p>'+esc(shortDesc(item.description))+'</p>'+
        '<div class="skill-tags"><span>'+esc(repoName(item.repo))+'</span>'+(item.bundledResources?'<span>+ resources</span>':'')+'</div>'+
        '<button class="open-skill" type="button" data-community-open>'+esc(I18N[getLang()].view)+'</button>';
      frag.appendChild(card);
    }
    grid.appendChild(frag);
  }

  function countsByCategory(){
    const counts={};
    for(const c of allCards())counts[c.dataset.category]=(counts[c.dataset.category]||0)+1;
    return counts;
  }

  function renderCategories(){
    const l=getLang(),t=I18N[l],counts=countsByCategory();
    categoryGrid.innerHTML='';
    for(const [key,cats] of Object.entries(GROUPS)){
      const count=cats.reduce((n,c)=>n+(counts[c]||0),0);
      const [title,desc,icon]=t.groups[key];
      const [color,soft]=GROUP_COLORS[key];
      const b=document.createElement('button');
      b.type='button';b.className='v4-category-card';b.dataset.group=key;
      b.style.setProperty('--cat-color',color);b.style.setProperty('--cat-soft',soft);
      b.innerHTML='<div class="v4-category-top"><span class="v4-category-icon">'+esc(icon)+'</span><span class="v4-category-count">'+count+' Skills</span></div><div><h3>'+esc(title)+'</h3><p>'+esc(desc)+'</p></div>';
      b.addEventListener('click',()=>{state.categories=[...cats];state.origin='all';state.query='';state.limit=24;search.value='';syncControls();apply();document.getElementById('library').scrollIntoView({behavior:'smooth',block:'start'})});
      categoryGrid.appendChild(b);
    }

    detailList.innerHTML='';
    for(const cat of PRIORITY){
      if(!(counts[cat]>0))continue;
      const b=document.createElement('button');b.type='button';b.dataset.detailCategory=cat;
      b.innerHTML='<span>'+esc(CAT_LABELS[l][cat]||pretty(cat))+'</span><em>'+counts[cat]+'</em>';
      b.addEventListener('click',()=>{state.categories=state.categories.length===1&&state.categories[0]===cat?[]:[cat];state.limit=24;syncControls();apply()});
      detailList.appendChild(b);
    }
  }

  function renderOriginalShelf(){
    originalGrid.innerHTML='';
    for(const card of originalCards()){
      const id=card.dataset.skill,cat=card.dataset.category;
      const title=card.querySelector('[data-title]')?.textContent||card.querySelector('h3')?.textContent||'Skill';
      const desc=card.querySelector('[data-desc]')?.textContent||card.querySelector('p')?.textContent||'';
      const b=document.createElement('button');b.type='button';b.className='v4-original-card';b.dataset.originalId=id;
      b.innerHTML='<small>'+esc(CAT_LABELS[getLang()][cat]||cat)+' · GOED</small><h3>'+esc(title)+'</h3><p>'+esc(desc)+'</p><span>'+esc(I18N[getLang()].view)+'</span>';
      b.addEventListener('click',()=>card.querySelector('[data-open-skill]')?.click());
      originalGrid.appendChild(b);
    }
  }

  function score(card){
    let s=0;if(card.dataset.origin==='goed')s-=100;
    const i=PRIORITY.indexOf(card.dataset.category);s+=(i<0?99:i)*10;
    return s;
  }

  function syncControls(){
    sourceFilter.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.originFilter===state.origin));
    detailList.querySelectorAll('button').forEach(b=>b.classList.toggle('active',state.categories.includes(b.dataset.detailCategory)));
    sort.value=state.sort;
  }

  function apply(){
    const l=getLang(),t=I18N[l],q=state.query.trim().toLowerCase();
    let cards=allCards();
    cards.forEach(c=>c.hidden=true);
    let filtered=cards.filter(card=>{
      if(state.origin!=='all'&&card.dataset.origin!==state.origin)return false;
      if(state.categories.length&&!state.categories.includes(card.dataset.category))return false;
      if(q&&!(card.dataset.search||'').includes(q))return false;
      return true;
    });

    filtered.sort((a,b)=>{
      if(state.sort==='az')return (a.dataset.name||'').localeCompare(b.dataset.name||'');
      if(state.sort==='category')return (a.dataset.category||'').localeCompare(b.dataset.category||'')||(a.dataset.name||'').localeCompare(b.dataset.name||'');
      return score(a)-score(b)||(a.dataset.name||'').localeCompare(b.dataset.name||'');
    });
    filtered.forEach(c=>grid.appendChild(c));
    const shown=Math.min(state.limit,filtered.length);
    filtered.slice(0,shown).forEach(c=>c.hidden=false);
    resultCount.textContent=l==='zh'?filtered.length+t.results+' · '+t.shown+' '+shown:filtered.length+' '+t.results+' · '+shown+' '+t.shown;
    empty.hidden=filtered.length>0;
    loadMore.hidden=shown>=filtered.length;
  }

  function localize(){
    const l=getLang(),t=I18N[l];
    document.querySelectorAll('[data-v4]').forEach(el=>{const v=t[el.dataset.v4];if(v)el.textContent=v});
    search.placeholder=t.search;
    document.querySelectorAll('[data-v4-option]').forEach(o=>{const v=t[o.dataset.v4Option];if(v)o.textContent=v});
    renderCategories();renderOriginalShelf();syncControls();apply();
    document.getElementById('total-skill-count').textContent=allCards().length;
  }

  sourceFilter.addEventListener('click',e=>{const b=e.target.closest('[data-origin-filter]');if(!b)return;state.origin=b.dataset.originFilter;state.limit=24;syncControls();apply()});
  clearBtn.addEventListener('click',()=>{state.origin='all';state.categories=[];state.query='';state.sort='recommended';state.limit=24;search.value='';syncControls();apply()});
  search.addEventListener('input',e=>{state.query=e.target.value;state.limit=24;apply()});
  sort.addEventListener('change',e=>{state.sort=e.target.value;state.limit=24;apply()});
  loadMore.addEventListener('click',()=>{state.limit+=24;apply()});
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(localize,30)));

  grid.addEventListener('click',async e=>{
    const btn=e.target.closest('[data-community-open]');if(!btn)return;
    const card=btn.closest('[data-community-id]');const item=catalog.find(x=>x.id===card.dataset.communityId);if(!item)return;
    const l=getLang();
    titleEl.textContent=pretty(item.name);descEl.textContent=shortDesc(item.description);
    inputEl.textContent='SKILL.md + '+(item.bundledResources?'bundled resources':'instructions');
    outputEl.textContent=l==='zh'?'一个可复用的 Agent Skill 技能包。':l==='nl'?'Een herbruikbaar Agent Skill-pakket.':'A reusable Agent Skill package.';
    promptEl.textContent=l==='zh'?'加载中…':l==='nl'?'Laden…':'Loading…';
    communityMeta.hidden=false;sourceLink.href=item.sourceUrl;sourceLink.textContent=repoName(item.repo)+' ↗';licenseValue.textContent=item.license||'See source';downloadLink.href=item.downloadPath||'#';
    modal.showModal();
    try{const r=await fetch(item.skillPath,{cache:'no-store'});if(!r.ok)throw 0;promptEl.textContent=await r.text()}catch{promptEl.textContent=l==='zh'?'无法加载 SKILL.md，请查看原始来源。':l==='nl'?'SKILL.md kon niet worden geladen. Gebruik de bronlink.':'Could not load SKILL.md. Use the source link.'}
  });
  document.querySelectorAll('[data-open-skill]').forEach(b=>b.addEventListener('click',()=>{communityMeta.hidden=true}));

  prepareOriginals();
  fetch('community-catalog.json',{cache:'no-store'})
    .then(r=>{if(!r.ok)throw new Error(String(r.status));return r.json()})
    .then(items=>{
      catalog=Array.isArray(items)?items:[];
      renderCommunity();
      localize();
    })
    .catch(err=>{console.error('Catalog failed',err);localize()});
})();