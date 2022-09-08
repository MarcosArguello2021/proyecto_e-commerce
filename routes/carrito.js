const carritoRouter = require('express').Router();
const { ContenedorCarrito } = require('../api/carrito.js');
const carritoApi = new ContenedorCarrito('./mocks/carrito.txt');


carritoRouter.post('/', async (req, res) => { await carritoApi.save(req, res)});

carritoRouter.delete('/:id', async (req, res) => {await carritoApi.deleteById(req, res)});

carritoRouter.get('/:id/productos', async (req, res) => { await carritoApi.getByIdProducts(req, res)});

carritoRouter.post('/:id/productos', async (req, res) => { await carritoApi.saveProducto(req, res)});

carritoRouter.delete('/:id/productos/:id_prod', async (req, res) => { await carritoApi.updateProducto(req, res)});

module.exports = carritoRouter;