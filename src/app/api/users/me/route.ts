import {connect} from '@/dbconfig/dbConfig'
import { getDataFromToken } from '@/helpers/getdatafromtoken'

import User from '@/models/usermodel'
import jwt from 'jsonwebtoken'
import {NextRequest,NextResponse} from 'next/server'//based on web fetch api not http
connect()

export async function POST(request:NextRequest) {
   const userID= await getDataFromToken(request)
   const user=await User.findOne({_id:userID}).select("-password")

    if(!user){
        return NextResponse.json({
            error:"user does not exist",
            

        },{status:400})
    }

    return NextResponse.json({
        message:"user found",
        data:user
        

    },{status:200})
}