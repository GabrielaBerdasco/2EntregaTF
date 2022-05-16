
class FirebaseProdContainer{
    constructor(db, collectionName){
        this.db = db;
        this.query = this.db.collection(collectionName);
    }

    async writeFile(data) {
        try {
            const doc = this.query.doc(`${data.id}`);
            await doc.create(data);
            console.log("Datos escritos");   
        } catch (error) {
            console.log(error);
        }
    }

    async readFile() {
        try {
            let cart = await this.query.get();
            let docs = cart.docs;
            const response = docs.map((doc) => ({
                date: doc.date,
                image: doc.image,
                name: doc.name,
                description: doc.description,
                price: doc.price,
                stock: doc.stock,
                code: doc.code,
            }));
            return response;   
        } catch (error) {
            console.log(error);
        }
    }

    async saveObject(pData) {
        try {
            const savedElement = await this.query.create(pData);
            console.log("Producto guardado" + savedElement);
        } catch (error) {
            console.log(error);            
        }
    }

    async modifyObject(idNumber, pObj) {
        try {
            const savedElement = await this.query.update(idNumber, pObj);
            console.log("Producto modificado: " + savedElement);   
        } catch (error) {  
            console.log(error);
        }
    }

    async getById(idNumber) {
        try {
            const element = await this.query.get(idNumber);
            console.log(element);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const elements = await this.query.get();
            console.log(elements);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(idNumber) {
        try {
            await this.query.delete(idNumber);
            console.log("Elemento con id: " + idNumber + "eliminado");
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await this.query.delete();
            console.log("Todos los elementos eliminados");
        } catch (error) {
            console.log(error);
        }
    }
}

export default FirebaseProdContainer;