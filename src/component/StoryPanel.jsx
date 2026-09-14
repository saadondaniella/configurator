import { useState } from "react";

function StoryPanel({ form, setForm, color, setColor, size, setSize }) {
  const [showFormOptions, setShowFormOptions] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [showSizeOptions, setShowSizeOptions] = useState(false);

  function handleFormSelect(selectedForm) {
    setForm(selectedForm);
    setShowFormOptions(false);
  }

  function handleColorSelect(selectedColor) {
    setColor(selectedColor);
    setShowColorOptions(false);
  }

  function handleSizeSelect(selectedSize) {
    setSize(selectedSize);
    setShowSizeOptions(false);
  }

  return (
    <section className="story-panel">
      <p>Once upon a time, there was a girl who needed a pill.</p>

      <div className="form-selection">
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
      </div>

      {form && (
        <div className="color-selection">
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
        </div>
      )}

      {color && (
        <div className="size-selection">
          <p>
            Now she needed to choose the size{" "}
            <button onClick={() => setShowSizeOptions(!showSizeOptions)}>
              {size || "Choose"}
            </button>
          </p>

          {showSizeOptions && (
            <div className="size-options">
              <button onClick={() => handleSizeSelect("2x3")}>2x3</button>

              <button onClick={() => handleSizeSelect("2x4")}>2x4</button>

              <button onClick={() => handleSizeSelect("2x5")}>2x5</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default StoryPanel;
