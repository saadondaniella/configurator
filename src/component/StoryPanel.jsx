import { useEffect, useState } from "react";
import "./StoryPanel.css";

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
  onSizePreview,
  onAddToCart,
  resetKey,
}) {
  const formLabels = {
    round: "circle",
    heart: "heart",
    capsule: "oval",
  };

  const colorLabels = {
    red: "red",
    blue: "aqua",
    beige: "cream",
  };

  const [showMoodOptions, setShowMoodOptions] = useState(true);
  const [showFormOptions, setShowFormOptions] = useState(true);
  const [showColorOptions, setShowColorOptions] = useState(true);
  const [showSizeOptions, setShowSizeOptions] = useState(true);

  useEffect(() => {
    setShowMoodOptions(true);
    setShowFormOptions(true);
    setShowColorOptions(true);
    setShowSizeOptions(true);
  }, [resetKey]);

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
    onColorPreview(null);
    setShowSizeOptions(true);
    setShowColorOptions(false);
  }

  function handleSizeSelect(selectedSize) {
    setSize(selectedSize);
    onSizePreview(null);
    setShowSizeOptions(false);
  }

  return (
    <section className="story-panel">
      <p className="story-line story-reveal story-reveal-1">
        Every story is worth telling.
      </p>

      <p className="story-line story-reveal story-reveal-2">
        This particular one began with me needing change. Not really feeling
        like
      </p>

      <p className="story-line story-reveal story-reveal-3">
        myself lately, I was on the lookout for meds and stumbled upon treat™.
      </p>

      {/* MOOD */}
      <div className="story-block story-reveal story-reveal-4">
        <div className="story-line">
          <span>I wanted to</span>

          <div className="mood-choice">
            {!showMoodOptions && (
              <button
                className="text-button selected-value"
                onClick={() => setShowMoodOptions(true)}
              >
                {mood}
              </button>
            )}

            {showMoodOptions && (
              <div className="mood-options">
                <button
                  className="text-button"
                  style={{ order: mood === "wind down" ? -1 : 0 }}
                  onClick={() => handleMoodSelect("wind down")}
                >
                  wind down
                </button>

                <button
                  className="text-button"
                  style={{ order: mood === "get frisky" ? -1 : 0 }}
                  onClick={() => handleMoodSelect("get frisky")}
                >
                  get frisky
                </button>

                <button
                  className="text-button"
                  style={{ order: mood === "be all smiles" ? -1 : 0 }}
                  onClick={() => handleMoodSelect("be all smiles")}
                >
                  be all smiles
                </button>
              </div>
            )}
          </div>

          <span>and found the perfect fit.</span>
        </div>
      </div>

      {mood && (
        <div className="form-selection fade-in">
          <span>Browsing through the options, I finally settled on</span>

          <div className="form-choice">
            {!showFormOptions && (
              <button
                className="text-button selected-value"
                onClick={() => setShowFormOptions(true)}
              >
                {formLabels[form]}
              </button>
            )}

            {showFormOptions && (
              <div className="form-options">
                <button
                  className="text-button"
                  onClick={() => handleFormSelect("capsule")}
                  onMouseEnter={() => onFormPreview("capsule")}
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
                  onClick={() => handleFormSelect("round")}
                  onMouseEnter={() => onFormPreview("round")}
                  onMouseLeave={() => onFormPreview(null)}
                >
                  circle
                </button>
              </div>
            )}
          </div>

          <span>shaped treats.</span>
        </div>
      )}

      {/* COLOR */}
      {form && (
        <div className="color-selection fade-in">
          <div className="story-line">
            <span>
              The pill was almost complete, I just had to choose a beautiful
              color and went for
            </span>{" "}
            <div className="color-choice">
              {!showColorOptions && (
                <button
                  className="text-button selected-value"
                  onClick={() => setShowColorOptions(true)}
                >
                  {colorLabels[color]}
                </button>
              )}

              {showColorOptions && (
                <div className="color-options">
                  <button
                    className="text-button"
                    style={{ order: color === "red" ? -1 : 0 }}
                    onClick={() => handleColorSelect("red")}
                    onMouseEnter={() => onColorPreview("red")}
                    onMouseLeave={() => onColorPreview(null)}
                  >
                    red
                  </button>

                  <button
                    className="text-button"
                    style={{ order: color === "blue" ? -1 : 0 }}
                    onClick={() => handleColorSelect("blue")}
                    onMouseEnter={() => onColorPreview("blue")}
                    onMouseLeave={() => onColorPreview(null)}
                  >
                    aqua
                  </button>

                  <button
                    className="text-button"
                    style={{ order: color === "beige" ? -1 : 0 }}
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
        </div>
      )}

      {/* SIZE */}
      {color && (
        <div className="story-block fade-in">
          <div className="story-line">
            <span>To have a spare or two, I picked the</span>

            <div className="size-choice">
              {!showSizeOptions && (
                <button
                  className="text-button selected-value"
                  onClick={() => setShowSizeOptions(true)}
                >
                  {size}
                </button>
              )}

              {showSizeOptions && (
                <div className="size-options">
                  <button
                    className="text-button"
                    style={{ order: size === "2x3" ? -1 : 0 }}
                    onClick={() => handleSizeSelect("2x3")}
                    onMouseEnter={() => onSizePreview("2x3")}
                    onMouseLeave={() => onSizePreview(null)}
                  >
                    2x3
                  </button>

                  <button
                    className="text-button"
                    style={{ order: size === "2x4" ? -1 : 0 }}
                    onClick={() => handleSizeSelect("2x4")}
                    onMouseEnter={() => onSizePreview("2x4")}
                    onMouseLeave={() => onSizePreview(null)}
                  >
                    2x4
                  </button>

                  <button
                    className="text-button"
                    style={{ order: size === "2x5" ? -1 : 0 }}
                    onClick={() => handleSizeSelect("2x5")}
                    onMouseEnter={() => onSizePreview("2x5")}
                    onMouseLeave={() => onSizePreview(null)}
                  >
                    2x5
                  </button>
                </div>
              )}
            </div>

            <span>pack.</span>
          </div>
        </div>
      )}

      {/* FINAL */}
      {mood && form && color && size && (
        <div className="final-selection fade-in">
          <span>Finally, I</span>

          <button className="cart-button" onClick={onAddToCart}>
            added it to my bag
          </button>
        </div>
      )}
    </section>
  );
}

export default StoryPanel;
