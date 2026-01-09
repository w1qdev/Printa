export type FindUserByEmailParamsTypes = {
  email: string;
  selectRoles?: object;
};

export type RefreshPasswordParamsTypes = {
  email: string;
  oldPassword: string;
  newPassword: string;
};
