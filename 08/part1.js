const fs = require('fs');
let v = fs.readFileSync('./input.txt', 'utf8').split('\n');
v.pop();
v = v.map((line) => line.split('').map((n) => parseInt(n)));
const maxY = v.length - 1;
const maxX = v[0].length - 1;

function access(x, y) {
    return v[y][x];
}

// North = twoards 0 y
// South = twoards + y
// West = twoards 0 x
// East = twoards + x
// To determine if visible from a certain direction, iterate up.
function visibleFromN(x, y) {
    const value = access(x, y--);
    // North = twoards 0 y, so we will count down.
    // If we're already on the northern edge, it's visible.
    if (y < 0) return true;
    // Always assume visible until otherwise proven.
    while (y >= 0) {
        let newValue = access(x, y--);
        if (newValue >= value) return false;
    }
    return true;
}

function visibleFromS(x, y) {
    const value = access(x, y++);
    // South = twoards + y, so we will count up.
    if (y > maxY) return true;
    while (y <= maxY) {
        let newValue = access(x, y++);
        if (newValue >= value) return false;
    }
    return true;
}

function visibleFromW(x, y) {
    const value = access(x--, y);
    // West = twoards - x, so we will count down.
    if (x < 0) return true;
    while (x >= 0) {
        let newValue = access(x--, y);
        if (newValue >= value) return false;
    }
    return true;
}

function visibleFromE(x, y) {
    const value = access(x++, y);
    // East = twoards + x, so we will count up.
    if (x > maxX) return true;
    while (x <= maxX) {
        let newValue = access(x++, y);
        if (newValue >= value) return false;
    }
    return true;
}

function visible(x, y) {
    return (
        visibleFromN(x, y) ||
        visibleFromS(x, y) ||
        visibleFromW(x, y) ||
        visibleFromE(x, y)
    );
}

v = v.map((a, y) => a.map((_, x) => [_, visible(x, y)]));
console.log('Visible trees are marked with their height:');
v = v
    .map((r) => r.map(([v, vis]) => (vis ? v.toString() : ' ')).join(''))
    .join('\n');
console.log(v);
console.log(
    `Number of visible trees: ${
        v.split('\n').join('').replace(/ /g, '').length
    }`
);
