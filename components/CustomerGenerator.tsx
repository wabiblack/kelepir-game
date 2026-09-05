"use client";

import { useMemo, useState } from "react";
import {
  customerFaces,
  customerHairSamples,
  customerShirtSamples,
  customerSkinHeads,
} from "@/data/assetPacks";
import { generateDialogue, type DialogueSituation, type DialogueStyle } from "@/lib/dialogue";
import styles from "./CustomerGenerator.module.css";

const firstNames = [
  "Murat", "Serkan", "Hakan", "Burak", "Emre", "Yasin", "Kemal", "Tuncay",
  "Aylin", "Sevgi", "Derya", "Zeynep", "Seda", "Nermin", "Gül", "Bahar",
];

const surnames = [
  "Kaya", "Yıldız", "Demir", "Arslan", "Acar", "Koç", "Şahin", "Güneş",
  "Öztürk", "Korkmaz", "Keskin", "Bulut",
];

const roles = [
  "Mahalleli",
  "Bit pazarı satıcısı",
  "Esnaf",
  "Tamirci",
  "Koleksiyoncu",
  "Galerici",
  "Rehinci",
  "Öğrenci",
];

const attitudes = [
  "Uysal pazarlıkçı",
  "Sıkı pazarlıkçı",
  "Aceleci",
  "Şüpheci",
  "Ürün bilgisi yüksek",
  "Kolay ikna olur",
  "Fiyat takıntılı",
  "Sadık müşteri adayı",
];

const motives = [
  "Nakit lazım",
  "Evde fazlalık",
  "Daha iyisini alacak",
  "Fiyat araştırıyor",
  "Koleksiyon peşinde",
  "Acil alım yapacak",
  "Sadece bakıyor",
  "Takas düşünüyor",
];

const itemNames = [
  "kasetçalar",
  "21 ekran televizyon",
  "VCD oynatıcı",
  "cep telefonu",
  "bisiklet",
  "matkap",
  "müzik seti",
  "oyun konsolu",
];

const dialogueStyles: DialogueStyle[] = ["kisa", "geveze", "ukala", "kibar", "supheci", "aceleci", "pazarlikci"];

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type GeneratedCustomer = {
  id: number;
  name: string;
  role: string;
  age: number;
  attitude: string;
  motive: string;
  budget: number;
  patience: number;
  knowledge: number;
  trust: number;
  dialogueStyle: DialogueStyle;
  itemName: string;
  askingPrice: number;
  skin: (typeof customerSkinHeads)[number];
  face: (typeof customerFaces)[number];
  hair: (typeof customerHairSamples)[number];
  shirt: (typeof customerShirtSamples)[number];
};

const initialCustomer: GeneratedCustomer = {
  id: 1,
  name: "Murat Kaya",
  role: "Mahalleli",
  age: 34,
  attitude: "Sıkı pazarlıkçı",
  motive: "Nakit lazım",
  budget: 1850,
  patience: 6,
  knowledge: 4,
  trust: 5,
  dialogueStyle: "pazarlikci",
  itemName: "kasetçalar",
  askingPrice: 180,
  skin: customerSkinHeads[2],
  face: customerFaces[1],
  hair: customerHairSamples[3],
  shirt: customerShirtSamples[4],
};

function makeCustomer(id = Date.now()): GeneratedCustomer {
  const budget = rand(35, 900) * 10;
  return {
    id,
    name: `${pick(firstNames)} ${pick(surnames)}`,
    role: pick(roles),
    age: rand(18, 68),
    attitude: pick(attitudes),
    motive: pick(motives),
    budget,
    patience: rand(1, 10),
    knowledge: rand(1, 10),
    trust: rand(1, 10),
    dialogueStyle: pick(dialogueStyles),
    itemName: pick(itemNames),
    askingPrice: Math.max(40, Math.round((budget * (rand(8, 24) / 100)) / 10) * 10),
    skin: pick(customerSkinHeads),
    face: pick(customerFaces),
    hair: pick(customerHairSamples),
    shirt: pick(customerShirtSamples),
  };
}

function Meter({ value }: { value: number }) {
  return (
    <span className={styles.meter} aria-label={`${value} / 10`}>
      <i style={{ width: `${value * 10}%` }} />
    </span>
  );
}

export default function CustomerGenerator() {
  const [customer, setCustomer] = useState<GeneratedCustomer>(initialCustomer);
  const [history, setHistory] = useState<GeneratedCustomer[]>([]);
  const [recentDialogueIds, setRecentDialogueIds] = useState<string[]>(["g04"]);
  const [dialogue, setDialogue] = useState({
    id: "g04",
    text: "Bak şimdi, piyasasını az çok biliyorum. Kasetçalar için ölü fiyat söyleme.",
  });

  const initials = useMemo(
    () => customer.name.split(" ").map((part) => part[0]).join("").slice(0, 2),
    [customer.name],
  );

  function nextDialogue(target: GeneratedCustomer, situation: DialogueSituation) {
    const result = generateDialogue(
      {
        year: 2002,
        style: target.dialogueStyle,
        situation,
        itemName: target.itemName,
        askingPrice: target.askingPrice,
        playerOffer: Math.round(target.askingPrice * 0.55 / 10) * 10,
        relation: target.trust >= 8 ? "guvendigi" : target.trust <= 2 ? "gergin" : "yabanci",
      },
      recentDialogueIds,
    );

    setDialogue(result);
    setRecentDialogueIds((current) => [result.id, ...current].slice(0, 8));
  }

  function generate() {
    const next = makeCustomer();
    setHistory((current) => [customer, ...current].slice(0, 5));
    setCustomer(next);
    nextDialogue(next, "giris");
  }

  return (
    <section className={styles.generator}>
      <div className={styles.heading}>
        <div>
          <p className={styles.kicker}>CANLI NPC TESTİ</p>
          <h2>Müşteri üretici</h2>
          <p>Görünüş, karakter ve konuşma tarzı birlikte üretiliyor. Replik motoru 2002 dilini koruyor ve yakın zamanda kullanılan cümleleri tekrar etmiyor.</p>
        </div>
        <button type="button" onClick={generate}>Yeni müşteri üret</button>
      </div>

      <div className={styles.stage}>
        <div className={styles.portrait}>
          <div className={styles.portraitBackdrop} aria-hidden="true" />
          <img className={styles.shirt} src={customer.shirt.src} alt="" />
          <img className={styles.head} src={customer.skin.src} alt="" />
          <img className={styles.face} src={customer.face.src} alt="" />
          <img className={styles.hair} src={customer.hair.src} alt="" />
          <span className={styles.initials}>{initials}</span>
        </div>

        <div className={styles.profile}>
          <div className={styles.identity}>
            <div>
              <span>{customer.role}</span>
              <h3>{customer.name}</h3>
            </div>
            <strong>{customer.age} yaş</strong>
          </div>

          <div className={styles.tags}>
            <span>{customer.attitude}</span>
            <span>{customer.motive}</span>
            <span>Konuşma: {customer.dialogueStyle}</span>
          </div>

          <div className={styles.dialogueBox}>
            <span>2002 • {customer.itemName} • istediği {customer.askingPrice.toLocaleString("tr-TR")} ₺</span>
            <blockquote>“{dialogue.text}”</blockquote>
            <div className={styles.dialogueActions}>
              <button type="button" onClick={() => nextDialogue(customer, "giris")}>Başka giriş</button>
              <button type="button" onClick={() => nextDialogue(customer, "dusuk_teklif")}>Düşük teklif ver</button>
              <button type="button" onClick={() => nextDialogue(customer, "kabul")}>Anlaş</button>
            </div>
          </div>

          <dl className={styles.stats}>
            <div><dt>Bütçe</dt><dd>{customer.budget.toLocaleString("tr-TR")} ₺</dd></div>
            <div><dt>Sabır</dt><dd><Meter value={customer.patience} /></dd></div>
            <div><dt>Ürün bilgisi</dt><dd><Meter value={customer.knowledge} /></dd></div>
            <div><dt>Başlangıç güveni</dt><dd><Meter value={customer.trust} /></dd></div>
          </dl>

          <div className={styles.behaviour}>
            <span>OYUN DAVRANIŞI</span>
            <p>
              {customer.knowledge >= 7
                ? "Üründeki kusurları daha kolay fark eder ve piyasa fiyatından kopuk tekliflere zor ikna olur."
                : customer.patience <= 3
                  ? "Uzun pazarlıkta çabuk sıkılır. Doğru teklif gelirse hızlı karar verir."
                  : "Teklifi değerlendirir, küçük fiyat hareketlerine açıktır ve ilişki puanından etkilenir."}
            </p>
          </div>
        </div>
      </div>

      {history.length > 0 && (
        <div className={styles.history}>
          <span>SON ÜRETİLENLER</span>
          <div>
            {history.map((item) => (
              <article key={item.id}>
                <strong>{item.name}</strong>
                <small>{item.role} · {item.itemName} · {item.askingPrice.toLocaleString("tr-TR")} ₺</small>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
