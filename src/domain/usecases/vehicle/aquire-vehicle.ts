import { Vehicle } from "@src/domain/entities/Vehicle";
import { IVehicleRepository } from "@src/domain/repositories/vehicle-repository";

interface IAquireVehicleRequest {
  brand: string;
  model: string;
  year: number;
  km: number;
  color: string;
  chassi: string;
  price: number;
  aquiredIn?: Date;
}

interface IAquireVehicleResponse {
  vehicle: Vehicle;
}

export class AquireVehicleUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(
    request: IAquireVehicleRequest
  ): Promise<IAquireVehicleResponse> {
    const vehicle = new Vehicle({
      ...request,
    });

    await this.vehicleRepository.aquireVehicle(vehicle);

    return { vehicle };
  }
}
