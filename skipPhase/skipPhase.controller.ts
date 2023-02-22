import * as express from "express";
import Controller from "../interface";
import {getRepository} from "typeorm";
import SkipPhase from "./skipPhase.entity";

export default class SkipPhaseController implements Controller {
    public path = '/rate'
    public router = express.Router();
    private skipRepository = getRepository(SkipPhase)

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}up/:id`, this.rateUP)
        this.router.post(`${this.path}down/:id`, this.rateDOWN)
    }

    private rateUP = async (request: express.Request, response: express.Response) => {
        const id = request.params.id
        const skipPhase = await this.skipRepository.findOne({id: id})
        if (skipPhase) {
            await this.skipRepository.update(id, {rate: skipPhase.rate + 1});
            response.json({code: 200, message: 'Success'})
        } else {
            response.json({code: 404, error: `Does not exists skip phase with id: ${id}`})
        }
    }

    private rateDOWN = async (request: express.Request, response: express.Response) => {
        const id = request.params.id
        const skipPhase = await this.skipRepository.findOne({id: id})
        if (skipPhase) {
            await this.skipRepository.update(id, {rate: skipPhase.rate - 1});
            response.json({code: 200, message: 'Success'})
        } else {
            response.json({code: 404, error: `Does not exists skip phase with id: ${id}`})
        }
    }
}
