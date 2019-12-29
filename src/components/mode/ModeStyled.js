import styled from 'styled-components';

export const ModeBox = styled.div`
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

        @media (max-height: 768px) {
            font-size: 1.2rem;
        }
    }

    .control-info {
        flex-grow: 1;
        display: flex;
        font-size: 1rem;

        .control-list {
            margin-left: 5px;

            span {
                background: #f5661f;
                border-radius: 4px;
                display: inline-block;
                margin: 0px 2px 10px;
                width: 20px;
                height: 20px;
                line-height: 19px;
                font-size: 14px;
                text-transform: uppercase;
                text-align: center;
                color: #fff;

                @media (max-height: 768px) {
                    margin: 0px 2px 2px;
                    width: 16px;
                    height: 16px;
                    line-height: 15px;
                    font-size: 11px;
                }
            }
        }
    }

    .game-start {
        background: #08AD85;
        color: #fff;
        width: 100%;
        border: none;
        border-radius: 6px;
        padding: 3px 0 6px;
        font-size: 1.2rem;
        font-family: inherit;
        line-height: 1.2;
        transition: .2s;
        cursor: pointer;
        outline: none;

        &:hover {
            background: #039974;
        }

        @media (max-height: 768px) {
            padding: 2px 0 4px;
            font-size: .9rem;
        }
    }
`;