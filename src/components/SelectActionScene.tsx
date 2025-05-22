'use client'

import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

type FailSceneProps = {
    onSceneChange: (scene: SceneKey) => void
    bgImage: string
    chunks: Array<{ content: string; className?: string }>
    nextScene: SceneKey
}

export default function SelectActionScene({
    onSceneChange,
    bgImage,
    chunks,
    nextScene,
}: FailSceneProps) {
    const [typingDone, setTypingDone] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    useEffect(() => {
        if (typingDone && navigator.vibrate) {
            navigator.vibrate(200)
        }
    }, [typingDone])

    return (
        <SceneLayout bg={bgImage} effect="trueBlend">
            <div className="relative flex h-screen flex-col justify-end overflow-hidden pb-12">

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
                        variant="fail"
                        className={typingDone ? "mb-5 p-5" : "mb-20 p-5"}
                        typingTextClassName="leading-relaxed"
                        onComplete={() => setTypingDone(true)}
                        isTouchable={isTouchable}
                        setIsTouchable={setIsTouchable}
                    />
                </motion.div>

                {typingDone && (
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="w-[90%] max-w-xl"
                        >
                            <div className="w-full px-5 py-5">

                                <motion.button
                                    onClick={() => onSceneChange(nextScene)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-soft-blue text-white px-8 py-3 rounded-full shadow-lg hover:bg-soft-blue-hover transition-all duration-300 font-bold tracking-wider"
                                >
                                    <span className="font-medium">뒤집어보기 &gt;&gt;</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </SceneLayout>
    )
} 