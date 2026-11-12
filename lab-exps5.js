/* Tajribalar — 5-qism: 6-sinf "kimyo va hayot" mavzulari (1) */
(function () {
  const T = THREE, { clamp, lerp, ease, seg, rng } = Lab.m, M = Lab.M, P = Lab.profiles, { at, V, screenTex } = Lab.util;
  const C = (h) => new T.Color(h);
  function dropper(scene, color) {
    const g = new T.Group(); const bulb = new T.Mesh(new T.SphereGeometry(0.045, 14, 10), M.std(0x2b2b2b, { roughness: 0.6 })); bulb.scale.y = 1.3; bulb.position.y = 0.38; g.add(bulb);
    const tb = new T.Mesh(new T.CylinderGeometry(0.016, 0.006, 0.34, 12), M.glass({ opacity: 0.25 })); tb.position.y = 0.17; tb.renderOrder = 10; g.add(tb);
    const liq = new T.Mesh(new T.CylinderGeometry(0.012, 0.005, 0.2, 10), M.liquid(color, 0.8)); liq.position.y = 0.1; g.add(liq); scene.add(g); return { g, liq };
  }
  function clock(scene, x, y, z) { const sc = screenTex(320, 96); const m = new T.Mesh(new T.PlaneGeometry(0.62, 0.19), new T.MeshBasicMaterial({ map: sc.t, toneMapped: false })); m.position.set(x, y, z); scene.add(m); const fr = new T.Mesh(new T.BoxGeometry(0.68, 0.24, 0.03), M.std(0x1f2937, { roughness: 0.4 })); fr.position.set(x, y, z - 0.02); scene.add(fr); return sc; }
  function iconTex(sym, bg = '#ffffff', border = '#d61f26') {
    const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
    g.translate(128, 128); g.rotate(Math.PI / 4); g.fillStyle = bg; g.fillRect(-84, -84, 168, 168); g.lineWidth = 16; g.strokeStyle = border; g.strokeRect(-84, -84, 168, 168); g.rotate(-Math.PI / 4);
    g.font = '96px "Segoe UI Emoji","Noto Color Emoji","Apple Color Emoji",sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#111'; g.fillText(sym, 0, 8);
    return Lab.srgb(new T.CanvasTexture(c));
  }
  function tint(v, color, k) { const m = v.liq.material; m.color.set(color); m.attenuationColor.set(color); m.transmission = lerp(0.94, 0.12, k); m.envMapIntensity = lerp(1.4, 0.55, k); m.attenuationDistance = lerp(0.45, 0.08, k); }
  Lab.util.dropper = dropper; Lab.util.clock = clock; Lab.util.iconTex = iconTex; Lab.util.tint = tint;

  /* 1. C vitaminini aniqlash — 6-sinf, 21-dars */
  Lab.def({
    id: 'vitamin-c', icon: '🍊', grade: [6], lessons: [[6, 21]],
    title: { uz: 'Sharbatlarda C vitaminini aniqlash', en: 'Testing juices for vitamin C' },
    desc: { uz: "Kraxmal-yod eritmasi to'q ko'k. C vitamini (askorbin kislota) yodni bog'lab oladi va ko'k rang yo'qoladi. Qaysi sharbatda C vitamini ko'p bo'lsa, rang shuncha tez yo'qoladi.", en: 'Starch–iodine solution is dark blue. Vitamin C (ascorbic acid) reacts with the iodine and the blue colour disappears. The more vitamin C a juice has, the faster the colour fades.' },
    cam: { pos: [0, 1.25, 2.3], target: [0, 0.5, 0] },
    build(ctx) {
      const { scene } = ctx;
      const rack = new T.Group(); const top = new T.Mesh(new T.BoxGeometry(1.6, 0.04, 0.26), M.wood()); top.position.y = 0.42; rack.add(top); const base = new T.Mesh(new T.BoxGeometry(1.6, 0.04, 0.26), M.wood()); base.position.y = 0.02; rack.add(base);
      [-0.78, 0.78].forEach((x) => { const s = new T.Mesh(new T.BoxGeometry(0.04, 0.44, 0.26), M.wood()); s.position.set(x, 0.22, 0); rack.add(s); }); scene.add(rack);
      const names = [[{ uz: 'Suv', en: 'Water' }, 0, 0xd9f1ff], [{ uz: 'Olma sharbati', en: 'Apple juice' }, 0.35, 0xf2df8f], [{ uz: 'Apelsin sharbati', en: 'Orange juice' }, 0.85, 0xffa733], [{ uz: 'Limon sharbati', en: 'Lemon juice' }, 1, 0xfff07a]];
      const blue = C(0x14186b), clear = C(0xe8f3ff);
      const tubes = names.map((n, i) => { const v = ctx.add(at(Lab.vessel(P.tube(0.1, 0.95), { color: 0x14186b, opacity: 0.9, level: 0.5 }), -0.57 + i * 0.38, 0.04, 0)); const L = ctx.label(n[0], v.group, [0, -0.06, 0.25]); const R = ctx.label('', v.group, [0, 1.08 + (i % 2) * 0.14, 0], 'tag'); return { v, L, R, vit: n[1], col: n[2] }; });
      const dps = names.map((n) => dropper(scene, n[2]));
      const dd = Lab.drops(scene, { color: 0xffd36b, from: () => V(0, 1.1, 0), to: () => 0.5 });
      const lEq = ctx.label({ uz: "Ko'k rang = kraxmal + yod", en: 'Blue = starch + iodine' }, rack, [0, 1.25, 0], 'micro');
      const res = (k) => (k >= 0.9 ? { uz: "✔✔ Ko'p", en: '✔✔ Lots' } : k > 0.2 ? { uz: '✔ Biroz', en: '✔ Some' } : { uz: "✘ Yo'q", en: '✘ None' });
      return {
        reset() { tubes.forEach((t) => { tint(t.v, blue, 1); t.v.setFrac(0.5); t.R.set(0); }); dps.forEach((d, i) => { d.g.position.set(-0.57 + i * 0.38, 1.5, -0.45); d.g.visible = true; }); dd.rate = 0; lEq.set(1); },
        steps: [
          { dur: 4, cap: { uz: "To'rtta probirkada bir xil <b>kraxmal + yod</b> eritmasi — u <b>to'q ko'k</b> rangda. Ularga suv va turli sharbatlardan tomizamiz.", en: 'Four test tubes hold the same <b>starch + iodine</b> solution — it is <b>dark blue</b>. We will add water and different juices to them.' } },
          { dur: 4.5, cap: { uz: "Birinchi probirkaga <b>suv</b> tomizamiz — rang o'zgarmadi. Suvda C vitamini yo'q.", en: 'We add <b>water</b> to the first tube — no change. Water contains no vitamin C.' }, f(p) { const d = dps[0].g; d.position.set(-0.57, lerp(1.5, 1.12, ease(seg(p, 0, 0.3))), lerp(-0.45, 0, ease(seg(p, 0, 0.3)))); dd.from = () => V(-0.57, 1.1, 0); dd.mat.color.set(names[0][2]); dd.rate = p > 0.3 && p < 0.7 ? 6 : 0; if (p > 0.8) d.position.set(-0.57, 1.5, -0.45); tubes[0].R.setText(res(0)); tubes[0].R.set(seg(p, 0.75, 0.9)); } },
          { dur: 9, cap: { uz: "Olma, apelsin va limon sharbatlarini tomizamiz. <b>Limon va apelsin</b> sharbatida ko'k rang tez yo'qoladi, <b>olma</b> sharbatida — sekin va qisman. Sabab: <b>C vitamini (askorbin kislota)</b> yodni bog'lab oladi.", en: 'We add apple, orange and lemon juice. With <b>lemon and orange</b> the blue fades quickly; with <b>apple</b> juice it fades slowly and only partly. The reason: <b>vitamin C (ascorbic acid)</b> reacts with the iodine.' }, eq: { uz: 'C vitamini + yod → rangsiz moddalar', en: 'vitamin C + iodine → colourless products' }, f(p) {
            tubes[0].R.setText(res(0)); tubes[0].R.set(1);
            for (let i = 1; i < 4; i++) { const a = (i - 1) / 3, b = a + 1 / 3; const q = seg(p, a, b); const d = dps[i].g; const x = -0.57 + i * 0.38;
              const mv = ease(seg(q, 0, 0.25)) * (1 - ease(seg(q, 0.75, 1))); d.position.set(x, lerp(1.5, 1.12, mv), lerp(-0.45, 0, mv));
              if (q > 0.25 && q < 0.7) { dd.from = () => V(x, 1.1, 0); dd.mat.color.set(names[i][2]); dd.rate = 6; }
              const t = tubes[i]; const fade = seg(p, a + 0.08, Math.min(1, b + 0.25 / (t.vit + 0.1))) * t.vit; tint(t.v, blue.clone().lerp(clear.clone().lerp(C(t.col), 0.35), fade), 1 - fade * 0.85); t.v.setFrac(0.5 + 0.04 * seg(q, 0.25, 0.7));
              t.R.setText(res(t.vit)); t.R.set(seg(p, b - 0.05, b + 0.05)); }
            if (!(p % (1 / 3) > 0.08 && p % (1 / 3) < 0.23)) dd.rate = 0;
          } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> sitrus mevalar (limon, apelsin) C vitaminiga boy. C vitamini <b>immunitetni</b> mustahkamlaydi va yaralar bitishiga yordam beradi. U oziq-ovqatda <b>E300</b> kodli antioksidant sifatida ham qo'shiladi.", en: '<b>Conclusion:</b> citrus fruits (lemon, orange) are rich in vitamin C. Vitamin C strengthens <b>immunity</b> and helps wounds heal. It is also added to food as the antioxidant <b>E300</b>.' }, f() { dps.forEach((d, i) => d.g.position.set(-0.57 + i * 0.38, 1.5, -0.45)); tubes.forEach((t) => { const f = t.vit; tint(t.v, blue.clone().lerp(clear.clone().lerp(C(t.col), 0.35), f), 1 - f * 0.85); t.v.setFrac(f ? 0.54 : 0.5); t.R.setText(res(t.vit)); t.R.set(1); }); dd.rate = 0; } },
        ],
        loop(dt) { dd.tick(dt); }, clear() { dd.clear(); }
      };
    }
  });

  /* 2. Antioksidant qo'shimchalar: olmaning qorayishi — 6-sinf, 23-dars */
  Lab.def({
    id: 'apple-browning', icon: '🍎', grade: [6], lessons: [[6, 23]],
    title: { uz: "Oziq-ovqat qo'shimchasi qanday ishlaydi? (olmaning qorayishi)", en: 'How does a food additive work? (apple browning)' },
    desc: { uz: "Kesilgan olma havodagi kislorod ta'sirida qorayadi. Limon sharbati (C vitamini — E300, limon kislota — E330) surtilgan bo'lak oqligicha qoladi. Antioksidant qo'shimchalar mahsulotni uzoqroq saqlaydi.", en: 'A cut apple turns brown as oxygen in the air reacts with it. A slice coated with lemon juice (vitamin C — E300, citric acid — E330) stays white. Antioxidant additives keep food fresh longer.' },
    cam: { pos: [0, 1.35, 1.9], target: [0, 0.25, 0] },
    build(ctx) {
      const { scene } = ctx;
      const slice = (x, lab) => { const g = new T.Group(); const plate = new T.Mesh(new T.CylinderGeometry(0.32, 0.28, 0.03, 40), M.std(0xffffff, { roughness: 0.35 })); plate.position.y = 0.015; plate.receiveShadow = true; g.add(plate);
        const fl = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 0.06, 40, 1, false, 0, Math.PI), new T.MeshStandardMaterial({ color: 0xf7f0cf, roughness: 0.6 })); fl.rotation.y = Math.PI / 2; fl.position.y = 0.06; g.add(fl);
        const sk = new T.Mesh(new T.TorusGeometry(0.2, 0.018, 8, 40, Math.PI), M.std(0xc0262b, { roughness: 0.35 })); sk.rotation.x = Math.PI / 2; sk.rotation.z = Math.PI; sk.position.y = 0.06; g.add(sk);
        g.position.set(x, 0, 0); scene.add(g); ctx.label(lab, g, [0, -0.02, 0.38]); return { g, fl }; };
      const s1 = slice(-0.4, { uz: "Hech narsa surtilmagan", en: 'Nothing added' }), s2 = slice(0.4, { uz: 'Limon sharbati surtilgan', en: 'Coated with lemon juice' });
      const lemon = new T.Mesh(new T.SphereGeometry(0.12, 24, 16), M.std(0xf7d94c, { roughness: 0.5 })); lemon.scale.set(1.3, 1, 1); scene.add(lemon);
      const dd = Lab.drops(scene, { color: 0xfff6a0, from: () => lemon.position.clone().add(V(0, -0.1, 0)), to: () => 0.1 });
      const sc = clock(scene, 0, 0.75, -0.55);
      const air = []; for (let i = 0; i < 10; i++) { const m = Lab.mol('O2', 0.14); scene.add(m); air.push({ m, k: i / 10 }); }
      const lO = ctx.label({ uz: 'Havodagi kislorod (O₂)', en: 'Oxygen in the air (O₂)' }, s1.g, [0, 0.6, 0], 'micro');
      const lA = ctx.label({ uz: 'Qoraydi', en: 'Turns brown' }, s1.g, [0, 0.3, 0], 'warn'); const lB = ctx.label({ uz: 'Oqligicha qoldi — E300 / E330', en: 'Stays white — E300 / E330' }, s2.g, [0, 0.3, 0], 'tag');
      const white = C(0xf7f0cf), brown = C(0x9a6a33);
      return {
        reset() { s1.fl.material.color.copy(white); s2.fl.material.color.copy(white); lemon.position.set(0.4, 0.75, 0.2); lemon.visible = true; dd.rate = 0; sc.draw('00:00'); air.forEach((a) => (a.m.visible = false)); lO.set(0); lA.set(0); lB.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "Olmani bo'laklarga kesdik. Bir bo'lakka hech narsa surtmaymiz, ikkinchisiga <b>limon sharbati</b> tomizamiz.", en: 'We cut an apple into slices. We leave one slice as it is and drip <b>lemon juice</b> onto the other.' } },
          { dur: 4, cap: { uz: "Limon sharbatida <b>askorbin kislota (C vitamini, E300)</b> va <b>limon kislota (E330)</b> bor — ular tabiiy <b>antioksidantlar</b>.", en: 'Lemon juice contains <b>ascorbic acid (vitamin C, E300)</b> and <b>citric acid (E330)</b> — natural <b>antioxidants</b>.' }, f(p) { lemon.position.set(0.4, lerp(0.75, 0.42, ease(seg(p, 0, 0.3))), lerp(0.2, 0, ease(seg(p, 0, 0.3)))); dd.rate = p > 0.3 && p < 0.85 ? 10 : 0; s2.fl.material.color.copy(white).lerp(C(0xfaf3c0), seg(p, 0.3, 0.85)); } },
          { dur: 9, cap: { uz: "Vaqt o'tadi (tezlashtirilgan). Havodagi <b>kislorod</b> olma tarkibidagi moddalar bilan reaksiyaga kirishadi — oddiy bo'lak <b>qorayadi</b>. Limon sharbati surtilgan bo'lak deyarli o'zgarmaydi.", en: 'Time passes (sped up). <b>Oxygen</b> in the air reacts with substances in the apple — the plain slice <b>turns brown</b>. The lemon-coated slice hardly changes.' }, f(p) {
            lemon.visible = false; dd.rate = 0; s2.fl.material.color.copy(C(0xfaf3c0)).lerp(C(0xe9dca0), p * 0.4); s1.fl.material.color.copy(white).lerp(brown, ease(seg(p, 0.1, 1)));
            const mins = Math.round(60 * p); sc.draw(`00:${String(mins).padStart(2, '0')} ${ctx.lang === 'uz' ? 'daq' : 'min'}`);
            air.forEach((a, i) => { const q = (p * 2.5 + a.k) % 1; a.m.visible = p < 0.85; a.m.position.set(-0.4 + Math.sin(i * 2.3) * 0.25, lerp(0.75, 0.12, q), Math.cos(i * 1.7) * 0.15); a.m.rotation.y = q * 6; });
            lO.set(seg(p, 0, 0.1) * (1 - seg(p, 0.8, 0.9))); lA.set(seg(p, 0.6, 0.7)); lB.set(seg(p, 0.7, 0.8));
          } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> oziq-ovqat qo'shimchalari mahsulot <b>rangi, ta'mi va saqlanish muddatini</b> yaxshilaydi. Antioksidantlar kislorod ta'sirini sekinlashtiradi. E-kodli moddalarning hammasi ham zararli emas — ko'pi tabiiy (E300, E330, E440 — pektin).", en: '<b>Conclusion:</b> food additives improve <b>colour, taste and shelf life</b>. Antioxidants slow down the effect of oxygen. Not all E-numbers are harmful — many are natural (E300, E330, E440 — pectin).' }, f() { lemon.visible = false; s1.fl.material.color.copy(brown); s2.fl.material.color.copy(C(0xf1e6b0)); sc.draw(`01:00 ${ctx.lang === 'uz' ? 'soat' : 'hour'}`); air.forEach((a) => (a.m.visible = false)); lA.set(1); lB.set(1); } },
        ],
        loop(dt) { dd.tick(dt); }, clear() { dd.clear(); }
      };
    }
  });

  /* 3. Shipuchi tabletka: dori shakli va erish tezligi — 6-sinf, 24-dars */
  Lab.def({
    id: 'effervescent', icon: '💊', grade: [6], lessons: [[6, 24]],
    title: { uz: "Dori shakli muhimmi? (shipuchi tabletka)", en: 'Does the form of a medicine matter? (effervescent tablet)' },
    desc: { uz: "Shipuchi tabletka suvda karbonat angidrid (CO₂) pufakchalari chiqarib eriydi. Maydalangan tabletka butun tabletkadan ancha tez eriydi — dori shakli uning ta'sir tezligiga ta'sir qiladi.", en: 'An effervescent tablet dissolves in water, releasing bubbles of carbon dioxide (CO₂). A crushed tablet dissolves much faster than a whole one — the form of a medicine affects how fast it acts.' },
    cam: { pos: [0, 1.25, 2.4], target: [0, 0.45, 0] },
    build(ctx) {
      const { scene } = ctx;
      const g1 = ctx.add(at(Lab.vessel(P.beaker(0.27, 0.62), { color: 0xd8eeff, opacity: 0.4, level: 0.44 }), -0.45, 0, 0));
      const g2 = ctx.add(at(Lab.vessel(P.beaker(0.27, 0.62), { color: 0xd8eeff, opacity: 0.4, level: 0.44 }), 0.45, 0, 0));
      const tab = new T.Mesh(new T.CylinderGeometry(0.11, 0.11, 0.04, 32), M.std(0xfff4e0, { roughness: 0.85 })); scene.add(tab);
      const pow = []; const R = rng(5); for (let i = 0; i < 40; i++) { const m = new T.Mesh(new T.BoxGeometry(0.02, 0.012, 0.02), tab.material); m.userData.o = V((R() - 0.5) * 0.2, R() * 0.05, (R() - 0.5) * 0.2); m.userData.k = R(); scene.add(m); pow.push(m); }
      const b1 = Lab.bubbles(scene, { size: 0.02, speed: 0.6, region: () => ({ x: -0.45, z: 0, r: 0.08, y0: 0.06, y1: 0.43 }) });
      const b2 = Lab.bubbles(scene, { size: 0.018, speed: 0.7, region: () => ({ x: 0.45, z: 0, r: 0.22, y0: 0.06, y1: 0.43 }) });
      const fz1 = Lab.puffs(scene, { origin: () => V(-0.45, 0.45, 0), size: 0.12, op: 0.25, life: 1, spread: 0.1 }), fz2 = Lab.puffs(scene, { origin: () => V(0.45, 0.45, 0), size: 0.12, op: 0.25, life: 1, spread: 0.15 });
      ctx.label({ uz: 'Butun tabletka', en: 'Whole tablet' }, g1.group, [0, -0.06, 0.4]); ctx.label({ uz: 'Maydalangan tabletka', en: 'Crushed tablet' }, g2.group, [0, -0.06, 0.4]);
      const sc1 = clock(scene, -0.45, 0.95, -0.4), sc2 = clock(scene, 0.45, 0.95, -0.4);
      const lC = ctx.label({ uz: 'CO₂ pufakchalari', en: 'CO₂ bubbles' }, g2.group, [0.3, 0.6, 0], 'tag');
      const orange = C(0xff9f1c), water = C(0xd8eeff);
      return {
        reset() { tab.position.set(-0.45, 0.9, 0); tab.scale.setScalar(1); tab.visible = true; pow.forEach((m) => { m.visible = true; m.position.set(0.45 + m.userData.o.x, 0.9 + m.userData.o.y, m.userData.o.z); m.scale.setScalar(1); }); tint(g1, water, 0); tint(g2, water, 0); b1.rate = b2.rate = fz1.rate = fz2.rate = 0; sc1.draw('0 s'); sc2.draw('0 s'); lC.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "Ikki stakanda bir xil suv. Birinchisiga <b>butun</b> shipuchi tabletka, ikkinchisiga xuddi shunday, lekin <b>maydalangan</b> tabletka solamiz.", en: 'Two glasses hold the same water. We drop a <b>whole</b> effervescent tablet into the first and an identical but <b>crushed</b> tablet into the second.' } },
          { dur: 3, cap: { uz: "Tashlaymiz!", en: 'In they go!' }, f(p) { const k = ease(p); tab.position.y = lerp(0.9, 0.09, k); pow.forEach((m) => { m.position.y = lerp(0.9 + m.userData.o.y, 0.07 + m.userData.o.y * 0.2, ease(seg(p, m.userData.k * 0.3, 0.7 + m.userData.k * 0.3))); }); b1.rate = 20 * seg(p, 0.8, 1); b2.rate = 60 * seg(p, 0.8, 1); } },
          { dur: 9, cap: { uz: "Tabletka tarkibidagi <b>limon kislota</b> va <b>ichimlik sodasi</b> suvda reaksiyaga kirishib, <b>CO₂</b> gazini chiqaradi. Maydalangan tabletkaning sirti katta — u <b>tezroq</b> eriydi; butun tabletka sekinroq.", en: 'The <b>citric acid</b> and <b>baking soda</b> in the tablet react in water and give off <b>CO₂</b> gas. The crushed tablet has a much bigger surface — it dissolves <b>faster</b>; the whole tablet is slower.' }, eq: { uz: 'limon kislota + NaHCO₃ → tuz + H₂O + CO₂↑', en: 'citric acid + NaHCO₃ → salt + H₂O + CO₂↑' }, f(p) {
            tab.position.y = 0.09 + 0.01 * Math.sin(p * 40); const s1 = 1 - ease(p) * 0.98; tab.scale.set(s1, Math.max(0.2, s1), s1); tab.visible = s1 > 0.03;
            const s2 = 1 - ease(seg(p, 0, 0.35)); pow.forEach((m) => { m.position.y = 0.07 + m.userData.o.y * 0.2; m.scale.setScalar(Math.max(0.001, s2)); m.visible = s2 > 0.02; });
            b1.rate = 30 * (1 - seg(p, 0.85, 1)); b2.rate = 90 * (1 - seg(p, 0.3, 0.5)); fz1.rate = 4 * (1 - seg(p, 0.8, 1)); fz2.rate = 10 * (1 - seg(p, 0.3, 0.45));
            tint(g1, water.clone().lerp(orange, ease(p)), 0.6 * ease(p)); tint(g2, water.clone().lerp(orange, ease(seg(p, 0, 0.35))), 0.6 * ease(seg(p, 0, 0.35)));
            sc1.draw(`${Math.round(150 * Math.min(p, 0.98))} s`); sc2.draw(`${Math.round(150 * Math.min(p, 0.35))} s`); lC.set(seg(p, 0, 0.1) * (1 - seg(p, 0.5, 0.6)));
          } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> dori tarkibida <b>faol modda</b> (davolaydi) va <b>yordamchi moddalar</b> (shakl beradi, erishni tezlashtiradi) bor. Shakli (tabletka, sirop, kukun) ta'sir tezligini o'zgartiradi. ⚠️ Dorini faqat shifokor yoki ota-ona maslahati bilan ichamiz!", en: '<b>Conclusion:</b> a medicine contains an <b>active substance</b> (which treats) and <b>excipients</b> (which give its form and help it dissolve). The form (tablet, syrup, powder) changes how fast it works. ⚠️ Take medicine only on a doctor’s or parent’s advice!' }, f() { tab.visible = false; pow.forEach((m) => (m.visible = false)); tint(g1, orange, 0.6); tint(g2, orange, 0.6); b1.rate = b2.rate = 0; fz1.rate = fz2.rate = 0; sc1.draw('147 s'); sc2.draw('52 s'); } },
        ],
        loop(dt) { b1.tick(dt); b2.tick(dt); fz1.tick(dt); fz2.tick(dt); }, clear() { b1.clear(); b2.clear(); fz1.clear(); fz2.clear(); }
      };
    }
  });

  /* 4. Toza qo'llar va antibiotik: Petri likopchalari — 6-sinf, 25-dars */
  Lab.def({
    id: 'petri-bacteria', icon: '🦠', grade: [6], lessons: [[6, 25]],
    title: { uz: "Qo'l yuvish va antibiotik: bakteriyalar o'sishi", en: 'Hand-washing and antibiotics: growing bacteria' },
    desc: { uz: "Yuvilmagan barmoq tekkan Petri likopchasida 2–3 kunda ko'plab bakteriya koloniyalari o'sadi, sovun bilan yuvilgan barmoqdan esa juda kam. Antibiotikli disk atrofida bakteriyalar o'smaydi — toza halqa hosil bo'ladi.", en: 'A Petri dish touched by an unwashed finger grows many bacterial colonies in 2–3 days; a finger washed with soap leaves very few. Around an antibiotic disc bacteria cannot grow — a clear ring forms.' },
    cam: { pos: [0, 2.1, 1.55], target: [0, 0.05, 0.05] },
    build(ctx) {
      const { scene } = ctx;
      const dish = (x, lab) => { const g = new T.Group(); const v = Lab.vessel([[0, 0], [0.33, 0], [0.34, 0.07]], {}); g.add(v.group);
        const agar = new T.Mesh(new T.CylinderGeometry(0.325, 0.325, 0.03, 48), new T.MeshPhysicalMaterial({ color: 0xc98a2e, roughness: 0.3, clearcoat: 0.6 })); agar.position.y = 0.02; g.add(agar);
        const lid = Lab.vessel([[0, 0.085], [0.355, 0.085], [0.36, 0.06]], {}); lid.glass.material.envMapIntensity = 0.5; lid.glass.material.opacity = 0.08; g.add(lid.group); v.glass.material.envMapIntensity = 0.6; g.position.set(x, 0, 0); scene.add(g); ctx.label(lab, g, [0, -0.02, 0.45]); return { g, agar, lid };
      };
      const A = dish(-0.8, { uz: 'Yuvilmagan barmoq', en: 'Unwashed finger' }), B = dish(0, { uz: 'Sovun bilan yuvilgan', en: 'Washed with soap' }), Cd = dish(0.8, { uz: 'Bakteriyalar + antibiotik', en: 'Bacteria + antibiotic' });
      const R = rng(21); const cols = (d, n, ring) => { const arr = []; for (let i = 0; i < n; i++) { let a = R() * 6.28, r = Math.sqrt(R()) * 0.29; if (ring && r < 0.15) r = 0.15 + R() * 0.14; const m = new T.Mesh(new T.SphereGeometry(1, 12, 8), M.std([0xfff3d6, 0xf6e27a, 0xffffff, 0xf0c27b][i % 4], { roughness: 0.45 })); m.scale.set(1, 0.4, 1); m.position.set(Math.cos(a) * r, 0.036, Math.sin(a) * r); m.userData.s = (ring ? 0.016 : 0.014) + R() * (ring ? 0.01 : 0.03); m.userData.k = R(); d.g.add(m); arr.push(m); } return arr; };
      const cA = cols(A, 60), cB = cols(B, 4), cC = cols(Cd, 200, true);
      const disc = new T.Mesh(new T.CylinderGeometry(0.06, 0.06, 0.008, 28), M.std(0xffffff, { roughness: 0.9 })); disc.position.set(0, 0.04, 0); Cd.g.add(disc);
      const zone = new T.Mesh(new T.RingGeometry(0.06, 0.15, 40), new T.MeshBasicMaterial({ color: 0xffe9b8, transparent: true, opacity: 0, depthWrite: false })); zone.rotation.x = -Math.PI / 2; zone.position.y = 0.037; Cd.g.add(zone);
      const finger = new T.Group(); const f1 = new T.Mesh(new T.CapsuleGeometry(0.06, 0.35, 8, 16), M.std(0xe9b48f, { roughness: 0.6 })); f1.position.y = 0.2; finger.add(f1); scene.add(finger);
      const sc = clock(scene, 0, 0.9, -0.6);
      const lZ = ctx.label({ uz: "Toza halqa — bakteriyalar nobud bo'ldi", en: 'Clear ring — bacteria killed' }, Cd.g, [0, 0.3, 0], 'tag');
      const lI = ctx.label({ uz: 'Termostat: 37 °C', en: 'Incubator: 37 °C' }, B.g, [0, 0.45, 0], 'temp');
      const grow = (arr, k) => arr.forEach((m) => { const q = seg(k, m.userData.k * 0.5, 0.5 + m.userData.k * 0.5); m.visible = q > 0; m.scale.set(m.userData.s * q, m.userData.s * 0.4 * q, m.userData.s * q); });
      return {
        reset() { [A, B, Cd].forEach((d) => { d.lid.group.position.y = 0.4; d.lid.group.visible = true; }); grow(cA, 0); grow(cB, 0); grow(cC, 0); zone.material.opacity = 0; disc.visible = false; finger.position.set(-0.8, 1.2, 0); finger.visible = true; sc.draw(ctx.lang === 'uz' ? '0-kun' : 'Day 0'); lZ.set(0); lI.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "Uchta Petri likopchasida <b>ozuqa muhiti (agar)</b> — bakteriyalar uchun «oziq-ovqat». Ular bir qarashda toza.", en: 'Three Petri dishes contain <b>nutrient agar</b> — "food" for bacteria. At first glance they look clean.' } },
          { dur: 6, cap: { uz: "1-likopchaga <b>yuvilmagan</b> barmoqni, 2-siga <b>sovun bilan yuvilgan</b> barmoqni tekkizamiz. 3-siga bakteriyalar surtib, o'rtasiga <b>antibiotikli disk</b> qo'yamiz.", en: 'We touch dish 1 with an <b>unwashed</b> finger and dish 2 with a finger <b>washed with soap</b>. Dish 3 is spread with bacteria and an <b>antibiotic disc</b> is placed in the middle.' }, f(p) {
            const a = seg(p, 0, 0.4), b = seg(p, 0.45, 0.8); const x = p < 0.42 ? -0.8 : 0; const k = p < 0.42 ? a : b; finger.position.set(x, lerp(1.2, 0.05, Math.sin(Math.PI * k)), 0); finger.visible = p < 0.82;
            disc.visible = p > 0.85; disc.position.y = lerp(0.4, 0.04, ease(seg(p, 0.85, 1))); [A, B, Cd].forEach((d) => (d.lid.group.position.y = 0.4));
          } },
          { dur: 9, cap: { uz: "Likopchalarni yopib, <b>37 °C</b> li termostatga qo'yamiz. 1–3 kun o'tadi… Har bir nuqta — millionlab bakteriyalardan iborat <b>koloniya</b>.", en: 'We cover the dishes and put them in an incubator at <b>37 °C</b>. 1–3 days pass… Each dot is a <b>colony</b> of millions of bacteria.' }, f(p) {
            finger.visible = false; disc.visible = true; disc.position.y = 0.04; [A, B, Cd].forEach((d) => (d.lid.group.position.y = lerp(0.4, 0, ease(seg(p, 0, 0.12))))); lI.set(seg(p, 0.1, 0.2));
            const k = seg(p, 0.15, 1); grow(cA, k); grow(cB, k); grow(cC, k); zone.material.opacity = 0.35 * seg(p, 0.5, 1); sc.draw(ctx.lang === 'uz' ? `${Math.min(3, Math.floor(k * 3.2))}-kun` : `Day ${Math.min(3, Math.floor(k * 3.2))}`); lZ.set(seg(p, 0.85, 1));
          } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> qo'lni sovun bilan yuvish bakteriyalar sonini keskin kamaytiradi. <b>Antibiotik</b> ba'zi bakteriyalarni yo'q qiladi — lekin u faqat <b>shifokor</b> tavsiyasi bilan ichiladi va viruslarga (gripp, shamollash) ta'sir qilmaydi.", en: '<b>Conclusion:</b> washing hands with soap greatly reduces the number of bacteria. An <b>antibiotic</b> kills some bacteria — but it is taken only on a <b>doctor’s</b> advice and does not work against viruses (flu, colds).' }, f() { finger.visible = false; disc.visible = true; [A, B, Cd].forEach((d) => (d.lid.group.position.y = 0)); grow(cA, 1); grow(cB, 1); grow(cC, 1); zone.material.opacity = 0.35; sc.draw(ctx.lang === 'uz' ? '3-kun' : 'Day 3'); lZ.set(1); lI.set(1); } },
        ],
      };
    }
  });

  /* 5. Xavfli moddalar belgilari va himoya vositalari — 6-sinf, 26-dars */
  Lab.def({
    id: 'hazard-shelf', icon: '☠️', grade: [6], lessons: [[6, 26]],
    title: { uz: 'Xavfli moddalar: ogohlantiruvchi belgilar va himoya', en: 'Hazardous substances: warning signs and protection' },
    desc: { uz: "Kimyoviy moddalar yorlig'idagi xalqaro belgilar xavf turini bildiradi: zaharli, yonuvchan, o'yuvchi, zararli, tabiat uchun xavfli. Ular bilan faqat kattalar himoya vositalarida ishlaydi.", en: 'International pictograms on chemical labels show the type of hazard: toxic, flammable, corrosive, harmful, dangerous for the environment. Only adults with protective equipment handle them.' },
    cam: { pos: [0, 1.55, 3.7], target: [0, 0.5, 0.2] },
    build(ctx) {
      const { scene } = ctx;
      const shelf = new T.Group(); [0.02, 0.62].forEach((y) => { const b = new T.Mesh(new T.BoxGeometry(2.2, 0.04, 0.4), M.wood()); b.position.y = y; shelf.add(b); }); [-1.1, 1.1].forEach((x) => { const s = new T.Mesh(new T.BoxGeometry(0.04, 1.25, 0.4), M.wood()); s.position.set(x, 0.62, 0); shelf.add(s); }); const back = new T.Mesh(new T.BoxGeometry(2.2, 1.25, 0.02), M.wood()); back.position.set(0, 0.62, -0.2); shelf.add(back); scene.add(shelf);
      const H = [['☠', { uz: 'ZAHARLI — sog\'liqqa jiddiy zarar', en: 'TOXIC — serious harm to health' }, 0x5b5f97], ['🔥', { uz: 'YONUVCHAN — yong\'in xavfi', en: 'FLAMMABLE — fire risk' }, 0xd35400], ['🖐', { uz: "O'YUVCHI — teri va ko'zni kuydiradi", en: 'CORROSIVE — burns skin and eyes' }, 0x2e86de], ['❗', { uz: 'ZARARLI / QITIQLOVCHI', en: 'HARMFUL / IRRITANT' }, 0x27ae60], ['🐟', { uz: 'TABIAT UCHUN XAVFLI', en: 'DANGEROUS FOR THE ENVIRONMENT' }, 0x8e44ad]];
      const bottles = H.map((h, i) => { const g = new T.Group(); const body = new T.Mesh(new T.CylinderGeometry(0.13, 0.13, 0.4, 28), M.std(h[2], { roughness: 0.35 })); body.position.y = 0.2; g.add(body); const neck = new T.Mesh(new T.CylinderGeometry(0.05, 0.08, 0.08, 20), M.std(h[2], { roughness: 0.35 })); neck.position.y = 0.44; g.add(neck); const cap = new T.Mesh(new T.CylinderGeometry(0.055, 0.055, 0.06, 20), M.std(0xf2f2f2)); cap.position.y = 0.51; g.add(cap);
        const lab = new T.Mesh(new T.PlaneGeometry(0.2, 0.2), new T.MeshBasicMaterial({ map: iconTex(h[0]), transparent: true, toneMapped: false })); lab.position.set(0, 0.22, 0.132); g.add(lab);
        if (i < 3) g.position.set(-0.6 + i * 0.6, 0.64, 0); else g.position.set(-0.3 + (i - 3) * 0.6, 0.04, 0); scene.add(g); const L = ctx.label(h[1], g, [0, 0.72, 0.1], 'warn'); return { g, L, lab }; });
      const ring = new T.Mesh(new T.TorusGeometry(0.22, 0.012, 8, 40), M.glow(0xffe066, 1)); scene.add(ring);
      // PPE
      const ppe = new T.Group(); scene.add(ppe);
      const gl = (x) => { const g = new T.Group(); const palm = new T.Mesh(new T.BoxGeometry(0.16, 0.2, 0.05), M.std(0x2563eb, { roughness: 0.6 })); g.add(palm); for (let i = 0; i < 4; i++) { const f = new T.Mesh(new T.CapsuleGeometry(0.018, 0.07, 4, 8), palm.material); f.position.set(-0.055 + i * 0.037, 0.15, 0); g.add(f); } g.position.set(x, 0.12, 0.6); g.rotation.x = -Math.PI / 2; ppe.add(g); return g; };
      gl(-0.65); gl(-0.4);
      const gog = new T.Group(); const lensL = new T.Mesh(new T.TorusGeometry(0.07, 0.014, 8, 24), M.std(0x111111)); lensL.position.x = -0.08; gog.add(lensL); const lensR = lensL.clone(); lensR.position.x = 0.08; gog.add(lensR); const glass = new T.Mesh(new T.BoxGeometry(0.3, 0.12, 0.01), M.glass({ opacity: 0.25 })); gog.add(glass); gog.position.set(0.15, 0.1, 0.6); ppe.add(gog);
      const mask = new T.Mesh(new T.SphereGeometry(0.11, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), M.std(0xffffff, { roughness: 0.9 })); mask.position.set(0.55, 0.02, 0.6); ppe.add(mask);
      const lP = ctx.label({ uz: "Himoya vositalari: qo'lqop, ko'zoynak, niqob", en: 'Protective gear: gloves, goggles, mask' }, ppe, [0, 0.35, 0.6], 'tag');
      return {
        reset() { bottles.forEach((b) => { b.L.set(0); b.g.scale.setScalar(1); }); ring.visible = false; ppe.visible = false; lP.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "Javonda turli kimyoviy moddalar. Har bir yorliqda <b>ogohlantiruvchi belgi</b> bor — u qanday xavf borligini bildiradi.", en: 'The shelf holds various chemicals. Each label has a <b>warning pictogram</b> showing what kind of hazard it is.' } },
          { dur: 12, cap: { uz: "Belgilarni birma-bir ko'rib chiqamiz: <b>zaharli</b>, <b>yonuvchan</b>, <b>o'yuvchi</b>, <b>zararli</b> va <b>tabiat uchun xavfli</b>. Yorliqni o'qimasdan moddaga yaqinlashmaymiz!", en: 'Let’s look at each sign: <b>toxic</b>, <b>flammable</b>, <b>corrosive</b>, <b>harmful</b> and <b>dangerous for the environment</b>. Never go near a substance without reading its label!' }, f(p) { const k = Math.min(4, Math.floor(p * 5)); bottles.forEach((b, i) => { b.L.set(i === k ? 1 : 0); b.g.scale.setScalar(i === k ? 1 + 0.08 * Math.sin(seg(p * 5 - k, 0, 0.3) * Math.PI) : 1); }); ring.visible = true; const g = bottles[k].g; ring.position.set(g.position.x, g.position.y + 0.22, g.position.z + 0.16); } },
          { dur: 5, cap: { uz: "Pestitsidlar va boshqa xavfli moddalar bilan faqat maxsus tayyorlangan kattalar <b>himoya vositalarida</b> ishlaydi: qo'lqop, ko'zoynak, niqob, maxsus kiyim.", en: 'Only specially trained adults handle pesticides and other hazardous substances, wearing <b>protective equipment</b>: gloves, goggles, a mask and special clothing.' }, f(p) { ring.visible = false; ppe.visible = true; ppe.position.y = lerp(0.3, 0, ease(seg(p, 0, 0.4))); lP.set(seg(p, 0.3, 0.5)); } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> xavfli moddani ushlamang, hidlamang, tatib ko'rmang. Belgisiz idishdagi suyuqlikni ishlatmang. Zaharlanish belgilari (bosh og'rig'i, ko'ngil aynishi, nafas qisilishi) bo'lsa — darhol kattalarga ayting va shifokorga murojaat qiling.", en: '<b>Conclusion:</b> do not touch, smell or taste a hazardous substance. Never use a liquid from an unlabelled container. If there are signs of poisoning (headache, nausea, difficulty breathing) — tell an adult at once and see a doctor.' }, f() { ppe.visible = true; ppe.position.y = 0; lP.set(1); bottles.forEach((b) => b.L.set(0)); } },
        ],
        loop(dt, s, c) { ring.rotation.z += dt; ring.material.opacity = 0.6 + 0.4 * Math.sin(c.t * 6); }
      };
    }
  });
})();
