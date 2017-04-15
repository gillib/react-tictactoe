import React from 'react';
import Board from '../board/Board';
import GameService from './Game.service';

const gameService = new GameService();

export default class Game extends React.Component {
    state = {
        history: [{
            squares: Array(9).fill(null)
        }],
        xIsNext: true,
        stepNumber: 0
    };

    jumpTo(step) {
        let {stepNumber} = this.state;
        if (step < stepNumber) {
            this.setState({
                stepNumber: step,
                xIsNext: (!(step % 2)),
                winner: false
            });
        }
    }

    handleClick(squareIndex) {
        let {history, stepNumber, xIsNext, winner} = this.state;

        history = history.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (winner || squares[squareIndex]) {
            return;
        }

        squares[squareIndex] = xIsNext ? 'X' : 'O';
        this.setState({winner: gameService.calculateWinner(squares)});

        this.setState({
            history: history.concat([{squares}]),
            xIsNext: !xIsNext,
            stepNumber: history.length
        });
    }

    render() {
        const {history, stepNumber, xIsNext, winner} = this.state;
        const current = history[stepNumber];
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