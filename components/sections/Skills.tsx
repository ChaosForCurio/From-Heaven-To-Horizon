'use client'
import clsx from 'clsx'

const skills = [
    'React', 'Next.js', 'TypeScript', 'Three.js', 'WebGL', 'GSAP', 'Framer Motion', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Figma'
]

export default function Skills() {
    return (
        <section className="py-24 bg-[#0a0a0a] border-y border-white/5 overflow-hidden">
            <div className="flex whitespace-nowrap overflow-hidden py-10">
                <div className="flex animate-marquee gap-12 md:gap-24 pr-12 md:pr-24">
                    {/* Content duplicated twice for seamless loop */}
                    {[...skills, ...skills].map((skill, index) => (
                        <span
                            key={index}
                            className={clsx(
                                "text-6xl md:text-8xl lg:text-9xl font-bold font-display uppercase tracking-tighter text-transparent stroke-text opacity-30 hover:opacity-100 transition-opacity duration-300 cursor-default select-none",
                            )}
                            style={{ WebkitTextStroke: '1.5px #ededed' }}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
