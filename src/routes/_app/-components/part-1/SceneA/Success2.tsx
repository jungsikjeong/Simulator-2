'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneASuccess2({ onSceneChange }: SceneProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  return (
    <SuccessScene
      onSceneChange={onSceneChange}
      bgImage="/party/5_박정민.png"
      chunks={[
        {
          content: '친구 없는데?',
        },
      ]}
      soundEffect={null}
      effect="fade"
      nextScene="part1SceneBMain"
      isTypingComplete={isTypingComplete}
      setIsTypingComplete={setIsTypingComplete}
    />
  )
}
