import React from 'react';
import {SettingsBox} from './SettingsStyled';
import Mode from '../mode';

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