// src/services/category.service.ts
import { ClientSession } from 'mongoose';
import { Category } from '../model/category.model';
import { ICategory } from '../interface/category.interface';
import AppError from '../utils/errorHandler';
import StatusConstants from '../constant/statusConstant';

export default class CategoryService {
    public static async createCategory(
        name: string,
        session: ClientSession
    ): Promise<ICategory> {
        const existingCategory = await Category.findOne({ name }).session(session);
        if (existingCategory) {
            throw new AppError(
                StatusConstants.DUPLICATE_KEY_VALUE.body.message,
                StatusConstants.DUPLICATE_KEY_VALUE.httpStatusCode
            );
        }

        const newCategory = new Category({
            name
        });

        await newCategory.save({ session });
        return newCategory.toObject(); // Convert Mongoose document to plain object
    }

    public static async getCategoryById(id: string): Promise<ICategory | null> {
        return Category.findById(id).exec();
    }

    public static async getAllCategories(): Promise<ICategory[]> {
        return Category.find().exec();
    }

    public static async updateCategory(
        id: string,
        updates: Partial<ICategory>,
        session: ClientSession
    ): Promise<ICategory | null> {
        const category = await Category.findByIdAndUpdate(id, updates, { new: true, session }).exec();
        if (!category) {
            throw new AppError(
                StatusConstants.NOT_FOUND.body.message,
                StatusConstants.NOT_FOUND.httpStatusCode
            );
        }
        return category.toObject();
    }

    public static async deleteCategory(id: string, session: ClientSession): Promise<void> {
        const category = await Category.findByIdAndDelete(id).session(session).exec();
        if (!category) {
            throw new AppError(
                StatusConstants.NOT_FOUND.body.message,
                StatusConstants.NOT_FOUND.httpStatusCode
            );
        }
    }
}
