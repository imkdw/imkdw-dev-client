import Image from 'next/image';
import styles from './page.module.css';

export default function HomePage() {
  const title = 'Finetura Petuchia';

  return (
    <div className={styles.container}>
      <div className={`${styles.imageWrapper} ${styles.pulseAnimation}`}>
        <Image
          src="/images/angelic-buster.webp"
          alt="Angelic Buster"
          width={500}
          height={500}
          className={styles.image}
        />
      </div>

      <div className={`${styles.starsEffect} ${styles.sparkleEffect}`}>
        <h1 className={`${styles.title} ${styles.shimmerAnimation}`} data-text={title}>
          {title}
        </h1>

        <div className={styles.shootingStarContainer}>
          <div className={`${styles.shootingStar} ${styles.shootingStar1}`}></div>
          <div className={`${styles.shootingStar} ${styles.shootingStar2}`}></div>
          <div className={`${styles.shootingStar} ${styles.shootingStar3}`}></div>

          <div className={`${styles.popStar} ${styles.popStar1}`}></div>
          <div className={`${styles.popStar} ${styles.popStar2}`}></div>
          <div className={`${styles.popStar} ${styles.popStar3}`}></div>
        </div>
      </div>
    </div>
  );
}
