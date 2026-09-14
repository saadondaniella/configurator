import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import ViewControls from "./ViewControls";

function ThreeScene({ form, color, size }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);

  const [activeView, setActiveView] = useState(2);

  function handleViewChange(view) {
    const model = modelRef.current;

    if (!model) return;

    if (view === 1) {
      model.rotation.y = 0;
    }

    if (view === 2) {
      model.rotation.y = Math.PI / 2;
    }

    if (view === 3) {
      model.rotation.y = Math.PI;
    }

    setActiveView(view);
  }

  // SET UP THREE.JS SCENE
  useEffect(() => {
    const canvas = canvasRef.current;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000,
    );

    camera.position.set(0, 3, 5);
    camera.lookAt(0, 0, 0);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // RESIZE
    function handleResize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      renderer.setSize(width, height, false);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    // ANIMATION LOOP
    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // LOAD MODEL WHEN FORM, COLOR OR SIZE CHANGES
  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    const loader = new GLTFLoader();

    const formNames = {
      capsule: "Capsule",
      round: "Round",
      heart: "Heart",
    };

    const colorNames = {
      beige: "Beige",
      blue: "Blue",
      red: "Red",
    };

    let modelPath = "/glb/Heart_Pill_Standalone.glb";

    if (form && color && size) {
      modelPath = `/glb/${formNames[form]}_Pill_${size}_${colorNames[color]}.glb`;
    }

    loader.load(
      modelPath,
      (gltf) => {
        // REMOVE OLD MODEL
        if (modelRef.current) {
          scene.remove(modelRef.current);
        }

        const model = gltf.scene;

        // FIND CENTER OF MODEL
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        // MOVE MODEL SO ITS CENTER IS AT 0, 0, 0
        model.position.sub(center);

        // CREATE A CENTERED GROUP
        const modelGroup = new THREE.Group();

        modelGroup.add(model);
        scene.add(modelGroup);

        // SAVE THE GROUP IN THE REF
        modelRef.current = modelGroup;

        console.log("Loaded form:", form);
        console.log("Loaded color:", color);
        console.log("Loaded size:", size);
        console.log("Loaded model:", modelPath);
      },

      undefined,

      (error) => {
        console.error("Error loading GLB:", error);
      },
    );
  }, [form, color, size]);

  return (
    <div className="three-scene">
      <canvas ref={canvasRef}></canvas>

      <ViewControls onViewChange={handleViewChange} />

      <div className="product-info">
        <p>Product information</p>
      </div>
    </div>
  );
}

export default ThreeScene;
