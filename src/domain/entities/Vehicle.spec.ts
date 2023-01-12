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
    expect(vehicle.brand).toBe("Fiat");
    expect(vehicle.model).toBe("Uno");
    expect(vehicle.year).toBe(1998);
    expect(vehicle.km).toBe(100000);
    expect(vehicle.color).toBe("white");
    expect(vehicle.chassi).toBe("123456789");
    expect(vehicle.price).toBe(10000);
    expect(vehicle.aquiredIn).toBeInstanceOf(Date);
    expect(vehicle.status).toBe("available");
  });

  test("should be able to create a new vehicle with aquiredIn and status", () => {
    const vehicle = new Vehicle({
      brand: "Fiat",
      model: "Uno",
      year: 1998,
      km: 100000,
      color: "white",
      chassi: "123456789",
      price: 10000,
      aquiredIn: new Date(),
      status: "sold",
    });

    expect(vehicle).toBeTruthy();
    expect(vehicle.aquiredIn).toBeInstanceOf(Date);
    expect(vehicle.status).toBe("sold");
  });

  test("should be able change status of vehicle", () => {
    const vehicle = new Vehicle({
      brand: "Fiat",
      model: "Uno",
      year: 1998,
      km: 100000,
      color: "white",
      chassi: "123456789",
      price: 10000,
    });

    expect(vehicle.status).toBe("available");

    vehicle.status = "sold";

    expect(vehicle.status).toBe("sold");
  });
});
