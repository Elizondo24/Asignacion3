
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const conectarDB = require('./config/database');
const productoRoutes = require('./routes/productoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/productos', productoRoutes);


app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de inventario funcionando correctamente'
    });
});

const iniciarServidor = async () => {
    try {
        await conectarDB();

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

iniciarServidor();
