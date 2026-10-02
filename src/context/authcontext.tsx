"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import CountsContextProvider from './CountsContext'
export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
    <CountsContextProvider>
    {children}
    </CountsContextProvider>
    </SessionProvider>
  )
}
