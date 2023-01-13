import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { makeSalesman } from "@tests/factories/salesman-factory";
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

    const { user } = await sut.execute(makeSalesman());

    expect(user).toBeTruthy();
    expect(user.id).toBeTruthy();
    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
  });

  test("should not be able create a new salesman with an existing email", async () => {
    const { sut } = makeSut();

    await sut.execute(makeSalesman());

    expect(async () => {
      await sut.execute(makeSalesman());
    }).rejects.toThrowError("User already exists");
  });

  test("should not be able create a new salesman with an existing cpf", async () => {
    const { sut } = makeSut();

    await sut.execute(makeSalesman());

    expect(async () => {
      await sut.execute(makeSalesman());
    }).rejects.toThrowError("User already exists");
  });
});
