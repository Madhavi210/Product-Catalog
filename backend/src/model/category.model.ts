import { ICategory } from './../interface/category.interface';
import { Schema, model, Document, Model } from 'mongoose';


const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true }
}, { timestamps: true });


export const Category: Model<ICategory> = model<ICategory>('Category', categorySchema);
