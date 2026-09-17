import * as THREE from "three";

export const DEFAULT_CAMERA_POSITION = new THREE.Vector3(3, 3, 3);
export const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0);
export const DEFAULT_MODEL_ROTATION = Math.PI;

const VIEW_DISTANCE = 5;

export const CAMERA_VIEWS = {
  1: new THREE.Vector3(0, 0, -VIEW_DISTANCE),
  2: new THREE.Vector3(VIEW_DISTANCE, 0, 0),
  3: new THREE.Vector3(0, 0, VIEW_DISTANCE),
};

export const FORM_NAMES = {
  capsule: "Capsule",
  round: "Round",
  heart: "Heart",
};

export const COLOR_NAMES = {
  beige: "Beige",
  blue: "Blue",
  red: "Red",
};

export const SUBSTANCE_NAMES = {
  "wind down": "Serenexin mesylate",
  "get frisky": "Amoxytocin acetate",
  "be all smiles": "Levofelicin hydrochloride",
};

export function getModelPath({
  form,
  color,
  size,
  previewForm,
  previewColor,
  previewSize,
}) {
  const activeForm = previewForm || form || "heart";
  const activeColor = previewColor || color || "blue";
  const activeSize = previewSize || size;

  if (form && color && activeSize && !previewForm && !previewColor) {
    return `/glb/${FORM_NAMES[form]}_Pill_${activeSize}_${COLOR_NAMES[color]}.glb`;
  }

  return `/glb/${FORM_NAMES[activeForm]}_Pill_Individual_${COLOR_NAMES[activeColor]}.glb`;
}
