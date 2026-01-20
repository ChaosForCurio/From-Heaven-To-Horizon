'use client'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Scene = dynamic(() => import('./Scene'), { ssr: false })

// Helper for Split Text Animation
const SplitText = ({ children, className, delay = 0 }: { children: string, className?: string, delay?: number }) => {
    return (
        <div className={`flex overflow-hidden ${className}`}>
            {children.split("").map((char, i) => (
                <span key={i} className="inline-block overflow-hidden relative">
                    <motion.span
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.76, 0, 0.24, 1],
                            delay: delay + i * 0.03
                        }}
                        className="inline-block"
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                </span>
            ))}
        </div>
    )
}

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    // Smooth mouse movement for spotlight
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            // Update state for non-spring usage if needed, but springs are better for visuals
            mouseX.set(clientX)
            mouseY.set(clientY)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    const x = useSpring(0, { stiffness: 100, damping: 15 })
    const y = useSpring(0, { stiffness: 100, damping: 15 })

    const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2
        const distanceX = clientX - centerX
        const distanceY = clientY - centerY

        x.set(distanceX * 0.35)
        y.set(distanceY * 0.35)
    }

    const handleMagneticLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            {/* Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none z-[1] opacity-20 mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-50 brightness-100 contrast-150"></div>
            </div>

            {/* Mouse Spotlight */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-[2]"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`
                    )
                }}
            />

            {/* Background 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Scene />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-white">
                <div className="flex flex-col gap-2">
                    {/* Main Title */}
                    <div className="flex flex-col">
                        {/* Line 1: CREATIVE */}
                        <div className="text-[14vw] md:text-[13vw] leading-[0.85] font-display font-bold tracking-tighter mix-blend-exclusion text-white">
                            <SplitText delay={0}>CREATIVE</SplitText>
                        </div>

                        {/* Line 2: DEVELOPER & Subtext */}
                        <div className="flex flex-col md:flex-row items-end gap-6 md:gap-12">
                            <div className="text-[11.5vw] md:text-[13vw] leading-[0.85] font-display font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_#fff] md:[-webkit-text-stroke:2px_#fff] opacity-90 mix-blend-exclusion">
                                <SplitText delay={0.2}>DEVELOPER</SplitText>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="max-w-xs mb-4 md:mb-8"
                            >
                                <p className="text-sm md:text-base font-medium opacity-70 leading-relaxed font-sans text-neutral-300">
                                    Crafting digital production-ready experiences with a focus on motion, interaction, and aesthetics.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-6 md:left-10 flex flex-col items-center gap-4 z-20"
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/50 to-white relative overflow-hidden">
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: "100%" }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 w-full h-full bg-white"
                    />
                </div>
                <span className="text-xs font-medium tracking-[0.2em] opacity-50 uppercase rotate-180 [writing-mode:vertical-lr]">Scroll</span>
            </motion.div>
        </section>

    )
}
