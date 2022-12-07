const fs = require('fs');
let data = fs
    .readFileSync('./input.txt', 'utf8')
    .split('\n')
    .map((s) => s.split(' '));
// weird artifact of [""] at the end
data.pop();

function normalize(value) {
    return { A: 'R', B: 'P', C: 'S', X: 'R', Y: 'P', Z: 'S' }[value];
}

function value(choice) {
    return {
        R: 1,
        P: 2,
        S: 3
    }[choice];
}

function result(opponent, player) {
    return {
        // opponent value
        R: {
            // your value
            R: 3,
            P: 6,
            S: 0
        },
        P: {
            R: 0,
            P: 3,
            S: 6
        },
        S: {
            R: 6,
            P: 0,
            S: 3
        }
    }[opponent][player];
}

function normalizedCalc(oppNorm, plrNorm) {
    return value(plrNorm) + result(oppNorm, plrNorm);
}

function full(opp, plr) {
    return normalizedCalc(normalize(opp), normalize(plr));
}

data = data.map(([opp, plr]) => full(opp, plr)).reduce((a, b) => a + b, 0);
console.log(data);
