const fs = require('node:fs');
let v = fs.readFileSync('./input.txt', 'utf8').split('\n');
const aocvm = require('./aocvm.js');
let crt = '';
aocvm.clockEvents.on('pretick', (clock, x) => {
    // render the next crt pixel
    // the sprite is from (x-1) to (x+1)
    if ([x - 1, x, x + 1].includes((clock - 1) % 40)) crt += '#';
    else crt += '.';
});
aocvm.runProgram(v);
console.log(crt.match(/.{40}/g).join('\n').replace(/\./g, ' '));
