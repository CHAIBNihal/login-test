import connect from '@/dbconfig/dbconfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";

// Create User
export async function POST(req:NextRequest) {
    try {
        // Declarer que ce qui est ecrit en body doit etre stocker dans reqBody
        const reqBody = await req.json();
        // Attribuer {username, email,password} au reqBody
        const {username, email, password} = reqBody;
        // chercher un utilisateur par leur email 
       const finduser =   await User.findOne({email});

       // Verifier si l'email de l'utilisateur existe deja dans la base de données
       if(finduser){
        // Si oui afficher : User already exist
        return NextResponse.json( {error: 'User already exist'},{status:400})
       }  

       // Sinon hasher le mot de passe 
       const salt = await bcryptjs.genSalt(10);
       const hashedPassword = await bcryptjs.hash(password, salt);
       //Crée un Utilsateur 
       const newUser = new User({
        username, 
        email, 
        password:hashedPassword
       });
      const savedUser =  await newUser.save()
    

   return  NextResponse.json({message:"User has created successfully",
    success:true,
    savedUser
   })
    } catch (error:any) {
        NextResponse.json({error:error.message}, {status:500})
    }
   
}

connect()

