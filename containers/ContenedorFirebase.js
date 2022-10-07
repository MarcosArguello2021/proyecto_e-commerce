import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})
const db = admin.firestore()

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async getAll(){
        try {
            const result = []
            const snapshot = await this.coleccion.get();
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result

        } catch (err) {
            return []
        }
    }

    async getById(req, res){
        const id = req.params.id;
        try {
                const doc = await this.coleccion.doc(id).get()
                if (!doc.exists) {
                    throw new Error(`Error al listar por id: no se encontró`)
                } else {
                    const data = doc.data()
                    return { ...data, id }
                }
            } 
        catch (error) {
                throw new Error(`Error al listar por id: ${error}`)
            }
        }

    async save(newObj){
        try{
            const guardado = await this.coleccion.add(newObj[0]);
            return { ...newObj, id: guardado.id }
        }catch(error){
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async deleteById(req, res){
        const id = req.params.id;
        console.log(id)
        try{
            const res = await this.coleccion.doc(id).delete();
            return res;
        }catch(error){
            throw new Error(`Error al eliminar el objeto del archivo: ${error}`)
        }
    }

    async deleteAll(){
        try{
            let objetos = await this.getAll()
            for(let i = 0; i < objetos.length; i++){
                await this.coleccion.doc(`${objetos[i].id}`).delete()
            }
        }catch(error){
            throw new Error(`Error al eliminar el objeto del archivo: ${error}`)
        }
    }

    async putById(id,newObj){
        try{
            await this.coleccion.doc(`${id}`).update(newObj)
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        } 
    }

}
export default ContenedorFirebase