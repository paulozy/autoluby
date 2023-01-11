import { UserBase } from "../entities/User";

export interface IFindAllParams {
  orderBy?: "CREATED_ASC" | "CREATED_DESC";
  itemPerPage?: number;
  itemPageKey?: string;
}

export interface IUserRepository {
  save(user: UserBase): Promise<void>;
  findAll(params: IFindAllParams): Promise<UserBase[]>;
  findByEmail(email: string): Promise<UserBase>;
  findById(id: string): Promise<UserBase>;
  delete(id: string): Promise<void>;
}
