import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import Board from '../Board/Board';
import GameService from './Game.service';


export default class Game extends React.Component {
    game = new GameService();
    selectedStep = null;
    sortMovesDesc = false;

    jumpToStep(step) {
        this.game.jumpToStep(step);
        this.selectedStep = step;
        this.setState({game: this.game, selectedStep: this.selectedStep});
    }

    handleClick(squareIndex) {
        this.selectedStep = null;
        this.game.makeStep(squareIndex);
        this.game.currentStep.win = GameService.CalculateWinner(this.game);
        this.setState({game: this.game, selectedStep: this.selectedStep});
    }

    reverseStepList() {
        this.sortMovesDesc = !this.sortMovesDesc;
        this.setState({sortMovesDesc: this.sortMovesDesc});
    }

    renderMoves() {
        const movesListView = _.map(this.game.history, (step, stepNumber) => {
            let desc = 'Game start';
            if (stepNumber > 0) {
                const playX = parseInt(step.squarePlayed / 3, 10),
                    playY = parseInt(step.squarePlayed % 3, 10);
                desc = `Move #${stepNumber}: (${playX}, ${playY})`;
            }

            return (
                <li key={stepNumber} className="step">
                    <a href="#" className={classNames({'selected': stepNumber === this.selectedStep})}
                       onClick={() => this.jumpToStep(stepNumber)}>{desc}</a>
                </li>
            );
        });

        return this.sortMovesDesc ? movesListView.reverse() : movesListView;
    }

    renderStatus(win) {
        return win ? 'Winner: ' + win.winner : 'Next player: ' + (this.game.xIsNext ? 'X' : 'O');
    }

    render() {
        const {squares, win} = this.game.currentStep;
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={squares}
                           winningSquares={win ? win.squares : null}
                           onClick={(squareIndex) => this.handleClick(squareIndex)}/>
                </div>
                <div className="game-info">
                    <div>{this.renderStatus(win)}</div>
                    <button onClick={() => this.reverseStepList()}>
                        {this.sortMovesDesc ? 'Desc' : 'Asc'}
                    </button>
                    <ol>{this.renderMoves()}</ol>
                </div>
            </div>
        );
    }
}