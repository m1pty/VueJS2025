function splitWord(word) {
    let result = '';
    for (let i = 0; i < word.length; i++) {
        if (word[i] === ' ') {
            result += '&nbsp;';
        } else {
            result += `<span>${word[i]}</span>`;
        }

    }
    return result;
}

function changeWord(word, flag = false) {
    const scriptEl = document.currentScript;
    const container = scriptEl.closest('.alternating-colors');
    if (container) {
        if (flag) {
            container.innerHTML = '<span></span>' + splitWord(word);
        } else {
            container.innerHTML = splitWord(word);
        }
    }
}