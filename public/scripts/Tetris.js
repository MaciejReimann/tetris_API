
const { 
    createPoint,
    addTwoPoints,
    movePoint,
    movePointOnY,
    movePointOnX,
    multiplyPoint,
    arePointsEqual,   
    isPointWithinXRange,
    isPointWithinYRange,
    rotatePointOnGlobalZero 
} = require('./helpers/pointHelpers');

const {
    getGlobalTetrominoCenters,
    getGlobalTetrominoVertices
} = require('./helpers/tetrominoManipulation');

function Tetris(prevState, action) {
    const {
        width, height, pixel, start, type, angle, score
    } = prevState;
    let nextState = {};
    let nextCenters;
    let nextType = prevState.type
        ? prevState.type 
        : prevState.stock.getFirstAndReplenish();
    // let nextStock = prevState.stock
    //     ? prevState.stock 
    //     : prevState.stock.getCurrent();
    let nextPivot = prevState.pivot ? prevState.pivot : start;
    let nextAngle = prevState.angle ? prevState.angle : 0;    

    // since its pure function, no need for object initialization
    if(action === 'MOVE DOWN') {
        nextPivot = movePointOnY(nextPivot, pixel);
    } else if(action === 'MOVE RIGHT') {
        nextPivot = movePointOnX(nextPivot, pixel);
    } else if(action === 'MOVE LEFT') {
        nextPivot = movePointOnX(nextPivot, - pixel);
    } else if(action === 'TURN RIGHT') {
        nextAngle = nextAngle + 90;
    } else if(action === 'TURN LEFT') {
        nextAngle = nextAngle - 90;
    };

    nextCenters = getGlobalTetrominoCenters(
        nextType.centers, nextAngle, pixel, nextPivot
    );

    function moveIsAllowed(points) {
        return points.every(point => 
            isPointWithinXRange(point, 0, width) &&
            isPointWithinYRange(point, 0, height)
        );
    };

    if(moveIsAllowed(nextCenters)) {
        nextState.pivot = nextPivot;
        nextState.angle = nextAngle;
        nextState.type  = nextType;
        nextState.vertices = getGlobalTetrominoVertices(
            nextType.centers, nextAngle, pixel, nextPivot
        );
    } else if(action === 'MOVE DOWN') {
        pivot.y === start.y 
            ? nextState.gameIsOver = true 
            : nextState.pivot = start
        // nextState.stock = nextStock.getFirstAndReplenish();
        // nextState.type = tetrominoStock.getFirstAndReplenish();
    };

    return Object.assign({}, prevState, nextState);
};

module.exports = Tetris;