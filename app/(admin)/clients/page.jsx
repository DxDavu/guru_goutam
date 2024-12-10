"use client"

import React from 'react'
import { useUser  } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

const Settings = () => {

  const { isLoaded, isSignedIn, user } = useUser()
  const pathName = usePathname()
  const last = pathName.split("/").filter(Boolean).pop() || "Home"

   // In case the user signs out while on the page.
   if (!isLoaded || !isSignedIn) {
    return null
  }

  

  return (
    <div>Hello, {user?.username} , welcome to Guru Gowtham {last.toUpperCase()}</div>
  )
}

export default Settings
