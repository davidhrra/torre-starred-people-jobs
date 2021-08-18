import { Document } from "mongoose";
import { ITimestamp } from "../interfaces";

export interface UserDocument extends Document, ITimestamp{
    username: string,
    password: string,
    torreUsername: string,
    name: {
        firstName: string,
        lastName: string
    },
    lastLogin: Date,
    comparePassword(candidatePassword: string): boolean
}