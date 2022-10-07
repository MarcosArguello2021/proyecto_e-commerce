import express from 'express';
import productosRouter from './routes/productos.js';
import carritoRouter from './routes/carrito.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src'));
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);
app.use((req, res, next) => {
    res.send({error: -2, descripcion: `Ruta o dirección no implementada`})
});

const server = app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));