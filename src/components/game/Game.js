import _ from 'lodash';
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

    renderMoves() {
        return _.map(this.game.history, (step, move) => {
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

    renderStatus() {
        return this.game.winner ? 'Winner: ' + this.game.winner : 'Next player: ' + (this.game.xIsNext ? 'X' : 'O');
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.game.currentStep.squares}
                           onClick={(squareIndex) => this.handleClick(squareIndex)}/>
                </div>
                <div className="game-info">
                    <div>{this.renderStatus()}</div>
                    <ol>{this.renderMoves()}</ol>
                </div>
            </div>
        );
    }
}