"use strict";
class BubbleSortStrategy {
    sort(data) {
        console.log("[@] Sorting using bubble sort");
        return [...data].sort((a, b) => a - b);
    }
}
class QuickSortStrategy {
    sort(data) {
        console.log("[@] Sorting using quick sort");
        return this.quickSort([...data]);
    }
    quickSort(data) {
        if (data.length <= 1)
            return data;
        const pivot = data[0];
        const left = [];
        const right = [];
        for (let i = 1; i < data.length; i++) {
            if (data[i] < pivot) {
                left.push(data[i]);
            }
            else {
                right.push(data[i]);
            }
        }
        return [...this.quickSort(left), pivot, ...this.quickSort(right)];
    }
}
class Sorter {
    constructor(strategy) { this.strategy = strategy; }
    setStrategy(strategy) { this.strategy = strategy; }
    sort(data) {
        return this.strategy.sort(data);
    }
}
console.log('---> Demostrating Strategy pattern...');
const data = [3, 1, 4, 1, 5, 9, 2, 6];
const sorter = new Sorter(new BubbleSortStrategy());
// default: bubble sort strategy
console.log(sorter.sort(data));
sorter.setStrategy(new QuickSortStrategy());
console.log(sorter.sort(data));
