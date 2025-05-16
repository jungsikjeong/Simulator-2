'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGetCurrentMemberName } from '@/service/member/useGetMember'
import { useIsMobile } from '@/hooks/use-mobile'
import type { SceneKey } from '@/modules/scene-key.type'

type CardRevealSceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function CardRevealScene({ onSceneChange }: CardRevealSceneProps) {
    const { data: currentMemberName } = useGetCurrentMemberName()
    const [selectedCard, setSelectedCard] = useState<string>('')
    const [swipeProgress, setSwipeProgress] = useState(0)
    const [isDownloading, setIsDownloading] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    const startY = useRef(0)
    const isMobile = useIsMobile()

    // 카드 리스트
    const cardList = [
        '/card/card1.png',
        '/card/card2.png',
        '/card/card3.png',
        '/card/card4.png',
        '/card/card5.png',
        '/card/card6.png',
        '/card/card7.png',
        '/card/card8.png',
        '/card/card9.png',
        '/card/card10.png',
        '/card/card11.png',
        '/card/card12.png',
        '/card/card13.png',
        '/card/card14.png',
        '/card/card15.png',
        '/card/card16.png',
        '/card/card17.png',
        '/card/card18.png',
        '/card/card19.png',
        '/card/card20.png',
        '/card/card21.png',
        '/card/card22.png',
        '/card/card23.png',
        '/card/card24.png',
        '/card/card25.png'
    ]

    useEffect(() => {
        // 랜덤으로 카드 선택
        const randomIndex = Math.floor(Math.random() * cardList.length)
        setSelectedCard(cardList[randomIndex])

        // 단축키 추가 (d 또는 s 키로 다운로드)
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.key === 'd' || e.key === 's' || e.key === 'D' || e.key === 'S') && selectedCard && !isDownloading) {
                downloadCard()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedCard, isDownloading])

    // 카드 다운로드 함수
    const downloadCard = async () => {
        if (!selectedCard || isDownloading) return

        try {
            setIsDownloading(true)

            // 이미지 가져오기
            const response = await fetch(selectedCard)
            const blob = await response.blob()

            // 다운로드 링크 생성
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `life-answer-card-${Date.now()}.png`
            document.body.appendChild(a)
            a.click()

            // 정리
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)

            // 성공 애니메이션
            setTimeout(() => {
                setIsDownloading(false)
                setSwipeProgress(0)
            }, 1000)

        } catch (error) {
            console.error('Failed to download card:', error)
            setIsDownloading(false)
            setSwipeProgress(0)
        }
    }

    // 진동 기능
    const safeVibrate = (pattern: number | number[]) => {
        try {
            if (typeof window !== 'undefined' &&
                window.navigator &&
                window.navigator.vibrate) {
                return window.navigator.vibrate(pattern)
            }
            return false
        } catch (e) {
            console.log("Vibration API error:", e)
            return false
        }
    }

    // 터치 핸들러
    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!cardRef.current) return

        const currentY = e.touches[0].clientY
        const diff = startY.current - currentY

        // 아래로 스와이프만 허용 (음수 diff)
        if (diff < 0) {
            const swipeAmount = Math.min(Math.abs(diff) / 50, 1)
            setSwipeProgress(swipeAmount)

            // 진동 피드백
            if (swipeAmount > 0.3 && swipeAmount < 0.35) {
                safeVibrate(10)
            } else if (swipeAmount > 0.6 && swipeAmount < 0.65) {
                safeVibrate(15)
            }
        }
    }

    const handleTouchEnd = () => {
        if (swipeProgress > 0.5) {
            safeVibrate([30, 50, 30])
            downloadCard()
        } else {
            const resetAnim = setInterval(() => {
                setSwipeProgress(prev => {
                    const newValue = prev - 0.05
                    if (newValue <= 0) {
                        clearInterval(resetAnim)
                        return 0
                    }
                    return newValue
                })
            }, 10)
        }
    }

    // 마우스 핸들러
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isMobile) return

        startY.current = e.clientY
        document.body.style.userSelect = 'none'

        const handleMouseMove = (e: MouseEvent) => {
            if (!isMobile) return

            const currentY = e.clientY
            const diff = startY.current - currentY

            if (diff < 0) {
                const swipeAmount = Math.min(Math.abs(diff) / 50, 1)
                setSwipeProgress(swipeAmount)
            }
        }

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.body.style.userSelect = ''

            if (!isMobile) return

            if (swipeProgress > 0.5) {
                downloadCard()
            } else {
                const resetAnim = setInterval(() => {
                    setSwipeProgress(prev => {
                        const newValue = prev - 0.05
                        if (newValue <= 0) {
                            clearInterval(resetAnim)
                            return 0
                        }
                        return newValue
                    })
                }, 10)
            }
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
            {/* 배경 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-soft-blue-80 to-blue-100 z-0"></div>

            {/* 배경 효과 */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-20 h-20 md:w-40 md:h-40 rounded-full bg-soft-blue opacity-20 blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 md:w-60 md:h-60 rounded-full bg-soft-blue opacity-15 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 right-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-soft-blue opacity-20 blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-20 w-20 h-20 md:w-32 md:h-32 rounded-full bg-white opacity-30 blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
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
                        {currentMemberName || '오리'}!
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        너의 고민의<br />
                        인생해답카드는<br />
                        바로 이거야!
                    </p>
                </motion.div>

                {/* 카드 이미지 */}
                <motion.div
                    ref={cardRef}
                    initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                        y: swipeProgress * 20
                    }}
                    transition={{
                        duration: 1.2,
                        delay: 0.5,
                        type: "spring",
                        stiffness: 70
                    }}
                    className="relative w-full max-w-[240px] aspect-[2/3] mb-6 cursor-pointer"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onClick={() => {
                        if (!isMobile && !isDownloading) {
                            downloadCard()
                        }
                    }}
                >
                    {/* 카드 배경 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-soft-blue opacity-30 blur-md rounded-xl transform scale-105"></div>

                    {/* 카드 이미지 */}
                    <img
                        src={selectedCard}
                        alt="인생 해답 카드"
                        className="relative z-10 w-full h-full object-contain rounded-lg drop-shadow-xl"
                        style={{
                            filter: isDownloading ? 'brightness(0.8)' : 'brightness(1)'
                        }}
                    />

                    {/* 다운로드 진행 표시 - 모바일 */}
                    {isMobile && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-1 bg-soft-blue rounded-full"
                            style={{
                                width: `${swipeProgress * 100}%`,
                                opacity: swipeProgress > 0 ? 1 : 0
                            }}
                        />
                    )}

                    {/* 다운로드 중 아이콘 */}
                    {isDownloading && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <svg className="w-12 h-12 md:w-16 md:h-16 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </motion.div>
                    )}
                </motion.div>

                {/* 스와이프/클릭 안내 텍스트 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="text-center text-gray-600 text-xs md:text-sm flex flex-col items-center mb-5"
                >
                    <svg className="w-4 h-4 md:w-5 md:h-5 mb-1 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span className="hidden md:block">카드를 클릭해서 저장하기</span>
                    <span className="md:hidden">아래로 스와이프해서 저장하기</span>
                </motion.div>

                {/* 다음으로 버튼 */}
                <motion.button
                    onClick={() => onSceneChange('replay')}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-soft-blue hover:bg-soft-blue-hover text-white px-8 md:px-10 py-2 md:py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base"
                >
                    <span className="font-medium">다음으로 &gt;</span>
                </motion.button>
            </div>
        </div>
    )
}