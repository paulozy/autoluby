import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateAdminUseCase } from "./create-admin";
import { ListAdminsUseCase } from "./list-admins";

describe("List Admins", () => {
  test("should be able to list all admin users on success", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createAdminUseCase = new CreateAdminUseCase(inMemoryUserRepository);
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

    const { admins } = await listAdminsUseCase.execute({});

    expect(admins).toHaveLength(2);
  });

  test("should be able to list all admin users ordered by created date asc", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createAdminUseCase = new CreateAdminUseCase(inMemoryUserRepository);
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

    const { admins } = await listAdminsUseCase.execute({
      orderBy: "CREATED_ASC",
    });

    expect(admins[0].props.name).toBe("John Doe");
  });

  test("should be able to list all admin users paginated", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createAdminUseCase = new CreateAdminUseCase(inMemoryUserRepository);
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

    const { admins } = await listAdminsUseCase.execute({
      itemPerPage: 1,
    });

    expect(admins).toHaveLength(1);
    expect(admins[0].props.name).toBe("John Doe");
  });

  test("should be able to list all admin users paginated with key", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createAdminUseCase = new CreateAdminUseCase(inMemoryUserRepository);
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

    const { admin: nathan } = await createAdminUseCase.execute({
      cpf: "12345678911",
      name: "Nathan Doe",
      email: "nathan_doe.admin@email.com",
      bio: "I'm a nathan admin",
      password: "121334",
    });

    const { admins } = await listAdminsUseCase.execute({
      itemPerPage: 2,
      itemPageKey: nathan.id,
    });

    expect(admins).toHaveLength(1);
  });
});
