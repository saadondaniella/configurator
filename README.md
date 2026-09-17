# treat™ — 3D Pill Configurator

A step-by-step, story-driven 3D product configurator built for the **DD CG WU** course — a 2-week cross-program project. Users are guided through a short narrative ("Every story is worth telling...") while picking a mood, pill shape, color, and pack size, watching a live 3D model update at each step.

**Live dev server:** `localhost:5173` (Vite)

---

## Team & roles

This was a cross-program collaboration between three disciplines:

| Role | Person | Responsibility |
|---|---|---|
| **WU (Web Development)** | Daniella, Allan | React app, state management, Three.js integration, configurator logic |
| **DD (Digital Design)** | Matilda, Anton | Figma design, configurator flow/UX, visual polish spec |
| **CG (Computer Graphics)** | Jonatan | 3D modeling in Blender, GLB exports for all shape/color/size combinations |

Each program contributed its specialty: CG modeled the product, DD designed the interaction, WU built the working site.

---

## Tech stack

- **React** — UI and state (`App.jsx`, `StoryPanel.jsx`)
- **Vanilla Three.js** (`three/addons`) — 3D rendering, wired up manually inside a `useEffect` (not react-three-fiber)
  - `GLTFLoader` — loads per-variant `.glb` files
  - `OrbitControls` — camera rotation
  - `RoomEnvironment` + `PMREMGenerator` — studio-style image-based lighting
  - `OrthographicCamera` — isometric look
- **Vite** — dev server / build tool

---

## Project structure

public/
glb/ → all product 3D model variants (see naming convention below)
backgrounds/
favicon/
logo/
src/
component/
ThreeScene.jsx → Three.js scene setup + model loading/switching
ViewControls.jsx → [1] [2] [3] rotation buttons
StoryPanel.jsx → the narrative text + choice UI (mood/form/color/size)
StoryPanel.css
AddToCartPopup.jsx → confirmation popup after adding to bag
AddToCartPopup.css
App.jsx → top-level state (mood, form, color, size, previews) + reset
App.css
main.jsx


---

## How the configurator works

1. **Mood** → `wind down` / `get frisky` / `be all smiles` (affects the printed product-info text only, not the 3D model)
2. **Form** → `heart` / `round` (circle) / `capsule` (oval)
3. **Color** → `red` / `blue` (aqua) / `beige` (cream)
4. **Size** → `2x3` / `2x4` / `2x5` (pack size)
5. **Add to bag**

Each choice is held in `App.jsx` state and passed down to `ThreeScene`, which reacts to `form` + `color` + `size` (and their `preview*` counterparts, used for hover-previews before a choice is committed) by loading the matching `.glb` file.

### GLB naming convention

/glb/{Shape}Pill_Individual{Color}.glb → single pill (used before a size is picked, and on hover-preview)
/glb/{Shape}Pill{Size}_{Color}.glb → full blister pack (used once form+color+size are all committed)

Example: `Heart_Pill_2x4_Red.glb`

---


## Getting started

```bash
git clone https://github.com/AllanTran90/configurator.git
cd konfiguratorn
npm install
npm run dev

```

Then open `localhost:5173`.

---

## Author
- **Daniella** — WU
- **Allan** — WU
- **Matilda** — DD
- **Anton** — DD
- **Jonatan** — CG