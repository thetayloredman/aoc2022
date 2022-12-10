// manually processed to add underscores this by me (LogN)

const fs = require('node:fs');

let v = fs
    .readFileSync('./input.txt', 'utf8')
    .split('\n')
    .slice(0, 9)
    .map((l) => l.trim());
v.pop();
v = v.map((l) =>
    l
        .replace(/ {5}/g, ' [_] ')
        .replace(/[\[\]]/g, '')
        .replace(/ /g, '')
        .split('')
);
let nv = [];
while (true) {
    let sv = '';
    for (let i = 0; i < v.length; i++) {
        sv += v[i].shift();
    }
    nv.push(sv);
    if (v[0].length === 0) break;
}
nv = nv.map((s) => s.split('').reverse().join('').replace(/_/g, '').split(''));
module.exports = nv;
