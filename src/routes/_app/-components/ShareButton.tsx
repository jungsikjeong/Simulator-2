'use client'

import { Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

declare global {
    interface Window {
        Kakao: any;
    }
}

type ShareButtonProps = {
    currentMemberName?: string
    selectedCard: string
    title: string
}

export default function ShareButton({ currentMemberName, selectedCard, title }: ShareButtonProps) {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.Kakao) {
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY)
            }
        }
    }, [])

    const shareToKakao = () => {
        if (typeof window !== 'undefined' && window.Kakao) {
            window.Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: `${currentMemberName}의 인생 해답 카드`,
                    description: '나의 인생 해답 카드를 확인해보세요!',
                    imageUrl: selectedCard,
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
                buttons: [
                    {
                        title: '나도 해답 카드 받기',
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href,
                        },
                    },
                ],
            })
        }
    }

    return (
        <motion.button
            onClick={shareToKakao}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white hover:bg-gray-100 text-soft-blue border border-soft-blue px-8 md:px-10 py-2 md:py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base w-full max-w-[200px] justify-center"
        >
            <Share2 size={18} />
            <span className="font-medium">{title}</span>
        </motion.button>
    )
}