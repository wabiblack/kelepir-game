import Link from "next/link";
import { assetPackMeta, kenneyGenericItems } from "@/data/assetPacks";

export default function ArtLabPage() {
  return (
    <main className="asset-lab-screen">
      <header className="asset-lab-header">
        <div>
          <p className="eyebrow">KELEPİR • GELİŞTİRİCİ EKRANI</p>
          <h1>Asset Lab</h1>
          <p>
            {assetPackMeta.kenneyGenericItems.name} paketindeki CC0 adayları.
            Burada beğendiğimiz parçaları oyunun eşya kataloğuna alacağız.
          </p>
        </div>
        <Link className="asset-lab-back" href="/">Oyuna dön</Link>
      </header>

      <section className="asset-lab-meta">
        <div><span>Paket</span><strong>{assetPackMeta.kenneyGenericItems.name}</strong></div>
        <div><span>Lisans</span><strong>{assetPackMeta.kenneyGenericItems.license}</strong></div>
        <div><span>Asset</span><strong>{assetPackMeta.kenneyGenericItems.itemCount}</strong></div>
        <div><span>Kullanım</span><strong>Envanter / küçük eşya</strong></div>
      </section>

      <section className="asset-grid">
        {kenneyGenericItems.map((asset) => (
          <article className="asset-tile" key={asset.id}>
            <div className="asset-tile-preview">
              <img src={asset.src} alt={asset.label} loading="lazy" />
            </div>
            <div className="asset-tile-info">
              <strong>{asset.label}</strong>
              <code>{asset.id}</code>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
