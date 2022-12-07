const fs = require('node:fs');

console.log(
    fs
        .readFileSync('./input.txt', 'utf8')
        .split('\n\n')
        .map((n) =>
            n
                .split('\n')
                .map((i) => parseInt(i))
                .reduce((a, b) => a + b, 0)
        )
        .sort((a, b) => b - a)[0]
);
