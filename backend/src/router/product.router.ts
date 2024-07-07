import express from 'express';
import ProductController from '../controller/product.controller';
import Authentication from '../middleware/authentication';

export default class ProductRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    // POST /api/products - Create a new product
    this.router.post('/', Authentication.authUser , ProductController.createProduct);

    // GET /api/products/:id - Get product by ID
    this.router.get('/:id' ,ProductController.getProductById);

    // DELETE /api/products/:id - Delete product by ID
    this.router.delete('/:id'  ,Authentication.authUser, Authentication.authAdmin, ProductController.deleteProduct);

    // PUT /api/products/:id - Update product by ID
    this.router.put('/:id',Authentication.authUser, Authentication.authAdmin, ProductController.updateProduct);

    // GET /api/products - Get all products
    this.router.get('/', ProductController.getAllProducts);

    this.router.get('/categorized', ProductController.categorizedProducts);

  }

  public getRouter() {
    return this.router;
  }
}
