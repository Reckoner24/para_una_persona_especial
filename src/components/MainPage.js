
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import Gallery from './Gallery';
import './MainPage.css';

const MainPage = () => {
    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        setAccepted(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#d500f9', '#ffd700', '#ff69b4']
        });

        // Continuous confetti
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    const moveNoButton = (e) => {
        const btn = e.target;
        const x = Math.random() * (window.innerWidth - btn.offsetWidth);
        const y = Math.random() * (window.innerHeight - btn.offsetHeight);
        btn.style.position = 'fixed';
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
    };

    return (
        <div className="main-page">
            <header className="hero">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Nuestra Historia
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Momentos que construyen una vida juntos.
                </motion.p>
            </header>

            <section className="gallery-section">
                <Gallery />
            </section>

            <section className="proposal-section">
                <motion.div
                    className="proposal-card"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {!accepted ? (
                        <>
                            <h2>Una pregunta importante</h2>
                            <p>Después de todo lo vivido...</p>
                            <h3>¿Quieres ser mi San Valentín?</h3>
                            <div className="proposal-buttons">
                                <button className="yes-btn" onClick={handleAccept}>Sí, acepto</button>
                                <button
                                    className="no-btn"
                                    onMouseEnter={moveNoButton}
                                    onClick={moveNoButton} // For mobile touch
                                >
                                    No
                                </button>
                            </div>
                        </>
                    ) : (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="success-message"
                        >
                            <h2>¡Sabía que dirías que sí! 💜</h2>
                            <p>Te amo con toda mi alma, mi princesa.</p>
                            <div className="heart-animation">❤️</div>
                        </motion.div>
                    )}
                </motion.div>
            </section>
        </div>
    );
};

export default MainPage;
