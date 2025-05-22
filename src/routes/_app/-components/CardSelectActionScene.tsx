'use client'

import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { useGetCurrentMemberName } from '@/service/member/useGetMember'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function CardSelectActionScene({ onSceneChange }: SceneProps) {
    const { data: currentMemberName } = useGetCurrentMemberName()
    const [typingDone, setTypingDone] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    useEffect(() => {
        if (typingDone && navigator.vibrate) {
            navigator.vibrate(200)
        }
    }, [typingDone])

    return (
        <SceneLayout bg="/박정민_4.png" effect="trueBlend">
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
                        chunks={[
                            { content: `[${currentMemberName}]!\n` },
                            { content: '넌 이 카드를 뽑았어\n' },
                            { content: '부디 이 카드가 너의 해답이' },
                            { content: '되면 좋겠어!' },
                        ]}
                        typingDelay={0.5}
                        variant="fail"
                        className={typingDone ? "mb-5 p-5" : "mb-20 p-5"}
                        typingTextClassName="leading-relaxed"
                        onComplete={() => setTypingDone(true)}
                        isTouchable={isTouchable}
                        setIsTouchable={setIsTouchable}
                        hideIndicatorWhenNotTouchable={true}
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
                                    onClick={() => onSceneChange("cardReveal")}
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