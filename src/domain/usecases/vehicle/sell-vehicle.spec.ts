import { makeVehicle } from "@tests/factories/vehicle-factory";
import { InMemoryTransactionRepository } from "@tests/repositories/in-memory-transaction-repository";
import { InMemoryVehicleRepository } from "@tests/repositories/in-memory-vehicle-repository";
import { AquireVehicleUseCase } from "./aquire-vehicle";
import { SellVehicleUseCase } from "./sell-vehicle";

interface SutTypes {
  sut: SellVehicleUseCase;
  aquireVehicleUseCase: AquireVehicleUseCase;
  transactionRepository: InMemoryTransactionRepository;
}

const makeSut = (): SutTypes => {
  const vehicleRepository = new InMemoryVehicleRepository();
  const transactionRepository = new InMemoryTransactionRepository();
  const aquireVehicleUseCase = new AquireVehicleUseCase(vehicleRepository);
  const sut = new SellVehicleUseCase(vehicleRepository, transactionRepository);

  return {
    sut,
    aquireVehicleUseCase,
    transactionRepository,
  };
};

describe("Sold vehicle", () => {
  test("should be able to sell a vehicle", async () => {
    const { sut, aquireVehicleUseCase, transactionRepository } = makeSut();

    const { vehicle } = await aquireVehicleUseCase.execute(makeVehicle());

    expect(vehicle.status).toBe("available");

    const { transaction } = await sut.execute({
      vehicleId: vehicle.id,
      salesmanId: "any_salesman_id",
    });

    expect(transactionRepository.transactions).toHaveLength(1);

    expect(transaction).toHaveProperty("id");
    expect(transaction.type).toBe("sale");
    expect(transaction.salesmanId).toBe("any_salesman_id");

    expect(transaction.vehicleId).toBe(vehicle.id);
    expect(vehicle.status).toBe("sold");
  });
});
