'use client'

import ChoiceList from '@/components/ChoiceList'
import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useGetCurrentMemberName } from '@/service/member/useGetMember'
import { useUpdateMemberStatus, useGetCurrentMemberId } from '@/service/member/useGetMember'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function ReplayScene({ onSceneChange }: SceneProps) {
    const [choiceOpen, setChoiceOpen] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)
    const { data: currentMemberName } = useGetCurrentMemberName()
    const { data: currentMemberId } = useGetCurrentMemberId()
    const { mutate: updateMemberStatus } = useUpdateMemberStatus()

    return (
        <SceneLayout bg="/박정민_5.png" effect="trueBlend">
            <div className={`absolute ${choiceOpen ? 'bottom-2' : 'bottom-20'} flex w-full flex-col items-center gap-4`}>
                <div className="w-full max-w-xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <DialogueBox
                            chunks={[
                                {
                                    content: `[${currentMemberName}]!\n`,
                                },
                                {
                                    content: '해답이 됐어?\n',
                                },
                                {
                                    content: '너무 진지하게\n',
                                },
                                {
                                    content: '받아들이지는 마\n',
                                },
                                {
                                    content: '\n',
                                },
                                {
                                    content: '재미로 보는거니까',
                                },
                            ]}
                            typingDelay={0.5}
                            variant="light"
                            className='p-5'
                            typingTextClassName="text-base sm:text-xl leading-relaxed"
                            onComplete={() => setChoiceOpen(true)}
                            isTouchable={isTouchable}
                            setIsTouchable={setIsTouchable}
                        />
                    </motion.div>
                </div>

                <ChoiceList
                    open={choiceOpen}
                    inline
                    variant="light"
                    choices={[
                        { key: 'cardSelect', label: '해답이 안됐어 다시 해볼래' },
                        { key: 'ending', label: '응 해답이 됐어, 고마워' },
                    ]}
                    onSelect={k => {
                        switch (k) {
                            case 'cardSelect':
                                onSceneChange('cardSelect')
                                updateMemberStatus({
                                    id: currentMemberId,
                                    status: 'completed'
                                })
                                break
                            case 'ending':
                                onSceneChange('ending')
                                break
                        }
                    }}
                />
            </div>
        </SceneLayout>
    )
}