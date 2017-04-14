//TODO: the convention as i saw on the internet is UpperCamelCase files like GameBoard.js

import React from 'react';
import Board from '../board/board';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }

    //TODO:
	// constructor() {
		// super();
		// this.state = {
		// 	history: [{
		// 		squares: Array(9).fill(null)
		// 	}],
		// 	xIsNext: true,
		// 	stepNumber: 0
		// };
	// }
	// EQUALS:
	// state = {
		// history: [{
		// 	squares: Array(9).fill(null)
		// }],
		// xIsNext: true,
		// stepNumber: 0
	// };

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true, //TODO: !(step % 2)
        });
    }

    handleClick(i) { //TODO: whats i? squareIndex
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

	handleClick2(squareIndex) {
		//TODO: this looks much better than repeating this.state all the time
        let {history, stepNumber, xIsNext} = this.state;

		history = history.slice(0, stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[squareIndex]) {
			return;
		}

		squares[squareIndex] = xIsNext ? 'X' : 'O';

		this.setState({
			history: history.concat([{squares}]),
			xIsNext: !xIsNext,
			stepNumber: history.length
		});
	}

    render() {
        const {history, stepNumber: current, xIsNext} = this.state;
        const winner = calculateWinner(current.squares);

        let status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');

        const moves = history.map((step, move) => {
            const desc = move ?
                'Move #' + move :
                'Game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

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
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

//TODO: should be in another service
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game; //TODO move up like this:

// export default class Game extends React.Component {
//
// }
