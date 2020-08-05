//import * as http from 'http';
//import * as debug from 'debug';
// import * as winston from 'winston';
import App from './app/App'
import ImageProcessController from './app/image-process/image-process.controller';
/*
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

class Server {
  private static serverInstance: Server;
  private server: any;
  private port: number;
  //private host: string;

  public constructor() {
    this.debugMod();
    this.runServer();
  }
  private normalizePort(val: number | string): number {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    return port;
  }
  private runServer(): void {
    this.port = this.normalizePort(process.env.PORT || 3000);
    // this.host = process.env.API_HOST || '0.0.0.0';
    this.createServer();
  }

  private debugMod(): void {
    debug('API express:server');
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  private createServer() {
    this.server = http.createServer(App);
    this.server.listen(this.port);

    this.server.on('listening', () => {
      let address = this.server.address();
      let bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;
      debug(`Listening on ${bind}`);
    });

    this.server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') throw error;
      console.error(error);
      process.exit(1);
    });
  }

  public getServerInstance(): any {
    return this.server;
  }

  public static bootstrap(): Server {
    if (!this.serverInstance) {
      this.serverInstance = new Server();
      return this.serverInstance;
    } else {
      return this.serverInstance;
    }
  }
}

export const server = Server.bootstrap();
*/
const app = new App(
  [
    new ImageProcessController(),
  ],
);

app.listen();