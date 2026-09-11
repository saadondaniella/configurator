import { useState } from "react";

function StoryPanel({ form, setForm }) {
  const [showFormOptions, setShowFormOptions] = useState(false);

  function handleFormSelect(selectedForm) {
    setForm(selectedForm);
    setShowFormOptions(false);
  }

  return (
    <section className="story-panel">
      <p>Once upon a time, there was a girl who needed a pill.</p>

      <p>
        She wanted it to be{" "}
        <button onClick={() => setShowFormOptions(!showFormOptions)}>
          {form || "Choose"}
        </button>
      </p>

      {showFormOptions && (
        <div className="form-options">
          <button onClick={() => handleFormSelect("capsule")}>Capsule</button>

          <button onClick={() => handleFormSelect("round")}>Round</button>

          <button onClick={() => handleFormSelect("heart")}>Heart</button>
        </div>
      )}

      {form && <p>Perfect. Now she needed to choose a color.</p>}
    </section>
  );
}

export default StoryPanel;
