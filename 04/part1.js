const fs = require('fs');
let v = fs.readFileSync('./input.txt', 'utf8').split('\n');
v.pop();
v = v.map((s) => s.split(',').map((g) => g.split('-').map((n) => parseInt(n))));
v = v.map(([[aa, ab], [ba, bb]]) => {
    if (aa <= ba && bb <= ab) return true;
    if (ba <= aa && ab <= bb) return true;
    return false;
});
v = v.filter(Boolean);
console.log(v.length);
