const fs = require('fs');
let v = fs.readFileSync('./input.txt', 'utf8').split('\n');
v.pop();
// process commands into a command type, and results into a result type
v = v.map((s) => {
    if (s.startsWith('$ ')) return ['command', s.slice(2)];
    else return ['result', s];
});
// merge multiple sequential 'result' types into one result element
let nv = [];
let last = [];
for (let i = 0; i < v.length; i++) {
    let e = v[i];
    if (e[0] === 'command') {
        if (last.length) nv.push(['results', last]);
        last = [];
        nv.push(e);
    } else {
        last.push(e[1]);
    }
}
if (last.length) nv.push(['results', last]);
// now nv contains 'command' or 'results' arrays
// next step: find the cwd of every command by walking it and introducing the path string
let cwd = '/';
function cdToRoot() {
    cwd = '/';
}
function cdIntoDir(dir) {
    cwd += `${dir}/`;
}
function cdBack() {
    let a = cwd.substring(1, cwd.length - 1).split('/');
    a.pop();
    if (a.length) cwd = `/${a.join('/')}/`;
    else cwd = '/';
}
for (let i = 0; i < nv.length; i++) {
    let [t, args] = nv[i];

    if (t !== 'command') {
        nv[i] = [t, args, cwd];
        continue;
    }
    if (args === 'ls') {
        nv[i] = [t, args, cwd];
        continue;
    }
    if (args === 'cd /') cdToRoot();
    else if (args === 'cd ..') cdBack();
    else if (args.startsWith('cd')) cdIntoDir(args.slice(3));
    else throw new Error('unknown args value ' + args);
    nv[i] = [t, args, cwd];
}
let mv = [];
for (let i = 0; i < nv.length; i++) {
    let [t, a, p] = nv[i];
    if (t !== 'command' || a !== 'ls') continue;
    // command of ls
    mv.push(['dirlist', p, nv[++i][1]]);
}
// mv is dirlists only
// split into [dir, name]
mv = mv.map(([_, dirname, contents]) => [
    dirname,
    contents.map((s) => s.split(' '))
]);
// so dirents always come first
mv = mv.sort();

// Now I have to populate the tree itself.
// This will be done by dynamically setting values
// into the object. This is done with the following function:
let tree = {};
function setDeep(paths, value) {
    let i;
    let v = tree;
    for (i = 0; i < paths.length - 1; i++) v = v[paths[i]];
    v[paths[i]] = value;
}

// Now, I will define the function populate() which handles a dirlist set:
function populate(path, entries) {
    if (path === '/') {
        for (let [t, n] of entries) tree[n] = t === 'dir' ? null : parseInt(t);
        return;
    }
    path = path.substring(1, path.length - 1).split('/');
    let built = {};
    for (let [t, n] of entries) built[n] = t === 'dir' ? null : parseInt(t);
    setDeep(path, built);
}
for (let [p, e] of mv) populate(p, e);

// the tree has been populated.
// now, it's time to find the sizes of every directory. I will define a function getsize() which recurses:
function getsize(element) {
    if (typeof element === 'number') return element;

    let sum = 0;
    for (let k in element) {
        sum += getsize(element[k]);
    }
    return sum;
}
// now, a new function to assign element sizes
function assignsize(element) {
    if (typeof element === 'number') return element;

    let inner = {};
    for (let k in element) {
        inner[k] = assignsize(element[k]);
    }
    return { size: getsize(element), values: inner };
}

// export time!!
module.exports = assignsize(tree);
