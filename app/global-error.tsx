'use client'

import { Syne, Inter } from 'next/font/google'
import './globals.css'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en" className={`${syne.variable} ${inter.variable}`}>
            <body className="bg-[#0a0a0a] text-[#ededed] antialiased font-sans">
                <div className="w-full h-screen flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-display font-bold mb-4">Critical Error</h2>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-3 bg-[#455CE9] text-white rounded-full"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    )
}
