'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part2SceneAFail1({ onSceneChange }: SceneProps) {
    return (
        <FailScene
            onSceneChange={onSceneChange}
            bgImage="/home/4_박정민.png"
            chunks={[{ content: '집 보다 취직 먼저 할 건데?' }]}
            nextScene="part2SceneAMain"
        />
    )
}