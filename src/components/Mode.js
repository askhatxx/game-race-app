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

const ModeBox = styled.div`
    background: #FBC5AA;
    margin: 10px;
    padding: 10px;
    width: 200px;
    max-width: 100%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;

    .text-players {
        text-align: center;
        font-size: 1.4rem;

        @media (max-height: 768px) {
            font-size: 1.0rem;
        }
    }

    .qt-players {
        text-align: center;
        font-size: 2rem;
    }

    .control-info {
        flex-grow: 1;
        display: flex;
        font-size: 1rem;

        .control-list {
            margin-left: 5px;

            span {
                background: #ec560b;
                border-radius: 4px;
                display: inline-block;
                margin: 0px 2px 10px;
                width: 20px;
                height: 20px;
                line-height: 18px;
                font-size: 15px;
                text-transform: uppercase;
                text-align: center;
                color: #fff;

                @media (max-height: 768px) {
                    margin: 0px 2px 5px;
                    width: 16px;
                    height: 16px;
                    line-height: 15px;
                    font-size: 12px;
                }
            }
        }
    }

    .game-start {
        background: #0fc196;
        color: #fff;
        width: 100%;
        align-self: flex-end;
        border: none;
        border-radius: 6px;
        padding: 4px;
        font-size: 1.2rem;
        font-family: inherit;
        line-height: 1.2;
        transition: .2s;
        cursor: pointer;
        outline: none;

        &:hover {
            background: #08A27D;
        }

        @media (max-height: 768px) {
            padding: 3px;
            font-size: 1rem;
        }
    }
`;