import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function ModelViewer() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 5]} intensity={2} />

      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
}

export default ModelViewer;
