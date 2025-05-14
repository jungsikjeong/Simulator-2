'use client'

import {
    AnimatePresence,
    motion,
    type TargetAndTransition,
    type Variants,
} from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

export type TransitionEffect = 'fade' | 'shake' | 'zoom' | 'flash' | 'slide' | 'crossFade' | 'smoothFade' | 'trueBlend'
export type SoundEffect = 'shalala' | '뾰로롱' | '또로롱' | null

interface SceneLayoutProps extends PropsWithChildren {
    bg: string
    effect?: TransitionEffect
    onSkip?: () => void
    soundEffect?: SoundEffect
    hideTitle?: boolean
}

/** 효과별 variant 정의 */
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
        // as number[] : readonly → 가변 배열로 캐스팅
        animate: { opacity: [0, 1, 0.8, 1] as number[] },
        exit: { opacity: 0 },
    },
    shake: {
        initial: {
            opacity: 0,
            transition: {
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 1]
            }
        },
        animate: {
            opacity: 1,
            x: [0, -4, 4, -4, 4, 0] as number[],
            y: [0, 2, -2, 2, -2, 0] as number[],
            transition: { duration: 0.6 },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1]
            }
        },
    },
    slide: {
        initial: { x: '100%', opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: 'easeInOut' }
        },
        exit: {
            x: '-100%',
            opacity: 0,
            transition: { duration: 0.6, ease: 'easeInOut' }
        },
    },
    crossFade: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1]
            }
        },
    },
    smoothFade: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 1]
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1]
            }
        },
    },
    trueBlend: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1]
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.8,
                ease: [0.32, 0, 0.67, 0]
            }
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
    useEffect(() => {
        if (soundEffect) {
            const audio = new Audio(`/sounds/${soundEffect}.mp3`)
            audio.play().catch(error => console.log('오디오 재생 실패:', error))
        }
    }, [soundEffect])

    /* Esc 스킵 */
    useEffect(() => {
        const h = (e: KeyboardEvent) => e.key === 'Escape' && onSkip?.()
        window.addEventListener('keydown', h)
        return () => window.removeEventListener('keydown', h)
    }, [onSkip])

    useEffect(() => {
        const bgUrls = [
            '/start_장원영.png',
            '/hof/1_박정민.png',
            '/hof/2_장원영.png',
            '/hof/3_장원영.png',
            '/hof/4_장원영.png',
            '/home/1_박정민.png',
            '/home/2_장원영.png',
            '/home/3_장원영.png',
            '/home/4_박정민.png',
            '/party/1_박정민.png',
            '/party/2_장원영.png',
            '/party/3_장원영.png',
            '/party/4_박정민.png',
            '/party/5_박정민.png',
            '/party/6_장원영.png',
            '/party/7_장원영.png',
            '/party/8_단체.png',
            '/party/9_박정민.png',
            '/reward/박정민_진저.png',
            '/reward/박정민_레몬.png',
            '/reward/박정민_자몽.png',
            '/reward/박정민_플레인.png',
            '/reward/장원영_레몬.png',
            '/reward/장원영_자몽.png',
            '/reward/장원영_진저.png',
            '/reward/장원영_플레인.png',
            '/romance/1_박정민.png',
            '/romance/2_박정민.png',
            '/romance/3_박정민.png',
            '/romance/4_박정민.png',
            '/romance/5_박정민.png',
            '/romance/6_박정민.png',
            '/romance/7_박정민.png',
            '/romance/8_박정민.png',
            '/romance/9_박정민.png',
            '/romance/10_박정민.png',
            '/romance/11_박정민.png',
            '/romance/12_박정민.png',
            '/ending/1_장원영.png',
            '/ending/2_같이.png',
            '/ending/3_같이.png',
        ]

        bgUrls.forEach((src) => {
            const img = new Image();
            img.src = src;
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
                        className="absolute top-2 right-4 w-20 z-50"
                    />
                )}
                {children}
            </motion.div>
        </AnimatePresence>
    )
}