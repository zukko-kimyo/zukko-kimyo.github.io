/* Tajribalar — 4-qism: 7-sinf qo'shimcha tajribalari (CuO + H₂, olma tarkibi) */
(function () {
  const T = THREE, { clamp, lerp, ease, seg, rng } = Lab.m, M = Lab.M, P = Lab.profiles, { at, V, grains } = Lab.util;
  const C = (h) => new T.Color(h);
  function tubeLine(points, r = 0.018) {
    const curve = new T.CatmullRomCurve3(points.map((p) => V(...p)));
    const m = new T.Mesh(new T.TubeGeometry(curve, 60, r, 10, false), M.glass()); m.material.opacity = 0.45; m.renderOrder = 10; return m;
  }
  Lab.util.tubeLine = Lab.util.tubeLine || tubeLine;

  /* A. Vodorod bilan mis(II) oksidni qaytarish — 7-sinf, 54-dars */
  Lab.def({
    id: 'cuo-reduction', icon: '🟤', grade: [7], lessons: [[7, 54], [7, 53]],
    title: { uz: 'Vodorod bilan mis(II) oksidni qaytarish', en: 'Reducing copper(II) oxide with hydrogen' },
    desc: { uz: "Qizdirilgan qora CuO ustidan vodorod o'tkaziladi: kukun qizg'ish misga aylanadi, probirka devorida suv tomchilari paydo bo'ladi. CuO + H₂ → Cu + H₂O", en: 'Hydrogen is passed over hot black CuO: the powder turns into reddish copper and water droplets appear on the tube wall. CuO + H₂ → Cu + H₂O' },
    cam: { pos: [-0.1, 1.75, 3.7], target: [-0.3, 0.9, 0] },
    build(ctx) {
      const { scene } = ctx;
      // H2 generator
      const st0 = Lab.stand(1.3); at(st0, -1.55, 0, 0.05); scene.add(st0.group);
      const fl = ctx.add(at(Lab.vessel(P.flask(0.3, 0.78, 0.075), { color: 0xeaf6ff, opacity: 0.5, level: 0.24 }), -1.35, 0, 0));
      const zn = grains(10, 0x8e99a8, 0.055, 9); fl.group.add(zn.group); zn.arr.forEach((g) => g.m.position.set(Math.cos(g.a) * g.r * 0.18, 0.04, Math.sin(g.a) * g.r * 0.18));
      const bub = Lab.bubbles(scene, { size: 0.018, speed: 0.55, region: () => ({ x: -1.35, z: 0, r: 0.18, y0: 0.06, y1: 0.24 }) });
      const stopper = new T.Mesh(new T.CylinderGeometry(0.085, 0.07, 0.07, 20), M.std(0x8a5a3b, { roughness: 0.9 })); stopper.position.set(-1.35, 0.8, 0); scene.add(stopper);
      // reaction tube (horizontal, mouth to the left, tilted slightly down)
      const st = Lab.stand(1.2); at(st, 0.55, 0, -0.05); scene.add(st.group);
      const tube = Lab.vessel(P.tube(0.12, 1.0), {}); tube.group.position.set(0.72, 0.8, 0); tube.group.rotation.z = Math.PI / 2 + 0.06; scene.add(tube.group);
      const clampM = new T.Mesh(new T.BoxGeometry(0.06, 0.28, 0.3), M.std(0x30363d, { metalness: 0.5, roughness: 0.4 })); clampM.position.set(0.5, 0.8, -0.05); scene.add(clampM);
      const del = tubeLine([[-1.35, 0.84, 0], [-1.35, 1.05, 0], [-1.1, 1.18, 0], [-0.55, 1.12, 0], [-0.32, 0.86, 0], [-0.1, 0.83, 0], [0.32, 0.81, 0]], 0.014); scene.add(del);
      // powder: segments inside tube (local frame: axis = +y, world down = local -x)
      const segs = []; const N = 7;
      for (let i = 0; i < N; i++) {
        const m = new T.Mesh(new T.BoxGeometry(0.045, 0.055, 0.15), new T.MeshStandardMaterial({ color: 0x151515, roughness: 0.95 }));
        m.position.set(-0.078, 0.14 + i * 0.055, 0); tube.group.add(m); segs.push(m);
        const top = new T.Mesh(new T.SphereGeometry(0.06, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), m.material); top.scale.set(0.45, 0.5, 1.2); top.rotation.z = -Math.PI / 2; top.position.set(-0.056, 0.14 + i * 0.055, 0); tube.group.add(top);
      }
      // water droplets near the cool mouth
      const R = rng(11); const drops = [];
      for (let i = 0; i < 26; i++) { const a = (R() - 0.5) * Math.PI * 1.5; const y = 0.62 + R() * 0.3; const m = new T.Mesh(new T.SphereGeometry(1, 10, 8), M.glass({ opacity: 0.35, color: 0x1a2a38 })); m.position.set(Math.cos(a) * 0.105, y, Math.sin(a) * 0.105); m.userData.k = R(); m.renderOrder = 12; tube.group.add(m); drops.push(m); }
      const bur = Lab.burner(); at(bur, 0.38, 0, 0.0); scene.add(bur.group);
      const steam = Lab.puffs(scene, { origin: () => V(-0.3, 0.83, 0), vel: V(-0.25, 0.25, 0), size: 0.18, op: 0.35, life: 1.8, spread: 0.03 });
      const glow = new T.PointLight(0xff6a2a, 0, 1.2, 2); glow.position.set(0.38, 0.78, 0.1); scene.add(glow);
      // micro view
      const mic = Lab.micro(scene, V(-0.45, 1.6, 0.35), 0.42);
      const lat = []; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const cu = Lab.atomMesh('Cu', 0.3); cu.position.set((i - 1) * 0.16, -0.16, (j - 1) * 0.16); mic.content.add(cu); const o = Lab.atomMesh('O', 0.3); const home = V((i - 1) * 0.16 + 0.08, -0.08, (j - 1) * 0.16); o.position.copy(home); mic.content.add(o); lat.push({ cu, o, home, d: (i * 3 + j) / 9 }); }
      const hs = lat.map((L) => { const m = Lab.mol('H2', 0.3); mic.content.add(m); return m; });
      const ws = lat.map(() => { const m = Lab.mol('H2O', 0.3); mic.content.add(m); return m; });
      const lMic = ctx.label({ uz: 'Mikro-ko\'rinish: H₂ kislorodni «tortib oladi»', en: 'Micro view: H₂ "pulls away" the oxygen' }, mic.group, [0, 0.55, 0], 'micro');
      const lH = ctx.label({ uz: 'Zn + HCl → H₂', en: 'Zn + HCl → H₂' }, fl.group, [0, -0.1, 0.4]);
      const lP = ctx.label({ uz: 'CuO (qora)', en: 'CuO (black)' }, tube.group, [0, 0.12, 0.25]);
      const lW = ctx.label({ uz: 'Suv tomchilari', en: 'Water droplets' }, tube.group, [-0.75, 0.2, 0.2], 'tag');
      const lWarn = ctx.label({ uz: "⚠ Avval havo siqib chiqariladi!", en: '⚠ First the air is driven out!' }, del, [-0.4, 1.3, 0], 'warn');
      const black = C(0x151515), red = C(0xb4532a), hot = C(0x3a1408);
      return {
        reset() { bub.rate = 0; bur.flame.set(0); glow.intensity = 0; steam.rate = 0; segs.forEach((m) => m.material.color.copy(black)); drops.forEach((d) => (d.visible = false)); mic.show(0); lMic.set(0); lP.setText({ uz: 'CuO (qora)', en: 'CuO (black)' }); lW.set(0); lWarn.set(0); hs.forEach((h) => (h.visible = false)); ws.forEach((w) => (w.visible = false)); lat.forEach((L) => { L.o.visible = true; L.o.position.copy(L.home); }); },
        steps: [
          { dur: 4, cap: { uz: "Chapda — vodorod olish kolbasi (<b>rux + xlorid kislota</b>). O'ngda — gorizontal probirkada <b>qora mis(II) oksid (CuO)</b> kukuni. Probirka og'zi biroz pastga qiyalatilgan.", en: 'On the left is the hydrogen generator (<b>zinc + hydrochloric acid</b>). On the right, a horizontal test tube holds <b>black copper(II) oxide (CuO)</b> powder. Its mouth is tilted slightly down.' } },
          { dur: 5, cap: { uz: "Vodorod probirka orqali o'tkaziladi. <b>Qizdirishdan oldin</b> probirkadagi havo to'liq siqib chiqarilishi shart — vodorod va havo aralashmasi portlovchi! ⚠️ Tajriba faqat o'qituvchi nazoratida.", en: 'Hydrogen is passed through the tube. <b>Before heating</b>, all the air must be driven out — a hydrogen–air mixture is explosive! ⚠️ Teacher supervision only.' }, f(p) { bub.rate = 25 * seg(p, 0, 0.2); lWarn.set(seg(p, 0.15, 0.3)); } },
          { dur: 9, cap: { uz: "Spirt lampasi bilan qizdiramiz. <b>Qora kukun asta-sekin qizg'ish-jigarrang misga aylanadi</b>, probirkaning sovuqroq og'zida esa <b>suv tomchilari</b> paydo bo'ladi. Vodorod oksiddagi kislorodni tortib olib, suv hosil qiladi.", en: 'We heat it with a spirit lamp. <b>The black powder slowly turns into reddish-brown copper</b>, and <b>water droplets</b> appear at the cooler mouth of the tube. Hydrogen pulls the oxygen out of the oxide, forming water.' }, eq: 'CuO + H₂ —t°→ Cu + H₂O', f(p) {
            bub.rate = 25; lWarn.set(0); bur.flame.set(seg(p, 0, 0.08)); glow.intensity = 1.2 * seg(p, 0.1, 0.3);
            segs.forEach((m, i) => { const d = Math.abs(i - 4) / 4; const k = seg(p, 0.15 + d * 0.45, 0.4 + d * 0.45); const h = seg(p, 0.1, 0.25) * (1 - k) * 0.6; m.material.color.copy(black).lerp(hot, h).lerp(red, k); });
            drops.forEach((d) => { const k = seg(p, 0.35 + d.userData.k * 0.4, 0.6 + d.userData.k * 0.4); d.visible = k > 0; d.scale.setScalar(0.006 + 0.012 * k); }); steam.rate = 5 * seg(p, 0.4, 0.6);
            lP.setText(p > 0.7 ? { uz: 'Cu (mis)', en: 'Cu (copper)' } : { uz: 'CuO → Cu', en: 'CuO → Cu' }); lW.set(seg(p, 0.6, 0.7));
            mic.show(seg(p, 0.05, 0.2)); lMic.set(seg(p, 0.15, 0.25));
            lat.forEach((L, i) => { const q = seg(p, 0.2 + L.d * 0.55, 0.32 + L.d * 0.55); const h = hs[i], w = ws[i];
              h.visible = q > 0 && q < 0.55; h.position.copy(L.home).add(V(0, 0.32 - 0.32 * clamp(q / 0.5), 0.0)); h.rotation.y = q * 3;
              L.o.visible = q < 0.5; w.visible = q >= 0.5; w.position.copy(L.home).add(V(0, (q - 0.5) * 0.7, 0)); w.rotation.y = q * 4; w.scale.setScalar(q < 1 ? 1 : 0.001); });
          } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> vodorod — <b>qaytaruvchi</b>: u qizdirilganda metall oksididan kislorodni tortib oladi. Lampani o'chirib, probirka vodorod oqimida soviydi — aks holda issiq mis havodagi kislorod bilan yana oksidlanadi.", en: '<b>Conclusion:</b> hydrogen is a <b>reducing agent</b>: when heated it removes oxygen from a metal oxide. The lamp is put out and the tube cools in the hydrogen stream — otherwise the hot copper would oxidise again in air.' }, eq: 'CuO + H₂ → Cu + H₂O', f(p) { bub.rate = 25 * (1 - p * 0.6); bur.flame.set(1 - seg(p, 0, 0.2)); glow.intensity = 1.2 * (1 - seg(p, 0, 0.4)); segs.forEach((m) => m.material.color.copy(red)); drops.forEach((d) => { d.visible = true; d.scale.setScalar(0.018); }); lP.setText({ uz: 'Cu (mis)', en: 'Cu (copper)' }); lW.set(1); mic.show(1); lMic.set(1); lat.forEach((L, i) => { L.o.visible = false; hs[i].visible = false; ws[i].visible = false; }); } },
        ],
        loop(dt, s, c) { bub.tick(dt); steam.tick(dt); bur.flame.tick(c.t); lat.forEach((L) => (L.cu.position.y = -0.16 + Math.sin(c.t * 9 + L.d * 20) * 0.005)); },
        clear() { bub.clear(); steam.clear(); }
      };
    }
  });

  /* B. Olma tarkibini aniqlash — 7-sinf, 68-dars */
  function phScaleTex() {
    const c = document.createElement('canvas'); c.width = 512; c.height = 96; const g = c.getContext('2d');
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, 512, 96);
    Lab.PH.forEach((col, i) => { g.fillStyle = '#' + col.toString(16).padStart(6, '0'); g.fillRect(8 + i * 35.4, 10, 34, 48); g.fillStyle = '#111'; g.font = '700 18px Inter, Arial'; g.textAlign = 'center'; g.fillText(String(i + 1), 8 + i * 35.4 + 17, 82); });
    return Lab.srgb(new T.CanvasTexture(c));
  }
  Lab.def({
    id: 'apple-test', icon: '🍏', grade: [7], lessons: [[7, 68], [7, 66]],
    title: { uz: 'Olma tarkibini aniqlash: suv, kislota, kraxmal', en: 'What is in an apple: water, acid, starch' },
    desc: { uz: "Kesilgan olmadan sharbat chiqadi (suv ko'p). Indikator qog'oz sharbatda qizil-to'q sariq tusga kiradi — muhit kislotali (olma kislota). Yod olma etida ko'kish dog'lar beradi — oz miqdorda kraxmal bor.", en: 'A cut apple releases juice (lots of water). Indicator paper turns red-orange in the juice — the medium is acidic (malic acid). Iodine leaves bluish spots on the flesh — a little starch is present.' },
    cam: { pos: [0, 1.85, 3.3], target: [0, 0.42, 0] },
    build(ctx) {
      const { scene } = ctx;
      const board = new T.Mesh(new T.BoxGeometry(1.5, 0.05, 0.9), M.wood()); board.position.set(-0.45, 0.025, 0.05); board.receiveShadow = true; scene.add(board);
      const skin = M.std(0x8cc63f, { roughness: 0.35 });
      const flesh = new T.MeshStandardMaterial({ color: 0xf6f0c8, roughness: 0.55 });
      // a half: dome on -x (A) or +x (B), cut face pointing to the other side
      const half = (sx) => { const g = new T.Group(); const sk = new T.Mesh(new T.SphereGeometry(0.28, 40, 24, 0, Math.PI), skin); sk.rotation.y = sx > 0 ? -Math.PI / 2 : Math.PI / 2; g.add(sk);
        const face = new T.Mesh(new T.CircleGeometry(0.278, 40), flesh.clone()); face.rotation.y = sx > 0 ? Math.PI / 2 : -Math.PI / 2; g.add(face);
        const core = new T.Mesh(new T.CircleGeometry(0.07, 20), M.std(0xe2d08e)); core.rotation.copy(face.rotation); core.position.x = sx > 0 ? 0.001 : -0.001; g.add(core);
        const seed = new T.Mesh(new T.SphereGeometry(0.018, 10, 8), M.std(0x4a2c17)); seed.scale.set(0.5, 1, 0.7); seed.position.set(sx > 0 ? 0.004 : -0.004, 0.025, 0); g.add(seed); return { g, face }; };
      const A = half(1), B = half(-1); scene.add(A.g); scene.add(B.g);
      const stem = new T.Mesh(new T.CylinderGeometry(0.01, 0.012, 0.1, 8), M.std(0x5a3d22)); scene.add(stem);
      const knife = new T.Group(); const blade = new T.Mesh(new T.BoxGeometry(0.7, 0.12, 0.008), M.metal(0xdfe4e8)); blade.position.x = 0.1; knife.add(blade); const hnd = new T.Mesh(new T.BoxGeometry(0.32, 0.07, 0.04), M.std(0x222222)); hnd.position.x = -0.42; knife.add(hnd); scene.add(knife);
      const R = rng(4); const juice = []; for (let i = 0; i < 14; i++) { const m = new T.Mesh(new T.SphereGeometry(1, 10, 8), M.glass({ opacity: 0.32, color: 0x2a2a10 })); const a = R() * 6.28, r = Math.sqrt(R()) * 0.22; m.userData.p = V(Math.cos(a) * r, 0, Math.sin(a) * r); m.userData.k = R(); m.scale.set(1, 0.5, 1); m.renderOrder = 12; scene.add(m); juice.push(m); }
      const bk = ctx.add(at(Lab.vessel(P.beaker(0.2, 0.42), { color: 0xe9c84a, opacity: 0.8, marks: 5, markStep: 10 }), 0.65, 0, 0));
      const dr = Lab.drops(scene, { color: 0xe9c84a, from: () => V(0.65, 0.66, 0), to: () => bk.surface() });
      const strip = new T.Group(); const paper = new T.Mesh(new T.BoxGeometry(0.06, 0.5, 0.004), new T.MeshStandardMaterial({ color: 0xf2d34a, roughness: 0.9 })); paper.position.y = 0.25; strip.add(paper); const wet = new T.Mesh(new T.BoxGeometry(0.062, 0.2, 0.006), new T.MeshStandardMaterial({ color: 0xf2d34a, roughness: 0.7 })); wet.position.y = 0.1; strip.add(wet); scene.add(strip);
      const scale = new T.Mesh(new T.PlaneGeometry(0.9, 0.17), new T.MeshBasicMaterial({ map: phScaleTex(), toneMapped: false })); scale.position.set(0.45, 0.78, -0.4); scene.add(scale);
      const mark = new T.Mesh(new T.ConeGeometry(0.025, 0.06, 3), M.basic(0x111111)); mark.rotation.z = Math.PI; mark.position.set(0.45 - 0.45 + (8 + 2.5 * 35.4 + 17) / 512 * 0.9, 0.9, -0.39); scene.add(mark);
      const drop = new T.Group(); const bulb = new T.Mesh(new T.SphereGeometry(0.045, 12, 10), M.std(0x333333)); bulb.position.y = 0.36; drop.add(bulb); const tb = new T.Mesh(new T.CylinderGeometry(0.016, 0.007, 0.32, 10), M.liquid(0x8a4b0f, 0.8)); tb.position.y = 0.16; drop.add(tb); scene.add(drop);
      const idd = Lab.drops(scene, { color: 0x8a4b0f, from: () => drop.position.clone(), to: () => 0.34 });
      const BX = -0.8, AX = -0.1, YU = 0.30, YF = 0.33;
      const spots = [[0.07, 0.06], [-0.09, -0.04], [0.06, -0.11]].map(([x, z]) => { const s = new T.Mesh(new T.CircleGeometry(0.045, 20), new T.MeshStandardMaterial({ color: 0x8a4b0f, roughness: 0.4, transparent: true, opacity: 0 })); s.rotation.x = -Math.PI / 2; s.position.set(BX + x, YF + 0.004, 0.05 + z); scene.add(s); return s; });
      const lJ = ctx.label({ uz: "Sharbat — suv ko'p", en: 'Juice — lots of water' }, A.g, [0, 0.12, 0], 'tag');
      const lPH = ctx.label({ uz: 'pH ≈ 3–4: kislotali muhit', en: 'pH ≈ 3–4: acidic' }, scale, [0, 0.16, 0], 'warn');
      const lI = ctx.label({ uz: "Ko'kish dog' — oz kraxmal", en: 'Bluish spot — a little starch' }, B.g, [0, 0.14, 0], 'tag');
      const lSum = ctx.label({ uz: 'Suv ✔ · Shakarlar ✔ · Olma kislota ✔ · Kraxmal (oz) ✔ · Vitaminlar, kaliy', en: 'Water ✔ · Sugars ✔ · Malic acid ✔ · Starch (little) ✔ · Vitamins, potassium' }, board, [0.45, -0.05, 0.55], 'micro');
      const ylo = C(0xf2d34a), yr = C(Lab.PH[2]);
      const flatA = (o) => { A.g.position.set(lerp(-0.45, AX, o), lerp(YU, YF, o), 0.05); A.g.rotation.set(0, 0, o * Math.PI / 2); };
      const flatB = (o) => { B.g.position.set(lerp(-0.45, BX, o), lerp(YU, YF, o), 0.05); B.g.rotation.set(0, 0, -o * Math.PI / 2); };
      const spotsOn = (k) => spots.forEach((s, i) => { const q = clamp((k - i - 0.45) * 2.5); s.material.opacity = q; s.material.color.copy(C(0x8a4b0f)).lerp(C(0x232052), clamp((k - i - 0.7) * 2) * 0.75); });
      return {
        reset() {
          flatA(0); flatB(0); A.g.visible = true; A.g.scale.set(1, 1, 1); stem.position.set(-0.45, 0.6, 0.05); stem.visible = true;
          knife.position.set(-0.45, 1.2, 0.05); knife.rotation.set(0, Math.PI / 2, 0); knife.visible = true;
          juice.forEach((j) => (j.visible = false)); bk.setLevel(0); dr.rate = 0; strip.position.set(1.1, 0.4, 0.1); wet.material.color.copy(ylo);
          mark.visible = false; drop.visible = false; idd.rate = 0; spots.forEach((s) => (s.material.opacity = 0)); lJ.set(0); lPH.set(0); lI.set(0); lSum.set(0);
        },
        steps: [
          { dur: 4.5, cap: { uz: "Olmani pichoq bilan ikkiga bo'lamiz. Kesilgan yuzada darhol <b>sharbat tomchilari</b> paydo bo'ladi — olmaning asosiy qismi (taxminan 85%) <b>suv</b>.", en: 'We cut the apple in half. <b>Drops of juice</b> appear on the cut surface at once — most of an apple (about 85%) is <b>water</b>.' }, f(p) {
            knife.position.y = lerp(1.2, 0.32, ease(seg(p, 0, 0.4))); knife.visible = p < 0.5;
            const o = ease(seg(p, 0.45, 0.72)); flatA(o); flatB(o); stem.visible = o < 0.05;
            juice.forEach((j) => { const k = seg(p, 0.7 + j.userData.k * 0.15, 0.85 + j.userData.k * 0.15); j.visible = k > 0; const r = 0.006 + 0.012 * k; j.scale.set(r, r * 0.5, r); j.position.set(AX + j.userData.p.x, YF + 0.003, 0.05 + j.userData.p.z); }); lJ.set(seg(p, 0.85, 1));
          } },
          { dur: 5.5, cap: { uz: "Bir bo'lagini siqib, <b>sharbatni</b> stakanga yig'amiz. Unga <b>universal indikator qog'oz</b> botiramiz.", en: 'We squeeze one half and collect the <b>juice</b> in a beaker. Then we dip <b>universal indicator paper</b> into it.' }, f(p) {
            flatB(1); stem.visible = false; knife.visible = false; juice.forEach((j) => (j.visible = false)); lJ.set(0);
            const lift = ease(seg(p, 0, 0.2)); A.g.position.set(lerp(AX, 0.65, lift), lerp(YF, 0.85, lift), lerp(0.05, 0, lift)); A.g.rotation.set(0, 0, lerp(Math.PI / 2, -Math.PI / 2, lift)); A.g.scale.set(1 - 0.3 * seg(p, 0.2, 0.55), 1, 1);
            dr.rate = p > 0.2 && p < 0.55 ? 14 : 0; bk.setLevel(lerp(0, 0.13, seg(p, 0.22, 0.6)));
            if (p > 0.58) A.g.visible = false;
            const dip = ease(seg(p, 0.6, 0.85)); strip.position.set(lerp(1.1, 0.66, dip), lerp(0.4, 0.06, dip), lerp(0.1, 0, dip));
            wet.material.color.copy(ylo).lerp(yr, seg(p, 0.82, 1));
          } },
          { dur: 5, cap: { uz: "Indikator <b>qizil-to'q sariq</b> rangga kirdi. Rangni shkala bilan solishtiramiz: <b>pH ≈ 3–4</b> — muhit <b>kislotali</b>. Olmaga nordon ta'mni <b>olma kislota</b> va boshqa organik kislotalar beradi.", en: 'The indicator turned <b>red-orange</b>. Comparing it with the scale gives <b>pH ≈ 3–4</b> — the medium is <b>acidic</b>. The sour taste comes from <b>malic acid</b> and other organic acids.' }, f(p) {
            A.g.visible = false; flatB(1); bk.setLevel(0.13);
            const up = ease(seg(p, 0, 0.3)); strip.position.set(lerp(0.66, -0.1, up), lerp(0.06, 0.42, up), lerp(0, -0.4, up)); wet.material.color.copy(yr);
            mark.visible = p > 0.35; lPH.set(seg(p, 0.35, 0.5));
          } },
          { dur: 5.5, cap: { uz: "Ikkinchi bo'lak etiga <b>yod eritmasi</b> tomizamiz. Dog'lar <b>ko'kish-qora</b> tusga kiradi — olmada <b>oz miqdorda kraxmal</b> bor. Pishgan olmada kraxmal shakarga aylangani uchun rang kuchsizroq bo'ladi.", en: 'We drop <b>iodine solution</b> on the other half. The spots turn <b>bluish-black</b> — the apple contains <b>a little starch</b>. In a ripe apple most starch has become sugar, so the colour is weaker.' }, f(p) {
            A.g.visible = false; flatB(1); mark.visible = true; lPH.set(1); strip.position.set(-0.1, 0.42, -0.4); wet.material.color.copy(yr); bk.setLevel(0.13);
            drop.visible = p > 0.1 && p < 0.9; const k = seg(p, 0.15, 0.8) * 3; const si = Math.min(2, Math.floor(k)); const sp = spots[si].position;
            drop.position.set(sp.x, 0.78, sp.z); idd.rate = (k % 1) > 0.25 && (k % 1) < 0.45 ? 9 : 0; spotsOn(k); lI.set(seg(p, 0.85, 1));
          } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> olma tarkibida <b>suv</b> (asosiy qism), <b>shakarlar</b> (glyukoza, fruktoza — shirin ta'm), <b>organik kislotalar</b> (nordon ta'm), <b>oz kraxmal</b>, kletchatka, vitaminlar va kaliy kabi mineral elementlar bor.", en: '<b>Conclusion:</b> an apple contains <b>water</b> (the main part), <b>sugars</b> (glucose, fructose — sweet taste), <b>organic acids</b> (sour taste), <b>a little starch</b>, fibre, vitamins and minerals such as potassium.' }, f() {
            A.g.visible = false; flatB(1); drop.visible = false; mark.visible = true; strip.position.set(-0.1, 0.42, -0.4); wet.material.color.copy(yr); bk.setLevel(0.13); spotsOn(3); lI.set(1); lPH.set(1); lSum.set(1);
          } },
        ],
        loop(dt) { dr.tick(dt); idd.tick(dt); },
        clear() { dr.clear(); idd.clear(); }
      };
    }
  });
  Lab.list.sort((a, b) => (a.lessons[0][0] - b.lessons[0][0]) || (a.lessons[0][1] - b.lessons[0][1]));
})();
