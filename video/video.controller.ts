import * as express from "express";
import Controller from "../interface";
import {getRepository} from "typeorm";
import {Video} from "./video.entity";
import {SkipPhase} from "../skipPhase/skipPhase.entity";
import {validationMiddleware} from "../middlewares";
import CreateVideoDto from "./video.dto";
import SkipPhaseDto from "../skipPhase/skipPhase.dto";

export default class VideoController implements Controller {
  public path = '/video'
  public router = express.Router();
  private videoRepository = getRepository(Video);
  private skipRepository = getRepository(SkipPhase);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.post(this.path, validationMiddleware(CreatePostDto), this.createPost);
    // this.router.get(this.path, this.getAllPosts);
    // this.router.get(`${this.path}/:id`, this.getPostById);
    // this.router.patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost);
    // this.router.delete(`${this.path}/:id`, this.deletePost);
    // this.router.get(this.path, this.getAllVideo);
    // this.router.get(`${this.path}/:hashID`, this.getVideoByHashID)
    // this.router.post(this.path, validationMiddleware(CreateVideoDto), this.createVideo);
    this.router.post(this.path, validationMiddleware(CreateVideoDto), this.createVideo);
    this.router.get(this.path, this.getVideo);
  }

  private createVideo = async (request: express.Request, response: express.Response) => {
    const {name, url, from, to} = request.body;

    let video = await this.videoRepository.findOne({url});
    if (!video) {
      video = new Video();
      video.name = name;
      video.url = url;
      await this.videoRepository.save(video);
    }

    const skipPhase = new SkipPhase();
    skipPhase.from = from;
    skipPhase.to = to;
    skipPhase.video = video;
    await this.skipRepository.save(skipPhase);

    response.json({code: 201, result: 'Skip phase added successfully'});
  }

  private getVideo = async (request: express.Request, response: express.Response) => {
    const url = request.query.url as string;
    const video = await this.videoRepository.findOne({url}, {relations: ['skipPhases']});
    if (video) {
      response.json(video);
    } else {
      response.json({code: 404, result: 'Video not found'});
    }
  }

  // private createVideo = async (request: express.Request, response: express.Response) => {
  //   const postData: CreateVideoDto = request.body;
  //   const skipData: SkipPhaseDto = request.body.skipPhase
  //   console.log(skipData)
  //   const newSkip = this.skipRepository.create({...skipData, rate: 0})
  //   await this.skipRepository.save(newSkip)
  //   console.log(newSkip, 'newSkip')
  //   const newPost = this.videoRepository.create({
  //     ...postData,
  //     skipPhases: [newSkip]
  //   });
  //   await this.videoRepository.save(newPost);
  //   response.json(newPost);
  //   // response.json({code: 1, message: 'kek'});
  // }
}
