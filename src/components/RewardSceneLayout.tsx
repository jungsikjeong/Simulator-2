import { useState, useRef } from 'react';

// 타입 정의
interface CardImage {
    src: string;
    label: string;
}

interface RewardSceneLayoutProps {
    images: CardImage[];
    bgColor?: string;
    borderColor?: string;
    textColor?: string;
    sceneText?: string;
    guideText?: string;
}

// 이벤트 핸들러 타입
type TouchEvent = React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>;

const RewardSceneLayout = ({
    images = [],
    bgColor = 'bg-yellow-50',
    borderColor = 'border-yellow-400',
    textColor = 'text-yellow-700',
    sceneText = '',
    guideText = '스와이프하여 다운로드'
}: RewardSceneLayoutProps) => {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [isSwipeAnimating, setIsSwipeAnimating] = useState<boolean>(false);
    const [swipeDirection, setSwipeDirection] = useState<number>(0);
    const startX = useRef<number>(0);
    const currentX = useRef<number>(0);
    const swipeThreshold = 50;

    const handleCardClick = (index: number): void => {
        if (isSwipeAnimating) return;

        if (selectedCard === index) {
            setSelectedCard(null);
        } else {
            setSelectedCard(index);
        }
    };

    const handleTouchStart = (e: TouchEvent, _card: CardImage): void => {
        if (selectedCard === null || isSwipeAnimating) return;

        if (selectedCard !== null) {
            e.preventDefault();
        }

        startX.current = 'touches' in e
            ? e.touches[0].clientX
            : e.clientX;
        currentX.current = startX.current;
        setSwipeDirection(0);
    };

    const handleTouchMove = (e: TouchEvent): void => {
        if (selectedCard === null || isSwipeAnimating) return;

        if (selectedCard !== null) {
            e.preventDefault();
        }

        currentX.current = 'touches' in e
            ? e.touches[0].clientX
            : e.clientX;

        const swipeDiff = currentX.current - startX.current;
        setSwipeDirection(swipeDiff);
    };

    const handleTouchEnd = (card: CardImage): void => {
        if (selectedCard === null || isSwipeAnimating) return;

        const swipeDistance = currentX.current - startX.current;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            setIsSwipeAnimating(true);
            setIsDownloading(true);

            setSwipeDirection(swipeDistance > 0 ? 300 : -300);

            setTimeout(() => {
                const link = document.createElement('a');
                link.href = card.src;
                link.download = card.label;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => {
                    setIsDownloading(false);
                    setIsSwipeAnimating(false);
                    setSwipeDirection(0);
                    setSelectedCard(null);
                }, 500);
            }, 300);
        } else {
            setSwipeDirection(0);
        }
    };

    const getCardStyle = (index: number): React.CSSProperties => {
        const isSelected = selectedCard === index;
        const totalCards = images.length;

        const baseRotation = totalCards <= 2 ? -10 : -15;
        const rotationIncrement = totalCards <= 2 ? 20 : 7;

        let rotation = baseRotation + (index * rotationIncrement);
        let translateX = index * 20;
        let translateY = index * 3;
        let zIndex = index;
        let scale = 1;

        if (isSelected && swipeDirection !== 0) {
            translateX += swipeDirection;
            rotation += swipeDirection * 0.05;
        }

        if (selectedCard !== null) {
            if (isSelected) {
                rotation = swipeDirection * 0.05;
                translateX = swipeDirection;
                translateY = -40;
                zIndex = 100;
                scale = 1.1;
            } else {
                if (index < selectedCard) {
                    rotation = baseRotation - 5;
                    translateX = -80;
                } else {
                    rotation = baseRotation + (totalCards * rotationIncrement) + 5;
                    translateX = 80;
                }
                translateY = 20;
                zIndex = 10;
                scale = 0.9;
            }
        }

        return {
            transform: `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
            zIndex,
            transition: isSwipeAnimating ? 'all 0.5s ease' : 'all 0.3s ease',
            opacity: selectedCard !== null && !isSelected ? 0.7 : 1,
        };
    };


    return (
        <div className={`w-full min-h-screen flex flex-col items-center justify-center ${bgColor} p-4`}>
            {sceneText && (
                <h1 className={`text-2xl font-bold mb-12 text-center ${textColor} drop-shadow-sm px-6`}>
                    {sceneText}
                </h1>
            )}

            <div className="relative w-80 h-96 mb-8">
                {images.map((card, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-64 h-80 rounded-xl shadow-lg cursor-pointer
                      border-4 ${selectedCard === index ? borderColor : 'border-white'}`}
                        style={getCardStyle(index)}
                        onClick={() => handleCardClick(index)}
                        onTouchStart={(e) => handleTouchStart(e, card)}
                        onMouseDown={(e) => handleTouchStart(e, card)}
                        onTouchMove={handleTouchMove}
                        onMouseMove={handleTouchMove}
                        onTouchEnd={() => handleTouchEnd(card)}
                        onMouseUp={() => handleTouchEnd(card)}
                    >
                        <div className="w-full h-full p-3 flex flex-col bg-white rounded-lg overflow-hidden">
                            <div className="w-full h-56 overflow-hidden flex items-center justify-center bg-gray-50">
                                <img
                                    src={card.src}
                                    alt={card.label}
                                    className="w-full h-full object-contain"
                                    draggable={false}
                                />
                            </div>
                            <h3 className={`text-lg font-semibold text-center mt-3 ${textColor}`}>
                                {card.label}
                            </h3>

                            {selectedCard === index && (
                                <div className={`mt-2 text-sm text-center ${textColor} bg-opacity-20 ${bgColor} py-1 px-3 rounded-full mx-auto`}>
                                    {isDownloading ? '다운로드중...' : guideText}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className={`text-center ${textColor} text-sm max-w-xs mt-4`}>
                {selectedCard === null
                    ? "카드를 선택해주세요"
                    : "카드를 좌우로 스와이프하여 다운로드"}
            </div>
        </div>
    );
};

export default RewardSceneLayout;