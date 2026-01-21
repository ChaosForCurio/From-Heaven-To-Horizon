'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Socials3D = dynamic(() => import('../3d/Socials3D'), { ssr: false })

export default function Contact() {
    return (
        <section id="contact" className="pb-20 pt-10 w-full bg-[#0a0a0a] text-[#ededed] relative z-20">
            <div className="container mx-auto px-6 border-t border-white/10 pt-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div className="flex flex-col">
                        <span className="text-xs font-sans opacity-50 mb-4 uppercase tracking-[0.4em] text-white font-bold">Innovation • Elegance • Motion</span>
                        <h2 className="text-[10vw] font-display font-bold leading-none tracking-tighter mix-blend-difference">
                            LET'S TALK
                        </h2>
                    </div>

                    <div className="flex flex-col gap-2 mt-10 md:mt-0 font-sans text-sm md:text-base">
                        <Socials3D />
                        <div className="mt-4 opacity-30 text-xs">
                            © 2026 ChaosForCurio. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
