import { UserBase } from "@src/domain/entities/User";
import {
  IFindAllParams,
  IUserRepository,
} from "@src/domain/repositories/user-repository";

export class InMemoryUserRepository implements IUserRepository {
  public users: UserBase[] = [];

  async save(user: UserBase): Promise<void> {
    this.users.push(user);
  }

  async findAll(params: IFindAllParams): Promise<UserBase[]> {
    const { orderBy, itemPerPage, itemPageKey } = params;

    let users = this.users;

    if (orderBy === "CREATED_ASC") {
      users = users.sort(
        (a, b) => a.props.createdAt.getTime() - b.props.createdAt.getTime()
      );
    } else if (orderBy === "CREATED_DESC") {
      users = users.sort(
        (a, b) => b.props.createdAt.getTime() - a.props.createdAt.getTime()
      );
    }

    if (itemPerPage && !itemPageKey) {
      users = users.slice(0, itemPerPage);
    }

    if (itemPerPage && itemPageKey) {
      const itemPageKeyIndex = users.findIndex(
        (user) => user.id === itemPageKey
      );

      users = users.slice(itemPageKeyIndex, itemPageKeyIndex + itemPerPage);
    }

    return users;
  }

  async findByEmail(email: string): Promise<UserBase> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<UserBase> {
    return this.users.find((user) => user.id === id);
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    this.users.splice(userIndex, 1);
  }
}
