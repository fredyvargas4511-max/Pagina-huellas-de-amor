document.addEventListener('DOMContentLoaded', () => {
    const favButtons = document.querySelectorAll('.fav-btn');

    favButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');

            if (button.classList.contains('active')) {
                // Si está activo, ponemos el corazón lleno
                button.textContent = '♥'; 
                button.style.color = '#ff4d4d';
            } else {
                // Si no, volvemos al corazón vacío
                button.textContent = '♡';
                button.style.color = '#ccc';
            }
        });
    });
});