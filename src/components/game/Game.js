import React from 'react';
import Board from '../board/Board';
import GameService from './Game.service';

export default class Game extends React.Component {
    game = new GameService();

    jumpTo(step) {
        this.game.jumpToStep(step);
        this.setState(this.game);
    }

    handleClick(squareIndex) {
        this.game.makeStep(squareIndex);
        this.game.winner = GameService.CalculateWinner(this.game);
        this.setState(this.game);
    }

    static renderMoves(history) {
        return history.map((step, move) => {
            const desc = move ?
                'Move #' + move :
                'Game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });
    }

    static renderStatus(winner, xIsNext) {
        return winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    render() {
        const {history, stepNumber, xIsNext, winner} = this.game;
        const current = history[stepNumber];

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{Game.renderStatus(winner, xIsNext)}</div>
                    <ol>{Game.renderMoves(history)}</ol>
                </div>
            </div>
        );
    }
}