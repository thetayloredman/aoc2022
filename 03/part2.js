const fs = require('fs');
let v = fs.readFileSync('./input.txt', 'utf8');
// input parsing
v = v.split('\n').map((n) => n.split(''));
// weird empty item
v.pop();

let _ = [];
for (let i = 0; i < v.length; i++) {
    _.push([v[i++], v[i++], v[i]]);
}
v = _;

// goal: find for every group of 3 the shared value
v = v.map(([a, b, c]) => a.filter((l) => b.includes(l) && c.includes(l))[0]);
const values = Object.fromEntries(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        .split('')
        .map((l, i) => [l, i + 1])
);
v = v.map((l) => values[l]);
v = v.reduce((a, b) => a + b, 0);
console.log(v);
