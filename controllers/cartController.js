import fs from 'fs'

class CartContainer{
    constructor(filename){
        this.filename = filename
    }

    async writeFile(data){
        try {
            let dataToString = JSON.stringify(data)
            await fs.promises.writeFile(this.filename, dataToString)
        } catch (error) {
            console.log(error);
        }
    }

    async readFile(){
        let content = await fs.promises.readFile(this.filename, "utf-8")
        let parsedContent = JSON.parse(content)
        return parsedContent
    }

    async createCart(){
        try{
            let cart = await this.readFile()
            let lastId = 0
            let itemsOnArray = cart.length
            if(itemsOnArray > 0){
                lastId = cart[itemsOnArray-1].id
                lastId++
            } else {
                lastId++
            }

            let data = {
                id: lastId,
                timestamp: Date.now(),
                products: [],
            }
            let newArray = [...cart, data]
            this.writeFile(newArray)
            console.log(`Nuevo carrito creado con id: ${lastId}`);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(idNumber){
        try {
            let data = await this.readFile()
            let id = data.find(c => c.id == idNumber)
            let cartArray = data.filter(c => c.id != idNumber)
            console.log(cartArray);
            if(id){
                await this.writeFile(cartArray)
            } else {
                console.log("El carrito no fue encontrado");
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async listProducts(idNumber){
        try {
            let data = await this.readFile()
            let cart = data.find(c => c.id == idNumber)
            if(cart){
                if(cart.products.length > 0) {
                    console.log(cart.products);
                } else {
                    console.log("El carrito esta vacio");
                }
            } else {
                console.log("El carrito no fue encontrado");
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProductToCart(idNumber, product){
        try {
            let data = await this.readFile()
            let filteredCart = data.filter(c => c.id != idNumber)
            let cart = data.find(c => c.id == idNumber)
            if(cart){
                let newArray = [...cart.products, product]
                cart.products = newArray
                let cartArray = [...filteredCart, cart]
                await this.writeFile(cartArray)
                console.log(`Producto con id ${product.id} agregado en carrito`);
            } else {
                console.log("El carrito no fue encontrado");
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProductFromCart(idNumber, idProduct){
        try {
            let data = await this.readFile()
            let cart = data.find(c => c.id == idNumber)
            let unchangedData = data.filter(c => c.id != idNumber)
            if(cart){
                let filteredCart = cart.products.filter(p => p.id != idProduct)
                cart.products = filteredCart
                let cartArray = [...unchangedData, cart]
                await this.writeFile(cartArray)
                console.log(`Producto con id ${idProduct} eliminado de carrito`);
            } else {
                console.log("El carrito no fue encontrado");
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default CartContainer