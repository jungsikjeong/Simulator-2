'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part2SceneAFail2({ onSceneChange }: SceneProps) {
    return (
        <FailScene
            onSceneChange={onSceneChange}
            bgImage="/home/5_박정민.png"
            chunks={[{ content: '너무 대책 없는데?' }]}
            nextScene="part2SceneAMain"
        />
    )
}