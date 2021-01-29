import { TProduct } from '../@types/product.type'
import { TProducts } from '../@types/products.type'
import ProductModel from '../models/product'
import NotFoundError from '../errors/notfound.error'
import mongoose from 'mongoose'

export const getAllProducts = async () => {
    return await ProductModel.find()
        .exec()
        .then((list: TProducts | null) => {
            if (!list) {
                return []
            }
            return list
        })
}

export const getProduct = async (id: string) => {
    return await ProductModel.findOne({ id: id })
        .exec()
        .then((product: TProduct | null) => {
            if (!product) {
                throw new NotFoundError('Product')
            }
            return product
        })
}

export const deleteProduct = async (id: string) => {
    return await ProductModel.deleteOne({ id: id })
        .exec()
        .then((result) => {
            if (result.n === 0) {
                throw new NotFoundError('Product')
            }
        })
}

export const createProduct = async (productData: any) => {
    productData.id = mongoose.Types.ObjectId()
    return await new ProductModel(productData).save((err: any) => {
        if (err) {
            throw new Error('Add product error : ' + err?.message)
        }
    })
}

export const replaceProduct = async (productData: any) => {
    return await ProductModel.updateOne({ id: productData.id }, productData)
        .exec()
        .then(
            (result) => {
                if (result.n === 0) {
                    throw new NotFoundError('Product')
                }
                if (result.ok === 0) {
                    throw new Error('Put product not modified')
                }
            },
            (err) => {
                throw new Error('Put product error : ' + err.message)
            }
        )
}

export const modifyProduct = async (id: string, field: string, value: any) => {
    return await ProductModel.findOne({ id: id })
        .exec()
        .then((product: any) => {
            if (!product) {
                throw new NotFoundError('Product')
            }
            switch (field) {
            case 'name':
                product.name = value
                break
            case 'type':
                product.type = value
                break
            case 'price':
                product.price = value
                break
            case 'rating':
                product.rating = value
                break
            case 'warranty_years':
                product.warrantyYears = value
                break
            case 'available':
                product.available = value
                break
            }
            product.save()
            return product
        })
}
