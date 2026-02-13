
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LockScreen.css'; // We will create this next

const DATES = {
    "24/02/2001": "El día que nació alguien que te ama muchísimo, alguien que desea estar siempre a tu lado, alguien que quiere verte crecer y desea con toda su alma crecer contigo.",
    "06/06/2001": "Un día especial que representa el nacimiento de un solecito, alguien a quien amo con toda mi alma y alguien a quien le pertenezco en todos los sentidos, eres la mejor persona que he podido conocer.",
    "15/04/2023": "El día del arte, cuando tomamos la decisión de estar juntos, gracias por seguir conmigo, gracias por aguantarme y muchas gracias por amarme. Lo que siento por ti es algo que solamente tu podrías provocar, \"estar\" es lo que siempre me gustaría hacer a tu lado.",
    "17/04/2025": "Regresando de viaje de Culiacán, recién graduada al lado tu mamá, y tomando la decisión de que vivamos juntos, siendo siempre un equipo en el que podemos ser nosotros mismos y empezando una nueva etapa laboral y personal. Ha pasado de todo desde entonces, siempre te agradeceré no irte y seguir a mi lado, jamás me cansaré de decirte lo mucho que te amo."
};

const LockScreen = ({ onUnlock }) => {
    const [inputDate, setInputDate] = useState('');
    const [error, setError] = useState(false);
    const [unlockedMessage, setUnlockedMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // inputDate comes as YYYY-MM-DD from the date picker
        // We need to convert it to DD/MM/YYYY to match our keys
        const [year, month, day] = inputDate.split('-');
        const formattedDate = `${day}/${month}/${year}`;

        if (DATES[formattedDate]) {
            setUnlockedMessage(DATES[formattedDate]);
            setInputDate(''); // Clear
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    const handleEnter = () => {
        onUnlock();
    };

    return (
        <div className="lock-screen">
            <AnimatePresence>
                {!unlockedMessage ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.8 }}
                        className="login-box"
                    >
                        <h1>Una Fecha Especial</h1>
                        <p style={{ opacity: 0.7, marginBottom: '30px' }}>Para continuar, recordemos un momento.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="date-input-wrapper">
                                <input
                                    type="date"
                                    required
                                    value={inputDate}
                                    onChange={(e) => setInputDate(e.target.value)}
                                    className={error ? 'error' : ''}
                                />
                            </div>
                            <button type="submit">→</button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="message-box"
                    >
                        <div className="message-content">
                            <h2>{inputDate}</h2>
                            <p>{unlockedMessage}</p>
                            <button onClick={handleEnter} className="enter-btn">Entrar al Jardín</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="background-particles"></div>
        </div>
    );
};

export default LockScreen;
