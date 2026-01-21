'use client'
import { motion, useTransform, useSpring } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import TextReveal from '../ui/TextReveal'
import Magnetic from '../ui/Magnetic'
import Link from 'next/link'

const ChaosScene = dynamic(() => import('../3d/Scene'), { ssr: false })

export default function Hero() {
    // Smooth mouse movement for spotlight
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            mouseX.set(clientX)
            mouseY.set(clientY)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">

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

            {/* Background 3D Piano Scene */}
            <div className="absolute inset-0 z-0">
                <ChaosScene />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-white">
                <div className="flex flex-col gap-6 items-center justify-end h-full pb-32">
                    {/* Main Title */}
                    <div className="flex flex-col items-center mb-2">
                        <TextReveal mode="characters" className="text-[12vw] leading-[0.8] font-display font-bold tracking-tighter mix-blend-difference z-20">
                            CREATIVE
                        </TextReveal>
                        <TextReveal mode="characters" className="text-[12vw] leading-[0.8] font-display font-bold tracking-tighter mix-blend-difference z-20" delay={0.2}>
                            DEVELOPER
                        </TextReveal>
                    </div>

                    {/* Subtext */}
                    <div className="max-w-md text-center overflow-hidden">
                        <TextReveal delay={0.8} className="text-sm md:text-base font-medium leading-relaxed font-sans text-white/80">
                            Crafting digital production-ready experiences with a focus on motion, interaction, and aesthetics.
                        </TextReveal>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-4 z-20 pointer-events-auto">
                        <Magnetic>
                            <Link
                                href="#work"
                                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black transition-colors duration-300 font-medium tracking-wide text-sm group"
                                data-magnetic
                            >
                                <span className="relative">View Work</span>
                            </Link>
                        </Magnetic>
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
