'use strict';

let n1 = document.querySelector('.f');
let n2 = document.querySelector('.s');
let n3 = document.querySelector('.t');

let count1 = 0;
let count2 = 0;
let count3 = 0;

setInterval(() => {
    if (count1 === 100) {
        clearInterval;
    } else {
        count1 += 1;
        n1.innerHTML = `${count1}%`;
    }
}, 95);

setInterval(() => {
    if (count2 === 100) {
        clearInterval;
    } else {
        count2 += 1;
        n2.innerHTML = `${count2}%`;
    }
}, 265);

setInterval(() => {
    if (count3 === 100) {
        clearInterval;
    } else {
        count3 += 1;
        n3.innerHTML = `${count3}%`;
    }
}, 565);
