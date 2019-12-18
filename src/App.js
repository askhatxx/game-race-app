import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import MainCars from './components/MainCars';

export default function App() {
    const getSizeArena = () => {
        const {clientWidth, clientHeight} = document.documentElement;
        const width = clientWidth > 1000 ? 900 : Math.round(clientWidth / 100 * 90);
        const height = Math.round(clientHeight / 100 * 90);
        
        return {width, height};
    };

    const initConfig = () => {
        const sizeArena = getSizeArena();
        const speedBots = 3;
        const speedPlayers = 4;
        const quantityBots = 1;
        const quantityPlayers = 2;
        const gameOver = false;

        return {sizeArena, speedBots, speedPlayers, quantityBots, quantityPlayers, gameOver};
    };

    const botsCarsList = [
        {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, id: 'bot1'},
        {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, id: 'bot2'},
        {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, id: 'bot3'},
        {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, id: 'bot4'},
        {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, id: 'bot5'},
    ];

    const randomPosition = (item, order) => {
        const left = Math.round((config.sizeArena.width - item.width) * Math.random());
        const top = -120 * order;

        return {...item, left, top};
    };

    const initBots = (quantity) => {
        return botsCarsList.slice(0, quantity).map((item, index) => {
            return randomPosition(item, index + 1);
        });
    };

    const mainCarsList = [
        {color: '#ec560b', width: 40, height: 60, left: 0, top: 0, id: 'player1'},
        {color: '#d2d2d2', width: 40, height: 60, left: 0, top: 0, id: 'player2'},
        {color: '#c2c2c2', width: 40, height: 60, left: 0, top: 0, id: 'player3'},
    ];

    const initPlayers = (quantity) => {
        return mainCarsList.slice(0, quantity).map((item, index) => {
            const left = Math.round((config.sizeArena.width / (quantity + 1) * (index + 1)) - (item.width / 2));
            const top = Math.round(config.sizeArena.height - item.height - 10);

            return {...item, left, top};
        });
    };

    const directionInit = [
        {isLeft: false, isRight: false, isTop: false, isBottom: false},
        {isLeft: false, isRight: false, isTop: false, isBottom: false},
        {isLeft: false, isRight: false, isTop: false, isBottom: false},
    ];
    
    const config = initConfig();
    const [bots, setBots] = useState(initBots(config.quantityBots));
    const [players, setPlayers] = useState(initPlayers(config.quantityPlayers));
    const direction = directionInit.slice();

    const keys = [
        {left: 'KeyA', right: 'KeyD', top: 'KeyW', bottom: 'KeyS'},
        {left: 'ArrowLeft', right: 'ArrowRight', top: 'ArrowUp', bottom: 'ArrowDown'},
        {left: 'KeyH', right: 'KeyK', top: 'KeyU', bottom: 'KeyJ'},
    ];

    const keyDown = (event) => {
        for (let i = 0; i < config.quantityPlayers; i++) {
            if (event.code === keys[i].left && !direction[i].isLeft) {
                direction[i].isLeft = true;
            } else if (event.code === keys[i].right && !direction[i].isRight) {
                direction[i].isRight = true;
            } else if (event.code === keys[i].top && !direction[i].isTop) {
                direction[i].isTop = true;
            } else if (event.code === keys[i].bottom && !direction[i].isBottom) {
                direction[i].isBottom = true;
            }
        }
    };

    const keyUp = (event) => {
        for (let i = 0; i < config.quantityPlayers; i++) {
            if (event.code === keys[i].left) {
                direction[i].isLeft = false;
            } else if (event.code === keys[i].right) {
                direction[i].isRight = false;
            } else if (event.code === keys[i].top) {
                direction[i].isTop = false;
            } else if (event.code === keys[i].bottom) {
                direction[i].isBottom = false;
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
        renderGame();
        
        return () => {
            document.removeEventListener('keydown', keyDown);
            document.removeEventListener('keyup', keyUp);
        };
    }, []);

    const collisionCheck = (car1, car2) => {
		if (car1.top - (car2.top + car2.height) < 0 && (car1.top + car1.height) - car2.top > 0) {
            if (car1.left - (car2.left + car2.width) < 0 && (car1.left + car1.width) - car2.left > 0) {
                return true;
			}
		}
        
		return false;
    };
    
    const collision = () => {
        setBots(prevBots => {
        setPlayers(prevPlayers => {
            let lostIndex = new Set();

            prevPlayers.forEach((item, index) => {
                prevPlayers.forEach((itemCheck, indexCheck) => {
                    if (index !== indexCheck) {
                        if (collisionCheck(item, itemCheck)) {lostIndex.add(index);}
                    }
                });
                
                prevBots.forEach((itemBot, index) => {console.log(lostIndex)
                    if (collisionCheck(item, itemBot)) {lostIndex.add(index);}
                });
            });
            
            return prevPlayers.filter((item, index) => {
                if (lostIndex.has(index)) {
                    return false;
                }
                return true;
            });
        });
        return [...prevBots];
        });
    };

    const renderGame = () => {
        collision();
        
        setBots(prevBots => prevBots.map(item => {
            const top = item.top + config.speedBots;

            if (top > config.sizeArena.height) {
                return randomPosition(item, 1);
            }
            
            return {...item, top};
        }));
        
        setPlayers(prevPlayers => prevPlayers.map((item, index) => {
            let {left, top, width, height} = item;

            if (direction[index].isLeft) left -= config.speedPlayers;
            if (direction[index].isRight) left += config.speedPlayers;
            if (direction[index].isTop) top -= config.speedPlayers;
            if (direction[index].isBottom) top += config.speedPlayers;

            if (left < 0) left = 0;
            if (left > config.sizeArena.width - width) left = config.sizeArena.width - width;
            if (top < 0) top = 0;
            if (top > config.sizeArena.height - height) top = config.sizeArena.height - height;

            return {...item, left, top};
        }));
        
        if (!config.gameOver) {
            config.speedBots += 0.005;
            //requestAnimationFrame(renderGame);
            setTimeout(renderGame, 1000 / 30);
        }
    };

    return (
        <GameWrapper>
            <GameArena size={config.sizeArena}>
                <MainCars cars={bots}/>
                <MainCars cars={players}/>
            </GameArena>
        </GameWrapper>
    );
}

const GameWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: #0fc196;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GameArena = styled.div`
    width: ${props => props.size.width}px;
	height: ${props => props.size.height}px;
	background: #8b8b8b; 
	position: relative;
	overflow: hidden;
	border-radius: 8px;
`;