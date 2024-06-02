"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function SignUpPage() {


const router = useRouter()
const [user, setUser] = React.useState({
  email:"",
  password:"",
  username:"",
})
const [loading, setLoading] = React.useState(false);
const [buttonDisabled, setButtonDisabled] = React.useState(false)


const onSignup = async ()=>{
  try {
    setLoading(true)
    const res = await axios.post("api/users/signup", user);
    console.log("SignUp succes", res.data);
    // Redirection vers la page de login
    router.push("/login");
  } catch (error:any) {

    // Methode 1 pour afficher l'erreur
    console.log("Sign up failed ",error.message)
    // mehode 2 pour afficher l'erreur à l'aide du package react-hoast-toast
    toast.error(error.message);
  }
  finally{
    setLoading(false)
  }
}
useEffect(()=>{
  if(user.email.length>0 && user.password.length>0 && user.username.length>0){
    setButtonDisabled(false);
  }else{
    setButtonDisabled(true);
  }
}, [user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading? "Processing":"Signup"}</h1><br />
      <label htmlFor="username">Username</label>
      <input type="text" style={{background:"beige"}} className='p-2 border border-gray-300 rounded-lg'
      id='username'
      value={user.username}
      placeholder='username ex:user20'
      onChange={(e)=>{setUser({...user, username:e.target.value})}}
       /> <br />

       <label htmlFor="email">email</label>
      <input type="text" style={{background:"beige"}} className='p-2 border border-gray-300 rounded-lg'
      id='email'
      value={user.email}
      placeholder='example@gmail.com'
      onChange={(e)=>{setUser({...user, email:e.target.value})}}
       /> <br />

       <label htmlFor="password">password</label>
      <input type="password" style={{background:"beige"}} className='p-2 border border-gray-300 rounded-lg'
      id='password'
      value={user.password}
      placeholder='Enter a valid password'
      onChange={(e)=>{setUser({...user, password:e.target.value})}}
       /> <br />
       <button className='p-2 border  border-gray-300 rounded-lg mt-2 mb-4 
       focus:outline-none focus:border-gray-600'
       onClick={onSignup}
       > {buttonDisabled?"No signup": "Signup"}
       </button> <br />
       <Link href="/login">Visit Login Page</Link>
     </div>
  )
}
