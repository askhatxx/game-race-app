import React from 'react';
import styled from 'styled-components';
import Mode from './Mode';

export default function Settings({controlButtons, gameStart}) {
    return (
        <SettingsBox>
            {controlButtons.map((item, index) => {
                return (
                    <Mode 
                        key={item} 
                        controlButtons={controlButtons.slice(0, index + 1)} 
                        gameStart={gameStart} 
                        qtPlayers={index + 1} 
                    />
                )
            })}
        </SettingsBox>
    );
}

const SettingsBox = styled.div`
    background: #f2f2f2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`;