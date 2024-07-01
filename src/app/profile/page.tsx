"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfilPage() {
  const route = useRouter()
  const [data, setData] = useState("nothing")
  const logout = async ()=>{
    try {
       await axios.get("api/users/logout")
       console.log("Logout succes")
      toast.success("Logout success")
     route.push('/login')
    } catch (error:any) {
      console.log(error.message)

      toast.error(error.message)
    }
  }

  const getUserDetails = async ()=>{
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id);
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 >Profile  </h1> <hr />
         <p>ProfilPage</p>
         <h2 className='p-1 rounded bg-green-900'>{data === "nothing" ? "Nothing": <Link href = {`/profile/${data}`}>{data}</Link>}</h2>
         <hr />

         <button onClick={logout}
         className='bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold
         py-2 px-4 rounded' >Logout</button>

<button onClick={getUserDetails}
         className='bg-purple-900 hover:bg-blue-700 mt-4 text-white font-bold
         py-2 px-4 rounded' >User Infos </button>
    </div>
  )
}

