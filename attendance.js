/* Zukko Kimyo — attendance manager for staff, embedded in the admin page.
   One Firestore document per class and date. Requires deployed firestore.rules. */
(function () {
  'use strict';
  const i18n = {
    uz: { title:'📋 Sinflar davomati', sub:'Sinf va sanani tanlang. O‘quvchilarning holatini belgilang va saqlang.',
      cls:'Sinf', date:'Sana', save:'☁️ Davomatni saqlash', export:'⬇ CSV eksport',
      reload:'↻ Qayta yuklash', empty:'Ushbu sinfda faol o‘quvchi yo‘q.', choose:'Avval sinfni tanlang.',
      loading:'Davomat yuklanmoqda…', saved:'Davomat saqlandi.', failed:'Davomatni yuklab bo‘lmadi. Firestore qoidalarini tekshiring.',
      unsaved:'Saqlanmagan o‘zgarishlar mavjud. Davom etilsinmi?', present:'Keldi', late:'Kechikdi', absent:'Kelmadi', unknown:'Belgilanmagan',
      name:'O‘quvchi', total:'Jami', security:'Davomatni faqat vakolatli xodimlar ko‘ra olishi kerak. Firebase qoidalari alohida e’lon qilinadi.' },
    en: { title:'📋 Class attendance', sub:'Choose a class and date, mark each student, then save.',
      cls:'Class', date:'Date', save:'☁️ Save attendance', export:'⬇ Export CSV',
      reload:'↻ Reload', empty:'No active students in this class.', choose:'Select a class first.',
      loading:'Loading attendance…', saved:'Attendance saved.', failed:'Could not load attendance. Check Firestore rules.',
      unsaved:'There are unsaved changes. Continue?', present:'Present', late:'Late', absent:'Absent', unknown:'Unmarked',
      name:'Student', total:'Total', security:'Attendance must be restricted to authorized staff. Publish the Firestore rules separately.' }
  };
  const esc=(s)=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const localDate=(d)=>d.toLocaleDateString('sv');
  const statuses=['present','late','absent'];
  function mount(host, users, lang) {
    if (!host || !window.ZKAuth || !ZKAuth.isAdmin || !ZKAuth.isAdmin() || !ZKAuth.backend) return;
    const T=i18n[lang==='en'?'en':'uz'], B=ZKAuth.backend;
    const students=(users||[]).filter(u=>u.role==='student' && u.status!=='pending' && u.status!=='inactive' && u.id);
    const classes=[...new Set(students.map(u=>u.cls || '—'))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
    const state={cls:classes[0]||'',date:localDate(new Date()),entries:{},dirty:false,loading:false,request:0};
    const q=(id)=>host.querySelector('#'+id);
    host.innerHTML=`<div class="zk-att">
      <div class="zk-att-top"><div><h3>${T.title}</h3><p>${T.sub}</p></div><span class="zk-att-label">${esc(T.security)}</span></div>
      <div class="zk-att-toolbar">
        <label>${T.cls}<select id="zkAttClass">${classes.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('')}</select></label>
        <label>${T.date}<input id="zkAttDate" type="date" value="${state.date}" max="${localDate(new Date())}"></label>
        <button class="btn sec sm" id="zkAttReload" type="button">${T.reload}</button>
      </div>
      <div class="zk-att-summary" id="zkAttSummary"></div>
      <div class="zk-att-table" id="zkAttRows"></div>
      <div class="zk-att-bottom"><button class="btn pri sm" id="zkAttSave" type="button">${T.save}</button>
        <button class="btn sec sm" id="zkAttCsv" type="button">${T.export}</button><span id="zkAttMsg" role="status" aria-live="polite"></span></div>
    </div>`;
    const classStudents=()=>students.filter(u=>(u.cls||'—')===state.cls).sort((a,b)=>String(a.name||a.login).localeCompare(String(b.name||b.login),undefined,{numeric:true}));
    const docId=()=>state.date+'_'+encodeURIComponent(state.cls);
    function message(str,isError){const el=q('zkAttMsg');el.textContent=str||'';el.classList.toggle('error',!!isError);}
    function draw() {
      const arr=classStudents();
      const count=(key)=>arr.filter(u=>state.entries[u.id]===key).length;
      q('zkAttSummary').innerHTML=`<span>${T.total}: <b>${arr.length}</b></span>${[...statuses,'unknown'].map(s=>`<span>${T[s]}: <b>${s==='unknown'?arr.length-statuses.reduce((a,k)=>a+count(k),0):count(s)}</b></span>`).join('')}`;
      q('zkAttRows').innerHTML=arr.length?`<table><thead><tr><th scope="col">${T.name}</th><th scope="col">${T.present}</th><th scope="col">${T.late}</th><th scope="col">${T.absent}</th><th scope="col">${T.unknown}</th></tr></thead><tbody>${arr.map(u=>`<tr data-uid="${esc(u.id)}"><th scope="row"><b>${esc(u.name||u.login)}</b><small>${esc(u.login||'')}</small></th>${[...statuses,'unknown'].map(s=>`<td><button class="zk-att-choice ${(state.entries[u.id]||'unknown')===s?'selected':''}" data-value="${s}" type="button" aria-label="${esc(T[s])}: ${esc(u.name||u.login)}" aria-pressed="${String((state.entries[u.id]||'unknown')===s)}">${s==='present'?'✓':s==='late'?'◷':s==='absent'?'✕':'—'}</button></td>`).join('')}</tr>`).join('')}</tbody></table>`:`<p class="zk-att-empty">${state.cls?T.empty:T.choose}</p>`;
      q('zkAttSave').disabled=!arr.length||state.loading||!state.dirty;
      q('zkAttCsv').disabled=!arr.length;
    }
    async function load() {
      const token=++state.request;
      state.loading=true;state.entries={};state.dirty=false;message(T.loading);draw();
      if(!state.cls){state.loading=false;message('');draw();return;}
      try {
        const doc=await B.get('attendance',docId());
        if(token!==state.request)return;
        state.entries=(doc&&doc.entries&&typeof doc.entries==='object')?{...doc.entries}:{};
        message('');
      }catch(e){
        if(token!==state.request)return;
        message(T.failed+' '+(ZKAuth.errMsg?ZKAuth.errMsg(e):''),true);
      }finally{if(token===state.request){state.loading=false;draw();}}
    }
    function selectChanged(next){
      if(state.dirty&&!confirm(T.unsaved))return false;
      state.cls=next.cls;state.date=next.date;load();return true;
    }
    q('zkAttClass').onchange=(ev)=>{if(!selectChanged({cls:ev.target.value,date:state.date}))ev.target.value=state.cls;};
    q('zkAttDate').onchange=(ev)=>{
      const val=ev.target.value;
      if(!/^\d{4}-\d{2}-\d{2}$/.test(val) || val>localDate(new Date()) || !selectChanged({cls:state.cls,date:val}))ev.target.value=state.date;
    };
    q('zkAttReload').onclick=()=>{if(!state.dirty||confirm(T.unsaved))load();};
    q('zkAttRows').onclick=(ev)=>{
      const btn=ev.target.closest('button[data-value]'),row=btn&&btn.closest('tr[data-uid]');
      if(!row||state.loading)return;
      const u=classStudents().find(u=>u.id===row.dataset.uid);if(!u)return;
      if(btn.dataset.value==='unknown')delete state.entries[u.id];
      else if(statuses.includes(btn.dataset.value))state.entries[u.id]=btn.dataset.value;
      else return;
      state.dirty=true;message('');draw();
    };
    q('zkAttSave').onclick=async()=>{
      if(!state.dirty||state.loading)return;
      state.loading=true;draw();message(T.loading);
      try {
        await B.set('attendance',docId(),{date:state.date,cls:state.cls,entries:state.entries,updated:Date.now(),by:ZKAuth.user.uid});
        state.dirty=false;message(T.saved);
      }catch(e){message((ZKAuth.errMsg?ZKAuth.errMsg(e):String(e)),true);}
      finally{state.loading=false;draw();}
    };
    q('zkAttCsv').onclick=()=>{
      const rows=[[T.date,T.cls,T.name,'Login','Status'],...classStudents().map(u=>[state.date,state.cls,u.name||'',u.login||'',T[state.entries[u.id]||'unknown']])];
      const csv='\uFEFF'+rows.map(row=>row.map(cell=>'"'+String(cell).replace(/"/g,'""')+'"').join(';')).join('\r\n');
      const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
      const a=document.createElement('a');a.href=url;a.download='davomat-'+state.date+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    };
    load();
  }
  window.ZKAttendance={mount};
})();
