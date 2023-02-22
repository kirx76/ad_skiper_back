import * as express from "express";

import Controller from "./interface";
import {getYTVideoID} from "./utils";

class GetController implements Controller {
    public path = "/get";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.kek)
        // this.router.post(
        //     controllerPath(this.path, "upload"),
        //     authMiddleware,
        //     this.upload
        // );
        // this.router.get(controllerPath(this.path, ""), authMiddleware, this.all);
        // this.router.post(
        //     controllerPath(this.path, "event/:id"),
        //     authMiddleware,
        //     this.event
        // );
        // this.router.patch(
        //     controllerPath(this.path, "delete/:id"),
        //     authMiddleware,
        //     this.toggleDeleteContent
        // );
        // this.router.patch(
        //     controllerPath(this.path, ":id"),
        //     authMiddleware,
        //     validationMiddleware(ContentDto),
        //     this.patch
        // );
    }

    private kek = async (req: express.Request, res: express.Response) => {
        console.log(getYTVideoID(req.query.url))
        res.json({status: 200, data: 'HALO'});
    }
}

export default GetController
