const tree = require('./tree');

let sum = 0;
function walk(node) {
    if (typeof node === 'number') return 0;
    let addl = 0;
    for (let i in node.values) walk(node.values[i]);
    if (node.size <= 100_000) sum += node.size;
}
walk(tree);
console.log(sum);
