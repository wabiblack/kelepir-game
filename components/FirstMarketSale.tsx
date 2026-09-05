"use client";

import { useState } from "react";
import { generateBuyerDialogue } from "@/lib/buyerDialogue";
import styles from "./FirstMarketSale.module.css";

type Phase = "intro" | "bargain" | "sold" | "left";

type Props = {
  itemAsset: string;
  money: number;
  onSold: (amount: number) => void;
  onLeave: () => void;
};

const buyer = {
  name: "Serkan Yıldız",
  age: 29,
  description: "Eski elektronik meraklısı",
};

const ITEM_NAME = "Raksen RX-40 kasetçalar";
const MAX_PRICE = 130;
const PIXEL_PORTRAIT = "https://opengameart.org/sites/default/files/portrait.png";

export default function FirstMarketSale({ itemAsset, money, onSold, onLeave }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [offer, setOffer] = useState(80);
  const [patience, setPatience] = useState(3);
  const [salePrice, setSalePrice] = useState<number | null>(null);
  const [recentIds, setRecentIds] = useState<string[]>(["bg03"]);
  const [dialogue, setDialogue] = useState("Şu kasetçalar dikkatimi çekti. Çalışıyor mu bunun?");
  const [portraitVisible, setPortraitVisible] = useState(true);

  function say(situation: Parameters<typeof generateBuyerDialogue>[0]["situation"], counter?: number, nextOffer = offer) {
    const result = generateBuyerDialogue(
      {
        situation,
        itemName: ITEM_NAME,
        offer: nextOffer,
        counter,
        year: 2002,
      },
      recentIds,
    );
    setDialogue(result.text);
    setRecentIds((current) => [result.id, ...current].slice(0, 7));
  }

  function inspect() {
    setPhase("bargain");
    const result = generateBuyerDialogue(
      { situation: "inceleme", itemName: ITEM_NAME, offer: 80, year: 2002 },
      recentIds,
    );
    setDialogue(`${result.text} Çalışması belirsiz, ilk teklifim 80 ₺.`);
    setRecentIds((current) => [result.id, ...current].slice(0, 7));
  }

  function accept(price = offer) {
    setSalePrice(price);
    setPhase("sold");
    say("kabul", price, price);
  }

  function counter(counterPrice: number) {
    if (counterPrice <= offer) {
      accept(counterPrice);
      return;
    }

    if (counterPrice <= MAX_PRICE) {
      if (counterPrice - offer <= 20) {
        accept(counterPrice);
        return;
      }

      const nextOffer = Math.min(MAX_PRICE, Math.round(((offer + counterPrice) / 2) / 10) * 10);
      setOffer(nextOffer);
      say("yaklasti", counterPrice, nextOffer);
      return;
    }

    const nextPatience = patience - 1;
    setPatience(nextPatience);

    if (nextPatience <= 0) {
      setPhase("left");
      say("ayrilis", counterPrice, offer);
      return;
    }

    const nextOffer = Math.min(MAX_PRICE, offer + 10);
    setOffer(nextOffer);
    say("yuksek_fiyat", counterPrice, nextOffer);
  }

  function walkAway() {
    setPhase("left");
    say("ayrilis");
  }

  return (
    <section className={styles.screen}>
      <div className={styles.pixelWindow}>
        <header className={styles.windowBar}>
          <div>
            <span>03 MART 2002 • 11:06</span>
            <strong>CUMARTESİ PAZARI</strong>
          </div>
          <div className={styles.windowTools}>
            <div className={styles.wallet}>{money.toLocaleString("tr-TR")} ₺</div>
            {phase !== "sold" && phase !== "left" && (
              <button className={styles.closeButton} type="button" onClick={walkAway} aria-label="Pazarlıktan çık">
                ×
              </button>
            )}
          </div>
        </header>

        <div className={styles.portraitPanel}>
          <div className={styles.namePlate}>
            <span>{buyer.description}</span>
            <strong>{buyer.name}</strong>
            <small>{buyer.age} yaş</small>
          </div>

          <div className={styles.portraitStage}>
            <div className={styles.pixelGrid} aria-hidden="true" />
            {portraitVisible && (
              <img
                className={styles.portraitArt}
                src={PIXEL_PORTRAIT}
                alt=""
                aria-hidden="true"
                onError={() => setPortraitVisible(false)}
              />
            )}

            <div className={styles.itemCard}>
              <span>TEZGAHTAKİ ÜRÜN</span>
              <img src={itemAsset} alt="Raksen RX-40 kasetçalar" />
              <strong>RAKSEN RX-40</strong>
              <small>TEST EDİLMEDİ</small>
            </div>
          </div>

          <div className={styles.quickRow}>
            <div>
              <span>ALICI</span>
              <strong>Temkinli</strong>
            </div>
            <div>
              <span>{phase === "bargain" ? "TEKLİF" : "DURUM"}</span>
              <strong>{phase === "bargain" ? `${offer} ₺` : "İlk temas"}</strong>
            </div>
          </div>
        </div>

        <div className={styles.dialogueBox}>
          <span className={styles.speaker}>{buyer.name.toUpperCase()}</span>
          <p>{dialogue}</p>
          {phase === "bargain" && (
            <div className={styles.patience} aria-label={`Alıcının sabrı ${patience}/3`}>
              <span>SABIR</span>
              <strong>{"■".repeat(patience)}{"□".repeat(3 - patience)}</strong>
            </div>
          )}
        </div>

        {phase === "intro" && (
          <div className={styles.choices}>
            <button type="button" onClick={inspect}>İncelemesine izin ver</button>
            <button type="button" onClick={inspect}>Test etmedim, fiyatını söyle</button>
            <button type="button" onClick={walkAway}>Şimdilik satma</button>
          </div>
        )}

        {phase === "bargain" && (
          <div className={styles.choices}>
            <button type="button" onClick={() => accept()}>{offer} ₺ teklifi kabul et</button>
            <button type="button" onClick={() => counter(offer + 20)}>{offer + 20} ₺ iste</button>
            <button type="button" onClick={() => counter(offer + 50)}>{offer + 50} ₺ iste</button>
          </div>
        )}

        {phase === "sold" && salePrice !== null && (
          <div className={styles.resultBox}>
            <span>İLK SATIŞ TAMAM</span>
            <strong>+{salePrice} ₺</strong>
            <p>Kasetçalar Serkan&apos;ın. İlk sermaye cebinde.</p>
            <button type="button" onClick={() => onSold(salePrice)}>Parayı al ve eve dön</button>
          </div>
        )}

        {phase === "left" && (
          <div className={styles.resultBox}>
            <span>PAZARLIK BİTTİ</span>
            <strong>Satış yok</strong>
            <p>Ürün sende kaldı. Daha sonra tekrar deneyebilirsin.</p>
            <button type="button" onClick={onLeave}>Eve dön</button>
          </div>
        )}
      </div>
    </section>
  );
}
