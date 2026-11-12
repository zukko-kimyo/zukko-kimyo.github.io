/* Tajribalar — 7-qism: 8-sinf (amfoterlik, galogenlar, sulfat ioni, ammiak, alanga, kristall panjara, muvozanat, reaksiya tezligi) */
(function () {
  const T = THREE, { clamp, lerp, ease, seg, rng } = Lab.m, M = Lab.M, P = Lab.profiles, { at, V } = Lab.util;
  const C = (h) => new T.Color(h);
  const tint = (v, c, k) => Lab.util.tint(v, c, k);
  const dropper = (s, c) => Lab.util.dropper(s, c);
  const clock = (s, x, y, z) => Lab.util.clock(s, x, y, z);

  /* ---- yordamchilar ---- */
  function rack(scene, w = 1.6) {
    const g = new T.Group(); const top = new T.Mesh(new T.BoxGeometry(w, 0.04, 0.26), M.wood()); top.position.y = 0.42; g.add(top);
    const base = new T.Mesh(new T.BoxGeometry(w, 0.04, 0.26), M.wood()); base.position.y = 0.02; g.add(base);
    [-w / 2 + 0.02, w / 2 - 0.02].forEach((x) => { const s = new T.Mesh(new T.BoxGeometry(0.04, 0.44, 0.26), M.wood()); s.position.set(x, 0.22, 0); g.add(s); }); scene.add(g); return g;
  }
  function tubes(ctx, specs, x0, dx, opts = {}) {
    return specs.map((s, i) => {
      const x = x0 + i * dx; const v = ctx.add(at(Lab.vessel(P.tube(0.1, 0.95), { color: s.c || 0xe6f3ff, opacity: 0.4, level: 0.4 }), x, 0.04, 0));
      v.setFrac(opts.frac || 0.62); tint(v, C(s.c || 0xe6f3ff), s.k || 0);
      const L = ctx.label(s.n, v.group, [0, -0.06, 0.25]); const R = ctx.label('', v.group, [0, 1.06 + (i % 2) * 0.12, 0], s.cls || 'tag');
      const pr = new T.Mesh(new T.CylinderGeometry(0.082, 0.07, 1, 20), new T.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 })); pr.position.set(x, 0.05, 0); pr.scale.y = 0.001; pr.visible = false; ctx.scene.add(pr);
      return { v, L, R, x, pr, base: C(s.c || 0xe6f3ff), setPpt(k, col) { pr.visible = k > 0.01; pr.material.color.set(col); pr.scale.y = 0.001 + 0.11 * k; pr.position.y = 0.045 + 0.055 * k; } };
    });
  }
  function dose(dp, dd, x, q, col, z = 0) { // dropper over tube x, q 0..1
    const mv = ease(seg(q, 0, 0.25)) * (1 - ease(seg(q, 0.75, 1))); dp.g.position.set(x, lerp(1.5, 1.12, mv), lerp(-0.45, z, mv));
    if (q > 0.25 && q < 0.7) { dd.from = () => V(x, 1.1, z); if (col != null) dd.mat.color.set(col); dd.rate = 7; }
  }
  const any = (p, n) => { const k = p * n; return k - Math.floor(k) > 0.25 && k - Math.floor(k) < 0.7; };

  /* 1. Rux gidroksidining amfoterligi — 8-sinf, 3-dars */
  Lab.def({
    id: 'zn-amphoteric', icon: '⚗️', grade: [8], lessons: [[8, 3], [8, 2]],
    title: { uz: 'Rux gidroksidi: ham kislotada, ham ishqorda eriydi', en: 'Zinc hydroxide dissolves in both acid and alkali' },
    desc: { uz: "ZnSO₄ eritmasiga NaOH qo'shilsa oq Zn(OH)₂ cho'kmasi tushadi. Cho'kma xlorid kislotada ham, ortiqcha ishqorda ham eriydi — Zn(OH)₂ amfoter gidroksid.", en: 'Adding NaOH to ZnSO₄ solution gives a white Zn(OH)₂ precipitate. It dissolves both in hydrochloric acid and in excess alkali — Zn(OH)₂ is amphoteric.' },
    cam: { pos: [0, 1.22, 2.4], target: [0, 0.64, 0] },
    build(ctx) {
      const { scene } = ctx; rack(scene, 1.3);
      const t = tubes(ctx, [{ n: { uz: 'Nazorat', en: 'Control' } }, { n: { uz: '+ HCl', en: '+ HCl' } }, { n: { uz: '+ ortiqcha NaOH', en: '+ excess NaOH' } }], -0.4, 0.4);
      const dA = dropper(scene, 0xeef7ff), dB = dropper(scene, 0xfff0f0);
      const dd = Lab.drops(scene, { color: 0xeef7ff, from: () => V(0, 1.1, 0), to: () => 0.45 });
      const lt = ctx.label({ uz: 'ZnSO₄ eritmasi', en: 'ZnSO₄ solution' }, t[1].v.group, [0, 1.25, 0], 'micro');
      const milky = C(0xf4f6f8), clear = C(0xe6f3ff);
      return {
        reset() { t.forEach((x) => { tint(x.v, clear, 0); x.setPpt(0, 0xffffff); x.R.set(0); x.v.setFrac(0.62); }); dA.g.position.set(-0.4, 1.5, -0.45); dB.g.position.set(0.4, 1.5, -0.45); dd.rate = 0; lt.set(1); },
        steps: [
          { dur: 3.5, cap: { uz: "Uch probirkada <b>rux sulfat (ZnSO₄)</b> eritmasi. Unga tomchilab <b>natriy gidroksid (NaOH)</b> qo'shamiz.", en: 'Three test tubes hold <b>zinc sulfate (ZnSO₄)</b> solution. We add <b>sodium hydroxide (NaOH)</b> drop by drop.' } },
          { dur: 7, cap: { uz: "Har bir probirkada <b>oq iviqsimon cho'kma</b> — <b>Zn(OH)₂</b> hosil bo'ldi.", en: 'A <b>white gelatinous precipitate</b> of <b>Zn(OH)₂</b> forms in each tube.' }, eq: 'ZnSO₄ + 2NaOH → Zn(OH)₂↓ + Na₂SO₄',
            f(p) { lt.set(1 - seg(p, 0, 0.2)); dd.rate = 0; t.forEach((x, i) => { const q = seg(p, i / 3, (i + 1) / 3); dose(dA, dd, x.x, q, 0xeef7ff); const k = ease(seg(q, 0.3, 1)); tint(x.v, clear.clone().lerp(milky, k), 0.75 * k); x.setPpt(k, 0xffffff); x.v.setFrac(0.62 + 0.03 * k); }); if (!any(p, 3)) dd.rate = 0; } },
          { dur: 6, cap: { uz: "2-probirkaga <b>xlorid kislota</b> qo'shamiz — cho'kma <b>eriydi</b>, eritma tiniqlashadi. Zn(OH)₂ bu yerda <b>asos</b> kabi reaksiyaga kirishdi.", en: 'We add <b>hydrochloric acid</b> to tube 2 — the precipitate <b>dissolves</b> and the solution clears. Here Zn(OH)₂ reacts like a <b>base</b>.' }, eq: 'Zn(OH)₂ + 2HCl → ZnCl₂ + 2H₂O',
            f(p) { t.forEach((x) => { tint(x.v, milky, 0.75); x.setPpt(1, 0xffffff); x.v.setFrac(0.65); }); dd.rate = 0; dose(dB, dd, t[1].x, seg(p, 0, 0.6), 0xffe8e8); const k = ease(seg(p, 0.35, 1)); tint(t[1].v, milky.clone().lerp(clear, k), 0.75 * (1 - k)); t[1].setPpt(1 - k, 0xffffff); t[1].v.setFrac(0.65 + 0.04 * k); t[1].R.setText({ uz: "Eridi — asos xossasi", en: 'Dissolved — basic' }); t[1].R.set(seg(p, 0.8, 0.95)); } },
          { dur: 6, cap: { uz: "3-probirkaga <b>ortiqcha NaOH</b> qo'shamiz — cho'kma bu safar ham <b>eriydi</b>! Endi Zn(OH)₂ <b>kislota</b> kabi reaksiyaga kirishdi.", en: 'We add <b>excess NaOH</b> to tube 3 — the precipitate <b>dissolves</b> again! Now Zn(OH)₂ reacts like an <b>acid</b>.' }, eq: 'Zn(OH)₂ + 2NaOH → Na₂[Zn(OH)₄]',
            f(p) { tint(t[1].v, clear, 0); t[1].setPpt(0, 0xffffff); t[1].R.set(1); dd.rate = 0; dose(dA, dd, t[2].x, seg(p, 0, 0.6), 0xeef7ff); const k = ease(seg(p, 0.35, 1)); tint(t[2].v, milky.clone().lerp(clear, k), 0.75 * (1 - k)); t[2].setPpt(1 - k, 0xffffff); t[2].v.setFrac(0.65 + 0.05 * k); t[2].R.setText({ uz: 'Eridi — kislota xossasi', en: 'Dissolved — acidic' }); t[2].R.set(seg(p, 0.8, 0.95)); } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> Zn(OH)₂ ham kislota, ham ishqor bilan reaksiyaga kirishadi — u <b>amfoter gidroksid</b>. 1-probirka (nazorat) o'zgarmay qoldi. Al(OH)₃ ham amfoter.", en: '<b>Conclusion:</b> Zn(OH)₂ reacts with both acids and alkalis — it is an <b>amphoteric hydroxide</b>. Tube 1 (control) stayed unchanged. Al(OH)₃ is amphoteric too.' },
            f() { tint(t[2].v, clear, 0); t[2].setPpt(0, 0xffffff); t[1].R.set(1); t[2].R.set(1); t[0].R.setText({ uz: "Cho'kma qoldi", en: 'Precipitate stays' }); t[0].R.set(1); } },
        ],
        loop(dt) { dd.tick(dt); }, clear() { dd.clear(); }
      };
    }
  });

  /* 2. Galogenid ionlari + AgNO₃ va yod + kraxmal — 8-sinf, 32-dars */
  Lab.def({
    id: 'silver-halides', icon: '🧂', grade: [8], lessons: [[8, 32], [8, 31], [8, 37], [8, 33]],
    title: { uz: "Galogenidlarning sifat reaksiyalari (AgNO₃ va kraxmal)", en: 'Tests for halides (AgNO₃) and iodine (starch)' },
    desc: { uz: "Kumush nitrat Cl⁻ bilan oq, Br⁻ bilan och sariq, I⁻ bilan sariq cho'kma beradi. Yod kraxmalni ko'k-qora rangga bo'yaydi.", en: 'Silver nitrate gives a white precipitate with Cl⁻, pale yellow with Br⁻ and yellow with I⁻. Iodine turns starch blue-black.' },
    cam: { pos: [0, 1.22, 2.4], target: [0, 0.64, 0] },
    build(ctx) {
      const { scene } = ctx; rack(scene, 1.7);
      const t = tubes(ctx, [{ n: 'NaCl' }, { n: 'NaBr' }, { n: 'NaI' }, { n: { uz: 'Yodli suv', en: 'Iodine water' }, c: 0xd9a54a, k: 0.35 }], -0.6, 0.4);
      const dA = dropper(scene, 0xf2f6fa), dS = dropper(scene, 0xf5f5ef);
      const dd = Lab.drops(scene, { color: 0xf2f6fa, from: () => V(0, 1.1, 0), to: () => 0.45 });
      const res = [[0xffffff, { uz: 'AgCl — oq', en: 'AgCl — white' }], [0xf6e7a6, { uz: 'AgBr — och sariq', en: 'AgBr — pale yellow' }], [0xf2cf38, { uz: 'AgI — sariq', en: 'AgI — yellow' }]];
      const lA = ctx.label({ uz: 'AgNO₃ eritmasi', en: 'AgNO₃ solution' }, dA.g, [0, 0.55, 0], 'micro');
      const clear = C(0xe6f3ff), io = C(0xd9a54a), blue = C(0x1b1c5e);
      return {
        reset() { t.forEach((x, i) => { tint(x.v, i === 3 ? io : clear, i === 3 ? 0.35 : 0); x.setPpt(0, 0xffffff); x.R.set(0); }); dA.g.position.set(-0.6, 1.5, -0.45); dS.g.position.set(0.6, 1.5, -0.45); dd.rate = 0; lA.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "Uch probirkada <b>NaCl, NaBr va NaI</b> eritmalari — hammasi rangsiz, ko'rinishidan farqlab bo'lmaydi. To'rtinchisida <b>yodli suv</b>.", en: 'Three tubes hold <b>NaCl, NaBr and NaI</b> solutions — all colourless and impossible to tell apart. The fourth holds <b>iodine water</b>.' } },
          { dur: 9, cap: { uz: "Har biriga <b>kumush nitrat (AgNO₃)</b> tomizamiz. Cho'kmalar rangi har xil: <b>AgCl — oq, AgBr — och sariq, AgI — sariq</b>.", en: 'We add <b>silver nitrate (AgNO₃)</b> to each. The precipitates differ in colour: <b>AgCl white, AgBr pale yellow, AgI yellow</b>.' }, eq: 'Ag⁺ + Cl⁻ → AgCl↓ · Ag⁺ + Br⁻ → AgBr↓ · Ag⁺ + I⁻ → AgI↓',
            f(p) { lA.set(seg(p, 0, 0.1) * (1 - seg(p, 0.3, 0.4))); dd.rate = 0; for (let i = 0; i < 3; i++) { const x = t[i]; const q = seg(p, i / 3, (i + 1) / 3); dose(dA, dd, x.x, q, 0xf2f6fa); const k = ease(seg(q, 0.3, 1)); tint(x.v, clear.clone().lerp(C(res[i][0]), k), 0.8 * k); x.setPpt(k, res[i][0]); x.R.setText(res[i][1]); x.R.set(seg(q, 0.85, 1)); } if (!any(p, 3)) dd.rate = 0; } },
          { dur: 5.5, cap: { uz: "Yodli suvga <b>kraxmal</b> eritmasini qo'shamiz — eritma <b>ko'k-qora</b> rangga kiradi. Bu yodning sifat reaksiyasi.", en: 'We add <b>starch</b> solution to the iodine water — it turns <b>blue-black</b>. This is the test for iodine.' },
            f(p) { for (let i = 0; i < 3; i++) { tint(t[i].v, C(res[i][0]), 0.8); t[i].setPpt(1, res[i][0]); t[i].R.set(1); } dd.rate = 0; dose(dS, dd, t[3].x, seg(p, 0, 0.6), 0xf5f5ef); const k = ease(seg(p, 0.35, 0.9)); tint(t[3].v, io.clone().lerp(blue, k), lerp(0.35, 1, k)); t[3].R.setText({ uz: "Ko'k-qora — yod bor", en: 'Blue-black — iodine' }); t[3].R.set(seg(p, 0.85, 1)); } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> galogenid ionlarini <b>AgNO₃</b> bilan cho'kma rangiga qarab ajratamiz; yodni <b>kraxmal</b> bilan aniqlaymiz. Xlorid kislota ham AgNO₃ bilan oq AgCl beradi.", en: '<b>Conclusion:</b> halide ions are told apart by the colour of the precipitate with <b>AgNO₃</b>; iodine is detected with <b>starch</b>. Hydrochloric acid also gives white AgCl with AgNO₃.' },
            f() { t.forEach((x, i) => { x.R.set(1); if (i < 3) { tint(x.v, C(res[i][0]), 0.8); x.setPpt(1, res[i][0]); } else tint(x.v, blue, 1); }); } },
        ],
        loop(dt) { dd.tick(dt); }, clear() { dd.clear(); }
      };
    }
  });

  /* 3. Galogenlarning bir-birini siqib chiqarishi — 8-sinf, 35-dars */
  Lab.def({
    id: 'halogen-displace', icon: '🟤', grade: [8], lessons: [[8, 35], [8, 34], [8, 26]],
    title: { uz: "Galogenlar bir-birini siqib chiqaradi", en: 'Halogens displace one another' },
    desc: { uz: "Xlorli suv KBr eritmasidan bromni (sariq-qo'ng'ir), KI eritmasidan yodni (qo'ng'ir) siqib chiqaradi, KCl bilan reaksiya bormaydi. Oksidlovchilik: Cl₂ > Br₂ > I₂.", en: 'Chlorine water releases bromine (yellow-brown) from KBr and iodine (brown) from KI, but does not react with KCl. Oxidizing power: Cl₂ > Br₂ > I₂.' },
    cam: { pos: [0, 1.22, 2.4], target: [0, 0.64, 0] },
    build(ctx) {
      const { scene } = ctx; rack(scene, 1.3);
      const t = tubes(ctx, [{ n: 'KCl' }, { n: 'KBr' }, { n: 'KI' }], -0.4, 0.4);
      const dC = dropper(scene, 0xdcefb0), dS = dropper(scene, 0xf5f5ef);
      const dd = Lab.drops(scene, { color: 0xdcefb0, from: () => V(0, 1.1, 0), to: () => 0.45 });
      const lC = ctx.label({ uz: 'Xlorli suv (Cl₂)', en: 'Chlorine water (Cl₂)' }, dC.g, [0, 0.55, 0], 'micro');
      const fin = [[0xe8f4d8, 0.1, { uz: "O'zgarmadi", en: 'No change' }], [0xd9781c, 0.8, { uz: 'Br₂ ajraldi', en: 'Br₂ released' }], [0x6b2c0c, 0.95, { uz: 'I₂ ajraldi', en: 'I₂ released' }]];
      const clear = C(0xe6f3ff);
      return {
        reset() { t.forEach((x) => { tint(x.v, clear, 0); x.R.set(0); }); dC.g.position.set(-0.4, 1.5, -0.45); dS.g.position.set(0.4, 1.5, -0.45); dd.rate = 0; lC.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "Probirkalarda <b>KCl, KBr va KI</b> rangsiz eritmalari. Ularga <b>xlorli suv</b> qo'shamiz.", en: 'The tubes hold colourless <b>KCl, KBr and KI</b> solutions. We add <b>chlorine water</b>.' } },
          { dur: 9.5, cap: { uz: "KCl — o'zgarish yo'q. KBr — eritma <b>sariq-qo'ng'ir</b> (brom ajraldi). KI — eritma <b>qo'ng'ir</b> (yod ajraldi). Kuchliroq galogen kuchsizini birikmasidan <b>siqib chiqaradi</b>.", en: 'KCl — no change. KBr — the solution turns <b>yellow-brown</b> (bromine). KI — it turns <b>brown</b> (iodine). A stronger halogen <b>displaces</b> a weaker one.' }, eq: 'Cl₂ + 2KBr → 2KCl + Br₂ · Cl₂ + 2KI → 2KCl + I₂',
            f(p) { lC.set(seg(p, 0, 0.1) * (1 - seg(p, 0.3, 0.4))); dd.rate = 0; t.forEach((x, i) => { const q = seg(p, i / 3, (i + 1) / 3); dose(dC, dd, x.x, q, 0xdcefb0); const k = ease(seg(q, 0.3, 1)); tint(x.v, clear.clone().lerp(C(fin[i][0]), k), fin[i][1] * k); x.R.setText(fin[i][2]); x.R.set(seg(q, 0.85, 1)); }); if (!any(p, 3)) dd.rate = 0; } },
          { dur: 5, cap: { uz: "KI probirkasiga <b>kraxmal</b> qo'shamiz — <b>ko'k</b> rang. Demak, haqiqatan ham <b>yod</b> ajralgan.", en: 'Adding <b>starch</b> to the KI tube gives a <b>blue</b> colour — so <b>iodine</b> really was released.' },
            f(p) { t.forEach((x, i) => { tint(x.v, C(fin[i][0]), fin[i][1]); x.R.set(1); }); dd.rate = 0; dose(dS, dd, t[2].x, seg(p, 0, 0.6), 0xf5f5ef); const k = ease(seg(p, 0.35, 0.9)); tint(t[2].v, C(fin[2][0]).lerp(C(0x1b1c5e), k), lerp(0.85, 1, k)); } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> oksidlovchilik kuchi <b>Cl₂ > Br₂ > I₂</b>. Br₂ ham KI dan yodni siqib chiqaradi, lekin I₂ KCl yoki KBr bilan reaksiyaga kirishmaydi.", en: '<b>Conclusion:</b> oxidizing power is <b>Cl₂ > Br₂ > I₂</b>. Br₂ also displaces iodine from KI, but I₂ does not react with KCl or KBr.' }, eq: 'Br₂ + 2KI → 2KBr + I₂ · I₂ + KCl → ✘',
            f() { t.forEach((x, i) => { tint(x.v, i === 2 ? C(0x1b1c5e) : C(fin[i][0]), i === 2 ? 1 : fin[i][1]); x.R.set(1); }); } },
        ],
        loop(dt) { dd.tick(dt); }, clear() { dd.clear(); }
      };
    }
  });

  /* 4. Yodning suv va benzindagi erishi — 8-sinf, 36-dars */
  Lab.def({
    id: 'iodine-solvent', icon: '🟣', grade: [8], lessons: [[8, 36]],
    title: { uz: "Yod suvda va benzinda: qayerda yaxshi eriydi?", en: 'Iodine in water and in petrol: where does it dissolve better?' },
    desc: { uz: "Yod suvda kam eriydi (och sariq-qo'ng'ir). Benzin qo'shib chayqatilsa, yod yuqoridagi benzin qatlamiga o'tib, uni binafsha rangga bo'yaydi — qutbsiz modda qutbsiz erituvchida yaxshi eriydi.", en: 'Iodine barely dissolves in water (pale yellow-brown). Shake with petrol and the iodine moves into the top petrol layer, colouring it violet — nonpolar dissolves in nonpolar.' },
    cam: { pos: [0, 1.05, 1.7], target: [0, 0.55, 0] },
    build(ctx) {
      const { scene } = ctx;
      const st = Lab.stand(1.3); st.group.position.set(0.12, 0, 0); scene.add(st.group); st.addRing(0.85, 0.1);
      const tb = Lab.vessel(P.tube(0.12, 1.0), { color: 0xd9a54a, opacity: 0.45, level: 0.4 }); const grp = new T.Group(); grp.add(tb.group); grp.position.set(0, 0.12, 0); scene.add(grp); tb.setFrac(0.32); tint(tb, C(0xd9a54a), 0.3);
      const top = new T.Mesh(new T.CylinderGeometry(0.105, 0.105, 1, 24), M.liquid(0xf5f3e6, 0.5)); top.renderOrder = 6; grp.add(top); top.visible = false;
      const bott = C(0xd9a54a), violet = C(0x7a2fa0);
      const lW = ctx.label({ uz: 'Suv + yod', en: 'Water + iodine' }, grp, [0.3, 0.15, 0], 'tag'), lP = ctx.label({ uz: 'Benzin', en: 'Petrol' }, grp, [0.3, 0.42, 0], 'tag');
      const cr = []; for (let i = 0; i < 6; i++) { const m = new T.Mesh(new T.OctahedronGeometry(0.016), M.std(0x3a2350, { metalness: 0.6, roughness: 0.3 })); m.position.set((i - 2.5) * 0.02, 0.03, 0.02 * (i % 2)); grp.add(m); cr.push(m); }
      const setTop = (h) => { top.visible = h > 0.005; top.scale.y = Math.max(0.001, h); top.position.y = tb.level + h / 2; };
      return {
        reset() { grp.rotation.set(0, 0, 0); tb.setFrac(0.32); tint(tb, bott, 0.3); setTop(0); top.material.color.set(0xf5f3e6); lW.set(0); lP.set(0); cr.forEach((m) => (m.visible = true)); },
        steps: [
          { dur: 4, cap: { uz: "Probirkada <b>yod kristallari</b> va suv. Yod suvda juda <b>kam eriydi</b> — eritma och sariq-qo'ng'ir, kristallar deyarli erimay qolgan.", en: 'The tube holds <b>iodine crystals</b> and water. Iodine <b>barely dissolves</b> — the solution is pale yellow-brown and the crystals hardly dissolve.' }, f(p) { lW.set(seg(p, 0.3, 0.5)); } },
          { dur: 4.5, cap: { uz: "Ustiga <b>benzin</b> quyamiz. Benzin suvda erimaydi va suvdan yengil — <b>yuqorida alohida qatlam</b> hosil qiladi.", en: 'We pour <b>petrol</b> on top. Petrol does not mix with water and is lighter — it forms a <b>separate top layer</b>.' }, f(p) { lW.set(1); setTop(0.2 * ease(p)); lP.set(seg(p, 0.6, 0.8)); } },
          { dur: 5, cap: { uz: "Probirkani yopib <b>chayqatamiz</b>…", en: 'We stopper the tube and <b>shake</b> it…' }, f(p) { setTop(0.2); grp.rotation.z = Math.sin(p * 40) * 0.35 * Math.sin(Math.PI * p); const k = ease(p); top.material.color.copy(C(0xf5f3e6).lerp(violet, k * 0.6)); tint(tb, bott, 0.3 * (1 - 0.5 * k)); cr.forEach((m) => (m.visible = p < 0.6)); } },
          { dur: 5.5, cap: { uz: "Qatlamlar ajraldi: yuqoridagi <b>benzin binafsha</b> rangga kirdi, pastdagi suv deyarli rangsizlandi. Yod suvdan benzinga o'tdi — bu <b>ekstraksiya</b>.", en: 'The layers separate: the top <b>petrol layer is violet</b>, the water below is almost colourless. The iodine moved from water to petrol — this is <b>extraction</b>.' }, f(p) { grp.rotation.z = 0; setTop(0.2); top.material.color.copy(C(0xf5f3e6).lerp(violet, 0.6 + 0.4 * ease(p))); tint(tb, bott.clone().lerp(C(0xf3efe0), ease(p)), 0.15 * (1 - p)); cr.forEach((m) => (m.visible = false)); lP.setText({ uz: 'Benzin + yod (binafsha)', en: 'Petrol + iodine (violet)' }); lW.setText({ uz: 'Suv (deyarli rangsiz)', en: 'Water (almost colourless)' }); } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> galogen molekulalari <b>qutbsiz</b>, shuning uchun ular qutbsiz organik erituvchilarda yaxshi eriydi: «<b>o'xshash o'xshashda eriydi</b>».", en: '<b>Conclusion:</b> halogen molecules are <b>nonpolar</b>, so they dissolve well in nonpolar organic solvents: “<b>like dissolves like</b>”.' }, f() { setTop(0.2); top.material.color.copy(violet); tint(tb, C(0xf3efe0), 0); } },
        ]
      };
    }
  });

  /* 5. Sulfat ioniga sifat reaksiyasi — 8-sinf, 48-dars */
  Lab.def({
    id: 'sulfate-test', icon: '⚪', grade: [8], lessons: [[8, 48], [8, 52], [8, 54], [8, 47]],
    title: { uz: "Sulfat ioniga sifat reaksiyasi (BaCl₂)", en: 'Test for sulfate ions (BaCl₂)' },
    desc: { uz: "BaCl₂ eritmasi sulfatlar bilan oq BaSO₄ cho'kmasini beradi; u xlorid kislotada erimaydi. NaCl eritmasi cho'kma bermaydi.", en: 'BaCl₂ gives a white BaSO₄ precipitate with sulfates that does not dissolve in hydrochloric acid. NaCl solution gives no precipitate.' },
    cam: { pos: [0, 1.22, 2.4], target: [0, 0.64, 0] },
    build(ctx) {
      const { scene } = ctx; rack(scene, 1.7);
      const t = tubes(ctx, [{ n: 'Na₂SO₄' }, { n: 'CuSO₄', c: 0x2f8fe0, k: 0.75 }, { n: 'H₂SO₄' }, { n: 'NaCl' }], -0.6, 0.4);
      const dB = dropper(scene, 0xf2f6fa), dH = dropper(scene, 0xfff0f0);
      const dd = Lab.drops(scene, { color: 0xf2f6fa, from: () => V(0, 1.1, 0), to: () => 0.45 });
      const lB = ctx.label({ uz: 'BaCl₂ eritmasi', en: 'BaCl₂ solution' }, dB.g, [0, 0.55, 0], 'micro');
      const has = [1, 1, 1, 0];
      return {
        reset() { t.forEach((x, i) => { tint(x.v, x.base, i === 1 ? 0.75 : 0); x.setPpt(0, 0xffffff); x.R.set(0); }); dB.g.position.set(-0.6, 1.5, -0.45); dH.g.position.set(0.6, 1.5, -0.45); dd.rate = 0; lB.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "To'rtta eritma: <b>Na₂SO₄, CuSO₄, H₂SO₄</b> va <b>NaCl</b>. Qaysilarida sulfat ioni (SO₄²⁻) bor?", en: 'Four solutions: <b>Na₂SO₄, CuSO₄, H₂SO₄</b> and <b>NaCl</b>. Which contain the sulfate ion (SO₄²⁻)?' } },
          { dur: 10, cap: { uz: "Har biriga <b>bariy xlorid (BaCl₂)</b> tomizamiz. Uchta probirkada <b>oq cho'kma — BaSO₄</b>. NaCl da cho'kma yo'q.", en: 'We add <b>barium chloride (BaCl₂)</b> to each. Three tubes give a <b>white precipitate — BaSO₄</b>. NaCl gives none.' }, eq: 'Ba²⁺ + SO₄²⁻ → BaSO₄↓',
            f(p) { lB.set(seg(p, 0, 0.08) * (1 - seg(p, 0.25, 0.32))); dd.rate = 0; t.forEach((x, i) => { const q = seg(p, i / 4, (i + 1) / 4); dose(dB, dd, x.x, q, 0xf2f6fa); const k = ease(seg(q, 0.3, 1)) * has[i]; tint(x.v, x.base.clone().lerp(C(0xf4f6f8), i === 1 ? 0.15 * k : k), (i === 1 ? 0.75 : 0.5 * k)); x.setPpt(k, 0xffffff); x.R.setText(has[i] ? { uz: "Oq cho'kma", en: 'White ppt' } : { uz: "Cho'kma yo'q", en: 'No ppt' }); x.R.set(seg(q, 0.85, 1)); }); if (!any(p, 4)) dd.rate = 0; } },
          { dur: 6, cap: { uz: "Cho'kmalarga <b>xlorid kislota</b> qo'shamiz — BaSO₄ <b>erimaydi</b>. Bu sulfat ionini boshqa ionlardan (masalan, karbonatdan) ajratadi.", en: 'We add <b>hydrochloric acid</b> to the precipitates — BaSO₄ <b>does not dissolve</b>. This distinguishes sulfate from other ions such as carbonate.' },
            f(p) { t.forEach((x, i) => { tint(x.v, x.base.clone().lerp(C(0xf4f6f8), i === 1 ? 0.15 : has[i]), i === 1 ? 0.75 : 0.5 * has[i]); x.setPpt(has[i], 0xffffff); x.R.set(1); }); dd.rate = 0; for (let i = 0; i < 3; i++) dose(dH, dd, t[i].x, seg(p, i / 3, (i + 1) / 3), 0xffe8e8); if (!any(p, 3)) dd.rate = 0; } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> sulfat ionining sifat reaksiyasi — <b>Ba²⁺</b> bilan kislotada erimaydigan oq BaSO₄. ⚠️ Eruvchan bariy tuzlari <b>zaharli</b> — ular bilan faqat o'qituvchi nazoratida ishlanadi.", en: '<b>Conclusion:</b> the sulfate test is <b>Ba²⁺</b> giving white BaSO₄ that is insoluble in acid. ⚠️ Soluble barium salts are <b>toxic</b> — use them only under supervision.' },
            f() { t.forEach((x, i) => { x.setPpt(has[i], 0xffffff); x.R.set(1); }); } },
        ],
        loop(dt) { dd.tick(dt); }, clear() { dd.clear(); }
      };
    }
  });

  /* 6. Konsentrlangan sulfat kislota shakarni ko'mirlashtiradi — 8-sinf, 47-dars */
  Lab.def({
    id: 'sugar-char', icon: '⬛', grade: [8], lessons: [[8, 47], [8, 51]],
    title: { uz: "Sulfat kislota va shakar: «qora ilon»", en: 'Sulfuric acid and sugar: the “black snake”' },
    desc: { uz: "Konsentrlangan H₂SO₄ shakardan suvni tortib oladi: oq shakar qoraygan, g'ovak ko'mir ustuniga aylanib, stakandan ko'tariladi va bug' chiqadi.", en: 'Concentrated H₂SO₄ pulls water out of sugar: white sugar turns into a black, porous column of carbon that rises out of the beaker, releasing steam.' },
    cam: { pos: [0, 1.2, 2.0], target: [0, 0.5, 0] },
    build(ctx) {
      const { scene } = ctx;
      const b = ctx.add(at(Lab.vessel(P.beaker(0.24, 0.55), { color: 0xffffff, opacity: 0.2, level: 0.02 }), 0, 0, 0));
      const sugar = new T.Mesh(new T.CylinderGeometry(0.2, 0.21, 1, 32), M.std(0xfbfbf6, { roughness: 1 })); scene.add(sugar);
      const col = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 1, 28, 6), M.std(0x161310, { roughness: 1 })); scene.add(col);
      const R = rng(9); const pos = col.geometry.attributes.position; for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), z = pos.getZ(i); const k = 1 + (R() - 0.5) * 0.18; pos.setX(i, x * k); pos.setZ(i, z * k); } col.geometry.computeVertexNormals();
      const acid = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 1, 8), M.liquid(0xf3f0d0, 0.7)); scene.add(acid);
      const btl = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.3, 20), M.glass({ opacity: 0.3 })); scene.add(btl);
      const steam = Lab.puffs(scene, { origin: () => V(0, col.position.y + col.scale.y / 2, 0), size: 0.25, op: 0.3, life: 2, spread: 0.12, vel: V(0, 0.35, 0) });
      const lE = ctx.label({ uz: 'C (ko‘mir)', en: 'C (carbon)' }, col, [0.32, 0, 0], 'tag'), lS = ctx.label({ uz: 'Suv bug‘i', en: 'Steam' }, b.group, [0, 1.25, 0], 'micro');
      const setSugar = (h, c) => { sugar.visible = h > 0.002; sugar.scale.y = Math.max(0.001, h); sugar.position.y = 0.02 + h / 2; sugar.material.color.copy(c); };
      const setCol = (h) => { col.visible = h > 0.01; col.scale.y = Math.max(0.001, h); col.position.y = 0.02 + h / 2; };
      return {
        reset() { setSugar(0.14, C(0xfbfbf6)); setCol(0); acid.visible = false; btl.position.set(0.32, 0.95, 0); btl.rotation.z = 0; steam.rate = 0; lE.set(0); lS.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "Stakanda <b>shakar</b> (C₁₂H₂₂O₁₁). Unga ozgina <b>konsentrlangan sulfat kislota</b> quyamiz. ⚠️ Faqat o'qituvchi, mo'ri ostida!", en: 'The beaker holds <b>sugar</b> (C₁₂H₂₂O₁₁). We pour in a little <b>concentrated sulfuric acid</b>. ⚠️ Teacher only, in a fume cupboard!' } },
          { dur: 4, cap: { uz: "Kislota quyildi — shakar <b>sarg'ayib, keyin qo'ng'irlasha</b> boshladi.", en: 'The acid is added — the sugar starts to turn <b>yellow, then brown</b>.' }, f(p) { btl.rotation.z = lerp(0, 1.9, ease(seg(p, 0, 0.3))); btl.position.set(lerp(0.32, 0.12, ease(seg(p, 0, 0.3))), 0.95, 0); acid.visible = p > 0.3 && p < 0.8; acid.scale.y = 0.75; acid.position.set(0.05, 0.55, 0); setSugar(0.14, C(0xfbfbf6).lerp(C(0x8a5a22), ease(seg(p, 0.4, 1)))); } },
          { dur: 8, cap: { uz: "Shiddatli reaksiya! Kislota shakardan <b>suvni tortib oladi</b>: qora, g'ovak <b>ko'mir ustuni</b> stakandan ko'tariladi, <b>bug'</b> chiqadi, aralashma qiziydi.", en: 'A vigorous reaction! The acid <b>removes water</b> from the sugar: a black porous <b>column of carbon</b> rises out of the beaker, <b>steam</b> escapes and it gets hot.' }, eq: 'C₁₂H₂₂O₁₁ → 12C + 11H₂O (H₂SO₄)',
            f(p) { acid.visible = false; btl.position.set(0.32, 0.95, 0); btl.rotation.z = 0; setSugar(0.14 * (1 - seg(p, 0, 0.3)), C(0x3a2a18)); setCol(lerp(0.12, 0.95, ease(seg(p, 0.05, 1)))); steam.rate = 10 * seg(p, 0.05, 0.2); lE.set(seg(p, 0.4, 0.6)); lS.set(seg(p, 0.2, 0.4)); } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> konsentrlangan H₂SO₄ — kuchli <b>suv tortuvchi (gigroskopik)</b> modda. U organik moddalarni ko'mirlashtiradi, shuning uchun teri va kiyimni kuydiradi. Suyultirishda doim <b>kislotani suvga</b> quyamiz!", en: '<b>Conclusion:</b> concentrated H₂SO₄ is a strong <b>dehydrating (hygroscopic)</b> agent. It chars organic matter — that is why it burns skin and clothes. When diluting, always pour <b>acid into water</b>!' }, f() { setSugar(0, C(0x3a2a18)); setCol(0.95); steam.rate = 3; lE.set(1); } },
        ],
        loop(dt) { steam.tick(dt); }, clear() { steam.clear(); }
      };
    }
  });

  /* 7–8. Favvora tajribalari: ammiak (8-60) va vodorod xlorid (8-28) */
  function fountain(o) {
    return {
      id: o.id, icon: o.icon, grade: [8], lessons: o.lessons, title: o.title, desc: o.desc,
      cam: { pos: [0.15, 1.45, 3.1], target: [0, 1.0, 0] },
      build(ctx) {
        const { scene } = ctx;
        const st = Lab.stand(2.0); st.group.position.set(0.18, 0, 0); scene.add(st.group); st.addRing(1.18, 0.12);
        const b = ctx.add(at(Lab.vessel(P.beaker(0.3, 0.5), { color: 0xd8eeff, opacity: 0.4, level: 0.3 }), 0, 0, 0)); b.setFrac(0.7);
        const R = 0.3, cy = 1.55;
        const fl = Lab.vessel(P.round(R, 0.06, 1.0), { color: 0xffffff, level: 0 }); fl.group.rotation.z = Math.PI; fl.group.position.set(0, cy + R, 0); scene.add(fl.group);
        const gas = new T.Mesh(new T.SphereGeometry(R * 0.93, 32, 20), new T.MeshBasicMaterial({ color: o.gas, transparent: true, opacity: 0.12, depthWrite: false })); gas.position.set(0, cy, 0); scene.add(gas);
        const tube = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 1, 10), M.glass({ opacity: 0.25 })); tube.position.set(0, (0.1 + cy) / 2, 0); tube.scale.y = cy - 0.1 + 0.05; scene.add(tube);
        const col = new T.Mesh(new T.CylinderGeometry(0.008, 0.008, 1, 8), M.liquid(o.c1, 0.8)); scene.add(col);
        const capMat = M.liquid(o.c1, 0.6); const cap = new T.Mesh(new T.BufferGeometry(), capMat); cap.position.set(0, cy, 0); cap.renderOrder = 6; scene.add(cap);
        const capGeo = (h) => { const pts = [new T.Vector2(0, -R * 0.93)]; const r0 = R * 0.93; for (let i = 1; i <= 14; i++) { const y = -r0 + h * i / 14; pts.push(new T.Vector2(Math.sqrt(Math.max(0, r0 * r0 - y * y)), y)); } pts.push(new T.Vector2(0, -r0 + h)); return new T.LatheGeometry(pts, 32); };
        const setCap = (h) => { cap.geometry.dispose(); cap.visible = h > 0.01; cap.geometry = h > 0.01 ? capGeo(h) : new T.BufferGeometry(); };
        const jet = Lab.puffs(scene, { origin: () => V(0, cy - R * 0.85, 0), size: 0.05, op: 0.8, life: 0.7, spread: 0.05, vel: V(0, 0.9, 0), color: o.c2 });
        const lG = ctx.label(o.gasName, gas, [0.45, 0.1, 0], 'tag'), lW = ctx.label(o.waterName, b.group, [0, -0.06, 0.4]);
        const lR = ctx.label(o.result, gas, [0.45, -0.15, 0], 'warn');
        return {
          reset() { b.setFrac(0.7); tint(b, C(o.c1), 0.2); setCap(0); col.visible = false; capMat.color.set(o.c1); capMat.attenuationColor.set(o.c1); jet.rate = 0; gas.material.opacity = 0.12; lG.set(1); lR.set(0); },
          steps: [
            { dur: 4, cap: o.s1 },
            { dur: 4, cap: o.s2, f(p) { col.visible = p > 0.05; const h = (cy - R * 0.9 - 0.1) * ease(p); col.scale.y = Math.max(0.001, h); col.position.set(0, 0.1 + h / 2, 0); } },
            { dur: 8, cap: o.s3, eq: o.eq, f(p) { col.visible = true; col.scale.y = cy - R * 0.9 - 0.1; col.position.set(0, 0.1 + (cy - R * 0.9 - 0.1) / 2, 0); const k = ease(seg(p, 0, 0.9)); jet.rate = 40 * (1 - seg(p, 0.85, 1)); setCap(R * 1.6 * k); const c = C(o.c1).lerp(C(o.c2), seg(p, 0, 0.3)); capMat.color.copy(c); capMat.attenuationColor.copy(c); col.material.color.copy(c); b.setFrac(0.7 - 0.35 * k); gas.material.opacity = 0.12 * (1 - k); lR.set(seg(p, 0.4, 0.6)); } },
            { dur: 5, cap: o.s4, f() { setCap(R * 1.6); jet.rate = 0; b.setFrac(0.35); lR.set(1); gas.material.opacity = 0; } },
          ],
          loop(dt) { jet.tick(dt); }, clear() { jet.clear(); }
        };
      }
    };
  }
  Lab.def(fountain({
    id: 'ammonia-fountain', icon: '⛲', lessons: [[8, 60], [8, 56], [8, 57], [8, 61]], gas: 0xcfe8ff, c1: 0xeaf4ff, c2: 0xff4fa3,
    title: { uz: '«Ammiak favvorasi»', en: 'The ammonia fountain' },
    desc: { uz: "Ammiak to'ldirilgan kolbaga fenolftaleinli suv favvora bo'lib otiladi va pushti rangga kiradi: ammiak suvda juda yaxshi eriydi, eritmasi ishqoriy.", en: 'Water with phenolphthalein shoots up into a flask of ammonia as a fountain and turns pink: ammonia is very soluble and its solution is alkaline.' },
    gasName: { uz: 'NH₃ gazi', en: 'NH₃ gas' }, waterName: { uz: 'Suv + fenolftalein', en: 'Water + phenolphthalein' }, result: { uz: 'Pushti — ishqoriy muhit', en: 'Pink — alkaline' },
    s1: { uz: "To'ntarilgan kolba <b>ammiak (NH₃)</b> bilan to'ldirilgan. Naycha pastdagi <b>fenolftaleinli suvga</b> tushirilgan.", en: 'The upside-down flask is filled with <b>ammonia (NH₃)</b>. Its tube dips into <b>water with phenolphthalein</b>.' },
    s2: { uz: "Kolbaga ozgina suv kirgach, ammiak unda <b>erib ketadi</b> va kolbada bosim keskin pasayadi — suv naycha bo'ylab ko'tariladi.", en: 'Once a little water gets in, the ammonia <b>dissolves</b> and the pressure in the flask drops sharply — water rises up the tube.' },
    s3: { uz: "<b>Favvora!</b> Suv kolbaga otilib kiradi va <b>pushti</b> rangga kiradi — ammiak eritmasi <b>ishqoriy</b>.", en: '<b>A fountain!</b> Water sprays into the flask and turns <b>pink</b> — ammonia solution is <b>alkaline</b>.' }, eq: 'NH₃ + H₂O ⇄ NH₄⁺ + OH⁻',
    s4: { uz: "<b>Xulosa:</b> ammiak suvda juda yaxshi eriydi (1 hajm suvda ~700 hajm) va kuchsiz <b>asos</b> hosil qiladi. Ammiak havodan yengil, shuning uchun kolba og'zi pastga qaratib to'ldiriladi.", en: '<b>Conclusion:</b> ammonia is extremely soluble (~700 volumes per volume of water) and forms a weak <b>base</b>. It is lighter than air, so the flask is filled mouth-down.' },
  }));
  Lab.def(fountain({
    id: 'hcl-fountain', icon: '⛲', lessons: [[8, 28], [8, 31]], gas: 0xeaf4e0, c1: 0x7c8fe6, c2: 0xe8384f,
    title: { uz: 'Vodorod xlorid favvorasi', en: 'The hydrogen chloride fountain' },
    desc: { uz: "HCl to'ldirilgan kolbaga ko'k lakmusli suv otilib kiradi va qizil rangga kiradi: HCl suvda juda yaxshi eriydi va xlorid kislota hosil qiladi.", en: 'Water with blue litmus shoots into a flask of HCl and turns red: HCl is extremely soluble and forms hydrochloric acid.' },
    gasName: { uz: 'HCl gazi', en: 'HCl gas' }, waterName: { uz: "Suv + ko'k lakmus", en: 'Water + blue litmus' }, result: { uz: 'Qizil — kislotali muhit', en: 'Red — acidic' },
    s1: { uz: "Kolba <b>vodorod xlorid (HCl)</b> gazi bilan to'ldirilgan. Pastda <b>ko'k lakmusli</b> suv.", en: 'The flask is filled with <b>hydrogen chloride (HCl)</b> gas. Below is water with <b>blue litmus</b>.' },
    s2: { uz: "HCl suvda juda tez eriydi — kolbada bosim pasayadi, suv naycha bo'ylab ko'tariladi.", en: 'HCl dissolves very quickly — the pressure in the flask drops and water rises up the tube.' },
    s3: { uz: "<b>Favvora!</b> Suv kolbaga otiladi va <b>qizil</b> rangga kiradi — <b>xlorid kislota</b> hosil bo'ldi.", en: '<b>A fountain!</b> Water sprays in and turns <b>red</b> — <b>hydrochloric acid</b> has formed.' }, eq: 'HCl(g) + H₂O → H₃O⁺ + Cl⁻',
    s4: { uz: "<b>Xulosa:</b> 1 hajm suvda ~500 hajm HCl eriydi. Uning suvdagi eritmasi — kuchli <b>xlorid kislota</b>.", en: '<b>Conclusion:</b> about 500 volumes of HCl dissolve in 1 volume of water. Its solution is strong <b>hydrochloric acid</b>.' },
  }));

  /* 9. Alanga rangi — 8-sinf, 67-dars */
  Lab.def({
    id: 'flame-test', icon: '🔥', grade: [8], lessons: [[8, 67], [8, 68], [8, 65]],
    title: { uz: 'Alanga rangi bo‘yicha metallarni aniqlash', en: 'Identifying metals by flame colour' },
    desc: { uz: "Metall tuzi alangaga kiritilsa, alanga o'ziga xos rangga bo'yaladi: natriy — sariq, kaliy — binafsha, litiy — qizil, mis — yashil. Kaliyli o'g'itlarni shu usulda aniqlash mumkin.", en: 'A metal salt held in a flame colours it: sodium yellow, potassium violet, lithium red, copper green. Potassium fertilizers can be identified this way.' },
    cam: { pos: [0, 1.15, 2.25], target: [0, 0.45, 0] },
    build(ctx) {
      const { scene } = ctx;
      const bur = Lab.burner(); bur.group.scale.setScalar(1.15); scene.add(bur.group);
      const S = [['NaCl', 0xffc21a, 0xfff2a0, { uz: 'Na — sariq', en: 'Na — yellow' }], ['KCl', 0xa86bff, 0xe6d6ff, { uz: 'K — binafsha', en: 'K — violet' }], ['LiCl', 0xff2547, 0xffb0bd, { uz: 'Li — qizil', en: 'Li — red' }], ['CuCl₂', 0x22d38a, 0xb8ffe0, { uz: 'Cu — yashil', en: 'Cu — green' }]];
      const dishes = S.map((s, i) => { const d = new T.Mesh(new T.CylinderGeometry(0.1, 0.08, 0.03, 24), M.std(0xffffff, { roughness: 0.3 })); d.position.set(-0.75 + i * 0.5, 0.015, 0.35); const pw = new T.Mesh(new T.CylinderGeometry(0.075, 0.075, 0.012, 20), M.std(i === 3 ? 0x2fae7f : 0xf7f7f2, { roughness: 1 })); pw.position.set(d.position.x, 0.035, 0.35); scene.add(d); scene.add(pw); ctx.label(s[0], d, [0, -0.05, 0.12]); return d; });
      const wire = new T.Group(); const rod = new T.Mesh(new T.CylinderGeometry(0.006, 0.006, 0.55, 8), M.metal(0xc8ccd2)); rod.rotation.z = Math.PI / 2.6; rod.position.set(0.24, 0.1, 0); wire.add(rod); const loop = new T.Mesh(new T.TorusGeometry(0.018, 0.004, 8, 16), M.metal(0xd8dce0)); wire.add(loop); scene.add(wire);
      const lR = ctx.label('', bur.group, [0, 1.05, 0], 'tag');
      const base = [0xff7a1a, 0xfff0b0, 0x3d6bff];
      const flc = (o, i) => bur.flame.color(o, i, base[2]);
      return {
        reset() { flc(base[0], base[1]); bur.flame.set(1); wire.position.set(0.5, 0.75, 0.25); lR.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "Spirt lampasi alangasi deyarli <b>rangsiz-sarg'ish</b>. Platina (nixrom) simni har xil tuzga botirib, alangaga kiritamiz.", en: 'The spirit-lamp flame is nearly <b>colourless-yellowish</b>. We dip a platinum (nichrome) wire into different salts and hold it in the flame.' } },
          { dur: 16, cap: { uz: "Har bir metall alangani <b>o'z rangiga</b> bo'yaydi: <b>Na — sariq, K — binafsha, Li — qizil, Cu — yashil</b>. Bu rangni metall atomlaridagi elektronlar beradi.", en: 'Each metal colours the flame its <b>own colour</b>: <b>Na yellow, K violet, Li red, Cu green</b>. The colour comes from electrons in the metal atoms.' },
            f(p) { const i = Math.min(3, Math.floor(p * 4)); const q = p * 4 - i; const d = dishes[i].position;
              const toDish = ease(seg(q, 0, 0.2)), toFl = ease(seg(q, 0.25, 0.45)), back = ease(seg(q, 0.85, 1));
              const fx = 0.03, fy = 0.72, fz = 0; let x = lerp(0.5, d.x + 0.05, toDish), y = lerp(0.75, 0.1, toDish), z = lerp(0.25, 0.35, toDish);
              if (q > 0.2) { x = lerp(d.x + 0.05, fx, toFl); y = lerp(0.1, fy, toFl); z = lerp(0.35, fz, toFl); } if (q > 0.85) { x = lerp(fx, 0.5, back); y = lerp(fy, 0.75, back); z = lerp(fz, 0.25, back); }
              wire.position.set(x, y, z);
              const k = seg(q, 0.42, 0.5) * (1 - seg(q, 0.85, 0.92)); const c1 = C(base[0]).lerp(C(S[i][1]), k), c2 = C(base[1]).lerp(C(S[i][2]), k); flc(c1.getHex(), c2.getHex());
              lR.setText(S[i][3]); lR.set(k); } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> alanga rangi — metall ionlarini aniqlashning oson usuli. Masalan, <b>kaliyli o'g'it</b> (KCl, K₂SO₄) alangani binafsha rangga bo'yaydi. Salyutlar rangi ham shu hodisaga asoslangan.", en: '<b>Conclusion:</b> flame colour is an easy way to identify metal ions. For example, a <b>potassium fertilizer</b> (KCl, K₂SO₄) colours the flame violet. Fireworks get their colours the same way.' }, f() { flc(base[0], base[1]); wire.position.set(0.5, 0.75, 0.25); lR.set(0); } },
        ],
        loop(dt, s, c) { bur.flame.tick(c.t); }
      };
    }
  });

  /* 10. Kristall panjaralar — 8-sinf, 18–19-darslar */
  Lab.def({
    id: 'crystal-lattice', icon: '🧊', grade: [8], lessons: [[8, 18], [8, 19], [8, 17], [8, 16]],
    title: { uz: 'Kristall panjaralar: NaCl, yod va olmos', en: 'Crystal lattices: NaCl, iodine and diamond' },
    desc: { uz: "Ion panjarada (NaCl) Na⁺ va Cl⁻ ionlari navbatlashadi; molekulyar panjarada (I₂) alohida molekulalar turadi; atom panjarada (olmos) har bir uglerod 4 ta qo'shni bilan kovalent bog'langan.", en: 'In an ionic lattice (NaCl) Na⁺ and Cl⁻ ions alternate; in a molecular lattice (I₂) separate molecules sit at the points; in an atomic lattice (diamond) each carbon is covalently bonded to 4 neighbours.' },
    cam: { pos: [1.6, 1.5, 2.2], target: [0, 0.75, 0] }, table: true,
    build(ctx) {
      const { scene } = ctx; const root = new T.Group(); root.position.set(0, 0.75, 0); scene.add(root);
      const mk = (el, s) => { const m = Lab.atomMesh(el, s); root.add(m); return m; };
      const d = 0.24; const nacl = []; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) { const na = (i + j + k) % 2 === 0; const m = mk(na ? 'Na' : 'Cl', na ? 0.36 : 0.52); m.userData.p = V((i - 1.5) * d, (j - 1.5) * d, (k - 1.5) * d); m.userData.r = rng(i * 16 + j * 4 + k)(); nacl.push(m); }
      const io = []; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 0; k < 2; k++) { const g = new T.Group(); const a = Lab.atomMesh('I', 0.42), b = Lab.atomMesh('I', 0.42); a.position.x = -0.07; b.position.x = 0.07; g.add(a); g.add(b); g.position.set((i - 1) * 0.3, (j - 1) * 0.3, (k - 0.5) * 0.36); g.rotation.set(0, (i + j + k) % 2 ? 0.9 : -0.9, 0.4); root.add(g); io.push(g); }
      const dia = new T.Group(); root.add(dia); const pts = []; const a0 = 0.42; const basis = [[0, 0, 0], [0, 0.5, 0.5], [0.5, 0, 0.5], [0.5, 0.5, 0], [0.25, 0.25, 0.25], [0.25, 0.75, 0.75], [0.75, 0.25, 0.75], [0.75, 0.75, 0.25]];
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) basis.forEach((b) => pts.push(V((i + b[0] - 1) * a0, (j + b[1] - 1) * a0, (k + b[2] - 1) * a0)));
      const uniq = []; pts.forEach((p) => { if (!uniq.some((q) => q.distanceTo(p) < 0.01)) uniq.push(p); }); uniq.forEach((p) => { const m = Lab.atomMesh('C', 0.33); m.position.copy(p); dia.add(m); });
      const bm = M.std(0xd7dde3, { roughness: 0.3, metalness: 0.2 }); const bl = a0 * Math.sqrt(3) / 4;
      for (let i = 0; i < uniq.length; i++) for (let j = i + 1; j < uniq.length; j++) { const L = uniq[i].distanceTo(uniq[j]); if (Math.abs(L - bl) < 0.01) { const c = new T.Mesh(new T.CylinderGeometry(0.018, 0.018, L, 8), bm); c.position.copy(uniq[i]).add(uniq[j]).multiplyScalar(0.5); c.quaternion.setFromUnitVectors(V(0, 1, 0), uniq[j].clone().sub(uniq[i]).normalize()); dia.add(c); } }
      const lN = ctx.label({ uz: 'Na⁺ (binafsha) va Cl⁻ (yashil)', en: 'Na⁺ (purple) and Cl⁻ (green)' }, root, [0, 0.65, 0], 'tag'), lI = ctx.label({ uz: 'I₂ molekulalari', en: 'I₂ molecules' }, root, [0, 0.62, 0], 'tag'), lD = ctx.label({ uz: 'C atomlari — har biri 4 ta bog‘', en: 'C atoms — 4 bonds each' }, root, [0, 0.62, 0], 'tag');
      const show = (a, b, c) => { nacl.forEach((m) => (m.visible = a > 0.01)); io.forEach((g) => { g.visible = b > 0.01; g.scale.setScalar(Math.max(0.001, b)); }); dia.visible = c > 0.01; dia.scale.setScalar(Math.max(0.001, c)); };
      return {
        reset() { show(1, 0, 0); nacl.forEach((m) => m.position.copy(m.userData.p)); lN.set(0); lI.set(0); lD.set(0); root.rotation.y = 0; },
        steps: [
          { dur: 6, cap: { uz: "<b>Ion kristall panjara</b> — osh tuzi (NaCl). Ionlar kubik shaklda navbatma-navbat joylashadi: har bir Na⁺ atrofida 6 ta Cl⁻. Alohida «NaCl molekulasi» yo'q.", en: '<b>Ionic lattice</b> — table salt (NaCl). Ions alternate in a cubic pattern: each Na⁺ is surrounded by 6 Cl⁻. There is no separate “NaCl molecule”.' },
            f(p) { show(1, 0, 0); nacl.forEach((m) => { const k = ease(seg(p, m.userData.r * 0.5, m.userData.r * 0.5 + 0.4)); m.position.copy(m.userData.p).multiplyScalar(lerp(2.4, 1, k)); }); lN.set(seg(p, 0.6, 0.8)); } },
          { dur: 6, cap: { uz: "<b>Molekulyar kristall panjara</b> — yod (I₂). Tugunlarda ikki atomli molekulalar; ular orasidagi tortishish kuchsiz, shuning uchun yod oson <b>sublimatsiyalanadi</b>.", en: '<b>Molecular lattice</b> — iodine (I₂). Diatomic molecules sit at the points; the forces between them are weak, so iodine easily <b>sublimes</b>.' },
            f(p) { const k = ease(seg(p, 0, 0.4)); show(1 - k, k, 0); nacl.forEach((m) => m.position.copy(m.userData.p).multiplyScalar(1 + 1.5 * k)); lN.set(1 - k); lI.set(seg(p, 0.4, 0.6)); } },
          { dur: 6, cap: { uz: "<b>Atom kristall panjara</b> — olmos. Har bir uglerod atomi 4 ta qo'shnisi bilan mustahkam <b>kovalent bog'</b> hosil qiladi — olmos eng qattiq tabiiy modda.", en: '<b>Atomic lattice</b> — diamond. Each carbon atom forms strong <b>covalent bonds</b> with 4 neighbours — diamond is the hardest natural substance.' },
            f(p) { const k = ease(seg(p, 0, 0.4)); show(0, 1 - k, k); lI.set(1 - k); lD.set(seg(p, 0.4, 0.6)); } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> panjara turi xossani belgilaydi: ion va atom panjarali moddalar <b>qattiq va qiyin suyuqlanadi</b>, molekulyar panjaralilar <b>yumshoq va oson suyuqlanadi</b>.", en: '<b>Conclusion:</b> the lattice type sets the properties: ionic and atomic solids are <b>hard and high-melting</b>; molecular solids are <b>soft and low-melting</b>.' }, f() { show(0, 0, 1); lD.set(1); } },
        ],
        loop(dt) { root.rotation.y += dt * 0.25; }
      };
    }
  });

  /* 11. Kimyoviy muvozanat: NO₂ ⇄ N₂O₄ — 8-sinf, 50-dars */
  Lab.def({
    id: 'no2-equilibrium', icon: '⚖️', grade: [8], lessons: [[8, 50], [8, 58]],
    title: { uz: 'Harorat muvozanatni siljitadi: NO₂ ⇄ N₂O₄', en: 'Temperature shifts equilibrium: NO₂ ⇄ N₂O₄' },
    desc: { uz: "Qo'ng'ir NO₂ va rangsiz N₂O₄ muvozanatda. Muzli suvda kolba rangsizlanadi (muvozanat N₂O₄ tomonga), issiq suvda to'q qo'ng'ir bo'ladi (NO₂ tomonga) — Le Shatelye prinsipi.", en: 'Brown NO₂ and colourless N₂O₄ are in equilibrium. In ice water the flask fades (shift to N₂O₄); in hot water it darkens (shift to NO₂) — Le Chatelier’s principle.' },
    cam: { pos: [0, 1.05, 2.3], target: [0, 0.4, 0] },
    build(ctx) {
      const { scene } = ctx;
      const mkBath = (x, col) => { const b = ctx.add(at(Lab.vessel(P.beaker(0.36, 0.45), { color: col, opacity: 0.35, level: 0.2 }), x, 0, 0)); b.setFrac(0.4); tint(b, C(col), 0); return b; };
      const cold = mkBath(-0.55, 0xdff4ff), mid = null, hot = mkBath(0.55, 0xffe6d6);
      const ice = []; const R = rng(4); for (let i = 0; i < 9; i++) { const m = new T.Mesh(new T.BoxGeometry(0.07, 0.07, 0.07), M.glass({ opacity: 0.5 })); m.position.set(-0.55 + (R() - 0.5) * 0.45, 0.19, (R() - 0.5) * 0.45); m.rotation.set(R(), R(), R()); scene.add(m); ice.push(m); }
      const steam = Lab.puffs(scene, { origin: () => V(0.55, 0.3, 0), size: 0.2, op: 0.18, life: 1.8, spread: 0.2, vel: V(0, 0.25, 0) });
      const mkFlask = (x) => { const g = new T.Group(); const f = Lab.vessel(P.round(0.17, 0.035, 0.55), { level: 0 }); g.add(f.group); const gas = new T.Mesh(new T.SphereGeometry(0.155, 28, 18), new T.MeshBasicMaterial({ color: 0x9a4a12, transparent: true, opacity: 0.6, depthWrite: false })); gas.position.y = 0.17; g.add(gas); const neck = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.2, 12), new T.MeshBasicMaterial({ color: 0x9a4a12, transparent: true, opacity: 0.5, depthWrite: false })); neck.position.y = 0.42; g.add(neck); g.position.set(x, 0.62, 0); scene.add(g); return { g, gas, neck }; };
      const f1 = mkFlask(-0.55), f2 = mkFlask(0), f3 = mkFlask(0.55);
      const lab = (f, txt) => ctx.label(txt, f.g, [0, 0.62, 0], 'tag');
      const l1 = lab(f1, { uz: 'Muzli suv: och', en: 'Ice water: pale' }), l2 = lab(f2, { uz: 'Xona harorati', en: 'Room temperature' }), l3 = lab(f3, { uz: "Issiq suv: to'q qo'ng'ir", en: 'Hot water: dark brown' });
      const setG = (f, k) => { f.gas.material.opacity = 0.06 + 0.88 * k; f.neck.material.opacity = 0.06 + 0.6 * k; f.gas.material.color.copy(C(0xd9a070).lerp(C(0x4a1c04), k)); };
      return {
        reset() { [f1, f2, f3].forEach((f, i) => { f.g.position.set([-0.55, 0, 0.55][i], 0.62, 0); f.g.position.y = i === 1 ? 0.04 : 0.62; setG(f, 0.55); }); steam.rate = 0; l1.set(0); l3.set(0); l2.set(1); },
        steps: [
          { dur: 4, cap: { uz: "Uchta bir xil kolbada <b>NO₂ ⇄ N₂O₄</b> muvozanatidagi gaz aralashmasi. NO₂ — <b>qo'ng'ir</b>, N₂O₄ — <b>rangsiz</b>.", en: 'Three identical flasks contain the gas mixture <b>NO₂ ⇄ N₂O₄</b> at equilibrium. NO₂ is <b>brown</b>, N₂O₄ is <b>colourless</b>.' }, eq: '2NO₂ (qo‘ng‘ir) ⇄ N₂O₄ (rangsiz) + Q' },
          { dur: 4, cap: { uz: "Bitta kolbani <b>muzli suvga</b>, bittasini <b>issiq suvga</b> tushiramiz, o'rtadagisi xona haroratida qoladi.", en: 'One flask goes into <b>ice water</b>, one into <b>hot water</b>; the middle one stays at room temperature.' }, f(p) { const k = ease(p); f1.g.position.y = lerp(0.62, 0.05, k); f3.g.position.y = lerp(0.62, 0.05, k); steam.rate = 6 * p; } },
          { dur: 7, cap: { uz: "Sovuqda kolba <b>rangsizlanadi</b> — muvozanat issiqlik ajraladigan tomonga (<b>N₂O₄</b>) siljidi. Issiqda <b>to'q qo'ng'ir</b> — muvozanat <b>NO₂</b> tomonga siljidi.", en: 'In the cold the flask <b>fades</b> — equilibrium shifts to the heat-releasing side (<b>N₂O₄</b>). In the heat it turns <b>dark brown</b> — it shifts towards <b>NO₂</b>.' }, f(p) { f1.g.position.y = 0.05; f3.g.position.y = 0.05; steam.rate = 6; const k = ease(p); setG(f1, lerp(0.55, 0.05, k)); setG(f3, lerp(0.55, 1, k)); l1.set(seg(p, 0.6, 0.8)); l3.set(seg(p, 0.6, 0.8)); } },
          { dur: 5.5, cap: { uz: "<b>Xulosa (Le Shatelye prinsipi):</b> muvozanatdagi tizim tashqi ta'sirni kamaytiruvchi tomonga siljiydi. Qizdirish issiqlik yutiladigan (endotermik) yo'nalishni, sovutish ekzotermik yo'nalishni kuchaytiradi.", en: '<b>Conclusion (Le Chatelier):</b> a system at equilibrium shifts to oppose a change. Heating favours the heat-absorbing (endothermic) direction; cooling favours the exothermic one.' }, f() { setG(f1, 0.05); setG(f3, 1); f1.g.position.y = 0.05; f3.g.position.y = 0.05; l1.set(1); l3.set(1); } },
        ],
        loop(dt) { steam.tick(dt); }, clear() { steam.clear(); }
      };
    }
  });

  /* 12. Reaksiya tezligiga haroratning ta'siri — 8-sinf, 49-dars */
  Lab.def({
    id: 'rate-temperature', icon: '⏱️', grade: [8], lessons: [[8, 49]],
    title: { uz: 'Harorat reaksiyani qanday tezlashtiradi?', en: 'How does temperature speed up a reaction?' },
    desc: { uz: "Natriy tiosulfat va xlorid kislota reaksiyasida oltingugurt ajralib eritma loyqalanadi va stakan ostidagi «X» belgi ko'rinmay qoladi. Issiq eritmada bu sovuqdagidan bir necha marta tez sodir bo'ladi.", en: 'Sodium thiosulfate and hydrochloric acid release sulfur, so the solution turns cloudy and the “X” under the beaker disappears. In the warm solution this happens several times faster than in the cold one.' },
    cam: { pos: [0, 1.45, 2.0], target: [0, 0.3, 0] },
    build(ctx) {
      const { scene } = ctx;
      const mkX = (x) => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, 128, 128); g.strokeStyle = '#111'; g.lineWidth = 14; g.beginPath(); g.moveTo(24, 24); g.lineTo(104, 104); g.moveTo(104, 24); g.lineTo(24, 104); g.stroke(); const m = new T.Mesh(new T.PlaneGeometry(0.5, 0.5), new T.MeshStandardMaterial({ map: Lab.srgb(new T.CanvasTexture(c)), roughness: 0.9 })); m.rotation.x = -Math.PI / 2; m.position.set(x, 0.003, 0); scene.add(m); };
      mkX(-0.45); mkX(0.45);
      const b1 = ctx.add(at(Lab.vessel(P.beaker(0.22, 0.45), { color: 0xeaf4ff, opacity: 0.35, level: 0.2 }), -0.45, 0.01, 0)); b1.setFrac(0.55);
      const b2 = ctx.add(at(Lab.vessel(P.beaker(0.22, 0.45), { color: 0xeaf4ff, opacity: 0.35, level: 0.2 }), 0.45, 0.01, 0)); b2.setFrac(0.55);
      ctx.label({ uz: '20 °C', en: '20 °C' }, b1.group, [0, -0.04, 0.32], 'tag'); ctx.label({ uz: '50 °C', en: '50 °C' }, b2.group, [0, -0.04, 0.32], 'warn');
      const s1 = clock(scene, -0.45, 0.75, -0.4), s2 = clock(scene, 0.45, 0.75, -0.4);
      const st = Lab.puffs(scene, { origin: () => V(0.45, 0.28, 0), size: 0.14, op: 0.15, life: 1.5, spread: 0.1, vel: V(0, 0.2, 0) });
      const clear = C(0xeaf4ff), milky = C(0xf2e7a8);
      const l1 = ctx.label({ uz: '«X» ko‘rinmay qoldi!', en: 'The “X” has vanished!' }, b2.group, [0, 0.62, 0], 'warn');
      return {
        reset() { tint(b1, clear, 0); tint(b2, clear, 0); s1.draw('0 s'); s2.draw('0 s'); st.rate = 0; l1.set(0); },
        steps: [
          { dur: 4, cap: { uz: "Ikki stakanda bir xil <b>natriy tiosulfat</b> eritmasi: biri <b>20 °C</b>, ikkinchisi <b>50 °C</b>. Ostida qog'ozga «X» chizilgan.", en: 'Two beakers hold the same <b>sodium thiosulfate</b> solution: one at <b>20 °C</b>, the other at <b>50 °C</b>. An “X” is drawn on paper underneath.' }, f(p) { st.rate = 4; } },
          { dur: 10, cap: { uz: "Ikkalasiga bir vaqtda <b>xlorid kislota</b> qo'shamiz. Oltingugurt ajralib, eritma <b>loyqalanadi</b>. Issiq stakanda «X» <b>tezroq</b> ko'rinmay qoladi.", en: 'We add <b>hydrochloric acid</b> to both at the same time. Sulfur forms and the solution turns <b>cloudy</b>. In the warm beaker the “X” disappears <b>much faster</b>.' }, eq: 'Na₂S₂O₃ + 2HCl → 2NaCl + S↓ + SO₂ + H₂O',
            f(p) { st.rate = 4; const k1 = ease(seg(p, 0.05, 1)), k2 = ease(seg(p, 0.05, 0.3)); tint(b1, clear.clone().lerp(milky, k1), 0.95 * k1); tint(b2, clear.clone().lerp(milky, k2), 0.95 * k2); s1.draw(`${Math.round(80 * Math.min(1, p))} s`); s2.draw(`${Math.round(80 * Math.min(p, 0.3))} s`); l1.set(seg(p, 0.3, 0.4)); } },
          { dur: 5.5, cap: { uz: "<b>Xulosa:</b> issiq eritmada reaksiya taxminan <b>8 marta</b> tezroq bordi (24 s va 80 s ga yaqin). Van't-Goff qoidasi: harorat har 10 °C ga oshganda tezlik <b>2–4 marta</b> ortadi.", en: '<b>Conclusion:</b> the warm reaction was about <b>8 times</b> faster (roughly 24 s vs 80 s). Van’t Hoff rule: every 10 °C rise makes a reaction <b>2–4 times</b> faster.' }, f() { tint(b1, milky, 0.95); tint(b2, milky, 0.95); l1.set(1); } },
        ],
        loop(dt) { st.tick(dt); }, clear() { st.clear(); }
      };
    }
  });

  /* mavjud tajribalarni 8-sinf darslariga ulash */
  const LINK = { 'particles': [1, 17], 'indicator-ph': [2, 31], 'neutralization': [2], 'gold-foil': [9], 'atom-model': [10, 11, 12, 13, 14], 'cuo-reduction': [21, 23, 24], 'acids-metals': [31, 47], 'acid-rain': [45, 59], 'catalyst': [49, 51], 'starch-iodine': [32, 34], 'electrolysis': [39, 27], 'oxygen-prep': [43], 'flame-combustion': [44, 62], 'hydrogen': [31] };
  Lab.list.forEach((e) => { const L = LINK[e.id]; if (L && !e.lessons) e.lessons = []; if (L) L.forEach((n) => { if (!e.lessons.some((x) => x[0] === 8 && x[1] === n)) e.lessons.push([8, n]); }); });
  if (Lab.list.sort) Lab.list.sort((a, b) => ((a.lessons[0] || [9, 99])[0] - (b.lessons[0] || [9, 99])[0]) || ((a.lessons[0] || [9, 99])[1] - (b.lessons[0] || [9, 99])[1]));
})();
