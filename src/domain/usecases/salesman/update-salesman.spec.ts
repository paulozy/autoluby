import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateSalesmanUseCase } from "./create-salesman";
import { UpdateSalesmanUseCase } from "./update-salesman";

describe("Update salesman", () => {
  test("should be able update a salesman on succes", async () => {
    const userRepository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const createSalesmanUseCase = new CreateSalesmanUseCase(
      userRepository,
      encrypter
    );
    const updateSalesmanUseCase = new UpdateSalesmanUseCase(userRepository);

    const { user: salesman } = await createSalesmanUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      bio: "I am a salesman",
      password: "123456",
    });

    const { user: updatedSalesman } = await updateSalesmanUseCase.execute({
      id: salesman.id,
      name: "John Doe Updated",
      bio: "I am a salesman updated",
    });

    expect(updatedSalesman).toBeTruthy();
    expect(updatedSalesman.props.name).toBe("John Doe Updated");
    expect(updatedSalesman.props.bio).toBe("I am a salesman updated");
  });

  test("should not be able update a salesman with an not exiting user", async () => {
    const userRepository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const createSalesmanUseCase = new CreateSalesmanUseCase(
      userRepository,
      encrypter
    );
    const updateSalesmanUseCase = new UpdateSalesmanUseCase(userRepository);

    const { user: salesman } = await createSalesmanUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      bio: "I am a salesman",
      password: "123456",
    });

    expect(async () => {
      await updateSalesmanUseCase.execute({
        id: "not-existing-id",
        name: "John Doe Updated",
        bio: "I am a salesman updated",
      });
    }).rejects.toThrowError("User not found");
  });
});
