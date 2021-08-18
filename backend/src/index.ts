import { config } from "dotenv";
config();

import { userController } from "./controllers";
import morgan from "morgan";
import express from "express";
import { port, mongoDBConnectionString } from "./configurations";
import { closeConnectionToMongoDB, openConnectionToMongoDB } from "./models";

const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(cors());

app.use("/user", userController);

app.listen(port, async () => {
    try {
        if (!mongoDBConnectionString) {
            return Promise.reject(`[ERROR] No mongo connection string found, couldnt start server`);
        }
        await openConnectionToMongoDB(mongoDBConnectionString);
        console.log(`[INFO] Server is running on port ${port}`);
    } catch (err) {
        await closeConnectionToMongoDB();
        return Promise.reject(`[ERROR] ${err}`);
    }
});
