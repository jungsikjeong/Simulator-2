// src/components/SceneLayout.tsx
'use client'

import {
    AnimatePresence,
    motion,
    type TargetAndTransition,
    type Variants,
} from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

export type TransitionEffect =
    | 'fade'
    | 'shake'
    | 'zoom'
    | 'flash'
    | 'slide'
    | 'crossFade'
    | 'smoothFade'
    | 'trueBlend'
export type SoundEffect = 'shalala' | '뾰로롱' | '또로롱' | null

interface SceneLayoutProps extends PropsWithChildren {
    bg: string
    effect?: TransitionEffect
    onSkip?: () => void
    soundEffect?: SoundEffect
    hideTitle?: boolean
}

/** 효과별 variant 정의 (기존과 동일) */
const variantMap: Record<TransitionEffect, Variants> = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
        exit: { opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
    },
    zoom: {
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
    },
    flash: {
        initial: { opacity: 0 },
        animate: { opacity: [0, 1, 0.8, 1] as number[] },
        exit: { opacity: 0 },
    },
    shake: {
        initial: {
            opacity: 0,
            transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
        },
        animate: {
            opacity: 1,
            x: [0, -4, 4, -4, 4, 0] as number[],
            y: [0, 2, -2, 2, -2, 0] as number[],
            transition: { duration: 0.6 },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
        },
    },
    slide: {
        initial: { x: '100%', opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
        exit: { x: '-100%', opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
    },
    crossFade: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
        },
    },
    smoothFade: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
        },
    },
    trueBlend: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.8, ease: [0.32, 0, 0.67, 0] },
        },
    },
}

export default function SceneLayout({
    bg,
    effect = 'trueBlend',
    onSkip,
    children,
    soundEffect = null,
    hideTitle = false,
}: SceneLayoutProps) {
    // 사운드 재생
    useEffect(() => {
        if (soundEffect) {
            const audio = new Audio(`/sounds/${soundEffect}.mp3`)
            audio.play().catch(() => { })
        }
    }, [soundEffect])

    // Esc 키로 스킵
    useEffect(() => {
        const handler = (e: KeyboardEvent) => e.key === 'Escape' && onSkip?.()
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onSkip])

    // 미리 로드할 배경 이미지들
    useEffect(() => {
        const bgUrls = [
            '/박정민_1.png',
            '/박정민_2.png',
            '/박정민_3.png',
            '/박정민_4.png',
            '/박정민_5.png',
            '/박정민_6.png',
            '/card/card_back.png',
        ]
        bgUrls.forEach((src) => {
            const img = new Image()
            img.src = src
        })
    }, [])

    const { initial, animate, exit } = variantMap[effect]

    return (
        <AnimatePresence mode="sync">
            <motion.div
                key={`${bg}-${effect}`}
                className="relative h-screen w-full overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${bg})` }}
                initial={initial as TargetAndTransition}
                animate={animate as TargetAndTransition}
                exit={exit as TargetAndTransition}
            >
                {!hideTitle && (
                    <img
                        src="/logo.png"
                        alt="Greatest Marketer of Jim Beam"
                        className="absolute top-2 right-2 w-20 z-50"
                    />
                )}
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
