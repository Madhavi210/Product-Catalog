import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
}