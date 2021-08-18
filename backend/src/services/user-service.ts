import { User, UserDocument } from "../models";

export class UserService {
    async createUser(user: UserDocument): Promise<{error: boolean, message?: string, user?: UserDocument}> {

        const { username } = user;
        const userIsCreated = await User.findOne({ username });

        if (userIsCreated) {
            return { error: true, message: "There's already a user created with the given username" };
        }

        const createdUser = await new User(user).save();

        createdUser.set('password', undefined);

        return { error: false, user: createdUser};

    }
}