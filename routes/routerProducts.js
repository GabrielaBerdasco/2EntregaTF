import express from 'express'
import { Router } from 'express'

import Container from '../controllers/container.js'
import { products as prod } from '../controllers/listProducts.js'
import { login } from '../middleware/middlewareLogin.js'

const routerProducts = Router()

routerProducts.use(express.json())
routerProducts.use(express.urlencoded({ extended: true }))

const products = new Container('./db/products.txt')
products.writeFile(prod)

routerProducts.get('/:id?', async (req, res) => {
    const { id } = req.params
    id ? res.json(await products.getById(parseInt(id))) : res.json(await products.getAll())
})

routerProducts.post('/', async (req, res) => {
    let product = req.body
    res.json(await products.saveObject(product))
})

routerProducts.put('/:id', async (req, res) => {
    const { id } = req.params
    const newObject = req.body
    res.json(products.modifyObject(parseInt(id), newObject))
})

routerProducts.delete('/:id', async(req, res) => {
    const { id } = req.params
    res.json(await products.deleteById(parseInt(id)))
})

export default routerProducts