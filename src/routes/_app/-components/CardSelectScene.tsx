'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { useGetCurrentMemberName } from '@/service/member/useGetMember'
import { useIsMobile } from '@/hooks/use-mobile'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function CardSelectScene1({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)
    const [showCards, setShowCards] = useState(false)
    const [_cardsAnimationComplete, _setCardsAnimationComplete] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [showCenteredCard, setShowCenteredCard] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const { data: currentMemberName } = useGetCurrentMemberName()
    const isMobile = useIsMobile()

    useEffect(() => {
        if (isTypingComplete) {
            const timer = setTimeout(() => {
                setShowCards(true);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isTypingComplete]);

    // Create responsive cards with two rows for both mobile and desktop
    const cards = Array.from({ length: 25 }, (_, index) => {
        // Split cards into two rows (13 and 12) for both mobile and desktop
        const row = index < 13 ? 0 : 1;
        const colCount = row === 0 ? 13 : 12;
        const colIndex = row === 0 ? index : index - 13;

        // Adjust fan angles and radius based on mobile/desktop
        const fanAngle = isMobile
            ? (row === 0 ? 60 : 50) // Narrower angles for mobile
            : (row === 0 ? 70 : 60); // Original angles for desktop

        const startAngle = isMobile
            ? (row === 0 ? 240 : 245) // Adjusted start angles for mobile
            : (row === 0 ? 235 : 240); // Original start angles for desktop

        const angle = startAngle + (fanAngle / (colCount - 1)) * colIndex;

        const radius = isMobile
            ? (row === 0 ? 200 : 270) // Smaller radii for mobile
            : (row === 0 ? 280 : 380); // Original radii for desktop

        // Position calculation
        const radians = (angle * Math.PI) / 180;
        const x = Math.cos(radians) * radius;
        const y = Math.sin(radians) * radius + (
            isMobile
                ? (row === 0 ? 20 : -10) // Adjusted vertical position for mobile
                : (row === 0 ? 50 : 10)  // Original vertical position for desktop
        );

        return {
            id: index,
            x: x,
            y: y,
            rotation: angle + 90, // Card rotates in fan direction but stands vertically with +90
            scale: isMobile ? 0.7 : 0.9, // Smaller cards on mobile
            delay: 0.02 * index,
            row: row
        };
    });

    // 카드 선택 핸들러
    const handleCardSelect = (cardId: number) => {
        if (selectedCardId === null && !isTransitioning) {
            setSelectedCardId(cardId);
            setIsTransitioning(true);

            // 카드 배열 사라지고 중앙 카드 표시
            setTimeout(() => {
                setShowCards(false);
                setShowCenteredCard(true);

                // 카드가 선택된 후 버튼 표시
                setTimeout(() => {
                    setShowButtons(true);
                }, 500);
            }, 300);
        }
    };

    // 다시 고르기 핸들러
    const handleReselectCard = () => {
        setShowButtons(false);
        setShowCenteredCard(false);
        setSelectedCardId(null);
        setIsTransitioning(false);

        // 잠시 후 카드 다시 표시
        setTimeout(() => {
            setShowCards(true);
        }, 300);
    };

    // 계속 진행 핸들러
    const handleContinue = () => {
        setShowButtons(false);

        // 다음 씬으로 이동
        setTimeout(() => {
            onSceneChange("cardSelect");
        }, 500);
    };

    return (
        <SceneLayout bg="/박정민_3.png" effect="trueBlend">
            <div className="relative flex h-screen flex-col justify-end overflow-hidden bg-cover bg-center">
                {/* 대화 상자 */}
                <motion.div
                    className="absolute bottom-20 left-0 right-0 z-10"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                        opacity: 1,
                        y: isTypingComplete ? (isMobile ? -180 : -280) : 0
                    }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                        y: {
                            delay: isTypingComplete ? 0.2 : 0,
                            type: 'spring',
                            damping: 15,
                            stiffness: 100
                        }
                    }}
                >
                    <DialogueBox
                        chunks={[
                            { content: `[${currentMemberName}]!\n` },
                            { content: '고민거리를 생각했다면\n' },
                            { content: '\n' },
                            { content: '이제 이 수 많은 카드중에\n' },
                            { content: '마음에 드는 카드를 골라봐' },
                        ]}
                        typingDelay={0.5}
                        variant="light"
                        className="mb-4 cursor-pointer px-0 py-6 transition-transform duration-200"
                        typingTextClassName="text-base sm:text-xl leading-relaxed"
                        isTouchable={isTouchable}
                        setIsTouchable={setIsTouchable}
                        onTouchSceneChange={!showCards ? () => onSceneChange("worry") : undefined}
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
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    marginBottom: isMobile ? '-800px' : '-1100px'
                                }}
                            >
                                {cards.map((card) => (
                                    <motion.div
                                        key={card.id}
                                        className="absolute cursor-pointer"
                                        style={{
                                            width: isMobile ? '45px' : '60px',
                                            height: isMobile ? '68px' : '90px',
                                            zIndex: 1
                                        }}
                                        initial={{
                                            x: 0,
                                            y: 0,
                                            rotate: 0,
                                            scale: 0,
                                            opacity: 0
                                        }}
                                        animate={{
                                            x: card.x,
                                            y: card.y,
                                            rotate: card.rotation,
                                            scale: card.scale,
                                            opacity: 1
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0,
                                            transition: { duration: 0.2 }
                                        }}
                                        transition={{
                                            type: 'spring',
                                            damping: 12,
                                            stiffness: 100,
                                            delay: card.delay,
                                            duration: 0.6
                                        }}
                                        whileHover={{
                                            y: card.y - (isMobile ? 15 : 20),
                                            scale: card.scale * 1.15,
                                            zIndex: 5,
                                            transition: { duration: 0.2 }
                                        }}
                                        onClick={() => handleCardSelect(card.id)}
                                    >
                                        <img
                                            src="/card/card_back.png"
                                            alt="Card back"
                                            className="w-full h-full object-cover rounded-lg shadow-lg"
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 선택 후 중앙에 표시될 카드 */}
                <AnimatePresence>
                    {showCenteredCard && (
                        <motion.div
                            className="absolute flex items-center justify-center"
                            style={{
                                top: '50%',
                                width: '100%',
                                height: '100%',
                                marginTop: isMobile ? '-150px' : '-200px', // 모바일에서 위치 조정
                                transform: 'translate(-50%, -50%)',
                                zIndex: 50
                            }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                type: 'spring',
                                damping: 15,
                                stiffness: 80,
                                duration: 0.5
                            }}
                        >
                            <div className="relative" style={{
                                width: isMobile ? '90px' : '120px',  // 모바일에서 더 작은 선택된 카드
                                height: isMobile ? '135px' : '180px'
                            }}>
                                <img
                                    src="/card/card_back.png"
                                    alt="Selected Card"
                                    className="w-full h-full object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 선택 버튼 (다시 고를래, 다 골랐어) */}
                <AnimatePresence>
                    {showButtons && (
                        <motion.div
                            className="absolute bottom-24 left-0 right-0 z-50 flex justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.button
                                className="text-white font-bold flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleReselectCard}
                            >
                                <span className="mr-1">&#8810;</span> 다시 고를래!
                            </motion.button>

                            <motion.button
                                className="text-white font-bold flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleContinue}
                            >
                                다 골랐어! <span className="ml-1">&#8811;</span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SceneLayout>
    )
}