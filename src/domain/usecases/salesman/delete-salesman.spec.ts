import { makeSalesman } from "@tests/factories/salesman-factory";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { DeleteSalesmanUseCase } from "./delete-salesman";

interface SutTypes {
  sut: DeleteSalesmanUseCase;
  userRepository: InMemoryUserRepository;
}

const makeSut = (): SutTypes => {
  const userRepository = new InMemoryUserRepository();
  const deleteSalesmanUseCase = new DeleteSalesmanUseCase(userRepository);

  return {
    sut: deleteSalesmanUseCase,
    userRepository,
  };
};

describe("Delete Salesman", () => {
  test("should be able delete a salesman on success", async () => {
    const { sut, userRepository } = makeSut();

    const salesman = await makeSalesman({}, userRepository);

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
