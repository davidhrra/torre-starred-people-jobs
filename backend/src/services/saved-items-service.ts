import { SavedItems, SavedItemsDocument } from "../models";

export class SavedItemsService {
    async getSavedItemsByUserId(userId: string): Promise<SavedItemsDocument[]> {
        const savedItems = await SavedItems.find({ user: userId });
        return savedItems;
    }

    async deleteSavedItemById(id: string): Promise<SavedItemsDocument | null> {
        const deletedItem = await SavedItems.findByIdAndDelete(id);
        return deletedItem;
    }

    async editSavedItemById(id: string, savedItem: SavedItemsDocument): Promise<SavedItemsDocument | null> {
        const editedItem = await SavedItems.findByIdAndUpdate(id, savedItem, {new: true});
        return editedItem;
    }

    async createdSavedItem(savedItem: SavedItemsDocument): Promise<SavedItemsDocument> {
        const newSavedItem = await new SavedItems(savedItem).save();
        return newSavedItem;
    }
}