import React from 'react';
import styled from 'styled-components';

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

const CarBox = styled.div`
    background: ${props => props.colorCar};
    width: ${props => props.widthCar}px;
    height: ${props => props.heightCar}px;
    border-radius: 6px;
    position: absolute;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, .25);

    .glass {
        background: #444;
        position: absolute;
        width: 70%;
        height: 20%;
        left: 15%;
    }

    .glass-f {
        top: 15%;
        border-radius: 2px 2px 8px 8px;
    }

    .glass-b {
        top: 65%;
        border-radius: 8px 8px 2px 2px;
    }

    .wheel {
        background: #444;
        position: absolute;
        width: 8%;
        height: 20%;
    }

    .wheel-f-l {
        top: 15%;
        left: -8%;
        border-radius: 3px 0 0 3px;
    }

    .wheel-f-r {
        top: 15%;
        left: 100%;
        border-radius: 0 3px 3px 0;
    }

    .wheel-b-l {
        top: 65%;
        left: -8%;
        border-radius: 3px 0 0 3px;
    }

    .wheel-b-r {
        top: 65%;
        left: 100%;
        border-radius: 0 3px 3px 0;
    }
`;