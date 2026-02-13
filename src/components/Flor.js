const Flor = ({ tipo }) => {
    // Implementación SVG para formas orgánicas estilo Van Gogh

    if (tipo === 'lirio') {
        const hue = 240 + Math.random() * 40; // Variación azul/violeta
        return (
            <div className="flor-svg-container">
                <svg viewBox="0 0 100 150" className="lirio-svg">
                    {/* Hojas largas y puntiagudas (Verde esmeralda/azulado) */}
                    <path d="M40,150 Q20,100 10,50 Q30,100 50,150" fill="#2e4a3d" stroke="#1a2e26" strokeWidth="1" />
                    <path d="M60,150 Q80,100 90,60 Q70,100 50,150" fill="#3a5f45" stroke="#1a2e26" strokeWidth="1" />
                    <path d="M50,150 Q50,100 50,40" fill="none" stroke="#2e4a3d" strokeWidth="4" />

                    {/* Flor compleja: Pétalos caídos y erguidos */}
                    <g transform="translate(50, 40) scale(1)">
                        {/* Pétalos traseros */}
                        <path d="M-15,-10 Q-25,-30 0,-50 Q25,-30 15,-10" fill={`hsl(${hue}, 70%, 40%)`} />

                        {/* Pétalos delanteros (la "barba") */}
                        <path d="M-20,0 Q-30,20 -10,30 Q0,10 0,0" fill={`hsl(${hue}, 80%, 50%)`} stroke="#000" strokeWidth="0.5" />
                        <path d="M20,0 Q30,20 10,30 Q0,10 0,0" fill={`hsl(${hue}, 80%, 50%)`} stroke="#000" strokeWidth="0.5" />
                        <path d="M0,0 Q0,20 0,35" fill="none" stroke={`hsl(${hue}, 90%, 30%)`} strokeWidth="3" />

                        {/* Centro amarillo */}
                        <circle cx="0" cy="5" r="3" fill="#ffeb3b" />
                    </g>
                </svg>
            </div>
        );
    }

    // Unas pocas flores naranjas/amarillas para contraste (fondo de la pintura original)
    if (tipo === 'contrast') {
        return (
            <div className="flor-svg-container">
                <svg viewBox="0 0 50 50" className="contrast-svg">
                    <circle cx="25" cy="25" r="20" fill="#ff8f00" stroke="#e65100" strokeWidth="2" />
                    <circle cx="25" cy="25" r="10" fill="#ffbc00" />
                </svg>
            </div>
        );
    }

    return null;
};

export default Flor;