import { Encrypter } from "@src/infra/encrypter/bcrypt";
import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateAdminUseCase } from "./create-admin";
import { ListAdminsUseCase } from "./list-admins";

describe("List Admins", () => {
  test("should be able to list all admin users on success", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const createAdminUseCase = new CreateAdminUseCase(
      inMemoryUserRepository,
      encrypter
    );
    const listAdminsUseCase = new ListAdminsUseCase(inMemoryUserRepository);

    await createAdminUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.admin@email.com",
      bio: "I'm a admin",
      password: "121334",
    });

    await createAdminUseCase.execute({
      cpf: "12345678911",
      name: "Mary Doe",
      email: "mary_doe.admin@email.com",
      bio: "I'm a mary admin",
      password: "121334",
    });

    const { users } = await listAdminsUseCase.execute({});

    expect(users).toHaveLength(2);
  });

  test("should be able to list all admin users ordered by created date asc", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const createAdminUseCase = new CreateAdminUseCase(
      inMemoryUserRepository,
      encrypter
    );
    const listAdminsUseCase = new ListAdminsUseCase(inMemoryUserRepository);

    await createAdminUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.admin@email.com",
      bio: "I'm a admin",
      password: "121334",
    });

    await createAdminUseCase.execute({
      cpf: "12345678911",
      name: "Mary Doe",
      email: "mary_doe.admin@email.com",
      bio: "I'm a mary admin",
      password: "121334",
    });

    const { users } = await listAdminsUseCase.execute({
      orderBy: "CREATED_ASC",
    });

    expect(users[0].props.name).toBe("John Doe");
  });

  test("should be able to list all admin users paginated", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const createAdminUseCase = new CreateAdminUseCase(
      inMemoryUserRepository,
      encrypter
    );
    const listAdminsUseCase = new ListAdminsUseCase(inMemoryUserRepository);

    await createAdminUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.admin@email.com",
      bio: "I'm a admin",
      password: "121334",
    });

    await createAdminUseCase.execute({
      cpf: "12345678911",
      name: "Mary Doe",
      email: "mary_doe.admin@email.com",
      bio: "I'm a mary admin",
      password: "121334",
    });

    const { users } = await listAdminsUseCase.execute({
      itemPerPage: 1,
    });

    expect(users).toHaveLength(1);
    expect(users[0].props.name).toBe("John Doe");
  });

  test("should be able to list all admin users paginated with key", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const encrypter = new Encrypter();
    const createAdminUseCase = new CreateAdminUseCase(
      inMemoryUserRepository,
      encrypter
    );
    const listAdminsUseCase = new ListAdminsUseCase(inMemoryUserRepository);

    await createAdminUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.admin@email.com",
      bio: "I'm a admin",
      password: "121334",
    });

    await createAdminUseCase.execute({
      cpf: "12345678911",
      name: "Mary Doe",
      email: "mary_doe.admin@email.com",
      bio: "I'm a mary admin",
      password: "121334",
    });

    const { user: nathan } = await createAdminUseCase.execute({
      cpf: "12345678912",
      name: "Nathan Doe",
      email: "nathan_doe.admin@email.com",
      bio: "I'm a nathan admin",
      password: "121334",
    });

    const { users } = await listAdminsUseCase.execute({
      itemPerPage: 2,
      itemPageKey: nathan.id,
    });

    expect(users).toHaveLength(1);
  });
});
