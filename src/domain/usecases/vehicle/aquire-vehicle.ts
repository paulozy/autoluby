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
  status?: "available" | "sold" | "reserved";
}

interface IAquireVehicleResponse {
  vehicle: Vehicle;
}

export class AquireVehicleUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(
    request: IAquireVehicleRequest
  ): Promise<IAquireVehicleResponse> {
    const { brand, chassi, color, km, model, price, year, aquiredIn, status } =
      request;

    const vehicle = new Vehicle({
      brand,
      chassi,
      color,
      km,
      model,
      price,
      year,
      aquiredIn,
      status,
    });

    await this.vehicleRepository.save(vehicle);

    return { vehicle };
  }
}
