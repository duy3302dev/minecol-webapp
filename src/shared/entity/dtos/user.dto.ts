import type { BaseDto } from "./base.dto";

export type UserDto = BaseDto & {
  email: string;
  name: string;
  password: string;
  last_login?: string;
  avatarUrl?: string;
};
