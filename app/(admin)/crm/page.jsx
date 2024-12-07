"use client"

import React from 'react'
import { useUser  } from '@clerk/nextjs'

<<<<<<< HEAD
const Settings = () => {
=======
const Inventory = () => {
>>>>>>> guru/main

  const { isLoaded, isSignedIn, user } = useUser()


   // In case the user signs out while on the page.
   if (!isLoaded || !isSignedIn) {
    return null
  }
<<<<<<< HEAD

  console.log(user);
  

  return (
    <div>Hello, {user?.username} , welcome to Guru Gowtham</div>
  )
}

export default Settings
=======
  
  return (
    <div>Hello, {user?.username} , welcome to Guru Goutham</div>
  )
}

export default Inventory
>>>>>>> guru/main
