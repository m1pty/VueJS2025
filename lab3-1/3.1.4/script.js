let count = localStorage.getItem('clickCount_314') || 0;
count = parseInt(count);

let counterDisplay = document.getElementById('counter');
let clickBtn = document.getElementById('clickBtn');
let clickPerSecDisplay = document.getElementById('cps');

let startTime = null;
let tempClicks = 0;

// для проверки корректности работы считает клики ЗА СЕССИЮ
// в случае, если делать по тексту, то все клики будут считаться, 
// и "скорость" будет некорректна

counterDisplay.textContent = count;
clickBtn.addEventListener('click', () => {
    if (!startTime)
    {
        startTime = Date.now(); 
    }

    count++; tempClicks++;
    counterDisplay.textContent = count;
    localStorage.setItem('clickCount_314', count);

    let secPassed = (Date.now() - startTime) / 1000;
    clickPerSecDisplay.textContent = tempClicks / secPassed;
});