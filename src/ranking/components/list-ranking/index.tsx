import { getRanking } from '@/ranking/services/ranking';
import { getRankByIndex } from '@/ranking/utils/get-rank-by-index';
import { UserRanking } from '@/users/components/user-ranking';
import styles from './list-ranking.module.css';

export async function ListRanking() {
  const { ranking } = await getRanking();

  return (
    <ul className={styles.container}>
      {ranking.map(({ id, username, quantityBorders }, idx) => (
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
