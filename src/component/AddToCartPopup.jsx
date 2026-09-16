import "./AddToCartPopup.css";
import { useState } from "react";

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

function AddToCartPopup({ mood, form, color, size, isOpen }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const choices = [
    ["Objective", mood],
    ["Shape", formLabels[form]],
    ["Color", colorLabels[color]],
    ["Amount", size],
  ];

  return (
    <aside
      className={`add-to-cart-popup ${isOpen ? "add-to-cart-popup--open" : ""} ${
        isCollapsed ? "add-to-cart-popup--collapsed" : ""
      }`}
      aria-label="Your treat choices"
      onClick={() => setIsCollapsed(true)}
      onMouseEnter={() => setIsCollapsed(false)}
    >
      <div className="add-to-cart-popup__content">
        <p className="add-to-cart-popup__title">Treat™</p>

        <dl className="add-to-cart-popup__choices">
          {choices.map(([label, value]) => (
            <div className="add-to-cart-popup__choice" key={label}>
              <dt>{label}</dt>
              <dd>{value || "-"}</dd>
            </div>
          ))}
        </dl>

        <div className="add-to-cart-popup__total">
          <span>Total</span>
          <span>149 SEK</span>
        </div>

        <button
          className="add-to-cart-popup__button"
          type="button"
          onClick={() => console.log("Proceed to checkout clicked")}
        >
          Proceed to checkout
        </button>
      </div>
    </aside>
  );
}

export default AddToCartPopup;
