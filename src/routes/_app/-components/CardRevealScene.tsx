'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGetCurrentMemberName } from '@/service/member/useGetMember'
import type { SceneKey } from '@/modules/scene-key.type'

type CardRevealSceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function CardRevealScene({ onSceneChange }: CardRevealSceneProps) {
    const { data: currentMemberName } = useGetCurrentMemberName()
    const [selectedCard, setSelectedCard] = useState<string>('')

    const cardList = [
        '/card/card_1.png',
        '/card/card_2.png',
        '/card/card_3.png',
        '/card/card_4.png',
        '/card/card_5.png',
        '/card/card_6.png',
        '/card/card_7.png',
        '/card/card_8.png',
        '/card/card_9.png',
        '/card/card_10.png',
        '/card/card_11.png',
        '/card/card_12.png',
        '/card/card_13.png',
        '/card/card_14.png',
        '/card/card_15.png',
        '/card/card_16.png',
        '/card/card_17.png',
        '/card/card_18.png',
        '/card/card_19.png',
        '/card/card_20.png',
        '/card/card_21.png',
        '/card/card_22.png',
        '/card/card_23.png',
        '/card/card_24.png',
        '/card/card_25.png'
    ]

    useEffect(() => {
        // 랜덤으로 카드 선택
        const randomIndex = Math.floor(Math.random() * cardList.length)
        setSelectedCard(cardList[randomIndex])

        // 진동 효과 (지원하는 기기만)
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 200])
        }
    }, [])

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 to-blue-100 flex flex-col items-center justify-center p-4">
            {/* 상단 텍스트 */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-center mb-8"
            >
                <h2 className="text-2xl font-bold text-indigo-700 mb-1">
                    {currentMemberName}!
                </h2>
                <p className="text-lg text-indigo-600">
                    너의 고민의<br />
                    인생해답카드는<br />
                    바로 이거야!
                </p>
            </motion.div>

            {/* 카드 이미지 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotateY: 0
                }}
                transition={{
                    duration: 1.2,
                    delay: 0.8,
                    type: "spring",
                    stiffness: 70
                }}
                className="relative w-full max-w-xs mb-10"
            >
                {selectedCard && (
                    <div className="relative aspect-[2/3] w-full flex justify-center">
                        <img
                            src={selectedCard}
                            alt="인생 해답 카드"
                            className="object-contain rounded-lg h-auto w-full max-h-[70vh] drop-shadow-xl"
                            loading="eager"
                        />
                    </div>
                )}
            </motion.div>

            {/* 버튼 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2 }}
                className="mt-4"
            >
                <motion.button
                    onClick={() => onSceneChange('worry')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full shadow-lg transition-colors duration-300"
                >
                    <span className="font-medium">다음으로 &gt;&gt;</span>
                </motion.button>
            </motion.div>
        </div>
    )
}