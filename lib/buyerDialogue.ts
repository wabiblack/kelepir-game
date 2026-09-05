export type BuyerDialogueSituation =
  | "giris"
  | "inceleme"
  | "yuksek_fiyat"
  | "yaklasti"
  | "kabul"
  | "ayrilis";

type BuyerDialogueContext = {
  situation: BuyerDialogueSituation;
  itemName: string;
  offer?: number;
  counter?: number;
  year: number;
};

type Template = {
  id: string;
  text: string;
  minYear?: number;
  maxYear?: number;
};

const templates: Record<BuyerDialogueSituation, Template[]> = {
  giris: [
    { id: "bg01", text: "Kolay gelsin. Şu {item} satılık mı? Bir bakabilir miyim?" },
    { id: "bg02", text: "Abi bunu az önce gördüm. {item} için ne düşünüyorsun?" },
    { id: "bg03", text: "Şu {item} dikkatimi çekti. Çalışıyor mu bunun?" },
    { id: "bg04", text: "Tezgahtaki {item} senin mi? Temiz duruyor." },
    { id: "bg05", text: "Birader şu {item}e bakıyordum. Fiyatı nedir?" },
  ],
  inceleme: [
    { id: "bi01", text: "Kasası fena değil ama çalıştığını bilmiyoruz. Riski ben alacağım." },
    { id: "bi02", text: "Temizlemişsin, güzel. Ama pil takıp denemeden tam para veremem." },
    { id: "bi03", text: "Dışarıdan iyi görünüyor. İçinden ne çıkacağı belli değil tabii." },
    { id: "bi04", text: "Kapak sağlam, düğmeler yerinde. Çalışırsa iş görür." },
    { id: "bi05", text: "Bunun gibi cihazlarda kayış işi çıkabiliyor. Ona göre fiyat söyleyeceğim." },
  ],
  yuksek_fiyat: [
    { id: "by01", text: "{counter} fazla. Çalıştığı belli olmayan mala o parayı veremem." },
    { id: "by02", text: "O rakam beni aşar. Benim teklifim {offer}." },
    { id: "by03", text: "Yok abi, {counter} dersen ben çekileyim. Riskli cihaz sonuçta." },
    { id: "by04", text: "Sen satıcı tarafını söyledin, ben alıcı tarafını söyleyeyim: {offer}." },
    { id: "by05", text: "Biraz insaf. Çalışsa başka, ama şu an elimizde sadece görüntüsü var." },
  ],
  yaklasti: [
    { id: "bk01", text: "Yaklaştık. {offer} yapayım, bitsin." },
    { id: "bk02", text: "Hadi ortada buluşalım. Ben {offer} vereyim." },
    { id: "bk03", text: "Tam sınırıma geldik. {offer} son olsun." },
    { id: "bk04", text: "Biraz daha kırarsan alırım. {offer} benden çıkar." },
    { id: "bk05", text: "Tamam, iş ciddiye bindi. {offer}e el sıkışırım." },
  ],
  kabul: [
    { id: "ba01", text: "Tamamdır. Hayırlı olsun, ben bunu alıyorum." },
    { id: "ba02", text: "Anlaştık. Ver cihazı, parayı sayayım." },
    { id: "ba03", text: "Olur. Çalışırsa güzel alışveriş yaptım." },
    { id: "ba04", text: "Peki, el sıkıştık. İlk tekliften buraya geldik yine." },
    { id: "ba05", text: "Tamam abi. Paketle, bende kalsın." },
  ],
  ayrilis: [
    { id: "bx01", text: "Kısmet değilmiş. Bir tur atayım, belki sonra uğrarım." },
    { id: "bx02", text: "Ben o rakama çıkamam. Kolay gelsin." },
    { id: "bx03", text: "Fiyat düşerse buradayım. Şimdilik kalsın." },
    { id: "bx04", text: "Olmadı abi. Başka tezgâhlara da bakacağım." },
    { id: "bx05", text: "Bugün anlaşamadık. Belki haftaya yine denk geliriz." },
  ],
};

function money(value?: number) {
  return typeof value === "number" ? `${value.toLocaleString("tr-TR")} ₺` : "o rakam";
}

function render(text: string, context: BuyerDialogueContext) {
  return text
    .replaceAll("{item}", context.itemName)
    .replaceAll("{offer}", money(context.offer))
    .replaceAll("{counter}", money(context.counter));
}

export function generateBuyerDialogue(context: BuyerDialogueContext, recentIds: string[] = []) {
  const yearPool = templates[context.situation].filter((template) =>
    (template.minYear ?? -Infinity) <= context.year && context.year <= (template.maxYear ?? Infinity),
  );
  const freshPool = yearPool.filter((template) => !recentIds.includes(template.id));
  const pool = freshPool.length > 0 ? freshPool : yearPool;
  const chosen = pool[Math.floor(Math.random() * pool.length)];

  return {
    id: chosen.id,
    text: render(chosen.text, context),
  };
}
