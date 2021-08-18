import { Router } from "express";
import { JWTMiddleware } from "../utils";
import { savedItemsService } from "./../services";

const savedItemsController = Router();

savedItemsController.use(JWTMiddleware);

savedItemsController.get("/:userId", async (request, response, next) => {
    try {
        const { userId } = request.params;

        const savedItems = await savedItemsService.getSavedItemsByUserId(userId);

        return response.status(200).json({ error: false, item: savedItems });

    } catch (err) {
        next(err);
    }
});

savedItemsController.delete("/:id", async (request, response, next) => {
    try {
        const { id } = request.params;

        const deletedItem = await savedItemsService.deleteSavedItemById(id);

        return response.status(200).json({ error: false, item: deletedItem });

    } catch (err) {
        next(err);
    }
});

savedItemsController.put("/:id", async (request, response, next) => {
    try {
        const { id } = request.params;
        const { item } = request.body;

        if(!item.type) return response.status(400).json({error: true, message: "The type is a required value"});
        if(!item.user) return response.status(400).json({error: true, message: "The user is a required value"});
        if(!item.torreId) return response.status(400).json({error: true, message: "The torreId is a required value"});

        const editedItem = await savedItemsService.editSavedItemById(id, item);

        return response.status(200).json({ error: false, item: editedItem });

    } catch (err) {
        next(err);
    }
});

savedItemsController.post("/", async (request, response, next) => {
    try {
        const { item } = request.body;

        if(!item.type) return response.status(400).json({error: true, message: "The type is a required value"});
        if(!item.user) return response.status(400).json({error: true, message: "The user is a required value"});
        if(!item.torreId) return response.status(400).json({error: true, message: "The torreId is a required value"});

        const editedItem = await savedItemsService.createdSavedItem(item);

        return response.status(200).json({ error: false, item: editedItem });

    } catch (err) {
        next(err);
    }
});



export default savedItemsController;