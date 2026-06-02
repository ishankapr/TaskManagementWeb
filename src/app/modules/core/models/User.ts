import { UserRole } from "../enums/userRole.enum";

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}
