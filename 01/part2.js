const fs = require('node:fs');

const values = fs
    .readFileSync('./input.txt', 'utf8')
    .split('\n\n')
    .map((n) =>
        n
            .split('\n')
            .map((i) => parseInt(i))
            .reduce((a, b) => a + b, 0)
    )
    .sort((a, b) => b - a);
const [a, b, c] = values;
console.log(a + b + c);
