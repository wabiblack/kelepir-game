export const pixelAssetSources = {
  brysiaRooms: {
    name: "Pixel Cartoon Rooms",
    author: "Brysia",
    source: "https://brysiaa.itch.io/pixel-cartoon-rooms",
    licenseNote: "Free for personal and commercial projects; edits allowed; do not resell or redistribute the asset files.",
  },
  grafxKidCity: {
    name: "City Mega Pack",
    author: "GrafxKid",
    source: "https://opengameart.org/content/city-mega-pack",
    license: "CC0-1.0",
  },
  airosElectronics: {
    name: "32px Electronics",
    author: "Airos",
    source: "https://opengameart.org/content/32px-electronics",
    license: "CC0-1.0",
  },
} as const;

export const pixelAssets = {
  room: {
    // Brysia's second side-view room example is preferred. The first example is a
    // verified fallback so the room never drops back to the old isometric art.
    scene: "https://img.itch.zone/aW1nLzExNjI3NDA5LnBuZw%3D%3D/original/n%2FjGoX.png",
    fallbackScene: "https://img.itch.zone/aW1nLzExNjI3NDAzLnBuZw%3D%3D/original/uLd%2F7t.png",
  },
  city: {
    megaSheet: "https://opengameart.org/sites/default/files/CITY_MEGA.png",
  },
  electronics: {
    miscSheet: "https://opengameart.org/sites/default/files/misc_electronics_sheet_0.png",
  },
} as const;
