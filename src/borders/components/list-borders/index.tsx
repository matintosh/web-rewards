'use client';
import { useGetBordersHook } from '@/borders/hooks/use-get-borders.hook';
import { useSearchBordersHook } from '@/borders/hooks/use-search-borders.hook';
import { Rank } from '@/ranking/models/enums/rank.enum';
import { quantityBorderToRank } from '@/ranking/utils/quantity-border-to-rank';
import { InfiniteScrollObserver } from '@/shared/components/infinite-scroll';
import { BorderRank } from '../border-rank';
import styles from './list-borders.module.css';

interface Props {
  id: string;
}

export function ListBorders({ id }: Props) {
  const { filters } = useSearchBordersHook();
  const { data, isLoading, loadMore, isReachingEnd } = useGetBordersHook({
    id,
    search: filters.search,
    orderBy: filters.orderBy,
    sort: filters.sort,
  });

  return (
    <div className={styles.container}>
      <ul className={styles['list-borders-container']}>
        {data?.map(({ id, url, special, username, avatar, quantity, name }) => (
          <li key={id} className={styles['list-item']}>
            <BorderRank
              name={name}
              rank={special ? Rank.Challenger : quantityBorderToRank(quantity)}
              url={url}
              username={username}
              avatarUrl={avatar}
            />
          </li>
        ))}
      </ul>
      {!isReachingEnd && (
        <InfiniteScrollObserver onIntersect={loadMore} isLoading={isLoading} />
      )}
    </div>
  );
}
