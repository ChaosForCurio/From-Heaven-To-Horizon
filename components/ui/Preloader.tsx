'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hello"]

export default function Preloader() {
    const [index, setIndex] = useState(0)
    const [dimension, setDimension] = useState({ width: 0, height: 0 })

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight })
    }, [])

    useEffect(() => {
        if (index === words.length - 1) return
        setTimeout(() => {
            setIndex(index + 1)
        }, index === 0 ? 1000 : 150)
    }, [index])

    useEffect(() => {
        // Lock scroll
        document.body.style.overflow = 'hidden'
        window.scrollTo(0, 0) // Ensure top
        return () => {
            // Unlock scroll after exit animation (roughly 1.2s after last word)
            setTimeout(() => {
                document.body.style.overflow = ''
            }, 1200)
        }
    }, [])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    }

    return (
        <AnimatePresence mode='wait'>
            {index < words.length - 1 && (
                <motion.div variants={slideUp} initial="initial" exit="exit" className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
                    {dimension.width > 0 &&
                        <>
                            <motion.p variants={opacity} initial="initial" animate="enter" exit="exit" className="flex text-white text-[42px] items-center absolute z-[1] font-display">
                                <span className="block w-[10px] h-[10px] bg-white rounded-[50%] mr-[10px]"></span>
                                {words[index]}
                            </motion.p>
                            <svg className="absolute top-0 w-full h-[calc(100%+300px)] pointer-events-none">
                                <motion.path variants={curve} initial="initial" exit="exit" fill="#0a0a0a"></motion.path>
                            </svg>
                        </>
                    }
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const slideUp = {
    initial: {
        top: 0
    },
    exit: {
        top: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
}

const opacity = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 0.75,
        transition: { duration: 1, delay: 0.2 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3 }
    }
}
