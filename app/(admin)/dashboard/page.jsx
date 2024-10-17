// @/app/dashboard/page.jsx

'use client'
import React from 'react'
<<<<<<< HEAD


const Dashboard = () => {  
=======
import { useUser  } from '@clerk/nextjs'

const Dashboard = () => {  
  const { isLoaded, isSignedIn, user } = useUser()


   // In case the user signs out while on the page.
   if (!isLoaded || !isSignedIn) {
    return null
  }

  console.log(user);
>>>>>>> b285a78b32330d5c4637af2db8cf20cf4050341f
  

  return (
     <div>      
<<<<<<< HEAD
      
      <div>welcome to Guru Gowtham</div>
=======
      <div>Hello, {user?.username} welcome to Clerk</div>
>>>>>>> b285a78b32330d5c4637af2db8cf20cf4050341f
    </div>
  )
}

export default Dashboard