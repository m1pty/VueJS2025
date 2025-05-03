function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(url);
    });
}

function main() {
    const gallery = document.getElementById('gallery');
    const urls = [];
    
    for (let i = 0; i < 5; i++) {
        const url = prompt(`Enter URL of Image №${i + 1}:`);
        if (url) urls.push(url);
    }

    let chain = Promise.resolve();
    
    urls.forEach(url => {
        chain = chain.then(() => {
            return loadImage(url)
            .then(img => gallery.appendChild(img))
            .catch(errorUrl => {
                const p = document.createElement('p');
                p.textContent = `Can't load image: ${errorUrl}`;
                gallery.appendChild(p);
            });
        });
    });
}

main();