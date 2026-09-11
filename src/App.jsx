import { useState } from "react";
import ModelViewer from "./component/ModelViewer";

function App() {
  const [shape, setShape] = useState("Round");
  const [size, setSize] = useState("2x3");
  const [color, setColor] = useState("Beige");

  const modelPath = `/models/${shape}_Pill_${size}_${color}.glb`;

  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", zIndex: 1, padding: "20px" }}>
        <div>
          <button onClick={() => setShape("Round")}>Round</button>
          <button onClick={() => setShape("Heart")}>Heart</button>
          <button onClick={() => setShape("Capsule")}>Capsule</button>
        </div>

        <div>
          <button onClick={() => setSize("2x3")}>2x3</button>
          <button onClick={() => setSize("2x4")}>2x4</button>
          <button onClick={() => setSize("2x5")}>2x5</button>
        </div>

        <div>
          <button onClick={() => setColor("Beige")}>Beige</button>
          <button onClick={() => setColor("Blue")}>Blue</button>
          <button onClick={() => setColor("Red")}>Red</button>
        </div>
      </div>

      <ModelViewer shape={shape} size={size} color={color} modelPath={modelPath} />
    </main>
  );
}

export default App;