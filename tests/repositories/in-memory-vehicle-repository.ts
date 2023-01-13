import { Vehicle } from "@src/domain/entities/Vehicle";
import {
  IFindAllParams,
  IVehicleRepository,
} from "@src/domain/repositories/vehicle-repository";

export class InMemoryVehicleRepository implements IVehicleRepository {
  public vehicles: Vehicle[] = [];

  async aquireVehicle(vehicle: Vehicle): Promise<void> {
    this.vehicles.push(vehicle);
  }

  async listAll(params: IFindAllParams): Promise<Vehicle[]> {
    const { orderBy, status, itemPerPage, itemPageKey } = params;

    let vehicles = this.vehicles;

    if (status) {
      vehicles = vehicles.filter((vehicle) => vehicle.status === status);
    }

    if (orderBy === "AQUIRED_ASC") {
      vehicles = vehicles.sort(
        (a, b) => a.aquiredIn.getTime() - b.aquiredIn.getTime()
      );
    }

    if (orderBy === "AQUIRED_DESC") {
      vehicles = vehicles.sort(
        (a, b) => b.aquiredIn.getTime() - a.aquiredIn.getTime()
      );
    }

    if (itemPerPage && !itemPageKey) {
      vehicles = vehicles.slice(0, itemPerPage);
    }

    if (itemPerPage && itemPageKey) {
      const itemPageKeyIndex = vehicles.findIndex(
        (vehicle) => vehicle.id === itemPageKey
      );

      vehicles = vehicles.slice(
        itemPageKeyIndex,
        itemPageKeyIndex + itemPerPage
      );
    }

    return vehicles;
  }

  async findById(id: string): Promise<Vehicle> {
    const vehicle = this.vehicles.find((vehicle) => vehicle.id === id);
    return vehicle;
  }

  async update(vehicle: Vehicle): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
