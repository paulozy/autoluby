import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { makeAdmin } from "@tests/factories/admin-factory";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateAdminUseCase } from "./create-admin";
import { UpdateAdminUseCase } from "./update-admin";

interface SutTypes {
  sut: UpdateAdminUseCase;
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
  const sut = new UpdateAdminUseCase(inMemoryUserRepository);

  return {
    sut,
    createAdminUseCase,
    inMemoryUserRepository,
  };
};

describe("Update Admin", () => {
  test("should be able to update an admin on success", async () => {
    const { sut, createAdminUseCase } = makeSut();

    const { user } = await createAdminUseCase.execute(makeAdmin());

    const { user: updatedAdmin } = await sut.execute({
      id: user.id,
      bio: "I'm the master admin",
    });

    expect(updatedAdmin).toBeTruthy();
    expect(updatedAdmin).toEqual(
      expect.objectContaining({
        id: user.id,
        cpf: user.cpf,
        name: user.name,
        email: user.email,
        password: user.password,
        bio: "I'm the master admin",
        permissions: user.permissions,
      })
    );
  });

  test("should not be able to update an admin if it does not exists", async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({
        id: "non-existing-id",
        bio: "I'm the master admin",
      })
    ).rejects.toThrow(new Error("User not found"));
  });
});
