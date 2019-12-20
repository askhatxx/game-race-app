import React, {Component} from 'react';
import styled from 'styled-components';
import MainCars from './components/MainCars';

export default class AppClass extends Component {
    constructor(props) {
        super(props);

        this.botsCarsList = [
            {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, type: 'bot', id: 'bot1'},
            {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, type: 'bot', id: 'bot2'},
            {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, type: 'bot', id: 'bot3'},
            {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, type: 'bot', id: 'bot4'},
            {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, type: 'bot', id: 'bot5'},
        ];
        this.mainCarsList = [
            {color: '#ec560b', width: 40, height: 60, left: 0, top: 0, type: 'player', id: 'player1'},
            {color: '#d2d2d2', width: 40, height: 60, left: 0, top: 0, type: 'player', id: 'player2'},
            {color: '#c2c2c2', width: 40, height: 60, left: 0, top: 0, type: 'player', id: 'player3'},
        ];
        const directionInit = [
            {isLeft: false, isRight: false, isTop: false, isBottom: false, id: 'player1'},
            {isLeft: false, isRight: false, isTop: false, isBottom: false, id: 'player2'},
            {isLeft: false, isRight: false, isTop: false, isBottom: false, id: 'player3'},
        ];

        this.direction = directionInit.slice();

        this.keys  = [
            {left: 'KeyA', right: 'KeyD', top: 'KeyW', bottom: 'KeyS'},
            {left: 'ArrowLeft', right: 'ArrowRight', top: 'ArrowUp', bottom: 'ArrowDown'},
            {left: 'KeyH', right: 'KeyK', top: 'KeyU', bottom: 'KeyJ'},
        ];

        this.config = {
            quantityBots: 3,
            quantityPlayers: 2,
            sizeArena: this.getSizeArena(),
            gameOver: false,
            speedBots: 3,
            speedPlayers: 4,
        };

        this.state = {
            bots: this.initBots(this.config.quantityBots),
            players: this.initPlayers(this.config.quantityPlayers),
        };
    }

    initBots = (quantity) => {
        return this.botsCarsList.slice(0, quantity).map((item, index) => {
            return this.randomPosition(item, index + 1);
        });
    }

    initPlayers = (quantity) => {
        return this.mainCarsList.slice(0, quantity).map((item, index) => {
            const left = Math.round((this.config.sizeArena.width / (quantity + 1) * (index + 1)) - (item.width / 2));
            const top = Math.round(this.config.sizeArena.height - item.height - 10);

            return {...item, left, top};
        });
    }

    getSizeArena = () => {
        const {clientWidth, clientHeight} = document.documentElement;
        const width = clientWidth > 1000 ? 900 : Math.round(clientWidth / 100 * 90);
        const height = Math.round(clientHeight / 100 * 90);
        
        return {width, height};
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
        this.renderGame();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
    }

    keyDown = (event) => {
        for (let i = 0; i < this.config.quantityPlayers; i++) {
            if (event.code === this.keys[i].left && !this.direction[i].isLeft) {
                this.direction[i].isLeft = true;
            } else if (event.code === this.keys[i].right && !this.direction[i].isRight) {
                this.direction[i].isRight = true;
            } else if (event.code === this.keys[i].top && !this.direction[i].isTop) {
                this.direction[i].isTop = true;
            } else if (event.code === this.keys[i].bottom && !this.direction[i].isBottom) {
                this.direction[i].isBottom = true;
            }
        }
    }

    keyUp = (event) => {
        for (let i = 0; i < this.config.quantityPlayers; i++) {
            if (event.code === this.keys[i].left) {
                this.direction[i].isLeft = false;
            } else if (event.code === this.keys[i].right) {
                this.direction[i].isRight = false;
            } else if (event.code === this.keys[i].top) {
                this.direction[i].isTop = false;
            } else if (event.code === this.keys[i].bottom) {
                this.direction[i].isBottom = false;
            }
        }
    }

    randomPosition = (item, order) => {
        const left = Math.round((this.config.sizeArena.width - item.width) * Math.random());
        const top = -180 * order;

        return {...item, left, top};
    }

    collisionCheck = (car1, car2) => {
        if (car1.top - (car2.top + car2.height) < 0 && (car1.top + car1.height) - car2.top > 0) {
            if (car1.left - (car2.left + car2.width) < 0 && (car1.left + car1.width) - car2.left > 0) {
                return true;
            }
        }

        return false;
    }

    collision = ({bots, players}) => {        
            let lostIndex = new Set();

            players.forEach((item, index) => {
                players.forEach((itemCheck, indexCheck) => {
                    if (index !== indexCheck) {
                        if (this.collisionCheck(item, itemCheck)) {lostIndex.add(index);}
                    }
                });
                
                bots.forEach((itemBot) => {
                    if (this.collisionCheck(item, itemBot)) {lostIndex.add(index);}
                });
            });

            players = players.filter((item, index) => {
                if (lostIndex.has(index)) {
                    bots = [...bots, item];
                    return false;
                }
                return true;
            });

            return {bots, players};
    }

    renderGame = () => {
        this.setState(prevState => {
            let bots = prevState.bots.map(item => {
                const top = item.top + this.config.speedBots;
    
                if (top > this.config.sizeArena.height) {
                    return this.randomPosition(item, 1);
                }
                
                return {...item, top};
            });

            bots = bots.filter(item => {
                if (item.type === 'player' && item.top < 0) return false;
                return true;
            });
            
            const players = prevState.players.map((item) => {
                let {left, top, width, height} = item;
                const index = this.direction.findIndex(dir => dir.id === item.id);
    
                if (this.direction[index].isLeft) left -= this.config.speedPlayers;
                if (this.direction[index].isRight) left += this.config.speedPlayers;
                if (this.direction[index].isTop) top -= this.config.speedPlayers;
                if (this.direction[index].isBottom) top += this.config.speedPlayers;
    
                if (left < 0) left = 0;
                if (left > this.config.sizeArena.width - width) left = this.config.sizeArena.width - width;
                if (top < 0) top = 0;
                if (top > this.config.sizeArena.height - height) top = this.config.sizeArena.height - height;
    
                return {...item, left, top};
            });

            const result = this.collision({bots, players});

            if (result.players.length === 0) {
                this.config.gameOver = true;
            }
            //console.log(this.config.gameOver);

            return result;
        });
        
        if (!this.config.gameOver) {
            this.config.speedBots += 0.005;
            requestAnimationFrame(this.renderGame);
            //setTimeout(this.renderGame, 1000 / 50);
        }
    }

    render() {
        return (
            <GameWrapper>
                <GameArena size={this.config.sizeArena}>
                    <MainCars cars={this.state.bots}/>
                    <MainCars cars={this.state.players}/>
                </GameArena>
            </GameWrapper>
        );
    }
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