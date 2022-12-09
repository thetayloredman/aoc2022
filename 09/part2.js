const fs = require('node:fs');
let v = fs.readFileSync('./input.txt', 'utf8').split('\n');
v.pop();
v = v.map((n) => n.split(' ')).map(([d, v]) => [d, parseInt(v)]);

// On our imaginary grid, (0, 0) is our starting point. x always comes before y.
// All values are overlapping at this point
let [head, k1, k2, k3, k4, k5, k6, k7, k8, tail] = Array.from({
    length: 10
}).map((_) => [0, 0]);

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

// to achieve the long string, simulating every group of knots as it's own rope
// would be the easiest approach. i'll define a function handleKnots() that takes
// two knot coordinates and returns the tail's moved value. tailHistory is not
// handled here.
function handleKnots(head, tail) {
    if (touching(head, tail)) return [head, tail];
    const [hx, hy] = head;
    const [tx, ty] = tail;
    if (hx === tx) tail = hy > ty ? moveUp(tail) : moveDown(tail);
    else if (hy === ty) tail = hx > tx ? moveRight(tail) : moveLeft(tail);
    else {
        if (hy > ty) tail = moveUp(hx > tx ? moveRight(tail) : moveLeft(tail));
        else tail = moveDown(hx > tx ? moveRight(tail) : moveLeft(tail));
    }
    return [head, tail];
}

// this function handles every knot
function handleMany() {
    k1 = handleKnots(head, k1)[1];
    k2 = handleKnots(k1, k2)[1];
    k3 = handleKnots(k2, k3)[1];
    k4 = handleKnots(k3, k4)[1];
    k5 = handleKnots(k4, k5)[1];
    k6 = handleKnots(k5, k6)[1];
    k7 = handleKnots(k6, k7)[1];
    k8 = handleKnots(k7, k8)[1];
    tail = handleKnots(k8, tail)[1];
    tailHistory.push(tail);
}

for (let [d, n] of v) {
    for (let i = 0; i < n; i++) {
        head = move(d, head);
        handleMany();
    }
}

console.log(new Set(tailHistory.map((s) => s.join(','))).size);
