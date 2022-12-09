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
// To determine viewing distance, we just increment a counter
// until we hit the first bad tree, so the old function should
// somewhat still work
function visdistN(x, y) {
    const value = access(x, y--);
    let dist = 0;
    if (y < 0) return dist;
    while (y >= 0) {
        let newValue = access(x, y--);
        dist++;
        if (newValue >= value) return dist;
    }
    return dist;
}

function visdistS(x, y) {
    const value = access(x, y++);
    let dist = 0;
    if (y > maxY) return dist;
    while (y <= maxY) {
        let newValue = access(x, y++);
        dist++;
        if (newValue >= value) return dist;
    }
    return dist;
}

function visdistW(x, y) {
    const value = access(x--, y);
    let dist = 0;
    if (x < 0) return dist;
    while (x >= 0) {
        let newValue = access(x--, y);
        dist++;
        if (newValue >= value) return dist;
    }
    return dist;
}

function visdistE(x, y) {
    const value = access(x++, y);
    let dist = 0;
    if (x > maxX) return dist;
    while (x <= maxX) {
        let newValue = access(x++, y);
        dist++;
        if (newValue >= value) return dist;
    }
    return dist;
}

function distScore(x, y) {
    return visdistN(x, y) * visdistS(x, y) * visdistW(x, y) * visdistE(x, y);
}

v = v.map((r, y) => r.map((_, x) => distScore(x, y)));
console.log(v.map((r) => r.sort((a, b) => b - a)[0]).sort((a, b) => b - a)[0]);
