import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateAdminUseCase } from "./create-admin";

describe("Create Admin", () => {
  test("Should be able to create a new user admin", async () => {
    const userRepository = new InMemoryUserRepository();
    const createAdminUseCase = new CreateAdminUseCase(userRepository);

    const { admin } = await createAdminUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.admin@email.com",
      password: "123456",
      bio: "I'm a admin",
    });

    expect(admin).toBeTruthy();
    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(admin);
  });

  test("Should not be able to create a new user admin with an email already in use", async () => {
    const userRepository = new InMemoryUserRepository();
    const createAdminUseCase = new CreateAdminUseCase(userRepository);

    await createAdminUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.admin@email.com",
      password: "123456",
      bio: "I'm a admin",
    });

    expect(userRepository.users).toHaveLength(1);

    await expect(
      createAdminUseCase.execute({
        cpf: "12345678910",
        name: "John Doe",
        email: "john_doe.admin@email.com",
        password: "123456",
        bio: "I'm a admin",
      })
    ).rejects.toThrowError("User already exists");
  });
});
