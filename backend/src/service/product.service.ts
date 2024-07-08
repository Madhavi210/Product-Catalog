// src/services/product.service.ts
import { ClientSession } from 'mongoose';
import { Product } from '../model/product.model';
import { IProduct } from '../interface/product.interface';
import AppError from '../utils/errorHandler';
import StatusConstants from '../constant/statusConstant';

export default class ProductService {
    public static async createProduct(
        name: string,
        description: string,
        imageUrl: string,
        price: number,
        categoryId: string,
        session: ClientSession
    ): Promise<IProduct> {
        const newProduct = new Product({
            name,
            description,
            imageUrl,
            price,
            categoryId
        });

        await newProduct.save({ session });
        return newProduct.toObject(); 
    }

    public static async getProductById(id: string): Promise<IProduct | null> {
        return Product.findById(id).exec();
    }

    public static async getAllProducts(): Promise<IProduct[]> {
        return Product.find().exec();
    }

    public static async updateProduct(
        id: string,
        updates: Partial<IProduct>,
        session: ClientSession
    ): Promise<IProduct | null> {
        const product = await Product.findByIdAndUpdate(id, updates, { new: true, session }).exec();
        if (!product) {
            throw new AppError(
                StatusConstants.NOT_FOUND.body.message,
                StatusConstants.NOT_FOUND.httpStatusCode
            );
        }
        return product.toObject();
    }

    public static async deleteProduct(id: string, session: ClientSession): Promise<void> {
        const product = await Product.findByIdAndDelete(id).session(session).exec();
        if (!product) {
            throw new AppError(
                StatusConstants.NOT_FOUND.body.message,
                StatusConstants.NOT_FOUND.httpStatusCode
            );
        }
    }

    public static async getCategorizedProducts(): Promise<any[]> {
            const categorizedProducts = await Product.aggregate([
                {
                    $group: {
                        _id: '$categoryId', // Group by category ID
                        categoryName: { $first: '$categoryName' }, // Assume categoryName field in Product schema
                        products: {
                            $push: {
                                _id: '$_id',
                                name: '$name',
                                description: '$description',
                                imageUrl: '$imageUrl',
                                price: '$price'
                            }
                        }
                    }
                }
            ]);
            return categorizedProducts;
    }

}
