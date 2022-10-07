import ContenedorArchivo from "../../containers/ContenedorArchivo.js"

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('carritos.txt')
    }
    async getProductsFromCart (req, res) { 
                             
        try {
            const db = await super.getById(req, res)
            res.send(db.productos)
        } catch (error) {
            throw new Error(`Error: no se encontró el id ${id}`)  
        }
    }
    async saveProductInCartByID (req, res) { 

        try {
            const carrito = await super.getByID(id)
            if (carrito) {
                for (let i=0; i<arrID.length; i++) {
                    let prod = await prodcutsdb.getByID(arrID[i])
                    carrito.products.push(prod)
                    
                }
                await super.updateById(id, carrito)
                res.status(200).json({ messaje: 'productos agregados con exito'})
            } else {
                res.status(400).json({ error: 'carrito no encontrado' })
            }
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }
}

export default CarritosDaoArchivo