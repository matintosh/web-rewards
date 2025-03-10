import db from '@/app/api/lib/drizzle';
import { userSchema } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const ranking = await db
      .select({
        id: userSchema.id,
        username: userSchema.login,
        twitchRef: userSchema.twitchRef,
        avatar: userSchema.profileImageUrl,
        quantityBorders: sql`COUNT(ub.id)`.as('quantityBorders'),
      })
      .from(userSchema)
      .innerJoin(sql`user_borders as ub`, sql`ub.user_id = ${userSchema.id}`)
      .where(sql`${userSchema.isStaff} = false`)
      .groupBy(userSchema.id)
      .orderBy(sql`quantityBorders DESC, ${userSchema.login} ASC`)
      .limit(8);

    return NextResponse.json({ ranking }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Generic error, please try again later' },
      { status: 500 }
    );
  }
}
