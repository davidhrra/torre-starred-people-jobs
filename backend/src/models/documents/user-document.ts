import { Document } from "mongoose";

export interface UserDocument extends Document{
    username: string,
    password: string,
    torreUsername: string,
    name: {
        firstName: string,
        lastName: string
    }
}