import mongoose, { CallbackError } from 'mongoose'
import { logger } from '../utils/log.utils'

require('dotenv').config()

const connect = async () => {
    mongoose
        .connect(process.env.DB_URI as string, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .catch((err) => logger.error(err))

    const db = mongoose.connection

    db.on('error', function (err: CallbackError) {
        logger.error('Connection error on database', err)
    })

    db.on('connected', function () {
        logger.info('Connected to MongoDB.')
    })

    db.on('reconnected', function () {
        logger.info('Reconnected to MongoDB')
    })

    db.on('disconnected', function () {
        logger.error('Mongoose connection disconnected')
    })

    process.on('SIGINT', function () {
        db.close(function () {
            logger.error('Mongoose disconnecting...')
            process.exit(0)
        })
    })

    module.exports = function (onceReady: any) {
        db.on('open', onceReady)
    }
}

export default connect
