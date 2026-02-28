import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Middleware is running');
  console.log(request);
  return NextResponse.next();
}

export const config = {
  matcher: ['/news'],
};
