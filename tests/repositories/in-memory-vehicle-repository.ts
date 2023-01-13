import { Vehicle } from "@src/domain/entities/Vehicle";
import { IVehicleRepository } from "@src/domain/repositories/vehicle-repository";

export class InMemoryVehicleRepository implements IVehicleRepository {
  public vehicles: Vehicle[] = [];

  async aquireVehicle(vehicle: Vehicle): Promise<void> {
    this.vehicles.push(vehicle);
  }
}
