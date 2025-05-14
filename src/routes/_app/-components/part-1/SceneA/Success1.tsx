'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneASuccess1({ onSceneChange }: SceneProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isTouchable, setIsTouchable] = useState(true)

  // 장원영 이미지를 위한 얼굴 영역 정의
  const modelFaceArea = {
    top: 6,      // 얼굴이 이미지 상단에서 약 8% 위치
    left: 32,    // 얼굴이 이미지 좌측에서 약 40% 위치
    width: 25,   // 얼굴 너비는 이미지의 약 20%
    height: 30,  // 얼굴 높이는 이미지의 약 25%
  }

  return (
    <SuccessScene
      onSceneChange={onSceneChange}
      bgImage="/party/2_장원영.png"
      chunks={[
        {
          content: '좋아하는 친구들과 짐빔 하이볼!',
        },
      ]}
      soundEffect="shalala"
      nextScene="part1SceneASuccess2"
      isTypingComplete={isTypingComplete}
      setIsTypingComplete={setIsTypingComplete}
      isTouchable={isTouchable}
      setIsTouchable={setIsTouchable}
      showGlitter={true}
      faceArea={modelFaceArea}
    />
  )
}