"use client";

import EndingScene from "@/components/EndingScene";
import type { SceneKey } from "@/modules/scene-key.type";
import { useState } from "react";
import { useGetCurrentMemberName_2 } from "@/service/member/useGetMember";

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void;
};

export default function WorryScene({ onSceneChange }: SceneProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isTouchable, setIsTouchable] = useState(true);
  const { data: currentMemberName_2 } = useGetCurrentMemberName_2();

  return (
    <EndingScene
      onSceneChange={onSceneChange}
      bgImage="https://dmfnb4l6be84v.cloudfront.net/simulator2/%EB%B0%95%EC%A0%95%EB%AF%BC_6.webp"
      chunks={[
        {
          content: `[${currentMemberName_2}]!\n`,
        },
        {
          content: "우리의 인생에\n",
        },
        {
          content: "하나의 정답은 없어\n",
        },
        {
          content: `\n`,
        },
        {
          content: "너가 찾은 해답이\n",
        },
        {
          content: "곧 정답이야\n",
        },
        {
          content: `\n`,
        },
        {
          content: "나와 짐빔은 항상\n",
        },
        {
          content: "너의 곁에서 응원하고 있을게\n",
        },
        {
          content: `\n`,
        },
        {
          content: "그럼, 난 짐빔 하이볼 마시면서\n",
        },
        {
          content: "영화보러 안녕~!",
        },
      ]}
      nextScene="start1"
      isTypingComplete={isTypingComplete}
      setIsTypingComplete={setIsTypingComplete}
      isTouchable={isTouchable}
      setIsTouchable={setIsTouchable}
    />
  );
}
