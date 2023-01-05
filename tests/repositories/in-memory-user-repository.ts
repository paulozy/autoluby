import { UserBase } from "@src/domain/entities/User";
import { IUserRepository } from "@src/domain/repositories/user-repository";

export class InMemoryUserRepository implements IUserRepository {
  public users: UserBase[] = [];

  async save(user: UserBase): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<UserBase> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<UserBase> {
    return this.users.find((user) => user.id === id);
  }
}
