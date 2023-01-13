import { ICreateUserRequest } from "@src/domain/interfaces";
import { IUserRepository } from "@src/domain/repositories/user-repository";
import { CreateSalesmanUseCase } from "@src/domain/usecases/salesman/create-salesman";
import { Encrypter } from "@src/infra/encrypter/bcrypt";

type Override = Partial<ICreateUserRequest>;

export async function makeSalesman(
  override: Override = {},
  userRepository: IUserRepository
) {
  const encrypter = new Encrypter();
  const createSalesmanUseCase = new CreateSalesmanUseCase(
    userRepository,
    encrypter
  );

  const payload = {
    cpf: "12345678910",
    name: "John Doe",
    email: "john_doe.salesman@edit.com",
    bio: "I'm a salesman",
    password: "123456",
  };

  const { user: salesman } = await createSalesmanUseCase.execute({
    cpf: payload.cpf,
    name: payload.name,
    email: payload.email,
    bio: payload.bio,
    password: payload.password,
    ...override,
  });

  return salesman;
}
