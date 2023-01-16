import { IVehicleRepository } from "@src/domain/repositories/vehicle-repository";

export class DeleteVehicleUseCase {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async execute(id: string): Promise<void> {
    const vehicle = await this.vehicleRepository.findById(id);

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    await this.vehicleRepository.delete(id);
  }
}
