

const comingSoon = () => {
    alert('Proximamente\nCaracteristica en desarrollo');
}

const authRoute = (event) => {
    event.preventDefault();
    const response = prompt("Ruta protegida ingrese la contraseña");
    if(response === "DorianElGris")
        window.location.href = '/week';
}

const elements = document.querySelectorAll('.coming-soon');

elements.forEach(element => {
   element.onclick = comingSoon;
})

const elementsProtected = document.querySelectorAll('.protected');

elementsProtected.forEach(element => {
    element.onclick = authRoute;
})