import express from 'express'
import routerProducts from './routes/routerProducts.js'
import routerCart from './routes/routerCart.js'

const app = express()

app.use('/api/products', routerProducts)
app.use('/api/cart', routerCart)

app.use(express.static('public'))

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))