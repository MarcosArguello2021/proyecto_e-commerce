const { promises: fs } = require('fs');
const { ContenedorProducto } = require('../api/productos.js');
const productosApi = new ContenedorProducto('./mocks/productos.txt');

const administrador = true;

class ContenedorCarrito {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async save(req, res) {

        try {
            const carritos = await this.getAll();
            let newId;
            if (carritos.length == 0) {
                newId = 1;
            } else {
                const ultimoId = parseInt(carritos[carritos.length - 1].id);
                newId = ultimoId + 1;
            }
            let timeStamp = Date.now()
            const carrito = { id: newId, timeStamp: timeStamp, productos: [] };
            carritos.push(carrito);
            await fs.writeFile(this.ruta, JSON.stringify(carritos, null, 2))
            res.status(200).json({ mensaje: 'Nuevo carrito creado' })
        } catch (error) {
            res.status(500).json({ error: 'Error al guardar' })
        }
    }

    async saveProducto(req, res) {
        const idParam = Number(req.params.id);
        const { id } = req.body;

        try {
            const carritos = await this.getAll();
            const index = carritos.findIndex(carrito => carrito.id === idParam);
            if (index === -1) {
                return res.status(200).json({ error: 'Carrito no encontrado' });
            } else {
                const productos = await productosApi.getAll();
                const productoCarrito = [];
                productos.forEach(producto => {
                    if (producto.id == Number(id)) {
                        productoCarrito.push(producto);
                    }
                })
                if (productoCarrito.length != 0) {
                    let carro = carritos[index].productos.concat(productoCarrito);
                    carritos[index].productos = carro;
                    await fs.writeFile(this.ruta, JSON.stringify(carritos, null, 2));
                    res.status(200).json({ mensaje: 'Producto agregado' });

                } else {
                    res.status(400).json({ error: 'Producto no encontrado' })
                }
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al guardar' })
        }
    }

    async getByIdProducts(req, res) {
        const idParam = Number(req.params.id);
        try {
            const carritos = await this.getAll();
            const carrito = carritos.filter(carrito => carrito.id === idParam);
            if (carrito.length === 0) {
                return res.status(400).json({ error: 'Carrito no encontrado' });
            } else {
                return res.json(carrito)
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async getAll() {
        try {
            const carritos = await fs.readFile(this.ruta, 'utf-8');
            return JSON.parse(carritos);
        } catch (error) {
            return null;
        }
    }

    async updateProducto(req, res) {
        const { id, id_prod } = req.params;

        try {
            const lista = await this.getAll();
            const carrito = lista.find(carrito => carrito.id == id);
            const indexCarrito = lista.findIndex(carrito => carrito.id == id);
            if (indexCarrito === -1) {
                return res.status(400).json({ error: 'Carrito no encontrado' });
            } else {
                const index = carrito.productos.findIndex(producto => producto.id == id_prod);
                if (index === -1) {
                    res.status(400).json({ error: 'Producto no encontrado' })
                } else {
                    lista[indexCarrito].productos.splice(index, 1);
                    await fs.writeFile(this.ruta, JSON.stringify(lista, null, 2));
                    res.status(200).json({ messaje: 'Producto borrado con éxito' });
                }
            }
        } catch (err) {
            res.status(500).json({ error: 'Error al guardar' });
        }
    }

    async deleteById(req, res) {
        const idParam = Number(req.params.id);
        const carritos = await this.getAll();

        const index = carritos.findIndex(carrito => carrito.id === idParam);
        if (index === -1) {
            return res.status(400).json({ error: 'Carrito no encontrado' });
        } else {
            try {
                carritos.splice(index, 1);
                await fs.writeFile(this.ruta, JSON.stringify(carritos, null, 2));
                res.status(200).json({ messaje: 'Carrito borrado' })
            } catch (error) {
                res.status(500).json({ error: 'Error al guardar' })
            }

        }
    }

    async deleteAll() {
        try {
            const carritos = [];
            fs.writeFile(this.ruta, JSON.stringify(carritos, null, 2));
        } catch (err) {
            res.status(500).json({ error: 'Error al guardar' });
        }
    }
}

module.exports = { ContenedorCarrito };