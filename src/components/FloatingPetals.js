
import React, { useMemo } from 'react';
import './FloatingPetals.css';

const FloatingPetals = ({ visible = true }) => {
    const petals = useMemo(() => {
        return Array.from({ length: 35 }, (_, i) => {
            const size = Math.random() * 12 + 10;
            const left = Math.random() * 100;
            const fallDuration = Math.random() * 8 + 8;
            const swayDuration = Math.random() * 3 + 3;
            const delay = Math.random() * 8;
            const hue = Math.random() * 30 + 340;
            const saturation = Math.random() * 20 + 50;
            const lightness = Math.random() * 15 + 65;

            return {
                id: i,
                style: {
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size * 1.4}px`,
                    backgroundColor: `hsla(${hue % 360}, ${saturation}%, ${lightness}%, 0.7)`,
                    animationDuration: `${fallDuration}s, ${swayDuration}s`,
                    animationDelay: `${delay}s, ${delay}s`,
                    boxShadow: `0 0 ${size * 0.8}px hsla(${hue % 360}, ${saturation}%, ${lightness}%, 0.35)`,
                }
            };
        });
    }, []);

    return (
        <div className={`petals-container ${visible ? '' : 'petals-hidden'}`}>
            {petals.map(petal => (
                <div key={petal.id} className="petal" style={petal.style} />
            ))}
        </div>
    );
};

export default FloatingPetals;
