'use client'
import { useRef } from 'react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Parallax, Pagination, Navigation } from 'swiper/modules'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'

// Using the one available image for now, but configured for variety
const projects = [
    {
        id: 1,
        title: 'Modern E-Commerce',
        category: 'Development',
        year: '2024',
        src: '/image/bill.jpg',
        description: 'A headless commerce solution built with Next.js and Shopify.'
    },
    {
        id: 2,
        title: 'Architectural Portfolio',
        category: 'Design & Dev',
        year: '2023',
        src: '/image/bill.jpg',
        description: 'Immersive portfolio for a leading sustainable architecture firm.'
    },
    {
        id: 3,
        title: 'Fintech Dashboard',
        category: 'Product Design',
        year: '2024',
        src: '/image/bill.jpg',
        description: 'Real-time data visualization platform for crypto trading.'
    },
    {
        id: 4,
        title: 'Luxury Fashion',
        category: 'WebGL Experience',
        year: '2023',
        src: '/image/bill.jpg',
        description: 'Award-winning 3D web experience for a heritage brand.'
    }
]

export default function ProjectSlider() {
    const prevRef = useRef<HTMLButtonElement>(null)
    const nextRef = useRef<HTMLButtonElement>(null)

    return (
        <section className="py-24 w-full relative z-20 bg-[#0a0a0a] text-white overflow-hidden">
            <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
                <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#455CE9] mb-2 font-sans">Featured Works</h2>
                    <p className="text-3xl md:text-5xl font-medium font-display tracking-tight text-white/90">
                        Selected Projects
                    </p>
                </div>

                {/* Custom Navigation */}
                <div className="hidden md:flex gap-4">
                    <button ref={prevRef} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group">
                        <FiArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button ref={nextRef} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group">
                        <FiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Parallax, Autoplay, Pagination, Navigation]}
                speed={1000}
                parallax={true}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                spaceBetween={20}
                initialSlide={0}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    // Assign refs for navigation
                    if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                }}
                pagination={{
                    clickable: true,
                    type: 'progressbar',
                    el: '.custom-swiper-pagination'
                }}
                breakpoints={{
                    640: {
                        spaceBetween: 40
                    },
                    1024: {
                        spaceBetween: 80
                    }
                }}
                className="w-full !px-6 md:!px-0 py-10"
            >
                {projects.map((project) => (
                    <SwiperSlide key={project.id} className="!w-[85vw] md:!w-[70vw] lg:!w-[60vw] relative group">
                        <div className="w-full aspect-[16/9] md:aspect-[2/1] relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-neutral-900">
                            {/* Parallax Image Layer */}
                            <div
                                className="absolute inset-0 w-full h-full"
                                data-swiper-parallax="20%"
                                data-swiper-parallax-scale="1.1"
                            >
                                <Image
                                    src={project.src}
                                    alt={project.title}
                                    fill
                                    priority={project.id === 1}
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                    sizes="(max-width: 768px) 85vw, 60vw"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                            </div>

                            {/* Floating Content inside slide */}
                            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20">
                                <div className="overflow-hidden">
                                    <h3
                                        className="text-2xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-2 drop-shadow-lg"
                                        data-swiper-parallax="-300"
                                        data-swiper-parallax-opacity="0"
                                        data-swiper-parallax-duration="1000"
                                    >
                                        {project.title}
                                    </h3>
                                </div>
                                <div className="overflow-hidden flex gap-3 text-sm md:text-base opacity-90">
                                    <span
                                        className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10"
                                        data-swiper-parallax="-200"
                                        data-swiper-parallax-opacity="0"
                                    >
                                        {project.category}
                                    </span>
                                    <span
                                        className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10"
                                        data-swiper-parallax="-100"
                                        data-swiper-parallax-opacity="0"
                                    >
                                        {project.year}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Progress Bar Container */}
            <div className="container mx-auto px-6 mt-8 relative h-1 bg-white/10 rounded-full overflow-hidden max-w-4xl">
                <div className="custom-swiper-pagination !static !w-full !h-full !bg-transparent [&_.swiper-pagination-progressbar-fill]:!bg-[#455CE9]" />
            </div>

        </section>
    )
}
