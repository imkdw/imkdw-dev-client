import Image from 'next/image';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IMKDW Dev | Memo',
  description: 'IMKDW Dev | Memo',
  openGraph: {
    type: 'website',
    description: 'IMKDW Dev | Memo',
    url: 'https://memo.imkdw.dev',
    siteName: 'IMKDW Dev | Memo',
    images: [
      {
        url: '/images/angelic-buster.webp',
      },
    ],
  },
};

export default function HomePage() {
  const title = 'The Maplestory idol, Angelic Buster!';

  return (
    <div className={styles.container}>
      <div className={`${styles.imageWrapper} ${styles.pulseAnimation}`}>
        <Image
          src='/images/angelic-buster.webp'
          alt='Angelic Buster'
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
          <div className={`${styles.shootingStar} ${styles.shootingStar1}`} />
          <div className={`${styles.shootingStar} ${styles.shootingStar2}`} />
          <div className={`${styles.shootingStar} ${styles.shootingStar3}`} />

          <div className={`${styles.popStar} ${styles.popStar1}`} />
          <div className={`${styles.popStar} ${styles.popStar2}`} />
          <div className={`${styles.popStar} ${styles.popStar3}`} />
        </div>
      </div>
    </div>
  );
}
