import { Vehicle } from "../entities/Vehicle";

export interface IFindAllParams {
  orderBy?: "AQUIRED_ASC" | "AQUIRED_DESC";
  status?: "available" | "sold" | "reserved";
  itemPerPage?: number;
  itemPageKey?: string;
}

export interface IVehicleRepository {
  save(vehicle: Vehicle): Promise<void>;
  listAll(params: IFindAllParams): Promise<Vehicle[]>;
  findById(id: string): Promise<Vehicle | undefined>;
  delete(id: string): Promise<void>;
}
