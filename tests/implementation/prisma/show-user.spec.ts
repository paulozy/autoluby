import { CreateAdminUseCase } from "@src/domain/usecases/admin/create-admin";
import { ShowAdminUseCase } from "@src/domain/usecases/admin/show-admin";
import { prisma } from "@src/infra/database/prisma/prisma-service";
import { PrismaUserRepository } from "@src/infra/database/prisma/repositories/prisma-user-repository";
import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { makeAdmin } from "@tests/factories/admin-factory";

interface SutTypes {
  sut: ShowAdminUseCase;
  createAdminUseCase: CreateAdminUseCase;
}

const makeSut = (): SutTypes => {
  const userRepository = new PrismaUserRepository(prisma);
  const encrypter = new Encrypter();
  const createAdminUseCase = new CreateAdminUseCase(userRepository, encrypter);
  const sut = new ShowAdminUseCase(userRepository);

  return {
    sut,
    createAdminUseCase,
  };
};

describe("show admin", () => {
  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  test("should be show an admin on success", async () => {
    const { sut, createAdminUseCase } = makeSut();

    const { user } = await createAdminUseCase.execute(makeAdmin());

    const { admin } = await sut.execute({ id: user._id });

    expect(admin._id).toBe(user._id);
  });

  test("should throw if admin not found", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({ id: "invalid_id" });

    await expect(promise).rejects.toThrowError("User not found");
  });
});
