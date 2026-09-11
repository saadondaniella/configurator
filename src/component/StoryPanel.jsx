import { useState } from "react";

function StoryPanel({ form, setForm, color, setColor }) {
  const [showFormOptions, setShowFormOptions] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);

  function handleFormSelect(selectedForm) {
    setForm(selectedForm);
    setShowFormOptions(false);
  }

  function handleColorSelect(selectedColor) {
    setColor(selectedColor);
    setShowColorOptions(false);
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

      {form && (
        <>
          <p>
            Perfect. Now she needed it to be{" "}
            <button onClick={() => setShowColorOptions(!showColorOptions)}>
              {color || "Choose"}
            </button>
          </p>

          {showColorOptions && (
            <div className="color-options">
              <button onClick={() => handleColorSelect("beige")}>Beige</button>

              <button onClick={() => handleColorSelect("blue")}>Blue</button>

              <button onClick={() => handleColorSelect("red")}>Red</button>
            </div>
          )}
        </>
      )}

      {color && <p>Now she needed to choose the size.</p>}
    </section>
  );
}

export default StoryPanel;
