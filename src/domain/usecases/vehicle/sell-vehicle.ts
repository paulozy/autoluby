import { Transaction } from "@src/domain/entities/Transaction";
import { ITransactionRepository } from "@src/domain/repositories/transaction-repository";
import { IVehicleRepository } from "@src/domain/repositories/vehicle-repository";

interface ISellVehicleRequest {
  vehicleId: string;
  salesmanId: string;
  createdAt?: Date;
}

interface ISellVehicleResponse {
  transaction: Transaction;
}

export class SellVehicleUseCase {
  private type: "sale" | "reserve" = "sale";

  constructor(
    private readonly vehicleRepository: IVehicleRepository,
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(request: ISellVehicleRequest): Promise<ISellVehicleResponse> {
    const { salesmanId, vehicleId, createdAt } = request;

    const vehicle = await this.vehicleRepository.findById(request.vehicleId);

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    if (vehicle.status !== "available") {
      throw new Error("Vehicle is not available to sale");
    }

    const transaction = new Transaction({
      type: this.type,
      vehicleId,
      salesmanId,
      createdAt,
    });

    await this.transactionRepository.save(transaction);

    vehicle.status = "sold";

    await this.vehicleRepository.save(vehicle);

    return { transaction };
  }
}
