//src/components/EndingScene.tsx
"use client";

import DialogueBox from "@/components/DialogueBox";
import SceneLayout from "@/components/SceneLayout";
import type { SceneKey } from "@/modules/scene-key.type";
import { motion } from "framer-motion";
import type { SoundEffect } from "@/components/SceneLayout";

type EndingSceneProps = {
  onSceneChange: (scene: SceneKey) => void;
  bgImage: string;
  chunks: Array<{ content: string; className?: string }>;
  nextScene: SceneKey;
  effect?: "zoom" | "fade" | "smoothFade" | "trueBlend";
  soundEffect?: SoundEffect | null;
  isTypingComplete?: boolean;
  setIsTypingComplete?: (isComplete: boolean) => void;
  isTouchable?: boolean;
  setIsTouchable?: (isTouchable: boolean) => void;
};

export default function EndingScene({
  onSceneChange,
  bgImage,
  chunks,
  nextScene,
  effect = "trueBlend",
  soundEffect = null,
  isTypingComplete = false,
  setIsTypingComplete,
  isTouchable = true,
  setIsTouchable,
}: EndingSceneProps) {
  return (
    <SceneLayout
      bg={bgImage}
      effect={effect}
      soundEffect={soundEffect as SoundEffect}
    >
      <div className="relative flex h-screen flex-col justify-end overflow-hidden bg-cover bg-center">
        {/* 대화 상자 */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            y: { type: "spring", damping: 15, stiffness: 100 },
            scale: { type: "spring", damping: 20, stiffness: 100 },
          }}
        >
          <DialogueBox
            chunks={chunks}
            typingDelay={0.5}
            variant="ending"
            className="mb-10 cursor-pointer px-0 py-5 transition-transform duration-200"
            typingTextClassName="leading-relaxed"
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
            onTouchSceneChange={() => onSceneChange(nextScene)}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
          />
        </motion.div>
      </div>
    </SceneLayout>
  );
}
