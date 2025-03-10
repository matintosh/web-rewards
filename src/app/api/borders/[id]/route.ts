import db from '@/app/api/lib/drizzle';
import { BorderSort } from '@/borders/models/enums/border-sort';
import { BordersOrderBy } from '@/borders/models/enums/borders-order-by.enum';
import { bordersSchema, userBordersSchema, userSchema } from '@/db/schema';
import { and, asc, desc, eq, like, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const id = pathname.split('/')[3];

    if (!id) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const page = Number(searchParams.get('page') || 1);
    const pageSize = 10;

    const orderBy =
      searchParams.get('orderBy') === BordersOrderBy.Rank
        ? BordersOrderBy.Rank
        : BordersOrderBy.CreatedAt;

    const sort =
      searchParams.get('sort') === BorderSort.Desc
        ? BorderSort.Desc
        : BorderSort.Asc;

    const filterByName = searchParams.get('filterByName') || '';
    const offset = (page - 1) * pageSize;

    const conditions = [eq(userBordersSchema.userId, id)];
    if (filterByName) {
      conditions.push(like(bordersSchema.name, `%${filterByName}%`));
    }

    const dynamicOrderBy =
      orderBy === BordersOrderBy.Rank
        ? [
            sort === BorderSort.Desc
              ? desc(bordersSchema.special)
              : asc(bordersSchema.special),
            sort === BorderSort.Desc
              ? desc(sql`COUNT(${userBordersSchema.id})`)
              : asc(sql`COUNT(${userBordersSchema.id})`),
            sort === BorderSort.Desc
              ? desc(sql`MAX(${userBordersSchema.createdAt})`)
              : asc(sql`MAX(${userBordersSchema.createdAt})`),
          ]
        : sort === BorderSort.Desc
          ? [desc(sql`MAX(${userBordersSchema.createdAt})`)]
          : [asc(sql`MAX(${userBordersSchema.createdAt})`)];

    const bordersQuery = db
      .select({
        id: bordersSchema.id,
        url: bordersSchema.url,
        special: bordersSchema.special,
        name: bordersSchema.name,
        username: userSchema.login,
        avatar: userSchema.profileImageUrl,
        quantity: sql`COUNT(${userBordersSchema.id})`.as('quantity'),
        lastCreatedAt: sql`MAX(${userBordersSchema.createdAt})`.as(
          'lastCreatedAt'
        ),
      })
      .from(userBordersSchema)
      .innerJoin(
        bordersSchema,
        eq(userBordersSchema.borderId, bordersSchema.id)
      )
      .innerJoin(userSchema, eq(userSchema.id, userBordersSchema.userId))
      .where(and(...conditions))
      .groupBy(bordersSchema.id, userSchema.id)
      .orderBy(...dynamicOrderBy)
      .limit(pageSize)
      .offset(offset);

    const countQuery = db
      .select({
        total: sql`COUNT(DISTINCT ${bordersSchema.id})`.as('total'),
      })
      .from(bordersSchema)
      .innerJoin(
        userBordersSchema,
        eq(userBordersSchema.borderId, bordersSchema.id)
      )
      .innerJoin(userSchema, eq(userSchema.id, userBordersSchema.userId))
      .where(and(...conditions));

    const countResult = await countQuery.execute();
    const totalRecords = Number(countResult[0]?.total || 0);
    const totalPages = Math.ceil(totalRecords / pageSize);

    const rows = await bordersQuery;

    return NextResponse.json(
      {
        borders: rows,
        pagination: {
          page,
          pageSize,
          totalRecords,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Generic error, please try again later' },
      { status: 500 }
    );
  }
}
