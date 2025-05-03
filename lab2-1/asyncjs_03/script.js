async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Can’t load image: ${url}`));
    });
}

async function main() {
const gallery = document.getElementById('gallery');
const urls = [];
    
for (let i = 0; i < 5; i++) {
    const url = prompt(`Enter URL of Image №${i + 1}:`);
    if (url) urls.push(url);
}

const imagePromises = urls.map(url => 
    loadImage(url)
        .then(img => ({ img }))
        .catch(error => ({ error: error.message }))
);

const results = await Promise.allSettled(imagePromises);
    
results.forEach(result => {
    if (result.status === 'fulfilled') {
        const { img, error } = result.value;
        if (img) {
            gallery.appendChild(img);
        } else if (error) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error';
            errorElement.textContent = error;
            gallery.appendChild(errorElement);
        }
    }
});
}

document.addEventListener('DOMContentLoaded', main);