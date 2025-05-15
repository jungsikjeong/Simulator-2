'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { useGetCurrentMemberName } from '@/service/member/useGetMember'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function CardSelectScene2({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)
    const [showCards, setShowCards] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const { data: currentMemberName } = useGetCurrentMemberName()

    // 25장의 카드 정보 생성
    const cards = Array.from({ length: 25 }, (_, index) => {
        // 카드 2줄로 나누기 (13장, 12장)
        const row = index < 13 ? 0 : 1;
        const colCount = row === 0 ? 13 : 12;
        const colIndex = row === 0 ? index : index - 13;

        // 부채꼴 모양으로 배치 계산 (위쪽 방향)
        const fanAngle = row === 0 ? 70 : 60; // 부채꼴 펼침 각도 (더 좁게 조정)
        const startAngle = row === 0 ? 235 : 240; // 시작 각도 (위쪽 방향을 위해 조정)
        const angle = startAngle + (fanAngle / (colCount - 1)) * colIndex;
        const radius = row === 0 ? 280 : 380; // 부채꼴 반지름

        // 부채꼴 위치 계산 (삼각함수 사용)
        const radians = (angle * Math.PI) / 180;
        const x = Math.cos(radians) * radius;
        const y = Math.sin(radians) * radius + (row === 0 ? 50 : 10); // 위치 조정 (위쪽 방향)

        return {
            id: index,
            x: x,
            y: y,
            rotation: angle + 90, // 카드가 부채꼴 방향으로 회전하되 수직으로 서도록 +90도 조정
            scale: 0.9,
            delay: 0.02 * index,
            row: row
        };
    });

    // 대화 완료 후 카드 표시
    useEffect(() => {
        if (isTypingComplete) {
            const timer = setTimeout(() => {
                setShowCards(true);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isTypingComplete]);

    // 카드 선택 핸들러
    const handleCardSelect = (cardId: number) => {
        if (selectedCardId === null && !isTransitioning) {
            setSelectedCardId(cardId);
            setIsTransitioning(true);

            // 카드 이동 애니메이션 후 다음 씬으로 이동
            setTimeout(() => {
                onSceneChange("cardSelect1");
            }, 1500);
        }
    };

    return (
        <SceneLayout bg="/박정민_3.png" effect="trueBlend">
            <div className="relative flex h-screen flex-col justify-between overflow-hidden bg-cover bg-center">
                {/* 대화 상자 */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{
                        opacity: isTypingComplete && selectedCardId === null ? 1 : 0,
                        y: 0,
                        scale: 1
                    }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                        scale: { type: 'spring', damping: 20, stiffness: 100 },
                    }}
                    className="mt-20"
                >
                    <DialogueBox
                        chunks={[
                            { content: `[${currentMemberName}],\n` },
                            { content: '이제 네 마음에 드는 카드를 선택해줘\n' },
                        ]}
                        typingDelay={0.5}
                        variant="light"
                        className="cursor-pointer px-6 py-6 transition-transform duration-200"
                        typingTextClassName="text-base sm:text-xl leading-relaxed"
                        isTouchable={isTouchable}
                        setIsTouchable={setIsTouchable}
                        isTypingComplete={isTypingComplete}
                        setIsTypingComplete={setIsTypingComplete}
                    />
                </motion.div>

                {/* 카드 부채꼴 배열 */}
                <div className="flex-grow flex items-center justify-center">
                    <AnimatePresence>
                        {showCards && (
                            <motion.div
                                className="relative w-full h-full flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                style={{ marginTop: '750px' }} // 카드 전체 위치 조정
                            >
                                {cards.map((card) => (
                                    <motion.div
                                        key={card.id}
                                        className={`absolute cursor-pointer ${selectedCardId !== null && selectedCardId !== card.id ? 'pointer-events-none' : ''}`}
                                        style={{
                                            width: '60px',
                                            height: '90px',
                                            zIndex: selectedCardId === card.id ? 10 : 1
                                        }}
                                        initial={{
                                            x: 0,
                                            y: 0,
                                            rotate: 0,
                                            scale: 0,
                                            opacity: 0
                                        }}
                                        animate={{
                                            x: selectedCardId === card.id
                                                ? 0
                                                : selectedCardId !== null
                                                    ? card.x + (Math.random() * 800 - 400)
                                                    : card.x,
                                            y: selectedCardId === card.id
                                                ? 0
                                                : selectedCardId !== null
                                                    ? card.y + (Math.random() * 800 - 400)
                                                    : card.y,
                                            rotate: selectedCardId === card.id
                                                ? 0
                                                : selectedCardId !== null
                                                    ? card.rotation + (Math.random() * 360)
                                                    : card.rotation,
                                            scale: selectedCardId === card.id
                                                ? 2.5
                                                : selectedCardId !== null
                                                    ? 0
                                                    : card.scale,
                                            opacity: selectedCardId !== null && selectedCardId !== card.id
                                                ? 0
                                                : 1,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            damping: 12,
                                            stiffness: 100,
                                            delay: selectedCardId !== null
                                                ? (selectedCardId === card.id ? 0 : 0.05 + Math.random() * 0.1)
                                                : card.delay,
                                            duration: selectedCardId !== null ? 0.8 : 0.6
                                        }}
                                        whileHover={selectedCardId === null ? {
                                            y: card.y - 20,
                                            scale: card.scale * 1.15,
                                            zIndex: 5,
                                            transition: { duration: 0.2 }
                                        } : {}}
                                        onClick={() => handleCardSelect(card.id)}
                                    >
                                        <img
                                            src="/card/card_back.png"
                                            alt="Card back"
                                            className="w-full h-full object-cover rounded-lg shadow-lg" // 제거된 rotate-180 변환
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 선택된 카드 확대 및 중앙 이동 효과 */}
                <AnimatePresence>
                    {selectedCardId !== null && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="absolute"
                                initial={{ scale: 1, y: 0, opacity: 0 }}
                                animate={{
                                    scale: 2.5,
                                    y: -50,
                                    opacity: 1,
                                    transition: {
                                        type: 'spring',
                                        damping: 15,
                                        stiffness: 80,
                                        duration: 0.8
                                    }
                                }}
                                exit={{
                                    y: -100,
                                    opacity: 0,
                                    transition: { duration: 0.5 }
                                }}
                            >
                                <div className="w-60 h-90 transform origin-center">
                                    {/* 선택된 카드가 화면 중앙으로 이동하는 효과를 위한 빈 컨테이너 */}
                                    {/* 가로/세로 크기 조정 */}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SceneLayout>
    )
}