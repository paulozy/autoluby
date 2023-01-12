import {
  IUpdateUserRequest,
  IUpdateUserResponse,
} from "@src/domain/interfaces";
import { IUserRepository } from "@src/domain/repositories/user-repository";

export class UpdateSalesmanUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: IUpdateUserRequest): Promise<IUpdateUserResponse> {
    const fieldsAbleToUpdate = ["name", "bio"];

    const salesman = await this.userRepository.findById(request.id);

    if (!salesman) {
      throw new Error("User not found");
    }

    fieldsAbleToUpdate.forEach((field) => {
      if (request[field]) {
        salesman[field] = request[field];
      }
    });

    await this.userRepository.save(salesman);

    return { user: salesman };
  }
}
