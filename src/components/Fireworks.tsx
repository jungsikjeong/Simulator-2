'use client'

import { useEffect, useRef } from 'react'

interface FireworksProps {
    isTypingComplete?: boolean
}

export default function Fireworks({ isTypingComplete = false }: FireworksProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationId = useRef<number | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext('2d')!

        // 부모(wrapper) 크기에 맞춰 캔버스 리사이즈
        const resize = () => {
            const parent = canvas.parentElement!            // canvas 바로 상위가 wrapper
            const { width, height } = parent.getBoundingClientRect()
            canvas.width = width
            canvas.height = height
            // CSS 상으로도 꽉 채우기
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
        }
        resize()
        window.addEventListener('resize', resize)

        const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)
        const EDGE_RATIO = 0.2    // 양끝 20%
        const colors = ['#FFF', '#FFF9E3', '#FFF0F5', '#F0FFFF', '#F5FFFA', '#FFFAF0', '#FFFFF0']

        type P = { x: number, y: number, size: number, speedX: number, speedY: number, color: string, life: number, maxLife: number }
        const particles: P[] = []

        // wrapper 기준으로만 터지도록
        const createFirework = () => {
            const W = canvas.width
            const H = canvas.height
            const leftMax = W * EDGE_RATIO
            const rightMin = W * (1 - EDGE_RATIO)

            // 좌/우 50:50
            const x0 = Math.random() < 0.5
                ? randomBetween(0, leftMax)
                : randomBetween(rightMin, W)

            const y0 = randomBetween(H * 0.05, H * 0.95)
            const count = Math.floor(randomBetween(6, 10))
            const color = colors[Math.floor(Math.random() * colors.length)]

            for (let i = 0; i < count; i++) {
                const angle = randomBetween(0, Math.PI * 2)
                const speed = randomBetween(0.2, 0.6)
                particles.push({
                    x: x0,
                    y: y0,
                    size: randomBetween(1, 1.8),
                    speedX: Math.cos(angle) * speed,
                    speedY: Math.sin(angle) * speed,
                    color,
                    life: randomBetween(50, 100),
                    maxLife: randomBetween(50, 100),
                })
            }
        }

        const animate = () => {
            const W = canvas.width, H = canvas.height
            ctx.fillStyle = 'rgba(0,0,0,0.25)'
            ctx.fillRect(0, 0, W, H)

            if (Math.random() < (isTypingComplete ? 0.03 : 0.015)) {
                createFirework()
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i]
                ctx.globalAlpha = p.life / p.maxLife
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = p.color
                ctx.fill()
                ctx.shadowBlur = 2
                ctx.shadowColor = p.color
                ctx.fill()
                ctx.shadowBlur = 0

                p.x += p.speedX
                p.y += p.speedY
                p.speedY += 0.008
                p.speedX *= 0.99
                p.speedY *= 0.99
                p.life -= 0.5

                if (p.life <= 0) particles.splice(i, 1)
            }

            ctx.globalAlpha = 1
            animationId.current = requestAnimationFrame(animate)
        }

        // 초기 폭죽
        setTimeout(createFirework, 300)
        setTimeout(createFirework, 900)
        setTimeout(createFirework, 1500)
        // 타이핑 완료 후 추가
        if (isTypingComplete) {
            for (let i = 0; i < 4; i++) {
                setTimeout(createFirework, 300 + i * 500)
            }
        }

        animate()
        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationId.current!)
        }
    }, [isTypingComplete])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
        />
    )
}
