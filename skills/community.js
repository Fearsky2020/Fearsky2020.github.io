(() => {
  const T = {
    nl:{search:'Zoek op naam, taak of categorie…',shown:'skills zichtbaar',source:'Bron',license:'Licentie',bundle:'Pakket',download:'Download Skill.zip',community:'Community',open:'Bekijk & kopieer →',loading:'Laden…',input:'SKILL.md + meegeleverde bestanden',output:'Een herbruikbaar Agent Skill-pakket voor compatibele AI-tools.',failed:'SKILL.md kon niet worden geladen. Gebruik de bronlink.'},
    en:{search:'Search by name, task or category…',shown:'skills shown',source:'Source',license:'License',bundle:'Bundle',download:'Download Skill.zip',community:'Community',open:'View & copy →',loading:'Loading…',input:'SKILL.md + bundled files',output:'A reusable Agent Skill package for compatible AI tools.',failed:'Could not load SKILL.md. Use the source link instead.'},
    zh:{search:'按名称、任务或类别搜索…',shown:'个 Skills',source:'来源',license:'许可证',bundle:'技能包',download:'下载 Skill.zip',community:'社区',open:'查看并复制 →',loading:'加载中…',input:'SKILL.md + 配套文件',output:'可用于兼容 AI 工具的完整 Agent Skill 技能包。',failed:'无法加载 SKILL.md，请使用来源链接。'}
  };
  const CATEGORY_LABELS = {
    nl:{marketing:'Marketing',seo:'SEO',research:'Onderzoek',developer:'Developer',education:'Onderwijs'},
    en:{marketing:'Marketing',seo:'SEO',research:'Research',developer:'Developer',education:'Education'},
    zh:{marketing:'营销',seo:'SEO',research:'研究',developer:'开发',education:'教育'}
  };
  let catalog = [];
  let filter = 'all';
  let query = '';
  let currentCommunity = null;

  const getLang = () => {
    const v = localStorage.getItem('goed-webwerk-language') || 'nl';
    return ['nl','en','zh'].includes(v) ? v : 'nl';
  };
  const esc = v => String(v ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const pretty = v => String(v||'').split('-').map(x=>x ? x[0].toUpperCase()+x.slice(1) : x).join(' ');

  const grid = document.querySelector('.skill-grid');
  const filters = document.querySelector('.filters');
  const modal = document.getElementById('skill-dialog');
  const titleEl = document.getElementById('modal-title');
  const descEl = document.getElementById('modal-desc');
  const inputEl = document.getElementById('modal-input');
  const outputEl = document.getElementById('modal-output');
  const promptEl = document.getElementById('modal-prompt');

  if (!grid || !filters || !modal) return;

  document.querySelectorAll('.skill-card[data-skill]').forEach(card => {
    card.dataset.origin = 'goed';
    card.dataset.search = card.textContent.toLowerCase();
  });

  const toolbar = document.createElement('div');
  toolbar.className = 'skill-toolbar';
  toolbar.innerHTML = '<label class="skill-search"><span aria-hidden="true">⌕</span><input id="skill-search-community" type="search" autocomplete="off"></label><span class="result-count" id="result-count-community"></span>';
  filters.parentNode.insertBefore(toolbar, filters);

  for (const key of ['marketing','seo','research','developer','education']) {
    const b = document.createElement('button');
    b.className = 'filter';
    b.type = 'button';
    b.dataset.filter = key;
    b.dataset.communityFilter = '1';
    filters.appendChild(b);
  }

  const meta = document.createElement('div');
  meta.className = 'community-meta';
  meta.hidden = true;
  meta.innerHTML = '<div><span data-community-source></span><a data-community-source-link href="#" target="_blank" rel="noreferrer">GitHub ↗</a></div><div><span data-community-license></span><strong data-community-license-value></strong></div><div><span data-community-bundle></span><a data-community-download href="#" download></a></div>';
  modal.querySelector('.modal-body').appendChild(meta);

  function localize(){
    const l = getLang(), t = T[l];
    toolbar.querySelector('input').placeholder = t.search;
    filters.querySelectorAll('[data-community-filter]').forEach(b => b.textContent = CATEGORY_LABELS[l][b.dataset.filter]);
    meta.querySelector('[data-community-source]').textContent = t.source;
    meta.querySelector('[data-community-license]').textContent = t.license;
    meta.querySelector('[data-community-bundle]').textContent = t.bundle;
    meta.querySelector('[data-community-download]').textContent = t.download;
    document.querySelectorAll('.community-card [data-community-open]').forEach(b => b.textContent = t.open);
    applyFilters();
  }

  function applyFilters(){
    const l=getLang(), t=T[l];
    let visible=0;
    document.querySelectorAll('.skill-card').forEach(card => {
      const cat=(card.dataset.category||'').toLowerCase();
      const hay=(card.dataset.search||card.textContent||'').toLowerCase();
      const show=(filter==='all'||cat===filter)&&(!query||hay.includes(query));
      card.hidden=!show;
      if(show) visible++;
    });
    const rc=document.getElementById('result-count-community');
    if(rc) rc.textContent = l==='zh' ? visible+t.shown : visible+' '+t.shown;
  }

  filters.addEventListener('click', e => {
    const b=e.target.closest('.filter');
    if(!b) return;
    filter=b.dataset.filter||'all';
    requestAnimationFrame(applyFilters);
  });
  toolbar.querySelector('input').addEventListener('input', e => {
    query=e.target.value.trim().toLowerCase();
    applyFilters();
  });

  document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => requestAnimationFrame(localize)));
  document.querySelectorAll('[data-open-skill]').forEach(b => b.addEventListener('click', () => { meta.hidden=true; currentCommunity=null; }));

  grid.addEventListener('click', async e => {
    const btn=e.target.closest('[data-community-open]');
    if(!btn) return;
    const card=btn.closest('[data-community-id]');
    const item=catalog.find(x=>x.id===card.dataset.communityId);
    if(!item) return;
    currentCommunity=item;
    const l=getLang(), t=T[l];
    titleEl.textContent=pretty(item.name);
    descEl.textContent=item.description||'Open-source Agent Skill.';
    inputEl.textContent=t.input;
    outputEl.textContent=t.output;
    promptEl.textContent=t.loading;
    meta.hidden=false;
    meta.querySelector('[data-community-source-link]').href=item.sourceUrl;
    meta.querySelector('[data-community-source-link]').textContent=item.repo.replace('https://github.com/','')+' ↗';
    meta.querySelector('[data-community-license-value]').textContent=item.license||'See source';
    meta.querySelector('[data-community-download]').href=item.downloadPath;
    modal.showModal();
    try{
      const r=await fetch(item.skillPath,{cache:'no-store'});
      if(!r.ok) throw new Error(String(r.status));
      promptEl.textContent=await r.text();
    }catch{
      promptEl.textContent=t.failed;
    }
  });

  fetch('community-catalog.json',{cache:'no-store'})
    .then(r=>{if(!r.ok) throw new Error(String(r.status)); return r.json()})
    .then(items=>{
      catalog=items.sort((a,b)=>a.category.localeCompare(b.category)||a.name.localeCompare(b.name));
      const frag=document.createDocumentFragment();
      for(const item of catalog){
        const card=document.createElement('article');
        card.className='skill-card community-card';
        card.dataset.origin='community';
        card.dataset.communityId=item.id;
        card.dataset.category=String(item.category||'Business').toLowerCase();
        card.dataset.search=[item.name,item.description,item.category,item.source,item.license].join(' ').toLowerCase();
        card.innerHTML =
          '<div class="skill-meta"><span class="skill-origin community">'+esc(item.category)+'</span><span>'+esc(item.license||'Open source')+'</span></div>'+
          '<h3>'+esc(pretty(item.name))+'</h3>'+
          '<p>'+esc(item.description||'Reusable open-source Agent Skill.')+'</p>'+
          '<div class="skill-tags"><span>'+esc(item.source.replace(/^gw-/,'').replaceAll('-',' '))+'</span>'+(item.bundledResources?'<span>+ resources</span>':'')+'</div>'+
          '<button class="open-skill" type="button" data-community-open>'+esc(T[getLang()].open)+'</button>';
        frag.appendChild(card);
      }
      grid.appendChild(frag);
      const countEl=document.querySelector('.hero-panel strong');
      if(countEl) countEl.textContent=6+catalog.length;
      localize();
    })
    .catch(err=>console.error('Community catalog failed',err));
})();