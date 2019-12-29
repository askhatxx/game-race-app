import React from 'react';
import {TouchBox, TouchSection, TouchBtn} from './TouchControlStyled';

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