import React from 'react';
import styled from 'styled-components';

export default function TouchControl({keyDown, keyUp, keys}) {
    return (
        <TouchBox>
            <TouchSection>
                <TouchBtn 
                    onMouseDown={() => keyDown({code: keys.left})}
                    onMouseUp={() => keyUp({code: keys.left})}
                    onTouchStart={() => keyDown({code: keys.left})}
                    onTouchEnd={() => keyUp({code: keys.left})}
                >←</TouchBtn>
            </TouchSection>
            <TouchSection>
                <TouchBtn
                    onMouseDown={() => keyDown({code: keys.top})}
                    onMouseUp={() => keyUp({code: keys.top})}
                    onTouchStart={() => keyDown({code: keys.top})}
                    onTouchEnd={() => keyUp({code: keys.top})}
                >↑</TouchBtn>
                <TouchBtn
                    onMouseDown={() => keyDown({code: keys.bottom})}
                    onMouseUp={() => keyUp({code: keys.bottom})}
                    onTouchStart={() => keyDown({code: keys.bottom})}
                    onTouchEnd={() => keyUp({code: keys.bottom})}
                >↓</TouchBtn>
            </TouchSection>
            <TouchSection>
                <TouchBtn
                    onMouseDown={() => keyDown({code: keys.right})}
                    onMouseUp={() => keyUp({code: keys.right})}
                    onTouchStart={() => keyDown({code: keys.right})}
                    onTouchEnd={() => keyUp({code: keys.right})}
                >→</TouchBtn>
            </TouchSection>
        </TouchBox>
    );
}

const TouchBox = styled.div`
    display: flex;
    padding-top: 10px;
`;

const TouchSection = styled.div`
    padding: 0 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TouchBtn = styled.button`
    background: #f2f2f2;
    width: 80px;
    height: 40px;
    margin: 0px 0;
    border: none;
    border-radius: 6px;
    color: #000;
    transition: .1s;
    cursor: pointer;
    outline: none;

    &:nth-child(2) {
        margin-top: 10px;
    }

    &:hover {
        background: #d8d8d8;
    }

    &:active {
        background: #c4c4c4;
    }
`;