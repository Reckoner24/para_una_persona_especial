
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoveLetter.css';

const EnvelopeIcon = ({ isOpen }) => (
    <svg
        className="envelope-icon"
        viewBox="0 0 120 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Envelope body */}
        <rect x="2" y="20" width="116" height="68" rx="8" fill="url(#bodyGrad)" />


        {/* Flap */}
        <polygon
            className="flap"
            points="2,20 118,20 60,60"
            fill="url(#flapGrad)"
            style={{
                transformOrigin: '60px 20px',
                transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                transition: 'transform 0.6s ease'
            }}
        />

        {/* Heart seal */}
        <circle cx="60" cy="55" r="12" fill="url(#sealGrad)" />
        <text x="60" y="60" textAnchor="middle" fontSize="14" fill="rgba(255,220,220,0.9)">♥</text>

        {/* Gradients */}
        <defs>
            <linearGradient id="bodyGrad" x1="0" y1="20" x2="120" y2="88">
                <stop offset="0%" stopColor="#c9a0a0" />
                <stop offset="100%" stopColor="#a07878" />
            </linearGradient>
            <linearGradient id="flapGrad" x1="60" y1="20" x2="60" y2="60">
                <stop offset="0%" stopColor="#b89090" />
                <stop offset="100%" stopColor="#a07878" />
            </linearGradient>
            <radialGradient id="sealGrad" cx="0.4" cy="0.35" r="0.6">
                <stop offset="0%" stopColor="#d44060" />
                <stop offset="60%" stopColor="#a82040" />
                <stop offset="100%" stopColor="#8a1530" />
            </radialGradient>
        </defs>
    </svg>
);

const LoveLetter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasBeenRead, setHasBeenRead] = useState(false);

    // ✏️ Escribe tu carta aquí — cada elemento del array es un párrafo
    const paragraphs = [
        "Eres la persona más importante de mi vida, no miento cuando digo que quiero pasar el resto de mis días contigo, si estoy triste, si estoy enfermo, si estoy molesto, estár a tu lado es más que suficiente para hacerme sentir mejor, tus voz, tus ojos y tu sonrisa siempre serán medicina para mi alma.",
        "Soy muy feliz de poder tener alguien en mi vida de quién pueda estár tan orgulloso y me siento muy afortunado de ser la persona que eligiste para compartir tu vida, día tras día me siento elogiado por tener tanta suerte de poder despertar a tu lado.",
        "Decir te amo jamás me va a cansar, jamás dejaré de decirlo pero llega un punto en el que uno empieza a sentir algo más que eso y no queda más que hacer más de lo posible para demostrarlo de todas las maneras que uno puede, no siempre he sido la mejor persona pero intento cambiar, intento mejorar para nosotros porque sé que vale la pena y sé que no quiero a nadie más para poder compartir mi vida que no seas tú.",
        "Te amo Britney Stephanie Gonzalez Quesada, mi chatita <3"
    ];

    const handleOpen = () => {
        setIsOpen(true);
        setHasBeenRead(true);
    };

    return (
        <section className="love-letter">
            <motion.div
                className="love-letter-divider"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                ———  ❦  ———
            </motion.div>

            {/* Envelope */}
            <motion.div
                className={`envelope ${hasBeenRead ? 'envelope-read' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                onClick={handleOpen}
            >
                <div className="letter-peek-bar">
                    <span>Para ti...</span>
                </div>
                <EnvelopeIcon isOpen={hasBeenRead} />
                <p className="envelope-label">Toca para leer</p>
            </motion.div>

            {/* Letter Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="letter-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            className="letter-paper"
                            initial={{ opacity: 0, y: 60, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="letter-close" onClick={() => setIsOpen(false)}>✕</button>

                            <h2>Para ti</h2>

                            <div className="love-letter-body">
                                {paragraphs.map((text, index) => (
                                    <motion.p
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.3 + index * 0.2,
                                        }}
                                    >
                                        {text}
                                    </motion.p>
                                ))}
                            </div>

                            <motion.div
                                className="love-letter-signature"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                <p>Con todo mi amor</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default LoveLetter;
