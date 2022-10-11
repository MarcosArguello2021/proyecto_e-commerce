import { Router } from "express";
import {
    carritosDao as carritosApi,
    productosDao as productosApi
} from '../dao/index.js'
const carritoRouter = Router();

carritoRouter.post('/', async (req, res) => {
    let newId;
    const objeto = { productos: [] };
    const carritos = await carritosApi.getAll();
    if (carritos.length == 0) {
        newId = 1
    } else {
        newId = carritos[carritos.length - 1].id + 1
    }
    const fecha = new Date();
    const newObj = { ...objeto, id: newId, timeStamp: fecha }
    
    try {
        const carritoCreado = await carritosApi.save(newObj);
        
        res.send({ id: carritoCreado.id });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar' })
    }
});

carritoRouter.delete('/:id', async (req, res) => {
    try {
        const carrito = await carritosApi.getById(req, res)
        if (!carrito) {
            return res.status(400).json({ error: "Carrito no encontrado" });
        } else {
            await carritosApi.deleteById(req, res);
            res.status(200).json({ mensaje: 'Carrito borrado con exito' })
        }
    } catch (error) {
        res.status(400).json({ error: '-1, No se encontró el ID' })
    }
});

carritoRouter.get('/:id/productos', async (req, res) => { 
    try {
        const carrito = await carritosApi.getById(req, res);
        res.send(carrito);
    } catch (error) {
        return res.status(400).json({ error: "Carrito no encontrado" });
    }
});  

carritoRouter.post('/:id/productos', async (req, res) => { 
    const carrito = await carritosApi.getById(req, res)
    const producto = await productosApi.getById(req, res)
    carrito.productos.push(producto)
    await carritosApi.update(carrito)
    res.end()

});

carritoRouter.delete('/:id/productos/:id_prod', async (req, res) => { 
    const carrito = await carritosApi.getById(req, res);
    const index = carrito.productos.findIndex(p => p.id == req.params.idProd);
    if (index != -1) {
        carrito.productos.splice(index, 1);
        await carritosApi.update(carrito);
    }
    res.end()});

export default carritoRouter;
