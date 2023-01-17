import { permissions } from "@utils/Permissions";
import { Replace } from "@utils/Replace";
import { randomUUID } from "crypto";
import { IUserBaseProps, UserBase } from "./User";

export class Admin extends UserBase {
  constructor(
    props: Replace<IUserBaseProps, { createdAt?: Date; permissions?: string }>,
    id?: string
  ) {
    super();

    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      permissions: props.permissions ?? permissions.administrator.join(","),
    };
  }
}
