import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
    id: string
    name: string
    type: 'phone' | 'computer'
    price: number
    rating: number
    warrantyYears: number
    available: boolean
}

const ProductSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['phone', 'computer'], required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    warrantyYears: { type: Number, required: true },
    available: { type: Boolean, required: true }
})

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema)

export default ProductModel
