export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string; // password should be optional for safety
    role: string;
    token?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }