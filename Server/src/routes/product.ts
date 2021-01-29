import { createProduct, modifyProduct } from './../database/product'
import { productParamVerification } from '../functions/product.functions'
import { TProduct } from './../@types/product.type'
import { TProducts } from './../@types/products.type'
import { deleteProduct, getAllProducts, getProduct } from '../database/product'
import express from 'express'
import NotFoundError from '../errors/notfound.error'
import InvalidParameterError from '../errors/invalidparameter.error'
const router = express.Router()

router.get('/:id', (req, res) => {
    console.log('API CALL - Get a product with id')
    const id = req.params.id as string
    getProduct(id)
        .then((product: TProduct) => {
            res.status(200)
                .json({
                    product: product
                })
                .end()
        })
        .catch((err) => {
            if (err instanceof NotFoundError) {
                return res.sendStatus(404)
            }
            res.status(400)
                .json({
                    message: 'Product list get error : ' + err.message
                })
                .end()
        })
})

router.get('/', (_req, res) => {
    console.log('API CALL - Get all products')
    getAllProducts()
        .then((list: TProducts) => {
            res.status(200)
                .json({
                    products: list
                })
                .end()
        })
        .catch((err) => {
            res.status(400)
                .json({
                    message: 'Product list get error : ' + err.message
                })
                .end()
        })
})

router.delete('/:id', (req, res) => {
    console.log('API CALL - Delete a product')
    const id = req.params.id as string
    deleteProduct(id)
        .then((_result) => {
            return res.sendStatus(200)
        })
        .catch((err) => {
            if (err instanceof NotFoundError) {
                return res.sendStatus(404)
            } else {
                return res.sendStatus(400)
            }
        })
})

router.post('/', (req, res) => {
    console.log('API CALL - Create a product')
    try {
        productParamVerification(req.body)
    } catch (err) {
        if (err instanceof InvalidParameterError) {
            return res.status(422).send({
                message: 'Validation error in the request',
                error: {
                    message: 'The field is undefined',
                    field: err.message
                }
            })
        } else {
            return res.sendStatus(400)
        }
    }

    const productData = {
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        rating: req.body.rating,
        warrantyYears: req.body.warranty_years,
        available: req.body.available
    }

    createProduct(productData)
        .then((_: any) => {
            return res.sendStatus(201)
        })
        .catch((err: Error) => {
            res.status(400).json({
                message: 'Add product error : ' + err.message
            })
        })
})

router.patch('/:id', (req, res) => {
    console.log('API CALL - Update a product')
    const id = req.params.id as string
    const op = req.params.op as string
    const field = req.params.field as string
    const value = req.query[field] as string
    if (value === undefined) {
        return res.sendStatus(422)
    }

    modifyProduct(id, field, value)
        .then((_: any) => {
            return res.sendStatus(200)
        })
        .catch((err: Error) => {
            res.status(400).json({
                message: 'Add product error : ' + err.message
            })
        })
})

// Method not allowed

router.put('/', (_req, res) => {
    return res.sendStatus(405)
})
router.patch('/', (_req, res) => {
    return res.sendStatus(405)
})
router.delete('/', (_req, res) => {
    return res.sendStatus(405)
})

export default router
