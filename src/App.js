import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Counter from "./Counter.js";
import Header from "./Header.js"
import Start from "./Start.js";
import SpeedButtons from "./SpeedButtons.js"

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            buttonText: "Pause",
            board: [],
            counter: 0,
            interval: 150,
            size: 50
        };
        this.clear = this.clear.bind(this);
        this.drawBoard = this.drawBoard.bind(this);
        this.getCount = this.getCount.bind(this);
        this.getPos = this.getPos.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.incrementCounter = this.incrementCounter.bind(this);
        this.speedControl = this.speedControl.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
    }

    clear() {
        let boardArr = new Array(this.state.size).fill(0).map(()=>new Array(this.state.size).fill(0));
        clearInterval(window.game);
        const canvas = document.getElementById("board");
        const context = canvas.getContext("2d");
        for(let x = 0; x < this.state.size; x++){
            for(let y = 0; y < this.state.size; y++) {
                context.clearRect(2 + x * 10, 2 + y * 10, 7, 7);
            }
        }
        this.setState({
            board: boardArr,
            buttonText: "Start",
            counter: 0
        });
    }

    componentDidMount() {
        this.drawBoard();
    }

    componentWillMount() {
        window.game = window.setInterval(this.updateBoard, this.state.interval);
        this.initializeBoard();
    }

    drawBoard() {
        const bw = this.state.size * 10;
        const bh = this.state.size * 10;
        const canvas = document.getElementById("board");
        const context = canvas.getContext("2d");

        for (let x = 10; x <= bw; x += 10) {
            context.moveTo(0.5 + x, 0);
            context.lineTo(0.5 + x, bh);
        }

        for (let x = 10; x <= bh; x += 10) {
            context.moveTo(0, 0.5 + x);
            context.lineTo(bw, 0.5 + x);
        }

        context.strokeStyle = "forestgreen";
        context.stroke();
        context.fillStyle = "forestgreen";
        for(let x = 0; x < this.state.size; x++){
            for(let y = 0; y < this.state.size; y++) {
                if (this.state.board[x][y] == 1) {
                    context.fillRect(2 + x * 10, 2 + y * 10, 7, 7);
                }
                else {
                    context.clearRect(2 + x * 10, 2 + y * 10, 7, 7);
                }
            }
        }
    }

    getCount(pos) {
        let arr = this.state.board;
        let x = pos[0];
        let y = pos[1];
        let n = this.state.size;

        let left = x == 0 ? arr[n - 1][y] : arr[x - 1][y];
        let right = x == n - 1 ? arr[0][y] : arr[x + 1][y];
        let above = y == 0 ? arr[x][n - 1] : arr[x][y - 1];
        let below = y == n - 1 ? arr[x][0] : arr[x][y + 1];

        let a = x == 0 ? n - 1 : x - 1;
        let b = y == 0 ? n - 1 : y - 1;
        let upperLeft = arr[a][b];

        let c = x == n - 1 ? 0 : x + 1;
        let d = y == 0 ? n - 1 : y - 1;
        let upperRight = arr[c][d];

        let e = x == 0 ? n - 1 : x - 1;
        let f = y == n - 1 ? 0 : y + 1;
        let lowerLeft = arr[e][f];

        let g = x == n - 1 ? 0 : x + 1;
        let h = y == n - 1 ? 0 : y + 1;
        let lowerRight = arr[g][h];

        return left + right + above + below + upperLeft + upperRight + lowerLeft + lowerRight;
    }

    getPos(e) {
        const canvas = document.getElementById("board");
        const context = canvas.getContext("2d");
        let x = Math.floor((e.clientX - canvas.offsetLeft) / 10);
        let y = Math.floor((e.clientY - canvas.offsetTop) / 10);
        if(x >= this.state.size){
            x = this.state.size - 1;
        }
        if(y >= this.state.size){
            y = this.state.size - 1;
        }
        let boardCopy = this.state.board;
        if(boardCopy[x][y] == 1){
            boardCopy[x][y] = 0;
            context.clearRect(2 + x * 10, 2 + y * 10, 7, 7);
        }
        else{
            boardCopy[x][y] = 1;
            context.fillRect(2 + x * 10, 2 + y * 10, 7, 7);
        }
        this.setState({
            board: boardCopy
        });
    }

    handleClick() {
        let newText = this.state.buttonText == "Start" ? "Pause" : "Start";
        if(this.state.buttonText == "Start"){
            window.game = window.setInterval(this.updateBoard, this.state.interval);
        }
        else {
            clearInterval(window.game);
        }
        this.setState({
            buttonText: newText
        });
    }

    initializeBoard() {
         let boardArr = [];
         let aliveArr = [];
         let width = this.state.size;
         let height = this.state.size;
         for(let x = 0; x < width; x++){
             boardArr[x] = [];
             for(let y = 0; y < height; y++){
                boardArr[x][y] = Math.round(Math.random());
                if (boardArr[x][y] === 1) {
                     aliveArr.push([x, y]);
                }
             }
         }

        this.setState({
            alive: aliveArr,
            board: boardArr
        });
    }

    incrementCounter() {
        let newVal = this.state.counter + 1;
        this.setState({
            counter: newVal
        })
    }

    speedControl(e) {
        clearInterval(window.game);
        if(this.state.buttonText == "Pause"){
            let newInt = this.state.interval;
            if(e.target.id == "slower" && newInt < 1000){
                newInt += 25;
            }
            else if(e.target.id == "faster" && newInt >= 50){
                newInt -= 25;
            }
            window.game = window.setInterval(this.updateBoard, newInt);
            this.setState({
                interval: newInt
            });
        }
        else{
            let newInt = this.state.interval;
            if(e.target.id == "slower" && newInt < 1000){
                newInt += 25;
            }
            else if(e.target.id == "faster" && newInt >= 50){
                newInt -= 25;
            }
            this.setState({
                interval: newInt
            });
        }
    }

    updateBoard() {
        const canvas = document.getElementById("board");
        const context = canvas.getContext("2d");
        let newBoard = new Array(this.state.size).fill(0).map(()=>new Array(this.state.size).fill(0));
        for(let x = 0; x < this.state.size; x++){
            for(let y = 0; y < this.state.size; y++){
                let count = this.getCount([x, y]);
                if(this.state.board[x][y] === 1){
                    if(count == 2 || count == 3){
                        newBoard[x][y] = 1;
                    }
                }
                else{
                    if(count == 3){
                        newBoard[x][y] = 1;
                    }
                }
                if(this.state.board[x][y] !== newBoard[x][y]){
                    if(newBoard[x][y] == 1){
                        context.fillStyle = "forestgreen";
                        context.fillRect(2 + x * 10, 2 + y * 10, 7, 7);
                    }
                    else{
                        context.clearRect(2 + x * 10, 2 + y * 10, 7, 7);
                    }
                }
            }
        }
        this.setState({
            board: newBoard,
            counter: this.state.counter + 1
        });
    }

    render() {
        return (
            <div>
                <Header />
                <canvas id="board" width="500" height="500" onClick={this.getPos}></canvas>
                <Counter counter={this.state.counter} />
                <Start onClick={this.handleClick} clear={this.clear} text={this.state.buttonText} />
                <SpeedButtons onClick={this.speedControl} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));