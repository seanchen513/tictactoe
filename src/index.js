import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


/*
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

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice(); // slice() to create copy of sqaures array
        squares[i] = 'X';
        this.setState({squares: squares});
    }

    renderSquare(i) {
        //return <Square value={i} />;
        return (
            <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: X';

        return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

class Game extends React.Component {
render() {
    return (
    <div className="game">
        <div className="game-board">
        <Board />
        </div>
        <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
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

