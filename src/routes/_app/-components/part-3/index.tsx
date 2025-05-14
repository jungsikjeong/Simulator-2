'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part3({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    return (
        <SuccessScene
            onSceneChange={onSceneChange}
            bgImage="/hof/1_박정민.png"
            chunks={[
                {
                    content: '여유 없는데?',
                },
            ]}
            soundEffect={null}
            nextScene="part3SceneAMain"
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
        />
    )
}
