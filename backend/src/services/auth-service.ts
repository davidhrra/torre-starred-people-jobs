import { UserDocument } from "../models";

export class AuthService {
    async userIsAuthorized(user: UserDocument | null, password: string): Promise<boolean> {
        if (!user) {
            return false;
        }

        return user.comparePassword(password);
    }
}