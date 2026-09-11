import { useState } from "react";
import StoryPanel from "./component/StoryPanel";
import ThreeScene from "./component/ThreeScene";
import "./App.css";

function App() {
  const [form, setForm] = useState(null);

  return (
    <main className="app">
      <StoryPanel form={form} setForm={setForm} />
      <ThreeScene form={form} />
    </main>
  );
}

export default App;
