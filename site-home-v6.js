(() => {
  const lang=()=>{const v=localStorage.getItem('goed-webwerk-language')||document.documentElement.lang||'nl';return String(v).startsWith('zh')?'zh':String(v).startsWith('en')?'en':'nl'};
  const q=s=>document.querySelector(s);
  function applyZh(){
    if(lang()!=='zh') return;
    const pairs=[
      ['[data-i18n="heroLine1"]','网站、AI、自动化。'],
      ['[data-i18n="heroLine2"]','好看，也要真好用。'],
      ['[data-i18n="heroIntro"]','网站、AI Skills、自动化都可以做。我们先看业务真正需要什么，再决定怎么做。'],
      ['[data-i18n="selectedWork"]','项目案例'],
      ['[data-i18n="workTitle"]','我们做过的项目。'],
      ['[data-i18n="workIntro"]','教会、本地商家、餐饮和数字产品，下面都是已经交付或正在使用的项目。'],
      ['[data-i18n="serviceIndexKicker"]','常见项目'],
      ['[data-i18n="serviceIndexTitle"]','我们常做的几类网站。'],
      ['[data-v31="capK"]','还能做什么'],
      ['[data-v31="capI"]','需要 SEO、内容、AI Skills、自动化或数字产品，也可以在同一个项目里一起做。'],
      ['[data-i18n="skillsHomeIntro"]','设计、写作、SEO、研究和效率等 213 个工作流，可以按分类查找、复制或下载。'],
      ['[data-i18n="focusTitle"]','一次只做一个项目'],
      ['[data-i18n="focusText"]','我们不会同时塞很多项目。资料齐全、项目启动后，常规网站一般在 7–14 个工作日内完成。'],
      ['[data-v31="priceIntro"]','单页网站、企业网站和定制项目都有明确起价；开始前先确认范围和费用。'],
      ['[data-i18n="freeIntake"]','聊聊你的项目'],
      ['[data-v31="contactIntro"]','网站、AI、自动化都可以。先说你想解决什么，我们会直接告诉你适不适合、怎么做。']
    ];
    for(const [sel,text] of pairs){const el=q(sel);if(el)el.textContent=text;}
    const htmlPairs=[
      ['[data-v31="capT"]','不只是网站。'],
      ['[data-i18n="skillsHomeTitle"]','我们整理了一套<br>AI Skills 库。'],
      ['[data-i18n="processTitle"]','先把需求说清楚，<br>再开始做。'],
      ['[data-v31="priceTitle"]','价格和范围，<br>先说清楚。'],
      ['[data-v31="contactTitle"]','有项目想做？<br>聊聊看。']
    ];
    for(const [sel,html] of htmlPairs){const el=q(sel);if(el)el.innerHTML=html;}
  }
  function run(){setTimeout(applyZh,90)}
  run();
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',run));
})();