import { makeVehicle } from "@tests/factories/vehicle-factory";
import { InMemoryVehicleRepository } from "@tests/repositories/in-memory-vehicle-repository";
import { AquireVehicleUseCase } from "./aquire-vehicle";
import { DeleteVehicleUseCase } from "./delete-vehicle";

interface SutTypes {
  sut: DeleteVehicleUseCase;
  aquireVehicleUseCase: AquireVehicleUseCase;
  vehicleRepository: InMemoryVehicleRepository;
}

const makeSut = (): SutTypes => {
  const vehicleRepository = new InMemoryVehicleRepository();
  const aquireVehicleUseCase = new AquireVehicleUseCase(vehicleRepository);
  const sut = new DeleteVehicleUseCase(vehicleRepository);

  return {
    sut,
    aquireVehicleUseCase,
    vehicleRepository,
  };
};

describe("Delete vehicle", () => {
  test("should be able delete a vehicle on success", async () => {
    const { sut, aquireVehicleUseCase, vehicleRepository } = makeSut();

    const { vehicle } = await aquireVehicleUseCase.execute(makeVehicle());

    expect(vehicleRepository.vehicles).toHaveLength(1);

    await sut.execute(vehicle.id);

    expect(vehicleRepository.vehicles).toHaveLength(0);
  });

  test("should not be able delete a vehicle that does not exist", async () => {
    const { sut } = makeSut();

    await expect(sut.execute("any_vehicle_id")).rejects.toThrow(
      "Vehicle not found"
    );
  });
});
