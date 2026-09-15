import { useState } from "react";

function StoryPanel({
  mood,
  setMood,
  form,
  setForm,
  color,
  setColor,
  size,
  setSize,
  onFormPreview,
  onColorPreview,
}) {
  const [showMoodOptions, setShowMoodOptions] = useState(true);
  const [showFormOptions, setShowFormOptions] = useState(true);
  const [showColorOptions, setShowColorOptions] = useState(true);
  const [showSizeOptions, setShowSizeOptions] = useState(true);

  function handleMoodSelect(selectedMood) {
    setMood(selectedMood);
    setShowMoodOptions(false);
  }

  function handleFormSelect(selectedForm) {
    setForm(selectedForm);
    onFormPreview(null);
    setShowFormOptions(false);
  }

  function handleColorSelect(selectedColor) {
    setColor(selectedColor);
    setSize(null);
    onColorPreview(null);
    setShowSizeOptions(true);
    setShowColorOptions(false);
  }

  function handleSizeSelect(selectedSize) {
    setSize(selectedSize);
    setShowSizeOptions(false);
  }

  return (
    <section className="story-panel">
      <p>Every story is worth telling.</p>

      <p>
        This particular one began with me needing change. Not really feeling
        like myself lately, I was on the lookout for meds and stumbled upon
        treat™.
      </p>

      {/* MOOD */}
      <div className="mood-selection">
        <span>I wanted to</span>

        <div className="mood-choice">
          {!showMoodOptions && (
            <button
              className="text-button"
              onClick={() => setShowMoodOptions(true)}
            >
              {mood}
            </button>
          )}

          {showMoodOptions && (
            <div className="mood-options fade-in">
              <button
                className="text-button"
                onClick={() => handleMoodSelect("wind down")}
              >
                wind down
              </button>

              <button
                className="text-button"
                onClick={() => handleMoodSelect("get frisky")}
              >
                get frisky
              </button>

              <button
                className="text-button"
                onClick={() => handleMoodSelect("be all smiles")}
              >
                be all smiles
              </button>
            </div>
          )}
        </div>

        <span>and found the perfect fit.</span>
      </div>

      {/* FORM */}
      {mood && (
        <div className="form-selection fade-in">
          <span>Browsing through the</span>

          <div className="form-choice">
            {!showFormOptions && (
              <button
                className="text-button"
                onClick={() => setShowFormOptions(true)}
              >
                {form}
              </button>
            )}

            {showFormOptions && (
              <div className="form-options fade-in">
                <button
                  className="text-button"
                  onClick={() => handleFormSelect("round")}
                  onMouseEnter={() => onFormPreview("round")}
                  onMouseLeave={() => onFormPreview(null)}
                >
                  oval
                </button>

                <button
                  className="text-button"
                  onClick={() => handleFormSelect("heart")}
                  onMouseEnter={() => onFormPreview("heart")}
                  onMouseLeave={() => onFormPreview(null)}
                >
                  heart
                </button>

                <button
                  className="text-button"
                  onClick={() => handleFormSelect("capsule")}
                  onMouseEnter={() => onFormPreview("capsule")}
                  onMouseLeave={() => onFormPreview(null)}
                >
                  circle
                </button>
              </div>
            )}
          </div>

          <span>
            options, I finally settled on {form || "a"} shaped treat. The pill
            was almost complete.
          </span>
        </div>
      )}

      {/* COLOR */}
      {form && (
        <div className="color-selection fade-in">
          <span>I just had to choose a beautiful color and went for</span>

          <div className="color-choice">
            {!showColorOptions && (
              <button
                className="text-button"
                onClick={() => setShowColorOptions(true)}
              >
                {color}
              </button>
            )}

            {showColorOptions && (
              <div className="color-options fade-in">
                <button
                  className="text-button"
                  onClick={() => handleColorSelect("red")}
                  onMouseEnter={() => onColorPreview("red")}
                  onMouseLeave={() => onColorPreview(null)}
                >
                  red
                </button>

                <button
                  className="text-button"
                  onClick={() => handleColorSelect("blue")}
                  onMouseEnter={() => onColorPreview("blue")}
                  onMouseLeave={() => onColorPreview(null)}
                >
                  aqua
                </button>

                <button
                  className="text-button"
                  onClick={() => handleColorSelect("beige")}
                  onMouseEnter={() => onColorPreview("beige")}
                  onMouseLeave={() => onColorPreview(null)}
                >
                  cream
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SIZE */}
      {color && (
        <div className="size-selection fade-in">
          <span>To have a spare or two, I picked the</span>

          <div className="size-choice">
            {!showSizeOptions && (
              <button
                className="text-button"
                onClick={() => setShowSizeOptions(true)}
              >
                {size}
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

          <span>pack.</span>
        </div>
      )}

      {/* FINAL */}
      {mood && form && color && size && (
        <div className="final-selection fade-in">
          <span>Finally, I</span>

          <button
            className="cart-button"
            onClick={() => console.log("Add to bag clicked")}
          >
            added it to my bag
          </button>
        </div>
      )}
    </section>
  );
}

export default StoryPanel;
