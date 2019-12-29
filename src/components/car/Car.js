import React from 'react';
import {CarBox} from './CarStyled';

export default function Car({color: colorCar, width: widthCar, height: heightCar, left, top}) {
    return (
        <CarBox {...{colorCar, widthCar, heightCar}} style={{left: `${left}px`, top: `${top}px`}}>
            <div className='glass glass-f'></div>
            <div className='glass glass-b'></div>
            <div className='wheel wheel-f-l'></div>
            <div className='wheel wheel-f-r'></div>
            <div className='wheel wheel-b-l'></div>
            <div className='wheel wheel-b-r'></div>
        </CarBox>
    );
}