import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { makeAdmin } from "@tests/factories/admin-factory";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateAdminUseCase } from "./create-admin";
import { ListAdminsUseCase } from "./list-admins";

interface SutTypes {
  sut: ListAdminsUseCase;
  createAdminUseCase: CreateAdminUseCase;
  inMemoryUserRepository: InMemoryUserRepository;
}

const makeSut = (): SutTypes => {
  const inMemoryUserRepository = new InMemoryUserRepository();
  const encrypter = new Encrypter();
  const createAdminUseCase = new CreateAdminUseCase(
    inMemoryUserRepository,
    encrypter
  );
  const sut = new ListAdminsUseCase(inMemoryUserRepository);

  return {
    sut,
    createAdminUseCase,
    inMemoryUserRepository,
  };
};

describe("List Admins", () => {
  test("should be able to list all admin users on success", async () => {
    const { sut, createAdminUseCase } = makeSut();

    await createAdminUseCase.execute(makeAdmin());
    await createAdminUseCase.execute(
      makeAdmin({
        cpf: "12345678911",
        name: "Mary Doe",
        email: "mary_doe.admin@email.com",
        bio: "I'm a mary admin",
      })
    );

    const { users } = await sut.execute({});

    expect(users).toHaveLength(2);
  });

  test("should be able to list all admin users ordered by created date asc", async () => {
    const { sut, createAdminUseCase } = makeSut();

    await createAdminUseCase.execute(makeAdmin());
    await createAdminUseCase.execute(
      makeAdmin({
        cpf: "12345678911",
        name: "Mary Doe",
        email: "mary_doe.admin@email.com",
        bio: "I'm a mary admin",
      })
    );

    const { users } = await sut.execute({
      orderBy: "CREATED_ASC",
    });

    expect(users[0].props.name).toBe("John Doe");
  });

  test("should be able to list all admin users ordered by created date desc", async () => {
    const { sut, createAdminUseCase } = makeSut();

    await createAdminUseCase.execute(makeAdmin());
    await createAdminUseCase.execute(
      makeAdmin({
        cpf: "12345678911",
        name: "Mary Doe",
        email: "mary_doe.admin@email.com",
        bio: "I'm a mary admin",
        createdAt: new Date("2021-01-01"),
      })
    );

    const { users } = await sut.execute({
      orderBy: "CREATED_DESC",
    });

    expect(users[0].props.name).toBe("Mary Doe");
  });

  test("should be able to list all admin users paginated", async () => {
    const { sut, createAdminUseCase } = makeSut();

    await createAdminUseCase.execute(makeAdmin());
    await createAdminUseCase.execute(
      makeAdmin({
        cpf: "12345678911",
        name: "Mary Doe",
        email: "mary_doe.admin@email.com",
        bio: "I'm a mary admin",
      })
    );

    const { users } = await sut.execute({
      itemPerPage: 1,
    });

    expect(users).toHaveLength(1);
    expect(users[0].props.name).toBe("John Doe");
  });

  test("should be able to list all admin users paginated with key", async () => {
    const { sut, createAdminUseCase } = makeSut();

    await createAdminUseCase.execute(makeAdmin());
    await createAdminUseCase.execute(
      makeAdmin({
        cpf: "12345678911",
        name: "Mary Doe",
        email: "mary_doe.admin@email.com",
        bio: "I'm a mary admin",
      })
    );

    const { user: nathan } = await createAdminUseCase.execute(
      makeAdmin({
        cpf: "12345678912",
        name: "Nathan Doe",
        email: "nathan_doe.admin@email.com",
        bio: "I'm a nathan admin",
      })
    );

    const { users } = await sut.execute({
      itemPerPage: 2,
      itemPageKey: nathan.id,
    });

    expect(users).toHaveLength(1);
  });
});
