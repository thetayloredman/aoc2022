const fs = require('node:fs');
let v = fs
    .readFileSync('./input.txt', 'utf8')
    .split('\n\n')
    .map((x) => x.split('\n'))
    .map(([m, si, op, te, t, f]) => [
        parseInt(m.replace('Monkey ', '').replace(':', '')),
        [
            si
                .trim()
                .replace('Starting items: ', '')
                .split(', ')
                .map((v) => parseInt(v)),
            op.trim().replace('Operation: new = ', ''),
            parseInt(te.trim().replace('Test: divisible by ', '')),
            {
                t: parseInt(t.trim().replace('If true: throw to monkey ', '')),
                f: parseInt(f.trim().replace('If false: throw to monkey ', ''))
            }
        ]
    ])
    .map(([m, [si, op, test, { t, f }]]) => ({
        si,
        op: (old) => eval(op),
        test: (n) => n % test === 0,
        res: { t, f }
    }));

const relieve = (n) => Math.floor(n / 3);
const throwTo = (monkeyID, item) => v[monkeyID].si.push(item);

let inspectCounts = [];

function runMonkey(monkeyID) {
    let { si, op, test, res } = v[monkeyID];

    for (let item of si) {
        inspectCounts[monkeyID] = (inspectCounts[monkeyID] || 0) + 1;
        item = op(item);
        item = relieve(item);
        if (test(item)) throwTo(res.t, item);
        else throwTo(res.f, item);
    }
    v[monkeyID].si = [];
}

function runRound() {
    for (let i = 0; i < v.length; i++) {
        runMonkey(i);
    }
}

for (let i = 0; i < 20; i++) {
    runRound();
}

let [a, b] = inspectCounts.sort((a, b) => b - a);
console.log(a * b);
