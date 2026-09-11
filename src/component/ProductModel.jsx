import { useGLTF } from "@react-three/drei";

function ProductModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);

  return <primitive object={scene} />;
}

export default ProductModel;