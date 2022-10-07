import mongoose from 'mongoose'
import config from '../config.js'
import { asPOJO, renameField, removeField } from '../utils/objectUtils.js'

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async getAll(){
        await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
        try{
            const respuesta = await this.coleccion.find().sort({id: 1})
            mongoose.connection.close()
            return respuesta
        }catch(err){
            return []     
        }
    }

    async getById(req, res){
        const id = parseInt(req.params.id);
        await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
        try{
            const respuesta = await this.coleccion.find({id:{$eq: `${id}`}})
            console.log(respuesta)
            mongoose.connection.close()
            if(respuesta.length === 0) {
                throw new Error(`No se ecuentra el ID: ${err}`)
            }else {
                return respuesta
            }
        }catch(err){
            throw new Error(`Error leer el ID de archivo: ${err}`)
        }
    }

    async save(newObj){
        try {
            let doc = await this.coleccion.create(newObj);
            doc = asPOJO(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async putById(x,newObj){
        await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
        try{
            await this.coleccion.replaceOne({id:{$eq: `${x}`}} ,newObj)
            mongoose.connection.close()
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        } 
    }

    async deleteById(req, res){
        const id = parseInt(req.params.id);
        await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
        try{
            await this.coleccion.deleteOne({id:{$eq: `${id}`}})
            mongoose.connection.close()
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }

    async deleteAll(){
        await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
        try{
            await this.coleccion.deleteMany({})
            mongoose.connection.close()
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }
}

export default ContenedorMongoDb;