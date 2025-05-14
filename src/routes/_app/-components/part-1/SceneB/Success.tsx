'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneBSuccess({ onSceneChange }: SceneProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isTouchable, setIsTouchable] = useState(true)

  const modelFaceArea = {
    top: 6,     // 얼굴이 이미지 상단에서 약 10% 위치
    left: 32,    // 얼굴이 이미지 좌측에서 약 38% 위치
    width: 30,   // 얼굴 너비는 이미지의 약 24%
    height: 25,  // 얼굴 높이는 이미지의 약 22%
  }

  return (
    <SuccessScene
      onSceneChange={onSceneChange}
      bgImage="/party/7_장원영.png"
      chunks={[
        {
          content: '그럼 나 혼자 집에서 짐빔 하이볼!',
        },
      ]}
      soundEffect="shalala"
      nextScene="part2"
      isTypingComplete={isTypingComplete}
      setIsTypingComplete={setIsTypingComplete}
      isTouchable={isTouchable}
      setIsTouchable={setIsTouchable}
      showGlitter={true}
      faceArea={modelFaceArea}
    />
  )
}