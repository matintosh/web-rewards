import { ranking } from '@public/data/users.json';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export function GET() {
  return NextResponse.json({ ranking }, { status: 200 });
}
