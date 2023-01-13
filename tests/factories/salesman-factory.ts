import { Salesman } from "@src/domain/entities/Salesman";
import { IUserBaseProps } from "@src/domain/entities/User";

type Override = Partial<IUserBaseProps>;

export function makeSalesman(override: Override = {}) {
  return new Salesman({
    cpf: "12345678910",
    name: "John Doe",
    email: "john_doe.salesman@edit.com",
    bio: "I'm a salesman",
    password: "123456",
    ...override,
  });
}
