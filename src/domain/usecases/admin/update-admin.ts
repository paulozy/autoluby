import { Admin } from "@src/domain/entities/Admin";
import { IUserRepository } from "@src/domain/repositories/user-repository";

interface IUpdateAdminRequest {
  id: string;
  cpf?: string;
  name?: string;
  email?: string;
  bio?: string;
}

interface IUpdateAdminResponse {
  admin: Admin;
}

export class UpdateAdminUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: IUpdateAdminRequest): Promise<IUpdateAdminResponse> {
    const fieldsAbleToUpdate = ["cpf", "name", "email", "bio"];

    const admin = await this.userRepository.findById(request.id);

    if (!admin) {
      throw new Error("User not found");
    }

    if (request.email) {
      const adminAlreadyExists = await this.userRepository.findByEmail(
        request.email
      );

      if (adminAlreadyExists) {
        throw new Error("User already exists");
      }
    }

    fieldsAbleToUpdate.forEach((field) => {
      if (request[field]) {
        admin[field] = request[field];
      }
    });

    await this.userRepository.save(admin);

    return { admin };
  }
}
