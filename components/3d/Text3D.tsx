'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Center, Float, Environment } from '@react-three/drei'
import { useRef, Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

function AnimatedText3D({ text = "CHAOS" }: { text?: string }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return

        // Smooth rotation animation
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1

        // Floating animation
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    })

    return (
        <group ref={groupRef}>
            <Center>
                <Float
                    speed={2}
                    rotationIntensity={0.3}
                    floatIntensity={0.4}
                >
                    {/* Main 3D Text */}
                    <Text
                        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
                        fontSize={2}
                        letterSpacing={0.02}
                        lineHeight={1}
                        textAlign="center"
                        outlineWidth={0.05}
                        outlineColor="#4169E1"
                    >
                        {text}
                        <meshStandardMaterial
                            color="#ffffff"
                            metalness={0.9}
                            roughness={0.1}
                            emissive="#4169E1"
                            emissiveIntensity={0.3}
                        />
                    </Text>

                    {/* Shadow/Outline layer */}
                    <Text
                        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
                        fontSize={2.05}
                        letterSpacing={0.02}
                        lineHeight={1}
                        textAlign="center"
                        position={[0, 0, -0.1]}
                    >
                        {text}
                        <meshBasicMaterial
                            color="#4169E1"
                            transparent
                            opacity={0.4}
                        />
                    </Text>
                </Float>
            </Center>
        </group>
    )
}

function Particles() {
    const pointsRef = useRef<THREE.Points>(null)

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(1000 * 3)
        for (let i = 0; i < 1000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30
        }
        return positions
    }, [])

    useFrame((state) => {
        if (!pointsRef.current) return
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#4169E1"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    )
}

function Lights() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.3}
                penumbra={1}
                intensity={100}
                castShadow
                color="#ffffff"
            />
            <spotLight
                position={[-10, -10, -10]}
                angle={0.3}
                penumbra={1}
                intensity={50}
                color="#4169E1"
            />
            <pointLight position={[0, 5, 5]} intensity={50} color="#ff6b6b" />
            <pointLight position={[0, -5, -5]} intensity={50} color="#4ecdc4" />
        </>
    )
}

function CameraController() {
    useFrame((state) => {
        state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 2
        state.camera.lookAt(0, 0, 0)
    })
    return null
}

export default function Text3DComponent({ text = "CHAOS", className = "" }: { text?: string, className?: string }) {
    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2
                }}
            >
                <color attach="background" args={['#0a0a0a']} />

                <Suspense fallback={null}>
                    <Lights />
                    <AnimatedText3D text={text} />
                    <Particles />
                    <Environment preset="studio" />
                    <CameraController />

                    {/* Post-processing effects */}
                    <EffectComposer>
                        <Bloom
                            intensity={0.5}
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.9}
                            mipmapBlur
                        />
                        <ChromaticAberration
                            blendFunction={BlendFunction.NORMAL}
                            offset={new THREE.Vector2(0.001, 0.001)}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    )
}
