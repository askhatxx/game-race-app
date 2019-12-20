import React from 'react';
import styled from 'styled-components';

export default function Car({color: colorCar, width: widthCar, height: heightCar, left, top}) {
    return (
        <CarBox {...{colorCar, widthCar, heightCar}} style={{left: `${left}px`, top: `${top}px`}}/>
    );
}

const CarBox = styled.div`
    background: ${props => props.colorCar};
    width: ${props => props.widthCar}px;
    height: ${props => props.heightCar}px;
    border-radius: 8px;
    position: absolute;
    text-align: center;
`;