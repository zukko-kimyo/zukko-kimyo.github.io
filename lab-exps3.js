/* Tajribalar — 3-qism (7-sinf) */
(function () {
  const T = THREE, { clamp, lerp, ease, seg, rng } = Lab.m, M = Lab.M, P = Lab.profiles, { at, V, pile, grains, candle } = Lab.util;

  function tubeLine(points, r = 0.02, color = 0xdff3ff) {
    const curve = new T.CatmullRomCurve3(points.map((p) => V(...p)));
    const m = new T.Mesh(new T.TubeGeometry(curve, 60, r, 10, false), M.glass()); m.material.opacity = 0.45; m.userData.curve = curve; return m;
  }
  function screenTex(w = 256, h = 96) { const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); const t = Lab.srgb(new T.CanvasTexture(c)); return { c, g, t, draw(txt, col = '#22ff88', bg = '#0b1220') { g.fillStyle = bg; g.fillRect(0, 0, w, h); g.fillStyle = col; g.font = `700 ${Math.round(h * 0.55)}px "Courier New",monospace`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(txt, w / 2, h / 2 + 3); t.needsUpdate = true; } }; }
  function invTubeWater(scene, R, color = 0x6ec1ff) { const m = new T.Mesh(new T.CylinderGeometry(R * 0.92, R * 0.92, 1, 20), M.liquid(color, 0.55)); scene.add(m); return { m, set(x, yBot, yTop, z = 0) { const h = Math.max(0.001, yTop - yBot); m.scale.y = h; m.position.set(x, yBot + h / 2, z); m.visible = h > 0.01; } }; }
  Lab.util.tubeLine = tubeLine; Lab.util.screenTex = screenTex;

  /* 17. O'lchash: hajm, massa, harorat */
  Lab.def({
    id: 'measurement', icon: '📏', grade: [7],
    title: { uz: "To'g'ri o'lchash: hajm, massa va harorat", en: 'Measuring correctly: volume, mass and temperature' },
    desc: { uz: "Menisk ko'z darajasida o'qiladi, tarozi nolga keltiriladi, termometr suyuqlikka to'liq botiriladi.", en: 'Read the meniscus at eye level, tare the balance, immerse the thermometer bulb fully.' },
    cam: { pos: [0.6, 1.6, 3.4], target: [0, 0.7, 0] },
    build(ctx) {
      const { scene } = ctx;
      const cyl = ctx.add(at(Lab.vessel(P.cylinder(0.15, 1.5), { color: 0x4fb3ff, opacity: 0.6, level: 0.3, marks: 9 }), -0.9, 0, 0));
      const base = new T.Mesh(new T.CylinderGeometry(0.28, 0.3, 0.04, 6), M.glass()); base.material.opacity = 0.5; base.position.set(-0.9, 0.02, 0); scene.add(base);
      const men = new T.Mesh(new T.TorusGeometry(0.135, 0.012, 8, 32), M.liquid(0x1e6fd9, 0.9)); men.rotation.x = Math.PI / 2; scene.add(men);
      const eye = new T.Group(); const ball = new T.Mesh(new T.SphereGeometry(0.09, 20, 16), M.std(0xffffff)); eye.add(ball); const iris = new T.Mesh(new T.SphereGeometry(0.045, 16, 12), M.std(0x2b6cb0)); iris.position.x = 0.065; eye.add(iris); const pup = new T.Mesh(new T.SphereGeometry(0.022, 12, 8), M.std(0x000000)); pup.position.x = 0.1; eye.add(pup); eye.rotation.y = Math.PI; scene.add(eye);
      const sight = new T.Mesh(new T.CylinderGeometry(0.004, 0.004, 1, 6), M.basic(0xffd60a)); scene.add(sight);
      const lEye = ctx.label('', eye, [0, 0.16, 0], 'warn');
      // balance
      const bal = new T.Group(); bal.position.set(0.7, 0, 0); scene.add(bal);
      const body = new T.Mesh(new T.BoxGeometry(0.8, 0.14, 0.7), M.std(0xe5e7eb, { roughness: 0.4 })); body.position.y = 0.07; body.castShadow = true; bal.add(body);
      const pan = new T.Mesh(new T.CylinderGeometry(0.26, 0.26, 0.02, 32), M.metal(0xd1d5db)); pan.position.set(0, 0.16, -0.05); bal.add(pan);
      const scr = screenTex(); scr.draw('0.00 g'); const disp = new T.Mesh(new T.PlaneGeometry(0.32, 0.12), new T.MeshBasicMaterial({ map: scr.t })); disp.position.set(0, 0.09, 0.351); bal.add(disp);
      const bk = Lab.vessel(P.beaker(0.18, 0.4), { color: 0xbfe6ff, opacity: 0.5, level: 0 }); bal.add(bk.group);
      const salt = pile(0xffffff, 0.08, 0.05); bk.group.add(salt);
      const th = Lab.thermometer(0.8); scene.add(th.group); const lT = ctx.label('', th.group, [0.1, 0.85, 0], 'temp');
      const lC = ctx.label({ uz: 'Menzurka (100 mL)', en: 'Measuring cylinder (100 mL)' }, cyl.group, [0, 1.62, 0]); const lB = ctx.label({ uz: 'Elektron tarozi', en: 'Electronic balance' }, bal, [0, -0.05, 0.45]);
      const eyeAt = (y) => { eye.position.set(-0.4, y, 0); const tgt = V(-0.9, 0.42, 0); const d = eye.position.distanceTo(tgt); sight.scale.y = d; sight.position.copy(eye.position).add(tgt).multiplyScalar(0.5); sight.quaternion.setFromUnitVectors(V(0, 1, 0), tgt.clone().sub(eye.position).normalize()); };
      return {
        reset() { cyl.setLevel(0.4); men.position.set(-0.9, 0.41, 0); eyeAt(0.42); eye.visible = sight.visible = false; lEye.set(0); bk.group.position.set(0, 0.17, -0.05); bk.group.visible = false; salt.visible = false; scr.draw('0.00 g'); th.group.visible = false; lT.set(0); },
        steps: [
          { dur: 3, cap: { uz: "Kimyoda uchta asosiy kattalik o'lchanadi: <b>hajm</b> (mL, L), <b>massa</b> (g, kg) va <b>harorat</b> (°C). Aniq o'lchash — ishonchli natija garovi.", en: 'Three key quantities are measured in chemistry: <b>volume</b> (mL, L), <b>mass</b> (g, kg) and <b>temperature</b> (°C). Accurate measurement means reliable results.' } },
          { dur: 4, cap: { uz: "Menzurkadagi suyuqlik yuzasi biroz botiq — bu <b>menisk</b>. Agar yuqoridan qarasak, ko'rsatkich <b>noto'g'ri</b> (ko'proq) ko'rinadi.", en: 'The liquid surface in the cylinder is slightly curved — the <b>meniscus</b>. Looking from above gives a <b>wrong</b> (too high) reading.' }, cam: { pos: [0.4, 1.0, 2.2], target: [-0.7, 0.5, 0] }, f(p) { eye.visible = sight.visible = true; eyeAt(lerp(0.42, 0.9, ease(p))); lEye.set(1); lEye.setText({ uz: "✗ Yuqoridan — noto'g'ri", en: '✗ From above — wrong' }); } },
          { dur: 3, cap: { uz: "Pastdan qarasak ham xato bo'ladi (kamroq ko'rinadi).", en: 'Looking from below is also wrong (reads too low).' }, cam: { pos: [0.4, 0.8, 2.2], target: [-0.7, 0.45, 0] }, f(p) { eye.visible = sight.visible = true; eyeAt(lerp(0.9, 0.05, ease(p))); lEye.set(1); lEye.setText({ uz: "✗ Pastdan — noto'g'ri", en: '✗ From below — wrong' }); } },
          { dur: 4, cap: { uz: "<b>To'g'ri usul:</b> ko'zni menisk bilan bir darajada ushlab, meniskning <b>pastki</b> chizig'i bo'yicha o'qiymiz: <b>25 mL</b>.", en: '<b>Correct way:</b> keep your eye level with the meniscus and read the <b>bottom</b> of the curve: <b>25 mL</b>.' }, f(p) { eye.visible = sight.visible = true; eyeAt(lerp(0.05, 0.42, ease(p))); lEye.set(1); lEye.setText({ uz: "✓ Ko'z darajasida — 25 mL", en: '✓ At eye level — 25 mL' }); lEye.el.className = 'lab-label tag'; } },
          { dur: 5, cap: { uz: "Massa: bo'sh stakanni taroziga qo'yamiz va <b>«TARE»</b> (nolga keltirish) tugmasini bosamiz. So'ng tuz solamiz — tarozi faqat tuzning massasini ko'rsatadi: <b>5.00 g</b>.", en: 'Mass: put the empty beaker on the balance and press <b>"TARE"</b> (zero). Then add salt — the balance shows only the salt’s mass: <b>5.00 g</b>.' }, cam: { pos: [1.2, 1.1, 2.3], target: [0.6, 0.3, 0] }, f(p) { lEye.el.className = 'lab-label warn'; bk.group.visible = true; const k = ease(seg(p, 0, 0.25)); bk.group.position.y = lerp(0.6, 0.17, k); scr.draw(p < 0.25 ? (k * 48.2).toFixed(2) + ' g' : p < 0.45 ? '48.20 g' : p < 0.55 ? '0.00 g' : (5 * ease(seg(p, 0.55, 0.9))).toFixed(2) + ' g'); salt.visible = p > 0.55; salt.scale.setScalar(Math.max(0.01, seg(p, 0.55, 0.9))); } },
          { dur: 4, cap: { uz: "Harorat: termometr uchini suyuqlikka to'liq botirib, idish tubiga tekkizmasdan, ko'rsatkich to'xtagach o'qiymiz: <b>22 °C</b>.", en: 'Temperature: dip the thermometer bulb fully into the liquid without touching the bottom, and read when it stops: <b>22 °C</b>.' }, cam: { pos: [0.6, 1.6, 3.4], target: [-0.3, 0.7, 0] }, f(p) { bk.group.visible = true; salt.visible = true; scr.draw('5.00 g'); th.group.visible = true; th.group.position.set(-0.86, lerp(1.6, 0.12, ease(seg(p, 0, 0.4))), 0.02); th.set(lerp(0.3, 0.22, seg(p, 0.4, 0.8))); lT.set(seg(p, 0.6, 0.8)); lT.setText(Math.round(lerp(25, 22, seg(p, 0.4, 0.8))) + ' °C'); } },
        ],
        loop() { }
      };
    }
  });

  /* 18. Rezerford tajribasi */
  Lab.def({
    id: 'gold-foil', icon: '✨', grade: [7],
    title: { uz: 'Rezerfordning oltin varaq tajribasi', en: 'Rutherford’s gold foil experiment' },
    desc: { uz: "Alfa-zarrachalarning ko'pi varaqdan to'g'ri o'tadi, ozi og'adi, juda kami qaytadi: atom asosan bo'shliq, markazida kichik zich yadro bor.", en: 'Most alpha particles pass straight through, a few are deflected, very few bounce back: the atom is mostly empty space with a tiny dense nucleus.' },
    table: false, bg: 0x0b1424, cam: { pos: [1.2, 2.4, 4.2], target: [0, 0, 0] },
    build(ctx) {
      const { scene } = ctx; scene.fog = null;
      const src = new T.Mesh(new T.BoxGeometry(0.5, 0.4, 0.4), M.std(0x4b5563, { metalness: 0.4 })); src.position.set(-2.2, 0, 0); scene.add(src);
      const hole = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 0.05, 12), M.glow(0xffd60a, 0.9)); hole.rotation.z = Math.PI / 2; hole.position.set(-1.94, 0, 0); scene.add(hole);
      const foil = new T.Mesh(new T.PlaneGeometry(0.02, 0.9), M.std(0xffc93c, { metalness: 0.9, roughness: 0.2, side: T.DoubleSide })); foil.scale.x = 1; scene.add(foil);
      const foilP = new T.Mesh(new T.BoxGeometry(0.01, 0.9, 0.9), M.std(0xffc93c, { metalness: 0.9, roughness: 0.25 })); scene.add(foilP);
      const ring = new T.Mesh(new T.CylinderGeometry(1.6, 1.6, 0.5, 64, 1, true, 0.25, Math.PI * 2 - 0.5), new T.MeshStandardMaterial({ color: 0x7dd3c0, transparent: true, opacity: 0.18, side: T.DoubleSide, depthWrite: false })); ring.rotation.y = Math.PI; scene.add(ring);
      const R = rng(42); const parts = []; const pg = new T.SphereGeometry(0.03, 10, 8), pm = M.glow(0xffd60a);
      for (let i = 0; i < 90; i++) { const m = new T.Mesh(pg, pm); m.visible = false; scene.add(m); parts.push({ m, life: -1 }); }
      const flashes = []; const ft = new T.SpriteMaterial({ map: Lab.radialTex(), color: 0x9cffb0, transparent: true, blending: T.AdditiveBlending, depthWrite: false });
      for (let i = 0; i < 90; i++) { const s = new T.Sprite(ft.clone()); s.scale.set(0.15, 0.15, 1); s.visible = false; scene.add(s); flashes.push({ s, t: 0 }); }
      // zoom-in atoms
      const zoom = new T.Group(); zoom.position.set(0, 0, 0); scene.add(zoom);
      const nuclei = []; for (let y = -2; y <= 2; y++) for (let z = -1; z <= 1; z++) { const n = new T.Mesh(new T.SphereGeometry(0.03, 12, 8), M.std(0xff3b30)); n.position.set(0, y * 0.38, z * 0.38); zoom.add(n); const cloud = new T.Mesh(new T.SphereGeometry(0.17, 16, 12), new T.MeshBasicMaterial({ color: 0x5ac8fa, transparent: true, opacity: 0.08, depthWrite: false })); cloud.position.copy(n.position); zoom.add(cloud); nuclei.push(n); }
      const lS = ctx.label({ uz: 'Alfa-zarracha manbai (α²⁺)', en: 'Alpha source (α²⁺)' }, src, [0, 0.35, 0]); const lF = ctx.label({ uz: 'Yupqa oltin varaq', en: 'Thin gold foil' }, foilP, [0, 0.6, 0], 'tag'); const lD = ctx.label({ uz: 'Lyuminessent ekran', en: 'Fluorescent screen' }, V(0.6, 0.35, -1.5), [0, 0, 0]);
      const lZ = ctx.label({ uz: "Atom: kichik yadro + katta bo'shliq", en: 'Atom: tiny nucleus + lots of empty space' }, V(0, 1.1, 0), [0, 0, 0], 'micro');
      let rate = 0, acc = 0, mode = 0; const tmp = V(0, 0, 0);
      function spawn() {
        const p = parts.find((q) => q.life < 0); if (!p) return; const y = (R() - 0.5) * 0.3, z = (R() - 0.5) * 0.3; p.m.position.set(-1.9, y, z); p.m.visible = true; p.life = 0; p.hit = false;
        const r = R(); let ang; if (r < 0.82) ang = (R() - 0.5) * 0.06; else if (r < 0.97) ang = (R() < 0.5 ? -1 : 1) * (0.2 + R() * 0.7); else ang = (R() < 0.5 ? -1 : 1) * (2.2 + R() * 0.8);
        const az = R() * Math.PI * 2; p.dir2 = V(Math.cos(ang), Math.sin(ang) * Math.cos(az), Math.sin(ang) * Math.sin(az)).normalize(); p.dir1 = V(1, 0, 0);
      }
      return {
        reset() { rate = 0; mode = 0; zoom.visible = false; lZ.set(0); lS.set(1); lF.set(1); lD.set(1); foilP.visible = true; ring.visible = true; },
        steps: [
          { dur: 4, cap: { uz: "1909–1911-yillar. E. Rezerford radioaktiv manbadan chiqqan musbat <b>alfa-zarrachalarni</b> juda yupqa <b>oltin varaqqa</b> yo'naltirdi. Varaq atrofida zarracha tekkanda chaqnaydigan ekran bor.", en: '1909–1911. E. Rutherford aimed positive <b>alpha particles</b> from a radioactive source at a very thin <b>gold foil</b>. A screen around it flashes where particles hit.' } },
          { dur: 8, cap: { uz: "Zarrachalarning <b>deyarli hammasi</b> varaqdan to'g'ri o'tib ketdi. <b>Ba'zilari</b> og'di, <b>juda kam qismi</b> esa orqaga qaytdi!", en: '<b>Almost all</b> particles went straight through the foil. <b>Some</b> were deflected and a <b>very few</b> bounced back!' }, f(p) { rate = 30; } },
          { dur: 7, cap: { uz: "Kattalashtirilgan ko'rinish: atomning deyarli butun hajmi — <b>bo'shliq</b>. Musbat zaryad va massa juda kichik <b>yadroda</b> to'plangan. Yadroga yaqin kelgan zarracha itariladi (ikkalasi ham musbat).", en: 'Zoomed view: almost the whole atom is <b>empty space</b>. Positive charge and mass are packed into a tiny <b>nucleus</b>. A particle passing close to it is repelled (both are positive).' }, cam: { pos: [0.9, 0.5, 2.2], target: [0, 0, 0] }, f(p) { rate = 18; mode = 1; zoom.visible = true; foilP.visible = false; ring.visible = false; lZ.set(seg(p, 0.1, 0.25)); lF.set(0); lS.set(0); lD.set(0); } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> Rezerford atomning <b>yadro modeli</b>ni taklif qildi: markazda kichik musbat yadro, atrofida elektronlar. Keyinchalik N. Bor elektronlar aniq energiya qavatlarida harakatlanishini ko'rsatdi.", en: '<b>Conclusion:</b> Rutherford proposed the <b>nuclear model</b> of the atom: a tiny positive nucleus with electrons around it. Later N. Bohr showed electrons occupy definite energy levels.' }, cam: { pos: [1.2, 2.4, 4.2], target: [0, 0, 0] }, f() { rate = 20; mode = 0; } },
        ],
        loop(dt, s, c) {
          acc += rate * dt; while (acc >= 1) { acc -= 1; spawn(); }
          const sp = mode ? 0.9 : 2.2;
          parts.forEach((p) => {
            if (p.life < 0) return; p.life += dt;
            if (mode) { // zoom mode: straight unless close to a nucleus
              if (p.m.position.x < 0) p.m.position.addScaledVector(p.dir1, sp * dt);
              else { if (!p.zdir) { let near = null, dmin = 9; nuclei.forEach((n) => { const d = Math.hypot(n.position.y - p.m.position.y, n.position.z - p.m.position.z); if (d < dmin) { dmin = d; near = n; } }); p.zdir = dmin < 0.05 ? V(-1, (R() - 0.5), (R() - 0.5)).normalize() : dmin < 0.12 ? V(1, (p.m.position.y - near.position.y) * 6, (p.m.position.z - near.position.z) * 6).normalize() : V(1, 0, 0); } p.m.position.addScaledVector(p.zdir, sp * dt); }
              if (p.m.position.length() > 2.2) { p.life = -1; p.m.visible = false; p.zdir = null; }
              return;
            }
            p.zdir = null;
            if (p.m.position.x < 0) p.m.position.addScaledVector(p.dir1, sp * dt); else p.m.position.addScaledVector(p.dir2, sp * dt);
            tmp.set(p.m.position.x, 0, p.m.position.z); const rad = Math.hypot(p.m.position.x, p.m.position.z);
            if (p.m.position.x > 0.02 && rad > 1.58 || (p.m.position.x < -0.1 && p.dir2.x < 0 && rad > 1.58)) {
              const f = flashes.find((q) => !q.s.visible); if (f) { f.s.position.copy(p.m.position); f.s.visible = true; f.t = 0; }
              p.life = -1; p.m.visible = false;
            }
          });
          flashes.forEach((f) => { if (!f.s.visible) return; f.t += dt; f.s.material.opacity = 1 - f.t / 1.2; if (f.t > 1.2) f.s.visible = false; });
        },
        clear() { parts.forEach((p) => { p.life = -1; p.m.visible = false; }); }
      };
    }
  });

  /* 19. Kislorod olish */
  Lab.def({
    id: 'oxygen-prep', icon: '🫁', grade: [7],
    title: { uz: 'Laboratoriyada kislorod olish', en: 'Preparing oxygen in the laboratory' },
    desc: { uz: "Kaliy permanganat qizdirilganda kislorod ajraladi; u suv ostida probirkaga yig'iladi va cho'g'langan cho'pni alangalantiradi.", en: 'Heating potassium permanganate releases oxygen; it is collected over water and relights a glowing splint.' },
    cam: { pos: [0.4, 1.9, 4.0], target: [0.2, 0.7, 0] },
    build(ctx) {
      const { scene } = ctx;
      const st = Lab.stand(1.6); at(st, -0.6, 0, 0); scene.add(st.group);
      const tb = Lab.vessel(P.tube(0.1, 0.9), { color: 0x6b21a8, opacity: 0.9, level: 0 }); tb.group.position.set(-1.25, 0.78, 0); tb.group.rotation.z = -Math.PI / 2 - 0.08; scene.add(tb.group);
      const kmn = grains(40, 0x5b1a8f, 0.03, 9); tb.group.add(kmn.group); kmn.arr.forEach((g) => g.m.position.set((g.r - 0.5) * 0.12, 0.06 + g.d * 0.28, Math.cos(g.a) * 0.04));
      const clamp1 = new T.Mesh(new T.BoxGeometry(0.06, 0.08, 0.2), M.metal(0x7c8794)); clamp1.position.set(-0.75, 0.74, 0); scene.add(clamp1);
      const bur = Lab.burner(); at(bur, -1.05, 0, 0.0); scene.add(bur.group);
      const trough = ctx.add(at(Lab.vessel([[0, 0], [0.55, 0], [0.58, 0.32]], { color: 0x5ab8ff, opacity: 0.45, level: 0.24 }), 0.85, 0, 0));
      const del = tubeLine([[-0.4, 0.71, 0], [0.1, 0.8, 0], [0.45, 0.6, 0], [0.62, 0.1, 0], [0.82, 0.08, 0], [0.86, 0.18, 0]], 0.018); scene.add(del);
      const col = Lab.vessel(P.tube(0.12, 0.95), { rim: true }); col.group.rotation.x = Math.PI; col.group.position.set(0.86, 1.1, 0); scene.add(col.group);
      const water = invTubeWater(scene, 0.12);
      const bub = Lab.bubbles(scene, { size: 0.02, speed: 0.55, region: () => ({ x: 0.86, z: 0, r: 0.05, y0: 0.18, y1: 1.1 - gas }) });
      const sp = Lab.splint(); scene.add(sp.group);
      const lK = ctx.label({ uz: 'KMnO₄ (kaliy permanganat)', en: 'KMnO₄ (potassium permanganate)' }, tb.group, [0, 0.2, 0.15]);
      const lO = ctx.label({ uz: 'O₂ yig\'ilmoqda', en: 'O₂ collecting' }, col.group, [0.25, -0.2, 0], 'tag');
      const lW = ctx.label({ uz: 'Suv', en: 'Water' }, trough.group, [-0.5, 0.35, 0]);
      let gas = 0;
      return {
        reset() { bur.flame.set(0); gas = 0; bub.rate = 0; col.group.position.set(0.86, 1.1, 0); col.group.rotation.x = Math.PI; sp.group.position.set(1.8, 1.6, 0.3); sp.group.rotation.z = 0.5; sp.glow(0); sp.flame.set(0); lO.set(0); kmn.group.children.forEach((m) => m.material.color.set(0x5b1a8f)); },
        steps: [
          { dur: 4, cap: { uz: "Probirkada qora-binafsha <b>kaliy permanganat (KMnO₄)</b> kristallari. Gaz o'tkazuvchi nay suvli idishdagi to'ntarilgan, suv bilan to'la probirkaga olib boradi.", en: 'The test tube holds dark purple <b>potassium permanganate (KMnO₄)</b> crystals. A delivery tube leads to an upside-down test tube full of water in a trough.' } },
          { dur: 8, cap: { uz: "Qizdiramiz. KMnO₄ parchalanib, <b>kislorod</b> ajraladi. Gaz pufakchalari probirkaga ko'tarilib, suvni pastga <b>siqib chiqaradi</b> (suvni siqib chiqarish usuli).", en: 'We heat it. KMnO₄ decomposes and releases <b>oxygen</b>. Gas bubbles rise into the tube and <b>push the water out</b> (collection over water).' }, eq: '2KMnO₄ → K₂MnO₄ + MnO₂ + O₂↑', f(p) { bur.flame.set(seg(p, 0, 0.1)); bub.rate = 25 * seg(p, 0.2, 0.35); gas = 0.85 * seg(p, 0.25, 1); lO.set(seg(p, 0.4, 0.55)); } },
          { dur: 4, cap: { uz: "Kislorod suvda kam eriydi, shuning uchun uni suv ostida yig'ish mumkin. Probirka to'lgach, og'zini suv ichida barmoq bilan berkitib olamiz.", en: 'Oxygen is only slightly soluble in water, so it can be collected over water. When the tube is full, we close its mouth under water and lift it out.' }, f(p) { bur.flame.set(1 - seg(p, 0.6, 1)); gas = 0.85; bub.rate = 6 * (1 - p); const k = ease(seg(p, 0.3, 1)); col.group.position.set(lerp(0.86, 1.5, k), lerp(1.1, 1.0, k), 0); col.group.rotation.x = lerp(Math.PI, 0, k); lO.set(1 - k); } },
          { dur: 5, cap: { uz: "<b>Kislorodni aniqlash:</b> cho'g'langan cho'pni probirkaga tushiramiz — u <b>yorqin alanga bilan yonib ketadi</b>. Kislorod yonishni kuchaytiradi, lekin o'zi yonmaydi.", en: '<b>Testing for oxygen:</b> we put a glowing splint into the tube — it <b>bursts into bright flame</b>. Oxygen supports burning but does not burn itself.' }, cam: { pos: [1.9, 1.5, 2.6], target: [1.5, 1.1, 0] }, f(p) { gas = 0.85; col.group.position.set(1.5, 1.0, 0); col.group.rotation.x = 0; const k = ease(seg(p, 0, 0.5)); sp.group.position.set(lerp(1.8, 1.5, k), lerp(1.9, 1.35, k), lerp(0.3, 0, k)); sp.group.rotation.z = lerp(0.5, 0, k); sp.glow(1); sp.flame.set(1.1 * seg(p, 0.5, 0.6)); } },
          { dur: 4, cap: { uz: "<b>Kislorod xossalari:</b> rangsiz, hidsiz gaz, havodan biroz og'ir, suvda kam eriydi. Sanoatda suyuq havodan olinadi.", en: '<b>Properties of oxygen:</b> colourless, odourless gas, slightly heavier than air, slightly soluble in water. Industry obtains it from liquid air.' }, cam: { pos: [0.4, 1.9, 4.0], target: [0.3, 0.8, 0] }, f() { gas = 0.85; col.group.position.set(1.5, 1.0, 0); col.group.rotation.x = 0; sp.group.position.set(1.5, 1.35, 0); sp.group.rotation.z = 0; sp.glow(1); sp.flame.set(1.1); } },
        ],
        loop(dt, s, c) {
          bur.flame.tick(c.t); bub.tick(dt); sp.flame.tick(c.t);
          const upright = col.group.rotation.x < 1.5; if (!upright) water.set(0.86, 0.15, 1.1 - gas); else water.set(0, 0, 0);
        },
        clear() { bub.clear(); }
      };
    }
  });

  /* 20. Alanga tuzilishi va moddalarning kislorodda yonishi */
  Lab.def({
    id: 'flame-combustion', icon: '🔥', grade: [7],
    title: { uz: 'Alanga tuzilishi va kislorodda yonish', en: 'Flame structure and burning in oxygen' },
    desc: { uz: "Alanganing uch zonasi; magniy ko'zni qamashtiruvchi oq, oltingugurt kislorodda ko'k-binafsha alanga bilan yonadi.", en: 'The three flame zones; magnesium burns with a dazzling white flame and sulfur with a blue-violet flame in oxygen.' },
    cam: { pos: [0.2, 1.4, 3.0], target: [0, 0.7, 0] },
    build(ctx) {
      const { scene } = ctx;
      const bur = Lab.burner(); at(bur, -0.6, 0, 0); scene.add(bur.group); bur.flame.base = 0.5; bur.flame.w = 0.11;
      const zones = [[{ uz: "Tashqi zona — eng issiq, to'liq yonish", en: 'Outer zone — hottest, complete combustion' }, 0.85, 'tag'], [{ uz: "O'rta zona — yorqin, chala yonish", en: 'Middle zone — bright, incomplete combustion' }, 0.65, ''], [{ uz: 'Ichki zona — eng sovuq', en: 'Inner zone — coolest' }, 0.5, '']];
      const zl = zones.map((z) => ctx.label(z[0], bur.group, [0.15, z[1], 0], z[2]));
      // tongs + Mg
      const tong = new T.Group(); const arm = new T.Mesh(new T.BoxGeometry(0.7, 0.02, 0.03), M.metal()); arm.position.x = 0.35; tong.add(arm);
      const mg = new T.Mesh(new T.BoxGeometry(0.22, 0.006, 0.03), M.metal(0xc9ced4)); mg.position.x = -0.1; tong.add(mg); scene.add(tong);
      const mgFl = Lab.flame({ outer: 0xffffff, inner: 0xffffff, core: 0xeaf6ff, light: 0xffffff, h: 0.18, w: 0.12 }); mgFl.group.position.x = -0.15; tong.add(mgFl.group);
      const glow = new T.Sprite(new T.SpriteMaterial({ map: (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new T.CanvasTexture(c); })(), transparent: true, blending: T.AdditiveBlending, depthWrite: false })); glow.position.x = -0.15; glow.scale.set(1.2, 1.2, 1); tong.add(glow);
      const ash = new T.Mesh(new T.BoxGeometry(0.2, 0.02, 0.04), M.std(0xffffff, { roughness: 1 })); ash.position.x = -0.1; tong.add(ash);
      const smoke = Lab.puffs(scene, { color: 0xffffff, op: 0.5, size: 0.25, life: 2, origin: () => { const v = V(); mg.getWorldPosition(v); return v; } });
      // O2 jar + sulfur spoon
      const jar = ctx.add(at(Lab.vessel(P.jar(0.3, 0.8), { rim: true }), 0.9, 0, 0)); const lJ = ctx.label({ uz: 'Kislorodli idish (O₂)', en: 'Jar of oxygen (O₂)' }, jar.group, [0, 0.95, 0]);
      const spoon = new T.Group(); const rod = new T.Mesh(new T.CylinderGeometry(0.01, 0.01, 0.9, 8), M.metal()); rod.position.y = 0.45; spoon.add(rod); const cup = new T.Mesh(new T.CylinderGeometry(0.05, 0.035, 0.04, 16), M.metal()); spoon.add(cup); const sul = new T.Mesh(new T.SphereGeometry(0.035, 12, 8), M.std(0xffd60a)); sul.position.y = 0.02; spoon.add(sul);
      const sFl = Lab.flame({ outer: 0x5b5bff, inner: 0x9b8cff, core: 0x3a3aff, light: 0x6b6bff, h: 0.16, w: 0.06 }); sFl.group.position.y = 0.03; spoon.add(sFl.group); scene.add(spoon);
      const lMg = ctx.label({ uz: 'Magniy lentasi', en: 'Magnesium ribbon' }, mg, [0, 0.12, 0]);
      let mode = 0;
      return {
        reset() { bur.flame.set(1); tong.position.set(-0.2, 1.5, 0.6); tong.rotation.set(0, 0.4, -0.2); mg.visible = true; ash.visible = false; mgFl.set(0); glow.visible = false; smoke.rate = 0; spoon.position.set(1.6, 0.6, 0.3); sFl.set(0); sul.material.color.set(0xffd60a); zl.forEach((l) => l.set(0)); lMg.set(0); mode = 0; },
        steps: [
          { dur: 6, cap: { uz: "Spirt lampasi alangasi uch zonadan iborat. <b>Tashqi zona</b> eng issiq — idishlarni shu qismda qizdirish kerak. Rang va harorat zonalarga qarab farq qiladi.", en: 'A spirit-lamp flame has three zones. The <b>outer zone</b> is hottest — heat things there. Colour and temperature differ by zone.' }, cam: { pos: [0, 1.0, 1.8], target: [-0.5, 0.8, 0] }, f(p) { zl.forEach((l, i) => l.set(seg(p, 0.1 + i * 0.2, 0.25 + i * 0.2))); } },
          { dur: 6, cap: { uz: "Qisqich bilan <b>magniy lentasini</b> alangaga tutamiz. U <b>ko'zni qamashtiruvchi oq nur</b> chiqarib yonadi va oq kukun — <b>magniy oksid (MgO)</b> hosil bo'ladi. ⚠️ Bu nurga to'g'ridan-to'g'ri qaramang!", en: 'With tongs, we hold a <b>magnesium ribbon</b> in the flame. It burns with a <b>dazzling white light</b>, forming white powder — <b>magnesium oxide (MgO)</b>. ⚠️ Don’t look straight at it!' }, eq: '2Mg + O₂ → 2MgO', cam: { pos: [0.3, 1.3, 2.4], target: [-0.4, 0.95, 0] }, f(p) { zl.forEach((l) => l.set(0)); lMg.set(1 - seg(p, 0.4, 0.5)); const k = ease(seg(p, 0, 0.3)); tong.position.set(lerp(-0.2, -0.42, k), lerp(1.5, 0.98, k), lerp(0.6, 0, k)); tong.rotation.set(0, 0, 0); const b = seg(p, 0.35, 0.45); mgFl.set(b * (1 - seg(p, 0.85, 1))); glow.visible = b > 0 && p < 0.95; glow.material.opacity = b * (1 - seg(p, 0.85, 1)); smoke.rate = p > 0.4 && p < 0.9 ? 10 : 0; mg.visible = p < 0.9; mg.scale.x = 1 - 0.5 * seg(p, 0.4, 0.9); ash.visible = p > 0.6; mode = b > 0 ? 1 : 0; } },
          { dur: 6, cap: { uz: "Oltingugurtni havoda yoqib, <b>kislorodli idishga</b> tushiramiz. Havoda zo'rg'a ko'rinadigan alanga kislorodda <b>yorqin ko'k-binafsha</b> bo'lib ketadi. Hosil bo'lgan SO₂ — o'tkir hidli gaz.", en: 'We light sulfur in air and lower it into a <b>jar of oxygen</b>. The faint flame becomes <b>bright blue-violet</b> in oxygen. The SO₂ formed is a sharp-smelling gas.' }, eq: 'S + O₂ → SO₂', cam: { pos: [1.4, 1.3, 2.4], target: [0.9, 0.6, 0] }, f(p) { tong.position.set(-0.2, 1.5, 0.6); mg.visible = false; ash.visible = true; mgFl.set(0); glow.visible = false; const k = ease(seg(p, 0, 0.5)); spoon.position.set(lerp(1.6, 0.9, k), lerp(0.6, 0.35, k) + (k < 1 ? 0.6 * Math.sin(Math.PI * k) : 0), lerp(0.3, 0, k)); const inJar = k > 0.95; sFl.set(inJar ? 1.2 : 0.4); sFl.color(inJar ? 0x5b5bff : 0x8f8fd6, inJar ? 0xa79cff : 0xb8b8e6, 0x3a3aff); } },
          { dur: 5, cap: { uz: "<b>Xulosa:</b> moddalar kislorodda havodagiga qaraganda ancha <b>shiddatli</b> yonadi, chunki havoda kislorod atigi 21%. Yonish mahsulotlari — <b>oksidlar</b> (MgO, SO₂, CO₂).", en: '<b>Conclusion:</b> substances burn much more <b>vigorously</b> in oxygen than in air, because air is only 21% oxygen. The products of combustion are <b>oxides</b> (MgO, SO₂, CO₂).' }, cam: { pos: [0.2, 1.4, 3.0], target: [0.2, 0.7, 0] }, f() { tong.position.set(-0.2, 1.5, 0.6); mg.visible = false; ash.visible = true; spoon.position.set(0.9, 0.35, 0); sFl.set(1.2); } },
        ],
        loop(dt, s, c) { bur.flame.tick(c.t); mgFl.tick(c.t * 1.7); sFl.tick(c.t); smoke.tick(dt); if (mode) glow.scale.setScalar(1 + 0.15 * Math.sin(c.t * 30)); },
        clear() { smoke.clear(); }
      };
    }
  });

  /* 21. Kislotalarning metallar bilan reaksiyasi */
  Lab.def({
    id: 'acids-metals', icon: '⚗️', grade: [7],
    title: { uz: 'Kislotalarning metallar bilan reaksiyasi', en: 'Reactions of acids with metals' },
    desc: { uz: "Magniy shiddatli, rux sekinroq reaksiyaga kirishadi, mis esa xlorid kislota bilan reaksiyaga kirishmaydi. Tuz va vodorod hosil bo'ladi.", en: 'Magnesium reacts vigorously, zinc more slowly, and copper does not react with hydrochloric acid. A salt and hydrogen form.' },
    cam: { pos: [0, 1.5, 3.3], target: [0, 0.6, 0] },
    build(ctx) {
      const { scene } = ctx;
      const mets = [['Mg', { uz: 'Magniy', en: 'Magnesium' }, 0xc9ced4, 260, 0.04], ['Zn', { uz: 'Rux', en: 'Zinc' }, 0x8e99a8, 70, 0.6], ['Cu', { uz: 'Mis', en: 'Copper' }, 0xc8753a, 0, 1]];
      const rack = new T.Mesh(new T.BoxGeometry(1.8, 0.05, 0.35), M.std(0xb07a44)); rack.position.y = 0.62; scene.add(rack);
      const T3 = mets.map((m, i) => {
        const x = -0.6 + i * 0.6; const v = Lab.vessel(P.tube(0.12, 1.0), { color: 0xeaf6ff, opacity: 0.5, level: 0.5 }); at(v, x, 0.05, 0); scene.add(v.group);
        const piece = i === 0 ? new T.Mesh(new T.BoxGeometry(0.03, 0.18, 0.005), M.metal(m[2])) : grains(5, m[2], 0.05, 3 + i).group; if (i === 0) piece.material.metalness = 0.6; scene.add(piece);
        const b = Lab.bubbles(scene, { size: 0.016, speed: 0.6, region: () => ({ x, z: 0, r: 0.06, y0: 0.08, y1: 0.55 }) });
        const l = ctx.label(m[1], v.group, [0, -0.15, 0.25]); const lr = ctx.label(i < 2 ? { uz: 'H₂ ajralmoqda', en: 'H₂ released' } : { uz: "Reaksiya yo'q", en: 'No reaction' }, v.group, [0, 1.15, 0], i < 2 ? 'tag' : 'warn');
        return { x, v, piece, b, m, lr, i };
      });
      const series = new T.Group(); series.position.set(0, 1.55, -0.4); scene.add(series);
      const order = ['K', 'Na', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Pb', 'H', 'Cu', 'Ag', 'Au'];
      order.forEach((e, i) => { const c = e === 'H' ? 0xffd60a : i < 8 ? 0x34c759 : 0xff3b30; const b = new T.Mesh(new T.BoxGeometry(0.2, 0.16, 0.04), M.std(c)); b.position.x = (i - 5.5) * 0.22; series.add(b); const sp = Lab.textSprite(e, { size: 40, scale: 0.08, color: '#111' }); sp.position.set((i - 5.5) * 0.22, 0, 0.03); series.add(sp); });
      const lSer = ctx.label({ uz: "Metallarning faollik qatori: H dan chapdagilar kislotadan vodorodni siqib chiqaradi", en: 'Activity series: metals left of H displace hydrogen from acids' }, series, [0, 0.2, 0], 'tag');
      return {
        reset() { T3.forEach((o) => { o.b.rate = 0; o.lr.set(0); const p = o.piece; p.position.set(o.x, 1.35, 0); if (o.i === 0) p.scale.y = 1; if (o.i === 1) p.children.forEach((c, k) => c.position.set((k - 2) * 0.03, 0, 0)); if (o.i === 2) p.children.forEach((c, k) => c.position.set((k - 2) * 0.03, 0, 0)); }); series.visible = false; lSer.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "Uchta probirkada bir xil <b>suyultirilgan xlorid kislota (HCl)</b>. Ularga magniy, rux va mis bo'laklarini solamiz.", en: 'Three test tubes hold the same <b>dilute hydrochloric acid (HCl)</b>. We add pieces of magnesium, zinc and copper.' } },
          { dur: 3, cap: { uz: 'Metallarni probirkalarga tushiramiz…', en: 'Dropping the metals into the tubes…' }, f(p) { T3.forEach((o) => { o.piece.position.y = lerp(1.35, 0.1, ease(seg(p, o.i * 0.15, o.i * 0.15 + 0.6))); }); } },
          { dur: 7, cap: { uz: "<b>Magniy</b> — shiddatli ko'piklanish, probirka isiydi. <b>Rux</b> — o'rtacha tezlikda pufakchalar. <b>Mis</b> — hech qanday o'zgarish yo'q. Ajralayotgan gaz — <b>vodorod (H₂)</b>.", en: '<b>Magnesium</b> — vigorous fizzing, the tube gets warm. <b>Zinc</b> — steady bubbles. <b>Copper</b> — no change at all. The gas released is <b>hydrogen (H₂)</b>.' }, eq: 'Mg + 2HCl → MgCl₂ + H₂↑ &nbsp;|&nbsp; Zn + 2HCl → ZnCl₂ + H₂↑ &nbsp;|&nbsp; Cu + HCl ✗', f(p) { T3.forEach((o) => { o.piece.position.y = 0.1; o.b.rate = o.m[3] * seg(p, 0, 0.1); o.lr.set(seg(p, 0.3 + o.i * 0.1, 0.4 + o.i * 0.1)); if (o.i === 0) { o.piece.scale.y = Math.max(0.05, 1 - 0.9 * p); o.piece.position.y = 0.1 + 0.03 * Math.sin(p * 40); } }); } },
          { dur: 5, cap: { uz: "Metallar <b>faollik qatori</b>da joylashgan. Vodoroddan (H) chapda turgan metallar kislotadan vodorodni siqib chiqaradi: <b>Metall + kislota → tuz + H₂↑</b>. Mis H dan o'ngda — reaksiya bormaydi.", en: 'Metals are arranged in an <b>activity series</b>. Metals left of hydrogen (H) displace hydrogen from acids: <b>metal + acid → salt + H₂↑</b>. Copper is right of H — no reaction.' }, cam: { pos: [0, 1.6, 3.2], target: [0, 1.0, 0] }, f(p) { T3.forEach((o) => { o.piece.position.y = 0.1; o.b.rate = o.m[3] * 0.6; o.lr.set(1); if (o.i === 0) o.piece.scale.y = 0.1; }); series.visible = true; series.scale.setScalar(Math.max(0.01, ease(seg(p, 0, 0.3)))); lSer.set(seg(p, 0.3, 0.45)); } },
        ],
        loop(dt) { T3.forEach((o) => o.b.tick(dt)); }, clear() { T3.forEach((o) => o.b.clear()); }
      };
    }
  });

  /* 22. Vodorod olish va aniqlash */
  Lab.def({
    id: 'hydrogen', icon: '🎈', grade: [7],
    title: { uz: 'Vodorod olish va uni aniqlash', en: 'Preparing and testing hydrogen' },
    desc: { uz: "Rux + xlorid kislota → vodorod. Vodorod havodan yengil: to'ntarilgan probirkaga yig'iladi va alangaga tutilganda «puf» etib yonadi.", en: 'Zinc + hydrochloric acid → hydrogen. Hydrogen is lighter than air: it is collected in an upside-down tube and burns with a squeaky "pop".' },
    cam: { pos: [0.3, 1.7, 3.6], target: [0.2, 0.8, 0] },
    build(ctx) {
      const { scene } = ctx;
      const st = Lab.stand(1.6); at(st, -0.8, 0, 0); scene.add(st.group);
      const fl = ctx.add(at(Lab.vessel(P.flask(0.32, 0.8, 0.08), { color: 0xeaf6ff, opacity: 0.5, level: 0.25 }), -0.6, 0, 0));
      const zn = grains(10, 0x8e99a8, 0.06, 5); fl.group.add(zn.group); zn.arr.forEach((g) => g.m.position.set(Math.cos(g.a) * g.r * 0.2, 0.04, Math.sin(g.a) * g.r * 0.2));
      const del = tubeLine([[-0.6, 0.8, 0], [-0.6, 1.0, 0], [-0.3, 1.12, 0], [0.25, 1.12, 0], [0.4, 1.0, 0], [0.4, 0.9, 0]], 0.016); scene.add(del);
      const col = Lab.vessel(P.tube(0.12, 0.9), { rim: true }); col.group.rotation.x = Math.PI; scene.add(col.group);
      const gasFill = new T.Mesh(new T.CylinderGeometry(0.11, 0.11, 1, 16), new T.MeshBasicMaterial({ color: 0xbff0ff, transparent: true, opacity: 0.0, depthWrite: false })); scene.add(gasFill);
      const bub = Lab.bubbles(scene, { size: 0.02, speed: 0.55, region: () => ({ x: -0.6, z: 0, r: 0.2, y0: 0.06, y1: 0.25 }) });
      const molH = []; for (let i = 0; i < 10; i++) { const m = Lab.mol('H2', 0.35); scene.add(m); molH.push({ m, d: i / 10 }); }
      const cd = candle(0.35); at(cd, 1.2, 0, 0.2); scene.add(cd.group);
      const pop = new T.Sprite(new T.SpriteMaterial({ map: Lab.radialTex(), color: 0xffb347, transparent: true, blending: T.AdditiveBlending, depthWrite: false })); pop.scale.set(0.6, 0.6, 1); scene.add(pop);
      const lPop = ctx.label({ uz: '«PUF!»', en: '"POP!"' }, pop, [0, 0.25, 0], 'warn');
      const bal = Lab.balloon(0x5ac8fa); scene.add(bal.group); const str = new T.Mesh(new T.CylinderGeometry(0.003, 0.003, 0.8, 4), M.basic(0xffffff)); scene.add(str);
      const lZ = ctx.label({ uz: 'Rux + HCl', en: 'Zinc + HCl' }, fl.group, [0, -0.1, 0.4]); const lC = ctx.label({ uz: "H₂ to'ntarilgan probirkaga yig'iladi", en: 'H₂ collects in the upside-down tube' }, col.group, [0.3, -0.3, 0], 'tag');
      return {
        reset() { col.group.position.set(0.4, 1.85, 0); col.group.rotation.set(Math.PI, 0, 0); gasFill.material.opacity = 0; bub.rate = 0; molH.forEach((o) => (o.m.visible = false)); cd.flame.set(1); pop.visible = false; lPop.set(0); bal.group.visible = false; str.visible = false; lC.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "Kolbada <b>rux</b> bo'laklari va <b>suyultirilgan xlorid kislota</b>. Gaz nayi ustida probirka <b>og'zi pastga qaratib</b> (to'ntarilgan) o'rnatilgan.", en: 'The flask holds <b>zinc</b> granules and <b>dilute hydrochloric acid</b>. A test tube is held <b>mouth down</b> over the delivery tube.' } },
          { dur: 7, cap: { uz: "Rux kislota bilan reaksiyaga kirishib, <b>vodorod</b> ajraladi. Vodorod havodan <b>14,5 marta yengil</b> — u yuqoriga ko'tariladi va to'ntarilgan probirkani to'ldiradi (havoni siqib chiqarish usuli).", en: 'Zinc reacts with the acid, releasing <b>hydrogen</b>. Hydrogen is <b>14.5 times lighter than air</b> — it rises and fills the upside-down tube (displacing air).' }, eq: 'Zn + 2HCl → ZnCl₂ + H₂↑', f(p) { bub.rate = 80; molH.forEach((o) => { const k = (p * 2.5 + o.d) % 1; o.m.visible = true; const cv = del.userData.curve; o.m.position.copy(cv.getPoint(Math.min(1, k * 1.15))); if (k > 0.87) o.m.position.y += (k - 0.87) * 4; o.m.rotation.y = k * 10; }); gasFill.material.opacity = 0.35 * seg(p, 0.2, 1); lC.set(seg(p, 0.3, 0.45)); } },
          { dur: 6, cap: { uz: "<b>Vodorodni aniqlash:</b> probirkani og'zi pastga holatda alangaga yaqinlashtiramiz — <b>«puf!»</b> degan ovoz bilan yonadi. Vodorod yonib, <b>suv</b> hosil qiladi. ⚠️ Vodorod-havo aralashmasi portlovchi — faqat o'qituvchi nazoratida!", en: '<b>Testing for hydrogen:</b> we bring the tube, still mouth down, to a flame — it burns with a <b>squeaky "pop!"</b>, forming <b>water</b>. ⚠️ Hydrogen–air mixtures are explosive — only with a teacher!' }, eq: '2H₂ + O₂ → 2H₂O', cam: { pos: [1.6, 1.5, 2.6], target: [1.0, 0.8, 0] }, f(p) { bub.rate = 20; molH.forEach((o) => (o.m.visible = false)); lC.set(0); const k = ease(seg(p, 0, 0.5)); col.group.position.set(lerp(0.4, 1.2, k), lerp(1.85, 0.95, k), lerp(0, 0.2, k)); gasFill.material.opacity = p < 0.55 ? 0.35 : 0; const b = seg(p, 0.5, 0.65); pop.visible = b > 0 && b < 1; pop.material.opacity = 1 - b; pop.scale.setScalar(0.3 + b * 0.8); lPop.set(p > 0.5 && p < 0.85 ? 1 : 0); } },
          { dur: 5, cap: { uz: "<b>Vodorod xossalari:</b> eng yengil gaz, rangsiz va hidsiz. Shuning uchun vodorodli shar havoga ko'tariladi. Kelajakda vodorod — ekologik toza yoqilg'i: yonganda faqat suv hosil bo'ladi.", en: '<b>Properties of hydrogen:</b> the lightest gas, colourless and odourless — so a hydrogen balloon floats up. Hydrogen is a clean fuel of the future: burning it produces only water.' }, cam: { pos: [0.3, 1.9, 3.8], target: [0.2, 1.1, 0] }, f(p) { col.group.position.set(1.2, 0.95, 0.2); bal.group.visible = true; str.visible = true; bal.set(1); bal.group.position.set(0.3, 0.6 + ease(p) * 1.2, 0.6); str.position.set(0.3, bal.group.position.y - 0.4, 0.6); } },
        ],
        loop(dt, s, c) { gasFill.scale.y = 0.85; gasFill.position.set(col.group.position.x, col.group.position.y - 0.45, col.group.position.z); bub.tick(dt); cd.flame.tick(c.t); },
        clear() { bub.clear(); }
      };
    }
  });

  /* 23. Neytrallanish */
  Lab.def({
    id: 'neutralization', icon: '⚖️', grade: [7],
    title: { uz: 'Neytrallanish reaksiyasi', en: 'Neutralization reaction' },
    desc: { uz: "Fenolftaleinli ishqorga kislota tomizilganda pushti rang yo'qoladi: tuz va suv hosil bo'ladi.", en: 'Adding acid to an alkali with phenolphthalein makes the pink colour vanish: a salt and water form.' },
    cam: { pos: [0.6, 1.8, 3.4], target: [0, 1.0, 0] },
    build(ctx) {
      const { scene } = ctx;
      const st = Lab.stand(2.4); at(st, 0.25, 0, 0.1); scene.add(st.group);
      const bur = Lab.vessel(P.cylinder(0.05, 1.1), { color: 0xf3fbff, opacity: 0.5, level: 1.0, marks: 10 }); at(bur, 0, 1.15, 0); scene.add(bur.group);
      const tip = new T.Mesh(new T.ConeGeometry(0.03, 0.15, 12), M.glass()); tip.rotation.x = Math.PI; tip.position.set(0, 1.08, 0); scene.add(tip);
      const valve = new T.Mesh(new T.BoxGeometry(0.1, 0.025, 0.025), M.std(0x1f5fd6)); valve.position.set(0, 1.15, 0); scene.add(valve);
      const fl = ctx.add(at(Lab.vessel(P.flask(0.33, 0.75, 0.08), { color: 0xff3fa4, opacity: 0.7, level: 0.22 }), 0, 0, 0));
      const dr = Lab.drops(scene, { color: 0xeaf6ff, from: () => V(0, 1.0, 0), to: () => fl.level + 0.02 });
      const scr = document.createElement('div'); scr.className = 'lab-info'; scr.style.cssText = 'left:auto;right:12px;top:44px;font:700 20px "Courier New",monospace;text-align:center'; ctx.renderer.domElement.parentElement.appendChild(scr);
      const mic = Lab.micro(scene, V(-1.2, 1.2, -0.2), 0.62);
      const H = Lab.atomMesh('H', 1), OH = Lab.molecule([['O', 0, 0, 0], ['H', 0.3, 0.12, 0]], [[0, 1]], 0.9), W = Lab.mol('H2O', 0.9), Na = Lab.atomMesh('Na', 0.7), Cl = Lab.atomMesh('Cl', 0.7);
      [H, OH, W, Na, Cl].forEach((o) => mic.content.add(o)); Na.position.set(-0.3, -0.3, 0); Cl.position.set(0.3, -0.3, 0);
      const lH = ctx.label('H⁺', H, [0, 0.1, 0], 'ion'), lOH = ctx.label('OH⁻', OH, [0, 0.12, 0], 'ion'), lNa = ctx.label('Na⁺', Na, [0, 0.1, 0], 'ion'), lCl = ctx.label('Cl⁻', Cl, [0, 0.1, 0], 'ion');
      const lB = ctx.label({ uz: 'Byuretka: HCl', en: 'Burette: HCl' }, bur.group, [-0.2, 0.9, 0]); const lF = ctx.label({ uz: 'NaOH + fenolftalein', en: 'NaOH + phenolphthalein' }, fl.group, [0, -0.1, 0.4]);
      const pink = new T.Color(0xff3fa4), clear = new T.Color(0xeef7ff);
      let ph = 13;
      return {
        reset() { fl.setColor(0xeef7ff); fl.setLevel(0.22); bur.setLevel(1.0); dr.rate = 0; ph = 13; mic.show(0); [lH, lOH, lNa, lCl].forEach((l) => l.set(0)); W.visible = false; H.visible = OH.visible = true; },
        steps: [
          { dur: 3.5, cap: { uz: "Kolbada <b>o'yuvchi natriy (NaOH)</b> eritmasi — ishqor. Unga bir necha tomchi <b>fenolftalein</b> indikatori qo'shamiz…", en: 'The flask holds <b>sodium hydroxide (NaOH)</b> — an alkali. We add a few drops of <b>phenolphthalein</b> indicator…' }, f(p) { fl.setColor(clear.clone().lerp(pink, ease(seg(p, 0.4, 0.9)))); } },
          { dur: 2.5, cap: { uz: "Eritma <b>pushti</b> rangga kirdi — muhit ishqoriy (pH > 7). Byuretkada <b>xlorid kislota (HCl)</b>.", en: 'The solution turns <b>pink</b> — the medium is basic (pH > 7). The burette holds <b>hydrochloric acid (HCl)</b>.' }, f() { fl.setColor(pink); } },
          { dur: 9, cap: { uz: "Kislotani tomchilab qo'shib, kolbani chayqatamiz. pH asta-sekin kamayadi… Neytrallanish nuqtasida (pH = 7) pushti rang <b>butunlay yo'qoladi</b>!", en: 'We add the acid drop by drop, swirling the flask. The pH slowly falls… At the neutral point (pH = 7) the pink colour <b>disappears completely</b>!' }, eq: 'NaOH + HCl → NaCl + H₂O', f(p) { dr.rate = 6; bur.setLevel(lerp(1.0, 0.5, p)); fl.setLevel(lerp(0.22, 0.3, p)); ph = p < 0.85 ? lerp(13, 9.5, Math.pow(p / 0.85, 2)) : lerp(9.5, 7, seg(p, 0.85, 0.95)); const k = seg(p, 0.82, 0.93); fl.setColor(pink.clone().lerp(clear, k)); fl.group.rotation.z = 0.04 * Math.sin(p * 60); } },
          { dur: 6, cap: { uz: "Mikro-ko'rinish: kislotaning <b>H⁺</b> ioni ishqorning <b>OH⁻</b> ioni bilan birikib <b>suv</b> hosil qiladi. Na⁺ va Cl⁻ ionlari eritmada qoladi — bu <b>osh tuzi (NaCl)</b>.", en: 'Micro view: the acid’s <b>H⁺</b> ion joins the base’s <b>OH⁻</b> ion to form <b>water</b>. Na⁺ and Cl⁻ stay in solution — that is <b>table salt (NaCl)</b>.' }, eq: 'H⁺ + OH⁻ → H₂O', cam: { pos: [-0.6, 1.5, 2.6], target: [-0.9, 1.15, 0] }, f(p) { fl.setColor(clear); fl.group.rotation.z = 0; ph = 7; bur.setLevel(0.5); fl.setLevel(0.3); mic.show(seg(p, 0, 0.15)); const k = ease(seg(p, 0.2, 0.55)); H.visible = OH.visible = p < 0.6; W.visible = p >= 0.6; H.position.set(lerp(-0.4, -0.05, k), 0.15, 0); OH.position.set(lerp(0.4, 0.08, k), 0.15, 0); W.position.set(0, 0.18 + 0.1 * seg(p, 0.6, 1), 0); W.rotation.y = p * 4; lH.set(seg(p, 0.1, 0.2) * (p < 0.6 ? 1 : 0)); lOH.set(seg(p, 0.1, 0.2) * (p < 0.6 ? 1 : 0)); lNa.set(seg(p, 0.1, 0.2)); lCl.set(seg(p, 0.1, 0.2)); } },
          { dur: 4.5, cap: { uz: "<b>Neytrallanish</b> — kislota va asos reaksiyasidan tuz va suv hosil bo'lishi. Hayotda: oshqozon kislotaligini kamaytiruvchi dorilar, nordon tuproqqa ohak solish, ari chaqqanda soda surtish.", en: '<b>Neutralization</b> — an acid and a base react to form a salt and water. In life: antacid medicines, liming acidic soil, using baking soda on a bee sting.' }, cam: { pos: [0.6, 1.8, 3.4], target: [0, 1.0, 0] }, f() { fl.setColor(clear); ph = 7; mic.show(1); W.visible = true; H.visible = OH.visible = false; lNa.set(1); lCl.set(1); } },
        ],
        loop(dt) { dr.tick(dt); const c = Lab.PH[Math.max(0, Math.min(13, Math.round(ph) - 1))]; scr.innerHTML = `pH <span style="color:#${c.toString(16).padStart(6, '0')}">${ph.toFixed(1)}</span>`; },
        clear() { dr.clear(); }
      };
    }
  });

  /* 24. Suvning elektrolizi */
  Lab.def({
    id: 'electrolysis', icon: '⚡', grade: [7],
    title: { uz: 'Suvning tarkibi: elektroliz', en: 'Composition of water: electrolysis' },
    desc: { uz: "Elektr toki suvni vodorod va kislorodga ajratadi. Vodorod hajmi kisloroddan 2 marta ko'p: H₂O.", en: 'Electric current splits water into hydrogen and oxygen. The hydrogen volume is twice the oxygen: H₂O.' },
    cam: { pos: [0.2, 1.5, 3.6], target: [0, 0.9, 0] },
    build(ctx) {
      const { scene } = ctx;
      const xs = [-0.35, 0.35]; const H = 1.4; const yb = 0.25;
      xs.forEach((x) => { const v = Lab.vessel(P.cylinder(0.1, H), { marks: 8 }); at(v, x, yb, 0); scene.add(v.group); const cap = new T.Mesh(new T.CylinderGeometry(0.03, 0.03, 0.12, 10), M.glass()); cap.position.set(x, yb + H + 0.06, 0); scene.add(cap); const tap = new T.Mesh(new T.BoxGeometry(0.12, 0.025, 0.025), M.std(0xe11d48)); tap.position.set(x, yb + H + 0.08, 0); scene.add(tap); });
      const bridge = new T.Mesh(new T.CylinderGeometry(0.06, 0.06, 0.8, 16), M.glass()); bridge.rotation.z = Math.PI / 2; bridge.position.y = yb + 0.08; scene.add(bridge);
      const bw = new T.Mesh(new T.CylinderGeometry(0.055, 0.055, 0.8, 16), M.liquid(0x7ec8ff, 0.5)); bw.rotation.z = Math.PI / 2; bw.position.y = yb + 0.08; scene.add(bw);
      const res = Lab.vessel(P.round(0.16, 0.04, 1.5), { color: 0x7ec8ff, opacity: 0.5, level: 0.15 }); at(res, 0, yb + 0.1, 0); scene.add(res.group);
      const stem = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 0.1, 10), M.glass()); stem.position.set(0, yb + 0.05, 0); scene.add(stem);
      const base = new T.Mesh(new T.BoxGeometry(1.2, 0.25, 0.4), M.std(0x334155)); base.position.y = 0.125; scene.add(base);
      const waters = xs.map((x) => invTubeWater(scene, 0.1, 0x7ec8ff));
      const elec = xs.map((x, i) => { const e = new T.Mesh(new T.CylinderGeometry(0.015, 0.015, 0.22, 8), M.metal(i ? 0xb45309 : 0x6b7280)); e.position.set(x, yb + 0.2, 0); scene.add(e); return e; });
      const batt = new T.Group(); batt.position.set(1.1, 0, 0.3); scene.add(batt); const bb = new T.Mesh(new T.BoxGeometry(0.35, 0.4, 0.25), M.std(0x111827)); bb.position.y = 0.2; batt.add(bb); const bt = new T.Mesh(new T.BoxGeometry(0.35, 0.06, 0.25), M.std(0xf59e0b)); bt.position.y = 0.43; batt.add(bt);
      const w1 = tubeLine([[1.0, 0.46, 0.3], [0.7, 0.6, 0.4], [0.2, 0.3, 0.3], [-0.35, 0.3, 0.1], [-0.35, 0.35, 0]], 0.008); w1.material = M.std(0x111827); scene.add(w1);
      const w2 = tubeLine([[1.2, 0.46, 0.3], [1.0, 0.7, 0.2], [0.6, 0.35, 0.2], [0.35, 0.32, 0.1], [0.35, 0.35, 0]], 0.008); w2.material = M.std(0xdc2626); scene.add(w2);
      const gas = [0, 0];
      const bubs = xs.map((x, i) => Lab.bubbles(scene, { size: i ? 0.016 : 0.014, speed: 0.6, region: () => ({ x, z: 0, r: 0.05, y0: yb + 0.25, y1: yb + H - gas[i] }) }));
      const lH = ctx.label({ uz: 'Katod (−): H₂', en: 'Cathode (−): H₂' }, V(xs[0], yb + H + 0.25, 0), [0, 0, 0], 'tag'); const lO = ctx.label({ uz: 'Anod (+): O₂', en: 'Anode (+): O₂' }, V(xs[1], yb + H + 0.25, 0), [0, 0, 0], 'tag');
      const lR = ctx.label({ uz: 'V(H₂) : V(O₂) = 2 : 1', en: 'V(H₂) : V(O₂) = 2 : 1' }, V(0, yb + H + 0.45, 0), [0, 0, 0], 'warn');
      const lBat = ctx.label({ uz: 'Tok manbai', en: 'Power supply' }, batt, [0, 0.6, 0]);
      return {
        reset() { gas[0] = gas[1] = 0; bubs.forEach((b) => (b.rate = 0)); lH.set(0); lO.set(0); lR.set(0); },
        steps: [
          { dur: 3.5, cap: { uz: "Hofman apparati: ikki naycha suv bilan to'ldirilgan (tok o'tishi uchun ozgina soda qo'shilgan). Pastda elektrodlar tok manbaiga ulangan.", en: 'A Hofmann apparatus: two tubes filled with water (a little soda added so current can flow). Electrodes at the bottom connect to a power supply.' } },
          { dur: 9, cap: { uz: "Tokni ulaymiz. Ikkala elektrodda gaz pufakchalari hosil bo'ladi. Manfiy elektrodda (katod) ajralayotgan gaz hajmi musbat elektroddagidan <b>ikki marta ko'p</b>.", en: 'We switch on the current. Gas bubbles form at both electrodes. The gas volume at the negative electrode (cathode) is <b>twice</b> that at the positive one.' }, eq: '2H₂O → 2H₂↑ + O₂↑ (elektr toki / electric current)', f(p) { bubs[0].rate = 60; bubs[1].rate = 30; gas[0] = 0.8 * ease(p); gas[1] = 0.4 * ease(p); lH.set(seg(p, 0.3, 0.4)); lO.set(seg(p, 0.35, 0.45)); } },
          { dur: 5, cap: { uz: "Katodda — <b>vodorod</b> (yonayotgan cho'p bilan «puf» etadi), anodda — <b>kislorod</b> (cho'g'langan cho'pni alangalantiradi). Hajmlar nisbati <b>2 : 1</b>.", en: 'At the cathode — <b>hydrogen</b> (pops with a lit splint); at the anode — <b>oxygen</b> (relights a glowing splint). Volume ratio <b>2 : 1</b>.' }, f(p) { bubs[0].rate = 20; bubs[1].rate = 10; gas[0] = 0.8; gas[1] = 0.4; lH.set(1); lO.set(1); lR.set(seg(p, 0.2, 0.4)); } },
          { dur: 4.5, cap: { uz: "<b>Xulosa:</b> suv — murakkab modda; uning har bir molekulasida 2 ta vodorod va 1 ta kislorod atomi bor: <b>H₂O</b>. Elektroliz — elektr toki yordamida moddani parchalash.", en: '<b>Conclusion:</b> water is a compound; each molecule has 2 hydrogen atoms and 1 oxygen atom: <b>H₂O</b>. Electrolysis means splitting a substance using electric current.' }, f() { gas[0] = 0.8; gas[1] = 0.4; lH.set(1); lO.set(1); lR.set(1); } },
        ],
        loop(dt) { xs.forEach((x, i) => { waters[i].set(x, yb + 0.02, yb + H - gas[i] - 0.01); bubs[i].tick(dt); }); res.setLevel(0.15 + (gas[0] + gas[1]) * 0.25); },
        clear() { bubs.forEach((b) => b.clear()); }
      };
    }
  });

  /* 25. Suvni tozalash */
  Lab.def({
    id: 'water-purification', icon: '🚰', grade: [6, 7],
    title: { uz: 'Ifloslangan suvni tozalash', en: 'Purifying polluted water' },
    desc: { uz: "Shag'al, qum va faollashtirilgan ko'mir qatlamlari suvdagi zarrachalarni ushlab qoladi; so'ng suv zararsizlantiriladi.", en: 'Layers of gravel, sand and activated charcoal trap particles; then the water is disinfected.' },
    cam: { pos: [0.6, 1.7, 3.6], target: [0, 1.0, 0] },
    build(ctx) {
      const { scene } = ctx;
      const st = Lab.stand(2.4); at(st, 0.1, 0, -0.1); scene.add(st.group); st.addRing(0.95, 0.24);
      const colV = Lab.vessel([[0.03, 0], [0.05, 0], [0.22, 0.25], [0.22, 1.25]], { rim: true }); at(colV, 0, 0.75, 0); scene.add(colV.group);
      const layers = [[{ uz: 'Paxta', en: 'Cotton' }, 0xf8fafc, 0.08], [{ uz: "Faollashtirilgan ko'mir", en: 'Activated charcoal' }, 0x1f2937, 0.2], [{ uz: 'Mayda qum', en: 'Fine sand' }, 0xe7c48a, 0.25], [{ uz: "Shag'al", en: 'Gravel' }, 0x8b8f96, 0.22]];
      let y = 1.0; layers.forEach((L, i) => { const m = new T.Mesh(new T.CylinderGeometry(0.205, 0.205, L[2], 24), M.std(L[1], { roughness: 1 })); m.position.set(0, y + L[2] / 2, 0); scene.add(m); ctx.label(L[0], m, [0.45, 0, 0]); y += L[2]; });
      const topY = y;
      const src = Lab.vessel(P.beaker(0.25, 0.6), { color: 0x7a5a33, opacity: 0.85, level: 0.42 }); scene.add(src.group);
      const dirty = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 1, 24), M.liquid(0x7a5a33, 0.8)); scene.add(dirty);
      const rec = ctx.add(at(Lab.vessel(P.beaker(0.3, 0.6), { color: 0xcfeeff, opacity: 0.55 }), 0, 0, 0));
      const dr = Lab.drops(scene, { color: 0xcfeeff, from: () => V(0, 0.73, 0), to: () => Math.max(0.05, rec.level) });
      const lD = ctx.label({ uz: 'Ifloslangan suv', en: 'Polluted water' }, src.group, [0, 0.75, 0]); const lC = ctx.label({ uz: 'Tiniq suv', en: 'Clear water' }, rec.group, [0, 0.7, 0], 'tag');
      const uv = new T.Mesh(new T.BoxGeometry(0.5, 0.06, 0.12), M.glow(0xa855f7, 0.9)); uv.position.set(0, 0.68, 0.45); scene.add(uv); const lU = ctx.label({ uz: 'Zararsizlantirish: xlor yoki UF nur', en: 'Disinfection: chlorine or UV light' }, uv, [0, 0.12, 0], 'micro');
      const srcPose = (p) => { const k = ease(p); src.group.position.set(lerp(1.1, 0.3, k), lerp(0, topY + 0.25, k), 0); src.group.rotation.z = lerp(0, 1.9, ease(seg(p, 0.5, 1))); };
      return {
        reset() { srcPose(0); src.setLevel(0.42); dirty.visible = false; rec.setLevel(0); dr.rate = 0; lC.set(0); uv.visible = false; lU.set(0); },
        steps: [
          { dur: 4, cap: { uz: "Uy sharoitidagi filtr: yuqoridan pastga — <b>shag'al</b> (yirik zarralar), <b>qum</b> (mayda zarralar), <b>faollashtirilgan ko'mir</b> (rang va hidni yutadi), <b>paxta</b>.", en: 'A simple filter, top to bottom: <b>gravel</b> (large bits), <b>sand</b> (fine bits), <b>activated charcoal</b> (absorbs colour and smell), <b>cotton</b>.' } },
          { dur: 3, cap: { uz: 'Loyqa, ifloslangan suvni filtrga quyamiz.', en: 'We pour muddy, polluted water into the filter.' }, f(p) { srcPose(p); } },
          { dur: 8, cap: { uz: "Suv qatlamlardan sekin o'tadi. Har bir qatlam o'z ishini qiladi: avval yirik, so'ng mayda zarrachalar ushlanadi, ko'mir esa erigan bo'yoq va hidlarni <b>adsorbsiyalaydi</b>.", en: 'Water trickles slowly through the layers. Each layer does its job: large, then fine particles are trapped, and charcoal <b>adsorbs</b> dissolved colours and smells.' }, f(p) { srcPose(1); src.setLevel(lerp(0.42, 0.06, seg(p, 0, 0.4))); dirty.visible = true; const h = 0.25 * Math.sin(Math.PI * Math.min(1, p * 1.3)); dirty.scale.y = Math.max(0.01, h); dirty.position.y = topY + h / 2; dr.rate = 6 * seg(p, 0.25, 0.35); rec.setLevel(0.3 * seg(p, 0.3, 1)); lC.set(seg(p, 0.7, 0.85)); } },
          { dur: 5, cap: { uz: "Suv tiniq bo'ldi, lekin unda <b>mikroblar</b> qolishi mumkin! Shuning uchun suv tozalash inshootlarida suv <b>xlorlanadi</b> yoki <b>ultrabinafsha nur</b> bilan zararsizlantiriladi. Uyda esa suvni qaynatib ichish kerak.", en: 'The water is clear but may still contain <b>germs</b>! Water treatment plants therefore <b>chlorinate</b> it or disinfect it with <b>UV light</b>. At home, boil water before drinking.' }, f(p) { srcPose(1 - ease(p)); src.setLevel(0.06); dirty.visible = false; dr.rate = 2 * (1 - p); rec.setLevel(0.3); lC.set(1); uv.visible = true; lU.set(seg(p, 0.2, 0.35)); uv.material.opacity = 0.6 + 0.3 * Math.sin(p * 30); } },
        ],
        loop(dt) { dr.tick(dt); }, clear() { dr.clear(); }
      };
    }
  });

  /* 26. Suvning qattiqligi */
  Lab.def({
    id: 'water-hardness', icon: '🫧', grade: [7],
    title: { uz: 'Suvning qattiqligi va uni yumshatish', en: 'Water hardness and softening' },
    desc: { uz: "Qattiq suvda (Ca²⁺, Mg²⁺) sovun yaxshi ko'piklanmaydi. Soda qo'shilsa, ionlar cho'kmaga tushadi va suv yumshaydi.", en: 'Soap lathers poorly in hard water (Ca²⁺, Mg²⁺). Adding washing soda precipitates these ions and softens the water.' },
    cam: { pos: [0, 1.5, 3.2], target: [0, 0.7, 0] },
    build(ctx) {
      const { scene } = ctx;
      const xs = [-0.55, 0.55]; const names = [{ uz: 'Yumshoq suv', en: 'Soft water' }, { uz: 'Qattiq suv (Ca²⁺, Mg²⁺)', en: 'Hard water (Ca²⁺, Mg²⁺)' }];
      const tubes = xs.map((x, i) => { const v = Lab.vessel(P.tube(0.13, 1.1), { color: 0xd8f0ff, opacity: 0.5, level: 0.4 }); at(v, x, 0.05, 0); scene.add(v.group); const foam = new T.Mesh(new T.CylinderGeometry(0.12, 0.12, 1, 20), M.std(0xffffff, { roughness: 1, transparent: true, opacity: 0.92 })); v.group.add(foam); ctx.label(names[i], v.group, [0, -0.15, 0.3]); return { v, foam, x }; });
      const scum = grains(30, 0xf1f5f9, 0.025, 6); tubes[1].v.group.add(scum.group);
      const ppt = new T.Mesh(new T.CylinderGeometry(0.11, 0.12, 0.05, 20), M.std(0xffffff, { roughness: 1 })); ppt.position.y = 0.04; tubes[1].v.group.add(ppt);
      const lS = ctx.label({ uz: "Ko'p ko'pik", en: 'Lots of lather' }, tubes[0].v.group, [0, 1.25, 0], 'tag'); const lH = ctx.label({ uz: "Kam ko'pik + oq qatlam", en: 'Little lather + white scum' }, tubes[1].v.group, [0, 1.25, 0], 'warn');
      const lP = ctx.label({ uz: 'CaCO₃ cho\'kmasi', en: 'CaCO₃ precipitate' }, tubes[1].v.group, [0.35, 0.05, 0]);
      const mic = Lab.micro(scene, V(1.6, 1.15, -0.3), 0.55);
      const ca = [], co3 = []; const R = rng(5); for (let i = 0; i < 6; i++) { const a = Lab.atomMesh('Ca', 0.7); a.position.set((R() - 0.5) * 0.6, (R() - 0.2) * 0.5, (R() - 0.5) * 0.4); mic.content.add(a); ca.push(a); const c = Lab.molecule([['C', 0, 0, 0], ['O', 0.2, 0, 0], ['O', -0.1, 0.17, 0], ['O', -0.1, -0.17, 0]], [[0, 1], [0, 2], [0, 3]], 0.6); c.position.set((R() - 0.5) * 0.6, 0.45, (R() - 0.5) * 0.4); mic.content.add(c); co3.push(c); }
      const lCa = ctx.label('Ca²⁺', ca[0], [0, 0.1, 0], 'ion'); const lCO = ctx.label('CO₃²⁻', co3[0], [0, 0.1, 0], 'ion');
      return {
        reset() { tubes.forEach((t) => { t.foam.visible = false; t.v.group.rotation.z = 0; }); scum.group.visible = false; ppt.visible = false; lS.set(0); lH.set(0); lP.set(0); mic.show(0); lCa.set(0); lCO.set(0); co3.forEach((c, i) => { c.visible = false; c.position.y = 0.45; }); ca.forEach((a, i) => a.position.y = (i / 6 - 0.3) * 0.5); },
        steps: [
          { dur: 3.5, cap: { uz: "Probirkalarda: <b>yumshoq suv</b> (distillangan) va <b>qattiq suv</b> — tarkibida kalsiy (Ca²⁺) va magniy (Mg²⁺) tuzlari erigan.", en: 'The tubes hold <b>soft water</b> (distilled) and <b>hard water</b> containing dissolved calcium (Ca²⁺) and magnesium (Mg²⁺) salts.' } },
          { dur: 6, cap: { uz: "Ikkalasiga bir xil miqdorda <b>sovun eritmasi</b> qo'shib chayqatamiz. Yumshoq suvda mo'l ko'pik, qattiq suvda esa ko'pik kam va oq <b>«sovun qasmog'i»</b> hosil bo'ldi.", en: 'We add the same amount of <b>soap solution</b> to each and shake. Soft water makes plenty of lather; hard water gives little lather and white <b>scum</b>.' }, f(p) { const sh = p < 0.5 ? Math.sin(p * 60) * 0.15 * (1 - p * 2) : 0; tubes.forEach((t, i) => { t.v.group.rotation.z = sh; t.foam.visible = p > 0.3; const h = (i ? 0.08 : 0.5) * ease(seg(p, 0.3, 0.8)); t.foam.scale.y = Math.max(0.01, h); t.foam.position.y = 0.4 + h / 2; }); scum.group.visible = p > 0.5; scum.arr.forEach((g) => g.m.position.set(Math.cos(g.a) * g.r * 0.1, 0.42 + g.d * 0.05, Math.sin(g.a) * g.r * 0.1)); lS.set(seg(p, 0.7, 0.8)); lH.set(seg(p, 0.75, 0.85)); } },
          { dur: 7, cap: { uz: "<b>Yumshatish:</b> qattiq suvga <b>soda (Na₂CO₃)</b> qo'shamiz. Ca²⁺ ionlari CO₃²⁻ ionlari bilan birikib, erimaydigan <b>CaCO₃</b> cho'kmasiga tushadi.", en: '<b>Softening:</b> we add <b>washing soda (Na₂CO₃)</b> to the hard water. Ca²⁺ ions combine with CO₃²⁻ ions and form an insoluble <b>CaCO₃</b> precipitate.' }, eq: 'Ca²⁺ + CO₃²⁻ → CaCO₃↓', cam: { pos: [1.3, 1.4, 2.8], target: [1.0, 0.9, 0] }, f(p) { tubes[0].foam.visible = true; tubes[0].foam.scale.y = 0.5; tubes[0].foam.position.y = 0.65; tubes[1].foam.visible = false; scum.group.visible = false; lS.set(0); lH.set(0); mic.show(seg(p, 0, 0.12)); lCa.set(seg(p, 0.1, 0.2)); lCO.set(seg(p, 0.15, 0.25) * (1 - seg(p, 0.7, 0.8))); const k = ease(seg(p, 0.2, 0.75)); co3.forEach((c, i) => { c.visible = true; c.position.lerpVectors(V(c.position.x, 0.45, c.position.z), V(ca[i].position.x + 0.12, -0.35 + i * 0.03, ca[i].position.z), k); }); ca.forEach((a, i) => { a.position.y = lerp((i / 6 - 0.3) * 0.5, -0.35 + i * 0.03, k); }); ppt.visible = p > 0.5; ppt.scale.y = seg(p, 0.5, 1) + 0.01; lP.set(seg(p, 0.75, 0.9)); } },
          { dur: 4.5, cap: { uz: "Endi suv yumshadi — sovun yaxshi ko'piklanadi. Qaynatish ham vaqtinchalik qattiqlikni yo'qotadi; choynakdagi oq qatlam (<b>quyqa</b>) — CaCO₃.", en: 'Now the water is soft and soap lathers well. Boiling also removes temporary hardness; the white crust in a kettle (<b>limescale</b>) is CaCO₃.' }, cam: { pos: [0, 1.5, 3.2], target: [0, 0.7, 0] }, f(p) { mic.show(1); ppt.visible = true; ppt.scale.y = 1; lP.set(1); tubes[0].foam.visible = true; tubes[0].foam.scale.y = 0.5; tubes[0].foam.position.y = 0.65; const t1 = tubes[1]; t1.foam.visible = true; const h = 0.45 * ease(seg(p, 0.2, 0.8)); t1.foam.scale.y = Math.max(0.01, h); t1.foam.position.y = 0.4 + h / 2; } },
        ],
        loop(dt) { mic.content.rotation.y += dt * 0.3; }
      };
    }
  });

  /* 27. Tabiatda suvning aylanishi */
  Lab.def({
    id: 'water-cycle', icon: '🌧️', grade: [6, 7],
    title: { uz: 'Tabiatda suvning aylanishi', en: 'The water cycle in nature' },
    desc: { uz: "Bug'lanish → kondensatsiya (bulut) → yog'ingarchilik → daryolar orqali dengizga qaytish.", en: 'Evaporation → condensation (clouds) → precipitation → rivers flow back to the sea.' },
    table: false, bg: 0x9fd2ff, cam: { pos: [0, 3.2, 7.4], target: [0, 1.6, 0] },
    build(ctx) {
      const { scene } = ctx; scene.fog = new T.Fog(0x9fd2ff, 12, 30);
      const sea = new T.Mesh(new T.BoxGeometry(4, 0.3, 4), M.std(0x1e88e5, { roughness: 0.25, metalness: 0.1 })); sea.position.set(-2, 0, 0); scene.add(sea);
      const land = new T.Mesh(new T.BoxGeometry(4, 0.5, 4), M.std(0x5fae4f)); land.position.set(2, 0.1, 0); scene.add(land);
      const mount = new T.Mesh(new T.ConeGeometry(1.2, 2.0, 7), M.std(0x7a8b6f, { flatShading: true })); mount.position.set(2.6, 1.3, -0.8); scene.add(mount);
      const snow = new T.Mesh(new T.ConeGeometry(0.42, 0.7, 7), M.std(0xffffff, { flatShading: true })); snow.position.set(2.6, 2.0, -0.8); scene.add(snow);
      const river = Lab.util.tubeLine([[2.4, 0.8, -0.4], [1.8, 0.4, 0.3], [1.0, 0.37, 0.7], [0.2, 0.25, 0.6], [-0.4, 0.15, 0.5]], 0.07); river.material = M.std(0x2b9df4, { roughness: 0.3 }); scene.add(river);
      for (let i = 0; i < 6; i++) { const tr = new T.Group(); const tk = new T.Mesh(new T.CylinderGeometry(0.04, 0.05, 0.3, 6), M.std(0x8b5a2b)); tk.position.y = 0.15; tr.add(tk); const cr = new T.Mesh(new T.ConeGeometry(0.18, 0.45, 8), M.std(0x2f7d32)); cr.position.y = 0.48; tr.add(cr); tr.position.set(0.9 + (i % 3) * 0.45, 0.35, 1.0 + Math.floor(i / 3) * 0.5); scene.add(tr); }
      const sun = new T.Mesh(new T.SphereGeometry(0.45, 24, 16), M.basic(0xffd54a)); sun.position.set(-3.2, 3.6, -2); scene.add(sun);
      const sg = new T.Sprite(new T.SpriteMaterial({ map: Lab.radialTex(), color: 0xffe08a, transparent: true, opacity: 0.6, blending: T.AdditiveBlending, depthWrite: false })); sg.scale.set(2.2, 2.2, 1); sg.position.copy(sun.position); scene.add(sg);
      const cloud = new T.Group(); const cm = M.std(0xffffff, { roughness: 1 }); const R = rng(3); for (let i = 0; i < 9; i++) { const s = new T.Mesh(new T.SphereGeometry(0.3 + R() * 0.2, 16, 12), cm); s.position.set((R() - 0.5) * 1.4, (R() - 0.5) * 0.25, (R() - 0.5) * 0.6); cloud.add(s); } scene.add(cloud);
      const vap = Lab.puffs(scene, { color: 0xffffff, op: 0.35, size: 0.35, life: 3, spread: 1.4, vel: V(0.15, 0.7, 0), origin: () => V(-2, 0.2, 0.3) });
      const rain = Lab.drops(scene, { color: 0x9fd8ff, max: 120, from: () => V(cloud.position.x + (Math.random() - 0.5) * 1.3, cloud.position.y - 0.2, cloud.position.z + (Math.random() - 0.5) * 0.6), to: () => 0.4 });
      const labels = [ctx.label({ uz: "1. Bug'lanish", en: '1. Evaporation' }, V(-2, 1.4, 0.3), [0, 0, 0], 'tag'), ctx.label({ uz: '2. Kondensatsiya (bulut)', en: '2. Condensation (clouds)' }, cloud, [0, 0.5, 0], 'tag'), ctx.label({ uz: "3. Yog'ingarchilik", en: '3. Precipitation' }, V(2, 1.6, 0.3), [0, 0, 0], 'tag'), ctx.label({ uz: "4. Yig'ilish: daryo → dengiz", en: '4. Collection: river → sea' }, V(0.6, 0.5, 0.8), [0, 0, 0], 'tag')];
      let cl = 0;
      return {
        reset() { vap.rate = 0; rain.rate = 0; cl = 0; cloud.position.set(-1.2, 3.0, 0); labels.forEach((l) => l.set(0)); },
        steps: [
          { dur: 3.5, cap: { uz: "Yer yuzidagi suv doimo harakatda: u holatini o'zgartirib, dengiz, havo va quruqlik o'rtasida <b>aylanib</b> yuradi.", en: 'Water on Earth is always on the move, changing state as it <b>cycles</b> between the sea, the air and the land.' } },
          { dur: 5, cap: { uz: "<b>Bug'lanish:</b> Quyosh issiqligi ta'sirida dengiz, ko'l va daryolardagi suv <b>suv bug'iga</b> (gazga) aylanib, havoga ko'tariladi.", en: '<b>Evaporation:</b> the Sun’s heat turns water from seas, lakes and rivers into <b>water vapour</b> (gas), which rises into the air.' }, f(p) { vap.rate = 14; labels[0].set(seg(p, 0, 0.15)); cl = 0.3 * p; } },
          { dur: 5, cap: { uz: "<b>Kondensatsiya:</b> yuqorida havo sovuq. Suv bug'i soviydi va mayda tomchilarga aylanadi — <b>bulutlar</b> hosil bo'ladi. Shamol bulutlarni quruqlik tomon olib ketadi.", en: '<b>Condensation:</b> the air high up is cold. Water vapour cools into tiny droplets — <b>clouds</b> form. Wind carries them over the land.' }, f(p) { vap.rate = 10; labels[0].set(1); labels[1].set(seg(p, 0.1, 0.25)); cl = 0.3 + 0.7 * ease(p); cloud.position.x = lerp(-1.2, 1.8, ease(p)); } },
          { dur: 5, cap: { uz: "<b>Yog'ingarchilik:</b> tomchilar yiriklashib og'irlashadi va <b>yomg'ir</b> yoki <b>qor</b> bo'lib yerga tushadi.", en: '<b>Precipitation:</b> droplets grow heavy and fall as <b>rain</b> or <b>snow</b>.' }, f(p) { vap.rate = 6; cl = 1; cloud.position.x = 1.8; labels.forEach((l, i) => l.set(i < 2 ? 1 : i === 2 ? seg(p, 0.1, 0.25) : 0)); rain.rate = 60; } },
          { dur: 5, cap: { uz: "<b>Yig'ilish:</b> suv daryolar va yer osti suvlari orqali yana dengizga qaytadi — aylanish qaytadan boshlanadi. Suv — hayot manbai, uni asrash kerak!", en: '<b>Collection:</b> water flows back to the sea through rivers and groundwater — and the cycle starts again. Water is the source of life — let’s protect it!' }, f(p) { vap.rate = 8; cl = 1 - 0.4 * p; cloud.position.x = lerp(1.8, -0.5, ease(p)); rain.rate = 20 * (1 - p); labels.forEach((l) => l.set(1)); } },
        ],
        loop(dt, s, c) { vap.tick(dt); rain.tick(dt); cloud.scale.setScalar(Math.max(0.05, cl)); cloud.visible = cl > 0.06; river.material.color.setHSL(0.58, 0.8, 0.5 + 0.05 * Math.sin(c.t * 3)); },
        clear() { vap.clear(); rain.clear(); }
      };
    }
  });

  /* 28. Kislotali yomg'ir */
  Lab.def({
    id: 'acid-rain', icon: '🏭', grade: [7],
    title: { uz: "Kislotali yomg'ir qanday hosil bo'ladi?", en: 'How does acid rain form?' },
    desc: { uz: "Zavod va avtomobillardan chiqqan SO₂ va NO₂ gazlari bulutdagi suv bilan kislotalar hosil qiladi va o'simlik, binolarga zarar yetkazadi.", en: 'SO₂ and NO₂ from factories and cars form acids with cloud water, harming plants and buildings.' },
    table: false, bg: 0xaec7dd, cam: { pos: [0, 3.2, 7.2], target: [0, 1.6, 0] },
    build(ctx) {
      const { scene } = ctx; scene.fog = new T.Fog(0xaec7dd, 12, 30);
      const ground = new T.Mesh(new T.BoxGeometry(9, 0.3, 4), M.std(0x6aa84f)); ground.position.y = -0.05; scene.add(ground);
      const fac = new T.Group(); fac.position.set(-2.6, 0.1, -0.5); scene.add(fac);
      const bld = new T.Mesh(new T.BoxGeometry(1.4, 0.7, 0.8), M.std(0x8d6e63)); bld.position.y = 0.35; fac.add(bld);
      [-0.35, 0.3].forEach((x) => { const ch = new T.Mesh(new T.CylinderGeometry(0.1, 0.13, 1.4, 12), M.std(0x9e9e9e)); ch.position.set(x, 1.0, 0); fac.add(ch); const band = new T.Mesh(new T.CylinderGeometry(0.105, 0.105, 0.1, 12), M.std(0xe53935)); band.position.set(x, 1.55, 0); fac.add(band); });
      const smokes = [-0.35, 0.3].map((x) => Lab.puffs(scene, { color: 0x6b6b6b, op: 0.6, size: 0.45, life: 3.2, spread: 0.05, vel: V(0.35, 0.45, 0), origin: () => V(-2.6 + x, 1.85, -0.5) }));
      const car = new T.Group(); const cb = new T.Mesh(new T.BoxGeometry(0.5, 0.18, 0.25), M.std(0x1e88e5)); cb.position.y = 0.18; car.add(cb); const ct = new T.Mesh(new T.BoxGeometry(0.28, 0.13, 0.23), M.std(0x90caf9)); ct.position.set(-0.03, 0.33, 0); car.add(ct); scene.add(car);
      const cloud = new T.Group(); const cm = M.std(0xffffff, { roughness: 1 }); const R = rng(8); for (let i = 0; i < 10; i++) { const s = new T.Mesh(new T.SphereGeometry(0.32 + R() * 0.2, 16, 12), cm); s.position.set((R() - 0.5) * 1.6, (R() - 0.5) * 0.25, (R() - 0.5) * 0.6); cloud.add(s); } cloud.position.set(0.8, 3.1, -0.3); scene.add(cloud);
      const trees = []; for (let i = 0; i < 5; i++) { const tr = new T.Group(); const tk = new T.Mesh(new T.CylinderGeometry(0.05, 0.06, 0.4, 6), M.std(0x8b5a2b)); tk.position.y = 0.2; tr.add(tk); const cr = new T.Mesh(new T.SphereGeometry(0.28, 12, 10), M.std(0x2e7d32)); cr.position.y = 0.6; tr.add(cr); tr.position.set(0.2 + i * 0.5, 0.1, 0.4 + (i % 2) * 0.4); scene.add(tr); trees.push(cr); }
      const statue = new T.Group(); statue.position.set(2.9, 0.1, 0.4); scene.add(statue); const ped = new T.Mesh(new T.BoxGeometry(0.4, 0.3, 0.4), M.std(0xd7ccc8)); ped.position.y = 0.15; statue.add(ped); const fig = new T.Mesh(new T.CylinderGeometry(0.1, 0.14, 0.6, 10), M.std(0xf5f5f5)); fig.position.y = 0.6; statue.add(fig); const head = new T.Mesh(new T.SphereGeometry(0.1, 12, 10), M.std(0xf5f5f5)); head.position.y = 1.0; statue.add(head);
      const mols = []; for (let i = 0; i < 8; i++) { const m = Lab.mol('SO2', 0.45); scene.add(m); mols.push({ m, d: i / 8 }); }
      const rain = Lab.drops(scene, { color: 0xc9e67a, max: 120, from: () => V(cloud.position.x + (Math.random() - 0.5) * 1.6, cloud.position.y - 0.2, cloud.position.z + (Math.random() - 0.5) * 0.6 + 0.4), to: () => 0.15 });
      const lF = ctx.label({ uz: 'SO₂, NO₂ chiqindi gazlar', en: 'SO₂, NO₂ exhaust gases' }, V(-2.0, 2.5, -0.5), [0, 0, 0], 'warn'); const lC = ctx.label({ uz: 'H₂SO₄, HNO₃ hosil bo\'ladi', en: 'H₂SO₄, HNO₃ form' }, cloud, [0, 0.55, 0], 'tag'); const lR = ctx.label({ uz: "Kislotali yomg'ir (pH < 5,6)", en: 'Acid rain (pH < 5.6)' }, V(1.3, 1.6, 0.4), [0, 0, 0], 'tag');
      const lD = ctx.label({ uz: "O'rmon va haykallar zararlanadi", en: 'Forests and statues are damaged' }, statue, [0, 1.3, 0], 'warn');
      const leafG = new T.Color(0x2e7d32), leafB = new T.Color(0x8d6e3f), cloudW = new T.Color(0xffffff), cloudG = new T.Color(0x8f9aa3);
      let dmg = 0, dirty = 0;
      return {
        reset() { smokes.forEach((s) => (s.rate = 0)); rain.rate = 0; dmg = 0; dirty = 0; mols.forEach((o) => (o.m.visible = false)); [lF, lC, lR, lD].forEach((l) => l.set(0)); },
        steps: [
          { dur: 3.5, cap: { uz: "Tabiiy yomg'ir suvi biroz kislotali (pH ≈ 5,6), chunki unda havodagi CO₂ eriydi. Lekin inson faoliyati uni ancha kislotali qilishi mumkin.", en: 'Natural rain is slightly acidic (pH ≈ 5.6) because CO₂ from the air dissolves in it. But human activity can make it much more acidic.' } },
          { dur: 6, cap: { uz: "Zavodlar ko'mir va neft yoqqanda, avtomobillar ishlaganda havoga <b>oltingugurt dioksid (SO₂)</b> va <b>azot dioksid (NO₂)</b> chiqadi.", en: 'When factories burn coal and oil, and when cars run, <b>sulfur dioxide (SO₂)</b> and <b>nitrogen dioxide (NO₂)</b> enter the air.' }, eq: 'S + O₂ → SO₂', f(p) { smokes.forEach((s) => (s.rate = 8)); lF.set(seg(p, 0.1, 0.25)); mols.forEach((o) => { const k = (p * 1.5 + o.d) % 1; o.m.visible = true; o.m.position.set(lerp(-2.5, 0.6, k), lerp(1.9, 3.0, k), lerp(-0.5, -0.2, k)); o.m.rotation.y = k * 8; }); dirty = 0.5 * p; } },
          { dur: 5, cap: { uz: "Bulutlarda bu gazlar suv bilan reaksiyaga kirishib, <b>sulfat (H₂SO₄)</b> va <b>nitrat (HNO₃)</b> kislotalarini hosil qiladi.", en: 'In clouds these gases react with water to form <b>sulfuric (H₂SO₄)</b> and <b>nitric (HNO₃)</b> acids.' }, eq: 'SO₂ + H₂O → H₂SO₃ ; 2SO₂ + O₂ + 2H₂O → 2H₂SO₄', f(p) { smokes.forEach((s) => (s.rate = 6)); lF.set(1); lC.set(seg(p, 0.1, 0.25)); mols.forEach((o) => { o.m.visible = p < 0.6; o.m.position.lerp(cloud.position, 0.02); }); dirty = 0.5 + 0.5 * p; } },
          { dur: 6, cap: { uz: "<b>Kislotali yomg'ir</b> yog'adi: daraxt barglari sarg'ayadi, ko'l va daryolardagi baliqlar nobud bo'ladi, marmar haykallar va binolar yemiriladi (CaCO₃ kislotada eriydi).", en: '<b>Acid rain</b> falls: leaves turn yellow, fish in lakes and rivers die, marble statues and buildings erode (CaCO₃ dissolves in acid).' }, f(p) { smokes.forEach((s) => (s.rate = 5)); mols.forEach((o) => (o.m.visible = false)); lC.set(1); lR.set(seg(p, 0.1, 0.25)); lD.set(seg(p, 0.5, 0.65)); rain.rate = 70; dirty = 1; dmg = ease(seg(p, 0.2, 1)); } },
          { dur: 4.5, cap: { uz: "<b>Yechimlar:</b> zavod mo'rilariga filtrlar o'rnatish, toza energiya (quyosh, shamol), jamoat transporti va elektromobillar, daraxt ekish. Havoni asrash — hammamizning burchimiz!", en: '<b>Solutions:</b> filters on factory chimneys, clean energy (solar, wind), public transport and electric cars, planting trees. Protecting the air is everyone’s duty!' }, f(p) { smokes.forEach((s) => (s.rate = 5 * (1 - p))); rain.rate = 10 * (1 - p); dirty = 1 - p; dmg = 1; lR.set(1 - p); lD.set(1); } },
        ],
        loop(dt, s, c) {
          smokes.forEach((x) => x.tick(dt)); rain.tick(dt); car.position.set(-3 + ((c.t * 0.6) % 6), 0.1, 1.3);
          cloud.children.forEach((m) => m.material.color.lerpColors(cloudW, cloudG, dirty));
          trees.forEach((t, i) => t.material.color.lerpColors(leafG, leafB, clamp(dmg * 1.3 - i * 0.08))); head.scale.setScalar(1 - 0.35 * dmg); fig.scale.set(1 - 0.25 * dmg, 1, 1 - 0.25 * dmg);
        },
        clear() { smokes.forEach((x) => x.clear()); rain.clear(); }
      };
    }
  });

  /* ---- darslar bilan bog'lash / link experiments to lessons ---- */
  const map = {
    'soda-vinegar': [[6, 1], [6, 11], [7, 9]], 'salt-dissolve': [[6, 3], [6, 9]], 'solution-mixture': [[6, 9], [7, 7]], 'filtration': [[6, 10], [6, 2], [7, 8]],
    'distillation': [[6, 10], [7, 8], [7, 3]], 'states-of-matter': [[6, 7], [6, 8], [7, 60]], 'atom-model': [[6, 5], [6, 4], [7, 11], [7, 12], [7, 13], [7, 14], [7, 15], [7, 16], [7, 21]],
    'particles': [[6, 4], [6, 6], [7, 17], [7, 24]], 'candle-jar': [[6, 12], [7, 44]], 'air-composition': [[6, 18], [7, 39]], 'indicator-ph': [[6, 13], [6, 14], [7, 55], [7, 56]],
    'catalyst': [[6, 15]], 'eggshell-vinegar': [[6, 22]], 'soap-micelle': [[6, 31]], 'chromatography': [[6, 32], [7, 8]], 'starch-iodine': [[6, 20], [7, 66], [7, 68]],
    'measurement': [[7, 6], [7, 5], [7, 4]], 'gold-foil': [[7, 10], [7, 11], [7, 12]], 'oxygen-prep': [[7, 41], [7, 42], [7, 43], [6, 19]], 'flame-combustion': [[7, 46], [7, 44], [7, 45], [7, 49]],
    'acids-metals': [[7, 58], [7, 55], [7, 57]], 'hydrogen': [[7, 53], [7, 54], [7, 52]], 'neutralization': [[7, 62], [6, 13]], 'electrolysis': [[7, 60], [7, 61]],
    'water-purification': [[7, 63], [6, 17]], 'water-hardness': [[7, 64]], 'water-cycle': [[6, 16], [7, 60]], 'acid-rain': [[7, 59], [7, 40], [6, 28], [7, 50]],
  };
  for (const k in map) if (Lab.exps[k]) Lab.exps[k].lessons = map[k];
  // order list: grade 6 first
  Lab.list.sort((a, b) => (a.lessons[0][0] - b.lessons[0][0]) || (a.lessons[0][1] - b.lessons[0][1]));
})();
