export type FindUserByEmailParamsTypes<T> = {
  email: string;
  selectRoles?: T;
};

export type RefreshPasswordParamsTypes = {
  email: string;
  oldPassword: string;
  newPassword: string;
};
