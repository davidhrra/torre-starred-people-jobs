import { AuthService } from './auth-service';
import { SavedItemsService } from './saved-items-service';
import { UserService } from './user-service';

export * from './user-service';
export * from './auth-service';
export * from './saved-items-service';

export const userService = new UserService();
export const authService = new AuthService();
export const savedItemsService = new SavedItemsService();