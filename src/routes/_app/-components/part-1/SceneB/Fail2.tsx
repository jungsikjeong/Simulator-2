'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneBFail2({ onSceneChange }: SceneProps) {
  return (
    <FailScene
      onSceneChange={onSceneChange}
      bgImage="/party/9_박정민.png"
      chunks={[
        { content: '"마시고 있는데?"\n' },
        { content: '\n' },
        { content: '아...벌써 마시고 있구나\n' },
        { content: '맛있게 마셔! 안녕!' },
      ]}
      nextScene="part1SceneBMain"
      failMessage={
        <>
          <div>아... 벌써 마시고 있구나</div>
          <div>맛있게 마셔! 안녕!</div>
        </>
      }

    />
  )
}