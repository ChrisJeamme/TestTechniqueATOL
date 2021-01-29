import {
    createProduct,
    modifyProduct,
    replaceProduct
} from './../database/product'
import { productParamVerification } from '../functions/product.functions'
import { TProduct } from './../@types/product.type'
import { TProducts } from './../@types/products.type'
import { deleteProduct, getAllProducts, getProduct } from '../database/product'
import express from 'express'
import NotFoundError from '../errors/notfound.error'
import InvalidParameterError from '../errors/invalidparameter.error'
import { logger } from '../utils/log.utils'
const router = express.Router()

router.get('/:id', (req, res) => {
    logger.trace('API CALL - Get a product with id')
    const id = req.params.id as string
    getProduct(id)
        .then((product: TProduct) => {
            logger.trace('Success')
            res.status(200)
                .json({
                    product: product
                })
                .end()
        })
        .catch((err) => {
            if (err instanceof NotFoundError) {
                return res.status(404).json({ message: 'Error : Not found' })
            }
            res.status(400)
                .json({
                    message: 'Product list get error : ' + err.message
                })
                .end()
        })
})

router.get('/', (_req, res) => {
    logger.trace('API CALL - Get all products')
    getAllProducts()
        .then((list: TProducts) => {
            logger.trace('Success')
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

router.post('/', (req, res) => {
    logger.trace('API CALL - Create a product')
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
            return res
                .status(500)
                .json({ message: 'Error : Internal Server Error' })
        }
    }

    const productData = {
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        rating: req.body.rating,
        warrantyYears: req.body.warrantyYears,
        available: req.body.available
    }

    createProduct(productData)
        .then((_: any) => {
            logger.trace('Success')
            return res.status(200).json({ message: 'Product created' })
        })
        .catch((err: Error) => {
            res.status(400).json({
                message: 'Add product error : ' + err.message
            })
        })
})

router.patch('/:id', (req, res) => {
    logger.trace('API CALL - Update a product')
    const id = req.params.id as string
    const field = Object.keys(req.body)[0] as string
    const value = req.body[field] as string
    if (field === undefined) {
        return res
            .status(422)
            .json({ message: 'Unprocessable Entity - Parameter problem' })
    }
    if (value === undefined) {
        return res
            .status(422)
            .json({ message: 'Unprocessable Entity - Parameter problem' })
    }

    modifyProduct(id, field, value)
        .then((_: any) => {
            logger.trace('Success')
            return res.status(200).json({ message: 'Product updated' })
        })
        .catch((err: Error) => {
            res.status(400).json({
                message: 'Add product error : ' + err.message
            })
        })
})

router.put('/:id', (req, res) => {
    logger.trace('API CALL - Replace a product')
    const id = req.params.id as string
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
            res.status(500).json({ message: 'Error : Internal Server Error' })
        }
    }

    const productData = {
        id: id,
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        rating: req.body.rating,
        warrantyYears: req.body.warrantyYears,
        available: req.body.available
    }

    replaceProduct(productData)
        .then((_: any) => {
            logger.trace('Success')
            return res.status(201).json({
                message: 'Product replaced'
            })
        })
        .catch((err: Error) => {
            res.status(400).json({
                message: 'Put product error : ' + err.message
            })
        })
})

router.delete('/:id', (req, res) => {
    logger.trace('API CALL - Delete a product')
    const id = req.params.id as string
    deleteProduct(id)
        .then((_result) => {
            logger.trace('Success')
            return res.status(200).json({ message: 'Product deleted' })
        })
        .catch((err) => {
            if (err instanceof NotFoundError) {
                return res.status(404).json({ message: 'Error : Not found' })
            } else {
                return res
                    .status(500)
                    .json({ message: 'Error : Internal Server Error' })
            }
        })
})

// Method not allowed

router.put('/', (_req, res) => {
    return res.status(405).json({ message: 'Error : Method Not Allowed' })
})
router.patch('/', (_req, res) => {
    return res.status(405).json({ message: 'Error : Method Not Allowed' })
})
router.delete('/', (_req, res) => {
    return res.status(405).json({ message: 'Error : Method Not Allowed' })
})

export default router
