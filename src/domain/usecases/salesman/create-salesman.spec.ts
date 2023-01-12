import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateSalesmanUseCase } from "./create-salesman";

describe("Create Salesman", () => {
  test("should be able create a new salesman", async () => {
    const userRepository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const createSalesanUseCase = new CreateSalesmanUseCase(
      userRepository,
      encrypter
    );

    const { user } = await createSalesanUseCase.execute({
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
    const userRepository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const createSalesanUseCase = new CreateSalesmanUseCase(
      userRepository,
      encrypter
    );

    await createSalesanUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      password: "123456",
      bio: "I'm a salesman",
    });

    expect(async () => {
      await createSalesanUseCase.execute({
        cpf: "12345678911",
        name: "John Doe",
        email: "john_doe.salesman@email.com",
        password: "123456",
        bio: "I'm a salesman",
      });
    }).rejects.toThrowError("User already exists");
  });

  test("should not be able create a new salesman with an existing cpf", async () => {
    const userRepository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const createSalesanUseCase = new CreateSalesmanUseCase(
      userRepository,
      encrypter
    );

    await createSalesanUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      password: "123456",
      bio: "I'm a salesman",
    });

    expect(async () => {
      await createSalesanUseCase.execute({
        cpf: "12345678910",
        name: "John Doe",
        email: "john_doe.salesman@mail.com",
        password: "123456",
        bio: "I'm a salesman",
      });
    }).rejects.toThrowError("User already exists");
  });
});
