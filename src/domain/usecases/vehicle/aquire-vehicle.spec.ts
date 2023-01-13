import { InMemoryVehicleRepository } from "@tests/repositories/in-memory-vehicle-repository";
import { AquireVehicleUseCase } from "./aquire-vehicle";

interface SutTypes {
  inMemoryVehicleRepository: InMemoryVehicleRepository;
  sut: AquireVehicleUseCase;
}

const makeSut = () => {
  const inMemoryVehicleRepository = new InMemoryVehicleRepository();
  const aquireVehicleUseCase = new AquireVehicleUseCase(
    inMemoryVehicleRepository
  );

  return { inMemoryVehicleRepository, sut: aquireVehicleUseCase };
};

describe("Aquire vehicle", () => {
  test("should be able aquire a new vehicle on success", async () => {
    const { sut, inMemoryVehicleRepository } = makeSut();

    const { vehicle } = await sut.execute({
      brand: "Fiat",
      model: "Uno",
      year: 1998,
      km: 100000,
      color: "white",
      chassi: "123456789",
      price: 10000,
    });

    expect(vehicle).toHaveProperty("id");
    expect(vehicle.aquiredIn).toBeInstanceOf(Date);
    expect(vehicle.status).toBe("available");

    expect(inMemoryVehicleRepository.vehicles).toHaveLength(1);
  });

  test("should be able aquire a new vehicle with a custom aquiredIn date", async () => {
    const { sut, inMemoryVehicleRepository } = makeSut();

    const { vehicle } = await sut.execute({
      brand: "Fiat",
      model: "Uno",
      year: 1998,
      km: 100000,
      color: "white",
      chassi: "123456789",
      price: 10000,
      aquiredIn: new Date("2020-01-01"),
    });

    console.log(vehicle);

    expect(vehicle).toHaveProperty("id");
    expect(vehicle.aquiredIn).toBeInstanceOf(Date);
    expect(vehicle.aquiredIn).toEqual(new Date("2020-01-01"));
    expect(vehicle.status).toBe("available");

    expect(inMemoryVehicleRepository.vehicles).toHaveLength(1);
  });
});
