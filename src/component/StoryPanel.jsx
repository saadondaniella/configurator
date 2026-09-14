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
        <span>She wanted it to be</span>

        <div className="form-choice">
          {!showFormOptions && (
            <button
              className="text-button"
              onClick={() => setShowFormOptions(true)}
            >
              {form || "Choose"}
            </button>
          )}

          {showFormOptions && (
            <div className="form-options fade-in">
              <button
                className="text-button"
                onClick={() => handleFormSelect("capsule")}
              >
                Capsule
              </button>

              <button
                className="text-button"
                onClick={() => handleFormSelect("round")}
              >
                Round
              </button>

              <button
                className="text-button"
                onClick={() => handleFormSelect("heart")}
              >
                Heart
              </button>
            </div>
          )}
        </div>

        <span>because ordinary shapes were never really her thing.</span>
      </div>

      {form && (
        <div className="color-selection fade-in">
          <span>Of course, it had to be</span>

          <div className="color-choice">
            {!showColorOptions && (
              <button
                className="text-button"
                onClick={() => setShowColorOptions(true)}
              >
                {color || "Choose"}
              </button>
            )}

            {showColorOptions && (
              <div className="color-options fade-in">
                <button
                  className="text-button"
                  onClick={() => handleColorSelect("beige")}
                >
                  Beige
                </button>

                <button
                  className="text-button"
                  onClick={() => handleColorSelect("blue")}
                >
                  Blue
                </button>

                <button
                  className="text-button"
                  onClick={() => handleColorSelect("red")}
                >
                  Red
                </button>
              </div>
            )}
          </div>

          <span>her favorite color.</span>
        </div>
      )}

      {color && (
        <div className="size-selection fade-in">
          <span>And since she liked to be prepared, she chose</span>

          <div className="size-choice">
            {!showSizeOptions && (
              <button
                className="text-button"
                onClick={() => setShowSizeOptions(true)}
              >
                {size || "Choose"}
              </button>
            )}

            {showSizeOptions && (
              <div className="size-options fade-in">
                <button
                  className="text-button"
                  onClick={() => handleSizeSelect("2x3")}
                >
                  2x3
                </button>

                <button
                  className="text-button"
                  onClick={() => handleSizeSelect("2x4")}
                >
                  2x4
                </button>

                <button
                  className="text-button"
                  onClick={() => handleSizeSelect("2x5")}
                >
                  2x5
                </button>
              </div>
            )}
          </div>

          <span>to make sure she had enough.</span>
        </div>
      )}
      {form && color && size && (
        <div className="final-selection fade-in">
          <span>And just like that, her perfect pill was ready.</span>

          <button
            className="cart-button"
            onClick={() => console.log("Add to cart clicked")}
          >
            An I added it to my cart
          </button>
        </div>
      )}
    </section>
  );
}

export default StoryPanel;
