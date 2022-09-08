const express = require('express');
const productosRouter = require('./routes/productos')
const carritoRouter = require('./routes/carrito')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('src'));
app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)

app.listen(PORT, ()=>{
    console.log('Servidor escuchando en puerto:', PORT);
})