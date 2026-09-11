import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ProductModel from "./ProductModel";

function ModelViewer({ color, shape, size, modelPath }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 5]} intensity={2} />

      <ProductModel color={color} shape={shape} size={size} modelPath={modelPath} />

      <OrbitControls minDistance={2} maxDistance={8} />
    </Canvas>
  );
}

export default ModelViewer;
