import express from "express";
import bodyParser from "body-parser";
import router from './events/event.route'

const createServer = () => {
    const app: express.Application = express();
    app.use(bodyParser.json())
    app.use('/',router);
    return app;
}

createServer().listen(8080,() => {
    // tslint:disable-next-line:no-console
    console.log(`serveur démarré sur l'url : http://localhost:${8080}`);
});


export default createServer
