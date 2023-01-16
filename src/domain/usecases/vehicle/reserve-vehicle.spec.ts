import { makeVehicle } from "@tests/factories/vehicle-factory";
import { InMemoryTransactionRepository } from "@tests/repositories/in-memory-transaction-repository";
import { InMemoryVehicleRepository } from "@tests/repositories/in-memory-vehicle-repository";
import { AquireVehicleUseCase } from "./aquire-vehicle";
import { ReserveVehicleUseCase } from "./reserve-vehicle";

interface SutTypes {
  sut: ReserveVehicleUseCase;
  aquireVehicleUseCase: AquireVehicleUseCase;
  transactionRepository: InMemoryTransactionRepository;
}

const makeSut = (): SutTypes => {
  const vehicleRepository = new InMemoryVehicleRepository();
  const transactionRepository = new InMemoryTransactionRepository();
  const aquireVehicleUseCase = new AquireVehicleUseCase(vehicleRepository);
  const sut = new ReserveVehicleUseCase(
    vehicleRepository,
    transactionRepository
  );

  return {
    sut,
    aquireVehicleUseCase,
    transactionRepository,
  };
};

describe("Reserve vehicle", () => {
  test("should be able reserve a vehile on success", async () => {
    const { sut, aquireVehicleUseCase, transactionRepository } = makeSut();

    const { vehicle } = await aquireVehicleUseCase.execute(makeVehicle());

    expect(vehicle.status).toBe("available");

    const { transaction } = await sut.execute({
      vehicleId: vehicle.id,
      salesmanId: "any_salesman_id",
    });

    expect(transactionRepository.transactions).toHaveLength(1);

    expect(transaction).toHaveProperty("id");
    expect(transaction.type).toBe("reserve");
    expect(transaction.salesmanId).toBe("any_salesman_id");

    expect(transaction.vehicleId).toBe(vehicle.id);
    expect(vehicle.status).toBe("reserved");
  });

  test("should not be able to reserve a vehicle that does not exist", async () => {
    const { sut } = makeSut();

    await expect(
      sut.execute({
        vehicleId: "any_vehicle_id",
        salesmanId: "any_salesman_id",
      })
    ).rejects.toThrow("Vehicle not found");
  });
});
