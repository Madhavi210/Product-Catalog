import { IProduct } from './../interface/product.interface';
import { Schema, model, Document, Model } from 'mongoose';
import { Category } from './category.model';

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
}, { timestamps: true });


export const Product: Model<IProduct> = model<IProduct>('Product', productSchema);
