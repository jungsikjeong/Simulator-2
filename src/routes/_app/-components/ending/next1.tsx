// src/routes/_app/-components/ending/next1.tsx
'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'
import { Star } from 'lucide-react'
import Fireworks from '@/components/Fireworks'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function EndingNext1({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    return (
        <div className="relative">
            {/* 폭죽 효과 */}
            <Fireworks isTypingComplete={isTypingComplete} />

            <RomanceScene
                onSceneChange={onSceneChange}
                bgImage="/ending/2_같이.png"
                chunks={[
                    {
                        content: '각기 다른 청춘의 일상에 정답은 없지!\n',
                        className: 'font-bold text-white'
                    },
                    {
                        content: '너만의 방식대로 행복해서 다행이야~',
                        className: 'font-bold text-white'
                    },
                ]}
                soundEffect={null}
                nextScene="endingNext2"
                showRomanceEffect={false}
                isTypingComplete={isTypingComplete}
                setIsTypingComplete={setIsTypingComplete}
                isTouchable={isTouchable}
                setIsTouchable={setIsTouchable}
            />

            {/* 하단 성공 메시지 */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center text-white text-sm sm:text-lg z-30 transition-all duration-1000 ${isTypingComplete ? 'scale-110 opacity-100' : 'scale-100 opacity-90'}`}>
                <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
                <span className="ml-2 mr-2 whitespace-nowrap font-bold">
                    원영이와 짐빔하이볼로 정민 응원하기, 성공
                </span>
                <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
            </div>
        </div>
    )
}