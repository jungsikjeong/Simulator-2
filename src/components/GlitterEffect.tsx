import { useEffect, useState, useRef } from 'react'

// 반짝임 아이템의 타입 정의
interface Sparkle {
    id: string;
    createdAt: number;
    color: string;
    size: number;
    style: React.CSSProperties;
}

// 얼굴 영역을 정의하는 인터페이스
interface FaceArea {
    top: number;    // 얼굴 영역 상단 % (0-100)
    left: number;   // 얼굴 영역 좌측 % (0-100)
    width: number;  // 얼굴 영역 너비 % (0-100)
    height: number; // 얼굴 영역 높이 % (0-100)
}

type GlitterEffectProps = {
    faceArea?: FaceArea;
}

export default function GlitterEffect({ faceArea = { top: 8, left: 40, width: 20, height: 25 } }: GlitterEffectProps) {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // 랜덤 값 생성 함수
    const random = (min: number, max: number): number =>
        min + Math.random() * (max - min);

    // 파스텔 골드/크림 색상 팔레트
    const sparkleColors = [
        '#FFC700', // Gold
        '#FFFCEB', // Soft white
        '#FFEBCD', // Pale gold
        '#FFF8DC', // Cream
        '#FFE4B5', // Moccasin
        '#FFFACD', // Lemon chiffon
        '#FFD700', // Gold
        '#FFDF00', // Golden yellow
        '#FEF9E7', // 파스텔 노란색
        '#FFEFBA', // 부드러운 황금색
    ];

    // 얼굴 영역인지 확인하는 함수
    const isInFaceArea = (posX: number, posY: number): boolean => {
        return (
            posX >= faceArea.left &&
            posX <= (faceArea.left + faceArea.width) &&
            posY >= faceArea.top &&
            posY <= (faceArea.top + faceArea.height)
        );
    };

    // 얼굴을 피해 랜덤 위치 생성
    const getRandomPositionAvoidingFace = (): { top: number, left: number } => {
        let posX, posY;
        // 얼굴 영역이 아닌 위치가 나올 때까지 반복
        do {
            posX = random(0, 100);
            posY = random(0, 100);
        } while (isInFaceArea(posX, posY));

        return { top: posY, left: posX };
    };

    // 부드러운 반짝임 생성 (얼굴 영역 회피)
    const createSparkle = (): Sparkle => {
        // 더 변화있는 크기 범위 (작은 것부터 큰 것까지)
        const size = random(8, 35);
        // 랜덤한 색상 선택
        const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        // 애니메이션 지속 시간 (더 긴 지속시간)
        const duration = random(10, 25);
        // 랜덤한 지연 시작 (더 긴 범위)
        const delay = random(0, 15);
        // 더 긴 투명도 전환
        const fadeInDuration = random(2, 5);

        // 글로우 효과 (확률 높임)
        const hasGlow = Math.random() < 0.35; // 35% 확률
        const glowIntensity = random(0.3, 0.8);
        let filter = hasGlow
            ? `brightness(1.2) drop-shadow(0 0 ${random(2, 6)}px rgba(255,250,220,${glowIntensity}))`
            : '';

        // 얼굴을 피한 위치 가져오기
        const { top, left } = getRandomPositionAvoidingFace();

        return {
            id: String(Date.now() + random(0, 10000)),
            createdAt: Date.now(),
            color,
            size,
            style: {
                position: 'absolute',
                top: `${top}%`,
                left: `${left}%`,
                opacity: 0, // 시작은 투명하게
                transform: `rotate(${random(0, 360)}deg) scale(${random(0.8, 1.2)})`,
                animation: `
                    sparkle-fade-in ${fadeInDuration}s ease-out forwards,
                    sparkle-float ${duration}s ease-in-out ${delay}s infinite alternate,
                    sparkle-pulse ${random(3, 8)}s ease-in-out infinite alternate
                `,
                zIndex: Math.floor(random(1, 5)),
                filter,
                transition: 'all 3s cubic-bezier(0.4, 0, 0.2, 1)', // 더 부드러운 베지어 커브
                willChange: 'transform, opacity', // 성능 최적화
            }
        };
    };

    useEffect(() => {
        const SPARKLE_LIMIT = 150; // 최대 반짝임 수

        // 초기에 즉시 반짝임 추가 (50개)
        const initialSparkles = Array.from({ length: 50 }, () => createSparkle());
        setSparkles(initialSparkles);

        // 개별 타이머로 랜덤하게 반짝임 추가
        const addSparkleRandomly = () => {
            const timeout = setTimeout(() => {
                setSparkles(prev => {
                    // 새 반짝임 생성
                    const newSparkle = createSparkle();

                    // 최대 개수 초과 시 가장 오래된 것부터 제거
                    if (prev.length >= SPARKLE_LIMIT) {
                        // 가장 오래된 것 몇 개 제거 (1~3개 랜덤하게)
                        const removeCount = Math.floor(random(1, 4));
                        return [...prev.slice(removeCount), newSparkle];
                    }
                    return [...prev, newSparkle];
                });

                // 재귀적으로 다음 추가 예약 (랜덤 간격)
                addSparkleRandomly();
            }, random(200, 800)); // 추가 간격을 랜덤하게 설정

            return timeout;
        };

        const timeout = addSparkleRandomly();

        return () => clearTimeout(timeout);
    }, []);

    // 디버깅용 얼굴 영역 표시 (개발 중에만 사용)
    const showDebugFaceArea = false;

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {/* 부드러운 배경 효과 레이어 */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-transparent opacity-50"></div>
            <div className="shimmer-particles"></div>
            <div className="glow-overlay"></div>

            {/* 얼굴 영역 디버깅 표시 (개발 중에만 사용) */}
            {showDebugFaceArea && (
                <div
                    style={{
                        position: 'absolute',
                        top: `${faceArea.top}%`,
                        left: `${faceArea.left}%`,
                        width: `${faceArea.width}%`,
                        height: `${faceArea.height}%`,
                        border: '2px dashed red',
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        zIndex: 1000,
                    }}
                />
            )}

            {/* 모든 반짝임 효과 */}
            {sparkles.map(sparkle => (
                <div
                    key={sparkle.id}
                    className="absolute"
                    style={sparkle.style}
                >
                    <svg
                        width={sparkle.size}
                        height={sparkle.size}
                        viewBox="0 0 68 68"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g filter="url(#filter0_f)">
                            <path
                                d="M34 4L38.8747 25.1253L60 30L38.8747 34.8747L34 56L29.1253 34.8747L8 30L29.1253 25.1253L34 4Z"
                                fill={sparkle.color}
                            />
                        </g>
                        <path
                            d="M34 8L37.8746 24.1254L54 28L37.8746 31.8746L34 48L30.1254 31.8746L14 28L30.1254 24.1254L34 8Z"
                            fill="white"
                            fillOpacity="0.8"
                        />
                        <defs>
                            <filter
                                id="filter0_f"
                                x="0"
                                y="0"
                                width="68"
                                height="68"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur" />
                            </filter>
                        </defs>
                    </svg>
                </div>
            ))}

            {/* 글리터 애니메이션을 위한 스타일 */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes sparkle-fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 0.85; }
                }
                
                @keyframes sparkle-float {
                    0% { 
                        transform: translate(0, 0) rotate(0deg) scale(1);
                    }
                    10% { 
                        transform: translate(2px, -3px) rotate(5deg) scale(1.01);
                    }
                    20% { 
                        transform: translate(4px, -6px) rotate(10deg) scale(1.02);
                    }
                    30% { 
                        transform: translate(6px, -4px) rotate(15deg) scale(1.03);
                    }
                    40% { 
                        transform: translate(8px, -2px) rotate(20deg) scale(1.04);
                    }
                    50% { 
                        transform: translate(6px, 2px) rotate(15deg) scale(1.03);
                    }
                    60% { 
                        transform: translate(4px, 4px) rotate(10deg) scale(1.02);
                    }
                    70% { 
                        transform: translate(2px, 6px) rotate(5deg) scale(1.01);
                    }
                    80% { 
                        transform: translate(-2px, 4px) rotate(-5deg) scale(0.99);
                    }
                    90% { 
                        transform: translate(-4px, 2px) rotate(-10deg) scale(0.98);
                    }
                    100% { 
                        transform: translate(0, 0) rotate(0deg) scale(1);
                    }
                }
                
                @keyframes sparkle-pulse {
                    0% { 
                        opacity: 0.6; 
                        filter: brightness(0.9);
                    }
                    25% { 
                        opacity: 0.8; 
                        filter: brightness(1.1);
                    }
                    50% { 
                        opacity: 0.9; 
                        filter: brightness(1.2);
                    }
                    75% { 
                        opacity: 0.8; 
                        filter: brightness(1.1);
                    }
                    100% { 
                        opacity: 0.6; 
                        filter: brightness(0.9);
                    }
                }
                
                .shimmer-particles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: 
                        radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.7) 0.1px, transparent 0.5px),
                        radial-gradient(circle at 75% 50%, rgba(255, 255, 255, 0.6) 0.1px, transparent 0.4px),
                        radial-gradient(circle at 40% 70%, rgba(255, 250, 220, 0.5) 0.2px, transparent 0.6px),
                        radial-gradient(circle at 60% 20%, rgba(255, 240, 180, 0.5) 0.1px, transparent 0.5px),
                        radial-gradient(circle at 90% 85%, rgba(255, 240, 200, 0.4) 0.1px, transparent 0.5px);
                    background-size: 150px 150px, 120px 120px, 100px 100px, 80px 80px, 140px 140px;
                    background-position: 0 0, 30px 30px, 15px 15px, 45px 45px, 20px 20px;
                    opacity: 0.3;
                    animation: shimmer 20s ease-in-out infinite alternate;
                    mix-blend-mode: screen;
                    transform: translateZ(0); /* 하드웨어 가속 */
                }
                
                .glow-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(ellipse at center, rgba(255, 250, 220, 0.12) 0%, transparent 70%);
                    opacity: 0.4;
                    animation: glow-pulse 15s ease-in-out infinite alternate;
                    mix-blend-mode: screen;
                    pointer-events: none;
                    transform: translateZ(0); /* 하드웨어 가속 */
                }
                
                @keyframes shimmer {
                    0% { 
                        opacity: 0.3;
                        transform: translateX(-5px) translateY(5px);
                    }
                    25% { 
                        opacity: 0.4;
                        transform: translateX(0px) translateY(0px);
                    }
                    50% { 
                        opacity: 0.5;
                        transform: translateX(5px) translateY(-5px);
                    }
                    75% { 
                        opacity: 0.4;
                        transform: translateX(0px) translateY(0px);
                    }
                    100% { 
                        opacity: 0.3;
                        transform: translateX(-5px) translateY(5px);
                    }
                }
                
                @keyframes glow-pulse {
                    0% { 
                        opacity: 0.3; 
                        transform: scale(1);
                    }
                    25% { 
                        opacity: 0.4; 
                        transform: scale(1.01);
                    }
                    50% { 
                        opacity: 0.5; 
                        transform: scale(1.02);
                    }
                    75% { 
                        opacity: 0.4; 
                        transform: scale(1.01);
                    }
                    100% { 
                        opacity: 0.3; 
                        transform: scale(1);
                    }
                }
            `}} />
        </div>
    );
} 