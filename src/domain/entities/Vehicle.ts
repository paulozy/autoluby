import { Replace } from "@utils/Replace";
import { randomUUID } from "crypto";

export interface IVehicleProps {
  brand: string;
  model: string;
  year: number;
  km: number;
  color: string;
  chassi: string;
  price: number;
  status: "available" | "sold" | "reserved";
  aquiredIn: Date;
}

export class Vehicle {
  private _id: string;
  private props: IVehicleProps;

  constructor(
    props: Replace<
      IVehicleProps,
      { aquiredIn?: Date; status?: "available" | "sold" | "reserved" }
    >,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      status: props.status ?? "available",
      aquiredIn: props.aquiredIn ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get brand(): string {
    return this.props.brand;
  }

  public get model(): string {
    return this.props.model;
  }

  public get year(): number {
    return this.props.year;
  }

  public get km(): number {
    return this.props.km;
  }

  public get color(): string {
    return this.props.color;
  }

  public get chassi(): string {
    return this.props.chassi;
  }

  public get price(): number {
    return this.props.price;
  }

  public get status(): "available" | "sold" | "reserved" {
    return this.props.status;
  }

  public set status(status: "available" | "sold" | "reserved") {
    this.props.status = status;
  }

  public get aquiredIn(): Date {
    return this.props.aquiredIn;
  }
}
