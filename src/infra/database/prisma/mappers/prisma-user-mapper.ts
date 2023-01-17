import { User as RawUser } from "@prisma/client";
import { Admin } from "@src/domain/entities/Admin";

export class PrismaUserMapper {
  static toDomain(raw: RawUser) {
    return new Admin(
      {
        name: raw.name,
        cpf: raw.cpf,
        email: raw.email,
        bio: raw.bio,
        password: raw.password,
        permissions: raw.permissions,
        createdAt: raw.createdAt,
      },
      raw.id
    );
  }
}
