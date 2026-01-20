import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'ChaosForCurio | Creative Developer',
  description: 'Portfolio of ChaosForCurio - Production Ready Web Experiences',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-[#0a0a0a] text-[#ededed] antialiased font-sans selection:bg-[#ededed] selection:text-[#0a0a0a] overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
