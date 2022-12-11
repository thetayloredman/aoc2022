const fs = require('node:fs');
let v = fs
    .readFileSync('./input.txt', 'utf8')
    .split('\n\n')
    .map((x) => x.split('\n'));
v = v.map(([n, items, op, test, t, f]) => [
    parseInt(n.split(' ')[1].replace(':', '')),
    [
        items
            .trim()
            .replace('Starting items: ', '')
            .split(', ')
            .map((v) => parseInt(v)),
        op
            .trim()
            .replace('Operation: ', '')
            .replace('new = old ', '')
            .split(' '),
        parseInt(
            test.trim().replace('Test: ', '').replace('divisible by ', '')
        ),
        {
            t: parseInt(
                t
                    .trim()
                    .replace('If true: ', '')
                    .replace('throw to monkey ', '')
            ),
            f: parseInt(
                f
                    .trim()
                    .replace('If false: ', '')
                    .replace('throw to monkey ', '')
            )
        }
    ]
]);
v = v.map(([n, [items, [os, on], test, { t, f }]]) => [
    n,
    { items, op: [os, parseInt(on)], test, res: { t, f } }
]);
v = v.map(([n, { items, op, test, res }]) => [
    n,
    {
        items,
        op: (n) => eval(`${n}${op[0]}${op[1]}`),
        test: (n) => n % test === 0,
        res
    }
]);
v = v.map(([_, o]) => o);

const relieve = (n) => Math.floor(n / 3);

const throwToMonkey = (n, item) => v[n].items.push(item);

function handleTurn(monkeyNum) {
    let { items, op, test, res } = v[monkeyNum];
    for (let item of items) {
        // change worry level
        item = op(item);
        console.log(item, op.toString())
        // monkey gets bored
        item = relieve(item);
        let result = test(item);
        if (result) throwToMonkey(res.t, item);
        else throwToMonkey(res.f, item);
    }
    v[monkeyNum].items = [];
}

// handle a whole round
function handleRound() {
    for (let i = 0; i < v.length; i++) {
        handleTurn(i);
    }
}

handleRound()

console.log(v);
