const circle = document.getElementById('circle');

document.addEventListener('mousemove', (event) => {
    circle.style.left = `${event.clientX}px`;
    circle.style.top = `${event.clientY}px`;
});
