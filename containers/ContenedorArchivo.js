import { promises as fs } from 'fs'
import config from '../config.js'

class ContenedorArchivo{
    constructor(fileData){
        this.fileData = `${config.fileSystem.path}/${fileData}`;
    }
    
    
    async deleteAll(){
        try{
            await fs.writeFile(this.fileData, JSON.stringify([], null, 2))    
        }catch(error){
            throw new Error(`Error al eliminar el archivo: ${error}`)
        }            
    }

    async deleteById(req, res){
        const id = req.params.id;
        const objs = await this.getAll();
        const index = objs.findIndex(o => o.id == id);
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }else{
            objs.splice(index, 1)
            try {
                await fs.writeFile(this.fileData, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al borrar: ${error}`)
            }
        }   
    }

    async getAll(){
        try{
            const objetos = await fs.readFile(this.fileData,'utf-8');
            return JSON.parse(objetos);
        }catch(err){
            return []
        } 
    }

    async getById(req, res){
        const id = req.params.id;
        try{
            const productos = await this.getAll();
            const buscado = productos.find(producto => producto.id == id);   
            if(!buscado){
                throw new Error(`Error: no se encontró el id ${id}`)  
            }else{
                return buscado;
            }         
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`);
        } 
    } 
    
    async save(newObj){
        console.log(newObj);
        const objetos = await this.getAll();
        objetos.push(newObj);
        try{
            await fs.writeFile(this.fileData,JSON.stringify(objetos, null,2))
            return newObj;  
        }catch(error){
            throw new Error(`Error al guardar: ${error}`)
        }
    }
    async saveAll(newArray){
        try{
            await fs.writeFile(this.fileData,JSON.stringify(newArray, null,2))    
        }catch(error){
            throw new Error(`Error al guardar el archivo: ${error}`)
        } 
    }
    
    async update(elem){
        const objs = await this.getAll()
        const index = objs.findIndex(o => o.id == elem.id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            objs[index] = elem
            try {
                await fs.writeFile(this.fileData, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al actualizar: ${error}`)
            }
        }
    }
}

export default ContenedorArchivo;