import { Transaction } from "./Transaction";

describe("Transaction", () => {
  test("should be able to create a new transaction", () => {
    const transaction = new Transaction({
      type: "sale",
      vehicleId: "any_vehicle_id",
      salesmanId: "any_salesman_id",
    });

    expect(transaction).toBeTruthy();
    expect(transaction).toHaveProperty("id");
    expect(transaction.type).toBe("sale");
    expect(transaction.createdAt).toBeInstanceOf(Date);
  });
});
