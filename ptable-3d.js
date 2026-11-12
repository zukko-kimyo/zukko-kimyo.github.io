/* Zukko Kimyo: schematic interactive 3D atom display. Not a quantum orbital model. */
(function () {
  function mount(host, element, shells, lang) {
    const T = window.THREE;
    if (!T || !T.WebGLRenderer || !T.OrbitControls || !host || !host.isConnected) return null;
    let renderer, controls, observer, frame = 0, disposed = false, motionPaused = false;
    const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new T.Scene();
    scene.background = new T.Color('#111a35');
    scene.fog = new T.Fog('#111a35', 16, 30);
    const camera = new T.PerspectiveCamera(42, 1, .1, 70);
    const distance = 12 + Math.max(0, shells.length - 4) * 1.5;
    camera.position.set(distance * .36, distance * .24, distance);
    const objects = [], disposables = [], rotating = [];
    const material = (options) => { const m = new T.MeshStandardMaterial(options); disposables.push(m); return m; };
    try {
      renderer = new T.WebGLRenderer({ alpha:false, antialias:true, powerPreference:'low-power' });
      renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));
      renderer.outputColorSpace = T.SRGBColorSpace;
      host.appendChild(renderer.domElement);
      renderer.domElement.setAttribute('aria-label', lang === 'en' ? 'Rotatable schematic atom with electrons on shells' : 'Elektron qavatlari aks etgan aylantiriladigan sxematik atom');
      renderer.domElement.setAttribute('role','img');
      controls = new T.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; controls.dampingFactor = .055;
      controls.enablePan = false;
      controls.minDistance = 7; controls.maxDistance = 29;
      controls.autoRotate = !reduced; controls.autoRotateSpeed = .65;
      scene.add(new T.HemisphereLight(0xbdd8ff, 0x19244d, 2.1));
      const light = new T.PointLight(0xffffff, 65); light.position.set(7,9,11); scene.add(light);
      const radius = Math.min(1.3, .64 + .025 * Math.sqrt(element.z));
      const nucleus = new T.Mesh(
        new T.SphereGeometry(radius, 28, 20),
        material({color:0xb94f80,roughness:.33,metalness:.1,emissive:0x4a1246,emissiveIntensity:.35})
      );
      scene.add(nucleus); objects.push(nucleus);
      // Representative surface particles: not a one-sphere-per-nucleon claim.
      const protonMat = material({color:0xff8b7b,roughness:.45});
      const neutronMat = material({color:0xa1bdfa,roughness:.5});
      const particleGeo = new T.SphereGeometry(radius*.22,9,7); disposables.push(particleGeo);
      const count = Math.min(28, 10 + Math.round(Math.sqrt(element.z)));
      for (let j=0;j<count;j++) {
        const phi = Math.acos(1-2*(j+.5)/count);
        const theta = Math.PI*(1+Math.sqrt(5))*j;
        const bead = new T.Mesh(particleGeo,j%2 ? protonMat : neutronMat);
        bead.position.set(Math.sin(phi)*Math.cos(theta)*radius*.88,Math.cos(phi)*radius*.88,Math.sin(phi)*Math.sin(theta)*radius*.88);
        nucleus.add(bead);
      }
      const electronGeo = new T.SphereGeometry(.105,10,8); disposables.push(electronGeo);
      const electronMat = material({color:0x8de9ff,emissive:0x1b80b6,emissiveIntensity:.65,metalness:.08,roughness:.3});
      shells.forEach((count, i) => {
        if (!count) return;
        const ringRadius = 1.35+i*.66;
        const ringGroup = new T.Group();
        ringGroup.rotation.set(i*.31-.26, i*.22, i*.28);
        const points=[];
        for(let k=0;k<100;k++){const a=k/100*Math.PI*2;points.push(new T.Vector3(Math.cos(a)*ringRadius,Math.sin(a)*ringRadius,0));}
        const pathGeo = new T.BufferGeometry().setFromPoints(points);disposables.push(pathGeo);
        const pathMat = new T.LineBasicMaterial({color:0x5874bc,transparent:true,opacity:.54});disposables.push(pathMat);
        ringGroup.add(new T.LineLoop(pathGeo,pathMat));
        const cloud = new T.InstancedMesh(electronGeo,electronMat,count);
        const dummy = new T.Object3D();
        for(let k=0;k<count;k++){
          const a=(k/count)*Math.PI*2;
          dummy.position.set(ringRadius*Math.cos(a),ringRadius*Math.sin(a),0);
          dummy.updateMatrix();cloud.setMatrixAt(k,dummy.matrix);
        }
        cloud.instanceMatrix.needsUpdate=true;cloud.frustumCulled=false;
        ringGroup.add(cloud);scene.add(ringGroup);
        rotating.push({group:ringGroup,speed:(i%2===0?1:-1)*(.00085+i*.00012)});
      });
      function resize(){
        if(disposed || !host.isConnected) return;
        const w=Math.max(200,host.clientWidth||320),h=Math.max(200,host.clientHeight||224);
        camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);
      }
      resize();
      if(typeof ResizeObserver!=='undefined'){observer=new ResizeObserver(resize);observer.observe(host);}
      let last=0;
      const tick=(now)=>{
        if(disposed) return;
        if(!host.isConnected){dispose();return;}
        const delta=Math.min(45,Math.max(0,now-(last||now)));last=now;
        if(!document.hidden) {
          if(!reduced && !motionPaused) rotating.forEach(o=>o.group.rotation.z+=o.speed*delta);
          controls.update();
          renderer.render(scene,camera);
        }
        frame=requestAnimationFrame(tick);
      };
      frame=requestAnimationFrame(tick);
      function dispose(){
        if(disposed)return;disposed=true;
        if(frame)cancelAnimationFrame(frame);
        if(observer)observer.disconnect();
        if(controls)controls.dispose();
        disposables.forEach(o=>o.dispose());
        if(renderer){renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();}
      }
      return {dispose, pause(value){motionPaused=!!value;controls.autoRotate=!value&&!reduced;}, reset(){camera.position.set(distance*.36,distance*.24,distance);controls.target.set(0,0,0);controls.update();}};
    } catch(err){
      if(frame)cancelAnimationFrame(frame);
      if(observer)observer.disconnect();
      if(controls)controls.dispose();
      disposables.forEach(o=>o.dispose());
      if(renderer){renderer.dispose();renderer.domElement.remove();}
      console.warn('Atom 3D unavailable:',err);
      return null;
    }
  }
  window.PTAtom3D={mount};
})();
