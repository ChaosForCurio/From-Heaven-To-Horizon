'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

const projects = [
    { name: 'Ecommerce Platform', cat: 'Development', src: '/image/bill.jpg' },
    { name: 'Portfolio 2024', cat: 'Design & Dev', src: '/image/bill.jpg' },
    { name: 'AI Dashboard', cat: 'Interaction', src: '/image/bill.jpg' },
    { name: 'Luxury Brand', cat: 'WebGL', src: '/image/bill.jpg' }
]

export default function Projects() {
    const [active, setActive] = useState<number | null>(null)
    const cursorRef = useRef<HTMLDivElement>(null)
    const cursorLabelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Move cursor
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out"
            })
            gsap.to(cursorLabelRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.45,
                ease: "power2.out"
            })
        }
        window.addEventListener('mousemove', moveCursor)
        return () => window.removeEventListener('mousemove', moveCursor)
    }, [])

    useEffect(() => {
        if (active !== null) {
            gsap.to(cursorLabelRef.current, { scale: 1, duration: 0.3 })
        } else {
            gsap.to(cursorLabelRef.current, { scale: 0, duration: 0.3 })
        }
    }, [active])

    return (
        <section id="work" className="py-32 w-full relative z-20 bg-[#ededed] text-[#0a0a0a] rounded-t-[3rem] -mt-10">
            <div className="container mx-auto px-6">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-16 opacity-50 font-sans">Selected Works</h2>

                <div className="flex flex-col">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setActive(index)}
                            onMouseLeave={() => setActive(null)}
                            className="group flex justify-between items-center py-16 border-b border-black/10 cursor-pointer transition-all duration-300 hover:px-4"
                        >
                            <h3 className="text-4xl md:text-7xl font-display font-medium group-hover:opacity-50 transition-opacity">
                                {project.name}
                            </h3>
                            <span className="text-sm md:text-lg font-sans font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                {project.cat}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Image Modal */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-50 overflow-hidden rounded-xl hidden md:block mix-blend-normal"
                style={{ transform: 'translate(-50%, -50%)', opacity: active !== null ? 1 : 0 }}
            >
                <div
                    className="w-full h-full relative transition-transform duration-500 cubic-bezier(0.76, 0, 0.24, 1)"
                    style={{ transform: active !== null ? `translateY(-${active * 100}%)` : 'none' }}
                >
                    {projects.map((project, index) => (
                        <div key={index} className="w-full h-full relative">
                            <Image
                                src={project.src}
                                alt={project.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div
                ref={cursorLabelRef}
                className="fixed top-0 left-0 w-20 h-20 bg-[#455CE9] text-white rounded-full flex items-center justify-center text-sm font-medium pointer-events-none z-50 hidden md:flex scale-0"
                style={{ transform: 'translate(-50%, -50%)' }}
            >
                View
            </div>
        </section>
    )
}
