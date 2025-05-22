'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { useGetCurrentMemberName, useUpdateMemberStatus, useGetCurrentMemberId } from '@/service/member/useGetMember'
import { useIsMobile } from '@/hooks/use-mobile'
import React from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function CardSelectScene1({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)
    const [showCards, setShowCards] = useState(false)
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [showCenteredCard, setShowCenteredCard] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const { data: currentMemberName } = useGetCurrentMemberName()
    const { data: currentMemberId } = useGetCurrentMemberId()
    const updateMemberStatus = useUpdateMemberStatus()
    const isMobile = useIsMobile()

    useEffect(() => {
        if (isTypingComplete) {
            const timer = setTimeout(() => {
                setShowCards(true);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isTypingComplete]);

    // Create two rows of 8 cards (16 cards total) in a straight line layout with overlap
    const cards = Array.from({ length: 16 }, (_, index) => {
        // Determine row (0 or 1)
        const row = index < 8 ? 0 : 1;
        const colIndex = row === 0 ? index : index - 8;

        // Calculate card spacing and positioning with larger cards
        const cardWidth = isMobile ? 60 : 80;  // Increased card width
        const cardHeight = isMobile ? 90 : 120; // Increased card height

        // Calculate negative gap for overlap effect
        const cardOverlap = isMobile ? -25 : -20; // Negative value creates overlap

        // Calculate the total width with overlap
        const totalRowWidth = (cardWidth * 8) + (cardOverlap * 7);

        // Position calculation for straight layout with overlap
        const x = (colIndex * (cardWidth + cardOverlap)) - (totalRowWidth / 2) + (cardWidth / 2);
        const y = row === 0
            ? (isMobile ? -90 : -120)
            : (isMobile ? 10 : 10);

        return {
            id: index,
            x: x,
            y: y,
            rotation: 0, // No rotation for straight layout
            scale: isMobile ? 1.0 : 1.0,
            delay: 0.03 * index,
            row: row
        };
    });

    // 카드 렌더링 최적화를 위한 메모이제이션
    const Card = React.memo(({ card, onSelect }: { card: typeof cards[0], onSelect: (id: number) => void }) => {
        return (
            <motion.div
                className="absolute cursor-pointer"
                style={{
                    width: isMobile ? '60px' : '80px',
                    height: isMobile ? '90px' : '120px',
                    zIndex: card.id
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
                    y: card.y - (isMobile ? 20 : 30),
                    scale: card.scale * 1.15,
                    zIndex: 20,
                    transition: { duration: 0.2 }
                }}
                onClick={() => onSelect(card.id)}
            >
                <img
                    src="/card/card_back.png"
                    alt="Card back"
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                />
            </motion.div>
        );
    });

    // Card selection handler
    const handleCardSelect = (cardId: number) => {
        if (selectedCardId === null && !isTransitioning) {
            setSelectedCardId(cardId);
            setIsTransitioning(true);

            // Hide card array and show centered card
            setTimeout(() => {
                setShowCards(false);
                setShowCenteredCard(true);

                // Show buttons after card is selected
                setTimeout(() => {
                    setShowButtons(true);
                }, 500);
            }, 300);
        }
    };

    // Reselect card handler
    const handleReselectCard = () => {
        setShowButtons(false);
        setShowCenteredCard(false);
        setSelectedCardId(null);
        setIsTransitioning(false);

        // Show cards again after a short delay
        setTimeout(() => {
            setShowCards(true);
        }, 300);
    };

    // Continue handler
    const handleContinue = async () => {
        setShowButtons(false);

        try {
            if (currentMemberId) {
                await updateMemberStatus.mutateAsync({
                    id: currentMemberId,
                    status: 'in_progress'
                });
            }
        } catch (error) {
            console.error('Failed to update member status:', error);
        }

        // Move to next scene
        setTimeout(() => {
            onSceneChange("cardSelectAction");
        }, 500);
    };

    // Dialog box initial and final positions (percentage)
    const dialogInitialBottom = '15%';
    const dialogFinalBottom = isMobile ? '34%' : '37%';

    return (
        <SceneLayout bg="/박정민_3.png" effect="trueBlend">
            <div className="relative flex h-screen flex-col justify-end overflow-hidden bg-cover bg-center">
                {/* Dialog box */}
                <motion.div
                    className="absolute left-0 right-0 z-10"
                    initial={{ opacity: 0, bottom: dialogInitialBottom }}
                    animate={{
                        opacity: 1,
                        bottom: isTypingComplete ? dialogFinalBottom : dialogInitialBottom
                    }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                        bottom: {
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
                            { content: '이제 이 수 많은 카드중에\n' },
                            { content: '마음에 드는 카드를 골라봐' },
                        ]}
                        typingDelay={0.5}
                        variant="light"
                        className="mb-4 cursor-pointer px-0 py-3 transition-transform duration-200"
                        typingTextClassName="leading-relaxed"
                        isTouchable={isTouchable}
                        setIsTouchable={setIsTouchable}
                        onTouchSceneChange={!showCards ? () => onSceneChange("worry") : undefined}
                        isTypingComplete={isTypingComplete}
                        setIsTypingComplete={setIsTypingComplete}
                    />
                </motion.div>

                {/* Card grid layout */}
                <div className="flex-grow flex items-center justify-center">
                    <AnimatePresence>
                        {showCards && (
                            <motion.div
                                className="absolute w-full h-full flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    bottom: isMobile ? '-37%' : '-38%'
                                }}
                            >
                                {cards.map((card) => (
                                    <Card key={card.id} card={card} onSelect={handleCardSelect} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Selected centered card */}
                <AnimatePresence>
                    {showCenteredCard && (
                        <motion.div
                            className="absolute flex items-center justify-center"
                            style={{
                                top: '27%',
                                width: '100%',
                                height: '100%',
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
                                width: isMobile ? '100px' : '130px',
                                height: isMobile ? '150px' : '200px'
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

                {/* Selection buttons */}
                <AnimatePresence>
                    {showButtons && (
                        <motion.div
                            className="absolute left-0 right-0 z-50 flex justify-center gap-18 md:gap-40"
                            style={{
                                bottom: isMobile ? '6%' : '4%'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.button
                                className="text-white font-bold flex items-center text-lg text-bold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleReselectCard}
                            >
                                <span className="mr-1">&lt;</span> 다시 고를래!
                            </motion.button>

                            <motion.button
                                className="text-white font-bold flex items-center text-lg text-bold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleContinue}
                            >
                                다 골랐어! <span className="ml-1">&gt;</span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </SceneLayout>
    )
}