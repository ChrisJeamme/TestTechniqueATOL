import mongoose, { CallbackError } from 'mongoose'

require('dotenv').config()

const connect = async () => {
    mongoose
        .connect(process.env.DB_URI as string, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .catch((err) => console.log(err))

    const db = mongoose.connection

    db.on('error', function (err: CallbackError) {
        console.log('Connection error on database', err)
    })

    db.on('connected', function () {
        console.log('Connected to MongoDB.')
    })

    db.on('reconnected', function () {
        console.log('Reconnected to MongoDB')
    })

    db.on('disconnected', function () {
        console.log('Mongoose connection disconnected')
    })

    process.on('SIGINT', function () {
        db.close(function () {
            console.log('Mongoose disconnecting...')
            process.exit(0)
        })
    })

    module.exports = function (onceReady: any) {
        db.on('open', onceReady)
    }
}

export default connect
