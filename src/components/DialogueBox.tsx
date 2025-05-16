'use client'

import { dialoguePreset, type UIPreset } from '@/lib/uiPresets'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import TypingText from './TypingText'

interface DialogueBoxProps {
    chunks: { content: string; className?: string }[]
    onComplete?: () => void
    variant?: UIPreset
    className?: string
    typingSpeed?: number
    typingDelay?: number
    isCursorBlinker?: boolean
    typingTextClassName?: string
    isTouchable: boolean
    onTouchSceneChange?: () => void
    isTypingComplete?: boolean
    setIsTypingComplete?: (isComplete: boolean) => void
    setIsTouchable?: (isTouchable: boolean) => void
}

export default function DialogueBox({
    chunks,
    onComplete,
    variant = 'light',
    className,
    typingSpeed,
    typingDelay,
    isCursorBlinker,
    typingTextClassName,
    isTouchable,
    onTouchSceneChange,
    isTypingComplete,
    setIsTypingComplete,
    setIsTouchable,
}: DialogueBoxProps) {
    const handleClick = () => {
        if (isTypingComplete && onTouchSceneChange) {
            onTouchSceneChange()
        }
    }

    // 대사의 총 길이를 계산
    const totalContentLength = chunks.reduce((acc, chunk) => acc + chunk.content.length, 0)
    // 대사가 10자 이하인 경우 touch 표시를 숨김
    const shouldShowTouchIndicator = totalContentLength > 15

    return (
        <div
            className={cn(
                'relative mx-auto w-[80%] max-w-xl rounded-xl border shadow-2xl',
                dialoguePreset[variant],
                className
            )}
            onClick={handleClick}
        >
            <TypingText
                text={chunks}
                className={cn('text-base leading-relaxed', typingTextClassName)}
                onComplete={() => {
                    if (onComplete) onComplete()
                    if (setIsTypingComplete) setIsTypingComplete(true)
                    if (setIsTouchable) setIsTouchable(false)
                }}
                speed={typingSpeed}
                delay={typingDelay}
                isCursorBlinker={isCursorBlinker}
            />

            <AnimatePresence>
                {isTouchable && shouldShowTouchIndicator && (
                    <motion.div
                        className="absolute right-4 bottom-2 flex items-center justify-end text-xs opacity-70"
                        animate={{
                            opacity: [0.7, 0.4, 0.7],
                            transition: {
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            },
                        }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    >
                        <span className="mr-1">▶︎</span> touch
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
