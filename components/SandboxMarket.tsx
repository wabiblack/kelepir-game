"use client";

import { useEffect, useMemo, useState } from "react";
import GameButton from "@/components/ui/GameButton";
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

const STORAGE_KEY = "kelepir-economy-v1";

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

export default function SandboxMarket({ money, onMoneyChange, onLeave }: Props) {
  const [tab, setTab] = useState<Tab>("market");
  const [offers, setOffers] = useState<MarketOffer[]>(() => generateMarketOffers());
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [buyerOffers, setBuyerOffers] = useState<Record<string, number>>({});
  const [roundsLeft, setRoundsLeft] = useState(3);
  const [notice, setNotice] = useState("İlk sermayen cebinde. Artık ne alacağına sen karar veriyorsun.");
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

  function updateOffer(id: string, updater: (offer: MarketOffer) => MarketOffer) {
    setOffers((current) => current.map((offer) => offer.id === id ? updater(offer) : offer));
  }

  function inspect(offer: MarketOffer) {
    updateOffer(offer.id, inspectMarketOffer);
    setNotice(`${offer.name} için hızlı kontrol yaptın. Artık risk ve yaklaşık piyasa değeri hakkında daha fazla fikrin var.`);
  }

  function completePurchase(offer: MarketOffer, paidPrice: number) {
    if (paidPrice > money) {
      setNotice(`${paidPrice} ₺ gerekiyor. Cebindeki para yetmiyor.`);
      return;
    }

    const stock = makeInventoryItem(offer, paidPrice, "03 Mart 2002");
    onMoneyChange(money - paidPrice);
    setInventory((current) => [stock, ...current]);
    setLedger((current) => [makeLedgerEntry("buy", offer.name, paidPrice, "Cumartesi Pazarı"), ...current]);
    setOffers((current) => current.filter((item) => item.id !== offer.id));
    setNotice(`${offer.seller} ile ${paidPrice} ₺'ye anlaştın. ${offer.name} artık envanterinde.`);
  }

  function bargain(offer: MarketOffer, discount: 0 | 10 | 20) {
    const proposed = round5(offer.askingPrice * (1 - discount / 100));

    if (discount === 0 || proposed >= offer.minimumPrice) {
      completePurchase(offer, proposed);
      return;
    }

    if (offer.patience <= 1) {
      setOffers((current) => current.filter((item) => item.id !== offer.id));
      setNotice(`${offer.seller}, ${proposed} ₺ teklifine bozuldu ve malı toplayıp başka tarafa geçti.`);
      return;
    }

    const revisedAsk = Math.max(offer.minimumPrice, round5(offer.askingPrice * 0.94));
    updateOffer(offer.id, (current) => ({ ...current, patience: current.patience - 1, askingPrice: revisedAsk }));
    setNotice(`${offer.seller}: “${proposed} olmaz. ${revisedAsk} yap, vereyim.”`);
  }

  function refreshMarket() {
    if (roundsLeft <= 0) {
      setNotice("Pazar seyrekleşti. Bugün yeni fırsat çıkmıyor.");
      return;
    }

    setOffers(generateMarketOffers());
    setRoundsLeft((current) => current - 1);
    setNotice("Tezgâhları bir tur daha dolaştın. Satıcılar ve mallar değişti.");
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
    setLedger((current) => [makeLedgerEntry("sell", item.name, amount, "Cumartesi Pazarı", profit), ...current]);
    setBuyerOffers((current) => {
      const next = { ...current };
      delete next[item.id];
      return next;
    });
    setNotice(`${item.name} ${amount} ₺'ye satıldı. ${profit >= 0 ? `${profit} ₺ kâr` : `${Math.abs(profit)} ₺ zarar`} yazdın.`);
  }

  return (
    <section className={styles.screen}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>SERBEST OYUN • ESKİYAKA</p>
          <h2>Bit Pazarı</h2>
          <p>Görev zinciri yok. Fırsatı gör, riski tart, paranı bağla ya da yürü geç.</p>
        </div>
        <div className={styles.headerStats}>
          <span>CÜZDAN <strong>{money.toLocaleString("tr-TR")} ₺</strong></span>
          <span>STOK <strong>{inventory.length}</strong></span>
          <span>NET KÂR <strong className={realizedProfit < 0 ? styles.negative : ""}>{realizedProfit.toLocaleString("tr-TR")} ₺</strong></span>
        </div>
      </header>

      <div className={styles.notice}>{notice}</div>

      <nav className={styles.tabs} aria-label="Pazar bölümleri">
        <button className={tab === "market" ? styles.activeTab : ""} onClick={() => setTab("market")}>Pazar</button>
        <button className={tab === "inventory" ? styles.activeTab : ""} onClick={() => setTab("inventory")}>Envanter ({inventory.length})</button>
        <button className={tab === "ledger" ? styles.activeTab : ""} onClick={() => setTab("ledger")}>Kasa defteri</button>
      </nav>

      {tab === "market" && (
        <div className={styles.marketArea}>
          <div className={styles.marketToolbar}>
            <div>
              <span>PAZAR TURU</span>
              <strong>{roundsLeft} yeni tur kaldı</strong>
            </div>
            <GameButton variant="secondary" onClick={refreshMarket} disabled={roundsLeft <= 0}>Tezgâhları dolaş</GameButton>
          </div>

          <div className={styles.offerGrid}>
            {offers.map((offer) => {
              const rangeLow = round5(offer.expectedValue * 0.84);
              const rangeHigh = round5(offer.expectedValue * 1.16);

              return (
                <article className={styles.offerCard} key={offer.id}>
                  <div className={styles.offerTop}>
                    <span>{offer.category}</span>
                    <small>{offer.seller}</small>
                  </div>
                  <h3>{offer.name}</h3>
                  <p>{offer.description}</p>

                  <dl>
                    <div><dt>İstenen</dt><dd>{offer.askingPrice} ₺</dd></div>
                    <div><dt>Durum</dt><dd>{offer.condition}</dd></div>
                    <div><dt>Satıcı sabrı</dt><dd>{"●".repeat(offer.patience)}{"○".repeat(3 - offer.patience)}</dd></div>
                    {offer.inspected ? (
                      <>
                        <div><dt>Tahmini piyasa</dt><dd>{rangeLow}–{rangeHigh} ₺</dd></div>
                        <div className={styles.issueRow}><dt>Kontrol</dt><dd>{offer.issueText}</dd></div>
                      </>
                    ) : (
                      <div><dt>Gizli risk</dt><dd>?</dd></div>
                    )}
                  </dl>

                  <div className={styles.cardActions}>
                    {!offer.inspected && <GameButton variant="secondary" onClick={() => inspect(offer)}>İncele</GameButton>}
                    <GameButton onClick={() => bargain(offer, 0)} disabled={offer.askingPrice > money}>{offer.askingPrice} ₺ ver</GameButton>
                    <GameButton variant="quiet" onClick={() => bargain(offer, 10)}>- %10 teklif</GameButton>
                    <GameButton variant="quiet" onClick={() => bargain(offer, 20)}>- %20 teklif</GameButton>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {tab === "inventory" && (
        <div className={styles.inventoryArea}>
          {inventory.length === 0 ? (
            <div className={styles.emptyState}>
              <strong>Stok boş</strong>
              <p>Pazardan ilk malını aldığında burada görünecek.</p>
              <GameButton onClick={() => setTab("market")}>Pazara dön</GameButton>
            </div>
          ) : (
            <div className={styles.inventoryGrid}>
              {inventory.map((item) => {
                const buyerOffer = buyerOffers[item.id];
                return (
                  <article className={styles.stockCard} key={item.id}>
                    <div>
                      <span>{item.category}</span>
                      <h3>{item.name}</h3>
                      <small>{item.acquiredAt} • alış {item.purchasePrice} ₺</small>
                    </div>
                    <dl>
                      <div><dt>Durum</dt><dd>{item.condition}</dd></div>
                      <div><dt>Bilinen risk</dt><dd>{item.inspected ? item.issueText : "Satın almadan önce tam incelenmedi."}</dd></div>
                    </dl>

                    {buyerOffer ? (
                      <div className={styles.buyerOffer}>
                        <span>ALICI TEKLİFİ</span>
                        <strong>{buyerOffer} ₺</strong>
                        <small>{buyerOffer - item.purchasePrice >= 0 ? "+" : ""}{buyerOffer - item.purchasePrice} ₺ potansiyel sonuç</small>
                        <div>
                          <GameButton onClick={() => sell(item)}>Sat</GameButton>
                          <GameButton variant="quiet" onClick={() => rejectBuyer(item)}>Reddet</GameButton>
                        </div>
                      </div>
                    ) : (
                      <GameButton variant="secondary" onClick={() => askBuyer(item)}>Pazarda alıcı ara</GameButton>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "ledger" && (
        <div className={styles.ledgerArea}>
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

      <footer className={styles.footer}>
        <p>Ürün görselleri yalnızca doğrulanmış hazır assetlerle bağlanacak. Yanlış görsel eşleştirmek yerine mekanik bağımsız tutuluyor.</p>
        <GameButton variant="quiet" onClick={onLeave}>Eve dön</GameButton>
      </footer>
    </section>
  );
}
