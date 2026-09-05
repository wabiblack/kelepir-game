"use client";

import GameButton from "@/components/ui/GameButton";
import { worldAssets } from "@/data/worldAssets";
import styles from "./RoomHome.module.css";

type Props = {
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
  const itemAsset = cleanedPlayer ? playerCleanAsset : playerDirtyAsset;

  return (
    <section className={styles.shell}>
      <div className={styles.sceneHeader}>
        <div>
          <span>ESKİYAKA • KAVŞAK</span>
          <strong>Odan</strong>
        </div>
        <small>{firstItemSold ? "Pazar erişimi açık" : "03 Mart 2002"}</small>
      </div>

      <div className={styles.sceneFrame}>
        <div className={styles.scene} aria-label="Eskiyaka'daki küçük oda">
          <div className={styles.backdrop} aria-hidden="true">
            <img className={styles.wallLeft} src={worldAssets.interior.wallWindow} alt="" />
            <img className={styles.wallRight} src={worldAssets.interior.wall} alt="" />
            <img className={styles.floorOne} src={worldAssets.interior.floor} alt="" />
            <img className={styles.floorTwo} src={worldAssets.interior.floor} alt="" />
            <img className={styles.floorThree} src={worldAssets.interior.floor} alt="" />
            <img className={styles.rug} src={worldAssets.interior.rug} alt="" />
          </div>

          <img className={styles.bookcase} src={worldAssets.interior.bookcase} alt="Kitaplık" />
          <img className={styles.books} src={worldAssets.interior.books} alt="" aria-hidden="true" />

          <div className={styles.tvCorner} aria-hidden="true">
            <img className={styles.tvCabinet} src={worldAssets.interior.tvCabinet} alt="" />
            <img className={styles.vintageTv} src={worldAssets.interior.vintageTv} alt="" />
            <img className={styles.tvAntenna} src={worldAssets.interior.tvAntenna} alt="" />
          </div>

          <button className={`${styles.propButton} ${styles.bed}`} onClick={onInspectBed} aria-label="Yatağın altına bak">
            <img src={worldAssets.interior.bedSingle} alt="Tek kişilik yatak" />
            <span>Yatak</span>
          </button>

          <button className={`${styles.propButton} ${styles.desk}`} onClick={onInspectDesk} aria-label="Masayı incele">
            <img className={styles.deskAsset} src={worldAssets.interior.desk} alt="Çalışma masası" />
            <img className={styles.deskLamp} src={worldAssets.interior.tableLamp} alt="" aria-hidden="true" />
            <img className={styles.deskRadio} src={worldAssets.interior.radio} alt="" aria-hidden="true" />
            <span>Masa</span>
          </button>

          <img className={styles.deskChair} src={worldAssets.interior.deskChair} alt="Masa sandalyesi" />

          <button className={`${styles.propButton} ${styles.drawer}`} onClick={onInspectDrawer} aria-label="Çekmeceyi karıştır">
            <img src={worldAssets.interior.sideTableDrawers} alt="Çekmeceli komodin" />
            <span>Çekmece</span>
          </button>

          <img className={styles.floorLamp} src={worldAssets.interior.floorLamp} alt="Ayaklı lamba" />
          <img className={styles.boxOpen} src={worldAssets.interior.boxOpen} alt="Açık karton kutu" />
          <img className={styles.boxClosed} src={worldAssets.interior.boxClosed} alt="Kapalı karton kutu" />
          <img className={styles.plant} src={worldAssets.interior.smallPlant} alt="Küçük saksı bitkisi" />
          <img className={styles.trashcan} src={worldAssets.interior.trashcan} alt="Çöp kovası" />

          {firstItemSold ? (
            <button className={`${styles.propButton} ${styles.door}`} onClick={onGoSandbox} aria-label="Bit pazarına çık">
              <img src={worldAssets.interior.doorway} alt="Oda kapısı" />
              <span>Bit Pazarı</span>
            </button>
          ) : (
            <img className={styles.doorDecor} src={worldAssets.interior.doorway} alt="Oda kapısı" />
          )}

          {foundPlayer && (
            <div className={styles.foundItem} aria-label="Bulduğun Raksen RX-40">
              <img src={itemAsset} alt="Raksen RX-40 kasetçalar" />
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
              <img src={itemAsset} alt="Raksen RX-40" />
            </div>
            <div className={styles.itemMeta}>
              <strong>Raksen RX-40</strong>
              <span>{cleanedPlayer ? "Temiz" : "Kirli"} • Çalışması bilinmiyor</span>
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
              <strong>Bit Pazarı</strong>
              <span>Kapıya dokun veya doğrudan pazara çık.</span>
            </div>
            <GameButton className={styles.compactButton} onClick={onGoSandbox}>Pazara çık</GameButton>
          </div>
        )}
      </div>
    </section>
  );
}
