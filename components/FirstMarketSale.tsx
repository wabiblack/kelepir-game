"use client";

import { useState } from "react";
import {
  customerFaces,
  customerHairSamples,
  customerShirtSamples,
  customerSkinHeads,
} from "@/data/assetPacks";
import { generateBuyerDialogue } from "@/lib/buyerDialogue";
import styles from "./FirstMarketSale.module.css";

type Phase = "intro" | "bargain" | "sold" | "left";

type Props = {
  itemAsset: string;
  onSold: (amount: number) => void;
  onLeave: () => void;
};

const buyer = {
  name: "Serkan Yıldız",
  age: 29,
  description: "Eski elektronik meraklısı",
  skin: customerSkinHeads[2],
  face: customerFaces[0],
  hair: customerHairSamples[2],
  shirt: customerShirtSamples[1],
};

const ITEM_NAME = "Raksen RX-40 kasetçalar";
const MAX_PRICE = 130;

export default function FirstMarketSale({ itemAsset, onSold, onLeave }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [offer, setOffer] = useState(80);
  const [patience, setPatience] = useState(3);
  const [salePrice, setSalePrice] = useState<number | null>(null);
  const [recentIds, setRecentIds] = useState<string[]>(["bg03"]);
  const [dialogue, setDialogue] = useState("Şu kasetçalar dikkatimi çekti. Çalışıyor mu bunun?");

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
    say("inceleme", undefined, 80);
    window.setTimeout(() => {
      const result = generateBuyerDialogue(
        { situation: "yaklasti", itemName: ITEM_NAME, offer: 80, year: 2002 },
        recentIds,
      );
      setDialogue(`${result.text} Çalışması belirsiz olduğu için ilk teklifim 80 ₺.`);
      setRecentIds((current) => [result.id, ...current].slice(0, 7));
    }, 650);
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
      <div className={styles.marketTop}>
        <div>
          <p className={styles.kicker}>CUMARTESİ PAZARI • 03 MART 2002</p>
          <h2>İlk Pazarlık</h2>
        </div>
        <span className={styles.location}>ESKİYAKA</span>
      </div>

      <div className={styles.scene}>
        <div className={styles.stall}>
          <div className={styles.awning} aria-hidden="true" />
          <span className={styles.sign}>İKİNCİ EL • PAZAR</span>
          <div className={styles.itemStage}>
            <img src={itemAsset} alt="Tezgâhtaki Raksen RX-40 kasetçalar" />
            <span>ÇALIŞMASI TEST EDİLMEDİ</span>
          </div>
        </div>

        <div className={styles.customerPanel}>
          <div className={styles.portrait}>
            <img className={styles.shirt} src={buyer.shirt.src} alt="" />
            <img className={styles.head} src={buyer.skin.src} alt="" />
            <img className={styles.face} src={buyer.face.src} alt="" />
            <img className={styles.hair} src={buyer.hair.src} alt="" />
          </div>

          <div className={styles.customerInfo}>
            <span>{buyer.description}</span>
            <h3>{buyer.name}</h3>
            <small>{buyer.age} yaş • temkinli alıcı</small>
          </div>
        </div>
      </div>

      <div className={styles.dialogue}>
        <span>{buyer.name.toUpperCase()}</span>
        <p>“{dialogue}”</p>
      </div>

      {phase === "intro" && (
        <div className={styles.actions}>
          <button className={styles.primary} type="button" onClick={inspect}>İncelemesine izin ver</button>
          <button type="button" onClick={walkAway}>Şimdilik satma</button>
        </div>
      )}

      {phase === "bargain" && (
        <div className={styles.tradePanel}>
          <div className={styles.offerBox}>
            <span>MEVCUT TEKLİF</span>
            <strong>{offer} ₺</strong>
            <small>Alıcının sabrı: {"●".repeat(patience)}{"○".repeat(3 - patience)}</small>
          </div>

          <div className={styles.actions}>
            <button className={styles.primary} type="button" onClick={() => accept()}>{offer} ₺ kabul et</button>
            <button type="button" onClick={() => counter(offer + 20)}>{offer + 20} ₺ iste</button>
            <button type="button" onClick={() => counter(offer + 50)}>{offer + 50} ₺ iste</button>
            <button className={styles.quiet} type="button" onClick={walkAway}>Satmaktan vazgeç</button>
          </div>
        </div>
      )}

      {phase === "sold" && salePrice !== null && (
        <div className={styles.result}>
          <span>İLK SATIŞ</span>
          <strong>+{salePrice} ₺</strong>
          <p>Sıfırdan ilk sermayeni çıkardın. Kasetçalar artık Serkan&apos;ın, para cebinde.</p>
          <button className={styles.primary} type="button" onClick={() => onSold(salePrice)}>Parayı al ve eve dön</button>
        </div>
      )}

      {phase === "left" && (
        <div className={styles.result}>
          <span>PAZARLIK BİTTİ</span>
          <strong>Satış yok</strong>
          <p>Ürün sende kaldı. Başka müşteri bekleyebilir veya sonra tekrar pazara gelebilirsin.</p>
          <button className={styles.primary} type="button" onClick={onLeave}>Eve dön</button>
        </div>
      )}
    </section>
  );
}
