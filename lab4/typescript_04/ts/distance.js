"use strict";
function distance(...args) {
    if (args.length !== 2 && args.length !== 4) {
        throw new Error(`Invalid number of arguments. Expected 2 or 4, got ${args.length}`);
    }
    if (args.length === 4) {
        if (!args.every((arg) => typeof arg === 'number')) {
            throw new TypeError('All coordinates must be numbers');
        }
        const [x1, y1, x2, y2] = args;
        return Math.hypot(x2 - x1, y2 - y1);
    }
    else {
        const isValidPoint = (p) => typeof p === 'object' &&
            p !== null &&
            'x' in p &&
            'y' in p &&
            typeof p.x === 'number' &&
            typeof p.y === 'number';
        if (!args.every(isValidPoint)) {
            throw new TypeError('Arguments must be Point(x: number, y: number) objects');
        }
        const [p1, p2] = args;
        return Math.hypot(p2.x - p1.x, p2.y - p1.y);
    }
}
try {
    console.log(distance(0, 0, 3, 4));
}
catch (e) {
    console.error(e);
}
try {
    console.log(distance({ x: 0, y: 0 }, { x: 3, y: 4 }));
}
catch (e) {
    console.error(e);
}
try {
    console.log(distance(0, 1, 2));
}
catch (e) {
    console.error(e);
}
try {
    console.log(distance(0, '0', 1, 2));
}
catch (e) {
    console.error(e);
}
try {
    console.log(distance({}, {}));
}
catch (e) {
    console.error(e);
}
