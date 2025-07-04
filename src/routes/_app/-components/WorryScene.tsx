"use client";

import SuccessScene from "@/components/SuccessScene";
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
    <SuccessScene
      onSceneChange={onSceneChange}
      bgImage="https://dmfnb4l6be84v.cloudfront.net/simulator2/%EB%B0%95%EC%A0%95%EB%AF%BC_2.webp"
      chunks={[
        {
          content: `[${currentMemberName_2}]!\n`,
        },
        {
          content: "현재 너가 가지고 있는\n",
        },
        {
          content: "고민거리에 집중 해봐",
        },
      ]}
      nextScene="cardSelect"
      isTypingComplete={isTypingComplete}
      setIsTypingComplete={setIsTypingComplete}
      isTouchable={isTouchable}
      setIsTouchable={setIsTouchable}
      nextBgList={[
        "https://dmfnb4l6be84v.cloudfront.net/simulator2/%EB%B0%95%EC%A0%95%EB%AF%BC_3.webp",
      ]}
    ></SuccessScene>
  );
}
