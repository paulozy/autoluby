import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateSalesmanUseCase } from "./create-salesman";
import { DeleteSalesmanUseCase } from "./delete-salesman";

describe("Delete Salesman", () => {
  test("should be able delete a salesman on success", async () => {
    const userRepository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const createSalesmanUseCase = new CreateSalesmanUseCase(
      userRepository,
      encrypter
    );
    const deleteSalesmanUseCase = new DeleteSalesmanUseCase(userRepository);

    const { user: salesman } = await createSalesmanUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      password: "123456",
      bio: "I'm a salesman",
    });

    expect(userRepository.users).toHaveLength(1);

    await deleteSalesmanUseCase.execute({ id: salesman.id });

    expect(userRepository.users).toHaveLength(0);
  });

  test("should not be able delete a salesman with an invalid id", async () => {
    const userRepository = new InMemoryUserRepository();
    const deleteSalesmanUseCase = new DeleteSalesmanUseCase(userRepository);

    expect(async () => {
      await deleteSalesmanUseCase.execute({ id: "invalid-id" });
    }).rejects.toThrowError("User not found");
  });
});