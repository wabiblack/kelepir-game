"use client";

import { useEffect, useMemo, useState } from "react";
import GameButton from "@/components/ui/GameButton";
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

type StoredEconomy = {
  inventory: InventoryItem[];
  ledger: LedgerEntry[];
};

const STORAGE_KEY = "kelepir-economy-v2";

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
  const [offers, setOffers] = useState<MarketOffer[]>(initialOffers);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(initialOffers[0]?.id ?? null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [buyerOffers, setBuyerOffers] = useState<Record<string, number>>({});
  const [roundsLeft, setRoundsLeft] = useState(3);
  const [notice, setNotice] = useState("İlk sermayen cebinde. Tezgâha yaklaş, mala bak, fiyatı kafanda tart.");
  const [hydrated, setHydrated] = useState(false);

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

  function updateOffer(id: string, updater: (offer: MarketOffer) => MarketOffer) {
    setOffers((current) => current.map((offer) => offer.id === id ? updater(offer) : offer));
  }

  function inspect(offer: MarketOffer) {
    updateOffer(offer.id, inspectMarketOffer);
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
    setLedger((current) => [makeLedgerEntry("buy", offer.name, paidPrice, "Eskiyaka Bit Pazarı"), ...current]);
    setOffers(remaining);
    setSelectedOfferId(remaining[0]?.id ?? null);
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
    setNotice("Pazarı bir tur dolaştın. Önüne başka mallar ve satıcılar çıktı.");
  }

  function nextStall() {
    if (offers.length < 2 || !selectedOffer) return;
    const nextIndex = (selectedIndex + 1) % offers.length;
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
    setLedger((current) => [makeLedgerEntry("sell", item.name, amount, "Eskiyaka Bit Pazarı", profit), ...current]);
    setBuyerOffers((current) => {
      const next = { ...current };
      delete next[item.id];
      return next;
    });
    setNotice(`${item.name} ${amount} ₺'ye satıldı. ${profit >= 0 ? `${profit} ₺ kâr` : `${Math.abs(profit)} ₺ zarar`} yazdın.`);
  }

  return (
    <section className={styles.screen}>
      <div className={styles.marketHeader}>
        <div>
          <span>ESKİYAKA • SERBEST OYUN</span>
          <strong>Bit Pazarı</strong>
        </div>
        <div className={styles.quickStats}>
          <span><b>{money.toLocaleString("tr-TR")} ₺</b>Cüzdan</span>
          <span><b>{inventory.length}</b>Stok</span>
          <span className={realizedProfit < 0 ? styles.negative : ""}><b>{realizedProfit.toLocaleString("tr-TR")} ₺</b>Net</span>
        </div>
      </div>

      {tab === "market" && (
        <>
          <div className={styles.sceneFrame}>
            <div className={styles.marketScene}>
              <img className={styles.backWall} src={worldAssets.architecture.wallA} alt="" aria-hidden="true" />
              <img className={styles.backWallTwo} src={worldAssets.architecture.wallB} alt="" aria-hidden="true" />
              <img className={styles.ground} src={worldAssets.roads.asphaltDamaged} alt="" aria-hidden="true" />
              <img className={styles.awning} src={worldAssets.props.awningWide} alt="Pazar tentesi" />
              <img className={styles.pallet} src={worldAssets.props.pallet} alt="Ahşap palet" />
              <img className={styles.boxOne} src={worldAssets.interior.boxOpen} alt="Açık karton kutu" />
              <img className={styles.boxTwo} src={worldAssets.interior.boxClosed} alt="Karton kutu" />
              <img className={styles.truck} src={worldAssets.props.truckGreen} alt="Pazarın arkasında park etmiş eski kamyon" />

              {selectedOffer ? (
                <>
                  <div className={styles.sellerSpot}>
                    <SellerPortrait index={selectedIndex + 1} />
                    <span>{selectedOffer.seller}</span>
                  </div>
                  <img className={styles.stallTable} src={worldAssets.interior.desk} alt="İkinci el tezgâhı" />
                  <button className={styles.itemSpot} onClick={() => inspect(selectedOffer)} aria-label={`${selectedOffer.name} ürününü incele`}>
                    <img src={selectedOffer.asset} alt={selectedOffer.name} />
                    <span>{selectedOffer.askingPrice} ₺</span>
                  </button>
                  <div className={styles.sceneTag}>
                    <span>{selectedOffer.category}</span>
                    <strong>{selectedOffer.name}</strong>
                    <small>{selectedOffer.condition}</small>
                  </div>
                </>
              ) : (
                <div className={styles.emptyMarket}>Tezgâhlar boşaldı. Yeni tur atabilirsin.</div>
              )}
            </div>

            <div className={styles.sceneControls}>
              <button type="button" onClick={nextStall} disabled={offers.length < 2}>Öteki tezgâh</button>
              <span>{selectedOffer ? `${selectedIndex + 1} / ${offers.length}` : "0 / 0"}</span>
              <button type="button" onClick={refreshMarket} disabled={roundsLeft <= 0}>Yeni tur • {roundsLeft}</button>
            </div>
          </div>

          <div className={styles.notice}>{notice}</div>

          {selectedOffer && (() => {
            const rangeLow = round5(selectedOffer.expectedValue * 0.84);
            const rangeHigh = round5(selectedOffer.expectedValue * 1.16);
            return (
              <div className={styles.tradeSheet}>
                <div className={styles.sheetTitle}>
                  <div>
                    <span>{selectedOffer.seller.toUpperCase()}</span>
                    <strong>{selectedOffer.askingPrice} ₺ istiyor</strong>
                  </div>
                  <small>Sabır {"●".repeat(selectedOffer.patience)}{"○".repeat(3 - selectedOffer.patience)}</small>
                </div>

                <p>{selectedOffer.description}</p>

                <div className={styles.inspectLine}>
                  {selectedOffer.inspected ? (
                    <>
                      <span>Tahmini piyasa <b>{rangeLow}–{rangeHigh} ₺</b></span>
                      <span>Kontrol <b>{selectedOffer.issueText}</b></span>
                    </>
                  ) : (
                    <button type="button" onClick={() => inspect(selectedOffer)}>Ürüne yakından bak</button>
                  )}
                </div>

                <div className={styles.tradeActions}>
                  <GameButton onClick={() => bargain(selectedOffer, 0)} disabled={selectedOffer.askingPrice > money}>{selectedOffer.askingPrice} ₺ ver</GameButton>
                  <GameButton variant="secondary" onClick={() => bargain(selectedOffer, 10)}>- %10 teklif</GameButton>
                  <GameButton variant="quiet" onClick={() => bargain(selectedOffer, 20)}>- %20 teklif</GameButton>
                </div>
              </div>
            );
          })()}
        </>
      )}

      {tab === "inventory" && (
        <div className={styles.panelArea}>
          <div className={styles.panelTitle}><span>STOK</span><strong>Envanter</strong></div>
          {inventory.length === 0 ? (
            <div className={styles.emptyState}>
              <strong>Henüz mal yok</strong>
              <p>Bir tezgâhtan alış yaptığında burada göreceksin.</p>
              <GameButton onClick={() => setTab("market")}>Pazara dön</GameButton>
            </div>
          ) : (
            <div className={styles.inventoryGrid}>
              {inventory.map((item) => {
                const buyerOffer = buyerOffers[item.id];
                return (
                  <article className={styles.stockItem} key={item.id}>
                    <div className={styles.stockVisual}><img src={item.asset || worldAssets.interior.radio} alt={item.name} /></div>
                    <div className={styles.stockInfo}>
                      <span>{item.category}</span>
                      <strong>{item.name}</strong>
                      <small>Alış {item.purchasePrice} ₺ • {item.condition}</small>
                      <p>{item.inspected ? item.issueText : "Satın almadan önce tam incelenmedi."}</p>
                    </div>
                    <div className={styles.stockAction}>
                      {buyerOffer ? (
                        <>
                          <span>Alıcı {buyerOffer} ₺</span>
                          <GameButton onClick={() => sell(item)}>Sat</GameButton>
                          <GameButton variant="quiet" onClick={() => rejectBuyer(item)}>Reddet</GameButton>
                        </>
                      ) : (
                        <GameButton variant="secondary" onClick={() => askBuyer(item)}>Alıcı ara</GameButton>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "ledger" && (
        <div className={styles.panelArea}>
          <div className={styles.panelTitle}><span>KASA</span><strong>Defter</strong></div>
          {ledger.length === 0 ? (
            <div className={styles.emptyState}><strong>Defter temiz</strong><p>İlk alışverişle birlikte hareketler burada tutulacak.</p></div>
          ) : (
            <div className={styles.ledgerList}>
              {ledger.map((entry) => (
                <article key={entry.id}>
                  <span className={entry.type === "buy" ? styles.buy : styles.sell}>{entry.type === "buy" ? "ALIŞ" : "SATIŞ"}</span>
                  <div><strong>{entry.itemName}</strong><small>{entry.label}</small></div>
                  <b>{entry.type === "buy" ? "−" : "+"}{entry.amount} ₺</b>
                  <em className={(entry.profit ?? 0) < 0 ? styles.negative : ""}>{typeof entry.profit === "number" ? `${entry.profit >= 0 ? "+" : ""}${entry.profit} ₺` : ""}</em>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      <nav className={styles.bottomNav} aria-label="Pazar bölümleri">
        <button className={tab === "market" ? styles.activeTab : ""} onClick={() => setTab("market")}><span>◉</span>Pazar</button>
        <button className={tab === "inventory" ? styles.activeTab : ""} onClick={() => setTab("inventory")}><span>▣</span>Stok {inventory.length}</button>
        <button className={tab === "ledger" ? styles.activeTab : ""} onClick={() => setTab("ledger")}><span>≡</span>Defter</button>
        <button onClick={onLeave}><span>⌂</span>Ev</button>
      </nav>
    </section>
  );
}
