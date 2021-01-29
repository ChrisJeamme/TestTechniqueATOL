import express from 'express'
import bodyParser from 'body-parser'
import productRoute from './routes/product'
import connectDatabase from './database/connect'
import { logger } from './utils/log.utils'
import cors from 'cors'
import jwt from 'express-jwt'
var jwtGen = require('jsonwebtoken')

// Environnement variable management
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// Enable the middleware parser for requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({}))

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))

// API Routing

// Auth parameters
app.use(
    jwt({
        secret: process.env.JWT_SECRET as string,
        algorithms: ['HS256']
    }).unless({ path: ['/token'] })
)

// Auth error management
app.use((err: any, _req: any, res: any, next: Function) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401)
        logger.error(err.name + ': ' + err.message)
        res.json({ message: err.name + ': ' + err.message })
    } else next(err)
})

// Token generation
app.get('/token', (_req, res) => {
    res.status(200).json({
        token: jwtGen.sign({ foo: 'bar' }, process.env.JWT_SECRET)
    })
})

// Products routes
app.use('/products', productRoute)

// DB Connection
connectDatabase().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server is running at https://localhost:${PORT}`)
    })
})
