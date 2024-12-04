"use client"

import React from 'react'
import { useUser  } from '@clerk/nextjs'

const ProductLibrary = () => {

  const { isLoaded, isSignedIn, user } = useUser()


   // In case the user signs out while on the page.
   if (!isLoaded || !isSignedIn) {
    return null
  }

  console.log(user);
  

  return (
    <div className='ml-10'>Hello, {user?.username} , welcome to Guru Gowtham</div>
  )
}

export default ProductLibrary