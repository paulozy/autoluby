import { Salesman } from "@src/domain/entities/Salesman";
import {
  ICreateUserRequest,
  ICreateUserResponse,
} from "@src/domain/interfaces";
import { IUserRepository } from "@src/domain/repositories/user-repository";
import { IEncrypter } from "@src/infra/encrypter/IEncrypter";

export class CreateSalesmanUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly encrypter: IEncrypter
  ) {}

  async execute(request: ICreateUserRequest): Promise<ICreateUserResponse> {
    const { cpf, name, email, bio, createdAt } = request;

    const emailAlreadyUse = await this.userRepository.findByEmail(email);
    const userAlreadyExists = await this.userRepository.findByCpf(cpf);

    if (emailAlreadyUse || userAlreadyExists) {
      throw new Error("User already exists");
    }

    const password = await this.encrypter.encrypt(request.password);

    const salesman = new Salesman({
      cpf,
      name,
      email,
      password,
      bio,
      createdAt,
    });

    await this.userRepository.save(salesman);

    return { user: salesman };
  }
}
