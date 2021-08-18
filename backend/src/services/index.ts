import { AuthService } from './auth-service';
import { UserService } from './user-service';

export * from './user-service';
export * from './auth-service';

export const userService = new UserService();
export const authService = new AuthService();