import { PrismaClient } from "@prisma/client";
import { UserBase } from "@src/domain/entities/User";
import {
  IFindAllParams,
  IUserRepository,
} from "@src/domain/repositories/user-repository";
import { Replace } from "@src/utils/Replace";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: Replace<UserBase, { permissions: string }>): Promise<void> {
    const { id, name, cpf, email, bio, password, permissions } = user;

    await this.prisma.user.create({
      data: {
        id,
        name,
        cpf,
        email,
        bio,
        password,
        permissions,
      },
    });
  }

  async findAll(params: IFindAllParams): Promise<UserBase[]> {
    const orderBy = params.orderBy === "CREATED_ASC" ? "asc" : "desc";

    let users = [];

    if (!params.orderBy && !params.itemPerPage && !params.itemPageKey) {
      users = await this.prisma.user.findMany({});
    }

    if (params.orderBy) {
      users = await this.prisma.user.findMany({
        orderBy: {
          createdAt: orderBy,
        },
      });
    }

    if (params.itemPerPage && params.itemPageKey) {
      users = await this.prisma.user.findMany({
        take: params.itemPerPage,
        skip: params.itemPerPage,
        cursor: {
          id: params.itemPageKey,
        },
      });
    }

    return users.map((user) => {
      return PrismaUserMapper.toDomain(user);
    });
  }

  async findByCpf(cpf: string): Promise<UserBase | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        cpf,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<UserBase | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findById(id: string): Promise<UserBase | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
