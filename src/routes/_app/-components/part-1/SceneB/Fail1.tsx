'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneBFail1({ onSceneChange }: SceneProps) {
  return (
    <FailScene
      onSceneChange={onSceneChange}
      bgImage="/party/8_단체.png"
      chunks={[
        { content: '친구 지금 왔는데?\n', className: 'font-bold' },
      ]}
      nextScene="part1SceneBMain"
      showFailMessage={true}
      failMessage={
        <>
          <div>아... 내가 오해했구나</div>
          <div>조금 더 분발해보자</div>
        </>
      }
    />
  )
}