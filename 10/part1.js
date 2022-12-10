const fs = require('node:fs');
let v = fs.readFileSync('./input.txt', 'utf8').split('\n');
const aocvm = require('./aocvm.js');
let sum = 0;
aocvm.clockEvents.on('tick', (clock, x) => {
    if ([20, 60, 100, 140, 180].includes(clock)) sum += x;
});
aocvm.runProgram(v);
console.log(sum);
