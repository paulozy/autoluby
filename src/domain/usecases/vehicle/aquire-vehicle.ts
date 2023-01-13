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
}

interface IAquireVehicleResponse {
  vehicle: Vehicle;
}

export class AquireVehicleUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(
    request: IAquireVehicleRequest
  ): Promise<IAquireVehicleResponse> {
    const { brand, model, year, km, color, chassi, price } = request;

    const vehicle = new Vehicle({
      brand,
      model,
      year,
      km,
      color,
      chassi,
      price,
    });

    await this.vehicleRepository.aquireVehicle(vehicle);

    return { vehicle };
  }
}
