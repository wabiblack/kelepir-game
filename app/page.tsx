"use client";

import { useState } from "react";

type Scene = "menu" | "intro" | "room";

export default function Home() {
  const [scene, setScene] = useState<Scene>("menu");
  const [foundPlayer, setFoundPlayer] = useState(false);
  const [cleanedPlayer, setCleanedPlayer] = useState(false);
  const [message, setMessage] = useState("Odan sessiz. Cebinde tek kuruş yok.");

  const startGame = () => {
    setScene("intro");
    window.setTimeout(() => setScene("room"), 1700);
  };

  const inspectBed = () => {
    if (!foundPlayer) {
      setFoundPlayer(true);
      setMessage("Yatağın altında toz içinde eski bir kasetçalar buldun. Marka: Raksen RX-40. Çalışıyor mu bilmiyorsun.");
      return;
    }
    setMessage("Yatağın altında başka bir şey yok.");
  };

  const inspectDrawer = () => {
    setMessage("Çekmecede iki kalem, eski bir otobüs bileti ve boş pil ambalajı var. Şimdilik para edecek bir şey yok.");
  };

  const inspectDesk = () => {
    setMessage("Masada eski gazete ilanları duruyor. İnsanlar eşyalarını hâlâ telefon numarası yazarak satıyor.");
  };

  if (scene === "menu") {
    return (
      <main className="menu-screen">
        <div className="grain" />
        <section className="menu-card">
          <p className="eyebrow">KAVŞAK • 2002</p>
          <h1>KELEPİR</h1>
          <p className="tagline">Sıfır paran var. Gerisini sen çevireceksin.</p>
          <button className="primary-button" onClick={startGame}>Yeni Oyun</button>
          <span className="version">prototip v0.1</span>
        </section>
      </main>
    );
  }

  if (scene === "intro") {
    return (
      <main className="intro-screen">
        <p>2002</p>
        <h2>KAVŞAK</h2>
        <span>Eskiyaka Mahallesi</span>
      </main>
    );
  }

  return (
    <main className="game-screen">
      <header className="hud">
        <div>
          <strong>03 Mart 2002</strong>
          <span>Pazar • 09:12</span>
        </div>
        <div className="money">0 ₺</div>
      </header>

      <section className="room-wrap">
        <div className="room-title">
          <p>ESKİYAKA</p>
          <h2>Odan</h2>
        </div>

        <div className="room-scene" aria-label="Eskiyaka'daki oda">
          <div className="window"><div className="window-cross" /></div>
          <div className="poster">KAVŞAK<br /><small>FM 91.2</small></div>

          <button className="hotspot bed" onClick={inspectBed} aria-label="Yatak altına bak">
            <div className="bed-pillow" />
            <div className="bed-blanket" />
            <span>Yatak altına bak</span>
          </button>

          <button className="hotspot drawer" onClick={inspectDrawer} aria-label="Çekmeceyi karıştır">
            <i /><i /><i />
            <span>Çekmeceyi karıştır</span>
          </button>

          <button className="hotspot desk" onClick={inspectDesk} aria-label="Masaya bak">
            <div className="newspaper">İLAN</div>
            <span>Masaya bak</span>
          </button>

          <div className="floor-line" />
        </div>

        <div className="story-box">
          <p>{message}</p>
        </div>

        {foundPlayer && (
          <section className={`item-card ${cleanedPlayer ? "clean" : "dirty"}`}>
            <div className="cassette-player" aria-label="Raksen RX-40 kasetçalar çizimi">
              <div className="speaker speaker-left" />
              <div className="speaker speaker-right" />
              <div className="cassette-window">
                <i /><i />
              </div>
              <div className="buttons"><i /><i /><i /><i /></div>
              {!cleanedPlayer && <div className="dust dust-one" />}
              {!cleanedPlayer && <div className="dust dust-two" />}
              {!cleanedPlayer && <div className="dust dust-three" />}
            </div>

            <div className="item-info">
              <p className="eyebrow">İLK EŞYAN</p>
              <h3>Raksen RX-40</h3>
              <dl>
                <div><dt>Tür</dt><dd>Kasetçalar</dd></div>
                <div><dt>Durum</dt><dd>{cleanedPlayer ? "Temiz" : "Çok kirli"}</dd></div>
                <div><dt>Çalışma</dt><dd>Bilinmiyor</dd></div>
                <div><dt>Değer</dt><dd>?</dd></div>
              </dl>
              {!cleanedPlayer && (
                <button
                  className="secondary-button"
                  onClick={() => {
                    setCleanedPlayer(true);
                    setMessage("Kasetçaların üzerindeki yıllanmış tozu temizledin. Şimdi en azından neye benzediği belli.");
                  }}
                >
                  Temizle
                </button>
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
