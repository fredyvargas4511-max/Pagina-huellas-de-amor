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

    // --- Manejo de Formularios ---
    const formAdopcion = document.getElementById('form-adopcion');
    if (formAdopcion) {
        formAdopcion.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evitamos que la página se recargue por defecto
            const formData = new FormData(formAdopcion);
            const data = Object.fromEntries(formData.entries());

            try {
                // Enviamos los datos al backend
                const response = await fetch('http://localhost:3000/api/adoptar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    alert('¡Gracias! Tu solicitud de adopción ha sido enviada con éxito.');
                    formAdopcion.reset(); // Limpiamos el formulario
                } else {
                    alert('Hubo un error al enviar tu solicitud. Intenta nuevamente más tarde.');
                }
            } catch (error) {
                console.error("Error:", error);
                alert('No se pudo conectar con el servidor. ¿Seguro que estás ejecutando la aplicación con node server.js?');
            }
        });
    }

    const formDonacion = document.getElementById('form-donacion');
    if (formDonacion) {
        formDonacion.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(formDonacion);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:3000/api/donar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('¡Muchísimas gracias por tu donación! Ayudas a cambiar vidas.');
                    formDonacion.reset();
                } else {
                    alert('Hubo un error al procesar tu donación. Intenta nuevamente.');
                }
            } catch (error) {
                console.error("Error:", error);
                alert('No se pudo conectar con el servidor. ¿Seguro que estás ejecutando la aplicación con node server.js?');
            }
        });
    }
});