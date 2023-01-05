import { Admin } from "@src/domain/entities/Admin";
import { IUserRepository } from "@src/domain/repositories/user-repository";

interface ICreateAdminRequest {
  cpf: string;
  name: string;
  email: string;
  password: string;
  bio: string;
}

interface ICreateAdminResponse {
  admin: Admin;
}

export class CreateAdminUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: ICreateAdminRequest): Promise<ICreateAdminResponse> {
    const { cpf, name, email, password, bio } = request;

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const admin = new Admin({
      cpf,
      name,
      email,
      password,
      bio,
    });

    await this.userRepository.save(admin);

    return { admin };
  }
}
