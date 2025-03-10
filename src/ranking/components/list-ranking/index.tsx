'use client';
import { SkeletonRanking } from '@/ranking/components/skeleton-ranking';
import { useGetRankingHook } from '@/ranking/hooks/use-get-ranking.hook';
import { getRankByIndex } from '@/ranking/utils/get-rank-by-index';
import { UserRanking } from '@/users/components/user-ranking';
import styles from './list-ranking.module.css';

export function ListRanking() {
  const { ranking, isLoading, error } = useGetRankingHook();

  if (isLoading) return <SkeletonRanking />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className={styles.container}>
      {ranking?.map(({ id, username, quantityBorders }, idx) => (
        <li key={idx} className={styles['list-item']}>
          <UserRanking
            id={id}
            rank={getRankByIndex(idx)}
            username={username}
            quantityBorders={quantityBorders}
          />
        </li>
      ))}
    </ul>
  );
}
