import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: Schema.Types.ObjectId;

}