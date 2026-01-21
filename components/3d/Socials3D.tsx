'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, RoundedBox, Html, Environment, ContactShadows } from '@react-three/drei'
import { useState, useRef, ReactNode, Suspense } from 'react'
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import * as THREE from 'three'

interface SocialKeyProps {
    position: [number, number, number]
    icon: ReactNode
    url: string
    color?: string
}

function SocialKey({ position, icon, url, color = '#1a1a1a' }: SocialKeyProps) {
    const meshRef = useRef<THREE.Group>(null)
    const [hovered, setHover] = useState(false)

    useFrame((state, delta) => {
        if (!meshRef.current) return

        // Target values based on hover state
        const targetScale = hovered ? 1.1 : 1
        const targetY = hovered ? 0.2 : 0
        const targetRotX = hovered ? -0.2 : 0

        // Smoothly interpolate current values to target
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10)
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 10)
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 10)
    })

    const handleClick = () => {
        if (url && url !== '#') {
            window.open(url, '_blank')
        }
    }

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position}>
                <group ref={meshRef}>
                    <RoundedBox
                        args={[1.5, 1.5, 0.5]}
                        radius={0.2}
                        smoothness={4}
                        onPointerOver={() => {
                            document.body.style.cursor = 'pointer'
                            setHover(true)
                        }}
                        onPointerOut={() => {
                            document.body.style.cursor = 'auto'
                            setHover(false)
                        }}
                        onClick={handleClick}
                    >
                        <meshStandardMaterial
                            color={color}
                            roughness={0.3}
                            metalness={0.8}
                        />

                        {/* Front Face with Icon */}
                        <Html
                            transform
                            position={[0, 0, 0.26]} // Slightly in front of the box
                            occlude="blending"
                            style={{
                                pointerEvents: 'none',
                                color: '#ffffff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100px',
                                height: '100px',
                            }}
                        >
                            <div className="flex items-center justify-center w-full h-full text-5xl opacity-90">
                                {icon}
                            </div>
                        </Html>
                    </RoundedBox>
                </group>
            </group>
        </Float>
    )
}

export default function Socials3D() {
    return (
        <div className="w-full h-[200px] md:h-[300px]">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={5} color="#455CE9" />

                <Suspense fallback={null}>
                    <ResponsiveGroup>
                        <SocialKey
                            position={[-2, 0, 0]}
                            icon={<FaGithub />}
                            url="https://github.com/ChaosForCurio"
                            color="#2d333b"
                        />
                        <SocialKey
                            position={[0, 0, 0]}
                            icon={<FaLinkedin />}
                            url="https://www.linkedin.com/in/yourprofile"
                            color="#0077b5"
                        />
                        <SocialKey
                            position={[2, 0, 0]}
                            icon={<FaXTwitter />}
                            url="https://x.com/yourhandle"
                            color="#000000"
                        />
                    </ResponsiveGroup>

                    <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={15} blur={2.5} far={4} color="#000000" />
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    )
}

function ResponsiveGroup({ children }: { children: ReactNode }) {
    const { viewport } = useThree()
    const isMobile = viewport.width < 5

    return (
        <group scale={isMobile ? 0.6 : 1} position={[0, 0.5, 0]}>
            {children}
        </group>
    )
}
