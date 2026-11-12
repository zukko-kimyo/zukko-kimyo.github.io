/* Zukko Kimyo — 3D Laboratoriya dvigateli (Three.js r160, PBR) */
(function () {
  const T = THREE;
  const Lab = { lang: 'uz', exps: {}, list: [] };
  window.Lab = Lab;
  const tr = (o) => (o == null ? '' : typeof o === 'string' ? o : (o[Lab.lang] || o.uz || o.en || ''));
  Lab.tr = tr;
  Lab.def = (e) => { Lab.exps[e.id] = e; Lab.list.push(e); };

  /* ---------- math helpers ---------- */
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => (t = clamp(t), t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const seg = (p, a, b) => clamp((p - a) / (b - a));
  function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  Lab.m = { clamp, lerp, ease, seg, rng };

  /* ---------- textures ---------- */
  const texCache = {};
  const srgb = (t) => { t.colorSpace = T.SRGBColorSpace; return t; };
  Lab.srgb = srgb;
  function radialTex(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
    const k = inner + outer; if (texCache[k]) return texCache[k];
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, inner); gr.addColorStop(1, outer); g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return (texCache[k] = srgb(new T.CanvasTexture(c)));
  }
  Lab.radialTex = radialTex;
  function noiseCanvas(w, h, base, spread, seed) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d');
    const id = g.createImageData(w, h); const R = rng(seed || 3);
    for (let i = 0; i < w * h; i++) { const n = (R() - 0.5) * spread; id.data[i * 4] = base[0] + n; id.data[i * 4 + 1] = base[1] + n; id.data[i * 4 + 2] = base[2] + n; id.data[i * 4 + 3] = 255; }
    g.putImageData(id, 0, 0); return { c, g };
  }
  function benchTex() { // dark epoxy-resin lab bench with subtle speckle
    if (texCache.bench) return texCache.bench;
    const { c, g } = noiseCanvas(512, 512, [48, 54, 62], 14, 11);
    g.fillStyle = 'rgba(255,255,255,0.025)'; for (let i = 0; i < 40; i++) g.fillRect(Math.random() * 512, Math.random() * 512, 60 + Math.random() * 120, 1);
    const t = srgb(new T.CanvasTexture(c)); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(4, 3); t.anisotropy = 4;
    return (texCache.bench = t);
  }
  function tileTex() { // white ceramic wall tiles
    if (texCache.tile) return texCache.tile;
    const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d');
    g.fillStyle = '#c9d0d8'; g.fillRect(0, 0, 512, 512);
    const R = rng(5);
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { const v = 214 + Math.floor(R() * 10); g.fillStyle = `rgb(${v},${v + 2},${v + 5})`; g.fillRect(x * 128 + 3, y * 128 + 3, 122, 122); const gr = g.createLinearGradient(x * 128, y * 128, x * 128 + 128, y * 128 + 128); gr.addColorStop(0, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(0,0,0,.04)'); g.fillStyle = gr; g.fillRect(x * 128 + 3, y * 128 + 3, 122, 122); }
    const t = srgb(new T.CanvasTexture(c)); t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(10, 4);
    return (texCache.tile = t);
  }
  function woodTex() {
    if (texCache.wood) return texCache.wood;
    const c = document.createElement('canvas'); c.width = 256; c.height = 256; const g = c.getContext('2d');
    g.fillStyle = '#b47c45'; g.fillRect(0, 0, 256, 256); const R = rng(9);
    for (let i = 0; i < 70; i++) { g.strokeStyle = `rgba(${90 + R() * 40},${50 + R() * 25},${20},${0.15 + R() * 0.25})`; g.lineWidth = 1 + R() * 2; g.beginPath(); const y = R() * 256; g.moveTo(0, y); for (let x = 0; x <= 256; x += 16) g.lineTo(x, y + Math.sin(x * 0.03 + i) * 4); g.stroke(); }
    const t = srgb(new T.CanvasTexture(c)); t.wrapS = t.wrapT = T.RepeatWrapping; return (texCache.wood = t);
  }
  function textSprite(text, opts = {}) {
    const c = document.createElement('canvas'); const g = c.getContext('2d');
    const fs = opts.size || 48; g.font = `700 ${fs}px Inter, Arial`;
    const w = Math.ceil(g.measureText(text).width) + 24; c.width = w; c.height = fs + 20;
    g.font = `700 ${fs}px Inter, Arial`; g.fillStyle = opts.bg || 'rgba(0,0,0,0)'; g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = opts.color || '#fff'; g.textBaseline = 'middle'; g.fillText(text, 12, c.height / 2 + 2);
    const tex = srgb(new T.CanvasTexture(c));
    const sp = new T.Sprite(new T.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    const s = (opts.scale || 0.25); sp.scale.set(s * c.width / c.height, s, 1); return sp;
  }
  Lab.textSprite = textSprite;

  /* ---------- materials (physically based) ---------- */
  // Glass: premultiplied blending keeps full-strength Fresnel reflections while staying see-through
  const glassMat = (o = {}) => new T.MeshPhysicalMaterial(Object.assign({
    color: 0x0c1218, metalness: 0, roughness: 0.04, ior: 1.5, clearcoat: 0.6, clearcoatRoughness: 0.03, envMapIntensity: 1.6,
    transparent: true, opacity: 0.14, depthWrite: false, side: T.DoubleSide,
    blending: T.CustomBlending, blendEquation: T.AddEquation, blendSrc: T.OneFactor, blendDst: T.OneMinusSrcAlphaFactor
  }, o));
  const M = {
    glass: (o) => glassMat(o),
    std: (color, o = {}) => new T.MeshStandardMaterial(Object.assign({ color, roughness: 0.55, metalness: 0.05 }, o)),
    metal: (color = 0xc3c9cf) => new T.MeshStandardMaterial({ color, roughness: 0.22, metalness: 1, envMapIntensity: 1.2 }),
    liquid: (color, op = 0.78) => {
      const m = new T.MeshPhysicalMaterial({ color, metalness: 0, roughness: 0.03, ior: 1.33, transmission: op >= 0.84 ? 0.25 : 0.94, thickness: 0.5, attenuationColor: new T.Color(color), attenuationDistance: 0.45, envMapIntensity: 1.4, clearcoat: 0.6, depthWrite: false, specularIntensity: 1 });
      m.userData.liquid = true; return m;
    },
    glow: (color, op = 1) => new T.MeshBasicMaterial({ color, transparent: true, opacity: op, blending: T.AdditiveBlending, depthWrite: false, toneMapped: false }),
    basic: (color, o = {}) => new T.MeshBasicMaterial(Object.assign({ color }, o)),
    bubble: () => glassMat({ color: 0x1a2128, opacity: 0.12, envMapIntensity: 2.6, side: T.FrontSide, clearcoat: 0 }),
    wood: () => new T.MeshStandardMaterial({ map: woodTex(), roughness: 0.65 }),
  };
  Lab.M = M;

  /* ---------- CPK atoms ---------- */
  const ATOM = {
    H: [0xffffff, 0.16], O: [0xff3b30, 0.24], C: [0x3a3a3a, 0.24], N: [0x3478f6, 0.24], Na: [0xa25ff5, 0.3], Cl: [0x34c759, 0.3],
    S: [0xffd60a, 0.28], Mg: [0x7fd36b, 0.28], Zn: [0x8e99a8, 0.28], Ca: [0x9aa0a6, 0.3], K: [0x8e44ad, 0.32], Mn: [0x9c6ade, 0.28],
    Fe: [0xd35400, 0.28], Cu: [0xc8753a, 0.28], Au: [0xffc93c, 0.3], He: [0x7fe3ff, 0.18], Ne: [0xff8fb1, 0.2], I: [0x8e44ad, 0.32], Si: [0xd4a373, 0.28]
  };
  Lab.ATOM = ATOM;
  const sphGeo = new T.SphereGeometry(1, 32, 20);
  function atomMesh(el, scale = 1) {
    const a = ATOM[el] || [0xcccccc, 0.25];
    const m = new T.Mesh(sphGeo, new T.MeshPhysicalMaterial({ color: a[0], roughness: 0.25, clearcoat: 0.8, clearcoatRoughness: 0.15, envMapIntensity: 1.2 })); m.scale.setScalar(a[1] * scale); m.castShadow = true; return m;
  }
  function molecule(atoms, bonds = [], scale = 1) {
    const g = new T.Group();
    const meshes = atoms.map(([el, x, y, z]) => { const m = atomMesh(el, scale); m.position.set(x * scale, y * scale, z * scale); g.add(m); return m; });
    const bm = M.std(0xd7dde3, { roughness: 0.3, metalness: 0.2 });
    bonds.forEach(([i, j]) => {
      const a = meshes[i].position, b = meshes[j].position; const d = a.distanceTo(b);
      const c = new T.Mesh(new T.CylinderGeometry(0.05 * scale, 0.05 * scale, d, 12), bm);
      c.position.copy(a).add(b).multiplyScalar(0.5); c.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), b.clone().sub(a).normalize()); g.add(c);
    });
    return g;
  }
  const MOL = {
    H2O: [[['O', 0, 0, 0], ['H', 0.32, 0.24, 0], ['H', -0.32, 0.24, 0]], [[0, 1], [0, 2]]],
    CO2: [[['C', 0, 0, 0], ['O', 0.42, 0, 0], ['O', -0.42, 0, 0]], [[0, 1], [0, 2]]],
    O2: [[['O', 0.2, 0, 0], ['O', -0.2, 0, 0]], [[0, 1]]],
    H2: [[['H', 0.14, 0, 0], ['H', -0.14, 0, 0]], [[0, 1]]],
    N2: [[['N', 0.2, 0, 0], ['N', -0.2, 0, 0]], [[0, 1]]],
    NaCl: [[['Na', -0.25, 0, 0], ['Cl', 0.25, 0, 0]], []],
    SO2: [[['S', 0, 0, 0], ['O', 0.38, 0.2, 0], ['O', -0.38, 0.2, 0]], [[0, 1], [0, 2]]],
    CH4: [[['C', 0, 0, 0], ['H', 0.3, 0.3, 0.3], ['H', -0.3, -0.3, 0.3], ['H', -0.3, 0.3, -0.3], ['H', 0.3, -0.3, -0.3]], [[0, 1], [0, 2], [0, 3], [0, 4]]],
    H2O2: [[['O', 0.2, 0, 0], ['O', -0.2, 0, 0], ['H', 0.36, 0.26, 0.1], ['H', -0.36, -0.26, 0.1]], [[0, 1], [0, 2], [1, 3]]],
  };
  Lab.mol = (name, scale = 1) => molecule(MOL[name][0], MOL[name][1], scale);
  Lab.molecule = molecule; Lab.atomMesh = atomMesh;

  /* ---------- vessels: thick-walled glass from lathe profiles ---------- */
  function rAt(profile, y) {
    for (let i = 1; i < profile.length; i++) {
      const [r0, y0] = profile[i - 1], [r1, y1] = profile[i];
      if (y >= Math.min(y0, y1) && y <= Math.max(y0, y1) && y1 !== y0) return lerp(r0, r1, (y - y0) / (y1 - y0));
    }
    return profile[profile.length - 1][0];
  }
  function liquidGeo(profile, h, inset) {
    const base = profile[0][1] + inset;
    const pts = [new T.Vector2(0, base)];
    const R = (y) => Math.max(0.002, rAt(profile, y) - inset);
    for (let i = 1; i < profile.length; i++) { const y = Math.max(profile[i][1], base); if (y < h) pts.push(new T.Vector2(R(y), y)); else break; }
    const rt = R(h);
    pts.push(new T.Vector2(rt, h));              // wall contact
    pts.push(new T.Vector2(rt * 0.9, h - 0.006)); // meniscus (slightly concave surface)
    pts.push(new T.Vector2(0, h - 0.01));
    return new T.LatheGeometry(pts, 48);
  }
  function wallGeo(profile, t) { // closed solid between outer profile and inset inner profile
    const out = profile.map(([r, y]) => new T.Vector2(r, y));
    const top = profile[profile.length - 1][1];
    const inner = profile.map(([r, y], i) => new T.Vector2(Math.max(0.0005, r - t), i === profile.length - 1 ? top : Math.min(top, y + t)));
    inner[0].x = 0.0005; inner[0].y = profile[0][1] + t;
    const pts = out.concat([new T.Vector2(profile[profile.length - 1][0] - t * 0.5, top + t * 0.35)], inner.reverse());
    pts[0].x = 0.0005;
    return new T.LatheGeometry(pts, 56);
  }
  function marksTex(n, label) {
    const c = document.createElement('canvas'); c.width = 256; c.height = 512; const g = c.getContext('2d');
    g.clearRect(0, 0, 256, 512); g.fillStyle = '#ffffff'; g.strokeStyle = '#ffffff'; g.font = '700 26px Inter, Arial';
    for (let i = 0; i <= n * 2; i++) { const y = 480 - i * (440 / (n * 2)); const major = i % 2 === 0; g.fillRect(40, y - 2, major ? 70 : 40, 4); if (major && i > 0) g.fillText(String(Math.round(i / 2 * (label || 10))), 120, y + 9); }
    const t = srgb(new T.CanvasTexture(c)); t.anisotropy = 4; return t;
  }
  function vessel(profile, opts = {}) {
    const g = new T.Group();
    const top = profile[profile.length - 1];
    const maxR = Math.max(...profile.map((p) => p[0]));
    const t = opts.wall || Math.min(0.018, maxR * 0.07 + 0.004);
    const glass = new T.Mesh(wallGeo(profile, t), M.glass({ side: T.FrontSide })); glass.renderOrder = 10; g.add(glass);
    if (opts.marks) {
      const H = top[1] - profile[0][1]; const r = rAt(profile, profile[0][1] + H * 0.5) + 0.0015;
      const band = new T.Mesh(new T.CylinderGeometry(r, r, H * 0.82, 32, 1, true, -0.55, 1.1), new T.MeshBasicMaterial({ map: marksTex(Math.min(10, opts.marks), opts.markStep), transparent: true, depthWrite: false, opacity: 0.9 }));
      band.position.y = profile[0][1] + H * 0.46; band.renderOrder = 11; g.add(band);
    }
    const liq = new T.Mesh(new T.BufferGeometry(), M.liquid(opts.color || 0xcfeaff, opts.opacity || 0.75)); liq.renderOrder = 5; g.add(liq);
    const v = {
      group: g, profile, glass, liq, level: -1, base: profile[0][1] + t, top: top[1], inset: t + 0.002,
      setLevel(h) {
        h = clamp(h, this.base, this.top - 0.01);
        if (Math.abs(h - this.level) < 0.002) return; this.level = h;
        liq.geometry.dispose(); if (h <= this.base + 0.015) { liq.visible = false; liq.geometry = new T.BufferGeometry(); return; }
        liq.visible = true; liq.geometry = liquidGeo(profile, h, this.inset);
      },
      setFrac(f) { this.setLevel(lerp(this.base, this.top, clamp(f))); },
      setColor(c) { liq.material.color.set(c); liq.material.attenuationColor.set(c); },
      setOpacity(o) { liq.material.transmission = o >= 0.84 ? 0.25 : lerp(0.97, 0.45, clamp((o - 0.3) / 0.55)); },
      rAt(y) { return rAt(profile, y) - t; },
      surface() { return this.level; }
    };
    v.setLevel(opts.level != null ? opts.level : profile[0][1]);
    return v;
  }
  Lab.vessel = vessel;
  Lab.profiles = {
    beaker: (R = 0.45, H = 1.0) => [[0, 0], [R * 0.96, 0], [R, 0.03], [R, H - 0.02], [R * 1.03, H]],
    tube: (R = 0.11, H = 1.2) => { const p = [[0, 0]]; for (let i = 1; i <= 10; i++) { const a = (i / 10) * Math.PI / 2; p.push([R * Math.sin(a), R - R * Math.cos(a)]); } p.push([R, H - 0.02]); p.push([R * 1.12, H]); return p; },
    flask: (R = 0.5, H = 1.1, neck = 0.13) => [[0, 0], [R * 0.95, 0], [R, 0.04], [R * 0.9, 0.16], [neck * 1.1, H * 0.72], [neck, H * 0.78], [neck, H - 0.02], [neck * 1.15, H]],
    round: (R = 0.42, neck = 0.1, H = 1.3) => { const p = [[0, 0]]; for (let i = 1; i <= 16; i++) { const a = (i / 16) * Math.PI * 0.86; p.push([R * Math.sin(a), R - R * Math.cos(a)]); } p.push([neck, 2 * R * 0.96]); p.push([neck, H - 0.02]); p.push([neck * 1.15, H]); return p; },
    cylinder: (R = 0.16, H = 1.6) => [[0, 0], [R * 0.97, 0], [R, 0.02], [R, H - 0.02], [R * 1.08, H]],
    jar: (R = 0.42, H = 1.0) => [[0, 0], [R * 0.97, 0], [R, 0.03], [R, H * 0.9], [R * 0.82, H * 0.97], [R * 0.84, H]],
  };

  /* ---------- realistic flame (shader billboard) ---------- */
  const flameVS = `varying vec2 vUv; void main(){ vUv = uv; vec4 mv = modelViewMatrix * vec4(0.0,0.0,0.0,1.0); vec2 s = vec2(length(modelMatrix[0].xyz), length(modelMatrix[1].xyz)); mv.xy += position.xy * s; gl_Position = projectionMatrix * mv; }`;
  const flameFS = `uniform float uTime; uniform float uSeed; uniform float uI; uniform vec3 cO; uniform vec3 cI; uniform vec3 cC; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
    void main(){
      float y = vUv.y; float x = (vUv.x - 0.5) * 2.0;
      float t = uTime * 2.6 + uSeed;
      float nn = n(vec2(x * 2.5, y * 5.0 - t * 1.7)) * 0.6 + n(vec2(x * 5.0, y * 9.0 - t * 2.9)) * 0.4;
      x += (nn - 0.5) * 0.45 * y;
      float w = 1.25 * pow(max(y, 0.0), 0.55) * pow(max(1.0 - y, 0.0), 0.9);
      float d = abs(x) / max(w, 0.001);
      float body = smoothstep(1.0, 0.55, d) * smoothstep(0.0, 0.07, y) * smoothstep(1.0, 0.72, y + (nn - 0.5) * 0.25);
      float core = smoothstep(0.9, 0.15, d) * smoothstep(0.78, 0.18, y);
      float base = smoothstep(0.32, 0.02, y) * smoothstep(1.0, 0.35, d);
      vec3 col = mix(cO, cI, core);
      col = mix(col, cC, base * 0.85);
      float a = body * (0.55 + 0.45 * core);
      gl_FragColor = vec4(col * a * uI, a);
    }`;
  const flameGeo = new T.PlaneGeometry(1, 1); flameGeo.translate(0, 0.5, 0);
  function flame(opts = {}) {
    const g = new T.Group();
    const uni = { uTime: { value: 0 }, uSeed: { value: Math.random() * 100 }, uI: { value: 1.4 }, cO: { value: new T.Color(opts.outer || 0xff7a1a) }, cI: { value: new T.Color(opts.inner || 0xfff0b0) }, cC: { value: new T.Color(opts.core || 0x3d6bff) } };
    const mat = new T.ShaderMaterial({ uniforms: uni, vertexShader: flameVS, fragmentShader: flameFS, transparent: true, depthWrite: false, blending: T.AdditiveBlending });
    const mesh = new T.Mesh(flameGeo, mat); mesh.renderOrder = 20; mesh.frustumCulled = false; g.add(mesh);
    const halo = new T.Sprite(new T.SpriteMaterial({ map: radialTex('rgba(255,190,90,0.55)', 'rgba(255,140,40,0)'), color: opts.light || 0xffa040, transparent: true, depthWrite: false, blending: T.AdditiveBlending, toneMapped: false })); g.add(halo);
    const light = new T.PointLight(opts.light || 0xffa040, 0, 4, 2); light.position.y = 0.15; g.add(light);
    return {
      group: g, size: 1, base: opts.h || 0.28, w: opts.w || 0.07, mesh,
      set(size) { this.size = size; g.visible = size > 0.01; },
      color(o, i, c) { uni.cO.value.set(o); if (i != null) uni.cI.value.set(i); if (c != null) uni.cC.value.set(c); halo.material.color.set(o); light.color.set(o); },
      tick(t) {
        const s = this.size, fl = 1 + 0.06 * Math.sin(t * 23) + 0.04 * Math.sin(t * 37 + 1);
        uni.uTime.value = t; mesh.scale.set(this.w * 2.4 * s, this.base * 1.25 * s * fl, 1);
        halo.scale.setScalar(this.base * 2.2 * s); halo.position.y = this.base * 0.5 * s;
        light.intensity = 2.5 * s * fl; light.position.y = this.base * 0.5 * s;
      }
    };
  }
  Lab.flame = flame;

  /* ---------- lab apparatus ---------- */
  function burner() { // spirit lamp
    const g = new T.Group();
    const body = new T.Mesh(new T.LatheGeometry([[0, 0], [0.24, 0], [0.265, 0.05], [0.25, 0.16], [0.18, 0.25], [0.085, 0.3], [0.065, 0.33], [0.0005, 0.33]].map((p) => new T.Vector2(p[0], p[1])), 48), M.glass({ opacity: 0.2 }));
    body.renderOrder = 10; g.add(body);
    const fuel = new T.Mesh(new T.CylinderGeometry(0.235, 0.24, 0.12, 40), M.liquid(0xd6ecff, 0.4)); fuel.position.y = 0.065; fuel.renderOrder = 5; g.add(fuel);
    const collar = new T.Mesh(new T.CylinderGeometry(0.068, 0.072, 0.07, 24), M.metal(0xb08d57)); collar.position.y = 0.36; g.add(collar);
    const wick = new T.Mesh(new T.CylinderGeometry(0.02, 0.022, 0.07, 10), M.std(0xf1ead6, { roughness: 1 })); wick.position.y = 0.42; g.add(wick);
    const tip = new T.Mesh(new T.SphereGeometry(0.021, 10, 8), M.std(0x2a2522, { roughness: 1 })); tip.position.y = 0.455; g.add(tip);
    const fl = flame({ h: 0.34, w: 0.075 }); fl.group.position.y = 0.45; g.add(fl.group);
    return { group: g, flame: fl };
  }
  Lab.burner = burner;

  function stand(h = 1.4) {
    const g = new T.Group(); const mt = M.metal(0xbfc5cb);
    const base = new T.Mesh(new T.BoxGeometry(0.72, 0.05, 0.46), M.std(0x2f3a45, { roughness: 0.4, metalness: 0.3 })); base.position.set(0, 0.025, 0); base.castShadow = true; base.receiveShadow = true; g.add(base);
    const rod = new T.Mesh(new T.CylinderGeometry(0.016, 0.016, h, 16), mt); rod.position.set(-0.25, h / 2, -0.12); rod.castShadow = true; g.add(rod);
    return {
      group: g, rod, addRing(y, r = 0.3) {
        const ring = new T.Mesh(new T.TorusGeometry(r, 0.013, 12, 48), mt); ring.rotation.x = Math.PI / 2; ring.position.set(0, y, 0); ring.castShadow = true; g.add(ring);
        const arm = new T.Mesh(new T.CylinderGeometry(0.011, 0.011, 0.25 + r, 10), mt); arm.rotation.z = Math.PI / 2; arm.position.set(-0.25 + (0.25 + r) / 2 - r, y, -0.06); g.add(arm);
        const boss = new T.Mesh(new T.BoxGeometry(0.06, 0.06, 0.06), M.std(0x30363d, { metalness: 0.6, roughness: 0.35 })); boss.position.set(-0.25, y, -0.12); g.add(boss);
        return ring;
      }
    };
  }
  Lab.stand = stand;

  function tripod(h = 0.75) {
    const g = new T.Group(); const mt = M.metal(0x8a939c);
    for (let i = 0; i < 3; i++) { const a = i * Math.PI * 2 / 3; const leg = new T.Mesh(new T.CylinderGeometry(0.013, 0.013, h, 10), mt); leg.position.set(Math.cos(a) * 0.3, h / 2, Math.sin(a) * 0.3); leg.rotation.z = Math.cos(a) * 0.12; leg.rotation.x = -Math.sin(a) * 0.12; leg.castShadow = true; g.add(leg); }
    const ring = new T.Mesh(new T.TorusGeometry(0.32, 0.016, 10, 40), mt); ring.rotation.x = Math.PI / 2; ring.position.y = h; g.add(ring);
    const gc = document.createElement('canvas'); gc.width = gc.height = 128; const gg = gc.getContext('2d'); gg.fillStyle = '#7d858d'; gg.fillRect(0, 0, 128, 128); gg.strokeStyle = '#2b3036'; gg.lineWidth = 1.5; for (let i = 0; i < 128; i += 8) { gg.beginPath(); gg.moveTo(i, 0); gg.lineTo(i, 128); gg.moveTo(0, i); gg.lineTo(128, i); gg.stroke(); } gg.fillStyle = '#e8e4dc'; gg.beginPath(); gg.arc(64, 64, 34, 0, 7); gg.fill();
    const gauze = new T.Mesh(new T.CylinderGeometry(0.36, 0.36, 0.008, 4), new T.MeshStandardMaterial({ map: srgb(new T.CanvasTexture(gc)), metalness: 0.4, roughness: 0.6 })); gauze.rotation.y = Math.PI / 4; gauze.position.y = h + 0.01; gauze.receiveShadow = true; g.add(gauze);
    return { group: g, top: h + 0.02 };
  }
  Lab.tripod = tripod;

  function thermometer(len = 1.2) {
    const g = new T.Group();
    const tube = new T.Mesh(new T.CylinderGeometry(0.022, 0.022, len, 16), M.glass({ opacity: 0.22 })); tube.position.y = len / 2; tube.renderOrder = 10; g.add(tube);
    const back = new T.Mesh(new T.BoxGeometry(0.026, len * 0.9, 0.004), M.std(0xf7f7f2, { roughness: 0.8 })); back.position.set(0, len * 0.52, -0.012); g.add(back);
    const bulb = new T.Mesh(new T.SphereGeometry(0.034, 16, 12), M.std(0xd62828, { roughness: 0.2 })); g.add(bulb);
    const col = new T.Mesh(new T.CylinderGeometry(0.008, 0.008, 1, 10), M.std(0xd62828, { roughness: 0.3 })); g.add(col);
    for (let i = 0; i <= 10; i++) { const tk = new T.Mesh(new T.BoxGeometry(i % 5 ? 0.012 : 0.022, 0.003, 0.002), M.basic(0x222222)); tk.position.set(0.004, 0.1 + (len - 0.15) * i / 10, -0.009); g.add(tk); }
    const th = { group: g, set(frac) { const h = 0.1 + (len - 0.15) * clamp(frac); col.scale.y = h; col.position.y = h / 2; } };
    th.set(0.2); return th;
  }
  Lab.thermometer = thermometer;

  function balloon(color = 0xff4d6d) {
    const g = new T.Group();
    const b = new T.Mesh(new T.SphereGeometry(1, 40, 28), new T.MeshPhysicalMaterial({ color, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.2, sheen: 0.3, transparent: true, opacity: 0.94 })); b.castShadow = true; g.add(b);
    const knot = new T.Mesh(new T.CylinderGeometry(0.06, 0.13, 0.12, 20), M.std(color, { roughness: 0.4 })); g.add(knot);
    return { group: g, set(s) { const r = lerp(0.07, 0.45, s); b.scale.set(r * 0.9, r * 1.1 + 0.05 * (1 - s), r * 0.9); b.position.y = r * 1.05 + 0.06; knot.position.y = 0.04; b.material.opacity = lerp(0.98, 0.9, s); } };
  }
  Lab.balloon = balloon;

  function splint() {
    const g = new T.Group();
    const s = new T.Mesh(new T.CylinderGeometry(0.011, 0.011, 0.9, 8), M.wood()); s.position.y = 0.45; g.add(s);
    const char = new T.Mesh(new T.CylinderGeometry(0.012, 0.008, 0.04, 8), M.std(0x1c1410, { roughness: 1 })); char.position.y = 0.02; g.add(char);
    const tip = new T.Mesh(new T.SphereGeometry(0.018, 12, 8), M.glow(0xff4a12, 1)); g.add(tip);
    const fl = flame({ h: 0.15, w: 0.04 }); fl.group.position.y = -0.005; g.add(fl.group);
    return { group: g, tip, flame: fl, glow(v) { tip.material.opacity = v; tip.visible = v > 0.01; } };
  }
  Lab.splint = splint;

  function spoon(color = 0xd0d5da) {
    const g = new T.Group(); const mt = M.metal(color);
    const h = new T.Mesh(new T.CylinderGeometry(0.011, 0.011, 0.6, 10), mt); h.rotation.z = Math.PI / 2; h.position.x = 0.35; g.add(h);
    const bowl = new T.Mesh(new T.SphereGeometry(0.07, 20, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mt); bowl.material.side = T.DoubleSide; bowl.scale.set(1.3, 0.6, 1); g.add(bowl);
    return { group: g, bowl };
  }
  Lab.spoon = spoon;

  /* ---------- particle systems ---------- */
  function bubbles(scene, opts = {}) {
    const max = opts.max || 160; const geo = new T.SphereGeometry(1, 14, 10);
    const mat = M.bubble();
    const pool = []; const parent = opts.parent || scene;
    for (let i = 0; i < max; i++) { const m = new T.Mesh(geo, mat); m.visible = false; m.renderOrder = 6; parent.add(m); pool.push({ m, life: 0, v: 0, s: 0 }); }
    const R = rng(opts.seed || 7);
    return {
      rate: 0, acc: 0, size: opts.size || 0.025, speed: opts.speed || 0.5, region: opts.region,
      tick(dt) {
        const reg = this.region(); this.acc += this.rate * dt;
        while (this.acc >= 1) {
          this.acc -= 1; const b = pool.find((p) => !p.m.visible); if (!b) break;
          const a = R() * Math.PI * 2, rr = Math.sqrt(R()) * reg.r;
          b.m.position.set(reg.x + Math.cos(a) * rr, reg.y0 + R() * 0.05, reg.z + Math.sin(a) * rr);
          b.s = this.size * (0.45 + R()); b.m.scale.setScalar(b.s); b.v = this.speed * (0.6 + R() * 0.8); b.m.visible = true; b.wob = R() * 6;
        }
        pool.forEach((b) => {
          if (!b.m.visible) return; b.v += dt * 0.25; b.m.position.y += b.v * dt; b.m.position.x += Math.sin(b.m.position.y * 9 + b.wob) * 0.0018;
          b.m.scale.setScalar(b.s * (1 + (b.m.position.y - reg.y0) * 0.15));
          if (b.m.position.y > reg.y1) b.m.visible = false;
        });
      },
      clear() { pool.forEach((b) => (b.m.visible = false)); this.acc = 0; }
    };
  }
  Lab.bubbles = bubbles;

  function puffs(scene, opts = {}) {
    const max = opts.max || 80; const pool = []; const parent = opts.parent || scene;
    const tex = smokeTex();
    for (let i = 0; i < max; i++) {
      const sp = new T.Sprite(new T.SpriteMaterial({ map: tex, color: opts.color || 0xffffff, transparent: true, opacity: 0, depthWrite: false, blending: opts.additive ? T.AdditiveBlending : T.NormalBlending }));
      sp.visible = false; sp.renderOrder = 30; parent.add(sp); pool.push({ sp, life: 0, max: 1, vel: new T.Vector3(), rot: 0 });
    }
    const R = rng(opts.seed || 3);
    return {
      rate: 0, acc: 0, origin: opts.origin || (() => new T.Vector3()), spread: opts.spread || 0.05, vel: opts.vel || new T.Vector3(0, 0.35, 0), life: opts.life || 2.2, size: opts.size || 0.25, op: opts.op || 0.5,
      tick(dt) {
        this.acc += this.rate * dt;
        while (this.acc >= 1) {
          this.acc -= 1; const p = pool.find((q) => !q.sp.visible); if (!p) break;
          const o = this.origin(); p.sp.position.set(o.x + (R() - 0.5) * this.spread * 2, o.y, o.z + (R() - 0.5) * this.spread * 2);
          p.vel.copy(this.vel).add(new T.Vector3((R() - 0.5) * 0.12, R() * 0.1, (R() - 0.5) * 0.12)); p.life = 0; p.max = this.life * (0.7 + R() * 0.6); p.sp.visible = true; p.rot = (R() - 0.5) * 1.5; p.sp.material.rotation = R() * 6;
        }
        pool.forEach((p) => {
          if (!p.sp.visible) return; p.life += dt; const k = p.life / p.max; if (k >= 1) { p.sp.visible = false; return; }
          p.sp.position.addScaledVector(p.vel, dt); p.vel.multiplyScalar(1 - dt * 0.3); const s = this.size * (0.35 + k * 1.6); p.sp.scale.set(s, s, 1);
          p.sp.material.rotation += p.rot * dt; p.sp.material.opacity = this.op * Math.sin(Math.PI * Math.pow(k, 0.7));
        });
      },
      clear() { pool.forEach((p) => (p.sp.visible = false)); this.acc = 0; }
    };
  }
  function smokeTex() {
    if (texCache.smoke) return texCache.smoke;
    const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); const R = rng(17);
    for (let i = 0; i < 18; i++) { const x = 64 + (R() - 0.5) * 44, y = 64 + (R() - 0.5) * 44, r = 18 + R() * 30; const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(255,255,255,0.22)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); }
    return (texCache.smoke = srgb(new T.CanvasTexture(c)));
  }
  Lab.puffs = puffs;

  function drops(scene, opts = {}) {
    const max = opts.max || 40; const pool = []; const geo = new T.SphereGeometry(1, 12, 10); const mat = M.liquid(opts.color || 0xcfeaff, 0.6);
    for (let i = 0; i < max; i++) { const m = new T.Mesh(geo, mat); m.visible = false; m.scale.set(0.02, 0.03, 0.02); m.renderOrder = 6; (opts.parent || scene).add(m); pool.push({ m, v: 0 }); }
    return {
      rate: 0, acc: 0, from: opts.from, to: opts.to, mat,
      tick(dt) {
        this.acc += this.rate * dt; const toY = this.to();
        while (this.acc >= 1) { this.acc -= 1; const p = pool.find((q) => !q.m.visible); if (!p) break; p.m.position.copy(this.from()); p.v = 0; p.m.visible = true; }
        pool.forEach((p) => { if (!p.m.visible) return; p.v += 6 * dt; p.m.position.y -= p.v * dt; p.m.scale.y = 0.03 + p.v * 0.006; if (p.m.position.y < toY) p.m.visible = false; });
      },
      clear() { pool.forEach((p) => (p.m.visible = false)); this.acc = 0; }
    };
  }
  Lab.drops = drops;

  function micro(scene, pos, r = 0.9) {
    const g = new T.Group(); g.position.copy(pos);
    const shell = new T.Mesh(new T.SphereGeometry(r, 48, 32), new T.MeshBasicMaterial({ color: 0x0b1a2e, transparent: true, opacity: 0.85, side: T.BackSide, depthWrite: false }));
    const lens = new T.Mesh(new T.SphereGeometry(r, 48, 32), M.glass({ opacity: 0.04, side: T.FrontSide, envMapIntensity: 0.35, clearcoat: 0 }));
    const ring = new T.Mesh(new T.TorusGeometry(r, 0.022, 12, 80), M.metal(0xd9dee3));
    g.add(shell); g.add(lens); g.add(ring); scene.add(g);
    const content = new T.Group(); g.add(content);
    const glow = new T.PointLight(0xffffff, 0, r * 3, 2); glow.position.set(0, r * 0.6, r * 0.8); g.add(glow);
    return { group: g, content, ring, r, show(v) { g.visible = v > 0.01; g.scale.setScalar(lerp(0.2, 1, ease(v))); shell.material.opacity = 0.85 * v; glow.intensity = 1.5 * v; } };
  }
  Lab.micro = micro;

  /* ================= Viewer ================= */
  Lab.open = function (host, id, opts = {}) {
    const ex = Lab.exps[id]; if (!ex) return null;
    host.innerHTML = '';
    host.classList.add('lab-host');
    const wrap = document.createElement('div'); wrap.className = 'lab-stage'; host.appendChild(wrap);
    const labels = document.createElement('div'); labels.className = 'lab-labels'; wrap.appendChild(labels);
    const W = () => Math.max(50, wrap.clientWidth), H = () => Math.max(50, wrap.clientHeight);
    let renderer;
    try { renderer = new T.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' }); }
    catch (e) { wrap.innerHTML = '<div class="lab-err">WebGL ' + (Lab.lang === 'uz' ? "qo'llab-quvvatlanmaydi" : 'is not supported') + '</div>'; return null; }
    const mobile = /Mobi|Android/i.test(navigator.userAgent);
    renderer.setPixelRatio(Math.min(mobile ? 1.5 : 2, window.devicePixelRatio || 1)); renderer.setSize(W(), H());
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = ex.exposure || 0.92;
    renderer.domElement.className = 'gl'; wrap.insertBefore(renderer.domElement, labels);
    const scene = new T.Scene();
    const pmrem = new T.PMREMGenerator(renderer);
    const envRT = T.RoomEnvironment ? pmrem.fromScene(new T.RoomEnvironment(renderer), 0.04) : null;
    if (envRT) scene.environment = envRT.texture;
    const bg = ex.bg || 0x1c2733; scene.background = new T.Color(bg); scene.fog = new T.Fog(bg, 10, 26);
    const camera = new T.PerspectiveCamera(40, W() / H(), 0.05, 100);
    const cam0 = ex.cam || { pos: [0, 2.2, 4.6], target: [0, 0.8, 0] };
    const camK = opts.camScale || 0.82; const scaleCam = (c) => c && { pos: c.pos.map((v, i) => c.target[i] + (v - c.target[i]) * camK), target: c.target };
    camera.position.set(...scaleCam(cam0).pos);
    let controls = null;
    if (T.OrbitControls) { controls = new T.OrbitControls(camera, renderer.domElement); controls.enableDamping = true; controls.target.set(...cam0.target); controls.maxPolarAngle = Math.PI * 0.52; controls.minDistance = 1; controls.maxDistance = 12; controls.update(); }
    else camera.lookAt(...cam0.target);
    scene.add(new T.HemisphereLight(0xeef4ff, 0x3a3328, 0.55));
    const sun = new T.DirectionalLight(0xfff4e6, 2.2); sun.position.set(3, 6, 4); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 20 }); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02; scene.add(sun);
    const fill = new T.DirectionalLight(0xcfe2ff, 0.6); fill.position.set(-4, 3, 2); scene.add(fill);
    if (ex.table !== false) {
      const top = new T.Mesh(new T.BoxGeometry(12, 0.12, 6), new T.MeshPhysicalMaterial({ map: benchTex(), roughness: 0.32, clearcoat: 0.5, clearcoatRoughness: 0.35, envMapIntensity: 0.8 })); top.position.y = -0.06; top.receiveShadow = true; scene.add(top);
      const front = new T.Mesh(new T.BoxGeometry(12, 1.2, 0.1), M.std(0xe9e4da, { roughness: 0.7 })); front.position.set(0, -0.72, 3.0); scene.add(front);
      const wall = new T.Mesh(new T.PlaneGeometry(30, 12), new T.MeshStandardMaterial({ map: tileTex(), color: 0xc4ccd4, roughness: 0.35, envMapIntensity: 0.5 })); wall.position.set(0, 5.9, -3); wall.receiveShadow = true; scene.add(wall);
      scene.background = new T.Color(0xd9dee4); scene.fog = new T.Fog(0xd9dee4, 12, 30);
    }

    const lbls = [];
    const ctx = {
      scene, camera, renderer, T, M, m: Lab.m, lang: Lab.lang, tr,
      label(text, target, off = [0, 0, 0], cls = '') {
        const el = document.createElement('div'); el.className = 'lab-label ' + cls; el.innerHTML = tr(text); labels.appendChild(el);
        const L = { el, target, off: new T.Vector3(...off), vis: 1, text, set(v) { this.vis = v; }, setText(t) { this.text = t; el.innerHTML = tr(t); } };
        lbls.push(L); return L;
      },
      add(o) { scene.add(o.group || o); return o; },
      t: 0
    };
    const inst = ex.build(ctx) || {};
    // cast shadows from solid objects automatically
    scene.traverse((o) => { if (o.isMesh && o.material && !o.material.transparent && !o.material.userData.liquid && o.material.type !== 'MeshBasicMaterial' && o.material.type !== 'ShaderMaterial') { o.castShadow = true; } });
    const steps = inst.steps || ex.steps || [];
    const total = steps.reduce((a, s) => a + s.dur, 0);
    const starts = []; steps.reduce((a, s) => (starts.push(a), a + s.dur), 0);

    const ui = document.createElement('div'); ui.className = 'lab-ui'; host.appendChild(ui);
    ui.innerHTML = `
      <div class="lab-bar">
        <button class="lb-play" title="Play">▶</button>
        <button class="lb-prev" title="Prev">⏮</button>
        <button class="lb-next" title="Next">⏭</button>
        <button class="lb-restart" title="Restart">↺</button>
        <div class="lb-track"><div class="lb-fill"></div><div class="lb-ticks"></div></div>
        <select class="lb-speed"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="1.5">1.5×</option><option value="2">2×</option></select>
        <button class="lb-full" title="Fullscreen">⛶</button>
      </div>
      <div class="lab-cap"><div class="lc-step"></div><div class="lc-text"></div><div class="lc-eq"></div></div>`;
    const $ = (s) => ui.querySelector(s);
    const ticks = $('.lb-ticks'); starts.forEach((s, i) => { const d = document.createElement('i'); d.style.left = (100 * s / total) + '%'; d.title = String(i + 1); ticks.appendChild(d); });
    const hint = document.createElement('div'); hint.className = 'lab-hint'; hint.textContent = matchMedia('(pointer:coarse)').matches ? (Lab.lang === 'uz' ? "👆 Barmoq bilan aylantiring • ikki barmoq bilan yaqinlashtiring" : '👆 Drag to rotate • pinch to zoom') : (Lab.lang === 'uz' ? "🖱 Aylantirish uchun suring • g'ildirak bilan yaqinlashtiring" : '🖱 Drag to rotate • scroll to zoom'); wrap.appendChild(hint);

    let t = 0, playing = !!opts.autoplay, speed = 1, curStep = -1, alive = true, last = performance.now(); let endFired = false;
    let camAnim = null;
    function stepAt(tt) { let i = 0; for (let k = 0; k < steps.length; k++) if (tt >= starts[k]) i = k; return i; }
    function moveCam(c) {
      if (!c || !controls) return;
      c = scaleCam(c); camAnim = { t: 0, fp: camera.position.clone(), ft: controls.target.clone(), tp: new T.Vector3(...c.pos), tt: new T.Vector3(...c.target) };
    }
    function setPlaying(v) { playing = v; $('.lb-play').textContent = v ? '⏸' : '▶'; if (v && t >= total - 1e-3) seek(0); }
    function seek(tt) { t = clamp(tt, 0, total); inst.clear && inst.clear(); }
    $('.lb-play').onclick = () => setPlaying(!playing);
    $('.lb-restart').onclick = () => { seek(0); curStep = -1; setPlaying(true); };
    $('.lb-next').onclick = () => { const i = stepAt(t); seek(i + 1 < steps.length ? starts[i + 1] : total); };
    $('.lb-prev').onclick = () => { const i = stepAt(t); seek(t - starts[i] > 0.6 ? starts[i] : starts[Math.max(0, i - 1)]); };
    $('.lb-speed').onchange = (e) => (speed = +e.target.value);
    $('.lb-track').onclick = (e) => { const r = e.currentTarget.getBoundingClientRect(); seek(total * (e.clientX - r.left) / r.width); };
    $('.lb-full').onclick = () => { try { if (document.fullscreenElement) document.exitFullscreen(); else host.requestFullscreen(); } catch (e) { } };

    function updateCaption(i) {
      const s = steps[i]; if (!s) return;
      $('.lc-step').textContent = (Lab.lang === 'uz' ? 'Bosqich ' : 'Step ') + (i + 1) + ' / ' + steps.length;
      $('.lc-text').innerHTML = tr(s.cap);
      $('.lc-eq').innerHTML = s.eq ? tr(s.eq) : ''; $('.lc-eq').style.display = s.eq ? '' : 'none';
      if (s.cam) moveCam(s.cam);
    }

    const v3 = new T.Vector3();
    function frame(now) {
      if (!alive) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (playing) { t += dt * speed; if (t >= total) { t = total; setPlaying(false); } }
      const i = stepAt(t); if (i !== curStep) { curStep = i; updateCaption(i); }
      if (!endFired && !opts.quiet && i === steps.length - 1 && t - starts[i] > Math.min(1.5, steps[i].dur * 0.4)) { endFired = true; try { window.dispatchEvent(new CustomEvent('zk:labdone', { detail: { id } })); } catch (e) { } }
      ctx.t = now / 1000;
      inst.reset && inst.reset();
      for (let k = 0; k <= i; k++) { const s = steps[k]; const p = k < i ? 1 : clamp((t - starts[k]) / s.dur); s.f && s.f(p, ctx); }
      inst.loop && inst.loop(playing ? dt * speed : dt * 0.25, { i, t, p: clamp((t - starts[i]) / steps[i].dur) }, ctx);
      $('.lb-fill').style.width = (100 * t / total) + '%';
      if (camAnim) { camAnim.t = Math.min(1, camAnim.t + dt / 1.3); const k = ease(camAnim.t); camera.position.lerpVectors(camAnim.fp, camAnim.tp, k); controls.target.lerpVectors(camAnim.ft, camAnim.tt, k); if (camAnim.t >= 1) camAnim = null; }
      controls && controls.update();
      renderer.render(scene, camera);
      const w = W(), h = H();
      lbls.forEach((L) => {
        const tg = L.target; if (tg.isObject3D) tg.getWorldPosition(v3); else v3.copy(tg);
        v3.add(L.off); v3.project(camera);
        const vis = L.vis > 0.01 && v3.z < 1 && (!tg.isObject3D || tg.visible !== false);
        L.el.style.opacity = vis ? L.vis : 0;
        L.el.style.transform = `translate(-50%,-100%) translate(${(v3.x * 0.5 + 0.5) * w}px,${(-v3.y * 0.5 + 0.5) * h}px)`;
      });
      requestAnimationFrame(frame);
    }
    const ro = new ResizeObserver(() => { renderer.setSize(W(), H()); camera.aspect = W() / H(); camera.updateProjectionMatrix(); });
    ro.observe(wrap);
    updateCaption(0); curStep = 0; setPlaying(playing);
    requestAnimationFrame(frame);
    const handle = {
      destroy() {
        alive = false; ro.disconnect(); controls && controls.dispose();
        scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) [].concat(o.material).forEach((m) => { m.map && m.map.dispose && !Object.values(texCache).includes(m.map) && m.map.dispose(); m.dispose(); }); });
        envRT && envRT.dispose(); pmrem.dispose();
        renderer.dispose(); renderer.forceContextLoss && renderer.forceContextLoss(); host.innerHTML = '';
      },
      play: () => setPlaying(true), seek, get t() { return t; }, total
    };
    window.__lab = handle; return handle;
  };
})();
