
import { Document } from 'mongoose'; // Import Document from Mongoose
// import { File } from 'multer'; // Import Multer.File type
import { Express,Request } from 'express';

declare module 'express' {
  interface Request {
    id?: string; // Optional property 'id'
  }
}