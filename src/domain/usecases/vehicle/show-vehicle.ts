import { Vehicle } from "@src/domain/entities/Vehicle";
import { IVehicleRepository } from "@src/domain/repositories/vehicle-repository";

interface IShowVehicleRequest {
  id: string;
}

interface IShowVehicleResponse {
  vehicle: Vehicle;
}

export class ShowVehicleUseCase {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async execute(request: IShowVehicleRequest): Promise<IShowVehicleResponse> {
    const vehicle = await this.vehicleRepository.findById(request.id);

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    return { vehicle };
  }
}
