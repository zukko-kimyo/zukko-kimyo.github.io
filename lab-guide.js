/* Zukko Kimyo — scientific walk-through for existing 3D experiments. */
(function(){
  'use strict';
  const STR={
    uz:{title:'🧭 Tajribaning bosqichlari',sub:'Bosqichni tanlang: 3D sahna aynan o‘sha jarayonga o‘tadi.',
        step:'Bosqich',replay:'↻ Boshidan ko‘rish',eq:'Kimyoviy tenglama',noeq:'Bu bosqichda tenglama ko‘rsatilmagan.',
        hint:'Sahnani sichqoncha yoki barmoq bilan 360° aylantiring; bosqichlarni 3D boshqaruv panelidan ham almashtirishingiz mumkin.',
        conclusion:'Bu virtual tajriba. Haqiqiy moddalar bilan tajribani faqat o‘qituvchi nazoratida bajaring.'},
    en:{title:'🧭 Experiment walkthrough',sub:'Choose a step to jump to that part of the 3D scene.',
        step:'Step',replay:'↻ Restart experiment',eq:'Chemical equation',noeq:'No equation is shown for this step.',
        hint:'Rotate the 3D scene with your mouse or finger; you can also use the scene controls to change steps.',
        conclusion:'This is a virtual experiment. Perform real chemistry only under teacher supervision.'}
  };
  const esc=(s)=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const plain=(s)=>String(s||'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
  const tr=(s,L)=>typeof s==='string'?s:(s&&s[L]||s&&s.uz||'');
  function mount(host,handle,opts={}){
    if(!host || !handle || !Array.isArray(handle.steps) || !handle.steps.length)return;
    const L=opts.lang==='en'?'en':'uz', S=STR[L],steps=handle.steps;
    let last=-1;
    host.innerHTML=`<section class="zk-lab-guide" aria-label="${esc(S.title)}">
      <div class="zk-lab-guide-head"><div><h2>${S.title}</h2><p>${S.sub}</p></div><button class="btn sec sm" id="zkLabReplay">${S.replay}</button></div>
      <div class="zk-lab-guide-grid">
        <div class="zk-lab-timeline" role="group" aria-label="${esc(S.title)}">
          ${steps.map((s,i)=>`<button type="button" data-step="${i}" class="zk-step">${'<span class="zk-step-no">'+(i+1)+'</span>'}<span><b>${S.step} ${i+1}</b><small>${esc(plain(tr(s.cap,L)).slice(0,145))}</small></span></button>`).join('')}
        </div>
        <div class="zk-lab-explain" aria-live="polite">
          <span id="zkLabCounter"></span>
          <p id="zkLabCaption"></p>
          <h3>⚗️ ${S.eq}</h3><div class="zk-lab-equation" id="zkLabEquation"></div>
          <p class="zk-lab-hint">${S.hint}</p><p class="zk-lab-safety">⚠️ ${S.conclusion}</p>
        </div>
      </div>
    </section>`;
    const counter=host.querySelector('#zkLabCounter'),caption=host.querySelector('#zkLabCaption'),equation=host.querySelector('#zkLabEquation');
    function show(i){
      i=Math.max(0,Math.min(steps.length-1,i));
      if(i===last)return;last=i;const s=steps[i];
      counter.textContent=S.step+' '+(i+1)+' / '+steps.length;
      caption.textContent=plain(tr(s.cap,L));
      equation.textContent=s.eq?plain(tr(s.eq,L)):S.noeq;
      host.querySelectorAll('.zk-step').forEach((btn,j)=>{
        btn.classList.toggle('active',j===i);
        btn.setAttribute('aria-pressed',String(j===i));
      });
    }
    host.querySelector('.zk-lab-timeline').onclick=(ev)=>{
      const btn=ev.target.closest('button[data-step]');
      if(!btn)return; const i=Number(btn.dataset.step);
      if(!Number.isInteger(i)||i<0||i>=steps.length)return;
      handle.seek(steps[i].start+0.001);handle.play();show(i);
    };
    host.querySelector('#zkLabReplay').onclick=()=>{handle.seek(0);handle.play();show(0);};
    function watch(){
      if(!host.isConnected)return;
      show(handle.stepIndex);
      requestAnimationFrame(watch);
    }
    show(0);requestAnimationFrame(watch);
  }
  window.ZKLabGuide={mount};
})();
