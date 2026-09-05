export type AssetCandidate = {
  id: string;
  label: string;
  src: string;
  pack: "kenney-generic-items" | "kenney-character-pack";
};

const KENNEY_MIRROR_COMMIT = "fc2cd355a8e7c1d8e625fd650abf64f50a1fddaa";
const KENNEY_RAW_ROOT = `https://raw.githubusercontent.com/eturner58/game-assets/${KENNEY_MIRROR_COMMIT}/kenney`;
const KENNEY_GENERIC_BASE = `${KENNEY_RAW_ROOT}/2D%20assets/Generic%20Items/PNG/Colored`;
const KENNEY_CHARACTER_BASE = `${KENNEY_RAW_ROOT}/2D%20assets/Character%20Pack`;

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

export const customerPackPreview = `${KENNEY_CHARACTER_BASE}/Preview.png`;
export const customerFacialHairPreview = `${KENNEY_RAW_ROOT}/2D%20assets/Character%20Pack%20Facial%20Hair/Preview.png`;

export const customerFaces: AssetCandidate[] = Array.from({ length: 4 }, (_, index) => ({
  id: `customer-face-${index + 1}`,
  label: `Yüz ${index + 1}`,
  src: `${KENNEY_CHARACTER_BASE}/PNG/Face/Completes/face${index + 1}.png`,
  pack: "kenney-character-pack",
}));

export const customerSkinHeads: AssetCandidate[] = Array.from({ length: 8 }, (_, index) => {
  const tint = index + 1;
  return {
    id: `customer-skin-${tint}`,
    label: `Ten tonu ${tint}`,
    src: `${KENNEY_CHARACTER_BASE}/PNG/Skin/Tint%20${tint}/tint${tint}_head.png`,
    pack: "kenney-character-pack",
  };
});

export const customerHairSamples: AssetCandidate[] = [
  ...Array.from({ length: 8 }, (_, index) => ({
    id: `customer-hair-man-${index + 1}`,
    label: `Erkek saç ${index + 1}`,
    src: `${KENNEY_CHARACTER_BASE}/PNG/Hair/Black/blackMan${index + 1}.png`,
    pack: "kenney-character-pack" as const,
  })),
  ...Array.from({ length: 8 }, (_, index) => ({
    id: `customer-hair-woman-${index + 1}`,
    label: `Kadın saç ${index + 1}`,
    src: `${KENNEY_CHARACTER_BASE}/PNG/Hair/Black/blackWoman${index + 1}.png`,
    pack: "kenney-character-pack" as const,
  })),
];

export const customerShirtSamples: AssetCandidate[] = Array.from({ length: 8 }, (_, index) => ({
  id: `customer-shirt-${index + 1}`,
  label: `Gömlek ${index + 1}`,
  src: `${KENNEY_CHARACTER_BASE}/PNG/Shirts/Blue/blueShirt${index + 1}.png`,
  pack: "kenney-character-pack",
}));

export const assetPackMeta = {
  kenneyGenericItems: {
    name: "Kenney Generic Items",
    license: "CC0 1.0",
    itemCount: 163,
    officialSource: "https://kenney.nl/assets/generic-items",
    mirrorSource: "https://github.com/eturner58/game-assets",
    usage: "Erken oyun eşyaları, aletler, ev eşyaları ve envanter ikonları için aday havuz.",
  },
  kenneyCharacters: {
    name: "Kenney Character Pack",
    license: "CC0 1.0",
    skinTones: 8,
    hairColors: 8,
    facePresets: 4,
    shirtColors: 8,
    usage: "Müşteri, satıcı, tamirci, galerici ve mahalle NPC'lerini modüler üretmek için ana karakter paketi.",
  },
  kenneyFacialHair: {
    name: "Kenney Character Pack Facial Hair",
    license: "CC0 1.0",
    usage: "Sakal ve bıyık varyasyonlarıyla müşteri çeşitliliğini artırmak için ek paket.",
  },
} as const;
