import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateSalesmanUseCase } from "./create-salesman";

interface SutTypes {
  sut: CreateSalesmanUseCase;
  userRepository: InMemoryUserRepository;
}

const makeSut = (): SutTypes => {
  const userRepository = new InMemoryUserRepository();
  const encrypter = new Encrypter();
  const createSalesanUseCase = new CreateSalesmanUseCase(
    userRepository,
    encrypter
  );

  return {
    sut: createSalesanUseCase,
    userRepository,
  };
};

describe("Create Salesman", () => {
  test("should be able create a new salesman", async () => {
    const { sut, userRepository } = makeSut();

    const { user } = await sut.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      password: "123456",
      bio: "I'm a salesman",
    });

    expect(user).toBeTruthy();
    expect(user.id).toBeTruthy();
    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
  });

  test("should not be able create a new salesman with an existing email", async () => {
    const { sut } = makeSut();

    await sut.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      password: "123456",
      bio: "I'm a salesman",
    });

    expect(async () => {
      await sut.execute({
        cpf: "12345678911",
        name: "John Doe",
        email: "john_doe.salesman@email.com",
        password: "123456",
        bio: "I'm a salesman",
      });
    }).rejects.toThrowError("User already exists");
  });

  test("should not be able create a new salesman with an existing cpf", async () => {
    const { sut } = makeSut();

    await sut.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      password: "123456",
      bio: "I'm a salesman",
    });

    expect(async () => {
      await sut.execute({
        cpf: "12345678910",
        name: "John Doe",
        email: "john_doe.salesman@mail.com",
        password: "123456",
        bio: "I'm a salesman",
      });
    }).rejects.toThrowError("User already exists");
  });
});
