/* Admin-only advisory leaderboard. XP is client-recorded: not an official award system. */
(function(){
  'use strict';
  const S={
    uz:{title:'🏆 7 kunlik reyting',sub:"Oxirgi 7 kundagi o‘quvchilar va sinflar faolligi.",
      student:'Faol o‘quvchilar',classes:'Sinflar o‘rtasidagi faollik',
      who:'O‘quvchi',cls:'Sinf',xp:'7 kunlik XP',avg:'O‘rtacha XP',total:'Jami XP',
      n:'O‘quvchi',active:'Faol',none:"Hozircha faollik ma'lumotlari yo‘q.",
      caution:'Bu faqat kuzatuv statistikasi: XP foydalanuvchi qurilmasida hisoblanadi. Rasmiy g‘oliblar va sertifikatlar uchun serverda tekshiriladigan natijalar kerak.'},
    en:{title:'🏆 Seven-day rankings',sub:'Student and class activity over the last seven days.',
      student:'Top active students',classes:'Class activity comparison',
      who:'Student',cls:'Class',xp:'7-day XP',avg:'Average XP',total:'Total XP',
      n:'Students',active:'Active',none:'No activity data yet.',
      caution:'Informational only: XP is calculated on the client. Official awards require server-verified results.'}
  };
  const esc=(s)=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function mount(el,users,progress,lang){
    if(!el || !window.ZKStats || !window.ZKAuth || !ZKAuth.isAdmin())return;
    const L=S[lang==='en'?'en':'uz'],Z=ZKStats;
    const top=Z.weeklyTopStudents(users,progress,10),classes=Z.weeklyClassBattle(users,progress);
    el.innerHTML=`<section class="zk-weekly">
      <div class="zk-weekly-head"><h3>${L.title}</h3><p>${L.sub}</p></div>
      <div class="ad-grid">
        <div class="panel"><h3>⚡ ${L.student}</h3>
          ${top.length?`<div class="ad-tw"><table class="ad"><thead><tr><th>#</th><th>${L.who}</th><th>${L.cls}</th><th>${L.xp}</th></tr></thead><tbody>
            ${top.map((u,i)=>`<tr><td>${i+1}</td><td><b>${esc(u.name)}</b></td><td>${esc(u.cls)}</td><td><b>${u.xp}</b></td></tr>`).join('')}
          </tbody></table></div>`:`<p class="ad-mut">${L.none}</p>`}
        </div>
        <div class="panel"><h3>🏫 ${L.classes}</h3>
          ${classes.length?`<div class="ad-tw"><table class="ad"><thead><tr><th>#</th><th>${L.cls}</th><th>${L.avg}</th><th>${L.active}</th></tr></thead><tbody>
            ${classes.map((c,i)=>`<tr><td>${i+1}</td><td><b>${esc(c.cls)}</b></td><td><b>${c.average}</b></td><td>${c.active}/${c.students}</td></tr>`).join('')}
          </tbody></table></div>`:`<p class="ad-mut">${L.none}</p>`}
        </div>
      </div><p class="zk-weekly-caution">⚠️ ${L.caution}</p>
    </section>`;
  }
  window.ZKWeekly={mount};
})();
