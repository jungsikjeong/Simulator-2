'use client'

import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'

export default function StartScene({
  onSceneChange,
}: {
  onSceneChange: (scene: SceneKey) => void
}) {

  return (
    <SceneLayout bg="/박정민_1.png" effect="trueBlend" hideTitle={true}>
      {/* Background overlay */}
      <div className="absolute inset-0 h-full bg-gradient-to-t from-gray-500/30 to-transparent pointer-events-none" />

      {/* Scene transition overlay */}
      {/* <div id="scene-transition" className="absolute inset-0 bg-black opacity-0 transition-opacity duration-800 pointer-events-none z-50" /> */}

      {/* 로고고 */}
      <div className="absolute top-2 w-full flex justify-center">
        <img
          src="/logo.png"
          alt="Jim Beam"
          className="w-32 md:w-40 lg:w-42 mb-2"
        />
      </div>

      {/* 타이틀 */}
      <motion.div
        className="absolute bottom-8 md:bottom-14 w-full text-center"
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
            <img
              src="/title_bright.png"
              alt="짐빔 위대한 마케터"
              className="w-70 md:w-96 lg:w-100"
            />
          </div>
        </motion.div>
      </motion.div>

      <div
        className="absolute inset-0 cursor-pointer"
        onClick={() => onSceneChange('start2')}
      />

    </SceneLayout>
  )
}