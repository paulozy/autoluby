import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { makeSalesman } from "@tests/factories/salesman-factory";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateSalesmanUseCase } from "./create-salesman";
import { ListSalesmansUseCase } from "./list-salesmans";

interface SutTypes {
  sut: ListSalesmansUseCase;
  userRepository: InMemoryUserRepository;
  createSalesanUseCase: CreateSalesmanUseCase;
}

const makeSut = (): SutTypes => {
  const userRepository = new InMemoryUserRepository();
  const encrypter = new Encrypter();
  const createSalesanUseCase = new CreateSalesmanUseCase(
    userRepository,
    encrypter
  );
  const deleteSalesmanUseCase = new ListSalesmansUseCase(userRepository);

  return {
    sut: deleteSalesmanUseCase,
    userRepository,
    createSalesanUseCase,
  };
};

describe("List Salesmans", () => {
  test("should be able list all salesmans on success", async () => {
    const { sut, createSalesanUseCase } = makeSut();

    await createSalesanUseCase.execute(makeSalesman());
    await createSalesanUseCase.execute(
      makeSalesman({
        cpf: "12345678902",
        name: "Mary Doe",
        email: "mary_doe.salesman@email.com",
        bio: "Mary Doe is a salesman",
      })
    );

    const { users: salesmans } = await sut.execute({});

    expect(salesmans).toHaveLength(2);
  });

  test("should be able list all salesmans ordered by created date asc", async () => {
    const { sut, userRepository, createSalesanUseCase } = makeSut();

    await createSalesanUseCase.execute(makeSalesman());
    await createSalesanUseCase.execute(
      makeSalesman({
        cpf: "12345678902",
        name: "Mary Doe",
        email: "mary_doe.salesman@email.com",
        bio: "Mary Doe is a salesman",
      })
    );

    const { users: salesmans } = await sut.execute({
      orderBy: "CREATED_ASC",
    });

    expect(salesmans).toEqual(userRepository.users);
  });

  test("should be able list all salesmans ordered by created date desc", async () => {
    const { sut, userRepository, createSalesanUseCase } = makeSut();

    await createSalesanUseCase.execute(makeSalesman());
    await createSalesanUseCase.execute(
      makeSalesman({
        cpf: "12345678902",
        name: "Mary Doe",
        email: "mary_doe.salesman@email.com",
        bio: "Mary Doe is a salesman",
        createdAt: new Date("2021-01-01"),
      })
    );

    const { users: salesmans } = await sut.execute({
      orderBy: "CREATED_DESC",
    });

    expect(salesmans).toEqual(userRepository.users.reverse());
  });

  test("should be able list all salesmans paginated", async () => {
    const { sut, createSalesanUseCase } = makeSut();

    await createSalesanUseCase.execute(makeSalesman());
    await createSalesanUseCase.execute(
      makeSalesman({
        cpf: "12345678902",
        name: "Mary Doe",
        email: "mary_doe.salesman@email.com",
        bio: "Mary Doe is a salesman",
      })
    );

    const { users: salesmans } = await sut.execute({
      itemPerPage: 1,
    });

    expect(salesmans).toHaveLength(1);
    expect(salesmans[0].name).toEqual("John Doe");
  });

  test("should be able to list all admin users paginated with key", async () => {
    const { sut, createSalesanUseCase } = makeSut();

    await createSalesanUseCase.execute(makeSalesman());
    await createSalesanUseCase.execute(
      makeSalesman({
        cpf: "12345678902",
        name: "Mary Doe",
        email: "mary_doe.salesman@email.com",
        bio: "Mary Doe is a salesman",
      })
    );
    const { user: nathan } = await createSalesanUseCase.execute(
      makeSalesman({
        cpf: "12345678912",
        name: "Nathan Doe",
        email: "nathan_doe.admin@email.com",
        bio: "I'm a nathan admin",
      })
    );

    const { users: salesmans } = await sut.execute({
      itemPerPage: 2,
      itemPageKey: nathan.id,
    });

    expect(salesmans).toHaveLength(1);
    expect(salesmans[0]).toEqual(nathan);
  });
});
