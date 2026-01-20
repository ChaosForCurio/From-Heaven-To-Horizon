'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'circOut' }}
            className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference text-white"
        >
            <Link href="/" className="text-xl font-display font-bold tracking-tighter hover:opacity-70 transition-opacity">
                CHAOS
            </Link>

            <nav className="flex gap-8 text-sm font-medium tracking-wide">
                {['Work', 'About', 'Contact'].map((item) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="relative group overflow-hidden"
                    >
                        <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">
                            {item}
                        </span>
                        <span className="absolute top-0 left-0 block translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                            {item}
                        </span>
                    </Link>
                ))}
            </nav>
        </motion.header>
    )
}
