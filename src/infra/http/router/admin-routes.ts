import { CreateAdminUseCase } from "@src/domain/usecases/admin/create-admin";
import { NextFunction, Request } from "express";
import { IHttpServer } from "../http-server";

export class Router {
  constructor(
    private readonly httpServer: IHttpServer,
    private readonly createAdminUseCase: CreateAdminUseCase
  ) {}

  async init(): Promise<void> {
    this.httpServer.on(
      "post",
      "/users",
      (req: Request, next: NextFunction) => {

        const activeUserId = req.headers.

      },
      async (request: Request) => {
        const { name, email, cpf, bio, password } = request.body;

        const activeUser = request.user;

        const { user } = await this.createAdminUseCase.execute({
          name,
          email,
          cpf,
          bio,
          password,
        });

        return {
          statusCode: 201,
          body: user,
        };
      }
    );
  }
}
