'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const phrase = "I am a creative developer who bridges the gap between design and technology. Currently focused on building immersive web experiences and scalable applications using modern technologies."

export default function About() {
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"]
    })

    // Split text into words
    const words = phrase.split(" ")

    return (
        <section id="about" ref={container} className="py-32 w-full bg-[#0a0a0a] text-[#ededed] relative z-20">
            <div className="container mx-auto px-6 max-w-5xl">
                <p className="text-3xl md:text-5xl leading-tight font-display text-justify flex flex-wrap gap-x-3 gap-y-1">
                    {words.map((word, i) => {
                        const start = i / words.length
                        const end = start + (1 / words.length)
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1])

                        return (
                            <motion.span key={i} style={{ opacity }} className="relative transition-opacity">
                                {word}
                            </motion.span>
                        )
                    })}
                </p>
            </div>
        </section>
    )
}
