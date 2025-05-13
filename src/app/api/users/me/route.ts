import { connect } from '@/dbconfig/dbConfig';
import { getDataFromToken } from '@/helpers/getdatafromtoken';
import User from '@/models/usermodel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const user = await User.findOne({ _id: userID }).select('-password');

    if (!user) {
      return NextResponse.json(
        {
          error: 'User does not exist',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'User found',
      data: user,
    }, { status: 200 });
  } catch (error:unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}
