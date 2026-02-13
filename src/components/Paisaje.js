import React from 'react';
import Cielo from './Cielo';
import Sol from './Sol';
import Montana from './Montana';
import CampoFlores from './CampoFlores';
import Mensaje from './Mensaje';

const Paisaje = () => {
    return (
        <div className="paisaje">
            <Cielo />
            <Sol />
            <Montana />
            <Montana />
            <Montana />
            <CampoFlores />
            <Mensaje />
        </div>
    );
};

export default Paisaje;