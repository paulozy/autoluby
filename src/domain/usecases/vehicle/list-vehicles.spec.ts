import { makeVehicle } from "@tests/factories/vehicle-factory";
import { InMemoryVehicleRepository } from "@tests/repositories/in-memory-vehicle-repository";
import { AquireVehicleUseCase } from "./aquire-vehicle";
import { ListVehicleUseCase } from "./list-vehicles";

interface SutTypes {
  inMemoryVehicleRepository: InMemoryVehicleRepository;
  aquireVehicleUseCase: AquireVehicleUseCase;
  sut: ListVehicleUseCase;
}

const makeSut = (): SutTypes => {
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

  test("should be able get vehicles ordered by aquired date asc", async () => {
    const { sut, aquireVehicleUseCase, inMemoryVehicleRepository } = makeSut();

    await aquireVehicleUseCase.execute(makeVehicle());
    await aquireVehicleUseCase.execute(
      makeVehicle({
        aquiredIn: new Date("2020-01-01"),
      })
    );

    expect(inMemoryVehicleRepository.vehicles).toHaveLength(2);

    const { vehicles } = await sut.execute({
      orderBy: "AQUIRED_ASC",
    });

    expect(vehicles).toEqual(inMemoryVehicleRepository.vehicles);
  });

  test("should be able get vehicles ordered by aquired date desc", async () => {
    const { sut, aquireVehicleUseCase, inMemoryVehicleRepository } = makeSut();

    await aquireVehicleUseCase.execute(makeVehicle());
    await aquireVehicleUseCase.execute(
      makeVehicle({
        aquiredIn: new Date("2020-01-01"),
      })
    );

    expect(inMemoryVehicleRepository.vehicles).toHaveLength(2);

    const { vehicles } = await sut.execute({
      orderBy: "AQUIRED_DESC",
    });

    expect(vehicles).toEqual(inMemoryVehicleRepository.vehicles.reverse());
  });

  test("should be able get vehicles by status", async () => {
    const { sut, aquireVehicleUseCase } = makeSut();

    await aquireVehicleUseCase.execute(makeVehicle());
    await aquireVehicleUseCase.execute(makeVehicle({ status: "sold" }));
    await aquireVehicleUseCase.execute(makeVehicle({ status: "sold" }));

    const { vehicles } = await sut.execute({
      status: "sold",
    });

    expect(vehicles).toHaveLength(2);
    expect(vehicles[0].status).toEqual("sold");
  });

  test("should be able get vehicles per page", async () => {
    const { sut, aquireVehicleUseCase } = makeSut();

    const { vehicle: vehicleOne } = await aquireVehicleUseCase.execute(
      makeVehicle()
    );
    const { vehicle: vehicleTwo } = await aquireVehicleUseCase.execute(
      makeVehicle()
    );
    await aquireVehicleUseCase.execute(makeVehicle());
    await aquireVehicleUseCase.execute(makeVehicle());

    const { vehicles } = await sut.execute({
      itemPerPage: 2,
    });

    expect(vehicles).toHaveLength(2);
    expect(vehicles).toEqual(expect.arrayContaining([vehicleOne, vehicleTwo]));
  });

  test("should be able get vehicles per page with key", async () => {
    const { sut, aquireVehicleUseCase } = makeSut();

    const { vehicle: vehicleOne } = await aquireVehicleUseCase.execute(
      makeVehicle()
    );
    const { vehicle: vehicleTwo } = await aquireVehicleUseCase.execute(
      makeVehicle()
    );
    await aquireVehicleUseCase.execute(makeVehicle());

    const { vehicles } = await sut.execute({
      itemPerPage: 2,
      itemPageKey: vehicleOne.id,
    });

    expect(vehicles).toHaveLength(2);
    expect(vehicles).toEqual(expect.arrayContaining([vehicleOne, vehicleTwo]));
  });

  test("should be able get vehicles per page with key and status", async () => {
    const { sut, aquireVehicleUseCase } = makeSut();

    const { vehicle } = await aquireVehicleUseCase.execute(makeVehicle());
    await aquireVehicleUseCase.execute(makeVehicle());
    await aquireVehicleUseCase.execute(makeVehicle());

    const { vehicles } = await sut.execute({
      itemPerPage: 2,
      itemPageKey: vehicle.id,
      status: "available",
    });

    expect(vehicles).toHaveLength(2);
  });

  test("should be able get vehicles per page with key and status and order by aquired date asc", async () => {
    const { sut, aquireVehicleUseCase } = makeSut();

    const { vehicle } = await aquireVehicleUseCase.execute(makeVehicle());
    await aquireVehicleUseCase.execute(makeVehicle());
    await aquireVehicleUseCase.execute(makeVehicle());

    const { vehicles } = await sut.execute({
      itemPerPage: 2,
      itemPageKey: vehicle.id,
      status: "available",
      orderBy: "AQUIRED_ASC",
    });

    expect(vehicles).toHaveLength(2);
  });
});
