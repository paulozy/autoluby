import { IDeleteUserRequest } from "@src/domain/interfaces";
import { IUserRepository } from "@src/domain/repositories/user-repository";

export class DeleteSalesmanUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: IDeleteUserRequest): Promise<void> {
    const salesman = await this.userRepository.findById(request.id);

    if (!salesman) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(request.id);
  }
}
