async function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Can't load image"));
    });
  }

  async function main() {
    const gallery = document.getElementById('gallery');
    const urls = [];

    for (let i = 0; i < 5; i++) {
      const url = prompt(`Введите URL изображения #${i + 1}:`);
      urls.push(url);
    }a

    for (const url of urls) {
      try {
        const img = await loadImage(url);
        gallery.appendChild(img);
      } catch (error) {
        const p = document.createElement('p');
        p.textContent = "Can’t load image";
        gallery.appendChild(p);
      }
    }
  }

  main();