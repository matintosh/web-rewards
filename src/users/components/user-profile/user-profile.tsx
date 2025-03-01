'use client';
import { montserrat } from '@/consts/fonts';
import { Rank } from '@/ranking/models/enums/rank.enum';
import { useGetProfileHook } from '@/users/hooks/use-get-profile.hook';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IconRank } from '../icon-rank';
import styles from './user-profile.module.css';

interface Props {
  id: string;
}

export function UserProfile({ id }: Props) {
  const { data, isLoading, error } = useGetProfileHook({ id });
  const user = data;
  const { username, avatar, rank, quantityBorders } = user || { undefined };

  if (isLoading)
    return (
      <div className={styles.container}>
        <Link href="/ranking" className={styles['nav-link']}>
          Volver
        </Link>
      </div>
    );

  if (error) return redirect('/');

  return (
    <div
      className={`${styles.container} ${styles[`container-${rank?.toLowerCase()}`]}`}
    >
      <Link href="/ranking" className={styles['nav-link']}>
        Volver
      </Link>
      <Image
        src={`${avatar}`}
        className={styles.avatar}
        loading="eager"
        alt={`Avatar ${username}`}
        width={100}
        height={100}
      />
      <div className={styles.detail}>
        <h1 className={`${montserrat.className} ${styles.username}`}>
          {username?.slice(0, 14)}
          {username && username.length > 14 && '...'}
        </h1>
        {rank && (
          <IconRank
            rank={rank}
            width={80}
            height={rank === Rank.Unranked ? 65 : 80}
          />
        )}
      </div>
      <div className={styles.detail}>
        <p className={`${styles.borders}`}>Bordes</p>
        <h2 className={`${montserrat.className} ${styles['quantity-borders']}`}>
          {quantityBorders}
        </h2>
      </div>
    </div>
  );
}
