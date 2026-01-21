'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    mode?: "words" | "characters";
}

export default function TextReveal({ children, className, delay = 0, mode = "words" }: TextRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const text = mode === "words" ? children.split(" ") : children.split("")

    return (
        <div ref={ref} className={className}>
            {text.map((item, i) => (
                <span key={i} className={`inline-block overflow-hidden ${mode === "words" ? "mr-[0.2em]" : ""} -mb-[0.1em] pb-[0.1em] align-top`}>
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: "0%" } : {}}
                        transition={{
                            duration: 0.5,
                            delay: delay + (i * (mode === "words" ? 0.02 : 0.03)),
                            ease: [0.33, 1, 0.68, 1]
                        }}
                    >
                        {item === " " ? "\u00A0" : item}
                    </motion.span>
                </span>
            ))}
        </div>
    )
}
