export type DialogueStyle =
  | "kisa"
  | "geveze"
  | "ukala"
  | "kibar"
  | "supheci"
  | "aceleci"
  | "pazarlikci";

export type DialogueSituation =
  | "giris"
  | "dusuk_teklif"
  | "makul_teklif"
  | "kabul"
  | "ret"
  | "ayrilis";

export type DialogueContext = {
  year: number;
  style: DialogueStyle;
  situation: DialogueSituation;
  itemName: string;
  askingPrice?: number;
  playerOffer?: number;
  relation?: "yabanci" | "tanidik" | "guvendigi" | "gergin";
};

type DialogueTemplate = {
  id: string;
  text: string;
  styles?: DialogueStyle[];
  minYear?: number;
  maxYear?: number;
  relations?: NonNullable<DialogueContext["relation"]>[];
};

const templates: Record<DialogueSituation, DialogueTemplate[]> = {
  giris: [
    { id: "g01", text: "Selam. Şu {item} var, evde boş boş duruyor. Bir bakar mısın?", styles: ["kibar", "kisa"] },
    { id: "g02", text: "Usta, {item} getirdim. Çalışıyor ama ben artık kullanmıyorum.", styles: ["kisa", "aceleci"] },
    { id: "g03", text: "Bunun kıymetini bilen birine gitsin istiyorum. {item}, temiz sayılır.", styles: ["geveze", "kibar"] },
    { id: "g04", text: "Bak şimdi, piyasasını az çok biliyorum. {item} için ölü fiyat söyleme.", styles: ["ukala", "pazarlikci"] },
    { id: "g05", text: "Ben önce bir senden fiyat duyayım. {item} için ne verirsin?", styles: ["supheci", "pazarlikci"] },
    { id: "g06", text: "Nakit lazım. {item} bugün çıksın yeter, ama bedavaya da bırakmam.", styles: ["aceleci", "pazarlikci"] },
    { id: "g07", text: "Geçerken uğradım. Elimde bir {item} var, belki sen değerlendirirsin.", styles: ["kibar"] },
    { id: "g08", text: "Sana getirdim çünkü geçen sefer düzgün iş yaptın. Şu {item}e bir bak.", relations: ["guvendigi"] },
    { id: "g09", text: "Geçen seferki hesabı unutmadım. Bu kez {item} için baştan net konuşalım.", relations: ["gergin"] },
    { id: "g10", text: "İlanda uğraşmak istemedim, direkt sana getirdim. {item} için {ask} düşünüyorum.", minYear: 2010 },
    { id: "g11", text: "Uygulamada millet uçmuş, ben o kadar istemiyorum. {item} için {ask} yeter.", minYear: 2020 },
    { id: "g12", text: "Gazeteye ilan vermekle uğraşmayayım dedim. {item} için {ask} olur mu?", maxYear: 2007 },
  ],
  dusuk_teklif: [
    { id: "d01", text: "{offer}? Yok artık. Kasayı mı alıyorsun, içindekini mi?", styles: ["ukala"] },
    { id: "d02", text: "O para olmaz. Biraz daha çık, ortada buluşalım.", styles: ["pazarlikci", "kibar"] },
    { id: "d03", text: "Ben acele ediyorum diye malı çöpe atacak değilim.", styles: ["aceleci"] },
    { id: "d04", text: "Bak, fiyatı biliyorum. {offer} dersen burada anlaşamayız.", styles: ["supheci", "ukala"] },
    { id: "d05", text: "Yok, o rakama eve geri götürürüm.", styles: ["kisa", "pazarlikci"] },
    { id: "d06", text: "Sen de kazan ama ben de pişman olmayayım. Bir tık daha çık.", styles: ["kibar"] },
    { id: "d07", text: "İlk teklifin buysa ikinciyi merak ettim. Hadi bir daha düşün.", styles: ["geveze", "pazarlikci"] },
    { id: "d08", text: "Beni yabancı gördün herhalde. {item} o paraya gitmez.", relations: ["tanidik", "guvendigi"] },
  ],
  makul_teklif: [
    { id: "m01", text: "Yaklaştın. Biraz daha koy, el sıkışalım." },
    { id: "m02", text: "Kötü değil. {ask} demiştim ama arayı kapatabiliriz.", styles: ["pazarlikci"] },
    { id: "m03", text: "Düşüneyim... Tam sınırdasın şu an.", styles: ["supheci"] },
    { id: "m04", text: "Olur gibi. Ufak bir şey daha yaparsan bırakırım.", styles: ["kibar", "aceleci"] },
    { id: "m05", text: "Heh, şimdi konuşuyoruz. İlk tekliften iyidir.", styles: ["ukala", "geveze"] },
  ],
  kabul: [
    { id: "k01", text: "Tamamdır, hayrını gör. Ben de işimi göreyim." },
    { id: "k02", text: "Peki, anlaştık. Uzatmayalım.", styles: ["kisa", "aceleci"] },
    { id: "k03", text: "Tamam, sana bıraktım. İnşallah iyi para kazanırsın.", styles: ["kibar"] },
    { id: "k04", text: "Bu seferlik olur. Ama bir dahaki sefere bu kadar kolay değil.", styles: ["ukala", "pazarlikci"] },
    { id: "k05", text: "Tamamdır. Zaten sana getirmemin sebebi uğraştırmaman.", relations: ["guvendigi"] },
  ],
  ret: [
    { id: "r01", text: "Yok, bu iş olmadı. Ben biraz daha bakınayım." },
    { id: "r02", text: "Kalsın. O fiyata satacağıma evde dursun.", styles: ["kisa", "ukala"] },
    { id: "r03", text: "Bugün anlaşamayacağız belli. Başka yere de soracağım.", styles: ["supheci"] },
    { id: "r04", text: "Benim acelem var ama o kadar da değil. Sağ ol.", styles: ["aceleci"] },
    { id: "r05", text: "Senden böyle teklif beklemezdim. Sonra yine konuşuruz.", relations: ["tanidik", "guvendigi"] },
  ],
  ayrilis: [
    { id: "a01", text: "Hadi kolay gelsin. Bir şey çıkarsa yine uğrarım." },
    { id: "a02", text: "Eyvallah. Mahallede denk gelirsek konuşuruz.", maxYear: 2012 },
    { id: "a03", text: "Tamam, numaran bende. Bir şey olursa haberleşiriz.", minYear: 2005 },
    { id: "a04", text: "İlanı kaldırırım artık. Kolay gelsin.", minYear: 2010 },
    { id: "a05", text: "Uygulamadan da yorum bırakırım, sıkıntı yok.", minYear: 2020, relations: ["guvendigi"] },
  ],
};

function money(value?: number) {
  return typeof value === "number" ? `${value.toLocaleString("tr-TR")} ₺` : "bu rakamı";
}

function render(template: string, context: DialogueContext) {
  return template
    .replaceAll("{item}", context.itemName)
    .replaceAll("{ask}", money(context.askingPrice))
    .replaceAll("{offer}", money(context.playerOffer));
}

export function generateDialogue(context: DialogueContext, recentIds: string[] = []) {
  const relation = context.relation ?? "yabanci";
  const pool = templates[context.situation].filter((template) => {
    const yearOk = (template.minYear ?? -Infinity) <= context.year && context.year <= (template.maxYear ?? Infinity);
    const styleOk = !template.styles || template.styles.includes(context.style);
    const relationOk = !template.relations || template.relations.includes(relation);
    return yearOk && styleOk && relationOk;
  });

  const broadPool = templates[context.situation].filter((template) => {
    const yearOk = (template.minYear ?? -Infinity) <= context.year && context.year <= (template.maxYear ?? Infinity);
    const relationOk = !template.relations || template.relations.includes(relation);
    return yearOk && relationOk;
  });

  const candidates = (pool.length >= 2 ? pool : broadPool).filter((template) => !recentIds.includes(template.id));
  const finalPool = candidates.length > 0 ? candidates : (pool.length > 0 ? pool : broadPool);
  const chosen = finalPool[Math.floor(Math.random() * finalPool.length)];

  return {
    id: chosen.id,
    text: render(chosen.text, context),
  };
}
