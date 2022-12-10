const fs = require('fs');
const stacks = require('./stacks');
let moves = fs.readFileSync('./input.txt', 'utf8').split('\n');
moves.pop();
moves=moves.slice(10)
moves = moves.map((s) => s.replace('move ', '').split(' from '));
moves = moves.map(([n, s]) => [
    parseInt(n),
    s.split(' to ').map((e) => parseInt(e))
]);
// changed for pt 2
function moveN(n, from, to) {
    let a = [];
    for (let i = 0; i < n; i++) a.push(stacks[from - 1].pop());
    a = a.reverse();
    stacks[to - 1].push(...a);
}
for (let [n, [from, to]] of moves) {
    moveN(n, from, to);
}

console.log(stacks.map((s) => s[s.length - 1]).join(''));
