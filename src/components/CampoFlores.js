import React from 'react';
import Flor from './Flor';

const CampoFlores = () => {
    const flores = [];
    const cantidad = 700;

    for (let i = 0; i < cantidad; i++) {
        const depth = Math.pow(Math.random(), 1.2);
        const scale = 0.5 + (depth * 2);

        // Cubrir TODA la pantalla verticalmente
        // De 0% (fondo) a 90% (frente)
        const bottomPercent = (1 - depth) * 90 - 5;
        const leftPercent = Math.random() * 100;

        // Lógica de Composición "Irises":
        // - Fondo Izquierda (aprox top left visualmente, depth bajo): Flores naranjas
        let tipo = 'lirio';

        // Si está lejos (depth < 0.35) y a la izquierda (left < 40), probabilidad de naranja
        if (depth < 0.35 && leftPercent < 45) {
            tipo = 'contrast';
        } else {
            tipo = 'lirio';
        }

        // Ajuste de altura
        const height = tipo === 'lirio' ? 120 : 60;

        flores.push({
            id: i,
            left: leftPercent,
            bottom: bottomPercent,
            height: height,
            animationDelay: Math.random() * 5,
            scale: scale,
            tipo: tipo,
            zIndex: Math.floor(depth * 1000)
        });
    }

    flores.sort((a, b) => a.zIndex - b.zIndex);

    return (
        <div className="campo-flores">
            {flores.map((flor) => (
                <div
                    key={flor.id}
                    className="flor-contenedor"
                    style={{
                        left: `${flor.left}%`,
                        bottom: `${flor.bottom}%`,
                        height: `${flor.height}px`,
                        width: `${flor.height * 0.7}px`,
                        zIndex: flor.zIndex,
                        transform: `scale(${flor.scale})`,
                        animationDelay: `${flor.animationDelay}s`
                    }}
                >
                    <Flor tipo={flor.tipo} />
                </div>
            ))}
        </div>
    );
};

export default CampoFlores;