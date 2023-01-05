import { permissions } from "@utils/Permissions";
import { Salesman } from "./Salesman";

describe("Salesman", () => {
  test("should be create a new salesman", () => {
    const salesman = new Salesman({
      name: "John Doe",
      cpf: "12345678901",
      email: "john_doe@email.com",
      bio: "A salesman",
      password: "john_doe_password",
    });

    expect(salesman).toBeTruthy();
    expect(salesman).toHaveProperty("id");
    expect(salesman.props.permissions).toEqual(permissions.salesman);
  });
});
