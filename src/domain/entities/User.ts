export interface IUserBaseProps {
  name: string;
  cpf: string;
  email: string;
  bio: string;
  password: string;
  permissions: string;
  createdAt: Date;
}

export abstract class UserBase {
  public _id: string;
  public props: IUserBaseProps;

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

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get permissions(): string {
    return this.props.permissions;
  }

  public set permissions(permissions: string) {
    this.props.permissions = permissions;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
