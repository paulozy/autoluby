import { permissions } from "@utils/Permissions";
import { Admin } from "./Admin";

describe("Administrator", () => {
  test("should be able to create a new admin user", () => {
    const admin = new Admin({
      name: "John Doe",
      cpf: "12345678901",
      email: "john_doe.admin@email.com",
      bio: "A administrator",
      password: "john_doe_password",
    });

    expect(admin).toBeTruthy();
    expect(admin).toHaveProperty("id");
    expect(admin.props.permissions).toEqual(permissions.administrator);
  });
});
