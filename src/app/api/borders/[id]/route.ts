import { UserBorderEntity } from '@/borders/models/entities/user-border.entity';
import { BorderSort } from '@/borders/models/enums/border-sort';
import { BordersOrderBy } from '@/borders/models/enums/borders-order-by.enum';
import bordersJson from '@public/data/boders.json';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export function GET(request: NextRequest) {
  const { borders } = bordersJson;
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const page = Number(searchParams.get('page') || 1);
  const pageSize = 8;
  const orderBy =
    url.searchParams.get('orderBy') === BordersOrderBy.Rank
      ? BordersOrderBy.Rank
      : BordersOrderBy.CreatedAt;
  const sort =
    url.searchParams.get('sort') === BorderSort.Desc
      ? BorderSort.Desc
      : BorderSort.Asc;
  const filterByName = url.searchParams.get('filterByName') || '';
  const pathname = request.nextUrl.pathname;
  const id = pathname.split('/')[3] as keyof typeof borders;
  if (!id || !(id in borders))
    return NextResponse.json({ message: 'Border not found' }, { status: 404 });
  const rewards = borders[id] as unknown as UserBorderEntity[];
  if (!rewards?.length)
    return NextResponse.json({ message: 'Border not found' }, { status: 404 });

  return NextResponse.json(
    {
      ...getPagination({
        rewards,
        filterByName,
        page,
        pageSize,
        sort,
        orderBy,
      }),
    },
    { status: 200 }
  );
}

function getPagination({
  rewards,
  filterByName = '',
  page = 1,
  pageSize = 10,
  sort = BorderSort.Desc, // Se usa el enum en lugar de string
  orderBy,
}: {
  rewards: UserBorderEntity[];
  filterByName: string;
  page: number;
  pageSize: number;
  sort: string;
  orderBy: BordersOrderBy;
}) {
  if (page < 1) page = 1; // Evita páginas inválidas

  let filteredRewards = rewards;

  if (filterByName) {
    filteredRewards = filteredRewards.filter((reward) =>
      reward.name.toLowerCase().includes(filterByName.toLowerCase())
    );
  }

  // Aplicar ordenación
  filteredRewards.sort((a, b) => {
    if (orderBy === BordersOrderBy.Rank) {
      if (a.special !== b.special) {
        const aSpecial = Number(a.special);
        const bSpecial = Number(b.special);
        return sort === BorderSort.Asc
          ? aSpecial - bSpecial
          : bSpecial - aSpecial;
      }
      return sort === BorderSort.Asc
        ? a.quantity - b.quantity
        : b.quantity - a.quantity;
    } else {
      return sort === BorderSort.Asc
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Paginación corregida
  const totalRecords = filteredRewards.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  if (page > totalPages) page = totalPages; // Evita páginas fuera del límite

  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, totalRecords); // Evita salir del rango

  const paginatedRewards = filteredRewards.slice(start, end);

  return {
    borders: paginatedRewards,
    pagination: {
      page,
      pageSize,
      totalRecords,
      totalPages,
    },
  };
}
