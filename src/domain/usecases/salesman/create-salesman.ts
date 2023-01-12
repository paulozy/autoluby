import { Salesman } from "@src/domain/entities/Salesman";
import {
  ICreateUserRequest,
  ICreateUserResponse,
} from "@src/domain/interfaces";
import { IUserRepository } from "@src/domain/repositories/user-repository";

export class CreateSalesmanUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: ICreateUserRequest): Promise<ICreateUserResponse> {
    const { cpf, name, email, password, bio } = request;

    const emailAlreadyUse = await this.userRepository.findByEmail(email);
    const userAlreadyExists = await this.userRepository.findByCpf(cpf);

    if (emailAlreadyUse || userAlreadyExists) {
      throw new Error("User already exists");
    }

    const salesman = new Salesman({
      cpf,
      name,
      email,
      password,
      bio,
    });

    await this.userRepository.save(salesman);

    return { user: salesman };
  }
}
