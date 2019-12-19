import React, {Component} from 'react';
import styled from 'styled-components';
import MainCars from './components/MainCars';

export default class AppClass extends Component {
    constructor(props) {
        super(props);

        this.botsCarsList = [
            {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, id: 'bot1'},
            {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, id: 'bot2'},
            {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, id: 'bot3'},
            {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, id: 'bot4'},
            {color: '#0b86ec', width: 40, height: 60, left: 0, top: 0, id: 'bot5'},
        ];
        this.mainCarsList = [
            {color: '#ec560b', width: 40, height: 60, left: 0, top: 0, id: 'player1'},
            {color: '#d2d2d2', width: 40, height: 60, left: 0, top: 0, id: 'player2'},
            {color: '#c2c2c2', width: 40, height: 60, left: 0, top: 0, id: 'player3'},
        ];
        const directionInit = [
            {isLeft: false, isRight: false, isTop: false, isBottom: false},
            {isLeft: false, isRight: false, isTop: false, isBottom: false},
            {isLeft: false, isRight: false, isTop: false, isBottom: false},
        ];

        this.direction = directionInit.slice();

        this.keys  = [
            {left: 'KeyA', right: 'KeyD', top: 'KeyW', bottom: 'KeyS'},
            {left: 'ArrowLeft', right: 'ArrowRight', top: 'ArrowUp', bottom: 'ArrowDown'},
            {left: 'KeyH', right: 'KeyK', top: 'KeyU', bottom: 'KeyJ'},
        ];

        this.config = {
            quantityBots: 5,
            quantityPlayers: 1,
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

        //this.timerId = setInterval(this.renderGame, 1000 / 40);
        this.renderGame();
    }

    componentWillMount() {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);

        clearInterval(this.timerId);
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
        }console.log(this.direction[0].isLeft)
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
        const top = -120 * order;

        return {...item, left, top};
    }

    renderGame = () => {
        //collision();
        
        this.setState(prevState => {
            const bots = prevState.bots.map(item => {
                const top = item.top + this.config.speedBots;
    
                if (top > this.config.sizeArena.height) {
                    return this.randomPosition(item, 1);
                }
                
                return {...item, top};
            });
            
            const players = prevState.players.map((item, index) => {
                let {left, top, width, height} = item;
    
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

            return {bots, players};
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