import { useEffect, useState } from "react";
import StoryPanel from "./component/StoryPanel";
import ThreeScene from "./component/ThreeScene";
import "./App.css";

function App() {
  const [modelReady, setModelReady] = useState(false);
  const [introLayoutReady, setIntroLayoutReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [mood, setMood] = useState(null);
  const [form, setForm] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [previewForm, setPreviewForm] = useState(null);
  const [previewColor, setPreviewColor] = useState(null);
  const [previewSize, setPreviewSize] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (!modelReady) return undefined;

    const layoutTimer = window.setTimeout(() => {
      setIntroLayoutReady(true);
    }, 300);

    const contentTimer = window.setTimeout(() => {
      setIntroComplete(true);
    }, 2750);

    return () => {
      window.clearTimeout(layoutTimer);
      window.clearTimeout(contentTimer);
    };
  }, [modelReady]);

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
    <main
      className={`app ${introLayoutReady ? "intro-layout-ready" : ""} ${
        introComplete ? "intro-complete" : ""
      }`}
    >
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
        onModelReady={() => setModelReady(true)}
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
