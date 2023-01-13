import { IListUsersRequest, IListUsersResponse } from "@src/domain/interfaces";
import { IUserRepository } from "@src/domain/repositories/user-repository";

export class ListSalesmansUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: IListUsersRequest): Promise<IListUsersResponse> {
    const salesmans = await this.userRepository.findAll(request);
    return { users: salesmans };
  }
}
