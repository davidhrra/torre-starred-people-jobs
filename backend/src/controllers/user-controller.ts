import { Router } from "express";
import { userService } from "./../services";

const userController = Router();

userController.post("/", async (request, response, next) => {
    try {
        const { user } = request.body;

        if(!user.username) return response.status(400).json({error: true, message: "The username is a required value"});
        if(!user.password) return response.status(400).json({error: true, message: "The password is a required value"});
        if(!user.torreUsername) return response.status(400).json({error: true, message: "The torreUsername is a required value"});
        if(!user.name) return response.status(400).json({error: true, message: "The name is a required value"});

        const createdUserPayload = await userService.createUser(user);

        if(createdUserPayload.error) return response.status(400).json({error: createdUserPayload.error, message: createdUserPayload.message});

        return response.status(200).json({error: false, user: createdUserPayload.user});

    } catch (err) {
        next(err);
    }
});

export default userController;