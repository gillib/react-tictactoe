const gameDefaults = {
    history: [{
        squares: Array(9).fill(null), //step 0 is an empty board
        squarePlayed: null,
        win: false
    }],
    xIsNext: true,
    stepNumber: 0
};

export default class GameService {
    static CalculateWinner(game) {
        const current = game.history[game.history.length - 1];
        const squares = current.squares.slice();

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {
                    winner: squares[a],
                    squares: lines[i]
                }
            }
        }
    }

    constructor(game) {
        Object.assign(this, gameDefaults, game);
    }

    get currentStep() {
        return this.history[this.stepNumber];
    }

    makeStep(squareIndex) {
        let {history, stepNumber, xIsNext} = this;

        history = history.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (current.win || squares[squareIndex]) {
            return;
        }

        squares[squareIndex] = xIsNext ? 'X' : 'O';

        this.stepNumber = history.length;
        this.history = history.concat([{squares, squarePlayed: squareIndex}]);
        this.xIsNext = !xIsNext;
    }

    jumpToStep(stepNumber) {
        this.xIsNext = (!(stepNumber % 2));
        this.stepNumber = stepNumber;
    }
}