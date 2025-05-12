//because nextjs runs on the edge meaning it work on the servers nearest to the user it dosent keep context weather or not the database is connected or not so for each function we have to call the db and connect it because in next js we can say that the functions are deployed by vercel behinf the scenes

import {connect} from '@/dbconfig/dbConfig'
import { sendEmail } from '@/helpers/mailer'
import bcryptjs from 'bcryptjs'
import User from '@/models/usermodel'
import {NextRequest,NextResponse} from 'next/server'//based on web fetch api not http
connect()


export async function POST (request:NextRequest){
try {
    const reqBody=await request.json()//in next js it runs on the edge so these requests are promise
    const {username,email,password}=reqBody
    console.log(reqBody)

   const user= await User.findOne({email})
   if (user){

    return NextResponse.json({error:"user already registered"},{status:400})
   }
   const salt=await bcryptjs.genSalt(10)
   const hashedPassword=await bcryptjs.hash(password, salt);
   const newUser=new User({
username,
email,
password:hashedPassword

   })
   const saveUser=await newUser.save()
   console.log(saveUser)
   await sendEmail({email,emailType:"VERIFY",userID:saveUser._id})

   return NextResponse.json({message:"user registered succesfully",success:true,
    saveUser})
    
} catch (error:any) {
    return NextResponse.json({error:error.message,
        
    
    })
    
    
    
}

}