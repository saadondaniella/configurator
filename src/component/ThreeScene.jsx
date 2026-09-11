import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function ThreeScene({ form }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);

  const modelPaths = {
    capsule: "/glb/Heart_Pill_Standalone.glb",
    round: "/glb/Heart_Pill_Standalone.glb",
    heart: "/glb/Heart_Pill_Standalone.glb",
  };

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

  // LOAD MODEL WHEN FORM CHANGES
  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    const loader = new GLTFLoader();

    const modelPath = modelPaths[form] || "/glb/Heart_Pill_Standalone.glb";

    loader.load(
      modelPath,
      (gltf) => {
        // REMOVE OLD MODEL
        if (modelRef.current) {
          scene.remove(modelRef.current);
        }

        const model = gltf.scene;

        // CENTER MODEL
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;

        // ADD NEW MODEL
        scene.add(model);

        modelRef.current = model;

        console.log("Loaded form:", form);
        console.log("Loaded model:", modelPath);
      },

      undefined,

      (error) => {
        console.error("Error loading GLB:", error);
      },
    );
  }, [form]);

  return (
    <div className="three-scene">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default ThreeScene;
