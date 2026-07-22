import './globals.css'
import { ReactNode } from 'react'
import MainLayout from '../components/layout/MainLayout'

export const metadata = {
  title: 'Delight Treats',
  description: 'Freshly Baked Happiness Delivered Daily',
}

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
