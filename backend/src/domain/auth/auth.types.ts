export type AcceptedUserSelectData = {
  id: boolean;
  email: boolean;
  role: boolean;
  firstName: boolean;
  lastName: boolean;
  phone: boolean;
  password?: boolean;
};

export type CreateUserParamsTypes = {
  email: string;
  password: string;
};

export type RegisterUserResult = {
  id: string;
  email: string;
  role: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  refreshToken: string;
  accessToken: string;
};

export type AuthError = {
  message: string;
};
