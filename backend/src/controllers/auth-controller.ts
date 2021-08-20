import { Router } from "express";
import { sign } from "jsonwebtoken";
import { jwtSecret } from "../configurations";
import { User } from "../models";
import { authService } from "./../services";

const authController = Router();

authController.post("/login", async (request, response, next) => {
    try {
        const { username, password } = request.body;

        if (!username || !password) return response.status(401).json({ error: true, message: "Both username and password are required to login" });

        let user = await User.findOne({ username });

        if (!user) {
            return response.status(401).json({ error: true, message: "The given user doesn't exists" });
        }

        const userIsAllowed = await authService.userIsAuthorized(user, password);

        if (!userIsAllowed) {
            return response.status(401).json({ error: true, message: "The password is incorrect" });
        }

        user.lastLogin = new Date();
        const payload = {
            _id: user._id,
            username: user.username,
            lastLogin: user.lastLogin,
        };

        user = await user.save();

        user.set('password', undefined);

        if (!jwtSecret) {
            return response.status(500).json({ error: true, message: "Couldn't validate the token" });
        }

        const token = sign(payload, jwtSecret, { expiresIn: '24h' });
        response.json({ error: false, token: `Bearer ${token}`, user})
    } catch (err) {
        next(err);
    }
})

export default authController;
