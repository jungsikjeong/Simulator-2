'use client'

import MultiBgRomanceScene from '@/components/MultiBgRomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneBNext5({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    return (
        <MultiBgRomanceScene
            onSceneChange={onSceneChange}
            bgImages={[
                '/romance/10_박정민.png',
                '/romance/11_박정민.png',
                '/romance/12_박정민.png'
            ]}
            // 텍스트를 하나의 chunk로 합치기
            chunks={[
                {
                    content: '내 순간순간\n나만의 정답을 찾고있어\n\n그래서 난\n아무렇지 않은데?',
                    className: 'font-bold'
                }
            ]}
            soundEffect={null}
            nextScene="ending"
            showRomanceEffect={true}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
            imageTransitionInterval={1500}  // 1.5초마다 이미지 전환
            initialImageDelay={1500}
            transitionDuration={800}  // 전환 애니메이션 0.5초
        />
    )
}