'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Magnetic from '../ui/Magnetic'

export default function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'circOut' }}
            className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference text-white"
        >
            <Magnetic>
                <Link href="/" className="text-xl font-display font-bold tracking-tighter hover:opacity-70 transition-opacity" data-magnetic>
                    CHAOS
                </Link>
            </Magnetic>

            <nav className="flex gap-8 text-sm font-display font-bold tracking-wide">
                {['Work', 'About', 'Contact'].map((item) => (
                    <Magnetic key={item}>
                        <Link
                            href={`#${item.toLowerCase()}`}
                            className="relative group overflow-hidden px-2 py-1"
                            data-magnetic
                            onClick={(e) => {
                                e.preventDefault();
                                const target = document.querySelector(`#${item.toLowerCase()}`);
                                if (target) {
                                    target.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">
                                {item}
                            </span>
                            <span className="absolute top-0 left-0 block translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                                {item}
                            </span>
                        </Link>
                    </Magnetic>
                ))}
            </nav>
        </motion.header>
    )
}
