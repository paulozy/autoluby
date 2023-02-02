import express, { Request, Response } from "express";
import { IHttpServer } from "../http-server";

export class ExpressAdapter implements IHttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async (req: Request, res: Response) => {
      const output = await callback(req);
      res.status(output.statusCode).json(output.body);
    });
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
