import { IShowUserRequest, IShowUserResponse } from "@src/domain/interfaces";
import { IUserRepository } from "@src/domain/repositories/user-repository";

export class ShowAdminUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: IShowUserRequest): Promise<IShowUserResponse> {
    const admin = await this.userRepository.findById(request.id);

    if (!admin) {
      throw new Error("User not found");
    }

    return { admin };
  }
}
