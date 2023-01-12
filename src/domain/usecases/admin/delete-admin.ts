import { IDeleteUserRequest } from "@src/domain/interfaces";
import { IUserRepository } from "@src/domain/repositories/user-repository";

export class DeleteAdminUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: IDeleteUserRequest): Promise<void> {
    const admin = await this.userRepository.findById(request.id);

    if (!admin) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(request.id);
  }
}
