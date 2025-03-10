import { UserBorderEntity } from '@/borders/models/entities/user-border.entity';

import { rewardsApiUrl } from '@/core/client-settings';
import { BorderSort } from '../models/enums/border-sort';
import { BordersOrderBy } from '../models/enums/borders-order-by.enum';
import { Pagination } from '../models/interfaces/pagination.interface';

type BordersByUsersIdProps = {
  id: string;
  page: number;
  filterByName?: string;
  orderBy: BordersOrderBy;
  sort: BorderSort;
};

export const getBordersByUserId = async ({
  id,
  page,
  filterByName,
  orderBy,
  sort,
}: BordersByUsersIdProps): Promise<{
  borders: UserBorderEntity[];
  pagination: Pagination;
}> => {
  const url = `${rewardsApiUrl}/borders/${id}`;
  const res = await fetch(
    `${url}?page=${page}&${filterByName ? `filterByName=${filterByName}$` : ''}orderBy=${orderBy}&sort=${sort}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      cache: 'no-store',
    }
  );

  const data = await res.json();
  if (!res.ok) throw data;
  return data as {
    borders: UserBorderEntity[];
    pagination: Pagination;
  };
};
