let count = localStorage.getItem('clickCount') || 0;
count = parseInt(count);

let counterDisplay = document.getElementById('counter');
let clickBtn = document.getElementById('clickBtn');

counterDisplay.textContent = count;
clickBtn.addEventListener('click', () => {
    count++;
    counterDisplay.textContent = count;
    localStorage.setItem('clickCount', count);
});