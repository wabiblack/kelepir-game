"use client";

import Link from "next/link";
import GameButton from "@/components/ui/GameButton";
import { worldAssets } from "@/data/worldAssets";
import styles from "./OpeningScene.module.css";

type Props =
  | { mode: "menu"; onStart: () => void }
  | { mode: "intro" };

export default function OpeningScene(props: Props) {
  if (props.mode === "intro") {
    return (
      <main className={`${styles.screen} ${styles.intro}`}>
        <img className={styles.introBackdrop} src={worldAssets.cityPreview} alt="Kavşak şehrinin retro şehir görünümü" />
        <div className={styles.introShade} />
        <img className={styles.truck} src={worldAssets.props.truckGreen} alt="" aria-hidden="true" />
        <section className={styles.introTitle}>
          <p>03 MART 2002</p>
          <h2>KAVŞAK</h2>
          <span>Eskiyaka Mahallesi</span>
        </section>
      </main>
    );
  }

  return (
    <main className={`${styles.screen} ${styles.menu}`}>
      <img className={styles.menuBackdrop} src={worldAssets.menuScene} alt="Kavşak şehrinin retro sokak görünümü" />
      <div className={styles.menuShade} />
      <div className={styles.scanlines} />

      <section className={styles.menuCard}>
        <div className={styles.yearTag}>KAVŞAK • 2002</div>
        <h1>KELEPİR</h1>
        <p>Sıfır paran var. Değeri başkalarının gözden kaçırdığı yerde bul.</p>
        <GameButton onClick={props.onStart}>Yeni Oyun</GameButton>
        <Link href="/art-lab">Asset arşivi</Link>
        <small>v0.8 • asset tabanlı dünya</small>
      </section>

      <div className={styles.streetDetail} aria-hidden="true">
        <img src={worldAssets.props.streetLight} alt="" />
        <img src={worldAssets.props.dumpsterClosed} alt="" />
      </div>
    </main>
  );
}
