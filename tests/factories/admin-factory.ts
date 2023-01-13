import { Admin } from "@src/domain/entities/Admin";
import { IUserBaseProps } from "@src/domain/entities/User";

type Override = Partial<IUserBaseProps>;

export function makeAdmin(override: Override = {}) {
  return new Admin({
    cpf: "12345678910",
    name: "John Doe",
    email: "john_doe.admin@email.com",
    bio: "I am a admin",
    password: "123456",
    ...override,
  });
}
