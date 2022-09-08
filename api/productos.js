const { promises: fs } = require('fs');
const administrador = true;

class ContenedorProducto {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async save(req, res) {

        if (administrador) {
            const data = req.body;
            const { nombre, precio, urlImagen, descripcion, codigo, stock } = data;
            if (!nombre || !precio || !urlImagen || !descripcion || !codigo || !stock) {
                res.status(400).json({ error: 'por favor, ingrese todos los datos del producto' })
            } else {
                const objetos = await this.getAll();
                let newId;
                if (objetos.length == 0) {
                    newId = 1;
                } else {
                    const ultimoId = parseInt(objetos[objetos.length - 1].id);
                    newId = ultimoId + 1;
                }
                let timeStamp = Date.now()
                objetos.push({
                    ...data, id: newId, timeStamp: timeStamp
                });
                try {
                    await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2))
                    res.status(200).json({ mensaje: 'Nuevo producto guardado' })
                } catch (error) {
                    res.status(500).json({ error: 'Error al guardar' })
                }
            }
        } else {
            res.status(400).json({ error: '-1, usted no tiene permisos de administrador' })
        }
    }

    async getById(req, res) {
        const idParam = req.params.id;
        if (!idParam) {
            const productos = await this.getAll();
            productos.length === 0 ? res.status(400).json({ error: 'No hay productos cargados' }) : res.json(productos);
        } else {
            try {
                const productos = await this.getAll();
                console.log(productos);
                const producto = productos.filter(producto => producto.id == idParam);
                if (producto.length === 0) {
                    return res.status(200).json({ error: 'producto no encontrado' });
                } else {
                    res.json(producto)
                }
            } catch (err) {
                res.status(200).json({ error: 'producto no encontrado' });
            }
        }
    }

    async getAll() {
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8');
            return JSON.parse(objetos);
        } catch (error) {
            return null;
        }
    }

    async update(req, res) {
        if (administrador) {
            const idParam = Number(req.params.id);
            const { nombre, precio, urlImagen, descripcion, codigo, stock } = req.body;
            if (!nombre || !precio || !urlImagen || !descripcion || !codigo || !stock) {
                res.status(400).json({ error: 'por favor, ingrese todos los datos del producto' })
            } else {
                try {
                    const lista = await this.getAll();
                    const index = lista.findIndex(p => p.id == idParam)
                    if (index === -1) {
                        return res.status(200).json({ error: 'producto no encontrado' });
                    } else {
                        const actualizacion = {
                            "nombre": nombre,
                            "precio": precio,
                            "urlImagen": urlImagen,
                            "descripcion": descripcion,
                            "codigo": codigo,
                            "stock": stock,
                        };
                        let timeStamp = Date.now();
                        lista[index] = { ...actualizacion, id: idParam, timeStamp: timeStamp };
                        await fs.writeFile(`./${this.ruta}`, JSON.stringify(lista));
                        res.status(200).json({ messaje: 'producto actualizado con exito' })
                    }
                } catch (err) {
                    throw new Error(err);
                }
            }
        } else {
            res.status(400).json({ error: '-1, usted no tiene permisos de administrador' })
        }
    }

    async deleteById(req, res) {
        if (administrador) {
            const idParam = Number(req.params.id);
            const objetos = await this.getAll();
            const items = objetos.filter(item => item.id !== idParam);
            if (items.length === objetos.length) {
                return res.status(400).json({ error: 'Producto no encontrado' });
            }
            try {
                await fs.writeFile(this.ruta, JSON.stringify(items, null, 2));
                return res.status(200).json({ mensaje: 'Producto borrado' });
            } catch (error) {
                throw new Error(`Error al guardar el cambio ${error}`);
            }
        } else {
            res.status(400).json({ error: '-1, usted no tiene permisos de administrador' })
        }
    }

    async deleteAll() {
        try {
            const productos = [];
            fs.writeFile(this.ruta, JSON.stringify(productos, null, 2));
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = { ContenedorProducto };


