/* Tajribalar — 2-qism (6-sinf) */
(function () {
  const T = THREE, { clamp, lerp, ease, seg, rng } = Lab.m, M = Lab.M, P = Lab.profiles, { at, V, pile, grains } = Lab.util;

  function candle(h = 0.45) {
    const g = new T.Group();
    const wax = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, h, 24), M.std(0xfff8e7, { roughness: 0.6 })); wax.position.y = h / 2; wax.castShadow = true; g.add(wax);
    const wick = new T.Mesh(new T.CylinderGeometry(0.008, 0.008, 0.05, 6), M.std(0x222222)); wick.position.y = h + 0.02; g.add(wick);
    const fl = Lab.flame({ h: 0.2, w: 0.05 }); fl.group.position.y = h + 0.03; g.add(fl.group);
    return { group: g, flame: fl, top: h + 0.05 };
  }
  Lab.util.candle = candle;
  const invJar = (R = 0.36, H = 0.85) => { const v = Lab.vessel(P.beaker(R, H), { rim: true }); v.group.rotation.x = Math.PI; return v; };

  /* 8. Sham nega o'chadi */
  Lab.def({
    id: 'candle-jar', icon: '🕯️', grade: [6, 7],
    title: { uz: "Sham nega o'chadi?", en: 'Why does the candle go out?' },
    desc: { uz: "Stakan bilan yopilgan sham kislorod tugagach o'chadi: yonish uchun kislorod kerak.", en: 'A candle covered by a glass goes out when the oxygen is used up: burning needs oxygen.' },
    cam: { pos: [0, 1.7, 3.6], target: [0, 0.6, 0] },
    build(ctx) {
      const { scene } = ctx;
      const c1 = candle(); at(c1, -0.6, 0, 0); scene.add(c1.group); const c2 = candle(); at(c2, 0.6, 0, 0); scene.add(c2.group);
      const jar = invJar(0.3, 0.8); scene.add(jar.group);
      const smoke = Lab.puffs(scene, { color: 0x9aa3ad, op: 0.5, size: 0.12, life: 2.5, spread: 0.02, vel: V(0, 0.12, 0), origin: () => V(-0.6, c1.top, 0) });
      const mic = Lab.micro(scene, V(1.7, 1.3, -0.4), 0.6);
      const ms = []; const R = rng(4); for (let i = 0; i < 10; i++) { const o2 = Lab.mol('O2', 0.5), co = Lab.mol('CO2', 0.5); const p = V((R() - 0.5) * 0.7, (R() - 0.5) * 0.7, (R() - 0.5) * 0.5); o2.position.copy(p); co.position.copy(p); mic.content.add(o2); mic.content.add(co); ms.push({ o2, co, d: R(), s: R() * 6 }); }
      const l1 = ctx.label({ uz: 'Yopilgan', en: 'Covered' }, c1.group, [0, 1.0, 0]); const l2 = ctx.label({ uz: 'Ochiq', en: 'Open' }, c2.group, [0, 0.75, 0]);
      const lO = ctx.label({ uz: 'O₂ kamaymoqda…', en: 'O₂ running out…' }, mic.group, [0, 0.7, 0], 'micro');
      let f1 = 1;
      return {
        reset() { jar.group.position.set(-0.6, 1.8, 0); f1 = 1; smoke.rate = 0; mic.show(0); lO.set(0); ms.forEach((m) => { m.o2.visible = true; m.co.visible = false; }); l1.set(1); l2.set(1); },
        steps: [
          { dur: 3, cap: { uz: 'Ikkita bir xil sham yonib turibdi. Yonish — moddaning kislorod bilan tez reaksiyasi: issiqlik va yorug\'lik ajraladi.', en: 'Two identical candles are burning. Combustion is a fast reaction with oxygen that releases heat and light.' } },
          { dur: 3, cap: { uz: 'Chap shamni shisha stakan bilan yopamiz. O\'ng sham ochiq qoladi.', en: 'We cover the left candle with a glass. The right candle stays open.' }, f(p) { jar.group.position.y = lerp(1.8, 0.82, ease(p)); } },
          { dur: 6, cap: { uz: "Stakan ichidagi havoda kislorod (O₂) sarflanib boradi, o'rniga CO₂ va suv bug'i hosil bo'ladi. Alanga kichrayib boradi…", en: 'Inside the glass, oxygen (O₂) is used up and replaced by CO₂ and water vapour. The flame gets smaller…' }, eq: { uz: 'Parafin + O₂ → CO₂ + H₂O + issiqlik', en: 'Paraffin + O₂ → CO₂ + H₂O + heat' }, f(p) { jar.group.position.y = 0.82; f1 = lerp(1, 0.25, ease(p)); mic.show(seg(p, 0, 0.15)); lO.set(seg(p, 0.1, 0.2)); ms.forEach((m) => { const sw = m.d < p; m.o2.visible = !sw; m.co.visible = sw; }); } },
          { dur: 4, cap: { uz: "Kislorod tugadi — sham <b>o'chdi</b>, faqat tutun qoldi. O'ng sham esa yonishda davom etmoqda, chunki unga havodan kislorod kelib turibdi.", en: 'The oxygen is gone — the candle <b>goes out</b>, leaving only smoke. The right candle keeps burning because fresh air brings it oxygen.' }, f(p) { jar.group.position.y = 0.82; f1 = 0.25 * (1 - seg(p, 0, 0.3)); smoke.rate = p < 0.8 ? 10 : 0; mic.show(1); lO.set(1 - seg(p, 0, 0.2)); ms.forEach((m) => { m.o2.visible = m.d > 0.92; m.co.visible = !m.o2.visible; }); } },
          { dur: 4.5, cap: { uz: "<b>Xulosa:</b> yonish uchun <b>yonuvchi modda, kislorod va yuqori harorat</b> kerak. Shuning uchun yong'inni qalin mato bilan yopib o'chirish mumkin — kislorod kirmaydi.", en: '<b>Conclusion:</b> burning needs <b>fuel, oxygen and heat</b>. That is why a fire can be put out by covering it with a thick blanket — it blocks the oxygen.' }, f() { jar.group.position.y = 0.82; f1 = 0; mic.show(1); ms.forEach((m) => { m.o2.visible = m.d > 0.92; m.co.visible = !m.o2.visible; }); } },
        ],
        loop(dt, s, c) { c1.flame.set(f1); c1.flame.tick(c.t); c2.flame.set(1); c2.flame.tick(c.t + 3); smoke.tick(dt); ms.forEach((m) => { m.o2.rotation.y += dt; m.co.rotation.y += dt; m.o2.position.y += Math.sin(c.t * 2 + m.s) * 0.0008; m.co.position.y = m.o2.position.y; }); },
        clear() { smoke.clear(); }
      };
    }
  });

  /* 9. Havoning tarkibi */
  Lab.def({
    id: 'air-composition', icon: '💨', grade: [6, 7],
    title: { uz: 'Havoning tarkibi: kislorod qancha?', en: 'Composition of air: how much oxygen?' },
    desc: { uz: "Suvdagi sham ustiga stakan yopilsa, sham o'chadi va suv ko'tariladi. Havo — azot (78%), kislorod (21%) va boshqa gazlar aralashmasi.", en: 'Cover a candle standing in water: it goes out and the water rises. Air is a mixture of nitrogen (78%), oxygen (21%) and other gases.' },
    cam: { pos: [0.4, 1.7, 3.7], target: [0.3, 0.55, 0] },
    build(ctx) {
      const { scene } = ctx;
      const dishV = ctx.add(at(Lab.vessel([[0, 0], [0.7, 0], [0.72, 0.16]], { color: 0x3aa0ff, opacity: 0.55, level: 0.1 }), -0.5, 0, 0));
      const cd = candle(0.3); at(cd, -0.5, 0.02, 0); scene.add(cd.group);
      const jar = invJar(0.32, 0.9); scene.add(jar.group);
      const inside = new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 1, 32), M.liquid(0x3aa0ff, 0.55)); scene.add(inside);
      const mark = new T.Mesh(new T.TorusGeometry(0.325, 0.006, 6, 40), M.basic(0xffd60a)); mark.rotation.x = Math.PI / 2; scene.add(mark);
      const smoke = Lab.puffs(scene, { color: 0x9aa3ad, op: 0.45, size: 0.1, life: 2, spread: 0.02, vel: V(0, 0.1, 0), origin: () => V(-0.5, cd.top + 0.02, 0) });
      const mic = Lab.micro(scene, V(1.25, 1.15, -0.2), 0.7);
      const R = rng(12); const gas = [];
      for (let i = 0; i < 25; i++) { const k = i < 19 ? 'N2' : i < 24 ? 'O2' : null; const m = k ? Lab.mol(k, 0.5) : Lab.atomMesh('Ne', 0.7); m.position.set((R() - 0.5) * 1.0, (R() - 0.5) * 1.0, (R() - 0.5) * 0.6); m.rotation.set(R() * 6, R() * 6, 0); m.userData.s = R() * 6; mic.content.add(m); gas.push(m); }
      const cv = document.createElement('canvas'); cv.width = 240; cv.height = 150; cv.className = 'lab-graph'; ctx.renderer.domElement.parentElement.appendChild(cv); const g2 = cv.getContext('2d');
      function pie(k) {
        g2.clearRect(0, 0, 240, 150); if (k <= 0) { cv.style.opacity = 0; return; } cv.style.opacity = 1;
        g2.fillStyle = 'rgba(255,255,255,.95)'; g2.fillRect(0, 0, 240, 150);
        const parts = [[0.78, '#3478f6', Lab.lang === 'uz' ? 'Azot N₂ 78%' : 'Nitrogen N₂ 78%'], [0.21, '#ff3b30', Lab.lang === 'uz' ? 'Kislorod O₂ 21%' : 'Oxygen O₂ 21%'], [0.01, '#ff8fb1', Lab.lang === 'uz' ? 'Ar, CO₂ va b. 1%' : 'Ar, CO₂ etc. 1%']];
        let a = -Math.PI / 2; parts.forEach(([f, c, l], i) => { g2.beginPath(); g2.moveTo(65, 75); g2.arc(65, 75, 52, a, a + f * Math.PI * 2 * k); g2.closePath(); g2.fillStyle = c; g2.fill(); a += f * Math.PI * 2 * k; g2.fillRect(130, 40 + i * 28, 12, 12); g2.fillStyle = '#0f172a'; g2.font = '600 12px Inter,Arial'; g2.fillText(l, 148, 51 + i * 28); });
      }
      const lW = ctx.label({ uz: 'Suv ≈ 1/5 qismga ko\'tarildi', en: 'Water rose ≈ 1/5' }, mark, [0.35, 0.05, 0], 'tag'); const lA = ctx.label({ uz: 'Havo namunasi', en: 'Air sample' }, mic.group, [0, 0.8, 0], 'micro');
      let fl = 1, rise = 0;
      return {
        reset() { jar.group.position.set(-0.5, 1.9, 0); fl = 1; rise = 0; smoke.rate = 0; inside.visible = false; mark.visible = false; lW.set(0); mic.show(0); lA.set(0); pie(0); },
        steps: [
          { dur: 3, cap: { uz: "Rangli suvli idish o'rtasida sham yonib turibdi.", en: 'A candle burns in the middle of a dish of coloured water.' } },
          { dur: 3, cap: { uz: 'Shamni stakan bilan yopib, stakan chetini suvga botiramiz. Ichkarida faqat ma\'lum miqdordagi havo qoldi.', en: 'We cover the candle with a glass whose rim dips into the water, trapping a fixed amount of air.' }, f(p) { jar.group.position.y = lerp(1.9, 0.95, ease(p)); } },
          { dur: 6, cap: { uz: "Sham kislorodni sarflaydi va o'chadi. Ichkaridagi gaz soviydi, bosim kamayadi — tashqi havo bosimi suvni stakan ichiga <b>itaradi</b>.", en: 'The candle uses up oxygen and goes out. The gas inside cools and its pressure drops — outside air pressure <b>pushes</b> water up into the glass.' }, f(p) { jar.group.position.y = 0.95; fl = 1 - ease(seg(p, 0, 0.5)); smoke.rate = p > 0.5 && p < 0.85 ? 8 : 0; rise = ease(seg(p, 0.35, 1)); } },
          { dur: 5, cap: { uz: "Suv taxminan <b>1/5</b> qismgacha ko'tarildi. Bu havodagi kislorod ulushiga (≈21%) yaqin. Qolgan gaz asosan <b>azot</b> — u yonishga yordam bermaydi.", en: 'The water rose by about <b>1/5</b> — close to the share of oxygen in air (≈21%). The remaining gas is mostly <b>nitrogen</b>, which does not support burning.' }, f(p) { jar.group.position.y = 0.95; fl = 0; rise = 1; lW.set(seg(p, 0, 0.2)); mic.show(seg(p, 0.2, 0.4)); lA.set(seg(p, 0.3, 0.4)); pie(ease(seg(p, 0.3, 0.9))); } },
          { dur: 4, cap: { uz: "<b>Havo — aralashma:</b> azot 78%, kislorod 21%, argon, karbonat angidrid va boshqa gazlar ≈1%. Kislorod nafas olish va yonish uchun zarur.", en: '<b>Air is a mixture:</b> nitrogen 78%, oxygen 21%, argon, carbon dioxide and other gases ≈1%. Oxygen is essential for breathing and burning.' }, f() { jar.group.position.y = 0.95; fl = 0; rise = 1; lW.set(1); mic.show(1); lA.set(1); pie(1); } },
        ],
        loop(dt, s, c) {
          cd.flame.set(fl); cd.flame.tick(c.t); smoke.tick(dt);
          const hIn = 0.1 + rise * 0.16; inside.visible = s.i >= 1; inside.scale.y = hIn; inside.position.set(-0.5, hIn / 2 + 0.01, 0); mark.visible = rise > 0.95; mark.position.set(-0.5, hIn, 0);
          gas.forEach((m) => { m.rotation.y += dt * 0.7; m.position.x += Math.sin(c.t * 1.3 + m.userData.s) * 0.0012; m.position.y += Math.cos(c.t * 1.1 + m.userData.s) * 0.0012; });
        },
        clear() { smoke.clear(); }
      };
    }
  });

  /* 10. Indikator va pH shkalasi */
  const PH = [0xe8132b, 0xef3b25, 0xf46b1e, 0xf99d1c, 0xfdc70c, 0xe9e622, 0x8fc63f, 0x3cb44b, 0x1aa29a, 0x2a7fc1, 0x3955a5, 0x4b3a95, 0x5c2b87, 0x46166b];
  Lab.PH = PH;
  Lab.def({
    id: 'indicator-ph', icon: '🌈', grade: [6, 7],
    title: { uz: 'Kislota, ishqor va pH shkalasi', en: 'Acids, bases and the pH scale' },
    desc: { uz: "Universal indikator eritmaning muhitini rang bilan ko'rsatadi: pH < 7 kislotali, 7 neytral, > 7 ishqoriy.", en: 'Universal indicator shows the medium by colour: pH < 7 acidic, 7 neutral, > 7 basic.' },
    cam: { pos: [0, 1.6, 3.9], target: [0, 0.75, 0] },
    build(ctx) {
      const { scene } = ctx;
      const items = [[{ uz: 'Limon sharbati', en: 'Lemon juice' }, 2, 0xfff6c2], [{ uz: 'Sirka', en: 'Vinegar' }, 3, 0xfaf3d6], [{ uz: 'Toza suv', en: 'Pure water' }, 7, 0xe8f6ff], [{ uz: 'Soda eritmasi', en: 'Baking soda' }, 9, 0xf4f8ff], [{ uz: 'Sovunli suv', en: 'Soapy water' }, 10, 0xf2f2f2], [{ uz: 'O\'yuvchi natriy', en: 'Sodium hydroxide' }, 13, 0xf6f9fb]];
      const rack = new T.Mesh(new T.BoxGeometry(2.7, 0.05, 0.35), M.std(0xb07a44)); rack.position.set(0, 0.35, 0); scene.add(rack);
      const rack2 = rack.clone(); rack2.position.y = 0.06; scene.add(rack2);
      [-1.33, 1.33].forEach((x) => { const leg = new T.Mesh(new T.BoxGeometry(0.05, 0.36, 0.35), M.std(0xb07a44)); leg.position.set(x, 0.2, 0); scene.add(leg); });
      const tubes = items.map((it, i) => { const v = Lab.vessel(P.tube(0.1, 0.95), { color: it[2], opacity: 0.6, level: 0.55 }); at(v, -1.1 + i * 0.44, 0.08, 0); scene.add(v.group); const l = ctx.label(it[0], v.group, [0, -0.2, 0.25]); const lp = ctx.label('pH ' + it[1], v.group, [0, 1.12, 0], 'tag'); return { v, it, l, lp }; });
      const drop = new T.Group(); const bulb = new T.Mesh(new T.SphereGeometry(0.05, 12, 10), M.std(0x333333)); bulb.position.y = 0.38; drop.add(bulb); const tube = new T.Mesh(new T.CylinderGeometry(0.018, 0.008, 0.36, 10), M.glass()); tube.material.opacity = 0.5; tube.position.y = 0.17; drop.add(tube); const ind = new T.Mesh(new T.CylinderGeometry(0.015, 0.008, 0.2, 10), M.liquid(0x2bb673, 0.9)); ind.position.y = 0.1; drop.add(ind); scene.add(drop);
      const scale = new T.Group(); scene.add(scale); scale.position.set(0, 1.55, -0.3);
      PH.forEach((c, i) => { const b = new T.Mesh(new T.BoxGeometry(0.19, 0.22, 0.05), M.std(c, { roughness: 0.5 })); b.position.x = (i - 6.5) * 0.2; scale.add(b); const sp = Lab.textSprite(String(i + 1), { size: 40, scale: 0.09 }); sp.position.set((i - 6.5) * 0.2, 0, 0.04); scale.add(sp); });
      const lA = ctx.label({ uz: '← KISLOTALI', en: '← ACIDIC' }, scale, [-0.85, 0.22, 0], 'tag'); const lN = ctx.label({ uz: 'NEYTRAL', en: 'NEUTRAL' }, scale, [-0.1, 0.22, 0]); const lB = ctx.label({ uz: 'ISHQORIY →', en: 'BASIC →' }, scale, [0.85, 0.22, 0], 'tag');
      const dropPos = (k) => { const i = Math.min(5, Math.floor(k)); const x = -1.1 + i * 0.44; return V(x, 1.25 + 0.06 * Math.sin((k % 1) * Math.PI), 0); };
      const dd = Lab.drops(scene, { color: 0x2bb673, from: () => drop.position.clone(), to: () => 0.6 });
      return {
        reset() { tubes.forEach((o) => { o.v.setColor(o.it[2]); o.lp.set(0); o.l.set(1); }); drop.visible = true; drop.position.copy(dropPos(0)); scale.visible = false; scale.scale.setScalar(0.01); lA.set(0); lN.set(0); lB.set(0); dd.rate = 0; },
        steps: [
          { dur: 3.5, cap: { uz: "Probirkalarda turli eritmalar: limon sharbati, sirka, toza suv, soda, sovunli suv va o'yuvchi natriy. Ko'z bilan qaraganda ularning farqi deyarli bilinmaydi.", en: 'Test tubes hold lemon juice, vinegar, pure water, baking soda, soapy water and sodium hydroxide. By eye, they look almost the same.' } },
          { dur: 9, cap: { uz: "Har biriga bir necha tomchi <b>universal indikator</b> tomizamiz. Indikator — muhitga qarab rangini o'zgartiradigan modda.", en: 'We add a few drops of <b>universal indicator</b> to each. An indicator is a substance that changes colour depending on the medium.' }, f(p) { const k = p * 6; drop.position.copy(dropPos(Math.min(5.99, k))); dd.rate = (k % 1) > 0.3 && (k % 1) < 0.6 ? 12 : 0; tubes.forEach((o, i) => { const q = clamp(k - i - 0.45, 0, 0.5) * 2; const c = new T.Color(o.it[2]).lerp(new T.Color(PH[o.it[1] - 1]), q); o.v.setColor(c); o.lp.set(q > 0.9 ? 1 : 0); }); } },
          { dur: 5, cap: { uz: "Ranglarni <b>pH shkalasi</b> bilan solishtiramiz. pH 0–14 oralig'ida: <b>7 dan kichik — kislotali</b> (qizil-sariq), <b>7 — neytral</b> (yashil), <b>7 dan katta — ishqoriy</b> (ko'k-binafsha).", en: 'We compare the colours with the <b>pH scale</b> (0–14): <b>below 7 — acidic</b> (red–yellow), <b>7 — neutral</b> (green), <b>above 7 — basic</b> (blue–purple).' }, cam: { pos: [0, 1.7, 3.6], target: [0, 1.05, 0] }, f(p) { drop.visible = false; tubes.forEach((o) => { o.v.setColor(PH[o.it[1] - 1]); o.lp.set(1); }); scale.visible = true; scale.scale.setScalar(Math.max(0.01, ease(seg(p, 0, 0.4)))); lA.set(seg(p, 0.4, 0.55)); lN.set(seg(p, 0.5, 0.65)); lB.set(seg(p, 0.6, 0.75)); } },
          { dur: 5, cap: { uz: "<b>Kislotalar</b> suvda H⁺ ionlarini, <b>ishqorlar</b> OH⁻ ionlarini hosil qiladi. Tibbiyotda: oshqozon shirasi pH ≈ 1–2 (kislotali), qon pH ≈ 7,4 (kuchsiz ishqoriy).", en: '<b>Acids</b> form H⁺ ions in water; <b>bases</b> form OH⁻ ions. In medicine: stomach juice pH ≈ 1–2 (acidic), blood pH ≈ 7.4 (slightly basic).' }, f() { drop.visible = false; tubes.forEach((o) => { o.v.setColor(PH[o.it[1] - 1]); o.lp.set(1); }); scale.visible = true; scale.scale.setScalar(1); lA.set(1); lN.set(1); lB.set(1); } },
        ],
        loop(dt) { dd.tick(dt); }, clear() { dd.clear(); }
      };
    }
  });

  /* 11. Katalizator va fermentlar */
  Lab.def({
    id: 'catalyst', icon: '🥔', grade: [6],
    title: { uz: 'Katalizator: vodorod peroksidning parchalanishi', en: 'Catalysts: decomposing hydrogen peroxide' },
    desc: { uz: "Kartoshkadagi ferment (katalaza) reaksiyani ming marta tezlashtiradi — kislorod ajraladi.", en: 'An enzyme in potato (catalase) speeds the reaction up enormously — oxygen is released.' },
    cam: { pos: [0.2, 1.8, 3.8], target: [0.1, 0.8, 0] },
    build(ctx) {
      const { scene } = ctx;
      const a = ctx.add(at(Lab.vessel(P.cylinder(0.17, 1.3), { color: 0xe9f6ff, opacity: 0.5, level: 0.4, marks: 6 }), -0.6, 0, 0));
      const b = ctx.add(at(Lab.vessel(P.cylinder(0.17, 1.3), { color: 0xe9f6ff, opacity: 0.5, level: 0.4, marks: 6 }), 0.5, 0, 0));
      ctx.label({ uz: 'H₂O₂ (katalizatorsiz)', en: 'H₂O₂ (no catalyst)' }, a.group, [0, 1.45, 0]); ctx.label({ uz: 'H₂O₂ + kartoshka', en: 'H₂O₂ + potato' }, b.group, [0, 1.45, 0]);
      const pot = new T.Mesh(new T.BoxGeometry(0.12, 0.08, 0.1), M.std(0xf2df9b, { roughness: 0.9 })); scene.add(pot);
      const foam = new T.Mesh(new T.CylinderGeometry(0.16, 0.16, 1, 24), M.std(0xffffff, { roughness: 1, transparent: true, opacity: 0.9 })); b.group.add(foam);
      const slow = Lab.bubbles(scene, { size: 0.012, speed: 0.3, region: () => ({ x: -0.6, z: 0, r: 0.12, y0: 0.03, y1: a.level }) });
      const fast = Lab.bubbles(scene, { size: 0.02, speed: 0.7, region: () => ({ x: 0.5, z: 0, r: 0.13, y0: 0.05, y1: b.level }) });
      const sp = Lab.splint(); scene.add(sp.group);
      const mic = Lab.micro(scene, V(1.55, 1.2, -0.2), 0.62);
      const enz = new T.Mesh(new T.SphereGeometry(0.28, 20, 14), M.std(0x34c759, { roughness: 0.6 })); enz.scale.set(1.3, 0.8, 1); enz.position.y = -0.25; mic.content.add(enz);
      const hp = Lab.mol('H2O2', 0.7), w1 = Lab.mol('H2O', 0.6), o2 = Lab.mol('O2', 0.6); [hp, w1, o2].forEach((m) => mic.content.add(m));
      const lE = ctx.label({ uz: 'Ferment (katalaza)', en: 'Enzyme (catalase)' }, enz, [0, -0.3, 0], 'micro');
      const lO = ctx.label({ uz: 'O₂ — cho\'g\' yana alangalandi!', en: 'O₂ — the glowing splint relights!' }, V(0.5, 1.85, 0), [0, 0, 0], 'tag');
      return {
        reset() { pot.position.set(1.0, 0.04, 0.5); foam.visible = false; slow.rate = 2; fast.rate = 0; sp.group.position.set(1.4, 1.6, 0.3); sp.group.rotation.z = 0.4; sp.glow(0); sp.flame.set(0); mic.show(0); lE.set(0); lO.set(0); hp.visible = true; w1.visible = o2.visible = false; },
        steps: [
          { dur: 3.5, cap: { uz: "Ikkala silindrda <b>vodorod peroksid (H₂O₂)</b> eritmasi. U o'z-o'zidan juda sekin parchalanadi — pufakchalar deyarli yo'q.", en: 'Both cylinders contain <b>hydrogen peroxide (H₂O₂)</b>. On its own it decomposes very slowly — hardly any bubbles.' } },
          { dur: 3, cap: { uz: "2-silindrga bir bo'lak <b>xom kartoshka</b> solamiz. Kartoshkada <b>katalaza</b> fermenti bor.", en: 'We drop a piece of <b>raw potato</b> into cylinder 2. Potato contains the enzyme <b>catalase</b>.' }, f(p) { const k = ease(p); pot.position.set(lerp(1.0, 0.5, k), lerp(0.04, 1.5, Math.sin(Math.PI * Math.min(1, k * 1.2)) * (k < 0.8 ? 1 : 0)) + (k >= 0.8 ? lerp(1.2, 0.08, (k - 0.8) / 0.2) : 0), lerp(0.5, 0, k)); if (k >= 0.99) pot.position.set(0.5, 0.08, 0); } },
          { dur: 5, cap: { uz: "Shiddatli ko'piklanish! Ferment H₂O₂ ni tezda <b>suv va kislorodga</b> parchalaydi. Ferment — <b>tabiiy katalizator</b>: reaksiyani tezlashtiradi, lekin o'zi sarflanmaydi.", en: 'Vigorous foaming! The enzyme quickly breaks H₂O₂ into <b>water and oxygen</b>. An enzyme is a <b>natural catalyst</b>: it speeds up a reaction without being used up.' }, eq: '2H₂O₂ → 2H₂O + O₂↑', f(p) { pot.position.set(0.5, 0.08, 0); fast.rate = 200; foam.visible = true; const h = lerp(0.02, 0.85, ease(p)); foam.scale.y = h; foam.position.y = 0.4 + h / 2; } },
          { dur: 5, cap: { uz: "Mikro-ko'rinish: H₂O₂ molekulasi fermentning faol markaziga keladi va parchalanadi. Ferment esa o'zgarmay, keyingi molekulani kutadi.", en: 'Micro view: an H₂O₂ molecule reaches the enzyme’s active site and splits. The enzyme stays unchanged, ready for the next molecule.' }, cam: { pos: [1.3, 1.6, 3.0], target: [1.2, 1.1, 0] }, f(p) { pot.position.set(0.5, 0.08, 0); fast.rate = 120; foam.visible = true; foam.scale.y = 0.85; foam.position.y = 0.4 + 0.425; mic.show(seg(p, 0, 0.15)); lE.set(seg(p, 0.1, 0.2)); const k = (p * 2) % 1; hp.visible = k < 0.5; w1.visible = o2.visible = k >= 0.5; hp.position.set(lerp(-0.4, 0, ease(k * 2)), lerp(0.3, 0.02, ease(k * 2)), 0); hp.rotation.z = k * 4; const q = (k - 0.5) * 2; w1.position.set(-0.15 - q * 0.3, 0.05 + q * 0.2, 0); o2.position.set(0.15 + q * 0.25, 0.08 + q * 0.4, 0); } },
          { dur: 5, cap: { uz: "Kislorodni tekshiramiz: cho'g'langan cho'pni silindr og'ziga yaqinlashtiramiz — u <b>yana alangalanib ketadi</b>. Demak, ajralgan gaz — kislorod!", en: 'Testing for oxygen: we bring a glowing splint to the mouth of the cylinder — it <b>bursts back into flame</b>. So the gas is oxygen!' }, cam: { pos: [0.3, 1.9, 3.6], target: [0.2, 1.05, 0] }, f(p) { mic.show(1 - seg(p, 0, 0.2)); lE.set(0); pot.position.set(0.5, 0.08, 0); fast.rate = 100; foam.visible = true; foam.scale.y = 0.85; foam.position.y = 0.825; const k = ease(seg(p, 0, 0.45)); sp.group.position.set(lerp(1.4, 0.55, k), lerp(1.6, 1.42, k), lerp(0.3, 0, k)); sp.glow(1); sp.flame.set(seg(p, 0.5, 0.65) * 0.9); lO.set(seg(p, 0.6, 0.75)); } },
          { dur: 4, cap: { uz: "<b>Fermentlar hayotda:</b> ovqat hazm qilish, non yopish, qatiq va pishloq tayyorlash. Juda oz miqdordagi ferment katta ish bajaradi.", en: '<b>Enzymes in life:</b> digesting food, baking bread, making yoghurt and cheese. A tiny amount of enzyme does a lot of work.' }, f() { pot.position.set(0.5, 0.08, 0); fast.rate = 60; foam.visible = true; foam.scale.y = 0.85; foam.position.y = 0.825; sp.group.position.set(0.55, 1.42, 0); sp.glow(1); sp.flame.set(0.9); lO.set(1); } },
        ],
        loop(dt, s, c) { slow.tick(dt); fast.tick(dt); sp.flame.tick(c.t); enz.rotation.y += dt * 0.4; },
        clear() { slow.clear(); fast.clear(); }
      };
    }
  });

  /* 12. Tuxum po'chog'i va sirka (tish kariyesi modeli) */
  Lab.def({
    id: 'eggshell-vinegar', icon: '🥚', grade: [6],
    title: { uz: "Tuxum po'chog'i sirkada: tish emali qanday yemiriladi?", en: 'Eggshell in vinegar: how tooth enamel is damaged' },
    desc: { uz: "Kislota kalsiy karbonatli po'choqni eritadi — xuddi bakteriyalar hosil qilgan kislota tish emalini yemirgani kabi.", en: 'Acid dissolves the calcium carbonate shell — just as acid made by bacteria damages tooth enamel.' },
    cam: { pos: [0.4, 1.6, 3.4], target: [0.2, 0.6, 0] },
    build(ctx) {
      const { scene } = ctx;
      const jar = ctx.add(at(Lab.vessel(P.beaker(0.42, 1.0), { color: 0xe9d48f, opacity: 0.5, level: 0.75 }), -0.4, 0, 0));
      const egg = new T.Group(); const shell = new T.Mesh(new T.SphereGeometry(0.2, 32, 24), M.std(0xf1d3a6, { roughness: 0.8, transparent: true, opacity: 1 })); shell.scale.set(1, 1.3, 1); egg.add(shell);
      const yolk = new T.Mesh(new T.SphereGeometry(0.1, 20, 16), M.std(0xffb020)); yolk.visible = false; egg.add(yolk); scene.add(egg);
      const bub = Lab.bubbles(scene, { size: 0.014, speed: 0.35, region: () => ({ x: -0.4 + (Math.random() - 0.5) * 0.3, z: (Math.random() - 0.5) * 0.3, r: 0.02, y0: 0.15 + Math.random() * 0.4, y1: jar.level }) });
      const cal = document.createElement('div'); cal.className = 'lab-info'; cal.style.cssText = 'left:auto;right:12px;top:44px;font-size:15px'; ctx.renderer.domElement.parentElement.appendChild(cal);
      // tooth
      const tooth = new T.Group(); tooth.position.set(1.0, 0, 0.1); scene.add(tooth);
      const crown = new T.Mesh(new T.SphereGeometry(0.22, 24, 16), M.std(0xfafafa, { roughness: 0.3 })); crown.scale.set(1, 0.85, 0.9); crown.position.y = 0.55; tooth.add(crown);
      [-0.09, 0.09].forEach((x) => { const r = new T.Mesh(new T.ConeGeometry(0.08, 0.45, 16), M.std(0xf2ead8)); r.rotation.x = Math.PI; r.position.set(x, 0.28, 0); tooth.add(r); });
      const cav = new T.Mesh(new T.SphereGeometry(0.06, 14, 10), M.std(0x5b3a1a)); cav.position.set(0.1, 0.68, 0.14); tooth.add(cav);
      const lT = ctx.label({ uz: 'Tish emali (Ca birikmalari)', en: 'Tooth enamel (Ca compounds)' }, tooth, [0, 0.95, 0]);
      return {
        reset() { egg.position.set(-0.4, 1.4, 0); shell.material.opacity = 1; shell.material.color.set(0xf1d3a6); yolk.visible = false; bub.rate = 0; cal.style.opacity = 0; cav.scale.setScalar(0.01); tooth.visible = false; lT.set(0); },
        steps: [
          { dur: 3, cap: { uz: "Tuxum po'chog'i asosan <b>kalsiy karbonat (CaCO₃)</b>dan iborat — tish emaliga o'xshash qattiq modda.", en: 'An eggshell is mostly <b>calcium carbonate (CaCO₃)</b> — a hard material similar to tooth enamel.' } },
          { dur: 3, cap: { uz: 'Tuxumni sirka solingan idishga solamiz.', en: 'We place the egg in a jar of vinegar.' }, f(p) { egg.position.y = lerp(1.4, 0.3, ease(p)); bub.rate = 40 * seg(p, 0.8, 1); } },
          { dur: 7, cap: { uz: "Po'choq yuzasida <b>CO₂ pufakchalari</b> paydo bo'ladi: kislota kalsiy karbonat bilan reaksiyaga kirishadi. Kunlar o'tgani sari po'choq erib, tuxum yarim shaffof bo'lib qoladi.", en: '<b>CO₂ bubbles</b> appear on the shell: the acid reacts with calcium carbonate. Over the days the shell dissolves and the egg becomes translucent.' }, eq: 'CaCO₃ + 2CH₃COOH → Ca(CH₃COO)₂ + H₂O + CO₂↑', f(p) { egg.position.y = 0.3 + 0.08 * p; bub.rate = lerp(60, 15, p); shell.material.opacity = lerp(1, 0.35, ease(p)); shell.material.color.lerpColors(new T.Color(0xf1d3a6), new T.Color(0xfff8e8), p); yolk.visible = p > 0.5; cal.style.opacity = 1; cal.innerHTML = '🗓 ' + (Lab.lang === 'uz' ? 'Vaqt: ' : 'Time: ') + Math.max(0, Math.round(p * 48)) + (Lab.lang === 'uz' ? ' soat' : ' hours'); } },
          { dur: 6, cap: { uz: "Og'izda ham shunday bo'ladi: <b>bakteriyalar shakarni</b> iste'mol qilib <b>kislota</b> ishlab chiqaradi. Kislota tish emalidagi kalsiyni eritadi — <b>kariyes</b> boshlanadi.", en: 'The same happens in the mouth: <b>bacteria feed on sugar</b> and produce <b>acid</b>. The acid dissolves calcium in the enamel — <b>tooth decay</b> begins.' }, cam: { pos: [1.4, 1.3, 2.6], target: [0.9, 0.55, 0] }, f(p) { egg.position.y = 0.38; shell.material.opacity = 0.35; shell.material.color.set(0xfff8e8); yolk.visible = true; bub.rate = 10; tooth.visible = true; lT.set(seg(p, 0, 0.2)); cav.scale.setScalar(Math.max(0.01, ease(seg(p, 0.3, 1)))); cal.style.opacity = 0; } },
          { dur: 4.5, cap: { uz: "<b>Tishni asrash:</b> shirinlikni kam iste'mol qiling, shirin ichimlikdan keyin og'izni chaying, kuniga 2 marta tish yuving. Sut va pishloqdagi kalsiy tishni mustahkamlaydi.", en: '<b>Protect your teeth:</b> eat fewer sweets, rinse after sugary drinks and brush twice a day. Calcium from milk and cheese strengthens teeth.' }, f() { egg.position.y = 0.38; shell.material.opacity = 0.35; yolk.visible = true; tooth.visible = true; lT.set(1); cav.scale.setScalar(1); bub.rate = 6; } },
        ],
        loop(dt) { bub.tick(dt); egg.rotation.y += dt * 0.2; }, clear() { bub.clear(); }
      };
    }
  });

  /* 13. Sovun qanday ishlaydi */
  Lab.def({
    id: 'soap-micelle', icon: '🧼', grade: [6],
    title: { uz: 'Sovun qanday ishlaydi?', en: 'How does soap work?' },
    desc: { uz: "Sovun molekulasining bir uchi suvni, ikkinchi uchi yog'ni «yaxshi ko'radi» — yog' tomchisini o'rab, suv bilan yuvib ketadi.", en: 'One end of a soap molecule loves water, the other loves grease — it wraps grease droplets so water can wash them away.' },
    cam: { pos: [0, 2.2, 2.8], target: [0, 0.2, 0] },
    build(ctx) {
      const { scene } = ctx;
      const d = ctx.add(at(Lab.vessel([[0, 0], [0.8, 0], [0.82, 0.12]], { color: 0x8fd3ff, opacity: 0.45, level: 0.09 }), 0, 0, 0));
      const R = rng(3); const pep = []; const pg = new T.BoxGeometry(1, 0.3, 1); const pm = M.std(0x1a1a1a, { roughness: 1 });
      for (let i = 0; i < 160; i++) { const m = new T.Mesh(pg, pm); const a = R() * Math.PI * 2, r = Math.sqrt(R()) * 0.72; m.userData = { a, r }; m.scale.setScalar(0.012 + R() * 0.012); m.rotation.y = R() * 3; m.position.set(Math.cos(a) * r, 0.095, Math.sin(a) * r); scene.add(m); pep.push(m); }
      const finger = new T.Group(); const fg = new T.Mesh(new T.CylinderGeometry(0.06, 0.06, 0.6, 16), M.std(0xf2c7a5)); fg.position.y = 0.32; finger.add(fg); const tip = new T.Mesh(new T.SphereGeometry(0.06, 16, 12), M.std(0xf2c7a5)); tip.position.y = 0.02; finger.add(tip); const soapTip = new T.Mesh(new T.SphereGeometry(0.065, 16, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M.std(0x7dd3fc, { transparent: true, opacity: 0.8 })); soapTip.position.y = 0.02; finger.add(soapTip); scene.add(finger);
      // micro: micelle
      const mic = Lab.micro(scene, V(0, 1.35, 0), 0.75);
      const oil = new T.Mesh(new T.SphereGeometry(0.2, 24, 16), M.std(0xffc93c, { transparent: true, opacity: 0.85 })); mic.content.add(oil);
      const soaps = []; const N = 22;
      for (let i = 0; i < N; i++) {
        const g = new T.Group(); const head = new T.Mesh(new T.SphereGeometry(0.045, 12, 8), M.std(0xff3b30)); head.position.y = 0.2; g.add(head);
        const tail = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 0.18, 6), M.std(0x6b7280)); tail.position.y = 0.1; g.add(tail);
        const y = 1 - 2 * (i + 0.5) / N, rr = Math.sqrt(1 - y * y), th = i * 2.399; const dir = V(Math.cos(th) * rr, y, Math.sin(th) * rr);
        g.userData = { dir, far: dir.clone().multiplyScalar(0.55).add(V((R() - 0.5) * 0.3, (R() - 0.5) * 0.3, 0)), spin: R() * 6 }; mic.content.add(g); soaps.push(g);
      }
      const lH = ctx.label({ uz: 'Suvni sevuvchi «bosh»', en: 'Water-loving "head"' }, V(0, 0, 0), [0, 0, 0], 'micro'); const lTl = ctx.label({ uz: 'Yog\'ni sevuvchi «dum»', en: 'Grease-loving "tail"' }, V(0, 0, 0), [0, 0, 0]);
      const lOil = ctx.label({ uz: "Yog' (kir) tomchisi", en: 'Grease (dirt) droplet' }, oil, [0, -0.32, 0], 'tag');
      let push = 0;
      return {
        reset() { push = 0; finger.position.set(0.9, 0.9, 0.3); mic.show(0); lH.set(0); lTl.set(0); lOil.set(0); },
        steps: [
          { dur: 3, cap: { uz: "Idishdagi suv yuzasiga qora murch sepilgan. Murch suv yuzasidagi «parda» (sirt taranglik) ustida suzib yuribdi.", en: 'Black pepper is sprinkled on water. The pepper floats on the surface "skin" (surface tension).' } },
          { dur: 3, cap: { uz: 'Barmog\'imizning uchiga ozgina suyuq sovun surtib, suv o\'rtasiga tekkizamiz…', en: 'We dip a fingertip in liquid soap and touch the middle of the water…' }, f(p) { const k = ease(p); finger.position.set(lerp(0.9, 0, k), lerp(0.9, 0.1, k), lerp(0.3, 0, k)); } },
          { dur: 3.5, cap: { uz: "Murch zarrachalari bir zumda <b>chetlarga qochib ketdi!</b> Sovun suvning sirt tarangligini kamaytiradi.", en: 'The pepper <b>rushes to the edges</b> instantly! Soap reduces the surface tension of water.' }, f(p) { finger.position.set(0, 0.1, 0); push = ease(seg(p, 0, 0.5)); } },
          { dur: 7, cap: { uz: "Mikro-ko'rinish: sovun molekulasining <b>«boshi»</b> suvga, <b>«dumi»</b> esa yog'ga tortiladi. Ko'plab sovun molekulalari yog' tomchisini o'rab olib, <b>mitsella</b> hosil qiladi.", en: 'Micro view: the soap molecule’s <b>"head"</b> is attracted to water and its <b>"tail"</b> to grease. Many soap molecules surround the grease droplet, forming a <b>micelle</b>.' }, cam: { pos: [0.1, 1.6, 2.4], target: [0, 1.3, 0] }, f(p) { finger.position.set(0.9, 0.9, 0.3); push = 1; mic.show(seg(p, 0, 0.12)); lOil.set(seg(p, 0.1, 0.2)); const k = ease(seg(p, 0.2, 0.8)); soaps.forEach((g) => { const tgt = g.userData.dir.clone().multiplyScalar(0.16); g.position.lerpVectors(g.userData.far, tgt, k); const q = new T.Quaternion().setFromUnitVectors(V(0, 1, 0), g.userData.dir); g.quaternion.slerpQuaternions(new T.Quaternion().setFromEuler(new T.Euler(g.userData.spin, g.userData.spin * 2, 0)), q, k); }); const s0 = soaps[3]; s0.children[0].getWorldPosition(lH.target); s0.children[1].getWorldPosition(lTl.target); lH.off.set(0.05, 0.06, 0); lTl.off.set(-0.25, 0, 0); lH.set(seg(p, 0.3, 0.4) * (1 - seg(p, 0.85, 0.95))); lTl.set(seg(p, 0.35, 0.45) * (1 - seg(p, 0.85, 0.95))); } },
          { dur: 4.5, cap: { uz: "Mitsella suv bilan birga yuvilib ketadi — kir va yog' tozalanadi. Shuning uchun qo'lni <b>sovun bilan kamida 20 soniya</b> yuvish kerak: sovun mikroblarni ham yuvib tushiradi.", en: 'The micelle is rinsed away with water — dirt and grease are removed. That is why we wash hands <b>with soap for at least 20 seconds</b>: soap washes germs away too.' }, f(p) { push = 1; mic.show(1); lOil.set(1); soaps.forEach((g) => { g.position.copy(g.userData.dir.clone().multiplyScalar(0.16)); g.quaternion.setFromUnitVectors(V(0, 1, 0), g.userData.dir); }); mic.content.position.x = 0.3 * Math.sin(p * Math.PI); } },
        ],
        loop(dt, s, c) { pep.forEach((m) => { const r = lerp(m.userData.r, 0.62 + m.userData.r * 0.14, push); m.position.set(Math.cos(m.userData.a) * r, 0.095, Math.sin(m.userData.a) * r); }); if (s.i < 4) mic.content.position.x = 0; mic.content.rotation.y += dt * 0.3; }
      };
    }
  });

  /* 14. Xromatografiya — siyoh ranglari */
  Lab.def({
    id: 'chromatography', icon: '🖍️', grade: [6, 7],
    title: { uz: 'Qora siyoh qanday ranglardan iborat?', en: 'What colours are in black ink?' },
    desc: { uz: "Qog'oz xromatografiyasi: suv qog'oz bo'ylab ko'tarilib, siyohdagi bo'yoqlarni turli balandlikka olib chiqadi.", en: 'Paper chromatography: water climbs the paper and carries the ink’s dyes to different heights.' },
    cam: { pos: [0.5, 1.3, 2.6], target: [0, 0.6, 0] },
    build(ctx) {
      const { scene } = ctx;
      const bk = ctx.add(at(Lab.vessel(P.beaker(0.35, 1.1), { color: 0xbfe6ff, opacity: 0.45, level: 0.12 }), 0, 0, 0));
      const rod = new T.Mesh(new T.CylinderGeometry(0.015, 0.015, 0.9, 8), M.std(0xd8b27a)); rod.rotation.z = Math.PI / 2; rod.position.y = 1.15; scene.add(rod);
      const cv = document.createElement('canvas'); cv.width = 128; cv.height = 512; const g2 = cv.getContext('2d'); const tex = Lab.srgb(new T.CanvasTexture(cv));
      const strip = new T.Mesh(new T.PlaneGeometry(0.22, 1.08), new T.MeshStandardMaterial({ map: tex, roughness: 1, side: T.DoubleSide })); strip.position.set(0, 0.6, 0); scene.add(strip);
      const bands = [[0xffd60a, 0.95, 'Sariq', 'Yellow'], [0xff2d92, 0.7, 'Pushti', 'Magenta'], [0x2563eb, 0.45, "Ko'k", 'Blue']];
      function draw(front, sep) { // front: 0..1 water height on strip; sep 0..1
        g2.fillStyle = '#fbfbfa'; g2.fillRect(0, 0, 128, 512);
        const fy = 512 - (0.06 + front * 0.86) * 512; g2.fillStyle = 'rgba(160,200,235,.35)'; g2.fillRect(0, fy, 128, 512 - fy);
        const dot = 512 - 0.17 * 512;
        if (sep <= 0.01) { g2.fillStyle = '#111'; g2.beginPath(); g2.arc(64, dot, 13, 0, 7); g2.fill(); }
        else { bands.forEach(([c, h]) => { const y = dot - sep * h * 0.68 * 512; const col = '#' + c.toString(16).padStart(6, '0'); const gr = g2.createRadialGradient(64, y, 2, 64, y, 26); gr.addColorStop(0, col); gr.addColorStop(1, col + '00'); g2.fillStyle = gr; g2.beginPath(); g2.ellipse(64, y, 34, 18 + sep * 10, 0, 0, 7); g2.fill(); }); g2.fillStyle = `rgba(20,20,20,${0.8 * (1 - sep)})`; g2.beginPath(); g2.arc(64, dot, 13, 0, 7); g2.fill(); }
        tex.needsUpdate = true;
      }
      const lb = bands.map((b) => ctx.label({ uz: b[2], en: b[3] }, strip, [0.2, 0, 0]));
      const lD = ctx.label({ uz: 'Qora siyoh nuqtasi', en: 'Black ink dot' }, strip, [0.2, -0.36, 0]); const lF = ctx.label({ uz: 'Suv ko\'tarilmoqda ↑', en: 'Water rising ↑' }, strip, [-0.28, 0, 0]);
      let front = 0, sep = 0;
      return {
        reset() { front = 0; sep = 0; lb.forEach((l) => l.set(0)); lD.set(1); lF.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "Filtr qog'ozi tasmasining pastrog'iga qora flomaster bilan nuqta qo'yilgan. Tasma uchi suvga tegib turadi, lekin nuqta suvdan yuqorida.", en: 'A dot of black marker is drawn near the bottom of a filter-paper strip. The strip touches the water, but the dot is above it.' } },
          { dur: 8, cap: { uz: "Suv qog'oz bo'ylab yuqoriga ko'tariladi va siyohni o'zi bilan olib ketadi. Har xil bo'yoqlar har xil tezlikda harakatlanadi…", en: 'Water climbs the paper and carries the ink along. Different dyes travel at different speeds…' }, f(p) { front = ease(p); sep = clamp((front - 0.15) / 0.85); lD.set(1 - seg(p, 0.2, 0.4)); lF.set(seg(p, 0, 0.1) * (1 - seg(p, 0.85, 1))); lF.off.set(-0.28, -0.48 + front * 0.86, 0); } },
          { dur: 5, cap: { uz: "Qora siyoh aslida bir nechta rangli bo'yoqlarning <b>aralashmasi</b> ekan: sariq, pushti va ko'k. Bu usul — <b>xromatografiya</b> — aralashmalarni ajratish usuli.", en: 'Black ink is actually a <b>mixture</b> of several dyes: yellow, magenta and blue. This method — <b>chromatography</b> — separates mixtures.' }, f(p) { front = 1; sep = 1; lb.forEach((l, i) => { l.set(seg(p, i * 0.15, i * 0.15 + 0.2)); l.off.set(0.2, -0.36 + bands[i][1] * 0.68 * 1.08 * 0.97, 0); }); } },
          { dur: 4, cap: { uz: "<b>Qo'llanilishi:</b> bo'yoq va siyohlar tarkibini aniqlash, dori va oziq-ovqat tahlili, kriminalistika.", en: '<b>Uses:</b> analysing paints and inks, testing medicines and food, forensic science.' }, f() { front = 1; sep = 1; lb.forEach((l, i) => { l.set(1); l.off.set(0.2, -0.36 + bands[i][1] * 0.68 * 1.08 * 0.97, 0); }); } },
        ],
        loop() { draw(front, sep); bk.setLevel(0.12 - front * 0.02); }
      };
    }
  });

  /* 15. Kraxmalni yod bilan aniqlash */
  Lab.def({
    id: 'starch-iodine', icon: '🍎', grade: [6, 7],
    title: { uz: 'Kraxmalni yod bilan aniqlash', en: 'Testing for starch with iodine' },
    desc: { uz: "Yod eritmasi kraxmal bilan to'q ko'k-qora rang beradi. Pishmagan olmada kraxmal ko'p, pishganida u shakarga aylanadi.", en: 'Iodine turns blue-black with starch. Unripe apples are rich in starch; in ripe apples it has turned into sugar.' },
    cam: { pos: [0, 2.0, 2.6], target: [0, 0.15, 0] },
    build(ctx) {
      const { scene } = ctx;
      const plate = new T.Mesh(new T.CylinderGeometry(1.3, 1.2, 0.05, 48), M.std(0xffffff, { roughness: 0.4 })); plate.position.y = 0.03; plate.receiveShadow = true; scene.add(plate);
      const items = [
        [{ uz: 'Kartoshka', en: 'Potato' }, 0xf3e3a6, 1, -0.8, 0],
        [{ uz: 'Non', en: 'Bread' }, 0xe9c58f, 0.9, -0.27, 0],
        [{ uz: 'Pishmagan olma', en: 'Unripe apple' }, 0xeef5c4, 0.8, 0.27, 0],
        [{ uz: 'Pishgan olma', en: 'Ripe apple' }, 0xfff1c9, 0.15, 0.8, 0],
        [{ uz: 'Shakar', en: 'Sugar' }, 0xffffff, 0, 0, 0.75]];
      const objs = items.map((it, i) => {
        const g = new T.Group(); let body;
        if (i === 1) body = new T.Mesh(new T.BoxGeometry(0.4, 0.12, 0.4), M.std(it[1], { roughness: 0.95 }));
        else if (i === 4) body = new T.Mesh(new T.ConeGeometry(0.22, 0.12, 24), M.std(0xffffff, { roughness: 0.95 }));
        else { body = new T.Mesh(new T.CylinderGeometry(0.22, 0.22, 0.09, 32), M.std(it[1], { roughness: 0.8 })); if (i >= 2) { const skin = new T.Mesh(new T.TorusGeometry(0.22, 0.02, 8, 32), M.std(i === 2 ? 0x7cc242 : 0xd9302c)); skin.rotation.x = Math.PI / 2; skin.position.y = 0.0; g.add(skin); } }
        body.position.y = 0.06; body.castShadow = true; g.add(body);
        const spot = new T.Mesh(new T.CircleGeometry(0.09, 24), M.std(0x8a4b0f, { roughness: 0.5, transparent: true, opacity: 0 })); spot.rotation.x = -Math.PI / 2; spot.position.y = i === 4 ? 0.125 : i === 1 ? 0.125 : 0.107; g.add(spot);
        g.position.set(it[3], 0.05, it[4]); scene.add(g); ctx.label(it[0], g, [0, -0.08, 0.3]);
        return { g, spot, starch: it[2], lr: ctx.label(it[2] > 0.5 ? { uz: 'Kraxmal bor ✔', en: 'Starch ✔' } : it[2] > 0 ? { uz: 'Kam kraxmal', en: 'Little starch' } : { uz: "Kraxmal yo'q", en: 'No starch' }, g, [0, 0.38, 0], it[2] > 0.5 ? 'tag' : '') };
      });
      const drop = new T.Group(); const bulb = new T.Mesh(new T.SphereGeometry(0.05, 12, 10), M.std(0x333333)); bulb.position.y = 0.4; drop.add(bulb); const tb = new T.Mesh(new T.CylinderGeometry(0.018, 0.008, 0.36, 10), M.liquid(0x8a4b0f, 0.8)); tb.position.y = 0.18; drop.add(tb); scene.add(drop);
      const dd = Lab.drops(scene, { color: 0x8a4b0f, from: () => drop.position.clone(), to: () => 0.18 });
      const pos = (k) => { const i = Math.min(4, Math.floor(k)); const o = objs[i].g.position; return V(o.x, 0.75, o.z); };
      return {
        reset() { objs.forEach((o) => { o.spot.material.opacity = 0; o.spot.material.color.set(0x8a4b0f); o.lr.set(0); }); drop.position.copy(pos(0)); drop.visible = true; dd.rate = 0; },
        steps: [
          { dur: 3, cap: { uz: "Likopchada: kartoshka, non, pishmagan va pishgan olma bo'laklari hamda shakar. Tomizgichda — <b>yod eritmasi</b> (jigarrang).", en: 'On the plate: potato, bread, unripe and ripe apple slices and sugar. The dropper holds <b>iodine solution</b> (brown).' } },
          { dur: 10, cap: { uz: "Har biriga bir tomchidan yod tomizamiz va rangini kuzatamiz…", en: 'We add one drop of iodine to each and watch the colour…' }, f(p) { const k = p * 5; drop.position.copy(pos(Math.min(4.99, k))); dd.rate = (k % 1) > 0.25 && (k % 1) < 0.45 ? 10 : 0; objs.forEach((o, i) => { const q = clamp((k - i - 0.4) * 2.5); o.spot.material.opacity = q; const blue = clamp((k - i - 0.6) * 3) * o.starch; o.spot.material.color.lerpColors(new T.Color(0x8a4b0f), new T.Color(0x14143a), blue); o.lr.set(clamp((k - i - 0.85) * 4)); }); } },
          { dur: 5, cap: { uz: "Kartoshka, non va pishmagan olmada yod <b>to'q ko'k-qora</b> rangga kirdi — demak, ularda <b>kraxmal</b> bor. Shakar va pishgan olmada rang deyarli o'zgarmadi.", en: 'Potato, bread and unripe apple turned <b>dark blue-black</b> — they contain <b>starch</b>. Sugar and ripe apple barely changed colour.' }, f() { drop.visible = false; objs.forEach((o) => { o.spot.material.opacity = 1; o.spot.material.color.lerpColors(new T.Color(0x8a4b0f), new T.Color(0x14143a), o.starch); o.lr.set(1); }); } },
          { dur: 4.5, cap: { uz: "Olma pishgan sari undagi kraxmal <b>shakarga</b> (glyukoza, fruktoza) aylanadi — shuning uchun pishgan olma shirin bo'ladi. Kraxmal — muhim <b>uglevod</b>, organizm uchun energiya manbai.", en: 'As an apple ripens, its starch turns into <b>sugars</b> (glucose, fructose) — that is why ripe apples taste sweet. Starch is an important <b>carbohydrate</b>, a source of energy.' }, f() { drop.visible = false; objs.forEach((o) => { o.spot.material.opacity = 1; o.spot.material.color.lerpColors(new T.Color(0x8a4b0f), new T.Color(0x14143a), o.starch); o.lr.set(1); }); } },
        ],
        loop(dt) { dd.tick(dt); }, clear() { dd.clear(); }
      };
    }
  });

  /* 16. Moddadan atomgacha; atom, molekula, ion */
  Lab.def({
    id: 'particles', icon: '🔬', grade: [6],
    title: { uz: 'Moddadan atomgacha: atom, molekula va ion', en: 'From substance to atom: atoms, molecules and ions' },
    desc: { uz: "Muz bo'lagini kattalashtirib boramiz: molekulalar → atomlar. So'ng natriy elektron berib Na⁺ ioniga, xlor uni olib Cl⁻ ioniga aylanadi.", en: 'Zoom into an ice cube: molecules → atoms. Then sodium gives an electron to chlorine, forming Na⁺ and Cl⁻ ions.' },
    table: false, bg: 0x0f1d33, cam: { pos: [0, 0.4, 3.2], target: [0, 0, 0] },
    build(ctx) {
      const { scene } = ctx; scene.fog = null;
      const st = (x) => V(x, 0, 0);
      // A: ice
      const ice = new T.Mesh(new T.BoxGeometry(0.9, 0.9, 0.9), new T.MeshPhongMaterial({ color: 0xcfefff, transparent: true, opacity: 0.75, shininess: 150, specular: 0xffffff })); ice.position.copy(st(0)); scene.add(ice);
      // B: lattice
      const lat = new T.Group(); lat.position.copy(st(8)); scene.add(lat);
      for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) for (let z = -1; z <= 1; z++) { const m = Lab.mol('H2O', 0.55); m.position.set(x * 0.3, y * 0.3, z * 0.3); m.rotation.set(x, y + z, 0); lat.add(m); }
      // C: one molecule
      const one = Lab.mol('H2O', 2.2); one.position.copy(st(16)); scene.add(one);
      // D: oxygen atom
      const oat = new T.Group(); oat.position.copy(st(24)); scene.add(oat);
      const R = rng(8); for (let i = 0; i < 16; i++) { const m = new T.Mesh(new T.SphereGeometry(0.08, 14, 10), M.std(i < 8 ? 0xff3b30 : 0x9aa5b1)); const u = R(), v = R(), r = 0.2 * Math.cbrt(R()); m.position.set(r * Math.sin(Math.acos(2 * v - 1)) * Math.cos(6.28 * u), r * Math.cos(Math.acos(2 * v - 1)), r * Math.sin(Math.acos(2 * v - 1)) * Math.sin(6.28 * u)); oat.add(m); }
      const eO = []; [[0.55, 2], [1.0, 6]].forEach(([r, n]) => { const ring = new T.Mesh(new T.TorusGeometry(r, 0.006, 6, 80), M.glow(0x5ac8fa, 0.4)); ring.rotation.x = Math.PI / 2; oat.add(ring); for (let k = 0; k < n; k++) { const e = new T.Mesh(new T.SphereGeometry(0.05, 10, 8), M.glow(0x5ac8fa)); e.userData = { r, a: k / n * 6.28 }; oat.add(e); eO.push(e); } });
      // E: Na + Cl -> ions
      const ion = new T.Group(); ion.position.copy(st(32)); scene.add(ion);
      const na = new T.Mesh(new T.SphereGeometry(0.32, 24, 16), M.std(0xa25ff5, { transparent: true, opacity: 0.9 })); na.position.x = -0.7; ion.add(na);
      const cl = new T.Mesh(new T.SphereGeometry(0.28, 24, 16), M.std(0x34c759, { transparent: true, opacity: 0.9 })); cl.position.x = 0.7; ion.add(cl);
      const el = new T.Mesh(new T.SphereGeometry(0.06, 12, 10), M.glow(0x5ac8fa)); ion.add(el);
      const lNa = ctx.label('Na', na, [0, 0.45, 0], 'ion'), lCl = ctx.label('Cl', cl, [0, 0.42, 0], 'ion'), lE = ctx.label('e⁻', el, [0, 0.12, 0], 'micro');
      const lIce = ctx.label({ uz: "Muz bo'lagi (modda — H₂O)", en: 'Ice cube (substance — H₂O)' }, ice, [0, 0.65, 0], 'tag');
      const lLat = ctx.label({ uz: 'Suv molekulalari', en: 'Water molecules' }, lat, [0, 0.9, 0], 'tag');
      const lOne = ctx.label({ uz: 'Bitta H₂O molekulasi: 2 ta H + 1 ta O atomi', en: 'One H₂O molecule: 2 H atoms + 1 O atom' }, one, [0, 0.95, 0], 'tag');
      const lO = ctx.label({ uz: 'Kislorod atomi: 8p⁺, 8n⁰, 8e⁻', en: 'Oxygen atom: 8p⁺, 8n⁰, 8e⁻' }, oat, [0, 1.25, 0], 'tag');
      const cams = [0, 8, 16, 24, 32].map((x) => ({ pos: [x, 0.4, 3.2], target: [x, 0, 0] }));
      let eK = 0;
      return {
        reset() { eK = 0; na.scale.setScalar(1); cl.scale.setScalar(1); lNa.setText('Na'); lCl.setText('Cl'); lE.set(1); },
        steps: [
          { dur: 3.5, cam: cams[0], cap: { uz: "Bu — muz bo'lagi, ya'ni <b>jism</b>. U <b>suv</b> moddasidan iborat. Keling, uni kattalashtirib boramiz!", en: 'This is an ice cube — an <b>object</b>. It is made of the <b>substance</b> water. Let’s zoom in!' } },
          { dur: 4.5, cam: cams[1], cap: { uz: "Juda katta kattalashtirsak, muz son-sanoqsiz <b>suv molekulalaridan</b> tuzilganini ko'ramiz. <b>Molekula</b> — moddaning xossalarini saqlovchi eng kichik zarracha.", en: 'Under huge magnification, ice is made of countless <b>water molecules</b>. A <b>molecule</b> is the smallest particle that keeps the properties of a substance.' } },
          { dur: 4.5, cam: cams[2], cap: { uz: "Bitta suv molekulasi <b>atomlardan</b> tashkil topgan: 2 ta vodorod (H, oq) va 1 ta kislorod (O, qizil) atomi. Formulasi — <b>H₂O</b>.", en: 'One water molecule is made of <b>atoms</b>: 2 hydrogen (H, white) and 1 oxygen (O, red). Its formula is <b>H₂O</b>.' } },
          { dur: 5, cam: cams[3], cap: { uz: "Kislorod atomi: markazida musbat <b>yadro</b> (8 proton + 8 neytron), atrofida 8 ta <b>elektron</b> (1-qavatda 2 ta, 2-qavatda 6 ta). Atom elektroneytral.", en: 'An oxygen atom: a positive <b>nucleus</b> in the centre (8 protons + 8 neutrons) and 8 <b>electrons</b> around it (2 in shell 1, 6 in shell 2). The atom is neutral.' } },
          { dur: 7, cam: cams[4], cap: { uz: "<b>Ion</b> — elektron bergan yoki olgan zaryadli zarracha. Natriy atomi 1 ta elektronini xlorga beradi: <b>Na → Na⁺</b> (musbat ion), <b>Cl → Cl⁻</b> (manfiy ion). Ular tortishib osh tuzini (NaCl) hosil qiladi.", en: 'An <b>ion</b> is a charged particle that has lost or gained electrons. Sodium gives one electron to chlorine: <b>Na → Na⁺</b> (positive ion), <b>Cl → Cl⁻</b> (negative ion). They attract to form table salt (NaCl).' }, eq: 'Na − e⁻ → Na⁺ &nbsp;&nbsp; Cl + e⁻ → Cl⁻', f(p) { eK = ease(seg(p, 0.15, 0.55)); const q = ease(seg(p, 0.6, 0.95)); na.position.x = lerp(-0.7, -0.33, q); cl.position.x = lerp(0.7, 0.33, q); na.scale.setScalar(lerp(1, 0.75, eK)); cl.scale.setScalar(lerp(1, 1.35, eK)); if (eK > 0.95) { lNa.setText('Na⁺'); lCl.setText('Cl⁻'); lE.set(0); } } },
          { dur: 4, cam: { pos: [32, 0.8, 3.6], target: [32, 0, 0] }, cap: { uz: "<b>Xulosa:</b> barcha moddalar atom, molekula yoki ionlardan tashkil topgan. Masalan: geliy — atomlardan, suv — molekulalardan, osh tuzi — ionlardan.", en: '<b>Summary:</b> all substances are made of atoms, molecules or ions. For example: helium — atoms, water — molecules, table salt — ions.' }, f() { eK = 1; na.position.x = -0.33; cl.position.x = 0.33; na.scale.setScalar(0.75); cl.scale.setScalar(1.35); lNa.setText('Na⁺'); lCl.setText('Cl⁻'); lE.set(0); } },
        ],
        loop(dt, s, c) {
          ice.rotation.y += dt * 0.4; ice.rotation.x = 0.3; lat.rotation.y += dt * 0.25; one.rotation.y += dt * 0.6;
          eO.forEach((e) => { e.userData.a += dt * 1.6 / e.userData.r; e.position.set(Math.cos(e.userData.a) * e.userData.r, 0, Math.sin(e.userData.a) * e.userData.r); }); oat.rotation.x = 0.4;
          const a = c.t * 3; const orb = V(-0.7 + Math.cos(a) * 0.5, Math.sin(a) * 0.15, Math.sin(a) * 0.5);
          const dst = V(0.7 + Math.cos(a) * 0.45, Math.sin(a) * 0.12, Math.sin(a) * 0.45);
          el.position.lerpVectors(orb, dst, eK); el.visible = eK < 0.97;
        }
      };
    }
  });
})();
