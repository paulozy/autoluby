import { makeVehicle } from "@tests/factories/vehicle-factory";
import { InMemoryVehicleRepository } from "@tests/repositories/in-memory-vehicle-repository";
import { AquireVehicleUseCase } from "./aquire-vehicle";
import { ListVehicleUseCase } from "./list-vehicles";

interface SutTypes {
  inMemoryVehicleRepository: InMemoryVehicleRepository;
  aquireVehicleUseCase: AquireVehicleUseCase;
  sut: ListVehicleUseCase;
}

const makeSut = () => {
  const inMemoryVehicleRepository = new InMemoryVehicleRepository();
  const listVehicleUseCase = new ListVehicleUseCase(inMemoryVehicleRepository);
  const aquireVehicleUseCase = new AquireVehicleUseCase(
    inMemoryVehicleRepository
  );

  return {
    inMemoryVehicleRepository,
    sut: listVehicleUseCase,
    aquireVehicleUseCase,
  };
};

describe("List Vehicles", () => {
  test("should be able get all vehicles on success", async () => {
    const { sut, aquireVehicleUseCase } = makeSut();

    await aquireVehicleUseCase.execute(makeVehicle());
    await aquireVehicleUseCase.execute(
      makeVehicle({
        aquiredIn: new Date("2020-01-01"),
      })
    );

    const { vehicles } = await sut.execute({});

    expect(vehicles).toHaveLength(2);
  });
});
