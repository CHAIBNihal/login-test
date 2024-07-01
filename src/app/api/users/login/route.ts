import connect from '@/dbconfig/dbconfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()
 

export async function POST(req:NextRequest) {
    try {
        const bodyReq = await req.json();
        const {email, password } = bodyReq;
        console.log(bodyReq);

        
        // Verifier si l'utilisateur exist 
        const findUser = await User.findOne({email});
        if(!findUser){
            return NextResponse.json({error:"User is not exist create your account"}, {status:400})
        }

        // Verifer si le mot depasse est correct :

        const validPass = await bcryptjs.compare(password, findUser.password);

        if(!validPass){
            return NextResponse.json({error:'Password Is Invalid'}, {status:400})
        }

        //CREATE TOKEN DATA
        const tokenData = {
            id:findUser._id,
            username:findUser.username,
            email:findUser.email
        }
        // Create Token 
       const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,
         {expiresIn:"1d"}
        );

       const res = NextResponse.json({message:"Login successful",
        succes:true,
       })
       
     // Envoyer le cookie avec la reponse :
       res.cookies.set("token", token, {
        httpOnly:true,
       })
       return res;

    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500}
        )
        
    }
}