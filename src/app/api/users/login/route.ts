import { connect } from '@/dbconfig/dbConfig';
import bcryptjs from 'bcryptjs';
import User from '@/models/usermodel';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Case-insensitive email search
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, 'i') },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: 'User does not exist',
        },
        { status: 400 }
      );
    }

    const compare = await bcryptjs.compare(password, user.password);
    if (!compare) {
      return NextResponse.json(
        {
          error: 'Check your credentials',
        },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, { expiresIn: '1d' });

    const response = NextResponse.json({
      message: 'Login Success',
      Success: true,
      data: {
        username: user.username,
        email: user.email,
      },
    });

    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
