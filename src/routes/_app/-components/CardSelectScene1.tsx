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

export default function CardSelectScene1({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)
    const [showCards, setShowCards] = useState(false)
    const [_cardsAnimationComplete, setCardsAnimationComplete] = useState(false)
    const [showSelectButton, setShowSelectButton] = useState(false)
    const { data: currentMemberName } = useGetCurrentMemberName()

    const cards = Array.from({ length: 25 }, (_, index) => ({
        id: index,
        x: Math.random() * 60 - 30,
        y: 30 + Math.random() * 20,
        rotation: Math.random() * 10 - 5,
        scale: 0.9 + Math.random() * 0.2,
        delay: 0.02 * index
    }));

    useEffect(() => {
        if (isTypingComplete) {
            const timer = setTimeout(() => {
                setShowCards(true);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isTypingComplete]);

    useEffect(() => {
        if (showCards) {
            // 마지막 카드 애니메이션이 완료되면 버튼을 표시
            const lastCardDelay = Math.max(...cards.map(card => card.delay));
            const totalAnimationTime = lastCardDelay + 0.6; // 0.6은 카드 애니메이션 duration

            const timer = setTimeout(() => {
                setCardsAnimationComplete(true);

                // 카드 애니메이션이 완료된 후 잠시 후에 버튼 표시
                setTimeout(() => {
                    setShowSelectButton(true);
                }, 500);
            }, (totalAnimationTime + 0.3) * 1000); // 단위를 초에서 밀리초로 변환

            return () => clearTimeout(timer);
        }
    }, [showCards, cards]);

    const handleNavigateToNextScene = () => {
        onSceneChange("cardSelect2");
    };

    return (
        <SceneLayout bg="/박정민_3.png" effect="trueBlend">
            <div className="relative flex h-screen flex-col justify-end overflow-hidden bg-cover bg-center">
                {/* 대화 상자 */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        y: isTypingComplete ? -150 : 0,
                        scale: 1
                    }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                        y: {
                            type: 'spring',
                            damping: 15,
                            stiffness: 100,
                            delay: isTypingComplete ? 0 : 0
                        },
                        scale: { type: 'spring', damping: 20, stiffness: 100 },
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
                        className="mb-20 cursor-pointer px-0 py-6 transition-transform duration-200"
                        typingTextClassName="text-base sm:text-xl leading-relaxed"
                        isTouchable={isTouchable}
                        setIsTouchable={setIsTouchable}
                        onTouchSceneChange={!showCards ? () => onSceneChange("worry") : undefined}
                        isTypingComplete={isTypingComplete}
                        setIsTypingComplete={setIsTypingComplete}
                    />
                </motion.div>

                {/* 카드덱 */}
                <AnimatePresence>
                    {showCards && (
                        <motion.div
                            className="absolute bottom-[-90px] left-0 right-0 flex justify-center items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative h-72 w-full max-w-md">
                                {cards.map((card) => (
                                    <motion.div
                                        key={card.id}
                                        className="absolute cursor-pointer"
                                        style={{
                                            width: '80px',
                                            height: '120px',
                                            left: 'calc(50% - 40px)'
                                        }}
                                        initial={{
                                            y: 200,
                                            x: card.x,
                                            rotate: card.rotation * 5,
                                            scale: card.scale * 0.5,
                                            opacity: 0
                                        }}
                                        animate={{
                                            y: card.id % 5 * 2,
                                            x: (card.id % 5 - 2) * 16,
                                            rotate: card.rotation,
                                            scale: card.scale,
                                            opacity: 1
                                        }}
                                        transition={{
                                            type: 'spring',
                                            damping: 12,
                                            stiffness: 100,
                                            delay: card.delay,
                                            duration: 0.6
                                        }}
                                        whileHover={{
                                            y: -10,
                                            scale: card.scale * 1.1,
                                            transition: { duration: 0.2 }
                                        }}
                                        onClick={handleNavigateToNextScene}
                                    >
                                        <img
                                            src="/card/card_back.png"
                                            alt="Card back"
                                            className="w-full h-full object-cover rounded-lg shadow-lg"
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* 카드 고르기 버튼 */}
                            <AnimatePresence>
                                {showSelectButton && (
                                    <motion.button
                                        className="absolute bottom-30 text-white font-bold flex items-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        onClick={handleNavigateToNextScene}
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        카드 고르기 &gt;&gt;
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SceneLayout>
    )
}