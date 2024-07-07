import { Request, Response, NextFunction } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import ProductService from '../service/product.service';
import AppError from '../utils/errorHandler';
import StatusConstants from '../constant/statusConstant';
import { StatusCode } from '../enum/statusCode';
import { IProduct } from '../interface/product.interface';

export default class ProductController {
    public static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name, description, imageUrl, price, categoryId } = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const newProduct = await ProductService.createProduct(name, description, imageUrl, price, categoryId, session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.CREATED).json(newProduct);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    public static async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const productId = req.params.id;
        try {
            const product = await ProductService.getProductById(productId);
            if (!product) {
                throw new AppError(
                    StatusConstants.NOT_FOUND.body.message,
                    StatusConstants.NOT_FOUND.httpStatusCode
                );
            }
            res.status(StatusCode.OK).json(product);
        } catch (error) {
            next(error);
        }
    }

    public static async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products = await ProductService.getAllProducts();
            res.status(StatusCode.OK).json(products);
        } catch (error) {
            next(error);
        }
    }

    public static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const productId = req.params.id;
        const updates = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const updatedProduct = await ProductService.updateProduct(productId, updates, session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.OK).json(updatedProduct);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    public static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const productId = req.params.id;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await ProductService.deleteProduct(productId, session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.NO_CONTENT).send();
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    
    public static async categorizedProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categorizedProducts = await ProductService.getCategorizedProducts();
            res.status(StatusCode.OK).json(categorizedProducts);
        } catch (error) {
            next(error);
        }
    }
}
