import { model, Schema } from "mongoose";
import { SavedItemsDocument } from "../documents";
import { SavedItemsTypes } from "../enums";
const { Types } = Schema;

const SavedItemsSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            required: true,
            ref: 'User'
        },
        type: {
            type: Types.String,
            required: true,
            enum: Object.values(SavedItemsTypes)
        },
        torreId: {
            type: Types.String,
            required: true
        },
        starred: {
            type: Types.Boolean,
            required: false,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const SavedItems = model<SavedItemsDocument>('SavedItem', SavedItemsSchema, "savedItems");
