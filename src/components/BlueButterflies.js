
import React, { useMemo } from 'react';
import './BlueButterflies.css';

const BlueButterflies = () => {
    const butterflies = useMemo(() => {
        return Array.from({ length: 25 }, (_, i) => {
            const size = Math.random() * 20 + 15; // 15-35px
            const startX = Math.random() * 100; // random horizontal start
            const startY = Math.random() * 100; // random vertical start
            const duration = Math.random() * 6 + 5; // 5-11s flight time
            const delay = Math.random() * 3; // stagger entrance 0-3s
            const hue = Math.random() * 40 + 200; // 200-240 (blues)
            const lightness = Math.random() * 20 + 55; // 55-75%

            // Random flight direction
            const endX = startX + (Math.random() * 80 - 40); // drift left or right
            const endY = -(Math.random() * 60 + 40); // always fly upward

            return {
                id: i,
                size,
                style: {
                    left: `${startX}%`,
                    bottom: `${startY * 0.3}%`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                    '--end-x': `${endX - startX}vw`,
                    '--end-y': `${endY}vh`,
                    '--wing-speed': `${Math.random() * 0.2 + 0.2}s`,
                },
                wingColor: `hsla(${hue}, 80%, ${lightness}%, 0.85)`,
                wingColorLight: `hsla(${hue}, 90%, ${lightness + 15}%, 0.6)`,
                bodySize: size,
            };
        });
    }, []);

    return (
        <div className="butterflies-container">
            {butterflies.map(b => (
                <div key={b.id} className="butterfly" style={b.style}>
                    <div className="butterfly-body">
                        <div
                            className="wing wing-left"
                            style={{
                                width: `${b.bodySize * 0.7}px`,
                                height: `${b.bodySize}px`,
                                background: `radial-gradient(ellipse at 70% 50%, ${b.wingColorLight}, ${b.wingColor})`,
                                animationDuration: `var(--wing-speed)`,
                            }}
                        />
                        <div
                            className="wing wing-right"
                            style={{
                                width: `${b.bodySize * 0.7}px`,
                                height: `${b.bodySize}px`,
                                background: `radial-gradient(ellipse at 30% 50%, ${b.wingColorLight}, ${b.wingColor})`,
                                animationDuration: `var(--wing-speed)`,
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlueButterflies;
