"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function LoginPage() {
const router = useRouter();
const [user, setUser] = React.useState({
  email:"",
  password:""

})
const [buttonDisabled, setButtonDisabled] = React.useState(false);
const [loading, setLoading] =   React.useState(false);

const onLogin = async ()=>{
  try {
    setLoading(true)
    const res = await axios.post("api/users/login", user)
    console.log("Loging succes", res.data);
    toast.success("Login success");
    router.push('/profile')
  } catch (error:any) {
    console.log("Login Failed ", error)
    toast.error(error.message);
  }
  finally{
    setLoading(false)
  }
}

useEffect(()=>{

  if(user.email.length>0 && user.password.length>0){
  setButtonDisabled(false)
}else{
  setButtonDisabled(true)
}

}, [user])






  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading? "Processing":"Login"}</h1><br />
       <label htmlFor="email">email</label>
      <input type="email" style={{background:"beige"}} className='p-2 border border-gray-300 rounded-lg'
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
       onClick={onLogin }
       > {buttonDisabled?"No Login": "Login now "} </button> <br />
       <Link href="/SignUp">create an accout Here!</Link>
     </div>
  )
}
