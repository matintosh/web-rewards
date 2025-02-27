'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BorderSort } from '../models/enums/border-sort';
import { BordersOrderBy } from '../models/enums/borders-order-by.enum';

interface Filters {
  page: number;
  search: string;
  orderBy: BordersOrderBy;
  sort: BorderSort;
}

export function useSearchBordersHook() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    page: 0,
    search: '',
    orderBy: BordersOrderBy.Rank,
    sort: BorderSort.Desc,
  });

  useEffect(() => {
    const newPage = Number(searchParams.get('page'));
    const sortParam = searchParams.get('sort') as BorderSort;
    const orderByParam = searchParams.get('orderBy') as BordersOrderBy;
    setFilters({
      page: isNaN(newPage) ? 0 : newPage,
      search: searchParams.get('search') || '',
      orderBy: Object.values(BordersOrderBy).includes(orderByParam)
        ? orderByParam
        : BordersOrderBy.Rank,
      sort: Object.values(BorderSort).includes(sortParam)
        ? sortParam
        : BorderSort.Desc,
    });
  }, [searchParams]);

  return {
    filters,
  };
}
