import express from "express";
import Database from "./db/db";
import cors from "cors";
import errorHandlerMiddleware from "./handler/errorHandler";
import UserRouter from "./router/user.router";
import ProductRouter from "./router/product.router";
import CategoryRouter from "./router/category.router";
import path, { dirname } from "path";

export default class App {
    private app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.connect();
        this.routes();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        
        this.app.use('/uploads', express.static(path.join(__dirname, 'uploads') ));        
    }

    private connect(): void {
        new Database();
    }

    private routes(): void {
        const userRoute = new UserRouter().getRouter();
        const productRoute = new ProductRouter().getRouter();
        const categoryRoute = new CategoryRouter().getRouter();

        this.app.use("/api/user", userRoute);
        this.app.use("/api/product", productRoute);
        this.app.use("/api/category", categoryRoute);

        this.app.use(errorHandlerMiddleware);
    }

    public start(port: string | undefined): void {
        this.app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
    }

}
