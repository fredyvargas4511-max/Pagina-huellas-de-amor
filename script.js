console.log("¡El script se cargó correctamente!");

document.addEventListener('DOMContentLoaded', () => {
    const favButtons = document.querySelectorAll('.fav-btn');
    
    console.log("Botones encontrados:", favButtons.length);

    favButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Diste clic en un corazón");
            button.classList.toggle('active');
        });
    });
});