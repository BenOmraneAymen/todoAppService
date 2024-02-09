import { Role, Status } from '../schema/user.schema';

export class UserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly role: Role;
  readonly status: Status;
}
