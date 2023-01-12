import { IListUsersRequest, IListUsersResponse } from "@src/domain/interfaces";
import { IUserRepository } from "@src/domain/repositories/user-repository";

export class ListAdminsUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: IListUsersRequest): Promise<IListUsersResponse> {
    const admins = await this.userRepository.findAll(request);
    return { users: admins };
  }
}
