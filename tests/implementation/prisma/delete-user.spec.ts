import { CreateAdminUseCase } from "@src/domain/usecases/admin/create-admin";
import { DeleteAdminUseCase } from "@src/domain/usecases/admin/delete-admin";
import { prisma } from "@src/infra/database/prisma/prisma-service";
import { PrismaUserRepository } from "@src/infra/database/prisma/repositories/prisma-user-repository";
import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { makeAdmin } from "@tests/factories/admin-factory";

interface SutTypes {
  sut: DeleteAdminUseCase;
  createAdminUseCase: CreateAdminUseCase;
}

const makeSut = (): SutTypes => {
  const userRepository = new PrismaUserRepository();
  const encrypter = new Encrypter();
  const createAdminUseCase = new CreateAdminUseCase(userRepository, encrypter);
  const sut = new DeleteAdminUseCase(userRepository);

  return {
    sut,
    createAdminUseCase,
  };
};

describe("delete admin", () => {
  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  test("should be able delete an admin on success", async () => {
    const { sut, createAdminUseCase } = makeSut();

    const { user } = await createAdminUseCase.execute(makeAdmin());

    await sut.execute({ id: user._id });

    const admin = await prisma.user.findUnique({
      where: {
        id: user._id,
      },
    });

    expect(admin).toBeNull();
  });

  test("should throw if admin not found", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({ id: "invalid_id" });

    await expect(promise).rejects.toThrowError("User not found");
  });
});
