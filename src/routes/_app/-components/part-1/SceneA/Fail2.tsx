'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneAFail2({ onSceneChange }: SceneProps) {
  return (
    <FailScene
      onSceneChange={onSceneChange}
      bgImage="/party/4_박정민.png"
      chunks={[
        { content: '부담스러워...' },
      ]}
      nextScene="part1"
      showFailMessage={false}
    />
  )
}