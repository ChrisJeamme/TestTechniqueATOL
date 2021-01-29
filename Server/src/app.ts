import express from 'express'
import bodyParser from 'body-parser'
import productRoute from './routes/product'
import connectDatabase from './database/connect'
import { logger } from './utils/log.utils'
import cors from 'cors'

// Environnement variable management
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// Enable the middleware parser for requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({}))

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))

// API Route
app.use('/products', productRoute)

// DB Connection
connectDatabase().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server is running at https://localhost:${PORT}`)
    })
})
