import { useState } from "react";
import ModelViewer from "./component/ModelViewer";

function App() {
  const [color, setColor] = useState("orange");

  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", zIndex: 1, padding: "20px" }}>
        <button onClick={() => setColor("orange")}>Orange</button>
        <button onClick={() => setColor("hotpink")}>Pink</button>
        <button onClick={() => setColor("blue")}>Blue</button>
      </div>

      <ModelViewer color={color} />
    </main>
  );
}

export default App;
