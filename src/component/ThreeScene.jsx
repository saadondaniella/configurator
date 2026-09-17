import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import ProductInfo from "./ProductInfo";
import ViewControls from "./ViewControls";
import {
  CAMERA_VIEWS,
  DEFAULT_CAMERA_POSITION,
  DEFAULT_MODEL_ROTATION,
  DEFAULT_TARGET,
  getModelPath,
} from "./threeSceneConfig";

function ThreeScene({
  onModelReady,
  onIntroStart,
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
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const activeViewRef = useRef(null); // which of the fixed views [1] [2] [3] is selected, null = default
  const latestRequestRef = useRef(0); // tracks the most recent model request

  // RAYCASTER to detect click on the model
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  // Points the camera at one of the fixed views, or back at the default
  // isometric one when no view is selected. The model rotation is left alone
  // so the object always keeps the same "front".
  function applyCameraView(view) {
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!camera || !controls) return;

    camera.position.copy(CAMERA_VIEWS[view] || DEFAULT_CAMERA_POSITION);
    controls.target.copy(DEFAULT_TARGET);
    controls.update();
  }

  function handleViewChange(view) {
    activeViewRef.current = view;
    applyCameraView(view);
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

    cameraRef.current = camera;

    camera.position.copy(DEFAULT_CAMERA_POSITION);
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
    controlsRef.current = controls;

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
        // Clicking the model drops any selected view and goes back to default
        activeViewRef.current = null;

        camera.position.copy(DEFAULT_CAMERA_POSITION);
        controls.target.copy(DEFAULT_TARGET);
        model.rotation.y = DEFAULT_MODEL_ROTATION;
        controls.update();
      }
    }

    function handleCanvasClick() {
      onIntroStart();
    }

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("click", handleCanvasClick);

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

    const resizeObserver = new ResizeObserver(() => handleResize());
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
      canvas.removeEventListener("click", handleCanvasClick);

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

    const modelPath = getModelPath({
      form,
      color,
      size,
      previewForm,
      previewColor,
      previewSize,
    });

    // Remove the previous model immediately so old and new GLBs never overlap
    // while the replacement file is loading.
    if (modelRef.current) {
      scene.remove(modelRef.current);
      modelRef.current = null;
    }

    // Give every request a unique id. Comparing paths alone is not enough when
    // the same file is requested again before an earlier request finishes.
    const requestId = latestRequestRef.current + 1;
    latestRequestRef.current = requestId;

    loader.load(
      modelPath,
      (gltf) => {
        // Ignore this response if a newer request has been made since this
        // one started — otherwise a slow-to-load model could overwrite a
        // model the user has since switched away from.
        if (latestRequestRef.current !== requestId) return;

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

        // KEEP THE SELECTED VIEW
        // A new GLB means a brand new group with the default rotation, so
        // re-assert the camera view the user picked instead of snapping back.
        applyCameraView(activeViewRef.current);

        onModelReady();

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

      <ProductInfo mood={mood} />
    </div>
  );
}

export default ThreeScene;
