import React from 'react';
import styled from 'styled-components';

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
            <div>{qtPlayers}</div>
            <div>{listBtn}</div>
            <button onClick={() => gameStart(qtPlayers)}>Start</button>
        </ModeBox>
    );
}

const ModeBox = styled.div`
    background: #d2d2d2;
    margin: 10px;
    padding: 10px;
    width: 200px;
    max-width: 100%;
`;