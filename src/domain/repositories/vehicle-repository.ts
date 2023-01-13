import { Vehicle } from "../entities/Vehicle";

export interface IVehicleRepository {
  aquireVehicle(vehicle: Vehicle): Promise<void>;
}
