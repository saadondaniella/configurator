import { useState } from "react";
import ModelViewer from "./components/ModelViewer";
import "./App.css";

function App() {
  const [form, setForm] = useState(null);

  return (
    <main className="app">
      <div className="story-panel">
        <h1>Story starts here</h1>

        <button onClick={() => setForm("capsule")}>Capsule</button>
        <button onClick={() => setForm("round")}>Round</button>
        <button onClick={() => setForm("heart")}>Heart</button>
      </div>

      <div className="viewer-panel">
        <ModelViewer form={form} />
      </div>
    </main>
  );
}

export default App;
