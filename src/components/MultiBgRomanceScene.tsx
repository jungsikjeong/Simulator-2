'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import DialogueBox from '@/components/DialogueBox'
import type { SceneKey } from '@/modules/scene-key.type'
import EnhancedRomanceEffect from '@/components/romance-effect'
import type { SoundEffect } from '@/components/SceneLayout'

// 배경 이미지 전환 전용 컴포넌트 (메모이제이션)
const BackgroundRotator = memo<{ images: string[]; initialDelay: number; interval: number; duration: number }>(
    function BackgroundRotator({ images, initialDelay, interval, duration }) {
        const [current, setCurrent] = useState(images[0])
        const [next, setNext] = useState<string>('')
        const [opacity, setOpacity] = useState(0)
        const idxRef = useRef(0)
        const startedRef = useRef(false)
        const intervalRef = useRef<NodeJS.Timeout | null>(null)

        useEffect(() => {
            if (images.length < 2 || startedRef.current) return
            const startRotation = () => {
                startedRef.current = true
                intervalRef.current = setInterval(() => {
                    const nextIdx = (idxRef.current + 1) % images.length
                    setNext(images[nextIdx])
                    setTimeout(() => {
                        setOpacity(1)
                        setTimeout(() => {
                            setCurrent(images[nextIdx])
                            setNext('')
                            setOpacity(0)
                            idxRef.current = nextIdx
                        }, duration)
                    }, 50)
                }, interval)
            }
            const tid = setTimeout(startRotation, initialDelay)
            return () => {
                clearTimeout(tid)
                intervalRef.current && clearInterval(intervalRef.current)
            }
        }, [initialDelay, interval, duration, images.length])

        return (
            <>
                {/* 현재 이미지 (페이드 없이 항상 표시) */}
                <div
                    className="absolute inset-0 h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${current})` }}
                />

                {/* 전환될 이미지: opacity와 blur 효과만 적용 */}
                {next && (
                    <div
                        className="absolute inset-0 h-full w-full bg-cover bg-center transition-opacity transition-filter ease-in-out"
                        style={{
                            backgroundImage: `url(${next})`,
                            opacity,
                            filter: opacity ? 'blur(0px)' : 'blur(4px)',
                            transitionDuration: `${duration}ms`,
                            zIndex: 0,
                        }}
                    />
                )}
            </>
        )
    }
)

// DialogueBox를 메모이제이션하여 리렌더링 방지
const MemoDialogueBox = memo(DialogueBox)

interface MultiBgRomanceSceneProps {
    onSceneChange: (scene: SceneKey) => void
    bgImages: string[]
    chunks: Array<{ content: string; className?: string }>
    nextScene: SceneKey
    showRomanceEffect?: boolean
    soundEffect?: SoundEffect | null
    isTypingComplete?: boolean
    setIsTypingComplete?: (isComplete: boolean) => void
    imageTransitionInterval?: number
    initialImageDelay?: number
    transitionDuration?: number
    typingSpeed?: number
    isTouchable?: boolean
    setIsTouchable?: (isTouchable: boolean) => void
}

export default function MultiBgRomanceScene({
    onSceneChange,
    bgImages,
    chunks,
    nextScene,
    showRomanceEffect = true,
    soundEffect = null,
    isTypingComplete = false,
    setIsTypingComplete,
    imageTransitionInterval = 5000,
    initialImageDelay = 2000,
    transitionDuration = 800,
    typingSpeed = 10,
    isTouchable = true,
    setIsTouchable,
}: MultiBgRomanceSceneProps) {
    // 사운드 이펙트 재생
    useEffect(() => {
        if (!soundEffect) return
        const audio = new Audio(`/sounds/${soundEffect}.mp3`)
        audio.play().catch(() => { })
    }, [soundEffect])

    // ESC 키 스킵 처리
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onSceneChange(nextScene)
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [onSceneChange, nextScene])

    // 클릭/터치 시 씬 전환
    const handleTouch = useCallback(() => {
        if (isTypingComplete) onSceneChange(nextScene)
    }, [isTypingComplete, onSceneChange, nextScene])

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* 배경 전환 레이어 */}
            <BackgroundRotator
                images={bgImages}
                initialDelay={initialImageDelay}
                interval={imageTransitionInterval}
                duration={transitionDuration}
            />

            {/* 콘텐츠 레이어 */}
            <div className="relative z-10 flex h-screen w-full flex-col justify-center"
                onClick={() => isTypingComplete && onSceneChange(nextScene)}>
                {showRomanceEffect && <EnhancedRomanceEffect />}
                <MemoDialogueBox
                    chunks={chunks}
                    typingSpeed={typingSpeed}
                    typingDelay={0.1}
                    variant="romance"
                    className="mx-auto cursor-pointer px-0 py-6"
                    typingTextClassName="text-base sm:text-xl leading-relaxed"
                    isTouchable={isTouchable}
                    setIsTouchable={setIsTouchable}
                    onTouchSceneChange={handleTouch}
                    isTypingComplete={isTypingComplete}
                    setIsTypingComplete={setIsTypingComplete}
                />
            </div>
        </div>
    )
}
