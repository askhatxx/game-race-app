import styled from 'styled-components';

export const TouchBox = styled.div`
    display: flex;
    padding-top: 10px;
`;

export const TouchSection = styled.div`
    padding: 0 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const TouchBtn = styled.button`
    background: #f2f2f2;
    width: 80px;
    height: 35px;
    margin: 0px 0;
    border: none;
    border-radius: 6px;
    color: #000;
    transition: .2s;
    cursor: pointer;
    outline: none;
    user-select: none;

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