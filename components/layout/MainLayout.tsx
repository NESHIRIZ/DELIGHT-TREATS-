import React, { ReactNode } from 'react'
import Navbar from '../ui/Navbar'
import Footer from '../ui/Footer'

export default function MainLayout({ children }: { children: ReactNode }){
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
