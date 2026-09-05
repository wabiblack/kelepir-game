export const pixelAssetSources = {
  crazyDuckBedroom: {
    name: "Bedroom - Day of the Tentacle style",
    author: "crazyduckgames",
    source: "https://opengameart.org/content/bedroom-day-of-the-tentacle-style",
    license: "CC-BY-SA-4.0 / CC-BY-SA-3.0",
    attribution: "https://crazy-duck-games.itch.io/",
  },
  openPixelProject: {
    name: "OPP 2017 - Village and room",
    author: "Open Pixel Project",
    source: "https://openpixelproject.itch.io/opp2017village",
    license: "Public Domain / CC0",
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
    // Direct static image URLs only. The previous itch.zone hotlinks could expire
    // and produced a broken-image screen on iOS Safari.
    scene: "https://opengameart.org/sites/default/files/bedroom.png",
    fallbackScene: "https://www.openpixelproject.com/wp-content/uploads/room01.png",
  },
  city: {
    megaSheet: "https://opengameart.org/sites/default/files/CITY_MEGA.png",
  },
  electronics: {
    miscSheet: "https://opengameart.org/sites/default/files/misc_electronics_sheet_0.png",
  },
} as const;
