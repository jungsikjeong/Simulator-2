"use client";

import type { SceneKey } from "@/modules/scene-key.type";
import {
  useGetCurrentMemberId_2,
  useGetCurrentMemberName_2,
} from "@/service/member/useGetMember";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ShareButton from "./ShareButton";

type CardRevealSceneProps = {
  onSceneChange: (scene: SceneKey) => void;
};

export default function CardRevealScene({
  onSceneChange,
}: CardRevealSceneProps) {
  const { data: currentMemberName_2 } = useGetCurrentMemberName_2();
  const [selectedCard, setSelectedCard] = useState<string>("");
  const { data: memberId } = useGetCurrentMemberId_2();

  // 카드 리스트
  const cardList = [
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card1.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card2.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card3.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card4.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card5.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card6.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card7.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card8.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card9.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card10.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card11.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card12.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card13.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card14.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card15.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card16.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card17.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card18.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card19.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card20.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card21.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card22.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card23.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card24.webp",
    "https://dmfnb4l6be84v.cloudfront.net/simulator2/card/card25.webp",
  ];

  useEffect(() => {
    // 랜덤으로 카드 선택
    const randomIndex = Math.floor(Math.random() * cardList.length);
    setSelectedCard(cardList[randomIndex]);
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-soft-blue-80 to-blue-100 z-0"></div>

      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 md:w-40 md:h-40 rounded-full bg-soft-blue opacity-20 blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 md:w-60 md:h-60 rounded-full bg-soft-blue opacity-15 blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-soft-blue opacity-20 blur-lg animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-20 w-20 h-20 md:w-32 md:h-32 rounded-full bg-white opacity-30 blur-xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* 컨텐츠 컨테이너 */}
      <div className="relative z-10 bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg max-w-md w-full mx-4 flex flex-col items-center p-5">
        {/* 상단 텍스트 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-4"
        >
          <h2 className="text-xl md:text-2xl font-bold text-soft-blue mb-1">
            {currentMemberName_2 || "오리"}!
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            너의 고민의
            <br />
            인생해답카드는
            <br />
            바로 이거야!
          </p>
        </motion.div>

        {/* 카드 이미지 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
          }}
          transition={{
            duration: 1.2,
            delay: 0.5,
            type: "spring",
            stiffness: 70,
          }}
          className="relative w-full max-w-[240px] aspect-[2/3] mb-6"
        >
          {/* 카드 배경 효과 */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-soft-blue opacity-30 blur-md rounded-xl transform scale-105"></div>

          {/* 카드 이미지 */}
          <img
            src={selectedCard}
            alt="인생 해답 카드"
            className="relative z-10 w-full h-full object-contain rounded-lg drop-shadow-xl"
          />
        </motion.div>

        {/* 다음으로 버튼 */}
        <div className="flex flex-col gap-3 w-full items-center">
          <motion.button
            onClick={() => onSceneChange("replay")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-soft-blue hover:bg-soft-blue-hover text-white px-8 md:px-10 py-2 md:py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base w-full max-w-[200px] justify-center"
          >
            <span className="font-medium">다음으로 &gt;</span>
          </motion.button>

          <ShareButton
            currentMemberName={currentMemberName_2}
            selectedCard={selectedCard}
            title="공유하기"
            memberId={memberId}
          />
        </div>
      </div>
    </div>
  );
}
