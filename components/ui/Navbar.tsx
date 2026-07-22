import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/custom-cakes', label: 'Custom Cakes' },
  { href: '/events', label: 'Events' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar(){
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.svg" alt="Delight Treats" width={150} height={40} />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-gray-700 hover:text-primary">{item.label}</Link>
          ))}
          <Link href="/login" className="text-gray-700 hover:text-primary">Login</Link>
          <Link href="/register" className="text-gray-700 hover:text-primary">Register</Link>
          <button aria-label="Cart" className="text-gray-700 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
              <circle cx="10" cy="19" r="1" />
              <circle cx="18" cy="19" r="1" />
            </svg>
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={()=>setOpen(!open)} aria-label="Toggle menu" className="p-2">
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-3">
            {navItems.map((item)=> (
              <Link key={item.href} href={item.href} className="text-gray-700">{item.label}</Link>
            ))}
            <Link href="/login" className="text-gray-700">Login</Link>
            <Link href="/register" className="text-gray-700">Register</Link>
            <button aria-label="Cart" className="text-gray-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
              </svg>
              Cart
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
