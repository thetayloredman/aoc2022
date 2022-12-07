const fs = require('fs');
let data = fs
    .readFileSync('./input.txt', 'utf8')
    .split('\n')
    .map((s) => s.split(' '));
// weird artifact of [""] at the end
data.pop();

function normalize(value) {
    return { A: 'R', B: 'P', C: 'S', X: 'LOSE', Y: 'DRAW', Z: 'WIN' }[value];
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

function play(opponent, wanted) {
    return {
        R: {
            WIN: 'P',
            DRAW: 'R',
            LOSE: 'S'
        },
        P: {
            WIN: 'S',
            DRAW: 'P',
            LOSE: 'R'
        },
        S: {
            WIN: 'R',
            DRAW: 'S',
            LOSE: 'P'
        }
    }[opponent][wanted];
}

function val(opp, plr) {
    return value(plr) + result(opp, plr);
}

data = data
    .map(([opp, goal]) => [
        normalize(opp),
        play(normalize(opp), normalize(goal))
    ])
    .map(([opp, plr]) => val(opp, plr))
    .reduce((a, b) => a + b, 0);
console.log(data);
