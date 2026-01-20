import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'ChaosForCurio | Creative Developer',
    template: '%s | ChaosForCurio',
  },
  description: 'Portfolio of ChaosForCurio - Production Ready Web Experiences. Specializing in 3D interactions, animations, and modern web development.',
  keywords: ['Creative Developer', 'Web Design', 'Next.js', 'React', 'Three.js', 'WebGL', 'Portfolio'],
  authors: [{ name: 'ChaosForCurio' }],
  creator: 'ChaosForCurio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chaosforcurio.com',
    title: 'ChaosForCurio | Creative Developer',
    description: 'Portfolio of ChaosForCurio - Production Ready Web Experiences',
    siteName: 'ChaosForCurio',
    images: [
      {
        url: '/og-image.jpg', // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: 'ChaosForCurio Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChaosForCurio | Creative Developer',
    description: 'Portfolio of ChaosForCurio - Production Ready Web Experiences',
    images: ['/og-image.jpg'],
    creator: '@ChaosForCurio',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
