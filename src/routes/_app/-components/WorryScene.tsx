'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'
import { useGetCurrentMemberName } from '@/service/member/useGetMember'
import { motion } from 'framer-motion'

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
            nextBgList={['/박정민_3.png']}
        >
            <div className="absolute left-1/2 top-1/3 -translate-x-1/2 z-10 flex justify-center w-full pointer-events-none">
                <motion.img
                    src="/worry.png"
                    alt="고민"
                    className="w-40 md:w-56"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: 'easeInOut'
                    }}
                />
            </div>
        </SuccessScene>
    )
}