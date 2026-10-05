(() => {
  const lang=()=>{const v=localStorage.getItem('goed-webwerk-language')||document.documentElement.lang||'nl';return String(v).startsWith('zh')?'zh':String(v).startsWith('en')?'en':'nl'};
  function apply(){
    if(lang()!=='zh')return;
    const about=document.querySelector('[data-i18n="aboutTitle"]');
    if(about) about.innerHTML='小团队，直接沟通。<br>该认真做的，一样不少。';
    const hero2=document.querySelector('[data-i18n="heroLine2"]');
    if(hero2) hero2.textContent='好看，也要好用。';
  }
  apply();
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setTimeout(apply,100)));
})();