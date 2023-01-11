import { InMemoryUserRepository } from "@tests/repositories/in-memory-user-repository";
import { CreateAdminUseCase } from "./create-admin";
import { UpdateAdminUseCase } from "./update-admin";

describe("Update Admin", () => {
  test("should be able to update an admin on success", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createAdminUseCase = new CreateAdminUseCase(inMemoryUserRepository);
    const updateAdminUseCase = new UpdateAdminUseCase(inMemoryUserRepository);

    const { admin } = await createAdminUseCase.execute({
      cpf: "12345678910",
      name: "John Doe",
      email: "john_doe.admin@email.com",
      password: "121334",
      bio: "I'm a admin",
    });

    const { admin: updatedAdmin } = await updateAdminUseCase.execute({
      id: admin.id,
      bio: "I'm the master admin",
    });

    expect(updatedAdmin).toBeTruthy();
    expect(updatedAdmin).toEqual(
      expect.objectContaining({
        id: admin.id,
        cpf: admin.cpf,
        name: admin.name,
        email: admin.email,
        password: admin.password,
        bio: "I'm the master admin",
        permissions: admin.permissions,
      })
    );
  });

  test("should not be able to update an admin if it does not exists", async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const updateAdminUseCase = new UpdateAdminUseCase(inMemoryUserRepository);

    await expect(
      updateAdminUseCase.execute({
        id: "non-existing-id",
        bio: "I'm the master admin",
      })
    ).rejects.toThrow(new Error("User not found"));
  });
});
