
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Gallery from './Gallery';
import FloatingPetals from './FloatingPetals';
import BlueButterflies from './BlueButterflies';
import LoveLetter from './LoveLetter';
import './MainPage.css';

const MainPage = () => {
    const [accepted, setAccepted] = useState(false);
    const [showPetals, setShowPetals] = useState(true);
    const proposalRef = useRef(null);

    // Hide petals when proposal section comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowPetals(!entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (proposalRef.current) {
            observer.observe(proposalRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleAccept = () => {
        setAccepted(true);
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
            <FloatingPetals visible={showPetals} />
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
                    Hay muchos momentos que me han gustado, muchas fotos que tenemos juntos y hacen feliz a mi alma.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Acá recordamos algunas de ellas.
                </motion.p>
            </header>

            <section className="gallery-section">
                <Gallery />
            </section>

            <LoveLetter />

            <section className="proposal-section" ref={proposalRef}>
                <motion.div
                    className="proposal-card"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {!accepted ? (
                        <>
                            <h2>Una pregunta importante</h2>
                            <p>Después de todo lo vivido y esperando que no sea tarde...</p>
                            <h3>¿Quieres ser mi San Valentín?</h3>
                            <div className="proposal-buttons">
                                <button className="yes-btn" onClick={handleAccept}>Sí, acepto</button>
                                <button
                                    className="no-btn"
                                    onMouseEnter={moveNoButton}
                                    onClick={moveNoButton}
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
                            <BlueButterflies />
                            <h2>¡Gracias por decirme que sí!</h2>
                            <p>Te amaré por siempre corazón.</p>
                            <div className="heart-animation"></div>
                        </motion.div>
                    )}
                </motion.div>
            </section>
        </div>
    );
};

export default MainPage;
