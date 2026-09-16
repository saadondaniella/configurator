import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import ViewControls from "./ViewControls";

function ThreeScene({
  onModelReady,
  mood,
  form,
  color,
  size,
  previewForm,
  previewColor,
  previewSize,
}) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);

  const substanceNames = {
    "wind down": "Serenexin mesylate",
    "get frisky": "Amoxytocin acetate",
    "be all smiles": "Levofelicin hydrochloride",
  };

  // Default-view (isometric) — used at start and when user clicks the model
  const defaultCameraPosition = new THREE.Vector3(3, 3, 3);
  const defaultTarget = new THREE.Vector3(0, 0, 0);
  const DEFAULT_MODEL_ROTATION = Math.PI; // 180° — turns the model so the logo faces forward

  // RAYCASTER to detect click on the model
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function handleViewChange(view) {
    const model = modelRef.current;

    if (!model) return;

    const rotations = {
      1: 0,
      2: Math.PI / 2,
      3: -Math.PI / 2,
    };

    model.rotation.y = rotations[view];
  }

  // SET UP THREE.JS SCENE
  useEffect(() => {
    const canvas = canvasRef.current;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA — orthographic for isometric look
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const frustumSize = 2.5; // controls "zoom" — lower = more zoomed in

    const camera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      1000,
    );

    camera.position.copy(defaultCameraPosition);
    camera.lookAt(0, 0, 0);

    // LIGHTS
    // With an env map, much less direct light is needed — the IBL already
    // provides ambient illumination and reflections. Fewer, asymmetric
    // lights also give shape and depth instead of flattening everything out.

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    // KEY LIGHT — strongest, defines the main direction
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.35);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // FILL LIGHT — weaker, softens the shadows from the key light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.25);
    fillLight.position.set(-5, 2, -3);
    scene.add(fillLight);

    // RIM LIGHT — weak, from behind, creates edge light/separation from the background
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // ENVIRONMENT MAP
    // PMREMGenerator "bakes" a scene into a pre-filtered environment map
    // (mipmaps for different roughness levels) that PBR materials can use for
    // reflections and ambient lighting. RoomEnvironment gives a neutral,
    // studio-like light without needing our own HDRI file.
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;
    pmrem.dispose(); // the generator (the tool) is no longer needed — but the envMap texture it produced lives on

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;

    // TRACK POINTER MOVEMENT TO DISTINGUISH CLICK FROM DRAG/ROTATE
    let pointerDownPos = { x: 0, y: 0 };
    let hasDragged = false;
    const DRAG_THRESHOLD = 5; // pixels — below this counts as a click

    function handlePointerDown(event) {
      pointerDownPos = { x: event.clientX, y: event.clientY };
      hasDragged = false;
    }

    function handlePointerMove(event) {
      const dx = event.clientX - pointerDownPos.x;
      const dy = event.clientY - pointerDownPos.y;
      if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
        hasDragged = true;
      }
    }

    function handlePointerUp(event) {
      if (hasDragged) return; // user was dragging/rotating — no reset

      const model = modelRef.current;
      if (!model) return;

      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);

      const intersects = raycaster.intersectObject(model, true);

      if (intersects.length > 0) {
        camera.position.copy(defaultCameraPosition);
        controls.target.copy(defaultTarget);
        model.rotation.y = DEFAULT_MODEL_ROTATION;
        controls.update();
      }
    }

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);

    // RESIZE
    function handleResize(updateCamera = true) {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      renderer.setSize(width, height, false);

      if (!updateCamera) return;

      const newAspect = width / height;
      camera.left = (-frustumSize * newAspect) / 2;
      camera.right = (frustumSize * newAspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();
    }

    handleResize();

    const resizeObserver = new ResizeObserver(() => handleResize(false));
    resizeObserver.observe(canvas);
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
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);

      controls.dispose();
      envMap.dispose(); // frees the GPU memory used by the PMREM texture
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

    const activeForm = previewForm || form || "heart";

    // DEFAULT COLOR
    const activeColor = previewColor || color || "blue";

    let modelPath;

    const activeSize = previewSize || size;

    // SIZE SELECTED OR HOVERED → SHOW BLISTER
    if (form && color && activeSize && !previewForm && !previewColor) {
      modelPath = `/glb/${formNames[form]}_Pill_${activeSize}_${colorNames[color]}.glb`;
    }

    // NO SIZE → SHOW INDIVIDUAL PILL
    else {
      modelPath = `/glb/${formNames[activeForm]}_Pill_Individual_${colorNames[activeColor]}.glb`;
    }
    loader.load(
      modelPath,
      (gltf) => {
        // REMOVE OLD MODEL
        if (modelRef.current) {
          scene.remove(modelRef.current);
        }

        const model = gltf.scene;

        // Dampen the env map reflection per material — otherwise bright/glossy
        // surfaces can become overexposed regardless of how weak the DirectionalLights are.
        model.traverse((child) => {
          if (child.isMesh && child.material) {
            const materials = Array.isArray(child.material)
              ? child.material
              : [child.material];

            materials.forEach((mat) => {
              if ("envMapIntensity" in mat) {
                mat.envMapIntensity = 0.4;
              }
            });
          }
        });

        // FIND CENTER OF MODEL
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const modelSize = box.getSize(new THREE.Vector3());
        const largestDimension = Math.max(
          modelSize.x,
          modelSize.y,
          modelSize.z,
        );

        // MOVE MODEL SO ITS CENTER IS AT 0, 0, 0
        model.position.sub(center);

        // CREATE A CENTERED GROUP
        const modelGroup = new THREE.Group();

        modelGroup.add(model);
        modelGroup.scale.setScalar(2 / largestDimension);
        modelGroup.rotation.y = DEFAULT_MODEL_ROTATION;
        scene.add(modelGroup);

        // SAVE THE GROUP IN THE REF
        modelRef.current = modelGroup;
        onModelReady();

        console.log("Loaded form:", activeForm);
        console.log("Loaded color:", activeColor);
        console.log("Loaded size:", activeSize);
        console.log("Loaded model:", modelPath);
      },

      undefined,

      (error) => {
        console.error("Error loading GLB:", error);
        onModelReady();
      },
    );
  }, [form, color, size, previewForm, previewColor, previewSize]);

  return (
    <div className="three-scene">
      <canvas ref={canvasRef}></canvas>

      <ViewControls onViewChange={handleViewChange} />

      {mood && (
        <div className="product-info">
          <p>
            DEVELOPER treat™. PRINCIPAL INVESTIGATOR Dr. Clara Wallin. ACTIVE
            SUBSTANCE {substanceNames[mood]} 400 mg. PHARMACEUTICAL DEVELOPMENT
            Treat Sweden AB, Göteborg. CONTRACT MANUFACTURER/PACKAGING
            Recipharm, Uppsala. DELIVERY MECHANISM Osmotic-controlled release
            oral delivery system (OROS). CORE Microcrystalline cellulose,
            colloidal anhydrous silica, magnesium stearate. COATING Aqueous
            film-coating in warm yellow (iron oxide E172, titanium dioxide
            E171), polished with purified carnauba wax. GEOMETRY Round, biconvex
            with beveled edges and central break-score. DEBOSSING »L-25« on
            upper face, smooth reverse. DIMENSIONS Diameter 8.2 mm, thickness
            3.6 mm, net weight 215 mg. BLISTER Aluminium foil with triplex
            laminate moisture barrier, calendar marking in Karlo Sans 5 pt.
            CARTON Recycled unbleached liner 280 g/m² with tactile Braille.
            QUANTITY 30 extended-release tablets. PRICE 149 SEK. BATCH SE-88301.
            VNR 419 820.
          </p>
        </div>
      )}
    </div>
  );
}

export default ThreeScene;
