import { IVehicleRepository } from "@src/domain/repositories/vehicle-repository";
import { makeVehicle } from "@tests/factories/vehicle-factory";
import { InMemoryVehicleRepository } from "@tests/repositories/in-memory-vehicle-repository";
import { AquireVehicleUseCase } from "./aquire-vehicle";
import { ShowVehicleUseCase } from "./show-vehicle";

interface SutTypes {
  sut: ShowVehicleUseCase;
  inMemoryVehicleRepository: IVehicleRepository;
  aquireVehicleUseCase: AquireVehicleUseCase;
}

const makeSut = (): SutTypes => {
  const inMemoryVehicleRepository = new InMemoryVehicleRepository();
  const aquireVehicleUseCase = new AquireVehicleUseCase(
    inMemoryVehicleRepository
  );
  const sut = new ShowVehicleUseCase(inMemoryVehicleRepository);

  return { sut, inMemoryVehicleRepository, aquireVehicleUseCase };
};

describe("Show vehicle", () => {
  test("should be able get a vehicle on success", async () => {
    const { sut, aquireVehicleUseCase } = makeSut();

    const { vehicle: createdVehicle } = await aquireVehicleUseCase.execute(
      makeVehicle()
    );

    const { vehicle } = await sut.execute({ id: createdVehicle.id });

    expect(vehicle).toEqual(createdVehicle);
  });
});
