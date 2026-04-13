const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración
app.use(cors());
app.use(express.json()); // Para poder parsear el JSON del body
app.use(express.static(__dirname)); // Sirve index.html, style.css, etc. directamente

// Rutas a los archivos JSON donde guardaremos los datos localmente
const ADOPCIONES_FILE = path.join(__dirname, 'adopciones.json');
const DONACIONES_FILE = path.join(__dirname, 'donaciones.json');

// Inicializar archivos si no existen
const initFile = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    }
};

initFile(ADOPCIONES_FILE);
initFile(DONACIONES_FILE);

// --- ENDPOINTS PARA RECIBIR LA INFORMACIÓN ---

// POST: Recibir formulario de adopción
app.post('/api/adoptar', (req, res) => {
    try {
        const nuevaAdopcion = {
            id: Date.now().toString(),
            fecha: new Date().toISOString(),
            ...req.body
        };

        const adopciones = JSON.parse(fs.readFileSync(ADOPCIONES_FILE, 'utf8'));
        adopciones.push(nuevaAdopcion);
        fs.writeFileSync(ADOPCIONES_FILE, JSON.stringify(adopciones, null, 2));

        console.log('✅ Nueva solicitud de adopción recibida:', nuevaAdopcion.nombre);
        res.status(201).json({ message: 'Solicitud de adopción guardada exitosamente' });
    } catch (error) {
        console.error('Error al guardar adopción:', error);
        res.status(500).json({ error: 'Fallo al guardar la adopción' });
    }
});

// POST: Recibir formulario de donación
app.post('/api/donar', (req, res) => {
    try {
        const nuevaDonacion = {
            id: Date.now().toString(),
            fecha: new Date().toISOString(),
            ...req.body
        };

        const donaciones = JSON.parse(fs.readFileSync(DONACIONES_FILE, 'utf8'));
        donaciones.push(nuevaDonacion);
        fs.writeFileSync(DONACIONES_FILE, JSON.stringify(donaciones, null, 2));

        console.log('💰 Nueva donación recibida de:', nuevaDonacion.nombre || 'Anónimo', '- Monto:', nuevaDonacion.monto);
        res.status(201).json({ message: 'Donación guardada exitosamente' });
    } catch (error) {
        console.error('Error al guardar donación:', error);
        res.status(500).json({ error: 'Fallo al guardar la donación' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
    console.log(`Para usar tu página y enviar el form, entra a: http://localhost:${PORT}`);
});
