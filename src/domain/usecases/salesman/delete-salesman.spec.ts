import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { makeSalesman } from "@tests/factories/salesman-factory";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateSalesmanUseCase } from "./create-salesman";
import { DeleteSalesmanUseCase } from "./delete-salesman";

interface SutTypes {
  sut: DeleteSalesmanUseCase;
  userRepository: InMemoryUserRepository;
  createSalesmanUseCase: CreateSalesmanUseCase;
}

const makeSut = (): SutTypes => {
  const userRepository = new InMemoryUserRepository();
  const encrypter = new Encrypter();
  const createSalesmanUseCase = new CreateSalesmanUseCase(
    userRepository,
    encrypter
  );
  const deleteSalesmanUseCase = new DeleteSalesmanUseCase(userRepository);

  return {
    sut: deleteSalesmanUseCase,
    userRepository,
    createSalesmanUseCase,
  };
};

describe("Delete Salesman", () => {
  test("should be able delete a salesman on success", async () => {
    const { sut, userRepository, createSalesmanUseCase } = makeSut();

    const { user: salesman } = await createSalesmanUseCase.execute(
      makeSalesman()
    );

    expect(userRepository.users).toHaveLength(1);

    await sut.execute({ id: salesman.id });

    expect(userRepository.users).toHaveLength(0);
  });

  test("should not be able delete a salesman with an invalid id", async () => {
    const { sut } = makeSut();

    expect(async () => {
      await sut.execute({ id: "invalid-id" });
    }).rejects.toThrowError("User not found");
  });
});
