'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Environment, Center, ContactShadows, RoundedBox } from '@react-three/drei'
import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import anime from 'animejs'

// Constants for piano geometry
const WHITE_KEY_WIDTH = 1
const WHITE_KEY_HEIGHT = 4
const WHITE_KEY_DEPTH = 0.5
const BLACK_KEY_WIDTH = 0.6
const BLACK_KEY_HEIGHT = 2.5
const BLACK_KEY_DEPTH = 0.6

interface KeyProps {
    position: [number, number, number]
    color: string
    isBlack: boolean
    index: number
}

function Key({ position, color, isBlack = false, index }: KeyProps) {
    const mesh = useRef<THREE.Mesh>(null)
    const [hovered, setHover] = useState(false)

    useEffect(() => {
        if (!mesh.current) return

        // Create a random but rhythmic animation for this key
        const animation = anime({
            targets: mesh.current.rotation,
            x: [0, 0.1, 0], // Key press rotation
            duration: 500, // Quick tap
            easing: 'easeInOutQuad',
            delay: anime.random(0, 5000), // Random start time
            loop: true,
            direction: 'alternate',
            autoplay: true,
            endDelay: anime.random(500, 2000) // Random pause between presses
        })

        return () => animation.pause()
    }, [])

    // Interactive hover effect
    useEffect(() => {
        if (!mesh.current) return;
        if (hovered) {
            anime({
                targets: mesh.current.position,
                y: position[1] - 0.2,
                duration: 100,
                easing: 'easeOutQuad'
            })
            anime({
                targets: mesh.current.rotation,
                x: 0.15,
                duration: 100,
                easing: 'easeOutQuad'
            })
        } else {
            anime({
                targets: mesh.current.position,
                y: position[1],
                duration: 300,
                easing: 'easeOutQuad'
            })
            anime({
                targets: mesh.current.rotation,
                x: 0,
                duration: 300,
                easing: 'easeOutQuad'
            })
        }
    }, [hovered, position])

    return (
        <group position={position}>
            <RoundedBox
                ref={mesh}
                args={[
                    isBlack ? BLACK_KEY_WIDTH : WHITE_KEY_WIDTH * 0.95,
                    isBlack ? BLACK_KEY_DEPTH : WHITE_KEY_DEPTH,
                    isBlack ? BLACK_KEY_HEIGHT : WHITE_KEY_HEIGHT
                ]}
                radius={0.05}
                smoothness={2}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.8}
                />
            </RoundedBox>
        </group>
    )
}

function Piano() {
    // Generate keys for ~1.5 octaves
    // Pattern: W B W B W W B W B W B W
    const keys = useMemo(() => {
        const pattern = [
            { type: 'w' }, { type: 'b' }, { type: 'w' }, { type: 'b' }, { type: 'w' },
            { type: 'w' }, { type: 'b' }, { type: 'w' }, { type: 'b' }, { type: 'w' }, { type: 'b' }, { type: 'w' },
            { type: 'w' }, { type: 'b' }, { type: 'w' }
        ]

        let currentX = -((pattern.length * WHITE_KEY_WIDTH) / 2) // Center logic roughly

        // Improve centering logic
        const keyObjects: KeyProps[] = []
        let whiteKeyOffset = 0

        pattern.forEach((k, i) => {
            if (k.type === 'w') {
                keyObjects.push({
                    isBlack: false,
                    position: [whiteKeyOffset * WHITE_KEY_WIDTH, 0, 0],
                    color: '#ffffff',
                    index: i
                })
                whiteKeyOffset++
            } else {
                // Black key sits between previous and next white key
                keyObjects.push({
                    isBlack: true,
                    position: [(whiteKeyOffset - 1) * WHITE_KEY_WIDTH + (WHITE_KEY_WIDTH / 2), 0.5, -0.5], // Raised and set back
                    color: '#1a1a1a',
                    index: i
                })
            }
        })

        // Recenter
        const totalWidth = whiteKeyOffset * WHITE_KEY_WIDTH
        const centerOffset = totalWidth / 2

        return keyObjects.map(k => ({
            ...k,
            position: [k.position[0] - centerOffset, k.position[1], k.position[2] + (k.isBlack ? -BLACK_KEY_HEIGHT / 4 : 0)] as [number, number, number] // Adjust Z to align fronts roughly? No, piano keys align at back usually or front. Let's align front.
        }))

    }, [])

    return (
        <group rotation={[Math.PI / 4, 0, 0]}> {/* Tilt the whole piano towards camera */}
            {/* Piano Bed/Case */}
            <RoundedBox args={[16, 1, 5]} position={[0, -0.5, -1]} radius={0.2} smoothness={2}>
                <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
            </RoundedBox>

            {keys.map((k, i) => (
                <Key key={i} {...k} />
            ))}
        </group>
    )
}

function Rig() {
    const { camera, mouse } = useThree()
    const vec = new THREE.Vector3()

    useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 1 + 4, 10), 0.05)
        camera.lookAt(0, 0, 0)
    })

    return null
}

export default function Scene() {
    return (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 4, 10], fov: 45 }}>
            <color attach="background" args={['#0a0a0a']} />
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} intensity={20} castShadow color="white" />
            <spotLight position={[-10, 5, 10]} angle={0.5} penumbra={1} intensity={10} color="#455CE9" /> {/* Blue rim light */}
            <pointLight position={[0, -5, 5]} intensity={2} color="#ffffff" />

            <Suspense fallback={null}>
                <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                    <Center>
                        <Piano />
                    </Center>
                </Float>
                <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={20} blur={3} far={4.5} />
                <Environment preset="studio" />
                <Rig />
            </Suspense>
        </Canvas>
    )
}
