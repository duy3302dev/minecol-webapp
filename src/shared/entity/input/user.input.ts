export type UserInput = {
  email: string;
  name: string;
  avatarUrl?: string;
};

export type UpdateProfileInput = {
  name?: string;
  avatarUrl?: string;
};
