import { useState } from "react";
import StoryPanel from "./component/StoryPanel";
import ThreeScene from "./component/ThreeScene";
import "./App.css";

function App() {
  const [mood, setMood] = useState(null);
  const [form, setForm] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [previewForm, setPreviewForm] = useState(null);
  const [previewColor, setPreviewColor] = useState(null);
  const [previewSize, setPreviewSize] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  function handleReset() {
    setMood(null);
    setForm(null);
    setColor(null);
    setSize(null);
    setPreviewForm(null);
    setPreviewColor(null);
    setPreviewSize(null);
    setResetKey((currentKey) => currentKey + 1);
  }

  return (
    <main className="app">
      <button
        className="app-logo-button"
        type="button"
        aria-label="Start over"
        onClick={handleReset}
      >
        <img className="app-logo" src="/logo/treat-logo.png" alt="treat" />
      </button>

      <StoryPanel
        mood={mood}
        setMood={setMood}
        form={form}
        setForm={setForm}
        color={color}
        setColor={setColor}
        size={size}
        setSize={setSize}
        onFormPreview={setPreviewForm}
        onColorPreview={setPreviewColor}
        onSizePreview={setPreviewSize}
        resetKey={resetKey}
      />

      <ThreeScene
        mood={mood}
        form={form}
        color={color}
        size={size}
        previewForm={previewForm}
        previewColor={previewColor}
        previewSize={previewSize}
      />
    </main>
  );
}

export default App;
