import { UserBase } from "../entities/User";

export interface IUserRepository {
  save(user: UserBase): Promise<void>;
  findByEmail(email: string): Promise<UserBase>;
  findById(id: string): Promise<UserBase>;
}
