import { Admin } from "../entities/Admin";
import { Salesman } from "../entities/Salesman";

export interface ICreateUserRequest {
  cpf: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  createdAt?: Date;
}

export interface ICreateUserResponse {
  user: Admin | Salesman;
}

export interface IUpdateUserRequest {
  id: string;
  name?: string;
  bio?: string;
}

export interface IUpdateUserResponse {
  user: Admin | Salesman;
}

export interface IDeleteUserRequest {
  id: string;
}

export interface IListUsersRequest {
  orderBy?: "CREATED_ASC" | "CREATED_DESC";
  itemPerPage?: number;
  itemPageKey?: string;
}

export interface IListUsersResponse {
  users: Admin[] | Salesman[];
}

export interface IShowUserRequest {
  id: string;
}

export interface IShowUserResponse {
  admin: Admin | Salesman;
}
