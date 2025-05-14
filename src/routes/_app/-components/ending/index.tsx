'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Ending({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    return (
        <RomanceScene
            onSceneChange={onSceneChange}
            bgImage="/ending/1_장원영.png"
            chunks={[
                {
                    content: '...\n', className: 'font-bold text-black/70'
                },
                {
                    content: '그것 참 잘됐다', className: 'font-bold text-black/70'
                },
            ]}
            soundEffect={null}
            nextScene="endingNext1"
            showRomanceEffect={false}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
        />
    )
}
