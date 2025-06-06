import { connect } from '@/dbconfig/dbConfig';
import User from '@/models/usermodel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    // Find the user with the given verification token and ensure it's not expired
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }, // Token has not expired
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token details' },
        { status: 400 }
      );
    }

    // Mark the user as verified
    user.isVerified = true;
    user.verifyToken = undefined; // Clear the token after verification
    user.verifyTokenExpiry = undefined; // Clear the expiry
    await user.save();

    return NextResponse.json(
      { message: 'User verified successfully', success: true },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}
