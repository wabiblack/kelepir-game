export type MarketCategory =
  | "Elektronik"
  | "Alet"
  | "Ev eşyası"
  | "Hobi"
  | "Bisiklet";

export type ItemCondition = "Yıpranmış" | "Orta" | "İyi" | "Temiz";
export type IssueSeverity = "none" | "minor" | "major";

export type MarketItemTemplate = {
  id: string;
  name: string;
  category: MarketCategory;
  baseValue: number;
  description: string;
  assetQuery: string;
};

export type MarketOffer = {
  id: string;
  templateId: string;
  name: string;
  category: MarketCategory;
  description: string;
  seller: string;
  askingPrice: number;
  minimumPrice: number;
  expectedValue: number;
  condition: ItemCondition;
  issueSeverity: IssueSeverity;
  issueText: string;
  inspected: boolean;
  patience: number;
};

export type InventoryItem = {
  id: string;
  templateId: string;
  name: string;
  category: MarketCategory;
  condition: ItemCondition;
  purchasePrice: number;
  expectedValue: number;
  issueSeverity: IssueSeverity;
  issueText: string;
  inspected: boolean;
  acquiredAt: string;
};

export type LedgerEntry = {
  id: string;
  type: "buy" | "sell";
  itemName: string;
  amount: number;
  profit?: number;
  label: string;
};

export const MARKET_CATALOG_2002: MarketItemTemplate[] = [
  {
    id: "portable-radio",
    name: "Taşınabilir radyo",
    category: "Elektronik",
    baseValue: 85,
    description: "Pilli küçük radyo. Anteni ve pil yatağı kontrol edilmeli.",
    assetQuery: "portable radio",
  },
  {
    id: "corded-phone",
    name: "Kablolu masa telefonu",
    category: "Elektronik",
    baseValue: 70,
    description: "Ev tipi tuşlu telefon. Ahize kablosu en sık sorun çıkaran parça.",
    assetQuery: "corded telephone",
  },
  {
    id: "desktop-speakers",
    name: "İkili bilgisayar hoparlörü",
    category: "Elektronik",
    baseValue: 95,
    description: "Masaüstü bilgisayar için küçük hoparlör çifti.",
    assetQuery: "computer speakers",
  },
  {
    id: "corded-gamepad",
    name: "Kablolu oyun kolu",
    category: "Hobi",
    baseValue: 75,
    description: "Eski tip PC ve oyun sistemlerinde kullanılan kablolu kontrolcü.",
    assetQuery: "wired gamepad",
  },
  {
    id: "film-camera",
    name: "Analog fotoğraf makinesi",
    category: "Hobi",
    baseValue: 150,
    description: "Filmli kompakt makine. Flaş ve pil kapağı önemli.",
    assetQuery: "film camera",
  },
  {
    id: "corded-drill",
    name: "Kablolu matkap",
    category: "Alet",
    baseValue: 180,
    description: "Ev tipi matkap. Mandren, kablo ve kömür sesi kontrol edilmeli.",
    assetQuery: "corded drill",
  },
  {
    id: "metal-toolbox",
    name: "Metal takım çantası",
    category: "Alet",
    baseValue: 110,
    description: "İçi karışık el aletleriyle dolu eski metal çanta.",
    assetQuery: "metal toolbox",
  },
  {
    id: "desk-lamp",
    name: "Masa lambası",
    category: "Ev eşyası",
    baseValue: 55,
    description: "Ayarlanabilir kollu masa lambası. Kablo ve duy kontrol edilmeli.",
    assetQuery: "desk lamp",
  },
  {
    id: "kitchen-scale",
    name: "Mutfak tartısı",
    category: "Ev eşyası",
    baseValue: 65,
    description: "Mekanik mutfak tartısı. İbre sıfıra dönüyor mu bakılmalı.",
    assetQuery: "kitchen scale",
  },
  {
    id: "bike-pump",
    name: "Bisiklet pompası",
    category: "Bisiklet",
    baseValue: 45,
    description: "Ayaklı eski pompa. Hortum ve conta kaçak yapabiliyor.",
    assetQuery: "bicycle pump",
  },
];

const sellerNames = [
  "Hüseyin Abi",
  "Naciye Hanım",
  "Turgut Usta",
  "Erol",
  "Sevim Hanım",
  "Cemil",
  "Kadir Abi",
  "Figen Hanım",
];

const conditions: Array<{ label: ItemCondition; valueFactor: number; priceFactor: number }> = [
  { label: "Yıpranmış", valueFactor: 0.62, priceFactor: 0.38 },
  { label: "Orta", valueFactor: 0.78, priceFactor: 0.52 },
  { label: "İyi", valueFactor: 0.92, priceFactor: 0.64 },
  { label: "Temiz", valueFactor: 1.06, priceFactor: 0.74 },
];

const issues: Array<{ severity: IssueSeverity; factor: number; text: string }> = [
  { severity: "none", factor: 1, text: "Belirgin bir arıza izi yok." },
  { severity: "none", factor: 1, text: "İlk kontrolde ciddi kusur görünmüyor." },
  { severity: "minor", factor: 0.82, text: "Küçük bakım veya parça masrafı çıkarabilir." },
  { severity: "minor", factor: 0.78, text: "Temassızlık ya da kozmetik parça sorunu ihtimali var." },
  { severity: "major", factor: 0.52, text: "Çalışma durumunda ciddi risk var. Tamir masrafı yüksek olabilir." },
];

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function round5(value: number) {
  return Math.max(5, Math.round(value / 5) * 5);
}

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function generateMarketOffers(count = 4): MarketOffer[] {
  const shuffled = [...MARKET_CATALOG_2002].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count).map((template) => {
    const condition = pick(conditions);
    const issue = pick(issues);
    const expectedValue = round5(template.baseValue * condition.valueFactor * issue.factor * (0.92 + Math.random() * 0.2));
    const askingPrice = round5(template.baseValue * condition.priceFactor * (0.85 + Math.random() * 0.28));
    const flexibility = 0.08 + Math.random() * 0.2;

    return {
      id: uid("offer"),
      templateId: template.id,
      name: template.name,
      category: template.category,
      description: template.description,
      seller: pick(sellerNames),
      askingPrice,
      minimumPrice: round5(askingPrice * (1 - flexibility)),
      expectedValue,
      condition: condition.label,
      issueSeverity: issue.severity,
      issueText: issue.text,
      inspected: false,
      patience: 2 + Math.floor(Math.random() * 2),
    };
  });
}

export function inspectMarketOffer(offer: MarketOffer): MarketOffer {
  return { ...offer, inspected: true };
}

export function makeInventoryItem(offer: MarketOffer, paidPrice: number, acquiredAt: string): InventoryItem {
  return {
    id: uid("stock"),
    templateId: offer.templateId,
    name: offer.name,
    category: offer.category,
    condition: offer.condition,
    purchasePrice: paidPrice,
    expectedValue: offer.expectedValue,
    issueSeverity: offer.issueSeverity,
    issueText: offer.issueText,
    inspected: offer.inspected,
    acquiredAt,
  };
}

export function generateBuyerOffer(item: InventoryItem) {
  const knowledgePenalty = item.issueSeverity === "major" ? 0.84 : item.issueSeverity === "minor" ? 0.94 : 1;
  return round5(item.expectedValue * knowledgePenalty * (0.9 + Math.random() * 0.28));
}

export function makeLedgerEntry(
  type: LedgerEntry["type"],
  itemName: string,
  amount: number,
  label: string,
  profit?: number,
): LedgerEntry {
  return {
    id: uid("ledger"),
    type,
    itemName,
    amount,
    profit,
    label,
  };
}
