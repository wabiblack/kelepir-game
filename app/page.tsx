"use client";

import Link from "next/link";
import { useState } from "react";
import FirstMarketSale from "@/components/FirstMarketSale";

type Scene = "menu" | "intro" | "room" | "market";

const roomAsset = "/assets/rooms/eskiyaka/room_2002.svg";
const playerDirtyAsset = "/assets/items/cassette/raksen-rx40/dirty.svg";
const playerCleanAsset = "/assets/items/cassette/raksen-rx40/clean.svg";

export default function Home() {
  const [scene, setScene] = useState<Scene>("menu");
  const [money, setMoney] = useState(0);
  const [foundPlayer, setFoundPlayer] = useState(false);
  const [cleanedPlayer, setCleanedPlayer] = useState(false);
  const [familyPermission, setFamilyPermission] = useState(false);
  const [message, setMessage] = useState("Odan sessiz. Cebinde tek kuruş yok.");

  const startGame = () => {
    setScene("intro");
    window.setTimeout(() => setScene("room"), 1700);
  };

  const inspectBed = () => {
    if (!foundPlayer) {
      setFoundPlayer(true);
      setMessage("Yatağın altında toz içinde eski bir kasetçalar buldun. Raksen RX-40. Çalışıyor mu henüz bilmiyorsun.");
      return;
    }
    setMessage("Yatağın altını tekrar kontrol ettin. Başka para edecek bir şey görünmüyor.");
  };

  const inspectDrawer = () => {
    setMessage("Çekmecede iki kalem, eski bir otobüs bileti ve boş pil ambalajı var. Pil ambalajı aklına bir fikir getiriyor: kasetçaları test etmek için pil bulman gerekecek.");
  };

  const inspectDesk = () => {
    setMessage("Masada Kavşak İlanları gazetesi duruyor. İkinci el eşyalar telefon numarası yazılarak satılıyor. İnternet henüz herkesin cebinde değil.");
  };

  const askFamily = () => {
    setFamilyPermission(true);
    setMessage("Evdekilere sordun. 'Yıllardır kullanılmıyor, işine yarayacaksa sat' dediler. Kasetçalar artık satış için sende.");
  };

  const completeFirstSale = (amount: number) => {
    setMoney((current) => current + amount);
    setFoundPlayer(false);
    setScene("room");
    setMessage(`İlk satışını yaptın. Cebinde artık ${amount.toLocaleString("tr-TR")} ₺ var. Küçük görünüyor ama sıfırdan ilk sermayen bu.`);
  };

  if (scene === "menu") {
    return (
      <main className="menu-screen">
        <div className="grain" />
        <section className="menu-card">
          <p className="eyebrow">KAVŞAK • 2002</p>
          <h1>KELEPİR</h1>
          <p className="tagline">Sıfır paran var. Değeri başkalarının gözden kaçırdığı yerde bul.</p>
          <button className="primary-button" onClick={startGame}>Yeni Oyun</button>
          <Link className="asset-lab-link" href="/art-lab">Ücretsiz asset paketini aç</Link>
          <span className="version">prototip v0.4 • ilk pazarlık</span>
        </section>
      </main>
    );
  }

  if (scene === "intro") {
    return (
      <main className="intro-screen">
        <p>03 MART 2002</p>
        <h2>KAVŞAK</h2>
        <span>Eskiyaka Mahallesi</span>
      </main>
    );
  }

  if (scene === "market") {
    return (
      <main className="game-screen">
        <header className="hud">
          <div>
            <strong>03 Mart 2002</strong>
            <span>Pazar • 11:06 • Cumartesi Pazarı</span>
          </div>
          <div className="hud-right">
            <span className="status-chip">İlk satış peşinde</span>
            <div className="money">{money.toLocaleString("tr-TR")} ₺</div>
          </div>
        </header>

        <FirstMarketSale
          itemAsset={playerCleanAsset}
          onSold={completeFirstSale}
          onLeave={() => {
            setScene("room");
            setMessage("Pazardan satış yapmadan döndün. Raksen hâlâ sende. İstersen başka bir gün yeniden deneyebilirsin.");
          }}
        />
      </main>
    );
  }

  return (
    <main className="game-screen">
      <header className="hud">
        <div>
          <strong>03 Mart 2002</strong>
          <span>Pazar • 09:12 • Eskiyaka</span>
        </div>
        <div className="hud-right">
          <span className="status-chip">İşsiz</span>
          <div className="money">{money.toLocaleString("tr-TR")} ₺</div>
        </div>
      </header>

      <section className="room-wrap">
        <div className="room-heading">
          <div>
            <p className="eyebrow dark">BAŞLANGIÇ NOKTASI</p>
            <h2>Odan</h2>
          </div>
          <span className="location-tag">ESKİYAKA • KAVŞAK</span>
        </div>

        <div className="room-scene" aria-label="Eskiyaka'daki oda">
          <img className="room-art" src={roomAsset} alt="2002 yılında Eskiyaka'daki küçük oda" />

          <button className="scene-hotspot bed-hotspot" onClick={inspectBed} aria-label="Yatak altına bak">
            <span className="hotspot-dot" />
            <span className="hotspot-label">Yatak altına bak</span>
          </button>

          <button className="scene-hotspot desk-hotspot" onClick={inspectDesk} aria-label="Masayı incele">
            <span className="hotspot-dot" />
            <span className="hotspot-label">Masayı incele</span>
          </button>

          <button className="scene-hotspot drawer-hotspot" onClick={inspectDrawer} aria-label="Çekmeceyi karıştır">
            <span className="hotspot-dot" />
            <span className="hotspot-label">Çekmeceyi karıştır</span>
          </button>
        </div>

        <div className="story-box">
          <span className="story-kicker">GÖZLEM</span>
          <p>{message}</p>
        </div>

        {foundPlayer && (
          <section className={`item-card ${cleanedPlayer ? "is-clean" : "is-dirty"}`}>
            <div className="item-visual-wrap">
              <div className="item-visual-stage">
                <img
                  className="item-asset"
                  src={cleanedPlayer ? playerCleanAsset : playerDirtyAsset}
                  alt={cleanedPlayer ? "Temizlenmiş Raksen RX-40 kasetçalar" : "Kirli Raksen RX-40 kasetçalar"}
                />
                <span className="asset-state">{cleanedPlayer ? "TEMİZ" : "KİRLİ"}</span>
              </div>
              <p className="art-note">Ürün görselleri bağımsız asset olarak tutuluyor. Durum değiştikçe aynı ürün farklı görsel katmanlarla gösterilecek.</p>
            </div>

            <div className="item-info">
              <p className="eyebrow">İLK EŞYAN</p>
              <h3>Raksen RX-40</h3>
              <p className="item-subtitle">Taşınabilir stereo kasetçalar • 1990&apos;lar</p>

              <dl>
                <div><dt>Kozmetik</dt><dd>{cleanedPlayer ? "Orta / İyi" : "Kötü"}</dd></div>
                <div><dt>Kir</dt><dd>{cleanedPlayer ? "Düşük" : "Çok yüksek"}</dd></div>
                <div><dt>Çalışma</dt><dd>Bilinmiyor</dd></div>
                <div><dt>Satış izni</dt><dd>{familyPermission ? "Var" : "Yok"}</dd></div>
                <div><dt>Piyasa</dt><dd>?</dd></div>
              </dl>

              {!cleanedPlayer ? (
                <button
                  className="secondary-button"
                  onClick={() => {
                    setCleanedPlayer(true);
                    setMessage("Bezi ıslatıp kasayı dikkatlice sildin. Toz gidince cihazın gövdesi düşündüğünden daha iyi durumda çıktı.");
                  }}
                >
                  Temizle
                </button>
              ) : !familyPermission ? (
                <button className="secondary-button" onClick={askFamily}>Evdekilere satabilir miyim diye sor</button>
              ) : (
                <>
                  <button
                    className="secondary-button"
                    onClick={() => {
                      setScene("market");
                      setMessage("Raksen'i koltuğunun altına alıp Cumartesi Pazarı'nın yolunu tuttun.");
                    }}
                  >
                    Cumartesi Pazarı&apos;na götür
                  </button>
                  <div className="next-hint">
                    <strong>Risk</strong>
                    <span>Cihazı pil ile test etmedin. Alıcı bunu pazarlıkta kullanabilir.</span>
                  </div>
                </>
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
