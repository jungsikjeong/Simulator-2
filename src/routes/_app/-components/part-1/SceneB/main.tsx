'use client'

import ChoiceList from '@/components/ChoiceList'
import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneBMain({ onSceneChange }: SceneProps) {
  const [choiceOpen, setChoiceOpen] = useState(false)
  const [isTouchable, setIsTouchable] = useState(true)

  return (
    <SceneLayout bg="/party/6_장원영.png" effect="trueBlend">
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
                  content: '어엇.. [나락감지]\n',
                },
                {
                  content: 'ㄷ..당황하지 말자\n',
                },
                {
                  content: '\n',
                },
                {
                  content: '당황한 기색없이 이렇게 말한다\n',
                },
                {
                  content: '"그거 참 잘됐다"',
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
            { key: 'success', label: '나 혼자 집에서 짐빔 하이볼!' },
            { key: 'fail1', label: '친구가 없구나 내가 도와줄게!' },
            { key: 'fail2', label: '짐빔 하이볼 마실래?' },
          ]}
          onSelect={k => {
            switch (k) {
              case 'success':
                onSceneChange('part1SceneBSuccess')
                break
              case 'fail1':
                onSceneChange('part1SceneBFail1')
                break
              case 'fail2':
                onSceneChange('part1SceneBFail2')
                break
            }
          }}
        />
      </div>
    </SceneLayout>
  )
}
