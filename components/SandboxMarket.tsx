"use client";

import { useEffect, useMemo, useState } from "react";
import {
  customerFaces,
  customerHairSamples,
  customerShirtSamples,
  customerSkinHeads,
} from "@/data/assetPacks";
import { worldAssets } from "@/data/worldAssets";
import {
  generateBuyerOffer,
  generateMarketOffers,
  inspectMarketOffer,
  makeInventoryItem,
  makeLedgerEntry,
  type InventoryItem,
  type LedgerEntry,
  type MarketOffer,
} from "@/lib/economy";
import styles from "./SandboxMarket.module.css";

type Props = {
  money: number;
  onMoneyChange: (nextMoney: number) => void;
  onLeave: () => void;
};

type Tab = "market" | "inventory" | "ledger";
type MarketView = "browse" | "inspect";

type StoredEconomy = {
  inventory: InventoryItem[];
  ledger: LedgerEntry[];
};

const STORAGE_KEY = "kelepir-economy-v2";
const LEDGER_PAGE_SIZE = 4;

function round5(value: number) {
  return Math.max(5, Math.round(value / 5) * 5);
}

function loadStoredEconomy(): StoredEconomy | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as StoredEconomy : null;
  } catch {
    return null;
  }
}

function SellerPortrait({ index }: { index: number }) {
  const skin = customerSkinHeads[index % customerSkinHeads.length];
  const face = customerFaces[index % customerFaces.length];
  const hair = customerHairSamples[index % customerHairSamples.length];
  const shirt = customerShirtSamples[index % customerShirtSamples.length];

  return (
    <div className={styles.sellerPortrait} aria-hidden="true">
      <img className={styles.sellerShirt} src={shirt.src} alt="" />
      <img className={styles.sellerHead} src={skin.src} alt="" />
      <img className={styles.sellerFace} src={face.src} alt="" />
      <img className={styles.sellerHair} src={hair.src} alt="" />
    </div>
  );
}

export default function SandboxMarket({ money, onMoneyChange, onLeave }: Props) {
  const initialOffers = useMemo(() => generateMarketOffers(), []);
  const [tab, setTab] = useState<Tab>("market");
  const [marketView, setMarketView] = useState<MarketView>("browse");
  const [offers, setOffers] = useState<MarketOffer[]>(initialOffers);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(initialOffers[0]?.id ?? null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [buyerOffers, setBuyerOffers] = useState<Record<string, number>>({});
  const [roundsLeft, setRoundsLeft] = useState(3);
  const [notice, setNotice] = useState("İlk sermayen cebinde. Tezgâha yaklaş, mala bak, fiyatı kafanda tart.");
  const [hydrated, setHydrated] = useState(false);
  const [inventoryIndex, setInventoryIndex] = useState(0);
  const [ledgerPage, setLedgerPage] = useState(0);

  useEffect(() => {
    const stored = loadStoredEconomy();
    if (stored) {
      setInventory(stored.inventory ?? []);
      setLedger(stored.ledger ?? []);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ inventory, ledger } satisfies StoredEconomy));
  }, [hydrated, inventory, ledger]);

  const realizedProfit = useMemo(
    () => ledger.reduce((total, entry) => total + (entry.profit ?? 0), 0),
    [ledger],
  );

  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId) ?? offers[0] ?? null;
  const selectedIndex = selectedOffer ? Math.max(0, offers.findIndex((offer) => offer.id === selectedOffer.id)) : 0;
  const safeInventoryIndex = inventory.length ? Math.min(inventoryIndex, inventory.length - 1) : 0;
  const selectedStock = inventory[safeInventoryIndex] ?? null;
  const ledgerPages = Math.max(1, Math.ceil(ledger.length / LEDGER_PAGE_SIZE));
  const safeLedgerPage = Math.min(ledgerPage, ledgerPages - 1);
  const ledgerSlice = ledger.slice(safeLedgerPage * LEDGER_PAGE_SIZE, (safeLedgerPage + 1) * LEDGER_PAGE_SIZE);

  function updateOffer(id: string, updater: (offer: MarketOffer) => MarketOffer) {
    setOffers((current) => current.map((offer) => offer.id === id ? updater(offer) : offer));
  }

  function openInspect(offer: MarketOffer) {
    setSelectedOfferId(offer.id);
    updateOffer(offer.id, inspectMarketOffer);
    setMarketView("inspect");
    setNotice(`${offer.name} için hızlı kontrol yaptın. Kusur ihtimali ve piyasa aralığı artık daha net.`);
  }

  function completePurchase(offer: MarketOffer, paidPrice: number) {
    if (paidPrice > money) {
      setNotice(`${paidPrice} ₺ gerekiyor. Cebindeki para yetmiyor.`);
      return;
    }

    const stock = makeInventoryItem(offer, paidPrice, "03 Mart 2002");
    const remaining = offers.filter((item) => item.id !== offer.id);
    onMoneyChange(money - paidPrice);
    setInventory((current) => [stock, ...current]);
    setInventoryIndex(0);
    setLedger((current) => [makeLedgerEntry("buy", offer.name, paidPrice, "Eskiyaka Bit Pazarı"), ...current]);
    setLedgerPage(0);
    setOffers(remaining);
    setSelectedOfferId(remaining[0]?.id ?? null);
    setMarketView("browse");
    setNotice(`${offer.seller} ile ${paidPrice} ₺'ye anlaştın. ${offer.name} artık senin.`);
  }

  function bargain(offer: MarketOffer, discount: 0 | 10 | 20) {
    const proposed = round5(offer.askingPrice * (1 - discount / 100));

    if (discount === 0 || proposed >= offer.minimumPrice) {
      completePurchase(offer, proposed);
      return;
    }

    if (offer.patience <= 1) {
      const remaining = offers.filter((item) => item.id !== offer.id);
      setOffers(remaining);
      setSelectedOfferId(remaining[0]?.id ?? null);
      setMarketView("browse");
      setNotice(`${offer.seller}, ${proposed} ₺ teklifine bozuldu. Malı kaldırıp başka tarafa geçti.`);
      return;
    }

    const revisedAsk = Math.max(offer.minimumPrice, round5(offer.askingPrice * 0.94));
    updateOffer(offer.id, (current) => ({ ...current, patience: current.patience - 1, askingPrice: revisedAsk }));
    setNotice(`${offer.seller}: “${proposed} olmaz. ${revisedAsk} yap, vereyim.”`);
  }

  function refreshMarket() {
    if (roundsLeft <= 0) {
      setNotice("Pazar seyrekleşti. Bugün yeni mal açılmıyor.");
      return;
    }

    const nextOffers = generateMarketOffers();
    setOffers(nextOffers);
    setSelectedOfferId(nextOffers[0]?.id ?? null);
    setRoundsLeft((current) => current - 1);
    setMarketView("browse");
    setNotice("Pazarı bir tur dolaştın. Önüne başka mallar ve satıcılar çıktı.");
  }

  function moveStall(direction: -1 | 1) {
    if (offers.length < 2 || !selectedOffer) return;
    const nextIndex = (selectedIndex + direction + offers.length) % offers.length;
    setSelectedOfferId(offers[nextIndex].id);
    setNotice(`${offers[nextIndex].seller}'in tezgâhına geçtin.`);
  }

  function askBuyer(item: InventoryItem) {
    const amount = generateBuyerOffer(item);
    setBuyerOffers((current) => ({ ...current, [item.id]: amount }));
    setNotice(`${item.name} için pazarda bir alıcı çıktı. Teklifi ${amount} ₺.`);
  }

  function rejectBuyer(item: InventoryItem) {
    setBuyerOffers((current) => {
      const next = { ...current };
      delete next[item.id];
      return next;
    });
    setNotice(`${item.name} için gelen teklifi reddettin. Mal sende kaldı.`);
  }

  function sell(item: InventoryItem) {
    const amount = buyerOffers[item.id];
    if (!amount) return;

    const profit = amount - item.purchasePrice;
    onMoneyChange(money + amount);
    setInventory((current) => current.filter((stock) => stock.id !== item.id));
    setInventoryIndex(0);
    setLedger((current) => [makeLedgerEntry("sell", item.name, amount, "Eskiyaka Bit Pazarı", profit), ...current]);
    setLedgerPage(0);
    setBuyerOffers((current) => {
      const next = { ...current };
      delete next[item.id];
      return next;
    });
    setNotice(`${item.name} ${amount} ₺'ye satıldı. ${profit >= 0 ? `${profit} ₺ kâr` : `${Math.abs(profit)} ₺ zarar`} yazdın.`);
  }

  function switchTab(nextTab: Tab) {
    setTab(nextTab);
    setMarketView("browse");
  }

  const marketRangeLow = selectedOffer ? round5(selectedOffer.expectedValue * 0.84) : 0;
  const marketRangeHigh = selectedOffer ? round5(selectedOffer.expectedValue * 1.16) : 0;

  return (
    <section className={styles.screen}>
      <div className={styles.modeBar}>
        <div>
          <span>{tab === "market" ? "ESKİYAKA • SERBEST OYUN" : tab === "inventory" ? "ÇANTA • MAL TAKİBİ" : "KASA • HAREKETLER"}</span>
          <strong>{tab === "market" ? "Bit Pazarı" : tab === "inventory" ? "Stok" : "Defter"}</strong>
        </div>
        <div className={styles.miniStats}>
          <b>{money.toLocaleString("tr-TR")} ₺</b>
          <span>{inventory.length} mal</span>
          <span className={realizedProfit < 0 ? styles.negative : ""}>{realizedProfit >= 0 ? "+" : ""}{realizedProfit} ₺</span>
        </div>
      </div>

      <div className={styles.stage}>
        {tab === "market" && marketView === "browse" && (
          <div className={styles.browseStage}>
            <div className={styles.marketScene}>
              {selectedOffer ? (
                <>
                  <div className={styles.stallHeader}>
                    <div>
                      <span>{selectedOffer.category}</span>
                      <strong>{selectedOffer.name}</strong>
                    </div>
                    <b>{selectedOffer.askingPrice} ₺</b>
                  </div>

                  <div className={styles.sellerSpot}>
                    <SellerPortrait index={selectedIndex + 1} />
                    <div>
                      <span>SATICI</span>
                      <strong>{selectedOffer.seller}</strong>
                    </div>
                  </div>

                  <button className={styles.itemSpot} onClick={() => openInspect(selectedOffer)} type="button">
                    <img src={selectedOffer.asset} alt={selectedOffer.name} />
                    <span>İNCELE</span>
                  </button>

                  <div className={styles.sceneHint}>{selectedOffer.description}</div>
                </>
              ) : (
                <div className={styles.emptyMarket}>
                  <strong>Tezgâhlar boşaldı</strong>
                  <span>Yeni bir tur atabilirsin.</span>
                </div>
              )}
            </div>

            <div className={styles.commandBar}>
              <div className={styles.notice}>{notice}</div>
              <div className={styles.scenePager}>
                <button type="button" onClick={() => moveStall(-1)} disabled={offers.length < 2}>‹</button>
                <span>{selectedOffer ? `${selectedIndex + 1}/${offers.length}` : "0/0"}</span>
                <button type="button" onClick={() => moveStall(1)} disabled={offers.length < 2}>›</button>
                <button className={styles.roundButton} type="button" onClick={refreshMarket} disabled={roundsLeft <= 0}>Tur {roundsLeft}</button>
              </div>
            </div>
          </div>
        )}

        {tab === "market" && marketView === "inspect" && selectedOffer && (
          <div className={styles.inspectStage}>
            <div className={styles.inspectTop}>
              <button type="button" onClick={() => setMarketView("browse")}>‹ Tezgâha dön</button>
              <span>Sabır {"●".repeat(selectedOffer.patience)}{"○".repeat(3 - selectedOffer.patience)}</span>
            </div>

            <div className={styles.inspectBody}>
              <div className={styles.inspectVisual}>
                <img src={selectedOffer.asset} alt={selectedOffer.name} />
              </div>
              <div className={styles.inspectInfo}>
                <span>{selectedOffer.category.toUpperCase()}</span>
                <strong>{selectedOffer.name}</strong>
                <b>{selectedOffer.askingPrice} ₺</b>
                <p>{selectedOffer.description}</p>
                <dl>
                  <div><dt>Durum</dt><dd>{selectedOffer.condition}</dd></div>
                  <div><dt>Piyasa</dt><dd>{marketRangeLow}–{marketRangeHigh} ₺</dd></div>
                  <div><dt>Kontrol</dt><dd>{selectedOffer.issueText}</dd></div>
                </dl>
              </div>
            </div>

            <div className={styles.decisionBar}>
              <button className={styles.buyNow} type="button" onClick={() => bargain(selectedOffer, 0)} disabled={selectedOffer.askingPrice > money}>{selectedOffer.askingPrice} ₺ ver</button>
              <button type="button" onClick={() => bargain(selectedOffer, 10)}>%10 kır</button>
              <button type="button" onClick={() => bargain(selectedOffer, 20)}>%20 kır</button>
            </div>
          </div>
        )}

        {tab === "inventory" && (
          <div className={styles.inventoryStage}>
            {selectedStock ? (
              <>
                <div className={styles.inventoryTop}>
                  <button type="button" onClick={() => setInventoryIndex((current) => Math.max(0, current - 1))} disabled={safeInventoryIndex === 0}>‹</button>
                  <span>{safeInventoryIndex + 1}/{inventory.length}</span>
                  <button type="button" onClick={() => setInventoryIndex((current) => Math.min(inventory.length - 1, current + 1))} disabled={safeInventoryIndex >= inventory.length - 1}>›</button>
                </div>
                <div className={styles.stockBody}>
                  <div className={styles.stockVisual}><img src={selectedStock.asset || worldAssets.interior.radio} alt={selectedStock.name} /></div>
                  <div className={styles.stockInfo}>
                    <span>{selectedStock.category}</span>
                    <strong>{selectedStock.name}</strong>
                    <b>Alış {selectedStock.purchasePrice} ₺</b>
                    <p>{selectedStock.inspected ? selectedStock.issueText : "Satın almadan önce tam incelenmedi."}</p>
                    <small>{selectedStock.condition}</small>
                  </div>
                </div>
                <div className={styles.stockActions}>
                  {buyerOffers[selectedStock.id] ? (
                    <>
                      <button className={styles.buyNow} type="button" onClick={() => sell(selectedStock)}>{buyerOffers[selectedStock.id]} ₺'ye sat</button>
                      <button type="button" onClick={() => rejectBuyer(selectedStock)}>Teklifi reddet</button>
                    </>
                  ) : (
                    <button className={styles.buyNow} type="button" onClick={() => askBuyer(selectedStock)}>Alıcı ara</button>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <strong>Henüz mal yok</strong>
                <p>Pazardan bir şey aldığında burada görünür.</p>
                <button type="button" onClick={() => switchTab("market")}>Pazara dön</button>
              </div>
            )}
          </div>
        )}

        {tab === "ledger" && (
          <div className={styles.ledgerStage}>
            {ledger.length ? (
              <>
                <div className={styles.ledgerRows}>
                  {ledgerSlice.map((entry) => (
                    <article key={entry.id}>
                      <span className={entry.type === "buy" ? styles.buy : styles.sell}>{entry.type === "buy" ? "ALIŞ" : "SATIŞ"}</span>
                      <div><strong>{entry.itemName}</strong><small>{entry.label}</small></div>
                      <b>{entry.type === "buy" ? "−" : "+"}{entry.amount} ₺</b>
                      <em className={(entry.profit ?? 0) < 0 ? styles.negative : ""}>{typeof entry.profit === "number" ? `${entry.profit >= 0 ? "+" : ""}${entry.profit} ₺` : ""}</em>
                    </article>
                  ))}
                </div>
                <div className={styles.ledgerPager}>
                  <button type="button" onClick={() => setLedgerPage((current) => Math.max(0, current - 1))} disabled={safeLedgerPage === 0}>‹ Önceki</button>
                  <span>{safeLedgerPage + 1}/{ledgerPages}</span>
                  <button type="button" onClick={() => setLedgerPage((current) => Math.min(ledgerPages - 1, current + 1))} disabled={safeLedgerPage >= ledgerPages - 1}>Sonraki ›</button>
                </div>
              </>
            ) : (
              <div className={styles.emptyState}><strong>Defter temiz</strong><p>İlk alışverişle birlikte hareketler burada tutulacak.</p></div>
            )}
          </div>
        )}
      </div>

      <nav className={styles.bottomNav} aria-label="Pazar bölümleri">
        <button className={tab === "market" ? styles.activeTab : ""} onClick={() => switchTab("market")}><span>◉</span>Pazar</button>
        <button className={tab === "inventory" ? styles.activeTab : ""} onClick={() => switchTab("inventory")}><span>▣</span>Stok {inventory.length}</button>
        <button className={tab === "ledger" ? styles.activeTab : ""} onClick={() => switchTab("ledger")}><span>≡</span>Defter</button>
        <button onClick={onLeave}><span>⌂</span>Ev</button>
      </nav>
    </section>
  );
}
