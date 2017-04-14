//TODO: upper camel case file name

import React, {PropTypes,} from 'react'; //TODO: with PropTypes

function Square(props) { //if not PropTypes than you can do: export default function Square(props){...}
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

//TODO: add PropTypes:
Square.propTypes = {onClick: PropTypes.func.required};
Square.defaultProps = {}; //TODO: this is not needed but you should know it

export default Square;