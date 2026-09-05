"use client";

import { useState } from "react";
import {
  customerFaces,
  customerHairSamples,
  customerShirtSamples,
  customerSkinHeads,
} from "@/data/assetPacks";
import { worldAssets } from "@/data/worldAssets";
import { generateBuyerDialogue } from "@/lib/buyerDialogue";
import GameButton from "@/components/ui/GameButton";
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
      <div className={styles.marketTop}>
        <div>
          <span>CUMARTESİ PAZARI • 03 MART 2002</span>
          <strong>İlk Pazarlık</strong>
        </div>
        <small>ESKİYAKA</small>
      </div>

      <div className={styles.sceneFrame}>
        <div className={styles.scene}>
          <img className={styles.backWall} src={worldAssets.architecture.wallA} alt="" aria-hidden="true" />
          <img className={styles.backWallTwo} src={worldAssets.architecture.wallB} alt="" aria-hidden="true" />
          <img className={styles.ground} src={worldAssets.roads.asphaltDamaged} alt="" aria-hidden="true" />
          <img className={styles.awning} src={worldAssets.props.awningWide} alt="Pazar tentesi" />
          <img className={styles.pallet} src={worldAssets.props.pallet} alt="Ahşap palet" />
          <img className={styles.boxOpen} src={worldAssets.interior.boxOpen} alt="Açık karton kutu" />
          <img className={styles.boxClosed} src={worldAssets.interior.boxClosed} alt="Karton kutu" />
          <img className={styles.truck} src={worldAssets.props.truckGrey} alt="Pazarda park etmiş eski kamyon" />
          <img className={styles.stallTable} src={worldAssets.interior.desk} alt="İkinci el tezgâhı" />

          <div className={styles.itemSpot}>
            <img src={itemAsset} alt="Tezgâhtaki Raksen RX-40 kasetçalar" />
            <span>TEST EDİLMEDİ</span>
          </div>

          <div className={styles.buyerSpot}>
            <div className={styles.portrait} aria-hidden="true">
              <img className={styles.shirt} src={buyer.shirt.src} alt="" />
              <img className={styles.head} src={buyer.skin.src} alt="" />
              <img className={styles.face} src={buyer.face.src} alt="" />
              <img className={styles.hair} src={buyer.hair.src} alt="" />
            </div>
            <div>
              <span>{buyer.description}</span>
              <strong>{buyer.name}</strong>
              <small>{buyer.age} yaş • temkinli alıcı</small>
            </div>
          </div>

          <div className={styles.marketTag}>
            <span>İKİNCİ EL</span>
            <strong>Raksen RX-40</strong>
          </div>
        </div>
      </div>

      <div className={styles.dialogue}>
        <span>{buyer.name.toUpperCase()}</span>
        <p>“{dialogue}”</p>
      </div>

      {phase === "intro" && (
        <div className={styles.actions}>
          <GameButton type="button" onClick={inspect}>İncelemesine izin ver</GameButton>
          <GameButton variant="quiet" type="button" onClick={walkAway}>Şimdilik satma</GameButton>
        </div>
      )}

      {phase === "bargain" && (
        <div className={styles.tradePanel}>
          <div className={styles.offerBox}>
            <span>TEKLİF</span>
            <strong>{offer} ₺</strong>
            <small>Sabır {"●".repeat(patience)}{"○".repeat(3 - patience)}</small>
          </div>

          <div className={styles.actions}>
            <GameButton type="button" onClick={() => accept()}>{offer} ₺ kabul et</GameButton>
            <GameButton variant="secondary" type="button" onClick={() => counter(offer + 20)}>{offer + 20} ₺ iste</GameButton>
            <GameButton variant="secondary" type="button" onClick={() => counter(offer + 50)}>{offer + 50} ₺ iste</GameButton>
            <GameButton variant="quiet" type="button" onClick={walkAway}>Vazgeç</GameButton>
          </div>
        </div>
      )}

      {phase === "sold" && salePrice !== null && (
        <div className={styles.result}>
          <div><span>İLK SATIŞ</span><strong>+{salePrice} ₺</strong></div>
          <p>Kasetçalar Serkan&apos;ın, ilk sermaye cebinde.</p>
          <GameButton type="button" onClick={() => onSold(salePrice)}>Parayı al ve eve dön</GameButton>
        </div>
      )}

      {phase === "left" && (
        <div className={styles.result}>
          <div><span>PAZARLIK BİTTİ</span><strong>Satış yok</strong></div>
          <p>Ürün sende kaldı. Başka müşteri bekleyebilirsin.</p>
          <GameButton type="button" onClick={onLeave}>Eve dön</GameButton>
        </div>
      )}
    </section>
  );
}
