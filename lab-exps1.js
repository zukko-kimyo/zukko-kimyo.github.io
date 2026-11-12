/* Tajribalar — 1-qism (6-sinf asosiy tajribalari) */
(function () {
  const T = THREE, { clamp, lerp, ease, seg, rng } = Lab.m, M = Lab.M, P = Lab.profiles;
  const at = (o, x, y, z) => { (o.group || o).position.set(x, y, z); return o; };
  const V = (x, y, z) => new T.Vector3(x, y, z);
  Lab.util = { at, V };

  function pile(color = 0xffffff, r = 0.18, h = 0.08) { const m = new T.Mesh(new T.ConeGeometry(r, h, 24), M.std(color, { roughness: 0.95 })); m.position.y = h / 2; m.castShadow = true; return m; }
  function dish(r = 0.3) { const v = Lab.vessel([[0, 0], [r, 0], [r, 0.06]], { rim: true }); return v; }
  function grains(n, color, size, seed) { const g = new T.Group(); const R = rng(seed || 5); const geo = new T.BoxGeometry(1, 1, 1); const mat = M.std(color, { roughness: 0.9 }); const arr = []; for (let i = 0; i < n; i++) { const m = new T.Mesh(geo, mat); m.scale.setScalar(size * (0.6 + R() * 0.8)); m.rotation.set(R() * 3, R() * 3, R() * 3); g.add(m); arr.push({ m, a: R() * Math.PI * 2, r: Math.sqrt(R()), d: R() }); } return { group: g, arr }; }
  Lab.util.pile = pile; Lab.util.dish = dish; Lab.util.grains = grains;

  /* 1. Sirka + soda */
  Lab.def({
    id: 'soda-vinegar', icon: '🫧', grade: [6, 7],
    title: { uz: "Sirka va soda — mo'jizali uchrashuv", en: 'Vinegar and baking soda reaction' },
    desc: { uz: "Kimyoviy reaksiya belgisi — gaz ajralishi. Hosil bo'lgan CO₂ sharni puflaydi.", en: 'A sign of a chemical reaction — gas release. The CO₂ formed inflates a balloon.' },
    cam: { pos: [0.2, 2.1, 4.4], target: [0, 0.6, 0] },
    build(ctx) {
      const { scene } = ctx;
      const bk = ctx.add(at(Lab.vessel(P.beaker(0.42, 1.0), { color: 0xe9d48f, opacity: 0.55, level: 0.32, marks: 4 }), -0.8, 0, 0));
      const d = ctx.add(at(dish(0.28), 0.35, 0, 0.75)); const soda = pile(0xffffff, 0.2, 0.09); d.group.add(soda);
      const sp = Lab.spoon(); scene.add(sp.group); const load = pile(0xffffff, 0.06, 0.04); load.position.y = -0.02; sp.group.add(load);
      const fall = grains(40, 0xffffff, 0.02, 11); scene.add(fall.group);
      const foam = new T.Mesh(new T.CylinderGeometry(0.39, 0.39, 1, 32), M.std(0xffffff, { transparent: true, opacity: 0.85, roughness: 1 })); bk.group.add(foam);
      const fizz = Lab.bubbles(scene, { size: 0.022, speed: 0.6, region: () => ({ x: -0.8, z: 0, r: 0.33, y0: 0.03, y1: bk.level }) });
      const gas = Lab.puffs(scene, { color: 0xe8f6ff, op: 0.25, size: 0.3, origin: () => V(-0.8, bk.level + 0.1, 0), spread: 0.2 });
      // flask + balloon
      const fk = ctx.add(at(Lab.vessel(P.flask(0.42, 1.0, 0.1), { color: 0xe9d48f, opacity: 0.55, level: 0.25 }), 1.15, 0, -0.1));
      const bal = Lab.balloon(0xff4d6d); bal.group.position.set(1.15, 1.0, -0.1); scene.add(bal.group); bal.set(0);
      const fizz2 = Lab.bubbles(scene, { size: 0.018, speed: 0.5, region: () => ({ x: 1.15, z: -0.1, r: 0.3, y0: 0.03, y1: fk.level }) });
      const mic = Lab.micro(scene, V(-0.1, 1.62, -0.4), 0.6);
      const H = Lab.atomMesh('H', 0.9), hco3 = Lab.molecule([['C', 0, 0, 0], ['O', 0.32, 0.1, 0], ['O', -0.2, 0.25, 0], ['O', -0.1, -0.3, 0], ['H', -0.42, -0.42, 0]], [[0, 1], [0, 2], [0, 3], [3, 4]], 0.8);
      const co2 = Lab.mol('CO2', 0.8), h2o = Lab.mol('H2O', 0.8); [H, hco3, co2, h2o].forEach((o) => mic.content.add(o));
      const lCO2 = ctx.label({ uz: 'CO₂ gazi', en: 'CO₂ gas' }, V(-0.8, 1.35, 0), [0, 0, 0], 'tag');
      const lSoda = ctx.label({ uz: 'Soda (NaHCO₃)', en: 'Baking soda (NaHCO₃)' }, d.group, [0, 0.25, 0]);
      const lVin = ctx.label({ uz: 'Sirka (CH₃COOH)', en: 'Vinegar (CH₃COOH)' }, bk.group, [0, 1.12, 0]);
      const lMic = ctx.label({ uz: 'Mikro-ko\'rinish', en: 'Micro view' }, mic.group, [0, 0.72, 0], 'micro');
      const spP = (p) => { // spoon path: dish -> beaker
        const a = V(0.35, 0.12, 0.75), b = V(0.35, 0.5, 0.6), c = V(-0.8, 1.35, 0.05);
        if (p < 0.4) return a.clone().lerp(b, ease(p / 0.4)); return b.clone().lerp(c, ease((p - 0.4) / 0.6));
      };
      return {
        reset() {
          sp.group.position.copy(spP(0)); sp.group.rotation.set(0, 0, 0); load.visible = false; soda.scale.set(1, 1, 1);
          fall.group.visible = false; foam.visible = false; fizz.rate = 0; gas.rate = 0; fizz2.rate = 0; bal.set(0);
          bal.group.rotation.z = Math.PI * 0.6; bal.group.position.set(1.25, 1.02, -0.1); mic.show(0); [H, hco3, co2, h2o].forEach((o) => (o.visible = false));
          lCO2.set(0); lMic.set(0); lSoda.set(1); lVin.set(1); bk.setColor(0xe9d48f);
        },
        steps: [
          { dur: 3, cap: { uz: "Stakanda <b>sirka</b> (sirka kislotasining suvdagi eritmasi), likopchada esa oq kukun — <b>ichimlik sodasi</b> bor.", en: 'The beaker holds <b>vinegar</b> (a solution of acetic acid); the dish holds a white powder — <b>baking soda</b>.' } },
          { dur: 4, cap: { uz: 'Qoshiq bilan bir qoshiq soda olamiz va stakan ustiga olib boramiz.', en: 'We take one spoonful of soda and bring it above the beaker.' }, f(p) { sp.group.position.copy(spP(p)); load.visible = p > 0.15; soda.scale.y = 1 - 0.25 * seg(p, 0.1, 0.3); } },
          { dur: 2.5, cap: { uz: 'Sodani sirkaga solamiz…', en: 'We add the soda to the vinegar…' }, f(p) { sp.group.position.copy(spP(1)); sp.group.rotation.x = -1.6 * ease(seg(p, 0, 0.4)); load.visible = p < 0.4; fall.group.visible = p > 0.3 && p < 0.95; fall.arr.forEach((g) => { const k = clamp((p - 0.3) / 0.5 - g.d * 0.4); g.m.position.set(-0.8 + Math.cos(g.a) * g.r * 0.1, 1.3 - k * (1.3 - 0.32), 0.05 + Math.sin(g.a) * g.r * 0.1); g.m.visible = k < 1; }); fizz.rate = 160 * seg(p, 0.6, 1); } },
          { dur: 5, cap: { uz: "Ko'pik va pufakchalar! Bu — <b>karbonat angidrid (CO₂)</b> gazi. Yangi modda hosil bo'ldi — demak, bu <b>kimyoviy reaksiya</b>.", en: 'Foam and bubbles! This is <b>carbon dioxide (CO₂)</b> gas. A new substance formed — so this is a <b>chemical reaction</b>.' }, eq: 'CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑', f(p) { sp.group.position.copy(spP(1)); sp.group.rotation.x = -1.6; fizz.rate = 220 * (1 - 0.5 * p); gas.rate = 14; foam.visible = true; const h = 0.75 * Math.sin(Math.PI * Math.min(1, p * 1.1)) + 0.02; foam.scale.y = h; foam.position.y = 0.32 + h / 2; lCO2.set(seg(p, 0.1, 0.3)); bk.setColor(0xf0e2b0); } },
          { dur: 6, cap: { uz: "Mikro-ko'rinish: sirka kislotasining H⁺ ioni soda tarkibidagi HCO₃⁻ bilan uchrashadi va <b>suv (H₂O)</b> hamda <b>CO₂</b> molekulalari hosil bo'ladi.", en: 'Micro view: an H⁺ ion from the acid meets HCO₃⁻ from the soda, forming <b>water (H₂O)</b> and <b>CO₂</b> molecules.' }, eq: 'H⁺ + HCO₃⁻ → H₂O + CO₂↑', cam: { pos: [0.4, 2.2, 3.7], target: [-0.3, 1.25, -0.3] },
            f(p) { fizz.rate = 50; gas.rate = 6; lCO2.set(1 - seg(p, 0, 0.2)); mic.show(seg(p, 0, 0.15)); lMic.set(seg(p, 0.1, 0.2)); const k = ease(seg(p, 0.15, 0.5)); H.visible = hco3.visible = p < 0.55; H.position.set(lerp(-0.45, -0.12, k), 0, 0); hco3.position.set(lerp(0.4, 0.1, k), 0, 0); hco3.rotation.z = p * 2; const q = seg(p, 0.55, 1); co2.visible = h2o.visible = p >= 0.55; co2.position.set(0.1, -0.1 + 0.45 * ease(q), 0); co2.rotation.y = p * 6; h2o.position.set(-0.2, -0.15 - 0.15 * q, 0.1); } },
          { dur: 4, cap: { uz: "Endi kolbadagi sirka ustiga ichida soda bo'lgan shar kiydirilgan. Sharni ko'tarib, sodani kolbaga to'kamiz.", en: 'Now a balloon with soda inside is fitted on a flask of vinegar. We lift the balloon so the soda falls in.' }, cam: { pos: [2.6, 2.2, 3.9], target: [1.0, 0.9, -0.1] }, f(p) { mic.show(1 - seg(p, 0, 0.2)); lMic.set(0); lSoda.set(0); lVin.set(0); fizz.rate = 15; const k = ease(seg(p, 0.1, 0.8)); bal.group.rotation.z = lerp(Math.PI * 0.6, 0, k); bal.group.position.set(lerp(1.25, 1.15, k), 1.0, -0.1); fizz2.rate = 120 * seg(p, 0.75, 1); } },
          { dur: 6, cap: { uz: "Ajralgan CO₂ gazi chiqib keta olmaydi va <b>sharni puflaydi</b>. Gaz ko'zga ko'rinmasa ham, hajm egallaydi va massaga ega!", en: 'The CO₂ released cannot escape and <b>inflates the balloon</b>. Gas is invisible, yet it takes up space and has mass!' }, f(p) { bal.group.rotation.z = 0; bal.group.position.set(1.15, 1.0, -0.1); bal.set(ease(p)); fizz2.rate = 140 * (1 - p * 0.6); } },
          { dur: 4, cap: { uz: "<b>Xulosa:</b> gaz ajralishi, ko'piklanish — kimyoviy reaksiya belgilari. Reaksiyada yangi moddalar: CO₂, suv va natriy atsetat hosil bo'ldi.", en: '<b>Conclusion:</b> gas release and fizzing are signs of a chemical reaction. New substances formed: CO₂, water and sodium acetate.' }, eq: 'CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑', cam: { pos: [0.2, 2.1, 4.4], target: [0.2, 0.6, 0] }, f(p) { bal.group.rotation.z = 0; bal.group.position.set(1.15, 1.0, -0.1); bal.set(1); fizz2.rate = 40; fizz.rate = 10; } },
        ],
        loop(dt, s, c) { fizz.tick(dt); fizz2.tick(dt); gas.tick(dt); },
        clear() { fizz.clear(); fizz2.clear(); gas.clear(); }
      };
    }
  });

  /* 2. Tuzning suvda erishi (mikro) */
  Lab.def({
    id: 'salt-dissolve', icon: '🧂', grade: [6],
    title: { uz: 'Tuzning suvda erishi', en: 'Dissolving salt in water' },
    desc: { uz: "Tuz suvda eriydi, lekin yo'qolmaydi: Na⁺ va Cl⁻ ionlari suv molekulalari orasida tarqaladi.", en: 'Salt dissolves but does not disappear: Na⁺ and Cl⁻ ions spread out among water molecules.' },
    cam: { pos: [0.6, 1.9, 4.2], target: [0.3, 0.8, 0] },
    build(ctx) {
      const { scene } = ctx;
      const b1 = ctx.add(at(Lab.vessel(P.beaker(0.38, 0.95), { color: 0xbfe6ff, opacity: 0.45, level: 0.6, marks: 4 }), -1.0, 0, 0));
      const b2 = ctx.add(at(Lab.vessel(P.beaker(0.38, 0.95), { color: 0xbfe6ff, opacity: 0.45, level: 0.6, marks: 4 }), 0.0, 0, 0));
      ctx.label({ uz: '1-stakan: suv', en: 'Beaker 1: water' }, b1.group, [0, 1.1, 0]); ctx.label({ uz: '2-stakan: suv + tuz', en: 'Beaker 2: water + salt' }, b2.group, [0, 1.1, 0]);
      const cr = grains(70, 0xffffff, 0.035, 21); scene.add(cr.group);
      const rod = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 1.1, 8), M.glass()); rod.material.opacity = 0.6; scene.add(rod);
      const mic = Lab.micro(scene, V(1.45, 1.15, 0), 0.85);
      // lattice and water
      const lat = new T.Group(); mic.content.add(lat); const ions = [];
      const R = rng(9);
      for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) for (let z = 0; z < 3; z++) {
        const el = (x + y + z) % 2 ? 'Na' : 'Cl'; const m = Lab.atomMesh(el, 0.55); const home = V((x - 1) * 0.17, (y - 1) * 0.17, (z - 1) * 0.17); m.position.copy(home); lat.add(m);
        const a = R() * Math.PI * 2, b = Math.acos(2 * R() - 1), r = 0.3 + R() * 0.38; ions.push({ m, home, far: V(r * Math.sin(b) * Math.cos(a), r * Math.cos(b), r * Math.sin(b) * Math.sin(a)), d: R() });
      }
      const waters = []; for (let i = 0; i < 26; i++) { const w = Lab.mol('H2O', 0.42); const a = R() * Math.PI * 2, b = Math.acos(2 * R() - 1), r = 0.3 + R() * 0.45; w.position.set(r * Math.sin(b) * Math.cos(a), r * Math.cos(b), r * Math.sin(b) * Math.sin(a)); w.rotation.set(R() * 6, R() * 6, R() * 6); w.userData.s = R() * 6; mic.content.add(w); waters.push(w); }
      const lNa = ctx.label('Na⁺', V(0, 0, 0), [0, 0, 0], 'ion'); const lCl = ctx.label('Cl⁻', V(0, 0, 0), [0, 0, 0], 'ion');
      return {
        reset() { cr.group.visible = false; rod.visible = false; mic.show(0); lNa.set(0); lCl.set(0); ions.forEach((o) => o.m.position.copy(o.home)); b2.setOpacity(0.45); },
        steps: [
          { dur: 3, cap: { uz: 'Ikkita shaffof stakanga bir xil miqdorda suv quyilgan.', en: 'Two clear beakers hold equal amounts of water.' } },
          { dur: 3.5, cap: { uz: "2-stakanga bir choy qoshiq <b>osh tuzi (NaCl)</b> solamiz. Tuz kristallari tubiga cho'kadi.", en: 'We add one teaspoon of <b>table salt (NaCl)</b> to beaker 2. The crystals sink to the bottom.' }, f(p) { cr.group.visible = true; cr.arr.forEach((g) => { const k = ease(clamp(p * 1.4 - g.d * 0.4)); g.m.position.set(Math.cos(g.a) * g.r * lerp(0.05, 0.3, k), lerp(1.3, 0.04 + g.d * 0.03, k), Math.sin(g.a) * g.r * lerp(0.05, 0.3, k)); g.m.visible = true; }); } },
          { dur: 4.5, cap: { uz: "Shisha tayoqcha bilan aralashtiramiz. Kristallar kichrayib boradi va <b>ko'zdan yo'qoladi</b>.", en: 'We stir with a glass rod. The crystals shrink and <b>disappear from view</b>.' }, f(p) { rod.visible = true; const a = p * 30; rod.position.set(Math.cos(a) * 0.15, 0.62, Math.sin(a) * 0.15); rod.rotation.z = 0.15; cr.arr.forEach((g) => { const k = clamp(p * 1.3 - g.d * 0.3); g.m.position.set(Math.cos(g.a + p * 8) * g.r * 0.3, 0.04 + g.d * 0.3 * k, Math.sin(g.a + p * 8) * g.r * 0.3); g.m.visible = k < 0.95; g.m.scale.setScalar(0.035 * (1 - k) + 0.001); }); } },
          { dur: 7, cap: { uz: "Mikro-ko'rinish: suv molekulalari tuz kristalini o'rab oladi va <b>Na⁺</b> hamda <b>Cl⁻</b> ionlarini bir-biridan ajratib, butun hajm bo'ylab tarqatadi.", en: 'Micro view: water molecules surround the crystal and pull <b>Na⁺</b> and <b>Cl⁻</b> ions apart, spreading them throughout the water.' }, cam: { pos: [1.6, 1.6, 3.2], target: [1.1, 1.05, 0] }, f(p) { rod.visible = false; cr.group.visible = false; mic.show(seg(p, 0, 0.15)); ions.forEach((o) => { const k = ease(seg(p, 0.2 + o.d * 0.4, 0.55 + o.d * 0.4)); o.m.position.lerpVectors(o.home, o.far, k); }); const k = seg(p, 0.7, 0.85); lNa.set(k); lCl.set(k); const na = ions.find((o) => o.m.material.color.getHex() === Lab.ATOM.Na[0]), cl = ions.find((o) => o.m.material.color.getHex() === Lab.ATOM.Cl[0]); na.m.getWorldPosition(lNa.target); cl.m.getWorldPosition(lCl.target); lNa.off.set(0, 0.08, 0); lCl.off.set(0, 0.08, 0); } },
          { dur: 4, cap: { uz: "<b>Xulosa:</b> tuz suvda eridi, lekin yo'qolmadi — tuzli suv sho'r ta'mga ega. Erish — <b>fizik hodisa</b>, tuzning tarkibi o'zgarmaydi. Hosil bo'lgan tuzli suv — <b>eritma</b>.", en: '<b>Conclusion:</b> the salt dissolved but did not vanish — the water tastes salty. Dissolving is a <b>physical change</b>; the salt itself is unchanged. Salty water is a <b>solution</b>.' }, cam: { pos: [0.6, 1.9, 4.2], target: [0.3, 0.8, 0] }, f(p) { mic.show(1); ions.forEach((o) => o.m.position.copy(o.far)); lNa.set(1); lCl.set(1); const na = ions.find((o) => o.m.material.color.getHex() === Lab.ATOM.Na[0]), cl = ions.find((o) => o.m.material.color.getHex() === Lab.ATOM.Cl[0]); na.m.getWorldPosition(lNa.target); cl.m.getWorldPosition(lCl.target); } },
        ],
        loop(dt, s, c) { waters.forEach((w) => { w.rotation.y += dt * 0.8; w.position.y += Math.sin(c.t * 2 + w.userData.s) * 0.0008; }); if (s.i >= 3) ions.forEach((o) => { o.m.position.x += Math.sin(c.t * 3 + o.d * 9) * 0.0006; }); }
      };
    }
  });

  /* 3. Eritma va aralashma: shakar va qum */
  Lab.def({
    id: 'solution-mixture', icon: '🥤', grade: [6, 7],
    title: { uz: 'Eritma va aralashma: shakar va qum', en: 'Solution vs mixture: sugar and sand' },
    desc: { uz: "Shakar suvda erib eritma hosil qiladi, qum esa erimay cho'kadi — aralashma.", en: 'Sugar dissolves forming a solution; sand does not dissolve and settles — a mixture.' },
    cam: { pos: [0, 1.9, 4.0], target: [0, 0.6, 0] },
    build(ctx) {
      const { scene } = ctx;
      const b1 = ctx.add(at(Lab.vessel(P.beaker(0.38, 0.95), { color: 0xbfe6ff, opacity: 0.45, level: 0.6 }), -0.7, 0, 0));
      const b2 = ctx.add(at(Lab.vessel(P.beaker(0.38, 0.95), { color: 0xbfe6ff, opacity: 0.45, level: 0.6 }), 0.7, 0, 0));
      const l1 = ctx.label({ uz: '1-stakan: shakar', en: 'Beaker 1: sugar' }, b1.group, [0, 1.1, 0]); const l2 = ctx.label({ uz: '2-stakan: qum', en: 'Beaker 2: sand' }, b2.group, [0, 1.1, 0]);
      const sug = grains(60, 0xffffff, 0.03, 4); b1.group.add(sug.group); const sand = grains(90, 0xd9a85b, 0.03, 8); b2.group.add(sand.group);
      const cloud = new T.Mesh(new T.CylinderGeometry(0.35, 0.35, 0.5, 32), M.liquid(0xc9a46a, 0.0)); cloud.position.y = 0.3; b2.group.add(cloud);
      const lr1 = ctx.label({ uz: 'ERITMA — bir jinsli', en: 'SOLUTION — uniform' }, b1.group, [0, -0.15, 0.4], 'tag'); const lr2 = ctx.label({ uz: "ARALASHMA — qum cho'kdi", en: 'MIXTURE — sand settled' }, b2.group, [0, -0.15, 0.4], 'tag');
      return {
        reset() { sug.group.visible = sand.group.visible = false; cloud.material.opacity = 0; lr1.set(0); lr2.set(0); },
        steps: [
          { dur: 3, cap: { uz: "Ikki stakan suv olamiz (darslikdagi «Uy laboratoriyasi» tajribasi).", en: 'We take two beakers of water (the "Home laboratory" activity from the textbook).' } },
          { dur: 3.5, cap: { uz: "1-stakanga bir choy qoshiq <b>shakar</b>, 2-stakanga bir choy qoshiq <b>qum</b> solamiz.", en: 'Add one teaspoon of <b>sugar</b> to beaker 1 and one teaspoon of <b>sand</b> to beaker 2.' }, f(p) { [sug, sand].forEach((s) => { s.group.visible = true; s.arr.forEach((g) => { const k = ease(clamp(p * 1.4 - g.d * 0.4)); g.m.position.set(Math.cos(g.a) * g.r * lerp(0.05, 0.3, k), lerp(1.3, 0.03 + g.d * 0.04, k), Math.sin(g.a) * g.r * lerp(0.05, 0.3, k)); g.m.visible = true; g.m.scale.setScalar(0.03); }); }); } },
          { dur: 4, cap: { uz: 'Ikkalasini ham yaxshilab aralashtiramiz.', en: 'Stir both well.' }, f(p) { sug.arr.forEach((g) => { const k = clamp(p * 1.2 - g.d * 0.2); g.m.position.set(Math.cos(g.a + p * 10) * g.r * 0.3, 0.03 + 0.4 * g.d * Math.sin(Math.PI * Math.min(1, k)), Math.sin(g.a + p * 10) * g.r * 0.3); g.m.scale.setScalar(0.03 * (1 - k) + 0.001); g.m.visible = k < 0.97; }); sand.arr.forEach((g) => { g.m.position.set(Math.cos(g.a + p * 10) * g.r * 0.3, 0.03 + 0.45 * g.d * Math.sin(Math.PI * p), Math.sin(g.a + p * 10) * g.r * 0.3); }); cloud.material.opacity = 0.35 * Math.sin(Math.PI * p); } },
          { dur: 4.5, cap: { uz: "Shakar butunlay «yo'qoldi» — u eridi va <b>eritma</b> hosil bo'ldi. Qum esa erimadi va asta-sekin <b>tubiga cho'kdi</b> — bu <b>aralashma</b>.", en: 'The sugar "disappeared" — it dissolved, forming a <b>solution</b>. The sand did not dissolve and slowly <b>settled to the bottom</b> — this is a <b>mixture</b>.' }, f(p) { sug.group.visible = false; sand.arr.forEach((g) => { const k = ease(p); g.m.position.set(Math.cos(g.a) * g.r * 0.32, lerp(0.03 + 0.45 * g.d * 0.3, 0.02 + g.d * 0.03, k), Math.sin(g.a) * g.r * 0.32); }); cloud.material.opacity = 0.2 * (1 - p); lr1.set(seg(p, 0.3, 0.5)); lr2.set(seg(p, 0.6, 0.8)); } },
          { dur: 4, cap: { uz: "<b>Esda tuting:</b> har bir eritma aralashmadir, ammo har bir aralashma eritma bo'lavermaydi. Qumni filtrlash orqali ajratish mumkin.", en: '<b>Remember:</b> every solution is a mixture, but not every mixture is a solution. Sand can be separated by filtration.' }, f() { sug.group.visible = false; lr1.set(1); lr2.set(1); } },
        ],
      };
    }
  });

  /* 4. Filtrlash */
  Lab.def({
    id: 'filtration', icon: '🧪', grade: [6, 7],
    title: { uz: 'Filtrlash: loyqa suvni tozalash', en: 'Filtration: cleaning muddy water' },
    desc: { uz: "Erimagan qattiq zarrachalar filtr qog'ozida qoladi, toza suv filtrdan o'tadi.", en: 'Undissolved solid particles stay on the filter paper; clean water passes through.' },
    cam: { pos: [1.2, 1.9, 3.6], target: [0, 0.9, 0] },
    build(ctx) {
      const { scene } = ctx;
      const st = Lab.stand(1.8); scene.add(st.group); st.addRing(1.22, 0.22);
      const rec = ctx.add(at(Lab.vessel(P.beaker(0.36, 0.8), { color: 0xd8f0ff, opacity: 0.5 }), 0, 0, 0));
      // funnel
      const fun = Lab.vessel([[0.03, 0], [0.04, 0], [0.04, 0.32], [0.3, 0.68]], { color: 0x8a6a3c, opacity: 0.85, rim: true }); at(fun, 0, 0.62, 0); scene.add(fun.group);
      const paper = new T.Mesh(new T.ConeGeometry(0.27, 0.32, 32, 1, true), M.std(0xfafafa, { side: T.DoubleSide, roughness: 1 })); paper.rotation.x = Math.PI; paper.position.y = 0.62 + 0.34 + 0.16; scene.add(paper);
      const mud = new T.Mesh(new T.ConeGeometry(0.2, 0.12, 32), M.std(0x7a5a33, { roughness: 1 })); mud.rotation.x = Math.PI; scene.add(mud);
      const src = Lab.vessel(P.beaker(0.3, 0.75), { color: 0x8a6a3c, opacity: 0.85, level: 0.5 }); scene.add(src.group);
      const stream = new T.Mesh(new T.CylinderGeometry(0.02, 0.02, 1, 8), M.liquid(0x8a6a3c, 0.85)); scene.add(stream);
      const dr = Lab.drops(scene, { color: 0xbfe6ff, from: () => V(0, 0.6, 0), to: () => Math.max(0.05, rec.level) });
      const lP = ctx.label({ uz: "Filtr qog'ozi", en: 'Filter paper' }, paper, [0.35, 0.05, 0]); const lF = ctx.label({ uz: 'Voronka', en: 'Funnel' }, fun.group, [-0.35, 0.4, 0]);
      const lM = ctx.label({ uz: 'Loy filtrda qoldi', en: 'Mud stays on the filter' }, mud, [0, 0.2, 0], 'tag'); const lW = ctx.label({ uz: 'Toza suv (filtrat)', en: 'Clean water (filtrate)' }, rec.group, [0, 0.9, 0], 'tag');
      const srcPose = (p) => { const k = ease(p); src.group.position.set(lerp(1.1, 0.42, k), lerp(0, 1.3, k), 0); src.group.rotation.z = lerp(0, 1.9, ease(seg(p, 0.5, 1))); };
      return {
        reset() { srcPose(0); src.setLevel(0.5); stream.visible = false; fun.setLevel(0); rec.setLevel(0); dr.rate = 0; mud.visible = false; lM.set(0); lW.set(0); lP.set(1); lF.set(1); },
        steps: [
          { dur: 3, cap: { uz: "Shtativga voronka o'rnatilgan, voronkaga konus shaklida buklangan <b>filtr qog'ozi</b> joylashtirilgan. Stakanda — <b>loyqa suv</b> (loy + suv aralashmasi).", en: 'A funnel is fixed on a stand with a cone of <b>filter paper</b> inside. The beaker holds <b>muddy water</b> (a mixture of soil and water).' } },
          { dur: 3, cap: { uz: 'Loyqa suvni sekin, shisha tayoqcha bo\'ylab voronkaga quyamiz.', en: 'We slowly pour the muddy water into the funnel.' }, f(p) { srcPose(p); } },
          { dur: 6, cap: { uz: "Suyuqlik filtr qog'ozining mayda teshiklaridan o'tadi. Loy zarrachalari teshiklardan katta — ular <b>filtrda qoladi</b>.", en: 'Liquid passes through the tiny pores of the paper. Mud particles are larger than the pores — they <b>stay on the filter</b>.' }, f(p) { srcPose(1); src.setLevel(lerp(0.5, 0.06, p)); stream.visible = p < 0.95; stream.scale.y = 0.5; stream.position.set(0.12, 1.25, 0); fun.setLevel(0.3 + 0.12 * Math.sin(Math.PI * p)); dr.rate = 8; rec.setLevel(0.32 * p); mud.visible = true; const s = 0.3 + 0.7 * p; mud.scale.set(s, s, s); mud.position.y = 0.62 + 0.42; lM.set(seg(p, 0.5, 0.7)); } },
          { dur: 4, cap: { uz: "Stakanga tiniq suyuqlik — <b>filtrat</b> yig'ildi. Filtrlash — erimagan qattiq moddani suyuqlikdan ajratish usuli.", en: 'A clear liquid — the <b>filtrate</b> — collects in the beaker. Filtration separates an undissolved solid from a liquid.' }, f(p) { srcPose(1 - ease(p)); src.setLevel(0.06); fun.setLevel(0.3 * (1 - p)); dr.rate = 6 * (1 - p); rec.setLevel(0.32 + 0.06 * p); mud.visible = true; mud.scale.setScalar(1); mud.position.y = 1.04; lM.set(1); lW.set(seg(p, 0.3, 0.6)); } },
          { dur: 4, cap: { uz: "<b>Qo'llanilishi:</b> ichimlik suvini tozalash, dorivor eritmalar tayyorlash, laboratoriya tahlillari. <b>Esda tuting:</b> tuzli suvdagi tuzni filtrlab ajratib bo'lmaydi — u erigan!", en: '<b>Uses:</b> purifying drinking water, preparing medicines, lab analysis. <b>Remember:</b> dissolved salt cannot be filtered out of salt water!' }, f() { srcPose(0); mud.visible = true; mud.position.y = 1.04; lM.set(1); lW.set(1); rec.setLevel(0.38); } },
        ],
        loop(dt) { dr.tick(dt); }, clear() { dr.clear(); }
      };
    }
  });

  /* 5. Distillash */
  Lab.def({
    id: 'distillation', icon: '♨️', grade: [6, 7],
    title: { uz: 'Distillash: tuzli suvdan toza suv olish', en: 'Distillation: getting pure water from salt water' },
    desc: { uz: "Suv bug'lanadi, sovutgichda yana suyuqlikka aylanadi; tuz kolbada qoladi.", en: 'Water evaporates, condenses back to liquid in the condenser; salt stays in the flask.' },
    cam: { pos: [0.4, 2.3, 4.6], target: [0.2, 1.0, 0] },
    build(ctx) {
      const { scene } = ctx;
      const bur = Lab.burner(); at(bur, -1.2, 0, 0); scene.add(bur.group);
      const st = Lab.stand(2.0); at(st, -1.2, 0, 0); scene.add(st.group); st.addRing(0.66, 0.2);
      const fl = Lab.vessel(P.round(0.34, 0.08, 1.05), { color: 0xcfe9ff, opacity: 0.55, level: 0.35 }); at(fl, -1.2, 0.68, 0); scene.add(fl.group);
      // side arm + condenser (tilted tube)
      const a = V(-1.2, 1.55, 0), b = V(0.9, 0.95, 0); const len = a.distanceTo(b);
      const cond = new T.Group(); cond.position.copy(a).add(b).multiplyScalar(0.5); cond.quaternion.setFromUnitVectors(V(1, 0, 0), b.clone().sub(a).normalize()); scene.add(cond);
      const inner = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, len, 12, 1, true), M.glass()); inner.rotation.z = Math.PI / 2; cond.add(inner);
      const jacket = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, len * 0.6, 24, 1, true), M.glass()); jacket.rotation.z = Math.PI / 2; jacket.material.opacity = 0.18; cond.add(jacket);
      const cold = new T.Mesh(new T.CylinderGeometry(0.095, 0.095, len * 0.6, 24), M.liquid(0x5ac8fa, 0.18)); cold.rotation.z = Math.PI / 2; cond.add(cold);
      const rec = ctx.add(at(Lab.vessel(P.flask(0.3, 0.7, 0.07), { color: 0xd8f0ff, opacity: 0.55 }), 1.0, 0, 0));
      const th = Lab.thermometer(0.7); th.group.position.set(-1.2, 1.3, 0); scene.add(th.group);
      const boil = Lab.bubbles(scene, { size: 0.02, speed: 0.4, region: () => ({ x: -1.2, z: 0, r: 0.2, y0: 0.72, y1: 0.68 + fl.level }) });
      const steam = Lab.puffs(scene, { color: 0xffffff, op: 0.35, size: 0.12, life: 1.2, spread: 0.03, vel: V(0, 0.25, 0), origin: () => V(-1.2, 0.68 + fl.level + 0.05, 0) });
      const vap = []; for (let i = 0; i < 14; i++) { const m = Lab.mol('H2O', 0.25); scene.add(m); vap.push({ m, d: i / 14 }); }
      const dr = Lab.drops(scene, { color: 0xbfe6ff, from: () => V(0.92, 0.92, 0), to: () => Math.max(0.05, rec.level) });
      const salt = grains(40, 0xffffff, 0.025, 31); fl.group.add(salt.group);
      ctx.label({ uz: 'Tuzli suv', en: 'Salt water' }, fl.group, [-0.45, 0.25, 0]); ctx.label({ uz: 'Sovutgich (sovuq suv)', en: 'Condenser (cold water)' }, cond, [0, 0.22, 0]);
      const lD = ctx.label({ uz: 'Distillangan suv', en: 'Distilled water' }, rec.group, [0, 0.85, 0], 'tag'); const lS = ctx.label({ uz: 'Tuz qoldi', en: 'Salt remains' }, fl.group, [0, 0.05, 0.4], 'tag');
      const lT = ctx.label('20 °C', th.group, [0.12, 0.6, 0], 'temp');
      return {
        reset() { bur.flame.set(0); fl.setLevel(0.35); rec.setLevel(0); boil.rate = 0; steam.rate = 0; vap.forEach((v) => (v.m.visible = false)); dr.rate = 0; salt.group.visible = false; th.set(0.2); lT.setText('20 °C'); lD.set(0); lS.set(0); fl.setColor(0xcfe9ff); },
        steps: [
          { dur: 3.5, cap: { uz: "Kolbada <b>tuzli suv</b>. Kolba sovutgichga ulangan, sovutgich ichida sovuq suv aylanadi.", en: 'The flask holds <b>salt water</b>. It is connected to a condenser cooled by running cold water.' } },
          { dur: 4.5, cap: { uz: "Spirt lampasini yoqamiz. Harorat ko'tariladi va 100 °C da suv <b>qaynaydi</b>.", en: 'We light the spirit lamp. The temperature rises, and at 100 °C the water <b>boils</b>.' }, f(p) { bur.flame.set(seg(p, 0, 0.15)); th.set(lerp(0.2, 0.85, ease(p))); lT.setText(Math.round(lerp(20, 100, ease(p))) + ' °C'); boil.rate = 60 * seg(p, 0.6, 1); } },
          { dur: 7, cap: { uz: "Suv <b>bug'ga</b> aylanib, quvur orqali sovutgichga o'tadi. U yerda soviydi va yana <b>suyuqlikka aylanadi</b> (kondensatsiya). Tomchilar qabul qiluvchi kolbaga tushadi.", en: 'Water turns into <b>steam</b>, travels into the condenser, cools and turns back into a <b>liquid</b> (condensation). Drops fall into the receiving flask.' }, cam: { pos: [0.2, 1.9, 3.4], target: [0, 1.1, 0] }, f(p) { bur.flame.set(1); th.set(0.85); lT.setText('100 °C'); boil.rate = 70; steam.rate = 10; fl.setLevel(lerp(0.35, 0.2, p)); vap.forEach((v) => { const k = (p * 3 + v.d) % 1; v.m.visible = true; v.m.position.lerpVectors(a, b, k); v.m.position.y += 0.03 * Math.sin(k * 20); v.m.rotation.y = k * 10; }); dr.rate = 4 * seg(p, 0.25, 0.4); rec.setLevel(0.18 * seg(p, 0.3, 1)); salt.group.visible = p > 0.5; salt.arr.forEach((g) => g.m.position.set(Math.cos(g.a) * g.r * 0.22, 0.03 + g.d * 0.02, Math.sin(g.a) * g.r * 0.22)); } },
          { dur: 4.5, cap: { uz: "Qabul qiluvchi kolbada <b>distillangan (toza) suv</b> yig'ildi, tuz esa birinchi kolbada qoldi. Distillash suyuqlikni undagi erigan moddalardan ajratadi.", en: '<b>Distilled (pure) water</b> collects in the receiver while the salt stays in the first flask. Distillation separates a liquid from dissolved substances.' }, cam: { pos: [0.4, 2.3, 4.6], target: [0.2, 1.0, 0] }, f(p) { bur.flame.set(1 - seg(p, 0.7, 1)); boil.rate = 40 * (1 - p); fl.setLevel(lerp(0.2, 0.12, p)); fl.setColor(0xe8f4ff); dr.rate = 3 * (1 - p); rec.setLevel(0.18 + 0.06 * p); salt.group.visible = true; salt.arr.forEach((g) => g.m.position.set(Math.cos(g.a) * g.r * 0.22, 0.03 + g.d * 0.02, Math.sin(g.a) * g.r * 0.22)); vap.forEach((v) => (v.m.visible = false)); lD.set(seg(p, 0.2, 0.4)); lS.set(seg(p, 0.5, 0.7)); } },
          { dur: 4, cap: { uz: "<b>Qo'llanilishi:</b> dengiz suvidan ichimlik suvi olish, dorixona va laboratoriyalar uchun distillangan suv. Ibn Sino distillash usulini tasvirlagan.", en: '<b>Uses:</b> getting drinking water from seawater, distilled water for pharmacies and labs. Ibn Sina described the distillation method.' }, f() { salt.group.visible = true; salt.arr.forEach((g) => g.m.position.set(Math.cos(g.a) * g.r * 0.22, 0.03 + g.d * 0.02, Math.sin(g.a) * g.r * 0.22)); fl.setLevel(0.12); rec.setLevel(0.24); lD.set(1); lS.set(1); } },
        ],
        loop(dt, s, c) { bur.flame.tick(c.t); boil.tick(dt); steam.tick(dt); dr.tick(dt); }, clear() { boil.clear(); steam.clear(); dr.clear(); }
      };
    }
  });

  /* 6. Agregat holatlar: muz → suv → bug' */
  Lab.def({
    id: 'states-of-matter', icon: '🧊', grade: [6, 7],
    title: { uz: "Muz → suv → bug': agregat holatlar", en: 'Ice → water → steam: states of matter' },
    desc: { uz: "Qizdirilganda zarrachalar tezroq harakatlanadi: muz 0 °C da eriydi, suv 100 °C da qaynaydi.", en: 'When heated, particles move faster: ice melts at 0 °C, water boils at 100 °C.' },
    cam: { pos: [0.9, 2.0, 4.3], target: [0.4, 1.0, 0] },
    build(ctx) {
      const { scene } = ctx;
      const tp = Lab.tripod(0.72); at(tp, -0.7, 0, 0); scene.add(tp.group);
      const bur = Lab.burner(); at(bur, -0.7, 0, 0); scene.add(bur.group);
      const bk = Lab.vessel(P.beaker(0.3, 0.75), { color: 0xa8dcff, opacity: 0.55 }); at(bk, -0.7, tp.top, 0); scene.add(bk.group);
      const ice = []; const R = rng(2); for (let i = 0; i < 5; i++) { const m = new T.Mesh(new T.BoxGeometry(0.16, 0.14, 0.16), new T.MeshPhongMaterial({ color: 0xe6f7ff, transparent: true, opacity: 0.8, shininess: 150 })); m.position.set((R() - 0.5) * 0.28, 0.08 + (i > 2 ? 0.14 : 0), (R() - 0.5) * 0.28); m.rotation.y = R() * 3; bk.group.add(m); ice.push(m); }
      const th = Lab.thermometer(0.9); th.group.position.set(-0.6, tp.top + 0.05, 0.1); th.group.rotation.z = -0.2; scene.add(th.group);
      const boil = Lab.bubbles(scene, { size: 0.025, speed: 0.5, region: () => ({ x: -0.7, z: 0, r: 0.22, y0: tp.top + 0.03, y1: tp.top + bk.level }) });
      const steam = Lab.puffs(scene, { color: 0xffffff, op: 0.45, size: 0.3, life: 2, spread: 0.15, origin: () => V(-0.7, tp.top + 0.8, 0) });
      const lT = ctx.label('-10 °C', th.group, [0.15, 0.95, 0], 'temp');
      // micro view: particles
      const mic = Lab.micro(scene, V(1.3, 1.25, 0), 0.85);
      const parts = []; const R2 = rng(5);
      for (let x = 0; x < 4; x++) for (let y = 0; y < 4; y++) for (let z = 0; z < 2; z++) { const m = Lab.mol('H2O', 0.45); const home = V((x - 1.5) * 0.19, (y - 1.5) * 0.19 - 0.15, (z - 0.5) * 0.19); mic.content.add(m); parts.push({ m, home, liq: V((R2() - 0.5) * 0.9, -0.55 + R2() * 0.45, (R2() - 0.5) * 0.5), gas: V((R2() - 0.5) * 1.2, (R2() - 0.5) * 1.2, (R2() - 0.5) * 0.9), v: V(R2() - 0.5, R2() - 0.5, R2() - 0.5).normalize(), ph: R2() * 6 }); }
      const lState = ctx.label({ uz: 'QATTIQ', en: 'SOLID' }, mic.group, [0, -1.0, 0], 'tag');
      // heating curve canvas overlay
      const cv = document.createElement('canvas'); cv.width = 260; cv.height = 150; cv.className = 'lab-graph'; ctx.renderer.domElement.parentElement.appendChild(cv); const g2 = cv.getContext('2d');
      const curve = (k) => k < 0.12 ? lerp(-10, 0, k / 0.12) : k < 0.35 ? 0 : k < 0.62 ? lerp(0, 100, (k - 0.35) / 0.27) : 100;
      function drawGraph(k) {
        g2.clearRect(0, 0, 260, 150); g2.fillStyle = 'rgba(255,255,255,.92)'; g2.fillRect(0, 0, 260, 150); g2.strokeStyle = '#94a3b8'; g2.lineWidth = 1;
        g2.beginPath(); g2.moveTo(30, 10); g2.lineTo(30, 130); g2.lineTo(250, 130); g2.stroke(); g2.fillStyle = '#334155'; g2.font = '10px Inter,Arial';
        g2.fillText('°C', 6, 14); g2.fillText('100', 6, 34); g2.fillText('0', 18, 112); g2.fillText(Lab.lang === 'uz' ? 'vaqt' : 'time', 220, 145);
        const y = (c) => 112 - c * 0.8; g2.setLineDash([3, 3]); g2.beginPath(); g2.moveTo(30, y(0)); g2.lineTo(250, y(0)); g2.moveTo(30, y(100)); g2.lineTo(250, y(100)); g2.stroke(); g2.setLineDash([]);
        g2.strokeStyle = '#0ea5e9'; g2.lineWidth = 3; g2.beginPath(); for (let i = 0; i <= 100; i++) { const kk = i / 100 * k; const X = 30 + 220 * kk; const Y = y(curve(kk)); i ? g2.lineTo(X, Y) : g2.moveTo(X, Y); } g2.stroke();
        g2.fillStyle = '#0369a1'; g2.font = '700 10px Inter,Arial'; if (k > 0.2) g2.fillText(Lab.lang === 'uz' ? 'erish' : 'melting', 60, y(0) - 6); if (k > 0.7) g2.fillText(Lab.lang === 'uz' ? 'qaynash' : 'boiling', 175, y(100) - 6);
      }
      let gk = 0, phase = 0;
      return {
        reset() { bur.flame.set(0); bk.setLevel(0); ice.forEach((m) => { m.visible = true; m.scale.setScalar(1); }); boil.rate = 0; steam.rate = 0; th.set(0.05); mic.show(1); gk = 0; phase = 0; },
        steps: [
          { dur: 3.5, cap: { uz: "Stakanda <b>muz</b> — suvning <b>qattiq</b> holati. Mikro-ko'rinishda: suv molekulalari zich, tartibli joylashgan va faqat o'z joyida tebranadi.", en: 'The beaker holds <b>ice</b> — the <b>solid</b> state of water. Micro view: water molecules are packed tightly in order and only vibrate in place.' }, f() { lT.setText('-10 °C'); lState.setText({ uz: 'QATTIQ: o\'z shakli bor', en: 'SOLID: fixed shape' }); } },
          { dur: 6, cap: { uz: "Qizdiramiz. 0 °C da muz <b>eriy</b> boshlaydi (suyuqlanish harorati). Muz to'liq erimaguncha harorat o'zgarmaydi!", en: 'We heat it. At 0 °C the ice starts to <b>melt</b> (melting point). The temperature stays at 0 °C until all the ice has melted!' }, f(p) { bur.flame.set(seg(p, 0, 0.1)); const c = p < 0.3 ? lerp(-10, 0, p / 0.3) : 0; th.set(0.05 + c * 0.008); lT.setText(Math.round(c) + ' °C'); ice.forEach((m, i) => { const k = seg(p, 0.3 + i * 0.05, 0.85 + i * 0.03); m.scale.setScalar(1 - k * 0.98); m.visible = k < 0.98; m.position.y = Math.max(0.06, m.position.y - 0.0); }); bk.setLevel(0.32 * seg(p, 0.3, 1)); gk = p * 0.35; phase = seg(p, 0.35, 0.9); lState.setText(p > 0.6 ? { uz: 'SUYUQ: idish shaklini oladi', en: 'LIQUID: takes the shape of its container' } : { uz: 'QATTIQ: o\'z shakli bor', en: 'SOLID: fixed shape' }); } },
          { dur: 5, cap: { uz: "Endi suv <b>suyuq</b> holatda. Molekulalar bir-biriga yaqin, lekin bir-birining yonidan sirpanib harakatlanadi. Harorat ko'tarilmoqda…", en: 'Now the water is <b>liquid</b>. Molecules are close together but slide past one another. The temperature is rising…' }, f(p) { ice.forEach((m) => (m.visible = false)); bur.flame.set(1); bk.setLevel(0.32); const c = lerp(0, 98, p); th.set(c * 0.008 + 0.05); lT.setText(Math.round(c) + ' °C'); boil.rate = 20 * seg(p, 0.7, 1); gk = 0.35 + p * 0.27; phase = 1; } },
          { dur: 6, cap: { uz: "100 °C — suv <b>qaynaydi</b> (qaynash harorati). Butun hajm bo'ylab bug' pufakchalari hosil bo'ladi. Molekulalar erkin uchib ketadi — <b>gaz holat</b>.", en: 'At 100 °C water <b>boils</b> (boiling point). Vapour bubbles form throughout the liquid. Molecules fly apart freely — the <b>gas state</b>.' }, eq: 'H₂O (qattiq / solid) → H₂O (suyuq / liquid) → H₂O (gaz / gas)', f(p) { ice.forEach((m) => (m.visible = false)); bur.flame.set(1); bk.setLevel(lerp(0.32, 0.24, p)); th.set(0.85); lT.setText('100 °C'); boil.rate = 90; steam.rate = 12; gk = 0.62 + p * 0.38; phase = 1 + seg(p, 0.1, 0.7); lState.setText({ uz: "GAZ: o'z shakli ham, hajmi ham yo'q", en: 'GAS: no fixed shape or volume' }); } },
          { dur: 4.5, cap: { uz: "<b>Xulosa:</b> muz, suv va suv bug'i — bitta modda (H₂O)ning uch xil agregat holati. Qizdirilganda zarrachalar harakati tezlashadi, sovutilganda sekinlashadi.", en: '<b>Conclusion:</b> ice, water and steam are three states of one substance (H₂O). Heating speeds particles up; cooling slows them down.' }, f() { ice.forEach((m) => (m.visible = false)); bur.flame.set(1); bk.setLevel(0.24); th.set(0.85); lT.setText('100 °C'); boil.rate = 60; steam.rate = 8; gk = 1; phase = 2; } },
        ],
        loop(dt, s, c) {
          bur.flame.tick(c.t); boil.tick(dt); steam.tick(dt); drawGraph(gk);
          parts.forEach((q) => {
            const vib = 0.012 * Math.sin(c.t * 14 + q.ph);
            let tgt; if (phase <= 1) tgt = q.home.clone().lerp(q.liq, ease(phase)); else tgt = q.liq.clone().lerp(q.gas, ease(phase - 1));
            const wander = phase > 0.5 ? (phase > 1.5 ? 0.15 : 0.06) : 0; tgt.x += Math.sin(c.t * 1.3 + q.ph) * wander; tgt.y += Math.cos(c.t * 1.1 + q.ph * 2) * wander * 0.6;
            q.m.position.copy(tgt); q.m.position.x += vib; q.m.rotation.y += dt * (phase > 0.5 ? 2 : 0.3); q.m.rotation.x += dt * (phase > 1.2 ? 2 : 0);
          });
        },
        clear() { boil.clear(); steam.clear(); }
      };
    }
  });

  /* 7. Atom modeli (interaktiv) */
  const EL = [['H', 'Vodorod', 'Hydrogen', 1, 0], ['He', 'Geliy', 'Helium', 2, 2], ['Li', 'Litiy', 'Lithium', 3, 4], ['Be', 'Berilliy', 'Beryllium', 4, 5], ['B', 'Bor', 'Boron', 5, 6], ['C', 'Uglerod', 'Carbon', 6, 6], ['N', 'Azot', 'Nitrogen', 7, 7], ['O', 'Kislorod', 'Oxygen', 8, 8], ['F', 'Ftor', 'Fluorine', 9, 10], ['Ne', 'Neon', 'Neon', 10, 10], ['Na', 'Natriy', 'Sodium', 11, 12], ['Mg', 'Magniy', 'Magnesium', 12, 12], ['Al', 'Alyuminiy', 'Aluminium', 13, 14], ['Si', 'Kremniy', 'Silicon', 14, 14], ['P', 'Fosfor', 'Phosphorus', 15, 16], ['S', 'Oltingugurt', 'Sulfur', 16, 16], ['Cl', 'Xlor', 'Chlorine', 17, 18], ['Ar', 'Argon', 'Argon', 18, 22], ['K', 'Kaliy', 'Potassium', 19, 20], ['Ca', 'Kalsiy', 'Calcium', 20, 20]];
  Lab.ELEMENTS = EL;
  Lab.def({
    id: 'atom-model', icon: '⚛️', grade: [6, 7],
    title: { uz: 'Atom tuzilishi: proton, neytron, elektron', en: 'Atomic structure: protons, neutrons, electrons' },
    desc: { uz: "Istalgan elementni (1–20) tanlang: yadro va elektron qavatlarini 3D da ko'ring. Z = p = e, A = p + n.", en: 'Pick any element (1–20) to see its nucleus and electron shells in 3D. Z = p = e, A = p + n.' },
    table: false, bg: 0x0f1d33, cam: { pos: [0, 1.2, 5.2], target: [0, 0, 0] },
    build(ctx) {
      const { scene } = ctx; scene.fog = null;
      const stars = new T.Points(new T.BufferGeometry().setAttribute('position', new T.Float32BufferAttribute(Array.from({ length: 1500 }, () => (Math.random() - 0.5) * 40), 3)), new T.PointsMaterial({ color: 0x9fb8ff, size: 0.04 })); scene.add(stars);
      const root = new T.Group(); scene.add(root);
      let state = { z: 3 }; const nuc = new T.Group(), shellsG = new T.Group(); root.add(nuc); root.add(shellsG);
      const pM = M.std(0xff3b30, { roughness: 0.3 }), nM = M.std(0x9aa5b1, { roughness: 0.3 }), eM = M.glow(0x5ac8fa, 1);
      const eGeo = new T.SphereGeometry(0.07, 14, 10), nGeo = new T.SphereGeometry(0.1, 16, 12);
      let electrons = [], nucleons = [];
      const ui = document.createElement('div'); ui.className = 'lab-picker'; ctx.renderer.domElement.parentElement.appendChild(ui);
      ui.innerHTML = EL.map((e, i) => `<button data-z="${i + 1}">${e[0]}</button>`).join('');
      const info = document.createElement('div'); info.className = 'lab-info'; ctx.renderer.domElement.parentElement.appendChild(info);
      function build(z) {
        state.z = z; const e = EL[z - 1]; [...nuc.children].forEach((c) => nuc.remove(c)); [...shellsG.children].forEach((c) => shellsG.remove(c)); electrons = []; nucleons = [];
        const p = e[3], n = e[4], tot = p + n; const R = rng(z * 17); const rad = 0.11 * Math.cbrt(tot) + 0.02;
        for (let i = 0; i < tot; i++) { const isP = i % 2 === 0 ? i / 2 < p : (i - 1) / 2 >= n; const m = new T.Mesh(nGeo, i < p * 2 && i % 2 === 0 || (n < i / 2 && i < tot) ? pM : nM); nucleons.push(m); }
        // assign exact counts
        nucleons.forEach((m, i) => { m.material = i < p ? pM : nM; const u = R(), v = R(); const th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1), r = rad * Math.cbrt(R()); m.userData.home = V(r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)); m.position.copy(m.userData.home); nuc.add(m); });
        nucleons.sort(() => R() - 0.5);
        const shells = [2, 8, 8, 2]; let left = p;
        shells.forEach((cap, si) => {
          if (left <= 0) return; const cnt = Math.min(cap, left); left -= cnt; const r = 0.75 + si * 0.55;
          const ring = new T.Mesh(new T.TorusGeometry(r, 0.008, 6, 96), M.glow(0x5ac8fa, 0.35)); ring.rotation.x = Math.PI / 2; shellsG.add(ring);
          for (let k = 0; k < cnt; k++) { const m = new T.Mesh(eGeo, eM); m.userData = { r, a: k / cnt * Math.PI * 2, w: 1.2 / (si + 1), si }; shellsG.add(m); electrons.push(m); }
        });
        ui.querySelectorAll('button').forEach((b) => b.classList.toggle('on', +b.dataset.z === z));
        const cfg = shells.reduce((acc, cap) => { const used = acc.reduce((a, b) => a + b, 0); if (used < p) acc.push(Math.min(cap, p - used)); return acc; }, []);
        info.innerHTML = `<b>${e[0]} — ${Lab.lang === 'uz' ? e[1] : e[2]}</b><br>Z = ${p} &nbsp; A ≈ ${p + n}<br><span style="color:#ff6b61">p⁺ = ${p}</span> &nbsp; <span style="color:#cbd5e1">n⁰ = ${n}</span> &nbsp; <span style="color:#7dd3fc">e⁻ = ${p}</span><br>${Lab.lang === 'uz' ? 'Qavatlar' : 'Shells'}: ${cfg.join(', ')}`;
      }
      ui.addEventListener('click', (ev) => { const b = ev.target.closest('button'); if (b) build(+b.dataset.z); });
      build(3);
      const lN = ctx.label({ uz: 'Yadro: p⁺ + n⁰', en: 'Nucleus: p⁺ + n⁰' }, nuc, [0, 0.35, 0], 'tag');
      const lE = ctx.label({ uz: 'Elektronlar (e⁻)', en: 'Electrons (e⁻)' }, V(0.75, 0.15, 0), [0, 0, 0], 'tag');
      let gather = 1, eShow = 1;
      return {
        reset() { gather = 1; eShow = 1; lN.set(1); lE.set(1); },
        steps: [
          { dur: 4, cap: { uz: "Atom markazida <b>yadro</b> joylashgan. U musbat zaryadli <b>protonlar (p⁺)</b> va zaryadsiz <b>neytronlardan (n⁰)</b> tashkil topgan.", en: 'At the centre of the atom is the <b>nucleus</b>, made of positive <b>protons (p⁺)</b> and neutral <b>neutrons (n⁰)</b>.' }, f(p) { gather = ease(p); eShow = 0; lE.set(0); } },
          { dur: 5, cap: { uz: "Yadro atrofida manfiy zaryadli <b>elektronlar (e⁻)</b> qavatlarda harakatlanadi: 1-qavatda ko'pi bilan 2 ta, 2-qavatda 8 ta elektron.", en: 'Negative <b>electrons (e⁻)</b> move around the nucleus in shells: up to 2 in the 1st shell and 8 in the 2nd.' }, f(p) { gather = 1; eShow = ease(p); lE.set(seg(p, 0.3, 0.5)); } },
          { dur: 5, cap: { uz: "Atom <b>elektroneytral</b>: protonlar soni = elektronlar soni. Elementning tartib raqami Z = protonlar soni. <b>Massa soni A = p + n.</b>", en: 'An atom is <b>electrically neutral</b>: protons = electrons. The atomic number Z = number of protons. <b>Mass number A = p + n.</b>' } },
          { dur: 6, cap: { uz: "👉 Pastdagi tugmalardan boshqa elementni tanlang (H dan Ca gacha) va uning tuzilishini o'rganing. Masalan, kislorod (O): 8p, 8n, 8e — qavatlar 2, 8… emas, 2, 6!", en: '👉 Choose another element below (H to Ca) and explore its structure. For example oxygen (O): 8p, 8n, 8e — shells 2, 6.' } },
        ],
        loop(dt, s, c) {
          nucleons.forEach((m) => { m.position.copy(m.userData.home).multiplyScalar(lerp(6, 1, gather)); m.position.x += Math.sin(c.t * 9 + m.userData.home.x * 50) * 0.004; });
          electrons.forEach((m) => { m.userData.a += dt * m.userData.w * 2.2; const r = m.userData.r * lerp(2.5, 1, eShow); m.position.set(Math.cos(m.userData.a) * r, 0, Math.sin(m.userData.a) * r); m.visible = eShow > 0.02; });
          shellsG.children.forEach((o) => { if (o.geometry.type === 'TorusGeometry') o.visible = eShow > 0.02; });
          root.rotation.x = 0.35; root.rotation.y += dt * 0.15; stars.rotation.y += dt * 0.01;
          const e0 = electrons[0]; if (e0) { e0.getWorldPosition(lE.target); lE.off.set(0, 0.1, 0); }
        }
      };
    }
  });
})();
