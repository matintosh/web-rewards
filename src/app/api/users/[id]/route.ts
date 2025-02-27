import { users } from '@public/data/users.json';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const data = req.nextUrl.pathname;
  const id = data.split('/')[3] as keyof typeof users;
  if (!(id in users)) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  const user = users[id];

  return NextResponse.json(
    {
      user,
    },
    { status: 200 }
  );
}
