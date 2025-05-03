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

    const promises = urls.map(url => 
        loadImage(url)
            .then(img => ({img}))
            .catch(url => ({error: url}))
    );

    Promise.allSettled(promises)
        .then(results => {
            results.forEach(result => {
                if (result.value?.img) {
                    gallery.appendChild(result.value.img);
                } else {
                    const p = document.createElement('p');
                    p.textContent = `Can’t load image: ${result.value?.error}`;
                    gallery.appendChild(p);
                }
            });
        });
}
main();