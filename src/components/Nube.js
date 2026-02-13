import React from 'react';

const Nube = ({ tipo, left, top, animationDelay }) => {
    const style = {
        left,
        top,
        animationDelay,
    };
    return <div className={`nube ${tipo}`} style={style}></div>;
};

export default Nube;