'use strict';

const element = document.getElementById('prog');
const video = document.getElementById('vid');

let width = 0;
const maxWidth = 100; 
const duration = 1 * 60 * 1000;
const intervalTime = 20;

const step = (maxWidth - width) / (duration / intervalTime);

const intervalId = setInterval(() => {
    width += step;
    element.style.width = width + '%';

    if (width >= maxWidth) {
        clearInterval(intervalId);
        document.getElementById('vid').pause();
        
    }

}, intervalTime);
