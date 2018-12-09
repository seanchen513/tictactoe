import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
https://reactjs.org/tutorial/tutorial.html

TO DO:
* turn into mobile app
- turn # instead of xIsNext
- Button to start over or reset
- error message for: square already filled, ...

TO DO from tutorial:
- add toggle button to sort moves in asc or desc order
- when someone wins, highlight the 3 winning squares
- when no one wins, display msg about result being a draw (tie game msg)

DONE:
- bold currently selected item in move list
- rewrite board to use 2 loops to make squares instead of hardcoding them
- display location of each move as (row,col) in move history list
*/

/*
// Square as class component
class Square extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     value: null,
    //   };
    // }
    
    // renderValue() {
    //   if (this.state.value == null)
    //     return this.props.value
    //   else
    //     return this.state.value
    // }

    render() {
      return (
        //<button className="square">
        //<button className="square" onClick={function() { alert('click'); }}>
        // arrow function syntax for event handlers
        //<button className="square" onClick={() => alert('click')}> 
        //<button className="square" onClick={() => alert(this.props.value)}> 
        
        
        //<button className="square" onClick={() => this.setState({value: 'X'}) }> 
        //  {this.renderValue()}
        //</button>
        //  {this.props.value}
        //  {this.state.value}
        

        <button className="square" onClick={() => this.props.onClick()}>
            {this.props.value}
        </button>

      );
    }
}
*/

// Square as function component
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    /*
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }
    */

    /*
    handleClick(i) {
        const squares = this.state.squares.slice(); // slice() to create copy of sqaures array
        
        // if there is a winner or the clicked square is already filled, then return
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    */

    renderSquare(i) {
        return (
            <Square 
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    createBoard() {
        let board = []

        for (let row = 0; row < 3; ++row) {
            let boardRow = []
            let start = 3 * row;
            for (let col = 0; col < 3; ++col) {
                boardRow.push(this.renderSquare(start + col));
            }
            board.push(<div key={row} className="board-row">{boardRow}</div>);
        }
        return board;
    }

    render() {
        return (
            <div>
                {this.createBoard()}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                row: null,
                col: null,
            }],
            moveNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        //const history = this.state.history; // before time travel implementation
        const history = this.state.history.slice(0, this.state.moveNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice(); // slice() to create copy of sqaures array
        
        // if there is a winner or the clicked square is already filled, then return
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        let row = Math.floor(i / 3) + 1;
        let col = (i % 3) + 1;
        this.setState({
            history: history.concat([{
                squares: squares,
                row: row,
                col: col,
            }]),
            moveNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(move) {
        this.setState({
            moveNumber: move,
            xIsNext: (move % 2) === 0,
        });
    }

    //moveListLine(move) {
    coordinates(move, snapshot) {
        let line = [];
        if (move > 0) {
            if (move === this.state.moveNumber)
                line.push(<b>({snapshot.row}, {snapshot.col})</b>);
            else
                line.push(<>({snapshot.row}, {snapshot.col})</>);
        }
        return line;
    }

    desc(move) {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        if (move === this.state.moveNumber)
            return <b>{desc}</b>;
        else
            return desc;
    }

    render() {
        const history = this.state.history;
        //const current = history[history.length - 1]; // before time travel implementation
        const current = history[this.state.moveNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((snapshot, move) => {
            console.log('snapshot: ' + snapshot);
            console.log('move: ' + move);
            console.log('this.state.moveNumber: ' + this.state.moveNumber);
            return (
                <li key={move}>
                    {this.coordinates(move, snapshot)}
                    <button onClick={() => this.jumpTo(move)}>{this.desc(move)}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol start="0">{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

// ========================================

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; ++i) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


