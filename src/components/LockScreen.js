
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import './LockScreen.css';

const DATES = {
    "01/01/2026": "Cuando empezamos un año nuevo juntos, rodeados de familia disfrutanto tostiesquites jajaja, y simplemente existiendo.",
    "25/12/2025": "Nuestra primera navidad juntos, abriendo regalos, sintiendonos como familia, siendo felices.",
    "06/06/2001": "Un día especial que representa el nacimiento de un solecito, alguien a quien amo con toda mi alma y alguien a quien le pertenezco en todos los sentidos, eres la mejor persona que he podido conocer.",
    "15/04/2024": "El día del arte, cuando tomamos la decisión de estar juntos, gracias por seguir conmigo, gracias por aguantarme y muchas gracias por amarme. Lo que siento por ti es algo que solamente tu podrías provocar, \"estar\" es lo que siempre me gustaría hacer a tu lado.",
    "17/04/2025": "Regresando de viaje de Culiacán, recién graduada al lado tu mamá, y tomando la decisión de que vivamos juntos, siendo siempre un equipo en el que podemos ser nosotros mismos y empezando una nueva etapa laboral y personal. Ha pasado de todo desde entonces, siempre te agradeceré no irte y seguir a mi lado, jamás me cansaré de decirte lo mucho que te amo."
};

const MONTHS = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const allDates = [
    ...Object.entries(DATES),
    ["Todos los días", "Por que siempre que estoy a tu lado todo se siente mejor y todo está bien, cada vez que estamos juntos el tiempo pasa corriendo y no nos damos cuenta, por eso, todos los días que estoy contigo son un día especial."]
];

// The draggable top card
// The draggable top card
const DraggableCard = ({ date, message, onSwipeOff }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const controls = useAnimation();

    // Store the exit destination so it doesn't reset during unmount
    const exitDelta = React.useRef({ x: 0, y: 0 });

    const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
    const opacity = useTransform([x, y], ([latestX, latestY]) => {
        const distance = Math.sqrt(latestX ** 2 + latestY ** 2);
        return 1 - (Math.min(distance, 200) / 500);
    });

    return (
        <motion.div
            className="date-card date-card-front"
            style={{ x, y, rotate, opacity, zIndex: 10 }}
            animate={controls}
            drag
            dragConstraints={false}
            dragElastic={1}
            initial={false}
            // Use the ref values if set, otherwise 0 (though it won't exit if 0)
            exit={() => ({
                x: exitDelta.current.x,
                y: exitDelta.current.y,
                opacity: 0,
                scale: 0.5,
                transition: { duration: 0.4, ease: "easeInOut" }
            })}
            onDragEnd={(e, info) => {
                const threshold = 50;
                const velocityThreshold = 400;

                if (
                    Math.abs(info.offset.x) > threshold ||
                    Math.abs(info.offset.y) > threshold ||
                    Math.abs(info.velocity.x) > velocityThreshold ||
                    Math.abs(info.velocity.y) > velocityThreshold
                ) {
                    // 1. Calculate and FREEZE the exit destination
                    let dirX = 0;
                    let dirY = 0;

                    // Prefer velocity direction if significant
                    if (Math.abs(info.velocity.x) > velocityThreshold || Math.abs(info.velocity.y) > velocityThreshold) {
                        dirX = info.velocity.x > 0 ? 1 : -1;
                        dirY = info.velocity.y > 0 ? 1 : -1;
                        // If mostly vertical, suppress horizontal
                        if (Math.abs(info.velocity.x) > Math.abs(info.velocity.y)) dirY = 0;
                        else dirX = 0;
                    } else {
                        // Otherwise use offset
                        dirX = info.offset.x > 0 ? 1 : -1;
                        dirY = info.offset.y > 0 ? 1 : -1;
                        if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) dirY = 0;
                        else dirX = 0;
                    }

                    // Allow diagonals? User said "any direction", but flying straight looks cleaner. 
                    // Let's support pure diagonals if mixed, but usually snapping to an axis is better. 
                    // Let's stick to dominant axis for cleaner exit.

                    // If user dragged diagonally, preserve that intent?
                    // Let's just multiply the offset vector to be "far away".
                    // Even better: continue the trajectory.
                    // But for simplicity/reliability of "1000", let's use dominant axis.

                    exitDelta.current = {
                        x: dirX !== 0 ? dirX * 1000 : 0,
                        y: dirY !== 0 ? dirY * 1000 : 0
                    };

                    if (exitDelta.current.x === 0 && exitDelta.current.y === 0) {
                        // Fallback in case logic failed
                        exitDelta.current = { x: info.offset.x > 0 ? 1000 : -1000, y: 0 };
                    }

                    // 2. Trigger unmount IMMEDIATELY. 
                    // The 'exit' prop will read exitDelta.current and animate there.
                    onSwipeOff();
                } else {
                    // Not far enough, snap back smoothly
                    controls.start({
                        x: 0,
                        y: 0,
                        transition: { type: "spring", stiffness: 500, damping: 30 }
                    });
                }
            }}
        >
            <h2>{date}</h2>
            <div className="date-card-divider" />
            <p>{message}</p>
        </motion.div>
    );
};

const LockScreen = ({ onUnlock }) => {
    // ... items state ...
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState(false);
    const [unlocked, setUnlocked] = useState(false);
    const [currentCard, setCurrentCard] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleSubmit = (e) => {
        // ... same handleSubmit logic ...
        e.preventDefault();
        if (!day || !month || !year) return;
        const formattedDate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
        if (DATES[formattedDate]) {
            const idx = allDates.findIndex(([d]) => d === formattedDate);
            setCurrentCard(idx >= 0 ? idx : 0);
            setUnlocked(true);
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 600);
        }
    };

    useEffect(() => {
        if (!unlocked || hasInteracted) return;
        const timer = setTimeout(() => setShowHint(true), 4000);
        return () => clearTimeout(timer);
    }, [unlocked, hasInteracted]);

    const handleSwipeOff = useCallback(() => {
        setHasInteracted(true);
        setShowHint(false);
        // Always advance to the next card — that's the one visible underneath
        setCurrentCard((prev) => (prev + 1) % allDates.length);
    }, []);

    const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => 1990 + i);

    // Cards visible in the stack: current (front) + next 2 behind
    const card1Idx = (currentCard + 1) % allDates.length;
    const card2Idx = (currentCard + 2) % allDates.length;

    return (
        <div className="lock-screen">
            <AnimatePresence mode="wait">
                {!unlocked ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.8 }}
                        className="login-box"
                    >
                        {/* ... login form content ... */}
                        <h1>Una Fecha Especial</h1>
                        <p style={{ opacity: 0.7, marginBottom: '30px' }}>Para continuar, recordemos un momento.</p>
                        <form onSubmit={handleSubmit}>
                            <div className={`date-selectors ${error ? 'error' : ''}`}>
                                <select value={day} onChange={(e) => setDay(e.target.value)} required>
                                    <option value="" disabled>Día</option>
                                    {dayOptions.map(d => (
                                        <option key={d} value={String(d)}>{d}</option>
                                    ))}
                                </select>
                                <select value={month} onChange={(e) => setMonth(e.target.value)} required>
                                    <option value="" disabled>Mes</option>
                                    {MONTHS.map((name, i) => (
                                        <option key={i} value={String(i + 1)}>{name}</option>
                                    ))}
                                </select>
                                <select value={year} onChange={(e) => setYear(e.target.value)} required>
                                    <option value="" disabled>Año</option>
                                    {yearOptions.map(y => (
                                        <option key={y} value={String(y)}>{y}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="submit-btn">Continuar →</button>
                        </form>
                    </motion.div>
                ) : (
                    <div className="cards-screen">
                        <div className="cards-stack">
                            {/* Card 3 — deepest background */}
                            <div
                                className="date-card date-card-bg"
                                style={{
                                    zIndex: 1,
                                    transform: 'scale(0.9) translateY(28px)',
                                    opacity: 0.4,
                                }}
                            >
                                <h2>{allDates[card2Idx][0]}</h2>
                                <div className="date-card-divider" />
                                <p>{allDates[card2Idx][1]}</p>
                            </div>

                            {/* Card 2 — middle background */}
                            <div
                                className="date-card date-card-bg"
                                style={{
                                    zIndex: 2,
                                    transform: 'scale(0.95) translateY(14px)',
                                    opacity: 0.65,
                                }}
                            >
                                <h2>{allDates[card1Idx][0]}</h2>
                                <div className="date-card-divider" />
                                <p>{allDates[card1Idx][1]}</p>
                            </div>

                            {/* Card 1 — front, draggable */}
                            <AnimatePresence>
                                <DraggableCard
                                    key={currentCard}
                                    date={allDates[currentCard][0]}
                                    message={allDates[currentCard][1]}
                                    onSwipeOff={handleSwipeOff}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Dot counter */}
                        <div className="cards-counter">
                            {allDates.map((_, i) => (
                                <span key={i} className={`counter-dot ${i === currentCard ? 'active' : ''}`} />
                            ))}
                        </div>

                        {/* Hint */}
                        <AnimatePresence>
                            {showHint && (
                                <motion.p
                                    className="swipe-hint"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    Desliza en cualquier dirección
                                </motion.p>
                            )}
                        </AnimatePresence>
                        {/* ... Enter button remains ... */}
                        <motion.button
                            onClick={onUnlock}
                            className="enter-btn"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            Entrar a la galería
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>
            <div className="background-particles"></div>
        </div>
    );
};

export default LockScreen;
