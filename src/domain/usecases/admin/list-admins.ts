import { Admin } from "@src/domain/entities/Admin";
import { IUserRepository } from "@src/domain/repositories/user-repository";

interface IListAdminsRequest {
  orderBy?: "CREATED_ASC" | "CREATED_DESC";
  itemPerPage?: number;
  itemPageKey?: string;
}

interface IListAdminsResponse {
  admins: Admin[];
}

export class ListAdminsUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: IListAdminsRequest): Promise<IListAdminsResponse> {
    const admins = await this.userRepository.findAll(request);
    return { admins };
  }
}
