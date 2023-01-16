import { Transaction } from "@src/domain/entities/Transaction";
import { ITransactionRepository } from "@src/domain/repositories/transaction-repository";
import { IVehicleRepository } from "@src/domain/repositories/vehicle-repository";

interface IReserveVehicleRequest {
  vehicleId: string;
  salesmanId: string;
  createdAt?: Date;
}

interface IReserveVehicleResponse {
  transaction: Transaction;
}

export class ReserveVehicleUseCase {
  private type: "sale" | "reserve" = "reserve";

  constructor(
    private vehicleRepository: IVehicleRepository,
    private transactionRepository: ITransactionRepository
  ) {}

  async execute(
    request: IReserveVehicleRequest
  ): Promise<IReserveVehicleResponse> {
    const { vehicleId, salesmanId, createdAt } = request;

    const vehicle = await this.vehicleRepository.findById(
      request.vehicleId as string
    );

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    if (vehicle.status !== "available") {
      throw new Error("Vehicle is not available to reserve");
    }

    const transaction = new Transaction({
      type: this.type,
      vehicleId,
      salesmanId,
      createdAt,
    });

    await this.transactionRepository.save(transaction);

    vehicle.status = "reserved";

    await this.vehicleRepository.save(vehicle);

    return {
      transaction,
    };
  }
}
