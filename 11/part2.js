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
        // added testvalue for the lcm
        tv: test,
        res: { t, f }
    }));

const throwTo = (monkeyID, item) => v[monkeyID].si.push(item);

let inspectCounts = [];

// due to the numbers being MASSIVE, the only affordable solution to this
// is to store numbers modulo a common multiple of all test values
// get a common multiple
let cm = v.map((x) => x.tv).reduce((a, b) => a * b, 1);
console.log(`Chosen Common Multiple: ${cm}`);
// now move all si values to be mod cm
v = v.map(({ si, op, test, res }) => ({
    si: si.map((v) => v % cm),
    op,
    test,
    res
}));

// how the common multiple will help us:
// > we can store a value x as x % cm
// > (x % cm) % cm = x % cm, so we can do it multiple
// > times without losing information
// > let's call x % cm = y
// > if x % z === 0, then y % z === 0
// > boom! no need to worry about huge ints!

function runMonkey(monkeyID) {
    let { si, op, test, res } = v[monkeyID];

    for (let item of si) {
        inspectCounts[monkeyID] = (inspectCounts[monkeyID] || 0) + 1;
        //                 vvvvv added for part 2
        item = op(item) % cm;
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

for (let i = 0; i < 10_000; i++) {
    runRound();
}

let [a, b] = inspectCounts.sort((a, b) => b - a);
console.log(a * b);
