import { CreateAdminUseCase } from "@src/domain/usecases/admin/create-admin";
import { ListAdminsUseCase } from "@src/domain/usecases/admin/list-admins";
import { prisma } from "@src/infra/database/prisma/prisma-service";
import { PrismaUserRepository } from "@src/infra/database/prisma/repositories/prisma-user-repository";
import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { makeAdmin } from "@tests/factories/admin-factory";

interface SutTypes {
  sut: ListAdminsUseCase;
  createAdminUseCase: CreateAdminUseCase;
}

const makeSut = (): SutTypes => {
  const userRepository = new PrismaUserRepository(prisma);
  const encrypter = new Encrypter();
  const createAdminUseCase = new CreateAdminUseCase(userRepository, encrypter);
  const sut = new ListAdminsUseCase(userRepository);

  return {
    sut,
    createAdminUseCase,
  };
};

describe("list admins", () => {
  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  test("should list admins on success", async () => {
    const { sut, createAdminUseCase } = makeSut();

    await createAdminUseCase.execute(makeAdmin());

    await createAdminUseCase.execute(
      makeAdmin({ email: "admin2@email.com", cpf: "12345678901" })
    );

    const { users } = await sut.execute({});

    expect(users).toHaveLength(2);
  });

  test("should list admins with pagination", async () => {
    const { sut, createAdminUseCase } = makeSut();

    const { user: admin } = await createAdminUseCase.execute(makeAdmin());
    await createAdminUseCase.execute(
      makeAdmin({ email: "admin2@email.com", cpf: "12345678901" })
    );

    const { users } = await sut.execute({
      itemPerPage: 1,
      itemPageKey: admin._id,
    });

    expect(users).toHaveLength(1);
    expect(users[0]).not.toEqual(admin);
  });

  test("should list admins with order by", async () => {
    const { sut, createAdminUseCase } = makeSut();

    await createAdminUseCase.execute(makeAdmin());
    const { user: admin } = await createAdminUseCase.execute(
      makeAdmin({
        email: "admin2@email.com",
        cpf: "12345678901",
        createdAt: new Date("2021-01-15"),
      })
    );

    const { users } = await sut.execute({
      orderBy: "CREATED_DESC",
    });

    expect(users).toHaveLength(2);
    expect(users[0].id).toEqual(admin._id);
  });
});
