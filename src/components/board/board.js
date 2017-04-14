//TODO: upper camel case file name

import React from 'react';
import Square from '../square/square';

class Board extends React.Component { //TODO: either add PropTypes or one line export default
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }
    render() {
		//TODO: separate board row to a component on its on,
		//TODO: and use repeat in each row for the squares and in here repeat the row with _.map
		// const {squares, onClick} = this.props;
		// return (
		// 	{
		// 		_.map(squares, (val, index) => <Square value={val} onClick={() => onClick(index)} />)
		// 	}
		// )

        return (
            <div>
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

export default Board;
