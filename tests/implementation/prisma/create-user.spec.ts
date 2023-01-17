import { CreateAdminUseCase } from "@src/domain/usecases/admin/create-admin";
import { prisma } from "@src/infra/database/prisma/prisma-service";
import { PrismaUserRepository } from "@src/infra/database/prisma/repositories/prisma-user-repository";
import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { permissions } from "@src/utils/Permissions";
import { makeAdmin } from "@tests/factories/admin-factory";

interface SutTypes {
  sut: CreateAdminUseCase;
}

const makeSut = (): SutTypes => {
  const userRepository = new PrismaUserRepository();
  const encrypter = new Encrypter();
  const sut = new CreateAdminUseCase(userRepository, encrypter);

  return {
    sut,
  };
};

describe("create admin", () => {
  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  test("should be create an admin on success", async () => {
    const { sut } = makeSut();

    const { user: admin } = await sut.execute(makeAdmin());

    expect(admin).toHaveProperty("id");
    expect(admin.permissions).toEqual(permissions.administrator.join(","));
  });

  test("should be create an admin with encrypted password", async () => {
    const { sut } = makeSut();

    const { user: admin } = await sut.execute(
      makeAdmin({
        password: "123456",
      })
    );

    expect(admin.password).not.toEqual("123456");
  });

  test("should be throw an error if email already exists", async () => {
    const { sut } = makeSut();

    await sut.execute(makeAdmin());

    const promise = sut.execute(makeAdmin());

    await expect(promise).rejects.toThrow();
  });

  test("should be throw an error if cpf already exists", async () => {
    const { sut } = makeSut();

    await sut.execute(makeAdmin());

    const promise = sut.execute(
      makeAdmin({
        email: "test@email.com",
      })
    );

    await expect(promise).rejects.toThrow();
  });
});
