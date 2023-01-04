import { randomUUID } from "node:crypto";
import { Replace } from "src/utils/Replace";

interface ISalesmanProps {
  name: string;
  cpf: string;
  email: string;
  bio: string;
  password: string;
  createdAt: Date;
}

export class Salesman {
  private _id: string;
  private props: ISalesmanProps;

  constructor(
    props: Replace<ISalesmanProps, { createdAt?: Date }>,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get cpf(): string {
    return this.props.cpf;
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get bio(): string {
    return this.props.bio;
  }

  public set bio(bio: string) {
    this.props.bio = bio;
  }

  public set password(password: string) {
    this.props.password = password;
  }
}
