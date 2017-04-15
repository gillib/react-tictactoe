const gameDefaults = {
    history: [{
        squares: Array(9).fill(null)
    }],
    xIsNext: true,
    stepNumber: 0,
    winner: false
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
                return squares[a];
            }
        }
    }

    constructor(game) {
        Object.assign(this, gameDefaults, game);
    }

    makeStep(squareIndex) {
        this.history = this.history.slice(0, this.stepNumber + 1);
        const current = this.history[this.history.length - 1];
        const squares = current.squares.slice();

        if (this.winner || squares[squareIndex]) {
            return;
        }

        squares[squareIndex] = this.xIsNext ? 'X' : 'O';

        this.stepNumber = this.history.length;
        this.history = this.history.concat([{squares}]);
        this.xIsNext = !this.xIsNext;
    }

    jumpToStep(step) {
        if (step < this.stepNumber) {
            this.xIsNext = (!(step % 2));
            this.stepNumber = step;
            this.winner = false;
        }
    }
}