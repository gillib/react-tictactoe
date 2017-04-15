import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Square from '../square/Square';

const ROW_LENGTH = 3;

export default class Board extends React.Component {
    renderSquare(value, squareIndex) {
        return <Square key={squareIndex} value={value} onClick={() => this.props.onClick(squareIndex)}/>;
    }

    renderRow(squaresRow, rowIndex) {
        const squaresView = _.map(squaresRow, (val, index) => this.renderSquare(val, rowIndex * ROW_LENGTH + index));
        return <div key={rowIndex} className="board-row">{squaresView}</div>;
    }

    render() {
        const squareRows = _.chunk(this.props.squares, ROW_LENGTH);
        const squaresView = _.map(squareRows, (row, index) => this.renderRow(row, index));

        return (
            <div>{squaresView}</div>
        );
    }
}

Board.propTypes = {
    onClick: PropTypes.func.isRequired,
    squares: PropTypes.array.isRequired
};