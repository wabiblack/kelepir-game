"use client";

import GameButton from "@/components/ui/GameButton";
import { pixelAssets } from "@/data/pixelAssets";
import styles from "./RoomHome.module.css";

type Props = {
  message: string;
  foundPlayer: boolean;
  cleanedPlayer: boolean;
  familyPermission: boolean;
  firstItemSold: boolean;
  onInspectBed: () => void;
  onInspectDesk: () => void;
  onInspectDrawer: () => void;
  onClean: () => void;
  onAskFamily: () => void;
  onGoMarket: () => void;
  onGoSandbox: () => void;
};

export default function RoomHome({
  message,
  foundPlayer,
  cleanedPlayer,
  familyPermission,
  firstItemSold,
  onInspectBed,
  onInspectDesk,
  onInspectDrawer,
  onClean,
  onAskFamily,
  onGoMarket,
  onGoSandbox,
}: Props) {
  const spriteStyle = { backgroundImage: `url(${pixelAssets.electronics.miscSheet})` };

  return (
    <section className={styles.shell}>
      <div className={styles.sceneFrame}>
        <div className={styles.scene} aria-label="Eskiyaka'daki küçük oda, karşıdan 2D pixel görünüm">
          <img
            className={styles.roomArt}
            src={pixelAssets.room.scene}
            alt="Eskiyaka'daki küçük pixel art oda"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = pixelAssets.room.fallbackScene;
            }}
          />

          <div className={styles.sceneTag} aria-hidden="true">
            <span>ESKİYAKA</span>
            <strong>ODA</strong>
          </div>

          <button className={`${styles.hotspot} ${styles.bedHotspot}`} type="button" onClick={onInspectBed}>
            <span>Yatak altı</span>
          </button>

          <button className={`${styles.hotspot} ${styles.deskHotspot}`} type="button" onClick={onInspectDesk}>
            <span>Masa</span>
          </button>

          <button className={`${styles.hotspot} ${styles.drawerHotspot}`} type="button" onClick={onInspectDrawer}>
            <span>Çekmece</span>
          </button>

          {firstItemSold ? (
            <button className={`${styles.hotspot} ${styles.doorHotspot}`} type="button" onClick={onGoSandbox}>
              <span>Bit Pazarı</span>
            </button>
          ) : (
            <div className={`${styles.hotspot} ${styles.doorHotspot} ${styles.lockedHotspot}`} aria-hidden="true">
              <span>Kapı</span>
            </div>
          )}

          {foundPlayer && (
            <div className={`${styles.foundItem} ${cleanedPlayer ? styles.cleanedItem : ""}`} aria-label="Bulduğun Raksen RX-40 kasetçalar">
              <div className={styles.pixelSpriteBox}>
                <span className={styles.boomboxSprite} style={spriteStyle} />
              </div>
              <small>RAKSEN RX-40</small>
            </div>
          )}
        </div>
      </div>

      <div className={styles.dock}>
        <div className={styles.messageBox}>
          <span>{foundPlayer ? "EŞYA" : firstItemSold ? "ODA" : "GÖZLEM"}</span>
          <p>{message}</p>
        </div>

        {foundPlayer && (
          <div className={styles.itemTray}>
            <div className={styles.itemThumb}>
              <span className={`${styles.boomboxSprite} ${cleanedPlayer ? styles.cleanSprite : ""}`} style={spriteStyle} />
            </div>
            <div className={styles.itemMeta}>
              <strong>Raksen RX-40</strong>
              <span>{cleanedPlayer ? "Temiz" : "Tozlu"} • Çalışması bilinmiyor</span>
              <small>Satış izni: {familyPermission ? "var" : "yok"}</small>
            </div>
            <div className={styles.itemAction}>
              {!cleanedPlayer ? (
                <GameButton className={styles.compactButton} variant="secondary" onClick={onClean}>Temizle</GameButton>
              ) : !familyPermission ? (
                <GameButton className={styles.compactButton} variant="secondary" onClick={onAskFamily}>Satış izni iste</GameButton>
              ) : (
                <GameButton className={styles.compactButton} onClick={onGoMarket}>Pazara götür</GameButton>
              )}
            </div>
          </div>
        )}

        {firstItemSold && !foundPlayer && (
          <div className={styles.marketDock}>
            <div>
              <strong>Bit Pazarı açık</strong>
              <span>Kapıya dokun veya buradan doğrudan çık.</span>
            </div>
            <GameButton className={styles.compactButton} onClick={onGoSandbox}>Pazara çık</GameButton>
          </div>
        )}
      </div>
    </section>
  );
}
