import { Request, Response, NextFunction } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import CategoryService from '../service/category.service';
import AppError from '../utils/errorHandler';
import StatusConstants from '../constant/statusConstant';
import { StatusCode } from '../enum/statusCode';
import { ICategory } from '../interface/category.interface';

export default class CategoryController {
    public static async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name } = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const newCategory = await CategoryService.createCategory(name, session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.CREATED).json(newCategory);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    public static async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const categoryId = req.params.id;
        try {
            const category = await CategoryService.getCategoryById(categoryId);
            if (!category) {
                throw new AppError(
                    StatusConstants.NOT_FOUND.body.message,
                    StatusConstants.NOT_FOUND.httpStatusCode
                );
            }
            res.status(StatusCode.OK).json(category);
        } catch (error) {
            next(error);
        }
    }

    public static async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categories = await CategoryService.getAllCategories();
            res.status(StatusCode.OK).json(categories);
        } catch (error) {
            next(error);
        }
    }

    public static async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const categoryId = req.params.id;
        const updates = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const updatedCategory = await CategoryService.updateCategory(categoryId, updates, session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.OK).json(updatedCategory);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    public static async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const categoryId = req.params.id;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await CategoryService.deleteCategory(categoryId, session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.NO_CONTENT).send();
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }
}
