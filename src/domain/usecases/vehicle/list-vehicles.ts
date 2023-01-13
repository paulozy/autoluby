import { Vehicle } from "@src/domain/entities/Vehicle";
import { IVehicleRepository } from "@src/domain/repositories/vehicle-repository";

export interface IListVehiclesRequest {
  orderBy?: "AQUIRED_ASC" | "AQUIRED_DESC";
  status?: "available" | "sold" | "reserved";
  itemPerPage?: number;
  itemPageKey?: string;
}

interface IListVehiclesResponse {
  vehicles: Vehicle[];
}

export class ListVehicleUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(request: IListVehiclesRequest): Promise<IListVehiclesResponse> {
    const vehicles = await this.vehicleRepository.listAll(request);

    return { vehicles };
  }
}
