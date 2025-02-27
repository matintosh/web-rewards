import useSWRInfinite from 'swr/infinite';
import { UserBorderEntity } from '../models/entities/user-border.entity';
import { BorderSort } from '../models/enums/border-sort';
import { BordersOrderBy } from '../models/enums/borders-order-by.enum';
import { getBordersByUserId } from '../services/borders';

interface Props {
  id: string;
  search: string;
  orderBy: BordersOrderBy;
  sort: BorderSort;
}

export function useGetBordersHook({ id, search, orderBy, sort }: Props) {
  const { data, size, setSize, isValidating, error } = useSWRInfinite(
    (index) => ({
      id,
      page: index + 1,
      filterByName: search,
      orderBy,
      sort,
    }),
    getBordersByUserId
  );

  const borders: UserBorderEntity[] = data
    ? data.flatMap((page) => page.borders)
    : [];

  const totalPages = data?.[0]?.pagination.totalPages ?? 1;
  const isReachingEnd = size - 1 >= totalPages;

  return {
    data: borders,
    isLoading: isValidating,
    error,
    loadMore: () => !isReachingEnd && setSize(size + 1),
    isReachingEnd,
  };
}
