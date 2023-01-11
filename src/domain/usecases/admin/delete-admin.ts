import { IUserRepository } from "@src/domain/repositories/user-repository";

interface IDeleteAdminRequest {
  id: string;
}

export class DeleteAdminUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: IDeleteAdminRequest): Promise<void> {
    const admin = await this.userRepository.findById(request.id);

    if (!admin) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(request.id);
  }
}
