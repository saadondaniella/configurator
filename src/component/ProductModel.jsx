function ProductModel({ color }) {
  return (
    <group>
      <mesh name="Base" position={[0, -0.8, 0]}>
        <boxGeometry args={[2.6, 0.4, 2.6]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      <mesh name="Body" position={[0, 0.2, 0]}>
        <boxGeometry args={[2, 1.6, 2]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh name="Top" position={[0, 1.2, 0]}>
        <boxGeometry args={[1.4, 0.4, 1.4]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

export default ProductModel;
