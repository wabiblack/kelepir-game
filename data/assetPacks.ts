export type AssetCandidate = {
  id: string;
  label: string;
  src: string;
  pack: "kenney-generic-items";
};

const KENNEY_MIRROR_COMMIT = "fc2cd355a8e7c1d8e625fd650abf64f50a1fddaa";
const KENNEY_GENERIC_BASE = `https://raw.githubusercontent.com/eturner58/game-assets/${KENNEY_MIRROR_COMMIT}/kenney/2D%20assets/Generic%20Items/PNG/Colored`;

export const kenneyGenericItems: AssetCandidate[] = Array.from(
  { length: 163 },
  (_, index) => {
    const number = String(index + 1).padStart(3, "0");

    return {
      id: `kenney-generic-${number}`,
      label: `Generic Item ${number}`,
      src: `${KENNEY_GENERIC_BASE}/genericItem_color_${number}.png`,
      pack: "kenney-generic-items",
    };
  },
);

export const assetPackMeta = {
  kenneyGenericItems: {
    name: "Kenney Generic Items",
    license: "CC0 1.0",
    itemCount: 163,
    officialSource: "https://kenney.nl/assets/generic-items",
    mirrorSource: "https://github.com/eturner58/game-assets",
    usage: "Erken oyun eşyaları, aletler, ev eşyaları ve envanter ikonları için aday havuz.",
  },
} as const;
