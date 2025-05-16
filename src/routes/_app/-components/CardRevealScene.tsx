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

    // 카드 리스트
    const cardList = [
        '/card/card1.png',
        '/card/card2.png',
        '/card/card3.png',
        '/card/card4.png',
        '/card/card5.png',
        '/card/card6.png',
        '/card/card7.png',
        '/card/card8.png',
        '/card/card9.png',
        '/card/card10.png',
        '/card/card11.png',
        '/card/card12.png',
        '/card/card13.png',
        '/card/card14.png',
        '/card/card15.png',
        '/card/card16.png',
        '/card/card17.png',
        '/card/card18.png',
        '/card/card19.png',
        '/card/card20.png',
        '/card/card21.png',
        '/card/card22.png',
        '/card/card23.png',
        '/card/card24.png',
        '/card/card25.png'
    ]

    useEffect(() => {
        // 랜덤으로 카드 선택
        const randomIndex = Math.floor(Math.random() * cardList.length)
        setSelectedCard(cardList[randomIndex])
    }, [])

    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
            {/* 배경 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-soft-blue-80 to-blue-100 z-0"></div>

            {/* 배경 효과 */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-20 h-20 md:w-40 md:h-40 rounded-full bg-soft-blue opacity-20 blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 md:w-60 md:h-60 rounded-full bg-soft-blue opacity-15 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 right-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-soft-blue opacity-20 blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-20 w-20 h-20 md:w-32 md:h-32 rounded-full bg-white opacity-30 blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* 컨텐츠 컨테이너 */}
            <div className="relative z-10 bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg max-w-md w-full mx-4 flex flex-col items-center p-5">
                {/* 상단 텍스트 */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-center mb-4"
                >
                    <h2 className="text-xl md:text-2xl font-bold text-soft-blue mb-1">
                        {currentMemberName || '오리'}!
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
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
                        delay: 0.5,
                        type: "spring",
                        stiffness: 70
                    }}
                    className="relative w-full max-w-[240px] aspect-[2/3] mb-6"
                >
                    {/* 카드 배경 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-soft-blue opacity-30 blur-md rounded-xl transform scale-105"></div>

                    {/* 카드 이미지 */}
                    <img
                        src={selectedCard}
                        alt="인생 해답 카드"
                        className="relative z-10 w-full h-full object-contain rounded-lg drop-shadow-xl"
                    />
                </motion.div>

                {/* 다음으로 버튼 */}
                <motion.button
                    onClick={() => onSceneChange('replay')}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-soft-blue hover:bg-soft-blue-hover text-white px-8 md:px-10 py-2 md:py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base"
                >
                    <span className="font-medium">다음으로 &gt;</span>
                </motion.button>
            </div>
        </div>
    )
}