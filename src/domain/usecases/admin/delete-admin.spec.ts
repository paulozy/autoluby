import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateAdminUseCase } from "./create-admin";
import { DeleteAdminUseCase } from "./delete-admin";

describe("Delete Admin", () => {
  test("should be able to delete an admin on success", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createAdminUseCase = new CreateAdminUseCase(inMemoryUserRepository);
    const deleteAdminUseCase = new DeleteAdminUseCase(inMemoryUserRepository);

    const { admin } = await createAdminUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.admin@email.com",
      bio: "I'm a admin",
      password: "121334",
    });

    expect(inMemoryUserRepository.users).toHaveLength(1);

    await deleteAdminUseCase.execute({ id: admin.id });

    expect(inMemoryUserRepository.users).toHaveLength(0);
  });

  test("should not be able to delete an admin if it does not exists", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const deleteAdminUseCase = new DeleteAdminUseCase(inMemoryUserRepository);

    await expect(
      deleteAdminUseCase.execute({
        id: "non-existing-id",
      })
    ).rejects.toThrow(new Error("User not found"));
  });
});
