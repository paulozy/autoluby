import { Vehicle } from "./Vehicle";

describe("Vehicle", () => {
  test("should be able to create a new vehicle", () => {
    const vehicle = new Vehicle({
      brand: "Fiat",
      model: "Uno",
      year: 1998,
      km: 100000,
      color: "white",
      chassi: "123456789",
      price: 10000,
    });

    expect(vehicle).toBeTruthy();
    expect(vehicle).toHaveProperty("id");
    expect(vehicle.status).toBe("available");
  });
});
