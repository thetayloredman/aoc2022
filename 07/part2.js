const tree = require('./tree');

const TOTAL = 70000000;
const REQUIRED = 30000000;
const USED = tree.size;
const UNUSED = TOTAL - USED;
const REMOVE = REQUIRED - UNUSED;

let choices = [];
function flattenPotential(tree) {
    if (typeof tree === 'number') return;
    if (tree.size < REMOVE) return;
    choices.push(tree);
    for (let k in tree.values) {
        flattenPotential(tree.values[k]);
    }
}
flattenPotential(tree);
console.log(choices.sort((a, b) => a.size - b.size)[0].size);
