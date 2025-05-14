'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneBMain({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    return (
        <RomanceScene
            onSceneChange={onSceneChange}
            bgImage="/romance/5_박정민.png"
            chunks={[
                {
                    content: '"응? 나 아무렇지 않은데?"', className: 'font-bold'
                },
            ]}
            soundEffect={null}
            nextScene="part4SceneBNext1"
            showRomanceEffect={false}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
        />
    )
}
