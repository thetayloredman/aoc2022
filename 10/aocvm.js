// Advent of Code Virtual Machine (aocvm) v2022
//
// aocvm has one register 'a' and two commands:
//   addx [VALUE] - 2 cycles - add a value to register 'a' (takes neg values)
//   noop         - 1 cycle  - does nothing

const { EventEmitter } = require('events');

// take the array into an array of instructions
const split = (array) => array.map((s) => s.split(' '));

// aocvm state is reset on process change
let x = 0;
let clock = 1;

// clock handling is not performed with a setInterval -- we do not rely on the clock
// ticking on an interval, it just needs to tick after each step
// aocvm exposes some simple APIs to assist external code in managing the clock
// and other state, mainly the clock EventEmitter to allow the external code to
// grab the event times
const clockEvents = new EventEmitter();

const tick = () => clockEvents.emit('tick', ++clock, x);

const instructions = {
    addx: (value) => {
        tick();
        x += value;
    },
    noop: () => void 0
};

function runInstruction(instruction) {
    instructions[instruction[0]](Number(instruction[1]));
    tick();
}

function runProgram(program) {
    clockEvents.emit('start', clock, x);
    split(program).forEach((e) => runInstruction(e));
    clockEvents.emit('halt', clock, x);
}

module.exports = {
    x,
    clock,
    clockEvents,
    tick,
    runProgram
};
