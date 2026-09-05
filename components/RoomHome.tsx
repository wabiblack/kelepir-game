"use client";

import { useState } from "react";
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
  const [roomSrc, setRoomSrc] = useState<string>(pixelAssets.room.scene);
  const [roomVisible, setRoomVisible] = useState(true);

  function handleRoomError() {
    if (roomSrc !== pixelAssets.room.fallbackScene) {
      setRoomSrc(pixelAssets.room.fallbackScene);
      return;
    }
    setRoomVisible(false);
  }

  return (
    <section className={styles.shell}>
      <div className={styles.sceneFrame}>
        <div className={styles.scene} aria-label="Eskiyaka'daki oda, karşıdan görünen 2D pixel art sahne">
          {roomVisible && (
            <img
              className={styles.roomArt}
              src={roomSrc}
              alt=""
              aria-hidden="true"
              onError={handleRoomError}
            />
          )}

          <button
            className={`${styles.hotspot} ${styles.bedHotspot}`}
            type="button"
            onClick={onInspectBed}
            aria-label="Yatak ve yatak altını incele"
          />

          <button
            className={`${styles.hotspot} ${styles.deskHotspot}`}
            type="button"
            onClick={onInspectDesk}
            aria-label="Masayı incele"
          />

          <button
            className={`${styles.hotspot} ${styles.drawerHotspot}`}
            type="button"
            onClick={onInspectDrawer}
            aria-label="Çekmeceyi incele"
          />

          {firstItemSold && (
            <button
              className={`${styles.hotspot} ${styles.doorHotspot}`}
              type="button"
              onClick={onGoSandbox}
              aria-label="Odadan çıkıp Bit Pazarı'na git"
            />
          )}

          {foundPlayer && (
            <div className={styles.foundBadge}>
              <span>BULUNDU</span>
              <strong>Raksen RX-40</strong>
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
              <strong>Bit Pazarı</strong>
              <span>Kapıdan çık veya buradan pazara dön.</span>
            </div>
            <GameButton className={styles.compactButton} onClick={onGoSandbox}>Pazara çık</GameButton>
          </div>
        )}
      </div>
    </section>
  );
}
