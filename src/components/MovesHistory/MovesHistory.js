import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class MovesHistory extends React.Component {
    sortMovesDesc = false;

    reverseStepList() {
        this.sortMovesDesc = !this.sortMovesDesc;
        this.setState({sortMovesDesc: this.sortMovesDesc});
    }

    renderMoves() {
        const movesListView = _.map(this.props.history, (step, stepNumber) => {
            let desc = 'Game start';
            if (stepNumber > 0) {
                const playX = parseInt(step.squarePlayed / 3, 10),
                    playY = parseInt(step.squarePlayed % 3, 10);
                desc = `Move #${stepNumber}: (${playX}, ${playY})`;
            }

            return (
                <li key={stepNumber} className="step">
                    <a href="#" className={classNames({'selected': stepNumber === this.props.stepNumber})}
                       onClick={() => this.props.jumpToStep(stepNumber)}>{desc}</a>
                </li>
            );
        });

        return this.sortMovesDesc ? movesListView.reverse() : movesListView;
    }

    render() {
        return (
            <div>
                <button onClick={() => this.reverseStepList()}>
                    {this.sortMovesDesc ? 'Desc' : 'Asc'}
                </button>
                <ol>{this.renderMoves()}</ol>
            </div>
        );
    }
}

MovesHistory.propTypes = {
    history: PropTypes.array.isRequired,
    stepNumber: PropTypes.number.isRequired,
    jumpToStep: PropTypes.func.isRequired
};