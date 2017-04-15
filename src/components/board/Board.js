import React from 'react';
import Square from '../square/Square';
import PropTypes from 'prop-types';
import _ from 'lodash';

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
        const {squares} = this.props;

        const squareRows = _.chunk(squares, ROW_LENGTH);
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