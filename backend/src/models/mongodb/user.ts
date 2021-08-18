import { model, Schema } from "mongoose";
import { UserDocument } from "../documents";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
const { Types } = Schema;

const UserSchema = new Schema(
    {
        username: {
            type: Types.String,
            required: true
        },
        password: {
            type: Types.String,
            required: true
        },
        torreUsername: {
            type: Types.String,
            required: true
        },
        name: {
            firstName: {
                type: Types.String,
                required: true,
                default: ""
            },
            lastName: {
                type: Types.String,
                required: true,
                default: ""
            }
        },
        lastLogin: {
            type: Types.Date,
            required: false
        }
    },
    {
        timestamps: true
    }
);

UserSchema.pre<UserDocument>('findOneAndUpdate' as any, async function findOneAndUpdate(next) {
    try {

        const data = (this as any).getUpdate();
        if (data.password) {
            const salt = genSaltSync(10);
            data.password = hashSync(data.password, salt);
        }
        next()

    } catch (error) {
        next(error)
    }
});

UserSchema.pre<UserDocument>('save', async function save(next) {
    try {

        if (!this.isModified('password')) {
            return next()
        }

        const salt = genSaltSync(10);
        this.password = hashSync(this.password, salt);

        next()

    } catch (error) {
        next(error)
    }
});

UserSchema.methods.comparePassword = function (candidatePassword: string): boolean {
    return compareSync(candidatePassword, (this as UserDocument).password);
};

export const User = model<UserDocument>('User', UserSchema, "users");