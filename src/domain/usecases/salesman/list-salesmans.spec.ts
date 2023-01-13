import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateSalesmanUseCase } from "./create-salesman";
import { ListSalesmansUseCase } from "./list-salesmans";

describe("List Salesmans", () => {
  const encrypt = new Encrypter();

  test("should be able list all salesmans on success", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createSalesmanUseCase = new CreateSalesmanUseCase(
      inMemoryUserRepository,
      encrypt
    );
    const listSalesmansUseCase = new ListSalesmansUseCase(
      inMemoryUserRepository
    );

    await createSalesmanUseCase.execute({
      cpf: "12345678901",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      bio: "John Doe is a salesman",
      password: "123456",
    });

    await createSalesmanUseCase.execute({
      cpf: "12345678902",
      name: "Mary Doe",
      email: "mary_doe.salesman@email.com",
      bio: "Mary Doe is a salesman",
      password: "123456",
    });

    const { users: salesmans } = await listSalesmansUseCase.execute({});

    expect(salesmans).toHaveLength(2);
  });

  test("should be able list all salesmans ordered by created date asc", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createSalesmanUseCase = new CreateSalesmanUseCase(
      inMemoryUserRepository,
      encrypt
    );
    const listSalesmansUseCase = new ListSalesmansUseCase(
      inMemoryUserRepository
    );

    await createSalesmanUseCase.execute({
      cpf: "12345678901",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      bio: "John Doe is a salesman",
      password: "123456",
    });

    await createSalesmanUseCase.execute({
      cpf: "12345678902",
      name: "Mary Doe",
      email: "mary_doe.salesman@email.com",
      bio: "Mary Doe is a salesman",
      password: "123456",
    });

    const { users: salesmans } = await listSalesmansUseCase.execute({
      orderBy: "CREATED_ASC",
    });

    expect(salesmans).toEqual(inMemoryUserRepository.users);
  });

  test("should be able list all salesmans ordered by created date desc", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createSalesmanUseCase = new CreateSalesmanUseCase(
      inMemoryUserRepository,
      encrypt
    );
    const listSalesmansUseCase = new ListSalesmansUseCase(
      inMemoryUserRepository
    );

    await createSalesmanUseCase.execute({
      cpf: "12345678901",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      bio: "John Doe is a salesman",
      password: "123456",
    });

    await createSalesmanUseCase.execute({
      cpf: "12345678902",
      name: "Mary Doe",
      email: "mary_doe.salesman@email.com",
      bio: "Mary Doe is a salesman",
      password: "123456",
    });

    const { users: salesmans } = await listSalesmansUseCase.execute({
      orderBy: "CREATED_DESC",
    });

    expect(salesmans).toEqual(inMemoryUserRepository.users.reverse());
  });

  test("should be able list all salesmans paginated", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createSalesmanUseCase = new CreateSalesmanUseCase(
      inMemoryUserRepository,
      encrypt
    );
    const listSalesmansUseCase = new ListSalesmansUseCase(
      inMemoryUserRepository
    );

    await createSalesmanUseCase.execute({
      cpf: "12345678901",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      bio: "John Doe is a salesman",
      password: "123456",
    });

    await createSalesmanUseCase.execute({
      cpf: "12345678902",
      name: "Mary Doe",
      email: "mary_doe.salesman@email.com",
      bio: "Mary Doe is a salesman",
      password: "123456",
    });

    const { users: salesmans } = await listSalesmansUseCase.execute({
      itemPerPage: 1,
    });

    expect(salesmans).toHaveLength(1);
    expect(salesmans[0].name).toEqual("John Doe");
  });

  test("should be able to list all admin users paginated with key", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createSalesmanUseCase = new CreateSalesmanUseCase(
      inMemoryUserRepository,
      encrypt
    );
    const listSalesmansUseCase = new ListSalesmansUseCase(
      inMemoryUserRepository
    );

    await createSalesmanUseCase.execute({
      cpf: "12345678901",
      name: "John Doe",
      email: "john_doe.salesman@email.com",
      bio: "John Doe is a salesman",
      password: "123456",
    });

    await createSalesmanUseCase.execute({
      cpf: "12345678902",
      name: "Mary Doe",
      email: "mary_doe.salesman@email.com",
      bio: "Mary Doe is a salesman",
      password: "123456",
    });

    const { user: nathan } = await createSalesmanUseCase.execute({
      cpf: "12345678912",
      name: "Nathan Doe",
      email: "nathan_doe.admin@email.com",
      bio: "I'm a nathan admin",
      password: "121334",
    });

    const { users: salesmans } = await listSalesmansUseCase.execute({
      itemPerPage: 2,
      itemPageKey: nathan.id,
    });

    expect(salesmans).toHaveLength(1);
    expect(salesmans[0]).toEqual(nathan);
  });
});
