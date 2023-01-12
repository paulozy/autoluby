import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateAdminUseCase } from "./create-admin";
import { ShowAdminUseCase } from "./show-admin";

describe("Show Admin", () => {
  test("should be able return an admin on successs", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createAdminUseCase = new CreateAdminUseCase(inMemoryUserRepository);
    const showAdminsUseCase = new ShowAdminUseCase(inMemoryUserRepository);

    const { admin } = await createAdminUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.admin@email.com",
      bio: "I'm a admin",
      password: "121334",
    });

    const { admin: showedAdmin } = await showAdminsUseCase.execute({
      id: admin.id,
    });

    expect(showedAdmin).toEqual(admin);
  });

  test("should be able to return an error if admin not found", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const showAdminsUseCase = new ShowAdminUseCase(inMemoryUserRepository);

    await expect(
      showAdminsUseCase.execute({
        id: "non-existing-id",
      })
    ).rejects.toThrowError("User not found");
  });
});
