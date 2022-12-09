const fs = require('node:fs');
let v = fs.readFileSync('./input.txt', 'utf8').split('\n');
v.pop();
v = v.map((n) => n.split(' ')).map(([d, v]) => [d, parseInt(v)]);

// On our imaginary grid, (0, 0) is our starting point. x always comes before y.
// Both head and tail are overlapping at this point
let head = [0, 0];
let tail = [0, 0];
// The rule is they must always touch.
// If the head is ever two steps directly up, down, right, or left, the tail
// moves 1 step in that direction to follow it.
// If they aren't touching an aren't in the same row, it will make a diagonal move
// Define the tail's history

let tailHistory = [];

const moveUp = ([x, y]) => [x, y + 1];
const moveDown = ([x, y]) => [x, y - 1];
const moveLeft = ([x, y]) => [x - 1, y];
const moveRight = ([x, y]) => [x + 1, y];

const move = (d, p) =>
    d === 'U'
        ? moveUp(p)
        : d === 'D'
        ? moveDown(p)
        : d === 'L'
        ? moveLeft(p)
        : d === 'R'
        ? moveRight(p)
        : p;

const near = (target, value) =>
    value === target - 1 || value === target || value === target + 1;

const touching = ([x1, y1], [x2, y2]) =>
    (x1 === x2 && y1 === y2) || // overlapping
    (x1 === x2 && near(y1, y2)) || // same x (up/down)
    (y1 === y2 && near(x1, x2)) || // same y (left/right)
    (near(x1, x2) && near(y1, y2)); // diagonals

function handleTailMove() {
    if (touching(head, tail)) {
        tailHistory.push(tail);
        return;
    }
    const [hx, hy] = head;
    const [tx, ty] = tail;
    if (hx === tx) tail = hy > ty ? moveUp(tail) : moveDown(tail);
    else if (hy === ty) tail = hx > tx ? moveRight(tail) : moveLeft(tail);
    else {
        // diagonals
        if (hy > ty) tail = moveUp(hx > tx ? moveRight(tail) : moveLeft(tail));
        else tail = moveDown(hx > tx ? moveRight(tail) : moveLeft(tail));
    }
    tailHistory.push(tail);
}

for (let [d, n] of v) {
    for (let i = 0; i < n; i++) {
        head = move(d, head);
        handleTailMove();
    }
}

console.log(new Set(tailHistory.map((s) => s.join(','))).size);
