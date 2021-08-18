import { NextFunction, Request, Response } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { jwtSecret } from "../configurations";
import { User } from "../models";

export const JWTMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const headerToken = <string>request.headers["authorization"];

    if (!headerToken || !headerToken.includes("Bearer ")) {
        return response.status(401).json({ error: true, message: "Invalid token" });
    }

    if (!jwtSecret) {
        return response.status(401).json({ error: true, message: "Couldnt validate the token" });
    }

    const token = headerToken.split("Bearer ")[1];
    const jwtPayload = <JwtPayload>verify(token, jwtSecret);
    response.locals.user = jwtPayload;
    const user = await User.findById(jwtPayload!._id, '-password');

    if (!user) {
        return response.status(401).json({ error: true, message: "The given user doesnt exists" });
    }

    response.locals.decodedUser = user;
    const dbLastLogin = Number(
        (user.lastLogin.getTime() / 1000).toString().replace(/\.\d+/, "")
    );

    if (dbLastLogin > jwtPayload!.iat!) {
        return response.status(401).json({ message: "Invalid token" });
    }
    const { userId, username } = jwtPayload;

    const newToken = sign({ userId, username }, jwtSecret, {
        expiresIn: "24h",
    });

    response.setHeader("token", newToken);
    next();
};