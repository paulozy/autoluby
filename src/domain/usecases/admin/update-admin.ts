import {
  IUpdateUserRequest,
  IUpdateUserResponse,
} from "@src/domain/interfaces";
import { IUserRepository } from "@src/domain/repositories/user-repository";

export class UpdateAdminUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: IUpdateUserRequest): Promise<IUpdateUserResponse> {
    const fieldsAbleToUpdate = ["name", "bio"];

    const admin = await this.userRepository.findById(request.id);

    if (!admin) {
      throw new Error("User not found");
    }

    fieldsAbleToUpdate.forEach((field) => {
      if (request[field]) {
        admin[field] = request[field];
      }
    });

    await this.userRepository.save(admin);

    return { user: admin };
  }
}
