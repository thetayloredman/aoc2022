const fs = require('fs');
const stacks = require('./stacks');
let moves = fs.readFileSync('./input.txt', 'utf8').split('\n');
moves.pop();
moves = moves.map((s) => s.replace('move ', '').split(' from '));
moves = moves.map(([n, s]) => [
    parseInt(n),
    s.split(' to ').map((e) => parseInt(e))
]);
function move(from, to) {
    stacks[to - 1].push(stacks[from - 1].pop());
}
function moveN(n, from, to) {
    for (let i = 0; i < n; i++) move(from, to);
}
for (let [n, [from, to]] of moves) {
    moveN(n, from, to);
}

console.log(stacks.map((s) => s[s.length - 1]).join(''));
