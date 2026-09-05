import Link from "next/link";
import {
  assetPackMeta,
  customerFaces,
  customerFacialHairPreview,
  customerHairSamples,
  customerPackPreview,
  customerShirtSamples,
  customerSkinHeads,
} from "@/data/assetPacks";

function AssetStrip({ title, assets }: { title: string; assets: typeof customerFaces }) {
  return (
    <section className="customer-part-section">
      <div className="customer-part-heading">
        <h2>{title}</h2>
        <span>{assets.length} örnek</span>
      </div>
      <div className="customer-part-grid">
        {assets.map((asset) => (
          <article className="customer-part-card" key={asset.id}>
            <div className="customer-part-preview">
              <img src={asset.src} alt={asset.label} loading="lazy" />
            </div>
            <strong>{asset.label}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function CustomerAssetLabPage() {
  const characterPack = assetPackMeta.kenneyCharacters;

  return (
    <main className="customer-lab-screen">
      <header className="asset-lab-header">
        <div>
          <p className="eyebrow">KELEPİR • NPC LAB</p>
          <h1>Müşteriler</h1>
          <p>
            Tek tek müşteri çizmek yerine aynı sanat dilindeki parçaları birleştiriyoruz.
            Oyun her müşteriyi ten, yüz, saç, kıyafet ve ileride sakal/bıyık kombinasyonlarından üretecek.
          </p>
        </div>
        <Link className="asset-lab-back" href="/art-lab">Asset Lab&apos;e dön</Link>
      </header>

      <section className="customer-pack-hero">
        <div className="customer-pack-preview">
          <img src={customerPackPreview} alt="Kenney Character Pack önizlemesi" />
        </div>
        <div className="customer-pack-copy">
          <p className="eyebrow">ANA NPC PAKETİ</p>
          <h2>{characterPack.name}</h2>
          <p>{characterPack.usage}</p>
          <dl>
            <div><dt>Lisans</dt><dd>{characterPack.license}</dd></div>
            <div><dt>Ten tonu</dt><dd>{characterPack.skinTones}</dd></div>
            <div><dt>Saç rengi</dt><dd>{characterPack.hairColors}</dd></div>
            <div><dt>Hazır yüz</dt><dd>{characterPack.facePresets}</dd></div>
            <div><dt>Gömlek rengi</dt><dd>{characterPack.shirtColors}</dd></div>
          </dl>
        </div>
      </section>

      <section className="customer-role-list">
        <span>Mahalleli</span>
        <span>Bit pazarı satıcısı</span>
        <span>Müşteri</span>
        <span>Tamirci</span>
        <span>Galerici</span>
        <span>Koleksiyoncu</span>
        <span>Rehinci</span>
        <span>Esnaf</span>
      </section>

      <AssetStrip title="Ten tonları" assets={customerSkinHeads} />
      <AssetStrip title="Hazır yüzler" assets={customerFaces} />
      <AssetStrip title="Saç örnekleri" assets={customerHairSamples} />
      <AssetStrip title="Kıyafet örnekleri" assets={customerShirtSamples} />

      <section className="customer-facial-hair">
        <div>
          <p className="eyebrow">EK VARYASYON</p>
          <h2>Sakal & bıyık paketi</h2>
          <p>{assetPackMeta.kenneyFacialHair.usage}</p>
        </div>
        <img src={customerFacialHairPreview} alt="Kenney sakal ve bıyık paketi önizlemesi" />
      </section>

      <section className="customer-system-note">
        <strong>KELEPİR NPC sistemi</strong>
        <p>
          Görsel kombinasyon ayrı, karakter özellikleri ayrı tutulacak. Aynı görünümlü iki müşteri bile farklı bütçe,
          pazarlık sertliği, sabır, ürün bilgisi ve güven seviyesine sahip olabilecek.
        </p>
      </section>
    </main>
  );
}
