import { IVehicleProps, Vehicle } from "@src/domain/entities/Vehicle";

type Override = Partial<IVehicleProps>;

export function makeVehicle(override: Override = {}) {
  return new Vehicle({
    brand: "Fiat",
    model: "Uno",
    year: 1998,
    km: 100000,
    color: "white",
    chassi: "123456789",
    price: 10000,
    ...override,
  });
}
