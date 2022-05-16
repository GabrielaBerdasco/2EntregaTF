import express from 'express'
import { Router } from 'express'

import { cartsDao as cartsApi } from '../daos/index.js'
import { products as prod } from '../controllers/listProducts.js'


const routerCart = Router()

routerCart.use(express.json())
routerCart.use(express.urlencoded({ extended: true }))


cartsApi.writeFile([])

routerCart.post('/', async (req, res) => {
    res.json(await cartsApi.createCart())
})

routerCart.delete('/:id', async(req, res) => {
    const { id } = req.params
    res.json(await cartsApi.deleteCart(id))
})

routerCart.get('/:id/products', async (req, res) => {
    const { id } = req.params
    res.json(await cartsApi.listProducts(id))
})

routerCart.post('/:id/products', async (req, res) => {
    const { id } = req.params
    const { productId } = req.body
    const product = prod.find(p => p.id == productId)
    if(product){
    res.json(await cartsApi.addProductToCart(id, product))
    } else {
        res.json({ error: 'Producto no encontrado' })
        console.log('Producto no encontrado');
    }
})

routerCart.delete('/:id/products/:idProduct', async (req, res) => {
    const { id, idProduct } = req.params
    res.json(await cartsApi.deleteProductFromCart(id, idProduct))
})



export default routerCart