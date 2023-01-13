import { makeSalesman } from "@tests/factories/salesman-factory";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { ListSalesmansUseCase } from "./list-salesmans";

interface SutTypes {
  sut: ListSalesmansUseCase;
  userRepository: InMemoryUserRepository;
}

const makeSut = (): SutTypes => {
  const userRepository = new InMemoryUserRepository();
  const deleteSalesmanUseCase = new ListSalesmansUseCase(userRepository);

  return {
    sut: deleteSalesmanUseCase,
    userRepository,
  };
};

describe("List Salesmans", () => {
  test("should be able list all salesmans on success", async () => {
    const { sut, userRepository } = makeSut();

    await makeSalesman({}, userRepository);

    await makeSalesman(
      {
        cpf: "12345678902",
        name: "Mary Doe",
        email: "mary_doe.salesman@email.com",
        bio: "Mary Doe is a salesman",
      },
      userRepository
    );

    const { users: salesmans } = await sut.execute({});

    expect(salesmans).toHaveLength(2);
  });

  test("should be able list all salesmans ordered by created date asc", async () => {
    const { sut, userRepository } = makeSut();

    await makeSalesman({}, userRepository);

    await makeSalesman(
      {
        cpf: "12345678902",
        name: "Mary Doe",
        email: "mary_doe.salesman@email.com",
        bio: "Mary Doe is a salesman",
      },
      userRepository
    );

    const { users: salesmans } = await sut.execute({
      orderBy: "CREATED_ASC",
    });

    expect(salesmans).toEqual(userRepository.users);
  });

  test("should be able list all salesmans ordered by created date desc", async () => {
    const { sut, userRepository } = makeSut();

    await makeSalesman({}, userRepository);

    await makeSalesman(
      {
        cpf: "12345678902",
        name: "Mary Doe",
        email: "mary_doe.salesman@email.com",
        bio: "Mary Doe is a salesman",
      },
      userRepository
    );

    const { users: salesmans } = await sut.execute({
      orderBy: "CREATED_DESC",
    });

    expect(salesmans).toEqual(userRepository.users.reverse());
  });

  test("should be able list all salesmans paginated", async () => {
    const { sut, userRepository } = makeSut();

    await makeSalesman({}, userRepository);

    await makeSalesman(
      {
        cpf: "12345678902",
        name: "Mary Doe",
        email: "mary_doe.salesman@email.com",
        bio: "Mary Doe is a salesman",
      },
      userRepository
    );

    const { users: salesmans } = await sut.execute({
      itemPerPage: 1,
    });

    expect(salesmans).toHaveLength(1);
    expect(salesmans[0].name).toEqual("John Doe");
  });

  test("should be able to list all admin users paginated with key", async () => {
    const { sut, userRepository } = makeSut();

    await makeSalesman({}, userRepository);

    await makeSalesman(
      {
        cpf: "12345678902",
        name: "Mary Doe",
        email: "mary_doe.salesman@email.com",
        bio: "Mary Doe is a salesman",
      },
      userRepository
    );

    const nathan = await makeSalesman(
      {
        cpf: "12345678912",
        name: "Nathan Doe",
        email: "nathan_doe.admin@email.com",
        bio: "I'm a nathan admin",
      },
      userRepository
    );

    const { users: salesmans } = await sut.execute({
      itemPerPage: 2,
      itemPageKey: nathan.id,
    });

    expect(salesmans).toHaveLength(1);
    expect(salesmans[0]).toEqual(nathan);
  });
});
