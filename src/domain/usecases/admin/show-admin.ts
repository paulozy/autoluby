import { Admin } from "@src/domain/entities/Admin";
import { IUserRepository } from "@src/domain/repositories/user-repository";

interface IShowAdminRequest {
  id: string;
}

interface IShowAdminResponse {
  admin: Admin;
}

export class ShowAdminUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: IShowAdminRequest): Promise<IShowAdminResponse> {
    const admin = await this.userRepository.findById(request.id);

    if (!admin) {
      throw new Error("User not found");
    }

    return { admin };
  }
}
