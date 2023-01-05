import { Replace } from "@utils/Replace";
import { randomUUID } from "node:crypto";

interface ITransactionProps {
  type: "sale" | "reserve";
  vehicleId: string;
  salesmanId: string;
  createdAt: Date;
}

export class Transaction {
  private _id: string;
  private props: ITransactionProps;

  constructor(
    props: Replace<ITransactionProps, { createdAt?: Date }>,
    id?: string
  ) {
    this._id = id || randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get type(): "sale" | "reserve" {
    return this.props.type;
  }

  public set type(type: "sale" | "reserve") {
    this.props.type = type;
  }

  public get vehicleId(): string {
    return this.props.vehicleId;
  }

  public set vehicleId(vehicleId: string) {
    this.props.vehicleId = vehicleId;
  }

  public get salesmanId(): string {
    return this.props.salesmanId;
  }

  public set salesmanId(salesmanId: string) {
    this.props.salesmanId = salesmanId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
