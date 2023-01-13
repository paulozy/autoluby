import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { makeAdmin } from "@tests/factories/admin-factory";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateAdminUseCase } from "./create-admin";
import { ShowAdminUseCase } from "./show-admin";

interface SutTypes {
  sut: ShowAdminUseCase;
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
  const sut = new ShowAdminUseCase(inMemoryUserRepository);

  return {
    sut,
    createAdminUseCase,
    inMemoryUserRepository,
  };
};

describe("Show Admin", () => {
  test("should be able return an admin on successs", async () => {
    const { sut, createAdminUseCase } = makeSut();

    const { user } = await createAdminUseCase.execute(makeAdmin());

    const { admin: showedAdmin } = await sut.execute({
      id: user.id,
    });

    expect(showedAdmin).toEqual(user);
  });

  test("should be able to return an error if admin not found", async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({
        id: "non-existing-id",
      })
    ).rejects.toThrowError("User not found");
  });
});
