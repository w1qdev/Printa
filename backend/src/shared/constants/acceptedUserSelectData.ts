import { AcceptedUserSelectData } from "@/domain/auth/auth.types";

export const acceptedUserSelectData: AcceptedUserSelectData = {
  id: true,
  email: true,
  role: true,
  firstName: true,
  lastName: true,
  phone: true,
  password: false,
};
