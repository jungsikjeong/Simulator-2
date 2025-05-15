'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'
import { useGetCurrentMemberName, useUpdateMemberStatus, useGetCurrentMemberId } from '@/service/member/useGetMember'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function WorryScene({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)
    const { data: currentMemberName } = useGetCurrentMemberName()


    return (
        <SuccessScene
            onSceneChange={onSceneChange}
            bgImage="/박정민_2.png"
            chunks={[
                {
                    content: `[${currentMemberName}]!\n`,
                },
                {
                    content: '현재 너가 가지고 있는\n',
                },
                {
                    content: '고민거리에 집중을 해바',
                },
            ]}
            nextScene="cardSelect"
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
        />
    )
}