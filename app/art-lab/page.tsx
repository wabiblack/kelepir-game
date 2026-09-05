import Link from "next/link";
import styles from "./page.module.css";
import { assetPackMeta, customerPackPreview, kenneyGenericItems } from "@/data/assetPacks";

export default function ArtLabPage() {
  return (
    <main className="asset-lab-screen">
      <header className="asset-lab-header">
        <div>
          <p className="eyebrow">KELEPİR • GELİŞTİRİCİ EKRANI</p>
          <h1>Asset Lab</h1>
          <p>
            Ücretsiz ve uyumlu görsel paketlerini burada topluyoruz. Oyuna sadece aynı sanat dilini koruyan parçalar giriyor.
          </p>
        </div>
        <Link className="asset-lab-back" href="/">Oyuna dön</Link>
      </header>

      <section className={styles.switcher}>
        <article className={styles.card}>
          <div>
            <p className="eyebrow">EŞYALAR</p>
            <h2>{assetPackMeta.kenneyGenericItems.name}</h2>
            <p>{assetPackMeta.kenneyGenericItems.usage}</p>
          </div>
          <strong>{assetPackMeta.kenneyGenericItems.itemCount} asset</strong>
        </article>

        <Link className={`${styles.card} ${styles.customerLink}`} href="/art-lab/customers">
          <div className={styles.thumb}>
            <img src={customerPackPreview} alt="Müşteri karakter paketi" />
          </div>
          <div>
            <p className="eyebrow">MÜŞTERİLER / NPC</p>
            <h2>{assetPackMeta.kenneyCharacters.name}</h2>
            <p>Ten, yüz, saç ve kıyafet parçalarıyla yüzlerce farklı müşteri üret.</p>
            <strong>Müşteri paketini aç →</strong>
          </div>
        </Link>
      </section>

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
