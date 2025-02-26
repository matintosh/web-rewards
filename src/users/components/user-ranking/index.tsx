import { montserrat } from '@/consts/fonts';
import { Rank } from '@/ranking/models/enums/rank.enum';
import Link from 'next/link';
import { IconRank } from '../icon-rank';
import styles from './user-ranking.module.css';

interface Props {
  id: string;
  rank: Rank;
  username: string;
  quantityBorders: number;
}

const IconByRank = ({ rank }: { rank: Rank }) =>
  rank === Rank.Unranked ? (
    <IconRank rank={rank} width={80} height={60} />
  ) : (
    <IconRank rank={rank} width={80} height={80} />
  );

const UsernameItem = ({ username }: { username: string }) => (
  <h2 className={`${montserrat.className} ${styles.username}`}>{username}</h2>
);

const QuantityBorders = ({ quantityBorders }: { quantityBorders: number }) => (
  <h3 className={`${montserrat.className} ${styles['borders-detail']}`}>
    {quantityBorders}
  </h3>
);

export function UserRanking({ id, rank, username, quantityBorders }: Props) {
  return (
    <Link
      href={`/user/${id}`}
      className={`${styles.container} ${styles[`rank-${rank.toLowerCase()}`]}`}
    >
      <div style={{ alignSelf: 'center', justifySelf: 'center' }}>
        <IconByRank rank={rank} />
      </div>
      <UsernameItem username={username} />
      <div className={styles['details-container']}>
        <QuantityBorders quantityBorders={quantityBorders} />
        <p
          className={styles['borders-description']}
          style={{
            textShadow: '0px 0px 10px #000',
            width: '100%',
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 'var(--ui-kit-size-base)',
            fontWeight: 'var(--ui-kit-font-weight-bold)',
            color: 'var(--ui-kit-neutral-100)',
            margin: 0,
            padding: 0,
          }}
        >
          Bordes
        </p>
      </div>
    </Link>
  );
}
