import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const modelCache = new Map();
const pendingLoads = new Map();

export function loadModel(modelPath) {
  if (modelCache.has(modelPath)) {
    return Promise.resolve(modelCache.get(modelPath));
  }

  if (pendingLoads.has(modelPath)) {
    return pendingLoads.get(modelPath);
  }

  const loadPromise = new Promise((resolve, reject) => {
    loader.load(
      modelPath,
      (gltf) => {
        modelCache.set(modelPath, gltf.scene);
        pendingLoads.delete(modelPath);
        resolve(gltf.scene);
      },
      undefined,
      (error) => {
        pendingLoads.delete(modelPath);
        reject(error);
      },
    );
  });

  pendingLoads.set(modelPath, loadPromise);
  return loadPromise;
}

export function preloadModels(modelPaths) {
  modelPaths.forEach((modelPath) => {
    loadModel(modelPath).catch((error) => {
      console.error("Error preloading GLB:", error);
    });
  });
}
