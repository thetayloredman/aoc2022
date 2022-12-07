const fs = require('fs');
let v = fs.readFileSync('./input.txt', 'utf8').split('\n');
v.pop();
v = v.map((s) => s.split(',').map((g) => g.split('-').map((n) => parseInt(n))));
function inclusive(a, b) {
    return Array.from({ length: b - a + 1 }).map((_, index) => index + a);
}
v = v.map(([[aa, ab], [ba, bb]]) => [inclusive(aa, ab), inclusive(ba, bb)]);
v = v.map(([a, b]) => a.filter((n) => b.includes(n)).length);
v = v.filter(Boolean);
console.log(v.length);
