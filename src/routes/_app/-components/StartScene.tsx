'use client'

import { useState, useEffect } from 'react'
import SceneLayout from '@/components/SceneLayout'
import { useCreateMember } from '@/hooks/use-create-member'
import { useUpdateMemberName } from '@/hooks/use-update-member-name'
import { v4 as uuidv4 } from 'uuid'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import DialogueBox from '@/components/DialogueBox'

export default function StartScene({
  onSceneChange,
}: {
  onSceneChange: (scene: SceneKey) => void
}) {
  const [playerName, setPlayerName] = useState('')
  const [introDone, setIntroDone] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [isTouchable, setIsTouchable] = useState(true)
  const createMember = useCreateMember()
  const updateMemberName = useUpdateMemberName()

  useEffect(() => {
    if (introDone) {
      setTimeout(() => setShowInput(true), 500)
    }
  }, [introDone])

  const handleNameSubmit = async () => {
    if (!playerName.trim()) return
    try {
      const existingId = localStorage.getItem('currentMemberId')

      if (existingId) {
        // 이미 게임했던 유저면 이름만 업데이트
        await updateMemberName.mutateAsync({ id: existingId, name: playerName })
        localStorage.setItem('currentMemberName', playerName)
      } else {
        // 새로운 유저면 새로 생성
        const uuid = uuidv4()
        createMember.mutate({ name: playerName, id: uuid })
      }

      onSceneChange('part1')
    } catch (error) {
      console.error('Failed to handle member:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && playerName.trim()) {
      handleNameSubmit()
    }
  }

  function setTypingDone(done: boolean): void {
    setIntroDone(done)
  }

  return (
    <SceneLayout bg="/start_장원영.png" effect="trueBlend" hideTitle={true}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      {/* Scene transition overlay */}
      <div id="scene-transition" className="absolute inset-0 bg-black opacity-0 transition-opacity duration-800 pointer-events-none z-50" />

      {/* 로고고 */}
      <div className="absolute top-6 w-full flex justify-center">
        <img
          src="/logo.png" // 짐빔 로고만 있는 이미지로 변경 필요
          alt="Jim Beam"
          className="w-30 mb-2"
        />
      </div>

      {/* 타이틀 */}
      <motion.div
        className="absolute top-40 w-full text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 1, 0, -1, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut'
          }}
        >
          <div className="flex flex-col items-center">
            <div
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 tracking-wider font-danjo text-black"
              style={{
                textShadow: '2px 2px 8px rgba(255,215,0,0.8), 0 0 15px rgba(255,185,0,0.5), 0 0 5px rgba(255,185,0,0.7)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
              }}
            >
              짐빔 위대한 마케터
            </div>

            <div
              className="text-lg sm:text-xl tracking-wide font-danjo text-black"
              style={{
                textShadow: '1px 1px 5px rgba(255,185,0,0.7), 0 0 8px rgba(255,185,0,0.5)',
                WebkitTextStroke: '0.2px rgba(0,0,0,0.2)'
              }}
            >
              Greatest Marketer of Jim Beam
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Dialogue Box */}
      <div className="absolute bottom-42 w-full flex justify-center">
        <DialogueBox
          chunks={[
            { content: '안녕! 나는 짐빔 모델 장원영이야\n' },
            { content: '앞으로 난 일상에 지친 청춘들을 응원하기 위해\n' },
            { content: '짐빔과 함께 엄청난 마케팅들을 펼칠 예정이야\n\n' },
            { content: '내가 위대한 마케터가 될 수 있도록\n' },
            { content: '도와줄래?' },
          ]}
          variant="start"
          className='p-5'
          typingTextClassName='text-sm sm:text-lg leading-relaxed'
          onComplete={() => setTypingDone(true)}
          isTouchable={isTouchable}
          setIsTouchable={setIsTouchable}
        />
      </div>

      {/* Name Input with animation */}
      <motion.div
        className={`absolute bottom-6 w-full flex flex-col items-center gap-4 ${!showInput ? 'opacity-0 pointer-events-none' : ''}`}
        initial={{ y: 20, opacity: 0 }}
        animate={showInput ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative w-[90%] max-w-md">
          <input
            type="text"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="조언자 이름을 입력하세요"
            className="px-4 py-3 rounded-full border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full shadow-lg text-center bg-white/90 backdrop-blur-sm text-gray-800"
            maxLength={12}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400 text-sm font-medium">
            {playerName.length}/12
          </div>
        </div>

        <motion.button
          onClick={handleNameSubmit}
          className="bg-amber-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-amber-600 transition-all duration-300 font-bold tracking-wider"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!playerName.trim()}
        >
          START &gt;&gt;
        </motion.button>
      </motion.div>
    </SceneLayout>
  )
}