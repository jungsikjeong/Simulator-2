'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part2({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)

    return (
        <SuccessScene
            onSceneChange={onSceneChange}
            bgImage="/home/1_박정민.png"
            chunks={[
                {
                    content: '집 없는데?',
                },
            ]}
            soundEffect={null}
            nextScene="part2SceneAMain"
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
        />
    )
}
