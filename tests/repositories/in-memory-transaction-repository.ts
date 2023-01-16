import { Transaction } from "@src/domain/entities/Transaction";
import { ITransactionRepository } from "@src/domain/repositories/transaction-reository";

export class InMemoryTransactionRepository implements ITransactionRepository {
  public transactions: Transaction[] = [];

  async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }
}
