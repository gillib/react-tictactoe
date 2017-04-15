import React from 'react';
import Board from '../Board/Board';
import MovesHistory from '../MovesHistory/MovesHistory';
import GameService from './Game.service';


export default class Game extends React.Component {
    game = new GameService();

    jumpToStep(step) {
        this.game.jumpToStep(step);
        this.setState(this.game);
    }

    makeStep(squareIndex) {
        this.game.makeStep(squareIndex);
        this.game.currentStep.win = GameService.CalculateWinner(this.game);
        this.setState(this.game);
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
                           squareClicked={(squareIndex) => this.makeStep(squareIndex)}/>
                </div>
                <div className="game-info">
                    <div>{this.renderStatus(win)}</div>
                    <MovesHistory history={this.game.history}
                                  stepNumber={this.game.stepNumber}
                                  jumpToStep={(step) => this.jumpToStep(step)}/>
                </div>
            </div>
        );
    }
}