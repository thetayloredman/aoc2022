// manually processed to add underscores this by me (LogN)

let v = `[G] [_] [_] [_] [_] [D] [R] [_] [_]
 [W] [_] [_] [V] [_] [C] [T] [M] [_]
 [L] [_] [_] [P] [Z] [Q] [F] [V] [_]
 [J] [_] [_] [S] [D] [J] [M] [T] [V]
 [B] [_] [M] [H] [L] [Z] [J] [B] [S]
 [R] [C] [T] [C] [T] [R] [D] [R] [D]
 [T] [W] [Z] [T] [P] [B] [B] [H] [P]
 [D] [S] [R] [D] [G] [F] [S] [L] [Q]
  1   2   3   4   5   6   7   8   9 `
    .split('\n')
    .map((l) => l.trim());
v.pop();
v = v.map((l) =>
    l
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
