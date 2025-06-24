"use client";

import ChoiceList from "@/components/ChoiceList";
import DialogueBox from "@/components/DialogueBox";
import SceneLayout from "@/components/SceneLayout";
import { supabase } from "@/lib/supabase";
import type { SceneKey } from "@/modules/scene-key.type";
import {
  useGetCurrentMemberId_2,
  useGetCurrentMemberName_2,
  useUpdateMemberStatus,
} from "@/service/member/useGetMember";
import { motion } from "framer-motion";
import { useState } from "react";

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void;
};

export default function ReplayScene({ onSceneChange }: SceneProps) {
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [isTouchable, setIsTouchable] = useState(true);
  const { data: currentMemberName_2 } = useGetCurrentMemberName_2();
  const { data: currentMemberId_2 } = useGetCurrentMemberId_2();
  const { mutate: updateMemberStatus } = useUpdateMemberStatus();

  return (
    <SceneLayout
      bg="https://dmfnb4l6be84v.cloudfront.net/simulator2/%EB%B0%95%EC%A0%95%EB%AF%BC_5.webp"
      effect="trueBlend"
      nextBgList={[
        "https://dmfnb4l6be84v.cloudfront.net/simulator2/%EB%B0%95%EC%A0%95%EB%AF%BC_6.webp",
        "https://dmfnb4l6be84v.cloudfront.net/simulator2/%EB%B0%95%EC%A0%95%EB%AF%BC_4.webp",
      ]}
    >
      <div
        className={`absolute ${choiceOpen ? "bottom-2" : "bottom-20"} flex w-full flex-col items-center gap-4`}
      >
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DialogueBox
              chunks={[
                {
                  content: `[${currentMemberName_2}]!\n`,
                },
                {
                  content: "해답이 됐어?\n",
                },
                {
                  content: "너무 진지하게\n",
                },
                {
                  content: "받아들이지는 마\n",
                },
                {
                  content: "\n",
                },
                {
                  content: "재미로 보는거니까",
                },
              ]}
              typingDelay={0.5}
              variant="light"
              className="p-5"
              typingTextClassName="leading-relaxed"
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
            { key: "cardSelect", label: "해답이 안됐어 다시 해볼래" },
            { key: "ending", label: "응 해답이 됐어, 고마워" },
          ]}
          currentMemberId_2={currentMemberId_2}
          onClick={async (currentMemberId_2) => {
            if (currentMemberId_2) {
              const { error } = await supabase.from("member_actions_2").insert({
                member_id: currentMemberId_2,
                action_type: "retry",
              });

              if (error) {
                console.error("다시하기 로그 기록 실패:", error);
                return;
              }
            }
          }}
          onSelect={(k) => {
            switch (k) {
              case "cardSelect":
                onSceneChange("cardSelect");

                break;
              case "ending":
                onSceneChange("ending");
                updateMemberStatus({
                  id: currentMemberId_2,
                  status: "completed",
                });
                break;
            }
          }}
        />
      </div>
    </SceneLayout>
  );
}
