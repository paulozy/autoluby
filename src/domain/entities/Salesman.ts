import { permissions } from "@utils/Permissions";
import { Replace } from "@utils/Replace";
import { IUserBaseProps, UserBase } from "./User";

export class Salesman extends UserBase {
  constructor(
    props: Replace<
      IUserBaseProps,
      { createdAt?: Date; permissions?: string[] }
    >,
    id?: string
  ) {
    super(props, id);

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      permissions: props.permissions ?? permissions.salesman,
    };
  }
}
