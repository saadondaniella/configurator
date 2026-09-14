import { useState } from "react";
import StoryPanel from "./component/StoryPanel";
import ThreeScene from "./component/ThreeScene";
import "./App.css";

function App() {
  const [form, setForm] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);

  return (
    <main className="app">
      <StoryPanel
        form={form}
        setForm={setForm}
        color={color}
        setColor={setColor}
        size={size}
        setSize={setSize}
      />

      <ThreeScene form={form} color={color} size={size} />
    </main>
  );
}

export default App;
