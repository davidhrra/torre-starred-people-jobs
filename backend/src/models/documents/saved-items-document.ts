import { Document } from "mongoose";
import { SavedItemsTypes } from "../enums";
import { ITimestamp } from "../interfaces";

export interface SavedItemsDocument extends Document, ITimestamp{
    user: string,
    type: SavedItemsTypes,
    torreId: string,
    starred?: boolean
}