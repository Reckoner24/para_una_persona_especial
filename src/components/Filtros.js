import React from 'react';

const Filtros = () => (
    <svg style={{ display: 'none' }}>
        <defs>
            {/* Filtro para simular pinceladas y turbulencia */}
            <filter id="oleo">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
            </filter>

            {/* Filtro específico para nubes (más natural y suave) */}
            <filter id="nube-fluffy">
                <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
                <feGaussianBlur stdDeviation="3" />
            </filter>

            {/* Filtro para el cielo (bandas de color) */}
            <filter id="cielo-pintado">
                <feTurbulence type="turbulence" baseFrequency="0.005" numOctaves="2" result="turbulence" />
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" />
            </filter>
        </defs>
    </svg>
);

export default Filtros;
