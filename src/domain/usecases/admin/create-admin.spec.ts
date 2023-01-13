import { Encrypter } from "@infra/encrypter/bcrypt";
import { makeAdmin } from "@tests/factories/admin-factory";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateAdminUseCase } from "./create-admin";

interface SutTypes {
  sut: CreateAdminUseCase;
  userRepository: InMemoryUserRepository;
  encrypter: Encrypter;
}

const makeSut = (): SutTypes => {
  const userRepository = new InMemoryUserRepository();
  const encrypter = new Encrypter();
  const sut = new CreateAdminUseCase(userRepository, encrypter);

  return {
    sut,
    userRepository,
    encrypter,
  };
};

describe("Create Admin", () => {
  test("Should be able to create a new user admin", async () => {
    const { sut, userRepository } = makeSut();

    const { user } = await sut.execute(makeAdmin());

    expect(user).toBeTruthy();
    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
  });

  test("Should not be able to create a new user admin with an email already in use", async () => {
    const { sut, userRepository } = makeSut();

    await sut.execute(makeAdmin());

    expect(userRepository.users).toHaveLength(1);

    await expect(sut.execute(makeAdmin())).rejects.toThrowError(
      "User already exists"
    );
  });

  test("Should not be able to create a new user admin with an cpf already in use", async () => {
    const { sut } = makeSut();

    await sut.execute(makeAdmin());

    expect(async () => {
      await sut.execute(makeAdmin());
    }).rejects.toThrowError("User already exists");
  });

  test("Should be able to create a new user admin with a encrypted password", async () => {
    const { sut, encrypter } = makeSut();

    const encrypterSpy = jest.spyOn(encrypter, "encrypt");

    const { user } = await sut.execute(makeAdmin());

    expect(encrypterSpy).toHaveBeenCalledWith("123456");
    expect(user.password).not.toEqual("123456");
  });
});
