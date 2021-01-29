import express from 'express'
import bodyParser from 'body-parser'
import productRoute from './routes/product'
import connectDatabase from './database/connect'
import { logger } from './utils/log.utils'

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({}))

app.use('/products', productRoute)

connectDatabase().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server is running at https://localhost:${PORT}`)
    })
})
