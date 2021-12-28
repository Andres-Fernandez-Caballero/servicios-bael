const comingSoon = () => {
    alert('Proximamente\nCaracteristica en desarrollo');
}

const elements = document.querySelectorAll('.coming-soon');

elements.forEach(element => {
   element.onclick = comingSoon;
})