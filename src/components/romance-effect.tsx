// src/components/romance-effect.tsx
import { useEffect, useState, useRef } from 'react';

const EnhancedRomanceEffect = () => {
    const [stars, setStars] = useState<Array<{ id: number, x: number, y: number, size: number, opacity: number, speed: number }>>([]);
    const [ripples, setRipples] = useState<Array<{ id: number, x: number, y: number, size: number, opacity: number }>>([]);
    const requestRef = useRef<number>(0);
    const [showHearts, setShowHearts] = useState(false);

    // Initialize stars
    useEffect(() => {
        const newStars = [];
        for (let i = 0; i < 35; i++) {
            newStars.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.7 + 0.3,
                speed: Math.random() * 0.2 + 0.05
            });
        }
        setStars(newStars);

        // Create occasional water ripples
        const createRipple = () => {
            const newRipple = {
                id: Date.now(),
                x: 20 + Math.random() * 60, // Keep ripples mostly in the water area
                y: 60 + Math.random() * 30, // Lower part of screen for water
                size: 0,
                opacity: 0.8
            };

            setRipples(prev => [...prev, newRipple]);

            // Remove ripple after animation
            setTimeout(() => {
                setRipples(prev => prev.filter(r => r.id !== newRipple.id));
            }, 3000);
        };

        // Create ripples at random intervals
        const rippleInterval = setInterval(createRipple, 2000 + Math.random() * 3000);

        // Show hearts after a delay
        const heartTimer = setTimeout(() => {
            setShowHearts(true);
        }, 5000);

        return () => {
            clearInterval(rippleInterval);
            clearTimeout(heartTimer);
        };
    }, []);

    // Animate stars
    useEffect(() => {
        const animate = () => {
            setStars(prevStars =>
                prevStars.map(star => ({
                    ...star,
                    y: star.y - star.speed,
                    x: star.x + Math.sin(Date.now() * 0.001 + star.id) * 0.05,
                    opacity: star.opacity + Math.sin(Date.now() * 0.001 + star.id) * 0.1
                })).map(star =>
                    star.y < -2 ? { ...star, y: 102 } : star
                )
            );

            // Animate ripples
            setRipples(prevRipples =>
                prevRipples.map(ripple => ({
                    ...ripple,
                    size: ripple.size + 0.5,
                    opacity: ripple.opacity > 0 ? ripple.opacity - 0.01 : 0
                }))
            );

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);



    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">


            {/* Ambient glow */}
            <div style={{
                position: 'fixed',
                left: '0',
                top: '20%',
                width: '100%',
                height: '30%',
                background: 'radial-gradient(ellipse at center, rgba(255,223,100,0.2) 0%, rgba(255,170,70,0.1) 40%, rgba(0,0,0,0) 70%)',
                opacity: 0.6
            }}></div>

            {/* Water reflection */}
            <div style={{
                position: 'fixed',
                left: '0',
                bottom: '0',
                width: '100%',
                height: '40%',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(173,216,230,0.07))',
                opacity: 0.7
            }}></div>
            {/* Stars */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`
                    }}
                />
            ))}

            {/* Water ripples */}
            {ripples.map((ripple) => (
                <div
                    key={ripple.id}
                    className="absolute rounded-full border border-white/30"
                    style={{
                        left: `${ripple.x}%`,
                        top: `${ripple.y}%`,
                        width: `${ripple.size}px`,
                        height: `${ripple.size}px`,
                        opacity: ripple.opacity,
                        transform: 'translate(-50%, -50%)',
                        transition: 'width 2s ease-out, height 2s ease-out, opacity 2s ease-out'
                    }}
                />
            ))}

            {/* Occasional floating hearts */}
            {showHearts && (
                <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-0 animate-fadeIn" style={{ animationDelay: '5s', animationFillMode: 'forwards' }}>
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute text-pink-300 opacity-50"
                            style={{
                                left: `${20 + Math.random() * 60}%`,
                                bottom: `${Math.random() * 50}%`,
                                fontSize: `${Math.random() * 14 + 8}px`,
                                animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        >
                            ♡
                        </div>
                    ))}
                </div>
            )}

            {/* Soft vignette */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/30 opacity-60"></div>
        </div>
    );
};

export default EnhancedRomanceEffect;