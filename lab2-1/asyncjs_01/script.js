if (localStorage.getItem("pageReloads") == null){
    localStorage.pageReloads = parseInt(0);
}
localStorage.pageReloads = parseInt(localStorage.pageReloads) + 1;
alert(`Вы обновили эту страницу ${localStorage.pageReloads} раз(а)!`);