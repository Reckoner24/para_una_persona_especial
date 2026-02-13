import React from 'react';
import Nube from './Nube';

const Cielo = () => {
    return (
        <div className="cielo">
            <div className="sol"></div>
            <Nube tipo="tipo1" left="10%" top="10%" animationDelay="0s" />
            <Nube tipo="tipo2" left="50%" top="15%" animationDelay="15s" />
            <Nube tipo="tipo3" left="80%" top="5%" animationDelay="5s" />
            <Nube tipo="tipo1" left="30%" top="25%" animationDelay="25s" />
            <Nube tipo="tipo2" left="70%" top="30%" animationDelay="35s" />
            <Nube tipo="tipo3" left="20%" top="40%" animationDelay="10s" />
        </div>
    );
};

export default Cielo;