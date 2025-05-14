//src/routes/_app/-components/part-2/SceneA/main.tsx
import { useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import DialogueBox from '@/components/DialogueBox'
import ChoiceList from '@/components/ChoiceList'
import type { SceneKey } from '@/modules/scene-key.type'

export default function Part2SceneAMain({
    onSceneChange,
}: {
    onSceneChange: (scene: SceneKey) => void
}) {
    const [choiceOpen, setChoiceOpen] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    return (
        <SceneLayout bg="/home/2_장원영.png" effect="shake">
            <div className={`absolute ${choiceOpen ? 'bottom-2' : 'bottom-20'} flex w-full flex-col items-center gap-4`}>
                <DialogueBox
                    chunks={[
                        { content: '앗...\n' },
                        { content: '요즘 시대에 집 구하는거\n' },
                        { content: '정말 쉽지 않지ㅠㅠ 그치그치\n' },
                        { content: '\n' },
                        { content: '어떻게 하는게 좋을까?' },
                    ]}
                    variant="light"
                    className='p-5'
                    typingTextClassName="text-sm sm:text-xl leading-relaxed"
                    onComplete={() => setChoiceOpen(true)}
                    isTouchable={isTouchable}
                    setIsTouchable={setIsTouchable}
                />

                <ChoiceList
                    open={choiceOpen}
                    inline
                    variant="light"
                    choices={[
                        { key: 'enjoy', label: '밖에서 여유롭게 즐겨보자' },
                        { key: 'cheongyak', label: '청약 당첨을 기원해보자' },
                        { key: 'lotto', label: '로또를 구매해 보자' },
                    ]}
                    onSelect={k => {
                        switch (k) {
                            case 'enjoy':
                                onSceneChange('part2SceneASuccess')
                                break
                            case 'cheongyak':
                                onSceneChange('part2SceneAFail1')
                                break
                            case 'lotto':
                                onSceneChange('part2SceneAFail2')
                                break
                        }
                    }
                    }
                />
            </div>
        </SceneLayout>
    )
}
