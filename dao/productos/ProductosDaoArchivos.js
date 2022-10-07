import ContenedorArchivo from "../../containers/ContenedorArchivo.js"

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('productos.txt')
    }
}

export default ProductosDaoArchivo