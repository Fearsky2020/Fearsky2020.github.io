fetch('community-catalog.json',{cache:'no-store'}).then(r=>r.json()).then(items=>{
  const map=new Map();
  for(const x of items){
    const k=x.repo;
    if(!map.has(k)) map.set(k,{repo:x.repo,license:x.license,count:0});
    map.get(k).count++;
  }
  const rows=[...map.values()].sort((a,b)=>b.count-a.count);
  const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  document.getElementById('source-table').innerHTML=rows.map(r=>'<div class="source-row"><a href="'+esc(r.repo)+'" target="_blank" rel="noreferrer">'+esc(r.repo.replace('https://github.com/',''))+' ↗</a><span>'+r.count+' skills</span><span>'+esc(r.license)+'</span></div>').join('');
}).catch(()=>{document.getElementById('source-table').textContent='Bronnen konden niet worden geladen.'});