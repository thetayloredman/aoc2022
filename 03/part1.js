const fs = require('fs');
let v = fs.readFileSync('./input.txt', 'utf8');
// input parsing
v = v.split('\n').map((n) => n.split(''));
// weird empty item
v.pop();

v = v.map((a) => [a.slice(0, a.length / 2), a.slice(a.length / 2)]);
v = v.map(([a, b]) => a.filter((e) => b.includes(e)));
// de-duplicate because there is only one of each
v = v.map(([a]) => a);
const values = Object.fromEntries(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        .split('')
        .map((l, i) => [l, i + 1])
);
v = v.map((l) => values[l]);
v = v.reduce((a, b) => a + b, 0);
console.log(v);
