'use client'
import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false)

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    }

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 }
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions)
    }

    const manageMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        mouse.x.set(clientX)
        mouse.y.set(clientY)
    }

    const manageMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        // Check for specific tags or data-attributes
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.closest('[data-magnetic]')) {
            setIsHovering(true)
        } else {
            setIsHovering(false)
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', manageMouseMove)
        window.addEventListener('mouseover', manageMouseOver)
        return () => {
            window.removeEventListener('mousemove', manageMouseMove)
            window.removeEventListener('mouseover', manageMouseOver)
        }
    }, [])

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{
                left: smoothMouse.x,
                top: smoothMouse.y,
            }}
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                x: '-50%',
                y: '-50%',
                scale: isHovering ? 4 : 1,
            }}
            transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.2, ease: "easeInOut" } // smoother scale transition
            }}
        />
    )
}
