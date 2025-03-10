import db from '@/app/api/lib/drizzle';
import { userBordersSchema, userSchema } from '@/db/schema';
import { getRankByIndex } from '@/ranking/utils/get-rank-by-index';
import { sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const id = pathname.split('/')[3];

  if (!id) return NextResponse.json({ message: 'Invalid id' }, { status: 400 });

  try {
    const user = await getUserWithRank(id);
    if (!user)
      return NextResponse.json({ message: 'User not found' }, { status: 404 });

    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Error fetching user data' },
      { status: 500 }
    );
  }
}

async function getUserWithRank(userId: string) {
  const result = await db
    .select({
      id: userSchema.id,
      username: userSchema.login,
      avatar: userSchema.profileImageUrl,
      quantityBorders: sql`COUNT(${userBordersSchema.id})`.as(
        'quantityBorders'
      ),
      rankPosition: sql`
        RANK() OVER (ORDER BY COUNT(${userBordersSchema.id}) DESC, ${userSchema.login} ASC)
      `.as('rank_position'),
    })
    .from(userSchema)
    .leftJoin(
      userBordersSchema,
      sql`${userSchema.id} = ${userBordersSchema.userId}`
    )
    .where(sql`${userSchema.id} = ${userId}`)
    .groupBy(userSchema.id)
    .limit(1);

  if (result.length === 0) return null;

  const user = result[0] as {
    id: string;
    username: string;
    avatar: string;
    quantityBorders: number;
    rankPosition: number;
  };

  const rank = getRankByIndex(user.rankPosition - 1);

  return {
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    quantityBorders: user.quantityBorders,
    rank,
  };
}
