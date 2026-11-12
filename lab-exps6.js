/* Tajribalar — 6-qism: 6-sinf "kimyo va hayot" mavzulari (2) */
(function () {
  const T = THREE, { clamp, lerp, ease, seg, rng } = Lab.m, M = Lab.M, P = Lab.profiles, { at, V, clock, dropper, tint } = Lab.util;
  const C = (h) => new T.Color(h);

  /* 6. Dorivor o'simlik damlamasi: issiq va sovuq suv — 6-sinf, 27-dars */
  Lab.def({
    id: 'herbal-extract', icon: '🌼', grade: [6], lessons: [[6, 27]],
    title: { uz: "Dorivor o'simlik damlamasi: foydali moddalar qanday ajraladi?", en: 'Herbal infusion: how are useful substances extracted?' },
    desc: { uz: "Moychechak gullari issiq suvga solinganda foydali moddalar tez eriydi va suv sariq-oltin tusga kiradi. Sovuq suvda bu jarayon ancha sekin boradi. Bu — ekstraksiya (ajratib olish).", en: 'When chamomile flowers are put in hot water, their useful substances dissolve quickly and the water turns golden. In cold water this happens much more slowly. This is extraction.' },
    cam: { pos: [0, 1.75, 3.3], target: [0, 0.62, 0] },
    build(ctx) {
      const { scene } = ctx;
      const cup = (x) => ctx.add(at(Lab.vessel(P.beaker(0.26, 0.56), { color: 0xe6f4ff, opacity: 0.35, level: 0 }), x, 0, 0));
      const c1 = cup(-0.45), c2 = cup(0.45);
      const kettle = new T.Group(); const kb = new T.Mesh(new T.SphereGeometry(0.2, 28, 18), M.metal(0xd7dce1)); kb.scale.set(1, 0.85, 1); kettle.add(kb); const sp = new T.Mesh(new T.CylinderGeometry(0.02, 0.04, 0.22, 12), kb.material); sp.rotation.z = -1.0; sp.position.set(0.22, 0.05, 0); kettle.add(sp); const hd = new T.Mesh(new T.TorusGeometry(0.12, 0.018, 8, 24, Math.PI), M.std(0x222222)); hd.position.y = 0.17; kettle.add(hd); scene.add(kettle);
      const jug = new T.Group(); const jb = new T.Mesh(new T.CylinderGeometry(0.13, 0.15, 0.32, 28), M.glass({ opacity: 0.2 })); jb.renderOrder = 10; jug.add(jb); const jw = new T.Mesh(new T.CylinderGeometry(0.12, 0.14, 0.26, 24), M.liquid(0xd6ecff, 0.5)); jw.position.y = -0.02; jug.add(jw); scene.add(jug);
      const pour1 = Lab.drops(scene, { color: 0xdff1ff, from: () => V(-0.45, 0.75, 0), to: () => c1.surface() }), pour2 = Lab.drops(scene, { color: 0xdff1ff, from: () => V(0.45, 0.75, 0), to: () => c2.surface() });
      const R = rng(8); const flower = (cx) => { const arr = []; for (let i = 0; i < 9; i++) { const g = new T.Group(); for (let k = 0; k < 8; k++) { const pt = new T.Mesh(new T.SphereGeometry(0.02, 8, 6), M.std(0xffffff, { roughness: 0.7 })); pt.scale.set(1.6, 0.3, 0.6); pt.position.set(Math.cos(k * 0.785) * 0.03, 0, Math.sin(k * 0.785) * 0.03); pt.rotation.y = -k * 0.785; g.add(pt); } const ctr = new T.Mesh(new T.SphereGeometry(0.018, 10, 8), M.std(0xf4c20d, { roughness: 0.6 })); ctr.scale.y = 0.6; g.add(ctr); g.userData.o = V((R() - 0.5) * 0.3, R() * 0.06, (R() - 0.5) * 0.3); g.userData.k = R(); scene.add(g); arr.push(g); } return arr; };
      const fl1 = flower(-0.45), fl2 = flower(0.45);
      const plume = (x) => Lab.puffs(scene, { origin: () => V(x, 0.12, 0), vel: V(0, 0.06, 0), size: 0.2, op: 0.3, life: 3, spread: 0.12, color: 0xd9a400 });
      const pl1 = plume(-0.45), pl2 = plume(0.45);
      const steam = Lab.puffs(scene, { origin: () => V(-0.45, 0.6, 0), size: 0.22, op: 0.25, life: 2.2, spread: 0.1 });
      const th1 = Lab.thermometer(0.7); at(th1, -0.3, 0.05, -0.1); th1.group.rotation.z = 0.15; scene.add(th1.group); const th2 = Lab.thermometer(0.7); at(th2, 0.6, 0.05, -0.1); th2.group.rotation.z = 0.15; scene.add(th2.group);
      const lH = ctx.label({ uz: 'Issiq suv ~80 °C', en: 'Hot water ~80 °C' }, c1.group, [0, -0.06, 0.4], 'temp'), lCo = ctx.label({ uz: 'Sovuq suv ~15 °C', en: 'Cold water ~15 °C' }, c2.group, [0, -0.06, 0.4]);
      const sc1 = clock(scene, -0.45, 0.95, -0.45), sc2 = clock(scene, 0.45, 0.95, -0.45);
      const water = C(0xe6f4ff), tea = C(0xd49a00);
      const fall = (arr, cx, k, top) => arr.forEach((g) => { const q = ease(seg(k, g.userData.k * 0.3, 0.7 + g.userData.k * 0.3)); g.position.set(cx + g.userData.o.x, lerp(0.85, top - 0.01 + g.userData.o.y * 0.3, q), g.userData.o.z); g.rotation.y = q * 3; });
      return {
        reset() { c1.setLevel(0); c2.setLevel(0); c1.setColor(water); c2.setColor(water); c1.setOpacity(0.35); c2.setOpacity(0.35); tint(c1, water, 0); tint(c2, water, 0); kettle.position.set(-0.45, 1.1, -0.1); kettle.rotation.z = 0; jug.position.set(0.7, 1.05, -0.1); jug.rotation.z = 0; pour1.rate = pour2.rate = 0; fall(fl1, -0.45, 0, 0.4); fall(fl2, 0.45, 0, 0.4); pl1.rate = pl2.rate = 0; steam.rate = 0; th1.set(0.2); th2.set(0.2); sc1.draw('0:00'); sc2.draw('0:00'); lH.set(0); lCo.set(0); },
        steps: [
          { dur: 5, cap: { uz: "Ikki stakanga suv quyamiz: birinchisiga <b>issiq</b> (choynakdan), ikkinchisiga <b>sovuq</b> suv.", en: 'We pour water into two glasses: <b>hot</b> water from the kettle into the first and <b>cold</b> water into the second.' }, f(p) {
            const k1 = seg(p, 0, 0.5), k2 = seg(p, 0.5, 1); kettle.rotation.z = -0.9 * Math.sin(Math.PI * k1); kettle.position.x = -0.45 - 0.2 * Math.sin(Math.PI * k1); pour1.rate = k1 > 0.2 && k1 < 0.8 ? 40 : 0; c1.setLevel(lerp(0, 0.42, seg(k1, 0.2, 0.85))); th1.set(0.2 + 0.6 * seg(k1, 0.3, 0.9));
            jug.rotation.z = 0.95 * Math.sin(Math.PI * k2); jug.position.x = 0.7 - 0.12 * Math.sin(Math.PI * k2); pour2.rate = k2 > 0.2 && k2 < 0.8 ? 40 : 0; c2.setLevel(lerp(0, 0.42, seg(k2, 0.2, 0.85))); steam.rate = 6 * seg(p, 0.2, 0.4); lH.set(seg(p, 0.3, 0.45)); lCo.set(seg(p, 0.8, 0.95));
          } },
          { dur: 3.5, cap: { uz: "Ikkala stakanga ham bir xil miqdorda quritilgan <b>moychechak</b> gullarini solamiz.", en: 'We add the same amount of dried <b>chamomile</b> flowers to both glasses.' }, f(p) { c1.setLevel(0.42); c2.setLevel(0.42); th1.set(0.8); steam.rate = 6; lH.set(1); lCo.set(1); fall(fl1, -0.45, p, c1.surface()); fall(fl2, 0.45, p, c2.surface()); } },
          { dur: 9, cap: { uz: "Kuzatamiz: issiq suvda gullardan <b>sariq-oltin rangli moddalar</b> tez ajralib chiqib, butun suvga tarqaladi. Sovuq suvda rang juda sekin o'zgaradi. Issiqlik zarrachalar harakatini tezlashtiradi — <b>ekstraksiya</b> tezlashadi.", en: 'Watch: in hot water <b>golden substances</b> quickly come out of the flowers and spread through the water. In cold water the colour changes very slowly. Heat speeds up particle motion — <b>extraction</b> is faster.' }, f(p) {
            c1.setLevel(0.42); c2.setLevel(0.42); steam.rate = 6 * (1 - p * 0.5); lH.set(1); lCo.set(1); fall(fl1, -0.45, 1, c1.surface()); fall(fl2, 0.45, 1, c2.surface());
            fl1.forEach((g, i) => (g.position.y = lerp(c1.surface() - 0.01, 0.05, ease(seg(p, 0.1 + g.userData.k * 0.3, 0.7))))); pl1.rate = 10 * (1 - seg(p, 0.6, 1)); pl2.rate = 1.5;
            c1.setColor(water.clone().lerp(tea, ease(seg(p, 0.05, 0.8)))); c1.setOpacity(0.35 + 0.35 * p); tint(c1, water.clone().lerp(tea, ease(seg(p, 0.05, 0.8))), 0.8 * ease(seg(p, 0.05, 0.8))); tint(c2, water.clone().lerp(tea, 0.18 * p), 0.15 * p); c2.setColor(water.clone().lerp(tea, 0.18 * p)); th1.set(0.8 - 0.15 * p);
            sc1.draw(`${Math.floor(10 * p)}:00`); sc2.draw(`${Math.floor(10 * p)}:00`);
          } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> dorivor o'simliklardagi foydali moddalar issiq suvda yaxshi eriydi — shuning uchun damlama tayyorlanadi. Moychechak — yallig'lanishga qarshi, yalpiz — hazmni yaxshilaydi, na'matak — C vitaminiga boy. ⚠️ Tabiiy vositalar ham faqat kattalar yoki shifokor maslahati bilan va me'yorida ishlatiladi.", en: '<b>Conclusion:</b> the useful substances in medicinal plants dissolve well in hot water — that is why infusions are made. Chamomile fights inflammation, mint aids digestion, rose hip is rich in vitamin C. ⚠️ Natural remedies too are used only on an adult’s or doctor’s advice and in moderation.' }, f() { c1.setLevel(0.42); c2.setLevel(0.42); c1.setColor(tea); c1.setOpacity(0.7); c2.setColor(water.clone().lerp(tea, 0.2)); tint(c1, tea, 0.8); tint(c2, water.clone().lerp(tea, 0.2), 0.15); fall(fl1, -0.45, 1, 0.06); fall(fl2, 0.45, 1, c2.surface()); pl1.rate = 0; pl2.rate = 1; steam.rate = 2; sc1.draw('10:00'); sc2.draw('10:00'); lH.set(1); lCo.set(1); } },
        ],
        loop(dt) { pour1.tick(dt); pour2.tick(dt); pl1.tick(dt); pl2.tick(dt); steam.tick(dt); }, clear() { pour1.clear(); pour2.clear(); pl1.clear(); pl2.clear(); steam.clear(); }
      };
    }
  });

  /* 7. Plastik va tabiat: parchalanish vaqti va qayta ishlash — 6-sinf, 29-dars */
  Lab.def({
    id: 'plastic-decay', icon: '♻️', grade: [6], lessons: [[6, 29]],
    title: { uz: 'Tuproqda nima tez parchalanadi? Plastik va qayta ishlash', en: 'What breaks down in soil? Plastic and recycling' },
    desc: { uz: "Tuproqqa ko'milgan banan po'sti, qog'oz va olma qoldig'i bir necha hafta-oyda parchalanadi, plastik butilka esa yuzlab yillar saqlanadi va mikroplastikka aylanadi. Yechim — 3R: kamaytirish, qayta foydalanish, qayta ishlash.", en: 'A banana peel, paper and an apple core buried in soil break down in weeks or months, but a plastic bottle lasts hundreds of years and turns into microplastics. The answer is the 3 Rs: reduce, reuse, recycle.' },
    cam: { pos: [0, 1.5, 3.45], target: [0, 0.5, 0] },
    build(ctx) {
      const { scene } = ctx;
      const box = Lab.vessel([[0, 0], [1.02, 0], [1.02, 0.95]], {}); box.group.scale.set(1, 1, 0.36); scene.add(box.group);
      const soilM = new T.MeshStandardMaterial({ color: 0x5b3a22, roughness: 1 }); const soil = new T.Mesh(new T.BoxGeometry(1.95, 0.7, 0.66), soilM); soil.position.y = 0.36; scene.add(soil);
      const top = new T.Mesh(new T.BoxGeometry(1.95, 0.06, 0.66), M.std(0x3f7d2a, { roughness: 1 })); top.position.y = 0.74; scene.add(top);
      const R = rng(3); for (let i = 0; i < 40; i++) { const s = new T.Mesh(new T.DodecahedronGeometry(0.02 + R() * 0.03), M.std(0x8a7b6a)); s.position.set((R() - 0.5) * 1.9, 0.05 + R() * 0.6, 0.33); scene.add(s); }
      const items = [];
      const mk = (mesh, x, lab, life) => { mesh.position.set(x, 0.38, 0.28); scene.add(mesh); const L = ctx.label(lab, mesh, [0, 0.28, 0.1]); const Tg = ctx.label('', mesh, [0, -0.25, 0.1], 'tag'); items.push({ mesh, L, Tg, life, base: mesh.scale.clone() }); };
      const peel = new T.Group(); for (let k = 0; k < 3; k++) { const s = new T.Mesh(new T.CapsuleGeometry(0.03, 0.22, 6, 10), M.std(0xf1d04b, { roughness: 0.7 })); s.rotation.z = (k - 1) * 0.5; s.position.x = (k - 1) * 0.05; peel.add(s); }
      mk(peel, -0.72, { uz: "Banan po'sti", en: 'Banana peel' }, 0.08);
      const paper = new T.Mesh(new T.BoxGeometry(0.26, 0.2, 0.01), M.std(0xf3f3f3, { roughness: 0.95 })); paper.rotation.set(0.2, 0.3, 0.1); mk(paper, -0.25, { uz: "Qog'oz", en: 'Paper' }, 0.12);
      const core = new T.Mesh(new T.CylinderGeometry(0.05, 0.08, 0.16, 16), M.std(0xead9a4)); mk(core, 0.2, { uz: 'Olma qoldig\'i', en: 'Apple core' }, 0.06);
      const bot = new T.Group(); const bb = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.28, 24), M.glass({ opacity: 0.35, color: 0x10304a })); bb.renderOrder = 10; bot.add(bb); const bn = new T.Mesh(new T.CylinderGeometry(0.03, 0.07, 0.07, 20), bb.material); bn.position.y = 0.17; bot.add(bn); const bc = new T.Mesh(new T.CylinderGeometry(0.032, 0.032, 0.035, 16), M.std(0x1d4ed8)); bc.position.y = 0.22; bot.add(bc); bot.rotation.z = Math.PI / 2; mk(bot, 0.7, { uz: 'Plastik butilka', en: 'Plastic bottle' }, 99);
      const micro = []; for (let i = 0; i < 40; i++) { const m = new T.Mesh(new T.BoxGeometry(0.018, 0.018, 0.004), M.std([0x60a5fa, 0xf472b6, 0xfacc15][i % 3])); m.userData.p = V(0.7 + (R() - 0.5) * 0.5, 0.15 + R() * 0.5, 0.29); scene.add(m); micro.push(m); }
      const sc = clock(scene, 0, 1.15, -0.25);
      // recycling chain
      const chain = new T.Group(); chain.position.set(0, 0, 0.9); scene.add(chain);
      const step = (mesh, x) => { mesh.position.set(x, 0.1, 0); chain.add(mesh); return mesh; };
      const s1 = step(bot.clone(), -0.75); s1.rotation.set(0, 0, 0); s1.position.y = 0.04;
      const flakes = new T.Group(); for (let i = 0; i < 30; i++) { const f = new T.Mesh(new T.BoxGeometry(0.03, 0.005, 0.025), M.std(0x9ad0ff)); f.position.set((R() - 0.5) * 0.18, R() * 0.05, (R() - 0.5) * 0.18); f.rotation.set(R() * 3, R() * 3, R() * 3); flakes.add(f); } step(flakes, -0.25);
      const gran = new T.Group(); for (let i = 0; i < 30; i++) { const f = new T.Mesh(new T.SphereGeometry(0.014, 8, 6), M.std(0xdbeafe)); f.position.set((R() - 0.5) * 0.16, R() * 0.04, (R() - 0.5) * 0.16); gran.add(f); } step(gran, 0.25);
      const chair = new T.Group(); const seat = new T.Mesh(new T.BoxGeometry(0.22, 0.03, 0.22), M.std(0x22c55e, { roughness: 0.5 })); seat.position.y = 0.14; chair.add(seat); const backr = new T.Mesh(new T.BoxGeometry(0.22, 0.2, 0.03), seat.material); backr.position.set(0, 0.25, -0.1); chair.add(backr); [[-0.09, -0.09], [0.09, -0.09], [-0.09, 0.09], [0.09, 0.09]].forEach(([x, z]) => { const l = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 0.14, 8), seat.material); l.position.set(x, 0.07, z); chair.add(l); }); step(chair, 0.75); chair.position.y = 0;
      const arrows = [-0.5, 0, 0.5].map((x) => { const a = new T.Mesh(new T.ConeGeometry(0.04, 0.1, 12), M.std(0x16a34a)); a.rotation.z = -Math.PI / 2; a.position.set(x, 0.12, 0); chain.add(a); return a; });
      const lR = ctx.label({ uz: 'Qayta ishlash: butilka → bo\'lakchalar → granula → yangi buyum', en: 'Recycling: bottle → flakes → pellets → new product' }, chain, [0, 0.62, 0], 'micro');
      const T0 = [{ uz: '1 kun', en: '1 day' }, { uz: '2 hafta', en: '2 weeks' }, { uz: '2 oy', en: '2 months' }, { uz: '1 yil', en: '1 year' }, { uz: '450 yil', en: '450 years' }];
      const lifeTxt = [{ uz: '≈ 2–5 hafta', en: '≈ 2–5 weeks' }, { uz: '≈ 2–6 hafta', en: '≈ 2–6 weeks' }, { uz: '≈ 1–2 oy', en: '≈ 1–2 months' }, { uz: '≈ 450+ yil!', en: '≈ 450+ years!' }];
      return {
        reset() { items.forEach((it, i) => { it.mesh.visible = true; it.mesh.scale.copy(it.base); it.Tg.set(0); it.Tg.setText(lifeTxt[i]); }); items[3].mesh.visible = true; micro.forEach((m) => (m.visible = false)); sc.draw(ctx.lang === 'uz' ? T0[0].uz : T0[0].en); chain.visible = false; lR.set(0); },
        steps: [
          { dur: 4, cap: { uz: "Shisha idishdagi tuproqqa to'rtta narsani ko'mdik: <b>banan po'sti</b>, <b>qog'oz</b>, <b>olma qoldig'i</b> va <b>plastik butilka</b>. Ular bilan nima bo'lishini kuzatamiz.", en: 'We buried four things in soil in a glass tank: a <b>banana peel</b>, <b>paper</b>, an <b>apple core</b> and a <b>plastic bottle</b>. Let’s watch what happens to them.' } },
          { dur: 10, cap: { uz: "Vaqt tezlashtirildi. Tuproqdagi <b>bakteriyalar va zamburug'lar</b> tabiiy moddalarni parchalab, tuproqqa qaytaradi. Banan, olma va qog'oz bir necha hafta-oyda yo'qoladi.", en: 'Time is sped up. <b>Bacteria and fungi</b> in the soil break natural materials down and return them to the soil. The banana, apple and paper vanish in weeks or months.' }, f(p) { const ti = Math.min(3, Math.floor(p * 4)); sc.draw(ctx.lang === 'uz' ? T0[ti].uz : T0[ti].en); items.forEach((it, i) => { if (i === 3) return; const k = clamp(1 - p / (it.life * 6)); it.mesh.scale.copy(it.base).multiplyScalar(Math.max(0.001, k)); it.mesh.visible = k > 0.02; it.Tg.set(seg(p, it.life * 6 - 0.05, it.life * 6 + 0.05)); }); soilM.color.set(0x5b3a22).lerp(C(0x3e2716), p * 0.5); } },
          { dur: 6, cap: { uz: "Plastik butilka esa bir yildan keyin ham deyarli o'zgarmagan! U <b>450 yil</b> va undan ko'proq saqlanadi, asta-sekin <b>mikroplastik</b> zarrachalarga bo'linib, tuproq va suvni ifloslantiradi.", en: 'But the plastic bottle has hardly changed after a year! It lasts <b>450 years</b> or more, slowly breaking into <b>microplastic</b> bits that pollute soil and water.' }, f(p) { items.forEach((it, i) => { if (i < 3) { it.mesh.visible = false; it.Tg.set(1); } }); sc.draw(ctx.lang === 'uz' ? T0[p < 0.4 ? 3 : 4].uz : T0[p < 0.4 ? 3 : 4].en); const b = items[3]; b.mesh.scale.copy(b.base).multiplyScalar(1 - 0.5 * seg(p, 0.5, 1)); b.Tg.set(seg(p, 0.4, 0.5)); micro.forEach((m) => { const q = seg(p, 0.5, 1); m.visible = q > 0; m.position.copy(V(0.7, 0.38, 0.29).lerp(m.userData.p, q)); }); } },
          { dur: 6, cap: { uz: "<b>Yechim — 3R qoidasi:</b> plastikni <b>kamaytirish</b>, <b>qayta foydalanish</b> va <b>qayta ishlash</b>. Ajratib topshirilgan butilka maydalanadi, granulaga aylanadi va undan yangi buyum (masalan, stul) yasaladi.", en: '<b>The answer — the 3 Rs:</b> <b>reduce</b>, <b>reuse</b> and <b>recycle</b> plastic. A sorted bottle is shredded, turned into pellets and made into a new product (for example, a chair).' }, f(p) { items.forEach((it) => { it.Tg.set(1); }); items.slice(0, 3).forEach((it) => (it.mesh.visible = false)); micro.forEach((m) => { m.visible = true; m.position.copy(m.userData.p); }); chain.visible = true; const ch = chain.children; ch.forEach((o, i) => (o.visible = true)); [s1, flakes, gran, chair].forEach((o, i) => { o.scale.setScalar(ease(seg(p, i * 0.2, i * 0.2 + 0.2))); }); arrows.forEach((a, i) => (a.scale.setScalar(ease(seg(p, i * 0.2 + 0.15, i * 0.2 + 0.25))))); lR.set(seg(p, 0.8, 0.95)); } },
        ],
      };
    }
  });

  /* 8. Batareya tuproqda: kimyoviy chiqindi xavfi — 6-sinf, 30-dars */
  Lab.def({
    id: 'battery-leak', icon: '🔋', grade: [6], lessons: [[6, 30]],
    title: { uz: 'Tashlab yuborilgan batareya tabiatga qanday zarar yetkazadi?', en: 'How does a thrown-away battery harm nature?' },
    desc: { uz: "Tuproqqa tashlangan batareya korroziyaga uchraydi, undagi metall birikmalari yomg'ir suvi bilan yer osti suvlariga o'tadi va o'simliklarga zarar yetkazadi. Batareyalar maxsus qutiga topshiriladi.", en: 'A battery thrown on the ground corrodes; its metal compounds wash down with rain into groundwater and harm plants. Batteries must go into a special collection box.' },
    cam: { pos: [0, 1.4, 3.1], target: [0, 0.55, 0] },
    build(ctx) {
      const { scene } = ctx;
      const soilM = new T.MeshStandardMaterial({ color: 0x6b4428, roughness: 1 }); const soil = new T.Mesh(new T.BoxGeometry(1.8, 0.55, 0.8), soilM); soil.position.set(-0.3, 0.45, 0); scene.add(soil);
      const waterM = new T.MeshPhysicalMaterial({ color: 0x3aa0ff, roughness: 0.1, transmission: 0.5, thickness: 0.3, transparent: true, opacity: 0.85 }); const gw = new T.Mesh(new T.BoxGeometry(1.8, 0.16, 0.8), waterM); gw.position.set(-0.3, 0.09, 0); scene.add(gw);
      const grass = new T.Mesh(new T.BoxGeometry(1.8, 0.04, 0.8), M.std(0x3f8f2e, { roughness: 1 })); grass.position.set(-0.3, 0.74, 0); scene.add(grass);
      const plant = new T.Group(); const stem = new T.Mesh(new T.CylinderGeometry(0.012, 0.016, 0.35, 8), M.std(0x3a7d2c)); stem.position.y = 0.17; plant.add(stem); const leaves = []; for (let i = 0; i < 4; i++) { const l = new T.Mesh(new T.SphereGeometry(0.06, 12, 8), M.std(0x4caf50, { roughness: 0.6 })); l.scale.set(1.6, 0.25, 0.8); l.position.set(Math.cos(i * 1.57) * 0.07, 0.2 + i * 0.04, Math.sin(i * 1.57) * 0.07); l.rotation.y = -i * 1.57; plant.add(l); leaves.push(l); } plant.position.set(0.25, 0.76, 0.1); scene.add(plant);
      const bat = new T.Group(); const bb = new T.Mesh(new T.CylinderGeometry(0.06, 0.06, 0.28, 24), M.std(0x1f2937, { roughness: 0.35, metalness: 0.4 })); bat.add(bb); const band = new T.Mesh(new T.CylinderGeometry(0.061, 0.061, 0.1, 24), M.std(0xf59e0b, { metalness: 0.3, roughness: 0.4 })); band.position.y = 0.07; bat.add(band); const tip = new T.Mesh(new T.CylinderGeometry(0.02, 0.02, 0.02, 12), M.metal(0xdedede)); tip.position.y = 0.15; bat.add(tip); bat.rotation.z = Math.PI / 2; scene.add(bat);
      const rust = new T.Mesh(new T.SphereGeometry(0.075, 16, 10), M.std(0x8b4513, { roughness: 1, transparent: true, opacity: 0 })); rust.scale.set(2, 0.5, 1); scene.add(rust);
      const rain = Lab.drops(scene, { color: 0x9fd2ff, from: () => V(-0.3 + (Math.random() - 0.5) * 1.6, 1.6, (Math.random() - 0.5) * 0.6), to: () => 0.78 });
      const R = rng(9); const ions = []; for (let i = 0; i < 60; i++) { const m = new T.Mesh(new T.SphereGeometry(0.012, 8, 6), M.glow([0xff3b30, 0xffcc00, 0xb455ff][i % 3], 1)); m.userData.x = (R() - 0.5) * 0.5; m.userData.z = (R() - 0.5) * 0.3; m.userData.k = R(); scene.add(m); ions.push(m); }
      const bin = new T.Group(); const bx = new T.Mesh(new T.BoxGeometry(0.42, 0.55, 0.36), M.std(0x16a34a, { roughness: 0.5 })); bx.position.y = 0.275; bin.add(bx); const slot = new T.Mesh(new T.BoxGeometry(0.24, 0.02, 0.06), M.std(0x0b3d1d)); slot.position.set(0, 0.56, 0); bin.add(slot); const sym = Lab.textSprite('♻ 🔋', { size: 64, color: '#ffffff', scale: 0.14 }); sym.position.set(0, 0.32, 0.19); bin.add(sym); bin.position.set(1.05, 0, 0.1); scene.add(bin);
      const lB = ctx.label({ uz: 'Batareya', en: 'Battery' }, bat, [0, 0.15, 0]), lW = ctx.label({ uz: 'Yer osti suvi', en: 'Groundwater' }, gw, [-0.6, 0.12, 0.42], 'tag');
      const lM = ctx.label({ uz: 'Og\'ir metall birikmalari (Hg, Pb, Cd, Zn…)', en: 'Heavy-metal compounds (Hg, Pb, Cd, Zn…)' }, soil, [0, 0.0, 0.45], 'warn');
      const lBin = ctx.label({ uz: 'Batareyalar uchun maxsus quti', en: 'Special battery collection box' }, bin, [0, 0.75, 0], 'tag');
      const green = C(0x4caf50), dead = C(0x8d6e2f), blue = C(0x3aa0ff), murky = C(0x6b7b3a);
      return {
        reset() { bat.position.set(-0.4, 0.8, 0.15); bat.rotation.set(0, 0, Math.PI / 2); bat.visible = true; rust.material.opacity = 0; rust.position.set(-0.4, 0.77, 0.15); rain.rate = 0; ions.forEach((m) => (m.visible = false)); waterM.color.copy(blue); leaves.forEach((l) => l.material.color.copy(green)); plant.rotation.z = 0; lM.set(0); lBin.set(0); lB.set(1); },
        steps: [
          { dur: 3.5, cap: { uz: "Kimdir ishlatilgan <b>batareyani</b> oddiy yerga tashlab ketdi. Yonida o'simlik o'smoqda, pastda — <b>yer osti suvi</b> qatlami.", en: 'Someone dropped a used <b>battery</b> on the ground. A plant grows nearby; below is a layer of <b>groundwater</b>.' } },
          { dur: 7, cap: { uz: "Yomg'ir va namlik ta'sirida batareya qobig'i <b>korroziyaga</b> uchraydi (zanglaydi) va yoriladi. Ichidagi kimyoviy moddalar tashqariga chiqadi.", en: 'Rain and moisture make the battery case <b>corrode</b> (rust) and crack. The chemicals inside leak out.' }, f(p) { rain.rate = 30 * (1 - seg(p, 0.8, 1)); bb.material.color.set(0x1f2937).lerp(C(0x7a4a24), seg(p, 0.2, 1)); rust.material.opacity = 0.8 * seg(p, 0.3, 1); } },
          { dur: 8, cap: { uz: "Zararli <b>metall birikmalari</b> yomg'ir suvi bilan tuproqqa singib, <b>yer osti suviga</b> yetib boradi. O'simlik ularni ildizi orqali so'radi — barglari sarg'ayadi va so'liydi.", en: 'Harmful <b>metal compounds</b> soak into the soil with rainwater and reach the <b>groundwater</b>. The plant takes them up through its roots — its leaves yellow and wilt.' }, f(p) { rust.material.opacity = 0.8; bb.material.color.set(0x7a4a24); rain.rate = 15; ions.forEach((m) => { const q = seg(p, m.userData.k * 0.4, 0.5 + m.userData.k * 0.5); m.visible = q > 0; m.position.set(-0.4 + m.userData.x * (0.3 + q), lerp(0.74, 0.1, q), 0.15 + m.userData.z); }); waterM.color.copy(blue).lerp(murky, seg(p, 0.5, 1)); leaves.forEach((l) => l.material.color.copy(green).lerp(dead, seg(p, 0.55, 1))); plant.rotation.z = 0.35 * seg(p, 0.6, 1); lM.set(seg(p, 0.15, 0.3)); } },
          { dur: 6, cap: { uz: "<b>To'g'ri yo'l:</b> batareya, energiya tejaydigan lampa, eski telefon kabi kimyoviy chiqindilar oddiy axlatga tashlanmaydi — <b>maxsus qutilarga</b> topshiriladi. Ulardan metallar qayta ajratib olinadi. Bitta batareya ~20 m² tuproqni ifloslantirishi mumkin!", en: '<b>The right way:</b> chemical waste such as batteries, energy-saving lamps and old phones never goes in ordinary rubbish — it goes into <b>special collection boxes</b>. The metals are recovered. One battery can pollute about 20 m² of soil!' }, f(p) { rain.rate = 0; ions.forEach((m) => (m.visible = false)); waterM.color.copy(blue).lerp(murky, 1 - seg(p, 0.3, 1) * 0.6); lM.set(0); const k = ease(seg(p, 0, 0.6)); bat.position.set(lerp(-0.4, 1.05, k), lerp(0.8, 0.65, k) + Math.sin(Math.PI * k) * 0.5, lerp(0.15, 0.1, k)); bat.rotation.z = lerp(Math.PI / 2, 0, k); bat.visible = p < 0.62; rust.material.opacity = 0.8 * (1 - seg(p, 0, 0.2)); lB.set(1 - seg(p, 0.5, 0.6)); lBin.set(seg(p, 0.55, 0.7)); leaves.forEach((l) => l.material.color.copy(dead).lerp(green, seg(p, 0.6, 1))); plant.rotation.z = 0.35 * (1 - seg(p, 0.6, 1)); } },
        ],
        loop(dt) { rain.tick(dt); }, clear() { rain.clear(); }
      };
    }
  });

  /* 9. Tuxum pishishi: oqsil denaturatsiyasi — 6-sinf, 33-dars */
  Lab.def({
    id: 'egg-cooking', icon: '🍳', grade: [6], lessons: [[6, 33]],
    title: { uz: 'Tuxum pishganda nima sodir bo\'ladi? (oqsil o\'zgarishi)', en: 'What happens when an egg cooks? (protein change)' },
    desc: { uz: "Tovaga chaqilgan tuxum oqi tiniq bo'ladi. Qizdirilganda oqsil molekulalari yoyilib, bir-biriga chigallashadi — oq rang paydo bo'ladi. Bu qaytmas kimyoviy o'zgarish.", en: 'Egg white cracked into a pan is clear. When heated, the protein molecules unfold and tangle together — it turns white. This is an irreversible chemical change.' },
    cam: { pos: [0, 1.6, 2.4], target: [0, 0.45, 0] },
    build(ctx) {
      const { scene } = ctx;
      const hp = new T.Mesh(new T.BoxGeometry(0.9, 0.12, 0.7), M.std(0x2b2f36, { roughness: 0.4, metalness: 0.3 })); hp.position.set(0, 0.06, 0); scene.add(hp);
      const coil = new T.Mesh(new T.TorusGeometry(0.22, 0.02, 8, 48), new T.MeshStandardMaterial({ color: 0x222222, emissive: 0xff3300, emissiveIntensity: 0 })); coil.rotation.x = Math.PI / 2; coil.position.y = 0.125; scene.add(coil);
      const pan = new T.Group(); const pb = new T.Mesh(new T.CylinderGeometry(0.34, 0.3, 0.06, 48, 1, true), M.std(0x1c1c1c, { roughness: 0.35, metalness: 0.5, side: T.DoubleSide })); pb.position.y = 0.03; pan.add(pb); const bottom = new T.Mesh(new T.CircleGeometry(0.3, 48), M.std(0x262626, { roughness: 0.3, metalness: 0.5 })); bottom.rotation.x = -Math.PI / 2; bottom.position.y = 0.005; pan.add(bottom); const hdl = new T.Mesh(new T.BoxGeometry(0.4, 0.03, 0.06), M.std(0x111111)); hdl.position.set(0.52, 0.05, 0); pan.add(hdl); pan.position.y = 0.13; scene.add(pan);
      const white = new T.Mesh(new T.CircleGeometry(0.2, 48), new T.MeshPhysicalMaterial({ color: 0xf0f0e0, roughness: 0.15, transmission: 0.85, thickness: 0.05, transparent: true, opacity: 0.6, clearcoat: 1 })); white.rotation.x = -Math.PI / 2; white.position.y = 0.145; white.scale.set(1.2, 1, 1); scene.add(white);
      const yolk = new T.Mesh(new T.SphereGeometry(0.075, 28, 16), M.std(0xffb300, { roughness: 0.25 })); yolk.scale.y = 0.55; scene.add(yolk);
      const shell = new T.Group(); [0, 1].forEach((k) => { const h = new T.Mesh(new T.SphereGeometry(0.08, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), M.std(0xf2e2c8, { roughness: 0.6, side: T.DoubleSide })); h.scale.y = 1.3; h.rotation.x = k ? Math.PI : 0; h.position.y = k ? -0.005 : 0.005; shell.add(h); }); scene.add(shell);
      const steam = Lab.puffs(scene, { origin: () => V(0, 0.2, 0), size: 0.15, op: 0.2, life: 1.6, spread: 0.12 });
      const mic = Lab.micro(scene, V(0.75, 0.95, 0.1), 0.42);
      const R = rng(12); const prot = [];
      for (let i = 0; i < 5; i++) { const coilPts = [], openPts = []; const cx = (R() - 0.5) * 0.35, cy = (R() - 0.5) * 0.3, cz = (R() - 0.5) * 0.2;
        for (let k = 0; k < 40; k++) { const a = k * 0.6; coilPts.push(V(cx + Math.cos(a) * 0.04, cy + Math.sin(a) * 0.04 + (k - 20) * 0.002, cz + (k - 20) * 0.003)); openPts.push(V(-0.32 + k * 0.016 + Math.sin(k * 0.5 + i) * 0.03, cy * 0.8 + Math.sin(k * 0.3 + i * 2) * 0.12, cz + Math.cos(k * 0.4 + i) * 0.08)); }
        const geo = new T.TubeGeometry(new T.CatmullRomCurve3(coilPts), 120, 0.009, 6, false); const mesh = new T.Mesh(geo, M.std([0xfacc15, 0x60a5fa, 0xf472b6, 0x34d399, 0xfb923c][i], { roughness: 0.4 })); mic.content.add(mesh); prot.push({ mesh, coilPts, openPts, k: -1 }); }
      const morph = (q) => prot.forEach((pr) => { const kq = Math.round(q * 20) / 20; if (pr.k === kq) return; pr.k = kq; const pts = pr.coilPts.map((v, i) => v.clone().lerp(pr.openPts[i], kq)); pr.mesh.geometry.dispose(); pr.mesh.geometry = new T.TubeGeometry(new T.CatmullRomCurve3(pts), 120, 0.009, 6, false); });
      const lM = ctx.label({ uz: 'Oqsil molekulalari', en: 'Protein molecules' }, mic.group, [0, 0.55, 0], 'micro');
      const lT = ctx.label('', pan, [-0.35, 0.25, 0.2], 'temp');
      return {
        reset() { shell.position.set(0, 0.7, 0); shell.visible = true; shell.children.forEach((h, k) => (h.position.y = k ? -0.005 : 0.005)); white.visible = false; yolk.visible = false; white.material.transmission = 0.85; white.material.opacity = 0.6; white.material.color.set(0xf0f0e0); coil.material.emissiveIntensity = 0; steam.rate = 0; mic.show(0); lM.set(0); morph(0); lT.set(0); },
        steps: [
          { dur: 4, cap: { uz: "Tuxumni sovuq tovaga chaqamiz. <b>Tuxum oqi</b> tiniq va suyuq — u asosan <b>suv va oqsildan</b> (albumin) iborat. Mikro-ko'rinishda oqsil molekulalari o'ralgan — «koptokcha» shaklida.", en: 'We crack an egg into a cold pan. The <b>egg white</b> is clear and runny — it is mostly <b>water and protein</b> (albumin). In the micro view the protein molecules are coiled into little "balls".' }, f(p) { shell.position.y = lerp(0.7, 0.3, ease(seg(p, 0, 0.35))); const o = seg(p, 0.35, 0.55); shell.children.forEach((h, k) => (h.position.y = (k ? -1 : 1) * (0.005 + 0.12 * o))); shell.visible = p < 0.6; white.visible = p > 0.45; white.scale.set(lerp(0.3, 1.2, ease(seg(p, 0.45, 0.8))), lerp(0.3, 1, ease(seg(p, 0.45, 0.8))), 1); yolk.visible = p > 0.45; yolk.position.set(0.02, lerp(0.3, 0.17, ease(seg(p, 0.45, 0.65))), 0.02); mic.show(seg(p, 0.6, 0.8)); lM.set(seg(p, 0.75, 0.9)); } },
          { dur: 9, cap: { uz: "Plitani yoqamiz. Harorat <b>60–70 °C</b> dan oshganda oqsil molekulalari <b>yoyiladi</b> va bir-biri bilan <b>chigallashib</b> qoladi — tiniq oqsil <b>oq va qattiq</b> bo'ladi (<b>denaturatsiya</b>).", en: 'We switch on the hotplate. Above <b>60–70 °C</b> the protein molecules <b>unfold</b> and <b>tangle</b> together — the clear white becomes <b>white and firm</b> (<b>denaturation</b>).' }, f(p) { shell.visible = false; white.visible = yolk.visible = true; white.scale.set(1.2, 1, 1); yolk.position.set(0.02, 0.17, 0.02); mic.show(1); lM.set(1); coil.material.emissiveIntensity = 1.2 * seg(p, 0, 0.3); const k = seg(p, 0.25, 0.9); white.material.transmission = lerp(0.85, 0.0, k); white.material.opacity = lerp(0.6, 1, k); white.material.color.set(0xf0f0e0).lerp(C(0xffffff), k); steam.rate = 6 * seg(p, 0.3, 0.5); morph(k); lT.setText(`${Math.round(lerp(20, 95, seg(p, 0, 0.8)))} °C`); lT.set(1); yolk.scale.y = 0.55 - 0.1 * k; } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> pishgan tuxumni qaytadan tiniq qilib bo'lmaydi — bu <b>qaytmas kimyoviy o'zgarish</b>. Ovqat pishirishda yangi moddalar, yangi rang, ta'm va hid paydo bo'ladi (non qizarishi, go'sht pishishi). Yetarli pishirish zararli mikroblarni ham yo'q qiladi.", en: '<b>Conclusion:</b> a cooked egg can never become clear again — it is an <b>irreversible chemical change</b>. Cooking creates new substances, colours, tastes and smells (bread browning, meat cooking). Cooking food enough also kills harmful microbes.' }, f() { white.visible = yolk.visible = true; white.material.transmission = 0; white.material.opacity = 1; white.material.color.set(0xffffff); coil.material.emissiveIntensity = 0.4; steam.rate = 2; mic.show(1); lM.set(1); morph(1); lT.setText('95 °C'); lT.set(1); } },
        ],
        loop(dt, s, c) { steam.tick(dt); mic.content.rotation.y += dt * 0.3; }, clear() { steam.clear(); }
      };
    }
  });

  /* 10. Nafasdagi karbonat angidrid: tinch holat va jismoniy mashqdan keyin — 6-sinf, 34-dars; 7-sinf, 48-dars */
  Lab.def({
    id: 'breath-limewater', icon: '🏃', grade: [6, 7], lessons: [[6, 34], [7, 48]],
    title: { uz: "Nafasimizda CO₂: sportdan keyin ko'proqmi?", en: 'CO₂ in our breath: is there more after exercise?' },
    desc: { uz: "Ohakli suvga (Ca(OH)₂) nafas chiqarilganda u loyqalanadi — nafasda karbonat angidrid bor. Yugurishdan keyin ohakli suv ancha tez loyqalanadi: mushaklar ko'p energiya sarflaydi va ko'proq CO₂ hosil bo'ladi.", en: 'Breathing out into limewater (Ca(OH)₂) makes it cloudy — our breath contains carbon dioxide. After running the limewater turns cloudy much faster: working muscles use more energy and make more CO₂.' },
    cam: { pos: [0, 1.45, 2.9], target: [0, 0.5, 0] },
    build(ctx) {
      const { scene } = ctx;
      const f1 = ctx.add(at(Lab.vessel(P.flask(0.3, 0.72, 0.08), { color: 0xeaf6ff, opacity: 0.4, level: 0.3 }), -0.5, 0, 0)), f2 = ctx.add(at(Lab.vessel(P.flask(0.3, 0.72, 0.08), { color: 0xeaf6ff, opacity: 0.4, level: 0.3 }), 0.5, 0, 0));
      const straw = (x) => { const m = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 0.75, 10), M.std(0xff6b9d, { roughness: 0.4 })); m.position.set(x + 0.02, 0.5, 0); m.rotation.z = -0.08; scene.add(m); return m; };
      straw(-0.5); straw(0.5);
      const b1 = Lab.bubbles(scene, { size: 0.02, speed: 0.6, region: () => ({ x: -0.48, z: 0, r: 0.03, y0: 0.06, y1: 0.3 }) }), b2 = Lab.bubbles(scene, { size: 0.022, speed: 0.6, region: () => ({ x: 0.52, z: 0, r: 0.03, y0: 0.06, y1: 0.3 }) });
      ctx.label({ uz: 'Tinch holatda', en: 'At rest' }, f1.group, [0, -0.06, 0.42]); ctx.label({ uz: '2 daqiqa yugurishdan keyin', en: 'After 2 minutes of running' }, f2.group, [0, -0.06, 0.42]);
      const sc1 = clock(scene, -0.5, 1.05, -0.45), sc2 = clock(scene, 0.5, 1.05, -0.45);
      const hr = ctx.label({ uz: '❤ 75 zarba/daq', en: '❤ 75 bpm' }, f1.group, [0, 0.95, 0], 'temp'), hr2 = ctx.label({ uz: '❤ 140 zarba/daq', en: '❤ 140 bpm' }, f2.group, [0, 0.95, 0], 'temp');
      const lC = ctx.label({ uz: 'Loyqalandi — CaCO₃ cho\'kmasi', en: 'Cloudy — CaCO₃ precipitate' }, f2.group, [0.32, 0.45, 0], 'tag');
      const clearC = C(0xeaf6ff), milk = C(0xf4f4f0);
      const cloud = (v, k) => { v.setColor(clearC.clone().lerp(milk, k)); v.setOpacity(0.4 + 0.5 * k); tint(v, clearC.clone().lerp(milk, k), k); };
      return {
        reset() { cloud(f1, 0); cloud(f2, 0); b1.rate = b2.rate = 0; sc1.draw('0 s'); sc2.draw('0 s'); hr.set(0); hr2.set(0); lC.set(0); },
        steps: [
          { dur: 4, cap: { uz: "Ikki kolbada tiniq <b>ohakli suv</b> — kalsiy gidroksid eritmasi. U karbonat angidridni aniqlovchi <b>indikator</b>: CO₂ bilan loyqalanadi.", en: 'Two flasks hold clear <b>limewater</b> — calcium hydroxide solution. It is an <b>indicator</b> for carbon dioxide: CO₂ makes it cloudy.' }, f(p) { hr.set(seg(p, 0.3, 0.5)); hr2.set(seg(p, 0.5, 0.7)); } },
          { dur: 9, cap: { uz: "Bir o'quvchi <b>tinch holatda</b>, ikkinchisi <b>yugurib kelgach</b> bir xil vaqt naycha orqali nafas chiqaradi. Yugurgan o'quvchining kolbasi <b>ancha tez</b> loyqalanadi!", en: 'One pupil <b>at rest</b> and another <b>just after running</b> breathe out through a straw for the same time. The runner’s flask turns cloudy <b>much faster</b>!' }, eq: 'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O', f(p) { hr.set(1); hr2.set(1); b1.rate = 25 * (1 - seg(p, 0.9, 1)); b2.rate = 45 * (1 - seg(p, 0.9, 1)); cloud(f1, 0.35 * ease(p)); cloud(f2, ease(seg(p, 0, 0.55))); sc1.draw(`${Math.round(30 * p)} s`); sc2.draw(`${Math.round(30 * p)} s`); lC.set(seg(p, 0.55, 0.65)); } },
          { dur: 6, cap: { uz: "<b>Xulosa:</b> organizmda oziq moddalar kislorod bilan «yonib» <b>energiya</b> beradi: oziq modda + O₂ → CO₂ + H₂O + energiya. Sportda mushaklar ko'p energiya sarflaydi — shuning uchun tez nafas olamiz, ko'proq CO₂ chiqaramiz va terlaymiz. Mashqdan keyin suv ichish muhim!", en: '<b>Conclusion:</b> in the body food "burns" with oxygen to give <b>energy</b>: food + O₂ → CO₂ + H₂O + energy. During sport the muscles use lots of energy — so we breathe faster, breathe out more CO₂ and sweat. Drinking water after exercise matters!' }, eq: { uz: 'oziq modda + O₂ → CO₂ + H₂O + energiya', en: 'food + O₂ → CO₂ + H₂O + energy' }, f() { b1.rate = b2.rate = 0; cloud(f1, 0.35); cloud(f2, 1); sc1.draw('30 s'); sc2.draw('30 s'); hr.set(1); hr2.set(1); lC.set(1); } },
        ],
        loop(dt) { b1.tick(dt); b2.tick(dt); }, clear() { b1.clear(); b2.clear(); }
      };
    }
  });

  Lab.list.sort((a, b) => (a.lessons[0][0] - b.lessons[0][0]) || (a.lessons[0][1] - b.lessons[0][1]));
})();
