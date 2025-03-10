import { montserrat } from '@/consts/fonts';
import { ListRanking } from '@/ranking/components/list-ranking';
import { SkeletonRanking } from '@/ranking/components/skeleton-ranking';
import { Suspense } from 'react';
import styles from './ranking.module.css';

export default function RankingPage() {
  return (
    <main className={styles.container}>
      <h1 className={montserrat.className}>Los pilares de nuestra comunidad</h1>
      <Suspense fallback={<SkeletonRanking />}>
        <ListRanking />
      </Suspense>
    </main>
  );
}
