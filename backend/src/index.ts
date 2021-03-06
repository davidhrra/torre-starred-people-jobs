import { config } from "dotenv";
config();

import { userController, authController, savedItemsController } from "./controllers";
import morgan from "morgan";
import express from "express";
import { port, mongoDBConnectionString } from "./configurations";
import { openConnectionToMongoDB } from "./models";
import cors from 'cors'

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(cors());

app.use("/user", userController);
app.use("/auth", authController);
app.use("/saved-items", savedItemsController)

app.listen(port, async () => {
    try {
        if (!mongoDBConnectionString) {
            console.log(`[ERROR] No mongo connection string found`);
            return;
        }
        await openConnectionToMongoDB(mongoDBConnectionString);
        console.log(`[INFO] Server is running on port ${port}`);
    } catch (err) {
        console.log(`[ERROR] ${err}`);
    }
});
