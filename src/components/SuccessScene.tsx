'use client'

import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import type { SoundEffect } from '@/components/SceneLayout'
import GlitterEffect from './GlitterEffect'

// 얼굴 영역을 정의하는 인터페이스
interface FaceArea {
    top: number;    // 얼굴 영역 상단 % (0-100)
    left: number;   // 얼굴 영역 좌측 % (0-100)
    width: number;  // 얼굴 영역 너비 % (0-100)
    height: number; // 얼굴 영역 높이 % (0-100)
}

type SuccessSceneProps = {
    onSceneChange: (scene: SceneKey) => void
    bgImage: string
    chunks: Array<{ content: string; className?: string }>
    nextScene: SceneKey
    effect?: 'zoom' | 'fade' | 'smoothFade' | 'trueBlend'
    soundEffect?: SoundEffect | null
    isTypingComplete?: boolean
    setIsTypingComplete?: (isComplete: boolean) => void
    isTouchable?: boolean
    setIsTouchable?: (isTouchable: boolean) => void
    showGlitter?: boolean
    faceArea?: FaceArea
}

export default function SuccessScene({
    onSceneChange,
    bgImage,
    chunks,
    nextScene,
    effect = 'trueBlend',
    soundEffect = null,
    isTypingComplete = false,
    setIsTypingComplete,
    isTouchable = true,
    setIsTouchable,
    showGlitter = false,
    faceArea = { top: 8, left: 40, width: 20, height: 25 }, // 기본 얼굴 영역 좌표
}: SuccessSceneProps) {
    return (
        <SceneLayout bg={bgImage} effect={effect} soundEffect={soundEffect as SoundEffect}>
            <div className="relative flex h-screen flex-col justify-end overflow-hidden bg-cover bg-center">
                {/* 글리터 효과 (showGlitter가 true일 때만 보여짐) */}
                {showGlitter && <GlitterEffect faceArea={faceArea} />}

                {/* 대화 상자 */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                        y: { type: 'spring', damping: 15, stiffness: 100 },
                        scale: { type: 'spring', damping: 20, stiffness: 100 },
                    }}
                >
                    <DialogueBox
                        chunks={chunks}
                        typingDelay={0.5}
                        variant="light"
                        className="mb-20 cursor-pointer px-0 py-6 transition-transform duration-200"
                        typingTextClassName="text-base sm:text-xl leading-relaxed"
                        isTouchable={isTouchable}
                        setIsTouchable={setIsTouchable}
                        onTouchSceneChange={() => onSceneChange(nextScene)}
                        isTypingComplete={isTypingComplete}
                        setIsTypingComplete={setIsTypingComplete}
                    />
                </motion.div>
            </div>
        </SceneLayout>
    )
}