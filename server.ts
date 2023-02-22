import "dotenv/config";
import 'reflect-metadata';
import {createConnection} from "typeorm";
import App from "./app";
import {ormconfig, validateEnv} from "./utils";
import VideoController from "./video/video.controller";
// import SkipPhaseController from "./skipPhase/skipPhase.controller";

validateEnv();

(async () => {
    try {
        const connection = await createConnection(ormconfig);
        await connection.runMigrations();
    } catch (error) {
        console.log("HttpError while connecting to the database", error);
        return error;
    }
    const app = new App(
        [new VideoController(),
            // new SkipPhaseController()
        ],
        5000
    );
    app.listen();
})();
