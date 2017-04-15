import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Square(props) {
    return (
        <button className={classNames('square', {'selected': props.isWinning})} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

Square.propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string
};