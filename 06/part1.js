const fs = require('fs');
let v = fs.readFileSync('./input.txt', 'utf8').split('\n');
v.pop();
v = v[0].split('');
let last4 = [];
let i = 1;
function countLetter(l, s) {
    const r = new RegExp(`[^${l}]`, 'g');
    return s.replace(r, '').length;
}
while (true) {
    last4.push(v.shift());
    if (last4.length > 4) last4.shift();
    let s = last4.join('');
    let a = 'abcdefghijklmnopqrstuvwxyz'.split('');
    a = a.map((l) => [l, countLetter(l, s)]).filter(([_, n]) => n > 1);
    if (!a.length && last4.length === 4) break;
    i++;
}
console.log(i);
