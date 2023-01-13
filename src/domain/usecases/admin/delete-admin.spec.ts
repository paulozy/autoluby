import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { makeAdmin } from "@tests/factories/admin-factory";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateAdminUseCase } from "./create-admin";
import { DeleteAdminUseCase } from "./delete-admin";

interface SutTypes {
  sut: DeleteAdminUseCase;
  createAdminUseCase: CreateAdminUseCase;
  inMemoryUserRepository: InMemoryUserRepository;
}

const makeSut = (): SutTypes => {
  const inMemoryUserRepository = new InMemoryUserRepository();
  const encrypter = new Encrypter();
  const createAdminUseCase = new CreateAdminUseCase(
    inMemoryUserRepository,
    encrypter
  );
  const sut = new DeleteAdminUseCase(inMemoryUserRepository);

  return {
    sut,
    createAdminUseCase,
    inMemoryUserRepository,
  };
};

describe("Delete Admin", () => {
  test("should be able to delete an admin on success", async () => {
    const { sut, createAdminUseCase, inMemoryUserRepository } = makeSut();

    const { user } = await createAdminUseCase.execute(makeAdmin());

    expect(inMemoryUserRepository.users).toHaveLength(1);

    await sut.execute({ id: user.id });

    expect(inMemoryUserRepository.users).toHaveLength(0);
  });

  test("should not be able to delete an admin if it does not exists", async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({
        id: "non-existing-id",
      })
    ).rejects.toThrow(new Error("User not found"));
  });
});
