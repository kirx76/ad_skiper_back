import * as bodyParser from "body-parser";
import * as express from "express";

// const appRoot = require("app-root-path");

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;

        this.initializeCORS();
        // this.initializeStatics();
        // this.initializeUploader();
        // this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    // public initializeStatics() {
    //     this.app.use(
    //         process.env.PUBLIC_FOLDER,
    //         express.static(`${appRoot.path}/public`)
    //     );
    // }
    //
    // public initializeUploader() {
    //     const fileUpload = require("express-fileupload");
    //     this.app.use(fileUpload());
    // }

    public initializeCORS() {
        this.app.use(express.json())
        // const cors = require("cors");
        // this.app.use(
        //     cors({
        //         credentials: false,
        //         exposedHeaders: ["set-cookie"],
        //         origin: [
        //             // "http://192.168.88.239:5000",
        //             // "http://192.168.0.106:5200",
        //             // "http://192.168.0.106:8081",
        //             // "http://192.168.0.106:*",
        //             // "http://localhost:5000",
        //             // "http://192.168.88.239:3000",
        //             // "http://localhost:3000",
        //             "*",
        //         ],
        //     })
        // );

        this.app.use(function (req, res, next) {
            res.header("Content-Type", "application/json;charset=UTF-8");
            // res.header("Access-Control-Allow-Credentials", "true");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            res.header(
                "Access-Control-Allow-Origin",
                "*"
            );
            res.header(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS"
            )
            next();
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        }).on("error", function (err) {
            process.once("SIGUSR2", function () {
                process.kill(process.pid, "SIGUSR2");
            });
            process.on("SIGINT", function () {
                // this is only called on ctrl+c, not restart
                process.kill(process.pid, "SIGINT");
            });
        });
    }

    // private initializeMiddlewares() {
    //     this.app.use(bodyParser.json({ limit: "500mb" }));
    // }
    //
    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
}

export default App;
