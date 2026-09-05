"use client";

import { useState } from "react";
import FirstMarketSale from "@/components/FirstMarketSale";
import SandboxMarket from "@/components/SandboxMarket";
import RoomHome from "@/components/RoomHome";
import OpeningScene from "@/components/OpeningScene";

type Scene = "menu" | "intro" | "room" | "market" | "sandbox";

const playerDirtyAsset = "assets/items/cassette/raksen-rx40/dirty.svg";
const playerCleanAsset = "assets/items/cassette/raksen-rx40/clean.svg";

export default function Home() {
  const [scene, setScene] = useState<Scene>("menu");
  const [money, setMoney] = useState(0);
  const [foundPlayer, setFoundPlayer] = useState(false);
  const [cleanedPlayer, setCleanedPlayer] = useState(false);
  const [familyPermission, setFamilyPermission] = useState(false);
  const [firstItemSold, setFirstItemSold] = useState(false);
  const [message, setMessage] = useState("Odan sessiz. Cebinde tek kuruş yok.");

  const startGame = () => {
    setMoney(0);
    setFoundPlayer(false);
    setCleanedPlayer(false);
    setFamilyPermission(false);
    setFirstItemSold(false);
    setMessage("Odan sessiz. Cebinde tek kuruş yok.");
    window.localStorage.removeItem("kelepir-economy-v1");
    setScene("intro");
    window.setTimeout(() => setScene("room"), 1700);
  };

  const inspectBed = () => {
    if (firstItemSold) {
      setMessage("Yatağın altı artık boş. Raksen'i sattın, aynı yerden ikinci kez sermaye çıkmayacak.");
      return;
    }

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
    setFirstItemSold(true);
    setScene("room");
    setMessage(`İlk satış tamam. ${amount.toLocaleString("tr-TR")} ₺ sermayen var. Bundan sonra hangi mala gireceğine sen karar veriyorsun.`);
  };

  if (scene === "menu") {
    return <OpeningScene mode="menu" onStart={startGame} />;
  }

  if (scene === "intro") {
    return <OpeningScene mode="intro" />;
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

  if (scene === "sandbox") {
    return (
      <main className="game-screen">
        <header className="hud">
          <div>
            <strong>03 Mart 2002</strong>
            <span>Pazar • 13:18 • Eskiyaka Bit Pazarı</span>
          </div>
          <div className="hud-right">
            <span className="status-chip">Serbest tüccar</span>
            <div className="money">{money.toLocaleString("tr-TR")} ₺</div>
          </div>
        </header>

        <SandboxMarket
          money={money}
          onMoneyChange={setMoney}
          onLeave={() => {
            setScene("room");
            setMessage("Pazardan eve döndün. Aldığın mallar ve kasa hareketlerin kayıtlı kaldı.");
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
          <span className="status-chip">{firstItemSold ? "Acemi tüccar" : "İşsiz"}</span>
          <div className="money">{money.toLocaleString("tr-TR")} ₺</div>
        </div>
      </header>

      <RoomHome
        playerDirtyAsset={playerDirtyAsset}
        playerCleanAsset={playerCleanAsset}
        message={message}
        foundPlayer={foundPlayer}
        cleanedPlayer={cleanedPlayer}
        familyPermission={familyPermission}
        firstItemSold={firstItemSold}
        onInspectBed={inspectBed}
        onInspectDesk={inspectDesk}
        onInspectDrawer={inspectDrawer}
        onClean={() => {
          setCleanedPlayer(true);
          setMessage("Bezi ıslatıp kasayı dikkatlice sildin. Toz gidince cihazın gövdesi düşündüğünden daha iyi durumda çıktı.");
        }}
        onAskFamily={askFamily}
        onGoMarket={() => {
          setScene("market");
          setMessage("Raksen'i koltuğunun altına alıp Cumartesi Pazarı'nın yolunu tuttun.");
        }}
        onGoSandbox={() => setScene("sandbox")}
      />
    </main>
  );
}
