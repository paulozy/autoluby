import { makeSalesman } from "@tests/factories/salesman-factory";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { UpdateSalesmanUseCase } from "./update-salesman";

interface SutTypes {
  sut: UpdateSalesmanUseCase;
  userRepository: InMemoryUserRepository;
}

const makeSut = (): SutTypes => {
  const userRepository = new InMemoryUserRepository();
  const deleteSalesmanUseCase = new UpdateSalesmanUseCase(userRepository);

  return {
    sut: deleteSalesmanUseCase,
    userRepository,
  };
};

describe("Update salesman", () => {
  test("should be able update a salesman on succes", async () => {
    const { sut, userRepository } = makeSut();

    const salesman = await makeSalesman({}, userRepository);

    const { user: updatedSalesman } = await sut.execute({
      id: salesman.id,
      name: "John Doe Updated",
      bio: "I am a salesman updated",
    });

    expect(updatedSalesman).toBeTruthy();
    expect(updatedSalesman.props.name).toBe("John Doe Updated");
    expect(updatedSalesman.props.bio).toBe("I am a salesman updated");
  });

  test("should not be able update a salesman with an not exiting user", async () => {
    const { sut } = makeSut();

    expect(async () => {
      await sut.execute({
        id: "not-existing-id",
        name: "John Doe Updated",
        bio: "I am a salesman updated",
      });
    }).rejects.toThrowError("User not found");
  });
});
