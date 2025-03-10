import { userSchema } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import db from '../lib/drizzle';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const username = searchParams.get('username')!;

  if (!username || username.length < 3 || username.length > 80)
    return NextResponse.json({ message: 'Invalid username' }, { status: 400 });
  try {
    const users = await db
      .select({
        id: userSchema.id,
        username: userSchema.login,
        avatar: userSchema.profileImageUrl,
      })
      .from(userSchema)
      .where(sql`${userSchema.login} LIKE ${'%' + username + '%'}`);

    if (users.length === 0)
      return NextResponse.json({ message: 'User not found' }, { status: 404 });

    return NextResponse.json({ users }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Generic error, please try again later' },
      { status: 500 }
    );
  }
}
