import { useState } from "react";
import StoryPanel from "./component/StoryPanel";
import ThreeScene from "./component/ThreeScene";
import "./App.css";

function App() {
  const [form, setForm] = useState(null);
  const [color, setColor] = useState(null);
  const [step, setStep] = useState(1);

  return (
    <>
      <div className="step-layout">
        <span className="step step-current">{step}</span>
        <span className="step step-prev">{step > 1 ? step - 1 : ""}</span>
        <span className="step step-next">{step < 3 ? step + 1 : ""}</span>
      </div>

      <main className="app">
        <StoryPanel
          form={form}
          setForm={setForm}
          color={color}
          setColor={setColor}
          step={step}
          setStep={setStep}
        />
        <ThreeScene form={form} />
      </main>
    </>
  );
}
export default App;
