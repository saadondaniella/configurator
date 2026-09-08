import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ProductModel from "./ProductModel";

function ModelViewer({ color }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 5]} intensity={2} />

      <ProductModel color={color} />

      <OrbitControls />
    </Canvas>
  );
}

export default ModelViewer;
