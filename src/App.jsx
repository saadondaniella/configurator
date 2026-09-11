import { useState } from "react";
import StoryPanel from "./component/StoryPanel";
import ThreeScene from "./component/ThreeScene";
import "./App.css";

function App() {
  const [form, setForm] = useState(null);
  const [color, setColor] = useState(null);

  return (
    <main className="app">
      <StoryPanel
        form={form}
        setForm={setForm}
        color={color}
        setColor={setColor}
      />
      <ThreeScene form={form} />
    </main>
  );
}

export default App;
