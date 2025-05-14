'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState, useEffect } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneBNext3({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)
    const [isFading, setIsFading] = useState(false)
    const [opacity, setOpacity] = useState(0)

    // 타이핑 완료 후 자동 전환 처리
    useEffect(() => {
        if (isTypingComplete) {
            // 페이드 아웃 효과 시작
            const fadeTimer = setTimeout(() => {
                setIsFading(true)
                setOpacity(1)
            }, 1200)

            // 씬 전환 - 페이드 아웃 효과가 어느 정도 진행된 후 전환
            const transitionTimer = setTimeout(() => {
                onSceneChange('part4SceneBNext4')
            }, 1800) // 1200ms + 600ms (페이드 아웃이 거의 완료된 시점)

            return () => {
                clearTimeout(fadeTimer)
                clearTimeout(transitionTimer)
            }
        }
    }, [isTypingComplete, onSceneChange])

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* 현재 배경 */}
            <div
                className="absolute inset-0 h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url('/romance/8_박정민.png')` }}
            />

            {/* 전환될 배경 */}
            {isFading && (
                <div
                    className="absolute inset-0 h-full w-full bg-cover bg-center transition-opacity transition-filter ease-in-out"
                    style={{
                        backgroundImage: `url('/romance/9_박정민.png')`,
                        opacity,
                        filter: opacity ? 'blur(0px)' : 'blur(4px)',
                        transitionDuration: '600ms',
                        zIndex: 0,
                    }}
                />
            )}

            {/* 콘텐츠 레이어 */}
            <div className="relative z-10">
                <RomanceScene
                    onSceneChange={onSceneChange}
                    bgImage="/romance/8_박정민.png"
                    chunks={[
                        {
                            content: '낭만도 없지만', className: 'font-bold'
                        },
                    ]}
                    soundEffect={null}
                    nextScene="part4SceneBNext4"
                    showRomanceEffect={true}
                    isTypingComplete={isTypingComplete}
                    setIsTypingComplete={setIsTypingComplete}
                    isTouchable={isTouchable}
                    setIsTouchable={setIsTouchable}
                />
            </div>
        </div>
    )
}