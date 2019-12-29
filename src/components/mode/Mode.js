import React from 'react';
import {ModeBox} from './ModeStyled';

export default function Mode({controlButtons, gameStart, qtPlayers}) {
    const listBtn = controlButtons.map(item => {
        return (
            <div key={item}>
                {[...item].map(itemKey => <span key={itemKey}>{itemKey}</span>)}
            </div>
        )
    });
    return (
        <ModeBox>
            <div className='text-players'>Players</div>
            <div className='qt-players'>{qtPlayers}</div>
            <div className='control-info'>
                <div>Control:</div>
                <div className='control-list'>{listBtn}</div>
            </div>
            <button className='game-start' onClick={() => gameStart(qtPlayers)}>Start</button>
        </ModeBox>
    );
}