
class FirebaseProdContainer{
    constructor(db, collectionName){
        this.db = db;
        this.query = this.db.collection(collectionName);
    }

    async writeFile(data) {
        try {
            await data.map( (products) => {
                const doc = this.query.doc(`${products.id}`);
                doc.create(products);
            });
            console.log("Datos escritos");
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
            const element = await this.query.doc(`${idNumber}`);
            const doc = await element.get();
            const response = doc.data()
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const elements = await this.query.get();
            const docs = elements.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                date: doc.data().date,
                image: doc.data().image,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price,
                stock: doc.data().stock,
                code: doc.data().code,
            }));
            console.log(response);
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