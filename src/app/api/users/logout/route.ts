// app/api/users/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    message: 'Logged out successfully',
    success: true,
  });

  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0), // Delete cookie
  });

  return response;
}
