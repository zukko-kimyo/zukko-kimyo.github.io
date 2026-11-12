/* Personal printable achievement certificate — never an official school credential.
   XP is client-recorded; server verification is required for official credentials. */
(function(){
  'use strict';
  const S={
    uz:{
      head:'Shaxsiy yutuq sertifikati',subtitle:'Kimyo fanidagi o‘quv natijasi',
      recipient:'O‘quvchi',done:'O‘zlashtirilgan darslar',xp:'XP ball',level:'Daraja',
      lab:'Yakuni yetkazilgan 3D tajribalar',issued:'Tuzilgan sana',
      unlock:'Sertifikat ochilishi uchun kamida 10 ta darsni o‘zlashtiring.',
      count:'Qolgan darslar',back:'← Yutuqlarga qaytish',continue:'Darsga o‘tish',
      print:'🖨 Chop etish / PDF saqlash',
      warning:'Bu shaxsiy o‘quv statistikasi asosida yaratilgan NORASMIY sertifikat. Maktab tasdiqlovchi hujjati emas. Rasmiy sertifikat serverda tasdiqlangan natijalar bilan berilishi lozim.',
      footer:'Izlanish · Bilim · Tajriba',anon:'Kimyo o‘quvchisi'
    },
    en:{
      head:'Personal achievement certificate',subtitle:'Chemistry learning record',
      recipient:'Learner',done:'Lessons mastered',xp:'XP points',level:'Level',
      lab:'3D experiments completed',issued:'Created on',
      unlock:'Master at least 10 lessons to unlock your certificate.',
      count:'Lessons remaining',back:'← Back to progress',continue:'Open a lesson',
      print:'🖨 Print / Save PDF',
      warning:'UNOFFICIAL personal learning certificate based on client-recorded progress. This is not a school-issued credential. Official certificates require server-verified results.',
      footer:'Explore · Learn · Experiment',anon:'Chemistry learner'
    }
  };
  const esc=(s)=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(app,ctx){
    if(!app||!window.XP)return;
    const xp=window.XP,lang=ctx.lang==='en'?'en':'uz', t=S[lang],s=xp.s;
    const finished=Object.values(s.L||{}).filter(x=>x&&x.done).length;
    const eligible=finished>=10, username=(window.ZKAuth&&window.ZKAuth.user&&(window.ZKAuth.user.name||window.ZKAuth.user.login))||t.anon;
    const date=new Intl.DateTimeFormat(lang==='en'?'en-US':'uz-UZ',{year:'numeric',month:'long',day:'numeric'}).format(new Date());
    const level=xp.level(Math.max(0,Number(s.xp)||0)).L;
    const labs=Object.keys(s.labs||{}).length;
    const escName=esc(String(username).slice(0,160));
    app.innerHTML=`<div class="wrap zk-cert-page">
      <div class="zk-cert-actions"><a class="btn sec sm" href="#me">${t.back}</a>${eligible?`<button type="button" class="btn pri sm" id="zkCertPrint">${t.print}</button>`:''}</div>
      ${eligible?`<article class="zk-cert-print" aria-label="${t.head}">
        <div class="zk-cert-ornament">⚗️</div>
        <div class="zk-cert-school">ZUKKO KIMYO</div>
        <div class="zk-cert-sub">${t.subtitle}</div>
        <h1>${t.head}</h1>
        <div class="zk-cert-recipient">${t.recipient}</div>
        <div class="zk-cert-name">${escName}</div>
        <div class="zk-cert-metrics">
          <div><strong>${finished}</strong><span>${t.done}</span></div>
          <div><strong>${Math.max(0,Number(s.xp)||0)}</strong><span>${t.xp}</span></div>
          <div><strong>${level}</strong><span>${t.level}</span></div>
          <div><strong>${labs}</strong><span>${t.lab}</span></div>
        </div>
        <p class="zk-cert-issued">${t.issued}: ${esc(date)}</p>
        <p class="zk-cert-motto">${t.footer}</p>
        <p class="zk-cert-disclaimer">${t.warning}</p>
      </article>`:`<section class="zk-cert-locked"><span>🏅</span><h1>${t.head}</h1><p>${t.unlock}</p>
        <div class="zk-cert-progress"><div style="width:${Math.max(0,Math.min(100,finished*10))}%"></div></div>
        <strong>${finished}/10 · ${t.count}: ${10-finished}</strong>
        <p><a class="btn pri" href="#g6">${t.continue}</a></p>
      </section>`}
      <p class="zk-cert-note">⚠️ ${t.warning}</p>
    </div>`;
    const btn=app.querySelector('#zkCertPrint');if(btn)btn.onclick=()=>window.print();
  }
  window.ZKCertificate={render};
})();
