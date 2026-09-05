const CITY_REPO_COMMIT = "5cbe208ef7c630f3f54047c7ce75b9b8834a95ad";
const CITY_BASE = `https://raw.githubusercontent.com/GeorgeQLe/assets-2d-city/${CITY_REPO_COMMIT}/assets/kenney/retro-urban-kit`;

function preview(name: string) {
  return `${CITY_BASE}/Previews/${name}.png`;
}

export const worldAssetPacks = {
  retroUrban: {
    name: "Kenney Retro Urban Kit",
    license: "CC0-1.0",
    source: "https://kenney.nl/assets/retro-urban-kit",
    mirror: "https://github.com/GeorgeQLe/assets-2d-city",
    commit: CITY_REPO_COMMIT,
  },
} as const;

export const worldAssets = {
  menuScene: `${CITY_BASE}/Sample.png`,
  cityPreview: `${CITY_BASE}/Preview.png`,

  props: {
    awningSmall: preview("detail-awning-small"),
    awningWide: preview("detail-awning-wide"),
    bench: preview("detail-bench"),
    dumpsterClosed: preview("detail-dumpster-closed"),
    dumpsterOpen: preview("detail-dumpster-open"),
    streetLight: preview("detail-light-single"),
    trafficLight: preview("detail-light-traffic"),
    pallet: preview("pallet"),
    planks: preview("planks"),
    treeLarge: preview("tree-large"),
    treeSmall: preview("tree-small"),
    truckGreen: preview("truck-green"),
    truckGrey: preview("truck-grey"),
  },

  architecture: {
    doorA: preview("door-type-a"),
    doorB: preview("door-type-b"),
    windowA: preview("window-wide-type-a"),
    windowB: preview("window-wide-type-b"),
    garageA: preview("wall-a-garage"),
    garageB: preview("wall-b-garage"),
    wallA: preview("wall-a"),
    wallB: preview("wall-b"),
    roofA: preview("wall-a-roof-detailed"),
    roofB: preview("wall-b-roof-detailed"),
  },

  roads: {
    asphalt: preview("road-asphalt-straight"),
    asphaltDamaged: preview("road-asphalt-damaged"),
    dirt: preview("road-dirt-straight"),
  },
} as const;
