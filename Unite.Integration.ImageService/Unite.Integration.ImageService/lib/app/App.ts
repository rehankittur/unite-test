
import * as bodyParser from 'body-parser';
import * as express from 'express';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import * as formidableMiddleware from 'express-formidable';
class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }
  private normalizePort(val: number | string): number {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    return port;
  }
  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    
    this.app.use(bodyParser.urlencoded({ 'extended': true }));
    this.app.use(bodyParser.json());
    this.app.use(formidableMiddleware());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    const port = this.normalizePort(process.env.PORT || 3000);
    const host = process.env.API_HOST || '0.0.0.0';
    this.app.listen(port, host, () => {
      console.log(`App listening on the port ${port}`);
    });
  }
}

export default App;