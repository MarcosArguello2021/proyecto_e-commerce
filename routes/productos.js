const productosRouter = require('express').Router();
const { ContenedorProducto } = require('../api/productos.js');
const productosApi = new ContenedorProducto('./mocks/productos.txt');

productosRouter.get('/:id?', async (req, res) => { await productosApi.getById(req, res)});
    
productosRouter.post('/', async (req, res) => { await productosApi.save(req, res)});

productosRouter.put('/:id', async (req, res) => { await productosApi.update(req, res)});

productosRouter.delete('/:id', async (req, res) => {await productosApi.deleteById(req, res)});

module.exports = productosRouter;