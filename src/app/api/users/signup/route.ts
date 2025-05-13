import { connect } from '@/dbconfig/dbConfig';
import { sendEmail } from '@/helpers/mailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/usermodel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'User already registered' },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const saveUser = await newUser.save();
    await sendEmail({ email, emailType: 'VERIFY', userID: saveUser._id });

    return NextResponse.json(
      { message: 'User registered successfully', success: true, saveUser },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}
