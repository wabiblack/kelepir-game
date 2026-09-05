"use client";

import GameButton from "@/components/ui/GameButton";
import styles from "./RoomHome.module.css";

type Props = {
  roomAsset: string;
  playerDirtyAsset: string;
  playerCleanAsset: string;
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
  roomAsset,
  playerDirtyAsset,
  playerCleanAsset,
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
  return (
    <section className={styles.shell}>
      <div className={styles.sceneCard}>
        <div className={styles.sceneHeader}>
          <div>
            <span className={styles.kicker}>{firstItemSold ? "MERKEZ" : "BAŞLANGIÇ NOKTASI"}</span>
            <strong>Odan</strong>
          </div>
          <span className={styles.location}>ESKİYAKA • KAVŞAK</span>
        </div>

        <div className={styles.scene} aria-label="Eskiyaka'daki oda">
          <img src={roomAsset} alt="2002 yılında Eskiyaka'daki küçük oda" />

          <button className={`${styles.hotspot} ${styles.bed}`} onClick={onInspectBed} aria-label="Yatak altına bak">
            <span className={styles.dot} />
            <span className={styles.tooltip}>Yatak altı</span>
          </button>

          <button className={`${styles.hotspot} ${styles.desk}`} onClick={onInspectDesk} aria-label="Masayı incele">
            <span className={styles.dot} />
            <span className={styles.tooltip}>Masa</span>
          </button>

          <button className={`${styles.hotspot} ${styles.drawer}`} onClick={onInspectDrawer} aria-label="Çekmeceyi karıştır">
            <span className={styles.dot} />
            <span className={styles.tooltip}>Çekmece</span>
          </button>

          {firstItemSold && (
            <div className={styles.unlockedBadge}>
              <span>SERBEST OYUN</span>
              <strong>Pazar açıldı</strong>
            </div>
          )}
        </div>
      </div>

      <div className={styles.bottomPanel}>
        <div className={styles.observation}>
          <span>GÖZLEM</span>
          <p>{message}</p>
        </div>

        {firstItemSold && (
          <div className={styles.marketAction}>
            <div>
              <span>SONRAKİ HAMLE</span>
              <strong>Bit Pazarı</strong>
              <small>Mal bak, incele, pazarlık et.</small>
            </div>
            <GameButton onClick={onGoSandbox}>Pazara çık</GameButton>
          </div>
        )}
      </div>

      {foundPlayer && (
        <section className={styles.itemSheet}>
          <div className={styles.itemVisual}>
            <img
              src={cleanedPlayer ? playerCleanAsset : playerDirtyAsset}
              alt={cleanedPlayer ? "Temizlenmiş Raksen RX-40 kasetçalar" : "Kirli Raksen RX-40 kasetçalar"}
            />
            <span>{cleanedPlayer ? "TEMİZ" : "KİRLİ"}</span>
          </div>

          <div className={styles.itemInfo}>
            <div className={styles.itemTitle}>
              <div>
                <span>İLK EŞYAN</span>
                <h3>Raksen RX-40</h3>
                <p>Taşınabilir stereo kasetçalar • 1990&apos;lar</p>
              </div>
              <strong className={styles.unknown}>?</strong>
            </div>

            <div className={styles.stats}>
              <div><span>Kozmetik</span><strong>{cleanedPlayer ? "Orta / İyi" : "Kötü"}</strong></div>
              <div><span>Çalışma</span><strong>Bilinmiyor</strong></div>
              <div><span>Satış izni</span><strong>{familyPermission ? "Var" : "Yok"}</strong></div>
            </div>

            <div className={styles.itemAction}>
              {!cleanedPlayer ? (
                <GameButton variant="secondary" onClick={onClean}>Temizle</GameButton>
              ) : !familyPermission ? (
                <GameButton variant="secondary" onClick={onAskFamily}>Satış izni iste</GameButton>
              ) : (
                <>
                  <GameButton onClick={onGoMarket}>Cumartesi Pazarı&apos;na götür</GameButton>
                  <small>Çalışması test edilmedi. Bu durum pazarlık gücünü düşürebilir.</small>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
