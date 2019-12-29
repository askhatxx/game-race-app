import styled from 'styled-components';

export const GameWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: #0fc196;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export const GameArena = styled.div`
    width: ${props => props.size.width}px;
    height: ${props => props.size.height}px;
    background: #999999;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
`;

export const GameDistance = styled.div` 
    position: absolute;
    top: 5px;
    left: 10px;
    color: #e8e8e8;
`;