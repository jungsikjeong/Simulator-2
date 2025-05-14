'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneAFail1({ onSceneChange }: SceneProps) {
  return (
    <FailScene
      onSceneChange={onSceneChange}
      bgImage="/party/3_장원영.png"
      chunks={[
        { content: '분명 좋은 응원 방법이 있지 않을까?\n', className: 'font-bold' },
        { content: '한번 더 나를 위해\n 고민해주겠어?' },
      ]}
      nextScene="part1"
      showFailMessage={false}
    />
  )
}