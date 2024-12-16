'use client'

import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";
import Image from 'next/image';
import loginImg from '/public/login_img.png';

export default function SignInPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [user, isSignedIn, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex w-1/2 bg-cover" style={{ backgroundImage: `url(${loginImg.src})` }}></div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Welcome to Guru Goutam</h1>
          <p className="text-gray-500 text-center mb-6">Sign in to access your dashboard</p>

          <SignIn.Root>
            <SignIn.Step
              name="start"
              className="space-y-6"
            >
              <Clerk.GlobalError className="block text-sm text-red-400" />

              {/* Username Field */}
              <div>
                <Clerk.Field name="identifier">
                  <Clerk.Label className="block text-gray-700 mb-1">Username*</Clerk.Label>
                  <Clerk.Input
                    type="text"
                    className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter Username"
                    required
                  />
                  <Clerk.FieldError />
                </Clerk.Field>
              </div>

              {/* Password Field */}
              <div className="relative">
                <Clerk.Field name="password">
                  <Clerk.Label className="block text-gray-700 mb-1">Password*</Clerk.Label>
                  <div className="relative">
                    <Clerk.Input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Enter Password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                      onClick={handlePasswordToggle}
                    >
                      {showPassword ? <IoEyeOffOutline size={20} /> : <FaEye size={20} />}
                    </button>
                  </div>
                  <Clerk.FieldError />
                </Clerk.Field>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" className="w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                <label htmlFor="rememberMe" className="ml-2 text-gray-600">Remember Me</label>
              </div>

              {/* Sign In Button */}
              <SignIn.Action
                submit
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300"
              >
                Sign In
              </SignIn.Action>

              {/* Forgot Password */}
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Forgot Your Password?{' '}
                  <a href="/forgot-password" className="text-blue-500 hover:underline">Click Here</a>
                </p>
              </div>
            </SignIn.Step>
          </SignIn.Root>
        </div>
      </div>
    </div>
  );
}
