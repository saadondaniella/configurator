import { SUBSTANCE_NAMES } from "./threeSceneConfig";

function ProductInfo({ mood }) {
  if (!mood) return null;

  return (
    <div className="product-info">
      <p>
        DEVELOPER treat™. PRINCIPAL INVESTIGATOR Dr. Clara Wallin. ACTIVE
        SUBSTANCE {SUBSTANCE_NAMES[mood]} 400 mg. PHARMACEUTICAL DEVELOPMENT
        Treat Sweden AB, Göteborg. CONTRACT MANUFACTURER/PACKAGING Recipharm,
        Uppsala. DELIVERY MECHANISM Osmotic-controlled release oral delivery
        system (OROS). CORE Microcrystalline cellulose, colloidal anhydrous
        silica, magnesium stearate. COATING Aqueous film-coating in warm yellow
        (iron oxide E172, titanium dioxide E171), polished with purified
        carnauba wax. GEOMETRY Round, biconvex with beveled edges and central
        break-score. DEBOSSING »L-25« on upper face, smooth reverse. DIMENSIONS
        Diameter 8.2 mm, thickness 3.6 mm, net weight 215 mg. BLISTER Aluminium
        foil with triplex laminate moisture barrier, calendar marking in Karlo
        Sans 5 pt. CARTON Recycled unbleached liner 280 g/m² with tactile
        Braille. QUANTITY 30 extended-release tablets. PRICE 149 SEK. BATCH
        SE-88301. VNR 419 820.
      </p>
    </div>
  );
}

export default ProductInfo;
