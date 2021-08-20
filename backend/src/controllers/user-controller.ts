import axios from "axios";
import { Router } from "express";
import { baseTorreBiosUrl, torreBaseOpportunitiesUrl } from "../configurations";
import { userService } from "./../services";

const userController = Router();

userController.post("/", async (request, response, next) => {
    try {
        const { user } = request.body;

        if (!user.username) return response.status(400).json({ error: true, message: "The username is a required value" });
        if (!user.password) return response.status(400).json({ error: true, message: "The password is a required value" });
        if (!user.torreUsername) return response.status(400).json({ error: true, message: "The torreUsername is a required value" });

        if (!baseTorreBiosUrl) return response.status(500).json({ error: true, message: "No variable 'baseTorreBiosUrl' found" });

        try {
            await axios.get(`${baseTorreBiosUrl}/api/bios/${user.torreUsername}`);
        } catch (err) {
            return response.status(500).json({ error: true, message: `No user found in torre with username ${user.torreUsername}` });
        }

        const createdUserPayload = await userService.createUser(user);

        if (createdUserPayload.error) return response.status(400).json({ error: createdUserPayload.error, message: createdUserPayload.message });

        return response.status(200).json({ error: false, user: createdUserPayload.user });

    } catch (err) {
        next(err);
    }
});

userController.get("/torre/:username", async (request, response, next) => {
    try {
        const { username } = request.params;
        let axiosResponse: any = null;

        try {
            axiosResponse = await axios.get(`${baseTorreBiosUrl}/api/bios/${username}`);
        } catch (err) {
            return response.status(500).json({ error: true, message: `No user found in torre with username ${username}` });
        }

        return response.status(200).json({ error: false, user: axiosResponse.data.person });

    } catch (err) {
        next(err);
    }
});

userController.get("/torre/job/:id", async (request, response, next) => {
    try {
        const { id } = request.params;
        let axiosResponse: any = null;

        try {
            axiosResponse = await axios.get(`${torreBaseOpportunitiesUrl}/api/suite/opportunities/${id}`);
        } catch (err) {
            return response.status(500).json({ error: true, message: `No job found in torre with id ${id}` });
        }

        return response.status(200).json({ error: false, job: axiosResponse.data });

    } catch (err) {
        next(err);
    }
});

export default userController;