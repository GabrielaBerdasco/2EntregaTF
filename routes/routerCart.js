import express from 'express'
import { Router } from 'express'
import CartContainer from '../controllers/cartController.js'
import { products as prod } from '../controllers/listProducts.js'

const routerCart = Router()

routerCart.use(express.json())
routerCart.use(express.urlencoded({ extended: true }))

const cart = new CartContainer('./db/cart.txt')
cart.writeFile([])

routerCart.post('/', async (req, res) => {
    res.json(await cart.createCart())
})

routerCart.delete('/:id', async(req, res) => {
    const { id } = req.params
    res.json(await cart.deleteCart(id))
})

routerCart.get('/:id/products', async (req, res) => {
    const { id } = req.params
    res.json(await cart.listProducts(id))
})

routerCart.post('/:id/products', async (req, res) => {
    const { id } = req.params
    const { productId } = req.body
    const product = prod.find(p => p.id == productId)
    if(product){
    res.json(await cart.addProductToCart(id, product))
    } else {
        res.json({ error: 'Producto no encontrado' })
        console.log('Producto no encontrado');
    }
})

routerCart.delete('/:id/products/:idProduct', async (req, res) => {
    const { id, idProduct } = req.params
    res.json(await cart.deleteProductFromCart(id, idProduct))
})



export default routerCart