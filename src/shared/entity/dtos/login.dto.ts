import type { BaseDto } from "./base.dto";
import type { UserDto } from "./user.dto";

export type LoginDto = BaseDto & {
  access_token: string;
  refresh_token: string;
  user: UserDto;
};
